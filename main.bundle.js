webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _from = __webpack_require__(250);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _scrollTo = __webpack_require__(249);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	var _ajpng = __webpack_require__(237);
	
	var _ajpng2 = _interopRequireDefault(_ajpng);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(507);
	__webpack_require__(95);
	
	__webpack_require__(503);
	// found that code on github
	
	
	window.ajpng = _ajpng2.default;
	
	// for eslint, couldn't find a way not to polute the environement
	
	var Waypoint = window.Waypoint;
	
	var arrow = document.getElementById("scroll-arrow");
	
	var info = document.getElementById("info");
	var landing = document.getElementById("landing");
	
	var to_game = document.getElementById("to-game");
	
	var sources = document.getElementById("sources");
	var logo = document.getElementById("logo");
	
	sources.style.display = "none";
	
	arrow.addEventListener("click", function () {
		(0, _scrollTo2.default)(window.innerHeight, 800);
	});
	/*
	let icons = Array.from(document.getElementsByClassName("icon"))
	
	Array.from(document.getElementsByClassName("paralax")).map((element,index) => {
		if(icons[index] != null){
			return new Waypoint({
				element: element,
				handler: () => {
					icons[index].classList.add("show")
				},
				offset: 250
	
			})
		}
	})
	*/
	
	var butFlex = document.getElementById("but-flex");
	var butStr = document.getElementById("but-str");
	var butCond = document.getElementById("but-cond");
	
	var videos = (0, _from2.default)(document.getElementsByClassName("vid-box"));
	var close = document.getElementById("close");
	
	/*
	AJPNG.ifNeeded().then(() => {
		for (var i = 0; i < aicons.length; i++) {
			AJPNG.animateImage(aicons[i]).then(e => console.log(e)).catch(e => console.log(e))
		}
	})
	*/
	
	function _ref(video) {
		video.pause();
		video.classList.remove("show");
		video.classList.remove("display");
	}
	
	function hideVideos() {
		videos.forEach(_ref);
	
		close.classList.remove("show");
	}
	
	function showVideo(idx) {
		videos[idx].classList.add("display");
	
		videos[idx].classList.add("show");
		close.classList.add("show");
	}
	
	close.addEventListener("click", hideVideos);
	
	butFlex.addEventListener("click", function () {
		showVideo(0);
	});
	
	butStr.addEventListener("click", function () {
		showVideo(2);
	});
	
	butCond.addEventListener("click", function () {
		showVideo(1);
	});
	
	var landingWaypoint = new Waypoint({
		element: landing,
		handler: function handler(dir) {
			//console.log(landing + " " + dir)
			if (dir == "up") {
				to_game.classList.remove("show");
			} else {
				// dir == "down"
				to_game.classList.add("show");
			}
			//to_game.style.color = "black";
		},
		offset: -250
	});
	
	var infoWaypoint = new Waypoint({
		element: info,
		handler: function handler(dir) {
			if (dir == "down") {}
		},
		offset: 0
	});
	
	var landing_cont = landing.children[0];
	
	setTimeout(function () {
		logo.classList.add("hidden");
	}, 5000);
	
	setTimeout(function () {
		landing_cont.classList.add("show");
	}, 0);
	//smoothScroll.init()

/***/ },

/***/ 22:
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(70)('wks')
	  , uid    = __webpack_require__(71)
	  , Symbol = __webpack_require__(34).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },

/***/ 34:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(34)
	  , core      = __webpack_require__(22)
	  , ctx       = __webpack_require__(52)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },

/***/ 46:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(98);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ 53:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 54:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(18)
	  , createDesc = __webpack_require__(56);
	module.exports = __webpack_require__(67) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 56:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(53);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(68);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 66:
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(46)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 68:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).setDesc
	  , has = __webpack_require__(54)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(34)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 71:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(509);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	      var state = parent._state;
	
	      if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	        return this;
	      }
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	      var result = parent._result;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	    var lib$es6$promise$promise$$counter = 0;
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (Array.isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, this._validationError());
	      }
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(508)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(143)(module)))

/***/ },

/***/ 95:
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

/***/ 98:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 99:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 100:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(55);

/***/ },

/***/ 143:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 148:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * API:
	 *
	 * ifNeeded([ignoreNativeAPNG bool]) → Promise()
	 * animateImage(img HTMLImageElement) → Promise()
	 *
	 * animateContext(url String, CanvasRenderingContext2D context) → Promise(Animation)
	 * parseBuffer(ArrayBuffer) → Promise(Animation)
	 * parseURL(url String) → Promise(Animation)
	 * checkNativeFeatures() → Promise(features)
	 */
	
	"use strict";
	
	var Promise = Promise || __webpack_require__(75).Promise;
	var support = __webpack_require__(242);
	var parseAPNG = __webpack_require__(241);
	var loadUrl = __webpack_require__(240);
	
	var AJPNG = {};
	var url2promise = {};
	
	AJPNG.checkNativeFeatures = support.checkNativeFeatures;
	
	AJPNG.ifNeeded = support.ifNeeded;
	
	/**
	 * @param {ArrayBuffer} buffer
	 * @return {Promise}
	 */
	AJPNG.parseBuffer = function (buffer) { return parseAPNG(new Uint8Array(buffer)); };
	
	/**
	 * @param {String} url
	 * @return {Promise}
	 */
	AJPNG.parseURL = function (url) {
	    if (!(url in url2promise)) url2promise[url] = loadUrl(url).then(parseAPNG);
	    return url2promise[url];
	};
	
	/**
	 * @param {String} url
	 * @param {CanvasRenderingContext2D} context
	 * @return {Promise}
	 */
	AJPNG.animateContext = function (url, context) {
	    return AJPNG.parseURL(url).then(function (a) {
	        a.addContext(context);
	        a.play();
	        return a;
	    });
	};
	
	/**
	 * @param {HTMLImageElement} img
	 * @return {Promise}
	 */
	AJPNG.animateImage = function (img) {
	    img.setAttribute("data-is-apng", "progress");
	    return AJPNG.parseURL(img).then(
	        function (anim) {
	            img.setAttribute("data-is-apng", "yes");
	            var canvas = document.createElement("canvas");
	            canvas.width = anim.width;
	            canvas.height = anim.height;
	            Array.prototype.slice.call(img.attributes).forEach(function (attr) {
	                if (["alt", "src", "usemap", "ismap", "data-is-apng", "width", "height"].indexOf(attr.nodeName) == -1) {
	                    canvas.setAttributeNode(attr.cloneNode());
	                }
	            });
	            canvas.setAttribute("data-apng-src", img.src);
	            if (img.alt != "") canvas.appendChild(document.createTextNode(img.alt));
	
	            var imgWidth = "", imgHeight = "", val = 0, unit = "";
	
	            if (img.style.width != "" && img.style.width != "auto") {
	                imgWidth = img.style.width;
	            } else if (img.hasAttribute("width")) {
	                imgWidth = img.getAttribute("width") + "px";
	            }
	            if (img.style.height != "" && img.style.height != "auto") {
	                imgHeight = img.style.height;
	            } else if (img.hasAttribute("height")) {
	                imgHeight = img.getAttribute("height") + "px";
	            }
	            if (imgWidth != "" && imgHeight == "") {
	                val = parseFloat(imgWidth);
	                unit = imgWidth.match(/\D+$/)[0];
	                imgHeight = Math.round(canvas.height * val / canvas.width) + unit;
	            }
	            if (imgHeight != "" && imgWidth == "") {
	                val = parseFloat(imgHeight);
	                unit = imgHeight.match(/\D+$/)[0];
	                imgWidth = Math.round(canvas.width * val / canvas.height) + unit;
	            }
	            canvas.style.width = imgWidth;
	            canvas.style.height = imgHeight;
	
	            var p = img.parentNode;
	            p.insertBefore(canvas, img);
	            p.removeChild(img);
	            anim.addContext(canvas.getContext("2d"));
	            anim.play();
	        },
	        function () {
	            img.setAttribute("data-is-apng", "no");
	        });
	};
	
	/**
	 * @param {HTMLCanvasElement} canvas
	 * @return {void}
	 */
	AJPNG.releaseCanvas = function(canvas) {
	    var ctx = canvas.getContext("2d");
	    if ('_apng_animation' in ctx) {
	        ctx['_apng_animation'].removeContext(ctx);
	    }
	};
	
	module.exports = AJPNG;


