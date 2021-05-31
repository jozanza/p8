import { CommandBuilder, Arguments } from 'yargs'
import path from 'path'
import {
  ProjectConfig,
  getPixels,
  PALETTE,
  EMPTY_CART,
  getProjectConfig,
  writeFile,
  exists,
  readFile,
} from '../common'
// @ts-ignore next-line
import moonc from 'moonc'

export const command = 'build'

export const describe = 'outputs a cart (.p8 file)'

export const builder: CommandBuilder = {
  print: {
    alias: 'p',
    type: 'boolean',
    default: false,
    describe: 'prints built code to stdout',
  },
  out: {
    alias: 'o',
    type: 'string',
    describe:
      'the name of the cart to output (uses name field in p8.json by default)',
  },
}

type Args = Arguments<{
  print?: boolean
  out?: string
  $0: 'p8'
  _: ['build'] & string[]
}>

export async function handler({ print, out }: Args) {
  const config = await getProjectConfig()
  let cart = EMPTY_CART
  const name = `${out ?? config.name}.p8`
  if (exists(name)) {
    cart = (await readFile(name)).toString()
  }
  const lua = await compileLua(config)
  cart = replaceLua(cart, lua)
  const gfx = await compileGfx(config)
  cart = replaceGfx(cart, gfx)
  if (print) {
    console.log(cart)
  } else {
    await writeFile(`${out ?? config.name}.p8`, cart)
  }
  console.log(`Built ${`${out ?? config.name}.p8`} ✨`)
}

const replaceLua = (a: string, b: string) =>
  a.replace(/(__lua__)(.|[\r\n])+(?=__gfx__)/, `$1\n${b}\n`)

const replaceGfx = (a: string, b: string) =>
  a.replace(/(__gfx__)(.|[\r\n])+(?=__gff__)/, `$1\n${b}\n`)

const compileLua = async (config: ProjectConfig) => {
  const data: string[] = []
  const name = config.name.toLowerCase()
  const version = config.version?.toLowerCase() ?? ''
  const author = config.author?.toLowerCase()
  const nameAndVersion = `-- ${name}${version ? ` ${version}` : ''}`
  const byLine = author ? `-- by ${author}` : undefined
  data.push(nameAndVersion)
  if (byLine) data.push(byLine)
  if (config.dependencies) {
    const entries = Object.entries(config.dependencies).map(async ([k, v]) => {
      const { ext } = path.parse(v)
      let src = (await readFile(`./pico_modules/${k}${ext}`)).toString()
      if (ext === '.moon') {
        src = await moonc.promise(src)
      }
      return [k, src.toString()] as const
    })
    const deps = Object.fromEntries(await Promise.all(entries))
    const luaModules = toLuaModulesTable(deps)
    const luaRequire = createLuaRequireFunction(luaModules)
    data.push(luaRequire)
  }
  const luaMain = (await readFile(config.main)).toString()
  const luaInit = `_init = ${wrapInLuaFunction(luaMain)}`
  data.push(luaInit)
  return data.join('\n')
}

const createLuaRequireFunction = (modulesTable: string) =>
  `require = (function(requires)
      modules = {}
      return function(name)
        if not modules[name] then
          modules[name] = requires[name]()
        end
        return modules[name]
      end
    end)(${modulesTable})`

const toLuaModulesTable = (obj: Record<string, string>) => {
  const entries = Object.entries(obj).map(
    ([k, v]) => `['${k}']=${wrapInLuaFunction(v)};`,
  )
  return `{\n${entries.join('\n')}\n}`
}

const wrapInLuaFunction = (body: string) =>
  ['function()', body, 'end'].join('\n')

const compileGfx = async (config: ProjectConfig) => {
  const gfxPromises = Object.keys(config.gfxDependencies || {}).map((name) =>
    loadGfxModule(path.resolve(`./pico_modules/${name}`)),
  )
  const gfxs = await Promise.all(gfxPromises)
  return gfxs.reduce((next, gfx) => {
    let data = ''
    for (let i = 0; i < gfx.length; i++) {
      if (!next[i] || next[i] === '0') data += gfx[i]
      else data += next[i]
    }
    return data
  }, '')
}

const loadGfxModule = async (src: string) => {
  const pixels = await getPixels(src, undefined as any)
  const [h, w] = pixels.shape
  let __gfx__ = ''
  for (let y = 0; y < 128; y++) {
    for (let x = 0; x < 128; x++) {
      if (x > w || y > h) {
        __gfx__ += '0'
        continue
      }
      let px = [
        pixels.get(x, y, 0),
        pixels.get(x, y, 1),
        pixels.get(x, y, 2),
      ].join(',')
      __gfx__ += PALETTE[px as keyof typeof PALETTE] ?? '0'
    }
    __gfx__ += '\n'
  }
  return __gfx__
}
