import { CommandBuilder, Arguments } from 'yargs'

export const command = 'build'

export const describe =
  'outputs .p8 file with specified name (defaults to name prop in p8.json)'

export const builder: CommandBuilder = {
  print: {
    alias: 'p',
    type: 'boolean',
    default: false,
    describe: 'prints built code to stdout',
  },
}

type Args = Arguments<{
  print: boolean
  $0: 'p8'
  _: ['build'] & string[]
}>

export async function handler(args: Args) {
  console.log(command, args)
}
