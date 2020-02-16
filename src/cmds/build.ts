import { CommandBuilder, Arguments } from 'yargs'

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
    describe: 'the name of the cart to output (uses name field in p8.json by default)',
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
