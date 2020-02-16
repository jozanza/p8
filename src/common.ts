import fs from 'fs'
import cp from 'child_process'
import { promisify } from 'util'
import { basename, resolve } from 'path'
export const CONFIG_PATH = resolve('./p8.json')

export interface ProjectConfig {
  name: string
  version?: string
  author?: string
  main: string
  description?: string
  dependencies?: {
    [name: string]: string
  }
  gfxDependencies?: string[]
  [key: string]: unknown
}

const MINIMAL_CONFIG: ProjectConfig = {
  name: '',
  main: '',
}

const readFile = promisify(fs.readFile)

const exec = promisify(cp.exec)

export async function getProjectConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return MINIMAL_CONFIG
  const json = await readFile(CONFIG_PATH)
  const cfg = JSON.parse(`${json}`)
  return {
    ...MINIMAL_CONFIG,
    ...cfg,
  } as ProjectConfig
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
