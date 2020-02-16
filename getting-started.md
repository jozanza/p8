Getting Started with p8
-----------------------

To start out, create your project directory. Then from inside of your project directory, follow these instructions:

### 1. Create a p8.json

This is the main file required for managing your project and its dependencies. Running `p8 init` will help you interactively create this file.
> 💡 run ```p8 init --help``` for more info

### 2. Add your dependencies

The path to local or remote `.lua` or `.moon` modules goes in the `dependencies` section of your **p8.json**. The path to local or remote `.png`, `.jpg`, or `.gif` sprites goes in the `gfxDependencies` section of your **p8.json**.

Adding either kind of dependency can be done easily by running `p8 add <path/to/my/dependency>`. Add as many or as few dependencies as you want (just be careful not to exceed the cartridge size and token limits). If you need some modules to test with, I've started posting some of my own in my [pico_modules repo](https://github.com/jozanza/pico_modules). Be sure to add raw urls.
> 💡 run ```p8 add --help``` for more info

### 3. Install your dependencies

The actual code for your dependencies lives inside a **pico_modules** dir in the top level of your project. `p8 install` will automatically create this folder and save your dependencies inside it.
> 💡 run ```p8 install --help``` for more info

### 4. Run your cart!

First, add some code to your entry point (the file listed as `main` in your **p8.json**).
Next run `p8 start -w` to run your cartridge in watch mode to automatically reload as you edit your entry point.
> 💡 run ```p8 start --help``` for more info

Congrats -- now you can code efficiently with PICO-8! Go tell you friends 👌
