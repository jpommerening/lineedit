/*global module, define, require */
(function(name, global, definition) {
  'use strict';

  if( typeof module === 'object' && typeof require === 'function' ) {
    module.exports = definition();
  } else if( typeof define === 'function' && define.amd ) {
    define(definition);
  } else {
    var def = definition(), old = global[name];
    def.noConflict = function() {
      global[name] = old;
    };
    global[name] = def;
  }

}('Binding', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  var defaults = {
    'Delete': 'delete-char'
  , 'Return': 'accept-line'
  , 'Rubout': 'backward-delete-char'
  , 'PageUp': 'history-search-backward'
  , 'PageDown': 'history-search-forward'
  , 'End': 'end-of-line'
  , 'Home': 'beginning-of-line'
  , 'Left': 'backward-char'
  , 'Up': 'previous-history'
  , 'Right': 'forward-char'
  , 'Down': 'next-history'
  , 'Tab': 'complete'
  , 'A-Left': 'backward-word'
  , 'A-Right': 'forward-word'
  , 'M-f': 'forward-word'
  , 'M-b': 'backward-word'
  , 'C-k': 'kill-line'
  , 'C-x Rubout': 'backward-kill-line'
  , 'C-u': 'unix-line-discard'
  , 'M-d': 'kill-word'
  , 'M-Delete': 'backward-kill-word'
  , 'C-w': 'unix-word-rubout'
  , 'C-y': 'yank'
  , 'M-y': 'yank-pop'
  , 'Up Up Down Down Left Right Left Right b a': 'konami-code'
  , '': function(code, chr) {
      if (code[1] !== '-')
        this.trigger('self-insert', chr);
    }
  };

  function matchSequence(bindings, sequence) {
    var seq
      , off = 0;
    while (sequence.length) {
      for (var seq in bindings) if (bindings.hasOwnProperty(seq)) {
        if (seq.substr(0, sequence.length) == sequence) {
          return sequence;
        }
      }

      off = sequence.indexOf(' ');
      if (off == -1)
        return '';
      sequence = sequence.substr(off+1);
    }
  }

  function Binding(lineedit) {
    var bindings = defaults
      , sequence = ''
      , timeout = undefined;

    function input(code, chr) {
      if (sequence)
        sequence += ' ' + code;
      else
        sequence = code;

      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }

      sequence = matchSequence(bindings, sequence);
      if (typeof bindings[sequence] === 'function')
        bindings[sequence].call(lineedit, code, chr);
      else if (typeof bindings[sequence] === 'string')
        lineedit.trigger(bindings[sequence]);

      if (sequence) {
        timeout = setTimeout(function() {
          sequence = '';
          timeout = undefined;
        }, 500); /* combo timeout */
      }
    }

    lineedit.on('input', input);

    this.bindings = bindings;
    this.input = input;
  }

  Binding.prototype = {
    constructor: Binding
  , add: function(sequence, name) {
      if (typeof sequence === 'object') {
        for (var s in sequence)
          if (sequence.hasOwnProperty(s))
            this.bindings[s] = sequence[s];
      } else {
        this.bindings[sequence] = name;
      }
    }
  , remove: function(sequence) {
      if (typeof sequence === 'array') {
        for (var i=sequence.length-1; i>=0; i--)
          delete this.bindings[sequence[i]];
      } else {
        delete this.bindings[sequence];
      }
    }
  };

  return Binding;
}));
