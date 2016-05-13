webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _from = __webpack_require__(247);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _scrollTo = __webpack_require__(246);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	var _luminousLightbox = __webpack_require__(353);
	
	var _luminousLightbox2 = _interopRequireDefault(_luminousLightbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(507);
	__webpack_require__(94);
	
	__webpack_require__(503);
	// found that code on github
	
	// import Luminous from "Luminous"
	
	window.ps = _luminousLightbox2.default;
	
	// for eslint, couldn't find a way not to polute the environement
	
	var Waypoint = window.Waypoint;
	
	var arrow = document.getElementById("scroll-arrow");
	
	var info = document.getElementById("info");
	var landing = document.getElementById("landing");
	
	var to_game = document.getElementById("to-game");
	
	var logo = document.getElementById("logo");
	
	arrow.addEventListener("click", function () {
		(0, _scrollTo2.default)(window.innerHeight, 800);
	});
	
	var butFlex = document.getElementById("but-flex");
	var butStr = document.getElementById("but-str");
	var butCond = document.getElementById("but-cond");
	var butEle = document.getElementById("but-ele");
	
	var videos = (0, _from2.default)(document.getElementsByClassName("vid-box"));
	
	var thumbs = (0, _from2.default)(document.getElementsByClassName("thumb"));
	
	var options = {
		sourceAttribute: "src"
	};
	
	var lum = thumbs.map(function (thumb) {
		return new _luminousLightbox2.default(thumb, options);
	});
	
	var close = document.getElementById("close");
	
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
		videos[idx].play();
	}
	
	close.addEventListener("click", hideVideos);
	
	// butFlex.addEventListener("click", () => {
	// 	showVideo(0)
	// })
	
	butStr.addEventListener("click", function () {
		showVideo(1);
	});
	
	butCond.addEventListener("click", function () {
		showVideo(2);
	});
	
	butEle.addEventListener("click", function () {
		showVideo(3);
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

/***/ 34:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(46);
	module.exports = function(it){
	  return Object(defined(it));
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

/***/ 246:
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

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(256), __esModule: true };

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(104);
	__webpack_require__(276);
	module.exports = __webpack_require__(23).Array.from;

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(34)
	  , ITERATOR   = __webpack_require__(22)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(64);
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

	var ITERATOR     = __webpack_require__(22)('iterator')
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

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(71)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(98)
	  , $export     = __webpack_require__(41)
	  , toObject    = __webpack_require__(56)
	  , call        = __webpack_require__(268)
	  , isArrayIter = __webpack_require__(266)
	  , toLength    = __webpack_require__(274)
	  , getIterFn   = __webpack_require__(103);
	$export($export.S + $export.F * !__webpack_require__(269)(function(iter){ Array.from(iter); }), 'Array', {
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

/***/ 353:
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Luminous = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dom = require('./util/dom');
	
	var _throwIfMissing = require('./util/throwIfMissing');
	
	var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// All officially-supported browsers have this, but it's easy to
	// account for, just in case.
	var HAS_ANIMATION = typeof document === 'undefined' ? false : 'animation' in document.createElement('div').style;
	
	var Lightbox = function () {
	  function Lightbox() {
	    var _this = this;
	
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, Lightbox);
	
	    this._sizeImgWrapperEl = function () {
	      var style = _this.imgWrapperEl.style;
	      style.width = _this.innerEl.clientWidth + 'px';
	      style.maxWidth = _this.innerEl.clientWidth + 'px';
	      style.height = _this.innerEl.clientHeight - _this.captionEl.clientHeight + 'px';
	      style.maxHeight = _this.innerEl.clientHeight - _this.captionEl.clientHeight + 'px';
	    };
	
	    this._completeOpen = function () {
	      _this.el.removeEventListener('animationend', _this._completeOpen, false);
	
	      (0, _dom.removeClasses)(_this.el, _this.openingClasses);
	    };
	
	    this._completeClose = function () {
	      _this.el.removeEventListener('animationend', _this._completeClose, false);
	
	      (0, _dom.removeClasses)(_this.el, _this.openClasses);
	      (0, _dom.removeClasses)(_this.el, _this.closingClasses);
	    };
	
	    var _options$namespace = options.namespace;
	    var namespace = _options$namespace === undefined ? null : _options$namespace;
	    var _options$parentEl = options.parentEl;
	    var parentEl = _options$parentEl === undefined ? (0, _throwIfMissing2.default)() : _options$parentEl;
	    var _options$triggerEl = options.triggerEl;
	    var triggerEl = _options$triggerEl === undefined ? (0, _throwIfMissing2.default)() : _options$triggerEl;
	    var _options$sourceAttrib = options.sourceAttribute;
	    var sourceAttribute = _options$sourceAttrib === undefined ? (0, _throwIfMissing2.default)() : _options$sourceAttrib;
	    var _options$captionAttri = options.captionAttribute;
	    var captionAttribute = _options$captionAttri === undefined ? (0, _throwIfMissing2.default)() : _options$captionAttri;
	    var _options$includeImgix = options.includeImgixJSClass;
	    var includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
	
	
	    this.settings = { namespace: namespace, parentEl: parentEl, triggerEl: triggerEl, sourceAttribute: sourceAttribute, captionAttribute: captionAttribute, includeImgixJSClass: includeImgixJSClass };
	
	    if (!(0, _dom.isDOMElement)(this.settings.parentEl)) {
	      throw new TypeError('`new Lightbox` requires a DOM element passed as `parentEl`.');
	    }
	
	    this.openClasses = this._buildClasses('open');
	    this.openingClasses = this._buildClasses('opening');
	    this.closingClasses = this._buildClasses('closing');
	
	    this.elementBuilt = false;
	  }
	
	  _createClass(Lightbox, [{
	    key: '_buildClasses',
	    value: function _buildClasses(suffix) {
	      var classes = ['lum-' + suffix];
	
	      var ns = this.settings.namespace;
	      if (ns) {
	        classes.push(ns + '-' + suffix);
	      }
	
	      return classes;
	    }
	  }, {
	    key: '_buildElement',
	    value: function _buildElement() {
	      this.el = document.createElement('div');
	      (0, _dom.addClasses)(this.el, this._buildClasses('lightbox'));
	
	      this.innerEl = document.createElement('div');
	      (0, _dom.addClasses)(this.innerEl, this._buildClasses('lightbox-inner'));
	      this.el.appendChild(this.innerEl);
	
	      var loaderEl = document.createElement('div');
	      (0, _dom.addClasses)(loaderEl, this._buildClasses('lightbox-loader'));
	      this.innerEl.appendChild(loaderEl);
	
	      this.imgWrapperEl = document.createElement('div');
	      (0, _dom.addClasses)(this.imgWrapperEl, this._buildClasses('lightbox-image-wrapper'));
	      this.innerEl.appendChild(this.imgWrapperEl);
	
	      var positionHelperEl = document.createElement('span');
	      (0, _dom.addClasses)(positionHelperEl, this._buildClasses('lightbox-position-helper'));
	      this.imgWrapperEl.appendChild(positionHelperEl);
	
	      this.imgEl = document.createElement('img');
	      positionHelperEl.appendChild(this.imgEl);
	
	      this.captionEl = document.createElement('p');
	      (0, _dom.addClasses)(this.captionEl, this._buildClasses('lightbox-caption'));
	      positionHelperEl.appendChild(this.captionEl);
	
	      this.settings.parentEl.appendChild(this.el);
	
	      this._updateImgSrc();
	      this._updateCaption();
	
	      if (this.settings.includeImgixJSClass) {
	        this.imgEl.classList.add('imgix-fluid');
	      }
	    }
	  }, {
	    key: '_updateCaption',
	    value: function _updateCaption() {
	      var captionAttr = this.settings.captionAttribute;
	      if (captionAttr) {
	        this.captionEl.innerText = this.settings.triggerEl.getAttribute(captionAttr);
	      }
	    }
	  }, {
	    key: '_updateImgSrc',
	    value: function _updateImgSrc() {
	      var imageURL = this.settings.triggerEl.getAttribute(this.settings.sourceAttribute);
	
	      if (!imageURL) {
	        throw new Error('No image URL was found in the ' + this.settings.sourceAttribute + ' attribute of the trigger.');
	      }
	
	      this.imgEl.setAttribute('src', imageURL);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      if (!this.elementBuilt) {
	        this._buildElement();
	        this.elementBuilt = true;
	      }
	
	      // Make sure to re-set the `img` `src`, in case it's been changed
	      // by someone/something else.
	      this._updateImgSrc();
	      this._updateCaption();
	
	      (0, _dom.addClasses)(this.el, this.openClasses);
	
	      this._sizeImgWrapperEl();
	      window.addEventListener('resize', this._sizeImgWrapperEl, false);
	
	      if (HAS_ANIMATION) {
	        this.el.addEventListener('animationend', this._completeOpen, false);
	        (0, _dom.addClasses)(this.el, this.openingClasses);
	      }
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      window.removeEventListener('resize', this._sizeImgWrapperEl, false);
	
	      if (HAS_ANIMATION) {
	        this.el.addEventListener('animationend', this._completeClose, false);
	        (0, _dom.addClasses)(this.el, this.closingClasses);
	      } else {
	        (0, _dom.removeClasses)(this.el, this.openClasses);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.settings.parentEl.removeChild(this.el);
	    }
	  }]);
	
	  return Lightbox;
	}();
	
	exports.default = Lightbox;
	
	},{"./util/dom":4,"./util/throwIfMissing":5}],2:[function(require,module,exports){
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp, _initialiseProps;
	
	var _dom = require('./util/dom');
	
	var _injectBaseStylesheet = require('./injectBaseStylesheet');
	
	var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);
	
	var _Lightbox = require('./Lightbox');
	
	var _Lightbox2 = _interopRequireDefault(_Lightbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = (_temp = _class = function () {
	  function Luminous(trigger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Luminous);
	
	    _initialiseProps.call(this);
	
	    this.isOpen = false;
	
	    this.trigger = trigger;
	
	    if (!(0, _dom.isDOMElement)(this.trigger)) {
	      throw new TypeError('`new Luminous` requires a DOM element as its first argument.');
	    }
	
	    // A bit unexpected if you haven't seen this pattern before.
	    // Based on the pattern here:
	    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
	    var _options$namespace = options.namespace;
	    var
	    // Prefix for generated element class names (e.g. `my-ns` will
	    // result in classes such as `my-ns-lightbox`. Default `lum-`
	    // prefixed classes will always be added as well.
	    namespace = _options$namespace === undefined ? null : _options$namespace;
	    var _options$sourceAttrib = options.sourceAttribute;
	    var
	    // Which attribute to pull the lightbox image source from.
	    sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
	    var _options$captionAttri = options.captionAttribute;
	    var
	    // Which attribute to pull the caption from, if any.
	    captionAttribute = _options$captionAttri === undefined ? null : _options$captionAttri;
	    var _options$openTrigger = options.openTrigger;
	    var
	    // The event to listen to on the _trigger_ element: triggers opening.
	    openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
	    var _options$closeTrigger = options.closeTrigger;
	    var
	    // The event to listen to on the _lightbox_ element: triggers closing.
	    closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
	    var _options$closeWithEsc = options.closeWithEscape;
	    var
	    // Allow closing by pressing escape.
	    closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
	    var _options$closeOnScrol = options.closeOnScroll;
	    var
	    // Automatically close when the page is scrolled.
	    closeOnScroll = _options$closeOnScrol === undefined ? false : _options$closeOnScrol;
	    var _options$appendToSele = options.appendToSelector;
	    var
	    // A selector defining what to append the lightbox element to.
	    appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
	    var _options$onOpen = options.onOpen;
	    var
	    // If present (and a function), this will be called
	    // whenever the lightbox is opened.
	    onOpen = _options$onOpen === undefined ? null : _options$onOpen;
	    var _options$onClose = options.onClose;
	    var
	    // If present (and a function), this will be called
	    // whenever the lightbox is closed.
	    onClose = _options$onClose === undefined ? null : _options$onClose;
	    var _options$includeImgix = options.includeImgixJSClass;
	    var
	    // When true, adds the `imgix-fluid` class to the `img`
	    // inside the lightbox. See https://github.com/imgix/imgix.js
	    // for more information.
	    includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
	    var _options$injectBaseSt = options.injectBaseStyles;
	    var
	    // Add base styles to the page. See the "Theming"
	    // section of README.md for more information.
	    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;
	
	
	    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, captionAttribute: captionAttribute, openTrigger: openTrigger, closeTrigger: closeTrigger, closeWithEscape: closeWithEscape, closeOnScroll: closeOnScroll, appendToSelector: appendToSelector, onOpen: onOpen, onClose: onClose, includeImgixJSClass: includeImgixJSClass, injectBaseStyles: injectBaseStyles };
	
	    if (this.settings.injectBaseStyles) {
	      (0, _injectBaseStylesheet2.default)();
	    }
	
	    this._buildLightbox();
	    this._bindEvents();
	  }
	
	  _createClass(Luminous, [{
	    key: '_buildLightbox',
	    value: function _buildLightbox() {
	      this.lightbox = new _Lightbox2.default({
	        namespace: this.settings.namespace,
	        parentEl: document.querySelector(this.settings.appendToSelector),
	        triggerEl: this.trigger,
	        sourceAttribute: this.settings.sourceAttribute,
	        captionAttribute: this.settings.captionAttribute,
	        includeImgixJSClass: this.settings.includeImgixJSClass
	      });
	    }
	  }, {
	    key: '_bindEvents',
	    value: function _bindEvents() {
	      this.trigger.addEventListener(this.settings.openTrigger, this.open, false);
	
	      if (this.settings.closeWithEscape) {
	        window.addEventListener('keyup', this._handleKeyup, false);
	      }
	    }
	  }, {
	    key: '_bindCloseEvent',
	    value: function _bindCloseEvent() {
	      this.lightbox.el.addEventListener(this.settings.closeTrigger, this.close, false);
	    }
	  }, {
	    key: '_unbindEvents',
	    value: function _unbindEvents() {
	      this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);
	      this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);
	
	      if (this.settings.closeWithEscape) {
	        window.removeEventListener('keyup', this._handleKeyup, false);
	      }
	    }
	  }]);
	
	  return Luminous;
	}(), _initialiseProps = function _initialiseProps() {
	  var _this = this;
	
	  this.VERSION = '0.2.6';
	
	  this.open = function (e) {
	    if (e && typeof e.preventDefault === 'function') {
	      e.preventDefault();
	    }
	
	    var previouslyBuilt = _this.lightbox.elementBuilt;
	
	    _this.lightbox.open();
	
	    if (!previouslyBuilt) {
	      _this._bindCloseEvent();
	    }
	
	    if (_this.settings.closeOnScroll) {
	      window.addEventListener('scroll', _this.close, false);
	    }
	
	    var onOpen = _this.settings.onOpen;
	    if (onOpen && typeof onOpen === 'function') {
	      onOpen();
	    }
	
	    _this.isOpen = true;
	  };
	
	  this.close = function (e) {
	    if (e && typeof e.preventDefault === 'function') {
	      e.preventDefault();
	    }
	
	    if (_this.settings.closeOnScroll) {
	      window.removeEventListener('scroll', _this.close, false);
	    }
	
	    _this.lightbox.close();
	
	    var onClose = _this.settings.onClose;
	    if (onClose && typeof onClose === 'function') {
	      onClose();
	    }
	
	    _this.isOpen = false;
	  };
	
	  this._handleKeyup = function (e) {
	    if (_this.isOpen && e.keyCode === 27) {
	      _this.close();
	    }
	  };
	
	  this.destroy = function () {
	    _this._unbindEvents();
	    _this.lightbox.destroy();
	  };
	}, _temp);
	
	},{"./Lightbox":1,"./injectBaseStylesheet":3,"./util/dom":4}],3:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = injectBaseStylesheet;
	var RULES = '\n@keyframes lum-noop {\n  0% { zoom: 1; }\n}\n\n.lum-lightbox {\n  position: fixed;\n  display: none;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.lum-lightbox.lum-open {\n  display: block;\n}\n\n.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {\n  animation: lum-noop 1ms;\n}\n\n.lum-lightbox-inner {\n  position: absolute;\n  top: 0%;\n  right: 0%;\n  bottom: 0%;\n  left: 0%;\n\n  overflow: hidden;\n}\n\n.lum-lightbox-loader {\n  display: none;\n}\n\n.lum-lightbox-inner img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.lum-lightbox-image-wrapper {\n  vertical-align: middle;\n  display: table-cell;\n  text-align: center;\n}\n';
	
	function injectBaseStylesheet() {
	  if (document.querySelector('.lum-base-styles')) {
	    return;
	  }
	
	  var styleEl = document.createElement('style');
	  styleEl.type = 'text/css';
	  styleEl.classList.add('lum-base-styles');
	
	  styleEl.appendChild(document.createTextNode(RULES));
	
	  var head = document.head;
	  head.insertBefore(styleEl, head.firstChild);
	}
	
	},{}],4:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.isDOMElement = isDOMElement;
	exports.addClasses = addClasses;
	exports.removeClasses = removeClasses;
	// This is not really a perfect check, but works fine.
	// From http://stackoverflow.com/questions/384286
	var HAS_DOM_2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';
	
	function isDOMElement(obj) {
	  return HAS_DOM_2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	}
	
	function addClasses(el, classNames) {
	  classNames.forEach(function (className) {
	    el.classList.add(className);
	  });
	}
	
	function removeClasses(el, classNames) {
	  classNames.forEach(function (className) {
	    el.classList.remove(className);
	  });
	}
	
	},{}],5:[function(require,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = throwIfMissing;
	function throwIfMissing() {
	  throw new Error('Missing parameter');
	}
	
	},{}]},{},[2])(2)
	});

