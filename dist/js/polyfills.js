/* Element.closest() polyfill */
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.msMatchesSelector || 
            Element.prototype.webkitMatchesSelector;
        }
      
        if (!Element.prototype.closest) {
            Element.prototype.closest = function(s) {
            var el = this;
      
            do {
                if (Element.prototype.matches.call(el, s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
          return null;
        };
    };
})();

/* NodeList.forEach() polyfill */
(function () {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    };
})();

/* Array.find() polyfill */
(function () {
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
          value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
              throw TypeError('"this" is null or not defined');
            }
      
            var o = Object(this);
      
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
      
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
              throw TypeError('predicate must be a function');
            }
      
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
      
            // 5. Let k be 0.
            var k = 0;
      
            // 6. Repeat, while k < len
            while (k < len) {
              // a. Let Pk be ! ToString(k).
              // b. Let kValue be ? Get(O, Pk).
              // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
              // d. If testResult is true, return kValue.
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
              }
              // e. Increase k by 1.
              k++;
            }
      
            // 7. Return undefined.
            return undefined;
          },
          configurable: true,
          writable: true
        });
      }
})();

/* String.startsWith() polyfill */
(function () {
    if (!String.prototype.startsWith) {
        Object.defineProperty(String.prototype, 'startsWith', {
            value: function(search, rawPos) {
                var pos = rawPos > 0 ? rawPos|0 : 0;
                return this.substring(pos, pos + search.length) === search;
            }
        });
    }
})();