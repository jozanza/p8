import { CommandBuilder, Arguments } from 'yargs'

export const command = 'run'

export const describe = 'runs a .p8 cartridge\nnneerrrrd!'

export const builder: CommandBuilder = {
  watch: {
    alias: 'w',
    type: 'boolean',
    default: false,
    describe: 'reload cartridge whenever entry point is updated',
  },
  cart: {
    alias: 'c',
    describe: 'the name of the cart to run (defaults to name field of p8.json)',
  },
}

type Args = Arguments<{
  watch: boolean
  cart?: string
  $0: 'p8'
  _: ['run'] & string[]
}>

export async function handler(args: Args) {
  // args._.slice(1) is a list of PICO-8 switches. can be pass with a trailing --
  const [cmd, ...switches] = args._
  console.log(cmd, args, switches)
}
