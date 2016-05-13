webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _paper = __webpack_require__(79);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _story = __webpack_require__(245);
	
	var _story2 = _interopRequireDefault(_story);
	
	var _VolumeCtrl = __webpack_require__(240);
	
	var _VolumeCtrl2 = _interopRequireDefault(_VolumeCtrl);
	
	var _kefir = __webpack_require__(166);
	
	var _kefir2 = __webpack_require__(313);
	
	var _kefir3 = _interopRequireDefault(_kefir2);
	
	var _ramda = __webpack_require__(49);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _Dialogue = __webpack_require__(242);
	
	var _Dialogue2 = _interopRequireDefault(_Dialogue);
	
	var _Video = __webpack_require__(244);
	
	var _Video2 = _interopRequireDefault(_Video);
	
	var _End = __webpack_require__(243);
	
	var _End2 = _interopRequireDefault(_End);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(94);
	
	window.R = _ramda2.default;
	window.p = _paper2.default;
	
	__webpack_require__(502);
	
	// TODO: move to new file and find better name
	
	var volumeModifier = 0.05;
	
	var canvas = null;
	var container = null;
	
	var volume = new _kefir3.default(0.5);
	
	/*
	story.onBefore("end_true",() => {
	
		story.showDialogue = false
		guz = true
		toggleCharacters(false)
		graphene.visible = true
		talk_text.visible = true
	
	
		graphene.setPosition(paper.view.center)
		talk_text.content = "А ти какво научи от всичко това?"	
		paper.view.update(true)
	
	})
	
	
	//gala --replace
	*/
	
	var mountedVideo = null;
	
	function _ref() {
		_paper2.default.view.update(true);
		_paper2.default.view.draw();
	}
	
	function _ref3(e) {
		return e.wheelDelta < 0 ? -volumeModifier : volumeModifier;
	}
	
	function _ref4(mod) {
		volume.modify(function (old) {
			var volume = old + mod;
			if (volume < 0) {
				volume = 0;
			} else if (volume > 1) {
				volume = 1;
			}
			return volume;
		});
	}
	
	function _ref5() {
		return null;
	}
	
	window.addEventListener("load", function () {
		console.log("Loading");
	
		canvas = document.getElementById("drawSurf");
		container = document.getElementById("container");
		_paper2.default.setup(canvas);
	
		var story = new _story2.default({
			"Video": _Video2.default,
			"Dialogue": _Dialogue2.default,
			"End": _End2.default
		}, _ref);
	
		function _ref2() {
			return story.next();
		}
	
		story.onVideo(function (video) {
	
			console.log("Removeing: ", video);
			if (mountedVideo != null) {
				mountedVideo.remove();
			}
	
			video.addEventListener("ended", _ref2);
	
			container.appendChild(video);
			video.play();
	
			mountedVideo = video;
			video.volume = volume.get();
		});
	
		_kefir.Kefir.fromEvents(canvas, "mousewheel").map(_ref3).onValue(_ref4);
	
		window.hds = function () {
			story.next();
		};
	
		_kefir.Kefir.fromEvents(window, "resize").toProperty(_ref5).onValue(function () {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			_paper2.default.view.setViewSize(window.innerWidth, window.innerHeight);
	
			story.uiCalc(window.innerWidth, window.innerHeight, _paper2.default.view.center);
		});
	
		var volCtrl = new _VolumeCtrl2.default(volume.get());
	
		volume.onValue(function (value) {
			if (mountedVideo != null) {
				mountedVideo.volume = value;
			}
			volCtrl.update(value);
		});
	
		story.next();
		console.log("Loaded");
	}, false);

/***/ },

/***/ 4:
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 32:
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(95);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },

/***/ 34:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	//  Ramda v0.21.0
	//  https://github.com/ramda/ramda
	//  (c) 2013-2016 Scott Sauyet, Michael Hurley, and David Chambers
	//  Ramda may be freely distributed under the MIT license.
	
	;(function() {
	
	  'use strict';
	
	  /**
	     * A special placeholder value used to specify "gaps" within curried functions,
	     * allowing partial application of any combination of arguments, regardless of
	     * their positions.
	     *
	     * If `g` is a curried ternary function and `_` is `R.__`, the following are
	     * equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2, _)(1, 3)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @constant
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @example
	     *
	     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	     *      greet('Alice'); //=> 'Hello, Alice!'
	     */
	    var __ = { '@@functional/placeholder': true };
	
	    /* eslint-disable no-unused-vars */
	    var _arity = function _arity(n, fn) {
	        /* eslint-disable no-unused-vars */
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.apply(this, arguments);
	            };
	        case 1:
	            return function (a0) {
	                return fn.apply(this, arguments);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.apply(this, arguments);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.apply(this, arguments);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.apply(this, arguments);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.apply(this, arguments);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.apply(this, arguments);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.apply(this, arguments);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.apply(this, arguments);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.apply(this, arguments);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.apply(this, arguments);
	            };
	        default:
	            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	        }
	    };
	
	    var _arrayFromIterator = function _arrayFromIterator(iter) {
	        var list = [];
	        var next;
	        while (!(next = iter.next()).done) {
	            list.push(next.value);
	        }
	        return list;
	    };
	
	    var _arrayOf = function _arrayOf() {
	        return Array.prototype.slice.call(arguments);
	    };
	
	    var _cloneRegExp = function _cloneRegExp(pattern) {
	        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	    };
	
	    var _complement = function _complement(f) {
	        return function () {
	            return !f.apply(this, arguments);
	        };
	    };
	
	    /**
	     * Private `concat` function to merge two array-like objects.
	     *
	     * @private
	     * @param {Array|Arguments} [set1=[]] An array-like object.
	     * @param {Array|Arguments} [set2=[]] An array-like object.
	     * @return {Array} A new, merged array.
	     * @example
	     *
	     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     */
	    var _concat = function _concat(set1, set2) {
	        set1 = set1 || [];
	        set2 = set2 || [];
	        var idx;
	        var len1 = set1.length;
	        var len2 = set2.length;
	        var result = [];
	        idx = 0;
	        while (idx < len1) {
	            result[result.length] = set1[idx];
	            idx += 1;
	        }
	        idx = 0;
	        while (idx < len2) {
	            result[result.length] = set2[idx];
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _containsWith = function _containsWith(pred, x, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (pred(x, list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    };
	
	    var _filter = function _filter(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        while (idx < len) {
	            if (fn(list[idx])) {
	                result[result.length] = list[idx];
	            }
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _forceReduced = function _forceReduced(x) {
	        return {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    // String(x => x) evaluates to "x => x", so the pattern may not match.
	    var _functionName = function _functionName(f) {
	        // String(x => x) evaluates to "x => x", so the pattern may not match.
	        var match = String(f).match(/^function (\w*)/);
	        return match == null ? '' : match[1];
	    };
	
	    var _has = function _has(prop, obj) {
	        return Object.prototype.hasOwnProperty.call(obj, prop);
	    };
	
	    var _identity = function _identity(x) {
	        return x;
	    };
	
	    var _isArguments = function () {
	        var toString = Object.prototype.toString;
	        return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
	            return toString.call(x) === '[object Arguments]';
	        } : function _isArguments(x) {
	            return _has('callee', x);
	        };
	    }();
	
	    /**
	     * Tests whether or not an object is an array.
	     *
	     * @private
	     * @param {*} val The object to test.
	     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	     * @example
	     *
	     *      _isArray([]); //=> true
	     *      _isArray(null); //=> false
	     *      _isArray({}); //=> false
	     */
	    var _isArray = Array.isArray || function _isArray(val) {
	        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	    };
	
	    var _isFunction = function _isNumber(x) {
	        return Object.prototype.toString.call(x) === '[object Function]';
	    };
	
	    /**
	     * Determine if the passed argument is an integer.
	     *
	     * @private
	     * @param {*} n
	     * @category Type
	     * @return {Boolean}
	     */
	    var _isInteger = Number.isInteger || function _isInteger(n) {
	        return n << 0 === n;
	    };
	
	    var _isNumber = function _isNumber(x) {
	        return Object.prototype.toString.call(x) === '[object Number]';
	    };
	
	    var _isObject = function _isObject(x) {
	        return Object.prototype.toString.call(x) === '[object Object]';
	    };
	
	    var _isPlaceholder = function _isPlaceholder(a) {
	        return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
	    };
	
	    var _isRegExp = function _isRegExp(x) {
	        return Object.prototype.toString.call(x) === '[object RegExp]';
	    };
	
	    var _isString = function _isString(x) {
	        return Object.prototype.toString.call(x) === '[object String]';
	    };
	
	    var _isTransformer = function _isTransformer(obj) {
	        return typeof obj['@@transducer/step'] === 'function';
	    };
	
	    var _map = function _map(fn, functor) {
	        var idx = 0;
	        var len = functor.length;
	        var result = Array(len);
	        while (idx < len) {
	            result[idx] = fn(functor[idx]);
	            idx += 1;
	        }
	        return result;
	    };
	
	    // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	    var _objectAssign = function _objectAssign(target) {
	        if (target == null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }
	        var output = Object(target);
	        var idx = 1;
	        var length = arguments.length;
	        while (idx < length) {
	            var source = arguments[idx];
	            if (source != null) {
	                for (var nextKey in source) {
	                    if (_has(nextKey, source)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	            idx += 1;
	        }
	        return output;
	    };
	
	    var _of = function _of(x) {
	        return [x];
	    };
	
	    var _pipe = function _pipe(f, g) {
	        return function () {
	            return g.call(this, f.apply(this, arguments));
	        };
	    };
	
	    var _pipeP = function _pipeP(f, g) {
	        return function () {
	            var ctx = this;
	            return f.apply(ctx, arguments).then(function (x) {
	                return g.call(ctx, x);
	            });
	        };
	    };
	
	    // \b matches word boundary; [\b] matches backspace
	    var _quote = function _quote(s) {
	        var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b')    // \b matches word boundary; [\b] matches backspace
	    .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
	        return '"' + escaped.replace(/"/g, '\\"') + '"';
	    };
	
	    var _reduced = function _reduced(x) {
	        return x && x['@@transducer/reduced'] ? x : {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    /**
	     * An optimized, private array `slice` implementation.
	     *
	     * @private
	     * @param {Arguments|Array} args The array or arguments object to consider.
	     * @param {Number} [from=0] The array index to slice from, inclusive.
	     * @param {Number} [to=args.length] The array index to slice to, exclusive.
	     * @return {Array} A new, sliced array.
	     * @example
	     *
	     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	     *
	     *      var firstThreeArgs = function(a, b, c, d) {
	     *        return _slice(arguments, 0, 3);
	     *      };
	     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	     */
	    var _slice = function _slice(args, from, to) {
	        switch (arguments.length) {
	        case 1:
	            return _slice(args, 0, args.length);
	        case 2:
	            return _slice(args, from, args.length);
	        default:
	            var list = [];
	            var idx = 0;
	            var len = Math.max(0, Math.min(args.length, to) - from);
	            while (idx < len) {
	                list[idx] = args[from + idx];
	                idx += 1;
	            }
	            return list;
	        }
	    };
	
	    /**
	     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
	     */
	    var _toISOString = function () {
	        var pad = function pad(n) {
	            return (n < 10 ? '0' : '') + n;
	        };
	        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
	            return d.toISOString();
	        } : function _toISOString(d) {
	            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
	        };
	    }();
	
	    var _xfBase = {
	        init: function () {
	            return this.xf['@@transducer/init']();
	        },
	        result: function (result) {
	            return this.xf['@@transducer/result'](result);
	        }
	    };
	
	    var _xwrap = function () {
	        function XWrap(fn) {
	            this.f = fn;
	        }
	        XWrap.prototype['@@transducer/init'] = function () {
	            throw new Error('init not implemented on XWrap');
	        };
	        XWrap.prototype['@@transducer/result'] = function (acc) {
	            return acc;
	        };
	        XWrap.prototype['@@transducer/step'] = function (acc, x) {
	            return this.f(acc, x);
	        };
	        return function _xwrap(fn) {
	            return new XWrap(fn);
	        };
	    }();
	
	    var _aperture = function _aperture(n, list) {
	        var idx = 0;
	        var limit = list.length - (n - 1);
	        var acc = new Array(limit >= 0 ? limit : 0);
	        while (idx < limit) {
	            acc[idx] = _slice(list, idx, idx + n);
	            idx += 1;
	        }
	        return acc;
	    };
	
	    var _assign = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
	
	    /**
	     * Similar to hasMethod, this checks whether a function has a [methodname]
	     * function. If it isn't an array it will execute that function otherwise it
	     * will default to the ramda implementation.
	     *
	     * @private
	     * @param {Function} fn ramda implemtation
	     * @param {String} methodname property to check for a custom implementation
	     * @return {Object} Whatever the return value of the method is.
	     */
	    var _checkForMethod = function _checkForMethod(methodname, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	        };
	    };
	
	    /**
	     * Optimized internal one-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry1 = function _curry1(fn) {
	        return function f1(a) {
	            if (arguments.length === 0 || _isPlaceholder(a)) {
	                return f1;
	            } else {
	                return fn.apply(this, arguments);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal two-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry2 = function _curry2(fn) {
	        return function f2(a, b) {
	            switch (arguments.length) {
	            case 0:
	                return f2;
	            case 1:
	                return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
	                    return fn(a, _b);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b);
	                }) : fn(a, b);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal three-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry3 = function _curry3(fn) {
	        return function f3(a, b, c) {
	            switch (arguments.length) {
	            case 0:
	                return f3;
	            case 1:
	                return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                });
	            case 2:
	                return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _curry1(function (_c) {
	                    return fn(a, b, _c);
	                });
	            default:
	                return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
	                    return fn(_a, _b, c);
	                }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
	                    return fn(_a, b, _c);
	                }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
	                    return fn(a, _b, _c);
	                }) : _isPlaceholder(a) ? _curry1(function (_a) {
	                    return fn(_a, b, c);
	                }) : _isPlaceholder(b) ? _curry1(function (_b) {
	                    return fn(a, _b, c);
	                }) : _isPlaceholder(c) ? _curry1(function (_c) {
	                    return fn(a, b, _c);
	                }) : fn(a, b, c);
	            }
	        };
	    };
	
	    /**
	     * Internal curryN function.
	     *
	     * @private
	     * @category Function
	     * @param {Number} length The arity of the curried function.
	     * @param {Array} received An array of arguments received thus far.
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curryN = function _curryN(length, received, fn) {
	        return function () {
	            var combined = [];
	            var argsIdx = 0;
	            var left = length;
	            var combinedIdx = 0;
	            while (combinedIdx < received.length || argsIdx < arguments.length) {
	                var result;
	                if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
	                    result = received[combinedIdx];
	                } else {
	                    result = arguments[argsIdx];
	                    argsIdx += 1;
	                }
	                combined[combinedIdx] = result;
	                if (!_isPlaceholder(result)) {
	                    left -= 1;
	                }
	                combinedIdx += 1;
	            }
	            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
	        };
	    };
	
	    /**
	     * Returns a function that dispatches with different strategies based on the
	     * object in list position (last argument). If it is an array, executes [fn].
	     * Otherwise, if it has a function with [methodname], it will execute that
	     * function (functor case). Otherwise, if it is a transformer, uses transducer
	     * [xf] to return a new transformer (transducer case). Otherwise, it will
	     * default to executing [fn].
	     *
	     * @private
	     * @param {String} methodname property to check for a custom implementation
	     * @param {Function} xf transducer to initialize if object is transformer
	     * @param {Function} fn default ramda implementation
	     * @return {Function} A function that dispatches on object in list position
	     */
	    var _dispatchable = function _dispatchable(methodname, xf, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            if (!_isArray(obj)) {
	                var args = _slice(arguments, 0, length - 1);
	                if (typeof obj[methodname] === 'function') {
	                    return obj[methodname].apply(obj, args);
	                }
	                if (_isTransformer(obj)) {
	                    var transducer = xf.apply(null, args);
	                    return transducer(obj);
	                }
	            }
	            return fn.apply(this, arguments);
	        };
	    };
	
	    var _dropLastWhile = function dropLastWhile(pred, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && pred(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, 0, idx + 1);
	    };
	
	    var _xall = function () {
	        function XAll(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.all = true;
	        }
	        XAll.prototype['@@transducer/init'] = _xfBase.init;
	        XAll.prototype['@@transducer/result'] = function (result) {
	            if (this.all) {
	                result = this.xf['@@transducer/step'](result, true);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAll.prototype['@@transducer/step'] = function (result, input) {
	            if (!this.f(input)) {
	                this.all = false;
	                result = _reduced(this.xf['@@transducer/step'](result, false));
	            }
	            return result;
	        };
	        return _curry2(function _xall(f, xf) {
	            return new XAll(f, xf);
	        });
	    }();
	
	    var _xany = function () {
	        function XAny(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.any = false;
	        }
	        XAny.prototype['@@transducer/init'] = _xfBase.init;
	        XAny.prototype['@@transducer/result'] = function (result) {
	            if (!this.any) {
	                result = this.xf['@@transducer/step'](result, false);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAny.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.any = true;
	                result = _reduced(this.xf['@@transducer/step'](result, true));
	            }
	            return result;
	        };
	        return _curry2(function _xany(f, xf) {
	            return new XAny(f, xf);
	        });
	    }();
	
	    var _xaperture = function () {
	        function XAperture(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XAperture.prototype['@@transducer/init'] = _xfBase.init;
	        XAperture.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XAperture.prototype['@@transducer/step'] = function (result, input) {
	            this.store(input);
	            return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
	        };
	        XAperture.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        XAperture.prototype.getCopy = function () {
	            return _concat(_slice(this.acc, this.pos), _slice(this.acc, 0, this.pos));
	        };
	        return _curry2(function _xaperture(n, xf) {
	            return new XAperture(n, xf);
	        });
	    }();
	
	    var _xdrop = function () {
	        function XDrop(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XDrop.prototype['@@transducer/init'] = _xfBase.init;
	        XDrop.prototype['@@transducer/result'] = _xfBase.result;
	        XDrop.prototype['@@transducer/step'] = function (result, input) {
	            if (this.n > 0) {
	                this.n -= 1;
	                return result;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdrop(n, xf) {
	            return new XDrop(n, xf);
	        });
	    }();
	
	    var _xdropLast = function () {
	        function XDropLast(n, xf) {
	            this.xf = xf;
	            this.pos = 0;
	            this.full = false;
	            this.acc = new Array(n);
	        }
	        XDropLast.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLast.prototype['@@transducer/result'] = function (result) {
	            this.acc = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.full) {
	                result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
	            }
	            this.store(input);
	            return result;
	        };
	        XDropLast.prototype.store = function (input) {
	            this.acc[this.pos] = input;
	            this.pos += 1;
	            if (this.pos === this.acc.length) {
	                this.pos = 0;
	                this.full = true;
	            }
	        };
	        return _curry2(function _xdropLast(n, xf) {
	            return new XDropLast(n, xf);
	        });
	    }();
	
	    var _xdropRepeatsWith = function () {
	        function XDropRepeatsWith(pred, xf) {
	            this.xf = xf;
	            this.pred = pred;
	            this.lastValue = undefined;
	            this.seenFirstValue = false;
	        }
	        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
	            return this.xf['@@transducer/init']();
	        };
	        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
	            var sameAsLast = false;
	            if (!this.seenFirstValue) {
	                this.seenFirstValue = true;
	            } else if (this.pred(this.lastValue, input)) {
	                sameAsLast = true;
	            }
	            this.lastValue = input;
	            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropRepeatsWith(pred, xf) {
	            return new XDropRepeatsWith(pred, xf);
	        });
	    }();
	
	    var _xdropWhile = function () {
	        function XDropWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f) {
	                if (this.f(input)) {
	                    return result;
	                }
	                this.f = null;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropWhile(f, xf) {
	            return new XDropWhile(f, xf);
	        });
	    }();
	
	    var _xfilter = function () {
	        function XFilter(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFilter.prototype['@@transducer/init'] = _xfBase.init;
	        XFilter.prototype['@@transducer/result'] = _xfBase.result;
	        XFilter.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
	        };
	        return _curry2(function _xfilter(f, xf) {
	            return new XFilter(f, xf);
	        });
	    }();
	
	    var _xfind = function () {
	        function XFind(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.found = false;
	        }
	        XFind.prototype['@@transducer/init'] = _xfBase.init;
	        XFind.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, void 0);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFind.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, input));
	            }
	            return result;
	        };
	        return _curry2(function _xfind(f, xf) {
	            return new XFind(f, xf);
	        });
	    }();
	
	    var _xfindIndex = function () {
	        function XFindIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.found = false;
	        }
	        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindIndex.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, -1);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
	            }
	            return result;
	        };
	        return _curry2(function _xfindIndex(f, xf) {
	            return new XFindIndex(f, xf);
	        });
	    }();
	
	    var _xfindLast = function () {
	        function XFindLast(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLast.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
	        };
	        XFindLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.last = input;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLast(f, xf) {
	            return new XFindLast(f, xf);
	        });
	    }();
	
	    var _xfindLastIndex = function () {
	        function XFindLastIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.lastIdx = -1;
	        }
	        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
	        };
	        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.lastIdx = this.idx;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLastIndex(f, xf) {
	            return new XFindLastIndex(f, xf);
	        });
	    }();
	
	    var _xmap = function () {
	        function XMap(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XMap.prototype['@@transducer/init'] = _xfBase.init;
	        XMap.prototype['@@transducer/result'] = _xfBase.result;
	        XMap.prototype['@@transducer/step'] = function (result, input) {
	            return this.xf['@@transducer/step'](result, this.f(input));
	        };
	        return _curry2(function _xmap(f, xf) {
	            return new XMap(f, xf);
	        });
	    }();
	
	    var _xtake = function () {
	        function XTake(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XTake.prototype['@@transducer/init'] = _xfBase.init;
	        XTake.prototype['@@transducer/result'] = _xfBase.result;
	        XTake.prototype['@@transducer/step'] = function (result, input) {
	            if (this.n === 0) {
	                return _reduced(result);
	            } else {
	                this.n -= 1;
	                return this.xf['@@transducer/step'](result, input);
	            }
	        };
	        return _curry2(function _xtake(n, xf) {
	            return new XTake(n, xf);
	        });
	    }();
	
	    var _xtakeWhile = function () {
	        function XTakeWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
	        };
	        return _curry2(function _xtakeWhile(f, xf) {
	            return new XTakeWhile(f, xf);
	        });
	    }();
	
	    /**
	     * Adds two values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Number}
	     * @see R.subtract
	     * @example
	     *
	     *      R.add(2, 3);       //=>  5
	     *      R.add(7)(10);      //=> 17
	     */
	    var add = _curry2(function add(a, b) {
	        return Number(a) + Number(b);
	    });
	
	    /**
	     * Applies a function to the value at the given index of an array, returning a
	     * new copy of the array with the element at the given index replaced with the
	     * result of the function application.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a -> a) -> Number -> [a] -> [a]
	     * @param {Function} fn The function to apply.
	     * @param {Number} idx The index.
	     * @param {Array|Arguments} list An array-like object whose value
	     *        at the supplied index will be replaced.
	     * @return {Array} A copy of the supplied array-like object with
	     *         the element at index `idx` replaced with the value
	     *         returned by applying `fn` to the existing element.
	     * @see R.update
	     * @example
	     *
	     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var adjust = _curry3(function adjust(fn, idx, list) {
	        if (idx >= list.length || idx < -list.length) {
	            return list;
	        }
	        var start = idx < 0 ? list.length : 0;
	        var _idx = start + idx;
	        var _list = _concat(list);
	        _list[_idx] = fn(list[_idx]);
	        return _list;
	    });
	
	    /**
	     * Returns `true` if all elements of the list match the predicate, `false` if
	     * there are any that don't.
	     *
	     * Dispatches to the `all` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
	     *         otherwise.
	     * @see R.any, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      var lessThan3 = R.flip(R.lt)(3);
	     *      R.all(lessThan2)([1, 2]); //=> false
	     *      R.all(lessThan3)([1, 2]); //=> true
	     */
	    var all = _curry2(_dispatchable('all', _xall, function all(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (!fn(list[idx])) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    }));
	
	    /**
	     * Returns a function that always returns the given value. Note that for
	     * non-primitives the value returned is a reference to the original value.
	     *
	     * This function is known as `const`, `constant`, or `K` (for K combinator) in
	     * other languages and libraries.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> (* -> a)
	     * @param {*} val The value to wrap in a function
	     * @return {Function} A Function :: * -> val.
	     * @example
	     *
	     *      var t = R.always('Tee');
	     *      t(); //=> 'Tee'
	     */
	    var always = _curry1(function always(val) {
	        return function () {
	            return val;
	        };
	    });
	
	    /**
	     * Returns `true` if both arguments are `true`; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
	     * @see R.both
	     * @example
	     *
	     *      R.and(true, true); //=> true
	     *      R.and(true, false); //=> false
	     *      R.and(false, true); //=> false
	     *      R.and(false, false); //=> false
	     */
	    var and = _curry2(function and(a, b) {
	        return a && b;
	    });
	
	    /**
	     * Returns `true` if at least one of elements of the list match the predicate,
	     * `false` otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
	     *         otherwise.
	     * @see R.all, R.none, R.transduce
	     * @example
	     *
	     *      var lessThan0 = R.flip(R.lt)(0);
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      R.any(lessThan0)([1, 2]); //=> false
	     *      R.any(lessThan2)([1, 2]); //=> true
	     */
	    var any = _curry2(_dispatchable('any', _xany, function any(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (fn(list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    }));
	
	    /**
	     * Returns a new list, composed of n-tuples of consecutive elements If `n` is
	     * greater than the length of the list, an empty list is returned.
	     *
	     * Dispatches to the `aperture` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @param {Number} n The size of the tuples to create
	     * @param {Array} list The list to split into `n`-tuples
	     * @return {Array} The new list.
	     * @see R.transduce
	     * @example
	     *
	     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
	     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
	     */
	    var aperture = _curry2(_dispatchable('aperture', _xaperture, _aperture));
	
	    /**
	     * Returns a new list containing the contents of the given list, followed by
	     * the given element.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The element to add to the end of the new list.
	     * @param {Array} list The list whose contents will be added to the beginning of the output
	     *        list.
	     * @return {Array} A new list containing the contents of the old list followed by `el`.
	     * @see R.prepend
	     * @example
	     *
	     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
	     *      R.append('tests', []); //=> ['tests']
	     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
	     */
	    var append = _curry2(function append(el, list) {
	        return _concat(list, [el]);
	    });
	
	    /**
	     * Applies function `fn` to the argument list `args`. This is useful for
	     * creating a fixed-arity function from a variadic function. `fn` should be a
	     * bound function if context is significant.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> a) -> [*] -> a
	     * @param {Function} fn
	     * @param {Array} args
	     * @return {*}
	     * @see R.call, R.unapply
	     * @example
	     *
	     *      var nums = [1, 2, 3, -99, 42, 6, 7];
	     *      R.apply(Math.max, nums); //=> 42
	     */
	    var apply = _curry2(function apply(fn, args) {
	        return fn.apply(this, args);
	    });
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the specified
	     * property with the given value. Note that this copies and flattens prototype
	     * properties onto the new object as well. All non-primitive properties are
	     * copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig String -> a -> {k: v} -> {k: v}
	     * @param {String} prop the property name to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except for the specified property.
	     * @see R.dissoc
	     * @example
	     *
	     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
	     */
	    var assoc = _curry3(function assoc(prop, val, obj) {
	        var result = {};
	        for (var p in obj) {
	            result[p] = obj[p];
	        }
	        result[prop] = val;
	        return result;
	    });
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the nodes required
	     * to create the given path, and placing the specific value at the tail end of
	     * that path. Note that this copies and flattens prototype properties onto the
	     * new object as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig [String] -> a -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except along the specified path.
	     * @see R.dissocPath
	     * @example
	     *
	     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
	     */
	    var assocPath = _curry3(function assocPath(path, val, obj) {
	        switch (path.length) {
	        case 0:
	            return val;
	        case 1:
	            return assoc(path[0], val, obj);
	        default:
	            return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
	        }
	    });
	
	    /**
	     * Creates a function that is bound to a context.
	     * Note: `R.bind` does not provide the additional argument-binding capabilities of
	     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Function
	     * @category Object
	     * @sig (* -> *) -> {*} -> (* -> *)
	     * @param {Function} fn The function to bind to context
	     * @param {Object} thisObj The context to bind `fn` to
	     * @return {Function} A function that will execute in the context of `thisObj`.
	     * @see R.partial
	     */
	    var bind = _curry2(function bind(fn, thisObj) {
	        return _arity(fn.length, function () {
	            return fn.apply(thisObj, arguments);
	        });
	    });
	
	    /**
	     * Restricts a number to be within a range.
	     *
	     * Also works for other ordered types such as Strings and Dates.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a -> a
	     * @param {Number} minimum number
	     * @param {Number} maximum number
	     * @param {Number} value to be clamped
	     * @return {Number} Returns the clamped value
	     * @example
	     *
	     *      R.clamp(1, 10, -1) // => 1
	     *      R.clamp(1, 10, 11) // => 10
	     *      R.clamp(1, 10, 4)  // => 4
	     */
	    var clamp = _curry3(function clamp(min, max, value) {
	        if (min > max) {
	            throw new Error('min must not be greater than max in clamp(min, max, value)');
	        }
	        return value < min ? min : value > max ? max : value;
	    });
	
	    /**
	     * Makes a comparator function out of a function that reports whether the first
	     * element is less than the second.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a, b -> Boolean) -> (a, b -> Number)
	     * @param {Function} pred A predicate function of arity two.
	     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
	     * @example
	     *
	     *      var cmp = R.comparator((a, b) => a.age < b.age);
	     *      var people = [
	     *        // ...
	     *      ];
	     *      R.sort(cmp, people);
	     */
	    var comparator = _curry1(function comparator(pred) {
	        return function (a, b) {
	            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
	        };
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function, with the specified
	     * arity. The curried function has two unusual capabilities. First, its
	     * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curry
	     * @example
	     *
	     *      var sumArgs = (...args) => R.sum(args);
	     *
	     *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curryN = _curry2(function curryN(length, fn) {
	        if (length === 1) {
	            return _curry1(fn);
	        }
	        return _arity(length, _curryN(length, [], fn));
	    });
	
	    /**
	     * Decrements its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.inc
	     * @example
	     *
	     *      R.dec(42); //=> 41
	     */
	    var dec = add(-1);
	
	    /**
	     * Returns the second argument if it is not `null`, `undefined` or `NaN`
	     * otherwise the first argument is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Logic
	     * @sig a -> b -> a | b
	     * @param {a} val The default value.
	     * @param {b} val The value to return if it is not null or undefined
	     * @return {*} The the second value or the default value
	     * @example
	     *
	     *      var defaultTo42 = R.defaultTo(42);
	     *
	     *      defaultTo42(null);  //=> 42
	     *      defaultTo42(undefined);  //=> 42
	     *      defaultTo42('Ramda');  //=> 'Ramda'
	     *      defaultTo42(parseInt('string')); //=> 42
	     */
	    var defaultTo = _curry2(function defaultTo(d, v) {
	        return v == null || v !== v ? d : v;
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.difference
	     * @example
	     *
	     *      var cmp = (x, y) => x.a === y.a;
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
	     *      var l2 = [{a: 3}, {a: 4}];
	     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
	     */
	    var differenceWith = _curry3(function differenceWith(pred, first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
	                out.push(first[idx]);
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object that does not contain a `prop` property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Object
	     * @sig String -> {k: v} -> {k: v}
	     * @param {String} prop the name of the property to dissociate
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original but without the specified property
	     * @see R.assoc
	     * @example
	     *
	     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
	     */
	    var dissoc = _curry2(function dissoc(prop, obj) {
	        var result = {};
	        for (var p in obj) {
	            if (p !== prop) {
	                result[p] = obj[p];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Makes a shallow clone of an object, omitting the property at the given path.
	     * Note that this copies and flattens prototype properties onto the new object
	     * as well. All non-primitive properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.11.0
	     * @category Object
	     * @sig [String] -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object without the property at path
	     * @see R.assocPath
	     * @example
	     *
	     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
	     */
	    var dissocPath = _curry2(function dissocPath(path, obj) {
	        switch (path.length) {
	        case 0:
	            return obj;
	        case 1:
	            return dissoc(path[0], obj);
	        default:
	            var head = path[0];
	            var tail = _slice(path, 1);
	            return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
	        }
	    });
	
	    /**
	     * Divides two numbers. Equivalent to `a / b`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a / b`.
	     * @see R.multiply
	     * @example
	     *
	     *      R.divide(71, 100); //=> 0.71
	     *
	     *      var half = R.divide(R.__, 2);
	     *      half(42); //=> 21
	     *
	     *      var reciprocal = R.divide(1);
	     *      reciprocal(4);   //=> 0.25
	     */
	    var divide = _curry2(function divide(a, b) {
	        return a / b;
	    });
	
	    /**
	     * Returns a new list containing the last `n` elements of a given list, passing
	     * each value to the supplied predicate function, skipping elements while the
	     * predicate function returns `true`. The predicate function is passed one
	     * argument: *(value)*.
	     *
	     * Dispatches to the `dropWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var lteTwo = x => x <= 2;
	     *
	     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
	     */
	    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && pred(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, idx);
	    }));
	
	    /**
	     * Returns the empty value of its argument's type. Ramda defines the empty
	     * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
	     * types are supported if they define `<Type>.empty` and/or
	     * `<Type>.prototype.empty`.
	     *
	     * Dispatches to the `empty` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x
	     * @return {*}
	     * @example
	     *
	     *      R.empty(Just(42));      //=> Nothing()
	     *      R.empty([1, 2, 3]);     //=> []
	     *      R.empty('unicorns');    //=> ''
	     *      R.empty({x: 1, y: 2});  //=> {}
	     */
	    // else
	    var empty = _curry1(function empty(x) {
	        return x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
	            return arguments;
	        }() : // else
	        void 0;
	    });
	
	    /**
	     * Creates a new object by recursively evolving a shallow copy of `object`,
	     * according to the `transformation` functions. All non-primitive properties
	     * are copied by reference.
	     *
	     * A `transformation` function will not be invoked if its corresponding key
	     * does not exist in the evolved object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
	     * @param {Object} transformations The object specifying transformation functions to apply
	     *        to the object.
	     * @param {Object} object The object to be transformed.
	     * @return {Object} The transformed object.
	     * @example
	     *
	     *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
	     *      var transformations = {
	     *        firstName: R.trim,
	     *        lastName: R.trim, // Will not get invoked.
	     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
	     *      };
	     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
	     */
	    var evolve = _curry2(function evolve(transformations, object) {
	        var result = {};
	        var transformation, key, type;
	        for (key in object) {
	            transformation = transformations[key];
	            type = typeof transformation;
	            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	        }
	        return result;
	    });
	
	    /**
	     * Returns the first element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `find` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     *        desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	     *      R.find(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx += 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the first element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
	     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Returns the last element of the list which matches the predicate, or
	     * `undefined` if no element matches.
	     *
	     * Dispatches to the `findLast` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
	     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx -= 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the last element of the list which matches the
	     * predicate, or `-1` if no element matches.
	     *
	     * Dispatches to the `findLastIndex` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @see R.transduce
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
	     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx -= 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Iterate over an input `list`, calling a provided function `fn` for each
	     * element in the list.
	     *
	     * `fn` receives one argument: *(value)*.
	     *
	     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.forEach` method. For more
	     * details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	     *
	     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
	     * the original array. In some libraries this function is named `each`.
	     *
	     * Dispatches to the `forEach` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig (a -> *) -> [a] -> [a]
	     * @param {Function} fn The function to invoke. Receives one argument, `value`.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} The original list.
	     * @see R.addIndex
	     * @example
	     *
	     *      var printXPlusFive = x => console.log(x + 5);
	     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
	     *      //-> 6
	     *      //-> 7
	     *      //-> 8
	     */
	    var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            fn(list[idx]);
	            idx += 1;
	        }
	        return list;
	    }));
	
	    /**
	     * Creates a new object out of a list key-value pairs.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [[k,v]] -> {k: v}
	     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
	     * @return {Object} The object made by pairing up `keys` and `values`.
	     * @see R.toPairs, R.pair
	     * @example
	     *
	     *      R.fromPairs([['a', 1], ['b', 2],  ['c', 3]]); //=> {a: 1, b: 2, c: 3}
	     */
	    var fromPairs = _curry1(function fromPairs(pairs) {
	        var idx = 0;
	        var len = pairs.length;
	        var out = {};
	        while (idx < len) {
	            if (_isArray(pairs[idx]) && pairs[idx].length) {
	                out[pairs[idx][0]] = pairs[idx][1];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Takes a list and returns a list of lists where each sublist's elements are
	     * all "equal" according to the provided equality function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.21.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [[a]]
	     * @param {Function} fn Function for determining whether two given (adjacent)
	     *        elements should be in the same group
	     * @param {Array} list The array to group. Also accepts a string, which will be
	     *        treated as a list of characters.
	     * @return {List} A list that contains sublists of equal elements,
	     *         whose concatenations is equal to the original list.
	     * @example
	     *
	     *    groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     *    // [[0], [1, 1], [2, 3, 5, 8, 13, 21]]
	     *
	     *    groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
	     *    // [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
	     *
	     *    R.groupWith(R.eqBy(isVowel), 'aestiou')
	     *    // ['ae', 'st', 'iou']
	     */
	    var groupWith = _curry2(function (fn, list) {
	        var res = [];
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            var nextidx = idx + 1;
	            while (nextidx < len && fn(list[idx], list[nextidx])) {
	                nextidx += 1;
	            }
	            res.push(list.slice(idx, nextidx));
	            idx = nextidx;
	        }
	        return res;
	    });
	
	    /**
	     * Returns `true` if the first argument is greater than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.lt
	     * @example
	     *
	     *      R.gt(2, 1); //=> true
	     *      R.gt(2, 2); //=> false
	     *      R.gt(2, 3); //=> false
	     *      R.gt('a', 'z'); //=> false
	     *      R.gt('z', 'a'); //=> true
	     */
	    var gt = _curry2(function gt(a, b) {
	        return a > b;
	    });
	
	    /**
	     * Returns `true` if the first argument is greater than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.lte
	     * @example
	     *
	     *      R.gte(2, 1); //=> true
	     *      R.gte(2, 2); //=> true
	     *      R.gte(2, 3); //=> false
	     *      R.gte('a', 'z'); //=> false
	     *      R.gte('z', 'a'); //=> true
	     */
	    var gte = _curry2(function gte(a, b) {
	        return a >= b;
	    });
	
	    /**
	     * Returns whether or not an object has an own property with the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      var hasName = R.has('name');
	     *      hasName({name: 'alice'});   //=> true
	     *      hasName({name: 'bob'});     //=> true
	     *      hasName({});                //=> false
	     *
	     *      var point = {x: 0, y: 0};
	     *      var pointHas = R.has(R.__, point);
	     *      pointHas('x');  //=> true
	     *      pointHas('y');  //=> true
	     *      pointHas('z');  //=> false
	     */
	    var has = _curry2(_has);
	
	    /**
	     * Returns whether or not an object or its prototype chain has a property with
	     * the specified name
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      function Rectangle(width, height) {
	     *        this.width = width;
	     *        this.height = height;
	     *      }
	     *      Rectangle.prototype.area = function() {
	     *        return this.width * this.height;
	     *      };
	     *
	     *      var square = new Rectangle(2, 2);
	     *      R.hasIn('width', square);  //=> true
	     *      R.hasIn('area', square);  //=> true
	     */
	    var hasIn = _curry2(function hasIn(prop, obj) {
	        return prop in obj;
	    });
	
	    /**
	     * Returns true if its arguments are identical, false otherwise. Values are
	     * identical if they reference the same memory. `NaN` is identical to `NaN`;
	     * `0` and `-0` are not identical.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      var o = {};
	     *      R.identical(o, o); //=> true
	     *      R.identical(1, 1); //=> true
	     *      R.identical(1, '1'); //=> false
	     *      R.identical([], []); //=> false
	     *      R.identical(0, -0); //=> false
	     *      R.identical(NaN, NaN); //=> true
	     */
	    // SameValue algorithm
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Step 6.a: NaN == NaN
	    var identical = _curry2(function identical(a, b) {
	        // SameValue algorithm
	        if (a === b) {
	            // Steps 1-5, 7-10
	            // Steps 6.b-6.e: +0 != -0
	            return a !== 0 || 1 / a === 1 / b;
	        } else {
	            // Step 6.a: NaN == NaN
	            return a !== a && b !== b;
	        }
	    });
	
	    /**
	     * A function that does nothing but return the parameter supplied to it. Good
	     * as a default or placeholder function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig a -> a
	     * @param {*} x The value to return.
	     * @return {*} The input value, `x`.
	     * @example
	     *
	     *      R.identity(1); //=> 1
	     *
	     *      var obj = {};
	     *      R.identity(obj) === obj; //=> true
	     */
	    var identity = _curry1(_identity);
	
	    /**
	     * Creates a function that will process either the `onTrue` or the `onFalse`
	     * function depending upon the result of the `condition` predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	     * @param {Function} condition A predicate function
	     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	     *                    function depending upon the result of the `condition` predicate.
	     * @see R.unless, R.when
	     * @example
	     *
	     *      var incCount = R.ifElse(
	     *        R.has('count'),
	     *        R.over(R.lensProp('count'), R.inc),
	     *        R.assoc('count', 1)
	     *      );
	     *      incCount({});           //=> { count: 1 }
	     *      incCount({ count: 1 }); //=> { count: 2 }
	     */
	    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
	        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
	            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	        });
	    });
	
	    /**
	     * Increments its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @see R.dec
	     * @example
	     *
	     *      R.inc(42); //=> 43
	     */
	    var inc = add(1);
	
	    /**
	     * Inserts the supplied element into the list, at index `index`. _Note that
	     * this is not destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} index The position to insert the element
	     * @param {*} elt The element to insert into the Array
	     * @param {Array} list The list to insert into
	     * @return {Array} A new Array with `elt` inserted at `index`.
	     * @example
	     *
	     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
	     */
	    var insert = _curry3(function insert(idx, elt, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        var result = _slice(list);
	        result.splice(idx, 0, elt);
	        return result;
	    });
	
	    /**
	     * Inserts the sub-list into the list, at index `index`. _Note that this is not
	     * destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig Number -> [a] -> [a] -> [a]
	     * @param {Number} index The position to insert the sub-list
	     * @param {Array} elts The sub-list to insert into the Array
	     * @param {Array} list The list to insert the sub-list into
	     * @return {Array} A new Array with `elts` inserted starting at `index`.
	     * @example
	     *
	     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
	     */
	    var insertAll = _curry3(function insertAll(idx, elts, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
	    });
	
	    /**
	     * Creates a new list with the separator interposed between elements.
	     *
	     * Dispatches to the `intersperse` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} separator The element to add to the list.
	     * @param {Array} list The list to be interposed.
	     * @return {Array} The new list.
	     * @example
	     *
	     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
	     */
	    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
	        var out = [];
	        var idx = 0;
	        var length = list.length;
	        while (idx < length) {
	            if (idx === length - 1) {
	                out.push(list[idx]);
	            } else {
	                out.push(list[idx], separator);
	            }
	            idx += 1;
	        }
	        return out;
	    }));
	
	    /**
	     * See if an object (`val`) is an instance of the supplied constructor. This
	     * function will check up the inheritance chain, if any.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Type
	     * @sig (* -> {*}) -> a -> Boolean
	     * @param {Object} ctor A constructor
	     * @param {*} val The value to test
	     * @return {Boolean}
	     * @example
	     *
	     *      R.is(Object, {}); //=> true
	     *      R.is(Number, 1); //=> true
	     *      R.is(Object, 1); //=> false
	     *      R.is(String, 's'); //=> true
	     *      R.is(String, new String('')); //=> true
	     *      R.is(Object, new String('')); //=> true
	     *      R.is(Object, 's'); //=> false
	     *      R.is(Number, {}); //=> false
	     */
	    var is = _curry2(function is(Ctor, val) {
	        return val != null && val.constructor === Ctor || val instanceof Ctor;
	    });
	
	    /**
	     * Tests whether or not an object is similar to an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.5.0
	     * @category Type
	     * @category List
	     * @sig * -> Boolean
	     * @param {*} x The object to test.
	     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	     * @example
	     *
	     *      R.isArrayLike([]); //=> true
	     *      R.isArrayLike(true); //=> false
	     *      R.isArrayLike({}); //=> false
	     *      R.isArrayLike({length: 10}); //=> false
	     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	     */
	    var isArrayLike = _curry1(function isArrayLike(x) {
	        if (_isArray(x)) {
	            return true;
	        }
	        if (!x) {
	            return false;
	        }
	        if (typeof x !== 'object') {
	            return false;
	        }
	        if (x instanceof String) {
	            return false;
	        }
	        if (x.nodeType === 1) {
	            return !!x.length;
	        }
	        if (x.length === 0) {
	            return true;
	        }
	        if (x.length > 0) {
	            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	        }
	        return false;
	    });
	
	    /**
	     * Checks if the input value is `null` or `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Type
	     * @sig * -> Boolean
	     * @param {*} x The value to test.
	     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
	     * @example
	     *
	     *      R.isNil(null); //=> true
	     *      R.isNil(undefined); //=> true
	     *      R.isNil(0); //=> false
	     *      R.isNil([]); //=> false
	     */
	    var isNil = _curry1(function isNil(x) {
	        return x == null;
	    });
	
	    /**
	     * Returns a list containing the names of all the enumerable own properties of
	     * the supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own properties.
	     * @example
	     *
	     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	     */
	    // cover IE < 9 keys issues
	    // Safari bug
	    var keys = function () {
	        // cover IE < 9 keys issues
	        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	        var nonEnumerableProps = [
	            'constructor',
	            'valueOf',
	            'isPrototypeOf',
	            'toString',
	            'propertyIsEnumerable',
	            'hasOwnProperty',
	            'toLocaleString'
	        ];
	        // Safari bug
	        var hasArgsEnumBug = function () {
	            'use strict';
	            return arguments.propertyIsEnumerable('length');
	        }();
	        var contains = function contains(list, item) {
	            var idx = 0;
	            while (idx < list.length) {
	                if (list[idx] === item) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        };
	        return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
	            return Object(obj) !== obj ? [] : Object.keys(obj);
	        }) : _curry1(function keys(obj) {
	            if (Object(obj) !== obj) {
	                return [];
	            }
	            var prop, nIdx;
	            var ks = [];
	            var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
	            for (prop in obj) {
	                if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
	                    ks[ks.length] = prop;
	                }
	            }
	            if (hasEnumBug) {
	                nIdx = nonEnumerableProps.length - 1;
	                while (nIdx >= 0) {
	                    prop = nonEnumerableProps[nIdx];
	                    if (_has(prop, obj) && !contains(ks, prop)) {
	                        ks[ks.length] = prop;
	                    }
	                    nIdx -= 1;
	                }
	            }
	            return ks;
	        });
	    }();
	
	    /**
	     * Returns a list containing the names of all the properties of the supplied
	     * object, including prototype properties.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.keysIn(f); //=> ['x', 'y']
	     */
	    var keysIn = _curry1(function keysIn(obj) {
	        var prop;
	        var ks = [];
	        for (prop in obj) {
	            ks[ks.length] = prop;
	        }
	        return ks;
	    });
	
	    /**
	     * Returns the number of elements in the array by returning `list.length`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [a] -> Number
	     * @param {Array} list The array to inspect.
	     * @return {Number} The length of the array.
	     * @example
	     *
	     *      R.length([]); //=> 0
	     *      R.length([1, 2, 3]); //=> 3
	     */
	    var length = _curry1(function length(list) {
	        return list != null && is(Number, list.length) ? list.length : NaN;
	    });
	
	    /**
	     * Returns `true` if the first argument is less than the second; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @see R.gt
	     * @example
	     *
	     *      R.lt(2, 1); //=> false
	     *      R.lt(2, 2); //=> false
	     *      R.lt(2, 3); //=> true
	     *      R.lt('a', 'z'); //=> true
	     *      R.lt('z', 'a'); //=> false
	     */
	    var lt = _curry2(function lt(a, b) {
	        return a < b;
	    });
	
	    /**
	     * Returns `true` if the first argument is less than or equal to the second;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean}
	     * @see R.gte
	     * @example
	     *
	     *      R.lte(2, 1); //=> false
	     *      R.lte(2, 2); //=> true
	     *      R.lte(2, 3); //=> true
	     *      R.lte('a', 'z'); //=> true
	     *      R.lte('z', 'a'); //=> false
	     */
	    var lte = _curry2(function lte(a, b) {
	        return a <= b;
	    });
	
	    /**
	     * The mapAccum function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from left to right, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var appender = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
	     */
	    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var tuple = [acc];
	        while (idx < len) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx += 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * The mapAccumRight function behaves like a combination of map and reduce; it
	     * applies a function to each element of a list, passing an accumulating
	     * parameter from right to left, and returning a final value of this
	     * accumulator together with the new list.
	     *
	     * Similar to `mapAccum`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should
	     * return a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var append = (a, b) => [a + b, a + b];
	     *
	     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
	     */
	    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
	        var idx = list.length - 1;
	        var result = [];
	        var tuple = [acc];
	        while (idx >= 0) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx -= 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * Tests a regular expression against a String. Note that this function will
	     * return an empty array when there are no matches. This differs from
	     * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
	     * which returns `null` when there are no matches.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig RegExp -> String -> [String | Undefined]
	     * @param {RegExp} rx A regular expression.
	     * @param {String} str The string to match against
	     * @return {Array} The list of matches or empty array.
	     * @see R.test
	     * @example
	     *
	     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
	     *      R.match(/a/, 'b'); //=> []
	     *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
	     */
	    var match = _curry2(function match(rx, str) {
	        return str.match(rx) || [];
	    });
	
	    /**
	     * mathMod behaves like the modulo operator should mathematically, unlike the
	     * `%` operator (and by extension, R.modulo). So while "-17 % 5" is -2,
	     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
	     * when the modulus is zero or negative.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} m The dividend.
	     * @param {Number} p the modulus.
	     * @return {Number} The result of `b mod a`.
	     * @example
	     *
	     *      R.mathMod(-17, 5);  //=> 3
	     *      R.mathMod(17, 5);   //=> 2
	     *      R.mathMod(17, -5);  //=> NaN
	     *      R.mathMod(17, 0);   //=> NaN
	     *      R.mathMod(17.2, 5); //=> NaN
	     *      R.mathMod(17, 5.3); //=> NaN
	     *
	     *      var clock = R.mathMod(R.__, 12);
	     *      clock(15); //=> 3
	     *      clock(24); //=> 0
	     *
	     *      var seventeenMod = R.mathMod(17);
	     *      seventeenMod(3);  //=> 2
	     *      seventeenMod(4);  //=> 1
	     *      seventeenMod(10); //=> 7
	     */
	    var mathMod = _curry2(function mathMod(m, p) {
	        if (!_isInteger(m)) {
	            return NaN;
	        }
	        if (!_isInteger(p) || p < 1) {
	            return NaN;
	        }
	        return (m % p + p) % p;
	    });
	
	    /**
	     * Returns the larger of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.maxBy, R.min
	     * @example
	     *
	     *      R.max(789, 123); //=> 789
	     *      R.max('a', 'b'); //=> 'b'
	     */
	    var max = _curry2(function max(a, b) {
	        return b > a ? b : a;
	    });
	
	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * larger result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.max, R.minBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.maxBy(square, -3, 2); //=> -3
	     *
	     *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
	     *      R.reduce(R.maxBy(square), 0, []); //=> 0
	     */
	    var maxBy = _curry3(function maxBy(f, a, b) {
	        return f(b) > f(a) ? b : a;
	    });
	
	    /**
	     * Create a new object with the own properties of the first object merged with
	     * the own properties of the second object. If a key exists in both objects,
	     * the value from the second object will be used.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> {k: v} -> {k: v}
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.mergeWith, R.mergeWithKey
	     * @example
	     *
	     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	     *      //=> { 'name': 'fred', 'age': 40 }
	     *
	     *      var resetToDefault = R.merge(R.__, {x: 0});
	     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	     */
	    var merge = _curry2(function merge(l, r) {
	        return _assign({}, l, r);
	    });
	
	    /**
	     * Merges a list of objects together into one object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig [{k: v}] -> {k: v}
	     * @param {Array} list An array of objects
	     * @return {Object} A merged object.
	     * @see R.reduce
	     * @example
	     *
	     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
	     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
	     */
	    var mergeAll = _curry1(function mergeAll(list) {
	        return _assign.apply(null, [{}].concat(list));
	    });
	
	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the key
	     * and the values associated with the key in each object, with the result being
	     * used as the value associated with the key in the returned object. The key
	     * will be excluded from the returned object if the resulting value is
	     * `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (String -> a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWith
	     * @example
	     *
	     *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
	     *      R.mergeWithKey(concatValues,
	     *                     { a: true, thing: 'foo', values: [10, 20] },
	     *                     { b: true, thing: 'bar', values: [15, 35] });
	     *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
	     */
	    var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
	        var result = {};
	        var k;
	        for (k in l) {
	            if (_has(k, l)) {
	                result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
	            }
	        }
	        for (k in r) {
	            if (_has(k, r) && !_has(k, result)) {
	                result[k] = r[k];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns the smaller of its two arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord a => a -> a -> a
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.minBy, R.max
	     * @example
	     *
	     *      R.min(789, 123); //=> 123
	     *      R.min('a', 'b'); //=> 'a'
	     */
	    var min = _curry2(function min(a, b) {
	        return b < a ? b : a;
	    });
	
	    /**
	     * Takes a function and two values, and returns whichever value produces the
	     * smaller result when passed to the provided function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> a -> a -> a
	     * @param {Function} f
	     * @param {*} a
	     * @param {*} b
	     * @return {*}
	     * @see R.min, R.maxBy
	     * @example
	     *
	     *      //  square :: Number -> Number
	     *      var square = n => n * n;
	     *
	     *      R.minBy(square, -3, 2); //=> 2
	     *
	     *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
	     *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
	     */
	    var minBy = _curry3(function minBy(f, a, b) {
	        return f(b) < f(a) ? b : a;
	    });
	
	    /**
	     * Divides the second parameter by the first and returns the remainder. Note
	     * that this function preserves the JavaScript-style behavior for modulo. For
	     * mathematical modulo see `mathMod`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The value to the divide.
	     * @param {Number} b The pseudo-modulus
	     * @return {Number} The result of `b % a`.
	     * @see R.mathMod
	     * @example
	     *
	     *      R.modulo(17, 3); //=> 2
	     *      // JS behavior:
	     *      R.modulo(-17, 3); //=> -2
	     *      R.modulo(17, -3); //=> 2
	     *
	     *      var isOdd = R.modulo(R.__, 2);
	     *      isOdd(42); //=> 0
	     *      isOdd(21); //=> 1
	     */
	    var modulo = _curry2(function modulo(a, b) {
	        return a % b;
	    });
	
	    /**
	     * Multiplies two numbers. Equivalent to `a * b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a * b`.
	     * @see R.divide
	     * @example
	     *
	     *      var double = R.multiply(2);
	     *      var triple = R.multiply(3);
	     *      double(3);       //=>  6
	     *      triple(4);       //=> 12
	     *      R.multiply(2, 5);  //=> 10
	     */
	    var multiply = _curry2(function multiply(a, b) {
	        return a * b;
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly `n` parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} n The desired arity of the new function.
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity `n`.
	     * @example
	     *
	     *      var takesTwoArgs = (a, b) => [a, b];
	     *
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.nAry(1, takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only `n` arguments are passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var nAry = _curry2(function nAry(n, fn) {
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.call(this);
	            };
	        case 1:
	            return function (a0) {
	                return fn.call(this, a0);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.call(this, a0, a1);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.call(this, a0, a1, a2);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.call(this, a0, a1, a2, a3);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.call(this, a0, a1, a2, a3, a4);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
	            };
	        default:
	            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
	        }
	    });
	
	    /**
	     * Negates its argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.negate(42); //=> -42
	     */
	    var negate = _curry1(function negate(n) {
	        return -n;
	    });
	
	    /**
	     * Returns `true` if no elements of the list match the predicate, `false`
	     * otherwise.
	     *
	     * Dispatches to the `any` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
	     * @see R.all, R.any
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
	     *      R.none(isEven, [1, 3, 5, 7, 8, 11]); //=> false
	     */
	    var none = _curry2(_complement(_dispatchable('any', _xany, any)));
	
	    /**
	     * A function that returns the `!` of its argument. It will return `true` when
	     * passed false-y value, and `false` when passed a truth-y one.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> Boolean
	     * @param {*} a any value
	     * @return {Boolean} the logical inverse of passed argument.
	     * @see R.complement
	     * @example
	     *
	     *      R.not(true); //=> false
	     *      R.not(false); //=> true
	     *      R.not(0); => true
	     *      R.not(1); => false
	     */
	    var not = _curry1(function not(a) {
	        return !a;
	    });
	
	    /**
	     * Returns the nth element of the given list or string. If n is negative the
	     * element at index length + n is returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> a | Undefined
	     * @sig Number -> String -> String
	     * @param {Number} offset
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      var list = ['foo', 'bar', 'baz', 'quux'];
	     *      R.nth(1, list); //=> 'bar'
	     *      R.nth(-1, list); //=> 'quux'
	     *      R.nth(-99, list); //=> undefined
	     *
	     *      R.nth(2, 'abc'); //=> 'c'
	     *      R.nth(3, 'abc'); //=> ''
	     */
	    var nth = _curry2(function nth(offset, list) {
	        var idx = offset < 0 ? list.length + offset : offset;
	        return _isString(list) ? list.charAt(idx) : list[idx];
	    });
	
	    /**
	     * Returns a function which returns its nth argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig Number -> *... -> *
	     * @param {Number} n
	     * @return {Function}
	     * @example
	     *
	     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
	     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
	     */
	    var nthArg = _curry1(function nthArg(n) {
	        return function () {
	            return nth(n, arguments);
	        };
	    });
	
	    /**
	     * Creates an object containing a single key:value pair.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig String -> a -> {String:a}
	     * @param {String} key
	     * @param {*} val
	     * @return {Object}
	     * @see R.pair
	     * @example
	     *
	     *      var matchPhrases = R.compose(
	     *        R.objOf('must'),
	     *        R.map(R.objOf('match_phrase'))
	     *      );
	     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
	     */
	    var objOf = _curry2(function objOf(key, val) {
	        var obj = {};
	        obj[key] = val;
	        return obj;
	    });
	
	    /**
	     * Returns a singleton array containing the value provided.
	     *
	     * Note this `of` is different from the ES6 `of`; See
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig a -> [a]
	     * @param {*} x any value
	     * @return {Array} An array wrapping `x`.
	     * @example
	     *
	     *      R.of(null); //=> [null]
	     *      R.of([42]); //=> [[42]]
	     */
	    var of = _curry1(_of);
	
	    /**
	     * Accepts a function `fn` and returns a function that guards invocation of
	     * `fn` such that `fn` can only ever be called once, no matter how many times
	     * the returned function is invoked. The first value calculated is returned in
	     * subsequent invocations.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> (a... -> b)
	     * @param {Function} fn The function to wrap in a call-only-once wrapper.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var addOneOnce = R.once(x => x + 1);
	     *      addOneOnce(10); //=> 11
	     *      addOneOnce(addOneOnce(50)); //=> 11
	     */
	    var once = _curry1(function once(fn) {
	        var called = false;
	        var result;
	        return _arity(fn.length, function () {
	            if (called) {
	                return result;
	            }
	            called = true;
	            result = fn.apply(this, arguments);
	            return result;
	        });
	    });
	
	    /**
	     * Returns `true` if one or both of its arguments are `true`. Returns `false`
	     * if both arguments are `false`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {Boolean} a A boolean value
	     * @param {Boolean} b A boolean value
	     * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
	     * @see R.either
	     * @example
	     *
	     *      R.or(true, true); //=> true
	     *      R.or(true, false); //=> true
	     *      R.or(false, true); //=> true
	     *      R.or(false, false); //=> false
	     */
	    var or = _curry2(function or(a, b) {
	        return a || b;
	    });
	
	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the result of applying the given function to
	     * the focused value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> (a -> a) -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
	     */
	    // `Identity` is a functor that holds a single value, where `map` simply
	    // transforms the held value with the provided function.
	    // The value returned by the getter function is first transformed with `f`,
	    // then set as the value of an `Identity`. This is then mapped over with the
	    // setter function of the lens.
	    var over = function () {
	        // `Identity` is a functor that holds a single value, where `map` simply
	        // transforms the held value with the provided function.
	        var Identity = function (x) {
	            return {
	                value: x,
	                map: function (f) {
	                    return Identity(f(x));
	                }
	            };
	        };
	        return _curry3(function over(lens, f, x) {
	            // The value returned by the getter function is first transformed with `f`,
	            // then set as the value of an `Identity`. This is then mapped over with the
	            // setter function of the lens.
	            return lens(function (y) {
	                return Identity(f(y));
	            })(x).value;
	        });
	    }();
	
	    /**
	     * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category List
	     * @sig a -> b -> (a,b)
	     * @param {*} fst
	     * @param {*} snd
	     * @return {Array}
	     * @see R.objOf, R.of
	     * @example
	     *
	     *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
	     */
	    var pair = _curry2(function pair(fst, snd) {
	        return [
	            fst,
	            snd
	        ];
	    });
	
	    /**
	     * Retrieve the value at a given path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig [String] -> {k: v} -> v | Undefined
	     * @param {Array} path The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path`.
	     * @example
	     *
	     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
	     */
	    var path = _curry2(function path(paths, obj) {
	        var val = obj;
	        var idx = 0;
	        while (idx < paths.length) {
	            if (val == null) {
	                return;
	            }
	            val = val[paths[idx]];
	            idx += 1;
	        }
	        return val;
	    });
	
	    /**
	     * If the given, non-null object has a value at the given path, returns the
	     * value at that path. Otherwise returns the provided default value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Object
	     * @sig a -> [String] -> Object -> a
	     * @param {*} d The default value.
	     * @param {Array} p The path to use.
	     * @param {Object} obj The object to retrieve the nested property from.
	     * @return {*} The data at `path` of the supplied object or the default value.
	     * @example
	     *
	     *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
	     *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
	     */
	    var pathOr = _curry3(function pathOr(d, p, obj) {
	        return defaultTo(d, path(p, obj));
	    });
	
	    /**
	     * Returns `true` if the specified object property at given path satisfies the
	     * given predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Logic
	     * @sig (a -> Boolean) -> [String] -> Object -> Boolean
	     * @param {Function} pred
	     * @param {Array} propPath
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propSatisfies, R.path
	     * @example
	     *
	     *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
	     */
	    var pathSatisfies = _curry3(function pathSatisfies(pred, propPath, obj) {
	        return propPath.length > 0 && pred(path(propPath, obj));
	    });
	
	    /**
	     * Returns a partial copy of an object containing only the keys specified. If
	     * the key does not exist, the property is ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.omit, R.props
	     * @example
	     *
	     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
	     */
	    var pick = _curry2(function pick(names, obj) {
	        var result = {};
	        var idx = 0;
	        while (idx < names.length) {
	            if (names[idx] in obj) {
	                result[names[idx]] = obj[names[idx]];
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Similar to `pick` except that this one includes a `key: undefined` pair for
	     * properties that don't exist.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
	     */
	    var pickAll = _curry2(function pickAll(names, obj) {
	        var result = {};
	        var idx = 0;
	        var len = names.length;
	        while (idx < len) {
	            var name = names[idx];
	            result[name] = obj[name];
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a partial copy of an object containing only the keys that satisfy
	     * the supplied predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
	     * @param {Function} pred A predicate to determine whether or not a key
	     *        should be included on the output object.
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties that satisfy `pred`
	     *         on it.
	     * @see R.pick, R.filter
	     * @example
	     *
	     *      var isUpperCase = (val, key) => key.toUpperCase() === key;
	     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
	     */
	    var pickBy = _curry2(function pickBy(test, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (test(obj[prop], prop, obj)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list with the given element at the front, followed by the
	     * contents of the list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The item to add to the head of the output list.
	     * @param {Array} list The array to add to the tail of the output list.
	     * @return {Array} A new array.
	     * @see R.append
	     * @example
	     *
	     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
	     */
	    var prepend = _curry2(function prepend(el, list) {
	        return _concat([el], list);
	    });
	
	    /**
	     * Returns a function that when supplied an object returns the indicated
	     * property of that object, if it exists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig s -> {s: a} -> a | Undefined
	     * @param {String} p The property name
	     * @param {Object} obj The object to query
	     * @return {*} The value at `obj.p`.
	     * @example
	     *
	     *      R.prop('x', {x: 100}); //=> 100
	     *      R.prop('x', {}); //=> undefined
	     */
	    var prop = _curry2(function prop(p, obj) {
	        return obj[p];
	    });
	
	    /**
	     * If the given, non-null object has an own property with the specified name,
	     * returns the value of that property. Otherwise returns the provided default
	     * value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Object
	     * @sig a -> String -> Object -> a
	     * @param {*} val The default value.
	     * @param {String} p The name of the property to return.
	     * @param {Object} obj The object to query.
	     * @return {*} The value of given property of the supplied object or the default value.
	     * @example
	     *
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var favorite = R.prop('favoriteLibrary');
	     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
	     *
	     *      favorite(alice);  //=> undefined
	     *      favoriteWithDefault(alice);  //=> 'Ramda'
	     */
	    var propOr = _curry3(function propOr(val, p, obj) {
	        return obj != null && _has(p, obj) ? obj[p] : val;
	    });
	
	    /**
	     * Returns `true` if the specified object property satisfies the given
	     * predicate; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Logic
	     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
	     * @param {Function} pred
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.propEq, R.propIs
	     * @example
	     *
	     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
	     */
	    var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
	        return pred(obj[name]);
	    });
	
	    /**
	     * Acts as multiple `prop`: array of keys in, array of values out. Preserves
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [k] -> {k: v} -> [v]
	     * @param {Array} ps The property names to fetch
	     * @param {Object} obj The object to query
	     * @return {Array} The corresponding values or partially applied function.
	     * @example
	     *
	     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
	     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
	     *
	     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
	     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
	     */
	    var props = _curry2(function props(ps, obj) {
	        var len = ps.length;
	        var out = [];
	        var idx = 0;
	        while (idx < len) {
	            out[idx] = obj[ps[idx]];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> Number -> [Number]
	     * @param {Number} from The first number in the list.
	     * @param {Number} to One more than the last number in the list.
	     * @return {Array} The list of numbers in tthe set `[a, b)`.
	     * @example
	     *
	     *      R.range(1, 5);    //=> [1, 2, 3, 4]
	     *      R.range(50, 53);  //=> [50, 51, 52]
	     */
	    var range = _curry2(function range(from, to) {
	        if (!(_isNumber(from) && _isNumber(to))) {
	            throw new TypeError('Both arguments to range must be numbers');
	        }
	        var result = [];
	        var n = from;
	        while (n < to) {
	            result.push(n);
	            n += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * Similar to `reduce`, except moves through the input list from the right to
	     * the left.
	     *
	     * The iterator function receives two values: *(acc, value)*
	     *
	     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.addIndex
	     * @example
	     *
	     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
	     *      var flattenPairs = (acc, pair) => acc.concat(pair);
	     *
	     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
	     */
	    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            acc = fn(acc, list[idx]);
	            idx -= 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Returns a value wrapped to indicate that it is the final value of the reduce
	     * and transduce functions. The returned value should be considered a black
	     * box: the internal structure is not guaranteed to be stable.
	     *
	     * Note: this optimization is unavailable to functions not explicitly listed
	     * above. For instance, it is not currently supported by reduceRight.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category List
	     * @sig a -> *
	     * @param {*} x The final value of the reduce.
	     * @return {*} The wrapped value.
	     * @see R.reduce, R.transduce
	     * @example
	     *
	     *      R.reduce(
	     *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
	     *        0,
	     *        [1, 2, 3, 4, 5]) // 10
	     */
	    var reduced = _curry1(_reduced);
	
	    /**
	     * Removes the sub-list of `list` starting at index `start` and containing
	     * `count` elements. _Note that this is not destructive_: it returns a copy of
	     * the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.2
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @param {Number} start The position to start removing elements
	     * @param {Number} count The number of elements to remove
	     * @param {Array} list The list to remove from
	     * @return {Array} A new Array with `count` elements from `start` removed.
	     * @example
	     *
	     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
	     */
	    var remove = _curry3(function remove(start, count, list) {
	        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
	    });
	
	    /**
	     * Replace a substring or regex match in a string with a replacement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category String
	     * @sig RegExp|String -> String -> String -> String
	     * @param {RegExp|String} pattern A regular expression or a substring to match.
	     * @param {String} replacement The string to replace the matches with.
	     * @param {String} str The String to do the search and replacement in.
	     * @return {String} The result.
	     * @example
	     *
	     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *
	     *      // Use the "g" (global) flag to replace all occurrences:
	     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
	     */
	    var replace = _curry3(function replace(regex, replacement, str) {
	        return str.replace(regex, replacement);
	    });
	
	    /**
	     * Returns a new list or string with the elements or characters in reverse
	     * order.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {Array|String}
	     * @example
	     *
	     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	     *      R.reverse([1, 2]);     //=> [2, 1]
	     *      R.reverse([1]);        //=> [1]
	     *      R.reverse([]);         //=> []
	     *
	     *      R.reverse('abc');      //=> 'cba'
	     *      R.reverse('ab');       //=> 'ba'
	     *      R.reverse('a');        //=> 'a'
	     *      R.reverse('');         //=> ''
	     */
	    var reverse = _curry1(function reverse(list) {
	        return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
	    });
	
	    /**
	     * Scan is similar to reduce, but returns a list of successively reduced values
	     * from the left
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> [a]
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} A list of all intermediately reduced values.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
	     */
	    var scan = _curry3(function scan(fn, acc, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [acc];
	        while (idx < len) {
	            acc = fn(acc, list[idx]);
	            result[idx + 1] = acc;
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns the result of "setting" the portion of the given data structure
	     * focused by the given lens to the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> a -> s -> s
	     * @param {Lens} lens
	     * @param {*} v
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
	     *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
	     */
	    var set = _curry3(function set(lens, v, x) {
	        return over(lens, always(v), x);
	    });
	
	    /**
	     * Returns the elements of the given list or string (or object with a `slice`
	     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	     *
	     * Dispatches to the `slice` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @sig Number -> Number -> String -> String
	     * @param {Number} fromIndex The start index (inclusive).
	     * @param {Number} toIndex The end index (exclusive).
	     * @param {*} list
	     * @return {*}
	     * @example
	     *
	     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	     */
	    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	        return Array.prototype.slice.call(list, fromIndex, toIndex);
	    }));
	
	    /**
	     * Returns a copy of the list, sorted according to the comparator function,
	     * which should accept two values at a time and return a negative number if the
	     * first value is smaller, a positive number if it's larger, and zero if they
	     * are equal. Please note that this is a **copy** of the list. It does not
	     * modify the original.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,a -> Number) -> [a] -> [a]
	     * @param {Function} comparator A sorting function :: a -> b -> Int
	     * @param {Array} list The list to sort
	     * @return {Array} a new array with its elements sorted by the comparator function.
	     * @example
	     *
	     *      var diff = function(a, b) { return a - b; };
	     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
	     */
	    var sort = _curry2(function sort(comparator, list) {
	        return _slice(list).sort(comparator);
	    });
	
	    /**
	     * Sorts the list according to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig Ord b => (a -> b) -> [a] -> [a]
	     * @param {Function} fn
	     * @param {Array} list The list to sort.
	     * @return {Array} A new list sorted by the keys generated by `fn`.
	     * @example
	     *
	     *      var sortByFirstItem = R.sortBy(R.prop(0));
	     *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
	     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
	     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var bob = {
	     *        name: 'Bob',
	     *        age: -10
	     *      };
	     *      var clara = {
	     *        name: 'clara',
	     *        age: 314.159
	     *      };
	     *      var people = [clara, bob, alice];
	     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
	     */
	    var sortBy = _curry2(function sortBy(fn, list) {
	        return _slice(list).sort(function (a, b) {
	            var aa = fn(a);
	            var bb = fn(b);
	            return aa < bb ? -1 : aa > bb ? 1 : 0;
	        });
	    });
	
	    /**
	     * Splits a given list or string at a given index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig Number -> [a] -> [[a], [a]]
	     * @sig Number -> String -> [String, String]
	     * @param {Number} index The index where the array/string is split.
	     * @param {Array|String} array The array/string to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
	     *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
	     *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
	     */
	    var splitAt = _curry2(function splitAt(index, array) {
	        return [
	            slice(0, index, array),
	            slice(index, length(array), array)
	        ];
	    });
	
	    /**
	     * Splits a collection into slices of the specified length.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @sig Number -> String -> [String]
	     * @param {Number} n
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
	     *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
	     */
	    var splitEvery = _curry2(function splitEvery(n, list) {
	        if (n <= 0) {
	            throw new Error('First argument to splitEvery must be a positive integer');
	        }
	        var result = [];
	        var idx = 0;
	        while (idx < list.length) {
	            result.push(slice(idx, idx += n, list));
	        }
	        return result;
	    });
	
	    /**
	     * Takes a list and a predicate and returns a pair of lists with the following properties:
	     *
	     *  - the result of concatenating the two output lists is equivalent to the input list;
	     *  - none of the elements of the first output list satisfies the predicate; and
	     *  - if the second output list is non-empty, its first element satisfies the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [[a], [a]]
	     * @param {Function} pred The predicate that determines where the array is split.
	     * @param {Array} list The array to be split.
	     * @return {Array}
	     * @example
	     *
	     *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
	     */
	    var splitWhen = _curry2(function splitWhen(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var prefix = [];
	        while (idx < len && !pred(list[idx])) {
	            prefix.push(list[idx]);
	            idx += 1;
	        }
	        return [
	            prefix,
	            _slice(list, idx)
	        ];
	    });
	
	    /**
	     * Subtracts its second argument from its first argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a - b`.
	     * @see R.add
	     * @example
	     *
	     *      R.subtract(10, 8); //=> 2
	     *
	     *      var minus5 = R.subtract(R.__, 5);
	     *      minus5(17); //=> 12
	     *
	     *      var complementaryAngle = R.subtract(90);
	     *      complementaryAngle(30); //=> 60
	     *      complementaryAngle(72); //=> 18
	     */
	    var subtract = _curry2(function subtract(a, b) {
	        return Number(a) - Number(b);
	    });
	
	    /**
	     * Returns all but the first element of the given list or string (or object
	     * with a `tail` method).
	     *
	     * Dispatches to the `slice` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.head, R.init, R.last
	     * @example
	     *
	     *      R.tail([1, 2, 3]);  //=> [2, 3]
	     *      R.tail([1, 2]);     //=> [2]
	     *      R.tail([1]);        //=> []
	     *      R.tail([]);         //=> []
	     *
	     *      R.tail('abc');  //=> 'bc'
	     *      R.tail('ab');   //=> 'b'
	     *      R.tail('a');    //=> ''
	     *      R.tail('');     //=> ''
	     */
	    var tail = _checkForMethod('tail', slice(1, Infinity));
	
	    /**
	     * Returns the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `take` method).
	     *
	     * Dispatches to the `take` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.drop
	     * @example
	     *
	     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(3, 'ramda');               //=> 'ram'
	     *
	     *      var personnel = [
	     *        'Dave Brubeck',
	     *        'Paul Desmond',
	     *        'Eugene Wright',
	     *        'Joe Morello',
	     *        'Gerry Mulligan',
	     *        'Bob Bates',
	     *        'Joe Dodge',
	     *        'Ron Crotty'
	     *      ];
	     *
	     *      var takeFive = R.take(5);
	     *      takeFive(personnel);
	     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
	     */
	    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
	        return slice(0, n < 0 ? Infinity : n, xs);
	    }));
	
	    /**
	     * Returns a new list containing the last `n` elements of a given list, passing
	     * each value to the supplied predicate function, and terminating when the
	     * predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropLastWhile, R.addIndex
	     * @example
	     *
	     *      var isNotOne = x => x !== 1;
	     *
	     *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
	     */
	    var takeLastWhile = _curry2(function takeLastWhile(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0 && fn(list[idx])) {
	            idx -= 1;
	        }
	        return _slice(list, idx + 1, Infinity);
	    });
	
	    /**
	     * Returns a new list containing the first `n` elements of a given list,
	     * passing each value to the supplied predicate function, and terminating when
	     * the predicate function returns `false`. Excludes the element that caused the
	     * predicate function to fail. The predicate function is passed one argument:
	     * *(value)*.
	     *
	     * Dispatches to the `takeWhile` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.dropWhile, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isNotFour = x => x !== 4;
	     *
	     *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
	     */
	    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len && fn(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, 0, idx);
	    }));
	
	    /**
	     * Runs the given function with the supplied object, then returns the object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> *) -> a -> a
	     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
	     * @param {*} x
	     * @return {*} `x`.
	     * @example
	     *
	     *      var sayX = x => console.log('x is ' + x);
	     *      R.tap(sayX, 100); //=> 100
	     *      //-> 'x is 100'
	     */
	    var tap = _curry2(function tap(fn, x) {
	        fn(x);
	        return x;
	    });
	
	    /**
	     * Calls an input function `n` times, returning an array containing the results
	     * of those function calls.
	     *
	     * `fn` is passed one argument: The current value of `n`, which begins at `0`
	     * and is gradually incremented to `n - 1`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.3
	     * @category List
	     * @sig (Number -> a) -> Number -> [a]
	     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
	     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
	     * @return {Array} An array containing the return values of all calls to `fn`.
	     * @example
	     *
	     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
	     */
	    var times = _curry2(function times(fn, n) {
	        var len = Number(n);
	        var idx = 0;
	        var list;
	        if (len < 0 || isNaN(len)) {
	            throw new RangeError('n must be a non-negative number');
	        }
	        list = new Array(len);
	        while (idx < len) {
	            list[idx] = fn(idx);
	            idx += 1;
	        }
	        return list;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays. Only the object's
	     * own properties are used.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own properties.
	     * @see R.fromPairs
	     * @example
	     *
	     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
	     */
	    var toPairs = _curry1(function toPairs(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            if (_has(prop, obj)) {
	                pairs[pairs.length] = [
	                    prop,
	                    obj[prop]
	                ];
	            }
	        }
	        return pairs;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays. The object's own
	     * properties and prototype properties are used. Note that the order of the
	     * output array is not guaranteed to be consistent across different JS
	     * platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own
	     *         and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
	     */
	    var toPairsIn = _curry1(function toPairsIn(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            pairs[pairs.length] = [
	                prop,
	                obj[prop]
	            ];
	        }
	        return pairs;
	    });
	
	    /**
	     * Transposes the rows and columns of a 2D list.
	     * When passed a list of `n` lists of length `x`,
	     * returns a list of `x` lists of length `n`.
	     *
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [[a]] -> [[a]]
	     * @param {Array} list A 2D list
	     * @return {Array} A 2D list
	     * @example
	     *
	     *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
	     *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     *
	     * If some of the rows are shorter than the following rows, their elements are skipped:
	     *
	     *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
	     */
	    var transpose = _curry1(function transpose(outerlist) {
	        var i = 0;
	        var result = [];
	        while (i < outerlist.length) {
	            var innerlist = outerlist[i];
	            var j = 0;
	            while (j < innerlist.length) {
	                if (typeof result[j] === 'undefined') {
	                    result[j] = [];
	                }
	                result[j].push(innerlist[j]);
	                j += 1;
	            }
	            i += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Removes (strips) whitespace from both ends of the string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to trim.
	     * @return {String} Trimmed version of `str`.
	     * @example
	     *
	     *      R.trim('   xyz  '); //=> 'xyz'
	     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
	     */
	    var trim = function () {
	        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
	        var zeroWidth = '\u200B';
	        var hasProtoTrim = typeof String.prototype.trim === 'function';
	        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
	            return _curry1(function trim(str) {
	                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
	                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
	                return str.replace(beginRx, '').replace(endRx, '');
	            });
	        } else {
	            return _curry1(function trim(str) {
	                return str.trim();
	            });
	        }
	    }();
	
	    /**
	     * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
	     * function evaluates the `tryer`; if it does not throw, it simply returns the
	     * result. If the `tryer` *does* throw, the returned function evaluates the
	     * `catcher` function and returns its result. Note that for effective
	     * composition with this function, both the `tryer` and `catcher` functions
	     * must return the same type of results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
	     * @param {Function} tryer The function that may throw.
	     * @param {Function} catcher The function that will be evaluated if `tryer` throws.
	     * @return {Function} A new function that will catch exceptions and send then to the catcher.
	     * @example
	     *
	     *      R.tryCatch(R.prop('x'), R.F, {x: true}); //=> true
	     *      R.tryCatch(R.prop('x'), R.F, null);      //=> false
	     */
	    var tryCatch = _curry2(function _tryCatch(tryer, catcher) {
	        return _arity(tryer.length, function () {
	            try {
	                return tryer.apply(this, arguments);
	            } catch (e) {
	                return catcher.apply(this, _concat([e], arguments));
	            }
	        });
	    });
	
	    /**
	     * Gives a single-word string description of the (native) type of a value,
	     * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
	     * attempt to distinguish user Object types any further, reporting them all as
	     * 'Object'.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Type
	     * @sig (* -> {*}) -> String
	     * @param {*} val The value to test
	     * @return {String}
	     * @example
	     *
	     *      R.type({}); //=> "Object"
	     *      R.type(1); //=> "Number"
	     *      R.type(false); //=> "Boolean"
	     *      R.type('s'); //=> "String"
	     *      R.type(null); //=> "Null"
	     *      R.type([]); //=> "Array"
	     *      R.type(/[A-z]/); //=> "RegExp"
	     */
	    var type = _curry1(function type(val) {
	        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
	    });
	
	    /**
	     * Takes a function `fn`, which takes a single array argument, and returns a
	     * function which:
	     *
	     *   - takes any number of positional arguments;
	     *   - passes these arguments to `fn` as an array; and
	     *   - returns the result.
	     *
	     * In other words, R.unapply derives a variadic function from a function which
	     * takes an array. R.unapply is the inverse of R.apply.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Function
	     * @sig ([*...] -> a) -> (*... -> a)
	     * @param {Function} fn
	     * @return {Function}
	     * @see R.apply
	     * @example
	     *
	     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
	     */
	    var unapply = _curry1(function unapply(fn) {
	        return function () {
	            return fn(_slice(arguments));
	        };
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 1 parameter. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> b) -> (a -> b)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 1.
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.unary(takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only 1 argument is passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var unary = _curry1(function unary(fn) {
	        return nAry(1, fn);
	    });
	
	    /**
	     * Returns a function of arity `n` from a (manually) curried function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Function
	     * @sig Number -> (a -> b) -> (a -> c)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to uncurry.
	     * @return {Function} A new function.
	     * @see R.curry
	     * @example
	     *
	     *      var addFour = a => b => c => d => a + b + c + d;
	     *
	     *      var uncurriedAddFour = R.uncurryN(4, addFour);
	     *      uncurriedAddFour(1, 2, 3, 4); //=> 10
	     */
	    var uncurryN = _curry2(function uncurryN(depth, fn) {
	        return curryN(depth, function () {
	            var currentDepth = 1;
	            var value = fn;
	            var idx = 0;
	            var endIdx;
	            while (currentDepth <= depth && typeof value === 'function') {
	                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
	                value = value.apply(this, _slice(arguments, idx, endIdx));
	                currentDepth += 1;
	                idx = endIdx;
	            }
	            return value;
	        });
	    });
	
	    /**
	     * Builds a list from a seed value. Accepts an iterator function, which returns
	     * either false to stop iteration or an array of length 2 containing the value
	     * to add to the resulting list and the seed to be used in the next call to the
	     * iterator function.
	     *
	     * The iterator function receives one argument: *(seed)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category List
	     * @sig (a -> [b]) -> * -> [b]
	     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
	     *        either false to quit iteration or an array of length two to proceed. The element
	     *        at index 0 of this array will be added to the resulting array, and the element
	     *        at index 1 will be passed to the next call to `fn`.
	     * @param {*} seed The seed value.
	     * @return {Array} The final list.
	     * @example
	     *
	     *      var f = n => n > 50 ? false : [-n, n + 10];
	     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
	     */
	    var unfold = _curry2(function unfold(fn, seed) {
	        var pair = fn(seed);
	        var result = [];
	        while (pair && pair.length) {
	            result[result.length] = pair[0];
	            pair = fn(pair[1]);
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied predicate to
	     * two list elements. Prefers the first item if two items compare equal based
	     * on the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      var strEq = R.eqBy(String);
	     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
	     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
	     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
	     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
	     */
	    var uniqWith = _curry2(function uniqWith(pred, list) {
	        var idx = 0;
	        var len = list.length;
	        var result = [];
	        var item;
	        while (idx < len) {
	            item = list[idx];
	            if (!_containsWith(pred, item, result)) {
	                result[result.length] = item;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is not satisfied, the function will return the result of
	     * calling the `whenFalseFn` function with the same argument. If the predicate
	     * is satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred        A predicate function
	     * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
	     *                               to a falsy value.
	     * @param {*}        x           An object to test with the `pred` function and
	     *                               pass to `whenFalseFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
	     * @see R.ifElse, R.when
	     * @example
	     *
	     *      // coerceArray :: (a|[a]) -> [a]
	     *      var coerceArray = R.unless(R.isArrayLike, R.of);
	     *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
	     *      coerceArray(1);         //=> [1]
	     */
	    var unless = _curry3(function unless(pred, whenFalseFn, x) {
	        return pred(x) ? x : whenFalseFn(x);
	    });
	
	    /**
	     * Takes a predicate, a transformation function, and an initial value,
	     * and returns a value of the same type as the initial value.
	     * It does so by applying the transformation until the predicate is satisfied,
	     * at which point it returns the satisfactory value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred A predicate function
	     * @param {Function} fn The iterator function
	     * @param {*} init Initial value
	     * @return {*} Final value that satisfies predicate
	     * @example
	     *
	     *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
	     */
	    var until = _curry3(function until(pred, fn, init) {
	        var val = init;
	        while (!pred(val)) {
	            val = fn(val);
	        }
	        return val;
	    });
	
	    /**
	     * Returns a new copy of the array with the element at the provided index
	     * replaced with the given value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} idx The index to update.
	     * @param {*} x The value to exist at the given index of the returned array.
	     * @param {Array|Arguments} list The source array-like object to be updated.
	     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
	     * @see R.adjust
	     * @example
	     *
	     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var update = _curry3(function update(idx, x, list) {
	        return adjust(always(x), idx, list);
	    });
	
	    /**
	     * Accepts a function `fn` and a list of transformer functions and returns a
	     * new curried function. When the new function is invoked, it calls the
	     * function `fn` with parameters consisting of the result of calling each
	     * supplied handler on successive arguments to the new function.
	     *
	     * If more arguments are passed to the returned function than transformer
	     * functions, those arguments are passed directly to `fn` as additional
	     * parameters. If you expect additional arguments that don't need to be
	     * transformed, although you can ignore them, it's best to pass an identity
	     * function so that the new function reports the correct arity.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} fn The function to wrap.
	     * @param {Array} transformers A list of transformer functions
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
	     *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
	     *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
	     */
	    var useWith = _curry2(function useWith(fn, transformers) {
	        return curryN(transformers.length, function () {
	            var args = [];
	            var idx = 0;
	            while (idx < transformers.length) {
	                args.push(transformers[idx].call(this, arguments[idx]));
	                idx += 1;
	            }
	            return fn.apply(this, args.concat(_slice(arguments, transformers.length)));
	        });
	    });
	
	    /**
	     * Returns a list of all the enumerable own properties of the supplied object.
	     * Note that the order of the output array is not guaranteed across different
	     * JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own properties.
	     * @example
	     *
	     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
	     */
	    var values = _curry1(function values(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var vals = [];
	        var idx = 0;
	        while (idx < len) {
	            vals[idx] = obj[props[idx]];
	            idx += 1;
	        }
	        return vals;
	    });
	
	    /**
	     * Returns a list of all the properties, including prototype properties, of the
	     * supplied object.
	     * Note that the order of the output array is not guaranteed to be consistent
	     * across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.valuesIn(f); //=> ['X', 'Y']
	     */
	    var valuesIn = _curry1(function valuesIn(obj) {
	        var prop;
	        var vs = [];
	        for (prop in obj) {
	            vs[vs.length] = obj[prop];
	        }
	        return vs;
	    });
	
	    /**
	     * Returns a "view" of the given data structure, determined by the given lens.
	     * The lens's focus determines which portion of the data structure is visible.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Lens s a -> s -> a
	     * @param {Lens} lens
	     * @param {*} x
	     * @return {*}
	     * @see R.prop, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});  //=> 1
	     *      R.view(xLens, {x: 4, y: 2});  //=> 4
	     */
	    // `Const` is a functor that effectively ignores the function given to `map`.
	    // Using `Const` effectively ignores the setter function of the `lens`,
	    // leaving the value returned by the getter function unmodified.
	    var view = function () {
	        // `Const` is a functor that effectively ignores the function given to `map`.
	        var Const = function (x) {
	            return {
	                value: x,
	                map: function () {
	                    return this;
	                }
	            };
	        };
	        return _curry2(function view(lens, x) {
	            // Using `Const` effectively ignores the setter function of the `lens`,
	            // leaving the value returned by the getter function unmodified.
	            return lens(Const)(x).value;
	        });
	    }();
	
	    /**
	     * Tests the final argument by passing it to the given predicate function. If
	     * the predicate is satisfied, the function will return the result of calling
	     * the `whenTrueFn` function with the same argument. If the predicate is not
	     * satisfied, the argument is returned as is.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Logic
	     * @sig (a -> Boolean) -> (a -> a) -> a -> a
	     * @param {Function} pred       A predicate function
	     * @param {Function} whenTrueFn A function to invoke when the `condition`
	     *                              evaluates to a truthy value.
	     * @param {*}        x          An object to test with the `pred` function and
	     *                              pass to `whenTrueFn` if necessary.
	     * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
	     * @see R.ifElse, R.unless
	     * @example
	     *
	     *      // truncate :: String -> String
	     *      var truncate = R.when(
	     *        R.propSatisfies(R.gt(R.__, 10), 'length'),
	     *        R.pipe(R.take(10), R.append('…'), R.join(''))
	     *      );
	     *      truncate('12345');         //=> '12345'
	     *      truncate('0123456789ABC'); //=> '0123456789…'
	     */
	    var when = _curry3(function when(pred, whenTrueFn, x) {
	        return pred(x) ? whenTrueFn(x) : x;
	    });
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec. Each of the spec's own properties must be a predicate function.
	     * Each predicate is applied to the value of the corresponding property of the
	     * test object. `where` returns true if all the predicates return true, false
	     * otherwise.
	     *
	     * `where` is well suited to declaratively expressing constraints for other
	     * functions such as `filter` and `find`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category Object
	     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.where({
	     *        a: R.equals('foo'),
	     *        b: R.complement(R.equals('bar')),
	     *        x: R.gt(_, 10),
	     *        y: R.lt(_, 20)
	     *      });
	     *
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
	     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
	     */
	    var where = _curry2(function where(spec, testObj) {
	        for (var prop in spec) {
	            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
	                return false;
	            }
	        }
	        return true;
	    });
	
	    /**
	     * Wrap a function inside another to allow you to make adjustments to the
	     * parameters, or do other processing either before the internal function is
	     * called or with its results.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
	     * @param {Function} fn The function to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var greet = name => 'Hello ' + name;
	     *
	     *      var shoutedGreet = R.wrap(greet, (gr, name) => gr(name).toUpperCase());
	     *
	     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
	     *
	     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
	     *        return gr(name.substring(0, 3));
	     *      });
	     *      shortenedGreet("Robert"); //=> "Hello Rob"
	     */
	    var wrap = _curry2(function wrap(fn, wrapper) {
	        return curryN(fn.length, function () {
	            return wrapper.apply(this, _concat([fn], arguments));
	        });
	    });
	
	    /**
	     * Creates a new list out of the two supplied by creating each possible pair
	     * from the lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The list made by combining each possible pair from
	     *         `as` and `bs` into pairs (`[a, b]`).
	     * @example
	     *
	     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
	     */
	    // = xprodWith(prepend); (takes about 3 times as long...)
	    var xprod = _curry2(function xprod(a, b) {
	        // = xprodWith(prepend); (takes about 3 times as long...)
	        var idx = 0;
	        var ilen = a.length;
	        var j;
	        var jlen = b.length;
	        var result = [];
	        while (idx < ilen) {
	            j = 0;
	            while (j < jlen) {
	                result[result.length] = [
	                    a[idx],
	                    b[j]
	                ];
	                j += 1;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by pairing up equally-positioned
	     * items from both lists. The returned list is truncated to the length of the
	     * shorter of the two input lists.
	     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
	     * @example
	     *
	     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     */
	    var zip = _curry2(function zip(a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = [
	                a[idx],
	                b[idx]
	            ];
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * Creates a new object out of a list of keys and a list of values.
	     * Key/value pairing is truncated to the length of the shorter of the two lists.
	     * Note: `zipObj` is equivalent to `pipe(zipWith(pair), fromPairs)`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig [String] -> [*] -> {String: *}
	     * @param {Array} keys The array that will be properties on the output object.
	     * @param {Array} values The list of values on the output object.
	     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
	     * @example
	     *
	     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
	     */
	    var zipObj = _curry2(function zipObj(keys, values) {
	        var idx = 0;
	        var len = Math.min(keys.length, values.length);
	        var out = {};
	        while (idx < len) {
	            out[keys[idx]] = values[idx];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by applying the function to each
	     * equally-positioned pair in the lists. The returned list is truncated to the
	     * length of the shorter of the two input lists.
	     *
	     * @function
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a,b -> c) -> [a] -> [b] -> [c]
	     * @param {Function} fn The function used to combine the two elements into one value.
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
	     *         using `fn`.
	     * @example
	     *
	     *      var f = (x, y) => {
	     *        // ...
	     *      };
	     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
	     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
	     */
	    var zipWith = _curry3(function zipWith(fn, a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = fn(a[idx], b[idx]);
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * A function that always returns `false`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.T
	     * @example
	     *
	     *      R.F(); //=> false
	     */
	    var F = always(false);
	
	    /**
	     * A function that always returns `true`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig * -> Boolean
	     * @param {*}
	     * @return {Boolean}
	     * @see R.always, R.F
	     * @example
	     *
	     *      R.T(); //=> true
	     */
	    var T = always(true);
	
	    /**
	     * Copies an object.
	     *
	     * @private
	     * @param {*} value The value to be copied
	     * @param {Array} refFrom Array containing the source references
	     * @param {Array} refTo Array containing the copied source references
	     * @param {Boolean} deep Whether or not to perform deep cloning.
	     * @return {*} The copied value.
	     */
	    var _clone = function _clone(value, refFrom, refTo, deep) {
	        var copy = function copy(copiedValue) {
	            var len = refFrom.length;
	            var idx = 0;
	            while (idx < len) {
	                if (value === refFrom[idx]) {
	                    return refTo[idx];
	                }
	                idx += 1;
	            }
	            refFrom[idx + 1] = value;
	            refTo[idx + 1] = copiedValue;
	            for (var key in value) {
	                copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
	            }
	            return copiedValue;
	        };
	        switch (type(value)) {
	        case 'Object':
	            return copy({});
	        case 'Array':
	            return copy([]);
	        case 'Date':
	            return new Date(value.valueOf());
	        case 'RegExp':
	            return _cloneRegExp(value);
	        default:
	            return value;
	        }
	    };
	
	    var _createPartialApplicator = function _createPartialApplicator(concat) {
	        return _curry2(function (fn, args) {
	            return _arity(Math.max(0, fn.length - args.length), function () {
	                return fn.apply(this, concat(args, arguments));
	            });
	        });
	    };
	
	    var _dropLast = function dropLast(n, xs) {
	        return take(n < xs.length ? xs.length - n : 0, xs);
	    };
	
	    // Values of other types are only equal if identical.
	    var _equals = function _equals(a, b, stackA, stackB) {
	        if (identical(a, b)) {
	            return true;
	        }
	        if (type(a) !== type(b)) {
	            return false;
	        }
	        if (a == null || b == null) {
	            return false;
	        }
	        if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	            return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
	        }
	        switch (type(a)) {
	        case 'Arguments':
	        case 'Array':
	        case 'Object':
	            if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
	                return a === b;
	            }
	            break;
	        case 'Boolean':
	        case 'Number':
	        case 'String':
	            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
	                return false;
	            }
	            break;
	        case 'Date':
	            if (!identical(a.valueOf(), b.valueOf())) {
	                return false;
	            }
	            break;
	        case 'Error':
	            return a.name === b.name && a.message === b.message;
	        case 'RegExp':
	            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
	                return false;
	            }
	            break;
	        case 'Map':
	        case 'Set':
	            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	                return false;
	            }
	            break;
	        case 'Int8Array':
	        case 'Uint8Array':
	        case 'Uint8ClampedArray':
	        case 'Int16Array':
	        case 'Uint16Array':
	        case 'Int32Array':
	        case 'Uint32Array':
	        case 'Float32Array':
	        case 'Float64Array':
	            break;
	        case 'ArrayBuffer':
	            break;
	        default:
	            // Values of other types are only equal if identical.
	            return false;
	        }
	        var keysA = keys(a);
	        if (keysA.length !== keys(b).length) {
	            return false;
	        }
	        var idx = stackA.length - 1;
	        while (idx >= 0) {
	            if (stackA[idx] === a) {
	                return stackB[idx] === b;
	            }
	            idx -= 1;
	        }
	        stackA.push(a);
	        stackB.push(b);
	        idx = keysA.length - 1;
	        while (idx >= 0) {
	            var key = keysA[idx];
	            if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	                return false;
	            }
	            idx -= 1;
	        }
	        stackA.pop();
	        stackB.pop();
	        return true;
	    };
	
	    /**
	     * `_makeFlat` is a helper function that returns a one-level or fully recursive
	     * function based on the flag passed in.
	     *
	     * @private
	     */
	    var _makeFlat = function _makeFlat(recursive) {
	        return function flatt(list) {
	            var value, jlen, j;
	            var result = [];
	            var idx = 0;
	            var ilen = list.length;
	            while (idx < ilen) {
	                if (isArrayLike(list[idx])) {
	                    value = recursive ? flatt(list[idx]) : list[idx];
	                    j = 0;
	                    jlen = value.length;
	                    while (j < jlen) {
	                        result[result.length] = value[j];
	                        j += 1;
	                    }
	                } else {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	            return result;
	        };
	    };
	
	    var _reduce = function () {
	        function _arrayReduce(xf, acc, list) {
	            var idx = 0;
	            var len = list.length;
	            while (idx < len) {
	                acc = xf['@@transducer/step'](acc, list[idx]);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                idx += 1;
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _iterableReduce(xf, acc, iter) {
	            var step = iter.next();
	            while (!step.done) {
	                acc = xf['@@transducer/step'](acc, step.value);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                step = iter.next();
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _methodReduce(xf, acc, obj) {
	            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	        }
	        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	        return function _reduce(fn, acc, list) {
	            if (typeof fn === 'function') {
	                fn = _xwrap(fn);
	            }
	            if (isArrayLike(list)) {
	                return _arrayReduce(fn, acc, list);
	            }
	            if (typeof list.reduce === 'function') {
	                return _methodReduce(fn, acc, list);
	            }
	            if (list[symIterator] != null) {
	                return _iterableReduce(fn, acc, list[symIterator]());
	            }
	            if (typeof list.next === 'function') {
	                return _iterableReduce(fn, acc, list);
	            }
	            throw new TypeError('reduce: list must be array or iterable');
	        };
	    }();
	
	    var _stepCat = function () {
	        var _stepCatArray = {
	            '@@transducer/init': Array,
	            '@@transducer/step': function (xs, x) {
	                xs.push(x);
	                return xs;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatString = {
	            '@@transducer/init': String,
	            '@@transducer/step': function (a, b) {
	                return a + b;
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatObject = {
	            '@@transducer/init': Object,
	            '@@transducer/step': function (result, input) {
	                return _assign(result, isArrayLike(input) ? objOf(input[0], input[1]) : input);
	            },
	            '@@transducer/result': _identity
	        };
	        return function _stepCat(obj) {
	            if (_isTransformer(obj)) {
	                return obj;
	            }
	            if (isArrayLike(obj)) {
	                return _stepCatArray;
	            }
	            if (typeof obj === 'string') {
	                return _stepCatString;
	            }
	            if (typeof obj === 'object') {
	                return _stepCatObject;
	            }
	            throw new Error('Cannot create transformer for ' + obj);
	        };
	    }();
	
	    var _xdropLastWhile = function () {
	        function XDropLastWhile(fn, xf) {
	            this.f = fn;
	            this.retained = [];
	            this.xf = xf;
	        }
	        XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropLastWhile.prototype['@@transducer/result'] = function (result) {
	            this.retained = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.retain(result, input) : this.flush(result, input);
	        };
	        XDropLastWhile.prototype.flush = function (result, input) {
	            result = _reduce(this.xf['@@transducer/step'], result, this.retained);
	            this.retained = [];
	            return this.xf['@@transducer/step'](result, input);
	        };
	        XDropLastWhile.prototype.retain = function (result, input) {
	            this.retained.push(input);
	            return result;
	        };
	        return _curry2(function _xdropLastWhile(fn, xf) {
	            return new XDropLastWhile(fn, xf);
	        });
	    }();
	
	    var _xgroupBy = function () {
	        function XGroupBy(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.inputs = {};
	        }
	        XGroupBy.prototype['@@transducer/init'] = _xfBase.init;
	        XGroupBy.prototype['@@transducer/result'] = function (result) {
	            var key;
	            for (key in this.inputs) {
	                if (_has(key, this.inputs)) {
	                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
	                    if (result['@@transducer/reduced']) {
	                        result = result['@@transducer/value'];
	                        break;
	                    }
	                }
	            }
	            this.inputs = null;
	            return this.xf['@@transducer/result'](result);
	        };
	        XGroupBy.prototype['@@transducer/step'] = function (result, input) {
	            var key = this.f(input);
	            this.inputs[key] = this.inputs[key] || [
	                key,
	                []
	            ];
	            this.inputs[key][1] = append(input, this.inputs[key][1]);
	            return result;
	        };
	        return _curry2(function _xgroupBy(f, xf) {
	            return new XGroupBy(f, xf);
	        });
	    }();
	
	    /**
	     * Creates a new list iteration function from an existing one by adding two new
	     * parameters to its callback function: the current index, and the entire list.
	     *
	     * This would turn, for instance, Ramda's simple `map` function into one that
	     * more closely resembles `Array.prototype.map`. Note that this will only work
	     * for functions in which the iteration callback function is the first
	     * parameter, and where the list is the last parameter. (This latter might be
	     * unimportant if the list parameter is not used.)
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Function
	     * @category List
	     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
	     * @param {Function} fn A list iteration function that does not pass index or list to its callback
	     * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
	     * @example
	     *
	     *      var mapIndexed = R.addIndex(R.map);
	     *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
	     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
	     */
	    var addIndex = _curry1(function addIndex(fn) {
	        return curryN(fn.length, function () {
	            var idx = 0;
	            var origFn = arguments[0];
	            var list = arguments[arguments.length - 1];
	            var args = _slice(arguments);
	            args[0] = function () {
	                var result = origFn.apply(this, _concat(arguments, [
	                    idx,
	                    list
	                ]));
	                idx += 1;
	                return result;
	            };
	            return fn.apply(this, args);
	        });
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts
	     * exactly 2 parameters. Any extraneous parameters will not be passed to the
	     * supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.2.0
	     * @category Function
	     * @sig (* -> c) -> (a, b -> c)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 2.
	     * @example
	     *
	     *      var takesThreeArgs = function(a, b, c) {
	     *        return [a, b, c];
	     *      };
	     *      takesThreeArgs.length; //=> 3
	     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      var takesTwoArgs = R.binary(takesThreeArgs);
	     *      takesTwoArgs.length; //=> 2
	     *      // Only 2 arguments are passed to the wrapped function
	     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
	     */
	    var binary = _curry1(function binary(fn) {
	        return nAry(2, fn);
	    });
	
	    /**
	     * Creates a deep copy of the value which may contain (nested) `Array`s and
	     * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are not
	     * copied, but assigned by their reference.
	     *
	     * Dispatches to a `clone` method if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig {*} -> {*}
	     * @param {*} value The object or array to clone
	     * @return {*} A new object or array.
	     * @example
	     *
	     *      var objects = [{}, {}, {}];
	     *      var objectsClone = R.clone(objects);
	     *      objects[0] === objectsClone[0]; //=> false
	     */
	    var clone = _curry1(function clone(value) {
	        return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function. The curried function
	     * has two unusual capabilities. First, its arguments needn't be provided one
	     * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
	     * following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	     * following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> a) -> (* -> a)
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curryN
	     * @example
	     *
	     *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
	     *
	     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curry = _curry1(function curry(fn) {
	        return curryN(fn.length, fn);
	    });
	
	    /**
	     * Returns all but the first `n` elements of the given list, string, or
	     * transducer/transformer (or object with a `drop` method).
	     *
	     * Dispatches to the `drop` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {*} list
	     * @return {*}
	     * @see R.take, R.transduce
	     * @example
	     *
	     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(3, 'ramda');               //=> 'da'
	     */
	    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
	        return slice(Math.max(0, n), Infinity, xs);
	    }));
	
	    /**
	     * Returns a list containing all but the last `n` elements of the given `list`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements of `xs` to skip.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.takeLast
	     * @example
	     *
	     *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.dropLast(3, 'ramda');               //=> 'ra'
	     */
	    var dropLast = _curry2(_dispatchable('dropLast', _xdropLast, _dropLast));
	
	    /**
	     * Returns a new list containing all but last the`n` elements of a given list,
	     * passing each value from the right to the supplied predicate function,
	     * skipping elements while the predicate function returns `true`. The predicate
	     * function is passed one argument: (value)*.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @see R.takeLastWhile, R.addIndex
	     * @example
	     *
	     *      var lteThree = x => x <= 3;
	     *
	     *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
	     */
	    var dropLastWhile = _curry2(_dispatchable('dropLastWhile', _xdropLastWhile, _dropLastWhile));
	
	    /**
	     * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
	     * cyclical data structures.
	     *
	     * Dispatches symmetrically to the `equals` methods of both arguments, if
	     * present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.15.0
	     * @category Relation
	     * @sig a -> b -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      R.equals(1, 1); //=> true
	     *      R.equals(1, '1'); //=> false
	     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	     *
	     *      var a = {}; a.v = a;
	     *      var b = {}; b.v = b;
	     *      R.equals(a, b); //=> true
	     */
	    var equals = _curry2(function equals(a, b) {
	        return _equals(a, b, [], []);
	    });
	
	    /**
	     * Takes a predicate and a "filterable", and returns a new filterable of the
	     * same type containing the members of the given filterable which satisfy the
	     * given predicate.
	     *
	     * Dispatches to the `filter` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.reject, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *
	     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    // else
	    var filter = _curry2(_dispatchable('filter', _xfilter, function (pred, filterable) {
	        return _isObject(filterable) ? _reduce(function (acc, key) {
	            if (pred(filterable[key])) {
	                acc[key] = filterable[key];
	            }
	            return acc;
	        }, {}, keys(filterable)) : // else
	        _filter(pred, filterable);
	    }));
	
	    /**
	     * Returns a new list by pulling every item out of it (and all its sub-arrays)
	     * and putting them in a new array, depth-first.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [b]
	     * @param {Array} list The array to consider.
	     * @return {Array} The flattened list.
	     * @see R.unnest
	     * @example
	     *
	     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
	     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	     */
	    var flatten = _curry1(_makeFlat(true));
	
	    /**
	     * Returns a new function much like the supplied one, except that the first two
	     * arguments' order is reversed.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	     * @param {Function} fn The function to invoke with its first two parameters reversed.
	     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	     * @example
	     *
	     *      var mergeThree = (a, b, c) => [].concat(a, b, c);
	     *
	     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	     */
	    var flip = _curry1(function flip(fn) {
	        return curry(function (a, b) {
	            var args = _slice(arguments);
	            args[0] = b;
	            args[1] = a;
	            return fn.apply(this, args);
	        });
	    });
	
	    /**
	     * Returns the first element of the given list or string. In some libraries
	     * this function is named `first`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {Array|String} list
	     * @return {*}
	     * @see R.tail, R.init, R.last
	     * @example
	     *
	     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	     *      R.head([]); //=> undefined
	     *
	     *      R.head('abc'); //=> 'a'
	     *      R.head(''); //=> ''
	     */
	    var head = nth(0);
	
	    /**
	     * Returns all but the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category List
	     * @sig [a] -> [a]
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.last, R.head, R.tail
	     * @example
	     *
	     *      R.init([1, 2, 3]);  //=> [1, 2]
	     *      R.init([1, 2]);     //=> [1]
	     *      R.init([1]);        //=> []
	     *      R.init([]);         //=> []
	     *
	     *      R.init('abc');  //=> 'ab'
	     *      R.init('ab');   //=> 'a'
	     *      R.init('a');    //=> ''
	     *      R.init('');     //=> ''
	     */
	    var init = slice(0, -1);
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists. Duplication is determined according to the
	     * value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate function that determines whether
	     *        the two supplied elements are equal.
	     * @param {Array} list1 One list of items to compare
	     * @param {Array} list2 A second list of items to compare
	     * @return {Array} A new list containing those elements common to both lists.
	     * @see R.intersection
	     * @example
	     *
	     *      var buffaloSpringfield = [
	     *        {id: 824, name: 'Richie Furay'},
	     *        {id: 956, name: 'Dewey Martin'},
	     *        {id: 313, name: 'Bruce Palmer'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *      var csny = [
	     *        {id: 204, name: 'David Crosby'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 539, name: 'Graham Nash'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *
	     *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
	     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
	     */
	    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        var results = [];
	        var idx = 0;
	        while (idx < filteredList.length) {
	            if (_containsWith(pred, filteredList[idx], lookupList)) {
	                results[results.length] = filteredList[idx];
	            }
	            idx += 1;
	        }
	        return uniqWith(pred, results);
	    });
	
	    /**
	     * Transforms the items of the list with the transducer and appends the
	     * transformed items to the accumulator using an appropriate iterator function
	     * based on the accumulator type.
	     *
	     * The accumulator can be an array, string, object or a transformer. Iterated
	     * items will be appended to arrays and concatenated to strings. Objects will
	     * be merged directly or 2-item arrays will be merged as key, value pairs.
	     *
	     * The accumulator can also be a transformer object that provides a 2-arity
	     * reducing iterator function, step, 0-arity initial value function, init, and
	     * 1-arity result extraction function result. The step function is used as the
	     * iterator function in reduce. The result function is used to convert the
	     * final accumulator into the return type and in most cases is R.identity. The
	     * init function is used to provide the initial accumulator.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig a -> (b -> b) -> [c] -> a
	     * @param {*} acc The initial accumulator value.
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.into([], transducer, numbers); //=> [2, 3]
	     *
	     *      var intoArray = R.into([]);
	     *      intoArray(transducer, numbers); //=> [2, 3]
	     */
	    var into = _curry3(function into(acc, xf, list) {
	        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
	    });
	
	    /**
	     * Same as R.invertObj, however this accounts for objects with duplicate values
	     * by putting the values into an array.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: [ s, ... ]}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object with keys
	     * in an array.
	     * @example
	     *
	     *      var raceResultsByFirstName = {
	     *        first: 'alice',
	     *        second: 'jake',
	     *        third: 'alice',
	     *      };
	     *      R.invert(raceResultsByFirstName);
	     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
	     */
	    var invert = _curry1(function invert(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            var val = obj[key];
	            var list = _has(val, out) ? out[val] : out[val] = [];
	            list[list.length] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object with the keys of the given object as values, and the
	     * values of the given object, which are coerced to strings, as keys. Note
	     * that the last key found is preferred when handling the same value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig {s: x} -> {x: s}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object
	     * @example
	     *
	     *      var raceResults = {
	     *        first: 'alice',
	     *        second: 'jake'
	     *      };
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': 'first', 'jake':'second' }
	     *
	     *      // Alternatively:
	     *      var raceResults = ['alice', 'jake'];
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': '0', 'jake':'1' }
	     */
	    var invertObj = _curry1(function invertObj(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            out[obj[key]] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns `true` if the given value is its type's empty value; `false`
	     * otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Logic
	     * @sig a -> Boolean
	     * @param {*} x
	     * @return {Boolean}
	     * @see R.empty
	     * @example
	     *
	     *      R.isEmpty([1, 2, 3]);   //=> false
	     *      R.isEmpty([]);          //=> true
	     *      R.isEmpty('');          //=> true
	     *      R.isEmpty(null);        //=> false
	     *      R.isEmpty({});          //=> true
	     *      R.isEmpty({length: 0}); //=> false
	     */
	    var isEmpty = _curry1(function isEmpty(x) {
	        return x != null && equals(x, empty(x));
	    });
	
	    /**
	     * Returns the last element of the given list or string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig [a] -> a | Undefined
	     * @sig String -> String
	     * @param {*} list
	     * @return {*}
	     * @see R.init, R.head, R.tail
	     * @example
	     *
	     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
	     *      R.last([]); //=> undefined
	     *
	     *      R.last('abc'); //=> 'c'
	     *      R.last(''); //=> ''
	     */
	    var last = nth(-1);
	
	    /**
	     * Returns the position of the last occurrence of an item in an array, or -1 if
	     * the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.indexOf
	     * @example
	     *
	     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
	     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
	     */
	    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
	        if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
	            return xs.lastIndexOf(target);
	        } else {
	            var idx = xs.length - 1;
	            while (idx >= 0) {
	                if (equals(xs[idx], target)) {
	                    return idx;
	                }
	                idx -= 1;
	            }
	            return -1;
	        }
	    });
	
	    /**
	     * Takes a function and
	     * a [functor](https://github.com/fantasyland/fantasy-land#functor),
	     * applies the function to each of the functor's values, and returns
	     * a functor of the same shape.
	     *
	     * Ramda provides suitable `map` implementations for `Array` and `Object`,
	     * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
	     *
	     * Dispatches to the `map` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * Also treats functions as functors and will compose them together.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Functor f => (a -> b) -> f a -> f b
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {Array} list The list to be iterated over.
	     * @return {Array} The new list.
	     * @see R.transduce, R.addIndex
	     * @example
	     *
	     *      var double = x => x * 2;
	     *
	     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	     *
	     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	     */
	    var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
	        switch (Object.prototype.toString.call(functor)) {
	        case '[object Function]':
	            return curryN(functor.length, function () {
	                return fn.call(this, functor.apply(this, arguments));
	            });
	        case '[object Object]':
	            return _reduce(function (acc, key) {
	                acc[key] = fn(functor[key]);
	                return acc;
	            }, {}, keys(functor));
	        default:
	            return _map(fn, functor);
	        }
	    }));
	
	    /**
	     * An Object-specific version of `map`. The function is applied to three
	     * arguments: *(value, key, obj)*. If only the value is significant, use
	     * `map` instead.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Object
	     * @sig ((*, String, Object) -> *) -> Object -> Object
	     * @param {Function} fn
	     * @param {Object} obj
	     * @return {Object}
	     * @see R.map
	     * @example
	     *
	     *      var values = { x: 1, y: 2, z: 3 };
	     *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
	     *
	     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	     */
	    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
	        return _reduce(function (acc, key) {
	            acc[key] = fn(obj[key], key, obj);
	            return acc;
	        }, {}, keys(obj));
	    });
	
	    /**
	     * Creates a new object with the own properties of the two provided objects. If
	     * a key exists in both objects, the provided function is applied to the values
	     * associated with the key in each object, with the result being used as the
	     * value associated with the key in the returned object. The key will be
	     * excluded from the returned object if the resulting value is `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @sig (a -> a -> a) -> {a} -> {a} -> {a}
	     * @param {Function} fn
	     * @param {Object} l
	     * @param {Object} r
	     * @return {Object}
	     * @see R.merge, R.mergeWithKey
	     * @example
	     *
	     *      R.mergeWith(R.concat,
	     *                  { a: true, values: [10, 20] },
	     *                  { b: true, values: [15, 35] });
	     *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
	     */
	    var mergeWith = _curry3(function mergeWith(fn, l, r) {
	        return mergeWithKey(function (_, _l, _r) {
	            return fn(_l, _r);
	        }, l, r);
	    });
	
	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided initially followed by the arguments provided to `g`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partialRight
	     * @example
	     *
	     *      var multiply = (a, b) => a * b;
	     *      var double = R.partial(multiply, [2]);
	     *      double(2); //=> 4
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var sayHello = R.partial(greet, ['Hello']);
	     *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
	     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partial = _createPartialApplicator(_concat);
	
	    /**
	     * Takes a function `f` and a list of arguments, and returns a function `g`.
	     * When applied, `g` returns the result of applying `f` to the arguments
	     * provided to `g` followed by the arguments provided initially.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
	     * @param {Function} f
	     * @param {Array} args
	     * @return {Function}
	     * @see R.partial
	     * @example
	     *
	     *      var greet = (salutation, title, firstName, lastName) =>
	     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *
	     *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
	     *
	     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partialRight = _createPartialApplicator(flip(_concat));
	
	    /**
	     * Determines whether a nested path on an object has a specific value, in
	     * `R.equals` terms. Most likely used to filter a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Relation
	     * @sig [String] -> * -> {String: *} -> Boolean
	     * @param {Array} path The path of the nested property to use
	     * @param {*} val The value to compare the nested property with
	     * @param {Object} obj The object to check the nested property in
	     * @return {Boolean} `true` if the value equals the nested object property,
	     *         `false` otherwise.
	     * @example
	     *
	     *      var user1 = { address: { zipCode: 90210 } };
	     *      var user2 = { address: { zipCode: 55555 } };
	     *      var user3 = { name: 'Bob' };
	     *      var users = [ user1, user2, user3 ];
	     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
	     *      R.filter(isFamous, users); //=> [ user1 ]
	     */
	    var pathEq = _curry3(function pathEq(_path, val, obj) {
	        return equals(path(_path, obj), val);
	    });
	
	    /**
	     * Returns a new list by plucking the same named property off all objects in
	     * the list supplied.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig k -> [{k: v}] -> [v]
	     * @param {Number|String} key The key name to pluck off of each object.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of values for the given key.
	     * @see R.props
	     * @example
	     *
	     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
	     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
	     */
	    var pluck = _curry2(function pluck(p, list) {
	        return map(prop(p), list);
	    });
	
	    /**
	     * Reasonable analog to SQL `select` statement.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @category Relation
	     * @sig [k] -> [{k: v}] -> [{k: v}]
	     * @param {Array} props The property names to project
	     * @param {Array} objs The objects to query
	     * @return {Array} An array of objects with just the `props` properties.
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
	     *      var kids = [abby, fred];
	     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
	     */
	    // passing `identity` gives correct arity
	    var project = useWith(_map, [
	        pickAll,
	        identity
	    ]);
	
	    /**
	     * Returns `true` if the specified object property is equal, in `R.equals`
	     * terms, to the given value; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig String -> a -> Object -> Boolean
	     * @param {String} name
	     * @param {*} val
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.equals, R.propSatisfies
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
	     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
	     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
	     *      var kids = [abby, fred, rusty, alois];
	     *      var hasBrownHair = R.propEq('hair', 'brown');
	     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
	     */
	    var propEq = _curry3(function propEq(name, val, obj) {
	        return propSatisfies(equals(val), name, obj);
	    });
	
	    /**
	     * Returns `true` if the specified object property is of the given type;
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Type
	     * @sig Type -> String -> Object -> Boolean
	     * @param {Function} type
	     * @param {String} name
	     * @param {*} obj
	     * @return {Boolean}
	     * @see R.is, R.propSatisfies
	     * @example
	     *
	     *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
	     *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
	     *      R.propIs(Number, 'x', {});            //=> false
	     */
	    var propIs = _curry3(function propIs(type, name, obj) {
	        return propSatisfies(is(type), name, obj);
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling
	     * the iterator function and passing it an accumulator value and the current
	     * value from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It may use
	     * `R.reduced` to shortcut the iteration.
	     *
	     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	     * arrays), unlike the native `Array.prototype.reduce` method. For more details
	     * on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	     *
	     * Dispatches to the `reduce` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduced, R.addIndex
	     * @example
	     *
	     *      var numbers = [1, 2, 3];
	     *      var add = (a, b) => a + b;
	     *
	     *      R.reduce(add, 10, numbers); //=> 16
	     */
	    var reduce = _curry3(_reduce);
	
	    /**
	     * Groups the elements of the list according to the result of calling
	     * the String-returning function `keyFn` on each element and reduces the elements
	     * of each group to a single value via the reducer function `valueFn`.
	     *
	     * This function is basically a more general `groupBy` function.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category List
	     * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
	     * @param {Function} valueFn The function that reduces the elements of each group to a single
	     *        value. Receives two values, accumulator for a particular group and the current element.
	     * @param {*} acc The (initial) accumulator value for each group.
	     * @param {Function} keyFn The function that maps the list's element into a key.
	     * @param {Array} list The array to group.
	     * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
	     *         `valueFn` for elements which produced that key when passed to `keyFn`.
	     * @see R.groupBy, R.reduce
	     * @example
	     *
	     *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
	     *      var namesByGrade = reduceToNamesBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Lucy', score: 92},
	     *                      {name: 'Drew', score: 85},
	     *                      // ...
	     *                      {name: 'Bart', score: 62}];
	     *      namesByGrade(students);
	     *      // {
	     *      //   'A': ['Lucy'],
	     *      //   'B': ['Drew']
	     *      //   // ...,
	     *      //   'F': ['Bart']
	     *      // }
	     */
	    var reduceBy = _curryN(4, [], function reduceBy(valueFn, valueAcc, keyFn, list) {
	        return _reduce(function (acc, elt) {
	            var key = keyFn(elt);
	            acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
	            return acc;
	        }, {}, list);
	    });
	
	    /**
	     * The complement of `filter`.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> f a
	     * @param {Function} pred
	     * @param {Array} filterable
	     * @return {Array}
	     * @see R.filter, R.transduce, R.addIndex
	     * @example
	     *
	     *      var isOdd = (n) => n % 2 === 1;
	     *
	     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
	     *
	     *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
	     */
	    var reject = _curry2(function reject(pred, filterable) {
	        return filter(_complement(pred), filterable);
	    });
	
	    /**
	     * Returns a fixed list of size `n` containing a specified identical value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.1
	     * @category List
	     * @sig a -> n -> [a]
	     * @param {*} value The value to repeat.
	     * @param {Number} n The desired size of the output list.
	     * @return {Array} A new array containing `n` `value`s.
	     * @example
	     *
	     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
	     *
	     *      var obj = {};
	     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
	     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
	     */
	    var repeat = _curry2(function repeat(value, n) {
	        return times(always(value), n);
	    });
	
	    /**
	     * Adds together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The sum of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.sum([2,4,6,8,100,1]); //=> 121
	     */
	    var sum = reduce(add, 0);
	
	    /**
	     * Returns a new list containing the last `n` elements of the given list.
	     * If `n > list.length`, returns a list of `list.length` elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @sig Number -> String -> String
	     * @param {Number} n The number of elements to return.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @see R.dropLast
	     * @example
	     *
	     *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.takeLast(3, 'ramda');               //=> 'mda'
	     */
	    var takeLast = _curry2(function takeLast(n, xs) {
	        return drop(n >= 0 ? xs.length - n : 0, xs);
	    });
	
	    /**
	     * Initializes a transducer using supplied iterator function. Returns a single
	     * item by iterating through the list, successively calling the transformed
	     * iterator function and passing it an accumulator value and the current value
	     * from the array, and then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It will be
	     * wrapped as a transformer to initialize the transducer. A transformer can be
	     * passed directly in place of an iterator function. In both cases, iteration
	     * may be stopped early with the `R.reduced` function.
	     *
	     * A transducer is a function that accepts a transformer and returns a
	     * transformer and can be composed directly.
	     *
	     * A transformer is an an object that provides a 2-arity reducing iterator
	     * function, step, 0-arity initial value function, init, and 1-arity result
	     * extraction function, result. The step function is used as the iterator
	     * function in reduce. The result function is used to convert the final
	     * accumulator into the return type and in most cases is R.identity. The init
	     * function can be used to provide an initial accumulator, but is ignored by
	     * transduce.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category List
	     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array. Wrapped as transformer, if necessary, and used to
	     *        initialize the transducer
	     * @param {*} acc The initial accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @see R.reduce, R.reduced, R.into
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
	     */
	    var transduce = curryN(4, function transduce(xf, fn, acc, list) {
	        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list. Duplication is determined according to the value returned by
	     * applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [*] -> [*] -> [*]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @see R.union
	     * @example
	     *
	     *      var l1 = [{a: 1}, {a: 2}];
	     *      var l2 = [{a: 1}, {a: 4}];
	     *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
	     */
	    var unionWith = _curry3(function unionWith(pred, list1, list2) {
	        return uniqWith(pred, _concat(list1, list2));
	    });
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec, false otherwise. An object satisfies the spec if, for each of the
	     * spec's own properties, accessing that property of the object gives the same
	     * value (in `R.equals` terms) as accessing that property of the spec.
	     *
	     * `whereEq` is a specialization of [`where`](#where).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @sig {String: *} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @see R.where
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.whereEq({a: 1, b: 2});
	     *
	     *      pred({a: 1});              //=> false
	     *      pred({a: 1, b: 2});        //=> true
	     *      pred({a: 1, b: 2, c: 3});  //=> true
	     *      pred({a: 1, b: 1});        //=> false
	     */
	    var whereEq = _curry2(function whereEq(spec, testObj) {
	        return where(map(equals, spec), testObj);
	    });
	
	    var _flatCat = function () {
	        var preservingReduced = function (xf) {
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return xf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    var ret = xf['@@transducer/step'](result, input);
	                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
	                }
	            };
	        };
	        return function _xcat(xf) {
	            var rxf = preservingReduced(xf);
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return rxf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
	                }
	            };
	        };
	    }();
	
	    // Array.prototype.indexOf doesn't exist below IE9
	    // manually crawl the list to distinguish between +0 and -0
	    // NaN
	    // non-zero numbers can utilise Set
	    // all these types can utilise Set
	    // null can utilise Set
	    // anything else not covered above, defer to R.equals
	    var _indexOf = function _indexOf(list, a, idx) {
	        var inf, item;
	        // Array.prototype.indexOf doesn't exist below IE9
	        if (typeof list.indexOf === 'function') {
	            switch (typeof a) {
	            case 'number':
	                if (a === 0) {
	                    // manually crawl the list to distinguish between +0 and -0
	                    inf = 1 / a;
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (item === 0 && 1 / item === inf) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                } else if (a !== a) {
	                    // NaN
	                    while (idx < list.length) {
	                        item = list[idx];
	                        if (typeof item === 'number' && item !== item) {
	                            return idx;
	                        }
	                        idx += 1;
	                    }
	                    return -1;
	                }
	                // non-zero numbers can utilise Set
	                return list.indexOf(a, idx);
	            // all these types can utilise Set
	            case 'string':
	            case 'boolean':
	            case 'function':
	            case 'undefined':
	                return list.indexOf(a, idx);
	            case 'object':
	                if (a === null) {
	                    // null can utilise Set
	                    return list.indexOf(a, idx);
	                }
	            }
	        }
	        // anything else not covered above, defer to R.equals
	        while (idx < list.length) {
	            if (equals(list[idx], a)) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    };
	
	    var _xchain = _curry2(function _xchain(f, xf) {
	        return map(f, _flatCat(xf));
	    });
	
	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if every one of the provided predicates is satisfied
	     * by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.anyPass
	     * @example
	     *
	     *      var isQueen = R.propEq('rank', 'Q');
	     *      var isSpade = R.propEq('suit', '♠︎');
	     *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
	     *
	     *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
	     *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
	     */
	    var allPass = _curry1(function allPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (!preds[idx].apply(this, arguments)) {
	                    return false;
	                }
	                idx += 1;
	            }
	            return true;
	        });
	    });
	
	    /**
	     * Returns `true` if all elements are unique, in `R.equals` terms, otherwise
	     * `false`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category List
	     * @sig [a] -> Boolean
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if all elements are unique, else `false`.
	     * @deprecated since v0.20.0
	     * @example
	     *
	     *      R.allUniq(['1', 1]); //=> true
	     *      R.allUniq([1, 1]);   //=> false
	     *      R.allUniq([[42], [42]]); //=> false
	     */
	    var allUniq = _curry1(function allUniq(list) {
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            if (_indexOf(list, list[idx], idx + 1) >= 0) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    });
	
	    /**
	     * Takes a list of predicates and returns a predicate that returns true for a
	     * given list of arguments if at least one of the provided predicates is
	     * satisfied by those arguments.
	     *
	     * The function returned is a curried function whose arity matches that of the
	     * highest-arity predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} preds
	     * @return {Function}
	     * @see R.allPass
	     * @example
	     *
	     *      var gte = R.anyPass([R.gt, R.equals]);
	     *
	     *      gte(3, 2); //=> true
	     *      gte(2, 2); //=> true
	     *      gte(2, 3); //=> false
	     */
	    var anyPass = _curry1(function anyPass(preds) {
	        return curryN(reduce(max, 0, pluck('length', preds)), function () {
	            var idx = 0;
	            var len = preds.length;
	            while (idx < len) {
	                if (preds[idx].apply(this, arguments)) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        });
	    });
	
	    /**
	     * ap applies a list of functions to a list of values.
	     *
	     * Dispatches to the `ap` method of the second argument, if present. Also
	     * treats functions as applicatives.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category Function
	     * @sig [f] -> [a] -> [f a]
	     * @param {Array} fns An array of functions
	     * @param {Array} vs An array of values
	     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	     * @example
	     *
	     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	     */
	    // else
	    var ap = _curry2(function ap(applicative, fn) {
	        return typeof applicative.ap === 'function' ? applicative.ap(fn) : typeof applicative === 'function' ? curryN(Math.max(applicative.length, fn.length), function () {
	            return applicative.apply(this, arguments)(fn.apply(this, arguments));
	        }) : // else
	        _reduce(function (acc, f) {
	            return _concat(acc, map(f, fn));
	        }, [], applicative);
	    });
	
	    /**
	     * Given a spec object recursively mapping properties to functions, creates a
	     * function producing an object of the same structure, by mapping each property
	     * to the result of calling its associated function with the supplied arguments.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.20.0
	     * @category Function
	     * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
	     * @param {Object} spec an object recursively mapping properties to functions for
	     *        producing the values for these properties.
	     * @return {Function} A function that returns an object of the same structure
	     * as `spec', with each property set to the value returned by calling its
	     * associated function with the supplied arguments.
	     * @see R.juxt
	     * @example
	     *
	     *      var getMetrics = R.applySpec({
	     *                                      sum: R.add,
	     *                                      nested: { mul: R.multiply }
	     *                                   });
	     *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
	     */
	    var applySpec = _curry1(function applySpec(spec) {
	        spec = map(function (v) {
	            return typeof v == 'function' ? v : applySpec(v);
	        }, spec);
	        return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
	            var args = arguments;
	            return map(function (f) {
	                return apply(f, args);
	            }, spec);
	        });
	    });
	
	    /**
	     * Returns the result of calling its first argument with the remaining
	     * arguments. This is occasionally useful as a converging function for
	     * `R.converge`: the left branch can produce a function while the right branch
	     * produces a value to be passed to that function as an argument.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category Function
	     * @sig (*... -> a),*... -> a
	     * @param {Function} fn The function to apply to the remaining arguments.
	     * @param {...*} args Any number of positional arguments.
	     * @return {*}
	     * @see R.apply
	     * @example
	     *
	     *      var indentN = R.pipe(R.times(R.always(' ')),
	     *                           R.join(''),
	     *                           R.replace(/^(?!$)/gm));
	     *
	     *      var format = R.converge(R.call, [
	     *                                  R.pipe(R.prop('indent'), indentN),
	     *                                  R.prop('value')
	     *                              ]);
	     *
	     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
	     */
	    var call = curry(function call(fn) {
	        return fn.apply(this, _slice(arguments, 1));
	    });
	
	    /**
	     * `chain` maps a function over a list and concatenates the results. `chain`
	     * is also known as `flatMap` in some libraries
	     *
	     * Dispatches to the `chain` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig (a -> [b]) -> [a] -> [b]
	     * @param {Function} fn
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      var duplicate = n => [n, n];
	     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
	     */
	    var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
	        if (typeof monad === 'function') {
	            return function () {
	                return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
	            };
	        }
	        return _makeFlat(false)(map(fn, monad));
	    }));
	
	    /**
	     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
	     * `R.cond` takes a list of [predicate, transform] pairs. All of the arguments
	     * to `fn` are applied to each of the predicates in turn until one returns a
	     * "truthy" value, at which point `fn` returns the result of applying its
	     * arguments to the corresponding transformer. If none of the predicates
	     * matches, `fn` returns undefined.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.6.0
	     * @category Logic
	     * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
	     * @param {Array} pairs
	     * @return {Function}
	     * @example
	     *
	     *      var fn = R.cond([
	     *        [R.equals(0),   R.always('water freezes at 0°C')],
	     *        [R.equals(100), R.always('water boils at 100°C')],
	     *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	     *      ]);
	     *      fn(0); //=> 'water freezes at 0°C'
	     *      fn(50); //=> 'nothing special happens at 50°C'
	     *      fn(100); //=> 'water boils at 100°C'
	     */
	    var cond = _curry1(function cond(pairs) {
	        var arity = reduce(max, 0, map(function (pair) {
	            return pair[0].length;
	        }, pairs));
	        return _arity(arity, function () {
	            var idx = 0;
	            while (idx < pairs.length) {
	                if (pairs[idx][0].apply(this, arguments)) {
	                    return pairs[idx][1].apply(this, arguments);
	                }
	                idx += 1;
	            }
	        });
	    });
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type. The arity of the function
	     * returned is specified to allow using variadic constructor functions.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.0
	     * @category Function
	     * @sig Number -> (* -> {*}) -> (* -> {*})
	     * @param {Number} n The arity of the constructor function.
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Variadic constructor function
	     *      var Widget = () => {
	     *        this.children = Array.prototype.slice.call(arguments);
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
	     */
	    var constructN = _curry2(function constructN(n, Fn) {
	        if (n > 10) {
	            throw new Error('Constructor with greater than ten arguments');
	        }
	        if (n === 0) {
	            return function () {
	                return new Fn();
	            };
	        }
	        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
	            switch (arguments.length) {
	            case 1:
	                return new Fn($0);
	            case 2:
	                return new Fn($0, $1);
	            case 3:
	                return new Fn($0, $1, $2);
	            case 4:
	                return new Fn($0, $1, $2, $3);
	            case 5:
	                return new Fn($0, $1, $2, $3, $4);
	            case 6:
	                return new Fn($0, $1, $2, $3, $4, $5);
	            case 7:
	                return new Fn($0, $1, $2, $3, $4, $5, $6);
	            case 8:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
	            case 9:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
	            case 10:
	                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
	            }
	        }));
	    });
	
	    /**
	     * Accepts a converging function and a list of branching functions and returns
	     * a new function. When invoked, this new function is applied to some
	     * arguments, each branching function is applied to those same arguments. The
	     * results of each branching function are passed as arguments to the converging
	     * function to produce the return value.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.4.2
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
	     * @param {Function} after A function. `after` will be invoked with the return values of
	     *        `fn1` and `fn2` as its arguments.
	     * @param {Array} functions A list of functions.
	     * @return {Function} A new function.
	     * @example
	     *
	     *      var add = (a, b) => a + b;
	     *      var multiply = (a, b) => a * b;
	     *      var subtract = (a, b) => a - b;
	     *
	     *      //≅ multiply( add(1, 2), subtract(1, 2) );
	     *      R.converge(multiply, [add, subtract])(1, 2); //=> -3
	     *
	     *      var add3 = (a, b, c) => a + b + c;
	     *      R.converge(add3, [multiply, add, subtract])(1, 2); //=> 4
	     */
	    var converge = _curry2(function converge(after, fns) {
	        return curryN(reduce(max, 0, pluck('length', fns)), function () {
	            var args = arguments;
	            var context = this;
	            return after.apply(context, _map(function (fn) {
	                return fn.apply(context, args);
	            }, fns));
	        });
	    });
	
	    /**
	     * Counts the elements of a list according to how many match each value of a
	     * key generated by the supplied function. Returns an object mapping the keys
	     * produced by `fn` to the number of occurrences in the list. Note that all
	     * keys are coerced to strings because of how JavaScript objects work.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig (a -> String) -> [a] -> {*}
	     * @param {Function} fn The function used to map values to keys.
	     * @param {Array} list The list to count elements from.
	     * @return {Object} An object mapping keys to number of occurrences in the list.
	     * @example
	     *
	     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
	     *      var letters = R.split('', 'abcABCaaaBBc');
	     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
	     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
	     */
	    var countBy = reduceBy(function (acc, elem) {
	        return acc + 1;
	    }, 0);
	
	    /**
	     * Returns a new list without any consecutively repeating elements. Equality is
	     * determined by applying the supplied predicate two consecutive elements. The
	     * first element in a series of equal element is the one being preserved.
	     *
	     * Dispatches to the `dropRepeatsWith` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
	     *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
	     */
	    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
	        var result = [];
	        var idx = 1;
	        var len = list.length;
	        if (len !== 0) {
	            result[0] = list[0];
	            while (idx < len) {
	                if (!pred(last(result), list[idx])) {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	        }
	        return result;
	    }));
	
	    /**
	     * Takes a function and two values in its domain and returns `true` if the
	     * values map to the same value in the codomain; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.18.0
	     * @category Relation
	     * @sig (a -> b) -> a -> a -> Boolean
	     * @param {Function} f
	     * @param {*} x
	     * @param {*} y
	     * @return {Boolean}
	     * @example
	     *
	     *      R.eqBy(Math.abs, 5, -5); //=> true
	     */
	    var eqBy = _curry3(function eqBy(f, x, y) {
	        return equals(f(x), f(y));
	    });
	
	    /**
	     * Reports whether two objects have the same value, in `R.equals` terms, for
	     * the specified property. Useful as a curried predicate.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig k -> {k: v} -> {k: v} -> Boolean
	     * @param {String} prop The name of the property to compare
	     * @param {Object} obj1
	     * @param {Object} obj2
	     * @return {Boolean}
	     *
	     * @example
	     *
	     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
	     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
	     *      R.eqProps('a', o1, o2); //=> false
	     *      R.eqProps('c', o1, o2); //=> true
	     */
	    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
	        return equals(obj1[prop], obj2[prop]);
	    });
	
	    /**
	     * Splits a list into sub-lists stored in an object, based on the result of
	     * calling a String-returning function on each element, and grouping the
	     * results according to values returned.
	     *
	     * Dispatches to the `groupBy` method of the second argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig (a -> String) -> [a] -> {String: [a]}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} list The array to group
	     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
	     *         that produced that key when passed to `fn`.
	     * @see R.transduce
	     * @example
	     *
	     *      var byGrade = R.groupBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Abby', score: 84},
	     *                      {name: 'Eddy', score: 58},
	     *                      // ...
	     *                      {name: 'Jack', score: 69}];
	     *      byGrade(students);
	     *      // {
	     *      //   'A': [{name: 'Dianne', score: 99}],
	     *      //   'B': [{name: 'Abby', score: 84}]
	     *      //   // ...,
	     *      //   'F': [{name: 'Eddy', score: 58}]
	     *      // }
	     */
	    var groupBy = _curry2(_dispatchable('groupBy', _xgroupBy, reduceBy(function (acc, item) {
	        if (acc == null) {
	            acc = [];
	        }
	        acc.push(item);
	        return acc;
	    }, null)));
	
	    /**
	     * Given a function that generates a key, turns a list of objects into an
	     * object indexing the objects by the given key. Note that if multiple
	     * objects generate the same value for the indexing key only the last value
	     * will be included in the generated object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} array The array of objects to index
	     * @return {Object} An object indexing each array element by the given property.
	     * @example
	     *
	     *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
	     *      R.indexBy(R.prop('id'), list);
	     *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
	     */
	    var indexBy = reduceBy(function (acc, elem) {
	        return elem;
	    }, null);
	
	    /**
	     * Returns the position of the first occurrence of an item in an array, or -1
	     * if the item is not included in the array. `R.equals` is used to determine
	     * equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     * @see R.lastIndexOf
	     * @example
	     *
	     *      R.indexOf(3, [1,2,3,4]); //=> 2
	     *      R.indexOf(10, [1,2,3,4]); //=> -1
	     */
	    var indexOf = _curry2(function indexOf(target, xs) {
	        return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
	    });
	
	    /**
	     * juxt applies a list of functions to a list of values.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Function
	     * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
	     * @param {Array} fns An array of functions
	     * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
	     * @see R.applySpec
	     * @example
	     *
	     *      var range = R.juxt([Math.min, Math.max]);
	     *      range(3, 4, 9, -3); //=> [-3, 9]
	     */
	    var juxt = _curry1(function juxt(fns) {
	        return converge(_arrayOf, fns);
	    });
	
	    /**
	     * Returns a lens for the given getter and setter functions. The getter "gets"
	     * the value of the focus; the setter "sets" the value of the focus. The setter
	     * should not mutate the data structure.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.8.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
	     * @param {Function} getter
	     * @param {Function} setter
	     * @return {Lens}
	     * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
	     * @example
	     *
	     *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lens = _curry2(function lens(getter, setter) {
	        return function (toFunctorFn) {
	            return function (target) {
	                return map(function (focus) {
	                    return setter(focus, target);
	                }, toFunctorFn(getter(target)));
	            };
	        };
	    });
	
	    /**
	     * Returns a lens whose focus is the specified index.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig Number -> Lens s a
	     * @param {Number} n
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *
	     *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
	     *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
	     *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
	     */
	    var lensIndex = _curry1(function lensIndex(n) {
	        return lens(nth(n), update(n));
	    });
	
	    /**
	     * Returns a lens whose focus is the specified path.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig [String] -> Lens s a
	     * @param {Array} path The path to use.
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xyLens = R.lensPath(['x', 'y']);
	     *
	     *      R.view(xyLens, {x: {y: 2, z: 3}});            //=> 2
	     *      R.set(xyLens, 4, {x: {y: 2, z: 3}});          //=> {x: {y: 4, z: 3}}
	     *      R.over(xyLens, R.negate, {x: {y: 2, z: 3}});  //=> {x: {y: -2, z: 3}}
	     */
	    var lensPath = _curry1(function lensPath(p) {
	        return lens(path(p), assocPath(p));
	    });
	
	    /**
	     * Returns a lens whose focus is the specified property.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Object
	     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
	     * @sig String -> Lens s a
	     * @param {String} k
	     * @return {Lens}
	     * @see R.view, R.set, R.over
	     * @example
	     *
	     *      var xLens = R.lensProp('x');
	     *
	     *      R.view(xLens, {x: 1, y: 2});            //=> 1
	     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
	     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
	     */
	    var lensProp = _curry1(function lensProp(k) {
	        return lens(prop(k), assoc(k));
	    });
	
	    /**
	     * "lifts" a function to be the specified arity, so that it may "map over" that
	     * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig Number -> (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.lift, R.ap
	     * @example
	     *
	     *      var madd3 = R.liftN(3, R.curryN(3, (...args) => R.sum(args)));
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     */
	    var liftN = _curry2(function liftN(arity, fn) {
	        var lifted = curryN(arity, fn);
	        return curryN(arity, function () {
	            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	        });
	    });
	
	    /**
	     * Returns the mean of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.mean([2, 7, 9]); //=> 6
	     *      R.mean([]); //=> NaN
	     */
	    var mean = _curry1(function mean(list) {
	        return sum(list) / list.length;
	    });
	
	    /**
	     * Returns the median of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.median([2, 9, 7]); //=> 7
	     *      R.median([7, 2, 10, 9]); //=> 8
	     *      R.median([]); //=> NaN
	     */
	    var median = _curry1(function median(list) {
	        var len = list.length;
	        if (len === 0) {
	            return NaN;
	        }
	        var width = 2 - len % 2;
	        var idx = (len - width) / 2;
	        return mean(_slice(list).sort(function (a, b) {
	            return a < b ? -1 : a > b ? 1 : 0;
	        }).slice(idx, idx + width));
	    });
	
	    /**
	     * Takes a predicate and a list or other "filterable" object and returns the
	     * pair of filterable objects of the same type of elements which do and do not
	     * satisfy, the predicate, respectively.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.4
	     * @category List
	     * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
	     * @param {Function} pred A predicate to determine which side the element belongs to.
	     * @param {Array} filterable the list (or other filterable) to partition.
	     * @return {Array} An array, containing first the subset of elements that satisfy the
	     *         predicate, and second the subset of elements that do not satisfy.
	     * @see R.filter, R.reject
	     * @example
	     *
	     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
	     *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
	     *
	     *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
	     *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
	     */
	    var partition = juxt([
	        filter,
	        reject
	    ]);
	
	    /**
	     * Performs left-to-right function composition. The leftmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * In some libraries this function is named `sequence`.
	     *
	     * **Note:** The result of pipe is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.compose
	     * @example
	     *
	     *      var f = R.pipe(Math.pow, R.negate, R.inc);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var pipe = function pipe() {
	        if (arguments.length === 0) {
	            throw new Error('pipe requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
	    };
	
	    /**
	     * Performs left-to-right composition of one or more Promise-returning
	     * functions. The leftmost function may have any arity; the remaining functions
	     * must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.composeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
	     */
	    var pipeP = function pipeP() {
	        if (arguments.length === 0) {
	            throw new Error('pipeP requires at least one argument');
	        }
	        return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
	    };
	
	    /**
	     * Multiplies together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The product of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.product([2,4,6,8,100,1]); //=> 38400
	     */
	    var product = reduce(multiply, 1);
	
	    /**
	     * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
	     * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
	     * Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the second argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
	     * @param {Function} of
	     * @param {*} traversable
	     * @return {*}
	     * @see R.traverse
	     * @example
	     *
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
	     *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
	     *
	     *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
	     *      R.sequence(R.of, Nothing());       //=> [Nothing()]
	     */
	    var sequence = _curry2(function sequence(of, traversable) {
	        return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (acc, x) {
	            return ap(map(prepend, x), acc);
	        }, of([]), traversable);
	    });
	
	    /**
	     * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
	     * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
	     * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
	     * into an Applicative of Traversable.
	     *
	     * Dispatches to the `sequence` method of the third argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
	     * @param {Function} of
	     * @param {Function} f
	     * @param {*} traversable
	     * @return {*}
	     * @see R.sequence
	     * @example
	     *
	     *      // Returns `Nothing` if the given divisor is `0`
	     *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
	     *
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
	     *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
	     */
	    var traverse = _curry3(function traverse(of, f, traversable) {
	        return sequence(of, map(f, traversable));
	    });
	
	    /**
	     * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
	     * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.3.0
	     * @category List
	     * @sig Chain c => c (c a) -> c a
	     * @param {*} list
	     * @return {*}
	     * @see R.flatten, R.chain
	     * @example
	     *
	     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
	     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
	     */
	    var unnest = chain(_identity);
	
	    var _contains = function _contains(a, list) {
	        return _indexOf(list, a, 0) >= 0;
	    };
	
	    //  mapPairs :: (Object, [String]) -> [String]
	    var _toString = function _toString(x, seen) {
	        var recur = function recur(y) {
	            var xs = seen.concat([x]);
	            return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
	        };
	        //  mapPairs :: (Object, [String]) -> [String]
	        var mapPairs = function (obj, keys) {
	            return _map(function (k) {
	                return _quote(k) + ': ' + recur(obj[k]);
	            }, keys.slice().sort());
	        };
	        switch (Object.prototype.toString.call(x)) {
	        case '[object Arguments]':
	            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
	        case '[object Array]':
	            return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
	                return /^\d+$/.test(k);
	            }, keys(x)))).join(', ') + ']';
	        case '[object Boolean]':
	            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
	        case '[object Date]':
	            return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
	        case '[object Null]':
	            return 'null';
	        case '[object Number]':
	            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
	        case '[object String]':
	            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
	        case '[object Undefined]':
	            return 'undefined';
	        default:
	            if (typeof x.toString === 'function') {
	                var repr = x.toString();
	                if (repr !== '[object Object]') {
	                    return repr;
	                }
	            }
	            return '{' + mapPairs(x, keys(x)).join(', ') + '}';
	        }
	    };
	
	    /**
	     * Performs right-to-left function composition. The rightmost function may have
	     * any arity; the remaining functions must be unary.
	     *
	     * **Note:** The result of compose is not automatically curried.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipe
	     * @example
	     *
	     *      var f = R.compose(R.inc, R.negate, Math.pow);
	     *
	     *      f(3, 4); // -(3^4) + 1
	     */
	    var compose = function compose() {
	        if (arguments.length === 0) {
	            throw new Error('compose requires at least one argument');
	        }
	        return pipe.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Returns the right-to-left Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.pipeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.composeK(
	     *        R.compose(Maybe.of, R.toUpper),
	     *        get('state'),
	     *        get('address'),
	     *        get('user'),
	     *        parseJson
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var composeK = function composeK() {
	        return compose.apply(this, prepend(identity, map(chain, arguments)));
	    };
	
	    /**
	     * Performs right-to-left composition of one or more Promise-returning
	     * functions. The rightmost function may have any arity; the remaining
	     * functions must be unary.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.10.0
	     * @category Function
	     * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
	     * @param {...Function} functions
	     * @return {Function}
	     * @see R.pipeP
	     * @example
	     *
	     *      //  followersForUser :: String -> Promise [User]
	     *      var followersForUser = R.composeP(db.getFollowers, db.getUserById);
	     */
	    var composeP = function composeP() {
	        if (arguments.length === 0) {
	            throw new Error('composeP requires at least one argument');
	        }
	        return pipeP.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called
	     * with the same arguments and returns the same type.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (* -> {*}) -> (* -> {*})
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Constructor function
	     *      var Widget = config => {
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
	     */
	    var construct = _curry1(function construct(Fn) {
	        return constructN(Fn.length, Fn);
	    });
	
	    /**
	     * Returns `true` if the specified value is equal, in `R.equals` terms, to at
	     * least one element of the given list; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig a -> [a] -> Boolean
	     * @param {Object} a The item to compare against.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
	     * @see R.any
	     * @example
	     *
	     *      R.contains(3, [1, 2, 3]); //=> true
	     *      R.contains(4, [1, 2, 3]); //=> false
	     *      R.contains([42], [[42]]); //=> true
	     */
	    var contains = _curry2(_contains);
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not
	     * contained in the second list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.differenceWith
	     * @example
	     *
	     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
	     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
	     */
	    var difference = _curry2(function difference(first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
	                out[out.length] = first[idx];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new list without any consecutively repeating elements. `R.equals`
	     * is used to determine equality.
	     *
	     * Dispatches to the `dropRepeats` method of the first argument, if present.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @see R.transduce
	     * @example
	     *
	     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
	     */
	    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));
	
	    /**
	     * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
	     * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	     *
	     * @func
	     * @memberOf R
	     * @since v0.7.0
	     * @category Function
	     * @sig (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The lifted function.
	     * @see R.liftN
	     * @example
	     *
	     *      var madd3 = R.lift(R.curry((a, b, c) => a + b + c));
	     *
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     *
	     *      var madd5 = R.lift(R.curry((a, b, c, d, e) => a + b + c + d + e));
	     *
	     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	     */
	    var lift = _curry1(function lift(fn) {
	        return liftN(fn.length, fn);
	    });
	
	    /**
	     * Returns a partial copy of an object omitting the keys specified.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Object
	     * @sig [String] -> {String: *} -> {String: *}
	     * @param {Array} names an array of String property names to omit from the new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with properties from `names` not on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	     */
	    var omit = _curry2(function omit(names, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (!_contains(prop, names)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns the left-to-right Kleisli composition of the provided functions,
	     * each of which must return a value of a type supported by [`chain`](#chain).
	     *
	     * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category Function
	     * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
	     * @param {...Function}
	     * @return {Function}
	     * @see R.composeK
	     * @example
	     *
	     *      //  parseJson :: String -> Maybe *
	     *      //  get :: String -> Object -> Maybe *
	     *
	     *      //  getStateCode :: Maybe String -> Maybe String
	     *      var getStateCode = R.pipeK(
	     *        parseJson,
	     *        get('user'),
	     *        get('address'),
	     *        get('state'),
	     *        R.compose(Maybe.of, R.toUpper)
	     *      );
	     *
	     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
	     *      //=> Just('NY')
	     *      getStateCode(Maybe.of('[Invalid JSON]'));
	     *      //=> Nothing()
	     */
	    var pipeK = function pipeK() {
	        return composeK.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Returns the string representation of the given value. `eval`'ing the output
	     * should result in a value equivalent to the input value. Many of the built-in
	     * `toString` methods do not satisfy this requirement.
	     *
	     * If the given value is an `[object Object]` with a `toString` method other
	     * than `Object.prototype.toString`, this method is invoked with no arguments
	     * to produce the return value. This means user-defined constructor functions
	     * can provide a suitable `toString` method. For example:
	     *
	     *     function Point(x, y) {
	     *       this.x = x;
	     *       this.y = y;
	     *     }
	     *
	     *     Point.prototype.toString = function() {
	     *       return 'new Point(' + this.x + ', ' + this.y + ')';
	     *     };
	     *
	     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
	     *
	     * @func
	     * @memberOf R
	     * @since v0.14.0
	     * @category String
	     * @sig * -> String
	     * @param {*} val
	     * @return {String}
	     * @example
	     *
	     *      R.toString(42); //=> '42'
	     *      R.toString('abc'); //=> '"abc"'
	     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
	     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
	     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
	     */
	    var toString = _curry1(function toString(val) {
	        return _toString(val, []);
	    });
	
	    /**
	     * Returns a new list without values in the first argument.
	     * `R.equals` is used to determine equality.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The values to be removed from `list2`.
	     * @param {Array} list2 The array to remove values from.
	     * @return {Array} The new array without values in `list1`.
	     * @see R.transduce
	     * @example
	     *
	     *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
	     */
	    var without = _curry2(function (xs, list) {
	        return reject(flip(_contains)(xs), list);
	    });
	
	    // A simple Set type that honours R.equals semantics
	    /* globals Set */
	    /**
	       * Combines the logic for checking whether an item is a member of the set and
	       * for adding a new item to the set.
	       *
	       * @param item       The item to check or add to the Set instance.
	       * @param shouldAdd  If true, the item will be added to the set if it doesn't
	       *                   already exist.
	       * @param set        The set instance to check or add to.
	       * @return {boolean} When shouldAdd is true, this will return true when a new
	       *                   item was added otherwise false. When shouldAdd is false,
	       *                   this will return true if the item already exists, otherwise
	       *                   false.
	       */
	    // distinguish between +0 and -0
	    // these types can all utilise Set
	    // set._items['boolean'] holds a two element array
	    // representing [ falseExists, trueExists ]
	    // compare functions for reference equality
	    /* falls through */
	    // reduce the search size of heterogeneous sets by creating buckets
	    // for each type.
	    // scan through all previously applied items
	    var _Set = function () {
	        function _Set() {
	            /* globals Set */
	            this._nativeSet = typeof Set === 'function' ? new Set() : null;
	            this._items = {};
	        }
	        _Set.prototype.add = function (item) {
	            return hasOrAdd(item, true, this);
	        };
	        _Set.prototype.has = function (item) {
	            return hasOrAdd(item, false, this);
	        };
	        /**
	       * Combines the logic for checking whether an item is a member of the set and
	       * for adding a new item to the set.
	       *
	       * @param item       The item to check or add to the Set instance.
	       * @param shouldAdd  If true, the item will be added to the set if it doesn't
	       *                   already exist.
	       * @param set        The set instance to check or add to.
	       * @return {boolean} When shouldAdd is true, this will return true when a new
	       *                   item was added otherwise false. When shouldAdd is false,
	       *                   this will return true if the item already exists, otherwise
	       *                   false.
	       */
	        function hasOrAdd(item, shouldAdd, set) {
	            var type = typeof item;
	            var prevSize, newSize;
	            switch (type) {
	            case 'string':
	            case 'number':
	                // distinguish between +0 and -0
	                if (item === 0 && !set._items['-0'] && 1 / item === -Infinity) {
	                    if (shouldAdd) {
	                        set._items['-0'] = true;
	                    }
	                    return shouldAdd;
	                }
	                // these types can all utilise Set
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize > prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = {};
	                            set._items[type][item] = true;
	                        }
	                        return shouldAdd;
	                    } else if (item in set._items[type]) {
	                        return !shouldAdd;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][item] = true;
	                        }
	                        return shouldAdd;
	                    }
	                }
	            case 'boolean':
	                // set._items['boolean'] holds a two element array
	                // representing [ falseExists, trueExists ]
	                if (type in set._items) {
	                    var bIdx = item ? 1 : 0;
	                    if (set._items[type][bIdx]) {
	                        return !shouldAdd;
	                    } else {
	                        if (shouldAdd) {
	                            set._items[type][bIdx] = true;
	                        }
	                        return shouldAdd;
	                    }
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = item ? [
	                            false,
	                            true
	                        ] : [
	                            true,
	                            false
	                        ];
	                    }
	                    return shouldAdd;
	                }
	            case 'function':
	                // compare functions for reference equality
	                if (set._nativeSet !== null) {
	                    if (shouldAdd) {
	                        prevSize = set._nativeSet.size;
	                        set._nativeSet.add(item);
	                        newSize = set._nativeSet.size;
	                        return newSize > prevSize;
	                    } else {
	                        return set._nativeSet.has(item);
	                    }
	                } else {
	                    if (!(type in set._items)) {
	                        if (shouldAdd) {
	                            set._items[type] = [item];
	                        }
	                        return shouldAdd;
	                    }
	                    if (!_contains(item, set._items[type])) {
	                        if (shouldAdd) {
	                            set._items[type].push(item);
	                        }
	                        return shouldAdd;
	                    }
	                }
	                return !shouldAdd;
	            case 'undefined':
	                if (set._items[type]) {
	                    return !shouldAdd;
	                } else {
	                    if (shouldAdd) {
	                        set._items[type] = true;
	                    }
	                    return shouldAdd;
	                }
	            case 'object':
	                if (item === null) {
	                    if (!set._items['null']) {
	                        if (shouldAdd) {
	                            set._items['null'] = true;
	                        }
	                        return shouldAdd;
	                    }
	                    return !shouldAdd;
	                }
	            /* falls through */
	            default:
	                // reduce the search size of heterogeneous sets by creating buckets
	                // for each type.
	                type = Object.prototype.toString.call(item);
	                if (!(type in set._items)) {
	                    if (shouldAdd) {
	                        set._items[type] = [item];
	                    }
	                    return shouldAdd;
	                }
	                // scan through all previously applied items
	                if (!_contains(item, set._items[type])) {
	                    if (shouldAdd) {
	                        set._items[type].push(item);
	                    }
	                    return shouldAdd;
	                }
	                return !shouldAdd;
	            }
	        }
	        return _Set;
	    }();
	
	    /**
	     * A function wrapping calls to the two functions in an `&&` operation,
	     * returning the result of the first function if it is false-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * false-y value.
	     *
	     * In addition to functions, `R.both` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	     * @see R.and
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.both(gt10, even);
	     *      f(100); //=> true
	     *      f(101); //=> false
	     */
	    var both = _curry2(function both(f, g) {
	        return _isFunction(f) ? function _both() {
	            return f.apply(this, arguments) && g.apply(this, arguments);
	        } : lift(and)(f, g);
	    });
	
	    /**
	     * Takes a function `f` and returns a function `g` such that:
	     *
	     *   - applying `g` to zero or more arguments will give __true__ if applying
	     *     the same arguments to `f` gives a logical __false__ value; and
	     *
	     *   - applying `g` to zero or more arguments will give __false__ if applying
	     *     the same arguments to `f` gives a logical __true__ value.
	     *
	     * `R.complement` will work on all other functors as well.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> *) -> (*... -> Boolean)
	     * @param {Function} f
	     * @return {Function}
	     * @see R.not
	     * @example
	     *
	     *      var isEven = n => n % 2 === 0;
	     *      var isOdd = R.complement(isEven);
	     *      isOdd(21); //=> true
	     *      isOdd(42); //=> false
	     */
	    var complement = lift(not);
	
	    /**
	     * A function wrapping calls to the two functions in an `||` operation,
	     * returning the result of the first function if it is truth-y and the result
	     * of the second function otherwise. Note that this is short-circuited,
	     * meaning that the second function will not be invoked if the first returns a
	     * truth-y value.
	     *
	     * In addition to functions, `R.either` also accepts any fantasy-land compatible
	     * applicative functor.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
	     * @see R.or
	     * @example
	     *
	     *      var gt10 = x => x > 10;
	     *      var even = x => x % 2 === 0;
	     *      var f = R.either(gt10, even);
	     *      f(101); //=> true
	     *      f(8); //=> true
	     */
	    var either = _curry2(function either(f, g) {
	        return _isFunction(f) ? function _either() {
	            return f.apply(this, arguments) || g.apply(this, arguments);
	        } : lift(or)(f, g);
	    });
	
	    /**
	     * Turns a named method with a specified arity into a function that can be
	     * called directly supplied with arguments and a target object.
	     *
	     * The returned function is curried and accepts `arity + 1` parameters where
	     * the final parameter is the target object.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
	     * @param {Number} arity Number of arguments the returned function should take
	     *        before the target object.
	     * @param {String} method Name of the method to call.
	     * @return {Function} A new curried function.
	     * @example
	     *
	     *      var sliceFrom = R.invoker(1, 'slice');
	     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
	     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
	     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
	     */
	    var invoker = _curry2(function invoker(arity, method) {
	        return curryN(arity + 1, function () {
	            var target = arguments[arity];
	            if (target != null && is(Function, target[method])) {
	                return target[method].apply(target, _slice(arguments, 0, arity));
	            }
	            throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
	        });
	    });
	
	    /**
	     * Returns a string made by inserting the `separator` between each element and
	     * concatenating all the elements into a single string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig String -> [a] -> String
	     * @param {Number|String} separator The string used to separate the elements.
	     * @param {Array} xs The elements to join into a string.
	     * @return {String} str The string made by concatenating `xs` with `separator`.
	     * @see R.split
	     * @example
	     *
	     *      var spacer = R.join(' ');
	     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
	     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
	     */
	    var join = invoker(1, 'join');
	
	    /**
	     * Creates a new function that, when invoked, caches the result of calling `fn`
	     * for a given argument set and returns the result. Subsequent calls to the
	     * memoized `fn` with the same argument set will not result in an additional
	     * call to `fn`; instead, the cached result for that set of arguments will be
	     * returned.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Function
	     * @sig (*... -> a) -> (*... -> a)
	     * @param {Function} fn The function to memoize.
	     * @return {Function} Memoized version of `fn`.
	     * @example
	     *
	     *      var count = 0;
	     *      var factorial = R.memoize(n => {
	     *        count += 1;
	     *        return R.product(R.range(1, n + 1));
	     *      });
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      count; //=> 1
	     */
	    var memoize = _curry1(function memoize(fn) {
	        var cache = {};
	        return _arity(fn.length, function () {
	            var key = toString(arguments);
	            if (!_has(key, cache)) {
	                cache[key] = fn.apply(this, arguments);
	            }
	            return cache[key];
	        });
	    });
	
	    /**
	     * Splits a string into an array of strings based on the given
	     * separator.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category String
	     * @sig (String | RegExp) -> String -> [String]
	     * @param {String|RegExp} sep The pattern.
	     * @param {String} str The string to separate into an array.
	     * @return {Array} The array of strings from `str` separated by `str`.
	     * @see R.join
	     * @example
	     *
	     *      var pathComponents = R.split('/');
	     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
	     *
	     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
	     */
	    var split = invoker(1, 'split');
	
	    /**
	     * Determines whether a given string matches a given regular expression.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.12.0
	     * @category String
	     * @sig RegExp -> String -> Boolean
	     * @param {RegExp} pattern
	     * @param {String} str
	     * @return {Boolean}
	     * @see R.match
	     * @example
	     *
	     *      R.test(/^x/, 'xyz'); //=> true
	     *      R.test(/^y/, 'xyz'); //=> false
	     */
	    var test = _curry2(function test(pattern, str) {
	        if (!_isRegExp(pattern)) {
	            throw new TypeError('\u2018test\u2019 requires a value of type RegExp as its first argument; received ' + toString(pattern));
	        }
	        return _cloneRegExp(pattern).test(str);
	    });
	
	    /**
	     * The lower case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to lower case.
	     * @return {String} The lower case version of `str`.
	     * @see R.toUpper
	     * @example
	     *
	     *      R.toLower('XYZ'); //=> 'xyz'
	     */
	    var toLower = invoker(0, 'toLowerCase');
	
	    /**
	     * The upper case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.9.0
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to upper case.
	     * @return {String} The upper case version of `str`.
	     * @see R.toLower
	     * @example
	     *
	     *      R.toUpper('abc'); //=> 'ABC'
	     */
	    var toUpper = invoker(0, 'toUpperCase');
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list, based upon the value returned by applying the supplied function to
	     * each list element. Prefers the first item if the supplied function produces
	     * the same value on two items. `R.equals` is used for comparison.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.16.0
	     * @category List
	     * @sig (a -> b) -> [a] -> [a]
	     * @param {Function} fn A function used to produce a value to use during comparisons.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
	     */
	    var uniqBy = _curry2(function uniqBy(fn, list) {
	        var set = new _Set();
	        var result = [];
	        var idx = 0;
	        var appliedItem, item;
	        while (idx < list.length) {
	            item = list[idx];
	            appliedItem = fn(item);
	            if (set.add(appliedItem)) {
	                result.push(item);
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns the result of concatenating the given lists or strings.
	     *
	     * Dispatches to the `concat` method of the first argument, if present.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @sig String -> String -> String
	     * @param {Array|String} a
	     * @param {Array|String} b
	     * @return {Array|String}
	     *
	     * @example
	     *
	     *      R.concat([], []); //=> []
	     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
	     */
	    var concat = flip(invoker(1, 'concat'));
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifferenceWith
	     * @example
	     *
	     *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
	     *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
	     */
	    var symmetricDifference = _curry2(function symmetricDifference(list1, list2) {
	        return concat(difference(list1, list2), difference(list2, list1));
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements contained in the first or
	     * second list, but not both. Duplication is determined according to the value
	     * returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.19.0
	     * @category Relation
	     * @sig (a -> a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` or `list2`, but not both.
	     * @see R.symmetricDifference
	     * @example
	     *
	     *      var eqA = R.eqBy(R.prop('a'));
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
	     *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
	     *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
	     */
	    var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith(pred, list1, list2) {
	        return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original
	     * list. `R.equals` is used to determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
	     *      R.uniq([1, '1']);     //=> [1, '1']
	     *      R.uniq([[42], [42]]); //=> [[42]]
	     */
	    var uniq = uniqBy(identity);
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The list of elements found in both `list1` and `list2`.
	     * @see R.intersectionWith
	     * @example
	     *
	     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
	     */
	    var intersection = _curry2(function intersection(list1, list2) {
	        var lookupList, filteredList;
	        if (list1.length > list2.length) {
	            lookupList = list1;
	            filteredList = list2;
	        } else {
	            lookupList = list2;
	            filteredList = list1;
	        }
	        return uniq(_filter(flip(_contains)(lookupList), filteredList));
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements
	     * of each list.
	     *
	     * @func
	     * @memberOf R
	     * @since v0.1.0
	     * @category Relation
	     * @sig [*] -> [*] -> [*]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @example
	     *
	     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
	     */
	    var union = _curry2(compose(uniq, _concat));
	
	    var R = {
	        F: F,
	        T: T,
	        __: __,
	        add: add,
	        addIndex: addIndex,
	        adjust: adjust,
	        all: all,
	        allPass: allPass,
	        allUniq: allUniq,
	        always: always,
	        and: and,
	        any: any,
	        anyPass: anyPass,
	        ap: ap,
	        aperture: aperture,
	        append: append,
	        apply: apply,
	        applySpec: applySpec,
	        assoc: assoc,
	        assocPath: assocPath,
	        binary: binary,
	        bind: bind,
	        both: both,
	        call: call,
	        chain: chain,
	        clamp: clamp,
	        clone: clone,
	        comparator: comparator,
	        complement: complement,
	        compose: compose,
	        composeK: composeK,
	        composeP: composeP,
	        concat: concat,
	        cond: cond,
	        construct: construct,
	        constructN: constructN,
	        contains: contains,
	        converge: converge,
	        countBy: countBy,
	        curry: curry,
	        curryN: curryN,
	        dec: dec,
	        defaultTo: defaultTo,
	        difference: difference,
	        differenceWith: differenceWith,
	        dissoc: dissoc,
	        dissocPath: dissocPath,
	        divide: divide,
	        drop: drop,
	        dropLast: dropLast,
	        dropLastWhile: dropLastWhile,
	        dropRepeats: dropRepeats,
	        dropRepeatsWith: dropRepeatsWith,
	        dropWhile: dropWhile,
	        either: either,
	        empty: empty,
	        eqBy: eqBy,
	        eqProps: eqProps,
	        equals: equals,
	        evolve: evolve,
	        filter: filter,
	        find: find,
	        findIndex: findIndex,
	        findLast: findLast,
	        findLastIndex: findLastIndex,
	        flatten: flatten,
	        flip: flip,
	        forEach: forEach,
	        fromPairs: fromPairs,
	        groupBy: groupBy,
	        groupWith: groupWith,
	        gt: gt,
	        gte: gte,
	        has: has,
	        hasIn: hasIn,
	        head: head,
	        identical: identical,
	        identity: identity,
	        ifElse: ifElse,
	        inc: inc,
	        indexBy: indexBy,
	        indexOf: indexOf,
	        init: init,
	        insert: insert,
	        insertAll: insertAll,
	        intersection: intersection,
	        intersectionWith: intersectionWith,
	        intersperse: intersperse,
	        into: into,
	        invert: invert,
	        invertObj: invertObj,
	        invoker: invoker,
	        is: is,
	        isArrayLike: isArrayLike,
	        isEmpty: isEmpty,
	        isNil: isNil,
	        join: join,
	        juxt: juxt,
	        keys: keys,
	        keysIn: keysIn,
	        last: last,
	        lastIndexOf: lastIndexOf,
	        length: length,
	        lens: lens,
	        lensIndex: lensIndex,
	        lensPath: lensPath,
	        lensProp: lensProp,
	        lift: lift,
	        liftN: liftN,
	        lt: lt,
	        lte: lte,
	        map: map,
	        mapAccum: mapAccum,
	        mapAccumRight: mapAccumRight,
	        mapObjIndexed: mapObjIndexed,
	        match: match,
	        mathMod: mathMod,
	        max: max,
	        maxBy: maxBy,
	        mean: mean,
	        median: median,
	        memoize: memoize,
	        merge: merge,
	        mergeAll: mergeAll,
	        mergeWith: mergeWith,
	        mergeWithKey: mergeWithKey,
	        min: min,
	        minBy: minBy,
	        modulo: modulo,
	        multiply: multiply,
	        nAry: nAry,
	        negate: negate,
	        none: none,
	        not: not,
	        nth: nth,
	        nthArg: nthArg,
	        objOf: objOf,
	        of: of,
	        omit: omit,
	        once: once,
	        or: or,
	        over: over,
	        pair: pair,
	        partial: partial,
	        partialRight: partialRight,
	        partition: partition,
	        path: path,
	        pathEq: pathEq,
	        pathOr: pathOr,
	        pathSatisfies: pathSatisfies,
	        pick: pick,
	        pickAll: pickAll,
	        pickBy: pickBy,
	        pipe: pipe,
	        pipeK: pipeK,
	        pipeP: pipeP,
	        pluck: pluck,
	        prepend: prepend,
	        product: product,
	        project: project,
	        prop: prop,
	        propEq: propEq,
	        propIs: propIs,
	        propOr: propOr,
	        propSatisfies: propSatisfies,
	        props: props,
	        range: range,
	        reduce: reduce,
	        reduceBy: reduceBy,
	        reduceRight: reduceRight,
	        reduced: reduced,
	        reject: reject,
	        remove: remove,
	        repeat: repeat,
	        replace: replace,
	        reverse: reverse,
	        scan: scan,
	        sequence: sequence,
	        set: set,
	        slice: slice,
	        sort: sort,
	        sortBy: sortBy,
	        split: split,
	        splitAt: splitAt,
	        splitEvery: splitEvery,
	        splitWhen: splitWhen,
	        subtract: subtract,
	        sum: sum,
	        symmetricDifference: symmetricDifference,
	        symmetricDifferenceWith: symmetricDifferenceWith,
	        tail: tail,
	        take: take,
	        takeLast: takeLast,
	        takeLastWhile: takeLastWhile,
	        takeWhile: takeWhile,
	        tap: tap,
	        test: test,
	        times: times,
	        toLower: toLower,
	        toPairs: toPairs,
	        toPairsIn: toPairsIn,
	        toString: toString,
	        toUpper: toUpper,
	        transduce: transduce,
	        transpose: transpose,
	        traverse: traverse,
	        trim: trim,
	        tryCatch: tryCatch,
	        type: type,
	        unapply: unapply,
	        unary: unary,
	        uncurryN: uncurryN,
	        unfold: unfold,
	        union: union,
	        unionWith: unionWith,
	        uniq: uniq,
	        uniqBy: uniqBy,
	        uniqWith: uniqWith,
	        unless: unless,
	        unnest: unnest,
	        until: until,
	        update: update,
	        useWith: useWith,
	        values: values,
	        valuesIn: valuesIn,
	        view: view,
	        when: when,
	        where: where,
	        whereEq: whereEq,
	        without: without,
	        wrap: wrap,
	        xprod: xprod,
	        zip: zip,
	        zipObj: zipObj,
	        zipWith: zipWith
	    };
	  /* eslint-env amd */
	
	  /* TEST_ENTRY_POINT */
	
	  if (true) {
	    module.exports = R;
	  } else if (typeof define === 'function' && define.amd) {
	    define(function() { return R; });
	  } else {
	    this.R = R;
	  }
	
	}.call(this));


/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(68)
	  , defined = __webpack_require__(46);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(52);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(100)
	  , $export        = __webpack_require__(41)
	  , redefine       = __webpack_require__(101)
	  , hide           = __webpack_require__(53)
	  , has            = __webpack_require__(67)
	  , Iterators      = __webpack_require__(34)
	  , $iterCreate    = __webpack_require__(99)
	  , setToStringTag = __webpack_require__(54)
	  , getProto       = __webpack_require__(18).getProto
	  , ITERATOR       = __webpack_require__(22)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },

/***/ 71:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 79:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Paper.js v0.9.25 - The Swiss Army Knife of Vector Graphics Scripting.
	 * http://paperjs.org/
	 *
	 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
	 * http://scratchdisk.com/ & http://jonathanpuckey.com/
	 *
	 * Distributed under the MIT license. See LICENSE file for details.
	 *
	 * All rights reserved.
	 *
	 * Date: Sun Oct 25 11:23:38 2015 +0100
	 *
	 ***
	 *
	 * Straps.js - Class inheritance library with support for bean-style accessors
	 *
	 * Copyright (c) 2006 - 2013 Juerg Lehni
	 * http://scratchdisk.com/
	 *
	 * Distributed under the MIT license.
	 *
	 ***
	 *
	 * Acorn.js
	 * http://marijnhaverbeke.nl/acorn/
	 *
	 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
	 * created by Marijn Haverbeke and released under an MIT license.
	 *
	 */
	
	var paper = new function(undefined) {
	
	var Base = new function() {
		var hidden = /^(statics|enumerable|beans|preserve)$/,
	
			forEach = [].forEach || function(iter, bind) {
				for (var i = 0, l = this.length; i < l; i++)
					iter.call(bind, this[i], i, this);
			},
	
			forIn = function(iter, bind) {
				for (var i in this)
					if (this.hasOwnProperty(i))
						iter.call(bind, this[i], i, this);
			},
	
			create = Object.create || function(proto) {
				return { __proto__: proto };
			},
	
			describe = Object.getOwnPropertyDescriptor || function(obj, name) {
				var get = obj.__lookupGetter__ && obj.__lookupGetter__(name);
				return get
						? { get: get, set: obj.__lookupSetter__(name),
							enumerable: true, configurable: true }
						: obj.hasOwnProperty(name)
							? { value: obj[name], enumerable: true,
								configurable: true, writable: true }
							: null;
			},
	
			_define = Object.defineProperty || function(obj, name, desc) {
				if ((desc.get || desc.set) && obj.__defineGetter__) {
					if (desc.get)
						obj.__defineGetter__(name, desc.get);
					if (desc.set)
						obj.__defineSetter__(name, desc.set);
				} else {
					obj[name] = desc.value;
				}
				return obj;
			},
	
			define = function(obj, name, desc) {
				delete obj[name];
				return _define(obj, name, desc);
			};
	
		function inject(dest, src, enumerable, beans, preserve) {
			var beansNames = {};
	
			function field(name, val) {
				val = val || (val = describe(src, name))
						&& (val.get ? val : val.value);
				if (typeof val === 'string' && val[0] === '#')
					val = dest[val.substring(1)] || val;
				var isFunc = typeof val === 'function',
					res = val,
					prev = preserve || isFunc && !val.base
							? (val && val.get ? name in dest : dest[name])
							: null,
					bean;
				if (!preserve || !prev) {
					if (isFunc && prev)
						val.base = prev;
					if (isFunc && beans !== false
							&& (bean = name.match(/^([gs]et|is)(([A-Z])(.*))$/)))
						beansNames[bean[3].toLowerCase() + bean[4]] = bean[2];
					if (!res || isFunc || !res.get || typeof res.get !== 'function'
							|| !Base.isPlainObject(res))
						res = { value: res, writable: true };
					if ((describe(dest, name)
							|| { configurable: true }).configurable) {
						res.configurable = true;
						res.enumerable = enumerable;
					}
					define(dest, name, res);
				}
			}
			if (src) {
				for (var name in src) {
					if (src.hasOwnProperty(name) && !hidden.test(name))
						field(name);
				}
				for (var name in beansNames) {
					var part = beansNames[name],
						set = dest['set' + part],
						get = dest['get' + part] || set && dest['is' + part];
					if (get && (beans === true || get.length === 0))
						field(name, { get: get, set: set });
				}
			}
			return dest;
		}
	
		function each(obj, iter, bind) {
			if (obj)
				('length' in obj && !obj.getLength
						&& typeof obj.length === 'number'
					? forEach
					: forIn).call(obj, iter, bind = bind || obj);
			return bind;
		}
	
		function set(obj, props, exclude) {
			for (var key in props)
				if (props.hasOwnProperty(key) && !(exclude && exclude[key]))
					obj[key] = props[key];
			return obj;
		}
	
		return inject(function Base() {
			for (var i = 0, l = arguments.length; i < l; i++)
				set(this, arguments[i]);
		}, {
			inject: function(src) {
				if (src) {
					var statics = src.statics === true ? src : src.statics,
						beans = src.beans,
						preserve = src.preserve;
					if (statics !== src)
						inject(this.prototype, src, src.enumerable, beans, preserve);
					inject(this, statics, true, beans, preserve);
				}
				for (var i = 1, l = arguments.length; i < l; i++)
					this.inject(arguments[i]);
				return this;
			},
	
			extend: function() {
				var base = this,
					ctor,
					proto;
				for (var i = 0, l = arguments.length; i < l; i++)
					if (ctor = arguments[i].initialize)
						break;
				ctor = ctor || function() {
					base.apply(this, arguments);
				};
				proto = ctor.prototype = create(this.prototype);
				define(proto, 'constructor',
						{ value: ctor, writable: true, configurable: true });
				inject(ctor, this, true);
				if (arguments.length)
					this.inject.apply(ctor, arguments);
				ctor.base = base;
				return ctor;
			}
		}, true).inject({
			inject: function() {
				for (var i = 0, l = arguments.length; i < l; i++) {
					var src = arguments[i];
					if (src)
						inject(this, src, src.enumerable, src.beans, src.preserve);
				}
				return this;
			},
	
			extend: function() {
				var res = create(this);
				return res.inject.apply(res, arguments);
			},
	
			each: function(iter, bind) {
				return each(this, iter, bind);
			},
	
			set: function(props) {
				return set(this, props);
			},
	
			clone: function() {
				return new this.constructor(this);
			},
	
			statics: {
				each: each,
				create: create,
				define: define,
				describe: describe,
				set: set,
	
				clone: function(obj) {
					return set(new obj.constructor(), obj);
				},
	
				isPlainObject: function(obj) {
					var ctor = obj != null && obj.constructor;
					return ctor && (ctor === Object || ctor === Base
							|| ctor.name === 'Object');
				},
	
				pick: function(a, b) {
					return a !== undefined ? a : b;
				}
			}
		});
	};
	
	if (true)
		module.exports = Base;
	
	Base.inject({
		toString: function() {
			return this._id != null
				?  (this._class || 'Object') + (this._name
					? " '" + this._name + "'"
					: ' @' + this._id)
				: '{ ' + Base.each(this, function(value, key) {
					if (!/^_/.test(key)) {
						var type = typeof value;
						this.push(key + ': ' + (type === 'number'
								? Formatter.instance.number(value)
								: type === 'string' ? "'" + value + "'" : value));
					}
				}, []).join(', ') + ' }';
		},
	
		getClassName: function() {
			return this._class || '';
		},
	
		exportJSON: function(options) {
			return Base.exportJSON(this, options);
		},
	
		toJSON: function() {
			return Base.serialize(this);
		},
	
		_set: function(props, exclude, dontCheck) {
			if (props && (dontCheck || Base.isPlainObject(props))) {
				var keys = Object.keys(props._filtering || props);
				for (var i = 0, l = keys.length; i < l; i++) {
					var key = keys[i];
					if (!(exclude && exclude[key])) {
						var value = props[key];
						if (value !== undefined)
							this[key] = value;
					}
				}
				return true;
			}
		},
	
		statics: {
	
			exports: {
				enumerable: true
			},
	
			extend: function extend() {
				var res = extend.base.apply(this, arguments),
					name = res.prototype._class;
				if (name && !Base.exports[name])
					Base.exports[name] = res;
				return res;
			},
	
			equals: function(obj1, obj2) {
				if (obj1 === obj2)
					return true;
				if (obj1 && obj1.equals)
					return obj1.equals(obj2);
				if (obj2 && obj2.equals)
					return obj2.equals(obj1);
				if (obj1 && obj2
						&& typeof obj1 === 'object' && typeof obj2 === 'object') {
					if (Array.isArray(obj1) && Array.isArray(obj2)) {
						var length = obj1.length;
						if (length !== obj2.length)
							return false;
						while (length--) {
							if (!Base.equals(obj1[length], obj2[length]))
								return false;
						}
					} else {
						var keys = Object.keys(obj1),
							length = keys.length;
						if (length !== Object.keys(obj2).length)
							return false;
						while (length--) {
							var key = keys[length];
							if (!(obj2.hasOwnProperty(key)
									&& Base.equals(obj1[key], obj2[key])))
								return false;
						}
					}
					return true;
				}
				return false;
			},
	
			read: function(list, start, options, length) {
				if (this === Base) {
					var value = this.peek(list, start);
					list.__index++;
					return value;
				}
				var proto = this.prototype,
					readIndex = proto._readIndex,
					index = start || readIndex && list.__index || 0;
				if (!length)
					length = list.length - index;
				var obj = list[index];
				if (obj instanceof this
					|| options && options.readNull && obj == null && length <= 1) {
					if (readIndex)
						list.__index = index + 1;
					return obj && options && options.clone ? obj.clone() : obj;
				}
				obj = Base.create(this.prototype);
				if (readIndex)
					obj.__read = true;
				obj = obj.initialize.apply(obj, index > 0 || length < list.length
					? Array.prototype.slice.call(list, index, index + length)
					: list) || obj;
				if (readIndex) {
					list.__index = index + obj.__read;
					obj.__read = undefined;
				}
				return obj;
			},
	
			peek: function(list, start) {
				return list[list.__index = start || list.__index || 0];
			},
	
			remain: function(list) {
				return list.length - (list.__index || 0);
			},
	
			readAll: function(list, start, options) {
				var res = [],
					entry;
				for (var i = start || 0, l = list.length; i < l; i++) {
					res.push(Array.isArray(entry = list[i])
							? this.read(entry, 0, options)
							: this.read(list, i, options, 1));
				}
				return res;
			},
	
			readNamed: function(list, name, start, options, length) {
				var value = this.getNamed(list, name),
					hasObject = value !== undefined;
				if (hasObject) {
					var filtered = list._filtered;
					if (!filtered) {
						filtered = list._filtered = Base.create(list[0]);
						filtered._filtering = list[0];
					}
					filtered[name] = undefined;
				}
				return this.read(hasObject ? [value] : list, start, options, length);
			},
	
			getNamed: function(list, name) {
				var arg = list[0];
				if (list._hasObject === undefined)
					list._hasObject = list.length === 1 && Base.isPlainObject(arg);
				if (list._hasObject)
					return name ? arg[name] : list._filtered || arg;
			},
	
			hasNamed: function(list, name) {
				return !!this.getNamed(list, name);
			},
	
			isPlainValue: function(obj, asString) {
				return this.isPlainObject(obj) || Array.isArray(obj)
						|| asString && typeof obj === 'string';
			},
	
			serialize: function(obj, options, compact, dictionary) {
				options = options || {};
	
				var root = !dictionary,
					res;
				if (root) {
					options.formatter = new Formatter(options.precision);
					dictionary = {
						length: 0,
						definitions: {},
						references: {},
						add: function(item, create) {
							var id = '#' + item._id,
								ref = this.references[id];
							if (!ref) {
								this.length++;
								var res = create.call(item),
									name = item._class;
								if (name && res[0] !== name)
									res.unshift(name);
								this.definitions[id] = res;
								ref = this.references[id] = [id];
							}
							return ref;
						}
					};
				}
				if (obj && obj._serialize) {
					res = obj._serialize(options, dictionary);
					var name = obj._class;
					if (name && !compact && !res._compact && res[0] !== name)
						res.unshift(name);
				} else if (Array.isArray(obj)) {
					res = [];
					for (var i = 0, l = obj.length; i < l; i++)
						res[i] = Base.serialize(obj[i], options, compact,
								dictionary);
					if (compact)
						res._compact = true;
				} else if (Base.isPlainObject(obj)) {
					res = {};
					var keys = Object.keys(obj);
					for (var i = 0, l = keys.length; i < l; i++) {
						var key = keys[i];
						res[key] = Base.serialize(obj[key], options, compact,
								dictionary);
					}
				} else if (typeof obj === 'number') {
					res = options.formatter.number(obj, options.precision);
				} else {
					res = obj;
				}
				return root && dictionary.length > 0
						? [['dictionary', dictionary.definitions], res]
						: res;
			},
	
			deserialize: function(json, create, _data, _isDictionary) {
				var res = json,
					isRoot = !_data;
				_data = _data || {};
				if (Array.isArray(json)) {
					var type = json[0],
						isDictionary = type === 'dictionary';
					if (json.length == 1 && /^#/.test(type))
						return _data.dictionary[type];
					type = Base.exports[type];
					res = [];
					if (_isDictionary)
						_data.dictionary = res;
					for (var i = type ? 1 : 0, l = json.length; i < l; i++)
						res.push(Base.deserialize(json[i], create, _data,
								isDictionary));
					if (type) {
						var args = res;
						if (create) {
							res = create(type, args);
						} else {
							res = Base.create(type.prototype);
							type.apply(res, args);
						}
					}
				} else if (Base.isPlainObject(json)) {
					res = {};
					if (_isDictionary)
						_data.dictionary = res;
					for (var key in json)
						res[key] = Base.deserialize(json[key], create, _data);
				}
				return isRoot && json && json.length && json[0][0] === 'dictionary'
						? res[1]
						: res;
			},
	
			exportJSON: function(obj, options) {
				var json = Base.serialize(obj, options);
				return options && options.asString === false
						? json
						: JSON.stringify(json);
			},
	
			importJSON: function(json, target) {
				return Base.deserialize(
						typeof json === 'string' ? JSON.parse(json) : json,
						function(type, args) {
							var obj = target && target.constructor === type
									? target
									: Base.create(type.prototype),
								isTarget = obj === target;
							if (args.length === 1 && obj instanceof Item
									&& (isTarget || !(obj instanceof Layer))) {
								var arg = args[0];
								if (Base.isPlainObject(arg))
									arg.insert = false;
							}
							type.apply(obj, args);
							if (isTarget)
								target = null;
							return obj;
						});
			},
	
			splice: function(list, items, index, remove) {
				var amount = items && items.length,
					append = index === undefined;
				index = append ? list.length : index;
				if (index > list.length)
					index = list.length;
				for (var i = 0; i < amount; i++)
					items[i]._index = index + i;
				if (append) {
					list.push.apply(list, items);
					return [];
				} else {
					var args = [index, remove];
					if (items)
						args.push.apply(args, items);
					var removed = list.splice.apply(list, args);
					for (var i = 0, l = removed.length; i < l; i++)
						removed[i]._index = undefined;
					for (var i = index + amount, l = list.length; i < l; i++)
						list[i]._index = i;
					return removed;
				}
			},
	
			capitalize: function(str) {
				return str.replace(/\b[a-z]/g, function(match) {
					return match.toUpperCase();
				});
			},
	
			camelize: function(str) {
				return str.replace(/-(.)/g, function(all, chr) {
					return chr.toUpperCase();
				});
			},
	
			hyphenate: function(str) {
				return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}
		}
	});
	
	var Emitter = {
		on: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.on(key, value);
				}, this);
			} else {
				var types = this._eventTypes,
					entry = types && types[type],
					handlers = this._callbacks = this._callbacks || {};
				handlers = handlers[type] = handlers[type] || [];
				if (handlers.indexOf(func) === -1) {
					handlers.push(func);
					if (entry && entry.install && handlers.length === 1)
						entry.install.call(this, type);
				}
			}
			return this;
		},
	
		off: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.off(key, value);
				}, this);
				return;
			}
			var types = this._eventTypes,
				entry = types && types[type],
				handlers = this._callbacks && this._callbacks[type],
				index;
			if (handlers) {
				if (!func || (index = handlers.indexOf(func)) !== -1
						&& handlers.length === 1) {
					if (entry && entry.uninstall)
						entry.uninstall.call(this, type);
					delete this._callbacks[type];
				} else if (index !== -1) {
					handlers.splice(index, 1);
				}
			}
			return this;
		},
	
		once: function(type, func) {
			return this.on(type, function() {
				func.apply(this, arguments);
				this.off(type, func);
			});
		},
	
		emit: function(type, event) {
			var handlers = this._callbacks && this._callbacks[type];
			if (!handlers)
				return false;
			var args = [].slice.call(arguments, 1);
			handlers = handlers.slice();
			for (var i = 0, l = handlers.length; i < l; i++) {
				if (handlers[i].apply(this, args) === false) {
					if (event && event.stop)
						event.stop();
					break;
				}
			}
			return true;
		},
	
		responds: function(type) {
			return !!(this._callbacks && this._callbacks[type]);
		},
	
		attach: '#on',
		detach: '#off',
		fire: '#emit',
	
		_installEvents: function(install) {
			var handlers = this._callbacks,
				key = install ? 'install' : 'uninstall';
			for (var type in handlers) {
				if (handlers[type].length > 0) {
					var types = this._eventTypes,
						entry = types && types[type],
						func = entry && entry[key];
					if (func)
						func.call(this, type);
				}
			}
		},
	
		statics: {
			inject: function inject(src) {
				var events = src._events;
				if (events) {
					var types = {};
					Base.each(events, function(entry, key) {
						var isString = typeof entry === 'string',
							name = isString ? entry : key,
							part = Base.capitalize(name),
							type = name.substring(2).toLowerCase();
						types[type] = isString ? {} : entry;
						name = '_' + name;
						src['get' + part] = function() {
							return this[name];
						};
						src['set' + part] = function(func) {
							var prev = this[name];
							if (prev)
								this.off(type, prev);
							if (func)
								this.on(type, func);
							this[name] = func;
						};
					});
					src._eventTypes = types;
				}
				return inject.base.apply(this, arguments);
			}
		}
	};
	
	var PaperScope = Base.extend({
		_class: 'PaperScope',
	
		initialize: function PaperScope() {
			paper = this;
			this.settings = new Base({
				applyMatrix: true,
				handleSize: 4,
				hitTolerance: 0
			});
			this.project = null;
			this.projects = [];
			this.tools = [];
			this.palettes = [];
			this._id = PaperScope._id++;
			PaperScope._scopes[this._id] = this;
			var proto = PaperScope.prototype;
			if (!this.support) {
				var ctx = CanvasProvider.getContext(1, 1);
				proto.support = {
					nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx,
					nativeBlendModes: BlendMode.nativeModes
				};
				CanvasProvider.release(ctx);
			}
	
			if (!this.browser) {
				var agent = navigator.userAgent.toLowerCase(),
					platform = (/(win)/.exec(agent)
							|| /(mac)/.exec(agent)
							|| /(linux)/.exec(agent)
							|| [])[0],
					browser = proto.browser = { platform: platform };
				if (platform)
					browser[platform] = true;
				agent.replace(
					/(opera|chrome|safari|webkit|firefox|msie|trident|atom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:([.\d]+))?/g,
					function(all, n, v1, v2, rv) {
						if (!browser.chrome) {
							var v = n === 'opera' ? v2 : v1;
							if (n === 'trident') {
								v = rv;
								n = 'msie';
							}
							browser.version = v;
							browser.versionNumber = parseFloat(v);
							browser.name = n;
							browser[n] = true;
						}
					}
				);
				if (browser.chrome)
					delete browser.webkit;
				if (browser.atom)
					delete browser.chrome;
			}
		},
	
		version: "0.9.25",
	
		getView: function() {
			return this.project && this.project.getView();
		},
	
		getPaper: function() {
			return this;
		},
	
		execute: function(code, url, options) {
			paper.PaperScript.execute(code, this, url, options);
			View.updateFocus();
		},
	
		install: function(scope) {
			var that = this;
			Base.each(['project', 'view', 'tool'], function(key) {
				Base.define(scope, key, {
					configurable: true,
					get: function() {
						return that[key];
					}
				});
			});
			for (var key in this)
				if (!/^_/.test(key) && this[key])
					scope[key] = this[key];
		},
	
		setup: function(element) {
			paper = this;
			this.project = new Project(element);
			return this;
		},
	
		activate: function() {
			paper = this;
		},
	
		clear: function() {
			for (var i = this.projects.length - 1; i >= 0; i--)
				this.projects[i].remove();
			for (var i = this.tools.length - 1; i >= 0; i--)
				this.tools[i].remove();
			for (var i = this.palettes.length - 1; i >= 0; i--)
				this.palettes[i].remove();
		},
	
		remove: function() {
			this.clear();
			delete PaperScope._scopes[this._id];
		},
	
		statics: new function() {
			function handleAttribute(name) {
				name += 'Attribute';
				return function(el, attr) {
					return el[name](attr) || el[name]('data-paper-' + attr);
				};
			}
	
			return {
				_scopes: {},
				_id: 0,
	
				get: function(id) {
					return this._scopes[id] || null;
				},
	
				getAttribute: handleAttribute('get'),
				hasAttribute: handleAttribute('has')
			};
		}
	});
	
	var PaperScopeItem = Base.extend(Emitter, {
	
		initialize: function(activate) {
			this._scope = paper;
			this._index = this._scope[this._list].push(this) - 1;
			if (activate || !this._scope[this._reference])
				this.activate();
		},
	
		activate: function() {
			if (!this._scope)
				return false;
			var prev = this._scope[this._reference];
			if (prev && prev !== this)
				prev.emit('deactivate');
			this._scope[this._reference] = this;
			this.emit('activate', prev);
			return true;
		},
	
		isActive: function() {
			return this._scope[this._reference] === this;
		},
	
		remove: function() {
			if (this._index == null)
				return false;
			Base.splice(this._scope[this._list], null, this._index, 1);
			if (this._scope[this._reference] == this)
				this._scope[this._reference] = null;
			this._scope = null;
			return true;
		}
	});
	
	var Formatter = Base.extend({
		initialize: function(precision) {
			this.precision = precision || 5;
			this.multiplier = Math.pow(10, this.precision);
		},
	
		number: function(val) {
			return Math.round(val * this.multiplier) / this.multiplier;
		},
	
		pair: function(val1, val2, separator) {
			return this.number(val1) + (separator || ',') + this.number(val2);
		},
	
		point: function(val, separator) {
			return this.number(val.x) + (separator || ',') + this.number(val.y);
		},
	
		size: function(val, separator) {
			return this.number(val.width) + (separator || ',')
					+ this.number(val.height);
		},
	
		rectangle: function(val, separator) {
			return this.point(val, separator) + (separator || ',')
					+ this.size(val, separator);
		}
	});
	
	Formatter.instance = new Formatter();
	
	var Numerical = new function() {
	
		var abscissas = [
			[  0.5773502691896257645091488],
			[0,0.7745966692414833770358531],
			[  0.3399810435848562648026658,0.8611363115940525752239465],
			[0,0.5384693101056830910363144,0.9061798459386639927976269],
			[  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
			[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
			[  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
			[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
			[  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
			[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
			[  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
			[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
			[  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
			[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
			[  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
		];
	
		var weights = [
			[1],
			[0.8888888888888888888888889,0.5555555555555555555555556],
			[0.6521451548625461426269361,0.3478548451374538573730639],
			[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
			[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
			[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
			[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
			[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
			[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
			[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
			[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
			[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
			[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
			[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
			[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
		];
	
		var abs = Math.abs,
			sqrt = Math.sqrt,
			pow = Math.pow,
			EPSILON = 1e-12,
			MACHINE_EPSILON = 1.12e-16;
	
		function clip(value, min, max) {
			return value < min ? min : value > max ? max : value;
		}
	
		return {
			TOLERANCE: 1e-6,
			EPSILON: EPSILON,
			MACHINE_EPSILON: MACHINE_EPSILON,
			CURVETIME_EPSILON: 4e-7,
			GEOMETRIC_EPSILON: 2e-7,
			WINDING_EPSILON: 2e-7,
			TRIGONOMETRIC_EPSILON: 1e-7,
			CLIPPING_EPSILON: 1e-7,
			KAPPA: 4 * (sqrt(2) - 1) / 3,
	
			isZero: function(val) {
				return val >= -EPSILON && val <= EPSILON;
			},
	
			integrate: function(f, a, b, n) {
				var x = abscissas[n - 2],
					w = weights[n - 2],
					A = (b - a) * 0.5,
					B = A + a,
					i = 0,
					m = (n + 1) >> 1,
					sum = n & 1 ? w[i++] * f(B) : 0;
				while (i < m) {
					var Ax = A * x[i];
					sum += w[i++] * (f(B + Ax) + f(B - Ax));
				}
				return A * sum;
			},
	
			findRoot: function(f, df, x, a, b, n, tolerance) {
				for (var i = 0; i < n; i++) {
					var fx = f(x),
						dx = fx / df(x),
						nx = x - dx;
					if (abs(dx) < tolerance)
						return nx;
					if (fx > 0) {
						b = x;
						x = nx <= a ? (a + b) * 0.5 : nx;
					} else {
						a = x;
						x = nx >= b ? (a + b) * 0.5 : nx;
					}
				}
				return x;
			},
	
			solveQuadratic: function(a, b, c, roots, min, max) {
				var count = 0,
					eMin = min - EPSILON,
					eMax = max + EPSILON,
					x1, x2 = Infinity,
					B = b,
					D;
				b /= -2;
				D = b * b - a * c;
				if (D !== 0 && abs(D) < MACHINE_EPSILON) {
					var gmC = pow(abs(a * b * c), 1 / 3);
					if (gmC < 1e-8) {
						var mult = pow(10,
								abs(Math.floor(Math.log(gmC) * Math.LOG10E)));
						if (!isFinite(mult))
							mult = 0;
						a *= mult;
						b *= mult;
						c *= mult;
						D = b * b - a * c;
					}
				}
				if (abs(a) < EPSILON) {
					if (abs(B) < EPSILON)
						return abs(c) < EPSILON ? -1 : 0;
					x1 = -c / B;
				} else if (D >= -MACHINE_EPSILON) {
					var Q = D < 0 ? 0 : sqrt(D),
						R = b + (b < 0 ? -Q : Q);
					if (R === 0) {
						x1 = c / a;
						x2 = -x1;
					} else {
						x1 = R / a;
						x2 = c / R;
					}
				}
				if (isFinite(x1) && (min == null || x1 > eMin && x1 < eMax))
					roots[count++] = min == null ? x1 : clip(x1, min, max);
				if (x2 !== x1
						&& isFinite(x2) && (min == null || x2 > eMin && x2 < eMax))
					roots[count++] = min == null ? x2 : clip(x2, min, max);
				return count;
			},
	
			solveCubic: function(a, b, c, d, roots, min, max) {
				var count = 0,
					x, b1, c2;
				if (abs(a) < EPSILON) {
					a = b;
					b1 = c;
					c2 = d;
					x = Infinity;
				} else if (abs(d) < EPSILON) {
					b1 = b;
					c2 = c;
					x = 0;
				} else {
					var ec = 1 + MACHINE_EPSILON,
						x0, q, qd, t, r, s, tmp;
					x = -(b / a) / 3;
					tmp = a * x,
					b1 = tmp + b,
					c2 = b1 * x + c,
					qd = (tmp + b1) * x + c2,
					q = c2 * x + d;
					t = q /a;
					r = pow(abs(t), 1/3);
					s = t < 0 ? -1 : 1;
					t = -qd / a;
					r = t > 0 ? 1.3247179572 * Math.max(r, sqrt(t)) : r;
					x0 = x - s * r;
					if (x0 !== x) {
						do {
							x = x0;
							tmp = a * x,
							b1 = tmp + b,
							c2 = b1 * x + c,
							qd = (tmp + b1) * x + c2,
							q = c2 * x + d;
							x0 = qd === 0 ? x : x - q / qd / ec;
							if (x0 === x) {
								x = x0;
								break;
							}
						} while (s * x0 > s * x);
						if (abs(a) * x * x > abs(d / x)) {
							c2 = -d / x;
							b1 = (c2 - c) / x;
						}
					}
				}
				var count = Numerical.solveQuadratic(a, b1, c2, roots, min, max);
				if (isFinite(x) && (count === 0 || x !== roots[count - 1])
						&& (min == null || x > min - EPSILON && x < max + EPSILON))
					roots[count++] = min == null ? x : clip(x, min, max);
				return count;
			}
		};
	};
	
	var UID = {
		_id: 1,
		_pools: {},
	
		get: function(ctor) {
			if (ctor) {
				var name = ctor._class,
					pool = this._pools[name];
				if (!pool)
					pool = this._pools[name] = { _id: 1 };
				return pool._id++;
			} else {
				return this._id++;
			}
		}
	};
	
	var Point = Base.extend({
		_class: 'Point',
		_readIndex: true,
	
		initialize: function Point(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasY = typeof arg1 === 'number';
				this.x = arg0;
				this.y = hasY ? arg1 : arg0;
				if (this.__read)
					this.__read = hasY ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.x != null) {
					this.x = arg0.x;
					this.y = arg0.y;
				} else if (arg0.width != null) {
					this.x = arg0.width;
					this.y = arg0.height;
				} else if (arg0.angle != null) {
					this.x = arg0.length;
					this.y = 0;
					this.setAngle(arg0.angle);
				} else {
					this.x = this.y = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},
	
		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
	
		equals: function(point) {
			return this === point || point
					&& (this.x === point.x && this.y === point.y
						|| Array.isArray(point)
							&& this.x === point[0] && this.y === point[1])
					|| false;
		},
	
		clone: function() {
			return new Point(this.x, this.y);
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x), f.number(this.y)];
		},
	
		getLength: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
	
		setLength: function(length) {
			if (this.isZero()) {
				var angle = this._angle || 0;
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			} else {
				var scale = length / this.getLength();
				if (Numerical.isZero(scale))
					this.getAngle();
				this.set(
					this.x * scale,
					this.y * scale
				);
			}
		},
		getAngle: function() {
			return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
		},
	
		setAngle: function(angle) {
			this.setAngleInRadians.call(this, angle * Math.PI / 180);
		},
	
		getAngleInDegrees: '#getAngle',
		setAngleInDegrees: '#setAngle',
	
		getAngleInRadians: function() {
			if (!arguments.length) {
				return this.isZero()
						? this._angle || 0
						: this._angle = Math.atan2(this.y, this.x);
			} else {
				var point = Point.read(arguments),
					div = this.getLength() * point.getLength();
				if (Numerical.isZero(div)) {
					return NaN;
				} else {
					var a = this.dot(point) / div;
					return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
				}
			}
		},
	
		setAngleInRadians: function(angle) {
			this._angle = angle;
			if (!this.isZero()) {
				var length = this.getLength();
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			}
		},
	
		getQuadrant: function() {
			return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
		}
	}, {
		beans: false,
	
		getDirectedAngle: function() {
			var point = Point.read(arguments);
			return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
		},
	
		getDistance: function() {
			var point = Point.read(arguments),
				x = point.x - this.x,
				y = point.y - this.y,
				d = x * x + y * y,
				squared = Base.read(arguments);
			return squared ? d : Math.sqrt(d);
		},
	
		normalize: function(length) {
			if (length === undefined)
				length = 1;
			var current = this.getLength(),
				scale = current !== 0 ? length / current : 0,
				point = new Point(this.x * scale, this.y * scale);
			if (scale >= 0)
				point._angle = this._angle;
			return point;
		},
	
		rotate: function(angle, center) {
			if (angle === 0)
				return this.clone();
			angle = angle * Math.PI / 180;
			var point = center ? this.subtract(center) : this,
				sin = Math.sin(angle),
				cos = Math.cos(angle);
			point = new Point(
				point.x * cos - point.y * sin,
				point.x * sin + point.y * cos
			);
			return center ? point.add(center) : point;
		},
	
		transform: function(matrix) {
			return matrix ? matrix._transformPoint(this) : this;
		},
	
		add: function() {
			var point = Point.read(arguments);
			return new Point(this.x + point.x, this.y + point.y);
		},
	
		subtract: function() {
			var point = Point.read(arguments);
			return new Point(this.x - point.x, this.y - point.y);
		},
	
		multiply: function() {
			var point = Point.read(arguments);
			return new Point(this.x * point.x, this.y * point.y);
		},
	
		divide: function() {
			var point = Point.read(arguments);
			return new Point(this.x / point.x, this.y / point.y);
		},
	
		modulo: function() {
			var point = Point.read(arguments);
			return new Point(this.x % point.x, this.y % point.y);
		},
	
		negate: function() {
			return new Point(-this.x, -this.y);
		},
	
		isInside: function() {
			return Rectangle.read(arguments).contains(this);
		},
	
		isClose: function() {
			var point = Point.read(arguments),
				tolerance = Base.read(arguments);
			return this.getDistance(point) < tolerance;
		},
	
		isCollinear: function() {
			var point = Point.read(arguments);
			return Point.isCollinear(this.x, this.y, point.x, point.y);
		},
	
		isColinear: '#isCollinear',
	
		isOrthogonal: function() {
			var point = Point.read(arguments);
			return Point.isOrthogonal(this.x, this.y, point.x, point.y);
		},
	
		isZero: function() {
			return Numerical.isZero(this.x) && Numerical.isZero(this.y);
		},
	
		isNaN: function() {
			return isNaN(this.x) || isNaN(this.y);
		},
	
		dot: function() {
			var point = Point.read(arguments);
			return this.x * point.x + this.y * point.y;
		},
	
		cross: function() {
			var point = Point.read(arguments);
			return this.x * point.y - this.y * point.x;
		},
	
		project: function() {
			var point = Point.read(arguments),
				scale = point.isZero() ? 0 : this.dot(point) / point.dot(point);
			return new Point(
				point.x * scale,
				point.y * scale
			);
		},
	
		statics: {
			min: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.min(point1.x, point2.x),
					Math.min(point1.y, point2.y)
				);
			},
	
			max: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.max(point1.x, point2.x),
					Math.max(point1.y, point2.y)
				);
			},
	
			random: function() {
				return new Point(Math.random(), Math.random());
			},
	
			isCollinear: function(x1, y1, x2, y2) {
				return Math.abs(x1 * y2 - y1 * x2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			},
	
			isOrthogonal: function(x1, y1, x2, y2) {
				return Math.abs(x1 * x2 + y1 * y2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Point(op(this.x), op(this.y));
		};
	}, {}));
	
	var LinkedPoint = Point.extend({
		initialize: function Point(x, y, owner, setter) {
			this._x = x;
			this._y = y;
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(x, y, _dontNotify) {
			this._x = x;
			this._y = y;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},
	
		getX: function() {
			return this._x;
		},
	
		setX: function(x) {
			this._x = x;
			this._owner[this._setter](this);
		},
	
		getY: function() {
			return this._y;
		},
	
		setY: function(y) {
			this._y = y;
			this._owner[this._setter](this);
		}
	});
	
	var Size = Base.extend({
		_class: 'Size',
		_readIndex: true,
	
		initialize: function Size(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasHeight = typeof arg1 === 'number';
				this.width = arg0;
				this.height = hasHeight ? arg1 : arg0;
				if (this.__read)
					this.__read = hasHeight ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.width = this.height = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.width = arg0[0];
					this.height = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.width != null) {
					this.width = arg0.width;
					this.height = arg0.height;
				} else if (arg0.x != null) {
					this.width = arg0.x;
					this.height = arg0.y;
				} else {
					this.width = this.height = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},
	
		set: function(width, height) {
			this.width = width;
			this.height = height;
			return this;
		},
	
		equals: function(size) {
			return size === this || size && (this.width === size.width
					&& this.height === size.height
					|| Array.isArray(size) && this.width === size[0]
						&& this.height === size[1]) || false;
		},
	
		clone: function() {
			return new Size(this.width, this.height);
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height) + ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.width),
					f.number(this.height)];
		},
	
		add: function() {
			var size = Size.read(arguments);
			return new Size(this.width + size.width, this.height + size.height);
		},
	
		subtract: function() {
			var size = Size.read(arguments);
			return new Size(this.width - size.width, this.height - size.height);
		},
	
		multiply: function() {
			var size = Size.read(arguments);
			return new Size(this.width * size.width, this.height * size.height);
		},
	
		divide: function() {
			var size = Size.read(arguments);
			return new Size(this.width / size.width, this.height / size.height);
		},
	
		modulo: function() {
			var size = Size.read(arguments);
			return new Size(this.width % size.width, this.height % size.height);
		},
	
		negate: function() {
			return new Size(-this.width, -this.height);
		},
	
		isZero: function() {
			return Numerical.isZero(this.width) && Numerical.isZero(this.height);
		},
	
		isNaN: function() {
			return isNaN(this.width) || isNaN(this.height);
		},
	
		statics: {
			min: function(size1, size2) {
				return new Size(
					Math.min(size1.width, size2.width),
					Math.min(size1.height, size2.height));
			},
	
			max: function(size1, size2) {
				return new Size(
					Math.max(size1.width, size2.width),
					Math.max(size1.height, size2.height));
			},
	
			random: function() {
				return new Size(Math.random(), Math.random());
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Size(op(this.width), op(this.height));
		};
	}, {}));
	
	var LinkedSize = Size.extend({
		initialize: function Size(width, height, owner, setter) {
			this._width = width;
			this._height = height;
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(width, height, _dontNotify) {
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},
	
		getWidth: function() {
			return this._width;
		},
	
		setWidth: function(width) {
			this._width = width;
			this._owner[this._setter](this);
		},
	
		getHeight: function() {
			return this._height;
		},
	
		setHeight: function(height) {
			this._height = height;
			this._owner[this._setter](this);
		}
	});
	
	var Rectangle = Base.extend({
		_class: 'Rectangle',
		_readIndex: true,
		beans: true,
	
		initialize: function Rectangle(arg0, arg1, arg2, arg3) {
			var type = typeof arg0,
				read = 0;
			if (type === 'number') {
				this.x = arg0;
				this.y = arg1;
				this.width = arg2;
				this.height = arg3;
				read = 4;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = this.width = this.height = 0;
				read = arg0 === null ? 1 : 0;
			} else if (arguments.length === 1) {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0[1];
					this.width = arg0[2];
					this.height = arg0[3];
					read = 1;
				} else if (arg0.x !== undefined || arg0.width !== undefined) {
					this.x = arg0.x || 0;
					this.y = arg0.y || 0;
					this.width = arg0.width || 0;
					this.height = arg0.height || 0;
					read = 1;
				} else if (arg0.from === undefined && arg0.to === undefined) {
					this.x = this.y = this.width = this.height = 0;
					this._set(arg0);
					read = 1;
				}
			}
			if (!read) {
				var point = Point.readNamed(arguments, 'from'),
					next = Base.peek(arguments);
				this.x = point.x;
				this.y = point.y;
				if (next && next.x !== undefined || Base.hasNamed(arguments, 'to')) {
					var to = Point.readNamed(arguments, 'to');
					this.width = to.x - point.x;
					this.height = to.y - point.y;
					if (this.width < 0) {
						this.x = to.x;
						this.width = -this.width;
					}
					if (this.height < 0) {
						this.y = to.y;
						this.height = -this.height;
					}
				} else {
					var size = Size.read(arguments);
					this.width = size.width;
					this.height = size.height;
				}
				read = arguments.__index;
			}
			if (this.__read)
				this.__read = read;
		},
	
		set: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return this;
		},
	
		clone: function() {
			return new Rectangle(this.x, this.y, this.width, this.height);
		},
	
		equals: function(rect) {
			var rt = Base.isPlainValue(rect)
					? Rectangle.read(arguments)
					: rect;
			return rt === this
					|| rt && this.x === rt.x && this.y === rt.y
						&& this.width === rt.width && this.height === rt.height
					|| false;
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x)
					+ ', y: ' + f.number(this.y)
					+ ', width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height)
					+ ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x),
					f.number(this.y),
					f.number(this.width),
					f.number(this.height)];
		},
	
		getPoint: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.x, this.y, this, 'setPoint');
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this.x = point.x;
			this.y = point.y;
		},
	
		getSize: function(_dontLink) {
			var ctor = _dontLink ? Size : LinkedSize;
			return new ctor(this.width, this.height, this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (this._fixX)
				this.x += (this.width - size.width) * this._fixX;
			if (this._fixY)
				this.y += (this.height - size.height) * this._fixY;
			this.width = size.width;
			this.height = size.height;
			this._fixW = 1;
			this._fixH = 1;
		},
	
		getLeft: function() {
			return this.x;
		},
	
		setLeft: function(left) {
			if (!this._fixW)
				this.width -= left - this.x;
			this.x = left;
			this._fixX = 0;
		},
	
		getTop: function() {
			return this.y;
		},
	
		setTop: function(top) {
			if (!this._fixH)
				this.height -= top - this.y;
			this.y = top;
			this._fixY = 0;
		},
	
		getRight: function() {
			return this.x + this.width;
		},
	
		setRight: function(right) {
			if (this._fixX !== undefined && this._fixX !== 1)
				this._fixW = 0;
			if (this._fixW)
				this.x = right - this.width;
			else
				this.width = right - this.x;
			this._fixX = 1;
		},
	
		getBottom: function() {
			return this.y + this.height;
		},
	
		setBottom: function(bottom) {
			if (this._fixY !== undefined && this._fixY !== 1)
				this._fixH = 0;
			if (this._fixH)
				this.y = bottom - this.height;
			else
				this.height = bottom - this.y;
			this._fixY = 1;
		},
	
		getCenterX: function() {
			return this.x + this.width * 0.5;
		},
	
		setCenterX: function(x) {
			this.x = x - this.width * 0.5;
			this._fixX = 0.5;
		},
	
		getCenterY: function() {
			return this.y + this.height * 0.5;
		},
	
		setCenterY: function(y) {
			this.y = y - this.height * 0.5;
			this._fixY = 0.5;
		},
	
		getCenter: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.getCenterX(), this.getCenterY(), this, 'setCenter');
		},
	
		setCenter: function() {
			var point = Point.read(arguments);
			this.setCenterX(point.x);
			this.setCenterY(point.y);
			return this;
		},
	
		getArea: function() {
			return this.width * this.height;
		},
	
		isEmpty: function() {
			return this.width === 0 || this.height === 0;
		},
	
		contains: function(arg) {
			return arg && arg.width !== undefined
					|| (Array.isArray(arg) ? arg : arguments).length == 4
					? this._containsRectangle(Rectangle.read(arguments))
					: this._containsPoint(Point.read(arguments));
		},
	
		_containsPoint: function(point) {
			var x = point.x,
				y = point.y;
			return x >= this.x && y >= this.y
					&& x <= this.x + this.width
					&& y <= this.y + this.height;
		},
	
		_containsRectangle: function(rect) {
			var x = rect.x,
				y = rect.y;
			return x >= this.x && y >= this.y
					&& x + rect.width <= this.x + this.width
					&& y + rect.height <= this.y + this.height;
		},
	
		intersects: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width > this.x
					&& rect.y + rect.height > this.y
					&& rect.x < this.x + this.width
					&& rect.y < this.y + this.height;
		},
	
		touches: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width >= this.x
					&& rect.y + rect.height >= this.y
					&& rect.x <= this.x + this.width
					&& rect.y <= this.y + this.height;
		},
	
		intersect: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.max(this.x, rect.x),
				y1 = Math.max(this.y, rect.y),
				x2 = Math.min(this.x + this.width, rect.x + rect.width),
				y2 = Math.min(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		unite: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.min(this.x, rect.x),
				y1 = Math.min(this.y, rect.y),
				x2 = Math.max(this.x + this.width, rect.x + rect.width),
				y2 = Math.max(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		include: function() {
			var point = Point.read(arguments);
			var x1 = Math.min(this.x, point.x),
				y1 = Math.min(this.y, point.y),
				x2 = Math.max(this.x + this.width, point.x),
				y2 = Math.max(this.y + this.height, point.y);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		expand: function() {
			var amount = Size.read(arguments),
				hor = amount.width,
				ver = amount.height;
			return new Rectangle(this.x - hor / 2, this.y - ver / 2,
					this.width + hor, this.height + ver);
		},
	
		scale: function(hor, ver) {
			return this.expand(this.width * hor - this.width,
					this.height * (ver === undefined ? hor : ver) - this.height);
		}
	}, Base.each([
			['Top', 'Left'], ['Top', 'Right'],
			['Bottom', 'Left'], ['Bottom', 'Right'],
			['Left', 'Center'], ['Top', 'Center'],
			['Right', 'Center'], ['Bottom', 'Center']
		],
		function(parts, index) {
			var part = parts.join('');
			var xFirst = /^[RL]/.test(part);
			if (index >= 4)
				parts[1] += xFirst ? 'Y' : 'X';
			var x = parts[xFirst ? 0 : 1],
				y = parts[xFirst ? 1 : 0],
				getX = 'get' + x,
				getY = 'get' + y,
				setX = 'set' + x,
				setY = 'set' + y,
				get = 'get' + part,
				set = 'set' + part;
			this[get] = function(_dontLink) {
				var ctor = _dontLink ? Point : LinkedPoint;
				return new ctor(this[getX](), this[getY](), this, set);
			};
			this[set] = function() {
				var point = Point.read(arguments);
				this[setX](point.x);
				this[setY](point.y);
			};
		}, {
			beans: true
		}
	));
	
	var LinkedRectangle = Rectangle.extend({
		initialize: function Rectangle(x, y, width, height, owner, setter) {
			this.set(x, y, width, height, true);
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(x, y, width, height, _dontNotify) {
			this._x = x;
			this._y = y;
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		}
	},
	new function() {
		var proto = Rectangle.prototype;
	
		return Base.each(['x', 'y', 'width', 'height'], function(key) {
			var part = Base.capitalize(key);
			var internal = '_' + key;
			this['get' + part] = function() {
				return this[internal];
			};
	
			this['set' + part] = function(value) {
				this[internal] = value;
				if (!this._dontNotify)
					this._owner[this._setter](this);
			};
		}, Base.each(['Point', 'Size', 'Center',
				'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
				'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
				'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
			function(key) {
				var name = 'set' + key;
				this[name] = function() {
					this._dontNotify = true;
					proto[name].apply(this, arguments);
					this._dontNotify = false;
					this._owner[this._setter](this);
				};
			}, {
				isSelected: function() {
					return this._owner._boundsSelected;
				},
	
				setSelected: function(selected) {
					var owner = this._owner;
					if (owner.setSelected) {
						owner._boundsSelected = selected;
						owner.setSelected(selected || owner._selectedSegmentState > 0);
					}
				}
			})
		);
	});
	
	var Matrix = Base.extend({
		_class: 'Matrix',
	
		initialize: function Matrix(arg) {
			var count = arguments.length,
				ok = true;
			if (count === 6) {
				this.set.apply(this, arguments);
			} else if (count === 1) {
				if (arg instanceof Matrix) {
					this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
				} else if (Array.isArray(arg)) {
					this.set.apply(this, arg);
				} else {
					ok = false;
				}
			} else if (count === 0) {
				this.reset();
			} else {
				ok = false;
			}
			if (!ok)
				throw new Error('Unsupported matrix parameters');
		},
	
		set: function(a, c, b, d, tx, ty, _dontNotify) {
			this._a = a;
			this._c = c;
			this._b = b;
			this._d = d;
			this._tx = tx;
			this._ty = ty;
			if (!_dontNotify)
				this._changed();
			return this;
		},
	
		_serialize: function(options) {
			return Base.serialize(this.getValues(), options);
		},
	
		_changed: function() {
			var owner = this._owner;
			if (owner) {
				if (owner._applyMatrix) {
					owner.transform(null, true);
				} else {
					owner._changed(9);
				}
			}
		},
	
		clone: function() {
			return new Matrix(this._a, this._c, this._b, this._d,
					this._tx, this._ty);
		},
	
		equals: function(mx) {
			return mx === this || mx && this._a === mx._a && this._b === mx._b
					&& this._c === mx._c && this._d === mx._d
					&& this._tx === mx._tx && this._ty === mx._ty
					|| false;
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '[[' + [f.number(this._a), f.number(this._b),
						f.number(this._tx)].join(', ') + '], ['
					+ [f.number(this._c), f.number(this._d),
						f.number(this._ty)].join(', ') + ']]';
		},
	
		reset: function(_dontNotify) {
			this._a = this._d = 1;
			this._c = this._b = this._tx = this._ty = 0;
			if (!_dontNotify)
				this._changed();
			return this;
		},
	
		apply: function(recursively, _setApplyMatrix) {
			var owner = this._owner;
			if (owner) {
				owner.transform(null, true, Base.pick(recursively, true),
						_setApplyMatrix);
				return this.isIdentity();
			}
			return false;
		},
	
		translate: function() {
			var point = Point.read(arguments),
				x = point.x,
				y = point.y;
			this._tx += x * this._a + y * this._b;
			this._ty += x * this._c + y * this._d;
			this._changed();
			return this;
		},
	
		scale: function() {
			var scale = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			this._a *= scale.x;
			this._c *= scale.x;
			this._b *= scale.y;
			this._d *= scale.y;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},
	
		rotate: function(angle ) {
			angle *= Math.PI / 180;
			var center = Point.read(arguments, 1),
				x = center.x,
				y = center.y,
				cos = Math.cos(angle),
				sin = Math.sin(angle),
				tx = x - x * cos + y * sin,
				ty = y - x * sin - y * cos,
				a = this._a,
				b = this._b,
				c = this._c,
				d = this._d;
			this._a = cos * a + sin * b;
			this._b = -sin * a + cos * b;
			this._c = cos * c + sin * d;
			this._d = -sin * c + cos * d;
			this._tx += tx * a + ty * b;
			this._ty += tx * c + ty * d;
			this._changed();
			return this;
		},
	
		shear: function() {
			var shear = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			var a = this._a,
				c = this._c;
			this._a += shear.y * this._b;
			this._c += shear.y * this._d;
			this._b += shear.x * a;
			this._d += shear.x * c;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},
	
		skew: function() {
			var skew = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true }),
				toRadians = Math.PI / 180,
				shear = new Point(Math.tan(skew.x * toRadians),
					Math.tan(skew.y * toRadians));
			return this.shear(shear, center);
		},
	
		concatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + c2 * b1;
			this._b = b2 * a1 + d2 * b1;
			this._c = a2 * c1 + c2 * d1;
			this._d = b2 * c1 + d2 * d1;
			this._tx += tx2 * a1 + ty2 * b1;
			this._ty += tx2 * c1 + ty2 * d1;
			this._changed();
			return this;
		},
	
		preConcatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + b2 * c1;
			this._b = a2 * b1 + b2 * d1;
			this._c = c2 * a1 + d2 * c1;
			this._d = c2 * b1 + d2 * d1;
			this._tx = a2 * tx1 + b2 * ty1 + tx2;
			this._ty = c2 * tx1 + d2 * ty1 + ty2;
			this._changed();
			return this;
		},
	
		chain: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			return new Matrix(
					a2 * a1 + c2 * b1,
					a2 * c1 + c2 * d1,
					b2 * a1 + d2 * b1,
					b2 * c1 + d2 * d1,
					tx1 + tx2 * a1 + ty2 * b1,
					ty1 + tx2 * c1 + ty2 * d1);
		},
	
		isIdentity: function() {
			return this._a === 1 && this._c === 0 && this._b === 0 && this._d === 1
					&& this._tx === 0 && this._ty === 0;
		},
	
		orNullIfIdentity: function() {
			return this.isIdentity() ? null : this;
		},
	
		isInvertible: function() {
			return !!this._getDeterminant();
		},
	
		isSingular: function() {
			return !this._getDeterminant();
		},
	
		transform: function( src, dst, count) {
			return arguments.length < 3
				? this._transformPoint(Point.read(arguments))
				: this._transformCoordinates(src, dst, count);
		},
	
		_transformPoint: function(point, dest, _dontNotify) {
			var x = point.x,
				y = point.y;
			if (!dest)
				dest = new Point();
			return dest.set(
				x * this._a + y * this._b + this._tx,
				x * this._c + y * this._d + this._ty,
				_dontNotify
			);
		},
	
		_transformCoordinates: function(src, dst, count) {
			var i = 0,
				j = 0,
				max = 2 * count;
			while (i < max) {
				var x = src[i++],
					y = src[i++];
				dst[j++] = x * this._a + y * this._b + this._tx;
				dst[j++] = x * this._c + y * this._d + this._ty;
			}
			return dst;
		},
	
		_transformCorners: function(rect) {
			var x1 = rect.x,
				y1 = rect.y,
				x2 = x1 + rect.width,
				y2 = y1 + rect.height,
				coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
			return this._transformCoordinates(coords, coords, 4);
		},
	
		_transformBounds: function(bounds, dest, _dontNotify) {
			var coords = this._transformCorners(bounds),
				min = coords.slice(0, 2),
				max = min.slice();
			for (var i = 2; i < 8; i++) {
				var val = coords[i],
					j = i & 1;
				if (val < min[j])
					min[j] = val;
				else if (val > max[j])
					max[j] = val;
			}
			if (!dest)
				dest = new Rectangle();
			return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1],
					_dontNotify);
		},
	
		inverseTransform: function() {
			return this._inverseTransform(Point.read(arguments));
		},
	
		_getDeterminant: function() {
			var det = this._a * this._d - this._b * this._c;
			return isFinite(det) && !Numerical.isZero(det)
					&& isFinite(this._tx) && isFinite(this._ty)
					? det : null;
		},
	
		_inverseTransform: function(point, dest, _dontNotify) {
			var det = this._getDeterminant();
			if (!det)
				return null;
			var x = point.x - this._tx,
				y = point.y - this._ty;
			if (!dest)
				dest = new Point();
			return dest.set(
				(x * this._d - y * this._b) / det,
				(y * this._a - x * this._c) / det,
				_dontNotify
			);
		},
	
		decompose: function() {
			var a = this._a, b = this._b, c = this._c, d = this._d;
			if (Numerical.isZero(a * d - b * c))
				return null;
	
			var scaleX = Math.sqrt(a * a + b * b);
			a /= scaleX;
			b /= scaleX;
	
			var shear = a * c + b * d;
			c -= a * shear;
			d -= b * shear;
	
			var scaleY = Math.sqrt(c * c + d * d);
			c /= scaleY;
			d /= scaleY;
			shear /= scaleY;
	
			if (a * d < b * c) {
				a = -a;
				b = -b;
				shear = -shear;
				scaleX = -scaleX;
			}
	
			return {
				scaling: new Point(scaleX, scaleY),
				rotation: -Math.atan2(b, a) * 180 / Math.PI,
				shearing: shear
			};
		},
	
		getValues: function() {
			return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
		},
	
		getTranslation: function() {
			return new Point(this._tx, this._ty);
		},
	
		getScaling: function() {
			return (this.decompose() || {}).scaling;
		},
	
		getRotation: function() {
			return (this.decompose() || {}).rotation;
		},
	
		inverted: function() {
			var det = this._getDeterminant();
			return det && new Matrix(
					this._d / det,
					-this._c / det,
					-this._b / det,
					this._a / det,
					(this._b * this._ty - this._d * this._tx) / det,
					(this._c * this._tx - this._a * this._ty) / det);
		},
	
		shiftless: function() {
			return new Matrix(this._a, this._c, this._b, this._d, 0, 0);
		},
	
		applyToContext: function(ctx) {
			ctx.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
		}
	}, Base.each(['a', 'c', 'b', 'd', 'tx', 'ty'], function(name) {
		var part = Base.capitalize(name),
			prop = '_' + name;
		this['get' + part] = function() {
			return this[prop];
		};
		this['set' + part] = function(value) {
			this[prop] = value;
			this._changed();
		};
	}, {}));
	
	var Line = Base.extend({
		_class: 'Line',
	
		initialize: function Line(arg0, arg1, arg2, arg3, arg4) {
			var asVector = false;
			if (arguments.length >= 4) {
				this._px = arg0;
				this._py = arg1;
				this._vx = arg2;
				this._vy = arg3;
				asVector = arg4;
			} else {
				this._px = arg0.x;
				this._py = arg0.y;
				this._vx = arg1.x;
				this._vy = arg1.y;
				asVector = arg2;
			}
			if (!asVector) {
				this._vx -= this._px;
				this._vy -= this._py;
			}
		},
	
		getPoint: function() {
			return new Point(this._px, this._py);
		},
	
		getVector: function() {
			return new Point(this._vx, this._vy);
		},
	
		getLength: function() {
			return this.getVector().getLength();
		},
	
		intersect: function(line, isInfinite) {
			return Line.intersect(
					this._px, this._py, this._vx, this._vy,
					line._px, line._py, line._vx, line._vy,
					true, isInfinite);
		},
	
		getSide: function(point, isInfinite) {
			return Line.getSide(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true, isInfinite);
		},
	
		getDistance: function(point) {
			return Math.abs(Line.getSignedDistance(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true));
		},
	
		isCollinear: function(line) {
			return Point.isCollinear(this._vx, this._vy, line._vx, line._vy);
		},
	
		isOrthogonal: function(line) {
			return Point.isOrthogonal(this._vx, this._vy, line._vx, line._vy);
		},
	
		statics: {
			intersect: function(p1x, p1y, v1x, v1y, p2x, p2y, v2x, v2y, asVector,
					isInfinite) {
				if (!asVector) {
					v1x -= p1x;
					v1y -= p1y;
					v2x -= p2x;
					v2y -= p2y;
				}
				var cross = v1x * v2y - v1y * v2x;
				if (!Numerical.isZero(cross)) {
					var dx = p1x - p2x,
						dy = p1y - p2y,
						u1 = (v2x * dy - v2y * dx) / cross,
						u2 = (v1x * dy - v1y * dx) / cross,
						epsilon = 1e-12,
						uMin = -epsilon,
						uMax = 1 + epsilon;
					if (isInfinite
							|| uMin < u1 && u1 < uMax && uMin < u2 && u2 < uMax) {
						if (!isInfinite) {
							u1 = u1 <= 0 ? 0 : u1 >= 1 ? 1 : u1;
						}
						return new Point(
								p1x + u1 * v1x,
								p1y + u1 * v1y);
					}
				}
			},
	
			getSide: function(px, py, vx, vy, x, y, asVector, isInfinite) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				var v2x = x - px,
					v2y = y - py,
					ccw = v2x * vy - v2y * vx;
				if (ccw === 0 && !isInfinite) {
					ccw = (v2x * vx + v2x * vx) / (vx * vx + vy * vy);
					if (ccw >= 0 && ccw <= 1)
						ccw = 0;
				}
				return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
			},
	
			getSignedDistance: function(px, py, vx, vy, x, y, asVector) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				return vx === 0 ? vy > 0 ? x - px : px - x
					 : vy === 0 ? vx < 0 ? y - py : py - y
					 : ((x-px) * vy - (y-py) * vx) / Math.sqrt(vx * vx + vy * vy);
			}
		}
	});
	
	var Project = PaperScopeItem.extend({
		_class: 'Project',
		_list: 'projects',
		_reference: 'project',
	
		initialize: function Project(element) {
			PaperScopeItem.call(this, true);
			this.layers = [];
			this._activeLayer = null;
			this.symbols = [];
			this._currentStyle = new Style(null, null, this);
			this._view = View.create(this,
					element || CanvasProvider.getCanvas(1, 1));
			this._selectedItems = {};
			this._selectedItemCount = 0;
			this._updateVersion = 0;
		},
	
		_serialize: function(options, dictionary) {
			return Base.serialize(this.layers, options, true, dictionary);
		},
	
		clear: function() {
			for (var i = this.layers.length - 1; i >= 0; i--)
				this.layers[i].remove();
			this.symbols = [];
		},
	
		isEmpty: function() {
			return this.layers.length === 0;
		},
	
		remove: function remove() {
			if (!remove.base.call(this))
				return false;
			if (this._view)
				this._view.remove();
			return true;
		},
	
		getView: function() {
			return this._view;
		},
	
		getCurrentStyle: function() {
			return this._currentStyle;
		},
	
		setCurrentStyle: function(style) {
			this._currentStyle.initialize(style);
		},
	
		getIndex: function() {
			return this._index;
		},
	
		getOptions: function() {
			return this._scope.settings;
		},
	
		getActiveLayer: function() {
			return this._activeLayer || new Layer({ project: this });
		},
	
		getSelectedItems: function() {
			var items = [];
			for (var id in this._selectedItems) {
				var item = this._selectedItems[id];
				if (item.isInserted())
					items.push(item);
			}
			return items;
		},
	
		insertChild: function(index, item, _preserve) {
			if (item instanceof Layer) {
				item._remove(false, true);
				Base.splice(this.layers, [item], index, 0);
				item._setProject(this, true);
				if (this._changes)
					item._changed(5);
				if (!this._activeLayer)
					this._activeLayer = item;
			} else if (item instanceof Item) {
				(this._activeLayer
					|| this.insertChild(index, new Layer(Item.NO_INSERT)))
						.insertChild(index, item, _preserve);
			} else {
				item = null;
			}
			return item;
		},
	
		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},
	
		_updateSelection: function(item) {
			var id = item._id,
				selectedItems = this._selectedItems;
			if (item._selected) {
				if (selectedItems[id] !== item) {
					this._selectedItemCount++;
					selectedItems[id] = item;
				}
			} else if (selectedItems[id] === item) {
				this._selectedItemCount--;
				delete selectedItems[id];
			}
		},
	
		selectAll: function() {
			var layers = this.layers;
			for (var i = 0, l = layers.length; i < l; i++)
				layers[i].setFullySelected(true);
		},
	
		deselectAll: function() {
			var selectedItems = this._selectedItems;
			for (var i in selectedItems)
				selectedItems[i].setFullySelected(false);
		},
	
		hitTest: function() {
			var point = Point.read(arguments),
				options = HitResult.getOptions(Base.read(arguments));
			for (var i = this.layers.length - 1; i >= 0; i--) {
				var res = this.layers[i]._hitTest(point, options);
				if (res) return res;
			}
			return null;
		},
	
		getItems: function(match) {
			return Item._getItems(this.layers, match);
		},
	
		getItem: function(match) {
			return Item._getItems(this.layers, match, null, null, true)[0] || null;
		},
	
		importJSON: function(json) {
			this.activate();
			var layer = this._activeLayer;
			return Base.importJSON(json, layer && layer.isEmpty() && layer);
		},
	
		draw: function(ctx, matrix, pixelRatio) {
			this._updateVersion++;
			ctx.save();
			matrix.applyToContext(ctx);
			var param = new Base({
				offset: new Point(0, 0),
				pixelRatio: pixelRatio,
				viewMatrix: matrix.isIdentity() ? null : matrix,
				matrices: [new Matrix()],
				updateMatrix: true
			});
			for (var i = 0, layers = this.layers, l = layers.length; i < l; i++)
				layers[i].draw(ctx, param);
			ctx.restore();
	
			if (this._selectedItemCount > 0) {
				ctx.save();
				ctx.strokeWidth = 1;
				var items = this._selectedItems,
					size = this._scope.settings.handleSize,
					version = this._updateVersion;
				for (var id in items)
					items[id]._drawSelection(ctx, matrix, size, items, version);
				ctx.restore();
			}
		}
	});
	
	var Symbol = Base.extend({
		_class: 'Symbol',
	
		initialize: function Symbol(item, dontCenter) {
			this._id = UID.get();
			this.project = paper.project;
			this.project.symbols.push(this);
			if (item)
				this.setDefinition(item, dontCenter);
		},
	
		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._class, this._definition],
						options, false, dictionary);
			});
		},
	
		_changed: function(flags) {
			if (flags & 8) {
				Item._clearBoundsCache(this);
			}
			if (flags & 1) {
				this.project._needsUpdate = true;
			}
		},
	
		getDefinition: function() {
			return this._definition;
		},
	
		setDefinition: function(item, _dontCenter) {
			if (item._parentSymbol)
				item = item.clone();
			if (this._definition)
				this._definition._parentSymbol = null;
			this._definition = item;
			item.remove();
			item.setSelected(false);
			if (!_dontCenter)
				item.setPosition(new Point());
			item._parentSymbol = this;
			this._changed(9);
		},
	
		place: function(position) {
			return new PlacedSymbol(this, position);
		},
	
		clone: function() {
			return new Symbol(this._definition.clone(false));
		},
	
		equals: function(symbol) {
			return symbol === this
					|| symbol && this.definition.equals(symbol.definition)
					|| false;
		}
	});
	
	var Item = Base.extend(Emitter, {
		statics: {
			extend: function extend(src) {
				if (src._serializeFields)
					src._serializeFields = new Base(
							this.prototype._serializeFields, src._serializeFields);
				return extend.base.apply(this, arguments);
			},
	
			NO_INSERT: { insert: false }
		},
	
		_class: 'Item',
		_applyMatrix: true,
		_canApplyMatrix: true,
		_boundsSelected: false,
		_selectChildren: false,
		_serializeFields: {
			name: null,
			applyMatrix: null,
			matrix: new Matrix(),
			pivot: null,
			locked: false,
			visible: true,
			blendMode: 'normal',
			opacity: 1,
			guide: false,
			selected: false,
			clipMask: false,
			data: {}
		},
	
		initialize: function Item() {
		},
	
		_initialize: function(props, point) {
			var hasProps = props && Base.isPlainObject(props),
				internal = hasProps && props.internal === true,
				matrix = this._matrix = new Matrix(),
				project = hasProps && props.project || paper.project;
			if (!internal)
				this._id = UID.get();
			this._applyMatrix = this._canApplyMatrix && paper.settings.applyMatrix;
			if (point)
				matrix.translate(point);
			matrix._owner = this;
			this._style = new Style(project._currentStyle, this, project);
			if (!this._project) {
				if (internal || hasProps && props.insert === false) {
					this._setProject(project);
				} else if (hasProps && props.parent) {
					this.setParent(props.parent);
				} else {
					(project._activeLayer || new Layer()).addChild(this);
				}
			}
			if (hasProps && props !== Item.NO_INSERT)
				this._set(props, { insert: true, project: true, parent: true },
						true);
			return hasProps;
		},
	
		_events: Base.each(['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
				'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
			function(name) {
				this[name] = {
					install: function(type) {
						this.getView()._installEvent(type);
					},
	
					uninstall: function(type) {
						this.getView()._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.getView()._animateItem(this, true);
					},
	
					uninstall: function() {
						this.getView()._animateItem(this, false);
					}
				},
	
				onLoad: {}
			}
		),
	
		_serialize: function(options, dictionary) {
			var props = {},
				that = this;
	
			function serialize(fields) {
				for (var key in fields) {
					var value = that[key];
					if (!Base.equals(value, key === 'leading'
							? fields.fontSize * 1.2 : fields[key])) {
						props[key] = Base.serialize(value, options,
								key !== 'data', dictionary);
					}
				}
			}
	
			serialize(this._serializeFields);
			if (!(this instanceof Group))
				serialize(this._style._defaults);
			return [ this._class, props ];
		},
	
		_changed: function(flags) {
			var symbol = this._parentSymbol,
				cacheParent = this._parent || symbol,
				project = this._project;
			if (flags & 8) {
				this._bounds = this._position = this._decomposed =
						this._globalMatrix = this._currentPath = undefined;
			}
			if (cacheParent
					&& (flags & 40)) {
				Item._clearBoundsCache(cacheParent);
			}
			if (flags & 2) {
				Item._clearBoundsCache(this);
			}
			if (project) {
				if (flags & 1) {
					project._needsUpdate = true;
				}
				if (project._changes) {
					var entry = project._changesById[this._id];
					if (entry) {
						entry.flags |= flags;
					} else {
						entry = { item: this, flags: flags };
						project._changesById[this._id] = entry;
						project._changes.push(entry);
					}
				}
			}
			if (symbol)
				symbol._changed(flags);
		},
	
		set: function(props) {
			if (props)
				this._set(props);
			return this;
		},
	
		getId: function() {
			return this._id;
		},
	
		getName: function() {
			return this._name;
		},
	
		setName: function(name, unique) {
	
			if (this._name)
				this._removeNamed();
			if (name === (+name) + '')
				throw new Error(
						'Names consisting only of numbers are not supported.');
			var parent = this._parent;
			if (name && parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					orig = name,
					i = 1;
				while (unique && children[name])
					name = orig + ' ' + (i++);
				(namedChildren[name] = namedChildren[name] || []).push(this);
				children[name] = this;
			}
			this._name = name || undefined;
			this._changed(128);
		},
	
		getStyle: function() {
			return this._style;
		},
	
		setStyle: function(style) {
			this.getStyle().set(style);
		}
	}, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
		function(name) {
			var part = Base.capitalize(name),
				name = '_' + name;
			this['get' + part] = function() {
				return this[name];
			};
			this['set' + part] = function(value) {
				if (value != this[name]) {
					this[name] = value;
					this._changed(name === '_locked'
							? 128 : 129);
				}
			};
		},
	{}), {
		beans: true,
	
		_locked: false,
	
		_visible: true,
	
		_blendMode: 'normal',
	
		_opacity: 1,
	
		_guide: false,
	
		isSelected: function() {
			if (this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					if (children[i].isSelected())
						return true;
			}
			return this._selected;
		},
	
		setSelected: function(selected, noChildren) {
			if (!noChildren && this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setSelected(selected);
			}
			if ((selected = !!selected) ^ this._selected) {
				this._selected = selected;
				this._project._updateSelection(this);
				this._changed(129);
			}
		},
	
		_selected: false,
	
		isFullySelected: function() {
			var children = this._children;
			if (children && this._selected) {
				for (var i = 0, l = children.length; i < l; i++)
					if (!children[i].isFullySelected())
						return false;
				return true;
			}
			return this._selected;
		},
	
		setFullySelected: function(selected) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setFullySelected(selected);
			}
			this.setSelected(selected, true);
		},
	
		isClipMask: function() {
			return this._clipMask;
		},
	
		setClipMask: function(clipMask) {
			if (this._clipMask != (clipMask = !!clipMask)) {
				this._clipMask = clipMask;
				if (clipMask) {
					this.setFillColor(null);
					this.setStrokeColor(null);
				}
				this._changed(129);
				if (this._parent)
					this._parent._changed(1024);
			}
		},
	
		_clipMask: false,
	
		getData: function() {
			if (!this._data)
				this._data = {};
			return this._data;
		},
	
		setData: function(data) {
			this._data = data;
		},
	
		getPosition: function(_dontLink) {
			var position = this._position,
				ctor = _dontLink ? Point : LinkedPoint;
			if (!position) {
				var pivot = this._pivot;
				position = this._position = pivot
						? this._matrix._transformPoint(pivot)
						: this.getBounds().getCenter(true);
			}
			return new ctor(position.x, position.y, this, 'setPosition');
		},
	
		setPosition: function() {
			this.translate(Point.read(arguments).subtract(this.getPosition(true)));
		},
	
		getPivot: function(_dontLink) {
			var pivot = this._pivot;
			if (pivot) {
				var ctor = _dontLink ? Point : LinkedPoint;
				pivot = new ctor(pivot.x, pivot.y, this, 'setPivot');
			}
			return pivot;
		},
	
		setPivot: function() {
			this._pivot = Point.read(arguments, 0, { clone: true, readNull: true });
			this._position = undefined;
		},
	
		_pivot: null,
	}, Base.each(['bounds', 'strokeBounds', 'handleBounds', 'roughBounds',
			'internalBounds', 'internalRoughBounds'],
		function(key) {
			var getter = 'get' + Base.capitalize(key),
				match = key.match(/^internal(.*)$/),
				internalGetter = match ? 'get' + match[1] : null;
			this[getter] = function(_matrix) {
				var boundsGetter = this._boundsGetter,
					name = !internalGetter && (typeof boundsGetter === 'string'
							? boundsGetter : boundsGetter && boundsGetter[getter])
							|| getter,
					bounds = this._getCachedBounds(name, _matrix, this,
							internalGetter);
				return key === 'bounds'
						? new LinkedRectangle(bounds.x, bounds.y, bounds.width,
								bounds.height, this, 'setBounds')
						: bounds;
			};
		},
	{
		beans: true,
	
		_getBounds: function(getter, matrix, cacheItem) {
			var children = this._children;
			if (!children || children.length == 0)
				return new Rectangle();
			Item._updateBoundsCache(this, cacheItem);
			var x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				if (child._visible && !child.isEmpty()) {
					var rect = child._getCachedBounds(getter,
							matrix && matrix.chain(child._matrix), cacheItem);
					x1 = Math.min(rect.x, x1);
					y1 = Math.min(rect.y, y1);
					x2 = Math.max(rect.x + rect.width, x2);
					y2 = Math.max(rect.y + rect.height, y2);
				}
			}
			return isFinite(x1)
					? new Rectangle(x1, y1, x2 - x1, y2 - y1)
					: new Rectangle();
		},
	
		setBounds: function() {
			var rect = Rectangle.read(arguments),
				bounds = this.getBounds(),
				matrix = new Matrix(),
				center = rect.getCenter();
			matrix.translate(center);
			if (rect.width != bounds.width || rect.height != bounds.height) {
				matrix.scale(
						bounds.width != 0 ? rect.width / bounds.width : 1,
						bounds.height != 0 ? rect.height / bounds.height : 1);
			}
			center = bounds.getCenter();
			matrix.translate(-center.x, -center.y);
			this.transform(matrix);
		},
	
		_getCachedBounds: function(getter, matrix, cacheItem, internalGetter) {
			matrix = matrix && matrix.orNullIfIdentity();
			var _matrix = internalGetter ? null : this._matrix.orNullIfIdentity(),
				cache = (!matrix || matrix.equals(_matrix)) && getter;
			Item._updateBoundsCache(this._parent || this._parentSymbol, cacheItem);
			if (cache && this._bounds && this._bounds[cache])
				return this._bounds[cache].clone();
			var bounds = this._getBounds(internalGetter || getter,
					matrix || _matrix, cacheItem);
			if (cache) {
				if (!this._bounds)
					this._bounds = {};
				var cached = this._bounds[cache] = bounds.clone();
				cached._internal = !!internalGetter;
			}
			return bounds;
		},
	
		statics: {
			_updateBoundsCache: function(parent, item) {
				if (parent) {
					var id = item._id,
						ref = parent._boundsCache = parent._boundsCache || {
							ids: {},
							list: []
						};
					if (!ref.ids[id]) {
						ref.list.push(item);
						ref.ids[id] = item;
					}
				}
			},
	
			_clearBoundsCache: function(item) {
				var cache = item._boundsCache;
				if (cache) {
					item._bounds = item._position = item._boundsCache = undefined;
					for (var i = 0, list = cache.list, l = list.length; i < l; i++){
						var other = list[i];
						if (other !== item) {
							other._bounds = other._position = undefined;
							if (other._boundsCache)
								Item._clearBoundsCache(other);
						}
					}
				}
			}
		}
	
	}), {
		beans: true,
	
		_decompose: function() {
			return this._decomposed = this._matrix.decompose();
		},
	
		getRotation: function() {
			var decomposed = this._decomposed || this._decompose();
			return decomposed && decomposed.rotation;
		},
	
		setRotation: function(rotation) {
			var current = this.getRotation();
			if (current != null && rotation != null) {
				var decomposed = this._decomposed;
				this.rotate(rotation - current);
				decomposed.rotation = rotation;
				this._decomposed = decomposed;
			}
		},
	
		getScaling: function(_dontLink) {
			var decomposed = this._decomposed || this._decompose(),
				scaling = decomposed && decomposed.scaling,
				ctor = _dontLink ? Point : LinkedPoint;
			return scaling && new ctor(scaling.x, scaling.y, this, 'setScaling');
		},
	
		setScaling: function() {
			var current = this.getScaling();
			if (current) {
				var scaling = Point.read(arguments, 0, { clone: true }),
					decomposed = this._decomposed;
				this.scale(scaling.x / current.x, scaling.y / current.y);
				decomposed.scaling = scaling;
				this._decomposed = decomposed;
			}
		},
	
		getMatrix: function() {
			return this._matrix;
		},
	
		setMatrix: function() {
			var matrix = this._matrix;
			matrix.initialize.apply(matrix, arguments);
			if (this._applyMatrix) {
				this.transform(null, true);
			} else {
				this._changed(9);
			}
		},
	
		getGlobalMatrix: function(_dontClone) {
			var matrix = this._globalMatrix,
				updateVersion = this._project._updateVersion;
			if (matrix && matrix._updateVersion !== updateVersion)
				matrix = null;
			if (!matrix) {
				matrix = this._globalMatrix = this._matrix.clone();
				var parent = this._parent;
				if (parent)
					matrix.preConcatenate(parent.getGlobalMatrix(true));
				matrix._updateVersion = updateVersion;
			}
			return _dontClone ? matrix : matrix.clone();
		},
	
		getApplyMatrix: function() {
			return this._applyMatrix;
		},
	
		setApplyMatrix: function(apply) {
			if (this._applyMatrix = this._canApplyMatrix && !!apply)
				this.transform(null, true);
		},
	
		getTransformContent: '#getApplyMatrix',
		setTransformContent: '#setApplyMatrix',
	}, {
		getProject: function() {
			return this._project;
		},
	
		_setProject: function(project, installEvents) {
			if (this._project !== project) {
				if (this._project)
					this._installEvents(false);
				this._project = project;
				var children = this._children;
				for (var i = 0, l = children && children.length; i < l; i++)
					children[i]._setProject(project);
				installEvents = true;
			}
			if (installEvents)
				this._installEvents(true);
		},
	
		getView: function() {
			return this._project.getView();
		},
	
		_installEvents: function _installEvents(install) {
			_installEvents.base.call(this, install);
			var children = this._children;
			for (var i = 0, l = children && children.length; i < l; i++)
				children[i]._installEvents(install);
		},
	
		getLayer: function() {
			var parent = this;
			while (parent = parent._parent) {
				if (parent instanceof Layer)
					return parent;
			}
			return null;
		},
	
		getParent: function() {
			return this._parent;
		},
	
		setParent: function(item) {
			return item.addChild(this);
		},
	
		getChildren: function() {
			return this._children;
		},
	
		setChildren: function(items) {
			this.removeChildren();
			this.addChildren(items);
		},
	
		getFirstChild: function() {
			return this._children && this._children[0] || null;
		},
	
		getLastChild: function() {
			return this._children && this._children[this._children.length - 1]
					|| null;
		},
	
		getNextSibling: function() {
			return this._parent && this._parent._children[this._index + 1] || null;
		},
	
		getPreviousSibling: function() {
			return this._parent && this._parent._children[this._index - 1] || null;
		},
	
		getIndex: function() {
			return this._index;
		},
	
		equals: function(item) {
			return item === this || item && this._class === item._class
					&& this._style.equals(item._style)
					&& this._matrix.equals(item._matrix)
					&& this._locked === item._locked
					&& this._visible === item._visible
					&& this._blendMode === item._blendMode
					&& this._opacity === item._opacity
					&& this._clipMask === item._clipMask
					&& this._guide === item._guide
					&& this._equals(item)
					|| false;
		},
	
		_equals: function(item) {
			return Base.equals(this._children, item._children);
		},
	
		clone: function(insert) {
			return this._clone(new this.constructor(Item.NO_INSERT), insert);
		},
	
		_clone: function(copy, insert, includeMatrix) {
			var keys = ['_locked', '_visible', '_blendMode', '_opacity',
					'_clipMask', '_guide'],
				children = this._children;
			copy.setStyle(this._style);
			for (var i = 0, l = children && children.length; i < l; i++) {
				copy.addChild(children[i].clone(false), true);
			}
			for (var i = 0, l = keys.length; i < l; i++) {
				var key = keys[i];
				if (this.hasOwnProperty(key))
					copy[key] = this[key];
			}
			if (includeMatrix !== false)
				copy._matrix.initialize(this._matrix);
			copy.setApplyMatrix(this._applyMatrix);
			copy.setPivot(this._pivot);
			copy.setSelected(this._selected);
			copy._data = this._data ? Base.clone(this._data) : null;
			if (insert || insert === undefined)
				copy.insertAbove(this);
			if (this._name)
				copy.setName(this._name, true);
			return copy;
		},
	
		copyTo: function(itemOrProject) {
			return itemOrProject.addChild(this.clone(false));
		},
	
		rasterize: function(resolution) {
			var bounds = this.getStrokeBounds(),
				scale = (resolution || this.getView().getResolution()) / 72,
				topLeft = bounds.getTopLeft().floor(),
				bottomRight = bounds.getBottomRight().ceil(),
				size = new Size(bottomRight.subtract(topLeft)),
				canvas = CanvasProvider.getCanvas(size.multiply(scale)),
				ctx = canvas.getContext('2d'),
				matrix = new Matrix().scale(scale).translate(topLeft.negate());
			ctx.save();
			matrix.applyToContext(ctx);
			this.draw(ctx, new Base({ matrices: [matrix] }));
			ctx.restore();
			var raster = new Raster(Item.NO_INSERT);
			raster.setCanvas(canvas);
			raster.transform(new Matrix().translate(topLeft.add(size.divide(2)))
					.scale(1 / scale));
			raster.insertAbove(this);
			return raster;
		},
	
		contains: function() {
			return !!this._contains(
					this._matrix._inverseTransform(Point.read(arguments)));
		},
	
		_contains: function(point) {
			if (this._children) {
				for (var i = this._children.length - 1; i >= 0; i--) {
					if (this._children[i].contains(point))
						return true;
				}
				return false;
			}
			return point.isInside(this.getInternalBounds());
		},
	
		isInside: function() {
			return Rectangle.read(arguments).contains(this.getBounds());
		},
	
		_asPathItem: function() {
			return new Path.Rectangle({
				rectangle: this.getInternalBounds(),
				matrix: this._matrix,
				insert: false,
			});
		},
	
		intersects: function(item, _matrix) {
			if (!(item instanceof Item))
				return false;
			return this._asPathItem().getIntersections(item._asPathItem(), null,
					_matrix || item._matrix, true).length > 0;
		},
	
		hitTest: function() {
			return this._hitTest(
					Point.read(arguments),
					HitResult.getOptions(Base.read(arguments)));
		},
	
		_hitTest: function(point, options) {
			if (this._locked || !this._visible || this._guide && !options.guides
					|| this.isEmpty())
				return null;
	
			var matrix = this._matrix,
				parentTotalMatrix = options._totalMatrix,
				view = this.getView(),
				totalMatrix = options._totalMatrix = parentTotalMatrix
						? parentTotalMatrix.chain(matrix)
						: this.getGlobalMatrix().preConcatenate(view._matrix),
				tolerancePadding = options._tolerancePadding = new Size(
							Path._getPenPadding(1, totalMatrix.inverted())
						).multiply(
							Math.max(options.tolerance, 1e-6)
						);
			point = matrix._inverseTransform(point);
	
			if (!this._children && !this.getInternalRoughBounds()
					.expand(tolerancePadding.multiply(2))._containsPoint(point))
				return null;
			var checkSelf = !(options.guides && !this._guide
					|| options.selected && !this._selected
					|| options.type && options.type !== Base.hyphenate(this._class)
					|| options.class && !(this instanceof options.class)),
				that = this,
				res;
	
			function checkBounds(type, part) {
				var pt = bounds['get' + part]();
				if (point.subtract(pt).divide(tolerancePadding).length <= 1)
					return new HitResult(type, that,
							{ name: Base.hyphenate(part), point: pt });
			}
	
			if (checkSelf && (options.center || options.bounds) && this._parent) {
				var bounds = this.getInternalBounds();
				if (options.center)
					res = checkBounds('center', 'Center');
				if (!res && options.bounds) {
					var points = [
						'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
						'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
					];
					for (var i = 0; i < 8 && !res; i++)
						res = checkBounds('bounds', points[i]);
				}
			}
	
			var children = !res && this._children;
			if (children) {
				var opts = this._getChildHitTestOptions(options);
				for (var i = children.length - 1; i >= 0 && !res; i--)
					res = children[i]._hitTest(point, opts);
			}
			if (!res && checkSelf)
				res = this._hitTestSelf(point, options);
			if (res && res.point)
				res.point = matrix.transform(res.point);
			options._totalMatrix = parentTotalMatrix;
			return res;
		},
	
		_getChildHitTestOptions: function(options) {
			return options;
		},
	
		_hitTestSelf: function(point, options) {
			if (options.fill && this.hasFill() && this._contains(point))
				return new HitResult('fill', this);
		},
	
		matches: function(name, compare) {
			function matchObject(obj1, obj2) {
				for (var i in obj1) {
					if (obj1.hasOwnProperty(i)) {
						var val1 = obj1[i],
							val2 = obj2[i];
						if (Base.isPlainObject(val1) && Base.isPlainObject(val2)) {
							if (!matchObject(val1, val2))
								return false;
						} else if (!Base.equals(val1, val2)) {
							return false;
						}
					}
				}
				return true;
			}
			var type = typeof name;
			if (type === 'object') {
				for (var key in name) {
					if (name.hasOwnProperty(key) && !this.matches(key, name[key]))
						return false;
				}
			} else if (type === 'function') {
				return name(this);
			} else {
				var value = /^(empty|editable)$/.test(name)
						? this['is' + Base.capitalize(name)]()
						: name === 'type'
							? Base.hyphenate(this._class)
							: this[name];
				if (/^(constructor|class)$/.test(name)) {
					if (!(this instanceof compare))
						return false;
				} else if (compare instanceof RegExp) {
					if (!compare.test(value))
						return false;
				} else if (typeof compare === 'function') {
					if (!compare(value))
						return false;
				} else if (Base.isPlainObject(compare)) {
					if (!matchObject(compare, value))
						return false;
				} else if (!Base.equals(value, compare)) {
					return false;
				}
			}
			return true;
		},
	
		getItems: function(match) {
			return Item._getItems(this._children, match, this._matrix);
		},
	
		getItem: function(match) {
			return Item._getItems(this._children, match, this._matrix, null, true)
					[0] || null;
		},
	
		statics: {
			_getItems: function _getItems(children, match, matrix, param,
					firstOnly) {
				if (!param && typeof match === 'object') {
					var overlapping = match.overlapping,
						inside = match.inside,
						bounds = overlapping || inside,
						rect = bounds && Rectangle.read([bounds]);
					param = {
						items: [],
						inside: !!inside,
						overlapping: !!overlapping,
						rect: rect,
						path: overlapping && new Path.Rectangle({
							rectangle: rect,
							insert: false
						})
					};
					if (bounds)
						match = Base.set({}, match,
								{ inside: true, overlapping: true });
				}
				var items = param && param.items,
					rect = param && param.rect;
				matrix = rect && (matrix || new Matrix());
				for (var i = 0, l = children && children.length; i < l; i++) {
					var child = children[i],
						childMatrix = matrix && matrix.chain(child._matrix),
						add = true;
					if (rect) {
						var bounds = child.getBounds(childMatrix);
						if (!rect.intersects(bounds))
							continue;
						if (!(param.inside && rect.contains(bounds))
								&& !(param.overlapping && (bounds.contains(rect)
									|| param.path.intersects(child, childMatrix))))
							add = false;
					}
					if (add && child.matches(match)) {
						items.push(child);
						if (firstOnly)
							break;
					}
					_getItems(child._children, match,
							childMatrix, param,
							firstOnly);
					if (firstOnly && items.length > 0)
						break;
				}
				return items;
			}
		}
	}, {
	
		importJSON: function(json) {
			var res = Base.importJSON(json, this);
			return res !== this
					? this.addChild(res)
					: res;
		},
	
		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},
	
		insertChild: function(index, item, _preserve) {
			var res = item ? this.insertChildren(index, [item], _preserve) : null;
			return res && res[0];
		},
	
		addChildren: function(items, _preserve) {
			return this.insertChildren(this._children.length, items, _preserve);
		},
	
		insertChildren: function(index, items, _preserve, _proto) {
			var children = this._children;
			if (children && items && items.length > 0) {
				items = Array.prototype.slice.apply(items);
				for (var i = items.length - 1; i >= 0; i--) {
					var item = items[i];
					if (_proto && !(item instanceof _proto)) {
						items.splice(i, 1);
					} else {
						var shift = item._parent === this && item._index < index;
						if (item._remove(false, true) && shift)
							index--;
					}
				}
				Base.splice(children, items, index, 0);
				var project = this._project,
					notifySelf = project && project._changes;
				for (var i = 0, l = items.length; i < l; i++) {
					var item = items[i];
					item._parent = this;
					item._setProject(this._project, true);
					if (item._name)
						item.setName(item._name);
					if (notifySelf)
						this._changed(5);
				}
				this._changed(11);
			} else {
				items = null;
			}
			return items;
		},
	
		_insertSibling: function(index, item, _preserve) {
			return this._parent
					? this._parent.insertChild(index, item, _preserve)
					: null;
		},
	
		insertAbove: function(item, _preserve) {
			return item._insertSibling(item._index + 1, this, _preserve);
		},
	
		insertBelow: function(item, _preserve) {
			return item._insertSibling(item._index, this, _preserve);
		},
	
		sendToBack: function() {
			return (this._parent || this instanceof Layer && this._project)
					.insertChild(0, this);
		},
	
		bringToFront: function() {
			return (this._parent || this instanceof Layer && this._project)
					.addChild(this);
		},
	
		appendTop: '#addChild',
	
		appendBottom: function(item) {
			return this.insertChild(0, item);
		},
	
		moveAbove: '#insertAbove',
	
		moveBelow: '#insertBelow',
	
		reduce: function() {
			if (this._children && this._children.length === 1) {
				var child = this._children[0].reduce();
				child.insertAbove(this);
				child.setStyle(this._style);
				this.remove();
				return child;
			}
			return this;
		},
	
		_removeNamed: function() {
			var parent = this._parent;
			if (parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					name = this._name,
					namedArray = namedChildren[name],
					index = namedArray ? namedArray.indexOf(this) : -1;
				if (index !== -1) {
					if (children[name] == this)
						delete children[name];
					namedArray.splice(index, 1);
					if (namedArray.length) {
						children[name] = namedArray[namedArray.length - 1];
					} else {
						delete namedChildren[name];
					}
				}
			}
		},
	
		_remove: function(notifySelf, notifyParent) {
			var parent = this._parent;
			if (parent) {
				if (this._name)
					this._removeNamed();
				if (this._index != null)
					Base.splice(parent._children, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf) {
					var project = this._project;
					if (project && project._changes)
						this._changed(5);
				}
				if (notifyParent)
					parent._changed(11);
				this._parent = null;
				return true;
			}
			return false;
		},
	
		remove: function() {
			return this._remove(true, true);
		},
	
		replaceWith: function(item) {
			var ok = item && item.insertBelow(this);
			if (ok)
				this.remove();
			return ok;
		},
	
		removeChildren: function(from, to) {
			if (!this._children)
				return null;
			from = from || 0;
			to = Base.pick(to, this._children.length);
			var removed = Base.splice(this._children, null, from, to - from);
			for (var i = removed.length - 1; i >= 0; i--) {
				removed[i]._remove(true, false);
			}
			if (removed.length > 0)
				this._changed(11);
			return removed;
		},
	
		clear: '#removeChildren',
	
		reverseChildren: function() {
			if (this._children) {
				this._children.reverse();
				for (var i = 0, l = this._children.length; i < l; i++)
					this._children[i]._index = i;
				this._changed(11);
			}
		},
	
		isEmpty: function() {
			return !this._children || this._children.length === 0;
		},
	
		isEditable: function() {
			var item = this;
			while (item) {
				if (!item._visible || item._locked)
					return false;
				item = item._parent;
			}
			return true;
		},
	
		hasFill: function() {
			return this.getStyle().hasFill();
		},
	
		hasStroke: function() {
			return this.getStyle().hasStroke();
		},
	
		hasShadow: function() {
			return this.getStyle().hasShadow();
		},
	
		_getOrder: function(item) {
			function getList(item) {
				var list = [];
				do {
					list.unshift(item);
				} while (item = item._parent);
				return list;
			}
			var list1 = getList(this),
				list2 = getList(item);
			for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
				if (list1[i] != list2[i]) {
					return list1[i]._index < list2[i]._index ? 1 : -1;
				}
			}
			return 0;
		},
	
		hasChildren: function() {
			return this._children && this._children.length > 0;
		},
	
		isInserted: function() {
			return this._parent ? this._parent.isInserted() : false;
		},
	
		isAbove: function(item) {
			return this._getOrder(item) === -1;
		},
	
		isBelow: function(item) {
			return this._getOrder(item) === 1;
		},
	
		isParent: function(item) {
			return this._parent === item;
		},
	
		isChild: function(item) {
			return item && item._parent === this;
		},
	
		isDescendant: function(item) {
			var parent = this;
			while (parent = parent._parent) {
				if (parent == item)
					return true;
			}
			return false;
		},
	
		isAncestor: function(item) {
			return item ? item.isDescendant(this) : false;
		},
	
		isSibling: function(item) {
			return this._parent === item._parent;
		},
	
		isGroupedWith: function(item) {
			var parent = this._parent;
			while (parent) {
				if (parent._parent
					&& /^(Group|Layer|CompoundPath)$/.test(parent._class)
					&& item.isDescendant(parent))
						return true;
				parent = parent._parent;
			}
			return false;
		},
	
		translate: function() {
			var mx = new Matrix();
			return this.transform(mx.translate.apply(mx, arguments));
		},
	
		rotate: function(angle ) {
			return this.transform(new Matrix().rotate(angle,
					Point.read(arguments, 1, { readNull: true })
						|| this.getPosition(true)));
		}
	}, Base.each(['scale', 'shear', 'skew'], function(name) {
		this[name] = function() {
			var point = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			return this.transform(new Matrix()[name](point,
					center || this.getPosition(true)));
		};
	}, {
	
	}), {
		transform: function(matrix, _applyMatrix, _applyRecursively,
				_setApplyMatrix) {
			if (matrix && matrix.isIdentity())
				matrix = null;
			var _matrix = this._matrix,
				applyMatrix = (_applyMatrix || this._applyMatrix)
						&& ((!_matrix.isIdentity() || matrix)
							|| _applyMatrix && _applyRecursively && this._children);
			if (!matrix && !applyMatrix)
				return this;
			if (matrix)
				_matrix.preConcatenate(matrix);
			if (applyMatrix = applyMatrix && this._transformContent(_matrix,
						_applyRecursively, _setApplyMatrix)) {
				var pivot = this._pivot,
					style = this._style,
					fillColor = style.getFillColor(true),
					strokeColor = style.getStrokeColor(true);
				if (pivot)
					_matrix._transformPoint(pivot, pivot, true);
				if (fillColor)
					fillColor.transform(_matrix);
				if (strokeColor)
					strokeColor.transform(_matrix);
				_matrix.reset(true);
				if (_setApplyMatrix && this._canApplyMatrix)
					this._applyMatrix = true;
			}
			var bounds = this._bounds,
				position = this._position;
			this._changed(9);
			var decomp = bounds && matrix && matrix.decompose();
			if (decomp && !decomp.shearing && decomp.rotation % 90 === 0) {
				for (var key in bounds) {
					var rect = bounds[key];
					if (applyMatrix || !rect._internal)
						matrix._transformBounds(rect, rect);
				}
				var getter = this._boundsGetter,
					rect = bounds[getter && getter.getBounds || getter || 'getBounds'];
				if (rect)
					this._position = rect.getCenter(true);
				this._bounds = bounds;
			} else if (matrix && position) {
				this._position = matrix._transformPoint(position, position);
			}
			return this;
		},
	
		_transformContent: function(matrix, applyRecursively, setApplyMatrix) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].transform(matrix, true, applyRecursively,
							setApplyMatrix);
				return true;
			}
		},
	
		globalToLocal: function() {
			return this.getGlobalMatrix(true)._inverseTransform(
					Point.read(arguments));
		},
	
		localToGlobal: function() {
			return this.getGlobalMatrix(true)._transformPoint(
					Point.read(arguments));
		},
	
		parentToLocal: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		},
	
		localToParent: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},
	
		fitBounds: function(rectangle, fill) {
			rectangle = Rectangle.read(arguments);
			var bounds = this.getBounds(),
				itemRatio = bounds.height / bounds.width,
				rectRatio = rectangle.height / rectangle.width,
				scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
						? rectangle.width / bounds.width
						: rectangle.height / bounds.height,
				newBounds = new Rectangle(new Point(),
						new Size(bounds.width * scale, bounds.height * scale));
			newBounds.setCenter(rectangle.getCenter());
			this.setBounds(newBounds);
		},
	
		_setStyles: function(ctx) {
			var style = this._style,
				fillColor = style.getFillColor(),
				strokeColor = style.getStrokeColor(),
				shadowColor = style.getShadowColor();
			if (fillColor)
				ctx.fillStyle = fillColor.toCanvasStyle(ctx);
			if (strokeColor) {
				var strokeWidth = style.getStrokeWidth();
				if (strokeWidth > 0) {
					ctx.strokeStyle = strokeColor.toCanvasStyle(ctx);
					ctx.lineWidth = strokeWidth;
					var strokeJoin = style.getStrokeJoin(),
						strokeCap = style.getStrokeCap(),
						miterLimit = style.getMiterLimit();
					if (strokeJoin)
						ctx.lineJoin = strokeJoin;
					if (strokeCap)
						ctx.lineCap = strokeCap;
					if (miterLimit)
						ctx.miterLimit = miterLimit;
					if (paper.support.nativeDash) {
						var dashArray = style.getDashArray(),
							dashOffset = style.getDashOffset();
						if (dashArray && dashArray.length) {
							if ('setLineDash' in ctx) {
								ctx.setLineDash(dashArray);
								ctx.lineDashOffset = dashOffset;
							} else {
								ctx.mozDash = dashArray;
								ctx.mozDashOffset = dashOffset;
							}
						}
					}
				}
			}
			if (shadowColor) {
				var shadowBlur = style.getShadowBlur();
				if (shadowBlur > 0) {
					ctx.shadowColor = shadowColor.toCanvasStyle(ctx);
					ctx.shadowBlur = shadowBlur;
					var offset = this.getShadowOffset();
					ctx.shadowOffsetX = offset.x;
					ctx.shadowOffsetY = offset.y;
				}
			}
		},
	
		draw: function(ctx, param, parentStrokeMatrix) {
			var updateVersion = this._updateVersion = this._project._updateVersion;
			if (!this._visible || this._opacity === 0)
				return;
			var matrices = param.matrices,
				viewMatrix = param.viewMatrix,
				matrix = this._matrix,
				globalMatrix = matrices[matrices.length - 1].chain(matrix);
			if (!globalMatrix.isInvertible())
				return;
	
			function getViewMatrix(matrix) {
				return viewMatrix ? viewMatrix.chain(matrix) : matrix;
			}
	
			matrices.push(globalMatrix);
			if (param.updateMatrix) {
				globalMatrix._updateVersion = updateVersion;
				this._globalMatrix = globalMatrix;
			}
	
			var blendMode = this._blendMode,
				opacity = this._opacity,
				normalBlend = blendMode === 'normal',
				nativeBlend = BlendMode.nativeModes[blendMode],
				direct = normalBlend && opacity === 1
						|| param.dontStart
						|| param.clip
						|| (nativeBlend || normalBlend && opacity < 1)
							&& this._canComposite(),
				pixelRatio = param.pixelRatio || 1,
				mainCtx, itemOffset, prevOffset;
			if (!direct) {
				var bounds = this.getStrokeBounds(getViewMatrix(globalMatrix));
				if (!bounds.width || !bounds.height)
					return;
				prevOffset = param.offset;
				itemOffset = param.offset = bounds.getTopLeft().floor();
				mainCtx = ctx;
				ctx = CanvasProvider.getContext(bounds.getSize().ceil().add(1)
						.multiply(pixelRatio));
				if (pixelRatio !== 1)
					ctx.scale(pixelRatio, pixelRatio);
			}
			ctx.save();
			var strokeMatrix = parentStrokeMatrix
					? parentStrokeMatrix.chain(matrix)
					: !this.getStrokeScaling(true) && getViewMatrix(globalMatrix),
				clip = !direct && param.clipItem,
				transform = !strokeMatrix || clip;
			if (direct) {
				ctx.globalAlpha = opacity;
				if (nativeBlend)
					ctx.globalCompositeOperation = blendMode;
			} else if (transform) {
				ctx.translate(-itemOffset.x, -itemOffset.y);
			}
			if (transform)
				(direct ? matrix : getViewMatrix(globalMatrix)).applyToContext(ctx);
			if (clip)
				param.clipItem.draw(ctx, param.extend({ clip: true }));
			if (strokeMatrix) {
				ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				var offset = param.offset;
				if (offset)
					ctx.translate(-offset.x, -offset.y);
			}
			this._draw(ctx, param, strokeMatrix);
			ctx.restore();
			matrices.pop();
			if (param.clip && !param.dontFinish)
				ctx.clip();
			if (!direct) {
				BlendMode.process(blendMode, ctx, mainCtx, opacity,
						itemOffset.subtract(prevOffset).multiply(pixelRatio));
				CanvasProvider.release(ctx);
				param.offset = prevOffset;
			}
		},
	
		_isUpdated: function(updateVersion) {
			var parent = this._parent;
			if (parent instanceof CompoundPath)
				return parent._isUpdated(updateVersion);
			var updated = this._updateVersion === updateVersion;
			if (!updated && parent && parent._visible
					&& parent._isUpdated(updateVersion)) {
				this._updateVersion = updateVersion;
				updated = true;
			}
			return updated;
		},
	
		_drawSelection: function(ctx, matrix, size, selectedItems, updateVersion) {
			if ((this._drawSelected || this._boundsSelected)
					&& this._isUpdated(updateVersion)) {
				var color = this.getSelectedColor(true)
						|| this.getLayer().getSelectedColor(true),
					mx = matrix.chain(this.getGlobalMatrix(true));
				ctx.strokeStyle = ctx.fillStyle = color
						? color.toCanvasStyle(ctx) : '#009dec';
				if (this._drawSelected)
					this._drawSelected(ctx, mx, selectedItems);
				if (this._boundsSelected) {
					var half = size / 2,
						coords = mx._transformCorners(this.getInternalBounds());
					ctx.beginPath();
					for (var i = 0; i < 8; i++)
						ctx[i === 0 ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
					ctx.closePath();
					ctx.stroke();
					for (var i = 0; i < 8; i++)
						ctx.fillRect(coords[i] - half, coords[++i] - half,
								size, size);
				}
			}
		},
	
		_canComposite: function() {
			return false;
		}
	}, Base.each(['down', 'drag', 'up', 'move'], function(name) {
		this['removeOn' + Base.capitalize(name)] = function() {
			var hash = {};
			hash[name] = true;
			return this.removeOn(hash);
		};
	}, {
	
		removeOn: function(obj) {
			for (var name in obj) {
				if (obj[name]) {
					var key = 'mouse' + name,
						project = this._project,
						sets = project._removeSets = project._removeSets || {};
					sets[key] = sets[key] || {};
					sets[key][this._id] = this;
				}
			}
			return this;
		}
	}));
	
	var Group = Item.extend({
		_class: 'Group',
		_selectChildren: true,
		_serializeFields: {
			children: []
		},
	
		initialize: function Group(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg))
				this.addChildren(Array.isArray(arg) ? arg : arguments);
		},
	
		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 1026) {
				this._clipItem = undefined;
			}
		},
	
		_getClipItem: function() {
			var clipItem = this._clipItem;
			if (clipItem === undefined) {
				clipItem = null;
				for (var i = 0, l = this._children.length; i < l; i++) {
					var child = this._children[i];
					if (child._clipMask) {
						clipItem = child;
						break;
					}
				}
				this._clipItem = clipItem;
			}
			return clipItem;
		},
	
		isClipped: function() {
			return !!this._getClipItem();
		},
	
		setClipped: function(clipped) {
			var child = this.getFirstChild();
			if (child)
				child.setClipMask(clipped);
		},
	
		_draw: function(ctx, param) {
			var clip = param.clip,
				clipItem = !clip && this._getClipItem(),
				draw = true;
			param = param.extend({ clipItem: clipItem, clip: false });
			if (clip) {
				if (this._currentPath) {
					ctx.currentPath = this._currentPath;
					draw = false;
				} else {
					ctx.beginPath();
					param.dontStart = param.dontFinish = true;
				}
			} else if (clipItem) {
				clipItem.draw(ctx, param.extend({ clip: true }));
			}
			if (draw) {
				for (var i = 0, l = this._children.length; i < l; i++) {
					var item = this._children[i];
					if (item !== clipItem)
						item.draw(ctx, param);
				}
			}
			if (clip) {
				this._currentPath = ctx.currentPath;
			}
		}
	});
	
	var Layer = Group.extend({
		_class: 'Layer',
	
		initialize: function Layer(arg) {
			var props = Base.isPlainObject(arg)
					? new Base(arg)
					: { children: Array.isArray(arg) ? arg : arguments },
				insert = props.insert;
			props.insert = false;
			Group.call(this, props);
			if (insert || insert === undefined) {
				this._project.addChild(this);
				this.activate();
			}
		},
	
		_remove: function _remove(notifySelf, notifyParent) {
			if (this._parent)
				return _remove.base.call(this, notifySelf, notifyParent);
			if (this._index != null) {
				var project = this._project;
				if (project._activeLayer === this)
					project._activeLayer = this.getNextSibling()
							|| this.getPreviousSibling();
				Base.splice(project.layers, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf && project._changes)
					this._changed(5);
				if (notifyParent) {
					project._needsUpdate = true;
				}
				return true;
			}
			return false;
		},
	
		getNextSibling: function getNextSibling() {
			return this._parent ? getNextSibling.base.call(this)
					: this._project.layers[this._index + 1] || null;
		},
	
		getPreviousSibling: function getPreviousSibling() {
			return this._parent ? getPreviousSibling.base.call(this)
					: this._project.layers[this._index - 1] || null;
		},
	
		isInserted: function isInserted() {
			return this._parent ? isInserted.base.call(this) : this._index != null;
		},
	
		activate: function() {
			this._project._activeLayer = this;
		},
	
		_insertSibling: function _insertSibling(index, item, _preserve) {
			return !this._parent
					? this._project.insertChild(index, item, _preserve)
					: _insertSibling.base.call(this, index, item, _preserve);
		}
	});
	
	var Shape = Item.extend({
		_class: 'Shape',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsSelected: true,
		_serializeFields: {
			type: null,
			size: null,
			radius: null
		},
	
		initialize: function Shape(props) {
			this._initialize(props);
		},
	
		_equals: function(item) {
			return this._type === item._type
				&& this._size.equals(item._size)
				&& Base.equals(this._radius, item._radius);
		},
	
		clone: function(insert) {
			var copy = new Shape(Item.NO_INSERT);
			copy.setType(this._type);
			copy.setSize(this._size);
			copy.setRadius(this._radius);
			return this._clone(copy, insert);
		},
	
		getType: function() {
			return this._type;
		},
	
		setType: function(type) {
			this._type = type;
		},
	
		getShape: '#getType',
		setShape: '#setType',
	
		getSize: function() {
			var size = this._size;
			return new LinkedSize(size.width, size.height, this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (!this._size) {
				this._size = size.clone();
			} else if (!this._size.equals(size)) {
				var type = this._type,
					width = size.width,
					height = size.height;
				if (type === 'rectangle') {
					var radius = Size.min(this._radius, size.divide(2));
					this._radius.set(radius.width, radius.height);
				} else if (type === 'circle') {
					width = height = (width + height) / 2;
					this._radius = width / 2;
				} else if (type === 'ellipse') {
					this._radius.set(width / 2, height / 2);
				}
				this._size.set(width, height);
				this._changed(9);
			}
		},
	
		getRadius: function() {
			var rad = this._radius;
			return this._type === 'circle'
					? rad
					: new LinkedSize(rad.width, rad.height, this, 'setRadius');
		},
	
		setRadius: function(radius) {
			var type = this._type;
			if (type === 'circle') {
				if (radius === this._radius)
					return;
				var size = radius * 2;
				this._radius = radius;
				this._size.set(size, size);
			} else {
				radius = Size.read(arguments);
				if (!this._radius) {
					this._radius = radius.clone();
				} else {
					if (this._radius.equals(radius))
						return;
					this._radius.set(radius.width, radius.height);
					if (type === 'rectangle') {
						var size = Size.max(this._size, radius.multiply(2));
						this._size.set(size.width, size.height);
					} else if (type === 'ellipse') {
						this._size.set(radius.width * 2, radius.height * 2);
					}
				}
			}
			this._changed(9);
		},
	
		isEmpty: function() {
			return false;
		},
	
		toPath: function(insert) {
			var path = this._clone(new Path[Base.capitalize(this._type)]({
				center: new Point(),
				size: this._size,
				radius: this._radius,
				insert: false
			}), insert);
			if (paper.settings.applyMatrix)
				path.setApplyMatrix(true);
			return path;
		},
	
		_draw: function(ctx, param, strokeMatrix) {
			var style = this._style,
				hasFill = style.hasFill(),
				hasStroke = style.hasStroke(),
				dontPaint = param.dontFinish || param.clip,
				untransformed = !strokeMatrix;
			if (hasFill || hasStroke || dontPaint) {
				var type = this._type,
					radius = this._radius,
					isCircle = type === 'circle';
				if (!param.dontStart)
					ctx.beginPath();
				if (untransformed && isCircle) {
					ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
				} else {
					var rx = isCircle ? radius : radius.width,
						ry = isCircle ? radius : radius.height,
						size = this._size,
						width = size.width,
						height = size.height;
					if (untransformed && type === 'rectangle' && rx === 0 && ry === 0) {
						ctx.rect(-width / 2, -height / 2, width, height);
					} else {
						var x = width / 2,
							y = height / 2,
							kappa = 1 - 0.5522847498307936,
							cx = rx * kappa,
							cy = ry * kappa,
							c = [
								-x, -y + ry,
								-x, -y + cy,
								-x + cx, -y,
								-x + rx, -y,
								x - rx, -y,
								x - cx, -y,
								x, -y + cy,
								x, -y + ry,
								x, y - ry,
								x, y - cy,
								x - cx, y,
								x - rx, y,
								-x + rx, y,
								-x + cx, y,
								-x, y - cy,
								-x, y - ry
							];
						if (strokeMatrix)
							strokeMatrix.transform(c, c, 32);
						ctx.moveTo(c[0], c[1]);
						ctx.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
						if (x !== rx)
							ctx.lineTo(c[8], c[9]);
						ctx.bezierCurveTo(c[10], c[11], c[12], c[13], c[14], c[15]);
						if (y !== ry)
							ctx.lineTo(c[16], c[17]);
						ctx.bezierCurveTo(c[18], c[19], c[20], c[21], c[22], c[23]);
						if (x !== rx)
							ctx.lineTo(c[24], c[25]);
						ctx.bezierCurveTo(c[26], c[27], c[28], c[29], c[30], c[31]);
					}
				}
				ctx.closePath();
			}
			if (!dontPaint && (hasFill || hasStroke)) {
				this._setStyles(ctx);
				if (hasFill) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (hasStroke)
					ctx.stroke();
			}
		},
	
		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},
	
		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			if (getter !== 'getBounds' && this.hasStroke())
				rect = rect.expand(this.getStrokeWidth());
			return matrix ? matrix._transformBounds(rect) : rect;
		}
	},
	new function() {
		function getCornerCenter(that, point, expand) {
			var radius = that._radius;
			if (!radius.isZero()) {
				var halfSize = that._size.divide(2);
				for (var i = 0; i < 4; i++) {
					var dir = new Point(i & 1 ? 1 : -1, i > 1 ? 1 : -1),
						corner = dir.multiply(halfSize),
						center = corner.subtract(dir.multiply(radius)),
						rect = new Rectangle(corner, center);
					if ((expand ? rect.expand(expand) : rect).contains(point))
						return center;
				}
			}
		}
	
		function getEllipseRadius(point, radius) {
			var angle = point.getAngleInRadians(),
				width = radius.width * 2,
				height = radius.height * 2,
				x = width * Math.sin(angle),
				y = height * Math.cos(angle);
			return width * height / (2 * Math.sqrt(x * x + y * y));
		}
	
		return {
			_contains: function _contains(point) {
				if (this._type === 'rectangle') {
					var center = getCornerCenter(this, point);
					return center
							? point.subtract(center).divide(this._radius)
								.getLength() <= 1
							: _contains.base.call(this, point);
				} else {
					return point.divide(this.size).getLength() <= 0.5;
				}
			},
	
			_hitTestSelf: function _hitTestSelf(point, options) {
				var hit = false;
				if (this.hasStroke()) {
					var type = this._type,
						radius = this._radius,
						strokeWidth = this.getStrokeWidth() + 2 * options.tolerance;
					if (type === 'rectangle') {
						var center = getCornerCenter(this, point, strokeWidth);
						if (center) {
							var pt = point.subtract(center);
							hit = 2 * Math.abs(pt.getLength()
									- getEllipseRadius(pt, radius)) <= strokeWidth;
						} else {
							var rect = new Rectangle(this._size).setCenter(0, 0),
								outer = rect.expand(strokeWidth),
								inner = rect.expand(-strokeWidth);
							hit = outer._containsPoint(point)
									&& !inner._containsPoint(point);
						}
					} else {
						if (type === 'ellipse')
							radius = getEllipseRadius(point, radius);
						hit = 2 * Math.abs(point.getLength() - radius)
								<= strokeWidth;
					}
				}
				return hit
						? new HitResult('stroke', this)
						: _hitTestSelf.base.apply(this, arguments);
			}
		};
	}, {
	
	statics: new function() {
		function createShape(type, point, size, radius, args) {
			var item = new Shape(Base.getNamed(args));
			item._type = type;
			item._size = size;
			item._radius = radius;
			return item.translate(point);
		}
	
		return {
			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createShape('circle', center, new Size(radius * 2), radius,
						arguments);
			},
	
			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.min(Size.readNamed(arguments, 'radius'),
							rect.getSize(true).divide(2));
				return createShape('rectangle', rect.getCenter(true),
						rect.getSize(true), radius, arguments);
			},
	
			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments),
					radius = ellipse.radius;
				return createShape('ellipse', ellipse.center, radius.multiply(2),
						radius, arguments);
			},
	
			_readEllipse: function(args) {
				var center,
					radius;
				if (Base.hasNamed(args, 'radius')) {
					center = Point.readNamed(args, 'center');
					radius = Size.readNamed(args, 'radius');
				} else {
					var rect = Rectangle.readNamed(args, 'rectangle');
					center = rect.getCenter(true);
					radius = rect.getSize(true).divide(2);
				}
				return { center: center, radius: radius };
			}
		};
	}});
	
	var Raster = Item.extend({
		_class: 'Raster',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: 'getBounds',
		_boundsSelected: true,
		_serializeFields: {
			crossOrigin: null,
			source: null
		},
	
		initialize: function Raster(object, position) {
			if (!this._initialize(object,
					position !== undefined && Point.read(arguments, 1))) {
				if (typeof object === 'string') {
					this.setSource(object);
				} else {
					this.setImage(object);
				}
			}
			if (!this._size) {
				this._size = new Size();
				this._loaded = false;
			}
		},
	
		_equals: function(item) {
			return this.getSource() === item.getSource();
		},
	
		clone: function(insert) {
			var copy = new Raster(Item.NO_INSERT),
				image = this._image,
				canvas = this._canvas;
			if (image) {
				copy.setImage(image);
			} else if (canvas) {
				var copyCanvas = CanvasProvider.getCanvas(this._size);
				copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
				copy.setImage(copyCanvas);
			}
			copy._crossOrigin = this._crossOrigin;
			return this._clone(copy, insert);
		},
	
		getSize: function() {
			var size = this._size;
			return new LinkedSize(size ? size.width : 0, size ? size.height : 0,
					this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (!size.equals(this._size)) {
				if (size.width > 0 && size.height > 0) {
					var element = this.getElement();
					this.setImage(CanvasProvider.getCanvas(size));
					if (element)
						this.getContext(true).drawImage(element, 0, 0,
								size.width, size.height);
				} else {
					if (this._canvas)
						CanvasProvider.release(this._canvas);
					this._size = size.clone();
				}
			}
		},
	
		getWidth: function() {
			return this._size ? this._size.width : 0;
		},
	
		setWidth: function(width) {
			this.setSize(width, this.getHeight());
		},
	
		getHeight: function() {
			return this._size ? this._size.height : 0;
		},
	
		setHeight: function(height) {
			this.setSize(this.getWidth(), height);
		},
	
		isEmpty: function() {
			var size = this._size;
			return !size || size.width === 0 && size.height === 0;
		},
	
		getResolution: function() {
			var matrix = this._matrix,
				orig = new Point(0, 0).transform(matrix),
				u = new Point(1, 0).transform(matrix).subtract(orig),
				v = new Point(0, 1).transform(matrix).subtract(orig);
			return new Size(
				72 / u.getLength(),
				72 / v.getLength()
			);
		},
	
		getPpi: '#getResolution',
	
		getImage: function() {
			return this._image;
		},
	
		setImage: function(image) {
			if (this._canvas)
				CanvasProvider.release(this._canvas);
			if (image && image.getContext) {
				this._image = null;
				this._canvas = image;
				this._loaded = true;
			} else {
				this._image = image;
				this._canvas = null;
				this._loaded = image && image.complete;
			}
			this._size = new Size(
					image ? image.naturalWidth || image.width : 0,
					image ? image.naturalHeight || image.height : 0);
			this._context = null;
			this._changed(521);
		},
	
		getCanvas: function() {
			if (!this._canvas) {
				var ctx = CanvasProvider.getContext(this._size);
				try {
					if (this._image)
						ctx.drawImage(this._image, 0, 0);
					this._canvas = ctx.canvas;
				} catch (e) {
					CanvasProvider.release(ctx);
				}
			}
			return this._canvas;
		},
	
		setCanvas: '#setImage',
	
		getContext: function(modify) {
			if (!this._context)
				this._context = this.getCanvas().getContext('2d');
			if (modify) {
				this._image = null;
				this._changed(513);
			}
			return this._context;
		},
	
		setContext: function(context) {
			this._context = context;
		},
	
		getSource: function() {
			return this._image && this._image.src || this.toDataURL();
		},
	
		setSource: function(src) {
			var that = this,
				crossOrigin = this._crossOrigin,
				image;
	
			function loaded() {
				var view = that.getView();
				if (view) {
					paper = view._scope;
					that.setImage(image);
					that.emit('load');
					view.update();
				}
			}
	
			image = document.getElementById(src) || new Image();
			if (crossOrigin)
				image.crossOrigin = crossOrigin;
			if (image.naturalWidth && image.naturalHeight) {
				setTimeout(loaded, 0);
			} else {
				DomEvent.add(image, { load: loaded });
				if (!image.src)
					image.src = src;
			}
			this.setImage(image);
		},
	
		getCrossOrigin: function() {
			return this._image && this._image.crossOrigin || this._crossOrigin || '';
		},
	
		setCrossOrigin: function(crossOrigin) {
			this._crossOrigin = crossOrigin;
			if (this._image)
				this._image.crossOrigin = crossOrigin;
		},
	
		getElement: function() {
			return this._canvas || this._loaded && this._image;
		}
	}, {
		beans: false,
	
		getSubCanvas: function() {
			var rect = Rectangle.read(arguments),
				ctx = CanvasProvider.getContext(rect.getSize());
			ctx.drawImage(this.getCanvas(), rect.x, rect.y,
					rect.width, rect.height, 0, 0, rect.width, rect.height);
			return ctx.canvas;
		},
	
		getSubRaster: function() {
			var rect = Rectangle.read(arguments),
				raster = new Raster(Item.NO_INSERT);
			raster.setImage(this.getSubCanvas(rect));
			raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));
			raster._matrix.preConcatenate(this._matrix);
			raster.insertAbove(this);
			return raster;
		},
	
		toDataURL: function() {
			var src = this._image && this._image.src;
			if (/^data:/.test(src))
				return src;
			var canvas = this.getCanvas();
			return canvas ? canvas.toDataURL.apply(canvas, arguments) : null;
		},
	
		drawImage: function(image ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).drawImage(image, point.x, point.y);
		},
	
		getAverageColor: function(object) {
			var bounds, path;
			if (!object) {
				bounds = this.getBounds();
			} else if (object instanceof PathItem) {
				path = object;
				bounds = object.getBounds();
			} else if (object.width) {
				bounds = new Rectangle(object);
			} else if (object.x) {
				bounds = new Rectangle(object.x - 0.5, object.y - 0.5, 1, 1);
			}
			var sampleSize = 32,
				width = Math.min(bounds.width, sampleSize),
				height = Math.min(bounds.height, sampleSize);
			var ctx = Raster._sampleContext;
			if (!ctx) {
				ctx = Raster._sampleContext = CanvasProvider.getContext(
						new Size(sampleSize));
			} else {
				ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
			}
			ctx.save();
			var matrix = new Matrix()
					.scale(width / bounds.width, height / bounds.height)
					.translate(-bounds.x, -bounds.y);
			matrix.applyToContext(ctx);
			if (path)
				path.draw(ctx, new Base({ clip: true, matrices: [matrix] }));
			this._matrix.applyToContext(ctx);
			var element = this.getElement(),
				size = this._size;
			if (element)
				ctx.drawImage(element, -size.width / 2, -size.height / 2);
			ctx.restore();
			var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
					Math.ceil(height)).data,
				channels = [0, 0, 0],
				total = 0;
			for (var i = 0, l = pixels.length; i < l; i += 4) {
				var alpha = pixels[i + 3];
				total += alpha;
				alpha /= 255;
				channels[0] += pixels[i] * alpha;
				channels[1] += pixels[i + 1] * alpha;
				channels[2] += pixels[i + 2] * alpha;
			}
			for (var i = 0; i < 3; i++)
				channels[i] /= total;
			return total ? Color.read(channels) : null;
		},
	
		getPixel: function() {
			var point = Point.read(arguments);
			var data = this.getContext().getImageData(point.x, point.y, 1, 1).data;
			return new Color('rgb', [data[0] / 255, data[1] / 255, data[2] / 255],
					data[3] / 255);
		},
	
		setPixel: function() {
			var point = Point.read(arguments),
				color = Color.read(arguments),
				components = color._convert('rgb'),
				alpha = color._alpha,
				ctx = this.getContext(true),
				imageData = ctx.createImageData(1, 1),
				data = imageData.data;
			data[0] = components[0] * 255;
			data[1] = components[1] * 255;
			data[2] = components[2] * 255;
			data[3] = alpha != null ? alpha * 255 : 255;
			ctx.putImageData(imageData, point.x, point.y);
		},
	
		createImageData: function() {
			var size = Size.read(arguments);
			return this.getContext().createImageData(size.width, size.height);
		},
	
		getImageData: function() {
			var rect = Rectangle.read(arguments);
			if (rect.isEmpty())
				rect = new Rectangle(this._size);
			return this.getContext().getImageData(rect.x, rect.y,
					rect.width, rect.height);
		},
	
		setImageData: function(data ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).putImageData(data, point.x, point.y);
		},
	
		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			return matrix ? matrix._transformBounds(rect) : rect;
		},
	
		_hitTestSelf: function(point) {
			if (this._contains(point)) {
				var that = this;
				return new HitResult('pixel', that, {
					offset: point.add(that._size.divide(2)).round(),
					color: {
						get: function() {
							return that.getPixel(this.offset);
						}
					}
				});
			}
		},
	
		_draw: function(ctx) {
			var element = this.getElement();
			if (element) {
				ctx.globalAlpha = this._opacity;
				ctx.drawImage(element,
						-this._size.width / 2, -this._size.height / 2);
			}
		},
	
		_canComposite: function() {
			return true;
		}
	});
	
	var PlacedSymbol = Item.extend({
		_class: 'PlacedSymbol',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: { getBounds: 'getStrokeBounds' },
		_boundsSelected: true,
		_serializeFields: {
			symbol: null
		},
	
		initialize: function PlacedSymbol(arg0, arg1) {
			if (!this._initialize(arg0,
					arg1 !== undefined && Point.read(arguments, 1)))
				this.setSymbol(arg0 instanceof Symbol ? arg0 : new Symbol(arg0));
		},
	
		_equals: function(item) {
			return this._symbol === item._symbol;
		},
	
		getSymbol: function() {
			return this._symbol;
		},
	
		setSymbol: function(symbol) {
			this._symbol = symbol;
			this._changed(9);
		},
	
		clone: function(insert) {
			var copy = new PlacedSymbol(Item.NO_INSERT);
			copy.setSymbol(this._symbol);
			return this._clone(copy, insert);
		},
	
		isEmpty: function() {
			return this._symbol._definition.isEmpty();
		},
	
		_getBounds: function(getter, matrix, cacheItem) {
			var definition = this.symbol._definition;
			return definition._getCachedBounds(getter,
					matrix && matrix.chain(definition._matrix), cacheItem);
		},
	
		_hitTestSelf: function(point, options) {
			var res = this._symbol._definition._hitTest(point, options);
			if (res)
				res.item = this;
			return res;
		},
	
		_draw: function(ctx, param) {
			this.symbol._definition.draw(ctx, param);
		}
	
	});
	
	var HitResult = Base.extend({
		_class: 'HitResult',
	
		initialize: function HitResult(type, item, values) {
			this.type = type;
			this.item = item;
			if (values) {
				values.enumerable = true;
				this.inject(values);
			}
		},
	
		statics: {
			getOptions: function(options) {
				return new Base({
					type: null,
					tolerance: paper.settings.hitTolerance,
					fill: !options,
					stroke: !options,
					segments: !options,
					handles: false,
					ends: false,
					center: false,
					bounds: false,
					guides: false,
					selected: false
				}, options);
			}
		}
	});
	
	var Segment = Base.extend({
		_class: 'Segment',
		beans: true,
	
		initialize: function Segment(arg0, arg1, arg2, arg3, arg4, arg5) {
			var count = arguments.length,
				point, handleIn, handleOut;
			if (count === 0) {
			} else if (count === 1) {
				if ('point' in arg0) {
					point = arg0.point;
					handleIn = arg0.handleIn;
					handleOut = arg0.handleOut;
				} else {
					point = arg0;
				}
			} else if (count === 2 && typeof arg0 === 'number') {
				point = arguments;
			} else if (count <= 3) {
				point = arg0;
				handleIn = arg1;
				handleOut = arg2;
			} else {
				point = arg0 !== undefined ? [ arg0, arg1 ] : null;
				handleIn = arg2 !== undefined ? [ arg2, arg3 ] : null;
				handleOut = arg4 !== undefined ? [ arg4, arg5 ] : null;
			}
			new SegmentPoint(point, this, '_point');
			new SegmentPoint(handleIn, this, '_handleIn');
			new SegmentPoint(handleOut, this, '_handleOut');
		},
	
		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this._point, this._handleIn, this._handleOut]
					: this._point,
					options, true);
		},
	
		_changed: function(point) {
			var path = this._path;
			if (!path)
				return;
			var curves = path._curves,
				index = this._index,
				curve;
			if (curves) {
				if ((!point || point === this._point || point === this._handleIn)
						&& (curve = index > 0 ? curves[index - 1] : path._closed
							? curves[curves.length - 1] : null))
					curve._changed();
				if ((!point || point === this._point || point === this._handleOut)
						&& (curve = curves[index]))
					curve._changed();
			}
			path._changed(25);
		},
	
		getPoint: function() {
			return this._point;
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this._point.set(point.x, point.y);
		},
	
		getHandleIn: function() {
			return this._handleIn;
		},
	
		setHandleIn: function() {
			var point = Point.read(arguments);
			this._handleIn.set(point.x, point.y);
		},
	
		getHandleOut: function() {
			return this._handleOut;
		},
	
		setHandleOut: function() {
			var point = Point.read(arguments);
			this._handleOut.set(point.x, point.y);
		},
	
		hasHandles: function() {
			return !this._handleIn.isZero() || !this._handleOut.isZero();
		},
	
		clearHandles: function() {
			this._handleIn.set(0, 0);
			this._handleOut.set(0, 0);
		},
	
		_selectionState: 0,
	
		isSelected: function(_point) {
			var state = this._selectionState;
			return !_point ? !!(state & 7)
				: _point === this._point ? !!(state & 4)
				: _point === this._handleIn ? !!(state & 1)
				: _point === this._handleOut ? !!(state & 2)
				: false;
		},
	
		setSelected: function(selected, _point) {
			var path = this._path,
				selected = !!selected,
				state = this._selectionState,
				oldState = state,
				flag = !_point ? 7
						: _point === this._point ? 4
						: _point === this._handleIn ? 1
						: _point === this._handleOut ? 2
						: 0;
			if (selected) {
				state |= flag;
			} else {
				state &= ~flag;
			}
			this._selectionState = state;
			if (path && state !== oldState) {
				path._updateSelection(this, oldState, state);
				path._changed(129);
			}
		},
	
		getIndex: function() {
			return this._index !== undefined ? this._index : null;
		},
	
		getPath: function() {
			return this._path || null;
		},
	
		getCurve: function() {
			var path = this._path,
				index = this._index;
			if (path) {
				if (index > 0 && !path._closed
						&& index === path._segments.length - 1)
					index--;
				return path.getCurves()[index] || null;
			}
			return null;
		},
	
		getLocation: function() {
			var curve = this.getCurve();
			return curve
					? new CurveLocation(curve, this === curve._segment1 ? 0 : 1)
					: null;
		},
	
		getNext: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index + 1]
					|| this._path._closed && segments[0]) || null;
		},
	
		getPrevious: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index - 1]
					|| this._path._closed && segments[segments.length - 1]) || null;
		},
	
		isFirst: function() {
			return this._index === 0;
		},
	
		isLast: function() {
			var path = this._path;
			return path && this._index === path._segments.length - 1 || false;
		},
	
		reverse: function() {
			var handleIn = this._handleIn,
				handleOut = this._handleOut,
				inX = handleIn._x,
				inY = handleIn._y;
			handleIn.set(handleOut._x, handleOut._y);
			handleOut.set(inX, inY);
		},
	
		reversed: function() {
			return new Segment(this._point, this._handleOut, this._handleIn);
		},
	
		remove: function() {
			return this._path ? !!this._path.removeSegment(this._index) : false;
		},
	
		clone: function() {
			return new Segment(this._point, this._handleIn, this._handleOut);
		},
	
		equals: function(segment) {
			return segment === this || segment && this._class === segment._class
					&& this._point.equals(segment._point)
					&& this._handleIn.equals(segment._handleIn)
					&& this._handleOut.equals(segment._handleOut)
					|| false;
		},
	
		toString: function() {
			var parts = [ 'point: ' + this._point ];
			if (!this._handleIn.isZero())
				parts.push('handleIn: ' + this._handleIn);
			if (!this._handleOut.isZero())
				parts.push('handleOut: ' + this._handleOut);
			return '{ ' + parts.join(', ') + ' }';
		},
	
		transform: function(matrix) {
			this._transformCoordinates(matrix, new Array(6), true);
			this._changed();
		},
	
		_transformCoordinates: function(matrix, coords, change) {
			var point = this._point,
				handleIn = !change || !this._handleIn.isZero()
						? this._handleIn : null,
				handleOut = !change || !this._handleOut.isZero()
						? this._handleOut : null,
				x = point._x,
				y = point._y,
				i = 2;
			coords[0] = x;
			coords[1] = y;
			if (handleIn) {
				coords[i++] = handleIn._x + x;
				coords[i++] = handleIn._y + y;
			}
			if (handleOut) {
				coords[i++] = handleOut._x + x;
				coords[i++] = handleOut._y + y;
			}
			if (matrix) {
				matrix._transformCoordinates(coords, coords, i / 2);
				x = coords[0];
				y = coords[1];
				if (change) {
					point._x = x;
					point._y = y;
					i  = 2;
					if (handleIn) {
						handleIn._x = coords[i++] - x;
						handleIn._y = coords[i++] - y;
					}
					if (handleOut) {
						handleOut._x = coords[i++] - x;
						handleOut._y = coords[i++] - y;
					}
				} else {
					if (!handleIn) {
						coords[i++] = x;
						coords[i++] = y;
					}
					if (!handleOut) {
						coords[i++] = x;
						coords[i++] = y;
					}
				}
			}
			return coords;
		}
	});
	
	var SegmentPoint = Point.extend({
		initialize: function SegmentPoint(point, owner, key) {
			var x, y, selected;
			if (!point) {
				x = y = 0;
			} else if ((x = point[0]) !== undefined) {
				y = point[1];
			} else {
				var pt = point;
				if ((x = pt.x) === undefined) {
					pt = Point.read(arguments);
					x = pt.x;
				}
				y = pt.y;
				selected = pt.selected;
			}
			this._x = x;
			this._y = y;
			this._owner = owner;
			owner[key] = this;
			if (selected)
				this.setSelected(true);
		},
	
		set: function(x, y) {
			this._x = x;
			this._y = y;
			this._owner._changed(this);
			return this;
		},
	
		_serialize: function(options) {
			var f = options.formatter,
				x = f.number(this._x),
				y = f.number(this._y);
			return this.isSelected()
					? { x: x, y: y, selected: true }
					: [x, y];
		},
	
		getX: function() {
			return this._x;
		},
	
		setX: function(x) {
			this._x = x;
			this._owner._changed(this);
		},
	
		getY: function() {
			return this._y;
		},
	
		setY: function(y) {
			this._y = y;
			this._owner._changed(this);
		},
	
		isZero: function() {
			return Numerical.isZero(this._x) && Numerical.isZero(this._y);
		},
	
		setSelected: function(selected) {
			this._owner.setSelected(selected, this);
		},
	
		isSelected: function() {
			return this._owner.isSelected(this);
		}
	});
	
	var Curve = Base.extend({
		_class: 'Curve',
	
		initialize: function Curve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
			var count = arguments.length,
				seg1, seg2,
				point1, point2,
				handle1, handle2;
			if (count === 3) {
				this._path = arg0;
				seg1 = arg1;
				seg2 = arg2;
			} else if (count === 0) {
				seg1 = new Segment();
				seg2 = new Segment();
			} else if (count === 1) {
				if ('segment1' in arg0) {
					seg1 = new Segment(arg0.segment1);
					seg2 = new Segment(arg0.segment2);
				} else if ('point1' in arg0) {
					point1 = arg0.point1;
					handle1 = arg0.handle1;
					handle2 = arg0.handle2;
					point2 = arg0.point2;
				} else if (Array.isArray(arg0)) {
					point1 = [arg0[0], arg0[1]];
					point2 = [arg0[6], arg0[7]];
					handle1 = [arg0[2] - arg0[0], arg0[3] - arg0[1]];
					handle2 = [arg0[4] - arg0[6], arg0[5] - arg0[7]];
				}
			} else if (count === 2) {
				seg1 = new Segment(arg0);
				seg2 = new Segment(arg1);
			} else if (count === 4) {
				point1 = arg0;
				handle1 = arg1;
				handle2 = arg2;
				point2 = arg3;
			} else if (count === 8) {
				point1 = [arg0, arg1];
				point2 = [arg6, arg7];
				handle1 = [arg2 - arg0, arg3 - arg1];
				handle2 = [arg4 - arg6, arg5 - arg7];
			}
			this._segment1 = seg1 || new Segment(point1, null, handle1);
			this._segment2 = seg2 || new Segment(point2, handle2, null);
		},
	
		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this.getPoint1(), this.getHandle1(), this.getHandle2(),
						this.getPoint2()]
					: [this.getPoint1(), this.getPoint2()],
					options, true);
		},
	
		_changed: function() {
			this._length = this._bounds = undefined;
		},
	
		clone: function() {
			return new Curve(this._segment1, this._segment2);
		},
	
		toString: function() {
			var parts = [ 'point1: ' + this._segment1._point ];
			if (!this._segment1._handleOut.isZero())
				parts.push('handle1: ' + this._segment1._handleOut);
			if (!this._segment2._handleIn.isZero())
				parts.push('handle2: ' + this._segment2._handleIn);
			parts.push('point2: ' + this._segment2._point);
			return '{ ' + parts.join(', ') + ' }';
		},
	
		remove: function() {
			var removed = false;
			if (this._path) {
				var segment2 = this._segment2,
					handleOut = segment2._handleOut;
				removed = segment2.remove();
				if (removed)
					this._segment1._handleOut.set(handleOut.x, handleOut.y);
			}
			return removed;
		},
	
		getPoint1: function() {
			return this._segment1._point;
		},
	
		setPoint1: function() {
			var point = Point.read(arguments);
			this._segment1._point.set(point.x, point.y);
		},
	
		getPoint2: function() {
			return this._segment2._point;
		},
	
		setPoint2: function() {
			var point = Point.read(arguments);
			this._segment2._point.set(point.x, point.y);
		},
	
		getHandle1: function() {
			return this._segment1._handleOut;
		},
	
		setHandle1: function() {
			var point = Point.read(arguments);
			this._segment1._handleOut.set(point.x, point.y);
		},
	
		getHandle2: function() {
			return this._segment2._handleIn;
		},
	
		setHandle2: function() {
			var point = Point.read(arguments);
			this._segment2._handleIn.set(point.x, point.y);
		},
	
		getSegment1: function() {
			return this._segment1;
		},
	
		getSegment2: function() {
			return this._segment2;
		},
	
		getPath: function() {
			return this._path;
		},
	
		getIndex: function() {
			return this._segment1._index;
		},
	
		getNext: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index + 1]
					|| this._path._closed && curves[0]) || null;
		},
	
		getPrevious: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index - 1]
					|| this._path._closed && curves[curves.length - 1]) || null;
		},
	
		isFirst: function() {
			return this._segment1._index === 0;
		},
	
		isLast: function() {
			var path = this._path;
			return path && this._segment1._index === path._curves.length - 1
					|| false;
		},
	
		isSelected: function() {
			return this.getPoint1().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getPoint2().isSelected();
		},
	
		setSelected: function(selected) {
			this.getPoint1().setSelected(selected);
			this.getHandle1().setSelected(selected);
			this.getHandle2().setSelected(selected);
			this.getPoint2().setSelected(selected);
		},
	
		getValues: function(matrix) {
			return Curve.getValues(this._segment1, this._segment2, matrix);
		},
	
		getPoints: function() {
			var coords = this.getValues(),
				points = [];
			for (var i = 0; i < 8; i += 2)
				points.push(new Point(coords[i], coords[i + 1]));
			return points;
		},
	
		getLength: function() {
			if (this._length == null)
				this._length = Curve.getLength(this.getValues(), 0, 1);
			return this._length;
		},
	
		getArea: function() {
			return Curve.getArea(this.getValues());
		},
	
		getLine: function() {
			return new Line(this._segment1._point, this._segment2._point);
		},
	
		getPart: function(from, to) {
			return new Curve(Curve.getPart(this.getValues(), from, to));
		},
	
		getPartLength: function(from, to) {
			return Curve.getLength(this.getValues(), from, to);
		},
	
		getIntersections: function(curve) {
			return Curve._getIntersections(this.getValues(),
					curve && curve !== this ? curve.getValues() : null,
					this, curve, [], {});
		},
	
		_getParameter: function(offset, isParameter) {
			return isParameter
					? offset
					: offset && offset.curve === this
						? offset.parameter
						: offset === undefined && isParameter === undefined
							? 0.5
							: this.getParameterAt(offset, 0);
		},
	
		divide: function(offset, isParameter, _setHandles) {
			var parameter = this._getParameter(offset, isParameter),
				tMin = 4e-7,
				tMax = 1 - tMin,
				res = null;
			if (parameter >= tMin && parameter <= tMax) {
				var parts = Curve.subdivide(this.getValues(), parameter),
					left = parts[0],
					right = parts[1],
					setHandles = _setHandles || this.hasHandles(),
					segment1 = this._segment1,
					segment2 = this._segment2,
					path = this._path;
				if (setHandles) {
					segment1._handleOut.set(left[2] - left[0],
							left[3] - left[1]);
					segment2._handleIn.set(right[4] - right[6],
							right[5] - right[7]);
				}
				var x = left[6], y = left[7],
					segment = new Segment(new Point(x, y),
							setHandles && new Point(left[4] - x, left[5] - y),
							setHandles && new Point(right[2] - x, right[3] - y));
				if (path) {
					path.insert(segment1._index + 1, segment);
					res = this.getNext();
				} else {
					this._segment2 = segment;
					res = new Curve(segment, segment2);
				}
			}
			return res;
		},
	
		split: function(offset, isParameter) {
			return this._path
				? this._path.split(this._segment1._index,
						this._getParameter(offset, isParameter))
				: null;
		},
	
		reversed: function() {
			return new Curve(this._segment2.reversed(), this._segment1.reversed());
		},
	
		clearHandles: function() {
			this._segment1._handleOut.set(0, 0);
			this._segment2._handleIn.set(0, 0);
		},
	
	statics: {
		getValues: function(segment1, segment2, matrix) {
			var p1 = segment1._point,
				h1 = segment1._handleOut,
				h2 = segment2._handleIn,
				p2 = segment2._point,
				values = [
					p1._x, p1._y,
					p1._x + h1._x, p1._y + h1._y,
					p2._x + h2._x, p2._y + h2._y,
					p2._x, p2._y
				];
			if (matrix)
				matrix._transformCoordinates(values, values, 4);
			return values;
		},
	
		subdivide: function(v, t) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7];
			if (t === undefined)
				t = 0.5;
			var u = 1 - t,
				p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y,
				p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y,
				p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y,
				p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y,
				p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y,
				p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
			return [
				[p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y],
				[p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y]
			];
		},
	
		solveCubic: function (v, coord, val, roots, min, max) {
			var p1 = v[coord],
				c1 = v[coord + 2],
				c2 = v[coord + 4],
				p2 = v[coord + 6],
				c = 3 * (c1 - p1),
				b = 3 * (c2 - c1) - c,
				a = p2 - p1 - c - b;
			return Numerical.solveCubic(a, b, c, p1 - val, roots, min, max);
		},
	
		getParameterOf: function(v, point) {
			var p1 = new Point(v[0], v[1]),
				p2 = new Point(v[6], v[7]),
				epsilon = 1e-12,
				t = point.isClose(p1, epsilon) ? 0
				  : point.isClose(p2, epsilon) ? 1
				  : null;
			if (t !== null)
				return t;
			var coords = [point.x, point.y],
				roots = [],
				geomEpsilon = 2e-7;
			for (var c = 0; c < 2; c++) {
				var count = Curve.solveCubic(v, c, coords[c], roots, 0, 1);
				for (var i = 0; i < count; i++) {
					t = roots[i];
					if (point.isClose(Curve.getPoint(v, t), geomEpsilon))
						return t;
				}
			}
			return point.isClose(p1, geomEpsilon) ? 0
				 : point.isClose(p2, geomEpsilon) ? 1
				 : null;
		},
	
		getNearestParameter: function(v, point) {
			if (Curve.isStraight(v)) {
				var p1x = v[0], p1y = v[1],
					p2x = v[6], p2y = v[7],
					vx = p2x - p1x, vy = p2y - p1y,
					det = vx * vx + vy * vy;
				if (det === 0)
					return 0;
				var u = ((point.x - p1x) * vx + (point.y - p1y) * vy) / det;
				return u < 1e-12 ? 0
					 : u > 0.999999999999 ? 1
					 : Curve.getParameterOf(v,
						new Point(p1x + u * vx, p1y + u * vy));
			}
	
			var count = 100,
				minDist = Infinity,
				minT = 0;
	
			function refine(t) {
				if (t >= 0 && t <= 1) {
					var dist = point.getDistance(Curve.getPoint(v, t), true);
					if (dist < minDist) {
						minDist = dist;
						minT = t;
						return true;
					}
				}
			}
	
			for (var i = 0; i <= count; i++)
				refine(i / count);
	
			var step = 1 / (count * 2);
			while (step > 4e-7) {
				if (!refine(minT - step) && !refine(minT + step))
					step /= 2;
			}
			return minT;
		},
	
		getPart: function(v, from, to) {
			var flip = from > to;
			if (flip) {
				var tmp = from;
				from = to;
				to = tmp;
			}
			if (from > 0)
				v = Curve.subdivide(v, from)[1];
			if (to < 1)
				v = Curve.subdivide(v, (to - from) / (1 - from))[0];
			return flip
					? [v[6], v[7], v[4], v[5], v[2], v[3], v[0], v[1]]
					: v;
		},
	
		hasHandles: function(v) {
			var isZero = Numerical.isZero;
			return !(isZero(v[0] - v[2]) && isZero(v[1] - v[3])
					&& isZero(v[4] - v[6]) && isZero(v[5] - v[7]));
		},
	
		isFlatEnough: function(v, tolerance) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				ux = 3 * c1x - 2 * p1x - p2x,
				uy = 3 * c1y - 2 * p1y - p2y,
				vx = 3 * c2x - 2 * p2x - p1x,
				vy = 3 * c2y - 2 * p2y - p1y;
			return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
					< 10 * tolerance * tolerance;
		},
	
		getArea: function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7],
				h1x = (v[2] + p1x) / 2,
				h1y = (v[3] + p1y) / 2,
				h2x = (v[4] + v[6]) / 2,
				h2y = (v[5] + v[7]) / 2;
			return 6 * ((p1x - h1x) * (h1y + p1y)
					  + (h1x - h2x) * (h2y + h1y)
					  + (h2x - p2x) * (p2y + h2y)) / 10;
		},
	
		getBounds: function(v) {
			var min = v.slice(0, 2),
				max = min.slice(),
				roots = [0, 0];
			for (var i = 0; i < 2; i++)
				Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
						i, 0, min, max, roots);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},
	
		_addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
			function add(value, padding) {
				var left = value - padding,
					right = value + padding;
				if (left < min[coord])
					min[coord] = left;
				if (right > max[coord])
					max[coord] = right;
			}
			var a = 3 * (v1 - v2) - v0 + v3,
				b = 2 * (v0 + v2) - 4 * v1,
				c = v1 - v0,
				count = Numerical.solveQuadratic(a, b, c, roots),
				tMin = 4e-7,
				tMax = 1 - tMin;
			add(v3, 0);
			for (var i = 0; i < count; i++) {
				var t = roots[i],
					u = 1 - t;
				if (tMin < t && t < tMax)
					add(u * u * u * v0
						+ 3 * u * u * t * v1
						+ 3 * u * t * t * v2
						+ t * t * t * v3,
						padding);
			}
		}
	}}, Base.each(
		['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
		function(name) {
			this[name] = function() {
				if (!this._bounds)
					this._bounds = {};
				var bounds = this._bounds[name];
				if (!bounds) {
					var path = this._path;
					bounds = this._bounds[name] = Path[name](
							[this._segment1, this._segment2], false,
							path && path.getStyle());
				}
				return bounds.clone();
			};
		},
	{
	
	}), Base.each({
		isStraight: function(l, h1, h2) {
			if (h1.isZero() && h2.isZero()) {
				return true;
			} else if (l.isZero()) {
				return false;
			} else if (h1.isCollinear(l) && h2.isCollinear(l)) {
				var div = l.dot(l),
					p1 = l.dot(h1) / div,
					p2 = l.dot(h2) / div;
				return p1 >= 0 && p1 <= 1 && p2 <= 0 && p2 >= -1;
			}
			return false;
		},
	
		isLinear: function(l, h1, h2) {
			var third = l.divide(3);
			return h1.equals(third) && h2.negate().equals(third);
		}
	}, function(test, name) {
		this[name] = function() {
			var seg1 = this._segment1,
				seg2 = this._segment2;
			return test(seg2._point.subtract(seg1._point),
					seg1._handleOut, seg2._handleIn);
		};
	
		this.statics[name] = function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7];
			return test(new Point(p2x - p1x, p2y - p1y),
					new Point(v[2] - p1x, v[3] - p1y),
					new Point(v[4] - p2x, v[5] - p2y));
		};
	}, {
		statics: {},
	
		hasHandles: function() {
			return !this._segment1._handleOut.isZero()
					|| !this._segment2._handleIn.isZero();
		},
	
		isCollinear: function(curve) {
			return curve && this.isStraight() && curve.isStraight()
					&& this.getLine().isCollinear(curve.getLine());
		},
	
		isHorizontal: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).y)
					< 1e-7;
		},
	
		isVertical: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).x)
					< 1e-7;
		}
	}), {
		beans: false,
	
		getParameterAt: function(offset, start) {
			return Curve.getParameterAt(this.getValues(), offset, start);
		},
	
		getParameterOf: function() {
			return Curve.getParameterOf(this.getValues(), Point.read(arguments));
		},
	
		getLocationAt: function(offset, isParameter) {
			var t = isParameter ? offset : this.getParameterAt(offset);
			return t != null && t >= 0 && t <= 1
					? new CurveLocation(this, t)
					: null;
		},
	
		getLocationOf: function() {
			return this.getLocationAt(this.getParameterOf(Point.read(arguments)),
					true);
		},
	
		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},
	
		getNearestLocation: function() {
			var point = Point.read(arguments),
				values = this.getValues(),
				t = Curve.getNearestParameter(values, point),
				pt = Curve.getPoint(values, t);
			return new CurveLocation(this, t, pt, null, point.getDistance(pt));
		},
	
		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}
	
	},
	new function() {
		var methods = ['getPoint', 'getTangent', 'getNormal', 'getWeightedTangent',
			'getWeightedNormal', 'getCurvature'];
		return Base.each(methods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var values = this.getValues();
				return Curve[name](values, isParameter ? offset
						: Curve.getParameterAt(values, offset, 0));
			};
		}, {
			statics: {
				evaluateMethods: methods
			}
		})
	},
	new function() {
	
		function getLengthIntegrand(v) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
	
				ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
				bx = 6 * (p1x + c2x) - 12 * c1x,
				cx = 3 * (c1x - p1x),
	
				ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
				by = 6 * (p1y + c2y) - 12 * c1y,
				cy = 3 * (c1y - p1y);
	
			return function(t) {
				var dx = (ax * t + bx) * t + cx,
					dy = (ay * t + by) * t + cy;
				return Math.sqrt(dx * dx + dy * dy);
			};
		}
	
		function getIterations(a, b) {
			return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
		}
	
		function evaluate(v, t, type, normalized) {
			if (t == null || t < 0 || t > 1)
				return null;
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				tMin = 4e-7,
				tMax = 1 - tMin,
				x, y;
	
			if (type === 0 && (t < tMin || t > tMax)) {
				var isZero = t < tMin;
				x = isZero ? p1x : p2x;
				y = isZero ? p1y : p2y;
			} else {
				var cx = 3 * (c1x - p1x),
					bx = 3 * (c2x - c1x) - cx,
					ax = p2x - p1x - cx - bx,
	
					cy = 3 * (c1y - p1y),
					by = 3 * (c2y - c1y) - cy,
					ay = p2y - p1y - cy - by;
				if (type === 0) {
					x = ((ax * t + bx) * t + cx) * t + p1x;
					y = ((ay * t + by) * t + cy) * t + p1y;
				} else {
					if (t < tMin) {
						x = cx;
						y = cy;
					} else if (t > tMax) {
						x = 3 * (p2x - c2x);
						y = 3 * (p2y - c2y);
					} else {
						x = (3 * ax * t + 2 * bx) * t + cx;
						y = (3 * ay * t + 2 * by) * t + cy;
					}
					if (normalized) {
						if (x === 0 && y === 0 && (t < tMin || t > tMax)) {
							x = c2x - c1x;
							y = c2y - c1y;
						}
						var len = Math.sqrt(x * x + y * y);
						if (len) {
							x /= len;
							y /= len;
						}
					}
					if (type === 3) {
						var x2 = 6 * ax * t + 2 * bx,
							y2 = 6 * ay * t + 2 * by,
							d = Math.pow(x * x + y * y, 3 / 2);
						x = d !== 0 ? (x * y2 - y * x2) / d : 0;
						y = 0;
					}
				}
			}
			return type === 2 ? new Point(y, -x) : new Point(x, y);
		}
	
		return { statics: {
	
			getLength: function(v, a, b) {
				if (a === undefined)
					a = 0;
				if (b === undefined)
					b = 1;
				if (a === 0 && b === 1 && Curve.isStraight(v)) {
					var dx = v[6] - v[0],
						dy = v[7] - v[1];
					return Math.sqrt(dx * dx + dy * dy);
				}
				var ds = getLengthIntegrand(v);
				return Numerical.integrate(ds, a, b, getIterations(a, b));
			},
	
			getParameterAt: function(v, offset, start) {
				if (start === undefined)
					start = offset < 0 ? 1 : 0
				if (offset === 0)
					return start;
				var abs = Math.abs,
					forward = offset > 0,
					a = forward ? start : 0,
					b = forward ? 1 : start,
					ds = getLengthIntegrand(v),
					rangeLength = Numerical.integrate(ds, a, b,
							getIterations(a, b));
				if (abs(offset - rangeLength) < 1e-12) {
					return forward ? b : a;
				} else if (abs(offset) > rangeLength) {
					return null;
				}
				var guess = offset / rangeLength,
					length = 0;
				function f(t) {
					length += Numerical.integrate(ds, start, t,
							getIterations(start, t));
					start = t;
					return length - offset;
				}
				return Numerical.findRoot(f, ds, start + guess, a, b, 32,
						1e-12);
			},
	
			getPoint: function(v, t) {
				return evaluate(v, t, 0, false);
			},
	
			getTangent: function(v, t) {
				return evaluate(v, t, 1, true);
			},
	
			getWeightedTangent: function(v, t) {
				return evaluate(v, t, 1, false);
			},
	
			getNormal: function(v, t) {
				return evaluate(v, t, 2, true);
			},
	
			getWeightedNormal: function(v, t) {
				return evaluate(v, t, 2, false);
			},
	
			getCurvature: function(v, t) {
				return evaluate(v, t, 3, false).x;
			}
		}};
	},
	new function() {
	
		function addLocation(locations, param, v1, c1, t1, p1, v2, c2, t2, p2,
				overlap) {
			var startConnected = param.startConnected,
				endConnected = param.endConnected,
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 == null)
				t1 = Curve.getParameterOf(v1, p1);
			if (t1 !== null && t1 >= (startConnected ? tMin : 0) &&
				t1 <= (endConnected ? tMax : 1)) {
				if (t2 == null)
					t2 = Curve.getParameterOf(v2, p2);
				if (t2 !== null && t2 >= (endConnected ? tMin : 0) &&
					t2 <= (startConnected ? tMax : 1)) {
					var renormalize = param.renormalize;
					if (renormalize) {
						var res = renormalize(t1, t2);
						t1 = res[0];
						t2 = res[1];
					}
					var loc1 = new CurveLocation(c1, t1,
							p1 || Curve.getPoint(v1, t1), overlap),
						loc2 = new CurveLocation(c2, t2,
							p2 || Curve.getPoint(v2, t2), overlap),
						flip = loc1.getPath() === loc2.getPath()
							&& loc1.getIndex() > loc2.getIndex(),
						loc = flip ? loc2 : loc1,
						include = param.include;
					loc1._intersection = loc2;
					loc2._intersection = loc1;
					if (!include || include(loc)) {
						CurveLocation.insert(locations, loc, true);
					}
				}
			}
		}
	
		function addCurveIntersections(v1, v2, c1, c2, locations, param,
				tMin, tMax, uMin, uMax, oldTDiff, reverse, recursion) {
			if (++recursion >= 24)
				return;
			var q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7],
				getSignedDistance = Line.getSignedDistance,
				d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]),
				d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]),
				factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9,
				dMin = factor * Math.min(0, d1, d2),
				dMax = factor * Math.max(0, d1, d2),
				dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]),
				dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]),
				dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]),
				dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]),
				hull = getConvexHull(dp0, dp1, dp2, dp3),
				top = hull[0],
				bottom = hull[1],
				tMinClip,
				tMaxClip;
			if ((tMinClip = clipConvexHull(top, bottom, dMin, dMax)) == null ||
				(tMaxClip = clipConvexHull(top.reverse(), bottom.reverse(),
					dMin, dMax)) == null)
				return;
			v1 = Curve.getPart(v1, tMinClip, tMaxClip);
			var tDiff = tMaxClip - tMinClip,
				tMinNew = tMin + (tMax - tMin) * tMinClip,
				tMaxNew = tMin + (tMax - tMin) * tMaxClip;
			if (oldTDiff > 0.5 && tDiff > 0.5) {
				if (tMaxNew - tMinNew > uMax - uMin) {
					var parts = Curve.subdivide(v1, 0.5),
						t = tMinNew + (tMaxNew - tMinNew) / 2;
					addCurveIntersections(
						v2, parts[0], c2, c1, locations, param,
						uMin, uMax, tMinNew, t, tDiff, !reverse, recursion);
					addCurveIntersections(
						v2, parts[1], c2, c1, locations, param,
						uMin, uMax, t, tMaxNew, tDiff, !reverse, recursion);
				} else {
					var parts = Curve.subdivide(v2, 0.5),
						t = uMin + (uMax - uMin) / 2;
					addCurveIntersections(
						parts[0], v1, c2, c1, locations, param,
						uMin, t, tMinNew, tMaxNew, tDiff, !reverse, recursion);
					addCurveIntersections(
						parts[1], v1, c2, c1, locations, param,
						t, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
				}
			} else if (Math.max(uMax - uMin, tMaxNew - tMinNew)
					< 1e-7) {
				var t1 = tMinNew + (tMaxNew - tMinNew) / 2,
					t2 = uMin + (uMax - uMin) / 2;
				v1 = c1.getValues();
				v2 = c2.getValues();
				addLocation(locations, param,
					reverse ? v2 : v1, reverse ? c2 : c1, reverse ? t2 : t1, null,
					reverse ? v1 : v2, reverse ? c1 : c2, reverse ? t1 : t2, null);
			} else if (tDiff > 1e-12) {
				addCurveIntersections(v2, v1, c2, c1, locations, param,
						uMin, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
			}
		}
	
		function getConvexHull(dq0, dq1, dq2, dq3) {
			var p0 = [ 0, dq0 ],
				p1 = [ 1 / 3, dq1 ],
				p2 = [ 2 / 3, dq2 ],
				p3 = [ 1, dq3 ],
				dist1 = dq1 - (2 * dq0 + dq3) / 3,
				dist2 = dq2 - (dq0 + 2 * dq3) / 3,
				hull;
			if (dist1 * dist2 < 0) {
				hull = [[p0, p1, p3], [p0, p2, p3]];
			} else {
				var distRatio = dist1 / dist2;
				hull = [
					distRatio >= 2 ? [p0, p1, p3]
					: distRatio <= .5 ? [p0, p2, p3]
					: [p0, p1, p2, p3],
					[p0, p3]
				];
			}
			return (dist1 || dist2) < 0 ? hull.reverse() : hull;
		}
	
		function clipConvexHull(hullTop, hullBottom, dMin, dMax) {
			if (hullTop[0][1] < dMin) {
				return clipConvexHullPart(hullTop, true, dMin);
			} else if (hullBottom[0][1] > dMax) {
				return clipConvexHullPart(hullBottom, false, dMax);
			} else {
				return hullTop[0][0];
			}
		}
	
		function clipConvexHullPart(part, top, threshold) {
			var px = part[0][0],
				py = part[0][1];
			for (var i = 1, l = part.length; i < l; i++) {
				var qx = part[i][0],
					qy = part[i][1];
				if (top ? qy >= threshold : qy <= threshold) {
					return qy === threshold ? qx
							: px + (threshold - py) * (qx - px) / (qy - py);
				}
				px = qx;
				py = qy;
			}
			return null;
		}
	
		function addCurveLineIntersections(v1, v2, c1, c2, locations, param) {
			var flip = Curve.isStraight(v1),
				vc = flip ? v2 : v1,
				vl = flip ? v1 : v2,
				lx1 = vl[0], ly1 = vl[1],
				lx2 = vl[6], ly2 = vl[7],
				ldx = lx2 - lx1,
				ldy = ly2 - ly1,
				angle = Math.atan2(-ldy, ldx),
				sin = Math.sin(angle),
				cos = Math.cos(angle),
				rvc = [];
			for(var i = 0; i < 8; i += 2) {
				var x = vc[i] - lx1,
					y = vc[i + 1] - ly1;
				rvc.push(
					x * cos - y * sin,
					x * sin + y * cos);
			}
			var roots = [],
				count = Curve.solveCubic(rvc, 1, 0, roots, 0, 1);
			for (var i = 0; i < count; i++) {
				var tc = roots[i],
					pc = Curve.getPoint(vc, tc),
					tl = Curve.getParameterOf(vl, pc);
				if (tl !== null) {
					var pl = Curve.getPoint(vl, tl),
						t1 = flip ? tl : tc,
						t2 = flip ? tc : tl;
					if (!param.endConnected || t2 > Numerical.CURVETIME_EPSILON) {
						addLocation(locations, param,
								v1, c1, t1, flip ? pl : pc,
								v2, c2, t2, flip ? pc : pl);
					}
				}
			}
		}
	
		function addLineIntersection(v1, v2, c1, c2, locations, param) {
			var pt = Line.intersect(
					v1[0], v1[1], v1[6], v1[7],
					v2[0], v2[1], v2[6], v2[7]);
			if (pt) {
				addLocation(locations, param, v1, c1, null, pt, v2, c2, null, pt);
			}
		}
	
		return { statics: {
			_getIntersections: function(v1, v2, c1, c2, locations, param) {
				if (!v2) {
					return Curve._getSelfIntersection(v1, c1, locations, param);
				}
				var c1p1x = v1[0], c1p1y = v1[1],
					c1p2x = v1[6], c1p2y = v1[7],
					c2p1x = v2[0], c2p1y = v2[1],
					c2p2x = v2[6], c2p2y = v2[7],
					c1s1x = (3 * v1[2] + c1p1x) / 4,
					c1s1y = (3 * v1[3] + c1p1y) / 4,
					c1s2x = (3 * v1[4] + c1p2x) / 4,
					c1s2y = (3 * v1[5] + c1p2y) / 4,
					c2s1x = (3 * v2[2] + c2p1x) / 4,
					c2s1y = (3 * v2[3] + c2p1y) / 4,
					c2s2x = (3 * v2[4] + c2p2x) / 4,
					c2s2y = (3 * v2[5] + c2p2y) / 4,
					min = Math.min,
					max = Math.max;
				if (!(	max(c1p1x, c1s1x, c1s2x, c1p2x) >=
						min(c2p1x, c2s1x, c2s2x, c2p2x) &&
						min(c1p1x, c1s1x, c1s2x, c1p2x) <=
						max(c2p1x, c2s1x, c2s2x, c2p2x) &&
						max(c1p1y, c1s1y, c1s2y, c1p2y) >=
						min(c2p1y, c2s1y, c2s2y, c2p2y) &&
						min(c1p1y, c1s1y, c1s2y, c1p2y) <=
						max(c2p1y, c2s1y, c2s2y, c2p2y)))
					return locations;
				if (!param.startConnected && !param.endConnected) {
					var overlaps = Curve.getOverlaps(v1, v2);
					if (overlaps) {
						for (var i = 0; i < 2; i++) {
							var overlap = overlaps[i];
							addLocation(locations, param,
								v1, c1, overlap[0], null,
								v2, c2, overlap[1], null, true);
						}
						return locations;
					}
				}
	
				var straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight = straight1 && straight2,
					epsilon = 1e-12,
					before = locations.length;
				(straight
					? addLineIntersection
					: straight1 || straight2
						? addCurveLineIntersections
						: addCurveIntersections)(
							v1, v2, c1, c2, locations, param,
							0, 1, 0, 1, 0, false, 0);
				if (straight && locations.length > before)
					return locations;
				var c1p1 = new Point(c1p1x, c1p1y),
					c1p2 = new Point(c1p2x, c1p2y),
					c2p1 = new Point(c2p1x, c2p1y),
					c2p2 = new Point(c2p2x, c2p2y);
				if (c1p1.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 0, c2p1);
				if (!param.startConnected && c1p1.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 1, c2p2);
				if (!param.endConnected && c1p2.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 0, c2p1);
				if (c1p2.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 1, c2p2);
				return locations;
			},
	
			_getSelfIntersection: function(v1, c1, locations, param) {
				var p1x = v1[0], p1y = v1[1],
					h1x = v1[2], h1y = v1[3],
					h2x = v1[4], h2y = v1[5],
					p2x = v1[6], p2y = v1[7];
				var line = new Line(p1x, p1y, p2x, p2y, false),
					side1 = line.getSide(new Point(h1x, h1y), true),
					side2 = line.getSide(new Point(h2x, h2y), true);
				if (side1 === side2) {
					var edgeSum = (p1x - h2x) * (h1y - p2y)
								+ (h1x - p2x) * (h2y - p1y);
					if (edgeSum * side1 > 0)
						return locations;
				}
				var ax = p2x - 3 * h2x + 3 * h1x - p1x,
					bx = h2x - 2 * h1x + p1x,
					cx = h1x - p1x,
					ay = p2y - 3 * h2y + 3 * h1y - p1y,
					by = h2y - 2 * h1y + p1y,
					cy = h1y - p1y,
					ac = ay * cx - ax * cy,
					ab = ay * bx - ax * by,
					bc = by * cx - bx * cy;
				if (ac * ac - 4 * ab * bc < 0) {
					var roots = [],
						tSplit,
						count = Numerical.solveCubic(
								ax * ax	 + ay * ay,
								3 * (ax * bx + ay * by),
								2 * (bx * bx + by * by) + ax * cx + ay * cy,
								bx * cx + by * cy,
								roots, 0, 1);
					if (count > 0) {
						for (var i = 0, maxCurvature = 0; i < count; i++) {
							var curvature = Math.abs(
									c1.getCurvatureAt(roots[i], true));
							if (curvature > maxCurvature) {
								maxCurvature = curvature;
								tSplit = roots[i];
							}
						}
						var parts = Curve.subdivide(v1, tSplit);
						param.endConnected = true;
						param.renormalize = function(t1, t2) {
							return [t1 * tSplit, t2 * (1 - tSplit) + tSplit];
						};
						Curve._getIntersections(parts[0], parts[1], c1, c1,
								locations, param);
					}
				}
				return locations;
			},
	
			getOverlaps: function(v1, v2) {
				var abs = Math.abs,
					timeEpsilon = 4e-7,
					geomEpsilon = 2e-7,
					straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight =	straight1 && straight2;
	
				function getLineLengthSquared(v) {
					var x = v[6] - v[0],
						y = v[7] - v[1];
					return x * x + y * y;
				}
	
				if (straight) {
					var flip = getLineLengthSquared(v1) < getLineLengthSquared(v2),
						l1 = flip ? v2 : v1,
						l2 = flip ? v1 : v2,
						line = new Line(l1[0], l1[1], l1[6], l1[7]);
					if (line.getDistance(new Point(l2[0], l2[1])) > geomEpsilon ||
						line.getDistance(new Point(l2[6], l2[7])) > geomEpsilon)
						return null;
				} else if (straight1 ^ straight2) {
					return null;
				}
	
				var v = [v1, v2],
					pairs = [];
				for (var i = 0, t1 = 0;
						i < 2 && pairs.length < 2;
						i += t1 === 0 ? 0 : 1, t1 = t1 ^ 1) {
					var t2 = Curve.getParameterOf(v[i ^ 1], new Point(
							v[i][t1 === 0 ? 0 : 6],
							v[i][t1 === 0 ? 1 : 7]));
					if (t2 != null) {
						var pair = i === 0 ? [t1, t2] : [t2, t1];
						if (pairs.length === 0 ||
							abs(pair[0] - pairs[0][0]) > timeEpsilon &&
							abs(pair[1] - pairs[0][1]) > timeEpsilon)
							pairs.push(pair);
					}
					if (i === 1 && pairs.length === 0)
						break;
				}
				if (pairs.length !== 2) {
					pairs = null;
				} else if (!straight) {
					var o1 = Curve.getPart(v1, pairs[0][0], pairs[1][0]),
						o2 = Curve.getPart(v2, pairs[0][1], pairs[1][1]);
					if (abs(o2[2] - o1[2]) > geomEpsilon ||
						abs(o2[3] - o1[3]) > geomEpsilon ||
						abs(o2[4] - o1[4]) > geomEpsilon ||
						abs(o2[5] - o1[5]) > geomEpsilon)
						pairs = null;
				}
				return pairs;
			}
		}};
	});
	
	var CurveLocation = Base.extend({
		_class: 'CurveLocation',
		beans: true,
	
		initialize: function CurveLocation(curve, parameter, point,
				_overlap, _distance) {
			if (parameter > 0.9999996) {
				var next = curve.getNext();
				if (next) {
					parameter = 0;
					curve = next;
				}
			}
			this._id = UID.get(CurveLocation);
			this._setCurve(curve);
			this._parameter = parameter;
			this._point = point || curve.getPointAt(parameter, true);
			this._overlap = _overlap;
			this._distance = _distance;
			this._intersection = this._next = this._prev = null;
		},
	
		_setCurve: function(curve) {
			var path = curve._path;
			this._version = path ? path._version : 0;
			this._curve = curve;
			this._segment = null;
			this._segment1 = curve._segment1;
			this._segment2 = curve._segment2;
		},
	
		_setSegment: function(segment) {
			this._setCurve(segment.getCurve());
			this._segment = segment;
			this._parameter = segment === this._segment1 ? 0 : 1;
			this._point = segment._point.clone();
		},
	
		getSegment: function() {
			var curve = this.getCurve(),
				segment = this._segment;
			if (!segment) {
				var parameter = this.getParameter();
				if (parameter === 0) {
					segment = curve._segment1;
				} else if (parameter === 1) {
					segment = curve._segment2;
				} else if (parameter != null) {
					segment = curve.getPartLength(0, parameter)
						< curve.getPartLength(parameter, 1)
							? curve._segment1
							: curve._segment2;
				}
				this._segment = segment;
			}
			return segment;
		},
	
		getCurve: function() {
			var curve = this._curve,
				path = curve && curve._path,
				that = this;
			if (path && path._version !== this._version) {
				curve = this._parameter = this._curve = this._offset = null;
			}
	
			function trySegment(segment) {
				var curve = segment && segment.getCurve();
				if (curve && (that._parameter = curve.getParameterOf(that._point))
						!= null) {
					that._setCurve(curve);
					that._segment = segment;
					return curve;
				}
			}
	
			return curve
				|| trySegment(this._segment)
				|| trySegment(this._segment1)
				|| trySegment(this._segment2.getPrevious());
		},
	
		getPath: function() {
			var curve = this.getCurve();
			return curve && curve._path;
		},
	
		getIndex: function() {
			var curve = this.getCurve();
			return curve && curve.getIndex();
		},
	
		getParameter: function() {
			var curve = this.getCurve(),
				parameter = this._parameter;
			return curve && parameter == null
				? this._parameter = curve.getParameterOf(this._point)
				: parameter;
		},
	
		getPoint: function() {
			return this._point;
		},
	
		getOffset: function() {
			var offset = this._offset;
			if (offset == null) {
				offset = 0;
				var path = this.getPath(),
					index = this.getIndex();
				if (path && index != null) {
					var curves = path.getCurves();
					for (var i = 0; i < index; i++)
						offset += curves[i].getLength();
				}
				this._offset = offset += this.getCurveOffset();
			}
			return offset;
		},
	
		getCurveOffset: function() {
			var curve = this.getCurve(),
				parameter = this.getParameter();
			return parameter != null && curve && curve.getPartLength(0, parameter);
		},
	
		getIntersection: function() {
			return this._intersection;
		},
	
		getDistance: function() {
			return this._distance;
		},
	
		divide: function() {
			var curve = this.getCurve(),
				res = null;
			if (curve) {
				res = curve.divide(this.getParameter(), true);
				if (res)
					this._setSegment(res._segment1);
			}
			return res;
		},
	
		split: function() {
			var curve = this.getCurve();
			return curve ? curve.split(this.getParameter(), true) : null;
		},
	
		equals: function(loc, _ignoreOther) {
			var res = this === loc,
				epsilon = 2e-7;
			if (!res && loc instanceof CurveLocation
					&& this.getPath() === loc.getPath()
					&& this.getPoint().isClose(loc.getPoint(), epsilon)) {
				var c1 = this.getCurve(),
					c2 = loc.getCurve(),
					abs = Math.abs,
					diff = abs(
						((c1.isLast() && c2.isFirst() ? -1 : c1.getIndex())
								+ this.getParameter()) -
						((c2.isLast() && c1.isFirst() ? -1 : c2.getIndex())
								+ loc.getParameter()));
				res = (diff < 4e-7
					|| ((diff = abs(this.getOffset() - loc.getOffset())) < epsilon
						|| abs(this.getPath().getLength() - diff) < epsilon))
					&& (_ignoreOther
						|| (!this._intersection && !loc._intersection
							|| this._intersection && this._intersection.equals(
									loc._intersection, true)));
			}
			return res;
		},
	
		toString: function() {
			var parts = [],
				point = this.getPoint(),
				f = Formatter.instance;
			if (point)
				parts.push('point: ' + point);
			var index = this.getIndex();
			if (index != null)
				parts.push('index: ' + index);
			var parameter = this.getParameter();
			if (parameter != null)
				parts.push('parameter: ' + f.number(parameter));
			if (this._distance != null)
				parts.push('distance: ' + f.number(this._distance));
			return '{ ' + parts.join(', ') + ' }';
		},
	
		isTouching: function() {
			var inter = this._intersection;
			if (inter && this.getTangent().isCollinear(inter.getTangent())) {
				var curve1 = this.getCurve(),
					curve2 = inter.getCurve();
				return !(curve1.isStraight() && curve2.isStraight()
						&& curve1.getLine().intersect(curve2.getLine()));
			}
			return false;
		},
	
		isCrossing: function() {
			var inter = this._intersection;
			if (!inter)
				return false;
			var t1 = this.getParameter(),
				t2 = inter.getParameter(),
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 >= tMin && t1 <= tMax || t2 >= tMin && t2 <= tMax)
				return !this.isTouching();
			var c2 = this.getCurve(),
				c1 = c2.getPrevious(),
				c4 = inter.getCurve(),
				c3 = c4.getPrevious(),
				PI = Math.PI;
			if (!c1 || !c3)
				return false;
	
			function isInRange(angle, min, max) {
				return min < max
					? angle > min && angle < max
					: angle > min && angle <= PI || angle >= -PI && angle < max;
			}
	
			var a1 = c1.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a2 = c2.getTangentAt(tMin, true).getAngleInRadians(),
				a3 = c3.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a4 = c4.getTangentAt(tMin, true).getAngleInRadians();
	
			return (isInRange(a3, a1, a2) ^ isInRange(a4, a1, a2))
				&& (isInRange(a3, a2, a1) ^ isInRange(a4, a2, a1));
		},
	
		isOverlap: function() {
			return !!this._overlap;
		}
	}, Base.each(Curve.evaluateMethods, function(name) {
		var get = name + 'At';
		this[name] = function() {
			var parameter = this.getParameter(),
				curve = this.getCurve();
			return parameter != null && curve && curve[get](parameter, true);
		};
	}, {
		preserve: true
	}),
	new function() {
	
		function insert(locations, loc, merge) {
			var length = locations.length,
				l = 0,
				r = length - 1;
	
			function search(index, dir) {
				for (var i = index + dir; i >= -1 && i <= length; i += dir) {
					var loc2 = locations[((i % length) + length) % length];
					if (!loc.getPoint().isClose(loc2.getPoint(),
							2e-7))
						break;
					if (loc.equals(loc2))
						return loc2;
				}
				return null;
			}
	
			while (l <= r) {
				var m = (l + r) >>> 1,
					loc2 = locations[m],
					found;
				if (merge && (found = loc.equals(loc2) ? loc2
						: (search(m, -1) || search(m, 1)))) {
					if (loc._overlap) {
						found._overlap = found._intersection._overlap = true;
					}
					return found;
				}
			var path1 = loc.getPath(),
				path2 = loc2.getPath(),
				diff = path1 === path2
					? (loc.getIndex() + loc.getParameter())
					- (loc2.getIndex() + loc2.getParameter())
					: path1._id - path2._id;
				if (diff < 0) {
					r = m - 1;
				} else {
					l = m + 1;
				}
			}
			locations.splice(l, 0, loc);
			return loc;
		}
	
		return { statics: {
			insert: insert,
	
			expand: function(locations) {
				var expanded = locations.slice();
				for (var i = 0, l = locations.length; i < l; i++) {
					insert(expanded, locations[i]._intersection, false);
				}
				return expanded;
			}
		}};
	});
	
	var PathItem = Item.extend({
		_class: 'PathItem',
	
		initialize: function PathItem() {
		},
	
		getIntersections: function(path, include, _matrix, _returnFirst) {
			var self = this === path || !path,
				matrix1 = this._matrix.orNullIfIdentity(),
				matrix2 = self ? matrix1
					: (_matrix || path._matrix).orNullIfIdentity();
			if (!self && !this.getBounds(matrix1).touches(path.getBounds(matrix2)))
				return [];
			var curves1 = this.getCurves(),
				curves2 = self ? curves1 : path.getCurves(),
				length1 = curves1.length,
				length2 = self ? length1 : curves2.length,
				values2 = [],
				arrays = [],
				locations,
				path;
			for (var i = 0; i < length2; i++)
				values2[i] = curves2[i].getValues(matrix2);
			for (var i = 0; i < length1; i++) {
				var curve1 = curves1[i],
					values1 = self ? values2[i] : curve1.getValues(matrix1),
					path1 = curve1.getPath();
				if (path1 !== path) {
					path = path1;
					locations = [];
					arrays.push(locations);
				}
				if (self) {
					Curve._getSelfIntersection(values1, curve1, locations, {
						include: include,
						startConnected: length1 === 1 &&
								curve1.getPoint1().equals(curve1.getPoint2())
					});
				}
				for (var j = self ? i + 1 : 0; j < length2; j++) {
					if (_returnFirst && locations.length)
						return locations;
					var curve2 = curves2[j];
					Curve._getIntersections(
						values1, values2[j], curve1, curve2, locations,
						{
							include: include,
							startConnected: self && curve1.getPrevious() === curve2,
							endConnected: self && curve1.getNext() === curve2
						}
					);
				}
			}
			locations = [];
			for (var i = 0, l = arrays.length; i < l; i++) {
				locations.push.apply(locations, arrays[i]);
			}
			return locations;
		},
	
		getCrossings: function(path) {
			return this.getIntersections(path, function(inter) {
				return inter.isCrossing();
			});
		},
	
		_asPathItem: function() {
			return this;
		},
	
		setPathData: function(data) {
	
			var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
				coords,
				relative = false,
				previous,
				control,
				current = new Point(),
				start = new Point();
	
			function getCoord(index, coord) {
				var val = +coords[index];
				if (relative)
					val += current[coord];
				return val;
			}
	
			function getPoint(index) {
				return new Point(
					getCoord(index, 'x'),
					getCoord(index + 1, 'y')
				);
			}
	
			this.clear();
	
			for (var i = 0, l = parts && parts.length; i < l; i++) {
				var part = parts[i],
					command = part[0],
					lower = command.toLowerCase();
				coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
				var length = coords && coords.length;
				relative = command === lower;
				if (previous === 'z' && !/[mz]/.test(lower))
					this.moveTo(current = start);
				switch (lower) {
				case 'm':
				case 'l':
					var move = lower === 'm';
					for (var j = 0; j < length; j += 2)
						this[j === 0 && move ? 'moveTo' : 'lineTo'](
								current = getPoint(j));
					control = current;
					if (move)
						start = current;
					break;
				case 'h':
				case 'v':
					var coord = lower === 'h' ? 'x' : 'y';
					for (var j = 0; j < length; j++) {
						current[coord] = getCoord(j, coord);
						this.lineTo(current);
					}
					control = current;
					break;
				case 'c':
					for (var j = 0; j < length; j += 6) {
						this.cubicCurveTo(
								getPoint(j),
								control = getPoint(j + 2),
								current = getPoint(j + 4));
					}
					break;
				case 's':
					for (var j = 0; j < length; j += 4) {
						this.cubicCurveTo(
								/[cs]/.test(previous)
										? current.multiply(2).subtract(control)
										: current,
								control = getPoint(j),
								current = getPoint(j + 2));
						previous = lower;
					}
					break;
				case 'q':
					for (var j = 0; j < length; j += 4) {
						this.quadraticCurveTo(
								control = getPoint(j),
								current = getPoint(j + 2));
					}
					break;
				case 't':
					for (var j = 0; j < length; j += 2) {
						this.quadraticCurveTo(
								control = (/[qt]/.test(previous)
										? current.multiply(2).subtract(control)
										: current),
								current = getPoint(j));
						previous = lower;
					}
					break;
				case 'a':
					for (var j = 0; j < length; j += 7) {
						this.arcTo(current = getPoint(j + 5),
								new Size(+coords[j], +coords[j + 1]),
								+coords[j + 2], +coords[j + 4], +coords[j + 3]);
					}
					break;
				case 'z':
					this.closePath(true);
					break;
				}
				previous = lower;
			}
		},
	
		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},
	
		_contains: function(point) {
			var winding = this._getWinding(point, false, true);
			return !!(this.getWindingRule() === 'evenodd' ? winding & 1 : winding);
		}
	
	});
	
	var Path = PathItem.extend({
		_class: 'Path',
		_serializeFields: {
			segments: [],
			closed: false
		},
	
		initialize: function Path(arg) {
			this._closed = false;
			this._segments = [];
			this._version = 0;
			var segments = Array.isArray(arg)
				? typeof arg[0] === 'object'
					? arg
					: arguments
				: arg && (arg.size === undefined && (arg.x !== undefined
						|| arg.point !== undefined))
					? arguments
					: null;
			if (segments && segments.length > 0) {
				this.setSegments(segments);
			} else {
				this._curves = undefined;
				this._selectedSegmentState = 0;
				if (!segments && typeof arg === 'string') {
					this.setPathData(arg);
					arg = null;
				}
			}
			this._initialize(!segments && arg);
		},
	
		_equals: function(item) {
			return this._closed === item._closed
					&& Base.equals(this._segments, item._segments);
		},
	
		clone: function(insert) {
			var copy = new Path(Item.NO_INSERT);
			copy.setSegments(this._segments);
			copy._closed = this._closed;
			if (this._clockwise !== undefined)
				copy._clockwise = this._clockwise;
			return this._clone(copy, insert);
		},
	
		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 8) {
				var parent = this._parent;
				if (parent)
					parent._currentPath = undefined;
				this._length = this._area = this._clockwise = this._monoCurves =
						undefined;
				if (flags & 16) {
					this._version++;
				} else if (this._curves) {
				   for (var i = 0, l = this._curves.length; i < l; i++)
						this._curves[i]._changed();
				}
			} else if (flags & 32) {
				this._bounds = undefined;
			}
		},
	
		getStyle: function() {
			var parent = this._parent;
			return (parent instanceof CompoundPath ? parent : this)._style;
		},
	
		getSegments: function() {
			return this._segments;
		},
	
		setSegments: function(segments) {
			var fullySelected = this.isFullySelected();
			this._segments.length = 0;
			this._selectedSegmentState = 0;
			this._curves = undefined;
			if (segments && segments.length > 0)
				this._add(Segment.readAll(segments));
			if (fullySelected)
				this.setFullySelected(true);
		},
	
		getFirstSegment: function() {
			return this._segments[0];
		},
	
		getLastSegment: function() {
			return this._segments[this._segments.length - 1];
		},
	
		getCurves: function() {
			var curves = this._curves,
				segments = this._segments;
			if (!curves) {
				var length = this._countCurves();
				curves = this._curves = new Array(length);
				for (var i = 0; i < length; i++)
					curves[i] = new Curve(this, segments[i],
						segments[i + 1] || segments[0]);
			}
			return curves;
		},
	
		getFirstCurve: function() {
			return this.getCurves()[0];
		},
	
		getLastCurve: function() {
			var curves = this.getCurves();
			return curves[curves.length - 1];
		},
	
		isClosed: function() {
			return this._closed;
		},
	
		setClosed: function(closed) {
			if (this._closed != (closed = !!closed)) {
				this._closed = closed;
				if (this._curves) {
					var length = this._curves.length = this._countCurves();
					if (closed)
						this._curves[length - 1] = new Curve(this,
							this._segments[length - 1], this._segments[0]);
				}
				this._changed(25);
			}
		}
	}, {
		beans: true,
	
		getPathData: function(_matrix, _precision) {
			var segments = this._segments,
				length = segments.length,
				f = new Formatter(_precision),
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY,
				parts = [];
	
			function addSegment(segment, skipLine) {
				segment._transformCoordinates(_matrix, coords, false);
				curX = coords[0];
				curY = coords[1];
				if (first) {
					parts.push('M' + f.pair(curX, curY));
					first = false;
				} else {
					inX = coords[2];
					inY = coords[3];
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						if (!skipLine)
							parts.push('l' + f.pair(curX - prevX, curY - prevY));
					} else {
						parts.push('c' + f.pair(outX - prevX, outY - prevY)
								+ ' ' + f.pair(inX - prevX, inY - prevY)
								+ ' ' + f.pair(curX - prevX, curY - prevY));
					}
				}
				prevX = curX;
				prevY = curY;
				outX = coords[4];
				outY = coords[5];
			}
	
			if (length === 0)
				return '';
	
			for (var i = 0; i < length; i++)
				addSegment(segments[i]);
			if (this._closed && length > 0) {
				addSegment(segments[0], true);
				parts.push('z');
			}
			return parts.join('');
		}
	}, {
	
		isEmpty: function() {
			return this._segments.length === 0;
		},
	
		_transformContent: function(matrix) {
			var coords = new Array(6);
			for (var i = 0, l = this._segments.length; i < l; i++)
				this._segments[i]._transformCoordinates(matrix, coords, true);
			return true;
		},
	
		_add: function(segs, index) {
			var segments = this._segments,
				curves = this._curves,
				amount = segs.length,
				append = index == null,
				index = append ? segments.length : index;
			for (var i = 0; i < amount; i++) {
				var segment = segs[i];
				if (segment._path)
					segment = segs[i] = segment.clone();
				segment._path = this;
				segment._index = index + i;
				if (segment._selectionState)
					this._updateSelection(segment, 0, segment._selectionState);
			}
			if (append) {
				segments.push.apply(segments, segs);
			} else {
				segments.splice.apply(segments, [index, 0].concat(segs));
				for (var i = index + amount, l = segments.length; i < l; i++)
					segments[i]._index = i;
			}
			if (curves) {
				var total = this._countCurves(),
					from = index + amount - 1 === total ? index - 1 : index,
					start = from,
					to = Math.min(from + amount, total);
				if (segs._curves) {
					curves.splice.apply(curves, [from, 0].concat(segs._curves));
					start += segs._curves.length;
				}
				for (var i = start; i < to; i++)
					curves.splice(i, 0, new Curve(this, null, null));
				this._adjustCurves(from, to);
			}
			this._changed(25);
			return segs;
		},
	
		_adjustCurves: function(from, to) {
			var segments = this._segments,
				curves = this._curves,
				curve;
			for (var i = from; i < to; i++) {
				curve = curves[i];
				curve._path = this;
				curve._segment1 = segments[i];
				curve._segment2 = segments[i + 1] || segments[0];
				curve._changed();
			}
			if (curve = curves[this._closed && from === 0 ? segments.length - 1
					: from - 1]) {
				curve._segment2 = segments[from] || segments[0];
				curve._changed();
			}
			if (curve = curves[to]) {
				curve._segment1 = segments[to];
				curve._changed();
			}
		},
	
		_countCurves: function() {
			var length = this._segments.length;
			return !this._closed && length > 0 ? length - 1 : length;
		},
	
		add: function(segment1 ) {
			return arguments.length > 1 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments))
				: this._add([ Segment.read(arguments) ])[0];
		},
	
		insert: function(index, segment1 ) {
			return arguments.length > 2 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments, 1), index)
				: this._add([ Segment.read(arguments, 1) ], index)[0];
		},
	
		addSegment: function() {
			return this._add([ Segment.read(arguments) ])[0];
		},
	
		insertSegment: function(index ) {
			return this._add([ Segment.read(arguments, 1) ], index)[0];
		},
	
		addSegments: function(segments) {
			return this._add(Segment.readAll(segments));
		},
	
		insertSegments: function(index, segments) {
			return this._add(Segment.readAll(segments), index);
		},
	
		removeSegment: function(index) {
			return this.removeSegments(index, index + 1)[0] || null;
		},
	
		removeSegments: function(from, to, _includeCurves) {
			from = from || 0;
			to = Base.pick(to, this._segments.length);
			var segments = this._segments,
				curves = this._curves,
				count = segments.length,
				removed = segments.splice(from, to - from),
				amount = removed.length;
			if (!amount)
				return removed;
			for (var i = 0; i < amount; i++) {
				var segment = removed[i];
				if (segment._selectionState)
					this._updateSelection(segment, segment._selectionState, 0);
				segment._index = segment._path = null;
			}
			for (var i = from, l = segments.length; i < l; i++)
				segments[i]._index = i;
			if (curves) {
				var index = from > 0 && to === count + (this._closed ? 1 : 0)
						? from - 1
						: from,
					curves = curves.splice(index, amount);
				if (_includeCurves)
					removed._curves = curves.slice(1);
				this._adjustCurves(index, index);
			}
			this._changed(25);
			return removed;
		},
	
		clear: '#removeSegments',
	
		hasHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++) {
				if (segments[i].hasHandles())
					return true;
			}
			return false;
		},
	
		clearHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++)
				segments[i].clearHandles();
		},
	
		getLength: function() {
			if (this._length == null) {
				var curves = this.getCurves(),
					length = 0;
				for (var i = 0, l = curves.length; i < l; i++)
					length += curves[i].getLength();
				this._length = length;
			}
			return this._length;
		},
	
		getArea: function() {
			if (this._area == null) {
				var segments = this._segments,
					count = segments.length,
					last = count - 1,
					area = 0;
				for (var i = 0, l = this._closed ? count : last; i < l; i++) {
					area += Curve.getArea(Curve.getValues(
							segments[i], segments[i < last ? i + 1 : 0]));
				}
				this._area = area;
			}
			return this._area;
		},
	
		isClockwise: function() {
			if (this._clockwise !== undefined)
				return this._clockwise;
			return this.getArea() >= 0;
		},
	
		setClockwise: function(clockwise) {
			if (this.isClockwise() != (clockwise = !!clockwise))
				this.reverse();
			this._clockwise = clockwise;
		},
	
		isFullySelected: function() {
			var length = this._segments.length;
			return this._selected && length > 0 && this._selectedSegmentState
					=== length * 7;
		},
	
		setFullySelected: function(selected) {
			if (selected)
				this._selectSegments(true);
			this.setSelected(selected);
		},
	
		setSelected: function setSelected(selected) {
			if (!selected)
				this._selectSegments(false);
			setSelected.base.call(this, selected);
		},
	
		_selectSegments: function(selected) {
			var length = this._segments.length;
			this._selectedSegmentState = selected
					? length * 7 : 0;
			for (var i = 0; i < length; i++)
				this._segments[i]._selectionState = selected
						? 7 : 0;
		},
	
		_updateSelection: function(segment, oldState, newState) {
			segment._selectionState = newState;
			var total = this._selectedSegmentState += newState - oldState;
			if (total > 0)
				this.setSelected(true);
		},
	
		flatten: function(maxDistance) {
			var iterator = new PathIterator(this, 64, 0.1),
				pos = 0,
				step = iterator.length / Math.ceil(iterator.length / maxDistance),
				end = iterator.length + (this._closed ? -step : step) / 2;
			var segments = [];
			while (pos <= end) {
				segments.push(new Segment(iterator.getPointAt(pos)));
				pos += step;
			}
			this.setSegments(segments);
		},
	
		reduce: function() {
			var curves = this.getCurves();
			for (var i = curves.length - 1; i >= 0; i--) {
				var curve = curves[i];
				if (!curve.hasHandles() && (curve.getLength() === 0
						|| curve.isCollinear(curve.getNext())))
					curve.remove();
			}
			return this;
		},
	
		simplify: function(tolerance) {
			if (this._segments.length > 2) {
				var fitter = new PathFitter(this, tolerance || 2.5);
				this.setSegments(fitter.fit());
			}
		},
	
		split: function(index, parameter) {
			if (parameter === null)
				return null;
			if (arguments.length === 1) {
				var arg = index;
				if (typeof arg === 'number')
					arg = this.getLocationAt(arg);
				if (!arg)
					return null
				index = arg.index;
				parameter = arg.parameter;
			}
			var tMin = 4e-7,
				tMax = 1 - tMin;
			if (parameter >= tMax) {
				index++;
				parameter--;
			}
			var curves = this.getCurves();
			if (index >= 0 && index < curves.length) {
				if (parameter >= tMin) {
					curves[index++].divide(parameter, true);
				}
				var segs = this.removeSegments(index, this._segments.length, true),
					path;
				if (this._closed) {
					this.setClosed(false);
					path = this;
				} else {
					path = new Path(Item.NO_INSERT);
					path.insertAbove(this, true);
					this._clone(path);
				}
				path._add(segs, 0);
				this.addSegment(segs[0]);
				return path;
			}
			return null;
		},
	
		reverse: function() {
			this._segments.reverse();
			for (var i = 0, l = this._segments.length; i < l; i++) {
				var segment = this._segments[i];
				var handleIn = segment._handleIn;
				segment._handleIn = segment._handleOut;
				segment._handleOut = handleIn;
				segment._index = i;
			}
			this._curves = null;
			if (this._clockwise !== undefined)
				this._clockwise = !this._clockwise;
			this._changed(9);
		},
	
		join: function(path) {
			if (path) {
				var segments = path._segments,
					last1 = this.getLastSegment(),
					last2 = path.getLastSegment();
				if (!last2)
					return this;
				if (last1 && last1._point.equals(last2._point))
					path.reverse();
				var first2 = path.getFirstSegment();
				if (last1 && last1._point.equals(first2._point)) {
					last1.setHandleOut(first2._handleOut);
					this._add(segments.slice(1));
				} else {
					var first1 = this.getFirstSegment();
					if (first1 && first1._point.equals(first2._point))
						path.reverse();
					last2 = path.getLastSegment();
					if (first1 && first1._point.equals(last2._point)) {
						first1.setHandleIn(last2._handleIn);
						this._add(segments.slice(0, segments.length - 1), 0);
					} else {
						this._add(segments.slice());
					}
				}
				if (path._closed)
					this._add([segments[0]]);
				path.remove();
			}
			var first = this.getFirstSegment(),
				last = this.getLastSegment();
			if (first !== last && first._point.equals(last._point)) {
				first.setHandleIn(last._handleIn);
				last.remove();
				this.setClosed(true);
			}
			return this;
		},
	
		toShape: function(insert) {
			if (!this._closed)
				return null;
	
			var segments = this._segments,
				type,
				size,
				radius,
				topCenter;
	
			function isCollinear(i, j) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					seg3 = segments[j],
					seg4 = seg3.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg3._handleOut.isZero() && seg4._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isCollinear(
							seg4._point.subtract(seg3._point));
			}
	
			function isOrthogonal(i) {
				var seg2 = segments[i],
					seg1 = seg2.getPrevious(),
					seg3 = seg2.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg2._handleOut.isZero() && seg3._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isOrthogonal(
							seg3._point.subtract(seg2._point));
			}
	
			function isArc(i) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					handle1 = seg1._handleOut,
					handle2 = seg2._handleIn,
					kappa = 0.5522847498307936;
				if (handle1.isOrthogonal(handle2)) {
					var pt1 = seg1._point,
						pt2 = seg2._point,
						corner = new Line(pt1, handle1, true).intersect(
								new Line(pt2, handle2, true), true);
					return corner && Numerical.isZero(handle1.getLength() /
							corner.subtract(pt1).getLength() - kappa)
						&& Numerical.isZero(handle2.getLength() /
							corner.subtract(pt2).getLength() - kappa);
				}
				return false;
			}
	
			function getDistance(i, j) {
				return segments[i]._point.getDistance(segments[j]._point);
			}
	
			if (!this.hasHandles() && segments.length === 4
					&& isCollinear(0, 2) && isCollinear(1, 3) && isOrthogonal(1)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(0, 3), getDistance(0, 1));
				topCenter = segments[1]._point.add(segments[2]._point).divide(2);
			} else if (segments.length === 8 && isArc(0) && isArc(2) && isArc(4)
					&& isArc(6) && isCollinear(1, 5) && isCollinear(3, 7)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(1, 6), getDistance(0, 3));
				radius = size.subtract(new Size(getDistance(0, 7),
						getDistance(1, 2))).divide(2);
				topCenter = segments[3]._point.add(segments[4]._point).divide(2);
			} else if (segments.length === 4
					&& isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
				if (Numerical.isZero(getDistance(0, 2) - getDistance(1, 3))) {
					type = Shape.Circle;
					radius = getDistance(0, 2) / 2;
				} else {
					type = Shape.Ellipse;
					radius = new Size(getDistance(2, 0) / 2, getDistance(3, 1) / 2);
				}
				topCenter = segments[1]._point;
			}
	
			if (type) {
				var center = this.getPosition(true),
					shape = this._clone(new type({
						center: center,
						size: size,
						radius: radius,
						insert: false
					}), insert, false);
				shape.rotate(topCenter.subtract(center).getAngle() + 90);
				return shape;
			}
			return null;
		},
	
		_hitTestSelf: function(point, options) {
			var that = this,
				style = this.getStyle(),
				segments = this._segments,
				numSegments = segments.length,
				closed = this._closed,
				tolerancePadding = options._tolerancePadding,
				strokePadding = tolerancePadding,
				join, cap, miterLimit,
				area, loc, res,
				hitStroke = options.stroke && style.hasStroke(),
				hitFill = options.fill && style.hasFill(),
				hitCurves = options.curves,
				radius = hitStroke
						? style.getStrokeWidth() / 2
						: hitFill && options.tolerance > 0 || hitCurves
							? 0 : null;
			if (radius !== null) {
				if (radius > 0) {
					join = style.getStrokeJoin();
					cap = style.getStrokeCap();
					miterLimit = radius * style.getMiterLimit();
					strokePadding = tolerancePadding.add(new Point(radius, radius));
				} else {
					join = cap = 'round';
				}
			}
	
			function isCloseEnough(pt, padding) {
				return point.subtract(pt).divide(padding).length <= 1;
			}
	
			function checkSegmentPoint(seg, pt, name) {
				if (!options.selected || pt.isSelected()) {
					var anchor = seg._point;
					if (pt !== anchor)
						pt = pt.add(anchor);
					if (isCloseEnough(pt, strokePadding)) {
						return new HitResult(name, that, {
							segment: seg,
							point: pt
						});
					}
				}
			}
	
			function checkSegmentPoints(seg, ends) {
				return (ends || options.segments)
					&& checkSegmentPoint(seg, seg._point, 'segment')
					|| (!ends && options.handles) && (
						checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
						checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
			}
	
			function addToArea(point) {
				area.add(point);
			}
	
			function checkSegmentStroke(segment) {
				if (join !== 'round' || cap !== 'round') {
					area = new Path({ internal: true, closed: true });
					if (closed || segment._index > 0
							&& segment._index < numSegments - 1) {
						if (join !== 'round' && (segment._handleIn.isZero()
								|| segment._handleOut.isZero()))
							Path._addBevelJoin(segment, join, radius, miterLimit,
									addToArea, true);
					} else if (cap !== 'round') {
						Path._addSquareCap(segment, cap, radius, addToArea, true);
					}
					if (!area.isEmpty()) {
						var loc;
						return area.contains(point)
							|| (loc = area.getNearestLocation(point))
								&& isCloseEnough(loc.getPoint(), tolerancePadding);
					}
				}
				return isCloseEnough(segment._point, strokePadding);
			}
	
			if (options.ends && !options.segments && !closed) {
				if (res = checkSegmentPoints(segments[0], true)
						|| checkSegmentPoints(segments[numSegments - 1], true))
					return res;
			} else if (options.segments || options.handles) {
				for (var i = 0; i < numSegments; i++)
					if (res = checkSegmentPoints(segments[i]))
						return res;
			}
			if (radius !== null) {
				loc = this.getNearestLocation(point);
				if (loc) {
					var parameter = loc.getParameter();
					if (parameter === 0 || parameter === 1 && numSegments > 1) {
						if (!checkSegmentStroke(loc.getSegment()))
							loc = null;
					} else if (!isCloseEnough(loc.getPoint(), strokePadding)) {
						loc = null;
					}
				}
				if (!loc && join === 'miter' && numSegments > 1) {
					for (var i = 0; i < numSegments; i++) {
						var segment = segments[i];
						if (point.getDistance(segment._point) <= miterLimit
								&& checkSegmentStroke(segment)) {
							loc = segment.getLocation();
							break;
						}
					}
				}
			}
			return !loc && hitFill && this._contains(point)
					|| loc && !hitStroke && !hitCurves
						? new HitResult('fill', this)
						: loc
							? new HitResult(hitStroke ? 'stroke' : 'curve', this, {
								location: loc,
								point: loc.getPoint()
							})
							: null;
		}
	
	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var loc = this.getLocationAt(offset, isParameter);
				return loc && loc[name]();
			};
		},
	{
		beans: false,
	
		getLocationOf: function() {
			var point = Point.read(arguments),
				curves = this.getCurves();
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getLocationOf(point);
				if (loc)
					return loc;
			}
			return null;
		},
	
		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},
	
		getLocationAt: function(offset, isParameter) {
			var curves = this.getCurves(),
				length = 0;
			if (isParameter) {
				var index = ~~offset,
					curve = curves[index];
				return curve ? curve.getLocationAt(offset - index, true) : null;
			}
			for (var i = 0, l = curves.length; i < l; i++) {
				var start = length,
					curve = curves[i];
				length += curve.getLength();
				if (length > offset) {
					return curve.getLocationAt(offset - start);
				}
			}
			if (curves.length > 0 && offset <= this.getLength())
				return new CurveLocation(curves[curves.length - 1], 1);
			return null;
		},
	
		getNearestLocation: function() {
			var point = Point.read(arguments),
				curves = this.getCurves(),
				minDist = Infinity,
				minLoc = null;
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getNearestLocation(point);
				if (loc._distance < minDist) {
					minDist = loc._distance;
					minLoc = loc;
				}
			}
			return minLoc;
		},
	
		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}
	}),
	new function() {
	
		function drawHandles(ctx, segments, matrix, size) {
			var half = size / 2;
	
			function drawHandle(index) {
				var hX = coords[index],
					hY = coords[index + 1];
				if (pX != hX || pY != hY) {
					ctx.beginPath();
					ctx.moveTo(pX, pY);
					ctx.lineTo(hX, hY);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
					ctx.fill();
				}
			}
	
			var coords = new Array(6);
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				var state = segment._selectionState,
					pX = coords[0],
					pY = coords[1];
				if (state & 1)
					drawHandle(2);
				if (state & 2)
					drawHandle(4);
				ctx.fillRect(pX - half, pY - half, size, size);
				if (!(state & 4)) {
					var fillStyle = ctx.fillStyle;
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
					ctx.fillStyle = fillStyle;
				}
			}
		}
	
		function drawSegments(ctx, path, matrix) {
			var segments = path._segments,
				length = segments.length,
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY;
	
			function drawSegment(segment) {
				if (matrix) {
					segment._transformCoordinates(matrix, coords, false);
					curX = coords[0];
					curY = coords[1];
				} else {
					var point = segment._point;
					curX = point._x;
					curY = point._y;
				}
				if (first) {
					ctx.moveTo(curX, curY);
					first = false;
				} else {
					if (matrix) {
						inX = coords[2];
						inY = coords[3];
					} else {
						var handle = segment._handleIn;
						inX = curX + handle._x;
						inY = curY + handle._y;
					}
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						ctx.lineTo(curX, curY);
					} else {
						ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
					}
				}
				prevX = curX;
				prevY = curY;
				if (matrix) {
					outX = coords[4];
					outY = coords[5];
				} else {
					var handle = segment._handleOut;
					outX = prevX + handle._x;
					outY = prevY + handle._y;
				}
			}
	
			for (var i = 0; i < length; i++)
				drawSegment(segments[i]);
			if (path._closed && length > 0)
				drawSegment(segments[0]);
		}
	
		return {
			_draw: function(ctx, param, strokeMatrix) {
				var dontStart = param.dontStart,
					dontPaint = param.dontFinish || param.clip,
					style = this.getStyle(),
					hasFill = style.hasFill(),
					hasStroke = style.hasStroke(),
					dashArray = style.getDashArray(),
					dashLength = !paper.support.nativeDash && hasStroke
							&& dashArray && dashArray.length;
	
				if (!dontStart)
					ctx.beginPath();
	
				if (!dontStart && this._currentPath) {
					ctx.currentPath = this._currentPath;
				} else if (hasFill || hasStroke && !dashLength || dontPaint) {
					drawSegments(ctx, this, strokeMatrix);
					if (this._closed)
						ctx.closePath();
					if (!dontStart)
						this._currentPath = ctx.currentPath;
				}
	
				function getOffset(i) {
					return dashArray[((i % dashLength) + dashLength) % dashLength];
				}
	
				if (!dontPaint && (hasFill || hasStroke)) {
					this._setStyles(ctx);
					if (hasFill) {
						ctx.fill(style.getWindingRule());
						ctx.shadowColor = 'rgba(0,0,0,0)';
					}
					if (hasStroke) {
						if (dashLength) {
							if (!dontStart)
								ctx.beginPath();
							var iterator = new PathIterator(this, 32, 0.25,
									strokeMatrix),
								length = iterator.length,
								from = -style.getDashOffset(), to,
								i = 0;
							from = from % length;
							while (from > 0) {
								from -= getOffset(i--) + getOffset(i--);
							}
							while (from < length) {
								to = from + getOffset(i++);
								if (from > 0 || to > 0)
									iterator.drawPart(ctx,
											Math.max(from, 0), Math.max(to, 0));
								from = to + getOffset(i++);
							}
						}
						ctx.stroke();
					}
				}
			},
	
			_drawSelected: function(ctx, matrix) {
				ctx.beginPath();
				drawSegments(ctx, this, matrix);
				ctx.stroke();
				drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
			}
		};
	},
	new function() {
		function getFirstControlPoints(rhs) {
			var n = rhs.length,
				x = [],
				tmp = [],
				b = 2;
			x[0] = rhs[0] / b;
			for (var i = 1; i < n; i++) {
				tmp[i] = 1 / b;
				b = (i < n - 1 ? 4 : 2) - tmp[i];
				x[i] = (rhs[i] - x[i - 1]) / b;
			}
			for (var i = 1; i < n; i++) {
				x[n - i - 1] -= tmp[n - i] * x[n - i];
			}
			return x;
		}
	
		return {
			smooth: function() {
				var segments = this._segments,
					size = segments.length,
					closed = this._closed,
					n = size,
					overlap = 0;
				if (size <= 2)
					return;
				if (closed) {
					overlap = Math.min(size, 4);
					n += Math.min(size, overlap) * 2;
				}
				var knots = [];
				for (var i = 0; i < size; i++)
					knots[i + overlap] = segments[i]._point;
				if (closed) {
					for (var i = 0; i < overlap; i++) {
						knots[i] = segments[i + size - overlap]._point;
						knots[i + size + overlap] = segments[i]._point;
					}
				} else {
					n--;
				}
				var rhs = [];
	
				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._x + 2 * knots[i + 1]._x;
				rhs[0] = knots[0]._x + 2 * knots[1]._x;
				rhs[n - 1] = 3 * knots[n - 1]._x;
				var x = getFirstControlPoints(rhs);
	
				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._y + 2 * knots[i + 1]._y;
				rhs[0] = knots[0]._y + 2 * knots[1]._y;
				rhs[n - 1] = 3 * knots[n - 1]._y;
				var y = getFirstControlPoints(rhs);
	
				if (closed) {
					for (var i = 0, j = size; i < overlap; i++, j++) {
						var f1 = i / overlap,
							f2 = 1 - f1,
							ie = i + overlap,
							je = j + overlap;
						x[j] = x[i] * f1 + x[j] * f2;
						y[j] = y[i] * f1 + y[j] * f2;
						x[je] = x[ie] * f2 + x[je] * f1;
						y[je] = y[ie] * f2 + y[je] * f1;
					}
					n--;
				}
				var handleIn = null;
				for (var i = overlap; i <= n - overlap; i++) {
					var segment = segments[i - overlap];
					if (handleIn)
						segment.setHandleIn(handleIn.subtract(segment._point));
					if (i < n) {
						segment.setHandleOut(
								new Point(x[i], y[i]).subtract(segment._point));
						handleIn = i < n - 1
								? new Point(
									2 * knots[i + 1]._x - x[i + 1],
									2 * knots[i + 1]._y - y[i + 1])
								: new Point(
									(knots[n]._x + x[n - 1]) / 2,
									(knots[n]._y + y[n - 1]) / 2);
					}
				}
				if (closed && handleIn) {
					var segment = this._segments[0];
					segment.setHandleIn(handleIn.subtract(segment._point));
				}
			}
		};
	},
	new function() {
		function getCurrentSegment(that) {
			var segments = that._segments;
			if (segments.length === 0)
				throw new Error('Use a moveTo() command first');
			return segments[segments.length - 1];
		}
	
		return {
			moveTo: function() {
				var segments = this._segments;
				if (segments.length === 1)
					this.removeSegment(0);
				if (!segments.length)
					this._add([ new Segment(Point.read(arguments)) ]);
			},
	
			moveBy: function() {
				throw new Error('moveBy() is unsupported on Path items.');
			},
	
			lineTo: function() {
				this._add([ new Segment(Point.read(arguments)) ]);
			},
	
			cubicCurveTo: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this);
				current.setHandleOut(handle1.subtract(current._point));
				this._add([ new Segment(to, handle2.subtract(to)) ]);
			},
	
			quadraticCurveTo: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(
					handle.add(current.subtract(handle).multiply(1 / 3)),
					handle.add(to.subtract(handle).multiply(1 / 3)),
					to
				);
			},
	
			curveTo: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					t = Base.pick(Base.read(arguments), 0.5),
					t1 = 1 - t,
					current = getCurrentSegment(this)._point,
					handle = through.subtract(current.multiply(t1 * t1))
						.subtract(to.multiply(t * t)).divide(2 * t * t1);
				if (handle.isNaN())
					throw new Error(
						'Cannot put a curve through points with parameter = ' + t);
				this.quadraticCurveTo(handle, to);
			},
	
			arcTo: function() {
				var current = getCurrentSegment(this),
					from = current._point,
					to = Point.read(arguments),
					through,
					peek = Base.peek(arguments),
					clockwise = Base.pick(peek, true),
					center, extent, vector, matrix;
				if (typeof clockwise === 'boolean') {
					var middle = from.add(to).divide(2),
					through = middle.add(middle.subtract(from).rotate(
							clockwise ? -90 : 90));
				} else if (Base.remain(arguments) <= 2) {
					through = to;
					to = Point.read(arguments);
				} else {
					var radius = Size.read(arguments);
					if (radius.isZero())
						return this.lineTo(to);
					var rotation = Base.read(arguments),
						clockwise = !!Base.read(arguments),
						large = !!Base.read(arguments),
						middle = from.add(to).divide(2),
						pt = from.subtract(middle).rotate(-rotation),
						x = pt.x,
						y = pt.y,
						abs = Math.abs,
						rx = abs(radius.width),
						ry = abs(radius.height),
						rxSq = rx * rx,
						rySq = ry * ry,
						xSq =  x * x,
						ySq =  y * y;
					var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
					if (factor > 1) {
						rx *= factor;
						ry *= factor;
						rxSq = rx * rx;
						rySq = ry * ry;
					}
					factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
							(rxSq * ySq + rySq * xSq);
					if (abs(factor) < 1e-12)
						factor = 0;
					if (factor < 0)
						throw new Error(
								'Cannot create an arc with the given arguments');
					center = new Point(rx * y / ry, -ry * x / rx)
							.multiply((large === clockwise ? -1 : 1)
								* Math.sqrt(factor))
							.rotate(rotation).add(middle);
					matrix = new Matrix().translate(center).rotate(rotation)
							.scale(rx, ry);
					vector = matrix._inverseTransform(from);
					extent = vector.getDirectedAngle(matrix._inverseTransform(to));
					if (!clockwise && extent > 0)
						extent -= 360;
					else if (clockwise && extent < 0)
						extent += 360;
				}
				if (through) {
					var l1 = new Line(from.add(through).divide(2),
								through.subtract(from).rotate(90), true),
						l2 = new Line(through.add(to).divide(2),
								to.subtract(through).rotate(90), true),
						line = new Line(from, to),
						throughSide = line.getSide(through);
					center = l1.intersect(l2, true);
					if (!center) {
						if (!throughSide)
							return this.lineTo(to);
						throw new Error(
								'Cannot create an arc with the given arguments');
					}
					vector = from.subtract(center);
					extent = vector.getDirectedAngle(to.subtract(center));
					var centerSide = line.getSide(center);
					if (centerSide === 0) {
						extent = throughSide * Math.abs(extent);
					} else if (throughSide === centerSide) {
						extent += extent < 0 ? 360 : -360;
					}
				}
				var ext = Math.abs(extent),
					count = ext >= 360 ? 4 : Math.ceil(ext / 90),
					inc = extent / count,
					half = inc * Math.PI / 360,
					z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
					segments = [];
				for (var i = 0; i <= count; i++) {
					var pt = to,
						out = null;
					if (i < count) {
						out = vector.rotate(90).multiply(z);
						if (matrix) {
							pt = matrix._transformPoint(vector);
							out = matrix._transformPoint(vector.add(out))
									.subtract(pt);
						} else {
							pt = center.add(vector);
						}
					}
					if (i === 0) {
						current.setHandleOut(out);
					} else {
						var _in = vector.rotate(-90).multiply(z);
						if (matrix) {
							_in = matrix._transformPoint(vector.add(_in))
									.subtract(pt);
						}
						segments.push(new Segment(pt, _in, out));
					}
					vector = vector.rotate(inc);
				}
				this._add(segments);
			},
	
			lineBy: function() {
				var to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.lineTo(current.add(to));
			},
	
			curveBy: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					parameter = Base.read(arguments),
					current = getCurrentSegment(this)._point;
				this.curveTo(current.add(through), current.add(to), parameter);
			},
	
			cubicCurveBy: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(current.add(handle1), current.add(handle2),
						current.add(to));
			},
	
			quadraticCurveBy: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.quadraticCurveTo(current.add(handle), current.add(to));
			},
	
			arcBy: function() {
				var current = getCurrentSegment(this)._point,
					point = current.add(Point.read(arguments)),
					clockwise = Base.pick(Base.peek(arguments), true);
				if (typeof clockwise === 'boolean') {
					this.arcTo(point, clockwise);
				} else {
					this.arcTo(point, current.add(Point.read(arguments)));
				}
			},
	
			closePath: function(join) {
				this.setClosed(true);
				if (join)
					this.join();
			}
		};
	}, {
	
		_getBounds: function(getter, matrix) {
			return Path[getter](this._segments, this._closed, this.getStyle(),
					matrix);
		},
	
	statics: {
		getBounds: function(segments, closed, style, matrix, strokePadding) {
			var first = segments[0];
			if (!first)
				return new Rectangle();
			var coords = new Array(6),
				prevCoords = first._transformCoordinates(matrix, new Array(6), false),
				min = prevCoords.slice(0, 2),
				max = min.slice(),
				roots = new Array(2);
	
			function processSegment(segment) {
				segment._transformCoordinates(matrix, coords, false);
				for (var i = 0; i < 2; i++) {
					Curve._addBounds(
						prevCoords[i],
						prevCoords[i + 4],
						coords[i + 2],
						coords[i],
						i, strokePadding ? strokePadding[i] : 0, min, max, roots);
				}
				var tmp = prevCoords;
				prevCoords = coords;
				coords = tmp;
			}
	
			for (var i = 1, l = segments.length; i < l; i++)
				processSegment(segments[i]);
			if (closed)
				processSegment(first);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},
	
		getStrokeBounds: function(segments, closed, style, matrix) {
			if (!style.hasStroke())
				return Path.getBounds(segments, closed, style, matrix);
			var length = segments.length - (closed ? 0 : 1),
				radius = style.getStrokeWidth() / 2,
				padding = Path._getPenPadding(radius, matrix),
				bounds = Path.getBounds(segments, closed, style, matrix, padding),
				join = style.getStrokeJoin(),
				cap = style.getStrokeCap(),
				miterLimit = radius * style.getMiterLimit();
			var joinBounds = new Rectangle(new Size(padding).multiply(2));
	
			function add(point) {
				bounds = bounds.include(matrix
					? matrix._transformPoint(point, point) : point);
			}
	
			function addRound(segment) {
				bounds = bounds.unite(joinBounds.setCenter(matrix
					? matrix._transformPoint(segment._point) : segment._point));
			}
	
			function addJoin(segment, join) {
				var handleIn = segment._handleIn,
					handleOut = segment._handleOut;
				if (join === 'round' || !handleIn.isZero() && !handleOut.isZero()
						&& handleIn.isCollinear(handleOut)) {
					addRound(segment);
				} else {
					Path._addBevelJoin(segment, join, radius, miterLimit, add);
				}
			}
	
			function addCap(segment, cap) {
				if (cap === 'round') {
					addRound(segment);
				} else {
					Path._addSquareCap(segment, cap, radius, add);
				}
			}
	
			for (var i = 1; i < length; i++)
				addJoin(segments[i], join);
			if (closed) {
				addJoin(segments[0], join);
			} else if (length > 0) {
				addCap(segments[0], cap);
				addCap(segments[segments.length - 1], cap);
			}
			return bounds;
		},
	
		_getPenPadding: function(radius, matrix) {
			if (!matrix)
				return [radius, radius];
			var mx = matrix.shiftless(),
				hor = mx.transform(new Point(radius, 0)),
				ver = mx.transform(new Point(0, radius)),
				phi = hor.getAngleInRadians(),
				a = hor.getLength(),
				b = ver.getLength();
			var sin = Math.sin(phi),
				cos = Math.cos(phi),
				tan = Math.tan(phi),
				tx = -Math.atan(b * tan / a),
				ty = Math.atan(b / (tan * a));
			return [Math.abs(a * Math.cos(tx) * cos - b * Math.sin(tx) * sin),
					Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
		},
	
		_addBevelJoin: function(segment, join, radius, miterLimit, addPoint, area) {
			var curve2 = segment.getCurve(),
				curve1 = curve2.getPrevious(),
				point = curve2.getPointAt(0, true),
				normal1 = curve1.getNormalAt(1, true),
				normal2 = curve2.getNormalAt(0, true),
				step = normal1.getDirectedAngle(normal2) < 0 ? -radius : radius;
			normal1.setLength(step);
			normal2.setLength(step);
			if (area) {
				addPoint(point);
				addPoint(point.add(normal1));
			}
			if (join === 'miter') {
				var corner = new Line(
						point.add(normal1),
						new Point(-normal1.y, normal1.x), true
					).intersect(new Line(
						point.add(normal2),
						new Point(-normal2.y, normal2.x), true
					), true);
				if (corner && point.getDistance(corner) <= miterLimit) {
					addPoint(corner);
					if (!area)
						return;
				}
			}
			if (!area)
				addPoint(point.add(normal1));
			addPoint(point.add(normal2));
		},
	
		_addSquareCap: function(segment, cap, radius, addPoint, area) {
			var point = segment._point,
				loc = segment.getLocation(),
				normal = loc.getNormal().multiply(radius);
			if (area) {
				addPoint(point.subtract(normal));
				addPoint(point.add(normal));
			}
			if (cap === 'square')
				point = point.add(normal.rotate(loc.getParameter() === 0 ? -90 : 90));
			addPoint(point.add(normal));
			addPoint(point.subtract(normal));
		},
	
		getHandleBounds: function(segments, closed, style, matrix, strokePadding,
				joinPadding) {
			var coords = new Array(6),
				x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				for (var j = 0; j < 6; j += 2) {
					var padding = j === 0 ? joinPadding : strokePadding,
						paddingX = padding ? padding[0] : 0,
						paddingY = padding ? padding[1] : 0,
						x = coords[j],
						y = coords[j + 1],
						xn = x - paddingX,
						xx = x + paddingX,
						yn = y - paddingY,
						yx = y + paddingY;
					if (xn < x1) x1 = xn;
					if (xx > x2) x2 = xx;
					if (yn < y1) y1 = yn;
					if (yx > y2) y2 = yx;
				}
			}
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		getRoughBounds: function(segments, closed, style, matrix) {
			var strokeRadius = style.hasStroke() ? style.getStrokeWidth() / 2 : 0,
				joinRadius = strokeRadius;
			if (strokeRadius > 0) {
				if (style.getStrokeJoin() === 'miter')
					joinRadius = strokeRadius * style.getMiterLimit();
				if (style.getStrokeCap() === 'square')
					joinRadius = Math.max(joinRadius, strokeRadius * Math.sqrt(2));
			}
			return Path.getHandleBounds(segments, closed, style, matrix,
					Path._getPenPadding(strokeRadius, matrix),
					Path._getPenPadding(joinRadius, matrix));
		}
	}});
	
	Path.inject({ statics: new function() {
	
		var kappa = 0.5522847498307936,
			ellipseSegments = [
				new Segment([-1, 0], [0, kappa ], [0, -kappa]),
				new Segment([0, -1], [-kappa, 0], [kappa, 0 ]),
				new Segment([1, 0], [0, -kappa], [0, kappa ]),
				new Segment([0, 1], [kappa, 0 ], [-kappa, 0])
			];
	
		function createPath(segments, closed, args) {
			var props = Base.getNamed(args),
				path = new Path(props && props.insert === false && Item.NO_INSERT);
			path._add(segments);
			path._closed = closed;
			return path.set(props);
		}
	
		function createEllipse(center, radius, args) {
			var segments = new Array(4);
			for (var i = 0; i < 4; i++) {
				var segment = ellipseSegments[i];
				segments[i] = new Segment(
					segment._point.multiply(radius).add(center),
					segment._handleIn.multiply(radius),
					segment._handleOut.multiply(radius)
				);
			}
			return createPath(segments, true, args);
		}
	
		return {
			Line: function() {
				return createPath([
					new Segment(Point.readNamed(arguments, 'from')),
					new Segment(Point.readNamed(arguments, 'to'))
				], false, arguments);
			},
	
			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createEllipse(center, new Size(radius), arguments);
			},
	
			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.readNamed(arguments, 'radius', 0,
							{ readNull: true }),
					bl = rect.getBottomLeft(true),
					tl = rect.getTopLeft(true),
					tr = rect.getTopRight(true),
					br = rect.getBottomRight(true),
					segments;
				if (!radius || radius.isZero()) {
					segments = [
						new Segment(bl),
						new Segment(tl),
						new Segment(tr),
						new Segment(br)
					];
				} else {
					radius = Size.min(radius, rect.getSize(true).divide(2));
					var rx = radius.width,
						ry = radius.height,
						hx = rx * kappa,
						hy = ry * kappa;
					segments = [
						new Segment(bl.add(rx, 0), null, [-hx, 0]),
						new Segment(bl.subtract(0, ry), [0, hy]),
						new Segment(tl.add(0, ry), null, [0, -hy]),
						new Segment(tl.add(rx, 0), [-hx, 0], null),
						new Segment(tr.subtract(rx, 0), null, [hx, 0]),
						new Segment(tr.add(0, ry), [0, -hy], null),
						new Segment(br.subtract(0, ry), null, [0, hy]),
						new Segment(br.subtract(rx, 0), [hx, 0])
					];
				}
				return createPath(segments, true, arguments);
			},
	
			RoundRectangle: '#Rectangle',
	
			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments);
				return createEllipse(ellipse.center, ellipse.radius, arguments);
			},
	
			Oval: '#Ellipse',
	
			Arc: function() {
				var from = Point.readNamed(arguments, 'from'),
					through = Point.readNamed(arguments, 'through'),
					to = Point.readNamed(arguments, 'to'),
					props = Base.getNamed(arguments),
					path = new Path(props && props.insert === false
							&& Item.NO_INSERT);
				path.moveTo(from);
				path.arcTo(through, to);
				return path.set(props);
			},
	
			RegularPolygon: function() {
				var center = Point.readNamed(arguments, 'center'),
					sides = Base.readNamed(arguments, 'sides'),
					radius = Base.readNamed(arguments, 'radius'),
					step = 360 / sides,
					three = !(sides % 3),
					vector = new Point(0, three ? -radius : radius),
					offset = three ? -1 : 0.5,
					segments = new Array(sides);
				for (var i = 0; i < sides; i++)
					segments[i] = new Segment(center.add(
						vector.rotate((i + offset) * step)));
				return createPath(segments, true, arguments);
			},
	
			Star: function() {
				var center = Point.readNamed(arguments, 'center'),
					points = Base.readNamed(arguments, 'points') * 2,
					radius1 = Base.readNamed(arguments, 'radius1'),
					radius2 = Base.readNamed(arguments, 'radius2'),
					step = 360 / points,
					vector = new Point(0, -1),
					segments = new Array(points);
				for (var i = 0; i < points; i++)
					segments[i] = new Segment(center.add(vector.rotate(step * i)
							.multiply(i % 2 ? radius2 : radius1)));
				return createPath(segments, true, arguments);
			}
		};
	}});
	
	var CompoundPath = PathItem.extend({
		_class: 'CompoundPath',
		_serializeFields: {
			children: []
		},
	
		initialize: function CompoundPath(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg)) {
				if (typeof arg === 'string') {
					this.setPathData(arg);
				} else {
					this.addChildren(Array.isArray(arg) ? arg : arguments);
				}
			}
		},
	
		insertChildren: function insertChildren(index, items, _preserve) {
			for (var i = items.length - 1; i >= 0; i--) {
				var item = items[i];
				if (item instanceof CompoundPath) {
					items.splice.apply(items, [i, 1].concat(item.removeChildren()));
					item.remove();
				}
			}
			items = insertChildren.base.call(this, index, items, _preserve, Path);
			for (var i = 0, l = !_preserve && items && items.length; i < l; i++) {
				var item = items[i];
				if (item._clockwise === undefined)
					item.setClockwise(item._index === 0);
			}
			return items;
		},
	
		reverse: function() {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++)
				children[i].reverse();
		},
	
		smooth: function() {
			for (var i = 0, l = this._children.length; i < l; i++)
				this._children[i].smooth();
		},
	
		reduce: function reduce() {
			var children = this._children;
			for (var i = children.length - 1; i >= 0; i--) {
				var path = children[i].reduce();
				if (path.isEmpty())
					children.splice(i, 1);
			}
			if (children.length === 0) {
				var path = new Path(Item.NO_INSERT);
				path.insertAbove(this);
				path.setStyle(this._style);
				this.remove();
				return path;
			}
			return reduce.base.call(this);
		},
	
		isClockwise: function() {
			var child = this.getFirstChild();
			return child && child.isClockwise();
		},
	
		setClockwise: function(clockwise) {
			if (this.isClockwise() !== !!clockwise)
				this.reverse();
		},
	
		getFirstSegment: function() {
			var first = this.getFirstChild();
			return first && first.getFirstSegment();
		},
	
		getLastSegment: function() {
			var last = this.getLastChild();
			return last && last.getLastSegment();
		},
	
		getCurves: function() {
			var children = this._children,
				curves = [];
			for (var i = 0, l = children.length; i < l; i++)
				curves.push.apply(curves, children[i].getCurves());
			return curves;
		},
	
		getFirstCurve: function() {
			var first = this.getFirstChild();
			return first && first.getFirstCurve();
		},
	
		getLastCurve: function() {
			var last = this.getLastChild();
			return last && last.getFirstCurve();
		},
	
		getArea: function() {
			var children = this._children,
				area = 0;
			for (var i = 0, l = children.length; i < l; i++)
				area += children[i].getArea();
			return area;
		}
	}, {
		beans: true,
	
		getPathData: function(_matrix, _precision) {
			var children = this._children,
				paths = [];
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				paths.push(child.getPathData(_matrix && !mx.isIdentity()
						? _matrix.chain(mx) : _matrix, _precision));
			}
			return paths.join(' ');
		}
	}, {
		_getChildHitTestOptions: function(options) {
			return options.class === Path || options.type === 'path'
					? options
					: new Base(options, { fill: false });
		},
	
		_draw: function(ctx, param, strokeMatrix) {
			var children = this._children;
			if (children.length === 0)
				return;
	
			if (this._currentPath) {
				ctx.currentPath = this._currentPath;
			} else {
				param = param.extend({ dontStart: true, dontFinish: true });
				ctx.beginPath();
				for (var i = 0, l = children.length; i < l; i++)
					children[i].draw(ctx, param, strokeMatrix);
				this._currentPath = ctx.currentPath;
			}
	
			if (!param.clip) {
				this._setStyles(ctx);
				var style = this._style;
				if (style.hasFill()) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.stroke();
			}
		},
	
		_drawSelected: function(ctx, matrix, selectedItems) {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				if (!selectedItems[child._id])
					child._drawSelected(ctx, mx.isIdentity() ? matrix
							: matrix.chain(mx));
			}
		}
	},
	new function() {
		function getCurrentPath(that, check) {
			var children = that._children;
			if (check && children.length === 0)
				throw new Error('Use a moveTo() command first');
			return children[children.length - 1];
		}
	
		var fields = {
			moveTo: function() {
				var current = getCurrentPath(this),
					path = current && current.isEmpty() ? current
							: new Path(Item.NO_INSERT);
				if (path !== current)
					this.addChild(path);
				path.moveTo.apply(path, arguments);
			},
	
			moveBy: function() {
				var current = getCurrentPath(this, true),
					last = current && current.getLastSegment(),
					point = Point.read(arguments);
				this.moveTo(last ? point.add(last._point) : point);
			},
	
			closePath: function(join) {
				getCurrentPath(this, true).closePath(join);
			}
		};
	
		Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo', 'arcTo',
				'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy', 'arcBy'],
				function(key) {
					fields[key] = function() {
						var path = getCurrentPath(this, true);
						path[key].apply(path, arguments);
					};
				}
		);
	
		return fields;
	});
	
	PathItem.inject(new function() {
		var operators = {
			unite: function(w) {
				return w === 1 || w === 0;
			},
	
			intersect: function(w) {
				return w === 2;
			},
	
			subtract: function(w) {
				return w === 1;
			},
	
			exclude: function(w) {
				return w === 1;
			}
		};
	
		function preparePath(path, resolve) {
			var res = path.clone(false).reduce().transform(null, true, true);
			return resolve ? res.resolveCrossings().reorient() : res;
		}
	
		function finishBoolean(ctor, paths, path1, path2, reduce) {
			var result = new ctor(Item.NO_INSERT);
			result.addChildren(paths, true);
			if (reduce)
				result = result.reduce();
			result.insertAbove(path2 && path1.isSibling(path2)
					&& path1.getIndex() < path2.getIndex()
						? path2 : path1);
			result.setStyle(path1._style);
			return result;
		}
	
		function computeBoolean(path1, path2, operation) {
			if (!path1._children && !path1._closed)
				return computeOpenBoolean(path1, path2, operation);
			var _path1 = preparePath(path1, true),
				_path2 = path2 && path1 !== path2 && preparePath(path2, true);
			if (_path2 && /^(subtract|exclude)$/.test(operation)
					^ (_path2.isClockwise() !== _path1.isClockwise()))
				_path2.reverse();
			var intersections = CurveLocation.expand(
				_path1.getIntersections(_path2, function(inter) {
					return _path2 && inter.isOverlap() || inter.isCrossing();
				})
			);
			divideLocations(intersections);
	
			var segments = [],
				monoCurves = [];
	
			function collect(paths) {
				for (var i = 0, l = paths.length; i < l; i++) {
					var path = paths[i];
					segments.push.apply(segments, path._segments);
					monoCurves.push.apply(monoCurves, path._getMonoCurves());
				}
			}
	
			collect(_path1._children || [_path1]);
			if (_path2)
				collect(_path2._children || [_path2]);
			for (var i = 0, l = intersections.length; i < l; i++) {
				propagateWinding(intersections[i]._segment, _path1, _path2,
						monoCurves, operation);
			}
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				if (segment._winding == null) {
					propagateWinding(segment, _path1, _path2, monoCurves,
							operation);
				}
			}
			return finishBoolean(CompoundPath, tracePaths(segments, operation),
					path1, path2, true);
		}
	
		function computeOpenBoolean(path1, path2, operation) {
			if (!path2 || !path2._children && !path2._closed
					|| !/^(subtract|intersect)$/.test(operation))
				return null;
			var _path1 = preparePath(path1, false),
				_path2 = preparePath(path2, false),
				intersections = _path1.getIntersections(_path2, function(inter) {
					return inter.isOverlap() || inter.isCrossing();
				}),
				sub = operation === 'subtract',
				paths = [];
	
			function addPath(path) {
				if (_path2.contains(path.getPointAt(path.getLength() / 2)) ^ sub) {
					paths.unshift(path);
					return true;
				}
			}
	
			for (var i = intersections.length - 1; i >= 0; i--) {
				var path = intersections[i].split();
				if (path) {
					if (addPath(path))
						path.getFirstSegment().setHandleIn(0, 0);
					_path1.getLastSegment().setHandleOut(0, 0);
				}
			}
			addPath(_path1);
			return finishBoolean(Group, paths, path1, path2);
		}
	
		function linkIntersections(from, to) {
			var prev = from;
			while (prev) {
				if (prev === to)
					return;
				prev = prev._prev;
			}
			while (from._next && from._next !== to)
				from = from._next;
			if (!from._next) {
				while (to._prev)
					to = to._prev;
				from._next = to;
				to._prev = from;
			}
		}
	
		function divideLocations(locations) {
			var tMin = 4e-7,
				tMax = 1 - tMin,
				noHandles = false,
				clearSegments = [],
				prevCurve,
				prevT;
	
			for (var i = locations.length - 1; i >= 0; i--) {
				var loc = locations[i],
					curve = loc._curve,
					t = loc._parameter,
					origT = t;
				if (curve !== prevCurve) {
					noHandles = !curve.hasHandles();
				} else if (prevT > 0) {
					t /= prevT;
				}
				var segment;
				if (t < tMin) {
					segment = curve._segment1;
				} else if (t > tMax) {
					segment = curve._segment2;
				} else {
					segment = curve.divide(t, true, true)._segment1;
					if (noHandles)
						clearSegments.push(segment);
				}
				loc._setSegment(segment);
				var inter = segment._intersection,
					dest = loc._intersection;
				if (inter) {
					linkIntersections(inter, dest);
					var other = inter;
					while (other) {
						linkIntersections(other._intersection, inter);
						other = other._next;
					}
				} else {
					segment._intersection = dest;
				}
				prevCurve = curve;
				prevT = origT;
			}
			for (var i = 0, l = clearSegments.length; i < l; i++) {
				clearSegments[i].clearHandles();
			}
		}
	
		function getWinding(point, curves, horizontal, testContains) {
			var epsilon = 2e-7,
				tMin = 4e-7,
				tMax = 1 - tMin,
				px = point.x,
				py = point.y,
				windLeft = 0,
				windRight = 0,
				roots = [],
				abs = Math.abs;
			if (horizontal) {
				var yTop = -Infinity,
					yBottom = Infinity,
					yBefore = py - epsilon,
					yAfter = py + epsilon;
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if (Curve.solveCubic(values, 0, px, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--) {
							var y = Curve.getPoint(values, roots[j]).y;
							if (y < yBefore && y > yTop) {
								yTop = y;
							} else if (y > yAfter && y < yBottom) {
								yBottom = y;
							}
						}
					}
				}
				yTop = (yTop + py) / 2;
				yBottom = (yBottom + py) / 2;
				if (yTop > -Infinity)
					windLeft = getWinding(new Point(px, yTop), curves, false,
							testContains);
				if (yBottom < Infinity)
					windRight = getWinding(new Point(px, yBottom), curves, false,
							testContains);
			} else {
				var xBefore = px - epsilon,
					xAfter = px + epsilon;
				var startCounted = false,
					prevCurve,
					prevT;
				for (var i = 0, l = curves.length; i < l; i++) {
					var curve = curves[i],
						values = curve.values,
						winding = curve.winding;
					if (winding && (winding === 1
							&& py >= values[1] && py <= values[7]
							|| py >= values[7] && py <= values[1])
						&& Curve.solveCubic(values, 1, py, roots, 0, 1) === 1) {
						var t = roots[0];
						if (!(
							t > tMax && startCounted && curve.next !== curves[i + 1]
							|| t < tMin && prevT > tMax
								&& curve.previous === prevCurve)) {
							var x = Curve.getPoint(values, t).x,
								slope = Curve.getTangent(values, t).y,
								counted = false;
							if (Numerical.isZero(slope) && !Curve.isStraight(values)
									|| t < tMin && slope * Curve.getTangent(
										curve.previous.values, 1).y < 0
									|| t > tMax && slope * Curve.getTangent(
										curve.next.values, 0).y < 0) {
								if (testContains && x >= xBefore && x <= xAfter) {
									++windLeft;
									++windRight;
									counted = true;
								}
							} else if (x <= xBefore) {
								windLeft += winding;
								counted = true;
							} else if (x >= xAfter) {
								windRight += winding;
								counted = true;
							}
							if (curve.previous !== curves[i - 1])
								startCounted = t < tMin && counted;
						}
						prevCurve = curve;
						prevT = t;
					}
				}
			}
			return Math.max(abs(windLeft), abs(windRight));
		}
	
		function propagateWinding(segment, path1, path2, monoCurves, operation) {
			var epsilon = 2e-7,
				chain = [],
				start = segment,
				totalLength = 0,
				windingSum = 0;
			do {
				var curve = segment.getCurve(),
					length = curve.getLength();
				chain.push({ segment: segment, curve: curve, length: length });
				totalLength += length;
				segment = segment.getNext();
			} while (segment && !segment._intersection && segment !== start);
			for (var i = 0; i < 3; i++) {
				var length = totalLength * (i + 1) / 4;
				for (var k = 0, m = chain.length; k < m; k++) {
					var node = chain[k],
						curveLength = node.length;
					if (length <= curveLength) {
						if (length < epsilon || curveLength - length < epsilon)
							length = curveLength / 2;
						var curve = node.curve,
							path = curve._path,
							parent = path._parent,
							pt = curve.getPointAt(length),
							hor = curve.isHorizontal();
						if (parent instanceof CompoundPath)
							path = parent;
						windingSum += operation === 'subtract' && path2
							&& (path === path1 && path2._getWinding(pt, hor)
							|| path === path2 && !path1._getWinding(pt, hor))
							? 0
							: getWinding(pt, monoCurves, hor);
						break;
					}
					length -= curveLength;
				}
			}
			var winding = Math.round(windingSum / 3);
			for (var j = chain.length - 1; j >= 0; j--)
				chain[j].segment._winding = winding;
		}
	
		function tracePaths(segments, operation) {
			var paths = [],
				start,
				otherStart,
				operator = operators[operation],
				overlapWinding = {
					unite: { 1: 2 },
					intersect: { 2: 1 }
				}[operation];
	
			function isValid(seg, adjusted) {
				if (seg._visited)
					return false;
				if (!operator)
					return true;
				var winding = seg._winding,
					inter = seg._intersection;
				if (inter && adjusted && overlapWinding && inter.isOverlap())
					winding = overlapWinding[winding] || winding;
				return operator(winding);
			}
	
			function isStart(seg) {
				return seg === start || seg === otherStart;
			}
	
			function findBestIntersection(inter, strict) {
				if (!inter._next)
					return inter;
				while (inter) {
					var seg = inter._segment,
						nextSeg = seg.getNext(),
						nextInter = nextSeg._intersection;
					if (isStart(nextSeg)
						|| !seg._visited && !nextSeg._visited
						&& (!operator
							|| (!strict || isValid(seg))
							&& (!(strict && nextInter && nextInter.isOverlap())
								&& isValid(nextSeg)
								|| !strict && nextInter
								&& isValid(nextInter._segment))
						))
						return inter;
					inter = inter._next;
				}
				return null;
			}
	
			function findStartSegment(inter, next) {
				while (inter) {
					var seg = inter._segment;
					if (isStart(seg))
						return seg;
					inter = inter[next ? '_next' : '_prev'];
				}
			}
	
			for (var i = 0, l = segments.length; i < l; i++) {
				var seg = segments[i],
					path = null,
					finished = false;
				if (!isValid(seg, true))
					continue;
				start = otherStart = null;
				while (!finished) {
					var inter = seg._intersection,
						handleIn = path && seg._handleIn;
					inter = inter && (findBestIntersection(inter, true)
							|| findBestIntersection(inter, false)) || inter;
					var other = inter && inter._segment;
					if (other && isValid(other))
						seg = other;
					if (seg._visited) {
						finished = isStart(seg);
						if (!finished && inter) {
							var found = findStartSegment(inter, true)
								|| findStartSegment(inter, false);
							if (found) {
								seg = found;
								finished = true;
							}
						}
						break;
					}
					if (!path) {
						path = new Path(Item.NO_INSERT);
						start = seg;
						otherStart = other;
					}
					path.add(new Segment(seg._point, handleIn, seg._handleOut));
					seg._visited = true;
					seg = seg.getNext();
					finished = isStart(seg);
				}
				if (finished) {
					path.firstSegment.setHandleIn(seg._handleIn);
					path.setClosed(true);
				} else if (path) {
					console.error('Boolean operation resulted in open path',
							'segments =', path._segments.length,
							'length =', path.getLength());
					path = null;
				}
				if (path && (path._segments.length > 8
						|| !Numerical.isZero(path.getArea()))) {
					paths.push(path);
					path = null;
				}
			}
			return paths;
		}
	
		return {
			_getWinding: function(point, horizontal, testContains) {
				return getWinding(point, this._getMonoCurves(),
						horizontal, testContains);
			},
	
			unite: function(path) {
				return computeBoolean(this, path, 'unite');
			},
	
			intersect: function(path) {
				return computeBoolean(this, path, 'intersect');
			},
	
			subtract: function(path) {
				return computeBoolean(this, path, 'subtract');
			},
	
			exclude: function(path) {
				return computeBoolean(this, path, 'exclude');
			},
	
			divide: function(path) {
				return finishBoolean(Group,
						[this.subtract(path), this.intersect(path)],
						this, path, true);
			},
	
			resolveCrossings: function() {
				var crossings = this.getCrossings();
				if (!crossings.length)
					return this;
				divideLocations(CurveLocation.expand(crossings));
				var paths = this._children || [this],
					segments = [];
				for (var i = 0, l = paths.length; i < l; i++) {
					segments.push.apply(segments, paths[i]._segments);
				}
				return finishBoolean(CompoundPath, tracePaths(segments),
						this, null, false);
			}
		};
	});
	
	Path.inject({
		_getMonoCurves: function() {
			var monoCurves = this._monoCurves,
				prevCurve;
	
			function insertCurve(v) {
				var y0 = v[1],
					y1 = v[7],
					curve = {
						values: v,
						winding: y0 === y1
							? 0
							: y0 > y1
								? -1
								: 1,
						previous: prevCurve,
						next: null
					};
				if (prevCurve)
					prevCurve.next = curve;
				monoCurves.push(curve);
				prevCurve = curve;
			}
	
			function handleCurve(v) {
				if (Curve.getLength(v) === 0)
					return;
				var y0 = v[1],
					y1 = v[3],
					y2 = v[5],
					y3 = v[7];
				if (Curve.isStraight(v)) {
					insertCurve(v);
				} else {
					var a = 3 * (y1 - y2) - y0 + y3,
						b = 2 * (y0 + y2) - 4 * y1,
						c = y1 - y0,
						tMin = 4e-7,
						tMax = 1 - tMin,
						roots = [],
						n = Numerical.solveQuadratic(a, b, c, roots, tMin, tMax);
					if (n === 0) {
						insertCurve(v);
					} else {
						roots.sort();
						var t = roots[0],
							parts = Curve.subdivide(v, t);
						insertCurve(parts[0]);
						if (n > 1) {
							t = (roots[1] - t) / (1 - t);
							parts = Curve.subdivide(parts[1], t);
							insertCurve(parts[0]);
						}
						insertCurve(parts[1]);
					}
				}
			}
	
			if (!monoCurves) {
				monoCurves = this._monoCurves = [];
				var curves = this.getCurves(),
					segments = this._segments;
				for (var i = 0, l = curves.length; i < l; i++)
					handleCurve(curves[i].getValues());
				if (!this._closed && segments.length > 1) {
					var p1 = segments[segments.length - 1]._point,
						p2 = segments[0]._point,
						p1x = p1._x, p1y = p1._y,
						p2x = p2._x, p2y = p2._y;
					handleCurve([p1x, p1y, p1x, p1y, p2x, p2y, p2x, p2y]);
				}
				if (monoCurves.length > 0) {
					var first = monoCurves[0],
						last = monoCurves[monoCurves.length - 1];
					first.previous = last;
					last.next = first;
				}
			}
			return monoCurves;
		},
	
		getInteriorPoint: function() {
			var bounds = this.getBounds(),
				point = bounds.getCenter(true);
			if (!this.contains(point)) {
				var curves = this._getMonoCurves(),
					roots = [],
					y = point.y,
					xIntercepts = [];
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if ((curves[i].winding === 1
							&& y >= values[1] && y <= values[7]
							|| y >= values[7] && y <= values[1])
							&& Curve.solveCubic(values, 1, y, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--)
							xIntercepts.push(Curve.getPoint(values, roots[j]).x);
					}
					if (xIntercepts.length > 1)
						break;
				}
				point.x = (xIntercepts[0] + xIntercepts[1]) / 2;
			}
			return point;
		},
	
		reorient: function() {
			this.setClockwise(true);
			return this;
		}
	});
	
	CompoundPath.inject({
		_getMonoCurves: function() {
			var children = this._children,
				monoCurves = [];
			for (var i = 0, l = children.length; i < l; i++)
				monoCurves.push.apply(monoCurves, children[i]._getMonoCurves());
			return monoCurves;
		},
	
		reorient: function() {
			var children = this.removeChildren().sort(function(a, b) {
				return b.getBounds().getArea() - a.getBounds().getArea();
			});
			if (children.length > 0) {
				this.addChildren(children);
				var clockwise = children[0].isClockwise();
				for (var i = 1, l = children.length; i < l; i++) {
					var point = children[i].getInteriorPoint(),
						counters = 0;
					for (var j = i - 1; j >= 0; j--) {
						if (children[j].contains(point))
							counters++;
					}
					children[i].setClockwise(counters % 2 === 0 && clockwise);
				}
			}
			return this;
		}
	});
	
	var PathIterator = Base.extend({
		_class: 'PathIterator',
	
		initialize: function(path, maxRecursion, tolerance, matrix) {
			var curves = [],
				parts = [],
				length = 0,
				minDifference = 1 / (maxRecursion || 32),
				segments = path._segments,
				segment1 = segments[0],
				segment2;
	
			function addCurve(segment1, segment2) {
				var curve = Curve.getValues(segment1, segment2, matrix);
				curves.push(curve);
				computeParts(curve, segment1._index, 0, 1);
			}
	
			function computeParts(curve, index, minT, maxT) {
				if ((maxT - minT) > minDifference
						&& !Curve.isFlatEnough(curve, tolerance || 0.25)) {
					var split = Curve.subdivide(curve, 0.5),
						halfT = (minT + maxT) / 2;
					computeParts(split[0], index, minT, halfT);
					computeParts(split[1], index, halfT, maxT);
				} else {
					var x = curve[6] - curve[0],
						y = curve[7] - curve[1],
						dist = Math.sqrt(x * x + y * y);
					if (dist > 1e-6) {
						length += dist;
						parts.push({
							offset: length,
							value: maxT,
							index: index
						});
					}
				}
			}
	
			for (var i = 1, l = segments.length; i < l; i++) {
				segment2 = segments[i];
				addCurve(segment1, segment2);
				segment1 = segment2;
			}
			if (path._closed)
				addCurve(segment2, segments[0]);
	
			this.curves = curves;
			this.parts = parts;
			this.length = length;
			this.index = 0;
		},
	
		getParameterAt: function(offset) {
			var i, j = this.index;
			for (;;) {
				i = j;
				if (j == 0 || this.parts[--j].offset < offset)
					break;
			}
			for (var l = this.parts.length; i < l; i++) {
				var part = this.parts[i];
				if (part.offset >= offset) {
					this.index = i;
					var prev = this.parts[i - 1];
					var prevVal = prev && prev.index == part.index ? prev.value : 0,
						prevLen = prev ? prev.offset : 0;
					return {
						value: prevVal + (part.value - prevVal)
							* (offset - prevLen) / (part.offset - prevLen),
						index: part.index
					};
				}
			}
			var part = this.parts[this.parts.length - 1];
			return {
				value: 1,
				index: part.index
			};
		},
	
		drawPart: function(ctx, from, to) {
			from = this.getParameterAt(from);
			to = this.getParameterAt(to);
			for (var i = from.index; i <= to.index; i++) {
				var curve = Curve.getPart(this.curves[i],
						i == from.index ? from.value : 0,
						i == to.index ? to.value : 1);
				if (i == from.index)
					ctx.moveTo(curve[0], curve[1]);
				ctx.bezierCurveTo.apply(ctx, curve.slice(2));
			}
		}
	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, weighted) {
				var param = this.getParameterAt(offset);
				return Curve[name](this.curves[param.index], param.value, weighted);
			};
		}, {})
	);
	
	var PathFitter = Base.extend({
		initialize: function(path, error) {
			var points = this.points = [],
				segments = path._segments,
				prev;
			for (var i = 0, l = segments.length; i < l; i++) {
				var point = segments[i].point.clone();
				if (!prev || !prev.equals(point)) {
					points.push(point);
					prev = point;
				}
			}
	
			if (path._closed) {
				this.closed = true;
				points.unshift(points[points.length - 1]);
				points.push(points[1]);
			}
	
			this.error = error;
		},
	
		fit: function() {
			var points = this.points,
				length = points.length,
				segments = this.segments = length > 0
						? [new Segment(points[0])] : [];
			if (length > 1)
				this.fitCubic(0, length - 1,
					points[1].subtract(points[0]).normalize(),
					points[length - 2].subtract(points[length - 1]).normalize());
	
			if (this.closed) {
				segments.shift();
				segments.pop();
			}
	
			return segments;
		},
	
		fitCubic: function(first, last, tan1, tan2) {
			if (last - first == 1) {
				var pt1 = this.points[first],
					pt2 = this.points[last],
					dist = pt1.getDistance(pt2) / 3;
				this.addCurve([pt1, pt1.add(tan1.normalize(dist)),
						pt2.add(tan2.normalize(dist)), pt2]);
				return;
			}
			var uPrime = this.chordLengthParameterize(first, last),
				maxError = Math.max(this.error, this.error * this.error),
				split,
				parametersInOrder = true;
			for (var i = 0; i <= 4; i++) {
				var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
				var max = this.findMaxError(first, last, curve, uPrime);
				if (max.error < this.error && parametersInOrder) {
					this.addCurve(curve);
					return;
				}
				split = max.index;
				if (max.error >= maxError)
					break;
				parametersInOrder = this.reparameterize(first, last, uPrime, curve);
				maxError = max.error;
			}
			var V1 = this.points[split - 1].subtract(this.points[split]),
				V2 = this.points[split].subtract(this.points[split + 1]),
				tanCenter = V1.add(V2).divide(2).normalize();
			this.fitCubic(first, split, tan1, tanCenter);
			this.fitCubic(split, last, tanCenter.negate(), tan2);
		},
	
		addCurve: function(curve) {
			var prev = this.segments[this.segments.length - 1];
			prev.setHandleOut(curve[1].subtract(curve[0]));
			this.segments.push(
					new Segment(curve[3], curve[2].subtract(curve[3])));
		},
	
		generateBezier: function(first, last, uPrime, tan1, tan2) {
			var epsilon = 1e-12,
				pt1 = this.points[first],
				pt2 = this.points[last],
				C = [[0, 0], [0, 0]],
				X = [0, 0];
	
			for (var i = 0, l = last - first + 1; i < l; i++) {
				var u = uPrime[i],
					t = 1 - u,
					b = 3 * u * t,
					b0 = t * t * t,
					b1 = b * t,
					b2 = b * u,
					b3 = u * u * u,
					a1 = tan1.normalize(b1),
					a2 = tan2.normalize(b2),
					tmp = this.points[first + i]
						.subtract(pt1.multiply(b0 + b1))
						.subtract(pt2.multiply(b2 + b3));
				C[0][0] += a1.dot(a1);
				C[0][1] += a1.dot(a2);
				C[1][0] = C[0][1];
				C[1][1] += a2.dot(a2);
				X[0] += a1.dot(tmp);
				X[1] += a2.dot(tmp);
			}
	
			var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
				alpha1, alpha2;
			if (Math.abs(detC0C1) > epsilon) {
				var detC0X	= C[0][0] * X[1]	- C[1][0] * X[0],
					detXC1	= X[0]	  * C[1][1] - X[1]	  * C[0][1];
				alpha1 = detXC1 / detC0C1;
				alpha2 = detC0X / detC0C1;
			} else {
				var c0 = C[0][0] + C[0][1],
					c1 = C[1][0] + C[1][1];
				if (Math.abs(c0) > epsilon) {
					alpha1 = alpha2 = X[0] / c0;
				} else if (Math.abs(c1) > epsilon) {
					alpha1 = alpha2 = X[1] / c1;
				} else {
					alpha1 = alpha2 = 0;
				}
			}
	
			var segLength = pt2.getDistance(pt1),
				eps = epsilon * segLength,
				handle1,
				handle2;
			if (alpha1 < eps || alpha2 < eps) {
				alpha1 = alpha2 = segLength / 3;
			} else {
				var line = pt2.subtract(pt1);
				handle1 = tan1.normalize(alpha1);
				handle2 = tan2.normalize(alpha2);
				if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
					alpha1 = alpha2 = segLength / 3;
					handle1 = handle2 = null;
				}
			}
	
			return [pt1, pt1.add(handle1 || tan1.normalize(alpha1)),
					pt2.add(handle2 || tan2.normalize(alpha2)), pt2];
		},
	
		reparameterize: function(first, last, u, curve) {
			for (var i = first; i <= last; i++) {
				u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
			}
			for (var i = 1, l = u.length; i < l; i++) {
				if (u[i] <= u[i - 1])
					return false;
			}
			return true;
		},
	
		findRoot: function(curve, point, u) {
			var curve1 = [],
				curve2 = [];
			for (var i = 0; i <= 2; i++) {
				curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
			}
			for (var i = 0; i <= 1; i++) {
				curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
			}
			var pt = this.evaluate(3, curve, u),
				pt1 = this.evaluate(2, curve1, u),
				pt2 = this.evaluate(1, curve2, u),
				diff = pt.subtract(point),
				df = pt1.dot(pt1) + diff.dot(pt2);
			if (Math.abs(df) < 1e-6)
				return u;
			return u - diff.dot(pt1) / df;
		},
	
		evaluate: function(degree, curve, t) {
			var tmp = curve.slice();
			for (var i = 1; i <= degree; i++) {
				for (var j = 0; j <= degree - i; j++) {
					tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
				}
			}
			return tmp[0];
		},
	
		chordLengthParameterize: function(first, last) {
			var u = [0];
			for (var i = first + 1; i <= last; i++) {
				u[i - first] = u[i - first - 1]
						+ this.points[i].getDistance(this.points[i - 1]);
			}
			for (var i = 1, m = last - first; i <= m; i++) {
				u[i] /= u[m];
			}
			return u;
		},
	
		findMaxError: function(first, last, curve, u) {
			var index = Math.floor((last - first + 1) / 2),
				maxDist = 0;
			for (var i = first + 1; i < last; i++) {
				var P = this.evaluate(3, curve, u[i - first]);
				var v = P.subtract(this.points[i]);
				var dist = v.x * v.x + v.y * v.y;
				if (dist >= maxDist) {
					maxDist = dist;
					index = i;
				}
			}
			return {
				error: maxDist,
				index: index
			};
		}
	});
	
	var TextItem = Item.extend({
		_class: 'TextItem',
		_boundsSelected: true,
		_applyMatrix: false,
		_canApplyMatrix: false,
		_serializeFields: {
			content: null
		},
		_boundsGetter: 'getBounds',
	
		initialize: function TextItem(arg) {
			this._content = '';
			this._lines = [];
			var hasProps = arg && Base.isPlainObject(arg)
					&& arg.x === undefined && arg.y === undefined;
			this._initialize(hasProps && arg, !hasProps && Point.read(arguments));
		},
	
		_equals: function(item) {
			return this._content === item._content;
		},
	
		_clone: function _clone(copy, insert, includeMatrix) {
			copy.setContent(this._content);
			return _clone.base.call(this, copy, insert, includeMatrix);
		},
	
		getContent: function() {
			return this._content;
		},
	
		setContent: function(content) {
			this._content = '' + content;
			this._lines = this._content.split(/\r\n|\n|\r/mg);
			this._changed(265);
		},
	
		isEmpty: function() {
			return !this._content;
		},
	
		getCharacterStyle: '#getStyle',
		setCharacterStyle: '#setStyle',
	
		getParagraphStyle: '#getStyle',
		setParagraphStyle: '#setStyle'
	});
	
	var PointText = TextItem.extend({
		_class: 'PointText',
	
		initialize: function PointText() {
			TextItem.apply(this, arguments);
		},
	
		clone: function(insert) {
			return this._clone(new PointText(Item.NO_INSERT), insert);
		},
	
		getPoint: function() {
			var point = this._matrix.getTranslation();
			return new LinkedPoint(point.x, point.y, this, 'setPoint');
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this.translate(point.subtract(this._matrix.getTranslation()));
		},
	
		_draw: function(ctx) {
			if (!this._content)
				return;
			this._setStyles(ctx);
			var style = this._style,
				lines = this._lines,
				leading = style.getLeading(),
				shadowColor = ctx.shadowColor;
			ctx.font = style.getFontStyle();
			ctx.textAlign = style.getJustification();
			for (var i = 0, l = lines.length; i < l; i++) {
				ctx.shadowColor = shadowColor;
				var line = lines[i];
				if (style.hasFill()) {
					ctx.fillText(line, 0, 0);
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.strokeText(line, 0, 0);
				ctx.translate(0, leading);
			}
		},
	
		_getBounds: function(getter, matrix) {
			var style = this._style,
				lines = this._lines,
				numLines = lines.length,
				justification = style.getJustification(),
				leading = style.getLeading(),
				width = this.getView().getTextWidth(style.getFontStyle(), lines),
				x = 0;
			if (justification !== 'left')
				x -= width / (justification === 'center' ? 2: 1);
			var bounds = new Rectangle(x,
						numLines ? - 0.75 * leading : 0,
						width, numLines * leading);
			return matrix ? matrix._transformBounds(bounds, bounds) : bounds;
		}
	});
	
	var Color = Base.extend(new function() {
		var types = {
			gray: ['gray'],
			rgb: ['red', 'green', 'blue'],
			hsb: ['hue', 'saturation', 'brightness'],
			hsl: ['hue', 'saturation', 'lightness'],
			gradient: ['gradient', 'origin', 'destination', 'highlight']
		};
	
		var componentParsers = {},
			colorCache = {},
			colorCtx;
	
		function fromCSS(string) {
			var match = string.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/),
				components;
			if (match) {
				components = [0, 0, 0];
				for (var i = 0; i < 3; i++) {
					var value = match[i + 1];
					components[i] = parseInt(value.length == 1
							? value + value : value, 16) / 255;
				}
			} else if (match = string.match(/^rgba?\((.*)\)$/)) {
				components = match[1].split(',');
				for (var i = 0, l = components.length; i < l; i++) {
					var value = +components[i];
					components[i] = i < 3 ? value / 255 : value;
				}
			} else {
				var cached = colorCache[string];
				if (!cached) {
					if (!colorCtx) {
						colorCtx = CanvasProvider.getContext(1, 1);
						colorCtx.globalCompositeOperation = 'copy';
					}
					colorCtx.fillStyle = 'rgba(0,0,0,0)';
					colorCtx.fillStyle = string;
					colorCtx.fillRect(0, 0, 1, 1);
					var data = colorCtx.getImageData(0, 0, 1, 1).data;
					cached = colorCache[string] = [
						data[0] / 255,
						data[1] / 255,
						data[2] / 255
					];
				}
				components = cached.slice();
			}
			return components;
		}
	
		var hsbIndices = [
			[0, 3, 1],
			[2, 0, 1],
			[1, 0, 3],
			[1, 2, 0],
			[3, 1, 0],
			[0, 1, 2]
		];
	
		var converters = {
			'rgb-hsb': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					h = delta === 0 ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60;
				return [h, max === 0 ? 0 : delta / max, max];
			},
	
			'hsb-rgb': function(h, s, b) {
				h = (((h / 60) % 6) + 6) % 6;
				var i = Math.floor(h),
					f = h - i,
					i = hsbIndices[i],
					v = [
						b,
						b * (1 - s),
						b * (1 - s * f),
						b * (1 - s * (1 - f))
					];
				return [v[i[0]], v[i[1]], v[i[2]]];
			},
	
			'rgb-hsl': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					achromatic = delta === 0,
					h = achromatic ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60,
					l = (max + min) / 2,
					s = achromatic ? 0 : l < 0.5
							? delta / (max + min)
							: delta / (2 - max - min);
				return [h, s, l];
			},
	
			'hsl-rgb': function(h, s, l) {
				h = (((h / 360) % 1) + 1) % 1;
				if (s === 0)
					return [l, l, l];
				var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
					t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
					t1 = 2 * l - t2,
					c = [];
				for (var i = 0; i < 3; i++) {
					var t3 = t3s[i];
					if (t3 < 0) t3 += 1;
					if (t3 > 1) t3 -= 1;
					c[i] = 6 * t3 < 1
						? t1 + (t2 - t1) * 6 * t3
						: 2 * t3 < 1
							? t2
							: 3 * t3 < 2
								? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
								: t1;
				}
				return c;
			},
	
			'rgb-gray': function(r, g, b) {
				return [r * 0.2989 + g * 0.587 + b * 0.114];
			},
	
			'gray-rgb': function(g) {
				return [g, g, g];
			},
	
			'gray-hsb': function(g) {
				return [0, 0, g];
			},
	
			'gray-hsl': function(g) {
				return [0, 0, g];
			},
	
			'gradient-rgb': function() {
				return [];
			},
	
			'rgb-gradient': function() {
				return [];
			}
	
		};
	
		return Base.each(types, function(properties, type) {
			componentParsers[type] = [];
			Base.each(properties, function(name, index) {
				var part = Base.capitalize(name),
					hasOverlap = /^(hue|saturation)$/.test(name),
					parser = componentParsers[type][index] = name === 'gradient'
						? function(value) {
							var current = this._components[0];
							value = Gradient.read(Array.isArray(value) ? value
									: arguments, 0, { readNull: true });
							if (current !== value) {
								if (current)
									current._removeOwner(this);
								if (value)
									value._addOwner(this);
							}
							return value;
						}
						: type === 'gradient'
							? function() {
								return Point.read(arguments, 0, {
										readNull: name === 'highlight',
										clone: true
								});
							}
							: function(value) {
								return value == null || isNaN(value) ? 0 : value;
							};
	
				this['get' + part] = function() {
					return this._type === type
						|| hasOverlap && /^hs[bl]$/.test(this._type)
							? this._components[index]
							: this._convert(type)[index];
				};
	
				this['set' + part] = function(value) {
					if (this._type !== type
							&& !(hasOverlap && /^hs[bl]$/.test(this._type))) {
						this._components = this._convert(type);
						this._properties = types[type];
						this._type = type;
					}
					this._components[index] = parser.call(this, value);
					this._changed();
				};
			}, this);
		}, {
			_class: 'Color',
			_readIndex: true,
	
			initialize: function Color(arg) {
				var slice = Array.prototype.slice,
					args = arguments,
					read = 0,
					type,
					components,
					alpha,
					values;
				if (Array.isArray(arg)) {
					args = arg;
					arg = args[0];
				}
				var argType = arg != null && typeof arg;
				if (argType === 'string' && arg in types) {
					type = arg;
					arg = args[1];
					if (Array.isArray(arg)) {
						components = arg;
						alpha = args[2];
					} else {
						if (this.__read)
							read = 1;
						args = slice.call(args, 1);
						argType = typeof arg;
					}
				}
				if (!components) {
					values = argType === 'number'
							? args
							: argType === 'object' && arg.length != null
								? arg
								: null;
					if (values) {
						if (!type)
							type = values.length >= 3
									? 'rgb'
									: 'gray';
						var length = types[type].length;
						alpha = values[length];
						if (this.__read)
							read += values === arguments
								? length + (alpha != null ? 1 : 0)
								: 1;
						if (values.length > length)
							values = slice.call(values, 0, length);
					} else if (argType === 'string') {
						type = 'rgb';
						components = fromCSS(arg);
						if (components.length === 4) {
							alpha = components[3];
							components.length--;
						}
					} else if (argType === 'object') {
						if (arg.constructor === Color) {
							type = arg._type;
							components = arg._components.slice();
							alpha = arg._alpha;
							if (type === 'gradient') {
								for (var i = 1, l = components.length; i < l; i++) {
									var point = components[i];
									if (point)
										components[i] = point.clone();
								}
							}
						} else if (arg.constructor === Gradient) {
							type = 'gradient';
							values = args;
						} else {
							type = 'hue' in arg
								? 'lightness' in arg
									? 'hsl'
									: 'hsb'
								: 'gradient' in arg || 'stops' in arg
										|| 'radial' in arg
									? 'gradient'
									: 'gray' in arg
										? 'gray'
										: 'rgb';
							var properties = types[type],
								parsers = componentParsers[type];
							this._components = components = [];
							for (var i = 0, l = properties.length; i < l; i++) {
								var value = arg[properties[i]];
								if (value == null && i === 0 && type === 'gradient'
										&& 'stops' in arg) {
									value = {
										stops: arg.stops,
										radial: arg.radial
									};
								}
								value = parsers[i].call(this, value);
								if (value != null)
									components[i] = value;
							}
							alpha = arg.alpha;
						}
					}
					if (this.__read && type)
						read = 1;
				}
				this._type = type || 'rgb';
				this._id = UID.get(Color);
				if (!components) {
					this._components = components = [];
					var parsers = componentParsers[this._type];
					for (var i = 0, l = parsers.length; i < l; i++) {
						var value = parsers[i].call(this, values && values[i]);
						if (value != null)
							components[i] = value;
					}
				}
				this._components = components;
				this._properties = types[this._type];
				this._alpha = alpha;
				if (this.__read)
					this.__read = read;
			},
	
			_serialize: function(options, dictionary) {
				var components = this.getComponents();
				return Base.serialize(
						/^(gray|rgb)$/.test(this._type)
							? components
							: [this._type].concat(components),
						options, true, dictionary);
			},
	
			_changed: function() {
				this._canvasStyle = null;
				if (this._owner)
					this._owner._changed(65);
			},
	
			_convert: function(type) {
				var converter;
				return this._type === type
						? this._components.slice()
						: (converter = converters[this._type + '-' + type])
							? converter.apply(this, this._components)
							: converters['rgb-' + type].apply(this,
								converters[this._type + '-rgb'].apply(this,
									this._components));
			},
	
			convert: function(type) {
				return new Color(type, this._convert(type), this._alpha);
			},
	
			getType: function() {
				return this._type;
			},
	
			setType: function(type) {
				this._components = this._convert(type);
				this._properties = types[type];
				this._type = type;
			},
	
			getComponents: function() {
				var components = this._components.slice();
				if (this._alpha != null)
					components.push(this._alpha);
				return components;
			},
	
			getAlpha: function() {
				return this._alpha != null ? this._alpha : 1;
			},
	
			setAlpha: function(alpha) {
				this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
				this._changed();
			},
	
			hasAlpha: function() {
				return this._alpha != null;
			},
	
			equals: function(color) {
				var col = Base.isPlainValue(color, true)
						? Color.read(arguments)
						: color;
				return col === this || col && this._class === col._class
						&& this._type === col._type
						&& this._alpha === col._alpha
						&& Base.equals(this._components, col._components)
						|| false;
			},
	
			toString: function() {
				var properties = this._properties,
					parts = [],
					isGradient = this._type === 'gradient',
					f = Formatter.instance;
				for (var i = 0, l = properties.length; i < l; i++) {
					var value = this._components[i];
					if (value != null)
						parts.push(properties[i] + ': '
								+ (isGradient ? value : f.number(value)));
				}
				if (this._alpha != null)
					parts.push('alpha: ' + f.number(this._alpha));
				return '{ ' + parts.join(', ') + ' }';
			},
	
			toCSS: function(hex) {
				var components = this._convert('rgb'),
					alpha = hex || this._alpha == null ? 1 : this._alpha;
				function convert(val) {
					return Math.round((val < 0 ? 0 : val > 1 ? 1 : val) * 255);
				}
				components = [
					convert(components[0]),
					convert(components[1]),
					convert(components[2])
				];
				if (alpha < 1)
					components.push(alpha < 0 ? 0 : alpha);
				return hex
						? '#' + ((1 << 24) + (components[0] << 16)
							+ (components[1] << 8)
							+ components[2]).toString(16).slice(1)
						: (components.length == 4 ? 'rgba(' : 'rgb(')
							+ components.join(',') + ')';
			},
	
			toCanvasStyle: function(ctx) {
				if (this._canvasStyle)
					return this._canvasStyle;
				if (this._type !== 'gradient')
					return this._canvasStyle = this.toCSS();
				var components = this._components,
					gradient = components[0],
					stops = gradient._stops,
					origin = components[1],
					destination = components[2],
					canvasGradient;
				if (gradient._radial) {
					var radius = destination.getDistance(origin),
						highlight = components[3];
					if (highlight) {
						var vector = highlight.subtract(origin);
						if (vector.getLength() > radius)
							highlight = origin.add(vector.normalize(radius - 0.1));
					}
					var start = highlight || origin;
					canvasGradient = ctx.createRadialGradient(start.x, start.y,
							0, origin.x, origin.y, radius);
				} else {
					canvasGradient = ctx.createLinearGradient(origin.x, origin.y,
							destination.x, destination.y);
				}
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i];
					canvasGradient.addColorStop(stop._rampPoint,
							stop._color.toCanvasStyle());
				}
				return this._canvasStyle = canvasGradient;
			},
	
			transform: function(matrix) {
				if (this._type === 'gradient') {
					var components = this._components;
					for (var i = 1, l = components.length; i < l; i++) {
						var point = components[i];
						matrix._transformPoint(point, point, true);
					}
					this._changed();
				}
			},
	
			statics: {
				_types: types,
	
				random: function() {
					var random = Math.random;
					return new Color(random(), random(), random());
				}
			}
		});
	},
	new function() {
		var operators = {
			add: function(a, b) {
				return a + b;
			},
	
			subtract: function(a, b) {
				return a - b;
			},
	
			multiply: function(a, b) {
				return a * b;
			},
	
			divide: function(a, b) {
				return a / b;
			}
		};
	
		return Base.each(operators, function(operator, name) {
			this[name] = function(color) {
				color = Color.read(arguments);
				var type = this._type,
					components1 = this._components,
					components2 = color._convert(type);
				for (var i = 0, l = components1.length; i < l; i++)
					components2[i] = operator(components1[i], components2[i]);
				return new Color(type, components2,
						this._alpha != null
								? operator(this._alpha, color.getAlpha())
								: null);
			};
		}, {
		});
	});
	
	var Gradient = Base.extend({
		_class: 'Gradient',
	
		initialize: function Gradient(stops, radial) {
			this._id = UID.get();
			if (stops && this._set(stops))
				stops = radial = null;
			if (!this._stops)
				this.setStops(stops || ['white', 'black']);
			if (this._radial == null)
				this.setRadial(typeof radial === 'string' && radial === 'radial'
						|| radial || false);
		},
	
		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._stops, this._radial],
						options, true, dictionary);
			});
		},
	
		_changed: function() {
			for (var i = 0, l = this._owners && this._owners.length; i < l; i++)
				this._owners[i]._changed();
		},
	
		_addOwner: function(color) {
			if (!this._owners)
				this._owners = [];
			this._owners.push(color);
		},
	
		_removeOwner: function(color) {
			var index = this._owners ? this._owners.indexOf(color) : -1;
			if (index != -1) {
				this._owners.splice(index, 1);
				if (this._owners.length === 0)
					this._owners = undefined;
			}
		},
	
		clone: function() {
			var stops = [];
			for (var i = 0, l = this._stops.length; i < l; i++)
				stops[i] = this._stops[i].clone();
			return new Gradient(stops, this._radial);
		},
	
		getStops: function() {
			return this._stops;
		},
	
		setStops: function(stops) {
			if (this.stops) {
				for (var i = 0, l = this._stops.length; i < l; i++)
					this._stops[i]._owner = undefined;
			}
			if (stops.length < 2)
				throw new Error(
						'Gradient stop list needs to contain at least two stops.');
			this._stops = GradientStop.readAll(stops, 0, { clone: true });
			for (var i = 0, l = this._stops.length; i < l; i++) {
				var stop = this._stops[i];
				stop._owner = this;
				if (stop._defaultRamp)
					stop.setRampPoint(i / (l - 1));
			}
			this._changed();
		},
	
		getRadial: function() {
			return this._radial;
		},
	
		setRadial: function(radial) {
			this._radial = radial;
			this._changed();
		},
	
		equals: function(gradient) {
			if (gradient === this)
				return true;
			if (gradient && this._class === gradient._class
					&& this._stops.length === gradient._stops.length) {
				for (var i = 0, l = this._stops.length; i < l; i++) {
					if (!this._stops[i].equals(gradient._stops[i]))
						return false;
				}
				return true;
			}
			return false;
		}
	});
	
	var GradientStop = Base.extend({
		_class: 'GradientStop',
	
		initialize: function GradientStop(arg0, arg1) {
			if (arg0) {
				var color, rampPoint;
				if (arg1 === undefined && Array.isArray(arg0)) {
					color = arg0[0];
					rampPoint = arg0[1];
				} else if (arg0.color) {
					color = arg0.color;
					rampPoint = arg0.rampPoint;
				} else {
					color = arg0;
					rampPoint = arg1;
				}
				this.setColor(color);
				this.setRampPoint(rampPoint);
			}
		},
	
		clone: function() {
			return new GradientStop(this._color.clone(), this._rampPoint);
		},
	
		_serialize: function(options, dictionary) {
			return Base.serialize([this._color, this._rampPoint], options, true,
					dictionary);
		},
	
		_changed: function() {
			if (this._owner)
				this._owner._changed(65);
		},
	
		getRampPoint: function() {
			return this._rampPoint;
		},
	
		setRampPoint: function(rampPoint) {
			this._defaultRamp = rampPoint == null;
			this._rampPoint = rampPoint || 0;
			this._changed();
		},
	
		getColor: function() {
			return this._color;
		},
	
		setColor: function(color) {
			this._color = Color.read(arguments);
			if (this._color === color)
				this._color = color.clone();
			this._color._owner = this;
			this._changed();
		},
	
		equals: function(stop) {
			return stop === this || stop && this._class === stop._class
					&& this._color.equals(stop._color)
					&& this._rampPoint == stop._rampPoint
					|| false;
		}
	});
	
	var Style = Base.extend(new function() {
		var defaults = {
			fillColor: undefined,
			strokeColor: undefined,
			strokeWidth: 1,
			strokeCap: 'butt',
			strokeJoin: 'miter',
			strokeScaling: true,
			miterLimit: 10,
			dashOffset: 0,
			dashArray: [],
			windingRule: 'nonzero',
			shadowColor: undefined,
			shadowBlur: 0,
			shadowOffset: new Point(),
			selectedColor: undefined,
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
			fontSize: 12,
			font: 'sans-serif',
			leading: null,
			justification: 'left'
		};
	
		var flags = {
			strokeWidth: 97,
			strokeCap: 97,
			strokeJoin: 97,
			strokeScaling: 105,
			miterLimit: 97,
			fontFamily: 9,
			fontWeight: 9,
			fontSize: 9,
			font: 9,
			leading: 9,
			justification: 9
		};
	
		var item = { beans: true },
			fields = {
				_defaults: defaults,
				_textDefaults: new Base(defaults, {
					fillColor: new Color()
				}),
				beans: true
			};
	
		Base.each(defaults, function(value, key) {
			var isColor = /Color$/.test(key),
				isPoint = key === 'shadowOffset',
				part = Base.capitalize(key),
				flag = flags[key],
				set = 'set' + part,
				get = 'get' + part;
	
			fields[set] = function(value) {
				var owner = this._owner,
					children = owner && owner._children;
				if (children && children.length > 0
						&& !(owner instanceof CompoundPath)) {
					for (var i = 0, l = children.length; i < l; i++)
						children[i]._style[set](value);
				} else {
					var old = this._values[key];
					if (old !== value) {
						if (isColor) {
							if (old)
								old._owner = undefined;
							if (value && value.constructor === Color) {
								if (value._owner)
									value = value.clone();
								value._owner = owner;
							}
						}
						this._values[key] = value;
						if (owner)
							owner._changed(flag || 65);
					}
				}
			};
	
			fields[get] = function(_dontMerge) {
				var owner = this._owner,
					children = owner && owner._children,
					value;
				if (!children || children.length === 0 || _dontMerge
						|| owner instanceof CompoundPath) {
					var value = this._values[key];
					if (value === undefined) {
						value = this._defaults[key];
						if (value && value.clone)
							value = value.clone();
					} else {
						var ctor = isColor ? Color : isPoint ? Point : null;
						if (ctor && !(value && value.constructor === ctor)) {
							this._values[key] = value = ctor.read([value], 0,
									{ readNull: true, clone: true });
							if (value && isColor)
								value._owner = owner;
						}
					}
					return value;
				}
				for (var i = 0, l = children.length; i < l; i++) {
					var childValue = children[i]._style[get]();
					if (i === 0) {
						value = childValue;
					} else if (!Base.equals(value, childValue)) {
						return undefined;
					}
				}
				return value;
			};
	
			item[get] = function(_dontMerge) {
				return this._style[get](_dontMerge);
			};
	
			item[set] = function(value) {
				this._style[set](value);
			};
		});
	
		Item.inject(item);
		return fields;
	}, {
		_class: 'Style',
	
		initialize: function Style(style, _owner, _project) {
			this._values = {};
			this._owner = _owner;
			this._project = _owner && _owner._project || _project || paper.project;
			if (_owner instanceof TextItem)
				this._defaults = this._textDefaults;
			if (style)
				this.set(style);
		},
	
		set: function(style) {
			var isStyle = style instanceof Style,
				values = isStyle ? style._values : style;
			if (values) {
				for (var key in values) {
					if (key in this._defaults) {
						var value = values[key];
						this[key] = value && isStyle && value.clone
								? value.clone() : value;
					}
				}
			}
		},
	
		equals: function(style) {
			return style === this || style && this._class === style._class
					&& Base.equals(this._values, style._values)
					|| false;
		},
	
		hasFill: function() {
			return !!this.getFillColor();
		},
	
		hasStroke: function() {
			return !!this.getStrokeColor() && this.getStrokeWidth() > 0;
		},
	
		hasShadow: function() {
			return !!this.getShadowColor() && this.getShadowBlur() > 0;
		},
	
		getView: function() {
			return this._project.getView();
		},
	
		getFontStyle: function() {
			var fontSize = this.getFontSize();
			return this.getFontWeight()
					+ ' ' + fontSize + (/[a-z]/i.test(fontSize + '') ? ' ' : 'px ')
					+ this.getFontFamily();
		},
	
		getFont: '#getFontFamily',
		setFont: '#setFontFamily',
	
		getLeading: function getLeading() {
			var leading = getLeading.base.call(this),
				fontSize = this.getFontSize();
			if (/pt|em|%|px/.test(fontSize))
				fontSize = this.getView().getPixelSize(fontSize);
			return leading != null ? leading : fontSize * 1.2;
		}
	
	});
	
	var DomElement = new function() {
		function handlePrefix(el, name, set, value) {
			var prefixes = ['', 'webkit', 'moz', 'Moz', 'ms', 'o'],
				suffix = name[0].toUpperCase() + name.substring(1);
			for (var i = 0; i < 6; i++) {
				var prefix = prefixes[i],
					key = prefix ? prefix + suffix : name;
				if (key in el) {
					if (set) {
						el[key] = value;
					} else {
						return el[key];
					}
					break;
				}
			}
		}
	
		return {
			getStyles: function(el) {
				var doc = el && el.nodeType !== 9 ? el.ownerDocument : el,
					view = doc && doc.defaultView;
				return view && view.getComputedStyle(el, '');
			},
	
			getBounds: function(el, viewport) {
				var doc = el.ownerDocument,
					body = doc.body,
					html = doc.documentElement,
					rect;
				try {
					rect = el.getBoundingClientRect();
				} catch (e) {
					rect = { left: 0, top: 0, width: 0, height: 0 };
				}
				var x = rect.left - (html.clientLeft || body.clientLeft || 0),
					y = rect.top - (html.clientTop || body.clientTop || 0);
				if (!viewport) {
					var view = doc.defaultView;
					x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
					y += view.pageYOffset || html.scrollTop || body.scrollTop;
				}
				return new Rectangle(x, y, rect.width, rect.height);
			},
	
			getViewportBounds: function(el) {
				var doc = el.ownerDocument,
					view = doc.defaultView,
					html = doc.documentElement;
				return new Rectangle(0, 0,
					view.innerWidth || html.clientWidth,
					view.innerHeight || html.clientHeight
				);
			},
	
			getOffset: function(el, viewport) {
				return DomElement.getBounds(el, viewport).getPoint();
			},
	
			getSize: function(el) {
				return DomElement.getBounds(el, true).getSize();
			},
	
			isInvisible: function(el) {
				return DomElement.getSize(el).equals(new Size(0, 0));
			},
	
			isInView: function(el) {
				return !DomElement.isInvisible(el)
						&& DomElement.getViewportBounds(el).intersects(
							DomElement.getBounds(el, true));
			},
	
			getPrefixed: function(el, name) {
				return handlePrefix(el, name);
			},
	
			setPrefixed: function(el, name, value) {
				if (typeof name === 'object') {
					for (var key in name)
						handlePrefix(el, key, true, name[key]);
				} else {
					handlePrefix(el, name, true, value);
				}
			}
		};
	};
	
	var DomEvent = {
		add: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.addEventListener(parts[i], func, false);
			}
		},
	
		remove: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.removeEventListener(parts[i], func, false);
			}
		},
	
		getPoint: function(event) {
			var pos = event.targetTouches
					? event.targetTouches.length
						? event.targetTouches[0]
						: event.changedTouches[0]
					: event;
			return new Point(
				pos.pageX || pos.clientX + document.documentElement.scrollLeft,
				pos.pageY || pos.clientY + document.documentElement.scrollTop
			);
		},
	
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
	
		getRelatedTarget: function(event) {
			return event.relatedTarget || event.toElement;
		},
	
		getOffset: function(event, target) {
			return DomEvent.getPoint(event).subtract(DomElement.getOffset(
					target || DomEvent.getTarget(event)));
		},
	
		stop: function(event) {
			event.stopPropagation();
			event.preventDefault();
		}
	};
	
	DomEvent.requestAnimationFrame = new function() {
		var nativeRequest = DomElement.getPrefixed(window, 'requestAnimationFrame'),
			requested = false,
			callbacks = [],
			focused = true,
			timer;
	
		DomEvent.add(window, {
			focus: function() {
				focused = true;
			},
			blur: function() {
				focused = false;
			}
		});
	
		function handleCallbacks() {
			for (var i = callbacks.length - 1; i >= 0; i--) {
				var entry = callbacks[i],
					func = entry[0],
					el = entry[1];
				if (!el || (PaperScope.getAttribute(el, 'keepalive') == 'true'
						|| focused) && DomElement.isInView(el)) {
					callbacks.splice(i, 1);
					func();
				}
			}
			if (nativeRequest) {
				if (callbacks.length) {
					nativeRequest(handleCallbacks);
				} else {
					requested = false;
				}
			}
		}
	
		return function(callback, element) {
			callbacks.push([callback, element]);
			if (nativeRequest) {
				if (!requested) {
					nativeRequest(handleCallbacks);
					requested = true;
				}
			} else if (!timer) {
				timer = setInterval(handleCallbacks, 1000 / 60);
			}
		};
	};
	
	var View = Base.extend(Emitter, {
		_class: 'View',
	
		initialize: function View(project, element) {
			this._project = project;
			this._scope = project._scope;
			this._element = element;
			var size;
			if (!this._pixelRatio)
				this._pixelRatio = window.devicePixelRatio || 1;
			this._id = element.getAttribute('id');
			if (this._id == null)
				element.setAttribute('id', this._id = 'view-' + View._id++);
			DomEvent.add(element, this._viewEvents);
			var none = 'none';
			DomElement.setPrefixed(element.style, {
				userSelect: none,
				touchAction: none,
				touchCallout: none,
				contentZooming: none,
				userDrag: none,
				tapHighlightColor: 'rgba(0,0,0,0)'
			});
	
			function getSize(name) {
				return element[name] || parseInt(element.getAttribute(name), 10);
			};
	
			function getCanvasSize() {
				var size = DomElement.getSize(element);
				return size.isNaN() || size.isZero()
						? new Size(getSize('width'), getSize('height'))
						: size;
			};
	
			if (PaperScope.hasAttribute(element, 'resize')) {
				var that = this;
				DomEvent.add(window, this._windowEvents = {
					resize: function() {
						that.setViewSize(getCanvasSize());
					}
				});
			}
			this._setViewSize(size = getCanvasSize());
			if (PaperScope.hasAttribute(element, 'stats')
					&& typeof Stats !== 'undefined') {
				this._stats = new Stats();
				var stats = this._stats.domElement,
					style = stats.style,
					offset = DomElement.getOffset(element);
				style.position = 'absolute';
				style.left = offset.x + 'px';
				style.top = offset.y + 'px';
				document.body.appendChild(stats);
			}
			View._views.push(this);
			View._viewsById[this._id] = this;
			this._viewSize = size;
			(this._matrix = new Matrix())._owner = this;
			this._zoom = 1;
			if (!View._focused)
				View._focused = this;
			this._frameItems = {};
			this._frameItemCount = 0;
		},
	
		remove: function() {
			if (!this._project)
				return false;
			if (View._focused === this)
				View._focused = null;
			View._views.splice(View._views.indexOf(this), 1);
			delete View._viewsById[this._id];
			if (this._project._view === this)
				this._project._view = null;
			DomEvent.remove(this._element, this._viewEvents);
			DomEvent.remove(window, this._windowEvents);
			this._element = this._project = null;
			this.off('frame');
			this._animate = false;
			this._frameItems = {};
			return true;
		},
	
		_events: Base.each(['onResize', 'onMouseDown', 'onMouseUp', 'onMouseMove'],
			function(name) {
				this[name] = {
					install: function(type) {
						this._installEvent(type);
					},
	
					uninstall: function(type) {
						this._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.play();
					},
	
					uninstall: function() {
						this.pause();
					}
				}
			}
		),
	
		_animate: false,
		_time: 0,
		_count: 0,
	
		_requestFrame: function() {
			var that = this;
			DomEvent.requestAnimationFrame(function() {
				that._requested = false;
				if (!that._animate)
					return;
				that._requestFrame();
				that._handleFrame();
			}, this._element);
			this._requested = true;
		},
	
		_handleFrame: function() {
			paper = this._scope;
			var now = Date.now() / 1000,
				delta = this._before ? now - this._before : 0;
			this._before = now;
			this._handlingFrame = true;
			this.emit('frame', new Base({
				delta: delta,
				time: this._time += delta,
				count: this._count++
			}));
			if (this._stats)
				this._stats.update();
			this._handlingFrame = false;
			this.update();
		},
	
		_animateItem: function(item, animate) {
			var items = this._frameItems;
			if (animate) {
				items[item._id] = {
					item: item,
					time: 0,
					count: 0
				};
				if (++this._frameItemCount === 1)
					this.on('frame', this._handleFrameItems);
			} else {
				delete items[item._id];
				if (--this._frameItemCount === 0) {
					this.off('frame', this._handleFrameItems);
				}
			}
		},
	
		_handleFrameItems: function(event) {
			for (var i in this._frameItems) {
				var entry = this._frameItems[i];
				entry.item.emit('frame', new Base(event, {
					time: entry.time += event.delta,
					count: entry.count++
				}));
			}
		},
	
		_update: function() {
			this._project._needsUpdate = true;
			if (this._handlingFrame)
				return;
			if (this._animate) {
				this._handleFrame();
			} else {
				this.update();
			}
		},
	
		_changed: function(flags) {
			if (flags & 1)
				this._project._needsUpdate = true;
		},
	
		_transform: function(matrix) {
			this._matrix.concatenate(matrix);
			this._bounds = null;
			this._update();
		},
	
		getElement: function() {
			return this._element;
		},
	
		getPixelRatio: function() {
			return this._pixelRatio;
		},
	
		getResolution: function() {
			return this._pixelRatio * 72;
		},
	
		getViewSize: function() {
			var size = this._viewSize;
			return new LinkedSize(size.width, size.height, this, 'setViewSize');
		},
	
		setViewSize: function() {
			var size = Size.read(arguments),
				delta = size.subtract(this._viewSize);
			if (delta.isZero())
				return;
			this._viewSize.set(size.width, size.height);
			this._setViewSize(size);
			this._bounds = null;
			this.emit('resize', {
				size: size,
				delta: delta
			});
			this._update();
		},
	
		_setViewSize: function(size) {
			var element = this._element;
			element.width = size.width;
			element.height = size.height;
		},
	
		getBounds: function() {
			if (!this._bounds)
				this._bounds = this._matrix.inverted()._transformBounds(
						new Rectangle(new Point(), this._viewSize));
			return this._bounds;
		},
	
		getSize: function() {
			return this.getBounds().getSize();
		},
	
		getCenter: function() {
			return this.getBounds().getCenter();
		},
	
		setCenter: function() {
			var center = Point.read(arguments);
			this.scrollBy(center.subtract(this.getCenter()));
		},
	
		getZoom: function() {
			return this._zoom;
		},
	
		setZoom: function(zoom) {
			this._transform(new Matrix().scale(zoom / this._zoom,
				this.getCenter()));
			this._zoom = zoom;
		},
	
		isVisible: function() {
			return DomElement.isInView(this._element);
		},
	
		scrollBy: function() {
			this._transform(new Matrix().translate(Point.read(arguments).negate()));
		},
	
		play: function() {
			this._animate = true;
			if (!this._requested)
				this._requestFrame();
		},
	
		pause: function() {
			this._animate = false;
		},
	
		draw: function() {
			this.update();
		},
	
		projectToView: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},
	
		viewToProject: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		}
	
	}, {
		statics: {
			_views: [],
			_viewsById: {},
			_id: 0,
	
			create: function(project, element) {
				if (typeof element === 'string')
					element = document.getElementById(element);
				return new CanvasView(project, element);
			}
		}
	},
	new function() {
		var tool,
			prevFocus,
			tempFocus,
			dragging = false;
	
		function getView(event) {
			var target = DomEvent.getTarget(event);
			return target.getAttribute && View._viewsById[target.getAttribute('id')];
		}
	
		function viewToProject(view, event) {
			return view.viewToProject(DomEvent.getOffset(event, view._element));
		}
	
		function updateFocus() {
			if (!View._focused || !View._focused.isVisible()) {
				for (var i = 0, l = View._views.length; i < l; i++) {
					var view = View._views[i];
					if (view && view.isVisible()) {
						View._focused = tempFocus = view;
						break;
					}
				}
			}
		}
	
		function handleMouseMove(view, point, event) {
			view._handleEvent('mousemove', point, event);
			var tool = view._scope.tool;
			if (tool) {
				tool._handleEvent(dragging && tool.responds('mousedrag')
						? 'mousedrag' : 'mousemove', point, event);
			}
			view.update();
			return tool;
		}
	
		var navigator = window.navigator,
			mousedown, mousemove, mouseup;
		if (navigator.pointerEnabled || navigator.msPointerEnabled) {
			mousedown = 'pointerdown MSPointerDown';
			mousemove = 'pointermove MSPointerMove';
			mouseup = 'pointerup pointercancel MSPointerUp MSPointerCancel';
		} else {
			mousedown = 'touchstart';
			mousemove = 'touchmove';
			mouseup = 'touchend touchcancel';
			if (!('ontouchstart' in window && navigator.userAgent.match(
					/mobile|tablet|ip(ad|hone|od)|android|silk/i))) {
				mousedown += ' mousedown';
				mousemove += ' mousemove';
				mouseup += ' mouseup';
			}
		}
	
		var viewEvents = {
			'selectstart dragstart': function(event) {
				if (dragging)
					event.preventDefault();
			}
		};
	
		var docEvents = {
			mouseout: function(event) {
				var view = View._focused,
					target = DomEvent.getRelatedTarget(event);
				if (view && (!target || target.nodeName === 'HTML'))
					handleMouseMove(view, viewToProject(view, event), event);
			},
	
			scroll: updateFocus
		};
	
		viewEvents[mousedown] = function(event) {
			var view = View._focused = getView(event),
				point = viewToProject(view, event);
			dragging = true;
			view._handleEvent('mousedown', point, event);
			if (tool = view._scope.tool)
				tool._handleEvent('mousedown', point, event);
			view.update();
		};
	
		docEvents[mousemove] = function(event) {
			var view = View._focused;
			if (!dragging) {
				var target = getView(event);
				if (target) {
					if (view !== target)
						handleMouseMove(view, viewToProject(view, event), event);
					prevFocus = view;
					view = View._focused = tempFocus = target;
				} else if (tempFocus && tempFocus === view) {
					view = View._focused = prevFocus;
					updateFocus();
				}
			}
			if (view) {
				var point = viewToProject(view, event);
				if (dragging || view.getBounds().contains(point))
					tool = handleMouseMove(view, point, event);
			}
		};
	
		docEvents[mouseup] = function(event) {
			var view = View._focused;
			if (!view || !dragging)
				return;
			var point = viewToProject(view, event);
			dragging = false;
			view._handleEvent('mouseup', point, event);
			if (tool)
				tool._handleEvent('mouseup', point, event);
			view.update();
		};
	
		DomEvent.add(document, docEvents);
	
		DomEvent.add(window, {
			load: updateFocus
		});
	
		var mouseFlags = {
			mousedown: {
				mousedown: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mouseup: {
				mouseup: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mousemove: {
				mousedrag: 1,
				mousemove: 1,
				mouseenter: 1,
				mouseleave: 1
			}
		};
	
		return {
			_viewEvents: viewEvents,
	
			_handleEvent: function() {},
	
			_installEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags) {
						counters[key] = (counters[key] || 0)
								+ (mouseFlags[key][type] || 0);
					}
				}
			},
	
			_uninstallEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags)
						counters[key] -= mouseFlags[key][type] || 0;
				}
			},
	
			statics: {
				updateFocus: updateFocus
			}
		};
	});
	
	var CanvasView = View.extend({
		_class: 'CanvasView',
	
		initialize: function CanvasView(project, canvas) {
			if (!(canvas instanceof HTMLCanvasElement)) {
				var size = Size.read(arguments, 1);
				if (size.isZero())
					throw new Error(
							'Cannot create CanvasView with the provided argument: '
							+ [].slice.call(arguments, 1));
				canvas = CanvasProvider.getCanvas(size);
			}
			this._context = canvas.getContext('2d');
			this._eventCounters = {};
			this._pixelRatio = 1;
			if (!/^off|false$/.test(PaperScope.getAttribute(canvas, 'hidpi'))) {
				var deviceRatio = window.devicePixelRatio || 1,
					backingStoreRatio = DomElement.getPrefixed(this._context,
							'backingStorePixelRatio') || 1;
				this._pixelRatio = deviceRatio / backingStoreRatio;
			}
			View.call(this, project, canvas);
		},
	
		_setViewSize: function(size) {
			var element = this._element,
				pixelRatio = this._pixelRatio,
				width = size.width,
				height = size.height;
			element.width = width * pixelRatio;
			element.height = height * pixelRatio;
			if (pixelRatio !== 1) {
				if (!PaperScope.hasAttribute(element, 'resize')) {
					var style = element.style;
					style.width = width + 'px';
					style.height = height + 'px';
				}
				this._context.scale(pixelRatio, pixelRatio);
			}
		},
	
		getPixelSize: function(size) {
			var browser = paper.browser,
				pixels;
			if (browser && browser.firefox) {
				var parent = this._element.parentNode,
					temp = document.createElement('div');
				temp.style.fontSize = size;
				parent.appendChild(temp);
				pixels = parseFloat(DomElement.getStyles(temp).fontSize);
				parent.removeChild(temp);
			} else {
				var ctx = this._context,
					prevFont = ctx.font;
				ctx.font = size + ' serif';
				pixels = parseFloat(ctx.font);
				ctx.font = prevFont;
			}
			return pixels;
		},
	
		getTextWidth: function(font, lines) {
			var ctx = this._context,
				prevFont = ctx.font,
				width = 0;
			ctx.font = font;
			for (var i = 0, l = lines.length; i < l; i++)
				width = Math.max(width, ctx.measureText(lines[i]).width);
			ctx.font = prevFont;
			return width;
		},
	
		update: function(force) {
			var project = this._project;
			if (!project || !force && !project._needsUpdate)
				return false;
			var ctx = this._context,
				size = this._viewSize;
			ctx.clearRect(0, 0, size.width + 1, size.height + 1);
			project.draw(ctx, this._matrix, this._pixelRatio);
			project._needsUpdate = false;
			return true;
		}
	},
	new function() {
		var downPoint,
			lastPoint,
			overPoint,
			downItem,
			lastItem,
			overItem,
			dragItem,
			dblClick,
			clickTime;
	
		function callEvent(view, type, event, point, target, lastPoint) {
			var item = target,
				mouseEvent;
	
			function call(obj) {
				if (obj.responds(type)) {
					if (!mouseEvent) {
						mouseEvent = new MouseEvent(type, event, point, target,
								lastPoint ? point.subtract(lastPoint) : null);
					}
					if (obj.emit(type, mouseEvent) && mouseEvent.isStopped) {
						event.preventDefault();
						return true;
					}
				}
			}
	
			while (item) {
				if (call(item))
					return true;
				item = item.getParent();
			}
			if (call(view))
				return true;
			return false;
		}
	
		return {
			_handleEvent: function(type, point, event) {
				if (!this._eventCounters[type])
					return;
				var project = this._project,
					hit = project.hitTest(point, {
						tolerance: 0,
						fill: true,
						stroke: true
					}),
					item = hit && hit.item,
					stopped = false;
				switch (type) {
				case 'mousedown':
					stopped = callEvent(this, type, event, point, item);
					dblClick = lastItem == item && (Date.now() - clickTime < 300);
					downItem = lastItem = item;
					downPoint = lastPoint = overPoint = point;
					dragItem = !stopped && item;
					while (dragItem && !dragItem.responds('mousedrag'))
						dragItem = dragItem._parent;
					break;
				case 'mouseup':
					stopped = callEvent(this, type, event, point, item, downPoint);
					if (dragItem) {
						if (lastPoint && !lastPoint.equals(point))
							callEvent(this, 'mousedrag', event, point, dragItem,
									lastPoint);
						if (item !== dragItem) {
							overPoint = point;
							callEvent(this, 'mousemove', event, point, item,
									overPoint);
						}
					}
					if (!stopped && item && item === downItem) {
						clickTime = Date.now();
						callEvent(this, dblClick && downItem.responds('doubleclick')
								? 'doubleclick' : 'click', event, downPoint, item);
						dblClick = false;
					}
					downItem = dragItem = null;
					break;
				case 'mousemove':
					if (dragItem)
						stopped = callEvent(this, 'mousedrag', event, point,
								dragItem, lastPoint);
					if (!stopped) {
						if (item !== overItem)
							overPoint = point;
						stopped = callEvent(this, type, event, point, item,
								overPoint);
					}
					lastPoint = overPoint = point;
					if (item !== overItem) {
						callEvent(this, 'mouseleave', event, point, overItem);
						overItem = item;
						callEvent(this, 'mouseenter', event, point, item);
					}
					break;
				}
				return stopped;
			}
		};
	});
	
	var Event = Base.extend({
		_class: 'Event',
	
		initialize: function Event(event) {
			this.event = event;
		},
	
		isPrevented: false,
		isStopped: false,
	
		preventDefault: function() {
			this.isPrevented = true;
			this.event.preventDefault();
		},
	
		stopPropagation: function() {
			this.isStopped = true;
			this.event.stopPropagation();
		},
	
		stop: function() {
			this.stopPropagation();
			this.preventDefault();
		},
	
		getModifiers: function() {
			return Key.modifiers;
		}
	});
	
	var KeyEvent = Event.extend({
		_class: 'KeyEvent',
	
		initialize: function KeyEvent(down, key, character, event) {
			Event.call(this, event);
			this.type = down ? 'keydown' : 'keyup';
			this.key = key;
			this.character = character;
		},
	
		toString: function() {
			return "{ type: '" + this.type
					+ "', key: '" + this.key
					+ "', character: '" + this.character
					+ "', modifiers: " + this.getModifiers()
					+ " }";
		}
	});
	
	var Key = new function() {
	
		var specialKeys = {
			8: 'backspace',
			9: 'tab',
			13: 'enter',
			16: 'shift',
			17: 'control',
			18: 'option',
			19: 'pause',
			20: 'caps-lock',
			27: 'escape',
			32: 'space',
			35: 'end',
			36: 'home',
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
			46: 'delete',
			91: 'command',
			93: 'command',
			224: 'command'
		},
	
		specialChars = {
			9: true,
			13: true,
			32: true
		},
	
		modifiers = new Base({
			shift: false,
			control: false,
			option: false,
			command: false,
			capsLock: false,
			space: false
		}),
	
		charCodeMap = {},
		keyMap = {},
		commandFixMap,
		downCode;
	
		function handleKey(down, keyCode, charCode, event) {
			var character = charCode ? String.fromCharCode(charCode) : '',
				specialKey = specialKeys[keyCode],
				key = specialKey || character.toLowerCase(),
				type = down ? 'keydown' : 'keyup',
				view = View._focused,
				scope = view && view.isVisible() && view._scope,
				tool = scope && scope.tool,
				name;
			keyMap[key] = down;
			if (down) {
				charCodeMap[keyCode] = charCode;
			} else {
				delete charCodeMap[keyCode];
			}
			if (specialKey && (name = Base.camelize(specialKey)) in modifiers) {
				modifiers[name] = down;
				var browser = paper.browser;
				if (name === 'command' && browser && browser.mac) {
					if (down) {
						commandFixMap = {};
					} else {
						for (var code in commandFixMap) {
							if (code in charCodeMap)
								handleKey(false, code, commandFixMap[code], event);
						}
						commandFixMap = null;
					}
				}
			} else if (down && commandFixMap) {
				commandFixMap[keyCode] = charCode;
			}
			if (tool && tool.responds(type)) {
				paper = scope;
				tool.emit(type, new KeyEvent(down, key, character, event));
				if (view)
					view.update();
			}
		}
	
		DomEvent.add(document, {
			keydown: function(event) {
				var code = event.which || event.keyCode;
				if (code in specialKeys || modifiers.command) {
					handleKey(true, code,
							code in specialChars || modifiers.command ? code : 0,
							event);
				} else {
					downCode = code;
				}
			},
	
			keypress: function(event) {
				if (downCode != null) {
					handleKey(true, downCode, event.which || event.keyCode, event);
					downCode = null;
				}
			},
	
			keyup: function(event) {
				var code = event.which || event.keyCode;
				if (code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});
	
		DomEvent.add(window, {
			blur: function(event) {
				for (var code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});
	
		return {
			modifiers: modifiers,
	
			isDown: function(key) {
				return !!keyMap[key];
			}
		};
	};
	
	var MouseEvent = Event.extend({
		_class: 'MouseEvent',
	
		initialize: function MouseEvent(type, event, point, target, delta) {
			Event.call(this, event);
			this.type = type;
			this.point = point;
			this.target = target;
			this.delta = delta;
		},
	
		toString: function() {
			return "{ type: '" + this.type
					+ "', point: " + this.point
					+ ', target: ' + this.target
					+ (this.delta ? ', delta: ' + this.delta : '')
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});
	
	var ToolEvent = Event.extend({
		_class: 'ToolEvent',
		_item: null,
	
		initialize: function ToolEvent(tool, type, event) {
			this.tool = tool;
			this.type = type;
			this.event = event;
		},
	
		_choosePoint: function(point, toolPoint) {
			return point ? point : toolPoint ? toolPoint.clone() : null;
		},
	
		getPoint: function() {
			return this._choosePoint(this._point, this.tool._point);
		},
	
		setPoint: function(point) {
			this._point = point;
		},
	
		getLastPoint: function() {
			return this._choosePoint(this._lastPoint, this.tool._lastPoint);
		},
	
		setLastPoint: function(lastPoint) {
			this._lastPoint = lastPoint;
		},
	
		getDownPoint: function() {
			return this._choosePoint(this._downPoint, this.tool._downPoint);
		},
	
		setDownPoint: function(downPoint) {
			this._downPoint = downPoint;
		},
	
		getMiddlePoint: function() {
			if (!this._middlePoint && this.tool._lastPoint) {
				return this.tool._point.add(this.tool._lastPoint).divide(2);
			}
			return this._middlePoint;
		},
	
		setMiddlePoint: function(middlePoint) {
			this._middlePoint = middlePoint;
		},
	
		getDelta: function() {
			return !this._delta && this.tool._lastPoint
					? this.tool._point.subtract(this.tool._lastPoint)
					: this._delta;
		},
	
		setDelta: function(delta) {
			this._delta = delta;
		},
	
		getCount: function() {
			return /^mouse(down|up)$/.test(this.type)
					? this.tool._downCount
					: this.tool._count;
		},
	
		setCount: function(count) {
			this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
				= count;
		},
	
		getItem: function() {
			if (!this._item) {
				var result = this.tool._scope.project.hitTest(this.getPoint());
				if (result) {
					var item = result.item,
						parent = item._parent;
					while (/^(Group|CompoundPath)$/.test(parent._class)) {
						item = parent;
						parent = parent._parent;
					}
					this._item = item;
				}
			}
			return this._item;
		},
	
		setItem: function(item) {
			this._item = item;
		},
	
		toString: function() {
			return '{ type: ' + this.type
					+ ', point: ' + this.getPoint()
					+ ', count: ' + this.getCount()
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});
	
	var Tool = PaperScopeItem.extend({
		_class: 'Tool',
		_list: 'tools',
		_reference: 'tool',
		_events: [ 'onActivate', 'onDeactivate', 'onEditOptions',
				'onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
				'onKeyDown', 'onKeyUp' ],
	
		initialize: function Tool(props) {
			PaperScopeItem.call(this);
			this._firstMove = true;
			this._count = 0;
			this._downCount = 0;
			this._set(props);
		},
	
		getMinDistance: function() {
			return this._minDistance;
		},
	
		setMinDistance: function(minDistance) {
			this._minDistance = minDistance;
			if (minDistance != null && this._maxDistance != null
					&& minDistance > this._maxDistance) {
				this._maxDistance = minDistance;
			}
		},
	
		getMaxDistance: function() {
			return this._maxDistance;
		},
	
		setMaxDistance: function(maxDistance) {
			this._maxDistance = maxDistance;
			if (this._minDistance != null && maxDistance != null
					&& maxDistance < this._minDistance) {
				this._minDistance = maxDistance;
			}
		},
	
		getFixedDistance: function() {
			return this._minDistance == this._maxDistance
				? this._minDistance : null;
		},
	
		setFixedDistance: function(distance) {
			this._minDistance = this._maxDistance = distance;
		},
	
		_updateEvent: function(type, point, minDistance, maxDistance, start,
				needsChange, matchMaxDistance) {
			if (!start) {
				if (minDistance != null || maxDistance != null) {
					var minDist = minDistance != null ? minDistance : 0,
						vector = point.subtract(this._point),
						distance = vector.getLength();
					if (distance < minDist)
						return false;
					if (maxDistance != null && maxDistance != 0) {
						if (distance > maxDistance) {
							point = this._point.add(vector.normalize(maxDistance));
						} else if (matchMaxDistance) {
							return false;
						}
					}
				}
				if (needsChange && point.equals(this._point))
					return false;
			}
			this._lastPoint = start && type == 'mousemove' ? point : this._point;
			this._point = point;
			switch (type) {
			case 'mousedown':
				this._lastPoint = this._downPoint;
				this._downPoint = this._point;
				this._downCount++;
				break;
			case 'mouseup':
				this._lastPoint = this._downPoint;
				break;
			}
			this._count = start ? 0 : this._count + 1;
			return true;
		},
	
		_fireEvent: function(type, event) {
			var sets = paper.project._removeSets;
			if (sets) {
				if (type === 'mouseup')
					sets.mousedrag = null;
				var set = sets[type];
				if (set) {
					for (var id in set) {
						var item = set[id];
						for (var key in sets) {
							var other = sets[key];
							if (other && other != set)
								delete other[item._id];
						}
						item.remove();
					}
					sets[type] = null;
				}
			}
			return this.responds(type)
					&& this.emit(type, new ToolEvent(this, type, event));
		},
	
		_handleEvent: function(type, point, event) {
			paper = this._scope;
			var called = false;
			switch (type) {
			case 'mousedown':
				this._updateEvent(type, point, null, null, true, false, false);
				called = this._fireEvent(type, event);
				break;
			case 'mousedrag':
				var needsChange = false,
					matchMaxDistance = false;
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, false, needsChange, matchMaxDistance)) {
					called = this._fireEvent(type, event) || called;
					needsChange = true;
					matchMaxDistance = true;
				}
				break;
			case 'mouseup':
				if (!point.equals(this._point)
						&& this._updateEvent('mousedrag', point, this.minDistance,
								this.maxDistance, false, false, false)) {
					called = this._fireEvent('mousedrag', event);
				}
				this._updateEvent(type, point, null, this.maxDistance, false,
						false, false);
				called = this._fireEvent(type, event) || called;
				this._updateEvent(type, point, null, null, true, false, false);
				this._firstMove = true;
				break;
			case 'mousemove':
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, this._firstMove, true, false)) {
					called = this._fireEvent(type, event) || called;
					this._firstMove = false;
				}
				break;
			}
			if (called)
				event.preventDefault();
			return called;
		}
	
	});
	
	var Http = {
		request: function(method, url, callback, async) {
			async = (async === undefined) ? true : async;
			var xhr = new (window.ActiveXObject || XMLHttpRequest)(
						'Microsoft.XMLHTTP');
			xhr.open(method.toUpperCase(), url, async);
			if ('overrideMimeType' in xhr)
				xhr.overrideMimeType('text/plain');
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					var status = xhr.status;
					if (status === 0 || status === 200) {
						callback.call(xhr, xhr.responseText);
					} else {
						throw new Error('Could not load ' + url + ' (Error '
								+ status + ')');
					}
				}
			};
			return xhr.send(null);
		}
	};
	
	var CanvasProvider = {
		canvases: [],
	
		getCanvas: function(width, height) {
			var canvas,
				clear = true;
			if (typeof width === 'object') {
				height = width.height;
				width = width.width;
			}
			if (this.canvases.length) {
				canvas = this.canvases.pop();
			} else {
				canvas = document.createElement('canvas');
			}
			var ctx = canvas.getContext('2d');
			if (canvas.width === width && canvas.height === height) {
				if (clear)
					ctx.clearRect(0, 0, width + 1, height + 1);
			} else {
				canvas.width = width;
				canvas.height = height;
			}
			ctx.save();
			return canvas;
		},
	
		getContext: function(width, height) {
			return this.getCanvas(width, height).getContext('2d');
		},
	
		release: function(obj) {
			var canvas = obj.canvas ? obj.canvas : obj;
			canvas.getContext('2d').restore();
			this.canvases.push(canvas);
		}
	};
	
	var BlendMode = new function() {
		var min = Math.min,
			max = Math.max,
			abs = Math.abs,
			sr, sg, sb, sa,
			br, bg, bb, ba,
			dr, dg, db;
	
		function getLum(r, g, b) {
			return 0.2989 * r + 0.587 * g + 0.114 * b;
		}
	
		function setLum(r, g, b, l) {
			var d = l - getLum(r, g, b);
			dr = r + d;
			dg = g + d;
			db = b + d;
			var l = getLum(dr, dg, db),
				mn = min(dr, dg, db),
				mx = max(dr, dg, db);
			if (mn < 0) {
				var lmn = l - mn;
				dr = l + (dr - l) * l / lmn;
				dg = l + (dg - l) * l / lmn;
				db = l + (db - l) * l / lmn;
			}
			if (mx > 255) {
				var ln = 255 - l,
					mxl = mx - l;
				dr = l + (dr - l) * ln / mxl;
				dg = l + (dg - l) * ln / mxl;
				db = l + (db - l) * ln / mxl;
			}
		}
	
		function getSat(r, g, b) {
			return max(r, g, b) - min(r, g, b);
		}
	
		function setSat(r, g, b, s) {
			var col = [r, g, b],
				mx = max(r, g, b),
				mn = min(r, g, b),
				md;
			mn = mn === r ? 0 : mn === g ? 1 : 2;
			mx = mx === r ? 0 : mx === g ? 1 : 2;
			md = min(mn, mx) === 0 ? max(mn, mx) === 1 ? 2 : 1 : 0;
			if (col[mx] > col[mn]) {
				col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
				col[mx] = s;
			} else {
				col[md] = col[mx] = 0;
			}
			col[mn] = 0;
			dr = col[0];
			dg = col[1];
			db = col[2];
		}
	
		var modes = {
			multiply: function() {
				dr = br * sr / 255;
				dg = bg * sg / 255;
				db = bb * sb / 255;
			},
	
			screen: function() {
				dr = br + sr - (br * sr / 255);
				dg = bg + sg - (bg * sg / 255);
				db = bb + sb - (bb * sb / 255);
			},
	
			overlay: function() {
				dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
				dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
				db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
			},
	
			'soft-light': function() {
				var t = sr * br / 255;
				dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
				t = sg * bg / 255;
				dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
				t = sb * bb / 255;
				db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
			},
	
			'hard-light': function() {
				dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
				dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
				db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
			},
	
			'color-dodge': function() {
				dr = br === 0 ? 0 : sr === 255 ? 255 : min(255, 255 * br / (255 - sr));
				dg = bg === 0 ? 0 : sg === 255 ? 255 : min(255, 255 * bg / (255 - sg));
				db = bb === 0 ? 0 : sb === 255 ? 255 : min(255, 255 * bb / (255 - sb));
			},
	
			'color-burn': function() {
				dr = br === 255 ? 255 : sr === 0 ? 0 : max(0, 255 - (255 - br) * 255 / sr);
				dg = bg === 255 ? 255 : sg === 0 ? 0 : max(0, 255 - (255 - bg) * 255 / sg);
				db = bb === 255 ? 255 : sb === 0 ? 0 : max(0, 255 - (255 - bb) * 255 / sb);
			},
	
			darken: function() {
				dr = br < sr ? br : sr;
				dg = bg < sg ? bg : sg;
				db = bb < sb ? bb : sb;
			},
	
			lighten: function() {
				dr = br > sr ? br : sr;
				dg = bg > sg ? bg : sg;
				db = bb > sb ? bb : sb;
			},
	
			difference: function() {
				dr = br - sr;
				if (dr < 0)
					dr = -dr;
				dg = bg - sg;
				if (dg < 0)
					dg = -dg;
				db = bb - sb;
				if (db < 0)
					db = -db;
			},
	
			exclusion: function() {
				dr = br + sr * (255 - br - br) / 255;
				dg = bg + sg * (255 - bg - bg) / 255;
				db = bb + sb * (255 - bb - bb) / 255;
			},
	
			hue: function() {
				setSat(sr, sg, sb, getSat(br, bg, bb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},
	
			saturation: function() {
				setSat(br, bg, bb, getSat(sr, sg, sb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},
	
			luminosity: function() {
				setLum(br, bg, bb, getLum(sr, sg, sb));
			},
	
			color: function() {
				setLum(sr, sg, sb, getLum(br, bg, bb));
			},
	
			add: function() {
				dr = min(br + sr, 255);
				dg = min(bg + sg, 255);
				db = min(bb + sb, 255);
			},
	
			subtract: function() {
				dr = max(br - sr, 0);
				dg = max(bg - sg, 0);
				db = max(bb - sb, 0);
			},
	
			average: function() {
				dr = (br + sr) / 2;
				dg = (bg + sg) / 2;
				db = (bb + sb) / 2;
			},
	
			negation: function() {
				dr = 255 - abs(255 - sr - br);
				dg = 255 - abs(255 - sg - bg);
				db = 255 - abs(255 - sb - bb);
			}
		};
	
		var nativeModes = this.nativeModes = Base.each([
			'source-over', 'source-in', 'source-out', 'source-atop',
			'destination-over', 'destination-in', 'destination-out',
			'destination-atop', 'lighter', 'darker', 'copy', 'xor'
		], function(mode) {
			this[mode] = true;
		}, {});
	
		var ctx = CanvasProvider.getContext(1, 1);
		Base.each(modes, function(func, mode) {
			var darken = mode === 'darken',
				ok = false;
			ctx.save();
			try {
				ctx.fillStyle = darken ? '#300' : '#a00';
				ctx.fillRect(0, 0, 1, 1);
				ctx.globalCompositeOperation = mode;
				if (ctx.globalCompositeOperation === mode) {
					ctx.fillStyle = darken ? '#a00' : '#300';
					ctx.fillRect(0, 0, 1, 1);
					ok = ctx.getImageData(0, 0, 1, 1).data[0] !== darken ? 170 : 51;
				}
			} catch (e) {}
			ctx.restore();
			nativeModes[mode] = ok;
		});
		CanvasProvider.release(ctx);
	
		this.process = function(mode, srcContext, dstContext, alpha, offset) {
			var srcCanvas = srcContext.canvas,
				normal = mode === 'normal';
			if (normal || nativeModes[mode]) {
				dstContext.save();
				dstContext.setTransform(1, 0, 0, 1, 0, 0);
				dstContext.globalAlpha = alpha;
				if (!normal)
					dstContext.globalCompositeOperation = mode;
				dstContext.drawImage(srcCanvas, offset.x, offset.y);
				dstContext.restore();
			} else {
				var process = modes[mode];
				if (!process)
					return;
				var dstData = dstContext.getImageData(offset.x, offset.y,
						srcCanvas.width, srcCanvas.height),
					dst = dstData.data,
					src = srcContext.getImageData(0, 0,
						srcCanvas.width, srcCanvas.height).data;
				for (var i = 0, l = dst.length; i < l; i += 4) {
					sr = src[i];
					br = dst[i];
					sg = src[i + 1];
					bg = dst[i + 1];
					sb = src[i + 2];
					bb = dst[i + 2];
					sa = src[i + 3];
					ba = dst[i + 3];
					process();
					var a1 = sa * alpha / 255,
						a2 = 1 - a1;
					dst[i] = a1 * dr + a2 * br;
					dst[i + 1] = a1 * dg + a2 * bg;
					dst[i + 2] = a1 * db + a2 * bb;
					dst[i + 3] = sa * alpha + a2 * ba;
				}
				dstContext.putImageData(dstData, offset.x, offset.y);
			}
		};
	};
	
	var SVGStyles = Base.each({
		fillColor: ['fill', 'color'],
		strokeColor: ['stroke', 'color'],
		strokeWidth: ['stroke-width', 'number'],
		strokeCap: ['stroke-linecap', 'string'],
		strokeJoin: ['stroke-linejoin', 'string'],
		strokeScaling: ['vector-effect', 'lookup', {
			true: 'none',
			false: 'non-scaling-stroke'
		}, function(item, value) {
			return !value
					&& (item instanceof PathItem
						|| item instanceof Shape
						|| item instanceof TextItem);
		}],
		miterLimit: ['stroke-miterlimit', 'number'],
		dashArray: ['stroke-dasharray', 'array'],
		dashOffset: ['stroke-dashoffset', 'number'],
		fontFamily: ['font-family', 'string'],
		fontWeight: ['font-weight', 'string'],
		fontSize: ['font-size', 'number'],
		justification: ['text-anchor', 'lookup', {
			left: 'start',
			center: 'middle',
			right: 'end'
		}],
		opacity: ['opacity', 'number'],
		blendMode: ['mix-blend-mode', 'string']
	}, function(entry, key) {
		var part = Base.capitalize(key),
			lookup = entry[2];
		this[key] = {
			type: entry[1],
			property: key,
			attribute: entry[0],
			toSVG: lookup,
			fromSVG: lookup && Base.each(lookup, function(value, name) {
				this[value] = name;
			}, {}),
			exportFilter: entry[3],
			get: 'get' + part,
			set: 'set' + part
		};
	}, {});
	
	var SVGNamespaces = {
		href: 'http://www.w3.org/1999/xlink',
		xlink: 'http://www.w3.org/2000/xmlns'
	};
	
	new function() {
		var formatter;
	
		function setAttributes(node, attrs) {
			for (var key in attrs) {
				var val = attrs[key],
					namespace = SVGNamespaces[key];
				if (typeof val === 'number')
					val = formatter.number(val);
				if (namespace) {
					node.setAttributeNS(namespace, key, val);
				} else {
					node.setAttribute(key, val);
				}
			}
			return node;
		}
	
		function createElement(tag, attrs) {
			return setAttributes(
				document.createElementNS('http://www.w3.org/2000/svg', tag), attrs);
		}
	
		function getTransform(matrix, coordinates, center) {
			var attrs = new Base(),
				trans = matrix.getTranslation();
			if (coordinates) {
				matrix = matrix.shiftless();
				var point = matrix._inverseTransform(trans);
				attrs[center ? 'cx' : 'x'] = point.x;
				attrs[center ? 'cy' : 'y'] = point.y;
				trans = null;
			}
			if (!matrix.isIdentity()) {
				var decomposed = matrix.decompose();
				if (decomposed && !decomposed.shearing) {
					var parts = [],
						angle = decomposed.rotation,
						scale = decomposed.scaling;
					if (trans && !trans.isZero())
						parts.push('translate(' + formatter.point(trans) + ')');
					if (!Numerical.isZero(scale.x - 1)
							|| !Numerical.isZero(scale.y - 1))
						parts.push('scale(' + formatter.point(scale) +')');
					if (angle)
						parts.push('rotate(' + formatter.number(angle) + ')');
					attrs.transform = parts.join(' ');
				} else {
					attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
				}
			}
			return attrs;
		}
	
		function exportGroup(item, options) {
			var attrs = getTransform(item._matrix),
				children = item._children;
			var node = createElement('g', attrs);
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				var childNode = exportSVG(child, options);
				if (childNode) {
					if (child.isClipMask()) {
						var clip = createElement('clipPath');
						clip.appendChild(childNode);
						setDefinition(child, clip, 'clip');
						setAttributes(node, {
							'clip-path': 'url(#' + clip.id + ')'
						});
					} else {
						node.appendChild(childNode);
					}
				}
			}
			return node;
		}
	
		function exportRaster(item, options) {
			var attrs = getTransform(item._matrix, true),
				size = item.getSize(),
				image = item.getImage();
			attrs.x -= size.width / 2;
			attrs.y -= size.height / 2;
			attrs.width = size.width;
			attrs.height = size.height;
			attrs.href = options.embedImages === false && image && image.src
					|| item.toDataURL();
			return createElement('image', attrs);
		}
	
		function exportPath(item, options) {
			var matchShapes = options.matchShapes;
			if (matchShapes) {
				var shape = item.toShape(false);
				if (shape)
					return exportShape(shape, options);
			}
			var segments = item._segments,
				type,
				attrs = getTransform(item._matrix);
			if (segments.length === 0)
				return null;
			if (matchShapes && !item.hasHandles()) {
				if (segments.length >= 3) {
					type = item._closed ? 'polygon' : 'polyline';
					var parts = [];
					for(var i = 0, l = segments.length; i < l; i++)
						parts.push(formatter.point(segments[i]._point));
					attrs.points = parts.join(' ');
				} else {
					type = 'line';
					var first = segments[0]._point,
						last = segments[segments.length - 1]._point;
					attrs.set({
						x1: first.x,
						y1: first.y,
						x2: last.x,
						y2: last.y
					});
				}
			} else {
				type = 'path';
				attrs.d = item.getPathData(null, options.precision);
			}
			return createElement(type, attrs);
		}
	
		function exportShape(item) {
			var type = item._type,
				radius = item._radius,
				attrs = getTransform(item._matrix, true, type !== 'rectangle');
			if (type === 'rectangle') {
				type = 'rect';
				var size = item._size,
					width = size.width,
					height = size.height;
				attrs.x -= width / 2;
				attrs.y -= height / 2;
				attrs.width = width;
				attrs.height = height;
				if (radius.isZero())
					radius = null;
			}
			if (radius) {
				if (type === 'circle') {
					attrs.r = radius;
				} else {
					attrs.rx = radius.width;
					attrs.ry = radius.height;
				}
			}
			return createElement(type, attrs);
		}
	
		function exportCompoundPath(item, options) {
			var attrs = getTransform(item._matrix);
			var data = item.getPathData(null, options.precision);
			if (data)
				attrs.d = data;
			return createElement('path', attrs);
		}
	
		function exportPlacedSymbol(item, options) {
			var attrs = getTransform(item._matrix, true),
				symbol = item.getSymbol(),
				symbolNode = getDefinition(symbol, 'symbol'),
				definition = symbol.getDefinition(),
				bounds = definition.getBounds();
			if (!symbolNode) {
				symbolNode = createElement('symbol', {
					viewBox: formatter.rectangle(bounds)
				});
				symbolNode.appendChild(exportSVG(definition, options));
				setDefinition(symbol, symbolNode, 'symbol');
			}
			attrs.href = '#' + symbolNode.id;
			attrs.x += bounds.x;
			attrs.y += bounds.y;
			attrs.width = formatter.number(bounds.width);
			attrs.height = formatter.number(bounds.height);
			attrs.overflow = 'visible';
			return createElement('use', attrs);
		}
	
		function exportGradient(color) {
			var gradientNode = getDefinition(color, 'color');
			if (!gradientNode) {
				var gradient = color.getGradient(),
					radial = gradient._radial,
					origin = color.getOrigin().transform(),
					destination = color.getDestination().transform(),
					attrs;
				if (radial) {
					attrs = {
						cx: origin.x,
						cy: origin.y,
						r: origin.getDistance(destination)
					};
					var highlight = color.getHighlight();
					if (highlight) {
						highlight = highlight.transform();
						attrs.fx = highlight.x;
						attrs.fy = highlight.y;
					}
				} else {
					attrs = {
						x1: origin.x,
						y1: origin.y,
						x2: destination.x,
						y2: destination.y
					};
				}
				attrs.gradientUnits = 'userSpaceOnUse';
				gradientNode = createElement(
						(radial ? 'radial' : 'linear') + 'Gradient', attrs);
				var stops = gradient._stops;
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i],
						stopColor = stop._color,
						alpha = stopColor.getAlpha();
					attrs = {
						offset: stop._rampPoint,
						'stop-color': stopColor.toCSS(true)
					};
					if (alpha < 1)
						attrs['stop-opacity'] = alpha;
					gradientNode.appendChild(createElement('stop', attrs));
				}
				setDefinition(color, gradientNode, 'color');
			}
			return 'url(#' + gradientNode.id + ')';
		}
	
		function exportText(item) {
			var node = createElement('text', getTransform(item._matrix, true));
			node.textContent = item._content;
			return node;
		}
	
		var exporters = {
			Group: exportGroup,
			Layer: exportGroup,
			Raster: exportRaster,
			Path: exportPath,
			Shape: exportShape,
			CompoundPath: exportCompoundPath,
			PlacedSymbol: exportPlacedSymbol,
			PointText: exportText
		};
	
		function applyStyle(item, node, isRoot) {
			var attrs = {},
				parent = !isRoot && item.getParent();
	
			if (item._name != null)
				attrs.id = item._name;
	
			Base.each(SVGStyles, function(entry) {
				var get = entry.get,
					type = entry.type,
					value = item[get]();
				if (entry.exportFilter
						? entry.exportFilter(item, value)
						: !parent || !Base.equals(parent[get](), value)) {
					if (type === 'color' && value != null) {
						var alpha = value.getAlpha();
						if (alpha < 1)
							attrs[entry.attribute + '-opacity'] = alpha;
					}
					attrs[entry.attribute] = value == null
						? 'none'
						: type === 'number'
							? formatter.number(value)
							: type === 'color'
								? value.gradient
									? exportGradient(value, item)
									: value.toCSS(true)
								: type === 'array'
									? value.join(',')
									: type === 'lookup'
										? entry.toSVG[value]
										: value;
				}
			});
	
			if (attrs.opacity === 1)
				delete attrs.opacity;
	
			if (!item._visible)
				attrs.visibility = 'hidden';
	
			return setAttributes(node, attrs);
		}
	
		var definitions;
		function getDefinition(item, type) {
			if (!definitions)
				definitions = { ids: {}, svgs: {} };
			return item && definitions.svgs[type + '-' + item._id];
		}
	
		function setDefinition(item, node, type) {
			if (!definitions)
				getDefinition();
			var id = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
			node.id = type + '-' + id;
			definitions.svgs[type + '-' + item._id] = node;
		}
	
		function exportDefinitions(node, options) {
			var svg = node,
				defs = null;
			if (definitions) {
				svg = node.nodeName.toLowerCase() === 'svg' && node;
				for (var i in definitions.svgs) {
					if (!defs) {
						if (!svg) {
							svg = createElement('svg');
							svg.appendChild(node);
						}
						defs = svg.insertBefore(createElement('defs'),
								svg.firstChild);
					}
					defs.appendChild(definitions.svgs[i]);
				}
				definitions = null;
			}
			return options.asString
					? new XMLSerializer().serializeToString(svg)
					: svg;
		}
	
		function exportSVG(item, options, isRoot) {
			var exporter = exporters[item._class],
				node = exporter && exporter(item, options);
			if (node) {
				var onExport = options.onExport;
				if (onExport)
					node = onExport(item, node, options) || node;
				var data = JSON.stringify(item._data);
				if (data && data !== '{}' && data !== 'null')
					node.setAttribute('data-paper-data', data);
			}
			return node && applyStyle(item, node, isRoot);
		}
	
		function setOptions(options) {
			if (!options)
				options = {};
			formatter = new Formatter(options.precision);
			return options;
		}
	
		Item.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				return exportDefinitions(exportSVG(this, options, true), options);
			}
		});
	
		Project.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				var layers = this.layers,
					view = this.getView(),
					size = view.getViewSize(),
					node = createElement('svg', {
						x: 0,
						y: 0,
						width: size.width,
						height: size.height,
						version: '1.1',
						xmlns: 'http://www.w3.org/2000/svg',
						'xmlns:xlink': 'http://www.w3.org/1999/xlink'
					}),
					parent = node,
					matrix = view._matrix;
				if (!matrix.isIdentity())
					parent = node.appendChild(
							createElement('g', getTransform(matrix)));
				for (var i = 0, l = layers.length; i < l; i++)
					parent.appendChild(exportSVG(layers[i], options, true));
				return exportDefinitions(node, options);
			}
		});
	};
	
	new function() {
	
		function getValue(node, name, isString, allowNull) {
			var namespace = SVGNamespaces[name],
				value = namespace
					? node.getAttributeNS(namespace, name)
					: node.getAttribute(name);
			if (value === 'null')
				value = null;
			return value == null
					? allowNull
						? null
						: isString
							? ''
							: 0
					: isString
						? value
						: parseFloat(value);
		}
	
		function getPoint(node, x, y, allowNull) {
			x = getValue(node, x, false, allowNull);
			y = getValue(node, y, false, allowNull);
			return allowNull && (x == null || y == null) ? null
					: new Point(x, y);
		}
	
		function getSize(node, w, h, allowNull) {
			w = getValue(node, w, false, allowNull);
			h = getValue(node, h, false, allowNull);
			return allowNull && (w == null || h == null) ? null
					: new Size(w, h);
		}
	
		function convertValue(value, type, lookup) {
			return value === 'none'
					? null
					: type === 'number'
						? parseFloat(value)
						: type === 'array'
							? value ? value.split(/[\s,]+/g).map(parseFloat) : []
							: type === 'color'
								? getDefinition(value) || value
								: type === 'lookup'
									? lookup[value]
									: value;
		}
	
		function importGroup(node, type, options, isRoot) {
			var nodes = node.childNodes,
				isClip = type === 'clippath',
				item = new Group(),
				project = item._project,
				currentStyle = project._currentStyle,
				children = [];
			if (!isClip) {
				item = applyAttributes(item, node, isRoot);
				project._currentStyle = item._style.clone();
			}
			if (isRoot) {
				var defs = node.querySelectorAll('defs');
				for (var i = 0, l = defs.length; i < l; i++) {
					importSVG(defs[i], options, false);
				}
			}
			for (var i = 0, l = nodes.length; i < l; i++) {
				var childNode = nodes[i],
					child;
				if (childNode.nodeType === 1
						&& childNode.nodeName.toLowerCase() !== 'defs'
						&& (child = importSVG(childNode, options, false))
						&& !(child instanceof Symbol))
					children.push(child);
			}
			item.addChildren(children);
			if (isClip)
				item = applyAttributes(item.reduce(), node, isRoot);
			project._currentStyle = currentStyle;
			if (isClip || type === 'defs') {
				item.remove();
				item = null;
			}
			return item;
		}
	
		function importPoly(node, type) {
			var coords = node.getAttribute('points').match(
						/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),
				points = [];
			for (var i = 0, l = coords.length; i < l; i += 2)
				points.push(new Point(
						parseFloat(coords[i]),
						parseFloat(coords[i + 1])));
			var path = new Path(points);
			if (type === 'polygon')
				path.closePath();
			return path;
		}
	
		function importPath(node) {
			var data = node.getAttribute('d'),
				param = { pathData: data };
			return (data.match(/m/gi) || []).length > 1 || /z\S+/i.test(data)
					? new CompoundPath(param)
					: new Path(param);
		}
	
		function importGradient(node, type) {
			var id = (getValue(node, 'href', true) || '').substring(1),
				isRadial = type === 'radialgradient',
				gradient;
			if (id) {
				gradient = definitions[id].getGradient();
			} else {
				var nodes = node.childNodes,
					stops = [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1)
						stops.push(applyAttributes(new GradientStop(), child));
				}
				gradient = new Gradient(stops, isRadial);
			}
			var origin, destination, highlight;
			if (isRadial) {
				origin = getPoint(node, 'cx', 'cy');
				destination = origin.add(getValue(node, 'r'), 0);
				highlight = getPoint(node, 'fx', 'fy', true);
			} else {
				origin = getPoint(node, 'x1', 'y1');
				destination = getPoint(node, 'x2', 'y2');
			}
			applyAttributes(
				new Color(gradient, origin, destination, highlight), node);
			return null;
		}
	
		var importers = {
			'#document': function (node, type, options, isRoot) {
				var nodes = node.childNodes;
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1) {
						var next = child.nextSibling;
						document.body.appendChild(child);
						var item = importSVG(child, options, isRoot);
						if (next) {
							node.insertBefore(child, next);
						} else {
							node.appendChild(child);
						}
						return item;
					}
				}
			},
			g: importGroup,
			svg: importGroup,
			clippath: importGroup,
			polygon: importPoly,
			polyline: importPoly,
			path: importPath,
			lineargradient: importGradient,
			radialgradient: importGradient,
	
			image: function (node) {
				var raster = new Raster(getValue(node, 'href', true));
				raster.on('load', function() {
					var size = getSize(node, 'width', 'height');
					this.setSize(size);
					var center = this._matrix._transformPoint(
							getPoint(node, 'x', 'y').add(size.divide(2)));
					this.translate(center);
				});
				return raster;
			},
	
			symbol: function(node, type, options, isRoot) {
				return new Symbol(importGroup(node, type, options, isRoot), true);
			},
	
			defs: importGroup,
	
			use: function(node) {
				var id = (getValue(node, 'href', true) || '').substring(1),
					definition = definitions[id],
					point = getPoint(node, 'x', 'y');
				return definition
						? definition instanceof Symbol
							? definition.place(point)
							: definition.clone().translate(point)
						: null;
			},
	
			circle: function(node) {
				return new Shape.Circle(getPoint(node, 'cx', 'cy'),
						getValue(node, 'r'));
			},
	
			ellipse: function(node) {
				return new Shape.Ellipse({
					center: getPoint(node, 'cx', 'cy'),
					radius: getSize(node, 'rx', 'ry')
				});
			},
	
			rect: function(node) {
				var point = getPoint(node, 'x', 'y'),
					size = getSize(node, 'width', 'height'),
					radius = getSize(node, 'rx', 'ry');
				return new Shape.Rectangle(new Rectangle(point, size), radius);
			},
	
			line: function(node) {
				return new Path.Line(getPoint(node, 'x1', 'y1'),
						getPoint(node, 'x2', 'y2'));
			},
	
			text: function(node) {
				var text = new PointText(getPoint(node, 'x', 'y')
						.add(getPoint(node, 'dx', 'dy')));
				text.setContent(node.textContent.trim() || '');
				return text;
			}
		};
	
		function applyTransform(item, value, name, node) {
			var transforms = (node.getAttribute(name) || '').split(/\)\s*/g),
				matrix = new Matrix();
			for (var i = 0, l = transforms.length; i < l; i++) {
				var transform = transforms[i];
				if (!transform)
					break;
				var parts = transform.split(/\(\s*/),
					command = parts[0],
					v = parts[1].split(/[\s,]+/g);
				for (var j = 0, m = v.length; j < m; j++)
					v[j] = parseFloat(v[j]);
				switch (command) {
				case 'matrix':
					matrix.concatenate(
							new Matrix(v[0], v[1], v[2], v[3], v[4], v[5]));
					break;
				case 'rotate':
					matrix.rotate(v[0], v[1], v[2]);
					break;
				case 'translate':
					matrix.translate(v[0], v[1]);
					break;
				case 'scale':
					matrix.scale(v);
					break;
				case 'skewX':
					matrix.skew(v[0], 0);
					break;
				case 'skewY':
					matrix.skew(0, v[0]);
					break;
				}
			}
			item.transform(matrix);
		}
	
		function applyOpacity(item, value, name) {
			var color = item[name === 'fill-opacity' ? 'getFillColor'
					: 'getStrokeColor']();
			if (color)
				color.setAlpha(parseFloat(value));
		}
	
		var attributes = Base.set(Base.each(SVGStyles, function(entry) {
			this[entry.attribute] = function(item, value) {
				item[entry.set](convertValue(value, entry.type, entry.fromSVG));
				if (entry.type === 'color' && item instanceof Shape) {
					var color = item[entry.get]();
					if (color)
						color.transform(new Matrix().translate(
								item.getPosition(true).negate()));
				}
			};
		}, {}), {
			id: function(item, value) {
				definitions[value] = item;
				if (item.setName)
					item.setName(value);
			},
	
			'clip-path': function(item, value) {
				var clip = getDefinition(value);
				if (clip) {
					clip = clip.clone();
					clip.setClipMask(true);
					if (item instanceof Group) {
						item.insertChild(0, clip);
					} else {
						return new Group(clip, item);
					}
				}
			},
	
			gradientTransform: applyTransform,
			transform: applyTransform,
	
			'fill-opacity': applyOpacity,
			'stroke-opacity': applyOpacity,
	
			visibility: function(item, value) {
				item.setVisible(value === 'visible');
			},
	
			display: function(item, value) {
				item.setVisible(value !== null);
			},
	
			'stop-color': function(item, value) {
				if (item.setColor)
					item.setColor(value);
			},
	
			'stop-opacity': function(item, value) {
				if (item._color)
					item._color.setAlpha(parseFloat(value));
			},
	
			offset: function(item, value) {
				var percentage = value.match(/(.*)%$/);
				item.setRampPoint(percentage
						? percentage[1] / 100
						: parseFloat(value));
			},
	
			viewBox: function(item, value, name, node, styles) {
				var rect = new Rectangle(convertValue(value, 'array')),
					size = getSize(node, 'width', 'height', true);
				if (item instanceof Group) {
					var scale = size ? rect.getSize().divide(size) : 1,
						matrix = new Matrix().translate(rect.getPoint()).scale(scale);
					item.transform(matrix.inverted());
				} else if (item instanceof Symbol) {
					if (size)
						rect.setSize(size);
					var clip = getAttribute(node, 'overflow', styles) != 'visible',
						group = item._definition;
					if (clip && !rect.contains(group.getBounds())) {
						clip = new Shape.Rectangle(rect).transform(group._matrix);
						clip.setClipMask(true);
						group.addChild(clip);
					}
				}
			}
		});
	
		function getAttribute(node, name, styles) {
			var attr = node.attributes[name],
				value = attr && attr.value;
			if (!value) {
				var style = Base.camelize(name);
				value = node.style[style];
				if (!value && styles.node[style] !== styles.parent[style])
					value = styles.node[style];
			}
			return !value
					? undefined
					: value === 'none'
						? null
						: value;
		}
	
		function applyAttributes(item, node, isRoot) {
			var styles = {
				node: DomElement.getStyles(node) || {},
				parent: !isRoot && DomElement.getStyles(node.parentNode) || {}
			};
			Base.each(attributes, function(apply, name) {
				var value = getAttribute(node, name, styles);
				if (value !== undefined)
					item = Base.pick(apply(item, value, name, node, styles), item);
			});
			return item;
		}
	
		var definitions = {};
		function getDefinition(value) {
			var match = value && value.match(/\((?:#|)([^)']+)/);
			return match && definitions[match[1]];
		}
	
		function importSVG(source, options, isRoot) {
			if (!source)
				return null;
			if (!options) {
				options = {};
			} else if (typeof options === 'function') {
				options = { onLoad: options };
			}
	
			var node = source,
				scope = paper;
	
			function onLoadCallback(svg) {
				paper = scope;
				var item = importSVG(svg, options, isRoot),
					onLoad = options.onLoad,
					view = scope.project && scope.getView();
				if (onLoad)
					onLoad.call(this, item);
				view.update();
			}
	
			if (isRoot) {
				if (typeof source === 'string' && !/^.*</.test(source)) {
					node = document.getElementById(source);
					if (node) {
						source = null;
					} else {
						return Http.request('get', source, onLoadCallback);
					}
				} else if (typeof File !== 'undefined' && source instanceof File) {
					var reader = new FileReader();
					reader.onload = function() {
						onLoadCallback(reader.result);
					};
					return reader.readAsText(source);
				}
			}
	
			if (typeof source === 'string')
				node = new DOMParser().parseFromString(source, 'image/svg+xml');
			if (!node.nodeName)
				throw new Error('Unsupported SVG source: ' + source);
			var type = node.nodeName.toLowerCase(),
				importer = importers[type],
				item,
				data = node.getAttribute && node.getAttribute('data-paper-data'),
				settings = scope.settings,
				applyMatrix = settings.applyMatrix;
			settings.applyMatrix = false;
			item = importer && importer(node, type, options, isRoot) || null;
			settings.applyMatrix = applyMatrix;
			if (item) {
				if (type !== '#document' && !(item instanceof Group))
					item = applyAttributes(item, node, isRoot);
				var onImport = options.onImport;
				if (onImport)
					item = onImport(node, item, options) || item;
				if (options.expandShapes && item instanceof Shape) {
					item.remove();
					item = item.toPath();
				}
				if (data)
					item._data = JSON.parse(data);
			}
			if (isRoot) {
				definitions = {};
				if (item && Base.pick(options.applyMatrix, applyMatrix))
					item.matrix.apply(true, true);
			}
			return item;
		}
	
		Item.inject({
			importSVG: function(node, options) {
				return this.addChild(importSVG(node, options, true));
			}
		});
	
		Project.inject({
			importSVG: function(node, options) {
				this.activate();
				return importSVG(node, options, true);
			}
		});
	};
	
	Base.exports.PaperScript = (function() {
		var exports, define,
			scope = this;
	!function(e,r){return"object"==typeof exports&&"object"==typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):(r(e.acorn||(e.acorn={})),void 0)}(this,function(e){"use strict";function r(e){fr=e||{};for(var r in mr)Object.prototype.hasOwnProperty.call(fr,r)||(fr[r]=mr[r]);hr=fr.sourceFile||null}function t(e,r){var t=vr(dr,e);r+=" ("+t.line+":"+t.column+")";var n=new SyntaxError(r);throw n.pos=e,n.loc=t,n.raisedAt=br,n}function n(e){function r(e){if(1==e.length)return t+="return str === "+JSON.stringify(e[0])+";";t+="switch(str){";for(var r=0;r<e.length;++r)t+="case "+JSON.stringify(e[r])+":";t+="return true}return false;"}e=e.split(" ");var t="",n=[];e:for(var a=0;a<e.length;++a){for(var o=0;o<n.length;++o)if(n[o][0].length==e[a].length){n[o].push(e[a]);continue e}n.push([e[a]])}if(n.length>3){n.sort(function(e,r){return r.length-e.length}),t+="switch(str.length){";for(var a=0;a<n.length;++a){var i=n[a];t+="case "+i[0].length+":",r(i)}t+="}"}else r(e);return new Function("str",t)}function a(){this.line=Ar,this.column=br-Sr}function o(){Ar=1,br=Sr=0,Er=!0,u()}function i(e,r){gr=br,fr.locations&&(kr=new a),wr=e,u(),Cr=r,Er=e.beforeExpr}function s(){var e=fr.onComment&&fr.locations&&new a,r=br,n=dr.indexOf("*/",br+=2);if(-1===n&&t(br-2,"Unterminated comment"),br=n+2,fr.locations){Kt.lastIndex=r;for(var o;(o=Kt.exec(dr))&&o.index<br;)++Ar,Sr=o.index+o[0].length}fr.onComment&&fr.onComment(!0,dr.slice(r+2,n),r,br,e,fr.locations&&new a)}function c(){for(var e=br,r=fr.onComment&&fr.locations&&new a,t=dr.charCodeAt(br+=2);pr>br&&10!==t&&13!==t&&8232!==t&&8233!==t;)++br,t=dr.charCodeAt(br);fr.onComment&&fr.onComment(!1,dr.slice(e+2,br),e,br,r,fr.locations&&new a)}function u(){for(;pr>br;){var e=dr.charCodeAt(br);if(32===e)++br;else if(13===e){++br;var r=dr.charCodeAt(br);10===r&&++br,fr.locations&&(++Ar,Sr=br)}else if(10===e||8232===e||8233===e)++br,fr.locations&&(++Ar,Sr=br);else if(e>8&&14>e)++br;else if(47===e){var r=dr.charCodeAt(br+1);if(42===r)s();else{if(47!==r)break;c()}}else if(160===e)++br;else{if(!(e>=5760&&Jt.test(String.fromCharCode(e))))break;++br}}}function l(){var e=dr.charCodeAt(br+1);return e>=48&&57>=e?E(!0):(++br,i(xt))}function f(){var e=dr.charCodeAt(br+1);return Er?(++br,k()):61===e?x(Et,2):x(wt,1)}function d(){var e=dr.charCodeAt(br+1);return 61===e?x(Et,2):x(Dt,1)}function p(e){var r=dr.charCodeAt(br+1);return r===e?x(124===e?Lt:Ut,2):61===r?x(Et,2):x(124===e?Rt:Tt,1)}function h(){var e=dr.charCodeAt(br+1);return 61===e?x(Et,2):x(Vt,1)}function m(e){var r=dr.charCodeAt(br+1);return r===e?45==r&&62==dr.charCodeAt(br+2)&&Gt.test(dr.slice(Lr,br))?(br+=3,c(),u(),g()):x(St,2):61===r?x(Et,2):x(At,1)}function v(e){var r=dr.charCodeAt(br+1),t=1;return r===e?(t=62===e&&62===dr.charCodeAt(br+2)?3:2,61===dr.charCodeAt(br+t)?x(Et,t+1):x(jt,t)):33==r&&60==e&&45==dr.charCodeAt(br+2)&&45==dr.charCodeAt(br+3)?(br+=4,c(),u(),g()):(61===r&&(t=61===dr.charCodeAt(br+2)?3:2),x(Ot,t))}function b(e){var r=dr.charCodeAt(br+1);return 61===r?x(qt,61===dr.charCodeAt(br+2)?3:2):x(61===e?Ct:It,1)}function y(e){switch(e){case 46:return l();case 40:return++br,i(mt);case 41:return++br,i(vt);case 59:return++br,i(yt);case 44:return++br,i(bt);case 91:return++br,i(ft);case 93:return++br,i(dt);case 123:return++br,i(pt);case 125:return++br,i(ht);case 58:return++br,i(gt);case 63:return++br,i(kt);case 48:var r=dr.charCodeAt(br+1);if(120===r||88===r)return C();case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return E(!1);case 34:case 39:return A(e);case 47:return f(e);case 37:case 42:return d();case 124:case 38:return p(e);case 94:return h();case 43:case 45:return m(e);case 60:case 62:return v(e);case 61:case 33:return b(e);case 126:return x(It,1)}return!1}function g(e){if(e?br=yr+1:yr=br,fr.locations&&(xr=new a),e)return k();if(br>=pr)return i(Br);var r=dr.charCodeAt(br);if(Qt(r)||92===r)return L();var n=y(r);if(n===!1){var o=String.fromCharCode(r);if("\\"===o||$t.test(o))return L();t(br,"Unexpected character '"+o+"'")}return n}function x(e,r){var t=dr.slice(br,br+r);br+=r,i(e,t)}function k(){for(var e,r,n="",a=br;;){br>=pr&&t(a,"Unterminated regular expression");var o=dr.charAt(br);if(Gt.test(o)&&t(a,"Unterminated regular expression"),e)e=!1;else{if("["===o)r=!0;else if("]"===o&&r)r=!1;else if("/"===o&&!r)break;e="\\"===o}++br}var n=dr.slice(a,br);++br;var s=I();return s&&!/^[gmsiy]*$/.test(s)&&t(a,"Invalid regexp flag"),i(jr,new RegExp(n,s))}function w(e,r){for(var t=br,n=0,a=0,o=null==r?1/0:r;o>a;++a){var i,s=dr.charCodeAt(br);if(i=s>=97?s-97+10:s>=65?s-65+10:s>=48&&57>=s?s-48:1/0,i>=e)break;++br,n=n*e+i}return br===t||null!=r&&br-t!==r?null:n}function C(){br+=2;var e=w(16);return null==e&&t(yr+2,"Expected hexadecimal number"),Qt(dr.charCodeAt(br))&&t(br,"Identifier directly after number"),i(Or,e)}function E(e){var r=br,n=!1,a=48===dr.charCodeAt(br);e||null!==w(10)||t(r,"Invalid number"),46===dr.charCodeAt(br)&&(++br,w(10),n=!0);var o=dr.charCodeAt(br);(69===o||101===o)&&(o=dr.charCodeAt(++br),(43===o||45===o)&&++br,null===w(10)&&t(r,"Invalid number"),n=!0),Qt(dr.charCodeAt(br))&&t(br,"Identifier directly after number");var s,c=dr.slice(r,br);return n?s=parseFloat(c):a&&1!==c.length?/[89]/.test(c)||Tr?t(r,"Invalid number"):s=parseInt(c,8):s=parseInt(c,10),i(Or,s)}function A(e){br++;for(var r="";;){br>=pr&&t(yr,"Unterminated string constant");var n=dr.charCodeAt(br);if(n===e)return++br,i(Dr,r);if(92===n){n=dr.charCodeAt(++br);var a=/^[0-7]+/.exec(dr.slice(br,br+3));for(a&&(a=a[0]);a&&parseInt(a,8)>255;)a=a.slice(0,a.length-1);if("0"===a&&(a=null),++br,a)Tr&&t(br-2,"Octal literal in strict mode"),r+=String.fromCharCode(parseInt(a,8)),br+=a.length-1;else switch(n){case 110:r+="\n";break;case 114:r+="\r";break;case 120:r+=String.fromCharCode(S(2));break;case 117:r+=String.fromCharCode(S(4));break;case 85:r+=String.fromCharCode(S(8));break;case 116:r+="	";break;case 98:r+="\b";break;case 118:r+="";break;case 102:r+="\f";break;case 48:r+="\0";break;case 13:10===dr.charCodeAt(br)&&++br;case 10:fr.locations&&(Sr=br,++Ar);break;default:r+=String.fromCharCode(n)}}else(13===n||10===n||8232===n||8233===n)&&t(yr,"Unterminated string constant"),r+=String.fromCharCode(n),++br}}function S(e){var r=w(16,e);return null===r&&t(yr,"Bad character escape sequence"),r}function I(){Bt=!1;for(var e,r=!0,n=br;;){var a=dr.charCodeAt(br);if(Yt(a))Bt&&(e+=dr.charAt(br)),++br;else{if(92!==a)break;Bt||(e=dr.slice(n,br)),Bt=!0,117!=dr.charCodeAt(++br)&&t(br,"Expecting Unicode escape sequence \\uXXXX"),++br;var o=S(4),i=String.fromCharCode(o);i||t(br-1,"Invalid Unicode escape"),(r?Qt(o):Yt(o))||t(br-4,"Invalid Unicode escape"),e+=i}r=!1}return Bt?e:dr.slice(n,br)}function L(){var e=I(),r=Fr;return Bt||(Wt(e)?r=lt[e]:(fr.forbidReserved&&(3===fr.ecmaVersion?Mt:zt)(e)||Tr&&Xt(e))&&t(yr,"The keyword '"+e+"' is reserved")),i(r,e)}function U(){Ir=yr,Lr=gr,Ur=kr,g()}function R(e){if(Tr=e,br=Lr,fr.locations)for(;Sr>br;)Sr=dr.lastIndexOf("\n",Sr-2)+1,--Ar;u(),g()}function V(){this.type=null,this.start=yr,this.end=null}function T(){this.start=xr,this.end=null,null!==hr&&(this.source=hr)}function q(){var e=new V;return fr.locations&&(e.loc=new T),fr.ranges&&(e.range=[yr,0]),e}function O(e){var r=new V;return r.start=e.start,fr.locations&&(r.loc=new T,r.loc.start=e.loc.start),fr.ranges&&(r.range=[e.range[0],0]),r}function j(e,r){return e.type=r,e.end=Lr,fr.locations&&(e.loc.end=Ur),fr.ranges&&(e.range[1]=Lr),e}function D(e){return fr.ecmaVersion>=5&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"use strict"===e.expression.value}function F(e){return wr===e?(U(),!0):void 0}function B(){return!fr.strictSemicolons&&(wr===Br||wr===ht||Gt.test(dr.slice(Lr,yr)))}function M(){F(yt)||B()||X()}function z(e){wr===e?U():X()}function X(){t(yr,"Unexpected token")}function N(e){"Identifier"!==e.type&&"MemberExpression"!==e.type&&t(e.start,"Assigning to rvalue"),Tr&&"Identifier"===e.type&&Nt(e.name)&&t(e.start,"Assigning to "+e.name+" in strict mode")}function W(e){Ir=Lr=br,fr.locations&&(Ur=new a),Rr=Tr=null,Vr=[],g();var r=e||q(),t=!0;for(e||(r.body=[]);wr!==Br;){var n=J();r.body.push(n),t&&D(n)&&R(!0),t=!1}return j(r,"Program")}function J(){(wr===wt||wr===Et&&"/="==Cr)&&g(!0);var e=wr,r=q();switch(e){case Mr:case Nr:U();var n=e===Mr;F(yt)||B()?r.label=null:wr!==Fr?X():(r.label=lr(),M());for(var a=0;a<Vr.length;++a){var o=Vr[a];if(null==r.label||o.name===r.label.name){if(null!=o.kind&&(n||"loop"===o.kind))break;if(r.label&&n)break}}return a===Vr.length&&t(r.start,"Unsyntactic "+e.keyword),j(r,n?"BreakStatement":"ContinueStatement");case Wr:return U(),M(),j(r,"DebuggerStatement");case Pr:return U(),Vr.push(Zt),r.body=J(),Vr.pop(),z(tt),r.test=P(),M(),j(r,"DoWhileStatement");case _r:if(U(),Vr.push(Zt),z(mt),wr===yt)return $(r,null);if(wr===rt){var i=q();return U(),G(i,!0),j(i,"VariableDeclaration"),1===i.declarations.length&&F(ut)?_(r,i):$(r,i)}var i=K(!1,!0);return F(ut)?(N(i),_(r,i)):$(r,i);case Gr:return U(),cr(r,!0);case Kr:return U(),r.test=P(),r.consequent=J(),r.alternate=F(Hr)?J():null,j(r,"IfStatement");case Qr:return Rr||t(yr,"'return' outside of function"),U(),F(yt)||B()?r.argument=null:(r.argument=K(),M()),j(r,"ReturnStatement");case Yr:U(),r.discriminant=P(),r.cases=[],z(pt),Vr.push(en);for(var s,c;wr!=ht;)if(wr===zr||wr===Jr){var u=wr===zr;s&&j(s,"SwitchCase"),r.cases.push(s=q()),s.consequent=[],U(),u?s.test=K():(c&&t(Ir,"Multiple default clauses"),c=!0,s.test=null),z(gt)}else s||X(),s.consequent.push(J());return s&&j(s,"SwitchCase"),U(),Vr.pop(),j(r,"SwitchStatement");case Zr:return U(),Gt.test(dr.slice(Lr,yr))&&t(Lr,"Illegal newline after throw"),r.argument=K(),M(),j(r,"ThrowStatement");case et:if(U(),r.block=H(),r.handler=null,wr===Xr){var l=q();U(),z(mt),l.param=lr(),Tr&&Nt(l.param.name)&&t(l.param.start,"Binding "+l.param.name+" in strict mode"),z(vt),l.guard=null,l.body=H(),r.handler=j(l,"CatchClause")}return r.guardedHandlers=qr,r.finalizer=F($r)?H():null,r.handler||r.finalizer||t(r.start,"Missing catch or finally clause"),j(r,"TryStatement");case rt:return U(),G(r),M(),j(r,"VariableDeclaration");case tt:return U(),r.test=P(),Vr.push(Zt),r.body=J(),Vr.pop(),j(r,"WhileStatement");case nt:return Tr&&t(yr,"'with' in strict mode"),U(),r.object=P(),r.body=J(),j(r,"WithStatement");case pt:return H();case yt:return U(),j(r,"EmptyStatement");default:var f=Cr,d=K();if(e===Fr&&"Identifier"===d.type&&F(gt)){for(var a=0;a<Vr.length;++a)Vr[a].name===f&&t(d.start,"Label '"+f+"' is already declared");var p=wr.isLoop?"loop":wr===Yr?"switch":null;return Vr.push({name:f,kind:p}),r.body=J(),Vr.pop(),r.label=d,j(r,"LabeledStatement")}return r.expression=d,M(),j(r,"ExpressionStatement")}}function P(){z(mt);var e=K();return z(vt),e}function H(e){var r,t=q(),n=!0,a=!1;for(t.body=[],z(pt);!F(ht);){var o=J();t.body.push(o),n&&e&&D(o)&&(r=a,R(a=!0)),n=!1}return a&&!r&&R(!1),j(t,"BlockStatement")}function $(e,r){return e.init=r,z(yt),e.test=wr===yt?null:K(),z(yt),e.update=wr===vt?null:K(),z(vt),e.body=J(),Vr.pop(),j(e,"ForStatement")}function _(e,r){return e.left=r,e.right=K(),z(vt),e.body=J(),Vr.pop(),j(e,"ForInStatement")}function G(e,r){for(e.declarations=[],e.kind="var";;){var n=q();if(n.id=lr(),Tr&&Nt(n.id.name)&&t(n.id.start,"Binding "+n.id.name+" in strict mode"),n.init=F(Ct)?K(!0,r):null,e.declarations.push(j(n,"VariableDeclarator")),!F(bt))break}return e}function K(e,r){var t=Q(r);if(!e&&wr===bt){var n=O(t);for(n.expressions=[t];F(bt);)n.expressions.push(Q(r));return j(n,"SequenceExpression")}return t}function Q(e){var r=Y(e);if(wr.isAssign){var t=O(r);return t.operator=Cr,t.left=r,U(),t.right=Q(e),N(r),j(t,"AssignmentExpression")}return r}function Y(e){var r=Z(e);if(F(kt)){var t=O(r);return t.test=r,t.consequent=K(!0),z(gt),t.alternate=K(!0,e),j(t,"ConditionalExpression")}return r}function Z(e){return er(rr(),-1,e)}function er(e,r,t){var n=wr.binop;if(null!=n&&(!t||wr!==ut)&&n>r){var a=O(e);a.left=e,a.operator=Cr,U(),a.right=er(rr(),n,t);var o=j(a,/&&|\|\|/.test(a.operator)?"LogicalExpression":"BinaryExpression");return er(o,r,t)}return e}function rr(){if(wr.prefix){var e=q(),r=wr.isUpdate;return e.operator=Cr,e.prefix=!0,Er=!0,U(),e.argument=rr(),r?N(e.argument):Tr&&"delete"===e.operator&&"Identifier"===e.argument.type&&t(e.start,"Deleting local variable in strict mode"),j(e,r?"UpdateExpression":"UnaryExpression")}for(var n=tr();wr.postfix&&!B();){var e=O(n);e.operator=Cr,e.prefix=!1,e.argument=n,N(n),U(),n=j(e,"UpdateExpression")}return n}function tr(){return nr(ar())}function nr(e,r){if(F(xt)){var t=O(e);return t.object=e,t.property=lr(!0),t.computed=!1,nr(j(t,"MemberExpression"),r)}if(F(ft)){var t=O(e);return t.object=e,t.property=K(),t.computed=!0,z(dt),nr(j(t,"MemberExpression"),r)}if(!r&&F(mt)){var t=O(e);return t.callee=e,t.arguments=ur(vt,!1),nr(j(t,"CallExpression"),r)}return e}function ar(){switch(wr){case ot:var e=q();return U(),j(e,"ThisExpression");case Fr:return lr();case Or:case Dr:case jr:var e=q();return e.value=Cr,e.raw=dr.slice(yr,gr),U(),j(e,"Literal");case it:case st:case ct:var e=q();return e.value=wr.atomValue,e.raw=wr.keyword,U(),j(e,"Literal");case mt:var r=xr,t=yr;U();var n=K();return n.start=t,n.end=gr,fr.locations&&(n.loc.start=r,n.loc.end=kr),fr.ranges&&(n.range=[t,gr]),z(vt),n;case ft:var e=q();return U(),e.elements=ur(dt,!0,!0),j(e,"ArrayExpression");case pt:return ir();case Gr:var e=q();return U(),cr(e,!1);case at:return or();default:X()}}function or(){var e=q();return U(),e.callee=nr(ar(),!0),e.arguments=F(mt)?ur(vt,!1):qr,j(e,"NewExpression")}function ir(){var e=q(),r=!0,n=!1;for(e.properties=[],U();!F(ht);){if(r)r=!1;else if(z(bt),fr.allowTrailingCommas&&F(ht))break;var a,o={key:sr()},i=!1;if(F(gt)?(o.value=K(!0),a=o.kind="init"):fr.ecmaVersion>=5&&"Identifier"===o.key.type&&("get"===o.key.name||"set"===o.key.name)?(i=n=!0,a=o.kind=o.key.name,o.key=sr(),wr!==mt&&X(),o.value=cr(q(),!1)):X(),"Identifier"===o.key.type&&(Tr||n))for(var s=0;s<e.properties.length;++s){var c=e.properties[s];if(c.key.name===o.key.name){var u=a==c.kind||i&&"init"===c.kind||"init"===a&&("get"===c.kind||"set"===c.kind);u&&!Tr&&"init"===a&&"init"===c.kind&&(u=!1),u&&t(o.key.start,"Redefinition of property")}}e.properties.push(o)}return j(e,"ObjectExpression")}function sr(){return wr===Or||wr===Dr?ar():lr(!0)}function cr(e,r){wr===Fr?e.id=lr():r?X():e.id=null,e.params=[];var n=!0;for(z(mt);!F(vt);)n?n=!1:z(bt),e.params.push(lr());var a=Rr,o=Vr;if(Rr=!0,Vr=[],e.body=H(!0),Rr=a,Vr=o,Tr||e.body.body.length&&D(e.body.body[0]))for(var i=e.id?-1:0;i<e.params.length;++i){var s=0>i?e.id:e.params[i];if((Xt(s.name)||Nt(s.name))&&t(s.start,"Defining '"+s.name+"' in strict mode"),i>=0)for(var c=0;i>c;++c)s.name===e.params[c].name&&t(s.start,"Argument name clash in strict mode")}return j(e,r?"FunctionDeclaration":"FunctionExpression")}function ur(e,r,t){for(var n=[],a=!0;!F(e);){if(a)a=!1;else if(z(bt),r&&fr.allowTrailingCommas&&F(e))break;t&&wr===bt?n.push(null):n.push(K(!0))}return n}function lr(e){var r=q();return r.name=wr===Fr?Cr:e&&!fr.forbidReserved&&wr.keyword||X(),Er=!1,U(),j(r,"Identifier")}e.version="0.4.0";var fr,dr,pr,hr;e.parse=function(e,t){return dr=String(e),pr=dr.length,r(t),o(),W(fr.program)};var mr=e.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,locations:!1,onComment:null,ranges:!1,program:null,sourceFile:null},vr=e.getLineInfo=function(e,r){for(var t=1,n=0;;){Kt.lastIndex=n;var a=Kt.exec(e);if(!(a&&a.index<r))break;++t,n=a.index+a[0].length}return{line:t,column:r-n}};e.tokenize=function(e,t){function n(e){return g(e),a.start=yr,a.end=gr,a.startLoc=xr,a.endLoc=kr,a.type=wr,a.value=Cr,a}dr=String(e),pr=dr.length,r(t),o();var a={};return n.jumpTo=function(e,r){if(br=e,fr.locations){Ar=1,Sr=Kt.lastIndex=0;for(var t;(t=Kt.exec(dr))&&t.index<e;)++Ar,Sr=t.index+t[0].length}Er=r,u()},n};var br,yr,gr,xr,kr,wr,Cr,Er,Ar,Sr,Ir,Lr,Ur,Rr,Vr,Tr,qr=[],Or={type:"num"},jr={type:"regexp"},Dr={type:"string"},Fr={type:"name"},Br={type:"eof"},Mr={keyword:"break"},zr={keyword:"case",beforeExpr:!0},Xr={keyword:"catch"},Nr={keyword:"continue"},Wr={keyword:"debugger"},Jr={keyword:"default"},Pr={keyword:"do",isLoop:!0},Hr={keyword:"else",beforeExpr:!0},$r={keyword:"finally"},_r={keyword:"for",isLoop:!0},Gr={keyword:"function"},Kr={keyword:"if"},Qr={keyword:"return",beforeExpr:!0},Yr={keyword:"switch"},Zr={keyword:"throw",beforeExpr:!0},et={keyword:"try"},rt={keyword:"var"},tt={keyword:"while",isLoop:!0},nt={keyword:"with"},at={keyword:"new",beforeExpr:!0},ot={keyword:"this"},it={keyword:"null",atomValue:null},st={keyword:"true",atomValue:!0},ct={keyword:"false",atomValue:!1},ut={keyword:"in",binop:7,beforeExpr:!0},lt={"break":Mr,"case":zr,"catch":Xr,"continue":Nr,"debugger":Wr,"default":Jr,"do":Pr,"else":Hr,"finally":$r,"for":_r,"function":Gr,"if":Kr,"return":Qr,"switch":Yr,"throw":Zr,"try":et,"var":rt,"while":tt,"with":nt,"null":it,"true":st,"false":ct,"new":at,"in":ut,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:!0},"this":ot,"typeof":{keyword:"typeof",prefix:!0,beforeExpr:!0},"void":{keyword:"void",prefix:!0,beforeExpr:!0},"delete":{keyword:"delete",prefix:!0,beforeExpr:!0}},ft={type:"[",beforeExpr:!0},dt={type:"]"},pt={type:"{",beforeExpr:!0},ht={type:"}"},mt={type:"(",beforeExpr:!0},vt={type:")"},bt={type:",",beforeExpr:!0},yt={type:";",beforeExpr:!0},gt={type:":",beforeExpr:!0},xt={type:"."},kt={type:"?",beforeExpr:!0},wt={binop:10,beforeExpr:!0},Ct={isAssign:!0,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},At={binop:9,prefix:!0,beforeExpr:!0},St={postfix:!0,prefix:!0,isUpdate:!0},It={prefix:!0,beforeExpr:!0},Lt={binop:1,beforeExpr:!0},Ut={binop:2,beforeExpr:!0},Rt={binop:3,beforeExpr:!0},Vt={binop:4,beforeExpr:!0},Tt={binop:5,beforeExpr:!0},qt={binop:6,beforeExpr:!0},Ot={binop:7,beforeExpr:!0},jt={binop:8,beforeExpr:!0},Dt={binop:10,beforeExpr:!0};e.tokTypes={bracketL:ft,bracketR:dt,braceL:pt,braceR:ht,parenL:mt,parenR:vt,comma:bt,semi:yt,colon:gt,dot:xt,question:kt,slash:wt,eq:Ct,name:Fr,eof:Br,num:Or,regexp:jr,string:Dr};for(var Ft in lt)e.tokTypes["_"+Ft]=lt[Ft];var Bt,Mt=n("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),zt=n("class enum extends super const export import"),Xt=n("implements interface let package private protected public static yield"),Nt=n("eval arguments"),Wt=n("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),Jt=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,Pt="\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",Ht="\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",$t=new RegExp("["+Pt+"]"),_t=new RegExp("["+Pt+Ht+"]"),Gt=/[\n\r\u2028\u2029]/,Kt=/\r\n|[\n\r\u2028\u2029]/g,Qt=e.isIdentifierStart=function(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&$t.test(String.fromCharCode(e))},Yt=e.isIdentifierChar=function(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&_t.test(String.fromCharCode(e))},Zt={kind:"loop"},en={kind:"switch"}});
	
		var binaryOperators = {
			'+': '__add',
			'-': '__subtract',
			'*': '__multiply',
			'/': '__divide',
			'%': '__modulo',
			'==': 'equals',
			'!=': 'equals'
		};
	
		var unaryOperators = {
			'-': '__negate',
			'+': null
		};
	
		var fields = Base.each(
			['add', 'subtract', 'multiply', 'divide', 'modulo', 'negate'],
			function(name) {
				this['__' + name] = '#' + name;
			},
			{}
		);
		Point.inject(fields);
		Size.inject(fields);
		Color.inject(fields);
	
		function __$__(left, operator, right) {
			var handler = binaryOperators[operator];
			if (left && left[handler]) {
				var res = left[handler](right);
				return operator === '!=' ? !res : res;
			}
			switch (operator) {
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return left / right;
			case '%': return left % right;
			case '==': return left == right;
			case '!=': return left != right;
			}
		}
	
		function $__(operator, value) {
			var handler = unaryOperators[operator];
			if (handler && value && value[handler])
				return value[handler]();
			switch (operator) {
			case '+': return +value;
			case '-': return -value;
			}
		}
	
		function parse(code, options) {
			return scope.acorn.parse(code, options);
		}
	
		function compile(code, url, options) {
			if (!code)
				return '';
			options = options || {};
			url = url || '';
	
			var insertions = [];
	
			function getOffset(offset) {
				for (var i = 0, l = insertions.length; i < l; i++) {
					var insertion = insertions[i];
					if (insertion[0] >= offset)
						break;
					offset += insertion[1];
				}
				return offset;
			}
	
			function getCode(node) {
				return code.substring(getOffset(node.range[0]),
						getOffset(node.range[1]));
			}
	
			function getBetween(left, right) {
				return code.substring(getOffset(left.range[1]),
						getOffset(right.range[0]));
			}
	
			function replaceCode(node, str) {
				var start = getOffset(node.range[0]),
					end = getOffset(node.range[1]),
					insert = 0;
				for (var i = insertions.length - 1; i >= 0; i--) {
					if (start > insertions[i][0]) {
						insert = i + 1;
						break;
					}
				}
				insertions.splice(insert, 0, [start, str.length - end + start]);
				code = code.substring(0, start) + str + code.substring(end);
			}
	
			function walkAST(node, parent) {
				if (!node)
					return;
				for (var key in node) {
					if (key === 'range' || key === 'loc')
						continue;
					var value = node[key];
					if (Array.isArray(value)) {
						for (var i = 0, l = value.length; i < l; i++)
							walkAST(value[i], node);
					} else if (value && typeof value === 'object') {
						walkAST(value, node);
					}
				}
				switch (node.type) {
				case 'UnaryExpression':
					if (node.operator in unaryOperators
							&& node.argument.type !== 'Literal') {
						var arg = getCode(node.argument);
						replaceCode(node, '$__("' + node.operator + '", '
								+ arg + ')');
					}
					break;
				case 'BinaryExpression':
					if (node.operator in binaryOperators
							&& node.left.type !== 'Literal') {
						var left = getCode(node.left),
							right = getCode(node.right),
							between = getBetween(node.left, node.right),
							operator = node.operator;
						replaceCode(node, '__$__(' + left + ','
								+ between.replace(new RegExp('\\' + operator),
									'"' + operator + '"')
								+ ', ' + right + ')');
					}
					break;
				case 'UpdateExpression':
				case 'AssignmentExpression':
					var parentType = parent && parent.type;
					if (!(
							parentType === 'ForStatement'
							|| parentType === 'BinaryExpression'
								&& /^[=!<>]/.test(parent.operator)
							|| parentType === 'MemberExpression' && parent.computed
					)) {
						if (node.type === 'UpdateExpression') {
							var arg = getCode(node.argument),
								exp = '__$__(' + arg + ', "' + node.operator[0]
										+ '", 1)',
								str = arg + ' = ' + exp;
							if (!node.prefix
									&& (parentType === 'AssignmentExpression'
										|| parentType === 'VariableDeclarator')) {
								if (getCode(parent.left || parent.id) === arg)
									str = exp;
								str = arg + '; ' + str;
							}
							replaceCode(node, str);
						} else {
							if (/^.=$/.test(node.operator)
									&& node.left.type !== 'Literal') {
								var left = getCode(node.left),
									right = getCode(node.right);
								replaceCode(node, left + ' = __$__(' + left + ', "'
										+ node.operator[0] + '", ' + right + ')');
							}
						}
					}
					break;
				}
			}
			var sourceMap = null,
				browser = paper.browser,
				version = browser.versionNumber,
				lineBreaks = /\r\n|\n|\r/mg;
			if (browser.chrome && version >= 30
					|| browser.webkit && version >= 537.76
					|| browser.firefox && version >= 23) {
				var offset = 0;
				if (window.location.href.indexOf(url) === 0) {
					var html = document.getElementsByTagName('html')[0].innerHTML;
					offset = html.substr(0, html.indexOf(code) + 1).match(
							lineBreaks).length + 1;
				}
				var mappings = ['AAAA'];
				mappings.length = (code.match(lineBreaks) || []).length + 1 + offset;
				sourceMap = {
					version: 3,
					file: url,
					names:[],
					mappings: mappings.join(';AACA'),
					sourceRoot: '',
					sources: [url]
				};
				var source = options.source || !url && code;
				if (source)
					sourceMap.sourcesContent = [source];
			}
			walkAST(parse(code, { ranges: true }));
			if (sourceMap) {
				code = new Array(offset + 1).join('\n') + code
						+ "\n//# sourceMappingURL=data:application/json;base64,"
						+ (btoa(unescape(encodeURIComponent(
							JSON.stringify(sourceMap)))))
						+ "\n//# sourceURL=" + (url || 'paperscript');
			}
			return code;
		}
	
		function execute(code, scope, url, options) {
			paper = scope;
			var view = scope.getView(),
				tool = /\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(code)
						? new Tool()
						: null,
				toolHandlers = tool ? tool._events : [],
				handlers = ['onFrame', 'onResize'].concat(toolHandlers),
				params = [],
				args = [],
				func;
			code = compile(code, url, options);
			function expose(scope, hidden) {
				for (var key in scope) {
					if ((hidden || !/^_/.test(key)) && new RegExp('([\\b\\s\\W]|^)'
							+ key.replace(/\$/g, '\\$') + '\\b').test(code)) {
						params.push(key);
						args.push(scope[key]);
					}
				}
			}
			expose({ __$__: __$__, $__: $__, paper: scope, view: view, tool: tool },
					true);
			expose(scope);
			handlers = Base.each(handlers, function(key) {
				if (new RegExp('\\s+' + key + '\\b').test(code)) {
					params.push(key);
					this.push(key + ': ' + key);
				}
			}, []).join(', ');
			if (handlers)
				code += '\nreturn { ' + handlers + ' };';
			var browser = paper.browser;
			if (browser.chrome || browser.firefox) {
				var script = document.createElement('script'),
					head = document.head || document.getElementsByTagName('head')[0];
				if (browser.firefox)
					code = '\n' + code;
				script.appendChild(document.createTextNode(
					'paper._execute = function(' + params + ') {' + code + '\n}'
				));
				head.appendChild(script);
				func = paper._execute;
				delete paper._execute;
				head.removeChild(script);
			} else {
				func = Function(params, code);
			}
			var res = func.apply(scope, args) || {};
			Base.each(toolHandlers, function(key) {
				var value = res[key];
				if (value)
					tool[key] = value;
			});
			if (view) {
				if (res.onResize)
					view.setOnResize(res.onResize);
				view.emit('resize', {
					size: view.size,
					delta: new Point()
				});
				if (res.onFrame)
					view.setOnFrame(res.onFrame);
				view.update();
			}
		}
	
		function loadScript(script) {
			if (/^text\/(?:x-|)paperscript$/.test(script.type)
					&& PaperScope.getAttribute(script, 'ignore') !== 'true') {
				var canvasId = PaperScope.getAttribute(script, 'canvas'),
					canvas = document.getElementById(canvasId),
					src = script.src || script.getAttribute('data-src'),
					async = PaperScope.hasAttribute(script, 'async'),
					scopeAttribute = 'data-paper-scope';
				if (!canvas)
					throw new Error('Unable to find canvas with id "'
							+ canvasId + '"');
				var scope = PaperScope.get(canvas.getAttribute(scopeAttribute))
							|| new PaperScope().setup(canvas);
				canvas.setAttribute(scopeAttribute, scope._id);
				if (src) {
					Http.request('get', src, function(code) {
						execute(code, scope, src);
					}, async);
				} else {
					execute(script.innerHTML, scope, script.baseURI);
				}
				script.setAttribute('data-paper-ignore', 'true');
				return scope;
			}
		}
	
		function loadAll() {
			Base.each(document.getElementsByTagName('script'), loadScript);
		}
	
		function load(script) {
			return script ? loadScript(script) : loadAll();
		}
	
		if (document.readyState === 'complete') {
			setTimeout(loadAll);
		} else {
			DomEvent.add(window, { load: loadAll });
		}
	
		return {
			compile: compile,
			execute: execute,
			load: load,
			parse: parse
		};
	
	}).call(this);
	
	paper = new (PaperScope.inject(Base.exports, {
		enumerable: true,
		Base: Base,
		Numerical: Numerical,
		Key: Key
	}))();
	
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (paper), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object' && module) {
		module.exports = paper;
	}
	
	return paper;
	};


/***/ },

/***/ 94:
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Apply mutation shims
	 */
	
	function _toNode(node) {
	  return typeof node === 'string' ? document.createTextNode(node) : node;
	}
	
	function _ref() {
	  var parentNode = this.parentNode;
	  if (parentNode) {
	    parentNode.removeChild(this);
	  }
	}
	
	(function () {
	  'use strict';
	
	  var ElementPrototype = Element.prototype;
	
	  /**
	   * Detect full support
	   */
	
	  var isSupported = ElementPrototype.after && ElementPrototype.append && ElementPrototype.before && ElementPrototype.prepend && ElementPrototype.remove && ElementPrototype.replace;
	
	  if (isSupported) {
	    return;
	  }function mutationMacro(nodes) {
	    var fragment, i, len;
	    if (nodes) {
	      len = nodes.length;
	    }
	
	    if (!len) {
	      throw new Error('No node was specified (DOM Exception 8)');
	    }
	
	    if (len === 1) {
	      return _toNode(nodes[0]);
	    } else {
	      fragment = document.createDocumentFragment();
	      for (i = 0; i < len; i++) {
	        fragment.appendChild(_toNode(nodes[i]));
	      }
	      return fragment;
	    }
	  }
	
	  ElementPrototype.prepend = function prepend() {
	    this.insertBefore(mutationMacro(arguments), this.firstChild);
	  };
	
	  ElementPrototype.append = function append() {
	    this.appendChild(mutationMacro(arguments));
	  };
	
	  ElementPrototype.before = function before() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.insertBefore(mutationMacro(arguments), this);
	    }
	  };
	
	  ElementPrototype.after = function after() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.insertBefore(mutationMacro(arguments), this.nextSibling);
	    }
	  };
	
	  ElementPrototype.replace = function replace() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.replaceChild(mutationMacro(arguments), this);
	    }
	  };
	
	  /**
	   * This method is defined with bracket notation to avoid conflicting with the
	   * definition of HTMLSelectElement.
	   */
	  ElementPrototype['remove'] = _ref;
	})();

/***/ },

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(18);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },

/***/ 97:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(52)
	  , TAG = __webpack_require__(22)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , descriptor     = __webpack_require__(70)
	  , setToStringTag = __webpack_require__(54)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(53)(IteratorPrototype, __webpack_require__(22)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(71)
	  , defined   = __webpack_require__(46);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(97)
	  , ITERATOR  = __webpack_require__(22)('iterator')
	  , Iterators = __webpack_require__(34);
	module.exports = __webpack_require__(23).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(102)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(69)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! Kefir.js v3.2.2
	 *  https://github.com/rpominov/kefir
	 */
	
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.Kefir = global.Kefir || {})));
	}(this, function (exports) { 'use strict';
	
		var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
		function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }
	
		function createObj(proto) {
		  var F = function () {};
		  F.prototype = proto;
		  return new F();
		}
	
		function extend(target /*, mixin1, mixin2...*/) {
		  var length = arguments.length,
		      i = void 0,
		      prop = void 0;
		  for (i = 1; i < length; i++) {
		    for (prop in arguments[i]) {
		      target[prop] = arguments[i][prop];
		    }
		  }
		  return target;
		}
	
		function inherit(Child, Parent /*, mixin1, mixin2...*/) {
		  var length = arguments.length,
		      i = void 0;
		  Child.prototype = createObj(Parent.prototype);
		  Child.prototype.constructor = Child;
		  for (i = 2; i < length; i++) {
		    extend(Child.prototype, arguments[i]);
		  }
		  return Child;
		}
	
		var NOTHING = ['<nothing>'];
		var END = 'end';
		var VALUE = 'value';
		var ERROR = 'error';
		var ANY = 'any';
	
		function concat(a, b) {
		  var result = void 0,
		      length = void 0,
		      i = void 0,
		      j = void 0;
		  if (a.length === 0) {
		    return b;
		  }
		  if (b.length === 0) {
		    return a;
		  }
		  j = 0;
		  result = new Array(a.length + b.length);
		  length = a.length;
		  for (i = 0; i < length; i++, j++) {
		    result[j] = a[i];
		  }
		  length = b.length;
		  for (i = 0; i < length; i++, j++) {
		    result[j] = b[i];
		  }
		  return result;
		}
	
		function find(arr, value) {
		  var length = arr.length,
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    if (arr[i] === value) {
		      return i;
		    }
		  }
		  return -1;
		}
	
		function findByPred(arr, pred) {
		  var length = arr.length,
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    if (pred(arr[i])) {
		      return i;
		    }
		  }
		  return -1;
		}
	
		function cloneArray(input) {
		  var length = input.length,
		      result = new Array(length),
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    result[i] = input[i];
		  }
		  return result;
		}
	
		function remove(input, index) {
		  var length = input.length,
		      result = void 0,
		      i = void 0,
		      j = void 0;
		  if (index >= 0 && index < length) {
		    if (length === 1) {
		      return [];
		    } else {
		      result = new Array(length - 1);
		      for (i = 0, j = 0; i < length; i++) {
		        if (i !== index) {
		          result[j] = input[i];
		          j++;
		        }
		      }
		      return result;
		    }
		  } else {
		    return input;
		  }
		}
	
		function map(input, fn) {
		  var length = input.length,
		      result = new Array(length),
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    result[i] = fn(input[i]);
		  }
		  return result;
		}
	
		function forEach(arr, fn) {
		  var length = arr.length,
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    fn(arr[i]);
		  }
		}
	
		function fillArray(arr, value) {
		  var length = arr.length,
		      i = void 0;
		  for (i = 0; i < length; i++) {
		    arr[i] = value;
		  }
		}
	
		function contains(arr, value) {
		  return find(arr, value) !== -1;
		}
	
		function slide(cur, next, max) {
		  var length = Math.min(max, cur.length + 1),
		      offset = cur.length - length + 1,
		      result = new Array(length),
		      i = void 0;
		  for (i = offset; i < length; i++) {
		    result[i - offset] = cur[i];
		  }
		  result[length - 1] = next;
		  return result;
		}
	
		function callSubscriber(type, fn, event) {
		  if (type === ANY) {
		    fn(event);
		  } else if (type === event.type) {
		    if (type === VALUE || type === ERROR) {
		      fn(event.value);
		    } else {
		      fn();
		    }
		  }
		}
	
		function Dispatcher() {
		  this._items = [];
		  this._inLoop = 0;
		  this._removedItems = null;
		}
	
		extend(Dispatcher.prototype, {
		  add: function (type, fn) {
		    this._items = concat(this._items, [{ type: type, fn: fn }]);
		    return this._items.length;
		  },
		  remove: function (type, fn) {
		    var index = findByPred(this._items, function (x) {
		      return x.type === type && x.fn === fn;
		    });
	
		    // if we're currently in a notification loop,
		    // remember this subscriber was removed
		    if (this._inLoop !== 0 && index !== -1) {
		      if (this._removedItems === null) {
		        this._removedItems = [];
		      }
		      this._removedItems.push(this._items[index]);
		    }
	
		    this._items = remove(this._items, index);
		    return this._items.length;
		  },
		  dispatch: function (event) {
		    this._inLoop++;
		    for (var i = 0, items = this._items; i < items.length; i++) {
	
		      // cleanup was called
		      if (this._items === null) {
		        break;
		      }
	
		      // this subscriber was removed
		      if (this._removedItems !== null && contains(this._removedItems, items[i])) {
		        continue;
		      }
	
		      callSubscriber(items[i].type, items[i].fn, event);
		    }
		    this._inLoop--;
		    if (this._inLoop === 0) {
		      this._removedItems = null;
		    }
		  },
		  cleanup: function () {
		    this._items = null;
		  }
		});
	
		function Observable() {
		  this._dispatcher = new Dispatcher();
		  this._active = false;
		  this._alive = true;
		  this._activating = false;
		  this._logHandlers = null;
		}
	
		extend(Observable.prototype, {
	
		  _name: 'observable',
	
		  _onActivation: function () {},
		  _onDeactivation: function () {},
		  _setActive: function (active) {
		    if (this._active !== active) {
		      this._active = active;
		      if (active) {
		        this._activating = true;
		        this._onActivation();
		        this._activating = false;
		      } else {
		        this._onDeactivation();
		      }
		    }
		  },
		  _clear: function () {
		    this._setActive(false);
		    this._dispatcher.cleanup();
		    this._dispatcher = null;
		    this._logHandlers = null;
		  },
		  _emit: function (type, x) {
		    switch (type) {
		      case VALUE:
		        return this._emitValue(x);
		      case ERROR:
		        return this._emitError(x);
		      case END:
		        return this._emitEnd();
		    }
		  },
		  _emitValue: function (value) {
		    if (this._alive) {
		      this._dispatcher.dispatch({ type: VALUE, value: value });
		    }
		  },
		  _emitError: function (value) {
		    if (this._alive) {
		      this._dispatcher.dispatch({ type: ERROR, value: value });
		    }
		  },
		  _emitEnd: function () {
		    if (this._alive) {
		      this._alive = false;
		      this._dispatcher.dispatch({ type: END });
		      this._clear();
		    }
		  },
		  _on: function (type, fn) {
		    if (this._alive) {
		      this._dispatcher.add(type, fn);
		      this._setActive(true);
		    } else {
		      callSubscriber(type, fn, { type: END });
		    }
		    return this;
		  },
		  _off: function (type, fn) {
		    if (this._alive) {
		      var count = this._dispatcher.remove(type, fn);
		      if (count === 0) {
		        this._setActive(false);
		      }
		    }
		    return this;
		  },
		  onValue: function (fn) {
		    return this._on(VALUE, fn);
		  },
		  onError: function (fn) {
		    return this._on(ERROR, fn);
		  },
		  onEnd: function (fn) {
		    return this._on(END, fn);
		  },
		  onAny: function (fn) {
		    return this._on(ANY, fn);
		  },
		  offValue: function (fn) {
		    return this._off(VALUE, fn);
		  },
		  offError: function (fn) {
		    return this._off(ERROR, fn);
		  },
		  offEnd: function (fn) {
		    return this._off(END, fn);
		  },
		  offAny: function (fn) {
		    return this._off(ANY, fn);
		  },
	
	
		  // A and B must be subclasses of Stream and Property (order doesn't matter)
		  _ofSameType: function (A, B) {
		    return A.prototype.getType() === this.getType() ? A : B;
		  },
		  setName: function (sourceObs /* optional */, selfName) {
		    this._name = selfName ? sourceObs._name + '.' + selfName : sourceObs;
		    return this;
		  },
		  log: function () {
		    var name = arguments.length <= 0 || arguments[0] === undefined ? this.toString() : arguments[0];
	
	
		    var isCurrent = void 0;
		    var handler = function (event) {
		      var type = '<' + event.type + (isCurrent ? ':current' : '') + '>';
		      if (event.type === END) {
		        console.log(name, type);
		      } else {
		        console.log(name, type, event.value);
		      }
		    };
	
		    if (this._alive) {
		      if (!this._logHandlers) {
		        this._logHandlers = [];
		      }
		      this._logHandlers.push({ name: name, handler: handler });
		    }
	
		    isCurrent = true;
		    this.onAny(handler);
		    isCurrent = false;
	
		    return this;
		  },
		  offLog: function () {
		    var name = arguments.length <= 0 || arguments[0] === undefined ? this.toString() : arguments[0];
	
	
		    if (this._logHandlers) {
		      var handlerIndex = findByPred(this._logHandlers, function (obj) {
		        return obj.name === name;
		      });
		      if (handlerIndex !== -1) {
		        this.offAny(this._logHandlers[handlerIndex].handler);
		        this._logHandlers.splice(handlerIndex, 1);
		      }
		    }
	
		    return this;
		  }
		});
	
		// extend() can't handle `toString` in IE8
		Observable.prototype.toString = function () {
		  return '[' + this._name + ']';
		};
	
		function Stream() {
		  Observable.call(this);
		}
	
		inherit(Stream, Observable, {
	
		  _name: 'stream',
	
		  getType: function () {
		    return 'stream';
		  }
		});
	
		function Property() {
		  Observable.call(this);
		  this._currentEvent = null;
		}
	
		inherit(Property, Observable, {
	
		  _name: 'property',
	
		  _emitValue: function (value) {
		    if (this._alive) {
		      this._currentEvent = { type: VALUE, value: value };
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: VALUE, value: value });
		      }
		    }
		  },
		  _emitError: function (value) {
		    if (this._alive) {
		      this._currentEvent = { type: ERROR, value: value };
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: ERROR, value: value });
		      }
		    }
		  },
		  _emitEnd: function () {
		    if (this._alive) {
		      this._alive = false;
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: END });
		      }
		      this._clear();
		    }
		  },
		  _on: function (type, fn) {
		    if (this._alive) {
		      this._dispatcher.add(type, fn);
		      this._setActive(true);
		    }
		    if (this._currentEvent !== null) {
		      callSubscriber(type, fn, this._currentEvent);
		    }
		    if (!this._alive) {
		      callSubscriber(type, fn, { type: END });
		    }
		    return this;
		  },
		  getType: function () {
		    return 'property';
		  }
		});
	
		var neverS = new Stream();
		neverS._emitEnd();
		neverS._name = 'never';
	
		function never() {
		  return neverS;
		}
	
		function timeBased(mixin) {
	
		  function AnonymousStream(wait, options) {
		    var _this = this;
	
		    Stream.call(this);
		    this._wait = wait;
		    this._intervalId = null;
		    this._$onTick = function () {
		      return _this._onTick();
		    };
		    this._init(options);
		  }
	
		  inherit(AnonymousStream, Stream, {
		    _init: function () {},
		    _free: function () {},
		    _onTick: function () {},
		    _onActivation: function () {
		      this._intervalId = setInterval(this._$onTick, this._wait);
		    },
		    _onDeactivation: function () {
		      if (this._intervalId !== null) {
		        clearInterval(this._intervalId);
		        this._intervalId = null;
		      }
		    },
		    _clear: function () {
		      Stream.prototype._clear.call(this);
		      this._$onTick = null;
		      this._free();
		    }
		  }, mixin);
	
		  return AnonymousStream;
		}
	
		var S = timeBased({
	
		  _name: 'later',
	
		  _init: function (_ref) {
		    var x = _ref.x;
	
		    this._x = x;
		  },
		  _free: function () {
		    this._x = null;
		  },
		  _onTick: function () {
		    this._emitValue(this._x);
		    this._emitEnd();
		  }
		});
	
		function later(wait, x) {
		  return new S(wait, { x: x });
		}
	
		var S$1 = timeBased({
	
		  _name: 'interval',
	
		  _init: function (_ref) {
		    var x = _ref.x;
	
		    this._x = x;
		  },
		  _free: function () {
		    this._x = null;
		  },
		  _onTick: function () {
		    this._emitValue(this._x);
		  }
		});
	
		function interval(wait, x) {
		  return new S$1(wait, { x: x });
		}
	
		var S$2 = timeBased({
	
		  _name: 'sequentially',
	
		  _init: function (_ref) {
		    var xs = _ref.xs;
	
		    this._xs = cloneArray(xs);
		  },
		  _free: function () {
		    this._xs = null;
		  },
		  _onTick: function () {
		    if (this._xs.length === 1) {
		      this._emitValue(this._xs[0]);
		      this._emitEnd();
		    } else {
		      this._emitValue(this._xs.shift());
		    }
		  }
		});
	
		function sequentially(wait, xs) {
		  return xs.length === 0 ? never() : new S$2(wait, { xs: xs });
		}
	
		var S$3 = timeBased({
	
		  _name: 'fromPoll',
	
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _onTick: function () {
		    var fn = this._fn;
		    this._emitValue(fn());
		  }
		});
	
		function fromPoll(wait, fn) {
		  return new S$3(wait, { fn: fn });
		}
	
		function emitter(obs) {
	
		  function value(x) {
		    obs._emitValue(x);
		    return obs._active;
		  }
	
		  function error(x) {
		    obs._emitError(x);
		    return obs._active;
		  }
	
		  function end() {
		    obs._emitEnd();
		    return obs._active;
		  }
	
		  function event(e) {
		    obs._emit(e.type, e.value);
		    return obs._active;
		  }
	
		  return { value: value, error: error, end: end, event: event, emit: value, emitEvent: event };
		}
	
		var S$4 = timeBased({
	
		  _name: 'withInterval',
	
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		    this._emitter = emitter(this);
		  },
		  _free: function () {
		    this._fn = null;
		    this._emitter = null;
		  },
		  _onTick: function () {
		    var fn = this._fn;
		    fn(this._emitter);
		  }
		});
	
		function withInterval(wait, fn) {
		  return new S$4(wait, { fn: fn });
		}
	
		function S$5(fn) {
		  Stream.call(this);
		  this._fn = fn;
		  this._unsubscribe = null;
		}
	
		inherit(S$5, Stream, {
	
		  _name: 'stream',
	
		  _onActivation: function () {
		    var fn = this._fn;
		    var unsubscribe = fn(emitter(this));
		    this._unsubscribe = typeof unsubscribe === 'function' ? unsubscribe : null;
	
		    // fix https://github.com/rpominov/kefir/issues/35
		    if (!this._active) {
		      this._callUnsubscribe();
		    }
		  },
		  _callUnsubscribe: function () {
		    if (this._unsubscribe !== null) {
		      this._unsubscribe();
		      this._unsubscribe = null;
		    }
		  },
		  _onDeactivation: function () {
		    this._callUnsubscribe();
		  },
		  _clear: function () {
		    Stream.prototype._clear.call(this);
		    this._fn = null;
		  }
		});
	
		function stream(fn) {
		  return new S$5(fn);
		}
	
		function fromCallback(callbackConsumer) {
	
		  var called = false;
	
		  return stream(function (emitter) {
	
		    if (!called) {
		      callbackConsumer(function (x) {
		        emitter.emit(x);
		        emitter.end();
		      });
		      called = true;
		    }
		  }).setName('fromCallback');
		}
	
		function fromNodeCallback(callbackConsumer) {
	
		  var called = false;
	
		  return stream(function (emitter) {
	
		    if (!called) {
		      callbackConsumer(function (error, x) {
		        if (error) {
		          emitter.error(error);
		        } else {
		          emitter.emit(x);
		        }
		        emitter.end();
		      });
		      called = true;
		    }
		  }).setName('fromNodeCallback');
		}
	
		function spread(fn, length) {
		  switch (length) {
		    case 0:
		      return function () {
		        return fn();
		      };
		    case 1:
		      return function (a) {
		        return fn(a[0]);
		      };
		    case 2:
		      return function (a) {
		        return fn(a[0], a[1]);
		      };
		    case 3:
		      return function (a) {
		        return fn(a[0], a[1], a[2]);
		      };
		    case 4:
		      return function (a) {
		        return fn(a[0], a[1], a[2], a[3]);
		      };
		    default:
		      return function (a) {
		        return fn.apply(null, a);
		      };
		  }
		}
	
		function apply(fn, c, a) {
		  var aLength = a ? a.length : 0;
		  if (c == null) {
		    switch (aLength) {
		      case 0:
		        return fn();
		      case 1:
		        return fn(a[0]);
		      case 2:
		        return fn(a[0], a[1]);
		      case 3:
		        return fn(a[0], a[1], a[2]);
		      case 4:
		        return fn(a[0], a[1], a[2], a[3]);
		      default:
		        return fn.apply(null, a);
		    }
		  } else {
		    switch (aLength) {
		      case 0:
		        return fn.call(c);
		      default:
		        return fn.apply(c, a);
		    }
		  }
		}
	
		function fromSubUnsub(sub, unsub, transformer /* Function | falsey */) {
		  return stream(function (emitter) {
	
		    var handler = transformer ? function () {
		      emitter.emit(apply(transformer, this, arguments));
		    } : function (x) {
		      emitter.emit(x);
		    };
	
		    sub(handler);
		    return function () {
		      return unsub(handler);
		    };
		  }).setName('fromSubUnsub');
		}
	
		var pairs = [['addEventListener', 'removeEventListener'], ['addListener', 'removeListener'], ['on', 'off']];
	
		function fromEvents(target, eventName, transformer) {
		  var sub = void 0,
		      unsub = void 0;
	
		  for (var i = 0; i < pairs.length; i++) {
		    if (typeof target[pairs[i][0]] === 'function' && typeof target[pairs[i][1]] === 'function') {
		      sub = pairs[i][0];
		      unsub = pairs[i][1];
		      break;
		    }
		  }
	
		  if (sub === undefined) {
		    throw new Error('target don\'t support any of ' + 'addEventListener/removeEventListener, addListener/removeListener, on/off method pair');
		  }
	
		  return fromSubUnsub(function (handler) {
		    return target[sub](eventName, handler);
		  }, function (handler) {
		    return target[unsub](eventName, handler);
		  }, transformer).setName('fromEvents');
		}
	
		// HACK:
		//   We don't call parent Class constructor, but instead putting all necessary
		//   properties into prototype to simulate ended Property
		//   (see Propperty and Observable classes).
	
		function P(value) {
		  this._currentEvent = { type: 'value', value: value, current: true };
		}
	
		inherit(P, Property, {
		  _name: 'constant',
		  _active: false,
		  _activating: false,
		  _alive: false,
		  _dispatcher: null,
		  _logHandlers: null
		});
	
		function constant(x) {
		  return new P(x);
		}
	
		// HACK:
		//   We don't call parent Class constructor, but instead putting all necessary
		//   properties into prototype to simulate ended Property
		//   (see Propperty and Observable classes).
	
		function P$1(value) {
		  this._currentEvent = { type: 'error', value: value, current: true };
		}
	
		inherit(P$1, Property, {
		  _name: 'constantError',
		  _active: false,
		  _activating: false,
		  _alive: false,
		  _dispatcher: null,
		  _logHandlers: null
		});
	
		function constantError(x) {
		  return new P$1(x);
		}
	
		function createConstructor(BaseClass, name) {
		  return function AnonymousObservable(source, options) {
		    var _this = this;
	
		    BaseClass.call(this);
		    this._source = source;
		    this._name = source._name + '.' + name;
		    this._init(options);
		    this._$handleAny = function (event) {
		      return _this._handleAny(event);
		    };
		  };
		}
	
		function createClassMethods(BaseClass) {
		  return {
		    _init: function () {},
		    _free: function () {},
		    _handleValue: function (x) {
		      this._emitValue(x);
		    },
		    _handleError: function (x) {
		      this._emitError(x);
		    },
		    _handleEnd: function () {
		      this._emitEnd();
		    },
		    _handleAny: function (event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handleValue(event.value);
		        case ERROR:
		          return this._handleError(event.value);
		        case END:
		          return this._handleEnd();
		      }
		    },
		    _onActivation: function () {
		      this._source.onAny(this._$handleAny);
		    },
		    _onDeactivation: function () {
		      this._source.offAny(this._$handleAny);
		    },
		    _clear: function () {
		      BaseClass.prototype._clear.call(this);
		      this._source = null;
		      this._$handleAny = null;
		      this._free();
		    }
		  };
		}
	
		function createStream(name, mixin) {
		  var S = createConstructor(Stream, name);
		  inherit(S, Stream, createClassMethods(Stream), mixin);
		  return S;
		}
	
		function createProperty(name, mixin) {
		  var P = createConstructor(Property, name);
		  inherit(P, Property, createClassMethods(Property), mixin);
		  return P;
		}
	
		var P$2 = createProperty('toProperty', {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._getInitialCurrent = fn;
		  },
		  _onActivation: function () {
		    if (this._getInitialCurrent !== null) {
		      var getInitial = this._getInitialCurrent;
		      this._emitValue(getInitial());
		    }
		    this._source.onAny(this._$handleAny); // copied from patterns/one-source
		  }
		});
	
		function toProperty(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
		  if (fn !== null && typeof fn !== 'function') {
		    throw new Error('You should call toProperty() with a function or no arguments.');
		  }
		  return new P$2(obs, { fn: fn });
		}
	
		var S$6 = createStream('changes', {
		  _handleValue: function (x) {
		    if (!this._activating) {
		      this._emitValue(x);
		    }
		  },
		  _handleError: function (x) {
		    if (!this._activating) {
		      this._emitError(x);
		    }
		  }
		});
	
		function changes(obs) {
		  return new S$6(obs);
		}
	
		function fromPromise(promise) {
	
		  var called = false;
	
		  var result = stream(function (emitter) {
		    if (!called) {
		      var onValue = function (x) {
		        emitter.emit(x);
		        emitter.end();
		      };
		      var onError = function (x) {
		        emitter.error(x);
		        emitter.end();
		      };
		      var _promise = promise.then(onValue, onError);
	
		      // prevent libraries like 'Q' or 'when' from swallowing exceptions
		      if (_promise && typeof _promise.done === 'function') {
		        _promise.done();
		      }
	
		      called = true;
		    }
		  });
	
		  return toProperty(result, null).setName('fromPromise');
		}
	
		function getGlodalPromise() {
		  if (typeof Promise === 'function') {
		    return Promise;
		  } else {
		    throw new Error('There isn\'t default Promise, use shim or parameter');
		  }
		}
	
		function toPromise (obs) {
		  var Promise = arguments.length <= 1 || arguments[1] === undefined ? getGlodalPromise() : arguments[1];
	
		  var last = null;
		  return new Promise(function (resolve, reject) {
		    obs.onAny(function (event) {
		      if (event.type === END && last !== null) {
		        (last.type === VALUE ? resolve : reject)(last.value);
		        last = null;
		      } else {
		        last = event;
		      }
		    });
		  });
		}
	
		var ponyfill = __commonjs(function (module) {
		'use strict';
	
		module.exports = function symbolObservablePonyfill(root) {
			var result;
			var Symbol = root.Symbol;
	
			if (typeof Symbol === 'function') {
				if (Symbol.observable) {
					result = Symbol.observable;
				} else {
					result = Symbol('observable');
					Symbol.observable = result;
				}
			} else {
				result = '@@observable';
			}
	
			return result;
		};
		});
	
		var require$$0 = (ponyfill && typeof ponyfill === 'object' && 'default' in ponyfill ? ponyfill['default'] : ponyfill);
	
		var index = __commonjs(function (module, exports, global) {
		/* global window */
		'use strict';
	
		module.exports = require$$0(global || window || __commonjs_global);
		});
	
		var $$observable = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);
	
		function fromESObservable(_observable) {
		  var observable = _observable[$$observable] ? _observable[$$observable]() : _observable;
		  return stream(function (emitter) {
		    var unsub = observable.subscribe({
		      error: function (error) {
		        emitter.error(error);
		        emitter.end();
		      },
		      next: function (value) {
		        emitter.emit(value);
		      },
		      complete: function () {
		        emitter.end();
		      }
		    });
	
		    if (unsub.unsubscribe) {
		      return function () {
		        unsub.unsubscribe();
		      };
		    } else {
		      return unsub;
		    }
		  }).setName('fromESObservable');
		}
	
		function ESObservable(observable) {
		  this._observable = observable.takeErrors(1);
		}
	
		extend(ESObservable.prototype, {
		  subscribe: function (observer) {
		    var _this = this;
	
		    var fn = function (event) {
		      if (event.type === VALUE && observer.next) {
		        observer.next(event.value);
		      } else if (event.type === ERROR && observer.error) {
		        observer.error(event.value);
		      } else if (event.type === END && observer.complete) {
		        observer.complete(event.value);
		      }
		    };
	
		    this._observable.onAny(fn);
		    return function () {
		      return _this._observable.offAny(fn);
		    };
		  }
		});
	
		function toESObservable() {
		  return new ESObservable(this);
		}
	
		var mixin = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    this._emitValue(fn(x));
		  }
		};
	
		var S$7 = createStream('map', mixin);
		var P$3 = createProperty('map', mixin);
	
		var id = function (x) {
		  return x;
		};
	
		function map$1(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S$7, P$3))(obs, { fn: fn });
		}
	
		var mixin$1 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitValue(x);
		    }
		  }
		};
	
		var S$8 = createStream('filter', mixin$1);
		var P$4 = createProperty('filter', mixin$1);
	
		var id$1 = function (x) {
		  return x;
		};
	
		function filter(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$1 : arguments[1];
	
		  return new (obs._ofSameType(S$8, P$4))(obs, { fn: fn });
		}
	
		var mixin$2 = {
		  _init: function (_ref) {
		    var n = _ref.n;
	
		    this._n = n;
		    if (n <= 0) {
		      this._emitEnd();
		    }
		  },
		  _handleValue: function (x) {
		    this._n--;
		    this._emitValue(x);
		    if (this._n === 0) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$9 = createStream('take', mixin$2);
		var P$5 = createProperty('take', mixin$2);
	
		function take(obs, n) {
		  return new (obs._ofSameType(S$9, P$5))(obs, { n: n });
		}
	
		var mixin$3 = {
		  _init: function (_ref) {
		    var n = _ref.n;
	
		    this._n = n;
		    if (n <= 0) {
		      this._emitEnd();
		    }
		  },
		  _handleError: function (x) {
		    this._n--;
		    this._emitError(x);
		    if (this._n === 0) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$10 = createStream('takeErrors', mixin$3);
		var P$6 = createProperty('takeErrors', mixin$3);
	
		function takeErrors(obs, n) {
		  return new (obs._ofSameType(S$10, P$6))(obs, { n: n });
		}
	
		var mixin$4 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitValue(x);
		    } else {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$11 = createStream('takeWhile', mixin$4);
		var P$7 = createProperty('takeWhile', mixin$4);
	
		var id$2 = function (x) {
		  return x;
		};
	
		function takeWhile(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$2 : arguments[1];
	
		  return new (obs._ofSameType(S$11, P$7))(obs, { fn: fn });
		}
	
		var mixin$5 = {
		  _init: function () {
		    this._lastValue = NOTHING;
		  },
		  _free: function () {
		    this._lastValue = null;
		  },
		  _handleValue: function (x) {
		    this._lastValue = x;
		  },
		  _handleEnd: function () {
		    if (this._lastValue !== NOTHING) {
		      this._emitValue(this._lastValue);
		    }
		    this._emitEnd();
		  }
		};
	
		var S$12 = createStream('last', mixin$5);
		var P$8 = createProperty('last', mixin$5);
	
		function last(obs) {
		  return new (obs._ofSameType(S$12, P$8))(obs);
		}
	
		var mixin$6 = {
		  _init: function (_ref) {
		    var n = _ref.n;
	
		    this._n = Math.max(0, n);
		  },
		  _handleValue: function (x) {
		    if (this._n === 0) {
		      this._emitValue(x);
		    } else {
		      this._n--;
		    }
		  }
		};
	
		var S$13 = createStream('skip', mixin$6);
		var P$9 = createProperty('skip', mixin$6);
	
		function skip(obs, n) {
		  return new (obs._ofSameType(S$13, P$9))(obs, { n: n });
		}
	
		var mixin$7 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    if (this._fn !== null && !fn(x)) {
		      this._fn = null;
		    }
		    if (this._fn === null) {
		      this._emitValue(x);
		    }
		  }
		};
	
		var S$14 = createStream('skipWhile', mixin$7);
		var P$10 = createProperty('skipWhile', mixin$7);
	
		var id$3 = function (x) {
		  return x;
		};
	
		function skipWhile(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$3 : arguments[1];
	
		  return new (obs._ofSameType(S$14, P$10))(obs, { fn: fn });
		}
	
		var mixin$8 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		    this._prev = NOTHING;
		  },
		  _free: function () {
		    this._fn = null;
		    this._prev = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    if (this._prev === NOTHING || !fn(this._prev, x)) {
		      this._prev = x;
		      this._emitValue(x);
		    }
		  }
		};
	
		var S$15 = createStream('skipDuplicates', mixin$8);
		var P$11 = createProperty('skipDuplicates', mixin$8);
	
		var eq = function (a, b) {
		  return a === b;
		};
	
		function skipDuplicates(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? eq : arguments[1];
	
		  return new (obs._ofSameType(S$15, P$11))(obs, { fn: fn });
		}
	
		var mixin$9 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
		    var seed = _ref.seed;
	
		    this._fn = fn;
		    this._prev = seed;
		  },
		  _free: function () {
		    this._prev = null;
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    if (this._prev !== NOTHING) {
		      var fn = this._fn;
		      this._emitValue(fn(this._prev, x));
		    }
		    this._prev = x;
		  }
		};
	
		var S$16 = createStream('diff', mixin$9);
		var P$12 = createProperty('diff', mixin$9);
	
		function defaultFn(a, b) {
		  return [a, b];
		}
	
		function diff(obs, fn) {
		  var seed = arguments.length <= 2 || arguments[2] === undefined ? NOTHING : arguments[2];
	
		  return new (obs._ofSameType(S$16, P$12))(obs, { fn: fn || defaultFn, seed: seed });
		}
	
		var P$13 = createProperty('scan', {
		  _init: function (_ref) {
		    var fn = _ref.fn;
		    var seed = _ref.seed;
	
		    this._fn = fn;
		    this._seed = seed;
		    if (seed !== NOTHING) {
		      this._emitValue(seed);
		    }
		  },
		  _free: function () {
		    this._fn = null;
		    this._seed = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    if (this._currentEvent === null || this._currentEvent.type === ERROR) {
		      this._emitValue(this._seed === NOTHING ? x : fn(this._seed, x));
		    } else {
		      this._emitValue(fn(this._currentEvent.value, x));
		    }
		  }
		});
	
		function scan(obs, fn) {
		  var seed = arguments.length <= 2 || arguments[2] === undefined ? NOTHING : arguments[2];
	
		  return new P$13(obs, { fn: fn, seed: seed });
		}
	
		var mixin$10 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    var xs = fn(x);
		    for (var i = 0; i < xs.length; i++) {
		      this._emitValue(xs[i]);
		    }
		  }
		};
	
		var S$17 = createStream('flatten', mixin$10);
	
		var id$4 = function (x) {
		  return x;
		};
	
		function flatten(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$4 : arguments[1];
	
		  return new S$17(obs, { fn: fn });
		}
	
		var END_MARKER = {};
	
		var mixin$11 = {
		  _init: function (_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
	
		    this._wait = Math.max(0, wait);
		    this._buff = [];
		    this._$shiftBuff = function () {
		      var value = _this._buff.shift();
		      if (value === END_MARKER) {
		        _this._emitEnd();
		      } else {
		        _this._emitValue(value);
		      }
		    };
		  },
		  _free: function () {
		    this._buff = null;
		    this._$shiftBuff = null;
		  },
		  _handleValue: function (x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      this._buff.push(x);
		      setTimeout(this._$shiftBuff, this._wait);
		    }
		  },
		  _handleEnd: function () {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      this._buff.push(END_MARKER);
		      setTimeout(this._$shiftBuff, this._wait);
		    }
		  }
		};
	
		var S$18 = createStream('delay', mixin$11);
		var P$14 = createProperty('delay', mixin$11);
	
		function delay(obs, wait) {
		  return new (obs._ofSameType(S$18, P$14))(obs, { wait: wait });
		}
	
		var now = Date.now ? function () {
		  return Date.now();
		} : function () {
		  return new Date().getTime();
		};
	
		var mixin$12 = {
		  _init: function (_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var leading = _ref.leading;
		    var trailing = _ref.trailing;
	
		    this._wait = Math.max(0, wait);
		    this._leading = leading;
		    this._trailing = trailing;
		    this._trailingValue = null;
		    this._timeoutId = null;
		    this._endLater = false;
		    this._lastCallTime = 0;
		    this._$trailingCall = function () {
		      return _this._trailingCall();
		    };
		  },
		  _free: function () {
		    this._trailingValue = null;
		    this._$trailingCall = null;
		  },
		  _handleValue: function (x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      var curTime = now();
		      if (this._lastCallTime === 0 && !this._leading) {
		        this._lastCallTime = curTime;
		      }
		      var remaining = this._wait - (curTime - this._lastCallTime);
		      if (remaining <= 0) {
		        this._cancelTrailing();
		        this._lastCallTime = curTime;
		        this._emitValue(x);
		      } else if (this._trailing) {
		        this._cancelTrailing();
		        this._trailingValue = x;
		        this._timeoutId = setTimeout(this._$trailingCall, remaining);
		      }
		    }
		  },
		  _handleEnd: function () {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      if (this._timeoutId) {
		        this._endLater = true;
		      } else {
		        this._emitEnd();
		      }
		    }
		  },
		  _cancelTrailing: function () {
		    if (this._timeoutId !== null) {
		      clearTimeout(this._timeoutId);
		      this._timeoutId = null;
		    }
		  },
		  _trailingCall: function () {
		    this._emitValue(this._trailingValue);
		    this._timeoutId = null;
		    this._trailingValue = null;
		    this._lastCallTime = !this._leading ? 0 : now();
		    if (this._endLater) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$19 = createStream('throttle', mixin$12);
		var P$15 = createProperty('throttle', mixin$12);
	
		function throttle(obs, wait) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$leading = _ref2.leading;
		  var leading = _ref2$leading === undefined ? true : _ref2$leading;
		  var _ref2$trailing = _ref2.trailing;
		  var trailing = _ref2$trailing === undefined ? true : _ref2$trailing;
	
		  return new (obs._ofSameType(S$19, P$15))(obs, { wait: wait, leading: leading, trailing: trailing });
		}
	
		var mixin$13 = {
		  _init: function (_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var immediate = _ref.immediate;
	
		    this._wait = Math.max(0, wait);
		    this._immediate = immediate;
		    this._lastAttempt = 0;
		    this._timeoutId = null;
		    this._laterValue = null;
		    this._endLater = false;
		    this._$later = function () {
		      return _this._later();
		    };
		  },
		  _free: function () {
		    this._laterValue = null;
		    this._$later = null;
		  },
		  _handleValue: function (x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      this._lastAttempt = now();
		      if (this._immediate && !this._timeoutId) {
		        this._emitValue(x);
		      }
		      if (!this._timeoutId) {
		        this._timeoutId = setTimeout(this._$later, this._wait);
		      }
		      if (!this._immediate) {
		        this._laterValue = x;
		      }
		    }
		  },
		  _handleEnd: function () {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      if (this._timeoutId && !this._immediate) {
		        this._endLater = true;
		      } else {
		        this._emitEnd();
		      }
		    }
		  },
		  _later: function () {
		    var last = now() - this._lastAttempt;
		    if (last < this._wait && last >= 0) {
		      this._timeoutId = setTimeout(this._$later, this._wait - last);
		    } else {
		      this._timeoutId = null;
		      if (!this._immediate) {
		        this._emitValue(this._laterValue);
		        this._laterValue = null;
		      }
		      if (this._endLater) {
		        this._emitEnd();
		      }
		    }
		  }
		};
	
		var S$20 = createStream('debounce', mixin$13);
		var P$16 = createProperty('debounce', mixin$13);
	
		function debounce(obs, wait) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$immediate = _ref2.immediate;
		  var immediate = _ref2$immediate === undefined ? false : _ref2$immediate;
	
		  return new (obs._ofSameType(S$20, P$16))(obs, { wait: wait, immediate: immediate });
		}
	
		var mixin$14 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleError: function (x) {
		    var fn = this._fn;
		    this._emitError(fn(x));
		  }
		};
	
		var S$21 = createStream('mapErrors', mixin$14);
		var P$17 = createProperty('mapErrors', mixin$14);
	
		var id$5 = function (x) {
		  return x;
		};
	
		function mapErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$5 : arguments[1];
	
		  return new (obs._ofSameType(S$21, P$17))(obs, { fn: fn });
		}
	
		var mixin$15 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleError: function (x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitError(x);
		    }
		  }
		};
	
		var S$22 = createStream('filterErrors', mixin$15);
		var P$18 = createProperty('filterErrors', mixin$15);
	
		var id$6 = function (x) {
		  return x;
		};
	
		function filterErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id$6 : arguments[1];
	
		  return new (obs._ofSameType(S$22, P$18))(obs, { fn: fn });
		}
	
		var mixin$16 = {
		  _handleValue: function () {}
		};
	
		var S$23 = createStream('ignoreValues', mixin$16);
		var P$19 = createProperty('ignoreValues', mixin$16);
	
		function ignoreValues(obs) {
		  return new (obs._ofSameType(S$23, P$19))(obs);
		}
	
		var mixin$17 = {
		  _handleError: function () {}
		};
	
		var S$24 = createStream('ignoreErrors', mixin$17);
		var P$20 = createProperty('ignoreErrors', mixin$17);
	
		function ignoreErrors(obs) {
		  return new (obs._ofSameType(S$24, P$20))(obs);
		}
	
		var mixin$18 = {
		  _handleEnd: function () {}
		};
	
		var S$25 = createStream('ignoreEnd', mixin$18);
		var P$21 = createProperty('ignoreEnd', mixin$18);
	
		function ignoreEnd(obs) {
		  return new (obs._ofSameType(S$25, P$21))(obs);
		}
	
		var mixin$19 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleEnd: function () {
		    var fn = this._fn;
		    this._emitValue(fn());
		    this._emitEnd();
		  }
		};
	
		var S$26 = createStream('beforeEnd', mixin$19);
		var P$22 = createProperty('beforeEnd', mixin$19);
	
		function beforeEnd(obs, fn) {
		  return new (obs._ofSameType(S$26, P$22))(obs, { fn: fn });
		}
	
		var mixin$20 = {
		  _init: function (_ref) {
		    var min = _ref.min;
		    var max = _ref.max;
	
		    this._max = max;
		    this._min = min;
		    this._buff = [];
		  },
		  _free: function () {
		    this._buff = null;
		  },
		  _handleValue: function (x) {
		    this._buff = slide(this._buff, x, this._max);
		    if (this._buff.length >= this._min) {
		      this._emitValue(this._buff);
		    }
		  }
		};
	
		var S$27 = createStream('slidingWindow', mixin$20);
		var P$23 = createProperty('slidingWindow', mixin$20);
	
		function slidingWindow(obs, max) {
		  var min = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
		  return new (obs._ofSameType(S$27, P$23))(obs, { min: min, max: max });
		}
	
		var mixin$21 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._fn = fn;
		    this._flushOnEnd = flushOnEnd;
		    this._buff = [];
		  },
		  _free: function () {
		    this._buff = null;
		  },
		  _flush: function () {
		    if (this._buff !== null && this._buff.length !== 0) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
		  _handleValue: function (x) {
		    this._buff.push(x);
		    var fn = this._fn;
		    if (!fn(x)) {
		      this._flush();
		    }
		  },
		  _handleEnd: function () {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  }
		};
	
		var S$28 = createStream('bufferWhile', mixin$21);
		var P$24 = createProperty('bufferWhile', mixin$21);
	
		var id$7 = function (x) {
		  return x;
		};
	
		function bufferWhile(obs, fn) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S$28, P$24))(obs, { fn: fn || id$7, flushOnEnd: flushOnEnd });
		}
	
		var mixin$22 = {
		  _init: function (_ref) {
		    var count = _ref.count;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._count = count;
		    this._flushOnEnd = flushOnEnd;
		    this._buff = [];
		  },
		  _free: function () {
		    this._buff = null;
		  },
		  _flush: function () {
		    if (this._buff !== null && this._buff.length !== 0) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
		  _handleValue: function (x) {
		    this._buff.push(x);
		    if (this._buff.length >= this._count) {
		      this._flush();
		    }
		  },
		  _handleEnd: function () {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  }
		};
	
		var S$29 = createStream('bufferWithCount', mixin$22);
		var P$25 = createProperty('bufferWithCount', mixin$22);
	
		function bufferWhile$1(obs, count) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S$29, P$25))(obs, { count: count, flushOnEnd: flushOnEnd });
		}
	
		var mixin$23 = {
		  _init: function (_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var count = _ref.count;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._wait = wait;
		    this._count = count;
		    this._flushOnEnd = flushOnEnd;
		    this._intervalId = null;
		    this._$onTick = function () {
		      return _this._flush();
		    };
		    this._buff = [];
		  },
		  _free: function () {
		    this._$onTick = null;
		    this._buff = null;
		  },
		  _flush: function () {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
		  _handleValue: function (x) {
		    this._buff.push(x);
		    if (this._buff.length >= this._count) {
		      clearInterval(this._intervalId);
		      this._flush();
		      this._intervalId = setInterval(this._$onTick, this._wait);
		    }
		  },
		  _handleEnd: function () {
		    if (this._flushOnEnd && this._buff.length !== 0) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
		  _onActivation: function () {
		    this._intervalId = setInterval(this._$onTick, this._wait);
		    this._source.onAny(this._$handleAny); // copied from patterns/one-source
		  },
		  _onDeactivation: function () {
		    if (this._intervalId !== null) {
		      clearInterval(this._intervalId);
		      this._intervalId = null;
		    }
		    this._source.offAny(this._$handleAny); // copied from patterns/one-source
		  }
		};
	
		var S$30 = createStream('bufferWithTimeOrCount', mixin$23);
		var P$26 = createProperty('bufferWithTimeOrCount', mixin$23);
	
		function bufferWithTimeOrCount(obs, wait, count) {
		  var _ref2 = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S$30, P$26))(obs, { wait: wait, count: count, flushOnEnd: flushOnEnd });
		}
	
		function xformForObs(obs) {
		  return {
		    '@@transducer/step': function (res, input) {
		      obs._emitValue(input);
		      return null;
		    },
		    '@@transducer/result': function () {
		      obs._emitEnd();
		      return null;
		    }
		  };
		}
	
		var mixin$24 = {
		  _init: function (_ref) {
		    var transducer = _ref.transducer;
	
		    this._xform = transducer(xformForObs(this));
		  },
		  _free: function () {
		    this._xform = null;
		  },
		  _handleValue: function (x) {
		    if (this._xform['@@transducer/step'](null, x) !== null) {
		      this._xform['@@transducer/result'](null);
		    }
		  },
		  _handleEnd: function () {
		    this._xform['@@transducer/result'](null);
		  }
		};
	
		var S$31 = createStream('transduce', mixin$24);
		var P$27 = createProperty('transduce', mixin$24);
	
		function transduce(obs, transducer) {
		  return new (obs._ofSameType(S$31, P$27))(obs, { transducer: transducer });
		}
	
		var mixin$25 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._handler = fn;
		    this._emitter = emitter(this);
		  },
		  _free: function () {
		    this._handler = null;
		    this._emitter = null;
		  },
		  _handleAny: function (event) {
		    this._handler(this._emitter, event);
		  }
		};
	
		var S$32 = createStream('withHandler', mixin$25);
		var P$28 = createProperty('withHandler', mixin$25);
	
		function withHandler(obs, fn) {
		  return new (obs._ofSameType(S$32, P$28))(obs, { fn: fn });
		}
	
		function defaultErrorsCombinator(errors) {
		  var latestError = void 0;
		  for (var i = 0; i < errors.length; i++) {
		    if (errors[i] !== undefined) {
		      if (latestError === undefined || latestError.index < errors[i].index) {
		        latestError = errors[i];
		      }
		    }
		  }
		  return latestError.error;
		}
	
		function Combine(active, passive, combinator) {
		  var _this = this;
	
		  Stream.call(this);
		  this._activeCount = active.length;
		  this._sources = concat(active, passive);
		  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
		    return x;
		  };
		  this._aliveCount = 0;
		  this._latestValues = new Array(this._sources.length);
		  this._latestErrors = new Array(this._sources.length);
		  fillArray(this._latestValues, NOTHING);
		  this._emitAfterActivation = false;
		  this._endAfterActivation = false;
		  this._latestErrorIndex = 0;
	
		  this._$handlers = [];
	
		  var _loop = function (i) {
		    _this._$handlers.push(function (event) {
		      return _this._handleAny(i, event);
		    });
		  };
	
		  for (var i = 0; i < this._sources.length; i++) {
		    _loop(i);
		  }
		}
	
		inherit(Combine, Stream, {
	
		  _name: 'combine',
	
		  _onActivation: function () {
		    this._aliveCount = this._activeCount;
	
		    // we need to suscribe to _passive_ sources before _active_
		    // (see https://github.com/rpominov/kefir/issues/98)
		    for (var i = this._activeCount; i < this._sources.length; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
		    for (var i = 0; i < this._activeCount; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
	
		    if (this._emitAfterActivation) {
		      this._emitAfterActivation = false;
		      this._emitIfFull();
		    }
		    if (this._endAfterActivation) {
		      this._emitEnd();
		    }
		  },
		  _onDeactivation: function () {
		    var length = this._sources.length,
		        i = void 0;
		    for (i = 0; i < length; i++) {
		      this._sources[i].offAny(this._$handlers[i]);
		    }
		  },
		  _emitIfFull: function () {
		    var hasAllValues = true;
		    var hasErrors = false;
		    var length = this._latestValues.length;
		    var valuesCopy = new Array(length);
		    var errorsCopy = new Array(length);
	
		    for (var i = 0; i < length; i++) {
		      valuesCopy[i] = this._latestValues[i];
		      errorsCopy[i] = this._latestErrors[i];
	
		      if (valuesCopy[i] === NOTHING) {
		        hasAllValues = false;
		      }
	
		      if (errorsCopy[i] !== undefined) {
		        hasErrors = true;
		      }
		    }
	
		    if (hasAllValues) {
		      var combinator = this._combinator;
		      this._emitValue(combinator(valuesCopy));
		    }
		    if (hasErrors) {
		      this._emitError(defaultErrorsCombinator(errorsCopy));
		    }
		  },
		  _handleAny: function (i, event) {
	
		    if (event.type === VALUE || event.type === ERROR) {
	
		      if (event.type === VALUE) {
		        this._latestValues[i] = event.value;
		        this._latestErrors[i] = undefined;
		      }
		      if (event.type === ERROR) {
		        this._latestValues[i] = NOTHING;
		        this._latestErrors[i] = {
		          index: this._latestErrorIndex++,
		          error: event.value
		        };
		      }
	
		      if (i < this._activeCount) {
		        if (this._activating) {
		          this._emitAfterActivation = true;
		        } else {
		          this._emitIfFull();
		        }
		      }
		    } else {
		      // END
	
		      if (i < this._activeCount) {
		        this._aliveCount--;
		        if (this._aliveCount === 0) {
		          if (this._activating) {
		            this._endAfterActivation = true;
		          } else {
		            this._emitEnd();
		          }
		        }
		      }
		    }
		  },
		  _clear: function () {
		    Stream.prototype._clear.call(this);
		    this._sources = null;
		    this._latestValues = null;
		    this._latestErrors = null;
		    this._combinator = null;
		    this._$handlers = null;
		  }
		});
	
		function combine(active) {
		  var passive = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
		  var combinator = arguments[2];
	
		  if (typeof passive === 'function') {
		    combinator = passive;
		    passive = [];
		  }
		  return active.length === 0 ? never() : new Combine(active, passive, combinator);
		}
	
		var isArray = Array.isArray || function (xs) {
		  return Object.prototype.toString.call(xs) === '[object Array]';
		};
	
		function Zip(sources, combinator) {
		  var _this = this;
	
		  Stream.call(this);
	
		  this._buffers = map(sources, function (source) {
		    return isArray(source) ? cloneArray(source) : [];
		  });
		  this._sources = map(sources, function (source) {
		    return isArray(source) ? never() : source;
		  });
	
		  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
		    return x;
		  };
		  this._aliveCount = 0;
	
		  this._$handlers = [];
	
		  var _loop = function (i) {
		    _this._$handlers.push(function (event) {
		      return _this._handleAny(i, event);
		    });
		  };
	
		  for (var i = 0; i < this._sources.length; i++) {
		    _loop(i);
		  }
		}
	
		inherit(Zip, Stream, {
	
		  _name: 'zip',
	
		  _onActivation: function () {
	
		    // if all sources are arrays
		    while (this._isFull()) {
		      this._emit();
		    }
	
		    var length = this._sources.length;
		    this._aliveCount = length;
		    for (var i = 0; i < length && this._active; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
		  },
		  _onDeactivation: function () {
		    for (var i = 0; i < this._sources.length; i++) {
		      this._sources[i].offAny(this._$handlers[i]);
		    }
		  },
		  _emit: function () {
		    var values = new Array(this._buffers.length);
		    for (var i = 0; i < this._buffers.length; i++) {
		      values[i] = this._buffers[i].shift();
		    }
		    var combinator = this._combinator;
		    this._emitValue(combinator(values));
		  },
		  _isFull: function () {
		    for (var i = 0; i < this._buffers.length; i++) {
		      if (this._buffers[i].length === 0) {
		        return false;
		      }
		    }
		    return true;
		  },
		  _handleAny: function (i, event) {
		    if (event.type === VALUE) {
		      this._buffers[i].push(event.value);
		      if (this._isFull()) {
		        this._emit();
		      }
		    }
		    if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
		    if (event.type === END) {
		      this._aliveCount--;
		      if (this._aliveCount === 0) {
		        this._emitEnd();
		      }
		    }
		  },
		  _clear: function () {
		    Stream.prototype._clear.call(this);
		    this._sources = null;
		    this._buffers = null;
		    this._combinator = null;
		    this._$handlers = null;
		  }
		});
	
		function zip(observables, combinator /* Function | falsey */) {
		  return observables.length === 0 ? never() : new Zip(observables, combinator);
		}
	
		var id$8 = function (x) {
		  return x;
		};
	
		function AbstractPool() {
		  var _this = this;
	
		  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		  var _ref$queueLim = _ref.queueLim;
		  var queueLim = _ref$queueLim === undefined ? 0 : _ref$queueLim;
		  var _ref$concurLim = _ref.concurLim;
		  var concurLim = _ref$concurLim === undefined ? -1 : _ref$concurLim;
		  var _ref$drop = _ref.drop;
		  var drop = _ref$drop === undefined ? 'new' : _ref$drop;
	
		  Stream.call(this);
	
		  this._queueLim = queueLim < 0 ? -1 : queueLim;
		  this._concurLim = concurLim < 0 ? -1 : concurLim;
		  this._drop = drop;
		  this._queue = [];
		  this._curSources = [];
		  this._$handleSubAny = function (event) {
		    return _this._handleSubAny(event);
		  };
		  this._$endHandlers = [];
		  this._currentlyAdding = null;
	
		  if (this._concurLim === 0) {
		    this._emitEnd();
		  }
		}
	
		inherit(AbstractPool, Stream, {
	
		  _name: 'abstractPool',
	
		  _add: function (obj, toObs /* Function | falsey */) {
		    toObs = toObs || id$8;
		    if (this._concurLim === -1 || this._curSources.length < this._concurLim) {
		      this._addToCur(toObs(obj));
		    } else {
		      if (this._queueLim === -1 || this._queue.length < this._queueLim) {
		        this._addToQueue(toObs(obj));
		      } else if (this._drop === 'old') {
		        this._removeOldest();
		        this._add(obj, toObs);
		      }
		    }
		  },
		  _addAll: function (obss) {
		    var _this2 = this;
	
		    forEach(obss, function (obs) {
		      return _this2._add(obs);
		    });
		  },
		  _remove: function (obs) {
		    if (this._removeCur(obs) === -1) {
		      this._removeQueue(obs);
		    }
		  },
		  _addToQueue: function (obs) {
		    this._queue = concat(this._queue, [obs]);
		  },
		  _addToCur: function (obs) {
		    if (this._active) {
	
		      // HACK:
		      //
		      // We have two optimizations for cases when `obs` is ended. We don't want
		      // to add such observable to the list, but only want to emit events
		      // from it (if it has some).
		      //
		      // Instead of this hacks, we could just did following,
		      // but it would be 5-8 times slower:
		      //
		      //     this._curSources = concat(this._curSources, [obs]);
		      //     this._subscribe(obs);
		      //
	
		      // #1
		      // This one for cases when `obs` already ended
		      // e.g., Kefir.constant() or Kefir.never()
		      if (!obs._alive) {
		        if (obs._currentEvent) {
		          this._emit(obs._currentEvent.type, obs._currentEvent.value);
		        }
		        return;
		      }
	
		      // #2
		      // This one is for cases when `obs` going to end synchronously on
		      // first subscriber e.g., Kefir.stream(em => {em.emit(1); em.end()})
		      this._currentlyAdding = obs;
		      obs.onAny(this._$handleSubAny);
		      this._currentlyAdding = null;
		      if (obs._alive) {
		        this._curSources = concat(this._curSources, [obs]);
		        if (this._active) {
		          this._subToEnd(obs);
		        }
		      }
		    } else {
		      this._curSources = concat(this._curSources, [obs]);
		    }
		  },
		  _subToEnd: function (obs) {
		    var _this3 = this;
	
		    var onEnd = function () {
		      return _this3._removeCur(obs);
		    };
		    this._$endHandlers.push({ obs: obs, handler: onEnd });
		    obs.onEnd(onEnd);
		  },
		  _subscribe: function (obs) {
		    obs.onAny(this._$handleSubAny);
	
		    // it can become inactive in responce of subscribing to `obs.onAny` above
		    if (this._active) {
		      this._subToEnd(obs);
		    }
		  },
		  _unsubscribe: function (obs) {
		    obs.offAny(this._$handleSubAny);
	
		    var onEndI = findByPred(this._$endHandlers, function (obj) {
		      return obj.obs === obs;
		    });
		    if (onEndI !== -1) {
		      obs.offEnd(this._$endHandlers[onEndI].handler);
		      this._$endHandlers.splice(onEndI, 1);
		    }
		  },
		  _handleSubAny: function (event) {
		    if (event.type === VALUE) {
		      this._emitValue(event.value);
		    } else if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
		  },
		  _removeQueue: function (obs) {
		    var index = find(this._queue, obs);
		    this._queue = remove(this._queue, index);
		    return index;
		  },
		  _removeCur: function (obs) {
		    if (this._active) {
		      this._unsubscribe(obs);
		    }
		    var index = find(this._curSources, obs);
		    this._curSources = remove(this._curSources, index);
		    if (index !== -1) {
		      if (this._queue.length !== 0) {
		        this._pullQueue();
		      } else if (this._curSources.length === 0) {
		        this._onEmpty();
		      }
		    }
		    return index;
		  },
		  _removeOldest: function () {
		    this._removeCur(this._curSources[0]);
		  },
		  _pullQueue: function () {
		    if (this._queue.length !== 0) {
		      this._queue = cloneArray(this._queue);
		      this._addToCur(this._queue.shift());
		    }
		  },
		  _onActivation: function () {
		    for (var i = 0, sources = this._curSources; i < sources.length && this._active; i++) {
		      this._subscribe(sources[i]);
		    }
		  },
		  _onDeactivation: function () {
		    for (var i = 0, sources = this._curSources; i < sources.length; i++) {
		      this._unsubscribe(sources[i]);
		    }
		    if (this._currentlyAdding !== null) {
		      this._unsubscribe(this._currentlyAdding);
		    }
		  },
		  _isEmpty: function () {
		    return this._curSources.length === 0;
		  },
		  _onEmpty: function () {},
		  _clear: function () {
		    Stream.prototype._clear.call(this);
		    this._queue = null;
		    this._curSources = null;
		    this._$handleSubAny = null;
		    this._$endHandlers = null;
		  }
		});
	
		function Merge(sources) {
		  AbstractPool.call(this);
		  this._addAll(sources);
		  this._initialised = true;
		}
	
		inherit(Merge, AbstractPool, {
	
		  _name: 'merge',
	
		  _onEmpty: function () {
		    if (this._initialised) {
		      this._emitEnd();
		    }
		  }
		});
	
		function merge(observables) {
		  return observables.length === 0 ? never() : new Merge(observables);
		}
	
		function S$33(generator) {
		  var _this = this;
	
		  Stream.call(this);
		  this._generator = generator;
		  this._source = null;
		  this._inLoop = false;
		  this._iteration = 0;
		  this._$handleAny = function (event) {
		    return _this._handleAny(event);
		  };
		}
	
		inherit(S$33, Stream, {
	
		  _name: 'repeat',
	
		  _handleAny: function (event) {
		    if (event.type === END) {
		      this._source = null;
		      this._getSource();
		    } else {
		      this._emit(event.type, event.value);
		    }
		  },
		  _getSource: function () {
		    if (!this._inLoop) {
		      this._inLoop = true;
		      var generator = this._generator;
		      while (this._source === null && this._alive && this._active) {
		        this._source = generator(this._iteration++);
		        if (this._source) {
		          this._source.onAny(this._$handleAny);
		        } else {
		          this._emitEnd();
		        }
		      }
		      this._inLoop = false;
		    }
		  },
		  _onActivation: function () {
		    if (this._source) {
		      this._source.onAny(this._$handleAny);
		    } else {
		      this._getSource();
		    }
		  },
		  _onDeactivation: function () {
		    if (this._source) {
		      this._source.offAny(this._$handleAny);
		    }
		  },
		  _clear: function () {
		    Stream.prototype._clear.call(this);
		    this._generator = null;
		    this._source = null;
		    this._$handleAny = null;
		  }
		});
	
		function repeat (generator) {
		  return new S$33(generator);
		}
	
		function concat$1(observables) {
		  return repeat(function (index) {
		    return observables.length > index ? observables[index] : false;
		  }).setName('concat');
		}
	
		function Pool() {
		  AbstractPool.call(this);
		}
	
		inherit(Pool, AbstractPool, {
	
		  _name: 'pool',
	
		  plug: function (obs) {
		    this._add(obs);
		    return this;
		  },
		  unplug: function (obs) {
		    this._remove(obs);
		    return this;
		  }
		});
	
		function FlatMap(source, fn, options) {
		  var _this = this;
	
		  AbstractPool.call(this, options);
		  this._source = source;
		  this._fn = fn;
		  this._mainEnded = false;
		  this._lastCurrent = null;
		  this._$handleMain = function (event) {
		    return _this._handleMain(event);
		  };
		}
	
		inherit(FlatMap, AbstractPool, {
		  _onActivation: function () {
		    AbstractPool.prototype._onActivation.call(this);
		    if (this._active) {
		      this._source.onAny(this._$handleMain);
		    }
		  },
		  _onDeactivation: function () {
		    AbstractPool.prototype._onDeactivation.call(this);
		    this._source.offAny(this._$handleMain);
		    this._hadNoEvSinceDeact = true;
		  },
		  _handleMain: function (event) {
	
		    if (event.type === VALUE) {
		      // Is latest value before deactivation survived, and now is 'current' on this activation?
		      // We don't want to handle such values, to prevent to constantly add
		      // same observale on each activation/deactivation when our main source
		      // is a `Kefir.conatant()` for example.
		      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
		      if (!sameCurr) {
		        this._add(event.value, this._fn);
		      }
		      this._lastCurrent = event.value;
		      this._hadNoEvSinceDeact = false;
		    }
	
		    if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
	
		    if (event.type === END) {
		      if (this._isEmpty()) {
		        this._emitEnd();
		      } else {
		        this._mainEnded = true;
		      }
		    }
		  },
		  _onEmpty: function () {
		    if (this._mainEnded) {
		      this._emitEnd();
		    }
		  },
		  _clear: function () {
		    AbstractPool.prototype._clear.call(this);
		    this._source = null;
		    this._lastCurrent = null;
		    this._$handleMain = null;
		  }
		});
	
		function FlatMapErrors(source, fn) {
		  FlatMap.call(this, source, fn);
		}
	
		inherit(FlatMapErrors, FlatMap, {
	
		  // Same as in FlatMap, only VALUE/ERROR flipped
	
		  _handleMain: function (event) {
	
		    if (event.type === ERROR) {
		      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
		      if (!sameCurr) {
		        this._add(event.value, this._fn);
		      }
		      this._lastCurrent = event.value;
		      this._hadNoEvSinceDeact = false;
		    }
	
		    if (event.type === VALUE) {
		      this._emitValue(event.value);
		    }
	
		    if (event.type === END) {
		      if (this._isEmpty()) {
		        this._emitEnd();
		      } else {
		        this._mainEnded = true;
		      }
		    }
		  }
		});
	
		function createConstructor$1(BaseClass, name) {
		  return function AnonymousObservable(primary, secondary, options) {
		    var _this = this;
	
		    BaseClass.call(this);
		    this._primary = primary;
		    this._secondary = secondary;
		    this._name = primary._name + '.' + name;
		    this._lastSecondary = NOTHING;
		    this._$handleSecondaryAny = function (event) {
		      return _this._handleSecondaryAny(event);
		    };
		    this._$handlePrimaryAny = function (event) {
		      return _this._handlePrimaryAny(event);
		    };
		    this._init(options);
		  };
		}
	
		function createClassMethods$1(BaseClass) {
		  return {
		    _init: function () {},
		    _free: function () {},
		    _handlePrimaryValue: function (x) {
		      this._emitValue(x);
		    },
		    _handlePrimaryError: function (x) {
		      this._emitError(x);
		    },
		    _handlePrimaryEnd: function () {
		      this._emitEnd();
		    },
		    _handleSecondaryValue: function (x) {
		      this._lastSecondary = x;
		    },
		    _handleSecondaryError: function (x) {
		      this._emitError(x);
		    },
		    _handleSecondaryEnd: function () {},
		    _handlePrimaryAny: function (event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handlePrimaryValue(event.value);
		        case ERROR:
		          return this._handlePrimaryError(event.value);
		        case END:
		          return this._handlePrimaryEnd(event.value);
		      }
		    },
		    _handleSecondaryAny: function (event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handleSecondaryValue(event.value);
		        case ERROR:
		          return this._handleSecondaryError(event.value);
		        case END:
		          this._handleSecondaryEnd(event.value);
		          this._removeSecondary();
		      }
		    },
		    _removeSecondary: function () {
		      if (this._secondary !== null) {
		        this._secondary.offAny(this._$handleSecondaryAny);
		        this._$handleSecondaryAny = null;
		        this._secondary = null;
		      }
		    },
		    _onActivation: function () {
		      if (this._secondary !== null) {
		        this._secondary.onAny(this._$handleSecondaryAny);
		      }
		      if (this._active) {
		        this._primary.onAny(this._$handlePrimaryAny);
		      }
		    },
		    _onDeactivation: function () {
		      if (this._secondary !== null) {
		        this._secondary.offAny(this._$handleSecondaryAny);
		      }
		      this._primary.offAny(this._$handlePrimaryAny);
		    },
		    _clear: function () {
		      BaseClass.prototype._clear.call(this);
		      this._primary = null;
		      this._secondary = null;
		      this._lastSecondary = null;
		      this._$handleSecondaryAny = null;
		      this._$handlePrimaryAny = null;
		      this._free();
		    }
		  };
		}
	
		function createStream$1(name, mixin) {
		  var S = createConstructor$1(Stream, name);
		  inherit(S, Stream, createClassMethods$1(Stream), mixin);
		  return S;
		}
	
		function createProperty$1(name, mixin) {
		  var P = createConstructor$1(Property, name);
		  inherit(P, Property, createClassMethods$1(Property), mixin);
		  return P;
		}
	
		var mixin$26 = {
		  _handlePrimaryValue: function (x) {
		    if (this._lastSecondary !== NOTHING && this._lastSecondary) {
		      this._emitValue(x);
		    }
		  },
		  _handleSecondaryEnd: function () {
		    if (this._lastSecondary === NOTHING || !this._lastSecondary) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$34 = createStream$1('filterBy', mixin$26);
		var P$29 = createProperty$1('filterBy', mixin$26);
	
		function filterBy(primary, secondary) {
		  return new (primary._ofSameType(S$34, P$29))(primary, secondary);
		}
	
		var id2 = function (_, x) {
		  return x;
		};
	
		function sampledBy(passive, active, combinator) {
		  var _combinator = combinator ? function (a, b) {
		    return combinator(b, a);
		  } : id2;
		  return combine([active], [passive], _combinator).setName(passive, 'sampledBy');
		}
	
		var mixin$27 = {
		  _handlePrimaryValue: function (x) {
		    if (this._lastSecondary !== NOTHING) {
		      this._emitValue(x);
		    }
		  },
		  _handleSecondaryEnd: function () {
		    if (this._lastSecondary === NOTHING) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$35 = createStream$1('skipUntilBy', mixin$27);
		var P$30 = createProperty$1('skipUntilBy', mixin$27);
	
		function skipUntilBy(primary, secondary) {
		  return new (primary._ofSameType(S$35, P$30))(primary, secondary);
		}
	
		var mixin$28 = {
		  _handleSecondaryValue: function () {
		    this._emitEnd();
		  }
		};
	
		var S$36 = createStream$1('takeUntilBy', mixin$28);
		var P$31 = createProperty$1('takeUntilBy', mixin$28);
	
		function takeUntilBy(primary, secondary) {
		  return new (primary._ofSameType(S$36, P$31))(primary, secondary);
		}
	
		var mixin$29 = {
		  _init: function () {
		    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		    var _ref$flushOnEnd = _ref.flushOnEnd;
		    var flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;
	
		    this._buff = [];
		    this._flushOnEnd = flushOnEnd;
		  },
		  _free: function () {
		    this._buff = null;
		  },
		  _flush: function () {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
		  _handlePrimaryEnd: function () {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
		  _onActivation: function () {
		    this._primary.onAny(this._$handlePrimaryAny);
		    if (this._alive && this._secondary !== null) {
		      this._secondary.onAny(this._$handleSecondaryAny);
		    }
		  },
		  _handlePrimaryValue: function (x) {
		    this._buff.push(x);
		  },
		  _handleSecondaryValue: function () {
		    this._flush();
		  },
		  _handleSecondaryEnd: function () {
		    if (!this._flushOnEnd) {
		      this._emitEnd();
		    }
		  }
		};
	
		var S$37 = createStream$1('bufferBy', mixin$29);
		var P$32 = createProperty$1('bufferBy', mixin$29);
	
		function bufferBy(primary, secondary, options /* optional */) {
		  return new (primary._ofSameType(S$37, P$32))(primary, secondary, options);
		}
	
		var mixin$30 = {
		  _init: function () {
		    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		    var _ref$flushOnEnd = _ref.flushOnEnd;
		    var flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;
		    var _ref$flushOnChange = _ref.flushOnChange;
		    var flushOnChange = _ref$flushOnChange === undefined ? false : _ref$flushOnChange;
	
		    this._buff = [];
		    this._flushOnEnd = flushOnEnd;
		    this._flushOnChange = flushOnChange;
		  },
		  _free: function () {
		    this._buff = null;
		  },
		  _flush: function () {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
		  _handlePrimaryEnd: function () {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
		  _handlePrimaryValue: function (x) {
		    this._buff.push(x);
		    if (this._lastSecondary !== NOTHING && !this._lastSecondary) {
		      this._flush();
		    }
		  },
		  _handleSecondaryEnd: function () {
		    if (!this._flushOnEnd && (this._lastSecondary === NOTHING || this._lastSecondary)) {
		      this._emitEnd();
		    }
		  },
		  _handleSecondaryValue: function (x) {
		    if (this._flushOnChange && !x) {
		      this._flush();
		    }
	
		    // from default _handleSecondaryValue
		    this._lastSecondary = x;
		  }
		};
	
		var S$38 = createStream$1('bufferWhileBy', mixin$30);
		var P$33 = createProperty$1('bufferWhileBy', mixin$30);
	
		function bufferWhileBy(primary, secondary, options /* optional */) {
		  return new (primary._ofSameType(S$38, P$33))(primary, secondary, options);
		}
	
		var f = function () {
		  return false;
		};
		var t = function () {
		  return true;
		};
	
		function awaiting(a, b) {
		  var result = merge([map$1(a, t), map$1(b, f)]);
		  result = skipDuplicates(result);
		  result = toProperty(result, f);
		  return result.setName(a, 'awaiting');
		}
	
		var mixin$31 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleValue: function (x) {
		    var fn = this._fn;
		    var result = fn(x);
		    if (result.convert) {
		      this._emitError(result.error);
		    } else {
		      this._emitValue(x);
		    }
		  }
		};
	
		var S$39 = createStream('valuesToErrors', mixin$31);
		var P$34 = createProperty('valuesToErrors', mixin$31);
	
		var defFn = function (x) {
		  return { convert: true, error: x };
		};
	
		function valuesToErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? defFn : arguments[1];
	
		  return new (obs._ofSameType(S$39, P$34))(obs, { fn: fn });
		}
	
		var mixin$32 = {
		  _init: function (_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
		  _free: function () {
		    this._fn = null;
		  },
		  _handleError: function (x) {
		    var fn = this._fn;
		    var result = fn(x);
		    if (result.convert) {
		      this._emitValue(result.value);
		    } else {
		      this._emitError(x);
		    }
		  }
		};
	
		var S$40 = createStream('errorsToValues', mixin$32);
		var P$35 = createProperty('errorsToValues', mixin$32);
	
		var defFn$1 = function (x) {
		  return { convert: true, value: x };
		};
	
		function errorsToValues(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? defFn$1 : arguments[1];
	
		  return new (obs._ofSameType(S$40, P$35))(obs, { fn: fn });
		}
	
		var mixin$33 = {
		  _handleError: function (x) {
		    this._emitError(x);
		    this._emitEnd();
		  }
		};
	
		var S$41 = createStream('endOnError', mixin$33);
		var P$36 = createProperty('endOnError', mixin$33);
	
		function endOnError(obs) {
		  return new (obs._ofSameType(S$41, P$36))(obs);
		}
	
		Observable.prototype.toProperty = function (fn) {
		  return toProperty(this, fn);
		};
	
		Observable.prototype.changes = function () {
		  return changes(this);
		};
	
		Observable.prototype.toPromise = function (Promise) {
		  return toPromise(this, Promise);
		};
	
		Observable.prototype.toESObservable = toESObservable;
		Observable.prototype[$$observable] = toESObservable;
	
		Observable.prototype.map = function (fn) {
		  return map$1(this, fn);
		};
	
		Observable.prototype.filter = function (fn) {
		  return filter(this, fn);
		};
	
		Observable.prototype.take = function (n) {
		  return take(this, n);
		};
	
		Observable.prototype.takeErrors = function (n) {
		  return takeErrors(this, n);
		};
	
		Observable.prototype.takeWhile = function (fn) {
		  return takeWhile(this, fn);
		};
	
		Observable.prototype.last = function () {
		  return last(this);
		};
	
		Observable.prototype.skip = function (n) {
		  return skip(this, n);
		};
	
		Observable.prototype.skipWhile = function (fn) {
		  return skipWhile(this, fn);
		};
	
		Observable.prototype.skipDuplicates = function (fn) {
		  return skipDuplicates(this, fn);
		};
	
		Observable.prototype.diff = function (fn, seed) {
		  return diff(this, fn, seed);
		};
	
		Observable.prototype.scan = function (fn, seed) {
		  return scan(this, fn, seed);
		};
	
		Observable.prototype.flatten = function (fn) {
		  return flatten(this, fn);
		};
	
		Observable.prototype.delay = function (wait) {
		  return delay(this, wait);
		};
	
		Observable.prototype.throttle = function (wait, options) {
		  return throttle(this, wait, options);
		};
	
		Observable.prototype.debounce = function (wait, options) {
		  return debounce(this, wait, options);
		};
	
		Observable.prototype.mapErrors = function (fn) {
		  return mapErrors(this, fn);
		};
	
		Observable.prototype.filterErrors = function (fn) {
		  return filterErrors(this, fn);
		};
	
		Observable.prototype.ignoreValues = function () {
		  return ignoreValues(this);
		};
	
		Observable.prototype.ignoreErrors = function () {
		  return ignoreErrors(this);
		};
	
		Observable.prototype.ignoreEnd = function () {
		  return ignoreEnd(this);
		};
	
		Observable.prototype.beforeEnd = function (fn) {
		  return beforeEnd(this, fn);
		};
	
		Observable.prototype.slidingWindow = function (max, min) {
		  return slidingWindow(this, max, min);
		};
	
		Observable.prototype.bufferWhile = function (fn, options) {
		  return bufferWhile(this, fn, options);
		};
	
		Observable.prototype.bufferWithCount = function (count, options) {
		  return bufferWhile$1(this, count, options);
		};
	
		Observable.prototype.bufferWithTimeOrCount = function (wait, count, options) {
		  return bufferWithTimeOrCount(this, wait, count, options);
		};
	
		Observable.prototype.transduce = function (transducer) {
		  return transduce(this, transducer);
		};
	
		Observable.prototype.withHandler = function (fn) {
		  return withHandler(this, fn);
		};
	
		Observable.prototype.combine = function (other, combinator) {
		  return combine([this, other], combinator);
		};
	
		Observable.prototype.zip = function (other, combinator) {
		  return zip([this, other], combinator);
		};
	
		Observable.prototype.merge = function (other) {
		  return merge([this, other]);
		};
	
		Observable.prototype.concat = function (other) {
		  return concat$1([this, other]);
		};
	
		var pool = function () {
		  return new Pool();
		};
	
		Observable.prototype.flatMap = function (fn) {
		  return new FlatMap(this, fn).setName(this, 'flatMap');
		};
		Observable.prototype.flatMapLatest = function (fn) {
		  return new FlatMap(this, fn, { concurLim: 1, drop: 'old' }).setName(this, 'flatMapLatest');
		};
		Observable.prototype.flatMapFirst = function (fn) {
		  return new FlatMap(this, fn, { concurLim: 1 }).setName(this, 'flatMapFirst');
		};
		Observable.prototype.flatMapConcat = function (fn) {
		  return new FlatMap(this, fn, { queueLim: -1, concurLim: 1 }).setName(this, 'flatMapConcat');
		};
		Observable.prototype.flatMapConcurLimit = function (fn, limit) {
		  return new FlatMap(this, fn, { queueLim: -1, concurLim: limit }).setName(this, 'flatMapConcurLimit');
		};
	
		Observable.prototype.flatMapErrors = function (fn) {
		  return new FlatMapErrors(this, fn).setName(this, 'flatMapErrors');
		};
	
		Observable.prototype.filterBy = function (other) {
		  return filterBy(this, other);
		};
	
		Observable.prototype.sampledBy = function (other, combinator) {
		  return sampledBy(this, other, combinator);
		};
	
		Observable.prototype.skipUntilBy = function (other) {
		  return skipUntilBy(this, other);
		};
	
		Observable.prototype.takeUntilBy = function (other) {
		  return takeUntilBy(this, other);
		};
	
		Observable.prototype.bufferBy = function (other, options) {
		  return bufferBy(this, other, options);
		};
	
		Observable.prototype.bufferWhileBy = function (other, options) {
		  return bufferWhileBy(this, other, options);
		};
	
		// Deprecated
		// -----------------------------------------------------------------------------
	
		var DEPRECATION_WARNINGS = true;
		function dissableDeprecationWarnings() {
		  DEPRECATION_WARNINGS = false;
		}
	
		function warn(msg) {
		  if (DEPRECATION_WARNINGS && console && typeof console.warn === 'function') {
		    var msg2 = '\nHere is an Error object for you containing the call stack:';
		    console.warn(msg, msg2, new Error());
		  }
		}
	
		Observable.prototype.awaiting = function (other) {
		  warn('You are using deprecated .awaiting() method, see https://github.com/rpominov/kefir/issues/145');
		  return awaiting(this, other);
		};
	
		Observable.prototype.valuesToErrors = function (fn) {
		  warn('You are using deprecated .valuesToErrors() method, see https://github.com/rpominov/kefir/issues/149');
		  return valuesToErrors(this, fn);
		};
	
		Observable.prototype.errorsToValues = function (fn) {
		  warn('You are using deprecated .errorsToValues() method, see https://github.com/rpominov/kefir/issues/149');
		  return errorsToValues(this, fn);
		};
	
		Observable.prototype.endOnError = function () {
		  warn('You are using deprecated .endOnError() method, see https://github.com/rpominov/kefir/issues/150');
		  return endOnError(this);
		};
	
		// Exports
		// --------------------------------------------------------------------------
	
		var Kefir = { Observable: Observable, Stream: Stream, Property: Property, never: never, later: later, interval: interval, sequentially: sequentially,
		  fromPoll: fromPoll, withInterval: withInterval, fromCallback: fromCallback, fromNodeCallback: fromNodeCallback, fromEvents: fromEvents, stream: stream,
		  constant: constant, constantError: constantError, fromPromise: fromPromise, fromESObservable: fromESObservable, combine: combine, zip: zip, merge: merge,
		  concat: concat$1, Pool: Pool, pool: pool, repeat: repeat };
	
		Kefir.Kefir = Kefir;
	
		exports.dissableDeprecationWarnings = dissableDeprecationWarnings;
		exports.Kefir = Kefir;
		exports.Observable = Observable;
		exports.Stream = Stream;
		exports.Property = Property;
		exports.never = never;
		exports.later = later;
		exports.interval = interval;
		exports.sequentially = sequentially;
		exports.fromPoll = fromPoll;
		exports.withInterval = withInterval;
		exports.fromCallback = fromCallback;
		exports.fromNodeCallback = fromNodeCallback;
		exports.fromEvents = fromEvents;
		exports.stream = stream;
		exports.constant = constant;
		exports.constantError = constantError;
		exports.fromPromise = fromPromise;
		exports.fromESObservable = fromESObservable;
		exports.combine = combine;
		exports.zip = zip;
		exports.merge = merge;
		exports.concat = concat$1;
		exports.Pool = Pool;
		exports.pool = pool;
		exports.repeat = repeat;
		exports['default'] = Kefir;
	
	}));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _paper = __webpack_require__(79);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var vol_ctrl_width = 60;
	
	function _ref(value) {
		var _this = this;
	
		this.root.visible = true;
		clearTimeout(this.timout);
	
		var vol = value * 100 | 0;
		var bounds = new _paper2.default.Rectangle(this.size.x + this.path.mw, this.size.y + this.path.mh, this.size.w - this.path.mw * 2, (this.size.h - 20 - this.path.mh * 2) * (1 - value) | 0);
	
		if (bounds.height < 1) {
			bounds.height = 1;
		}
	
		this.path_white.setBounds(bounds);
		this.text.content = vol + "%";
		_paper2.default.view.draw();
	
		this.timout = setTimeout(function () {
			_this.root.visible = false;
			_paper2.default.view.draw();
		}, 500);
	}
	
	var VolumeCtrl = function () {
		function VolumeCtrl(volume) {
			(0, _classCallCheck3.default)(this, VolumeCtrl);
	
			this.size = {
				x: 20,
				y: 20,
				w: vol_ctrl_width,
				h: 3 * vol_ctrl_width
			};
			var size = this.size;
	
			this.path = {
				mw: 23, // margin width,x
				mh: 15 // margin height,y
			};
			var path = this.path;
	
			this.root = new _paper2.default.Group();
	
			var rect_out_box = new _paper2.default.Rectangle(size.x, size.y, size.w, size.h);
			var box = new _paper2.default.Shape.Rectangle(rect_out_box);
			box.fillColor = "black";
	
			this.root.addChild(box);
	
			var rect_blue_path = new _paper2.default.Rectangle(size.x + path.mw, size.y + path.mh, size.w - path.mw * 2, size.h - 20 - path.mh * 2);
			this.path_blue = new _paper2.default.Shape.Rectangle(rect_blue_path);
			this.path_blue.fillColor = "#000080";
	
			this.root.addChild(this.path_blue);
	
			var vol = volume * 100 | 0;
	
			var rect_white_path = new _paper2.default.Rectangle(size.x + path.mw, size.y + path.mh, size.w - path.mw * 2, (size.h - 20 - path.mh * 2) * (1 - volume) | 0);
			this.path_white = new _paper2.default.Shape.Rectangle(rect_white_path);
			this.path_white.fillColor = "white";
	
			this.root.addChild(this.path_white);
	
			this.text = new _paper2.default.PointText({
				point: new _paper2.default.Point(size.x + size.w / 2, size.w + (size.h - 25 - path.mh * 2)),
				content: vol + "%",
				fillColor: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: 13,
				justification: "center"
			});
	
			this.root.addChild(this.text);
	
			this.root.visible = false;
	
			window.vcg = this.root;
	
			var black_line = new _paper2.default.Shape.Rectangle(new _paper2.default.Rectangle(size.x + path.mw, size.y + path.mh, size.w - path.mw * 2, 1));
			black_line.fillColor = "black";
	
			this.root.addChild(black_line);
	
			_paper2.default.view.draw();
		}
	
		(0, _createClass3.default)(VolumeCtrl, [{
			key: "update",
			value: _ref
		}]);
		return VolumeCtrl;
	}();

	exports.default = VolumeCtrl;

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getIterator2 = __webpack_require__(248);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ramda = __webpack_require__(49);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var participants = ["Graphene", "Carbon", "Silver"];
	
	var dialogue = [{
		name: "begin",
		array: [// scene: begin
		{ // loc: 0
			who: "Графен",
			say: "Здравейте!"
		}, { // loc: 1
			who: "Карбон",
			say: "Кой си ти?"
		}, { // loc: 2
			who: "Графен",
			say: "О, извинете, забравих да се представя!\n Аз съм материал, създаден от един ред въглеродни атоми, и имам уникални свойства!"
		}, { // loc: 3
			who: "Карбон",
			say: "Виждам, че си сравнително нов тук!?\nИскаш ли да видим дали си и полезен??"
		}, { // loc: 4
			who: "Графен",
			answer: [{ say: "Уверен съм, че е така.", loc: 5 }, { say: "Не мисля, че е нужно.", loc: 7 }, { say: "Игнорирай го.", loc: 11 }]
		}, { // loc: 5
			who: "Карбон",
			say: "Мислиш, че си по-добър от мен ли?!?"
		}, { // loc: 6
			who: "Карбон",
			say: "Кое ще е първото нещо, с което искаш да се докажеш?",
			answer: [{ say: "Eлектропроводимост", scene: "phone" }, { say: "Здравината", scene: "asteroid" }, { say: "Енергийна плътност.", scene: "cars" }]
		}, { // loc: 7
			who: "Карбон",
			say: "Не си достатъчно уверен в себе си ли? Явно не си толкова добър?!"
		}, { // loc: 8
			who: "Графен",
			say: "Така ли мислиш? Имам много качества, с които те превъзхождам!"
		}, { // loc: 9
			who: "Карбон",
			say: "Нека видим тогава. Какво ще ни демонстрираш първо?"
		}, { // loc: 10
			who: "Графен",
			sat: "Ти си избери! Имам приложение:",
			answer: [{ say: "В медицината", scene: "blood" }, { say: "В архитектурата на космическо ниво", scene: "elevator" }, { say: "В енергетиката", scene: "cars" }]
		}, { // loc: 11
			who: "Карбон",
			say: "Защо ме игнорираш? За толкова по-висш от нас ли се смяташ?"
		}, { // loc: 12
			who: "Графен",
			answer: [{ say: "Играй с думи", loc: 13 }, { say: "Свободен диалог", loc: 16 }]
		}, { // loc: 13
			who: "Графен",
			say: "Имам много качества с които те превъзхождам!"
		}, { // loc: 14
			who: "Карбон",
			say: "Нека видим тогава. Какво ще демонстрираш първо?"
		}, { // loc: 15
			who: "Графен",
			say: "Приложението си в:",
			answer: [{ say: "Гъвкавост", scene: "blood" }, { say: "Здравина", scene: "elevator" }, { say: "Електропроводимост", scene: "cars" }]
		}, { // loc: 16
			who: "Карбон",
			say: "Явно не ти се говори, а?"
		}, { // loc: 17
			who: "Графен",
			say: "Напротив! Има много какво да видите и чуете от мен!\n Просто не исках да се хваля."
		}, { // loc: 18
			who: "Карбон",
			say: "Защо не покажеш тогава на какво си способен тогава?! "
		}, { // loc: 19
			who: "Графен",
			say: "Разбира се! Благодарение на моята здравина от 1100 GPa\nкосмическият асансьор е достижим!",
			scene: "elevator",
			tag: "free"
		}]
	}, {
		name: "blood_dialogue",
		array: [// scene: After blood
		{ // loc: 0
			who: "Графен",
			say: "И това не е всичко!"
		}, { // loc: 1
			who: "Графен",
			say: "С моята енергийна плътност от 75 F/g и 31-9 Wh/kg\n мога да захранвам устройство много по дълго от теб!",
			tag: "free",
			scene: "cars"
		}]
	}, {
		name: "asteroid_dialogue",
		array: [// scene: after meteor
		{ // loc: 0
			who: "Карбон",
			say: "Изкара късмет! И сам можех да се справя с това,\n само да имах малко повече време, за да стана по-голям.",
			tag: "earth"
		}, { // loc: 1
			who: "Графен",
			say: "Земята няма да чака, за да я спасиш!\n Това са просто свойства, които ти не притежаваш!",
			tags: [{ name: "free", loc: 9 }, { name: "End", loc: 10 }]
		}, { // loc: 2
			who: "Графен",
			say: "С моята невероятна здравина от 1100 GPa, успях да спра метеорита!"
		}, { // loc: 3
			who: "Карбон",
			say: "И все пак….само това ли е? Само защото ме превъзхождаш с тези две свойства\n не означава, че си толкова велик за колкото се мислиш!"
		}, { // loc: 4
			who: "Графен",
			say: "Оо, имам още много да ти покажа!",
			tags: [{ name: "cars", loc: 6 }, { name: "elevator", loc: 7 }, { name: "blood", loc: 8 }]
		}, { // loc: 5
			who: "Графен",
			say: "Може да се запознаете и с моите приложения:",
			answer: [{ say: "В медицината", scene: "blood" }, { say: "В архитектурата на космическо ниво", scene: "elevator" }, { say: "В енергетиката", scene: "cars" }]
		}, { // loc: 6
			who: "Графен",
			say: "Може да се запознаете и с моите приложения:",
			answer: [{ say: "В архитектурата на космическо ниво", scene: "elevator" }, { say: "В енергетиката", scene: "cars" }]
		}, { // loc: 7
			who: "Графен",
			say: "Може да се запознаете и с моите приложения:",
			answer: [{ say: "В медицината", scene: "blood" }, { say: "В енергетиката", scene: "cars" }]
		}, { // loc: 8
			who: "Графен",
			say: "Може да се запознаете и с моите приложения:",
			answer: [{ say: "В архитектурата на космическо ниво", scene: "elevator" }, { say: "В енергетиката", scene: "cars" }]
		}, { // loc: 9
			who: "Графен",
			say: "С моята енергийна плътност от 75 F/g и 31-9 Wh/kg\n мога да захранвам устройство много по дълго от теб!",
			tag: "blood",
			scene: "cars"
		}, { // loc: 10
			who: "Графен",
			say: "Да признавам те! Наистина си елемент - чудо!",
			scene: "End"
		}]
	}, {
		name: "junkction_dialogue",
		array: [// scene: after many(some) things [cars, elevator, blood]
		{ // loc: 0
			who: "Карбон",
			say: "Очевидно наистина те бива! Има ли още нещо, което можеш да ни покажеш?",
			tags: [{ name: "free", loc: 3 }, { name: "blood", loc: 1 }, { name: "cars", loc: 1 }, { name: "space", loc: 2 }]
		}, { // loc: 1
			who: "Графен",
			say: "Разбира се! Отново благодарение на моята здравина от 1100 GPa,\n космическият асансьор е достижим!",
			scene: "elevator"
	
		}, { // loc: 2
			who: "Графен",
			say: "Видяхте ли на какво съм способен?",
			scene: "blood"
		}]
	}, {
		name: "cars_dialogue",
		array: [// scene: cars
		{ // loc: 0
			who: "Карбон",
			tags: [{ name: "free", loc: 1 }, { name: "blood", loc: 2 }, { name: "noend", loc: 3 }]
		}, { // loc: 1
			who: "Графен",
			say: "Да признавам те! Наистина си елемент - чудо!",
			scene: "End"
		}, { // loc: 2
			who: "Графен",
			say: "Разбира се! Благодарение на моята невероятна здравина от 1100 GPa,\n  космическият асансьор е достижим!",
			scene: "elevator",
			tag: "End"
		}, { // loc: 3
			who: "Графен",
			say: "А виждaш ли този метеорит идващ към земята?",
			scene: "asteroid",
			tag: "End"
		}]
	}, {
		name: "phone",
		array: [//
		{ // loc: 0
			who: "Карбон",
			say: "С твоята електропроводимост от 178 siemens/m си много добър проводник."
		}, { // loc: 1
			who: "Графен",
			say: "Това не е единственото, с което те превъзхождам!"
		}, { // loc: 2
			who: "Карбон",
			say: "Нека видим тогава какво още можеш?",
			answer: [{ say: "Здравина", scene: "asteroid" }, { say: "Енергийна плътност", scene: "cars" }]
		}]
	}, {
		name: "elevator_dialogue",
		array: [//
		{ // loc: 0
			who: "Карбон",
			say: "Добра работа!"
		}, { // loc: 1
			who: "Графен",
			say: "Това не е единственото, с което те превъзхождам!"
		}, { // loc: 2
			who: "Графен",
			say: "А виждaш ли този метеорит идващ към земята?",
			tags: [{ name: "asteroid", loc: 4 }]
		}, { // loc: 3
			who: "Графен",
			say: "Искате ли да ви покажа какво е здравина?",
			scene: "asteroid"
		}, { // loc: 4
			who: "Графен",
			say: "Искате ли да ви покажа какво е здравина?",
			scene: "cars"
		}]
	}];
	
	window.d = dialogue;
	
	function _ref(name) {
		this.currentDialogue = _ramda2.default.find(_ramda2.default.propEq("name", name))(this.dialogue);
		this.currentPhrase = this.currentDialogue.array[0];
		this.loc = 0;
		if (this.currentPhrase.say == null) {
			this.next();
		}
	}
	
	function _ref2(loc) {
		// gives a specific phrase
		return this.currentDialogue.array[loc];
	}
	
	function _ref9(o) {
		return o.say;
	}
	
	function _ref3() {
		return this.currentPhrase.answer.map(_ref9);
	}
	
	function _ref4() {
		if (this.currentPhrase) {
			return this.currentPhrase.answer != null;
		}
		return false;
	}
	
	function _ref5() {
		// Gives the current Phrase
		return this.currentPhrase;
	}
	
	function _ref6() {
		return this.loc < this.currentDialogue.array.length() - 1;
	}
	
	function _ref7(phrase) {
		if (phrase.tag) {
			this.tags[phrase.tag] = 1;
			console.log("Tag added:", this.tags);
		}
	}
	
	function _ref8(choice) {
		if (this.currentPhrase.tag) {
			this.tags[this.currentPhrase.tag] = 1;
		}
	
		if (this.currentPhrase.answer) {
			if (arguments.length > 0) {
				if (choice <= this.currentPhrase.answer.length) {
					if (this.currentPhrase.answer[choice].scene) {
						return this.currentPhrase.answer[choice].scene;
					}
	
					if (this.currentPhrase.answer[choice].loc != null) {
						// checks if the answer has a location otherwise increment
						this.loc = this.currentPhrase.answer[choice].loc;
					} else {
						this.loc += 1;
					}
	
					this.currentPhrase = this.phrase(this.loc);
	
					return null;
				} else {
					throw "This answer does not exists";
				}
			} else {
				throw "This transition to the next phrase requires an argument";
			}
		} else if (this.currentPhrase.tags) {
			console.log("Tags:", this.tags);
	
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = (0, _getIterator3.default)(this.currentPhrase.tags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var tag = _step.value;
	
					console.log("Cur:", tag);
					if (this.tags[tag.name]) {
						if (this.tags[tag.name] == 1) {
							console.log("Chosen:", tag);
	
							this.loc = tag.loc;
							this.currentPhrase = this.phrase(tag.loc);
	
							return null;
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
	
			this.loc += 1;
			this.currentPhrase = this.phrase(this.loc);
			return null;
		} else if (this.currentPhrase.loc) {
			this.loc = this.currentPhrase.loc;
			this.currentPhrase = this.phrase(this.currentPhrase.loc);
	
			return null;
		} else if (this.currentPhrase.scene) {
			return this.currentPhrase.scene;
		} else {
			this.loc += 1;
			this.currentPhrase = this.phrase(this.loc);
			return null;
		}
	}
	
	var Dialogue = function () {
		function Dialogue(tags) {
			(0, _classCallCheck3.default)(this, Dialogue);
	
			this.tags = tags;
			this.dialogue = dialogue;
		}
	
		(0, _createClass3.default)(Dialogue, [{
			key: "select",
			value: _ref
		}, {
			key: "phrase",
			value: _ref2
		}, {
			key: "choices",
			value: _ref3
		}, {
			key: "hasChoices",
			value: _ref4
		}, {
			key: "say",
			value: _ref5
		}, {
			key: "hasNext",
			value: _ref6
		}, {
			key: "chekcTag",
			value: _ref7
		}, {
			key: "next",
			value: _ref8
		}]);
		return Dialogue;
	}();

	exports.default = Dialogue;

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _paper = __webpack_require__(79);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _ramda = __webpack_require__(49);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var font_size = 21;
	
	function _ref(callback) {
		this.callback = callback;
	}
	
	function _ref2() {
		this.callback = null;
	}
	
	function _ref3(choices) {
		var _this = this;
	
		this.remove();
	
		this.list = choices.map(function (choice, n) {
			var group = new _paper2.default.Group();
	
			var text = new _paper2.default.PointText({
				//	point: point,
				content: choice,
				fillColor: "#AEE1F9",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: _this.fontSize,
				justification: "left"
			});
			text.onClick = function () {
				return _this.callback(n);
			};
	
			var button = _this.button.clone();
			button.visible = true;
			button.setBounds(_this.calculateButtonSize(text.bounds));
	
			group.addChild(button);
			group.addChild(text);
	
			var rootButtonelement = button.children[0].children[0]; // illogical but the first two are groups
	
			group.onMouseEnter = function (e) {
				rootButtonelement.shadowBlur = 50;
				rootButtonelement.shadowColor = new _paper2.default.Color(255, 255, 255);
			};
	
			group.onMouseLeave = function (e) {
				rootButtonelement.shadowBlur = 0;
				rootButtonelement.shadowColor = new _paper2.default.Color(0, 0, 0);
			};
	
			_this.width += group.getBounds().width;
	
			return group;
		});
	}
	
	function _ref4(rect) {
		var res_rect = _ramda2.default.clone(rect);
		var margin = 10;
		res_rect.x -= margin / 2;
		res_rect.y -= margin / 2;
		res_rect.width += margin;
		res_rect.height += margin;
	
		return res_rect;
	}
	
	function _ref5(size) {
		//(re)calculate dialogue buttons
		var rem = size.width - this.width;
		var padding = rem / (this.list.length + 1);
		var cur = padding;
		for (var i = 0; i < this.list.length; i++) {
			var group = this.list[i];
			group.bounds.x = cur;
			group.bounds.y = size.height - 75;
	
			cur += group.bounds.width + padding;
		}
	}
	
	function _ref7(button) {
		return button.remove();
	}
	
	function _ref6() {
		this.list.forEach(_ref7);
		this.list = [];
		this.width = 0;
	}
	
	var DialogueButtons = function () {
		function DialogueButtons(fontSize, button) {
			(0, _classCallCheck3.default)(this, DialogueButtons);
	
			this.list = [];
			this.width = 0;
			this.fontSize = fontSize;
			this.button = button;
		}
	
		(0, _createClass3.default)(DialogueButtons, [{
			key: "onSelect",
			value: _ref
		}, {
			key: "off",
			value: _ref2
		}, {
			key: "create",
			value: _ref3
		}, {
			key: "calculateButtonSize",
			value: _ref4
		}, {
			key: "calculate",
			value: _ref5
		}, {
			key: "remove",
			value: _ref6
		}]);
		return DialogueButtons;
	}();
	
	function _ref8() {
		var _this3 = this;
	
		if (!this.story.hasChoices()) {
			if (this.paused == false) {
				window.timeout_next = setTimeout(function () {
					_this3.story.next();
				}, 5000);
			}
		}
	}
	
	function _ref9(line, choices) {
		var _this4 = this;
	
		if (choices == null) {
			this.DialogueButtons.remove();
	
			this.talkText.content = line.who + ": " + line.say;
	
			_paper2.default.view.onMouseDown = function (e) {
				// console.log(e.event.button == 0)
				if (e.event.button == 0) {
					_this4.story.next();
				}
			};
		} else {
			if (line != null && line.say != null) {
				this.talkText.content = line.who + ": " + line.say;
			}
	
			_paper2.default.view.onMouseDown = null; // disable clicking on the screen
	
			this.DialogueButtons.create(choices);
			this.DialogueButtons.calculate({ height: window.innerHeight, width: window.innerWidth });
		}
	
		this.play();
	}
	
	function _ref10() {
		var _this5 = this;
	
		this.Graphene.visible = true;
		this.Enemy.visible = true;
		this.talkText.visible = true;
		this.GrapheneText.visible = true;
		this.EnemyText.visible = true;
		if (this.paused == true) {
			this.Play.visible = true;
			this.Pause.visible = false;
		} else {
			this.Play.visible = false;
			this.Pause.visible = true;
		}
	
		_paper2.default.view.onMouseDown = function (e) {
			if (e.event.button == 0) {
				_this5.story.next();
			}
		};
	
		// this.Play.visible = false
		// this.Pause.visible = false
	}
	
	function _ref11() {
		// hide all the elements in the scene
		this.Graphene.visible = false;
		this.Enemy.visible = false;
		this.talkText.visible = false;
		this.GrapheneText.visible = false;
		this.EnemyText.visible = false;
		this.Play.visible = false;
		this.Pause.visible = false;
		_paper2.default.view.onMouseDown = null; // disable clicking on the screen
		if (this.DialogueButtons != null) {
			this.DialogueButtons.remove();
		}
	
		// this.Play.visible = true
		// this.Pause.visible = true
	}
	
	function _ref12() {
		this.DialogueButtons.off();
		_paper2.default.view.onMouseDown = null; // disable clicking on the screen
	}
	
	function _ref13(width, height, center) {
		this.talkText.point = new _paper2.default.Point(center.x, center.y * 2 - 130);
	
		this.GrapheneText.position.x = this.Graphene.position.x = width - 100;
	
		this.DialogueButtons.calculate({ height: height, width: width });
	
		this.Graphene.position.y = this.Enemy.position.y = center.y - 100;
	
		this.EnemyText.position.y = this.GrapheneText.position.y = center.y + 200;
	
		this.Play.position.x = this.Pause.position.x = 50;
		this.Play.position.y = this.Pause.position.y = height - 50;
	}
	
	var DialogueScene = function () {
		function DialogueScene(story) {
			var _this2 = this;
	
			(0, _classCallCheck3.default)(this, DialogueScene);
	
			this.story = story;
	
			this.Graphene = new _paper2.default.Raster("./img/Graphene.png");
			this.Graphene.scale(-1, 1);
	
			this.Enemy = new _paper2.default.Raster("./img/Carbon1.png");
			this.Enemy.scale(0.8, 0.8);
			this.Graphene.scale(0.8, 0.8);
	
			this.Enemy.position.x = 100;
	
			this.GrapheneText = new _paper2.default.PointText({
				point: _paper2.default.view.center,
				content: "Графен",
				fillColor: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: font_size,
				justification: "center"
			});
	
			this.EnemyText = new _paper2.default.PointText({
				point: _paper2.default.view.center,
				content: "Карбон",
				fillColor: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: font_size,
				justification: "center"
			});
	
			this.Graphene.importSVG("./img/button.svg", function (e) {
				_this2.hiddenSampleButton = e;
				_this2.hiddenSampleButton.visible = false;
				window.hsb = _this2.hiddenSampleButton;
				_this2.DialogueButtons = new DialogueButtons(font_size, _this2.hiddenSampleButton);
	
				_this2.DialogueButtons.onSelect(function (n) {
					_this2.story.next(n);
				});
			});
	
			this.talkText = new _paper2.default.PointText({
				point: _paper2.default.view.center,
				//	content: choices.who +": "+ choices.say,
				fillColor: "white",
				fontFamily: "Verdana",
				fontWeight: "bold",
				fontSize: font_size,
				justification: "center"
			});
	
			this.EnemyText.position.x = 100;
	
			var ppbs = 0.4;
	
			this.Play = new _paper2.default.Raster("./img/buttons/Play.png");
			this.Play.position = _paper2.default.view.center;
			this.Play.visible = false;
			this.Play.scale(ppbs, ppbs);
	
			this.Pause = new _paper2.default.Raster("./img/buttons/Paused.png");
			this.Pause.position = _paper2.default.view.center;
			this.Pause.visible = false;
			this.Pause.scale(ppbs, ppbs);
	
			this.Play.onClick = function () {
				_this2.Play.visible = false;
				_this2.Pause.visible = true;
				_this2.paused = false;
				_this2.play();
			};
	
			this.Pause.onClick = function () {
				_this2.Play.visible = true;
				_this2.Pause.visible = false;
				_this2.paused = true;
	
				clearTimeout(window.timeout_next);
			};
	
			this.paused = true;
		}
	
		(0, _createClass3.default)(DialogueScene, [{
			key: "play",
			value: _ref8
		}, {
			key: "dialogue",
			value: _ref9
		}, {
			key: "show",
			value: _ref10
		}, {
			key: "hide",
			value: _ref11
		}, {
			key: "destructor",
			value: _ref12
		}, {
			key: "position",
			value: _ref13
		}]);
		return DialogueScene;
	}();

	exports.default = DialogueScene;

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _ref(width, height, center) {}
	
	function _ref2() {}
	
	function _ref3() {}
	
	function _ref4(story) {}
	
	var EndScene = function () {
		function EndScene() {
			(0, _classCallCheck3.default)(this, EndScene);
		}
	
		(0, _createClass3.default)(EndScene, [{
			key: "position",
			value: _ref
		}, {
			key: "hide",
			value: _ref2
		}, {
			key: "show",
			value: _ref3
		}, {
			key: "destructor",
			value: _ref4
		}]);
		return EndScene;
	}();

	exports.default = EndScene;

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _paper = __webpack_require__(79);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _ref(width, height /*, center*/) {
		this.Skip.position.x = width - 80;
		this.Skip.position.y = height - 80;
	}
	
	function _ref2() {
		this.Skip.visible = false;
	}
	
	function _ref3() {
		this.Skip.visible = true;
	}
	
	function _ref4() {
		this.Skip.remove();
	
		this.Skip.onMouseEnter = null;
		this.Skip.onMouseLeave = null;
		this.Skip.onClick = null;
	}
	
	var VideoScene = function () {
		function VideoScene(story) {
			var _this = this;
	
			(0, _classCallCheck3.default)(this, VideoScene);
	
			this.Skip = new _paper2.default.Raster("./img/skip.png");
			this.Skip.scale(0.2, 0.2);
	
			this.hide();
	
			this.Skip.opacity = 0.3;
	
			this.Skip.onMouseEnter = function () {
				return _this.Skip.opacity = 0.8;
			};
			this.Skip.onMouseLeave = function () {
				return _this.Skip.opacity = 0.3;
			};
			this.Skip.onClick = function () {
				return story.next();
			};
		}
	
		(0, _createClass3.default)(VideoScene, [{
			key: "position",
			value: _ref
		}, {
			key: "hide",
			value: _ref2
		}, {
			key: "show",
			value: _ref3
		}, {
			key: "destructor",
			value: _ref4
		}]);
		return VideoScene;
	}();

	exports.default = VideoScene;

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(32);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(33);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ramda = __webpack_require__(49);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _dialogue = __webpack_require__(241);
	
	var _dialogue2 = _interopRequireDefault(_dialogue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var story = [{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "begin",
		"type": "Video"
	}, {
		"scene": "begin",
		"src": "vid/Background.mp4",
		"dialogue": "begin",
		"type": "Dialogue"
	}, {
		"scene": "asteroid",
		"src": "vid/Meteor.mp4",
		"next": "asteroid_dialogue",
		"type": "Video"
	}, {
		"scene": "asteroid_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "asteroid_dialogue",
		"type": "Dialogue"
	}, {
		"scene": "cars",
		"src": "vid/Cars.mp4",
		"next": "cars_dialogue",
		"type": "Video"
	}, {
		"scene": "cars_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "cars_dialogue",
		"type": "Dialogue"
	}, {
		"scene": "phone",
		"src": "vid/Phone.mp4",
		"next": "phone_dialogue",
		"type": "Video"
	}, {
		"scene": "phone_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "phone",
		"type": "Dialogue"
	}, {
		"scene": "blood",
		"src": "vid/Blood.mp4",
		"type": "Video",
		"next": "blood_dialogue"
	}, {
		"scene": "junktion_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "junkction_dialogue",
		"type": "Dialogue"
	}, {
		"scene": "blood_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "blood_dialogue",
		"type": "Dialogue"
	}, {
		"scene": "electrical_density_2",
		"src": "vid/Cars.mp4",
		"next": "end1",
		"type": "Video"
	}, {
		"scene": "conductivity_2",
		"src": "vid/Phone.mp4",
		"next": "end1",
		"type": "Video"
	}, {
		"scene": "electrical_density_good",
		"src": "vid/Cars.mp4",
		"next": "end2",
		"type": "Video"
	}, {
		"scene": "conductivity_good",
		"src": "vid/Phone.mp4",
		"next": "good_mid",
		"type": "Video"
	}, {
		"scene": "elevator",
		"src": "vid/Elevator.mp4",
		"type": "Video",
		"next": "elevator_dialogue"
	}, {
		"scene": "elevator_dialogue",
		"src": "vid/Background.mp4",
		"dialogue": "elevator_dialogue",
		"type": "Dialogue"
	}, {
		"src": "vid/Background.mp4",
		"dialogue": "ending_dialog_2",
		"scene": "end2",
		"type": "Dialogue"
	
	}, {
		"src": "vid/Background.mp4",
		"scene": "end_true",
		"next": "test",
		"type": "End"
	}, {
		"src": "vid/Background.mp4",
		"scene": "test",
		"type": "End"
	}];
	
	window.s = story;
	
	var cache = [];
	
	function createVideo(element) {
		var item = _ramda2.default.find(_ramda2.default.propEq("src", element.src))(cache);
		if (item != null) {
			element.video = item.video;
		} else {
			var vid = document.createElement("video");
			if (element.src == "vid/Background.mp4") {
				vid.loop = true;
			}
			vid.src = element.src;
			cache.push({ src: element.src, video: vid });
			element.video = vid;
		}
	}
	
	function _ref() {}
	
	function _ref2() {}
	
	function _ref3() {}
	
	function _ref4(type) {
		this.sceneUi = this.types[type];
		this.sceneUi.show();
	}
	
	function _ref5(width, height, center) {
		this.old = { width: width, height: height, center: center };
		this.sceneUi.position(width, height, center);
		this.update();
	}
	
	function _ref6() {
		//TODO: write to be more flexible
		return _ramda2.default.find(_ramda2.default.propEq("src", "vid/Background.mp4"))(cache);
	}
	
	function _ref7(name) {
		return _ramda2.default.find(_ramda2.default.propEq("scene", name))(this.story);
	}
	
	function _ref8(scene) {
		return this.scene(scene) != null;
	}
	
	function _ref16(o) {
		return o.show;
	}
	
	function _ref9() {
		if (this.current.dialogue != null) {
			if (this.dialogue.hasChoices()) {
				return this.dialogue.choices();
			} else {
				return this.dialogue.say();
			}
		}
		if (this.current.choice != null) {
			return this.current.choice.map(_ref16);
		} else {
			return [];
		}
	}
	
	function _ref10() {
		return this.current.choice != null || this.dialogue.hasChoices();
	}
	
	function _ref11() {
		return this.showDialogue;
	}
	
	function _ref12() {
		var _this = this;
	
		if (this.current.choice) {
			return this.current.choice.map(function (e) {
				return _this.scene(e.scene);
			});
		} else {
			return [this.scene(this.current.next)];
		}
	}
	
	function _ref13(callback) {
		this.onvideo = callback;
	}
	
	function _ref14(scene) {
		//Before the switch
		var oldVideo = this.current.video;
		console.log("Switching to:", scene);
		this.current = this.scene(scene); // switch the video with the next one
		if (this.current == null) {
			throw "This scene does not exists";
		}
	
		if (oldVideo != this.current.video) {
			this.onvideo(this.current.video);
		}
	
		this.sceneUi.hide();
		this.ui(this.current.type);
		this.tags[scene] = 1;
	
		if (this.current.dialogue != null) {
			this.dialogue.select(this.current.dialogue);
			this.showDialogue = true;
		} else {
			this.showDialogue = false;
		}
	
		//After the switch
	}
	
	function _ref15(choice) {
		if (this.current.dialogue != null) {
	
			var scene = this.dialogue.next(choice);
	
			if (scene != null) {
				this.switchTo(scene);
			}
		} else {
			this.switchTo(this.current.next);
		}
	
		if (this.showDialogue) {
			if (this.dialogue.hasChoices()) {
				this.sceneUi.dialogue(this.dialogue.say(), this.dialogue.choices());
			} else {
				this.sceneUi.dialogue(this.dialogue.say(), null);
			}
		}
	
		var _old = this.old;
		var width = _old.width;
		var height = _old.height;
		var center = _old.center;
	
		this.uiCalc(width, height, center);
	}
	
	var Story = function () {
		function Story(types, update) {
			(0, _classCallCheck3.default)(this, Story);
	
			this.update = update;
	
			this.story = story;
			this.showDialogue = false;
	
			this.tags = {};
	
			this.dialogue = new _dialogue2.default(this.tags);
			this.current = {
				"next": this.story[0].scene
			};
	
			this.story.forEach(createVideo);
			console.log("Loaded videos:", cache);
			this.types = {};
	
			for (var t in types) {
				this.types[t] = new types[t](this);
				this.types[t].hide();
			}
	
			this.sceneUi = {
				hide: _ref,
				show: _ref2,
				position: _ref3
			};
	
			this.old = {};
		}
	
		(0, _createClass3.default)(Story, [{
			key: "ui",
			value: _ref4
		}, {
			key: "uiCalc",
			value: _ref5
		}, {
			key: "defaultVideo",
			value: _ref6
		}, {
			key: "scene",
			value: _ref7
		}, {
			key: "exists",
			value: _ref8
		}, {
			key: "choices",
			value: _ref9
		}, {
			key: "hasChoices",
			value: _ref10
		}, {
			key: "hasDialogue",
			value: _ref11
		}, {
			key: "neededVideos",
			value: _ref12
		}, {
			key: "onVideo",
			value: _ref13
		}, {
			key: "switchTo",
			value: _ref14
		}, {
			key: "next",
			value: _ref15
		}]);
		return Story;
	}();

	exports.default = Story;

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(257), __esModule: true };

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(284);
	__webpack_require__(104);
	module.exports = __webpack_require__(275);

/***/ },

/***/ 263:
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },

/***/ 270:
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(64)
	  , get      = __webpack_require__(103);
	module.exports = __webpack_require__(23).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(263)
	  , step             = __webpack_require__(270)
	  , Iterators        = __webpack_require__(34)
	  , toIObject        = __webpack_require__(55);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(69)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(277);
	var Iterators = __webpack_require__(34);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Atom = exports.LensedAtom = exports.AbstractMutable = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _kefir = __webpack_require__(166);
	
	var Kefir = _interopRequireWildcard(_kefir);
	
	var _ramda = __webpack_require__(49);
	
	var R = _interopRequireWildcard(_ramda);
	
	var _partial = __webpack_require__(354);
	
	var L = _interopRequireWildcard(_partial);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//
	
	var AbstractMutable = exports.AbstractMutable = function (_Kefir$Property) {
	  _inherits(AbstractMutable, _Kefir$Property);
	
	  function AbstractMutable() {
	    _classCallCheck(this, AbstractMutable);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractMutable).apply(this, arguments));
	  }
	
	  _createClass(AbstractMutable, [{
	    key: "set",
	    value: function set(value) {
	      this.modify(function () {
	        return value;
	      });
	    }
	  }, {
	    key: "lens",
	    value: function lens() {
	      return new LensedAtom(this, L.default.apply(undefined, arguments));
	    }
	  }, {
	    key: "view",
	    value: function view() {
	      return new LensedAtom(this, L.default.apply(undefined, arguments));
	    }
	  }, {
	    key: "_maybeEmitValue",
	    value: function _maybeEmitValue(next) {
	      var prev = this._currentEvent;
	      if (!prev || !R.equals(prev.value, next)) this._emitValue(next);
	    }
	  }]);
	
	  return AbstractMutable;
	}(Kefir.Property);
	
	//
	
	var LensedAtom = exports.LensedAtom = function (_AbstractMutable) {
	  _inherits(LensedAtom, _AbstractMutable);
	
	  function LensedAtom(source, lens) {
	    _classCallCheck(this, LensedAtom);
	
	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LensedAtom).call(this));
	
	    _this2._source = source;
	    _this2._lens = lens;
	    _this2._$handleValue = null;
	    return _this2;
	  }
	
	  _createClass(LensedAtom, [{
	    key: "get",
	    value: function get() {
	      return L.get(this._lens, this._source.get());
	    }
	  }, {
	    key: "modify",
	    value: function modify(fn) {
	      this._source.modify(L.modify(this._lens, fn));
	    }
	  }, {
	    key: "_handleValue",
	    value: function _handleValue(context) {
	      this._maybeEmitValue(L.get(this._lens, context));
	    }
	  }, {
	    key: "_onActivation",
	    value: function _onActivation() {
	      var _this3 = this;
	
	      var handleValue = function handleValue(value) {
	        return _this3._handleValue(value);
	      };
	      this._$handleValue = handleValue;
	      this._source.onValue(handleValue);
	    }
	  }, {
	    key: "_onDeactivation",
	    value: function _onDeactivation() {
	      this._source.offValue(this._$handleValue);
	      this._$handleValue = null;
	      this._currentEvent = null;
	    }
	  }]);
	
	  return LensedAtom;
	}(AbstractMutable);
	
	//
	
	var Atom = exports.Atom = function (_AbstractMutable2) {
	  _inherits(Atom, _AbstractMutable2);
	
	  function Atom(value) {
	    _classCallCheck(this, Atom);
	
	    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Atom).call(this));
	
	    _this4._emitValue(value);
	    return _this4;
	  }
	
	  _createClass(Atom, [{
	    key: "get",
	    value: function get() {
	      return this._currentEvent.value;
	    }
	  }, {
	    key: "modify",
	    value: function modify(fn) {
	      this._maybeEmitValue(fn(this.get()));
	    }
	  }]);
	
	  return Atom;
	}(AbstractMutable);
	
	//
	
	exports.default = function (value) {
	  return new Atom(value);
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZWZpci5hdG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztJQUFZOztBQUNaOztJQUFZOztBQUNaOztJQUFlOzs7Ozs7Ozs7Ozs7SUFJRjs7Ozs7Ozs7Ozs7d0JBQ1AsT0FBTztBQUNULFdBQUssTUFBTCxDQUFZO2VBQU07T0FBTixDQUFaLENBRFM7Ozs7MkJBR0M7QUFDVixhQUFPLElBQUksVUFBSixDQUFlLElBQWYsRUFBcUIscUNBQXJCLENBQVAsQ0FEVTs7OzsyQkFHQTtBQUNWLGFBQU8sSUFBSSxVQUFKLENBQWUsSUFBZixFQUFxQixxQ0FBckIsQ0FBUCxDQURVOzs7O29DQUdJLE1BQU07QUFDcEIsVUFBTSxPQUFPLEtBQUssYUFBTCxDQURPO0FBRXBCLFVBQUksQ0FBQyxJQUFELElBQVMsQ0FBQyxFQUFFLE1BQUYsQ0FBUyxLQUFLLEtBQUwsRUFBWSxJQUFyQixDQUFELEVBQ1gsS0FBSyxVQUFMLENBQWdCLElBQWhCLEVBREY7Ozs7U0FaUztFQUF3QixNQUFNLFFBQU47Ozs7SUFtQnhCOzs7QUFDWCxXQURXLFVBQ1gsQ0FBWSxNQUFaLEVBQW9CLElBQXBCLEVBQTBCOzBCQURmLFlBQ2U7O3dFQURmLHdCQUNlOztBQUV4QixXQUFLLE9BQUwsR0FBZSxNQUFmLENBRndCO0FBR3hCLFdBQUssS0FBTCxHQUFhLElBQWIsQ0FId0I7QUFJeEIsV0FBSyxhQUFMLEdBQXFCLElBQXJCLENBSndCOztHQUExQjs7ZUFEVzs7MEJBT0w7QUFDSixhQUFPLEVBQUUsR0FBRixDQUFNLEtBQUssS0FBTCxFQUFZLEtBQUssT0FBTCxDQUFhLEdBQWIsRUFBbEIsQ0FBUCxDQURJOzs7OzJCQUdDLElBQUk7QUFDVCxXQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEVBQUUsTUFBRixDQUFTLEtBQUssS0FBTCxFQUFZLEVBQXJCLENBQXBCLEVBRFM7Ozs7aUNBR0UsU0FBUztBQUNwQixXQUFLLGVBQUwsQ0FBcUIsRUFBRSxHQUFGLENBQU0sS0FBSyxLQUFMLEVBQVksT0FBbEIsQ0FBckIsRUFEb0I7Ozs7b0NBR047OztBQUNkLFVBQU0sY0FBYyxTQUFkLFdBQWM7ZUFBUyxPQUFLLFlBQUwsQ0FBa0IsS0FBbEI7T0FBVCxDQUROO0FBRWQsV0FBSyxhQUFMLEdBQXFCLFdBQXJCLENBRmM7QUFHZCxXQUFLLE9BQUwsQ0FBYSxPQUFiLENBQXFCLFdBQXJCLEVBSGM7Ozs7c0NBS0U7QUFDaEIsV0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixLQUFLLGFBQUwsQ0FBdEIsQ0FEZ0I7QUFFaEIsV0FBSyxhQUFMLEdBQXFCLElBQXJCLENBRmdCO0FBR2hCLFdBQUssYUFBTCxHQUFxQixJQUFyQixDQUhnQjs7OztTQXJCUDtFQUFtQjs7OztJQThCbkI7OztBQUNYLFdBRFcsSUFDWCxDQUFZLEtBQVosRUFBbUI7MEJBRFIsTUFDUTs7d0VBRFIsa0JBQ1E7O0FBRWpCLFdBQUssVUFBTCxDQUFnQixLQUFoQixFQUZpQjs7R0FBbkI7O2VBRFc7OzBCQUtMO0FBQ0osYUFBTyxLQUFLLGFBQUwsQ0FBbUIsS0FBbkIsQ0FESDs7OzsyQkFHQyxJQUFJO0FBQ1QsV0FBSyxlQUFMLENBQXFCLEdBQUcsS0FBSyxHQUFMLEVBQUgsQ0FBckIsRUFEUzs7OztTQVJBO0VBQWE7Ozs7a0JBZVg7U0FBUyxJQUFJLElBQUosQ0FBUyxLQUFUO0NBQVQiLCJmaWxlIjoia2VmaXIuYXRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEtlZmlyIGZyb20gXCJrZWZpclwiXG5pbXBvcnQgKiBhcyBSICAgICBmcm9tIFwicmFtZGFcIlxuaW1wb3J0IFAsICogYXMgTCAgZnJvbSBcInBhcnRpYWwubGVuc2VzXCJcblxuLy9cblxuZXhwb3J0IGNsYXNzIEFic3RyYWN0TXV0YWJsZSBleHRlbmRzIEtlZmlyLlByb3BlcnR5IHtcbiAgc2V0KHZhbHVlKSB7XG4gICAgdGhpcy5tb2RpZnkoKCkgPT4gdmFsdWUpXG4gIH1cbiAgbGVucyguLi5scykge1xuICAgIHJldHVybiBuZXcgTGVuc2VkQXRvbSh0aGlzLCBQKC4uLmxzKSlcbiAgfVxuICB2aWV3KC4uLmxzKSB7XG4gICAgcmV0dXJuIG5ldyBMZW5zZWRBdG9tKHRoaXMsIFAoLi4ubHMpKVxuICB9XG4gIF9tYXliZUVtaXRWYWx1ZShuZXh0KSB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX2N1cnJlbnRFdmVudFxuICAgIGlmICghcHJldiB8fCAhUi5lcXVhbHMocHJldi52YWx1ZSwgbmV4dCkpXG4gICAgICB0aGlzLl9lbWl0VmFsdWUobmV4dClcbiAgfVxufVxuXG4vL1xuXG5leHBvcnQgY2xhc3MgTGVuc2VkQXRvbSBleHRlbmRzIEFic3RyYWN0TXV0YWJsZSB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbGVucykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2VcbiAgICB0aGlzLl9sZW5zID0gbGVuc1xuICAgIHRoaXMuXyRoYW5kbGVWYWx1ZSA9IG51bGxcbiAgfVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIEwuZ2V0KHRoaXMuX2xlbnMsIHRoaXMuX3NvdXJjZS5nZXQoKSlcbiAgfVxuICBtb2RpZnkoZm4pIHtcbiAgICB0aGlzLl9zb3VyY2UubW9kaWZ5KEwubW9kaWZ5KHRoaXMuX2xlbnMsIGZuKSlcbiAgfVxuICBfaGFuZGxlVmFsdWUoY29udGV4dCkge1xuICAgIHRoaXMuX21heWJlRW1pdFZhbHVlKEwuZ2V0KHRoaXMuX2xlbnMsIGNvbnRleHQpKVxuICB9XG4gIF9vbkFjdGl2YXRpb24oKSB7XG4gICAgY29uc3QgaGFuZGxlVmFsdWUgPSB2YWx1ZSA9PiB0aGlzLl9oYW5kbGVWYWx1ZSh2YWx1ZSlcbiAgICB0aGlzLl8kaGFuZGxlVmFsdWUgPSBoYW5kbGVWYWx1ZVxuICAgIHRoaXMuX3NvdXJjZS5vblZhbHVlKGhhbmRsZVZhbHVlKVxuICB9XG4gIF9vbkRlYWN0aXZhdGlvbigpIHtcbiAgICB0aGlzLl9zb3VyY2Uub2ZmVmFsdWUodGhpcy5fJGhhbmRsZVZhbHVlKVxuICAgIHRoaXMuXyRoYW5kbGVWYWx1ZSA9IG51bGxcbiAgICB0aGlzLl9jdXJyZW50RXZlbnQgPSBudWxsXG4gIH1cbn1cblxuLy9cblxuZXhwb3J0IGNsYXNzIEF0b20gZXh0ZW5kcyBBYnN0cmFjdE11dGFibGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbWl0VmFsdWUodmFsdWUpXG4gIH1cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RXZlbnQudmFsdWVcbiAgfVxuICBtb2RpZnkoZm4pIHtcbiAgICB0aGlzLl9tYXliZUVtaXRWYWx1ZShmbih0aGlzLmdldCgpKSlcbiAgfVxufVxuXG4vL1xuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZSA9PiBuZXcgQXRvbSh2YWx1ZSlcbiJdfQ==

/***/ },

/***/ 354:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = exports.log = exports.props = exports.identity = exports.pick = exports.augment = exports.filter = exports.append = exports.index = exports.findWith = exports.find = exports.prop = exports.normalize = exports.define = exports.required = exports.defaults = exports.replace = exports.choice = exports.orElse = exports.nothing = exports.choose = exports.just = exports.chain = exports.get = exports.set = exports.modify = exports.lens = exports.removeAll = exports.remove = exports.compose = exports.toRamda = exports.fromRamda = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _ramda = __webpack_require__(49);
	
	var R = _interopRequireWildcard(_ramda);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	//
	
	function Identity(value) {
	  this.value = value;
	}
	var Ident = function Ident(x) {
	  return new Identity(x);
	};
	Identity.prototype.map = function (x2y) {
	  return new Identity(x2y(this.value));
	};
	Identity.prototype.of = Ident;
	Identity.prototype.ap = function (x) {
	  return new Identity(this.value(x.value));
	};
	
	//
	
	function Constant(value) {
	  this.value = value;
	}
	var Const = function Const(x) {
	  return new Constant(x);
	};
	Constant.prototype.map = function () {
	  return this;
	};
	Constant.prototype.of = Const;
	
	//
	
	var warned = {};
	
	var warn = function warn(message) {
	  if (!(message in warned)) {
	    warned[message] = message;
	    console.warn("partial.lenses:", message);
	  }
	};
	
	//
	
	var id = function id(x) {
	  return x;
	};
	var snd = function snd(_, c) {
	  return c;
	};
	
	//
	
	var check = function check(expected, predicate) {
	  return function (x) {
	    if (predicate(x)) return x;else throw new Error("Expected " + expected + ", but got " + x + ".");
	  };
	};
	
	var assert = process.env.NODE_ENV === "production" ? function () {
	  return id;
	} : check;
	
	//
	
	var empty = {};
	
	var deleteKey = function deleteKey(k, o) {
	  if (o === undefined || !(k in o)) return o;
	  var r = void 0;
	  for (var p in o) {
	    if (p !== k) {
	      if (undefined === r) r = {};
	      r[p] = o[p];
	    }
	  }
	  return r;
	};
	
	var setKey = function setKey(k, v, o) {
	  if (o === undefined) return _defineProperty({}, k, v);
	  if (k in o && R.equals(v, o[k])) return o;
	  var r = _defineProperty({}, k, v);
	  for (var p in o) {
	    if (p !== k) r[p] = o[p];
	  }return r;
	};
	
	//
	
	var dropped = function dropped(xs) {
	  return Object.keys(xs).length === 0 ? undefined : xs;
	};
	
	//
	
	var toPartial = function toPartial(transform) {
	  return function (x) {
	    return undefined === x ? x : transform(x);
	  };
	};
	
	//
	
	var conserve = function conserve(c1, c0) {
	  return R.equals(c1, c0) ? c0 : c1;
	};
	
	var toConserve = function toConserve(f) {
	  return function (y, c0) {
	    return conserve(f(y, c0), c0);
	  };
	};
	
	//
	
	var seemsLens = function seemsLens(x) {
	  return typeof x === "function" && x.length === 1;
	};
	
	var fromRamda = exports.fromRamda = assert("a lens", seemsLens);
	
	var toRamda = exports.toRamda = function toRamda(l) {
	  if (isProp(l)) return toRamdaProp(l);
	  if (isIndex(l)) return toRamdaIndex(l);
	  return fromRamda(l);
	};
	
	var compose = exports.compose = function compose() {
	  for (var _len = arguments.length, ls = Array(_len), _key = 0; _key < _len; _key++) {
	    ls[_key] = arguments[_key];
	  }
	
	  return ls.length === 0 ? identity : ls.length === 1 ? ls[0] : R.compose.apply(R, _toConsumableArray(ls.map(toRamda)));
	};
	
	var remove = exports.remove = R.curry(function (l, s) {
	  return setI(toRamda(l), undefined, s);
	});
	
	var removeAll = exports.removeAll = R.curry(function (lens, data) {
	  warn("`removeAll` is deprecated and will be removed in next major version --- use a different approach.");
	  while (get(lens, data) !== undefined) {
	    data = remove(lens, data);
	  }return data;
	});
	
	var setI = function setI(l, x, s) {
	  return l(function () {
	    return Ident(x);
	  })(s).value;
	};
	var getI = function getI(l, s) {
	  return l(Const)(s).value;
	};
	var modifyI = function modifyI(l, x2x, s) {
	  return l(function (y) {
	    return Ident(x2x(y));
	  })(s).value;
	};
	var lensI = function lensI(getter, setter) {
	  return function (toFn) {
	    return function (target) {
	      return toFn(getter(target)).map(function (focus) {
	        return setter(focus, target);
	      });
	    };
	  };
	};
	
	var lens = exports.lens = R.curry(lensI);
	var modify = exports.modify = R.curry(function (l, x2x, s) {
	  return modifyI(toRamda(l), x2x, s);
	});
	var set = exports.set = R.curry(function (l, x, s) {
	  return setI(toRamda(l), x, s);
	});
	var get = exports.get = R.curry(function (l, s) {
	  return getI(toRamda(l), s);
	});
	
	var chain = exports.chain = R.curry(function (x2yL, xL) {
	  return compose(xL, choose(function (xO) {
	    return xO === undefined ? nothing : x2yL(xO);
	  }));
	});
	
	var just = exports.just = function just(x) {
	  return lensI(R.always(x), snd);
	};
	
	var choose = exports.choose = function choose(x2yL) {
	  return function (toFunctor) {
	    return function (target) {
	      var l = toRamda(x2yL(target));
	      return R.map(function (focus) {
	        return setI(l, focus, target);
	      }, toFunctor(getI(l, target)));
	    };
	  };
	};
	
	var nothing = exports.nothing = lensI(snd, snd);
	
	var orElse = exports.orElse = R.curry(function (d, l) {
	  return choose(function (x) {
	    return getI(toRamda(l), x) !== undefined ? l : d;
	  });
	});
	
	var choice = exports.choice = function choice() {
	  for (var _len2 = arguments.length, ls = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    ls[_key2] = arguments[_key2];
	  }
	
	  return choose(function (x) {
	    var i = ls.findIndex(function (l) {
	      return getI(toRamda(l), x) !== undefined;
	    });
	    return 0 <= i ? ls[i] : nothing;
	  });
	};
	
	var replace = exports.replace = R.curry(function (inn, out) {
	  return lensI(function (x) {
	    return R.equals(x, inn) ? out : x;
	  }, toConserve(function (y) {
	    return R.equals(y, out) ? inn : y;
	  }));
	});
	
	var defaults = exports.defaults = replace(undefined);
	var required = exports.required = function required(inn) {
	  return replace(inn, undefined);
	};
	var define = exports.define = function define(v) {
	  return R.compose(required(v), defaults(v));
	};
	
	var normalize = exports.normalize = function normalize(transform) {
	  return lensI(toPartial(transform), toConserve(toPartial(transform)));
	};
	
	var isProp = function isProp(x) {
	  return typeof x === "string";
	};
	
	var prop = exports.prop = assert("a string", isProp);
	
	var toRamdaProp = function toRamdaProp(k) {
	  return lensI(function (o) {
	    return o && o[k];
	  }, function (v, o) {
	    return v === undefined ? deleteKey(k, o) : setKey(k, v, o);
	  });
	};
	
	var find = exports.find = function find(predicate) {
	  return choose(function (xs) {
	    if (xs === undefined) return append;
	    var i = xs.findIndex(predicate);
	    return i < 0 ? append : i;
	  });
	};
	
	var findWith = exports.findWith = function findWith() {
	  var lls = toRamda(compose.apply(undefined, arguments));
	  return compose(find(function (x) {
	    return getI(lls, x) !== undefined;
	  }), lls);
	};
	
	var isIndex = function isIndex(x) {
	  return Number.isInteger(x) && 0 <= x;
	};
	
	var index = exports.index = assert("a non-negative integer", isIndex);
	
	var toRamdaIndex = function toRamdaIndex(i) {
	  return lensI(function (xs) {
	    return xs && xs[i];
	  }, function (x, xs) {
	    if (x === undefined) {
	      if (xs === undefined) return undefined;
	      if (i < xs.length) return dropped(xs.slice(0, i).concat(xs.slice(i + 1)));
	      return xs;
	    } else {
	      if (xs === undefined) return Array(i).concat([x]);
	      if (xs.length <= i) return xs.concat(Array(i - xs.length), [x]);
	      if (R.equals(x, xs[i])) return xs;
	      return xs.slice(0, i).concat([x], xs.slice(i + 1));
	    }
	  });
	};
	
	var append = exports.append = lensI(snd, function (x, xs) {
	  return x === undefined ? xs : xs === undefined ? [x] : xs.concat([x]);
	});
	
	var filter = exports.filter = function filter(p) {
	  return lensI(function (xs) {
	    return xs && xs.filter(p);
	  }, function (ys, xs) {
	    return conserve(dropped(R.concat(ys || [], (xs || []).filter(R.complement(p)))), xs);
	  });
	};
	
	var augment = exports.augment = function augment(template) {
	  return lensI(toPartial(function (x) {
	    var z = _extends({}, x);
	    for (var k in template) {
	      z[k] = template[k](x);
	    }return z;
	  }), toConserve(function (y, c) {
	    if (y === undefined) return undefined;
	    var z = void 0;
	    var set = function set(k, v) {
	      if (undefined === z) z = {};
	      z[k] = v;
	    };
	    for (var k in y) {
	      if (!(k in template)) set(k, y[k]);else if (k in c) set(k, c[k]);
	    }
	    return z;
	  }));
	};
	
	var pick = exports.pick = function pick(template) {
	  return lensI(function (c) {
	    var r = void 0;
	    for (var k in template) {
	      var v = getI(toRamda(template[k]), c);
	      if (v !== undefined) {
	        if (r === undefined) r = {};
	        r[k] = v;
	      }
	    }
	    return r;
	  }, function () {
	    var o = arguments.length <= 0 || arguments[0] === undefined ? empty : arguments[0];
	    var cIn = arguments[1];
	
	    var c = cIn;
	    for (var k in template) {
	      c = setI(toRamda(template[k]), o[k], c);
	    }return c;
	  });
	};
	
	var identity = exports.identity = lensI(id, conserve);
	
	var props = exports.props = function props() {
	  for (var _len3 = arguments.length, ks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    ks[_key3] = arguments[_key3];
	  }
	
	  return pick(R.zipObj(ks, ks));
	};
	
	var show = function show() {
	  for (var _len4 = arguments.length, labels = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    labels[_key4] = arguments[_key4];
	  }
	
	  return function (x) {
	    var _console;
	
	    return (_console = console).log.apply(_console, labels.concat([x])) || x;
	  };
	};
	
	var log = exports.log = function log() {
	  for (var _len5 = arguments.length, labels = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    labels[_key5] = arguments[_key5];
	  }
	
	  return lensI(show.apply(undefined, labels.concat(["get"])), show.apply(undefined, labels.concat(["set"])));
	};
	
	var sequence = exports.sequence = function sequence(toApplicative) {
	  return function (target) {
	    return warn("`sequence` is experimental and might be removed, renamed or changed semantically before next major release") || R.sequence(Ident, R.map(toApplicative, target)).map(R.pipe(R.filter(function (x) {
	      return x !== undefined;
	    }), dropped));
	  };
	};
	
	exports.default = compose;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJ0aWFsLmxlbnNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7SUFBWTs7Ozs7Ozs7OztBQUlaLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUFDLE9BQUssS0FBTCxHQUFhLEtBQWIsQ0FBRDtDQUF6QjtBQUNBLElBQU0sUUFBUSxTQUFSLEtBQVE7U0FBSyxJQUFJLFFBQUosQ0FBYSxDQUFiO0NBQUw7QUFDZCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsR0FBeUIsVUFBVSxHQUFWLEVBQWU7QUFBQyxTQUFPLElBQUksUUFBSixDQUFhLElBQUksS0FBSyxLQUFMLENBQWpCLENBQVAsQ0FBRDtDQUFmO0FBQ3pCLFNBQVMsU0FBVCxDQUFtQixFQUFuQixHQUF3QixLQUF4QjtBQUNBLFNBQVMsU0FBVCxDQUFtQixFQUFuQixHQUF3QixVQUFVLENBQVYsRUFBYTtBQUFDLFNBQU8sSUFBSSxRQUFKLENBQWEsS0FBSyxLQUFMLENBQVcsRUFBRSxLQUFGLENBQXhCLENBQVAsQ0FBRDtDQUFiOzs7O0FBSXhCLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUFDLE9BQUssS0FBTCxHQUFhLEtBQWIsQ0FBRDtDQUF6QjtBQUNBLElBQU0sUUFBUSxTQUFSLEtBQVE7U0FBSyxJQUFJLFFBQUosQ0FBYSxDQUFiO0NBQUw7QUFDZCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsR0FBeUIsWUFBWTtBQUFDLFNBQU8sSUFBUCxDQUFEO0NBQVo7QUFDekIsU0FBUyxTQUFULENBQW1CLEVBQW5CLEdBQXdCLEtBQXhCOzs7O0FBSUEsSUFBTSxTQUFTLEVBQVQ7O0FBRU4sSUFBTSxPQUFPLFNBQVAsSUFBTyxVQUFXO0FBQ3RCLE1BQUksRUFBRSxXQUFXLE1BQVgsQ0FBRixFQUFzQjtBQUN4QixXQUFPLE9BQVAsSUFBa0IsT0FBbEIsQ0FEd0I7QUFFeEIsWUFBUSxJQUFSLENBQWEsaUJBQWIsRUFBZ0MsT0FBaEMsRUFGd0I7R0FBMUI7Q0FEVzs7OztBQVNiLElBQU0sS0FBSyxTQUFMLEVBQUs7U0FBSztDQUFMO0FBQ1gsSUFBTSxNQUFNLFNBQU4sR0FBTSxDQUFDLENBQUQsRUFBSSxDQUFKO1NBQVU7Q0FBVjs7OztBQUlaLElBQU0sUUFBUSxTQUFSLEtBQVEsQ0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixhQUFLO0FBQzFDLFFBQUksVUFBVSxDQUFWLENBQUosRUFDRSxPQUFPLENBQVAsQ0FERixLQUdFLE1BQU0sSUFBSSxLQUFKLGVBQXNCLDBCQUFxQixPQUEzQyxDQUFOLENBSEY7R0FEcUM7Q0FBekI7O0FBT2QsSUFBTSxTQUFTLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBekIsR0FBd0M7U0FBTTtDQUFOLEdBQVcsS0FBbkQ7Ozs7QUFJZixJQUFNLFFBQVEsRUFBUjs7QUFFTixJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUMxQixNQUFJLE1BQU0sU0FBTixJQUFtQixFQUFFLEtBQUssQ0FBTCxDQUFGLEVBQ3JCLE9BQU8sQ0FBUCxDQURGO0FBRUEsTUFBSSxVQUFKLENBSDBCO0FBSTFCLE9BQUssSUFBTSxDQUFOLElBQVcsQ0FBaEIsRUFBbUI7QUFDakIsUUFBSSxNQUFNLENBQU4sRUFBUztBQUNYLFVBQUksY0FBYyxDQUFkLEVBQ0YsSUFBSSxFQUFKLENBREY7QUFFQSxRQUFFLENBQUYsSUFBTyxFQUFFLENBQUYsQ0FBUCxDQUhXO0tBQWI7R0FERjtBQU9BLFNBQU8sQ0FBUCxDQVgwQjtDQUFWOztBQWNsQixJQUFNLFNBQVMsU0FBVCxNQUFTLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQWE7QUFDMUIsTUFBSSxNQUFNLFNBQU4sRUFDRiwyQkFBUyxHQUFJLEVBQWIsQ0FERjtBQUVBLE1BQUksS0FBSyxDQUFMLElBQVUsRUFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLEVBQUUsQ0FBRixDQUFaLENBQVYsRUFDRixPQUFPLENBQVAsQ0FERjtBQUVBLE1BQU0sd0JBQU0sR0FBSSxFQUFWLENBTG9CO0FBTTFCLE9BQUssSUFBTSxDQUFOLElBQVcsQ0FBaEI7QUFDRSxRQUFJLE1BQU0sQ0FBTixFQUNGLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFQLENBREY7R0FERixPQUdPLENBQVAsQ0FUMEI7Q0FBYjs7OztBQWNmLElBQU0sVUFBVSxTQUFWLE9BQVU7U0FBTSxPQUFPLElBQVAsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLEtBQTJCLENBQTNCLEdBQStCLFNBQS9CLEdBQTJDLEVBQTNDO0NBQU47Ozs7QUFJaEIsSUFBTSxZQUFZLFNBQVosU0FBWTtTQUFhO1dBQUssY0FBYyxDQUFkLEdBQWtCLENBQWxCLEdBQXNCLFVBQVUsQ0FBVixDQUF0QjtHQUFMO0NBQWI7Ozs7QUFJbEIsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLEVBQUQsRUFBSyxFQUFMO1NBQVksRUFBRSxNQUFGLENBQVMsRUFBVCxFQUFhLEVBQWIsSUFBbUIsRUFBbkIsR0FBd0IsRUFBeEI7Q0FBWjs7QUFFakIsSUFBTSxhQUFhLFNBQWIsVUFBYTtTQUFLLFVBQUMsQ0FBRCxFQUFJLEVBQUo7V0FBVyxTQUFTLEVBQUUsQ0FBRixFQUFLLEVBQUwsQ0FBVCxFQUFtQixFQUFuQjtHQUFYO0NBQUw7Ozs7QUFJbkIsSUFBTSxZQUFZLFNBQVosU0FBWTtTQUFLLE9BQU8sQ0FBUCxLQUFhLFVBQWIsSUFBMkIsRUFBRSxNQUFGLEtBQWEsQ0FBYjtDQUFoQzs7QUFFWCxJQUFNLGdDQUFZLE9BQU8sUUFBUCxFQUFpQixTQUFqQixDQUFaOztBQUVOLElBQU0sNEJBQVUsU0FBVixPQUFVLElBQUs7QUFDMUIsTUFBSSxPQUFPLENBQVAsQ0FBSixFQUFnQixPQUFPLFlBQVksQ0FBWixDQUFQLENBQWhCO0FBQ0EsTUFBSSxRQUFRLENBQVIsQ0FBSixFQUFnQixPQUFPLGFBQWEsQ0FBYixDQUFQLENBQWhCO0FBQ0EsU0FBTyxVQUFVLENBQVYsQ0FBUCxDQUgwQjtDQUFMOztBQU1oQixJQUFNLDRCQUFVLFNBQVYsT0FBVTtvQ0FBSTs7OztTQUN6QixHQUFHLE1BQUgsS0FBYyxDQUFkLEdBQWtCLFFBQWxCLEdBQ0EsR0FBRyxNQUFILEtBQWMsQ0FBZCxHQUFrQixHQUFHLENBQUgsQ0FBbEIsR0FDQSxFQUFFLE9BQUYsNkJBQWEsR0FBRyxHQUFILENBQU8sT0FBUCxFQUFiLENBREE7Q0FGcUI7O0FBS2hCLElBQU0sMEJBQVMsRUFBRSxLQUFGLENBQVEsVUFBQyxDQUFELEVBQUksQ0FBSjtTQUFVLEtBQUssUUFBUSxDQUFSLENBQUwsRUFBaUIsU0FBakIsRUFBNEIsQ0FBNUI7Q0FBVixDQUFqQjs7QUFFTixJQUFNLGdDQUFZLEVBQUUsS0FBRixDQUFRLFVBQUMsSUFBRCxFQUFPLElBQVAsRUFBZ0I7QUFDL0MsT0FBSyxtR0FBTCxFQUQrQztBQUUvQyxTQUFPLElBQUksSUFBSixFQUFVLElBQVYsTUFBb0IsU0FBcEI7QUFDTCxXQUFPLE9BQU8sSUFBUCxFQUFhLElBQWIsQ0FBUDtHQURGLE9BRU8sSUFBUCxDQUorQztDQUFoQixDQUFwQjs7QUFPYixJQUFNLE9BQU8sU0FBUCxJQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO1NBQWEsRUFBRTtXQUFNLE1BQU0sQ0FBTjtHQUFOLENBQUYsQ0FBa0IsQ0FBbEIsRUFBcUIsS0FBckI7Q0FBYjtBQUNiLElBQU0sT0FBTyxTQUFQLElBQU8sQ0FBQyxDQUFELEVBQUksQ0FBSjtTQUFVLEVBQUUsS0FBRixFQUFTLENBQVQsRUFBWSxLQUFaO0NBQVY7QUFDYixJQUFNLFVBQVUsU0FBVixPQUFVLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxDQUFUO1NBQWUsRUFBRTtXQUFLLE1BQU0sSUFBSSxDQUFKLENBQU47R0FBTCxDQUFGLENBQXNCLENBQXRCLEVBQXlCLEtBQXpCO0NBQWY7QUFDaEIsSUFBTSxRQUFRLFNBQVIsS0FBUSxDQUFDLE1BQUQsRUFBUyxNQUFUO1NBQW9CO1dBQVE7YUFDeEMsS0FBSyxPQUFPLE1BQVAsQ0FBTCxFQUFxQixHQUFyQixDQUF5QjtlQUFTLE9BQU8sS0FBUCxFQUFjLE1BQWQ7T0FBVDtLQURlO0dBQVI7Q0FBcEI7O0FBR1AsSUFBTSxzQkFBTyxFQUFFLEtBQUYsQ0FBUSxLQUFSLENBQVA7QUFDTixJQUFNLDBCQUFTLEVBQUUsS0FBRixDQUFRLFVBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxDQUFUO1NBQWUsUUFBUSxRQUFRLENBQVIsQ0FBUixFQUFvQixHQUFwQixFQUF5QixDQUF6QjtDQUFmLENBQWpCO0FBQ04sSUFBTSxvQkFBTSxFQUFFLEtBQUYsQ0FBUSxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUDtTQUFhLEtBQUssUUFBUSxDQUFSLENBQUwsRUFBaUIsQ0FBakIsRUFBb0IsQ0FBcEI7Q0FBYixDQUFkO0FBQ04sSUFBTSxvQkFBTSxFQUFFLEtBQUYsQ0FBUSxVQUFDLENBQUQsRUFBSSxDQUFKO1NBQVUsS0FBSyxRQUFRLENBQVIsQ0FBTCxFQUFpQixDQUFqQjtDQUFWLENBQWQ7O0FBRU4sSUFBTSx3QkFBUSxFQUFFLEtBQUYsQ0FBUSxVQUFDLElBQUQsRUFBTyxFQUFQO1NBQzNCLFFBQVEsRUFBUixFQUFZLE9BQU87V0FBTSxPQUFPLFNBQVAsR0FBbUIsT0FBbkIsR0FBNkIsS0FBSyxFQUFMLENBQTdCO0dBQU4sQ0FBbkI7Q0FEMkIsQ0FBaEI7O0FBR04sSUFBTSxzQkFBTyxTQUFQLElBQU87U0FBSyxNQUFNLEVBQUUsTUFBRixDQUFTLENBQVQsQ0FBTixFQUFtQixHQUFuQjtDQUFMOztBQUViLElBQU0sMEJBQVMsU0FBVCxNQUFTO1NBQVE7V0FBYSxrQkFBVTtBQUNuRCxVQUFNLElBQUksUUFBUSxLQUFLLE1BQUwsQ0FBUixDQUFKLENBRDZDO0FBRW5ELGFBQU8sRUFBRSxHQUFGLENBQU07ZUFBUyxLQUFLLENBQUwsRUFBUSxLQUFSLEVBQWUsTUFBZjtPQUFULEVBQWlDLFVBQVUsS0FBSyxDQUFMLEVBQVEsTUFBUixDQUFWLENBQXZDLENBQVAsQ0FGbUQ7S0FBVjtHQUFiO0NBQVI7O0FBS2YsSUFBTSw0QkFBVSxNQUFNLEdBQU4sRUFBVyxHQUFYLENBQVY7O0FBRU4sSUFBTSwwQkFDWCxFQUFFLEtBQUYsQ0FBUSxVQUFDLENBQUQsRUFBSSxDQUFKO1NBQVUsT0FBTztXQUFLLEtBQUssUUFBUSxDQUFSLENBQUwsRUFBaUIsQ0FBakIsTUFBd0IsU0FBeEIsR0FBb0MsQ0FBcEMsR0FBd0MsQ0FBeEM7R0FBTDtDQUFqQixDQURHOztBQUdOLElBQU0sMEJBQVMsU0FBVCxNQUFTO3FDQUFJOzs7O1NBQU8sT0FBTyxhQUFLO0FBQzNDLFFBQU0sSUFBSSxHQUFHLFNBQUgsQ0FBYTthQUFLLEtBQUssUUFBUSxDQUFSLENBQUwsRUFBaUIsQ0FBakIsTUFBd0IsU0FBeEI7S0FBTCxDQUFqQixDQURxQztBQUUzQyxXQUFPLEtBQUssQ0FBTCxHQUFTLEdBQUcsQ0FBSCxDQUFULEdBQWlCLE9BQWpCLENBRm9DO0dBQUw7Q0FBbEI7O0FBS2YsSUFBTSw0QkFBVSxFQUFFLEtBQUYsQ0FBUSxVQUFDLEdBQUQsRUFBTSxHQUFOO1NBQzdCLE1BQU07V0FBSyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVksR0FBWixJQUFtQixHQUFuQixHQUF5QixDQUF6QjtHQUFMLEVBQ0EsV0FBVztXQUFLLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFaLElBQW1CLEdBQW5CLEdBQXlCLENBQXpCO0dBQUwsQ0FEakI7Q0FENkIsQ0FBbEI7O0FBSU4sSUFBTSw4QkFBVyxRQUFRLFNBQVIsQ0FBWDtBQUNOLElBQU0sOEJBQVcsU0FBWCxRQUFXO1NBQU8sUUFBUSxHQUFSLEVBQWEsU0FBYjtDQUFQO0FBQ2pCLElBQU0sMEJBQVMsU0FBVCxNQUFTO1NBQUssRUFBRSxPQUFGLENBQVUsU0FBUyxDQUFULENBQVYsRUFBdUIsU0FBUyxDQUFULENBQXZCO0NBQUw7O0FBRWYsSUFBTSxnQ0FBWSxTQUFaLFNBQVk7U0FDdkIsTUFBTSxVQUFVLFNBQVYsQ0FBTixFQUE0QixXQUFXLFVBQVUsU0FBVixDQUFYLENBQTVCO0NBRHVCOztBQUd6QixJQUFNLFNBQVMsU0FBVCxNQUFTO1NBQUssT0FBTyxDQUFQLEtBQWEsUUFBYjtDQUFMOztBQUVSLElBQU0sc0JBQU8sT0FBTyxVQUFQLEVBQW1CLE1BQW5CLENBQVA7O0FBRWIsSUFBTSxjQUFjLFNBQWQsV0FBYztTQUNsQixNQUFNO1dBQUssS0FBSyxFQUFFLENBQUYsQ0FBTDtHQUFMLEVBQ0EsVUFBQyxDQUFELEVBQUksQ0FBSjtXQUFVLE1BQU0sU0FBTixHQUFrQixVQUFVLENBQVYsRUFBYSxDQUFiLENBQWxCLEdBQW9DLE9BQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBQXBDO0dBQVY7Q0FGWTs7QUFJYixJQUFNLHNCQUFPLFNBQVAsSUFBTztTQUFhLE9BQU8sY0FBTTtBQUM1QyxRQUFJLE9BQU8sU0FBUCxFQUNGLE9BQU8sTUFBUCxDQURGO0FBRUEsUUFBTSxJQUFJLEdBQUcsU0FBSCxDQUFhLFNBQWIsQ0FBSixDQUhzQztBQUk1QyxXQUFPLElBQUksQ0FBSixHQUFRLE1BQVIsR0FBaUIsQ0FBakIsQ0FKcUM7R0FBTjtDQUFwQjs7QUFPYixJQUFNLDhCQUFXLFNBQVgsUUFBVyxHQUFXO0FBQ2pDLE1BQU0sTUFBTSxRQUFRLG1DQUFSLENBQU4sQ0FEMkI7QUFFakMsU0FBTyxRQUFRLEtBQUs7V0FBSyxLQUFLLEdBQUwsRUFBVSxDQUFWLE1BQWlCLFNBQWpCO0dBQUwsQ0FBYixFQUErQyxHQUEvQyxDQUFQLENBRmlDO0NBQVg7O0FBS3hCLElBQU0sVUFBVSxTQUFWLE9BQVU7U0FBSyxPQUFPLFNBQVAsQ0FBaUIsQ0FBakIsS0FBdUIsS0FBSyxDQUFMO0NBQTVCOztBQUVULElBQU0sd0JBQVEsT0FBTyx3QkFBUCxFQUFpQyxPQUFqQyxDQUFSOztBQUViLElBQU0sZUFBZSxTQUFmLFlBQWU7U0FBSyxNQUFNO1dBQU0sTUFBTSxHQUFHLENBQUgsQ0FBTjtHQUFOLEVBQW1CLFVBQUMsQ0FBRCxFQUFJLEVBQUosRUFBVztBQUM1RCxRQUFJLE1BQU0sU0FBTixFQUFpQjtBQUNuQixVQUFJLE9BQU8sU0FBUCxFQUNGLE9BQU8sU0FBUCxDQURGO0FBRUEsVUFBSSxJQUFJLEdBQUcsTUFBSCxFQUNOLE9BQU8sUUFBUSxHQUFHLEtBQUgsQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLE1BQWYsQ0FBc0IsR0FBRyxLQUFILENBQVMsSUFBRSxDQUFGLENBQS9CLENBQVIsQ0FBUCxDQURGO0FBRUEsYUFBTyxFQUFQLENBTG1CO0tBQXJCLE1BTU87QUFDTCxVQUFJLE9BQU8sU0FBUCxFQUNGLE9BQU8sTUFBTSxDQUFOLEVBQVMsTUFBVCxDQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBUCxDQURGO0FBRUEsVUFBSSxHQUFHLE1BQUgsSUFBYSxDQUFiLEVBQ0YsT0FBTyxHQUFHLE1BQUgsQ0FBVSxNQUFNLElBQUksR0FBRyxNQUFILENBQXBCLEVBQWdDLENBQUMsQ0FBRCxDQUFoQyxDQUFQLENBREY7QUFFQSxVQUFJLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFHLENBQUgsQ0FBWixDQUFKLEVBQ0UsT0FBTyxFQUFQLENBREY7QUFFQSxhQUFPLEdBQUcsS0FBSCxDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsTUFBZixDQUFzQixDQUFDLENBQUQsQ0FBdEIsRUFBMkIsR0FBRyxLQUFILENBQVMsSUFBRSxDQUFGLENBQXBDLENBQVAsQ0FQSztLQU5QO0dBRGlEO0NBQTlCOztBQWtCZCxJQUFNLDBCQUFTLE1BQU0sR0FBTixFQUFXLFVBQUMsQ0FBRCxFQUFJLEVBQUo7U0FDL0IsTUFBTSxTQUFOLEdBQWtCLEVBQWxCLEdBQXVCLE9BQU8sU0FBUCxHQUFtQixDQUFDLENBQUQsQ0FBbkIsR0FBeUIsR0FBRyxNQUFILENBQVUsQ0FBQyxDQUFELENBQVYsQ0FBekI7Q0FEUSxDQUFwQjs7QUFHTixJQUFNLDBCQUFTLFNBQVQsTUFBUztTQUFLLE1BQU07V0FBTSxNQUFNLEdBQUcsTUFBSCxDQUFVLENBQVYsQ0FBTjtHQUFOLEVBQTBCLFVBQUMsRUFBRCxFQUFLLEVBQUw7V0FDekQsU0FBUyxRQUFRLEVBQUUsTUFBRixDQUFTLE1BQU0sRUFBTixFQUFVLENBQUMsTUFBTSxFQUFOLENBQUQsQ0FBVyxNQUFYLENBQWtCLEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBbEIsQ0FBbkIsQ0FBUixDQUFULEVBQTBFLEVBQTFFO0dBRHlEO0NBQXJDOztBQUdmLElBQU0sNEJBQVUsU0FBVixPQUFVO1NBQVksTUFDakMsVUFBVSxhQUFLO0FBQ2IsUUFBTSxpQkFBUSxFQUFSLENBRE87QUFFYixTQUFLLElBQU0sQ0FBTixJQUFXLFFBQWhCO0FBQ0UsUUFBRSxDQUFGLElBQU8sU0FBUyxDQUFULEVBQVksQ0FBWixDQUFQO0tBREYsT0FFTyxDQUFQLENBSmE7R0FBTCxDQUR1QixFQU9qQyxXQUFXLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUNuQixRQUFJLE1BQU0sU0FBTixFQUNGLE9BQU8sU0FBUCxDQURGO0FBRUEsUUFBSSxVQUFKLENBSG1CO0FBSW5CLFFBQU0sTUFBTSxTQUFOLEdBQU0sQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ3BCLFVBQUksY0FBYyxDQUFkLEVBQ0YsSUFBSSxFQUFKLENBREY7QUFFQSxRQUFFLENBQUYsSUFBTyxDQUFQLENBSG9CO0tBQVYsQ0FKTztBQVNuQixTQUFLLElBQU0sQ0FBTixJQUFXLENBQWhCLEVBQW1CO0FBQ2pCLFVBQUksRUFBRSxLQUFLLFFBQUwsQ0FBRixFQUNGLElBQUksQ0FBSixFQUFPLEVBQUUsQ0FBRixDQUFQLEVBREYsS0FHRSxJQUFJLEtBQUssQ0FBTCxFQUNGLElBQUksQ0FBSixFQUFPLEVBQUUsQ0FBRixDQUFQLEVBREY7S0FKSjtBQU9BLFdBQU8sQ0FBUCxDQWhCbUI7R0FBVixDQVBzQjtDQUFaOztBQTBCaEIsSUFBTSxzQkFBTyxTQUFQLElBQU87U0FBWSxNQUM5QixhQUFLO0FBQ0gsUUFBSSxVQUFKLENBREc7QUFFSCxTQUFLLElBQU0sQ0FBTixJQUFXLFFBQWhCLEVBQTBCO0FBQ3hCLFVBQU0sSUFBSSxLQUFLLFFBQVEsU0FBUyxDQUFULENBQVIsQ0FBTCxFQUEyQixDQUEzQixDQUFKLENBRGtCO0FBRXhCLFVBQUksTUFBTSxTQUFOLEVBQWlCO0FBQ25CLFlBQUksTUFBTSxTQUFOLEVBQ0YsSUFBSSxFQUFKLENBREY7QUFFQSxVQUFFLENBQUYsSUFBTyxDQUFQLENBSG1CO09BQXJCO0tBRkY7QUFRQSxXQUFPLENBQVAsQ0FWRztHQUFMLEVBWUEsWUFBb0I7UUFBbkIsMERBQUkscUJBQWU7UUFBUixtQkFBUTs7QUFDbEIsUUFBSSxJQUFJLEdBQUosQ0FEYztBQUVsQixTQUFLLElBQU0sQ0FBTixJQUFXLFFBQWhCO0FBQ0UsVUFBSSxLQUFLLFFBQVEsU0FBUyxDQUFULENBQVIsQ0FBTCxFQUEyQixFQUFFLENBQUYsQ0FBM0IsRUFBaUMsQ0FBakMsQ0FBSjtLQURGLE9BRU8sQ0FBUCxDQUprQjtHQUFwQjtDQWJrQjs7QUFvQmIsSUFBTSw4QkFBVyxNQUFNLEVBQU4sRUFBVSxRQUFWLENBQVg7O0FBRU4sSUFBTSx3QkFBUSxTQUFSLEtBQVE7cUNBQUk7Ozs7U0FBTyxLQUFLLEVBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxFQUFiLENBQUw7Q0FBWDs7QUFFckIsSUFBTSxPQUFPLFNBQVAsSUFBTztxQ0FBSTs7OztTQUFXOzs7V0FBSyxxQkFBUSxHQUFSLGlCQUFlLGVBQVEsR0FBdkIsS0FBNkIsQ0FBN0I7R0FBTDtDQUFmOztBQUVOLElBQU0sb0JBQU0sU0FBTixHQUFNO3FDQUFJOzs7O1NBQ3JCLE1BQU0sc0JBQVEsZUFBUSxPQUFoQixDQUFOLEVBQThCLHNCQUFRLGVBQVEsT0FBaEIsQ0FBOUI7Q0FEaUI7O0FBR1osSUFBTSw4QkFBVyxTQUFYLFFBQVc7U0FBaUI7V0FDdkMsS0FBSyw0R0FBTCxLQUNBLEVBQUUsUUFBRixDQUFXLEtBQVgsRUFBa0IsRUFBRSxHQUFGLENBQU0sYUFBTixFQUFxQixNQUFyQixDQUFsQixFQUNDLEdBREQsQ0FDSyxFQUFFLElBQUYsQ0FBTyxFQUFFLE1BQUYsQ0FBUzthQUFLLE1BQU0sU0FBTjtLQUFMLENBQWhCLEVBQXVDLE9BQXZDLENBREwsQ0FEQTtHQUR1QztDQUFqQjs7a0JBS1QiLCJmaWxlIjoicGFydGlhbC5sZW5zZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gXCJyYW1kYVwiXG5cbi8vXG5cbmZ1bmN0aW9uIElkZW50aXR5KHZhbHVlKSB7dGhpcy52YWx1ZSA9IHZhbHVlfVxuY29uc3QgSWRlbnQgPSB4ID0+IG5ldyBJZGVudGl0eSh4KVxuSWRlbnRpdHkucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uICh4MnkpIHtyZXR1cm4gbmV3IElkZW50aXR5KHgyeSh0aGlzLnZhbHVlKSl9XG5JZGVudGl0eS5wcm90b3R5cGUub2YgPSBJZGVudFxuSWRlbnRpdHkucHJvdG90eXBlLmFwID0gZnVuY3Rpb24gKHgpIHtyZXR1cm4gbmV3IElkZW50aXR5KHRoaXMudmFsdWUoeC52YWx1ZSkpfVxuXG4vL1xuXG5mdW5jdGlvbiBDb25zdGFudCh2YWx1ZSkge3RoaXMudmFsdWUgPSB2YWx1ZX1cbmNvbnN0IENvbnN0ID0geCA9PiBuZXcgQ29uc3RhbnQoeClcbkNvbnN0YW50LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoKSB7cmV0dXJuIHRoaXN9XG5Db25zdGFudC5wcm90b3R5cGUub2YgPSBDb25zdFxuXG4vL1xuXG5jb25zdCB3YXJuZWQgPSB7fVxuXG5jb25zdCB3YXJuID0gbWVzc2FnZSA9PiB7XG4gIGlmICghKG1lc3NhZ2UgaW4gd2FybmVkKSkge1xuICAgIHdhcm5lZFttZXNzYWdlXSA9IG1lc3NhZ2VcbiAgICBjb25zb2xlLndhcm4oXCJwYXJ0aWFsLmxlbnNlczpcIiwgbWVzc2FnZSlcbiAgfVxufVxuXG4vL1xuXG5jb25zdCBpZCA9IHggPT4geFxuY29uc3Qgc25kID0gKF8sIGMpID0+IGNcblxuLy9cblxuY29uc3QgY2hlY2sgPSAoZXhwZWN0ZWQsIHByZWRpY2F0ZSkgPT4geCA9PiB7XG4gIGlmIChwcmVkaWNhdGUoeCkpXG4gICAgcmV0dXJuIHhcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgJHtleHBlY3RlZH0sIGJ1dCBnb3QgJHt4fS5gKVxufVxuXG5jb25zdCBhc3NlcnQgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyAoKSA9PiBpZCA6IGNoZWNrXG5cbi8vXG5cbmNvbnN0IGVtcHR5ID0ge31cblxuY29uc3QgZGVsZXRlS2V5ID0gKGssIG8pID0+IHtcbiAgaWYgKG8gPT09IHVuZGVmaW5lZCB8fCAhKGsgaW4gbykpXG4gICAgcmV0dXJuIG9cbiAgbGV0IHJcbiAgZm9yIChjb25zdCBwIGluIG8pIHtcbiAgICBpZiAocCAhPT0gaykge1xuICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gcilcbiAgICAgICAgciA9IHt9XG4gICAgICByW3BdID0gb1twXVxuICAgIH1cbiAgfVxuICByZXR1cm4gclxufVxuXG5jb25zdCBzZXRLZXkgPSAoaywgdiwgbykgPT4ge1xuICBpZiAobyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiB7W2tdOiB2fVxuICBpZiAoayBpbiBvICYmIFIuZXF1YWxzKHYsIG9ba10pKVxuICAgIHJldHVybiBvXG4gIGNvbnN0IHIgPSB7W2tdOiB2fVxuICBmb3IgKGNvbnN0IHAgaW4gbylcbiAgICBpZiAocCAhPT0gaylcbiAgICAgIHJbcF0gPSBvW3BdXG4gIHJldHVybiByXG59XG5cbi8vXG5cbmNvbnN0IGRyb3BwZWQgPSB4cyA9PiBPYmplY3Qua2V5cyh4cykubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogeHNcblxuLy9cblxuY29uc3QgdG9QYXJ0aWFsID0gdHJhbnNmb3JtID0+IHggPT4gdW5kZWZpbmVkID09PSB4ID8geCA6IHRyYW5zZm9ybSh4KVxuXG4vL1xuXG5jb25zdCBjb25zZXJ2ZSA9IChjMSwgYzApID0+IFIuZXF1YWxzKGMxLCBjMCkgPyBjMCA6IGMxXG5cbmNvbnN0IHRvQ29uc2VydmUgPSBmID0+ICh5LCBjMCkgPT4gY29uc2VydmUoZih5LCBjMCksIGMwKVxuXG4vL1xuXG5jb25zdCBzZWVtc0xlbnMgPSB4ID0+IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCIgJiYgeC5sZW5ndGggPT09IDFcblxuZXhwb3J0IGNvbnN0IGZyb21SYW1kYSA9IGFzc2VydChcImEgbGVuc1wiLCBzZWVtc0xlbnMpXG5cbmV4cG9ydCBjb25zdCB0b1JhbWRhID0gbCA9PiB7XG4gIGlmIChpc1Byb3AobCkpICByZXR1cm4gdG9SYW1kYVByb3AobClcbiAgaWYgKGlzSW5kZXgobCkpIHJldHVybiB0b1JhbWRhSW5kZXgobClcbiAgcmV0dXJuIGZyb21SYW1kYShsKVxufVxuXG5leHBvcnQgY29uc3QgY29tcG9zZSA9ICguLi5scykgPT5cbiAgbHMubGVuZ3RoID09PSAwID8gaWRlbnRpdHkgOlxuICBscy5sZW5ndGggPT09IDEgPyBsc1swXSA6XG4gIFIuY29tcG9zZSguLi5scy5tYXAodG9SYW1kYSkpXG5cbmV4cG9ydCBjb25zdCByZW1vdmUgPSBSLmN1cnJ5KChsLCBzKSA9PiBzZXRJKHRvUmFtZGEobCksIHVuZGVmaW5lZCwgcykpXG5cbmV4cG9ydCBjb25zdCByZW1vdmVBbGwgPSBSLmN1cnJ5KChsZW5zLCBkYXRhKSA9PiB7XG4gIHdhcm4oXCJgcmVtb3ZlQWxsYCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gbmV4dCBtYWpvciB2ZXJzaW9uIC0tLSB1c2UgYSBkaWZmZXJlbnQgYXBwcm9hY2guXCIpXG4gIHdoaWxlIChnZXQobGVucywgZGF0YSkgIT09IHVuZGVmaW5lZClcbiAgICBkYXRhID0gcmVtb3ZlKGxlbnMsIGRhdGEpXG4gIHJldHVybiBkYXRhXG59KVxuXG5jb25zdCBzZXRJID0gKGwsIHgsIHMpID0+IGwoKCkgPT4gSWRlbnQoeCkpKHMpLnZhbHVlXG5jb25zdCBnZXRJID0gKGwsIHMpID0+IGwoQ29uc3QpKHMpLnZhbHVlXG5jb25zdCBtb2RpZnlJID0gKGwsIHgyeCwgcykgPT4gbCh5ID0+IElkZW50KHgyeCh5KSkpKHMpLnZhbHVlXG5jb25zdCBsZW5zSSA9IChnZXR0ZXIsIHNldHRlcikgPT4gdG9GbiA9PiB0YXJnZXQgPT5cbiAgdG9GbihnZXR0ZXIodGFyZ2V0KSkubWFwKGZvY3VzID0+IHNldHRlcihmb2N1cywgdGFyZ2V0KSlcblxuZXhwb3J0IGNvbnN0IGxlbnMgPSBSLmN1cnJ5KGxlbnNJKVxuZXhwb3J0IGNvbnN0IG1vZGlmeSA9IFIuY3VycnkoKGwsIHgyeCwgcykgPT4gbW9kaWZ5SSh0b1JhbWRhKGwpLCB4MngsIHMpKVxuZXhwb3J0IGNvbnN0IHNldCA9IFIuY3VycnkoKGwsIHgsIHMpID0+IHNldEkodG9SYW1kYShsKSwgeCwgcykpXG5leHBvcnQgY29uc3QgZ2V0ID0gUi5jdXJyeSgobCwgcykgPT4gZ2V0SSh0b1JhbWRhKGwpLCBzKSlcblxuZXhwb3J0IGNvbnN0IGNoYWluID0gUi5jdXJyeSgoeDJ5TCwgeEwpID0+XG4gIGNvbXBvc2UoeEwsIGNob29zZSh4TyA9PiB4TyA9PT0gdW5kZWZpbmVkID8gbm90aGluZyA6IHgyeUwoeE8pKSkpXG5cbmV4cG9ydCBjb25zdCBqdXN0ID0geCA9PiBsZW5zSShSLmFsd2F5cyh4KSwgc25kKVxuXG5leHBvcnQgY29uc3QgY2hvb3NlID0geDJ5TCA9PiB0b0Z1bmN0b3IgPT4gdGFyZ2V0ID0+IHtcbiAgY29uc3QgbCA9IHRvUmFtZGEoeDJ5TCh0YXJnZXQpKVxuICByZXR1cm4gUi5tYXAoZm9jdXMgPT4gc2V0SShsLCBmb2N1cywgdGFyZ2V0KSwgdG9GdW5jdG9yKGdldEkobCwgdGFyZ2V0KSkpXG59XG5cbmV4cG9ydCBjb25zdCBub3RoaW5nID0gbGVuc0koc25kLCBzbmQpXG5cbmV4cG9ydCBjb25zdCBvckVsc2UgPVxuICBSLmN1cnJ5KChkLCBsKSA9PiBjaG9vc2UoeCA9PiBnZXRJKHRvUmFtZGEobCksIHgpICE9PSB1bmRlZmluZWQgPyBsIDogZCkpXG5cbmV4cG9ydCBjb25zdCBjaG9pY2UgPSAoLi4ubHMpID0+IGNob29zZSh4ID0+IHtcbiAgY29uc3QgaSA9IGxzLmZpbmRJbmRleChsID0+IGdldEkodG9SYW1kYShsKSwgeCkgIT09IHVuZGVmaW5lZClcbiAgcmV0dXJuIDAgPD0gaSA/IGxzW2ldIDogbm90aGluZ1xufSlcblxuZXhwb3J0IGNvbnN0IHJlcGxhY2UgPSBSLmN1cnJ5KChpbm4sIG91dCkgPT5cbiAgbGVuc0koeCA9PiBSLmVxdWFscyh4LCBpbm4pID8gb3V0IDogeCxcbiAgICAgICAgdG9Db25zZXJ2ZSh5ID0+IFIuZXF1YWxzKHksIG91dCkgPyBpbm4gOiB5KSkpXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0cyA9IHJlcGxhY2UodW5kZWZpbmVkKVxuZXhwb3J0IGNvbnN0IHJlcXVpcmVkID0gaW5uID0+IHJlcGxhY2UoaW5uLCB1bmRlZmluZWQpXG5leHBvcnQgY29uc3QgZGVmaW5lID0gdiA9PiBSLmNvbXBvc2UocmVxdWlyZWQodiksIGRlZmF1bHRzKHYpKVxuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplID0gdHJhbnNmb3JtID0+XG4gIGxlbnNJKHRvUGFydGlhbCh0cmFuc2Zvcm0pLCB0b0NvbnNlcnZlKHRvUGFydGlhbCh0cmFuc2Zvcm0pKSlcblxuY29uc3QgaXNQcm9wID0geCA9PiB0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIlxuXG5leHBvcnQgY29uc3QgcHJvcCA9IGFzc2VydChcImEgc3RyaW5nXCIsIGlzUHJvcClcblxuY29uc3QgdG9SYW1kYVByb3AgPSBrID0+XG4gIGxlbnNJKG8gPT4gbyAmJiBvW2tdLFxuICAgICAgICAodiwgbykgPT4gdiA9PT0gdW5kZWZpbmVkID8gZGVsZXRlS2V5KGssIG8pIDogc2V0S2V5KGssIHYsIG8pKVxuXG5leHBvcnQgY29uc3QgZmluZCA9IHByZWRpY2F0ZSA9PiBjaG9vc2UoeHMgPT4ge1xuICBpZiAoeHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gYXBwZW5kXG4gIGNvbnN0IGkgPSB4cy5maW5kSW5kZXgocHJlZGljYXRlKVxuICByZXR1cm4gaSA8IDAgPyBhcHBlbmQgOiBpXG59KVxuXG5leHBvcnQgY29uc3QgZmluZFdpdGggPSAoLi4ubHMpID0+IHtcbiAgY29uc3QgbGxzID0gdG9SYW1kYShjb21wb3NlKC4uLmxzKSlcbiAgcmV0dXJuIGNvbXBvc2UoZmluZCh4ID0+IGdldEkobGxzLCB4KSAhPT0gdW5kZWZpbmVkKSwgbGxzKVxufVxuXG5jb25zdCBpc0luZGV4ID0geCA9PiBOdW1iZXIuaXNJbnRlZ2VyKHgpICYmIDAgPD0geFxuXG5leHBvcnQgY29uc3QgaW5kZXggPSBhc3NlcnQoXCJhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyXCIsIGlzSW5kZXgpXG5cbmNvbnN0IHRvUmFtZGFJbmRleCA9IGkgPT4gbGVuc0koeHMgPT4geHMgJiYgeHNbaV0sICh4LCB4cykgPT4ge1xuICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHhzID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgaWYgKGkgPCB4cy5sZW5ndGgpXG4gICAgICByZXR1cm4gZHJvcHBlZCh4cy5zbGljZSgwLCBpKS5jb25jYXQoeHMuc2xpY2UoaSsxKSkpXG4gICAgcmV0dXJuIHhzXG4gIH0gZWxzZSB7XG4gICAgaWYgKHhzID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gQXJyYXkoaSkuY29uY2F0KFt4XSlcbiAgICBpZiAoeHMubGVuZ3RoIDw9IGkpXG4gICAgICByZXR1cm4geHMuY29uY2F0KEFycmF5KGkgLSB4cy5sZW5ndGgpLCBbeF0pXG4gICAgaWYgKFIuZXF1YWxzKHgsIHhzW2ldKSlcbiAgICAgIHJldHVybiB4c1xuICAgIHJldHVybiB4cy5zbGljZSgwLCBpKS5jb25jYXQoW3hdLCB4cy5zbGljZShpKzEpKVxuICB9XG59KVxuXG5leHBvcnQgY29uc3QgYXBwZW5kID0gbGVuc0koc25kLCAoeCwgeHMpID0+XG4gIHggPT09IHVuZGVmaW5lZCA/IHhzIDogeHMgPT09IHVuZGVmaW5lZCA/IFt4XSA6IHhzLmNvbmNhdChbeF0pKVxuXG5leHBvcnQgY29uc3QgZmlsdGVyID0gcCA9PiBsZW5zSSh4cyA9PiB4cyAmJiB4cy5maWx0ZXIocCksICh5cywgeHMpID0+XG4gIGNvbnNlcnZlKGRyb3BwZWQoUi5jb25jYXQoeXMgfHwgW10sICh4cyB8fCBbXSkuZmlsdGVyKFIuY29tcGxlbWVudChwKSkpKSwgeHMpKVxuXG5leHBvcnQgY29uc3QgYXVnbWVudCA9IHRlbXBsYXRlID0+IGxlbnNJKFxuICB0b1BhcnRpYWwoeCA9PiB7XG4gICAgY29uc3QgeiA9IHsuLi54fVxuICAgIGZvciAoY29uc3QgayBpbiB0ZW1wbGF0ZSlcbiAgICAgIHpba10gPSB0ZW1wbGF0ZVtrXSh4KVxuICAgIHJldHVybiB6XG4gIH0pLFxuICB0b0NvbnNlcnZlKCh5LCBjKSA9PiB7XG4gICAgaWYgKHkgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICBsZXQgelxuICAgIGNvbnN0IHNldCA9IChrLCB2KSA9PiB7XG4gICAgICBpZiAodW5kZWZpbmVkID09PSB6KVxuICAgICAgICB6ID0ge31cbiAgICAgIHpba10gPSB2XG4gICAgfVxuICAgIGZvciAoY29uc3QgayBpbiB5KSB7XG4gICAgICBpZiAoIShrIGluIHRlbXBsYXRlKSlcbiAgICAgICAgc2V0KGssIHlba10pXG4gICAgICBlbHNlXG4gICAgICAgIGlmIChrIGluIGMpXG4gICAgICAgICAgc2V0KGssIGNba10pXG4gICAgfVxuICAgIHJldHVybiB6XG4gIH0pKVxuXG5leHBvcnQgY29uc3QgcGljayA9IHRlbXBsYXRlID0+IGxlbnNJKFxuICBjID0+IHtcbiAgICBsZXQgclxuICAgIGZvciAoY29uc3QgayBpbiB0ZW1wbGF0ZSkge1xuICAgICAgY29uc3QgdiA9IGdldEkodG9SYW1kYSh0ZW1wbGF0ZVtrXSksIGMpXG4gICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgciA9IHt9XG4gICAgICAgIHJba10gPSB2XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByXG4gIH0sXG4gIChvID0gZW1wdHksIGNJbikgPT4ge1xuICAgIGxldCBjID0gY0luXG4gICAgZm9yIChjb25zdCBrIGluIHRlbXBsYXRlKVxuICAgICAgYyA9IHNldEkodG9SYW1kYSh0ZW1wbGF0ZVtrXSksIG9ba10sIGMpXG4gICAgcmV0dXJuIGNcbiAgfSlcblxuZXhwb3J0IGNvbnN0IGlkZW50aXR5ID0gbGVuc0koaWQsIGNvbnNlcnZlKVxuXG5leHBvcnQgY29uc3QgcHJvcHMgPSAoLi4ua3MpID0+IHBpY2soUi56aXBPYmooa3MsIGtzKSlcblxuY29uc3Qgc2hvdyA9ICguLi5sYWJlbHMpID0+IHggPT4gY29uc29sZS5sb2coLi4ubGFiZWxzLCB4KSB8fCB4XG5cbmV4cG9ydCBjb25zdCBsb2cgPSAoLi4ubGFiZWxzKSA9PlxuICBsZW5zSShzaG93KC4uLmxhYmVscywgXCJnZXRcIiksIHNob3coLi4ubGFiZWxzLCBcInNldFwiKSlcblxuZXhwb3J0IGNvbnN0IHNlcXVlbmNlID0gdG9BcHBsaWNhdGl2ZSA9PiB0YXJnZXQgPT5cbiAgd2FybihcImBzZXF1ZW5jZWAgaXMgZXhwZXJpbWVudGFsIGFuZCBtaWdodCBiZSByZW1vdmVkLCByZW5hbWVkIG9yIGNoYW5nZWQgc2VtYW50aWNhbGx5IGJlZm9yZSBuZXh0IG1ham9yIHJlbGVhc2VcIikgfHxcbiAgUi5zZXF1ZW5jZShJZGVudCwgUi5tYXAodG9BcHBsaWNhdGl2ZSwgdGFyZ2V0KSlcbiAgLm1hcChSLnBpcGUoUi5maWx0ZXIoeCA9PiB4ICE9PSB1bmRlZmluZWQpLCBkcm9wcGVkKSlcblxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZVxuIl19
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 355:
/***/ function(module, exports) {

	module.exports = "body, html {\n\tmargin: 0px;\n\tbackground-color: black;\n    overflow: hidden;\n    height: 100%;\n}\n\ncanvas[resize] {\n    width: 100%;\n    height: 100%;\n}\n\nvideo {\n\twidth: 100%;\n\tposition: absolute;\n\ttop: 50vh;\n\t-webkit-transform: translateY(-50%);\n\t        transform: translateY(-50%);\n}\n\n.draw {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n}"

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(355);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(144)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/raw-loader/index.js!./../node_modules/postcss-loader/index.js!./global.css", function() {
				var newContent = require("!!./../node_modules/raw-loader/index.js!./../node_modules/postcss-loader/index.js!./global.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

});
//# sourceMappingURL=game.bundle.js.map