/***/ },

/***/ 238:
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Animation class
	 * @constructor
	 */
	var Animation = function () {
	    // Public
	
	    this.width = 0;
	    this.height = 0;
	    this.numPlays = 0;
	    this.playTime = 0;
	    this.frames = [];
	
	    /**
	     * Play animation (if not finished)
	     * @return {void}
	     */
	    this.play = function () {
	        if (played || finished) return;
	        this.rewind();
	        played = true;
	        tick();
	    };
	
	    /**
	     * Rewind animation to start (and stop it)
	     * @return {void}
	     */
	    this.rewind = function () {
	        nextRenderTime = 0;
	        fNum = 0;
	        prevF = null;
	        played = false;
	        finished = false;
	    };
	
	    /**
	     * Add new canvas context to animate
	     * @param {CanvasRenderingContext2D} ctx
	     * @return {void}
	     */
	    this.addContext = function (ctx) {
	        if (contexts.length > 0) {
	            var dat = contexts[0].getImageData(0, 0, this.width, this.height);
	            ctx.putImageData(dat, 0, 0);
	        }
	        contexts.push(ctx);
	        ctx['_apng_animation'] = this;
	    };
	
	    /**
	     * Remove canvas context from animation
	     * @param {CanvasRenderingContext2D} ctx
	     * @return {void}
	     */
	    this.removeContext = function (ctx) {
	        var idx = contexts.indexOf(ctx);
	        if (idx === -1) {
	            return;
	        }
	        contexts.splice(idx, 1);
	        if (contexts.length === 0) {
	            this.rewind();
	        }
	        if ('_apng_animation' in ctx) {
	            delete ctx['_apng_animation'];
	        }
	    };
	
	    //noinspection JSUnusedGlobalSymbols
	    /**
	     * Is animation played?
	     * @return {boolean}
	     */
	    this.isPlayed = function () { return played; };
	
	    //noinspection JSUnusedGlobalSymbols
	    /**
	     * Is animation finished?
	     * @return {boolean}
	     */
	    this.isFinished = function () { return finished; };
	
	    // Private
	
	    var ani = this,
	        nextRenderTime = 0,
	        fNum = 0,
	        prevF = null,
	        played = false,
	        finished = false,
	        contexts = [];
	
	    var tick = function (now) {
	        while (played && nextRenderTime <= now) renderFrame(now);
	        if (played) requestAnimationFrame(tick);
	    };
	
	    var renderFrame = function (now) {
	        var f = fNum++ % ani.frames.length;
	        var frame = ani.frames[f];
	
	        if (f == 0) {
	            contexts.forEach(function (ctx) {ctx.clearRect(0, 0, ani.width, ani.height);});
	            prevF = null;
	            if (frame.disposeOp == 2) frame.disposeOp = 1;
	        }
	
	        if (prevF && prevF.disposeOp == 1) {
	            contexts.forEach(function (ctx) {ctx.clearRect(prevF.left, prevF.top, prevF.width, prevF.height);});
	        } else if (prevF && prevF.disposeOp == 2) {
	            contexts.forEach(function (ctx) {ctx.putImageData(prevF.iData, prevF.left, prevF.top);});
	        }
	        prevF = frame;
	        prevF.iData = null;
	        if (prevF.disposeOp == 2) {
	            prevF.iData = contexts[0].getImageData(frame.left, frame.top, frame.width, frame.height);
	        }
	        if (frame.blendOp == 0) {
	            contexts.forEach(function (ctx) {ctx.clearRect(frame.left, frame.top, frame.width, frame.height);});
	        }
	        contexts.forEach(function (ctx) {ctx.drawImage(frame.img, frame.left, frame.top);});
	
	        if (ani.numPlays == 0 || fNum / ani.frames.length < ani.numPlays) {
	            if (nextRenderTime == 0) nextRenderTime = now;
	            while (now > nextRenderTime + ani.playTime) nextRenderTime += ani.playTime;
	            nextRenderTime += frame.delay;
	        } else {
	            played = false;
	            finished = false;
	        }
	    };
	};
	
	module.exports = Animation;

/***/ },

