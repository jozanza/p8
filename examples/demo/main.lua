x = 64  y = 64

-- requiring a dependency
perf = require('perf')

function _update()
  if (btn(0)) then x=x-2 end
  if (btn(1)) then x=x+2 end
  if (btn(2)) then y=y-2 end
  if (btn(3)) then y=y+2 end
end

function _draw()
  rectfill(0, 0, 127, 127, 1)
  circfill(x, y, 7, 8)
  print('memory: '..perf.mem()..'%')
end