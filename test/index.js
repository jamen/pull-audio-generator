
var test = require('tape')
var { pull, drain, collect } = require('pull-stream')
var generate = require('../')

test('generates audio', t => {
  t.plan(2)

  pull(
    generate(Math.random, {
      duration: 2,
      samplesPerFrame: 1024
    }),
    collect((err, data) => {
      t.false(err, 'got no error')
      t.is(data.length, 86, 'got buffers')
    })
  )
})

test('aborts manually', t => {
  t.plan(1)

  var generator = generate(time => [
    Math.sin(Math.PI * 2 * time * 500),
    Math.random()
  ], {
    duration: Infinity
  })

  // something is wrong with this method
  // probably because stream is sync
  //
  // setTimeout(function () {
  //   generator.abort()
  // }, 1000)

  var count = 0

  pull(
    generator,
    drain(data => {
      if (++count > 3) {
        generator.abort()
      }
    }, t.false)
  )
})
