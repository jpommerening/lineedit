/*global module, define, require */
(function(name, global) {
  'use strict';

  if( typeof module === 'object' && typeof require === 'function' ) {
    module.exports = require('input-node');
  } else if( typeof define === 'function' && typeof define.amd === 'object' ) {
    define(['input-jquery'], function(Input) { return Input; });
  }

}());
