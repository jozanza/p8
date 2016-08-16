#!/usr/bin/env node

const program = require('commander')

program
  .command('build [name]')
  .description('outputs .p8 file with specified name (defaults to name prop in p8.json)')
  .parse(process.argv)

const p8json = require(`${process.cwd()}/p8.json`)
const { compilePicoRequire } = require('./utils')
console.log(
  compilePicoRequire(p8json)
)