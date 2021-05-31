import { CommandBuilder, Arguments } from 'yargs'
import {
  ProjectConfig,
  updateProjectConfig,
  installDependency,
  DepType,
} from '../common'

export const command = 'add [file|url...]'

export const describe =
  'add modules as "dependencies" or "gfxDependencies" in p8.json.'

export const builder: CommandBuilder = {}

type Args = Arguments<{
  file?: string[]
  $0: 'p8'
  _: ['add'] & string[]
}>

export async function handler({ file: deps = [] }: Args) {
  if (!deps.length) {
    console.error('Please specify at least 1 dependency')
    process.exit(1)
  }
  const dependencies: ProjectConfig['dependencies'] = {}
  const gfxDependencies: ProjectConfig['gfxDependencies'] = {}
  for (const src of deps) {
    try {
      const dep = await installDependency(src)
      switch (dep.type) {
        case DepType.Script: {
          dependencies[dep.name] = dep.src
          break
        }
        case DepType.Sprite: {
          gfxDependencies[`${dep.name}${dep.ext}`] = src
          break
        }
        case DepType.Unknown: {
          console.error('Unknown dependency type', src)
          process.exit(1)
        }
      }
    } catch (err) {
      console.error('Unable to locate dependency', src)
      process.exit(1)
    }
  }
  // Update p8.json
  updateProjectConfig({ dependencies, gfxDependencies })
}
