import fs from 'fs'
import cp from 'child_process'
import { promisify } from 'util'
import { basename, parse, resolve } from 'path'
import fetch from 'node-fetch'

export interface ProjectConfig {
  name: string
  version?: string
  author?: string
  main: string
  description?: string
  dependencies?: {
    [name: string]: string
  }
  gfxDependencies?: {
    [name: string]: string
  }
  [key: string]: unknown
}

const MINIMAL_CONFIG: ProjectConfig = {
  name: '',
  main: '',
}

export const CONFIG_PATH = resolve('./p8.json')

export const DEPS_PATH = resolve('./pico_modules')

export const exists = fs.existsSync

export const mkdir = promisify(fs.mkdir)

export const readFile = promisify(fs.readFile)

export const writeFile = promisify(fs.writeFile)

const exec = promisify(cp.exec)

export async function getProjectConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return MINIMAL_CONFIG
  const json = await readFile(CONFIG_PATH)
  try {
    const cfg = JSON.parse(`${json}`)
    return {
      ...MINIMAL_CONFIG,
      ...cfg,
    } as ProjectConfig
  } catch (err) {
    console.error('It looks like p8.json contains invalid JSON. Please fix it.')
    process.exit(1)
  }
}

export async function updateProjectConfig(next: Partial<ProjectConfig>) {
  const prev = await getProjectConfig()
  const out = Object.assign({}, prev, {
    name: next.name ?? prev.name,
    version: next.version ?? prev.version,
    author: next.author ?? prev.author,
    main: next.main ?? prev.main,
    dependencies: next.dependencies
      ? { ...prev.dependencies, ...next.dependencies }
      : prev.dependencies,
    gfxDependencies: next.gfxDependencies
      ? { ...prev.gfxDependencies, ...next.gfxDependencies }
      : prev.gfxDependencies,
  })
  const txt = JSON.stringify(out, null, 2)
  await writeFile(CONFIG_PATH, txt)
}

export function getProjectDirname() {
  return basename(process.cwd())
}

export async function whoami() {
  try {
    return (await exec('whoami')).stdout.trim()
  } catch (err) {
    return ''
  }
}

// const compileMoonScript = (exports.compileMoonScript = input =>
//   require('child_process').execSync(`moonc --`, { input }))

enum Extension {
  None = '',
  Lua = 'lua',
  MoonScript = 'moon',
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  GIF = 'gif',
}

export enum DepType {
  Script = 'dependencies',
  Sprite = 'gfxDependencies',
  Unknown = '???',
}

export interface Dependency {
  type: DepType
  ext: string
  name: string
  src: string
}

function getDepType(ext: string) {
  switch (ext) {
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
    case Extension.None:
    default:
      return DepType.Unknown
  }
}

export async function installDependency(src: string): Promise<Dependency> {
  const parsed = parse(src)
  const { name } = parsed
  let ext = parsed.ext
  let type = getDepType(ext.substr(1))
  // Get remote dependency and save to pico_modules
  if (src.startsWith('http')) {
    let data: string | Buffer = ''
    const res = await fetch(src)
    if (type === DepType.Unknown) {
      // Attempt to infer image type
      const contentType = res.headers.get('content-type')
      const [_, imageType] = contentType?.split('/')
      switch (imageType) {
        case Extension.PNG:
        case Extension.GIF:
        case Extension.JPG:
        case Extension.JPEG: {
          ext = imageType
          type = DepType.Sprite
          data = await res.buffer()
          break
        }
        default:
          return { type, name, src, ext }
      }
    } else {
      // Download the script
      data = await res.text()
    }
    if (data) {
      if (!exists(DEPS_PATH)) await mkdir(DEPS_PATH)
      writeFile(`${DEPS_PATH}/${name}.${ext}`, data)
    }
  } else if (!exists(src)) {
    throw new Error('Local dependency does not exist')
  }
  return { type, name, src, ext }
}
