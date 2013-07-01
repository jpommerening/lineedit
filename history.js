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

}('History', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  function History(lineedit) {
    var history = [lineedit.line]
      , previous = lineedit.line
      , top = 0
      , cur = 0;

    function line(num, eol) {
      if (num >= 0 && num <= top) {
        if (cur != top)
          history[cur] = previous;
        cur = num;
        previous = history[cur];
        lineedit.text(history[cur]);
        if (eol) lineedit.move(lineedit.line.length);
      }
      return history[cur];
    }

    function next(eol) {
      return line(cur+1, eol);
    }

    function prev(eol) {
      return line(cur-1, eol);
    }

    lineedit.on('change', function(line) {
      history[cur] = line;
    });

    lineedit.on('accept-line', function() {
      if (history[cur]) {
        if (top != cur) {
          history[top] = history[cur];
          history[cur] = previous;
        }
        history.push('');
        previous = '';
        cur = top = history.length - 1;

        this.text('');
        this.move(0);
      }
    });

    lineedit.on('previous-history', function() {
      prev(true);
    });

    lineedit.on('next-history', function() {
      next(true);
    });

    lineedit.on('beginning-of-history', function() {
      line(0, true);
    });

    lineedit.on('end-of-history', function() {
      line(top, true);
    });

    lineedit.on('reverse-search-history', function() {
    });

    lineedit.on('forward-search-history', function() {
    });

    lineedit.on('history-search-forward', function(prefix) {
      var c = cur;
      prefix = (typeof prefix === 'undefined') ? this.line.substr(0, this.cursor) : prefix;
      while (++c < top) {
        if (history[c].substr(0, prefix.length) === prefix) {
          return line(c, false);
        }
      }
    });

    lineedit.on('history-search-backward', function(prefix) {
      var c = cur;
      prefix = (typeof prefix === 'undefined') ? this.line.substr(0, this.cursor) : prefix;
      while (--c >= 0) {
        if (history[c].substr(0, prefix.length) === prefix) {
          return line(c, false);
        }
      }
    });

    this.line = line;
    this.next = next;
    this.previous = prev;
  }

  return History;
}));
