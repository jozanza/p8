const test = require('ava')
const utils = require('./utils')

test('curry', t => {
  const { curry } = utils
  const f = curry((a, b, c) => a + b + c)
  t.is(f(1)(2)(3), f(1, 2, 3))
  t.is(f(1, 2)(3), f(1, 2, 3))
  t.is(f(1)(2, 3), f(1, 2, 3))
})

test('compose', t => {
  const {
    compose,
    join,
    map,
    split,
    lowercase
  } = utils
  const f = compose(
    join('bar'),
    map(lowercase),
    split(' ')
  )
  t.is(
    f('FOO FOO FOO'),
    'foobarfoobarfoo'
  )
})

test('tap', t => {
  const { tap } = utils
  const f = tap(() => 42)
  t.is(f(1), 1)
  t.is(f('foo'), 'foo')
  t.is(f(true), true)
})

test('date', t => {
  const { date } = utils
  const f = date
  t.is(typeof f(), 'string')
})

test('prop', t => {
  const { prop } = utils
  const f = prop('foo')
  const a  = { foo: 'bar' }
  t.is(f(a), 'bar')
})

test('map', t => {
  const { map } = utils
  const f = map(x => x * 10)
  t.deepEqual(
    f([1, 2, 3]),
    [10, 20, 30]
  )
})

test('reduce', t => {
  const { reduce } = utils
  const f = reduce((a, b) => a + b, 0)
  t.is(
    f([1, 2, 3]),
    6
  )
})

test('filter', t => {
  const { filter, truthy } = utils
  const f = filter(truthy)
  t.deepEqual(
    f([0, 1, 2, 3, false, NaN, null]),
    [1, 2, 3]
  )
})

test('toPairs', t => {
  const { toPairs } = utils
  const f = toPairs
  const a = {
    a: 1,
    b: 2,
    c: 3
  }
  const b = [
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ]
  t.deepEqual( f(a), b)
})

test('truthy', t => {
  const { truthy } = utils
  const f = truthy
  t.is(f(0), false)
  t.is(f(1), true)
  t.is(f('') ,false)
  t.is(f(' '), true)
  t.is(f(null), false)
  t.is(f(NaN), false)
  t.is(f([]), true)
  t.is(f({}), true)
})

test('falsey', t => {
  const { falsey } = utils
  const f = falsey
  t.is(f(0), true)
  t.is(f(1), false)
  t.is(f('') ,true)
  t.is(f(' '), false)
  t.is(f(null), true)
  t.is(f(NaN), true)
  t.is(f([]), false)
  t.is(f({}), false)
})

test('trim', t => {
  const { trim } = utils
  const f = trim
  t.is(f('  foo  '), 'foo')
  t.is(f(`
trololololololol
    `),
  'trololololololol'
  )
})

test('split', t => {
  const { split } = utils
  const f = split(' ')
  t.deepEqual(
    f('hello, world'),
    ['hello,','world']
  )
})

test('join', t => {
  const { join } = utils
  const f = join(' ')
  t.deepEqual(
    f(['hello,','world']),
    'hello, world'
  )
})

test('lowercase', t => {
  const { lowercase } = utils
  const f = lowercase
  t.is(f('YO'), 'yo')
})

test('prepend', t => {
  const { prepend } = utils
  const f = prepend('foo')
  t.is(f('bar'), 'foobar')
})

test('indent', t => {
  const { indent } = utils
  const f = indent('  ')
  const a =
`
1
  2
3
`
  const b =
`  
  1
    2
  3
  `
  t.is(f(a), b)
})

test('intoLuaFunction', t => {
  const { intoLuaFunction } = utils
  const f = intoLuaFunction
  const a =
`
return {
  foo = function()
    print('bar')
  end
}
`
  const b =
`function()
  return {
    foo = function()
      print('bar')
    end
  }
end`
  t.is(f(a), b)
})

test('intoLuaTableProp', t => {
  const { intoLuaTableProp } = utils
  const f = intoLuaTableProp
  const a =
`function()
  print('bar')
end`
  const b = 
`['foobar'] = function()
  print('bar')
end;`
  t.is(f(['foobar', a]), b)
})

test('intoLuaTable', t => {
  const { intoLuaTable } = utils
  const f = intoLuaTable
  const a = [
    ['foo', `function()
  -- noop
end`],
    ['bar', '42'],
    ['baz', '"yippee!"'],
    ['qux', '{"a", "b", "c", 1, 2, 3, function() end}']
  ]
  const b =
`{
  ['foo'] = function()
    -- noop
  end;
  ['bar'] = 42;
  ['baz'] = "yippee!";
  ['qux'] = {"a", "b", "c", 1, 2, 3, function() end};
}`
  t.is(f(a), b)
})

test('intoRequireFunction', t => {
  const { intoRequireFunction } = utils
  const f = intoRequireFunction
  const a = 
`{
  ['foo'] = function()
    -- noop
  end;
  ['bar'] = 42;
  ['baz'] = "yippee!";
  ['qux'] = {"a", "b", "c", 1, 2, 3, function() end};
}`
  const b =
`(function(requires)
  modules = {}
  return function(name)
    if not modules[name] then
      modules[name] = requires[name]()
    end
    return modules[name]
  end
end)({
  ['foo'] = function()
    -- noop
  end;
  ['bar'] = 42;
  ['baz'] = "yippee!";
  ['qux'] = {"a", "b", "c", 1, 2, 3, function() end};
})`
  t.is(f(a), b)
})

