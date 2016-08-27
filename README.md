# p8

[![Build Status](https://api.travis-ci.org/jozanza/p8.svg?branch=master)](http://travis-ci.org/jozanza/p8)
[![NPM Version](http://img.shields.io/npm/v/p8.svg?style=flat)](https://www.npmjs.org/package/p8)
[![NPM Downloads](https://img.shields.io/npm/dm/p8.svg?style=flat)](https://www.npmjs.org/package/p8)

:space_invader: PICO-8 dependency manager

> **NOTE:** This project is still in a very early stage. Feel free to open issues or hmu on [twitter](https://twitter.com/jozanza) :)

## Why?

I got tired of copy-pasting code from carts and using PICO-8's built-in IDE pretty quickly. This tool lets you reuse local and remote lua/moonscript modules and streamlines the process of reloading your cartridges as you develop.

### Features:

- Share **code** and **sprites** (via github or any file host)
- Use **`require()`** to use modules in your own carts
- Code in **any IDE** you want
- **Auto-reload** carts on save

## Installation

#### `npm install -g p8`

> **NOTE:** I haven't done any cross-platform testing yet, so make sure you are on OSX and are running node.js v6.
> Additionally, if you want support for moonscript, be sure to install [moonc](http://moonscript.org/#installation)

## Setup

It's just a few steps to get up and running. Altogether, it should only take a couple minutes :beers:.

### [Read Getting Started with p8 &raquo;](https://github.com/jozanza/p8/blob/master/getting-started.md)


You might also want to check out the **[example p8 project](https://github.com/jozanza/p8_example)** and get familiar with the fields used in **[p8.json](https://github.com/jozanza/p8/blob/master/p8.json.md)**.


## Usage

```
  Usage: p8 <cmd> [options]

  Commands:

    init              initialize project
    add [modules...]  add dependencies
    install           install dependencies
    build [name]      build a cartridge
    start [options]   run the built cartridge (OSX-only)
    help [cmd]        display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```
## Credits

`p8` is **heavily** inspired by [npm](https://npmjs.com/) and, to a lesser extent, [webpack](https://webpack.github.io/)

I also borrowed a lot from my prior art -- a similar tool called [picomoon](https://github.com/jozanza/picomoon)
