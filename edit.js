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

}('Edit', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  function deleteChar(num) {
    var cursor = this.cursor;
    if (typeof num === 'undefined') num = 1;
    if (cursor + num > this.line.length) num = this.line.length - cursor;

    if (num > 0) {
      this.splice(cursor, cursor+num);
    }
  }

  function backwardDeleteChar(num) {
    var cursor = this.cursor;
    if (typeof num === 'undefined') num = 1;
    if (cursor < num) num = cursor;

    if (num > 0) {
      this.splice(cursor-num, cursor);
      this.move(cursor-num);
    }
  }

  function forwardBackwardDeleteChar() {
    if (this.cursor >= this.line.length)
      backwardDeleteChar.call(this);
    else
      deleteChar.call(this);
  }

  function Edit(lineedit) {
    var overwrite = false;

    lineedit.on('delete-char', deleteChar);

    lineedit.on('backward-delete-char', backwardDeleteChar);

    lineedit.on('forward-backward-delete-char', forwardBackwardDeleteChar);

    lineedit.on('self-insert', function(str) {
      var length = overwrite ? str.length : 0;
      this.splice(this.cursor, this.cursor+length, str);
      this.move(this.cursor + str.length);
    });

    lineedit.on('overwrite-mode', function(mode) {
      overwrite = (mode === undefined) ? !(overwrite) : !!(mode);
    });
  }

  return Edit;
}));
