webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _from = __webpack_require__(244);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _scrollTo = __webpack_require__(243);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(506);
	
	__webpack_require__(502);
	// found that code on github
	
	
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
	
	var icons = (0, _from2.default)(document.getElementsByClassName("icon"));
	
	(0, _from2.default)(document.getElementsByClassName("paralax")).map(function (element, index) {
		return new Waypoint({
			element: element,
			handler: function handler() {
				icons[index].classList.add("show");
			},
			offset: 250
	
		});
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
	var aFunction = __webpack_require__(97);
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

/***/ 77:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a58fee717d107af8c4b9f75f48d68f67.jpg";

/***/ },

/***/ 97:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 98:
/***/ function(module, exports) {

	module.exports = {};

/***/ },

/***/ 99:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 100:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(55);

/***/ },

/***/ 147:
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },

/***/ 243:
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

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(252), __esModule: true };

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(278);
	__webpack_require__(272);
	module.exports = __webpack_require__(22).Array.from;

/***/ },

/***/ 257:
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

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(98)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },

/***/ 262:
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

/***/ 263:
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

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(99)
	  , $export        = __webpack_require__(41)
	  , redefine       = __webpack_require__(100)
	  , hide           = __webpack_require__(55)
	  , has            = __webpack_require__(54)
	  , Iterators      = __webpack_require__(98)
	  , $iterCreate    = __webpack_require__(263)
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

