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

}('Events', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  function delItem(ary, item) {
    if (typeof item === undefined)
      return undefined;
    else if (typeof ary === 'undefined')
      return ary;
    else
      delete ary[ary.indexOf(item)];
    return ary;
  }

  function on(callbacks, name, cb) {
    if (typeof name == 'object')
      for (var n in name) if (name.hasOwnProperty(n))
        on(callbacks, n, name[n]);
    if (!callbacks.hasOwnProperty(name))
      callbacks[name] = [];
    callbacks[name].push(cb);
  }

  function off(callbacks, name, cb) {
    if (typeof name === 'function') {
      cb = name;
      name = undefined;
    }
    if (typeof name === 'undefined') {
      for (var name in callbacks) if (callbacks.hasOwnProperty(name))
        callbacks[name] = delItem(callbacks[name], cb);
    } else {
      callbacks[name] = delItem(callbacks[name], cb);
    }
    if (!callbacks[name])
      delete callbacks[name];
  }

  function many(callbacks, name, num, cb) {
    on(callbacks, name, function wrap() {
      if (--num === 0)
        off(callbacks, name, wrap);
      cb.apply(this, arguments);
    });
  }

  function once(callbacks, name, cb) {
    return many(callbacks, name, 1, cb);
  }

  function trigger(callbacks, name, that, args) {
    if (callbacks.hasOwnProperty(name))
      for (var i=callbacks[name].length-1; i>=0; i--)
        callbacks[name][i].apply(that, args);
  }

  function EventHandler() {
    var callbacks = {}
      , that = this;

    this.on = function(name, cb) { return on(callbacks, name, cb); };
    this.off = function(name, cb) { return off(callbacks, name, cb); };
    this.once = function(name, cb) { return once(callbacks, name, cb); };
    this.many = function(name, num, cb) { return many(callbacks, name, num, cb); };
    this.one = this.once;
    this.trigger = function(name) { return trigger(callbacks, name, that, [].slice.call(arguments, 1)); };

    this.addListener = this.on;
    this.removeListener = this.off;
  }

  return EventHandler;

}));
