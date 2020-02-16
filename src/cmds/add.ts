import { CommandBuilder, Arguments } from 'yargs'

export const command = 'add [file|url...]'

export const describe =
  'add modules as "dependencies" or "gfxDependencies" in p8.json.'

export const builder: CommandBuilder = {
  gfx: {
    alias: 's',
    default: false,
    describe: 'add as sprite (gfxDependencies)',
  },
}

type Args = Arguments<{
  file?: string[]
  url?: string[]
  gfx: boolean
  $0: 'p8'
  _: ['add'] & string[]
}>

export async function handler(args: Args) {
  console.log(command, args)
}