/***/ 265:
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

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(147)
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

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(147)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(257)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(98);
	module.exports = __webpack_require__(22).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(52)
	  , $export     = __webpack_require__(41)
	  , toObject    = __webpack_require__(57)
	  , call        = __webpack_require__(262)
	  , isArrayIter = __webpack_require__(260)
	  , toLength    = __webpack_require__(270)
	  , getIterFn   = __webpack_require__(271);
	$export($export.S + $export.F * !__webpack_require__(265)(function(iter){ Array.from(iter); }), 'Array', {
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

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(269)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(264)(String, 'String', function(iterated){
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

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(102)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n\tfont-family:\"TeXGyreAdventor\";\n\tsrc:url(" + __webpack_require__(315) + ") format(\"woff\"),url(" + __webpack_require__(314) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"Droid-sans\";\n\tsrc:url(" + __webpack_require__(312) + ") format(\"truetype\"),url(" + __webpack_require__(311) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"steinemu\";\n\tsrc:url(" + __webpack_require__(313) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n\n@media (max-width: 1000px) {\n\t.row {\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-flex-direction: column;\n\t\t    -ms-flex-direction: column;\n\t\t        flex-direction: column;\n\t}\n\t.row > * {\n\t\tmargin: 10 auto 0 auto !important;\n\t}\n}\n\n@-webkit-keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -px);\n\t\t        transform: translate(0, -px);\n\n\t}\n}\n\n@keyframes float{\n\tfrom {\n\t\t-webkit-transform: translate(0, 0px);\n\t\t        transform: translate(0, 0px);\n\t}\n\t65% {\n\t\t-webkit-transform: translate(0, -10px);\n\t\t        transform: translate(0, -10px);\n\t}\n\tto {\n\t\t-webkit-transform: translate(0, -px);\n\t\t        transform: translate(0, -px);\n\n\t}\n}\n\nbody {\n\twidth: 100%;\n\tmargin: 0px;\n\tpadding: 0px;\n\tfont-family: Helvetica; \n}\n\n\nsection {\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 50vh;\n\t-webkit-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\tposition: relative;\n\tfont-size: 1.1em;\n\tbackground-color: #00AFEF; \n\tcolor: white;\n}\n\n\nsection > .content.show {\n\topacity: 1 !important;\n}\n\n\nsection > .content {\n\n\n\t\n\n\t/*background-color: white;*/\n\n\n\t\n\n\t/* border-top: 2px solid black;\n\t\tborder-bottom: 2px solid black; */\n\tmargin: auto;\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1 1;\n\t    -ms-flex: 1 1;\n\t        flex: 1 1;\n\ttext-align: center;\n\t-webkit-transition:opacity 1.5s;\n\ttransition: opacity 1.5s;\n}\n\n\nsection > .content .icon {\n\theight: 30vh;\n\tdisplay: inline-block;\n\tmargin-right: 10px;\n\topacity: 0;\n\t-webkit-transition:opacity 0.5s;\n\ttransition: opacity 0.5s;\n}\n\n\nsection > .content .icon.show {\n\topacity: 1  !important;\n}\n\n\nsection > .content h1 {\n\tfont-size: 3em;\n\tfont-family: steinemu;\n\tletter-spacing: 2px;\n}\n\n\nsection > .content > .row {\n\tmargin: 0 10% 0 10%;\n}\n\n\nsection > .content > .row > .icon {\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1;\n\t    -ms-flex: 1;\n\t        flex: 1;\n}\n\n\nsection > .content > .row > p {\n\tfont-size: 1.1em;\n\t-webkit-box-flex: 5;\n\t-webkit-flex: 5;\n\t    -ms-flex: 5;\n\t        flex: 5;\n\t-webkit-align-self: center;\n\t    -ms-flex-item-align: center;\n\t        align-self: center;\n\ttext-align: left;\n}\n\n\nsection.paralax {\n\tmin-height:500px;\n\tbackground-image:url(" + __webpack_require__(77) + ");\n\tbackground-position:center;\n\tbackground-repeat:no-repeat;\n\tbackground-attachment:fixed;\n\tbackground-size:cover;\n}\n\n\nsection.paralax h1 {\n\t-webkit-animation-name:float;\n\t        animation-name:float;\n\t-webkit-animation-iteration-count:infinite;\n\t        animation-iteration-count:infinite;\n\t-webkit-animation-duration:3s;\n\t        animation-duration:3s;\n\t-webkit-animation-timing-function:ease-in-out;\n\t        animation-timing-function:ease-in-out;\n}\n\n.row {\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t-webkit-justify-content: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n.row > * {}\n\na {\n\tcolor: blue;\n}\n\n.static > * {\n\tposition: fixed;\n}\n\n.static > #to-game {\n\tright: 50px;\n\tbottom: -34px;\n\tpadding: 6px 12px 6px 12px;\n\tdisplay: block;\n\tfont-size: 1.2em;\n\tcolor: #444;\n\tbackground-color: #0096CC;\n\t-webkit-transition:color 0.1s;\n\ttransition: color 0.1s;\n\ttext-decoration: none;\n\n\n\t\n\n\t/* border-bottom: 2px black solid; */\n\t-webkit-perspective: 800px;\n\t        perspective: 800px;\n\t-webkit-transition:all 0.5s;\n\ttransition: all 0.5s;\n\topacity: 0;\n\tfont-weight: bold\n}\n\n.static > #to-game.show {\n\tbottom:40px;\n\topacity:1;\n}\n\n.static > #to-game:hover {\n\tcolor:white;\n}\n\n.static > #to-game:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\n\t\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.static > #to-game:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n\n\n#landing {\n\theight: 100vh;\n\n\tbackground-image: url(" + __webpack_require__(77) + ");\n\tbackground-attachment: fixed;\n\tposition: relative;\n\n\n\t\n\n/*.button:before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\tbackground: white;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 100%;\n\t\tz-index: -1;\n\t\ttransition: top 0.09s ease-in;\n\t}\n\n\t.button:hover:before {\n\t\ttop: 0;\n\n\t}\t */\n\n}\n\n\n\n#landing > .content {\n\topacity: 0;\n}\n\n\n\n#landing a {\n\tdisplay: block;\n\tposition: absolute;\n\tmargin: 0px;\n\t-webkit-transform: rotate(180deg);\n\t        transform: rotate(180deg);\n\tbottom: 0px;\n\tleft: calc(50% - 80px);\n\tcursor: hand;\n}\n\n\n\n/* transition: all .3s; */\n\n\n\n#landing a img {\n\tz-index: 11;\n\t-webkit-transition:all .3s;\n\ttransition: all .3s;\n\n\n\t\n\n\t/* \t\t\twidth: 160px;\n\t\t\theight: 160px; */\n}\n\n\n\n/* left: calc(50% - 90px); */\n\n\n\n#landing a:hover img {\n\n\n\t\n\n\t/* \t\t\twidth: 180px;\n\t\t\theight: 180px; */\n\t-webkit-transform: scale(1.3);\n\t        transform: scale(1.3);\n}\n\n\n\n/*#logo {\n\t\tposition: absolute;\n\t\ttop: calc(50vh - 720px/2);\n\t\tleft: calc(50vw - 1280px/2);\n\t}\n*/\n\n\n\n#landing #logo {\n\tposition: absolute;\n\ttop: 50vh;\n\t-webkit-transform: translate(-640px, -360px) scale(1);\n\t        transform: translate(-640px, -360px) scale(1);\n\tleft: 50vw;\n\t-webkit-transition:all .5s;\n\ttransition: all .5s;\n\tz-index: -1;\n}\n\n\n\n#landing #logo.hidden {\n\t-webkit-transform: translate(-640px, -360px) scale(0);\n\t        transform: translate(-640px, -360px) scale(0);\n}\n\n\n\n#landing h1, #landing h2{\n\tfont-family: steinemu, Verdana, sans-serif;\n\tcolor: white;\n\tz-index: 10;\n}\n\n\n\n#landing h1 {\n\tfont-size: 4em;\n\tmargin: 0px;\n\t-webkit-animation-name: float;\n\t        animation-name: float;\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-duration: 3s;\n\t        animation-duration: 3s;\n\t-webkit-animation-timing-function: ease-in-out;\n\t        animation-timing-function: ease-in-out;\n}\n\n\n\n#landing h2 {}\n\n.button {\n\tfont-weight: bold;\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor, Verdana, sans-serif;\n\tfont-size: 2em;\n}\n\n.button:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.button-small {\n\tfont-size: 1em;\n\twidth: 200px;\n\n}\n\n.button-large {\n\tfont-size: 1.5em;\n\twidth: 300px;\n\n}\n\n.button-slide {\n\ttext-decoration: inherit;\n\ttext-align: center;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\tbackground-image: -webkit-linear-gradient(#444, #444);\n\tbackground-image: linear-gradient(#444, #444);\n\tbackground-position: 50% 50%;\n\tbackground-size: 100% 0%;\n\tbackground-repeat: no-repeat;\n\t-webkit-transition:background-size .3s, color .3s;\n\ttransition: background-size .3s, color .3s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\tfont-weight: bold;\n}\n\n\n\n.button-slide:hover{\n\tbackground-size: 100% 100%;\n\tcolor: #FFF;\n}\n\n\n.button-black {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n.button-black:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n.text {\n\tbackground-color: blue;\n}\n\n.button-3d {\n\tfont-weight: bold;\n\tfont-size: 1.5em;\n\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: #444 3px solid;\n\tdisplay: inline-block;\n\twidth: 400px;\n\tcolor: #444;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\t-webkit-perspective: 800px;\n\t        perspective: 800px\n}\n\n.button-3d:hover {\n\tcolor:white;\n}\n\n.button-3d:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#444;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\n\n\t\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.button-3d:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n.button-3d:hover{\n\tbackground-color: #444;\n\tcolor: white;\n}\n\n\n\n\n#sources {\n\tdisplay: none;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t-webkit-flex-direction: column;\n\t    -ms-flex-direction: column;\n\t        flex-direction: column;\n}\n\n\n\n\n#sources > * {\n\ttext-align: left;\n\tmargin: auto;\n\t-webkit-box-flex:1;\n\t-webkit-flex:1;\n\t    -ms-flex:1;\n\t        flex:1;\n}", ""]);
	
	// exports


/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3c0f650c88f1dd66abf4e2d86b2789b8.ttf";

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9e94decf013d3e2c9adcc0b97cc5ce44.ttf";

/***/ },

/***/ 313:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "390ef8ff0d2550015fc505dc88ba6a71.ttf";

/***/ },

/***/ 314:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3a18a6db9f9af0992340589c30592a82.ttf";

/***/ },

/***/ 315:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aa28063bb43c617cef178a26a2fe9d42.woff";

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(281);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(142)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 506:
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