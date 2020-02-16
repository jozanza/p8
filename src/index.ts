import yargs from 'yargs'

enum Command {
  add = 'add',
  build = 'build',
  init = 'init',
  install = 'install',
  start = 'start',
}

export default function main() {
  // prettier-ignore
  const { _:[command] } = yargs
    .scriptName('p8')
    .version(require('../package').version)
    .usage('Usage: p8 <command> [options]')
    .commandDir('cmds')
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
    case Command.install:
    case Command.start: break
  }
}
