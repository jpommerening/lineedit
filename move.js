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

}('Move', (typeof window !== 'undefined' && window) || this, function() {
  /*jshint validthis: true*/
  'use strict';

  function beginningOfLine() {
    this.move(0);
  }

  function endOfLine() {
    this.move(this.line.length);
  }

  function forwardChar() {
    if (this.cursor < this.line.length) this.move(this.cursor+1);
  }

  function backwardChar() {
    if (this.cursor > 0) this.move(this.cursor-1);
  }

  function forwardWord() {
    var offset = this.line.indexOf(' ', this.cursor+1);
    if (offset < 0)
      endOfLine.call(this);
    else
      this.move(offset);
  }

  function backwardWord() {
    var offset = this.line.lastIndexOf(' ', this.cursor-2);
    if (offset < 0)
      beginningOfLine.call(this);
    else
      this.move(offset+1);
  }

  function shellForwardWord() {
  }

  function shellBackwardWord() {
  }

  function Move(lineedit) {
    lineedit.on('beginning-of-line', beginningOfLine);
    lineedit.on('end-of-line', endOfLine);
    lineedit.on('forward-char', forwardChar);
    lineedit.on('backward-char', backwardChar);
    lineedit.on('forward-word', forwardWord);
    lineedit.on('backward-word', backwardWord);
    lineedit.on('shell-forward-word', shellForwardWord);
    lineedit.on('shell-backward-word', shellBackwardWord);
  }

  return Move;
}));
