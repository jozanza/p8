# p8

[![Build Status](https://api.travis-ci.org/jozanza/p8.svg?branch=master)](https://travis-ci.org/jozanza/p8)
[![NPM Version](https://img.shields.io/npm/v/p8.svg?style=flat)](https://www.npmjs.org/package/p8)
[![NPM Downloads](https://img.shields.io/npm/dm/p8.svg?style=flat)](https://www.npmjs.org/package/p8)

👾 PICO-8 dependency manager

Import lua/moonscript modules, spritesheets, and automatically reload your carts as you code.

## Features:

- Share **code** and **sprites** (via github or any file host)
- Use **`require()`** to use modules in your own carts
- Code in **any IDE** you want
- **Auto-reload** carts on save

<br />

## Installation

### Download the executable

You can grab the executable for your platform from [**releases page** &rarr;](./releases)

<sup>- On macOS or linux, you may want to copy the executable into `/usr/bin`.</sup><br />
<sup>- On windows, you may want to add the executable to your PATH.</sup>

### NPM

Or you can use good old npm

```sh
npm i -g p8
```

<br />

## Getting Started

You can be up-and-running in a few quick steps.

### 1. Initialize your project

Create and/or adds basic fields to p8.json.

```
p8 init
```

### 2. Add Dependencies

Add .lua, .moon, .png, .jpg, or .gif files.

```
p8 add [file|url...]
```

### 3. Run your cartridge

Use the `--watch` flag to automatically reload whenever the entry-point is saved. This command will automatically install and build if you haven't already.

```
p8 run
```

## Usage

```
Usage: p8 <command> [options]

Commands:
  p8 add [file|url...]  add modules as "dependencies" or "gfxDependencies" in p8.json.
  p8 build              outputs a cart (.p8 file)
  p8 init               initialize the project
  p8 install            install dependencies listed in p8.json to ./pico_modules
  p8 run                runs a .p8 cartridge (PICO-8 switches can be passed after a trailing --)
Options:
  --version  Show version number
  --help     Show help
```

> **If you want a detailed walkthrough, read [Getting Started with p8 &rarr;](./getting-started.md).<br />**

> **If you want more examples, [check out the examples &rarr;](./examples)**