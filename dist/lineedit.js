!function(n,e,t){"object"==typeof module&&"function"==typeof require?module.exports=t(n,e):"function"==typeof define&&define.amd?define("lineedit",t):e[n]=t(n,e)}("LineEdit","undefined"!=typeof window&&window||this,function(){function n(n){function e(n){return function(){n.apply(c,arguments)}}function t(t,i,o){var s=(o||e)(i);f.call(n,t,s),r.push({name:t,callback:i,wrapper:s})}function i(e,t){for(var i=r.length-1;i>=0;i--)("undefined"==typeof e||r[i].name===e)&&("undefined"==typeof t||r[i].callback===t)&&(s.call(n,r[i].name,r[i].wrapper),r.splice(i,1))}function o(){u.apply(n,arguments)}var r=[],f=n.addListener||n.on,s=n.removeListener||n.off,u=n.emit||n.trigger,c=this;this.line="",this.cursor=0,this.addListener=t,this.removeListener=i,this.emitEvent=o}return n.prototype={constructor:n,on:function(n,e){return this.addListener(n,e)},off:function(n,e){return this.removeListener(n,e)},many:function(n,e,t){var i=this;return this.addListener(n,t,function(o){return function(){return 0===--e&&i.removeListener(n,t),o.apply(i,arguments)}})},once:function(n,e){return this.many(n,1,e)},one:function(n,e){return this.once(n,e)},trigger:function(){return this.emitEvent.apply(this,arguments)},emit:function(){return this.emitEvent.apply(this,arguments)},move:function(n,e){this.trigger("move",n,e),this.cursor=n},text:function(n){var e=this.line;return"string"==typeof n&&(this.trigger("change",n,e),this.line=n),e},clear:function(){return this.move(0),this.text("")},splice:function(n,e,t){var i=this.text();return"string"==typeof n?(t=n,n=this.cursor,e=this.cursor):"string"==typeof e?(t=e,e=n):t=t||"",this.text(i.substr(0,n)+t+i.substr(e)),i.substr(n,e-n)},insert:function(n,e){return"undefined"==typeof e&&(e=n,n=this.cursor),this.splice(n,n,e)},replace:function(n,e){return"undefined"==typeof e&&(e=n,n=this.cursor),this.splice(n,n+e.length,e)},"delete":function(n,e){return"undefined"==typeof n&&(n=this.cursor),"undefined"==typeof e&&(e=this.line.length),this.splice(n,e,"")}},n}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&define.amd)define("binding",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Binding","undefined"!=typeof window&&window||this,function(){function n(n,e){for(var t,i=0;e.length;){for(var t in n)if(n.hasOwnProperty(t)&&t.substr(0,e.length)==e)return e;if(i=e.indexOf(" "),-1==i)return"";e=e.substr(i+1)}}function e(e){function i(t,i){r?r+=" "+t:r=t,f&&(clearTimeout(f),f=void 0),r=n(o,r),"function"==typeof o[r]?o[r].call(e,t,i):"string"==typeof o[r]&&e.trigger(o[r]),r&&(f=setTimeout(function(){r="",f=void 0},500))}var o=t,r="",f=void 0;e.on("input",i),this.bindings=o,this.input=i}var t={Delete:"delete-char",Return:"accept-line",Rubout:"backward-delete-char",PageUp:"history-search-backward",PageDown:"history-search-forward",End:"end-of-line",Home:"beginning-of-line",Left:"backward-char",Up:"previous-history",Right:"forward-char",Down:"next-history",Tab:"complete","A-Left":"backward-word","A-Right":"forward-word","M-f":"forward-word","M-b":"backward-word","C-k":"kill-line","C-x Rubout":"backward-kill-line","C-u":"unix-line-discard","M-d":"kill-word","M-Delete":"backward-kill-word","C-w":"unix-word-rubout","C-y":"yank","M-y":"yank-pop","Up Up Down Down Left Right Left Right b a":"konami-code","":function(n,e){"-"!==n[1]&&this.trigger("self-insert",e)}};return e.prototype={constructor:e,add:function(n,e){if("object"==typeof n)for(var t in n)n.hasOwnProperty(t)&&(this.bindings[t]=n[t]);else this.bindings[n]=e},remove:function(n){if("array"==typeof n)for(var e=n.length-1;e>=0;e--)delete this.bindings[n[e]];else delete this.bindings[n]}},e}),"function"==typeof define&&define("jquery-private",["require"],function(n){return n.noConflict(!0)}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t(require("jquery"));else if("function"==typeof define&&"object"==typeof define.amd)define("input",["jquery"],t);else{var i=t(e.jQuery),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Input","undefined"!=typeof window&&window||this,function(n){function e(e,t){this.input=function(n,t){e.trigger("input",n,t)},t.on("keypress",n.proxy(this.keypress,this)),t.on("keydown",n.proxy(this.keydown,this))}function t(n){var e=(n.altKey?"A-":"")+(n.ctrlKey?"C-":"")+(n.metaKey?"M-":""),t=i[n.which]||String.fromCharCode(n.shiftKey?n.which:n.which+32);return"C-1"==e+t?"Ctrl":"A-2"==e+t?"Alt":"M-{"==e+t?"Meta":n.shift&&16==n.which?"Shift":e.length>0||t.length>1?e+t:void 0}var i={8:"Rubout",9:"Tab",10:"Newline",13:"Return",27:"Escape",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete"};return e.prototype={constructor:e,keypress:function(n){n.which>=32&&this.input(String.fromCharCode(n.which),String.fromCharCode(n.which))},keydown:function(n){var e=t(n);e&&(this.input(e,String.fromCharCode(n.which)),n.preventDefault())}},e}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&define.amd)define("events",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Events","undefined"!=typeof window&&window||this,function(){function n(n,e){return void 0===typeof e?void 0:"undefined"==typeof n?n:(delete n[n.indexOf(e)],n)}function e(n,t,i){if("object"==typeof t)for(var o in t)t.hasOwnProperty(o)&&e(n,o,t[o]);n.hasOwnProperty(t)||(n[t]=[]),n[t].push(i)}function t(e,t,i){if("function"==typeof t&&(i=t,t=void 0),"undefined"==typeof t)for(var t in e)e.hasOwnProperty(t)&&(e[t]=n(e[t],i));else e[t]=n(e[t],i);e[t]||delete e[t]}function i(n,i,o,r){e(n,i,function f(){0===--o&&t(n,i,f),r.apply(this,arguments)})}function o(n,e,t){return i(n,e,1,t)}function r(n,e,t,i){if(n.hasOwnProperty(e))for(var o=n[e].length-1;o>=0;o--)n[e][o].apply(t,i)}function f(){var n={},f=this;this.on=function(t,i){return e(n,t,i)},this.off=function(e,i){return t(n,e,i)},this.once=function(e,t){return o(n,e,t)},this.many=function(e,t,o){return i(n,e,t,o)},this.one=this.once,this.trigger=function(e){return r(n,e,f,[].slice.call(arguments,1))},this.addListener=this.on,this.removeListener=this.off}return f}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&define.amd)define("move",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Move","undefined"!=typeof window&&window||this,function(){function n(){this.move(0)}function e(){this.move(this.line.length)}function t(){this.cursor<this.line.length&&this.move(this.cursor+1)}function i(){this.cursor>0&&this.move(this.cursor-1)}function o(){var n=this.line.indexOf(" ",this.cursor+1);0>n?e.call(this):this.move(n)}function r(){var e=this.line.lastIndexOf(" ",this.cursor-2);0>e?n.call(this):this.move(e+1)}function f(){}function s(){}function u(u){u.on("beginning-of-line",n),u.on("end-of-line",e),u.on("forward-char",t),u.on("backward-char",i),u.on("forward-word",o),u.on("backward-word",r),u.on("shell-forward-word",f),u.on("shell-backward-word",s)}return u}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&"object"==typeof define.amd)define("edit",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Edit","undefined"!=typeof window&&window||this,function(){function n(n){var e=this.cursor;"undefined"==typeof n&&(n=1),e+n>this.line.length&&(n=this.line.length-e),n>0&&this.splice(e,e+n)}function e(n){var e=this.cursor;"undefined"==typeof n&&(n=1),n>e&&(n=e),n>0&&(this.splice(e-n,e),this.move(e-n))}function t(){this.cursor>=this.line.length?e.call(this):n.call(this)}function i(i){var o=!1;i.on("delete-char",n),i.on("backward-delete-char",e),i.on("forward-backward-delete-char",t),i.on("self-insert",function(n){var e=o?n.length:0;this.splice(this.cursor,this.cursor+e,n),this.move(this.cursor+n.length)}),i.on("overwrite-mode",function(n){o=void 0===n?!o:!!n})}return i}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&define.amd)define("history",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("History","undefined"!=typeof window&&window||this,function(){function n(n){function e(e,t){return e>=0&&f>=e&&(s!=f&&(o[s]=r),s=e,r=o[s],n.text(o[s]),t&&n.move(n.line.length)),o[s]}function t(n){return e(s+1,n)}function i(n){return e(s-1,n)}var o=[n.line],r=n.line,f=0,s=0;n.on("change",function(n){o[s]=n}),n.on("accept-line",function(){o[s]&&(f!=s&&(o[f]=o[s],o[s]=r),o.push(""),r="",s=f=o.length-1,this.text(""),this.move(0))}),n.on("previous-history",function(){i(!0)}),n.on("next-history",function(){t(!0)}),n.on("beginning-of-history",function(){e(0,!0)}),n.on("end-of-history",function(){e(f,!0)}),n.on("reverse-search-history",function(){}),n.on("forward-search-history",function(){}),n.on("history-search-forward",function(n){var t=s;for(n="undefined"==typeof n?this.line.substr(0,this.cursor):n;++t<f;)if(o[t].substr(0,n.length)===n)return e(t,!1)}),n.on("history-search-backward",function(n){var t=s;for(n="undefined"==typeof n?this.line.substr(0,this.cursor):n;--t>=0;)if(o[t].substr(0,n.length)===n)return e(t,!1)}),this.line=e,this.next=t,this.previous=i}return n}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&define.amd)define("kill",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Kill","undefined"!=typeof window&&window||this,function(){function n(n){function e(e,t){var i=n.delete(e,t);i&&r.push(i),f=r.length-1}function t(e){f=e=e||f,e>=0&&n.trigger("self-insert",r[e])}function i(){--f<0&&(f=r.length-1)}function o(n){var t=this.cursor;this.one("move",function(n){n>t?(e(t,n),this.move(t)):e(n,t)}),this.trigger(n)}var r=[],f=-1;n.on("kill-line",function(){e(this.cursor,this.line.length)}),n.on("backward-kill-line",function(){e(0,this.cursor),this.move(0)}),n.on("unix-line-discard",function(){e(0,this.cursor),this.move(0)}),n.on("kill-whole-line",function(){e(0,this.line.length)}),n.on("kill-word",function(){o.call(this,"forward-word")}),n.on("backward-kill-word",function(){o.call(this,"backward-word")}),n.on("shell-kill-word",function(){o.call(this,"shell-forward-word")}),n.on("shell-backward-kill-word",function(){o.call(this,"shell-backward-word")}),n.on("unix-word-rubout",function(){o.call(this,"backward-word")}),n.on("yank",function(){t()}),n.on("yank-pop",function(){i(),t()}),this.kill=e,this.yank=t,this.pop=i}return n}),function(n,e,t){if("object"==typeof module&&"function"==typeof require)module.exports=t();else if("function"==typeof define&&"object"==typeof define.amd)define("completion",t);else{var i=t(),o=e[n];i.noConflict=function(){e[n]=o},e[n]=i}}("Completion","undefined"!=typeof window&&window||this,function(){function n(n,e){function t(n,t){return e.call(this,n,t)}function i(n){return"undefined"==typeof n&&(n=1),"undefined"==typeof r?r=n>0?n-1:f.length+n:r+=n,r>=0&&r<f.length?f[n]:(r=void 0,void 0)}function o(n){return"undefined"==typeof n&&(n=1),i(-n)}var r=void 0,f=void 0;n.on("change",function(){f=void 0,r=void 0}),n.on("move",function(){f=void 0,r=void 0}),n.on("complete",function(){f||(f=t(this.line,this.cursor)),1==f.length?(this.trigger("backward-delete-word"),this.trigger("self-insert",f[0])):this.trigger("possible-completions")}),n.on("possible-completions",function(){f||(f=t(this.line,this.cursor)),console.log(f),n.trigger("completions",f)}),n.on("insert-completions",function(){f||(f=t(this.line,this.cursor))}),n.on("menu-complete",function(n){f||(f=t(this.line,this.cursor));var e=i(n);"undefined"!=typeof str&&(this.trigger("backward-delete-word"),this.trigger("self-insert",e))}),n.on("menu-complete-backward",function(n){f||(f=t(this.line,this.cursor));var e=o(n);"undefined"!=typeof str&&(this.trigger("backward-delete-word"),this.trigger("self-insert",e))}),n.on("delete-char-or-list",function(){var n=this.cursor;n>0&&n<this.line.length?this.trigger("delete-char"):this.trigger("possible-completions")}),n.on("complete-filename",function(){}),n.on("possible-filename-completions",function(){}),n.on("complete-username",function(){}),n.on("possible-username-completions",function(){}),n.on("complete-variable",function(){}),n.on("possible-variable-completions",function(){}),n.on("complete-hostname",function(){}),n.on("possible-hostname-completions",function(){}),n.on("complete-command",function(){}),n.on("possible-command-completions",function(){}),n.on("dynamic-complete-history",function(){}),n.on("dabbrev-expand",function(){}),n.on("complete-into-braces",function(){})}return n});
//@ sourceMappingURL=lineedit.js.map