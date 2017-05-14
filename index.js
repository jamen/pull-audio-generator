
var generator = require('audio-generator/direct')

module.exports = stream

function stream (fn, options) {
  var generate = generator(fn, options)
  
  // Create source
  var ended, _cb
  function source (end, cb) {
    _cb = cb

    if (ended) return
    if (end) {
      ended = true
      return cb(end)
    }
    
    var buf = generate()
    if (buf) cb(null, buf)
    else cb(true)
  }

  // End stream manually
  source.abort = function (err) {
    ended = true
    if (_cb) _cb(err || true)
  }

  return source
}