/***/ },

/***/ 356:
/***/ function(module, exports) {

	module.exports = "@font-face {\n\tfont-family:\"TeXGyreAdventor\";\n\tsrc:url(\"./fnt/texgyreadventor-regular.woff\") format(\"woff\"),url(\"./fnt/texgyreadventor-regular.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"Droid-sans\";\n\tsrc:url(\"./fnt/DroidSans.ttf\") format(\"truetype\"),url(\"./fnt/DroidSans-Bold.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"steinemu\";\n\tsrc:url(\"./fnt/STEINEMU.ttf\") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n\n@media (max-width: 750px) {\n\t.row {\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-flex-direction: column;\n\t\t    -ms-flex-direction: column;\n\t\t        flex-direction: column;\n\t}\n\t.row > * {\n\t\tmargin: 10 auto 0 auto !important;\n\t}\n\n\n\tsection {\n\t\theight: auto !important;\n\t\tpadding: 15px;\n\t}\n\n\n\tsection > .content .full-image {\n\t\theight: 50% !important;\n\n\t\t/*width: 100% !important;*/\n\t}\n\n}\n\n@media (max-height: 900px) {\n\tsection {\n\t\theight: auto !important;\n\t\tpadding: 15px;\n\t}\n}\n\n/*  \n@media (max-width: 1350px) {\n\t.vid-box {\n\n\t}\n} */\n@-webkit-keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n@keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@-webkit-keyframes float-small{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -5px);\n\t\t        transform: translate(0, -5px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@keyframes float-small{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -5px);\n\t\t        transform: translate(0, -5px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -0px);\n\t\t        transform: translate(0, -0px);\n\n\t}\n}\n\n@-webkit-keyframes sprite{\n  from { background-position:0 0%; }\n  to { background-position:0 100%; }\n}\n\n@keyframes sprite{\n  from { background-position:0 0%; }\n  to { background-position:0 100%; }\n}\n\nbody {\n\twidth: 100%;\n\tmargin: 0px;\n\tpadding: 0px;\n\tfont-family: Helvetica; \n}\n\n\nsection {\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 50vh;\n\t-webkit-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\tposition: relative;\n\tfont-size: 1.1em;\n\tbackground-color: #00AFEF; \n\tcolor: white;\n}\n\n\nsection > .content.show {\n\topacity: 1 !important;\n}\n\n\nsection > .content {\n\n\t/*background-color: white;*/\n\n\t/* border-top: 2px solid black;\n\t\tborder-bottom: 2px solid black; */\n\tmargin: auto;\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1 1;\n\t    -ms-flex: 1 1;\n\t        flex: 1 1;\n\ttext-align: center;\n\t-webkit-transition:opacity 1.5s;\n\ttransition: opacity 1.5s;\n}\n\n\nsection > .content .icon {\n\theight: 35vh;\n\twidth: 35vh;\n\tdisplay: inline-block;\n\tmargin-right: 10px;\n\t-webkit-transition:opacity 0.5s;\n\ttransition: opacity 0.5s\n}\n\n\nsection > .content .icon.animated {\n\t-webkit-animation:sprite 1.5s steps(26) infinite;\n\t        animation:sprite 1.5s steps(26) infinite;\n\t-webkit-transform:translateX(0px);\n\t        transform:translateX(0px);\n}\n\n\nsection > .content .full-image {\n\theight: 100%;\n\t-webkit-animation-name: float-small;\n\t        animation-name: float-small;\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-duration: 3s;\n\t        animation-duration: 3s;\n\t-webkit-animation-timing-function: ease-in-out;\n\t        animation-timing-function: ease-in-out;\n}\n\n\nsection > .content h1 {\n\tfont-size: 3em;\n\tfont-family: steinemu;\n\tletter-spacing: 2px;\n}\n\n\nsection > .content h2 {\n\ttext-shadow: 0 0 3px #000;\n}\n\n\nsection > .content > .row {\n\tmargin: 0 10% 0 10%;\n}\n\n\nsection > .content > .row > .icon {\n\n\t/* flex: 1; */\n}\n\n\nsection > .content > .row > p {\n\tfont-size: 1.1em;\n\t-webkit-box-flex: 5;\n\t-webkit-flex: 5;\n\t    -ms-flex: 5;\n\t        flex: 5;\n\t-webkit-align-self: center;\n\t    -ms-flex-item-align: center;\n\t        align-self: center;\n\ttext-align: left;\n\ttext-shadow: 0 0 3px #000;\n\tletter-spacing: 1px;\n}\n\n\nsection > .content > .row.wrap {\n\t-webkit-flex-wrap:wrap;\n\t    -ms-flex-wrap:wrap;\n\t        flex-wrap:wrap;\n}\n\n\nsection.paralax {\n\tmin-height:500px;\n\tbackground-image:url(\"./img/Background.jpg\");\n\tbackground-position:center;\n\tbackground-repeat:no-repeat;\n\tbackground-attachment:fixed;\n\tbackground-size:cover;\n}\n\n\nsection.paralax h1 {\n\t-webkit-animation-name:float;\n\t        animation-name:float;\n\t-webkit-animation-iteration-count:infinite;\n\t        animation-iteration-count:infinite;\n\t-webkit-animation-duration:3s;\n\t        animation-duration:3s;\n\t-webkit-animation-timing-function:ease-in-out;\n\t        animation-timing-function:ease-in-out;\n}\n\n\n#flexibility .icon {\n\tbackground:  url(\"./img/home_page/guvkavost_sprite.png\");\n\tbackground-size: 100%;\n}\n\n.row {\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t-webkit-justify-content: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.row > * {}\n\na {\n\tcolor: blue;\n\tcursor: pointer;\n}\n\n.static > * {\n\tposition: fixed;\n}\n\n.static > #to-game {\n\tright: 50px;\n\tbottom: -34px;\n\tpadding: 6px 12px 6px 12px;\n\tdisplay: block;\n\tfont-size: 1.2em;\n\tcolor: #444;\n\tbackground-color: #0096CC;\n\t-webkit-transition:color 0.1s;\n\ttransition: color 0.1s;\n\ttext-decoration: none;\n\n\t/* border-bottom: 2px black solid; */\n\t-webkit-perspective: 800px;\n\t        perspective: 800px;\n\t-webkit-transition:all 0.5s;\n\ttransition: all 0.5s;\n\topacity: 0;\n\tfont-weight: bold\n}\n\n.static > #to-game.show {\n\tbottom:40px;\n\topacity:1;\n}\n\n.static > #to-game:hover {\n\tcolor:white;\n}\n\n.static > #to-game:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.static > #to-game:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n.static .vid-box\n\t{\n\ttop: 50vh;\n\t-webkit-transform: translateY(-22.5vw);\n\t        transform: translateY(-22.5vw);\n\tleft: 10vw;\n\twidth: 80vw;\n\topacity: 0;\n\tdisplay: none\n}\n\n.static .vid-box.display {\n\tdisplay:block;\n}\n\n.static .vid-box.show {\n\topacity:1;\n}\n\n.static #close {\n\ttop: calc(50vh - 22.5vw - 80px);\n\tright: 10vw;\n\t-webkit-transform: translateX(94px) scale(0.2, 0.2);\n\t        transform: translateX(94px) scale(0.2, 0.2);\n\tbackground-color: #444;\n\n\t/* transform: translateX(80px) translateY(-22.5vw) translateY(-80px) scale(0.5, 0.5); */\n\tborder-radius: 80px;\n\tdisplay: none\n}\n\n.static #close:hover {\n\tbackground-color:#bbb;\n}\n\n.static #close.show {\n\tdisplay:block;\n}\n\n\n.thumb {\n\theight: 200px;\n\tmargin: 10px;\n\tcursor: pointer;\n}\n\n#landing {\n\theight: 100vh !important;\n}\n\n#landing > .content {\n\topacity: 0;\n}\n\n#landing a {\n\tdisplay: block;\n\tposition: absolute;\n\tmargin: 0px;\n\t-webkit-transform: rotate(180deg);\n\t        transform: rotate(180deg);\n\tbottom: 0px;\n\tleft: calc(50% - 80px);\n\tcursor: pointer;\n}\n\n/* transition: all .3s; */\n\n#landing a img {\n\tz-index: 11;\n\t-webkit-transition:all .3s;\n\ttransition: all .3s;\n\n\t/* \t\t\twidth: 160px;\n\t\t\theight: 160px; */\n}\n\n/* left: calc(50% - 90px); */\n\n#landing a:hover img {\n\n\t/* \t\t\twidth: 180px;\n\t\t\theight: 180px; */\n\t-webkit-transform: scale(1.3);\n\t        transform: scale(1.3);\n}\n\n/*#logo {\n\t\tposition: absolute;\n\t\ttop: calc(50vh - 720px/2);\n\t\tleft: calc(50vw - 1280px/2);\n\t}\n*/\n\n#landing #logo {\n\tposition: absolute;\n\ttop: 50vh;\n\t-webkit-transform: translate(-640px, -360px) scale(1);\n\t        transform: translate(-640px, -360px) scale(1);\n\tleft: 50vw;\n\t-webkit-transition:all .5s;\n\ttransition: all .5s;\n\tz-index: -1;\n}\n\n#landing #logo.hidden {\n\t-webkit-transform: translate(-640px, -360px) scale(0);\n\t        transform: translate(-640px, -360px) scale(0);\n}\n\n#landing h1, #landing h2{\n\tfont-family: steinemu, Verdana, sans-serif;\n\tcolor: white;\n\tz-index: 10;\n}\n\n#landing h1 {\n\tfont-size: 4em;\n\tmargin: 0px;\n\t-webkit-animation-name: float;\n\t        animation-name: float;\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-duration: 3s;\n\t        animation-duration: 3s;\n\t-webkit-animation-timing-function: ease-in-out;\n\t        animation-timing-function: ease-in-out;\n}\n\n#landing h2 {}\n\n.button {\n\tfont-weight: bold;\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor, Verdana, sans-serif;\n\tfont-size: 2em;\n}\n\n.button:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.button-small {\n\n\tfont-size: 1em;\n\twidth: 200px;\n\n}\n\n.button-large {\n\tfont-size: 1.5em;\n\twidth: 300px;\n\n}\n\n.button-slide {\n\ttext-decoration: inherit;\n\ttext-align: center;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground-color: #0096CC;\n\t/*background: none;*/\n\tposition: relative;\n\tz-index: 1;\n\tbackground-image: -webkit-linear-gradient(#444, #444);\n\tbackground-image: linear-gradient(#444, #444);\n\tbackground-position: 50% 50%;\n\tbackground-size: 100% 0%;\n\tbackground-repeat: no-repeat;\n\t-webkit-transition:background-size .3s, color .3s;\n\ttransition: background-size .3s, color .3s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\tfont-weight: bold;\n}\n\na {\n\tcolor: #000;\n\ttext-shadow: none;\n}\n\n\n.button-slide:hover{\n\tbackground-size: 100% 100%;\n\tcolor: #FFF;\n}\n\n\n.button-black {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n.button-black:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.text {\n\tbackground-color: blue;\n}\n\n.button-3d {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\t-webkit-perspective: 800px;\n\t        perspective: 800px\n}\n\n.button-3d:hover {\n\tcolor:white;\n}\n\n.button-3d:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.button-3d:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n.button-3d:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n\n\n#sources {\n\tdisplay: none;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t-webkit-flex-direction: column;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n}\n\n\n\n\n#sources > * {\n\ttext-align: left;\n\tmargin: auto;\n\t-webkit-box-flex:1;\n\t-webkit-flex:1;\n\t    -ms-flex:1;\n\t        flex:1;\n}\n\n\n\n\n/*\n Luminous css\n*/\n\n@-webkit-keyframes lum-fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n@keyframes lum-fade {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n@-webkit-keyframes lum-fadeZoom {\n  0% { -webkit-transform: scale(0.5); transform: scale(0.5); opacity: 0; }\n  100% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; }\n}\n\n@keyframes lum-fadeZoom {\n  0% { -webkit-transform: scale(0.5); transform: scale(0.5); opacity: 0; }\n  100% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; }\n}\n\n@-webkit-keyframes lum-loader-rotate {\n  0% { -webkit-transform: translate(-50%, -50%) rotate(0); transform: translate(-50%, -50%) rotate(0); }\n  50% { -webkit-transform: translate(-50%, -50%) rotate(-180deg); transform: translate(-50%, -50%) rotate(-180deg); }\n  100% { -webkit-transform: translate(-50%, -50%) rotate(-360deg); transform: translate(-50%, -50%) rotate(-360deg); }\n}\n\n@keyframes lum-loader-rotate {\n  0% { -webkit-transform: translate(-50%, -50%) rotate(0); transform: translate(-50%, -50%) rotate(0); }\n  50% { -webkit-transform: translate(-50%, -50%) rotate(-180deg); transform: translate(-50%, -50%) rotate(-180deg); }\n  100% { -webkit-transform: translate(-50%, -50%) rotate(-360deg); transform: translate(-50%, -50%) rotate(-360deg); }\n}\n\n@-webkit-keyframes lum-loader-before {\n  0% { -webkit-transform: scale(1); transform: scale(1); }\n  10% { -webkit-transform: scale(1.2) translateX(6px); transform: scale(1.2) translateX(6px); }\n  25% { -webkit-transform: scale(1.3) translateX(8px); transform: scale(1.3) translateX(8px); }\n  40% { -webkit-transform: scale(1.2) translateX(6px); transform: scale(1.2) translateX(6px); }\n  50% { -webkit-transform: scale(1); transform: scale(1); }\n  60% { -webkit-transform: scale(0.8) translateX(6px); transform: scale(0.8) translateX(6px); }\n  75% { -webkit-transform: scale(0.7) translateX(8px); transform: scale(0.7) translateX(8px); }\n  90% { -webkit-transform: scale(0.8) translateX(6px); transform: scale(0.8) translateX(6px); }\n  100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n\n@keyframes lum-loader-before {\n  0% { -webkit-transform: scale(1); transform: scale(1); }\n  10% { -webkit-transform: scale(1.2) translateX(6px); transform: scale(1.2) translateX(6px); }\n  25% { -webkit-transform: scale(1.3) translateX(8px); transform: scale(1.3) translateX(8px); }\n  40% { -webkit-transform: scale(1.2) translateX(6px); transform: scale(1.2) translateX(6px); }\n  50% { -webkit-transform: scale(1); transform: scale(1); }\n  60% { -webkit-transform: scale(0.8) translateX(6px); transform: scale(0.8) translateX(6px); }\n  75% { -webkit-transform: scale(0.7) translateX(8px); transform: scale(0.7) translateX(8px); }\n  90% { -webkit-transform: scale(0.8) translateX(6px); transform: scale(0.8) translateX(6px); }\n  100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n\n@-webkit-keyframes lum-loader-after {\n  0% { -webkit-transform: scale(1); transform: scale(1); }\n  10% { -webkit-transform: scale(1.2) translateX(-6px); transform: scale(1.2) translateX(-6px); }\n  25% { -webkit-transform: scale(1.3) translateX(-8px); transform: scale(1.3) translateX(-8px); }\n  40% { -webkit-transform: scale(1.2) translateX(-6px); transform: scale(1.2) translateX(-6px); }\n  50% { -webkit-transform: scale(1); transform: scale(1); }\n  60% { -webkit-transform: scale(0.8) translateX(-6px); transform: scale(0.8) translateX(-6px); }\n  75% { -webkit-transform: scale(0.7) translateX(-8px); transform: scale(0.7) translateX(-8px); }\n  90% { -webkit-transform: scale(0.8) translateX(-6px); transform: scale(0.8) translateX(-6px); }\n  100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n\n@keyframes lum-loader-after {\n  0% { -webkit-transform: scale(1); transform: scale(1); }\n  10% { -webkit-transform: scale(1.2) translateX(-6px); transform: scale(1.2) translateX(-6px); }\n  25% { -webkit-transform: scale(1.3) translateX(-8px); transform: scale(1.3) translateX(-8px); }\n  40% { -webkit-transform: scale(1.2) translateX(-6px); transform: scale(1.2) translateX(-6px); }\n  50% { -webkit-transform: scale(1); transform: scale(1); }\n  60% { -webkit-transform: scale(0.8) translateX(-6px); transform: scale(0.8) translateX(-6px); }\n  75% { -webkit-transform: scale(0.7) translateX(-8px); transform: scale(0.7) translateX(-8px); }\n  90% { -webkit-transform: scale(0.8) translateX(-6px); transform: scale(0.8) translateX(-6px); }\n  100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n\n.lum-lightbox {\n  background: rgba(0, 0, 0, 0.6);\n}\n\n.lum-lightbox-inner {\n  top: 2.5%;\n  right: 2.5%;\n  bottom: 2.5%;\n  left: 2.5%;\n}\n\n.lum-lightbox-inner img {\n  position: relative;\n    cursor: zoom-out;\n  \n}\n\n.lum-lightbox-inner .lum-lightbox-caption {\n  margin: 0 auto;\n  color: #fff;\n  max-width: 700px;\n  text-align: center;\n}\n\n.lum-lightbox-loader {\n  display: block;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 66px;\n  height: 20px;\n  -webkit-animation: lum-loader-rotate 1800ms infinite linear;\n          animation: lum-loader-rotate 1800ms infinite linear;\n}\n\n.lum-lightbox-loader:before, .lum-lightbox-loader:after {\n  content: \"\";\n  display: block;\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  top: 50%;\n  margin-top: -10px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.9);\n}\n\n.lum-lightbox-loader:before {\n  left: 0;\n  -webkit-animation: lum-loader-before 1800ms infinite linear;\n          animation: lum-loader-before 1800ms infinite linear;\n}\n\n.lum-lightbox-loader:after {\n  right: 0;\n  -webkit-animation: lum-loader-after 1800ms infinite linear;\n          animation: lum-loader-after 1800ms infinite linear;\n  -webkit-animation-delay: -900ms;\n          animation-delay: -900ms;\n}\n\n.lum-lightbox.lum-opening {\n  -webkit-animation: lum-fade 180ms ease-out;\n          animation: lum-fade 180ms ease-out;\n}\n\n.lum-lightbox.lum-opening .lum-lightbox-inner {\n  -webkit-animation: lum-fadeZoom 180ms ease-out;\n          animation: lum-fadeZoom 180ms ease-out;\n}\n\n.lum-lightbox.lum-closing {\n  -webkit-animation: lum-fade 300ms ease-in;\n          animation: lum-fade 300ms ease-in;\n  -webkit-animation-direction: reverse;\n          animation-direction: reverse;\n}\n\n.lum-lightbox.lum-closing .lum-lightbox-inner {\n  -webkit-animation: lum-fadeZoom 300ms ease-in;\n          animation: lum-fadeZoom 300ms ease-in;\n  -webkit-animation-direction: reverse;\n          animation-direction: reverse;\n}\n\n/* This media query makes screens less than 460px wide display in a \"fullscreen\"-esque mode. Users can then scroll around inside the lightbox to see the entire image. */\n@media (max-width: 460px) {\n  .lum-lightbox-image-wrapper {\n    display: block;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .lum-lightbox-caption {\n    width: 100%;\n    position: absolute;\n    bottom: 0;\n  }\n\n  .lum-lightbox-inner img {\n    max-width: none;\n    max-height: none;\n    display: block;\n  }\n}\n"

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(356);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(144)(content, {});
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

/***/ }

});
//# sourceMappingURL=main.bundle.js.map