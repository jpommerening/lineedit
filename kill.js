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

}('Kill', (typeof window !== 'undefined' && window) || this, function(name, global) {
  /*jshint validthis: true*/
  'use strict';

  function Kill(lineedit) {
    var ring = []
      , last = -1;

    function kill(start, end) {
      var killed = lineedit.delete(start, end);
      if (killed)
        ring.push(killed);
      last = ring.length - 1;
    }

    function yank(num) {
      last = num = (num || last);
      if (num >= 0)
        lineedit.trigger('self-insert', ring[num]);
    }

    function pop() {
      if (--last < 0)
        last = ring.length - 1;
    }

    function killMove(move) {
      var cursor = this.cursor;
      this.one('move', function(col) {
        if (cursor < col) {
          kill(cursor, col);
          this.move(cursor);
        } else {
          kill(col, cursor);
        }
      });
      this.trigger(move);
    }

    lineedit.on('kill-line', function() {
      kill(this.cursor, this.line.length);
    });

    lineedit.on('backward-kill-line', function() {
      kill(0, this.cursor);
      this.move(0);
    });

    lineedit.on('unix-line-discard', function() {
      kill(0, this.cursor);
      this.move(0);
    });

    lineedit.on('kill-whole-line', function() {
      kill(0, this.line.length);
    });

    lineedit.on('kill-word', function() {
      killMove.call(this, 'forward-word');
    });

    lineedit.on('backward-kill-word', function() {
      killMove.call(this, 'backward-word');
    });

    lineedit.on('shell-kill-word', function() {
      killMove.call(this, 'shell-forward-word');
    });

    lineedit.on('shell-backward-kill-word', function() {
      killMove.call(this, 'shell-backward-word');
    });

    lineedit.on('unix-word-rubout', function() {
      killMove.call(this, 'backward-word');
    });

    lineedit.on('yank', function() {
      yank();
    });

    lineedit.on('yank-pop', function() {
      pop();
      yank();
    });

    this.kill = kill;
    this.yank = yank;
    this.pop = pop;
  }

  return Kill;
}));
