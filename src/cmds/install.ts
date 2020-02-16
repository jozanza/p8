import { Arguments, CommandBuilder } from 'yargs'

export const command = 'install'

export const describe =
  'install dependencies listed in p8.json to ./pico_modules'

export const builder: CommandBuilder = {}

type Args = Arguments<{
  $0: 'p8'
  _: ['install'] & string[]
}>

export async function handler(args: Args) {
  console.log(command, args)
}
