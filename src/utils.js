const curry = exports.curry = (f, a = []) => (...b) => {
  const c = [...a, ...b]
  return f.length > c.length
    ? curry(f, c)
    : f(...c)
}

const compose = exports.compose = (...fs) => (...args) => !fs.length
  ? args[0]
  : compose(...fs.slice(0, fs.length - 1))(fs[fs.length - 1](...args))

const ifelse = exports.ifelse = curry(
  (f, a, b, x) => f(x) ? a(x) : b(x)
)

const id = exports.id = x => x

const val = exports.val = x => () => x

const tap = exports.tap = curry(
  (f, x) => (f(x), x)
)

const date = exports.date = (
  () => (new Date()).toLocaleString()
)

const prop = exports.prop = curry(
  (k, o) => o[k]
)

const map = exports.map = curry(
  (f, xs) => xs.map(f)
)

const reduce = exports.reduce = curry(
  (f, a, xs) => xs.reduce(f, a)
)

const filter = exports.filter = curry(
  (f, xs) => xs.filter(f)
)

const modifyIndex = exports.modifyIndex = curry(
  (i, f, xs) => {
    let v = xs.slice()
    v[i] = f(v)
    return v
  }
)

const toPairs = exports.toPairs = (
  o => Object.keys(o).map(k => [k, o[k]])
)

const truthy = exports.truthy = (
  x => !!x
)

const falsey = exports.falsey = (
  x => !x
)

const toString = exports.toString = (
  x => '' + x
)

const trim = exports.trim = (
  x => x.trim()
)

const split = exports.split = curry(
  (x, str) => str.split(x)
)

const join = exports.join = curry(
  (x, str) => str.join(x)
)

const lowercase = exports.lowercase = (
  str => str.toLowerCase()
)

const prepend = exports.prepend = curry(
  (a, b) => `${a}${b}`
)

const sandwich = exports.sandwich = curry(
  (a, b, c) => `${a}${c}${b}`
)

const indent = exports.indent = curry(
  (a, b) => compose(
    join('\n'),
    map(prepend(a)),
    split('\n')
  )(b)
)

const intoLuaFunction = exports.intoLuaFunction = compose(
  sandwich('function()\n', '\nend'),
  indent('  '),
  trim
)

const intoLuaTableProp = exports.intoLuaTableProp = reduce(
  (out, x) => out ? `${out}${x};` : `['${x}'] = `, ''
)

const intoLuaTable = exports.intoLuaTable = compose(
  sandwich('{\n', '\n}'),
  indent('  '),
  join('\n'),
  map(intoLuaTableProp)
)

const intoRequreFunction = exports.intoRequireFunction = (x = '') => (
`(function(requires)
  modules = {}
  return function(name)
    if not modules[name] then
      modules[name] = requires[name]()
    end
    return modules[name]
  end
end)(${x})`
)

// side effects

const readSync = exports.readSync = (
  x => 'http' === x.substr(0, 4)
    ? require('child_process').execSync(`curl -# ${x}`)
    : require('fs').readFileSync(x)
)

const isMoonScript = exports.isMoonScript = (
  x => require('path').extname(x) === '.moon'
)

const compileMoonScript = exports.compileMoonScript = (
  x => require('child_process').execSync(`echo "${x}" | moonc --`)
)

const createModulesDir = exports.createModulesDir = (
  () => require('child_process').execSync(`mkdir -p pico_modules`)
)

const installPicoModules = exports.installPicoModules = compose(
  map(compose(
    tap(([k, v]) => require('fs').writeFileSync(`./pico_modules/${k}.lua`, v)),
    modifyIndex(1, compose(
      ifelse(
        compose(truthy, prop(2)),
        compose(compileMoonScript, prop(1)),
        prop(1)
      )
    )),
    modifyIndex(1, compose(
      readSync,
      prop(1)
    )),
    modifyIndex(2, compose(
      isMoonScript,
      prop(1)
    )),
    tap(([k, v]) => console.log(`Installing ${k}`))
  )),
  toPairs,
  prop('dependencies'),
  tap(createModulesDir)
)

const compilePicoRequire = exports.compilePicoRequire = compose(
  intoRequreFunction,
  intoLuaTable,
  map(modifyIndex(1, compose(
    intoLuaFunction,
    toString,
    readSync,
    sandwich('./pico_modules/', '.lua'),
    prop(0)
  ))),
  toPairs,
  prop('dependencies')
)

exports.default = module.exports