/***/ 239:
/***/ function(module, exports) {

	"use strict";
	
	var table = new Uint32Array(256);
	
	for (var i = 0; i < 256; i++) {
	    var c = i;
	    for (var k = 0; k < 8; k++) c = (c & 1) ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
	    table[i] = c;
	}
	
	/**
	 *
	 * @param {Uint8Array} bytes
	 * @param {int} start
	 * @param {int} length
	 * @return {int}
	 */
	module.exports = function (bytes, start, length) {
	    start = start || 0;
	    length = length || (bytes.length - start);
	    var crc = -1;
	    for (var i = start, l = start + length; i < l; i++) {
	        crc = ( crc >>> 8 ) ^ table[( crc ^ bytes[i] ) & 0xFF];
	    }
	    return crc ^ (-1);
	};


/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Promise = Promise || __webpack_require__(75).Promise;
	
	module.exports = function (img) {
	    return new Promise(function (resolve, reject) {
	        function load(url) {
	            var xhr = new XMLHttpRequest();
	            xhr.open('GET', url);
	            xhr.responseType = 'arraybuffer';
	            xhr.onload = function () {
	                if (this.status == 200) {
	                    resolve(this.response);
	                } else {
	                    reject(this);
	                }
	            };
	            xhr.send();
	        }
	        if (!img.complete || (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0)) {
	            img.onload = function () {
	                load(img.src);
	            };
	        } else {
	            load(img.src);
	        }
	    });
	};


/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Promise = Promise || __webpack_require__(75).Promise;
	var Animation = __webpack_require__(238);
	var crc32 = __webpack_require__(239);
	
	// "\x89PNG\x0d\x0a\x1a\x0a"
	var PNG_SIGNATURE_BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
	
	/**
	 * @param {ArrayBuffer} buffer
	 * @return {Promise}
	 */
	module.exports = function (buffer) {
	    var bytes = new Uint8Array(buffer);
	    return new Promise(function (resolve, reject) {
	        for (var i = 0; i < PNG_SIGNATURE_BYTES.length; i++) {
	            if (PNG_SIGNATURE_BYTES[i] != bytes[i]) {
	                reject("Not a PNG file (invalid file signature)");
	                return;
	            }
	        }
	
	        // fast animation test
	        var isAnimated = false;
	        var isAJPNG = false;
	        parseChunks(bytes, function (type) {
	            if (type == "acTL") {
	                isAnimated = true;
	                return false;
	            }
	            if (type == "acTV") {
	                isAnimated = true;
	                isAJPNG = true;
	                return false;
	            }
	            return true;
	        });
	        if (!isAnimated) {
	            reject("Not an animated PNG");
	            return;
	        }
	
	        var
	            preDataParts = [],
	            postDataParts = [],
	            headerDataBytes = null,
	            frame = null,
	            anim = new Animation(),
	            hasIDAT = false;
	
	        parseChunks(bytes, function (type, bytes, off, length) {
	            switch (type) {
	                case "IHDR":
	                    headerDataBytes = bytes.subarray(off + 8, off + 8 + length);
	                    anim.width = readDWord(bytes, off + 8);
	                    anim.height = readDWord(bytes, off + 12);
	                    break;
	                case "acTL":
	                case "acTV":
	                    anim.numPlays = readDWord(bytes, off + 8 + 4);
	                    break;
	                case "fcTL":
	                case "fcTV":
	                    if (frame) anim.frames.push(frame);
	                    frame = {};
	                    frame.isAJPNG = isAJPNG;
	                    frame.isDefault = !hasIDAT;
	                    frame.width = readDWord(bytes, off + 8 + 4);
	                    frame.height = readDWord(bytes, off + 8 + 8);
	                    frame.left = readDWord(bytes, off + 8 + 12);
	                    frame.top = readDWord(bytes, off + 8 + 16);
	                    var delayN = readWord(bytes, off + 8 + 20);
	                    var delayD = readWord(bytes, off + 8 + 22);
	                    if (delayD == 0) delayD = 100;
	                    frame.delay = 1000 * delayN / delayD;
	                    // see http://mxr.mozilla.org/mozilla/source/gfx/src/shared/gfxImageFrame.cpp#343
	                    if (frame.delay <= 10) frame.delay = 100;
	                    anim.playTime += frame.delay;
	                    frame.disposeOp = readByte(bytes, off + 8 + 24);
	                    frame.blendOp = readByte(bytes, off + 8 + 25);
	                    frame.dataParts = [];
	                    break;
	                case "fdAT":
	                    if (frame) frame.dataParts.push(bytes.subarray(off + 8 + 4, off + 8 + length));
	                    break;
	                case "fdAV":
	                    if (frame) {
	                        var alphaOffs = readDWord(bytes, off + 8 + 4);
	                        if (alphaOffs === 0) {
	                            frame.dataParts.push({
	                                jpeg: bytes.subarray(off + 8 + 8, off + 8 + length)
	                            });
	                        } else {
	                            frame.dataParts.push({
	                                jpeg: bytes.subarray(off + 8 + 8, off + 8 + 8 + alphaOffs),
	                                alpha: bytes.subarray(off + 8 + 8 + alphaOffs, off + 8 + length),
	                            });
	                        }
	                    }
	                    break;
	                case "IDAT":
	                    if (frame) frame.dataParts.push(bytes.subarray(off + 8, off + 8 + length));
	                    hasIDAT = true;
	                    break;
	                case "IEND":
	                    postDataParts.push(subBuffer(bytes, off, 12 + length));
	                    break;
	                default:
	                    preDataParts.push(subBuffer(bytes, off, 12 + length));
	            }
	        });
	
	        if (frame) anim.frames.push(frame);
	
	        if (anim.frames.length == 0) {
	            reject("Not an animated PNG");
	            return;
	        }
	
	        // creating images
	        var createdImages = 0;
	        var preBlob = new Blob(preDataParts), postBlob = new Blob(postDataParts);
	        for (var f = 0; f < anim.frames.length; f++) {
	            frame = anim.frames[f];
	
	            var j;
	            var url;
	
	            if (frame.isAJPNG && !frame.isDefault) {
	                for (j = 0; j < frame.dataParts.length; j++) {
	                    var frameDataPart = frame.dataParts[j];
	                    if(frameDataPart && frameDataPart.jpeg) {
	                        var jpegUrl = URL.createObjectURL(new Blob([frameDataPart.jpeg], { "type": "image/jpeg" }));
	                        if (!frameDataPart.alpha) {
	                            url = jpegUrl;
	                        } else {
	                            var alphaUrl = URL.createObjectURL(new Blob([frameDataPart.alpha], { "type": "image/png" }));
	                            (function (frame) {
	                                createCompositeImage(jpegUrl, alphaUrl, function (err, img) {
	                                    if (img) {
	                                        frame.img = img;
	                                        if (++createdImages == anim.frames.length) {
	                                            resolve(anim);
	                                        }
	                                    } else {
	                                        reject(err);
	                                    }
	                                });
	                            })(frame);
	                            url = null;
	                        }
	                        break;
	                    }
	                }
	            } else {
	                var bb = [];
	                bb.push(PNG_SIGNATURE_BYTES);
	                headerDataBytes.set(makeDWordArray(frame.width), 0);
	                headerDataBytes.set(makeDWordArray(frame.height), 4);
	                bb.push(makeChunkBytes("IHDR", headerDataBytes));
	                bb.push(preBlob);
	                for (j = 0; j < frame.dataParts.length; j++) {
	                    bb.push(makeChunkBytes("IDAT", frame.dataParts[j]));
	                }
	                bb.push(postBlob);
	                url = URL.createObjectURL(new Blob(bb, {"type": "image/png"}));
	                bb = null;
	            }
	
	            delete frame.dataParts;
	
	            if (url) {
	                (function (frame) {
	                    loadImgUrl(url, function (err, img) {
	                        if (img) {
	                            frame.img = img;
	                            if (++createdImages == anim.frames.length) {
	                                resolve(anim);
	                            }
	                        } else {
	                            reject(err);
	                        }
	                    });
	                })(frame);
	            }
	        }
	    });
	};
	
	var createCompositeImage = function (jpegUrl, alphaUrl, callback) {
	    loadImgUrl(jpegUrl, function (err, jpegImg) {
	        if (jpegImg) {
	            loadImgUrl(alphaUrl, function (err, alphaImg) {
	                if (alphaImg) {
	                    var canvas = document.createElement('canvas');
	                    var w = canvas.width = alphaImg.naturalWidth;
	                    var h = canvas.height = alphaImg.naturalHeight;
	                    var ctx = canvas.getContext('2d');
	                    // draw jpg to canvas and get pixels
	                    ctx.drawImage(jpegImg, 0, 0);
	                    var pdRGB = ctx.getImageData(0, 0, w, h);
	                    var pdRGBData = pdRGB.data;
	                    // draw png to canvas and get pixels
	                    ctx.clearRect(0, 0, w, h);
	                    ctx.drawImage(alphaImg, 0, 0);
	                    var pdAlpha = ctx.getImageData(0, 0, w, h);
	                    var pdAlphaData = pdAlpha.data;
	                    // alpha compositing against black matte
	                    for (var i = pdRGBData.length - 1; i > 0; i -= 4) {
	                        var alphaU8 = pdAlphaData[i];
	                        var alpha = 255 / alphaU8;
	                        // copy alpha
	                        pdRGBData[i] = alphaU8;
	                        // premultiply alpha
	                        pdRGBData[i - 1] *= alpha;
	                        pdRGBData[i - 2] *= alpha;
	                        pdRGBData[i - 3] *= alpha;
	                    }
	                    // write result back
	                    ctx.putImageData(pdRGB, 0, 0);
	                    callback(null, canvas);
	                } else {
	                    callback(err);
	                }
	            });
	        } else {
	            callback(err);
	        }
	    });
	}
	
	var loadImgUrl = function (url, callback) {
	    /**
	     * Using "createElement" instead of "new Image" because of bug in Chrome 27
	     * https://code.google.com/p/chromium/issues/detail?id=238071
	     * http://stackoverflow.com/questions/16377375/using-canvas-drawimage-in-chrome-extension-content-script/16378270
	     */
	    var img = document.createElement('img');
	    img.onload = function () {
	        URL.revokeObjectURL(this.src);
	        callback(null, this);
	    };
	    img.onerror = function () {
	        callback("Image creation error");
	    };
	    img.src = url;
	}
	
	/**
	 * @param {Uint8Array} bytes
	 * @param {function(string, Uint8Array, int, int)} callback
	 */
	var parseChunks = function (bytes, callback) {
	    var off = 8;
	    do {
	        var length = readDWord(bytes, off);
	        var type = readString(bytes, off + 4, 4);
	        var res = callback(type, bytes, off, length);
	        off += 12 + length;
	    } while (res !== false && type != "IEND" && off < bytes.length);
	};
	
	/**
	 * @param {Uint8Array} bytes
	 * @param {int} off
	 * @return {int}
	 */
	var readDWord = function (bytes, off) {
	    var x = 0;
	    // Force the most-significant byte to unsigned.
	    x += ((bytes[0 + off] << 24 ) >>> 0);
	    for (var i = 1; i < 4; i++) x += ( (bytes[i + off] << ((3 - i) * 8)) );
	    return x;
	};
	
	/**
	 * @param {Uint8Array} bytes
	 * @param {int} off
	 * @return {int}
	 */
	var readWord = function (bytes, off) {
	    var x = 0;
	    for (var i = 0; i < 2; i++) x += (bytes[i + off] << ((1 - i) * 8));
	    return x;
	};
	
	/**
	 * @param {Uint8Array} bytes
	 * @param {int} off
	 * @return {int}
	 */
	var readByte = function (bytes, off) {
	    return bytes[off];
	};
	
	/**
	 * @param {Uint8Array} bytes
	 * @param {int} start
	 * @param {int} length
	 * @return {Uint8Array}
	 */
	var subBuffer = function (bytes, start, length) {
	    var a = new Uint8Array(length);
	    a.set(bytes.subarray(start, start + length));
	    return a;
	};
	
	var readString = function (bytes, off, length) {
	    var chars = Array.prototype.slice.call(bytes.subarray(off, off + length));
	    return String.fromCharCode.apply(String, chars);
	};
	
	var makeDWordArray = function (x) {
	    return [(x >>> 24) & 0xff, (x >>> 16) & 0xff, (x >>> 8) & 0xff, x & 0xff];
	};
	var makeStringArray = function (x) {
	    var res = [];
	    for (var i = 0; i < x.length; i++) res.push(x.charCodeAt(i));
	    return res;
	};
	/**
	 * @param {string} type
	 * @param {Uint8Array} dataBytes
	 * @return {Uint8Array}
	 */
	var makeChunkBytes = function (type, dataBytes) {
	    var crcLen = type.length + dataBytes.length;
	    var bytes = new Uint8Array(new ArrayBuffer(crcLen + 8));
	    bytes.set(makeDWordArray(dataBytes.length), 0);
	    bytes.set(makeStringArray(type), 4);
	    bytes.set(dataBytes, 8);
	    var crc = crc32(bytes, 4, crcLen);
	    bytes.set(makeDWordArray(crc), crcLen + 4);
	    return bytes;
	};
	


/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var Promise = Promise || __webpack_require__(75).Promise;
	//require('es6-promise').polyfill();
	
	var oncePromise = function (foo) {
	    var promise = null;
	    return function (callback) {
	        if (!promise) promise = new Promise(foo);
	        if (callback) promise.then(callback);
	        return promise;
	    };
	};
	
	var checkNativeFeatures = oncePromise(function (resolve) {
	    var canvas = document.createElement("canvas");
	    var result = {
	        TypedArrays: ("ArrayBuffer" in global),
	        BlobURLs: ("URL" in global),
	        requestAnimationFrame: ("requestAnimationFrame" in global),
	        pageProtocol: (location.protocol == "http:" && location.protocol == "https:"),
	        canvas: ("getContext" in document.createElement("canvas")),
	        APNG: false
	    };
	
	    if (result.canvas) {
	        // see http://eligrey.com/blog/post/apng-feature-detection
	        var img = new Image();
	        img.onload = function () {
	            var ctx = canvas.getContext("2d");
	            ctx.drawImage(img, 0, 0);
	            result.APNG = (ctx.getImageData(0, 0, 1, 1).data[3] === 0);
	            resolve(result);
	        };
	        // frame 1 (skipped on apng-supporting browsers): [0, 0, 0, 255]
	        // frame 2: [0, 0, 0, 0]
	        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjV" +
	        "EwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAA" +
	        "AAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";
	    } else {
	        resolve(result);
	    }
	});
	
	/**
	 * @param {boolean} [ignoreNativeAPNG]
	 * @return {Promise}
	 */
	var ifNeeded = function (ignoreNativeAPNG) {
	    if (typeof ignoreNativeAPNG == 'undefined') ignoreNativeAPNG = false;
	    return checkNativeFeatures().then(function (features) {
	        if (features.APNG && !ignoreNativeAPNG) {
	            reject();
	        } else {
	            var ok = true;
	            for (var k in features) if (features.hasOwnProperty(k) && k != 'APNG') {
	                ok = ok && features[k];
	            }
	        }
	    });
	};
	
	module.exports = {
	    checkNativeFeatures: checkNativeFeatures,
	    ifNeeded: ifNeeded
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 249:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = scrollTo;
	
	function easeInOutQuad(t, b, c, d) {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};
	
	function easeInCubic(t, b, c, d) {
		var tc = (t /= d) * t * t;
		return b + c * tc;
	};
	
	function inOutQuintic(t, b, c, d) {
		var ts = (t /= d) * t,
		    tc = ts * t;
		return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
	};
	
	var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		return window.setTimeout(callback, 1000 / 60);
	};
	
	function scrollTo(to, duration, callback) {
	
		var start = document.scrollingElement.scrollTop,
		    change = to - start,
		    currentTime = 0,
		    increment = 20;
	
		duration = typeof duration === 'undefined' ? 500 : duration;
	
		var animateScroll = function animateScroll() {
			// increment the time
			currentTime += increment;
			// find the value with the quadratic in-out easing function
			var val = inOutQuintic(currentTime, start, change, duration);
			// move the document.body
			document.scrollingElement.scrollTop = val;
			// do the animation unless its over
			if (currentTime < duration) {
				requestAnimationFrame(animateScroll);
			} else {
				if (callback && typeof callback === 'function') {
					// the animation is done so lets callback
					callback();
				}
			}
		};
		animateScroll();
	}

/***/ },

