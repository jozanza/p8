import { CommandBuilder, Arguments } from 'yargs'
import { parse } from 'path'
import { ProjectConfig, getProjectConfig } from '../common'

export const command = 'add [file|url...]'

export const describe =
  'add modules as "dependencies" or "gfxDependencies" in p8.json.'

export const builder: CommandBuilder = {}

type Args = Arguments<{
  file?: string[]
  $0: 'p8'
  _: ['add'] & string[]
}>

enum Extension {
  None = '',
  Lua = 'lua',
  MoonScript = 'moon',
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  GIF = 'gif',
}

enum DepType {
  Script = 'dependencies',
  Sprite = 'gfxDependencies',
  Unknown = '???',
}

function getDepType(ext: string) {
  switch (ext) {
    case Extension.None:
    case Extension.Lua:
    case Extension.MoonScript: {
      return DepType.Script
    }
    case Extension.PNG:
    case Extension.GIF:
    case Extension.JPG:
    case Extension.JPEG: {
      return DepType.Sprite
    }
    default:
      return DepType.Unknown
  }
}

export async function handler({ file: deps = [] }: Args) {
  if (!deps.length) {
    console.error('Please specify at least 1 dependency')
    process.exit(1)
  }
  const config = await getProjectConfig()
  const dependencies: ProjectConfig['dependencies'] = config.dependencies ?? {}
  const gfxDependencies: ProjectConfig['gfxDependencies'] = [
    ...(config.gfxDependencies ?? []),
  ]

  for (const src of deps) {
    const { name, ext, ...s } = parse(src)
    const isRemote = src.startsWith('http')
    let type = getDepType(ext.substr(1))
    let data = ''
    switch (type) {
      case DepType.Script: {
        dependencies[name] = src
        // TODO: set data
        // data = isRemote ? fetch().body : readFile()
        break
      }
      case DepType.Sprite: {
        gfxDependencies.push(src)
        // TODO: set data
        // data = isRemote ? fetch().body : readFile()
        break
      }
      case DepType.Unknown: {
        if (isRemote) {
          // TODO download file and get MIME type
          // res = await fetch()
          // data = res.body
          // type = res.mime.split('/')[1] ?? DepType.Unknown
          console.error('URLs not supported yet')
          process.exit(1)
        } else {
          console.error('Unsupported dependency type', ext)
          process.exit(1)
        }
      }
    }
    // TODO: install dep
    // writeFile(`./pico_modules/${name}.${type}`, data)
  }
  // TODO: write deps to p8.json
  const {
    name,
    version,
    author,
    main,
    dependencies: _,
    gfxDependencies: __,
    ...rest
  } = config
  const values = {
    name,
    version,
    author,
    main,
    dependencies,
    gfxDependencies,
    ...rest,
  }
  const output = JSON.stringify(values, null, 2)
  console.log(output)
}
