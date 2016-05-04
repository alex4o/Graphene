webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _scrollTo = __webpack_require__(236);
	
	var _scrollTo2 = _interopRequireDefault(_scrollTo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(492);
	
	__webpack_require__(488);
	// found that code on github
	
	
	// for eslint, couldn't find a way not to polute the environement
	
	var Waypoint = window.Waypoint;
	
	var arrow = document.getElementById("scroll-arrow");
	
	var info = document.getElementById("info");
	var landing = document.getElementById("landing");
	
	var to_game = document.getElementById("to-game");
	
	arrow.addEventListener("click", function () {
		(0, _scrollTo2.default)(window.innerHeight, 800);
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
	
	//smoothScroll.init()

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a58fee717d107af8c4b9f75f48d68f67.jpg";

/***/ },

/***/ 236:
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

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(85)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n\tfont-family:\"TeXGyreAdventor\";\n\tsrc:url(" + __webpack_require__(301) + ") format(\"woff\"),url(" + __webpack_require__(300) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"Droid-sans\";\n\tsrc:url(" + __webpack_require__(297) + ") format(\"truetype\"),url(" + __webpack_require__(296) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@font-face {\n\tfont-family:\"kelvinch\";\n\tsrc:url(" + __webpack_require__(299) + ") format(\"opentype\"),url(" + __webpack_require__(298) + ") format(\"opentype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n@media (max-width: 1000px) {\n\t.row {\n\t\t-webkit-box-orient: vertical;\n\t\t-webkit-box-direction: normal;\n\t\t-webkit-flex-direction: column;\n\t\t    -ms-flex-direction: column;\n\t\t        flex-direction: column;\n\t}\n\t.row > * {\n\t\tmargin: 10 auto 0 auto !important;\n\t}\n}\n\n\nbody {\n\twidth: 100%;\n\tmargin: 0px;\n\tpadding: 0px;\n\tfont-family: kelvinch; \n\n}\n\n\nsection {\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\theight: 80vh;\n\t-webkit-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\tposition: relative;\n}\n\n\nsection > .content {\n\t\n\n\t/*background-color: white;*/\n\t\n\n\t/* border-top: 2px solid black;\n\t\tborder-bottom: 2px solid black; */\n\tmargin: auto;\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1 1;\n\t    -ms-flex: 1 1;\n\t        flex: 1 1;\n\ttext-align: center;\n}\n\n\nsection > .content h1 {\n\tfont-size: 3em;\n}\n\n\nsection.paralax {\n\tbackground-image:url(" + __webpack_require__(63) + ");\n\tbackground-position:50% 50%;\n\tbackground-repeat:no-repeat;\n\tbackground-attachment:fixed;\n}\n\n\n\n.row {\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-pack: center;\n\t-webkit-justify-content: center;\n\t    -ms-flex-pack: center;\n\t        justify-content: center;\n}\n\n\n\n.row > * {}\n\na {\n\tcolor: black;\n}\n\n.static > * {\n\tposition: fixed;\n}\n\n.static > #to-game {\n\tright: 50px;\n\tbottom: -34px;\n\tpadding: 6px 12px 6px 12px;\n\tdisplay: block;\n\tfont-size: 1.2em;\n\tcolor: black;\n\t\n\n\t/* background-color: white; */\n\t-webkit-transition:color 0.1s;\n\ttransition: color 0.1s;\n\ttext-decoration: none;\n\tborder-bottom: 2px black solid;\n\t-webkit-perspective: 800px;\n\t        perspective: 800px;\n\t-webkit-transition:all 0.5s;\n\ttransition: all 0.5s;\n\topacity: 0\n}\n\n.static > #to-game.show {\n\tbottom:40px;\n\topacity:1;\n}\n\n.static > #to-game:before {\n\tcontent:\"\";\n\tposition:absolute;\n\tbackground:#CCC;\n\tbottom:0;\n\tleft:0;\n\tright:0;\n\ttop:0;\n\tz-index:-1;\n\t\n\n\t/* border-radius: 3px; */\n\t-webkit-transform:rotatex( 90deg );\n\t        transform:rotatex( 90deg );\n\t-webkit-transform-origin:bottom;\n\t        transform-origin:bottom;\n\t-webkit-transition:-webkit-transform 0.15s ease-in;\n\ttransition:-webkit-transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in;\n\ttransition:transform 0.15s ease-in, -webkit-transform 0.15s ease-in;\n}\n\n.static > #to-game:hover:before {\n\tright:0;\n\t-webkit-transform:rotatex( 0deg );\n\t        transform:rotatex( 0deg );\n}\n\n#landing {\n\theight: 100vh;\n\n\tbackground-image: url(" + __webpack_require__(63) + ");\n\tbackground-attachment: fixed;\n\t\n\n/*\t.button:before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\tbackground: white;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 100%;\n\t\tz-index: -1;\n\t\ttransition: top 0.09s ease-in;\n\t}\n\n\t.button:hover:before {\n\t\ttop: 0;\n\n\t} */\n\n}\n\n#landing img {\n\tmargin: 0px;\n\t-webkit-transform: rotate(180deg);\n\t        transform: rotate(180deg);\n\tposition: relative;\n\ttop: 20vh;\n}\n\n#landing h1, #landing h2{\n\tfont-family: kelvinch, Verdana, sans-serif;\n\tcolor: white;\n}\n\n#landing h1 {\n\tfont-size: 4em;\n\tmargin: 0px;\n}\n\n#landing h2 {}\n\n#landing .button {\n\tfont-weight: bold;\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: white 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: white;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n#landing .button:hover{\n\tbackground-color: #FFF;\n\tcolor: #000;\n}\n\n#landing .button-slide {\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: white 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: white;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\tbackground-image: -webkit-linear-gradient(white, white);\n\tbackground-image: linear-gradient(white, white);\n\tbackground-position: 50% 50%;\n\tbackground-size: 100% 0%;\n\tbackground-repeat: no-repeat;\n\t-webkit-transition:background-size .3s, color .3s;\n\ttransition: background-size .3s, color .3s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n#landing .button-slide:hover{\n\tbackground-size: 100% 100%;\n\tcolor: #000;\n}\n\n.text {\n\tbackground-color: blue;\n}\n", ""]);
	
	// exports


/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3c0f650c88f1dd66abf4e2d86b2789b8.ttf";

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9e94decf013d3e2c9adcc0b97cc5ce44.ttf";

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "78861df0f9b39d32783e34fc68f18281.otf";

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "efddca3b442e913818bed12a11e1ac55.otf";

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3a18a6db9f9af0992340589c30592a82.ttf";

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aa28063bb43c617cef178a26a2fe9d42.woff";

/***/ },

/***/ 488:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(266);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(125)(content, {});
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

/***/ 492:
/***/ function(module, exports) {

	/*!
	Waypoints - 4.0.0
	Copyright © 2011-2015 Caleb Troughton
	Licensed under the MIT license.
	https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
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