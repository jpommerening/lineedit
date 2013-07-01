module.exports = Input;

function Input(lineedit, stdin) {
  var that = this;

  if (typeof stdin.setRawMode === 'function') {
    stdin.setRawMode(true);
    stdin.on('keypress', function(chunk, key) {
      console.dir(arguments);
    });
  } else {
    require('tty').setRawMode(true);
    stdin.on('keypress', function(chunk, key) {
      that.keypress(key);
    });
  }
  stdin.resume();

  this.input = function(code, chr) { lineedit.trigger('input', code, chr); };
}

var codes = {
  8: 'Rubout'
, 9: 'Tab'
, 10: 'Newline'
, 13: 'Return'
, 27: 'Escape'
, 32: 'Space'
, 127: 'Rubout'
, '\u001b[5~': 'PageUp'
, '\u001b[6~': 'PageDown'
, '\u001b[4~': 'End'
, '\u001b[1~': 'Home'
, '\u001b[D': 'Left'
, '\u001b[A': 'Up'
, '\u001b[C': 'Right'
, '\u001b[B': 'Down'
, '\u001b[2~': 'Insert'
, '\u001b[3~': 'Delete'
};

Input.prototype = {
  constructor: Input
, keypress: function(key) {
    var code = (key.length === 1) ? key[0] : key.toString();
    if (codes.hasOwnProperty(code))
      console.log(codes[code]);
    else
      console.dir(key);
    if (key == '\u0003') {
      process.exit(0);
    }
  }
};

