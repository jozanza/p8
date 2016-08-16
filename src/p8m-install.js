#!/usr/bin/env node

const program = require('commander')

program
  .command('install')
  .description('installs dependencies in ./pico_modules')
  .parse(process.argv)

const p8json = require(`${process.cwd()}/p8.json`)
const { installPicoModules } = require('./utils')
installPicoModules(p8json)