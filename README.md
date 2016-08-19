# p8

[![Build Status](https://api.travis-ci.org/jozanza/p8.svg?branch=master)](http://travis-ci.org/jozanza/p8)
[![NPM Version](http://img.shields.io/npm/v/p8.svg?style=flat)](https://www.npmjs.org/package/p8)
[![NPM Downloads](https://img.shields.io/npm/dm/p8.svg?style=flat)](https://www.npmjs.org/package/p8)

:space_invader: PICO-8 dependency manager

> **NOTE:** This project is still in a very early stage. Feel free to open issues or hmu on [twitter](https://twitter.com/jozanza) :)

## Why?

I got tired of copy-pasting code from carts and using PICO-8's built-in IDE pretty quickly. This tool lets you reuse local and remote lua/moonscript modules and streamlines the process of reloading your cartridges as you develop.

**tl;dr**:

- Share code for carts via github (or any file host)
- Use `require()` to use modules in your own carts
- Keep coding in your favorite IDE
- Auto-reload carts while coding

## Installation

##### `npm install -g p8`

> **NOTE:** I haven't done any cross-platform testing yet, so make sure you are on OSX and are running node.js v6.
> Additionally, if you want support for moonscript, be sure to install [moonc](http://moonscript.org/#installation)

## Getting Started

To start out, create your project directory. Then from inside of your project directory, follow these instructions:

#### 1. Create a p8.json

This is the main file required for managing your project and its dependencies. Running `p8 init` will help you interactively create this file.
> :bulb: run ```p8 init --help``` for more info

#### 2. Add your dependencies

The path to local or remote `.lua` or `.moon` modules goes in the `dependencies` section of your **p8.json**. You can do this easily by running `p8 add <path/to/my/dependency>`. Add as many or as few dependencies as you want (just be careful not to exceed the cartridge size and token limits).
> :bulb: run ```p8 add --help``` for more info

#### 3. Install your dependencies

The actual code for your dependencies lives inside a **pico_modules** dir in the top level of your project. `p8 install` will automatically create this folder and save your dependencies inside it.
> :bulb: run ```p8 install --help``` for more info

#### 4. Run your cart!

First, add some code to your entry point (the file listed as `main` in your **p8.json**).
Next run `p8 start -w` to run your cartridge in watch mode to automatically reload as you edit your entry point.
> :bulb: run ```p8 start --help``` for more info

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
