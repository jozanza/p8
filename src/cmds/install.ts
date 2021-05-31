import { Arguments, CommandBuilder } from 'yargs'
import { getProjectConfig, installDependency } from '../common'

export const command = 'install'

export const describe =
  'install dependencies listed in p8.json to ./pico_modules'

export const builder: CommandBuilder = {}

type Args = Arguments<{
  $0: 'p8'
  _: ['install'] & string[]
}>

export async function handler(_args: Args) {
  const { dependencies = {}, gfxDependencies = {} } = await getProjectConfig()
  for (const [name, src] of Object.entries(dependencies)) {
    console.log('Installing', name, '...')
    await installDependency(src)
  }
  for (const [name, src] of Object.entries(gfxDependencies)) {
    console.log('Installing', name, '...')
    await installDependency(src)
  }
  console.log('Done! ✨')
}