/***/ 250:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(258), __esModule: true };

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(284);
	__webpack_require__(278);
	module.exports = __webpack_require__(22).Array.from;

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(66)
	  , TAG = __webpack_require__(25)('toStringTag')
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

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(99)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(65);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(18)
	  , descriptor     = __webpack_require__(56)
	  , setToStringTag = __webpack_require__(69)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(55)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(100)
	  , $export        = __webpack_require__(41)
	  , redefine       = __webpack_require__(101)
	  , hide           = __webpack_require__(55)
	  , has            = __webpack_require__(54)
	  , Iterators      = __webpack_require__(99)
	  , $iterCreate    = __webpack_require__(269)
	  , setToStringTag = __webpack_require__(69)
	  , getProto       = __webpack_require__(18).getProto
	  , ITERATOR       = __webpack_require__(25)('iterator')
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

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(148)
	  , defined   = __webpack_require__(53);
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

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(148)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(263)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(99);
	module.exports = __webpack_require__(22).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(52)
	  , $export     = __webpack_require__(41)
	  , toObject    = __webpack_require__(57)
	  , call        = __webpack_require__(268)
	  , isArrayIter = __webpack_require__(266)
	  , toLength    = __webpack_require__(276)
	  , getIterFn   = __webpack_require__(277);
	$export($export.S + $export.F * !__webpack_require__(271)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(275)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(270)(String, 'String', function(iterated){
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

/***/ 356:
/***/ function(module, exports) {

	module.exports = "@font-face {\n\tfont-family:\"TeXGyreAdventor\";\n\tsrc:url(\"./fnt/texgyreadventor-regular.woff\") format(\"woff\"),url(\"./fnt/texgyreadventor-regular.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"Droid-sans\";\n\tsrc:url(\"./fnt/DroidSans.ttf\") format(\"truetype\"),url(\"./fnt/DroidSans-Bold.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"steinemu\";\n\tsrc:url(\"./fnt/STEINEMU.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n\n@media (max-width: 750px) {\n\t.row {\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-flex-direction: column;\n\t\t    -ms-flex-direction: column;\n\t\t        flex-direction: column;\n\t}\n\t.row > * {\n\t\tmargin: 10 auto 0 auto !important;\n\t}\n\n\n\tsection {\n\t\theight: auto !important;\n\t\tpadding: 15px;\n\t}\n\n\n\tsection > .content .full-image {\n\t\theight: 50% !important;\n\n\n\n\t\t/*width: 100% !important;*/\n\t}\n\n}\n\n@media (max-height: 800px) {\n\t.vid-box {\n\t}\n\n}\n\n@media (max-width: 1350px) {\n\t.vid-box {\n\n\t}\n}\n@-webkit-keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n@keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@-webkit-keyframes float-small{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -5px);\n\t\t        transform: translate(0, -5px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@keyframes float-small{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -5px);\n\t\t        transform: translate(0, -5px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@-webkit-keyframes sprite{\n  from { background-position:0 0%; }\n  to { background-position:0 100%; }\n}\n\n@keyframes sprite{\n  from { background-position:0 0%; }\n  to { background-position:0 100%; }\n}\n\nbody {\n\twidth: 100%;\n\tmargin: 0px;\n\tpadding: 0px;\n\tfont-family: Helvetica; \n}\n\n\nsection {\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 50vh;\n\t-webkit-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\tposition: relative;\n\tfont-size: 1.1em;\n\tbackground-color: #00AFEF; \n\tcolor: white;\n}\n\n\nsection > .content.show {\n\topacity: 1 !important;\n}\n\n\nsection > .content {\n\n\n\n\t/*background-color: white;*/\n\n\n\n\t/* border-top: 2px solid black;\n\t\tborder-bottom: 2px solid black; */\n\tmargin: auto;\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1 1;\n\t    -ms-flex: 1 1;\n\t        flex: 1 1;\n\ttext-align: center;\n\t-webkit-transition:opacity 1.5s;\n\ttransition: opacity 1.5s;\n}\n\n\nsection > .content .icon {\n\theight: 35vh;\n\twidth: 35vh;\n\tdisplay: inline-block;\n\tmargin-right: 10px;\n\t-webkit-transition:opacity 0.5s;\n\ttransition: opacity 0.5s\n}\n\n\nsection > .content .icon.animated {\n\t-webkit-animation:sprite 1.5s steps(26) infinite;\n\t        animation:sprite 1.5s steps(26) infinite;\n\t-webkit-transform:translateX(0px);\n\t        transform:translateX(0px);\n}\n\n\nsection > .content .full-image {\n\theight: 100%;\n\t-webkit-animation-name: float-small;\n\t        animation-name: float-small;\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-duration: 3s;\n\t        animation-duration: 3s;\n\t-webkit-animation-timing-function: ease-in-out;\n\t        animation-timing-function: ease-in-out;\n}\n\n\nsection > .content h1 {\n\tfont-size: 3em;\n\tfont-family: steinemu;\n\tletter-spacing: 2px;\n}\n\n\nsection > .content > .row {\n\tmargin: 0 10% 0 10%;\n}\n\n\nsection > .content > .row > .icon {\n\n\n\n\t/* flex: 1; */\n}\n\n\nsection > .content > .row > p {\n\tfont-size: 1.1em;\n\t-webkit-box-flex: 5;\n\t-webkit-flex: 5;\n\t    -ms-flex: 5;\n\t        flex: 5;\n\t-webkit-align-self: center;\n\t    -ms-flex-item-align: center;\n\t        align-self: center;\n\ttext-align: left;\n\ttext-shadow: 0 0 3px #000;\n\tletter-spacing: 1px;\n}\n\n\nsection.paralax {\n\tmin-height:500px;\n\tbackground-image:url(\"./img/Background.jpg\");\n\tbackground-position:center;\n\tbackground-repeat:no-repeat;\n\tbackground-attachment:fixed;\n\tbackground-size:cover;\n}\n\n\nsection.paralax h1 {\n\t-webkit-animation-name:float;\n\t        animation-name:float;\n\t-webkit-animation-iteration-count:infinite;\n\t        animation-iteration-count:infinite;\n\t-webkit-animation-duration:3s;\n\t        animation-duration:3s;\n\t-webkit-animation-timing-function:ease-in-out;\n\t        animation-timing-function:ease-in-out;\n}\n\n\n#flexibility .icon {\n\tbackground:  url(\"./img/home_page/guvkavost_sprite.png\");\n\tbackground-size: 100%;\n}\n\n.row {\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t-webkit-justify-content: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.row > * {\n\t}\n\na {\n\tcolor: blue;\n\tcursor: pointer;\n}\n\n.static > * {\n\tposition: fixed;\n}\n\n.static > #to-game {\n\tright: 50px;\n\tbottom: -34px;\n\tpadding: 6px 12px 6px 12px;\n\tdisplay: block;\n\tfont-size: 1.2em;\n\tcolor: #444;\n\tbackground-color: #0096CC;\n\t-webkit-transition:color 0.1s;\n\ttransition: color 0.1s;\n\ttext-decoration: none;\n\n\n\n\t/* border-bottom: 2px black solid; */\n\t-webkit-perspective: 800px;\n\t        perspective: 800px;\n\t-webkit-transition:all 0.5s;\n\ttransition: all 0.5s;\n\topacity: 0;\n\tfont-weight: bold\n}\n\n.static > #to-game.show {\n\tbottom:40px;\n\topacity:1;\n}\n\n.static > #to-game:hover {\n\tcolor:white;\n}\n\n.static > #to-game:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.static > #to-game:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n.static .vid-box\n\t{\n\ttop: calc(50vh - 22.5vw) !important;\n\tleft: 10vw !important;\n\twidth: 80vw;\n\n\n\n\t/*\t\theight: 45vw;\n \t\ttop: calc(50% - 720px/2);\n\t\tleft: calc(50% - 1280px/2);\n\t\tbox-shadow: 0 0 3em #222;\n */\n\t-webkit-transform: translateX(0px);\n\t        transform: translateX(0px);\n\n\n\n\t/* transition: all 1s; */\n\topacity: 0;\n\tdisplay: none\n}\n\n.static .vid-box.display {\n\tdisplay:block;\n}\n\n.static .vid-box.show {\n\topacity:1;\n}\n\n.static #close {\n\ttop: calc(50vh - 22.5vw - 80px);\n\tright: calc(10vw - 80px);\n\tbackground-color: #444;\n\t-webkit-transform: scale(0.5, 0.5);\n\t        transform: scale(0.5, 0.5);\n\tborder-radius: 80px;\n\tdisplay: none\n}\n\n.static #close:hover {\n\tbackground-color:#bbb;\n}\n\n.static #close.show {\n\tdisplay:block;\n}\n\n\n\n#landing {\n\theight: 100vh !important;\n}\n\n\n\n#landing > .content {\n\topacity: 0;\n}\n\n\n\n#landing a {\n\tdisplay: block;\n\tposition: absolute;\n\tmargin: 0px;\n\t-webkit-transform: rotate(180deg);\n\t        transform: rotate(180deg);\n\tbottom: 0px;\n\tleft: calc(50% - 80px);\n\tcursor: pointer;\n}\n\n\n\n/* transition: all .3s; */\n\n\n\n#landing a img {\n\tz-index: 11;\n\t-webkit-transition:all .3s;\n\ttransition: all .3s;\n\n\n\n\t/* \t\t\twidth: 160px;\n\t\t\theight: 160px; */\n}\n\n\n\n/* left: calc(50% - 90px); */\n\n\n\n#landing a:hover img {\n\n\n\n\t/* \t\t\twidth: 180px;\n\t\t\theight: 180px; */\n\t-webkit-transform: scale(1.3);\n\t        transform: scale(1.3);\n}\n\n\n\n/*#logo {\n\t\tposition: absolute;\n\t\ttop: calc(50vh - 720px/2);\n\t\tleft: calc(50vw - 1280px/2);\n\t}\n*/\n\n\n\n#landing #logo {\n\tposition: absolute;\n\ttop: 50vh;\n\t-webkit-transform: translate(-640px, -360px) scale(1);\n\t        transform: translate(-640px, -360px) scale(1);\n\tleft: 50vw;\n\t-webkit-transition:all .5s;\n\ttransition: all .5s;\n\tz-index: -1;\n}\n\n\n\n#landing #logo.hidden {\n\t-webkit-transform: translate(-640px, -360px) scale(0);\n\t        transform: translate(-640px, -360px) scale(0);\n}\n\n\n\n#landing h1, #landing h2{\n\tfont-family: steinemu, Verdana, sans-serif;\n\tcolor: white;\n\tz-index: 10;\n}\n\n\n\n#landing h1 {\n\tfont-size: 4em;\n\tmargin: 0px;\n\t-webkit-animation-name: float;\n\t        animation-name: float;\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-duration: 3s;\n\t        animation-duration: 3s;\n\t-webkit-animation-timing-function: ease-in-out;\n\t        animation-timing-function: ease-in-out;\n}\n\n\n\n#landing h2 {\n\t}\n\n.button {\n\tfont-weight: bold;\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor, Verdana, sans-serif;\n\tfont-size: 2em;\n}\n\n.button:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.button-small {\n\tfont-size: 1em;\n\twidth: 200px;\n\n}\n\n.button-large {\n\tfont-size: 1.5em;\n\twidth: 300px;\n\n}\n\n.button-slide {\n\ttext-decoration: inherit;\n\ttext-align: center;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\tbackground-image: -webkit-linear-gradient(#444, #444);\n\tbackground-image: linear-gradient(#444, #444);\n\tbackground-position: 50% 50%;\n\tbackground-size: 100% 0%;\n\tbackground-repeat: no-repeat;\n\t-webkit-transition:background-size .3s, color .3s;\n\ttransition: background-size .3s, color .3s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\tfont-weight: bold;\n}\n\na {\n\tcolor: #000;\n\ttext-shadow: none;\n}\n\n\n.button-slide:hover{\n\tbackground-size: 100% 100%;\n\tcolor: #FFF;\n}\n\n\n.button-black {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n.button-black:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.text {\n\tbackground-color: blue;\n}\n\n.button-3d {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\t-webkit-perspective: 800px;\n\t        perspective: 800px\n}\n\n.button-3d:hover {\n\tcolor:white;\n}\n\n.button-3d:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.button-3d:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n.button-3d:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n\n\n#sources {\n\tdisplay: none;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t-webkit-flex-direction: column;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n}\n\n\n\n\n#sources > * {\n\ttext-align: left;\n\tmargin: auto;\n\t-webkit-box-flex:1;\n\t-webkit-flex:1;\n\t    -ms-flex:1;\n\t        flex:1;\n}"

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(356);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(142)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/raw-loader/index.js!./../node_modules/postcss-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/raw-loader/index.js!./../node_modules/postcss-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 507:
/***/ function(module, exports) {

	/*!
	Waypoints - 4.0.0
	Copyright © 2011-2015 Caleb Troughton
	Licensed under the MIT license.
	https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
	*/
	(function() {
	  'use strict'
	
	  var keyCounter = 0
	  var allWaypoints = {}
	
	  /* http://imakewebthings.com/waypoints/api/waypoint */
	  function Waypoint(options) {
	    if (!options) {
	      throw new Error('No options passed to Waypoint constructor')
	    }
	    if (!options.element) {
	      throw new Error('No element option passed to Waypoint constructor')
	    }
	    if (!options.handler) {
	      throw new Error('No handler option passed to Waypoint constructor')
	    }
	
	    this.key = 'waypoint-' + keyCounter
	    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
	    this.element = this.options.element
	    this.adapter = new Waypoint.Adapter(this.element)
	    this.callback = options.handler
	    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
	    this.enabled = this.options.enabled
	    this.triggerPoint = null
	    this.group = Waypoint.Group.findOrCreate({
	      name: this.options.group,
	      axis: this.axis
	    })
	    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)
	
	    if (Waypoint.offsetAliases[this.options.offset]) {
	      this.options.offset = Waypoint.offsetAliases[this.options.offset]
	    }
	    this.group.add(this)
	    this.context.add(this)
	    allWaypoints[this.key] = this
	    keyCounter += 1
	  }
	
	  /* Private */
	  Waypoint.prototype.queueTrigger = function(direction) {
	    this.group.queueTrigger(this, direction)
	  }
	
	  /* Private */
	  Waypoint.prototype.trigger = function(args) {
	    if (!this.enabled) {
	      return
	    }
	    if (this.callback) {
	      this.callback.apply(this, args)
	    }
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/destroy */
	  Waypoint.prototype.destroy = function() {
	    this.context.remove(this)
	    this.group.remove(this)
	    delete allWaypoints[this.key]
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/disable */
	  Waypoint.prototype.disable = function() {
	    this.enabled = false
	    return this
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/enable */
	  Waypoint.prototype.enable = function() {
	    this.context.refresh()
	    this.enabled = true
	    return this
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/next */
	  Waypoint.prototype.next = function() {
	    return this.group.next(this)
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/previous */
	  Waypoint.prototype.previous = function() {
	    return this.group.previous(this)
	  }
	
	  /* Private */
	  Waypoint.invokeAll = function(method) {
	    var allWaypointsArray = []
	    for (var waypointKey in allWaypoints) {
	      allWaypointsArray.push(allWaypoints[waypointKey])
	    }
	    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
	      allWaypointsArray[i][method]()
	    }
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/destroy-all */
	  Waypoint.destroyAll = function() {
	    Waypoint.invokeAll('destroy')
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/disable-all */
	  Waypoint.disableAll = function() {
	    Waypoint.invokeAll('disable')
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/enable-all */
	  Waypoint.enableAll = function() {
	    Waypoint.invokeAll('enable')
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/refresh-all */
	  Waypoint.refreshAll = function() {
	    Waypoint.Context.refreshAll()
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/viewport-height */
	  Waypoint.viewportHeight = function() {
	    return window.innerHeight || document.documentElement.clientHeight
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/viewport-width */
	  Waypoint.viewportWidth = function() {
	    return document.documentElement.clientWidth
	  }
	
	  Waypoint.adapters = []
	
	  Waypoint.defaults = {
	    context: window,
	    continuous: true,
	    enabled: true,
	    group: 'default',
	    horizontal: false,
	    offset: 0
	  }
	
	  Waypoint.offsetAliases = {
	    'bottom-in-view': function() {
	      return this.context.innerHeight() - this.adapter.outerHeight()
	    },
	    'right-in-view': function() {
	      return this.context.innerWidth() - this.adapter.outerWidth()
	    }
	  }
	
	  window.Waypoint = Waypoint
	}())
	;(function() {
	  'use strict'
	
	  function requestAnimationFrameShim(callback) {
	    window.setTimeout(callback, 1000 / 60)
	  }
	
	  var keyCounter = 0
	  var contexts = {}
	  var Waypoint = window.Waypoint
	  var oldWindowLoad = window.onload
	
	  /* http://imakewebthings.com/waypoints/api/context */
	  function Context(element) {
	    this.element = element
	    this.Adapter = Waypoint.Adapter
	    this.adapter = new this.Adapter(element)
	    this.key = 'waypoint-context-' + keyCounter
	    this.didScroll = false
	    this.didResize = false
	    this.oldScroll = {
	      x: this.adapter.scrollLeft(),
	      y: this.adapter.scrollTop()
	    }
	    this.waypoints = {
	      vertical: {},
	      horizontal: {}
	    }
	
	    element.waypointContextKey = this.key
	    contexts[element.waypointContextKey] = this
	    keyCounter += 1
	
	    this.createThrottledScrollHandler()
	    this.createThrottledResizeHandler()
	  }
	
	  /* Private */
	  Context.prototype.add = function(waypoint) {
	    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
	    this.waypoints[axis][waypoint.key] = waypoint
	    this.refresh()
	  }
	
	  /* Private */
	  Context.prototype.checkEmpty = function() {
	    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
	    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
	    if (horizontalEmpty && verticalEmpty) {
	      this.adapter.off('.waypoints')
	      delete contexts[this.key]
	    }
	  }
	
	  /* Private */
	  Context.prototype.createThrottledResizeHandler = function() {
	    var self = this
	
	    function resizeHandler() {
	      self.handleResize()
	      self.didResize = false
	    }
	
	    this.adapter.on('resize.waypoints', function() {
	      if (!self.didResize) {
	        self.didResize = true
	        Waypoint.requestAnimationFrame(resizeHandler)
	      }
	    })
	  }
	
	  /* Private */
	  Context.prototype.createThrottledScrollHandler = function() {
	    var self = this
	    function scrollHandler() {
	      self.handleScroll()
	      self.didScroll = false
	    }
	
	    this.adapter.on('scroll.waypoints', function() {
	      if (!self.didScroll || Waypoint.isTouch) {
	        self.didScroll = true
	        Waypoint.requestAnimationFrame(scrollHandler)
	      }
	    })
	  }
	
	  /* Private */
	  Context.prototype.handleResize = function() {
	    Waypoint.Context.refreshAll()
	  }
	
	  /* Private */
	  Context.prototype.handleScroll = function() {
	    var triggeredGroups = {}
	    var axes = {
	      horizontal: {
	        newScroll: this.adapter.scrollLeft(),
	        oldScroll: this.oldScroll.x,
	        forward: 'right',
	        backward: 'left'
	      },
	      vertical: {
	        newScroll: this.adapter.scrollTop(),
	        oldScroll: this.oldScroll.y,
	        forward: 'down',
	        backward: 'up'
	      }
	    }
	
	    for (var axisKey in axes) {
	      var axis = axes[axisKey]
	      var isForward = axis.newScroll > axis.oldScroll
	      var direction = isForward ? axis.forward : axis.backward
	
	      for (var waypointKey in this.waypoints[axisKey]) {
	        var waypoint = this.waypoints[axisKey][waypointKey]
	        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
	        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
	        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
	        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
	        if (crossedForward || crossedBackward) {
	          waypoint.queueTrigger(direction)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	      }
	    }
	
	    for (var groupKey in triggeredGroups) {
	      triggeredGroups[groupKey].flushTriggers()
	    }
	
	    this.oldScroll = {
	      x: axes.horizontal.newScroll,
	      y: axes.vertical.newScroll
	    }
	  }
	
	  /* Private */
	  Context.prototype.innerHeight = function() {
	    /*eslint-disable eqeqeq */
	    if (this.element == this.element.window) {
	      return Waypoint.viewportHeight()
	    }
	    /*eslint-enable eqeqeq */
	    return this.adapter.innerHeight()
	  }
	
	  /* Private */
	  Context.prototype.remove = function(waypoint) {
	    delete this.waypoints[waypoint.axis][waypoint.key]
	    this.checkEmpty()
	  }
	
	  /* Private */
	  Context.prototype.innerWidth = function() {
	    /*eslint-disable eqeqeq */
	    if (this.element == this.element.window) {
	      return Waypoint.viewportWidth()
	    }
	    /*eslint-enable eqeqeq */
	    return this.adapter.innerWidth()
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-destroy */
	  Context.prototype.destroy = function() {
	    var allWaypoints = []
	    for (var axis in this.waypoints) {
	      for (var waypointKey in this.waypoints[axis]) {
	        allWaypoints.push(this.waypoints[axis][waypointKey])
	      }
	    }
	    for (var i = 0, end = allWaypoints.length; i < end; i++) {
	      allWaypoints[i].destroy()
	    }
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-refresh */
	  Context.prototype.refresh = function() {
	    /*eslint-disable eqeqeq */
	    var isWindow = this.element == this.element.window
	    /*eslint-enable eqeqeq */
	    var contextOffset = isWindow ? undefined : this.adapter.offset()
	    var triggeredGroups = {}
	    var axes
	
	    this.handleScroll()
	    axes = {
	      horizontal: {
	        contextOffset: isWindow ? 0 : contextOffset.left,
	        contextScroll: isWindow ? 0 : this.oldScroll.x,
	        contextDimension: this.innerWidth(),
	        oldScroll: this.oldScroll.x,
	        forward: 'right',
	        backward: 'left',
	        offsetProp: 'left'
	      },
	      vertical: {
	        contextOffset: isWindow ? 0 : contextOffset.top,
	        contextScroll: isWindow ? 0 : this.oldScroll.y,
	        contextDimension: this.innerHeight(),
	        oldScroll: this.oldScroll.y,
	        forward: 'down',
	        backward: 'up',
	        offsetProp: 'top'
	      }
	    }
	
	    for (var axisKey in axes) {
	      var axis = axes[axisKey]
	      for (var waypointKey in this.waypoints[axisKey]) {
	        var waypoint = this.waypoints[axisKey][waypointKey]
	        var adjustment = waypoint.options.offset
	        var oldTriggerPoint = waypoint.triggerPoint
	        var elementOffset = 0
	        var freshWaypoint = oldTriggerPoint == null
	        var contextModifier, wasBeforeScroll, nowAfterScroll
	        var triggeredBackward, triggeredForward
	
	        if (waypoint.element !== waypoint.element.window) {
	          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
	        }
	
	        if (typeof adjustment === 'function') {
	          adjustment = adjustment.apply(waypoint)
	        }
	        else if (typeof adjustment === 'string') {
	          adjustment = parseFloat(adjustment)
	          if (waypoint.options.offset.indexOf('%') > - 1) {
	            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
	          }
	        }
	
	        contextModifier = axis.contextScroll - axis.contextOffset
	        waypoint.triggerPoint = elementOffset + contextModifier - adjustment
	        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
	        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
	        triggeredBackward = wasBeforeScroll && nowAfterScroll
	        triggeredForward = !wasBeforeScroll && !nowAfterScroll
	
	        if (!freshWaypoint && triggeredBackward) {
	          waypoint.queueTrigger(axis.backward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	        else if (!freshWaypoint && triggeredForward) {
	          waypoint.queueTrigger(axis.forward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
	          waypoint.queueTrigger(axis.forward)
	          triggeredGroups[waypoint.group.id] = waypoint.group
	        }
	      }
	    }
	
	    Waypoint.requestAnimationFrame(function() {
	      for (var groupKey in triggeredGroups) {
	        triggeredGroups[groupKey].flushTriggers()
	      }
	    })
	
	    return this
	  }
	
	  /* Private */
	  Context.findOrCreateByElement = function(element) {
	    return Context.findByElement(element) || new Context(element)
	  }
	
	  /* Private */
	  Context.refreshAll = function() {
	    for (var contextId in contexts) {
	      contexts[contextId].refresh()
	    }
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
	  Context.findByElement = function(element) {
	    return contexts[element.waypointContextKey]
	  }
	
	  window.onload = function() {
	    if (oldWindowLoad) {
	      oldWindowLoad()
	    }
	    Context.refreshAll()
	  }
	
	  Waypoint.requestAnimationFrame = function(callback) {
	    var requestFn = window.requestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.webkitRequestAnimationFrame ||
	      requestAnimationFrameShim
	    requestFn.call(window, callback)
	  }
	  Waypoint.Context = Context
	}())
	;(function() {
	  'use strict'
	
	  function byTriggerPoint(a, b) {
	    return a.triggerPoint - b.triggerPoint
	  }
	
	  function byReverseTriggerPoint(a, b) {
	    return b.triggerPoint - a.triggerPoint
	  }
	
	  var groups = {
	    vertical: {},
	    horizontal: {}
	  }
	  var Waypoint = window.Waypoint
	
	  /* http://imakewebthings.com/waypoints/api/group */
	  function Group(options) {
	    this.name = options.name
	    this.axis = options.axis
	    this.id = this.name + '-' + this.axis
	    this.waypoints = []
	    this.clearTriggerQueues()
	    groups[this.axis][this.name] = this
	  }
	
	  /* Private */
	  Group.prototype.add = function(waypoint) {
	    this.waypoints.push(waypoint)
	  }
	
	  /* Private */
	  Group.prototype.clearTriggerQueues = function() {
	    this.triggerQueues = {
	      up: [],
	      down: [],
	      left: [],
	      right: []
	    }
	  }
	
	  /* Private */
	  Group.prototype.flushTriggers = function() {
	    for (var direction in this.triggerQueues) {
	      var waypoints = this.triggerQueues[direction]
	      var reverse = direction === 'up' || direction === 'left'
	      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
	      for (var i = 0, end = waypoints.length; i < end; i += 1) {
	        var waypoint = waypoints[i]
	        if (waypoint.options.continuous || i === waypoints.length - 1) {
	          waypoint.trigger([direction])
	        }
	      }
	    }
	    this.clearTriggerQueues()
	  }
	
	  /* Private */
	  Group.prototype.next = function(waypoint) {
	    this.waypoints.sort(byTriggerPoint)
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    var isLast = index === this.waypoints.length - 1
	    return isLast ? null : this.waypoints[index + 1]
	  }
	
	  /* Private */
	  Group.prototype.previous = function(waypoint) {
	    this.waypoints.sort(byTriggerPoint)
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    return index ? this.waypoints[index - 1] : null
	  }
	
	  /* Private */
	  Group.prototype.queueTrigger = function(waypoint, direction) {
	    this.triggerQueues[direction].push(waypoint)
	  }
	
	  /* Private */
	  Group.prototype.remove = function(waypoint) {
	    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
	    if (index > -1) {
	      this.waypoints.splice(index, 1)
	    }
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/first */
	  Group.prototype.first = function() {
	    return this.waypoints[0]
	  }
	
	  /* Public */
	  /* http://imakewebthings.com/waypoints/api/last */
	  Group.prototype.last = function() {
	    return this.waypoints[this.waypoints.length - 1]
	  }
	
	  /* Private */
	  Group.findOrCreate = function(options) {
	    return groups[options.axis][options.name] || new Group(options)
	  }
	
	  Waypoint.Group = Group
	}())
	;(function() {
	  'use strict'
	
	  var Waypoint = window.Waypoint
	
	  function isWindow(element) {
	    return element === element.window
	  }
	
	  function getWindow(element) {
	    if (isWindow(element)) {
	      return element
	    }
	    return element.defaultView
	  }
	
	  function NoFrameworkAdapter(element) {
	    this.element = element
	    this.handlers = {}
	  }
	
	  NoFrameworkAdapter.prototype.innerHeight = function() {
	    var isWin = isWindow(this.element)
	    return isWin ? this.element.innerHeight : this.element.clientHeight
	  }
	
	  NoFrameworkAdapter.prototype.innerWidth = function() {
	    var isWin = isWindow(this.element)
	    return isWin ? this.element.innerWidth : this.element.clientWidth
	  }
	
	  NoFrameworkAdapter.prototype.off = function(event, handler) {
	    function removeListeners(element, listeners, handler) {
	      for (var i = 0, end = listeners.length - 1; i < end; i++) {
	        var listener = listeners[i]
	        if (!handler || handler === listener) {
	          element.removeEventListener(listener)
	        }
	      }
	    }
	
	    var eventParts = event.split('.')
	    var eventType = eventParts[0]
	    var namespace = eventParts[1]
	    var element = this.element
	
	    if (namespace && this.handlers[namespace] && eventType) {
	      removeListeners(element, this.handlers[namespace][eventType], handler)
	      this.handlers[namespace][eventType] = []
	    }
	    else if (eventType) {
	      for (var ns in this.handlers) {
	        removeListeners(element, this.handlers[ns][eventType] || [], handler)
	        this.handlers[ns][eventType] = []
	      }
	    }
	    else if (namespace && this.handlers[namespace]) {
	      for (var type in this.handlers[namespace]) {
	        removeListeners(element, this.handlers[namespace][type], handler)
	      }
	      this.handlers[namespace] = {}
	    }
	  }
	
	  /* Adapted from jQuery 1.x offset() */
	  NoFrameworkAdapter.prototype.offset = function() {
	    if (!this.element.ownerDocument) {
	      return null
	    }
	
	    var documentElement = this.element.ownerDocument.documentElement
	    var win = getWindow(this.element.ownerDocument)
	    var rect = {
	      top: 0,
	      left: 0
	    }
	
	    if (this.element.getBoundingClientRect) {
	      rect = this.element.getBoundingClientRect()
	    }
	
	    return {
	      top: rect.top + win.pageYOffset - documentElement.clientTop,
	      left: rect.left + win.pageXOffset - documentElement.clientLeft
	    }
	  }
	
	  NoFrameworkAdapter.prototype.on = function(event, handler) {
	    var eventParts = event.split('.')
	    var eventType = eventParts[0]
	    var namespace = eventParts[1] || '__default'
	    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {}
	    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || []
	
	    nsTypeList.push(handler)
	    this.element.addEventListener(eventType, handler)
	  }
	
	  NoFrameworkAdapter.prototype.outerHeight = function(includeMargin) {
	    var height = this.innerHeight()
	    var computedStyle
	
	    if (includeMargin && !isWindow(this.element)) {
	      computedStyle = window.getComputedStyle(this.element)
	      height += parseInt(computedStyle.marginTop, 10)
	      height += parseInt(computedStyle.marginBottom, 10)
	    }
	
	    return height
	  }
	
	  NoFrameworkAdapter.prototype.outerWidth = function(includeMargin) {
	    var width = this.innerWidth()
	    var computedStyle
	
	    if (includeMargin && !isWindow(this.element)) {
	      computedStyle = window.getComputedStyle(this.element)
	      width += parseInt(computedStyle.marginLeft, 10)
	      width += parseInt(computedStyle.marginRight, 10)
	    }
	
	    return width
	  }
	
	  NoFrameworkAdapter.prototype.scrollLeft = function() {
	    var win = getWindow(this.element)
	    return win ? win.pageXOffset : this.element.scrollLeft
	  }
	
	  NoFrameworkAdapter.prototype.scrollTop = function() {
	    var win = getWindow(this.element)
	    return win ? win.pageYOffset : this.element.scrollTop
	  }
	
	  NoFrameworkAdapter.extend = function() {
	    var args = Array.prototype.slice.call(arguments)
	
	    function merge(target, obj) {
	      if (typeof target === 'object' && typeof obj === 'object') {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            target[key] = obj[key]
	          }
	        }
	      }
	
	      return target
	    }
	
	    for (var i = 1, end = args.length; i < end; i++) {
	      merge(args[0], args[i])
	    }
	    return args[0]
	  }
	
	  NoFrameworkAdapter.inArray = function(element, array, i) {
	    return array == null ? -1 : array.indexOf(element, i)
	  }
	
	  NoFrameworkAdapter.isEmptyObject = function(obj) {
	    /* eslint no-unused-vars: 0 */
	    for (var name in obj) {
	      return false
	    }
	    return true
	  }
	
	  Waypoint.adapters.push({
	    name: 'noframework',
	    Adapter: NoFrameworkAdapter
	  })
	  Waypoint.Adapter = NoFrameworkAdapter
	}())
	;

/***/ },

/***/ 508:
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },

/***/ 509:
/***/ function(module, exports) {

	/* (ignored) */

/***/ }

});
//# sourceMappingURL=main.bundle.js.map