import readline from 'readline'
import {
  CONFIG_PATH,
  getProjectConfig,
  getProjectDirname,
  whoami,
} from '../common'

export const command = 'init'

export const describe = 'initialize the project'

export async function handler() {
  const defaults = await getProjectConfig()
  if (!defaults.name) {
    defaults.name = getProjectDirname()
  }
  if (!defaults.version) {
    defaults.version = '1.0.0'
  }
  if (!defaults.author) {
    defaults.author = (await whoami()) ?? ''
  }
  if (!defaults.main) {
    defaults.main = 'main.lua'
  }

  const ask = createCLI()

  const name = await ask(`project name:`, defaults.name)
  const version = await ask(`version:`, defaults.version)
  const author = await ask(`author:`, defaults.author)
  const description = await ask(`description:`, defaults.description)
  const main = await ask(`entry point:`, defaults.main)

  const values = { ...defaults, name, version, author, description, main }
  const output = JSON.stringify(values, null, 2)

  console.log(`About to write to ${CONFIG_PATH}:\n`)
  console.log(`${output}\n`)

  const yepnope = await ask('Is this OK?', 'yes')
  switch (yepnope) {
    default:
      console.log('Canceled')
      break
    case 'y':
    case 'Y':
    case 'yes':
      // TODO: write file
      console.log('Saved! 🎉')
      break
  }
  process.exit(0)
}

const DISCLAIMER = `
This utility will help you quickly create a p8.json file.
This file will keep track of basic info and the dependencies of your project.

Use \`p8 add <filepath or url>\` afterwards to save dependencies in p8.json.

Press ^C at any time to quit.
`

function createCLI() {
  console.log(DISCLAIMER)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return function ask(prompt: string, defaultValue?: string) {
    return new Promise<string>(resolve => {
      const _defaultValue = defaultValue ? `(${defaultValue}) ` : ''
      rl.question(`${prompt} ${_defaultValue}`, answer =>
        resolve(answer || defaultValue || ''),
      )
    })
  }
}
