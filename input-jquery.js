/*global module, define, require */
(function(name, global, definition) {
  'use strict';

  if( typeof module === 'object' && typeof require === 'function' ) {
    module.exports = definition(require('jquery'));
  } else if( typeof define === 'function' && typeof define.amd === 'object' ) {
    define(['jquery'], definition);
  } else {
    var def = definition(global.jQuery), old = global[name];
    def.noConflict = function() {
      global[name] = old;
    };
    global[name] = def;
  }

}('Input', (typeof window !== 'undefined' && window) || this, function(jQuery) {
  /*jshint validthis: true*/
  'use strict';

  function Input(lineedit, $elem) {
    this.input = function(code, chr) { lineedit.trigger('input', code, chr); };
    $elem.on('keypress', jQuery.proxy(this.keypress, this));
    $elem.on('keydown', jQuery.proxy(this.keydown, this));
  }

  var codes = {
    8: 'Rubout'
  , 9: 'Tab'
  , 10: 'Newline'
  , 13: 'Return'
  , 27: 'Escape'
  , 32: 'Space'
  , 33: 'PageUp'
  , 34: 'PageDown'
  , 35: 'End'
  , 36: 'Home'
  , 37: 'Left'
  , 38: 'Up'
  , 39: 'Right'
  , 40: 'Down'
  , 45: 'Insert'
  , 46: 'Delete'
  };

  function keycode(event) {
    var m = (event.altKey ? 'A-' : '') +
            (event.ctrlKey ? 'C-' : '') +
            (event.metaKey ? 'M-' : '')
      , c = (codes[event.which] || String.fromCharCode(event.shiftKey ? event.which : event.which+32));

    if (m+c == 'C-1')
      return 'Ctrl';
    else if (m+c == 'A-2')
      return 'Alt';
    else if (m+c == 'M-{')
      return 'Meta';
    else if (event.shift && event.which == 16)
      return 'Shift';
    else
      return (m.length > 0 || c.length > 1) ? m + c : undefined;
  }

  Input.prototype = {
    constructor: Input
  , keypress: function(event) {
      if (event.which >= 32)
        this.input(String.fromCharCode(event.which), String.fromCharCode(event.which));
    }
  , keydown: function(event) {
      var code = keycode(event);
      if (code) {
        this.input(code, String.fromCharCode(event.which));
        event.preventDefault();
      }
    }
  };

  return Input;
}));
