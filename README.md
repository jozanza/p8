# p8

[![Build Status](https://api.travis-ci.org/jozanza/p8.svg?branch=master)](http://travis-ci.org/jozanza/p8)
[![NPM Version](http://img.shields.io/npm/v/p8.svg?style=flat)](https://www.npmjs.org/package/p8)
[![NPM Downloads](https://img.shields.io/npm/dm/p8.svg?style=flat)](https://www.npmjs.org/package/p8)

👾 PICO-8 dependency manager

Import lua/moonscript modules, spritesheets, and automatically reload your carts as you code.

## Installation

### [&laquo; Download the exectuables &raquo;](https://github.com/jozanza/p8/releases)
<sup>- On macOS or linux, you may want to copy the executable into `/usr/bin`.</sup><br />
<sup>- On windows, you may want to add the executable to your PATH.</sup>

Or use `npm`

```bash
npm i -g p8
```

> **NOTE:** If you want support for moonscript, be sure to install [moonc](http://moonscript.org/#installation)

## Getting Started

You can be up-and-running in 4 steps. Here's what that looks like on the command line:

```bash
# 1. Initialize
p8 init                  # creates and adds basic fields to p8.json

# 2. Add Dependencies
p8 add <url or filepath> # add .lua, .moon, .png, .jpg, or .gif files

# 3. Install
p8 install               # stores dependencies in a pico_modules folder

# 4. Start
p8 start --watch         # builds + runs your cart. reloads whenever the entry-point is saved
```

> **NOTE:** Run `p8 help` for more detailed information on usage for these commands.

If you want a detailed walkthrough, check out the following resources:

- [Read Getting Started with p8 &raquo;](https://github.com/jozanza/p8/blob/master/getting-started.md)
- [Checkout the p8 Example Project &raquo;](https://github.com/jozanza/p8_example)
