/*global module, define, require*/
(function(name, global, definition) {
  'use strict';

  if( typeof module === 'object' && typeof require === 'function' ) {
      module.exports = definition( name, global );
   } else if( typeof define === 'function' && define.amd ) {
      define( definition );
   } else {
      global[ name ] = definition( name, global );
   }

}('LineEdit', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  /* Simple line edit lib */
  function LineEdit(eventSource) {
    var callbacks = []
      , add = eventSource.addListener || eventSource.on
      , remove = eventSource.removeListener || eventSource.off
      , emit = eventSource.emit || eventSource.trigger
      , that = this;
    this.line = '';
    this.cursor = 0;

    function proxy(f) {
      return function() {
        f.apply(that, arguments);
      };
    }

    function addListener(name, callback, wrap) {
      var wrapper = (wrap||proxy)(callback);
      add.call(eventSource, name, wrapper);
      callbacks.push({name: name, callback: callback, wrapper: wrapper});
    }

    function removeListener(name, callback) {
      var result = [];
      for (var i=callbacks.length-1; i>=0; i--) {
        if (typeof name !== 'undefined' && callbacks[i].name !== name)
          continue;
        if (typeof callback != 'undefined' && callbacks[i].callback !== callback)
          continue;
        remove.call(eventSource, callbacks[i].name, callbacks[i].wrapper);
        callbacks.splice(i, 1);
      }
    }

    function emitEvent() {
      emit.apply(eventSource, arguments);
    }

    this.addListener = addListener;
    this.removeListener = removeListener;
    this.emitEvent = emitEvent;
  }

  LineEdit.prototype = {
    constructor: LineEdit
  , on: function on(name, callback) {
      return this.addListener(name, callback);
    }
  , off: function on(name, callback) {
      return this.removeListener(name, callback);
    }
  , many: function many(name, num, callback) {
      var that = this;
      return this.addListener(name, callback, function(f) {
        return function() {
          if (--num === 0)
            that.removeListener(name, callback);
          return f.apply(that, arguments);
        };
      });
    }
  , once: function once(name, callback) {
      return this.many(name, 1, callback);
    }
  , one: function one(name, callback) {
      return this.once(name, callback);
    }
  , trigger: function trigger() {
      return this.emitEvent.apply(this, arguments);
    }
  , emit: function emit() {
      return this.emitEvent.apply(this, arguments);
    }
  , move: function move(col, row) {
      this.trigger('move', col, row);
      this.cursor = col;
    }
  , text: function(str) {
      var prev = this.line;
      if (typeof str === 'string' ) {
        this.trigger('change', str, prev);
        this.line = str;
      }
      return prev;
    }
  , clear: function() {
      this.move(0);
      return this.text('');
    }
  , splice: function splice(start, end, replace) {
      var line = this.text();
      if (typeof start === 'string') {
        replace = start;
        start = this.cursor;
        end   = this.cursor;
      } else if (typeof end === 'string') {
        replace = end;
        end = start;
      } else {
        replace = replace || '';
      }
      this.text( line.substr(0, start) + replace + line.substr(end) );
      return line.substr(start, end-start);
    }
    /* insert( [start = cursor, ] "text" ) */
  , insert: function(start, str) {
      if (typeof str === 'undefined') {
        str = start;
        start = this.cursor;
      }
      return this.splice(start, start, str);
    }
    /* repace( [start = cursor, ] "text" ) */
  , replace: function(start, str) {
      if (typeof str === 'undefined') {
        str = start;
        start = this.cursor;
      }
      return this.splice(start, start+str.length, str);
    }
    /* delete( [start = cursor, [end = line.length]] ) */
  , delete: function(start, end) {
      if (typeof start === 'undefined') start = this.cursor;
      if (typeof end === 'undefined') end = this.line.length;
      return this.splice(start, end, '');
    }
  };

  return LineEdit;
}));
