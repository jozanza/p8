#!/usr/bin/env node

const pjson = require('../package')
const program = require('commander')

program
  .version(pjson.version)
  .command('install',      'installs dependencies')
  .command('build [name]', 'builds [name].p8')
  .parse(process.argv)

// const {
//   installPicoModules,
//   compilePicoRequire
// } = require('./utils');

// const p8json = require(`${process.cwd()}/p8.json`)

// // installPicoModules(p8json)

// console.log(
//   compilePicoRequire(p8json)
// )