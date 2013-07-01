/*global module, define, require */
(function(name, global, definition) {
  'use strict';

  if( typeof module === 'object' && typeof require === 'function' ) {
    module.exports = definition();
  } else if( typeof define === 'function' && typeof define.amd === 'object' ) {
    define(definition);
  } else {
    var def = definition(), old = global[name];
    def.noConflict = function() {
      global[name] = old;
    };
    global[name] = def;
  }

}('Completion', (typeof window !== 'undefined' && window) || this, function(name, global) {
  /*jshint validthis: true*/
  'use strict';

  function Completion(lineedit, compgen) {
    var previous = undefined
      , completions = undefined;

    function complete(line, cursor) {
      return compgen.call(this, line, cursor);
    }

    function next(num) {
      if (typeof num === 'undefined') num = 1;
      if (typeof previous === 'undefined') {
        previous = (num>0) ? num-1 : completions.length+num;
      } else {
        previous += num;
      }
      if (previous >= 0 && previous < completions.length)
        return completions[num];

      previous = undefined;
      return undefined;
    }

    function prev(num) {
      if (typeof num === 'undefined') num = 1;
      return next(-num);
    }

    lineedit.on('change', function() {
      completions = undefined;
      previous = undefined;
    });

    lineedit.on('move', function() {
      completions = undefined;
      previous = undefined;
    });

    lineedit.on('complete', function() {
      if (!completions)
        completions = complete(this.line, this.cursor);
      if (completions.length == 1) {
        this.trigger('backward-delete-word');
        this.trigger('self-insert', completions[0]);
      } else {
        this.trigger('possible-completions');
      }
    });

    lineedit.on('possible-completions', function() {
      if (!completions)
        completions = complete(this.line, this.cursor);
      console.log(completions);
      lineedit.trigger('completions', completions);
    });

    lineedit.on('insert-completions', function() {
      if (!completions)
        completions = complete(this.line, this.cursor);
    });

    lineedit.on('menu-complete', function(num) {
      if (!completions)
        completions = complete(this.line, this.cursor);
      var p = previous
        , n = next(num);
      if (typeof str !== 'undefined') {
        this.trigger('backward-delete-word');
        this.trigger('self-insert', n);
      }
    });

    lineedit.on('menu-complete-backward', function(num) {
      if (!completions)
        completions = complete(this.line, this.cursor);
      var p = previous
        , n = prev(num);
      if (typeof str !== 'undefined') {
        this.trigger('backward-delete-word');
        this.trigger('self-insert', n);
      }
    });

    lineedit.on('delete-char-or-list', function() {
      /* I don't get this one, but … ok */
      var cursor = this.cursor;
      if (cursor > 0 && cursor < this.line.length) {
        this.trigger('delete-char');
      } else {
        this.trigger('possible-completions');
      }
    });

    lineedit.on('complete-filename', function() {
    });

    lineedit.on('possible-filename-completions', function() {
    });

    lineedit.on('complete-username', function() {
    });

    lineedit.on('possible-username-completions', function() {
    });

    lineedit.on('complete-variable', function() {
    });

    lineedit.on('possible-variable-completions', function() {
    });

    lineedit.on('complete-hostname', function() {
    });

    lineedit.on('possible-hostname-completions', function() {
    });

    lineedit.on('complete-command', function() {
    });

    lineedit.on('possible-command-completions', function() {
    });

    lineedit.on('dynamic-complete-history', function() {
    });

    lineedit.on('dabbrev-expand', function() {
    });

    lineedit.on('complete-into-braces', function() {
    });
  }

  return Completion;
}));
