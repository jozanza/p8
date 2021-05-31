import { CommandBuilder, Arguments } from 'yargs'
import fs from 'fs'
import path from 'path'
import { spawn, execSync } from 'child_process'
import { exists, getProjectConfig, readFile } from '../common'
import { handler as install } from './install'
import { handler as build } from './build'

export const command = 'run'

export const describe =
  'runs a .p8 cartridge (PICO-8 switches can be passed after a trailing --)'

export const builder: CommandBuilder = {
  watch: {
    alias: 'w',
    type: 'boolean',
    default: false,
    describe: 'reload cartridge whenever entry point is updated',
  },
  cart: {
    alias: 'c',
    type: 'string',
    describe:
      'the name of the cart to run (uses name field in p8.json by default)',
  },
}

type Args = Arguments<{
  watch?: boolean
  cart?: string
  $0: 'p8'
  _: string[]
}>

export async function handler({ watch, cart, _: [_, ...switches] }: Args) {
  const config = await getProjectConfig()
  let didInstall = false
  if (!exists('./pico_modules')) {
    await install({
      $0: 'p8',
      _: ['install'],
    })
    didInstall = true
  }
  const filename = `${cart ?? config.name}.p8`
  if (didInstall || !exists(filename)) {
    await build({
      print: false,
      out: cart ?? config.name,
      $0: 'p8',
      _: ['build'],
    })
  }

  console.log(`Running ${filename}`)
  const pico8 = spawn(`/Applications/PICO-8.app/Contents/MacOS/pico8`, [
    '-run',
    ...switches,
    filename,
  ] as readonly string[])
  pico8.stdout.on('data', (x: string) => console.log(x))
  pico8.stderr.on('data', (x: string) => console.error(x))

  if (!watch) {
    process.exit(0)
  }

  const runApplescript = (script: string) =>
    execSync(`osascript -e '${script}'`)
  const reloadCart = `tell application "PICO-8" to activate
tell application "System Events"
  key code 53
  "load ${path.resolve('./', filename)}"
  key code 36
  delay .3
  key code 15 using control down
end tell
tell application "System Events" to keystroke tab using command down
`
  const idleMessage = 'waiting for changes...(Press ^C at any time to quit.)'

  console.log(idleMessage)
  let isBuilding = false
  let prev = ''
  fs.watch(config.main, async (e, x) => {
    if (isBuilding) return
    if (e !== 'change') return
    try {
      const next = (await readFile(config.main)).toString()
      if (prev === next) return
      prev = next
      isBuilding = true
      console.log(`${x} changed`)
      console.clear()
      console.log(`...building ${filename}`)
      console.clear()
      await build({
        print: false,
        out: cart ?? config.name,
        $0: 'p8',
        _: ['build'],
      })
      console.log('reloading...')
      runApplescript(reloadCart)
      console.clear()
      console.log(idleMessage)
    } catch (err) {
      console.error(err)
    } finally {
      isBuilding = false
    }
  })
}
