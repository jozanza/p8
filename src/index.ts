import yargs from 'yargs'

enum Command {
  add = 'add',
  build = 'build',
  init = 'init',
  install = 'install',
  run = 'run',
}

export default async function main() {
  // prettier-ignore
  const {_:[command]} = await yargs
    .scriptName('p8')
    .version(require('../package').version)
    .usage('Usage: p8 <command> [options]')
    .commandDir('cmds')
    .wrap(100)
    .help()
    .argv
  // prettier-ignore
  switch (command) {
    default:
      if (command) {
        console.log(`p8: '${command}' is not a p8 command. See 'p8 --help'.\n`)
      } else {
        yargs.showHelp()
      }
    case Command.add:
    case Command.build:
    case Command.init:
    case Command.install: {
      process.exit(0)
    }
    case Command.run: break
  }
}
