webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _paper = __webpack_require__(1);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _rx = __webpack_require__(2);
	
	var _rx2 = _interopRequireDefault(_rx);
	
	var _story = __webpack_require__(5);
	
	var _story2 = _interopRequireDefault(_story);
	
	var _kefir = __webpack_require__(13);
	
	var _kefir2 = __webpack_require__(14);
	
	var _kefir3 = _interopRequireDefault(_kefir2);
	
	var _ramda = __webpack_require__(11);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _ElementMutation = __webpack_require__(16);
	
	var _ElementMutation2 = _interopRequireDefault(_ElementMutation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.R = _ramda2.default;
	window.p = _paper2.default;
	
	__webpack_require__(17);
	
	_kefir.Kefir.Observable.prototype.pluck = function (prop) {
		return this.map(_ramda2.default.view(_ramda2.default.lensProp(prop)));
	};
	
	var story = new _story2.default();
	
	var canvas = null;
	var container = null;
	
	//var planet = null;
	var graphene = null;
	var carbon = null;
	
	var video = null;
	
	var gobjects = [];
	
	var talk_text = null;
	
	var font_size = 22;
	
	var g_text = null;
	var c_text = null;
	
	var timeout_id = 0;
	
	var main_button = null;
	
	var volume = new _kefir3.default(0.5);
	
	story.onBefore("end_true", function () {
	
		story.showDialogue = true;
	
		toggleCharacters(false);
		graphene.visible = true;
		talk_text.visible = true;
	
		graphene.setPosition(_paper2.default.view.center);
		talk_text.content = "А ти какво научи от всико това?";
		_paper2.default.view.update(true);
	});
	
	//gala --replace
	
	story.on("test", function () {
		window.location.href = "./test.html";
	});
	
	var resize = _kefir.Kefir.fromEvents(window, "resize").toProperty(function () {
		return null;
	}).map(function (e) {
		return { height: window.innerHeight, width: window.innerWidth };
	});
	
	var center = resize.map(function () {
		return _paper2.default.view.center;
	}).toProperty(function () {
		return _paper2.default.view.center;
	});
	
	function set(obj, prop) {
		return function (val) {
			obj[prop] = val;
		};
	}
	
	function toggleCharacters(val) {
		graphene.visible = val;
		carbon.visible = val;
		talk_text.visible = val;
		g_text.visible = val;
		c_text.visible = val;
		_paper2.default.view.draw();
		_paper2.default.view.update(true);
	}
	
	function calculateButtonSize(rect) {
		var res_rect = _ramda2.default.clone(rect);
		var margin = 10;
		res_rect.x -= margin / 2;
		res_rect.y -= margin / 2;
		res_rect.width += margin;
		res_rect.height += margin;
	
		return res_rect;
	}
	
	function showDialogue() {
		var choices = story.choices();
	
		if (_ramda2.default.isArrayLike(choices)) {
			var length;
	
			(function () {
				console.log(choices);
				length = choices.length;
	
				gobjects = [];
	
				var width = 0;
				gobjects = choices.map(function (choice, n) {
					var group = new _paper2.default.Group();
	
					var text = new _paper2.default.PointText({
						//	point: point,
						content: choice,
						fillColor: '#000080',
						fontFamily: 'Courier New',
						fontWeight: 'bold',
						fontSize: font_size,
						justification: "left"
					});
					text.onClick = function () {
						return window.next(n);
					};
	
					var button = main_button.clone();
					button.visible = true;
					button.setBounds(calculateButtonSize(text.bounds));
	
					group.addChild(button);
					group.addChild(text);
	
					width += group.getBounds().width;
	
					return group;
				});
	
				resize.onValue(function (size) {
					var rem = size.width - width;
					var padding = rem / (gobjects.length + 1);
					var cur = padding;
					for (var i = 0; i < gobjects.length; i++) {
						var group = gobjects[i];
						group.bounds.x = cur;
						group.bounds.y = size.height - 75;
	
						cur += group.bounds.width + padding;
					}
	
					_paper2.default.view.draw();
				});
	
				_paper2.default.view.draw();
			})();
		} else {
	
			talk_text.content = choices.who + ": " + choices.say;
			var len = choices.say.length;
			var t = 0;
			if (len < 10) {
				t = 5000;
			} else {
				t = len * 200;
			}
	
			timeout_id = setTimeout(function () {
				window.next();
			}, t);
		}
		_paper2.default.view.draw();
	}
	
	function show(current) {
		var video = story.current.video;
		if (video == current) {
			return video;
		} else {
			if (current) {
				console.log("Removeing: ", video);
				current.remove();
			}
		}
	
		video.addEventListener("ended", function () {
			return window.next();
		});
	
		container.appendChild(video);
		video.play();
		return video;
	}
	
	window.next = function (arg) {
		clearTimeout(timeout_id);
		if (story.hasChoices() && arg == null) {
			return;
		}
	
		gobjects.forEach(function (o) {
			return o.remove();
		});
	
		story.next(arg);
	
		if (story.hasDialogue()) {
	
			showDialogue();
			toggleCharacters(true);
		} else {
			toggleCharacters(false);
		}
		_paper2.default.view.update(true);
	
		video = show(video);
		video.volume = volume.get();
	
		console.log(video);
	};
	
	var volumeModifier = 0.05;
	
	window.addEventListener("load", function (event) {
		console.log("Loading");
	
		canvas = document.getElementById("drawSurf");
		container = document.getElementById("container");
	
		_kefir.Kefir.fromEvents(canvas, "mousewheel").map(function (e) {
			return e.wheelDelta < 0 ? -volumeModifier : volumeModifier;
		}).onValue(function (mod) {
			volume.modify(function (old) {
				var volume = old + mod;
				if (volume < 0) {
					volume = 0;
				} else if (volume > 1) {
					volume = 1;
				}
				return volume;
			});
		});
	
		_paper2.default.setup(canvas);
	
		volume.onValue(function (vol) {
			if (video != null) video.volume = vol;
		});
	
		resize.onValue(function (size) {
			canvas.width = size.width;
			canvas.height = size.height;
			_paper2.default.view.setViewSize(size.width, size.height);
	
			_paper2.default.view.draw();
			_paper2.default.view.update(true);
		});
	
		//planet = new paper.Raster("./mercury.png")
	
		graphene = new _paper2.default.Raster("./Graphene.png");
		carbon = new _paper2.default.Raster("./Carbon1.png");
		graphene.scale(-1, 1);
	
		resize.pluck("width").toProperty().map(function (v) {
			return v - 100;
		}).onValue(set(graphene.position, "x"));
		carbon.position.x = 100;
	
		carbon.scale(0.8, 0.8);
		graphene.scale(0.8, 0.8);
	
		talk_text = new _paper2.default.PointText({
			point: _paper2.default.view.center,
			//	content: choices.who +": "+ choices.say,
			fillColor: 'white',
			fontFamily: 'Courier New',
			fontWeight: 'bold',
			fontSize: font_size,
			justification: "center"
		});
	
		g_text = new _paper2.default.PointText({
			point: _paper2.default.view.center,
			content: "Графен",
			fillColor: 'white',
			fontFamily: 'Courier New',
			fontWeight: 'bold',
			fontSize: font_size,
			justification: "center"
		});
	
		c_text = new _paper2.default.PointText({
			point: _paper2.default.view.center,
			content: "Карбон",
			fillColor: 'white',
			fontFamily: 'Courier New',
			fontWeight: 'bold',
			fontSize: font_size,
			justification: "center"
		});
	
		talk_text.importSVG("button.svg", function (e) {
			main_button = e;
			main_button.visible = false;
		});
	
		resize.pluck("width").toProperty().map(function (v) {
			return v - 100;
		}).onValue(set(g_text.position, "x"));
	
		c_text.position.x = 100;
	
		center.onValue(function (center) {
			carbon.position.y = center.y - 100;
			graphene.position.y = center.y - 100;
			g_text.position.y = center.y + 200;
			c_text.position.y = center.y + 200;
		});
	
		center.map(function (point) {
			return new _paper2.default.Point(point.x, point.y * 2 - 100);
		}).onValue(set(talk_text, "point"));
	
		//planet.position = paper.view.center;
	
		_paper2.default.view.onMouseDown = function () {
			window.next();
		};
	
		//center.onValue(set(planet, "position"))
	
		video = show();
		toggleCharacters(false);
		console.log("Loaded");
	}, false);

/***/ },
/* 1 */
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, process) {// Copyright (c) Microsoft, All rights reserved. See License.txt in the project root for license information.
	
	;(function (undefined) {
	
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };
	
	  function checkGlobal(value) {
	    return (value && value.Object === Object) ? value : null;
	  }
	
	  var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType) ? exports : null;
	  var freeModule = (objectTypes[typeof module] && module && !module.nodeType) ? module : null;
	  var freeGlobal = checkGlobal(freeExports && freeModule && typeof global === 'object' && global);
	  var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	  var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	  var moduleExports = (freeModule && freeModule.exports === freeExports) ? freeExports : null;
	  var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	  var root = freeGlobal || ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) || freeSelf || thisGlobal || Function('return this')();
	
	  var Rx = {
	    internals: {},
	    config: {
	      Promise: root.Promise
	    },
	    helpers: { }
	  };
	
	  // Defaults
	  var noop = Rx.helpers.noop = function () { },
	    identity = Rx.helpers.identity = function (x) { return x; },
	    defaultNow = Rx.helpers.defaultNow = Date.now,
	    defaultComparer = Rx.helpers.defaultComparer = function (x, y) { return isEqual(x, y); },
	    defaultSubComparer = Rx.helpers.defaultSubComparer = function (x, y) { return x > y ? 1 : (x < y ? -1 : 0); },
	    defaultKeySerializer = Rx.helpers.defaultKeySerializer = function (x) { return x.toString(); },
	    defaultError = Rx.helpers.defaultError = function (err) { throw err; },
	    isPromise = Rx.helpers.isPromise = function (p) { return !!p && typeof p.subscribe !== 'function' && typeof p.then === 'function'; },
	    isFunction = Rx.helpers.isFunction = (function () {
	
	      var isFn = function (value) {
	        return typeof value == 'function' || false;
	      };
	
	      // fallback for older versions of Chrome and Safari
	      if (isFn(/x/)) {
	        isFn = function(value) {
	          return typeof value == 'function' && toString.call(value) == '[object Function]';
	        };
	      }
	
	      return isFn;
	    }());
	
	  function cloneArray(arr) { for(var a = [], i = 0, len = arr.length; i < len; i++) { a.push(arr[i]); } return a;}
	
	  var errorObj = {e: {}};
	  
	  function tryCatcherGen(tryCatchTarget) {
	    return function tryCatcher() {
	      try {
	        return tryCatchTarget.apply(this, arguments);
	      } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	      }
	    };
	  }
	
	  var tryCatch = Rx.internals.tryCatch = function tryCatch(fn) {
	    if (!isFunction(fn)) { throw new TypeError('fn must be a function'); }
	    return tryCatcherGen(fn);
	  };
	
	  function thrower(e) {
	    throw e;
	  }
	
	  Rx.config.longStackSupport = false;
	  var hasStacks = false, stacks = tryCatch(function () { throw new Error(); })();
	  hasStacks = !!stacks.e && !!stacks.e.stack;
	
	  // All code after this point will be filtered from stack traces reported by RxJS
	  var rStartingLine = captureLine(), rFileName;
	
	  var STACK_JUMP_SEPARATOR = 'From previous event:';
	
	  function makeStackTraceLong(error, observable) {
	    // If possible, transform the error stack trace by removing Node and RxJS
	    // cruft, then concatenating with the stack trace of `observable`.
	    if (hasStacks &&
	        observable.stack &&
	        typeof error === 'object' &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	      var stacks = [];
	      for (var o = observable; !!o; o = o.source) {
	        if (o.stack) {
	          stacks.unshift(o.stack);
	        }
	      }
	      stacks.unshift(error.stack);
	
	      var concatedStacks = stacks.join('\n' + STACK_JUMP_SEPARATOR + '\n');
	      error.stack = filterStackString(concatedStacks);
	    }
	  }
	
	  function filterStackString(stackString) {
	    var lines = stackString.split('\n'), desiredLines = [];
	    for (var i = 0, len = lines.length; i < len; i++) {
	      var line = lines[i];
	
	      if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	        desiredLines.push(line);
	      }
	    }
	    return desiredLines.join('\n');
	  }
	
	  function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
	    if (!fileNameAndLineNumber) {
	      return false;
	    }
	    var fileName = fileNameAndLineNumber[0], lineNumber = fileNameAndLineNumber[1];
	
	    return fileName === rFileName &&
	      lineNumber >= rStartingLine &&
	      lineNumber <= rEndingLine;
	  }
	
	  function isNodeFrame(stackLine) {
	    return stackLine.indexOf('(module.js:') !== -1 ||
	      stackLine.indexOf('(node.js:') !== -1;
	  }
	
	  function captureLine() {
	    if (!hasStacks) { return; }
	
	    try {
	      throw new Error();
	    } catch (e) {
	      var lines = e.stack.split('\n');
	      var firstLine = lines[0].indexOf('@') > 0 ? lines[1] : lines[2];
	      var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	      if (!fileNameAndLineNumber) { return; }
	
	      rFileName = fileNameAndLineNumber[0];
	      return fileNameAndLineNumber[1];
	    }
	  }
	
	  function getFileNameAndLineNumber(stackLine) {
	    // Named functions: 'at functionName (filename:lineNumber:columnNumber)'
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) { return [attempt1[1], Number(attempt1[2])]; }
	
	    // Anonymous functions: 'at filename:lineNumber:columnNumber'
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) { return [attempt2[1], Number(attempt2[2])]; }
	
	    // Firefox style: 'function@filename:lineNumber or @filename:lineNumber'
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) { return [attempt3[1], Number(attempt3[2])]; }
	  }
	
	  var EmptyError = Rx.EmptyError = function() {
	    this.message = 'Sequence contains no elements.';
	    Error.call(this);
	  };
	  EmptyError.prototype = Object.create(Error.prototype);
	  EmptyError.prototype.name = 'EmptyError';
	
	  var ObjectDisposedError = Rx.ObjectDisposedError = function() {
	    this.message = 'Object has been disposed';
	    Error.call(this);
	  };
	  ObjectDisposedError.prototype = Object.create(Error.prototype);
	  ObjectDisposedError.prototype.name = 'ObjectDisposedError';
	
	  var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function () {
	    this.message = 'Argument out of range';
	    Error.call(this);
	  };
	  ArgumentOutOfRangeError.prototype = Object.create(Error.prototype);
	  ArgumentOutOfRangeError.prototype.name = 'ArgumentOutOfRangeError';
	
	  var NotSupportedError = Rx.NotSupportedError = function (message) {
	    this.message = message || 'This operation is not supported';
	    Error.call(this);
	  };
	  NotSupportedError.prototype = Object.create(Error.prototype);
	  NotSupportedError.prototype.name = 'NotSupportedError';
	
	  var NotImplementedError = Rx.NotImplementedError = function (message) {
	    this.message = message || 'This operation is not implemented';
	    Error.call(this);
	  };
	  NotImplementedError.prototype = Object.create(Error.prototype);
	  NotImplementedError.prototype.name = 'NotImplementedError';
	
	  var notImplemented = Rx.helpers.notImplemented = function () {
	    throw new NotImplementedError();
	  };
	
	  var notSupported = Rx.helpers.notSupported = function () {
	    throw new NotSupportedError();
	  };
	
	  // Shim in iterator support
	  var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) ||
	    '_es6shim_iterator_';
	  // Bug for mozilla version
	  if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
	    $iterator$ = '@@iterator';
	  }
	
	  var doneEnumerator = Rx.doneEnumerator = { done: true, value: undefined };
	
	  var isIterable = Rx.helpers.isIterable = function (o) {
	    return o && o[$iterator$] !== undefined;
	  };
	
	  var isArrayLike = Rx.helpers.isArrayLike = function (o) {
	    return o && o.length !== undefined;
	  };
	
	  Rx.helpers.iterator = $iterator$;
	
	  var bindCallback = Rx.internals.bindCallback = function (func, thisArg, argCount) {
	    if (typeof thisArg === 'undefined') { return func; }
	    switch(argCount) {
	      case 0:
	        return function() {
	          return func.call(thisArg)
	        };
	      case 1:
	        return function(arg) {
	          return func.call(thisArg, arg);
	        };
	      case 2:
	        return function(value, index) {
	          return func.call(thisArg, value, index);
	        };
	      case 3:
	        return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	    }
	
	    return function() {
	      return func.apply(thisArg, arguments);
	    };
	  };
	
	  /** Used to determine if values are of the language type Object */
	  var dontEnums = ['toString',
	    'toLocaleString',
	    'valueOf',
	    'hasOwnProperty',
	    'isPrototypeOf',
	    'propertyIsEnumerable',
	    'constructor'],
	  dontEnumsLength = dontEnums.length;
	
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	var objectProto = Object.prototype,
	    hasOwnProperty = objectProto.hasOwnProperty,
	    objToString = objectProto.toString,
	    MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
	
	var keys = Object.keys || (function() {
	    var hasOwnProperty = Object.prototype.hasOwnProperty,
	        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
	        dontEnums = [
	          'toString',
	          'toLocaleString',
	          'valueOf',
	          'hasOwnProperty',
	          'isPrototypeOf',
	          'propertyIsEnumerable',
	          'constructor'
	        ],
	        dontEnumsLength = dontEnums.length;
	
	    return function(obj) {
	      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
	        throw new TypeError('Object.keys called on non-object');
	      }
	
	      var result = [], prop, i;
	
	      for (prop in obj) {
	        if (hasOwnProperty.call(obj, prop)) {
	          result.push(prop);
	        }
	      }
	
	      if (hasDontEnumBug) {
	        for (i = 0; i < dontEnumsLength; i++) {
	          if (hasOwnProperty.call(obj, dontEnums[i])) {
	            result.push(dontEnums[i]);
	          }
	        }
	      }
	      return result;
	    };
	  }());
	
	function equalObjects(object, other, equalFunc, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength !== othLength && !isLoose) {
	    return false;
	  }
	  var index = objLength, key;
	  while (index--) {
	    key = objProps[index];
	    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  var skipCtor = isLoose;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key],
	        result;
	
	    if (!(result === undefined ? equalFunc(objValue, othValue, isLoose, stackA, stackB) : result)) {
	      return false;
	    }
	    skipCtor || (skipCtor = key === 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    if (objCtor !== othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor === 'function' && objCtor instanceof objCtor &&
	          typeof othCtor === 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      return +object === +other;
	
	    case errorTag:
	      return object.name === other.name && object.message === other.message;
	
	    case numberTag:
	      return (object !== +object) ?
	        other !== +other :
	        object === +other;
	
	    case regexpTag:
	    case stringTag:
	      return object === (other + '');
	  }
	  return false;
	}
	
	var isObject = Rx.internals.isObject = function(value) {
	  var type = typeof value;
	  return !!value && (type === 'object' || type === 'function');
	};
	
	function isObjectLike(value) {
	  return !!value && typeof value === 'object';
	}
	
	function isLength(value) {
	  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
	}
	
	var isHostObject = (function() {
	  try {
	    Object({ 'toString': 0 } + '');
	  } catch(e) {
	    return function() { return false; };
	  }
	  return function(value) {
	    return typeof value.toString !== 'function' && typeof (value + '') === 'string';
	  };
	}());
	
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}
	
	var isArray = Array.isArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) === arrayTag;
	};
	
	function arraySome (array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function equalArrays(array, other, equalFunc, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength !== othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index],
	        result;
	
	    if (result !== undefined) {
	      if (result) {
	        continue;
	      }
	      return false;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isLoose) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB);
	          })) {
	        return false;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, isLoose, stackA, stackB))) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function baseIsEqualDeep(object, other, equalFunc, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag === argsTag) {
	      objTag = objectTag;
	    } else if (objTag !== objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag === argsTag) {
	      othTag = objectTag;
	    }
	  }
	  var objIsObj = objTag === objectTag && !isHostObject(object),
	      othIsObj = othTag === objectTag && !isHostObject(other),
	      isSameTag = objTag === othTag;
	
	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] === object) {
	      return stackB[length] === other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);
	
	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, isLoose, stackA, stackB);
	
	  stackA.pop();
	  stackB.pop();
	
	  return result;
	}
	
	function baseIsEqual(value, other, isLoose, stackA, stackB) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, isLoose, stackA, stackB);
	}
	
	var isEqual = Rx.internals.isEqual = function (value, other) {
	  return baseIsEqual(value, other);
	};
	
	  var hasProp = {}.hasOwnProperty,
	      slice = Array.prototype.slice;
	
	  var inherits = Rx.internals.inherits = function (child, parent) {
	    function __() { this.constructor = child; }
	    __.prototype = parent.prototype;
	    child.prototype = new __();
	  };
	
	  var addProperties = Rx.internals.addProperties = function (obj) {
	    for(var sources = [], i = 1, len = arguments.length; i < len; i++) { sources.push(arguments[i]); }
	    for (var idx = 0, ln = sources.length; idx < ln; idx++) {
	      var source = sources[idx];
	      for (var prop in source) {
	        obj[prop] = source[prop];
	      }
	    }
	  };
	
	  // Rx Utils
	  var addRef = Rx.internals.addRef = function (xs, r) {
	    return new AnonymousObservable(function (observer) {
	      return new BinaryDisposable(r.getDisposable(), xs.subscribe(observer));
	    });
	  };
	
	  function arrayInitialize(count, factory) {
	    var a = new Array(count);
	    for (var i = 0; i < count; i++) {
	      a[i] = factory();
	    }
	    return a;
	  }
	
	  function IndexedItem(id, value) {
	    this.id = id;
	    this.value = value;
	  }
	
	  IndexedItem.prototype.compareTo = function (other) {
	    var c = this.value.compareTo(other.value);
	    c === 0 && (c = this.id - other.id);
	    return c;
	  };
	
	  var PriorityQueue = Rx.internals.PriorityQueue = function (capacity) {
	    this.items = new Array(capacity);
	    this.length = 0;
	  };
	
	  var priorityProto = PriorityQueue.prototype;
	  priorityProto.isHigherPriority = function (left, right) {
	    return this.items[left].compareTo(this.items[right]) < 0;
	  };
	
	  priorityProto.percolate = function (index) {
	    if (index >= this.length || index < 0) { return; }
	    var parent = index - 1 >> 1;
	    if (parent < 0 || parent === index) { return; }
	    if (this.isHigherPriority(index, parent)) {
	      var temp = this.items[index];
	      this.items[index] = this.items[parent];
	      this.items[parent] = temp;
	      this.percolate(parent);
	    }
	  };
	
	  priorityProto.heapify = function (index) {
	    +index || (index = 0);
	    if (index >= this.length || index < 0) { return; }
	    var left = 2 * index + 1,
	        right = 2 * index + 2,
	        first = index;
	    if (left < this.length && this.isHigherPriority(left, first)) {
	      first = left;
	    }
	    if (right < this.length && this.isHigherPriority(right, first)) {
	      first = right;
	    }
	    if (first !== index) {
	      var temp = this.items[index];
	      this.items[index] = this.items[first];
	      this.items[first] = temp;
	      this.heapify(first);
	    }
	  };
	
	  priorityProto.peek = function () { return this.items[0].value; };
	
	  priorityProto.removeAt = function (index) {
	    this.items[index] = this.items[--this.length];
	    this.items[this.length] = undefined;
	    this.heapify();
	  };
	
	  priorityProto.dequeue = function () {
	    var result = this.peek();
	    this.removeAt(0);
	    return result;
	  };
	
	  priorityProto.enqueue = function (item) {
	    var index = this.length++;
	    this.items[index] = new IndexedItem(PriorityQueue.count++, item);
	    this.percolate(index);
	  };
	
	  priorityProto.remove = function (item) {
	    for (var i = 0; i < this.length; i++) {
	      if (this.items[i].value === item) {
	        this.removeAt(i);
	        return true;
	      }
	    }
	    return false;
	  };
	  PriorityQueue.count = 0;
	
	  /**
	   * Represents a group of disposable resources that are disposed together.
	   * @constructor
	   */
	  var CompositeDisposable = Rx.CompositeDisposable = function () {
	    var args = [], i, len;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      len = arguments.length;
	      args = new Array(len);
	      for(i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    this.disposables = args;
	    this.isDisposed = false;
	    this.length = args.length;
	  };
	
	  var CompositeDisposablePrototype = CompositeDisposable.prototype;
	
	  /**
	   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
	   * @param {Mixed} item Disposable to add.
	   */
	  CompositeDisposablePrototype.add = function (item) {
	    if (this.isDisposed) {
	      item.dispose();
	    } else {
	      this.disposables.push(item);
	      this.length++;
	    }
	  };
	
	  /**
	   * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
	   * @param {Mixed} item Disposable to remove.
	   * @returns {Boolean} true if found; false otherwise.
	   */
	  CompositeDisposablePrototype.remove = function (item) {
	    var shouldDispose = false;
	    if (!this.isDisposed) {
	      var idx = this.disposables.indexOf(item);
	      if (idx !== -1) {
	        shouldDispose = true;
	        this.disposables.splice(idx, 1);
	        this.length--;
	        item.dispose();
	      }
	    }
	    return shouldDispose;
	  };
	
	  /**
	   *  Disposes all disposables in the group and removes them from the group.
	   */
	  CompositeDisposablePrototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var len = this.disposables.length, currentDisposables = new Array(len);
	      for(var i = 0; i < len; i++) { currentDisposables[i] = this.disposables[i]; }
	      this.disposables = [];
	      this.length = 0;
	
	      for (i = 0; i < len; i++) {
	        currentDisposables[i].dispose();
	      }
	    }
	  };
	
	  /**
	   * Provides a set of static methods for creating Disposables.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   */
	  var Disposable = Rx.Disposable = function (action) {
	    this.isDisposed = false;
	    this.action = action || noop;
	  };
	
	  /** Performs the task of cleaning up resources. */
	  Disposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.action();
	      this.isDisposed = true;
	    }
	  };
	
	  /**
	   * Creates a disposable object that invokes the specified action when disposed.
	   * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
	   * @return {Disposable} The disposable object that runs the given action upon disposal.
	   */
	  var disposableCreate = Disposable.create = function (action) { return new Disposable(action); };
	
	  /**
	   * Gets the disposable that does nothing when disposed.
	   */
	  var disposableEmpty = Disposable.empty = { dispose: noop };
	
	  /**
	   * Validates whether the given object is a disposable
	   * @param {Object} Object to test whether it has a dispose method
	   * @returns {Boolean} true if a disposable object, else false.
	   */
	  var isDisposable = Disposable.isDisposable = function (d) {
	    return d && isFunction(d.dispose);
	  };
	
	  var checkDisposed = Disposable.checkDisposed = function (disposable) {
	    if (disposable.isDisposed) { throw new ObjectDisposedError(); }
	  };
	
	  var disposableFixup = Disposable._fixup = function (result) {
	    return isDisposable(result) ? result : disposableEmpty;
	  };
	
	  // Single assignment
	  var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SingleAssignmentDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SingleAssignmentDisposable.prototype.setDisposable = function (value) {
	    if (this.current) { throw new Error('Disposable has already been assigned'); }
	    var shouldDispose = this.isDisposed;
	    !shouldDispose && (this.current = value);
	    shouldDispose && value && value.dispose();
	  };
	  SingleAssignmentDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	      old && old.dispose();
	    }
	  };
	
	  // Multiple assignment disposable
	  var SerialDisposable = Rx.SerialDisposable = function () {
	    this.isDisposed = false;
	    this.current = null;
	  };
	  SerialDisposable.prototype.getDisposable = function () {
	    return this.current;
	  };
	  SerialDisposable.prototype.setDisposable = function (value) {
	    var shouldDispose = this.isDisposed;
	    if (!shouldDispose) {
	      var old = this.current;
	      this.current = value;
	    }
	    old && old.dispose();
	    shouldDispose && value && value.dispose();
	  };
	  SerialDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old = this.current;
	      this.current = null;
	    }
	    old && old.dispose();
	  };
	
	  var BinaryDisposable = Rx.BinaryDisposable = function (first, second) {
	    this._first = first;
	    this._second = second;
	    this.isDisposed = false;
	  };
	
	  BinaryDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      var old1 = this._first;
	      this._first = null;
	      old1 && old1.dispose();
	      var old2 = this._second;
	      this._second = null;
	      old2 && old2.dispose();
	    }
	  };
	
	  var NAryDisposable = Rx.NAryDisposable = function (disposables) {
	    this._disposables = disposables;
	    this.isDisposed = false;
	  };
	
	  NAryDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      for (var i = 0, len = this._disposables.length; i < len; i++) {
	        this._disposables[i].dispose();
	      }
	      this._disposables.length = 0;
	    }
	  };
	
	  /**
	   * Represents a disposable resource that only disposes its underlying disposable resource when all dependent disposable objects have been disposed.
	   */
	  var RefCountDisposable = Rx.RefCountDisposable = (function () {
	
	    function InnerDisposable(disposable) {
	      this.disposable = disposable;
	      this.disposable.count++;
	      this.isInnerDisposed = false;
	    }
	
	    InnerDisposable.prototype.dispose = function () {
	      if (!this.disposable.isDisposed && !this.isInnerDisposed) {
	        this.isInnerDisposed = true;
	        this.disposable.count--;
	        if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
	          this.disposable.isDisposed = true;
	          this.disposable.underlyingDisposable.dispose();
	        }
	      }
	    };
	
	    /**
	     * Initializes a new instance of the RefCountDisposable with the specified disposable.
	     * @constructor
	     * @param {Disposable} disposable Underlying disposable.
	      */
	    function RefCountDisposable(disposable) {
	      this.underlyingDisposable = disposable;
	      this.isDisposed = false;
	      this.isPrimaryDisposed = false;
	      this.count = 0;
	    }
	
	    /**
	     * Disposes the underlying disposable only when all dependent disposables have been disposed
	     */
	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed && !this.isPrimaryDisposed) {
	        this.isPrimaryDisposed = true;
	        if (this.count === 0) {
	          this.isDisposed = true;
	          this.underlyingDisposable.dispose();
	        }
	      }
	    };
	
	    /**
	     * Returns a dependent disposable that when disposed decreases the refcount on the underlying disposable.
	     * @returns {Disposable} A dependent disposable contributing to the reference count that manages the underlying disposable's lifetime.
	     */
	    RefCountDisposable.prototype.getDisposable = function () {
	      return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
	    };
	
	    return RefCountDisposable;
	  })();
	
	  function ScheduledDisposable(scheduler, disposable) {
	    this.scheduler = scheduler;
	    this.disposable = disposable;
	    this.isDisposed = false;
	  }
	
	  function scheduleItem(s, self) {
	    if (!self.isDisposed) {
	      self.isDisposed = true;
	      self.disposable.dispose();
	    }
	  }
	
	  ScheduledDisposable.prototype.dispose = function () {
	    this.scheduler.schedule(this, scheduleItem);
	  };
	
	  var ScheduledItem = Rx.internals.ScheduledItem = function (scheduler, state, action, dueTime, comparer) {
	    this.scheduler = scheduler;
	    this.state = state;
	    this.action = action;
	    this.dueTime = dueTime;
	    this.comparer = comparer || defaultSubComparer;
	    this.disposable = new SingleAssignmentDisposable();
	  };
	
	  ScheduledItem.prototype.invoke = function () {
	    this.disposable.setDisposable(this.invokeCore());
	  };
	
	  ScheduledItem.prototype.compareTo = function (other) {
	    return this.comparer(this.dueTime, other.dueTime);
	  };
	
	  ScheduledItem.prototype.isCancelled = function () {
	    return this.disposable.isDisposed;
	  };
	
	  ScheduledItem.prototype.invokeCore = function () {
	    return disposableFixup(this.action(this.scheduler, this.state));
	  };
	
	  /** Provides a set of static properties to access commonly used schedulers. */
	  var Scheduler = Rx.Scheduler = (function () {
	
	    function Scheduler() { }
	
	    /** Determines whether the given object is a scheduler */
	    Scheduler.isScheduler = function (s) {
	      return s instanceof Scheduler;
	    };
	
	    var schedulerProto = Scheduler.prototype;
	
	    /**
	   * Schedules an action to be executed.
	   * @param state State passed to the action to be executed.
	   * @param {Function} action Action to be executed.
	   * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	   */
	    schedulerProto.schedule = function (state, action) {
	      throw new NotImplementedError();
	    };
	
	  /**
	   * Schedules an action to be executed after dueTime.
	   * @param state State passed to the action to be executed.
	   * @param {Function} action Action to be executed.
	   * @param {Number} dueTime Relative time after which to execute the action.
	   * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	   */
	    schedulerProto.scheduleFuture = function (state, dueTime, action) {
	      var dt = dueTime;
	      dt instanceof Date && (dt = dt - this.now());
	      dt = Scheduler.normalize(dt);
	
	      if (dt === 0) { return this.schedule(state, action); }
	
	      return this._scheduleFuture(state, dt, action);
	    };
	
	    schedulerProto._scheduleFuture = function (state, dueTime, action) {
	      throw new NotImplementedError();
	    };
	
	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.now = defaultNow;
	
	    /** Gets the current time according to the local machine's system clock. */
	    Scheduler.prototype.now = defaultNow;
	
	    /**
	     * Normalizes the specified TimeSpan value to a positive value.
	     * @param {Number} timeSpan The time span value to normalize.
	     * @returns {Number} The specified TimeSpan value if it is zero or positive; otherwise, 0
	     */
	    Scheduler.normalize = function (timeSpan) {
	      timeSpan < 0 && (timeSpan = 0);
	      return timeSpan;
	    };
	
	    return Scheduler;
	  }());
	
	  var normalizeTime = Scheduler.normalize, isScheduler = Scheduler.isScheduler;
	
	  (function (schedulerProto) {
	
	    function invokeRecImmediate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      action(state, innerAction);
	      return group;
	
	      function innerAction(state2) {
	        var isAdded = false, isDone = false;
	
	        var d = scheduler.schedule(state2, scheduleWork);
	        if (!isDone) {
	          group.add(d);
	          isAdded = true;
	        }
	
	        function scheduleWork(_, state3) {
	          if (isAdded) {
	            group.remove(d);
	          } else {
	            isDone = true;
	          }
	          action(state3, innerAction);
	          return disposableEmpty;
	        }
	      }
	    }
	
	    function invokeRecDate(scheduler, pair) {
	      var state = pair[0], action = pair[1], group = new CompositeDisposable();
	      action(state, innerAction);
	      return group;
	
	      function innerAction(state2, dueTime1) {
	        var isAdded = false, isDone = false;
	
	        var d = scheduler.scheduleFuture(state2, dueTime1, scheduleWork);
	        if (!isDone) {
	          group.add(d);
	          isAdded = true;
	        }
	
	        function scheduleWork(_, state3) {
	          if (isAdded) {
	            group.remove(d);
	          } else {
	            isDone = true;
	          }
	          action(state3, innerAction);
	          return disposableEmpty;
	        }
	      }
	    }
	
	    /**
	     * Schedules an action to be executed recursively.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in recursive invocation state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursive = function (state, action) {
	      return this.schedule([state, action], invokeRecImmediate);
	    };
	
	    /**
	     * Schedules an action to be executed recursively after a specified relative or absolute due time.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Function} action Action to execute recursively. The last parameter passed to the action is used to trigger recursive scheduling of the action, passing in the recursive due time and invocation state.
	     * @param {Number | Date} dueTime Relative or absolute time after which to execute the action for the first time.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    schedulerProto.scheduleRecursiveFuture = function (state, dueTime, action) {
	      return this.scheduleFuture([state, action], dueTime, invokeRecDate);
	    };
	
	  }(Scheduler.prototype));
	
	  (function (schedulerProto) {
	
	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be scheduled using window.setInterval for the base implementation.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    schedulerProto.schedulePeriodic = function(state, period, action) {
	      if (typeof root.setInterval === 'undefined') { throw new NotSupportedError(); }
	      period = normalizeTime(period);
	      var s = state, id = root.setInterval(function () { s = action(s); }, period);
	      return disposableCreate(function () { root.clearInterval(id); });
	    };
	
	  }(Scheduler.prototype));
	
	  (function (schedulerProto) {
	    /**
	     * Returns a scheduler that wraps the original scheduler, adding exception handling for scheduled actions.
	     * @param {Function} handler Handler that's run if an exception is caught. The exception will be rethrown if the handler returns false.
	     * @returns {Scheduler} Wrapper around the original scheduler, enforcing exception handling.
	     */
	    schedulerProto.catchError = schedulerProto['catch'] = function (handler) {
	      return new CatchScheduler(this, handler);
	    };
	  }(Scheduler.prototype));
	
	  var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function () {
	    function createTick(self) {
	      return function tick(command, recurse) {
	        recurse(0, self._period);
	        var state = tryCatch(self._action)(self._state);
	        if (state === errorObj) {
	          self._cancel.dispose();
	          thrower(state.e);
	        }
	        self._state = state;
	      };
	    }
	
	    function SchedulePeriodicRecursive(scheduler, state, period, action) {
	      this._scheduler = scheduler;
	      this._state = state;
	      this._period = period;
	      this._action = action;
	    }
	
	    SchedulePeriodicRecursive.prototype.start = function () {
	      var d = new SingleAssignmentDisposable();
	      this._cancel = d;
	      d.setDisposable(this._scheduler.scheduleRecursiveFuture(0, this._period, createTick(this)));
	
	      return d;
	    };
	
	    return SchedulePeriodicRecursive;
	  }());
	
	  /** Gets a scheduler that schedules work immediately on the current thread. */
	   var ImmediateScheduler = (function (__super__) {
	    inherits(ImmediateScheduler, __super__);
	    function ImmediateScheduler() {
	      __super__.call(this);
	    }
	
	    ImmediateScheduler.prototype.schedule = function (state, action) {
	      return disposableFixup(action(this, state));
	    };
	
	    return ImmediateScheduler;
	  }(Scheduler));
	
	  var immediateScheduler = Scheduler.immediate = new ImmediateScheduler();
	
	  /**
	   * Gets a scheduler that schedules work as soon as possible on the current thread.
	   */
	  var CurrentThreadScheduler = (function (__super__) {
	    var queue;
	
	    function runTrampoline () {
	      while (queue.length > 0) {
	        var item = queue.dequeue();
	        !item.isCancelled() && item.invoke();
	      }
	    }
	
	    inherits(CurrentThreadScheduler, __super__);
	    function CurrentThreadScheduler() {
	      __super__.call(this);
	    }
	
	    CurrentThreadScheduler.prototype.schedule = function (state, action) {
	      var si = new ScheduledItem(this, state, action, this.now());
	
	      if (!queue) {
	        queue = new PriorityQueue(4);
	        queue.enqueue(si);
	
	        var result = tryCatch(runTrampoline)();
	        queue = null;
	        if (result === errorObj) { thrower(result.e); }
	      } else {
	        queue.enqueue(si);
	      }
	      return si.disposable;
	    };
	
	    CurrentThreadScheduler.prototype.scheduleRequired = function () { return !queue; };
	
	    return CurrentThreadScheduler;
	  }(Scheduler));
	
	  var currentThreadScheduler = Scheduler.currentThread = new CurrentThreadScheduler();
	
	  var scheduleMethod, clearMethod;
	
	  var localTimer = (function () {
	    var localSetTimeout, localClearTimeout = noop;
	    if (!!root.setTimeout) {
	      localSetTimeout = root.setTimeout;
	      localClearTimeout = root.clearTimeout;
	    } else if (!!root.WScript) {
	      localSetTimeout = function (fn, time) {
	        root.WScript.Sleep(time);
	        fn();
	      };
	    } else {
	      throw new NotSupportedError();
	    }
	
	    return {
	      setTimeout: localSetTimeout,
	      clearTimeout: localClearTimeout
	    };
	  }());
	  var localSetTimeout = localTimer.setTimeout,
	    localClearTimeout = localTimer.clearTimeout;
	
	  (function () {
	
	    var nextHandle = 1, tasksByHandle = {}, currentlyRunning = false;
	
	    clearMethod = function (handle) {
	      delete tasksByHandle[handle];
	    };
	
	    function runTask(handle) {
	      if (currentlyRunning) {
	        localSetTimeout(function () { runTask(handle); }, 0);
	      } else {
	        var task = tasksByHandle[handle];
	        if (task) {
	          currentlyRunning = true;
	          var result = tryCatch(task)();
	          clearMethod(handle);
	          currentlyRunning = false;
	          if (result === errorObj) { thrower(result.e); }
	        }
	      }
	    }
	
	    var reNative = new RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );
	
	    var setImmediate = typeof (setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' &&
	      !reNative.test(setImmediate) && setImmediate;
	
	    function postMessageSupported () {
	      // Ensure not in a worker
	      if (!root.postMessage || root.importScripts) { return false; }
	      var isAsync = false, oldHandler = root.onmessage;
	      // Test for async
	      root.onmessage = function () { isAsync = true; };
	      root.postMessage('', '*');
	      root.onmessage = oldHandler;
	
	      return isAsync;
	    }
	
	    // Use in order, setImmediate, nextTick, postMessage, MessageChannel, script readystatechanged, setTimeout
	    if (isFunction(setImmediate)) {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        setImmediate(function () { runTask(id); });
	
	        return id;
	      };
	    } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        process.nextTick(function () { runTask(id); });
	
	        return id;
	      };
	    } else if (postMessageSupported()) {
	      var MSG_PREFIX = 'ms.rx.schedule' + Math.random();
	
	      var onGlobalPostMessage = function (event) {
	        // Only if we're a match to avoid any other global events
	        if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
	          runTask(event.data.substring(MSG_PREFIX.length));
	        }
	      };
	
	      root.addEventListener('message', onGlobalPostMessage, false);
	
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        root.postMessage(MSG_PREFIX + currentId, '*');
	        return id;
	      };
	    } else if (!!root.MessageChannel) {
	      var channel = new root.MessageChannel();
	
	      channel.port1.onmessage = function (e) { runTask(e.data); };
	
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        channel.port2.postMessage(id);
	        return id;
	      };
	    } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {
	
	      scheduleMethod = function (action) {
	        var scriptElement = root.document.createElement('script');
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	
	        scriptElement.onreadystatechange = function () {
	          runTask(id);
	          scriptElement.onreadystatechange = null;
	          scriptElement.parentNode.removeChild(scriptElement);
	          scriptElement = null;
	        };
	        root.document.documentElement.appendChild(scriptElement);
	        return id;
	      };
	
	    } else {
	      scheduleMethod = function (action) {
	        var id = nextHandle++;
	        tasksByHandle[id] = action;
	        localSetTimeout(function () {
	          runTask(id);
	        }, 0);
	
	        return id;
	      };
	    }
	  }());
	
	  /**
	   * Gets a scheduler that schedules work via a timed callback based upon platform.
	   */
	   var DefaultScheduler = (function (__super__) {
	     inherits(DefaultScheduler, __super__);
	     function DefaultScheduler() {
	       __super__.call(this);
	     }
	
	     function scheduleAction(disposable, action, scheduler, state) {
	       return function schedule() {
	         disposable.setDisposable(Disposable._fixup(action(scheduler, state)));
	       };
	     }
	
	     function ClearDisposable(id) {
	       this._id = id;
	       this.isDisposed = false;
	     }
	
	     ClearDisposable.prototype.dispose = function () {
	       if (!this.isDisposed) {
	         this.isDisposed = true;
	         clearMethod(this._id);
	       }
	     };
	
	     function LocalClearDisposable(id) {
	       this._id = id;
	       this.isDisposed = false;
	     }
	
	     LocalClearDisposable.prototype.dispose = function () {
	       if (!this.isDisposed) {
	         this.isDisposed = true;
	         localClearTimeout(this._id);
	       }
	     };
	
	    DefaultScheduler.prototype.schedule = function (state, action) {
	      var disposable = new SingleAssignmentDisposable(),
	          id = scheduleMethod(scheduleAction(disposable, action, this, state));
	      return new BinaryDisposable(disposable, new ClearDisposable(id));
	    };
	
	    DefaultScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
	      if (dueTime === 0) { return this.schedule(state, action); }
	      var disposable = new SingleAssignmentDisposable(),
	          id = localSetTimeout(scheduleAction(disposable, action, this, state), dueTime);
	      return new BinaryDisposable(disposable, new LocalClearDisposable(id));
	    };
	
	    return DefaultScheduler;
	  }(Scheduler));
	
	  var defaultScheduler = Scheduler['default'] = Scheduler.async = new DefaultScheduler();
	
	  var CatchScheduler = (function (__super__) {
	    inherits(CatchScheduler, __super__);
	
	    function CatchScheduler(scheduler, handler) {
	      this._scheduler = scheduler;
	      this._handler = handler;
	      this._recursiveOriginal = null;
	      this._recursiveWrapper = null;
	      __super__.call(this);
	    }
	
	    CatchScheduler.prototype.schedule = function (state, action) {
	      return this._scheduler.schedule(state, this._wrap(action));
	    };
	
	    CatchScheduler.prototype._scheduleFuture = function (state, dueTime, action) {
	      return this._scheduler.schedule(state, dueTime, this._wrap(action));
	    };
	
	    CatchScheduler.prototype.now = function () { return this._scheduler.now(); };
	
	    CatchScheduler.prototype._clone = function (scheduler) {
	        return new CatchScheduler(scheduler, this._handler);
	    };
	
	    CatchScheduler.prototype._wrap = function (action) {
	      var parent = this;
	      return function (self, state) {
	        var res = tryCatch(action)(parent._getRecursiveWrapper(self), state);
	        if (res === errorObj) {
	          if (!parent._handler(res.e)) { thrower(res.e); }
	          return disposableEmpty;
	        }
	        return disposableFixup(res);
	      };
	    };
	
	    CatchScheduler.prototype._getRecursiveWrapper = function (scheduler) {
	      if (this._recursiveOriginal !== scheduler) {
	        this._recursiveOriginal = scheduler;
	        var wrapper = this._clone(scheduler);
	        wrapper._recursiveOriginal = scheduler;
	        wrapper._recursiveWrapper = wrapper;
	        this._recursiveWrapper = wrapper;
	      }
	      return this._recursiveWrapper;
	    };
	
	    CatchScheduler.prototype.schedulePeriodic = function (state, period, action) {
	      var self = this, failed = false, d = new SingleAssignmentDisposable();
	
	      d.setDisposable(this._scheduler.schedulePeriodic(state, period, function (state1) {
	        if (failed) { return null; }
	        var res = tryCatch(action)(state1);
	        if (res === errorObj) {
	          failed = true;
	          if (!self._handler(res.e)) { thrower(res.e); }
	          d.dispose();
	          return null;
	        }
	        return res;
	      }));
	
	      return d;
	    };
	
	    return CatchScheduler;
	  }(Scheduler));
	
	  /**
	   *  Represents a notification to an observer.
	   */
	  var Notification = Rx.Notification = (function () {
	    function Notification() {
	
	    }
	
	    Notification.prototype._accept = function (onNext, onError, onCompleted) {
	      throw new NotImplementedError();
	    };
	
	    Notification.prototype._acceptObserver = function (onNext, onError, onCompleted) {
	      throw new NotImplementedError();
	    };
	
	    /**
	     * Invokes the delegate corresponding to the notification or the observer's method corresponding to the notification and returns the produced result.
	     * @param {Function | Observer} observerOrOnNext Function to invoke for an OnNext notification or Observer to invoke the notification on..
	     * @param {Function} onError Function to invoke for an OnError notification.
	     * @param {Function} onCompleted Function to invoke for an OnCompleted notification.
	     * @returns {Any} Result produced by the observation.
	     */
	    Notification.prototype.accept = function (observerOrOnNext, onError, onCompleted) {
	      return observerOrOnNext && typeof observerOrOnNext === 'object' ?
	        this._acceptObserver(observerOrOnNext) :
	        this._accept(observerOrOnNext, onError, onCompleted);
	    };
	
	    /**
	     * Returns an observable sequence with a single notification.
	     *
	     * @memberOf Notifications
	     * @param {Scheduler} [scheduler] Scheduler to send out the notification calls on.
	     * @returns {Observable} The observable sequence that surfaces the behavior of the notification upon subscription.
	     */
	    Notification.prototype.toObservable = function (scheduler) {
	      var self = this;
	      isScheduler(scheduler) || (scheduler = immediateScheduler);
	      return new AnonymousObservable(function (o) {
	        return scheduler.schedule(self, function (_, notification) {
	          notification._acceptObserver(o);
	          notification.kind === 'N' && o.onCompleted();
	        });
	      });
	    };
	
	    return Notification;
	  })();
	
	  var OnNextNotification = (function (__super__) {
	    inherits(OnNextNotification, __super__);
	    function OnNextNotification(value) {
	      this.value = value;
	      this.kind = 'N';
	    }
	
	    OnNextNotification.prototype._accept = function (onNext) {
	      return onNext(this.value);
	    };
	
	    OnNextNotification.prototype._acceptObserver = function (o) {
	      return o.onNext(this.value);
	    };
	
	    OnNextNotification.prototype.toString = function () {
	      return 'OnNext(' + this.value + ')';
	    };
	
	    return OnNextNotification;
	  }(Notification));
	
	  var OnErrorNotification = (function (__super__) {
	    inherits(OnErrorNotification, __super__);
	    function OnErrorNotification(error) {
	      this.error = error;
	      this.kind = 'E';
	    }
	
	    OnErrorNotification.prototype._accept = function (onNext, onError) {
	      return onError(this.error);
	    };
	
	    OnErrorNotification.prototype._acceptObserver = function (o) {
	      return o.onError(this.error);
	    };
	
	    OnErrorNotification.prototype.toString = function () {
	      return 'OnError(' + this.error + ')';
	    };
	
	    return OnErrorNotification;
	  }(Notification));
	
	  var OnCompletedNotification = (function (__super__) {
	    inherits(OnCompletedNotification, __super__);
	    function OnCompletedNotification() {
	      this.kind = 'C';
	    }
	
	    OnCompletedNotification.prototype._accept = function (onNext, onError, onCompleted) {
	      return onCompleted();
	    };
	
	    OnCompletedNotification.prototype._acceptObserver = function (o) {
	      return o.onCompleted();
	    };
	
	    OnCompletedNotification.prototype.toString = function () {
	      return 'OnCompleted()';
	    };
	
	    return OnCompletedNotification;
	  }(Notification));
	
	  /**
	   * Creates an object that represents an OnNext notification to an observer.
	   * @param {Any} value The value contained in the notification.
	   * @returns {Notification} The OnNext notification containing the value.
	   */
	  var notificationCreateOnNext = Notification.createOnNext = function (value) {
	    return new OnNextNotification(value);
	  };
	
	  /**
	   * Creates an object that represents an OnError notification to an observer.
	   * @param {Any} error The exception contained in the notification.
	   * @returns {Notification} The OnError notification containing the exception.
	   */
	  var notificationCreateOnError = Notification.createOnError = function (error) {
	    return new OnErrorNotification(error);
	  };
	
	  /**
	   * Creates an object that represents an OnCompleted notification to an observer.
	   * @returns {Notification} The OnCompleted notification.
	   */
	  var notificationCreateOnCompleted = Notification.createOnCompleted = function () {
	    return new OnCompletedNotification();
	  };
	
	  /**
	   * Supports push-style iteration over an observable sequence.
	   */
	  var Observer = Rx.Observer = function () { };
	
	  /**
	   *  Creates a notification callback from an observer.
	   * @returns The action that forwards its input notification to the underlying observer.
	   */
	  Observer.prototype.toNotifier = function () {
	    var observer = this;
	    return function (n) { return n.accept(observer); };
	  };
	
	  /**
	   *  Hides the identity of an observer.
	   * @returns An observer that hides the identity of the specified observer.
	   */
	  Observer.prototype.asObserver = function () {
	    var self = this;
	    return new AnonymousObserver(
	      function (x) { self.onNext(x); },
	      function (err) { self.onError(err); },
	      function () { self.onCompleted(); });
	  };
	
	  /**
	   *  Checks access to the observer for grammar violations. This includes checking for multiple OnError or OnCompleted calls, as well as reentrancy in any of the observer methods.
	   *  If a violation is detected, an Error is thrown from the offending observer method call.
	   * @returns An observer that checks callbacks invocations against the observer grammar and, if the checks pass, forwards those to the specified observer.
	   */
	  Observer.prototype.checked = function () { return new CheckedObserver(this); };
	
	  /**
	   *  Creates an observer from the specified OnNext, along with optional OnError, and OnCompleted actions.
	   * @param {Function} [onNext] Observer's OnNext action implementation.
	   * @param {Function} [onError] Observer's OnError action implementation.
	   * @param {Function} [onCompleted] Observer's OnCompleted action implementation.
	   * @returns {Observer} The observer object implemented using the given actions.
	   */
	  var observerCreate = Observer.create = function (onNext, onError, onCompleted) {
	    onNext || (onNext = noop);
	    onError || (onError = defaultError);
	    onCompleted || (onCompleted = noop);
	    return new AnonymousObserver(onNext, onError, onCompleted);
	  };
	
	  /**
	   *  Creates an observer from a notification callback.
	   * @param {Function} handler Action that handles a notification.
	   * @returns The observer object that invokes the specified handler using a notification corresponding to each message it receives.
	   */
	  Observer.fromNotifier = function (handler, thisArg) {
	    var cb = bindCallback(handler, thisArg, 1);
	    return new AnonymousObserver(function (x) {
	      return cb(notificationCreateOnNext(x));
	    }, function (e) {
	      return cb(notificationCreateOnError(e));
	    }, function () {
	      return cb(notificationCreateOnCompleted());
	    });
	  };
	
	  /**
	   * Schedules the invocation of observer methods on the given scheduler.
	   * @param {Scheduler} scheduler Scheduler to schedule observer messages on.
	   * @returns {Observer} Observer whose messages are scheduled on the given scheduler.
	   */
	  Observer.prototype.notifyOn = function (scheduler) {
	    return new ObserveOnObserver(scheduler, this);
	  };
	
	  Observer.prototype.makeSafe = function(disposable) {
	    return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
	  };
	
	  /**
	   * Abstract base class for implementations of the Observer class.
	   * This base class enforces the grammar of observers where OnError and OnCompleted are terminal messages.
	   */
	  var AbstractObserver = Rx.internals.AbstractObserver = (function (__super__) {
	    inherits(AbstractObserver, __super__);
	
	    /**
	     * Creates a new observer in a non-stopped state.
	     */
	    function AbstractObserver() {
	      this.isStopped = false;
	    }
	
	    // Must be implemented by other observers
	    AbstractObserver.prototype.next = notImplemented;
	    AbstractObserver.prototype.error = notImplemented;
	    AbstractObserver.prototype.completed = notImplemented;
	
	    /**
	     * Notifies the observer of a new element in the sequence.
	     * @param {Any} value Next element in the sequence.
	     */
	    AbstractObserver.prototype.onNext = function (value) {
	      !this.isStopped && this.next(value);
	    };
	
	    /**
	     * Notifies the observer that an exception has occurred.
	     * @param {Any} error The error that has occurred.
	     */
	    AbstractObserver.prototype.onError = function (error) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(error);
	      }
	    };
	
	    /**
	     * Notifies the observer of the end of the sequence.
	     */
	    AbstractObserver.prototype.onCompleted = function () {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.completed();
	      }
	    };
	
	    /**
	     * Disposes the observer, causing it to transition to the stopped state.
	     */
	    AbstractObserver.prototype.dispose = function () { this.isStopped = true; };
	
	    AbstractObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.error(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    return AbstractObserver;
	  }(Observer));
	
	  /**
	   * Class to create an Observer instance from delegate-based implementations of the on* methods.
	   */
	  var AnonymousObserver = Rx.AnonymousObserver = (function (__super__) {
	    inherits(AnonymousObserver, __super__);
	
	    /**
	     * Creates an observer from the specified OnNext, OnError, and OnCompleted actions.
	     * @param {Any} onNext Observer's OnNext action implementation.
	     * @param {Any} onError Observer's OnError action implementation.
	     * @param {Any} onCompleted Observer's OnCompleted action implementation.
	     */
	    function AnonymousObserver(onNext, onError, onCompleted) {
	      __super__.call(this);
	      this._onNext = onNext;
	      this._onError = onError;
	      this._onCompleted = onCompleted;
	    }
	
	    /**
	     * Calls the onNext action.
	     * @param {Any} value Next element in the sequence.
	     */
	    AnonymousObserver.prototype.next = function (value) {
	      this._onNext(value);
	    };
	
	    /**
	     * Calls the onError action.
	     * @param {Any} error The error that has occurred.
	     */
	    AnonymousObserver.prototype.error = function (error) {
	      this._onError(error);
	    };
	
	    /**
	     *  Calls the onCompleted action.
	     */
	    AnonymousObserver.prototype.completed = function () {
	      this._onCompleted();
	    };
	
	    return AnonymousObserver;
	  }(AbstractObserver));
	
	  var CheckedObserver = (function (__super__) {
	    inherits(CheckedObserver, __super__);
	
	    function CheckedObserver(observer) {
	      __super__.call(this);
	      this._observer = observer;
	      this._state = 0; // 0 - idle, 1 - busy, 2 - done
	    }
	
	    var CheckedObserverPrototype = CheckedObserver.prototype;
	
	    CheckedObserverPrototype.onNext = function (value) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onNext).call(this._observer, value);
	      this._state = 0;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.onError = function (err) {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onError).call(this._observer, err);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.onCompleted = function () {
	      this.checkAccess();
	      var res = tryCatch(this._observer.onCompleted).call(this._observer);
	      this._state = 2;
	      res === errorObj && thrower(res.e);
	    };
	
	    CheckedObserverPrototype.checkAccess = function () {
	      if (this._state === 1) { throw new Error('Re-entrancy detected'); }
	      if (this._state === 2) { throw new Error('Observer completed'); }
	      if (this._state === 0) { this._state = 1; }
	    };
	
	    return CheckedObserver;
	  }(Observer));
	
	  var ScheduledObserver = Rx.internals.ScheduledObserver = (function (__super__) {
	    inherits(ScheduledObserver, __super__);
	
	    function ScheduledObserver(scheduler, observer) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.observer = observer;
	      this.isAcquired = false;
	      this.hasFaulted = false;
	      this.queue = [];
	      this.disposable = new SerialDisposable();
	    }
	
	    function enqueueNext(observer, x) { return function () { observer.onNext(x); }; }
	    function enqueueError(observer, e) { return function () { observer.onError(e); }; }
	    function enqueueCompleted(observer) { return function () { observer.onCompleted(); }; }
	
	    ScheduledObserver.prototype.next = function (x) {
	      this.queue.push(enqueueNext(this.observer, x));
	    };
	
	    ScheduledObserver.prototype.error = function (e) {
	      this.queue.push(enqueueError(this.observer, e));
	    };
	
	    ScheduledObserver.prototype.completed = function () {
	      this.queue.push(enqueueCompleted(this.observer));
	    };
	
	
	    function scheduleMethod(state, recurse) {
	      var work;
	      if (state.queue.length > 0) {
	        work = state.queue.shift();
	      } else {
	        state.isAcquired = false;
	        return;
	      }
	      var res = tryCatch(work)();
	      if (res === errorObj) {
	        state.queue = [];
	        state.hasFaulted = true;
	        return thrower(res.e);
	      }
	      recurse(state);
	    }
	
	    ScheduledObserver.prototype.ensureActive = function () {
	      var isOwner = false;
	      if (!this.hasFaulted && this.queue.length > 0) {
	        isOwner = !this.isAcquired;
	        this.isAcquired = true;
	      }
	      isOwner &&
	        this.disposable.setDisposable(this.scheduler.scheduleRecursive(this, scheduleMethod));
	    };
	
	    ScheduledObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.disposable.dispose();
	    };
	
	    return ScheduledObserver;
	  }(AbstractObserver));
	
	  var ObserveOnObserver = (function (__super__) {
	    inherits(ObserveOnObserver, __super__);
	
	    function ObserveOnObserver(scheduler, observer, cancel) {
	      __super__.call(this, scheduler, observer);
	      this._cancel = cancel;
	    }
	
	    ObserveOnObserver.prototype.next = function (value) {
	      __super__.prototype.next.call(this, value);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.error = function (e) {
	      __super__.prototype.error.call(this, e);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.completed = function () {
	      __super__.prototype.completed.call(this);
	      this.ensureActive();
	    };
	
	    ObserveOnObserver.prototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this._cancel && this._cancel.dispose();
	      this._cancel = null;
	    };
	
	    return ObserveOnObserver;
	  })(ScheduledObserver);
	
	  var observableProto;
	
	  /**
	   * Represents a push-style collection.
	   */
	  var Observable = Rx.Observable = (function () {
	
	    function makeSubscribe(self, subscribe) {
	      return function (o) {
	        var oldOnError = o.onError;
	        o.onError = function (e) {
	          makeStackTraceLong(e, self);
	          oldOnError.call(o, e);
	        };
	
	        return subscribe.call(self, o);
	      };
	    }
	
	    function Observable() {
	      if (Rx.config.longStackSupport && hasStacks) {
	        var oldSubscribe = this._subscribe;
	        var e = tryCatch(thrower)(new Error()).e;
	        this.stack = e.stack.substring(e.stack.indexOf('\n') + 1);
	        this._subscribe = makeSubscribe(this, oldSubscribe);
	      }
	    }
	
	    observableProto = Observable.prototype;
	
	    /**
	    * Determines whether the given object is an Observable
	    * @param {Any} An object to determine whether it is an Observable
	    * @returns {Boolean} true if an Observable, else false.
	    */
	    Observable.isObservable = function (o) {
	      return o && isFunction(o.subscribe);
	    };
	
	    /**
	     *  Subscribes an o to the observable sequence.
	     *  @param {Mixed} [oOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
	     *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
	     *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
	     *  @returns {Diposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribe = observableProto.forEach = function (oOrOnNext, onError, onCompleted) {
	      return this._subscribe(typeof oOrOnNext === 'object' ?
	        oOrOnNext :
	        observerCreate(oOrOnNext, onError, onCompleted));
	    };
	
	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onNext The function to invoke on each element in the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnNext = function (onNext, thisArg) {
	      return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) { onNext.call(thisArg, x); } : onNext));
	    };
	
	    /**
	     * Subscribes to an exceptional condition in the sequence with an optional "this" argument.
	     * @param {Function} onError The function to invoke upon exceptional termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnError = function (onError, thisArg) {
	      return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) { onError.call(thisArg, e); } : onError));
	    };
	
	    /**
	     * Subscribes to the next value in the sequence with an optional "this" argument.
	     * @param {Function} onCompleted The function to invoke upon graceful termination of the observable sequence.
	     * @param {Any} [thisArg] Object to use as this when executing callback.
	     * @returns {Disposable} A disposable handling the subscriptions and unsubscriptions.
	     */
	    observableProto.subscribeOnCompleted = function (onCompleted, thisArg) {
	      return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() { onCompleted.call(thisArg); } : onCompleted));
	    };
	
	    return Observable;
	  })();
	
	  var ObservableBase = Rx.ObservableBase = (function (__super__) {
	    inherits(ObservableBase, __super__);
	
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }
	
	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.subscribeCore).call(self, ado);
	      if (sub === errorObj && !ado.fail(errorObj.e)) { thrower(errorObj.e); }
	      ado.setDisposable(fixSubscriber(sub));
	    }
	
	    function ObservableBase() {
	      __super__.call(this);
	    }
	
	    ObservableBase.prototype._subscribe = function (o) {
	      var ado = new AutoDetachObserver(o), state = [ado, this];
	
	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.schedule(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    };
	
	    ObservableBase.prototype.subscribeCore = notImplemented;
	
	    return ObservableBase;
	  }(Observable));
	
	var FlatMapObservable = Rx.FlatMapObservable = (function(__super__) {
	
	    inherits(FlatMapObservable, __super__);
	
	    function FlatMapObservable(source, selector, resultSelector, thisArg) {
	      this.resultSelector = isFunction(resultSelector) ? resultSelector : null;
	      this.selector = bindCallback(isFunction(selector) ? selector : function() { return selector; }, thisArg, 3);
	      this.source = source;
	      __super__.call(this);
	    }
	
	    FlatMapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this.resultSelector, this));
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(observer, selector, resultSelector, source) {
	      this.i = 0;
	      this.selector = selector;
	      this.resultSelector = resultSelector;
	      this.source = source;
	      this.o = observer;
	      AbstractObserver.call(this);
	    }
	
	    InnerObserver.prototype._wrapResult = function(result, x, i) {
	      return this.resultSelector ?
	        result.map(function(y, i2) { return this.resultSelector(x, y, i, i2); }, this) :
	        result;
	    };
	
	    InnerObserver.prototype.next = function(x) {
	      var i = this.i++;
	      var result = tryCatch(this.selector)(x, i, this.source);
	      if (result === errorObj) { return this.o.onError(result.e); }
	
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = Observable.from(result));
	      this.o.onNext(this._wrapResult(result, x, i));
	    };
	
	    InnerObserver.prototype.error = function(e) { this.o.onError(e); };
	
	    InnerObserver.prototype.completed = function() { this.o.onCompleted(); };
	
	    return FlatMapObservable;
	
	}(ObservableBase));
	
	  var Enumerable = Rx.internals.Enumerable = function () { };
	
	  function IsDisposedDisposable(state) {
	    this._s = state;
	    this.isDisposed = false;
	  }
	
	  IsDisposedDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this.isDisposed = true;
	      this._s.isDisposed = true;
	    }
	  };
	
	  var ConcatEnumerableObservable = (function(__super__) {
	    inherits(ConcatEnumerableObservable, __super__);
	    function ConcatEnumerableObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(state, recurse) {
	      if (state.isDisposed) { return; }
	      var currentItem = tryCatch(state.e.next).call(state.e);
	      if (currentItem === errorObj) { return state.o.onError(currentItem.e); }
	      if (currentItem.done) { return state.o.onCompleted(); }
	
	      // Check if promise
	      var currentValue = currentItem.value;
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
	    }
	
	    ConcatEnumerableObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable();
	      var state = {
	        isDisposed: false,
	        o: o,
	        subscription: subscription,
	        e: this.sources[$iterator$]()
	      };
	
	      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
	      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
	    };
	
	    function InnerObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      AbstractObserver.call(this);
	    }
	
	    inherits(InnerObserver, AbstractObserver);
	
	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._state.o.onError(e); };
	    InnerObserver.prototype.completed = function () { this._recurse(this._state); };
	
	    return ConcatEnumerableObservable;
	  }(ObservableBase));
	
	  Enumerable.prototype.concat = function () {
	    return new ConcatEnumerableObservable(this);
	  };
	
	  var CatchErrorObservable = (function(__super__) {
	    function CatchErrorObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	
	    inherits(CatchErrorObservable, __super__);
	
	    function scheduleMethod(state, recurse) {
	      if (state.isDisposed) { return; }
	      var currentItem = tryCatch(state.e.next).call(state.e);
	      if (currentItem === errorObj) { return state.o.onError(currentItem.e); }
	      if (currentItem.done) { return state.lastError !== null ? state.o.onError(state.lastError) : state.o.onCompleted(); }
	
	      var currentValue = currentItem.value;
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new InnerObserver(state, recurse)));
	    }
	
	    CatchErrorObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable();
	      var state = {
	        isDisposed: false,
	        e: this.sources[$iterator$](),
	        subscription: subscription,
	        lastError: null,
	        o: o
	      };
	
	      var cancelable = currentThreadScheduler.scheduleRecursive(state, scheduleMethod);
	      return new NAryDisposable([subscription, cancelable, new IsDisposedDisposable(state)]);
	    };
	
	    function InnerObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      AbstractObserver.call(this);
	    }
	
	    inherits(InnerObserver, AbstractObserver);
	
	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._state.lastError = e; this._recurse(this._state); };
	    InnerObserver.prototype.completed = function () { this._state.o.onCompleted(); };
	
	    return CatchErrorObservable;
	  }(ObservableBase));
	
	  Enumerable.prototype.catchError = function () {
	    return new CatchErrorObservable(this);
	  };
	
	  Enumerable.prototype.catchErrorWhen = function (notificationHandler) {
	    var sources = this;
	    return new AnonymousObservable(function (o) {
	      var exceptions = new Subject(),
	        notifier = new Subject(),
	        handled = notificationHandler(exceptions),
	        notificationDisposable = handled.subscribe(notifier);
	
	      var e = sources[$iterator$]();
	
	      var state = { isDisposed: false },
	        lastError,
	        subscription = new SerialDisposable();
	      var cancelable = currentThreadScheduler.scheduleRecursive(null, function (_, self) {
	        if (state.isDisposed) { return; }
	        var currentItem = tryCatch(e.next).call(e);
	        if (currentItem === errorObj) { return o.onError(currentItem.e); }
	
	        if (currentItem.done) {
	          if (lastError) {
	            o.onError(lastError);
	          } else {
	            o.onCompleted();
	          }
	          return;
	        }
	
	        // Check if promise
	        var currentValue = currentItem.value;
	        isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	        var outer = new SingleAssignmentDisposable();
	        var inner = new SingleAssignmentDisposable();
	        subscription.setDisposable(new BinaryDisposable(inner, outer));
	        outer.setDisposable(currentValue.subscribe(
	          function(x) { o.onNext(x); },
	          function (exn) {
	            inner.setDisposable(notifier.subscribe(self, function(ex) {
	              o.onError(ex);
	            }, function() {
	              o.onCompleted();
	            }));
	
	            exceptions.onNext(exn);
	          },
	          function() { o.onCompleted(); }));
	      });
	
	      return new NAryDisposable([notificationDisposable, subscription, cancelable, new IsDisposedDisposable(state)]);
	    });
	  };
	
	  var RepeatEnumerable = (function (__super__) {
	    inherits(RepeatEnumerable, __super__);
	    function RepeatEnumerable(v, c) {
	      this.v = v;
	      this.c = c == null ? -1 : c;
	    }
	
	    RepeatEnumerable.prototype[$iterator$] = function () {
	      return new RepeatEnumerator(this);
	    };
	
	    function RepeatEnumerator(p) {
	      this.v = p.v;
	      this.l = p.c;
	    }
	
	    RepeatEnumerator.prototype.next = function () {
	      if (this.l === 0) { return doneEnumerator; }
	      if (this.l > 0) { this.l--; }
	      return { done: false, value: this.v };
	    };
	
	    return RepeatEnumerable;
	  }(Enumerable));
	
	  var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
	    return new RepeatEnumerable(value, repeatCount);
	  };
	
	  var OfEnumerable = (function(__super__) {
	    inherits(OfEnumerable, __super__);
	    function OfEnumerable(s, fn, thisArg) {
	      this.s = s;
	      this.fn = fn ? bindCallback(fn, thisArg, 3) : null;
	    }
	    OfEnumerable.prototype[$iterator$] = function () {
	      return new OfEnumerator(this);
	    };
	
	    function OfEnumerator(p) {
	      this.i = -1;
	      this.s = p.s;
	      this.l = this.s.length;
	      this.fn = p.fn;
	    }
	
	    OfEnumerator.prototype.next = function () {
	     return ++this.i < this.l ?
	       { done: false, value: !this.fn ? this.s[this.i] : this.fn(this.s[this.i], this.i, this.s) } :
	       doneEnumerator;
	    };
	
	    return OfEnumerable;
	  }(Enumerable));
	
	  var enumerableOf = Enumerable.of = function (source, selector, thisArg) {
	    return new OfEnumerable(source, selector, thisArg);
	  };
	
	var ObserveOnObservable = (function (__super__) {
	  inherits(ObserveOnObservable, __super__);
	  function ObserveOnObservable(source, s) {
	    this.source = source;
	    this._s = s;
	    __super__.call(this);
	  }
	
	  ObserveOnObservable.prototype.subscribeCore = function (o) {
	    return this.source.subscribe(new ObserveOnObserver(this._s, o));
	  };
	
	  return ObserveOnObservable;
	}(ObservableBase));
	
	   /**
	   *  Wraps the source sequence in order to run its observer callbacks on the specified scheduler.
	   *
	   *  This only invokes observer callbacks on a scheduler. In case the subscription and/or unsubscription actions have side-effects
	   *  that require to be run on a scheduler, use subscribeOn.
	   *
	   *  @param {Scheduler} scheduler Scheduler to notify observers on.
	   *  @returns {Observable} The source sequence whose observations happen on the specified scheduler.
	   */
	  observableProto.observeOn = function (scheduler) {
	    return new ObserveOnObservable(this, scheduler);
	  };
	
	  var SubscribeOnObservable = (function (__super__) {
	    inherits(SubscribeOnObservable, __super__);
	    function SubscribeOnObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(scheduler, state) {
	      var source = state[0], d = state[1], o = state[2];
	      d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(o)));
	    }
	
	    SubscribeOnObservable.prototype.subscribeCore = function (o) {
	      var m = new SingleAssignmentDisposable(), d = new SerialDisposable();
	      d.setDisposable(m);
	      m.setDisposable(this._s.schedule([this.source, d, o], scheduleMethod));
	      return d;
	    };
	
	    return SubscribeOnObservable;
	  }(ObservableBase));
	
	   /**
	   *  Wraps the source sequence in order to run its subscription and unsubscription logic on the specified scheduler. This operation is not commonly used;
	   *  see the remarks section for more information on the distinction between subscribeOn and observeOn.
	
	   *  This only performs the side-effects of subscription and unsubscription on the specified scheduler. In order to invoke observer
	   *  callbacks on a scheduler, use observeOn.
	
	   *  @param {Scheduler} scheduler Scheduler to perform subscription and unsubscription actions on.
	   *  @returns {Observable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
	   */
	  observableProto.subscribeOn = function (scheduler) {
	    return new SubscribeOnObservable(this, scheduler);
	  };
	
	  var FromPromiseObservable = (function(__super__) {
	    inherits(FromPromiseObservable, __super__);
	    function FromPromiseObservable(p, s) {
	      this._p = p;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    function scheduleNext(s, state) {
	      var o = state[0], data = state[1];
	      o.onNext(data);
	      o.onCompleted();
	    }
	
	    function scheduleError(s, state) {
	      var o = state[0], err = state[1];
	      o.onError(err);
	    }
	
	    FromPromiseObservable.prototype.subscribeCore = function(o) {
	      var sad = new SingleAssignmentDisposable(), self = this;
	
	      this._p
	        .then(function (data) {
	          sad.setDisposable(self._s.schedule([o, data], scheduleNext));
	        }, function (err) {
	          sad.setDisposable(self._s.schedule([o, err], scheduleError));
	        });
	
	      return sad;
	    };
	
	    return FromPromiseObservable;
	  }(ObservableBase));
	
	  /**
	  * Converts a Promise to an Observable sequence
	  * @param {Promise} An ES6 Compliant promise.
	  * @returns {Observable} An Observable sequence which wraps the existing promise success and failure.
	  */
	  var observableFromPromise = Observable.fromPromise = function (promise, scheduler) {
	    scheduler || (scheduler = defaultScheduler);
	    return new FromPromiseObservable(promise, scheduler);
	  };
	
	  /*
	   * Converts an existing observable sequence to an ES6 Compatible Promise
	   * @example
	   * var promise = Rx.Observable.return(42).toPromise(RSVP.Promise);
	   *
	   * // With config
	   * Rx.config.Promise = RSVP.Promise;
	   * var promise = Rx.Observable.return(42).toPromise();
	   * @param {Function} [promiseCtor] The constructor of the promise. If not provided, it looks for it in Rx.config.Promise.
	   * @returns {Promise} An ES6 compatible promise with the last value from the observable sequence.
	   */
	  observableProto.toPromise = function (promiseCtor) {
	    promiseCtor || (promiseCtor = Rx.config.Promise);
	    if (!promiseCtor) { throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise'); }
	    var source = this;
	    return new promiseCtor(function (resolve, reject) {
	      // No cancellation can be done
	      var value;
	      source.subscribe(function (v) {
	        value = v;
	      }, reject, function () {
	        resolve(value);
	      });
	    });
	  };
	
	  var ToArrayObservable = (function(__super__) {
	    inherits(ToArrayObservable, __super__);
	    function ToArrayObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    ToArrayObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o) {
	      this.o = o;
	      this.a = [];
	      AbstractObserver.call(this);
	    }
	    
	    InnerObserver.prototype.next = function (x) { this.a.push(x); };
	    InnerObserver.prototype.error = function (e) { this.o.onError(e);  };
	    InnerObserver.prototype.completed = function () { this.o.onNext(this.a); this.o.onCompleted(); };
	
	    return ToArrayObservable;
	  }(ObservableBase));
	
	  /**
	  * Creates an array from an observable sequence.
	  * @returns {Observable} An observable sequence containing a single element with a list containing all the elements of the source sequence.
	  */
	  observableProto.toArray = function () {
	    return new ToArrayObservable(this);
	  };
	
	  /**
	   *  Creates an observable sequence from a specified subscribe method implementation.
	   * @example
	   *  var res = Rx.Observable.create(function (observer) { return function () { } );
	   *  var res = Rx.Observable.create(function (observer) { return Rx.Disposable.empty; } );
	   *  var res = Rx.Observable.create(function (observer) { } );
	   * @param {Function} subscribe Implementation of the resulting observable sequence's subscribe method, returning a function that will be wrapped in a Disposable.
	   * @returns {Observable} The observable sequence with the specified implementation for the Subscribe method.
	   */
	  Observable.create = function (subscribe, parent) {
	    return new AnonymousObservable(subscribe, parent);
	  };
	
	  var Defer = (function(__super__) {
	    inherits(Defer, __super__);
	    function Defer(factory) {
	      this._f = factory;
	      __super__.call(this);
	    }
	
	    Defer.prototype.subscribeCore = function (o) {
	      var result = tryCatch(this._f)();
	      if (result === errorObj) { return observableThrow(result.e).subscribe(o);}
	      isPromise(result) && (result = observableFromPromise(result));
	      return result.subscribe(o);
	    };
	
	    return Defer;
	  }(ObservableBase));
	
	  /**
	   *  Returns an observable sequence that invokes the specified factory function whenever a new observer subscribes.
	   *
	   * @example
	   *  var res = Rx.Observable.defer(function () { return Rx.Observable.fromArray([1,2,3]); });
	   * @param {Function} observableFactory Observable factory function to invoke for each observer that subscribes to the resulting sequence or Promise.
	   * @returns {Observable} An observable sequence whose observers trigger an invocation of the given observable factory function.
	   */
	  var observableDefer = Observable.defer = function (observableFactory) {
	    return new Defer(observableFactory);
	  };
	
	  var EmptyObservable = (function(__super__) {
	    inherits(EmptyObservable, __super__);
	    function EmptyObservable(scheduler) {
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    EmptyObservable.prototype.subscribeCore = function (observer) {
	      var sink = new EmptySink(observer, this.scheduler);
	      return sink.run();
	    };
	
	    function EmptySink(observer, scheduler) {
	      this.observer = observer;
	      this.scheduler = scheduler;
	    }
	
	    function scheduleItem(s, state) {
	      state.onCompleted();
	      return disposableEmpty;
	    }
	
	    EmptySink.prototype.run = function () {
	      var state = this.observer;
	      return this.scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this.scheduler.schedule(state, scheduleItem);
	    };
	
	    return EmptyObservable;
	  }(ObservableBase));
	
	  var EMPTY_OBSERVABLE = new EmptyObservable(immediateScheduler);
	
	  /**
	   *  Returns an empty observable sequence, using the specified scheduler to send out the single OnCompleted message.
	   *
	   * @example
	   *  var res = Rx.Observable.empty();
	   *  var res = Rx.Observable.empty(Rx.Scheduler.timeout);
	   * @param {Scheduler} [scheduler] Scheduler to send the termination call on.
	   * @returns {Observable} An observable sequence with no elements.
	   */
	  var observableEmpty = Observable.empty = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return scheduler === immediateScheduler ? EMPTY_OBSERVABLE : new EmptyObservable(scheduler);
	  };
	
	  var FromObservable = (function(__super__) {
	    inherits(FromObservable, __super__);
	    function FromObservable(iterable, fn, scheduler) {
	      this._iterable = iterable;
	      this._fn = fn;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    function createScheduleMethod(o, it, fn) {
	      return function loopRecursive(i, recurse) {
	        var next = tryCatch(it.next).call(it);
	        if (next === errorObj) { return o.onError(next.e); }
	        if (next.done) { return o.onCompleted(); }
	
	        var result = next.value;
	
	        if (isFunction(fn)) {
	          result = tryCatch(fn)(result, i);
	          if (result === errorObj) { return o.onError(result.e); }
	        }
	
	        o.onNext(result);
	        recurse(i + 1);
	      };
	    }
	
	    FromObservable.prototype.subscribeCore = function (o) {
	      var list = Object(this._iterable),
	          it = getIterable(list);
	
	      return this._scheduler.scheduleRecursive(0, createScheduleMethod(o, it, this._fn));
	    };
	
	    return FromObservable;
	  }(ObservableBase));
	
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	
	  function StringIterable(s) {
	    this._s = s;
	  }
	
	  StringIterable.prototype[$iterator$] = function () {
	    return new StringIterator(this._s);
	  };
	
	  function StringIterator(s) {
	    this._s = s;
	    this._l = s.length;
	    this._i = 0;
	  }
	
	  StringIterator.prototype[$iterator$] = function () {
	    return this;
	  };
	
	  StringIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._s.charAt(this._i++) } : doneEnumerator;
	  };
	
	  function ArrayIterable(a) {
	    this._a = a;
	  }
	
	  ArrayIterable.prototype[$iterator$] = function () {
	    return new ArrayIterator(this._a);
	  };
	
	  function ArrayIterator(a) {
	    this._a = a;
	    this._l = toLength(a);
	    this._i = 0;
	  }
	
	  ArrayIterator.prototype[$iterator$] = function () {
	    return this;
	  };
	
	  ArrayIterator.prototype.next = function () {
	    return this._i < this._l ? { done: false, value: this._a[this._i++] } : doneEnumerator;
	  };
	
	  function numberIsFinite(value) {
	    return typeof value === 'number' && root.isFinite(value);
	  }
	
	  function isNan(n) {
	    return n !== n;
	  }
	
	  function getIterable(o) {
	    var i = o[$iterator$], it;
	    if (!i && typeof o === 'string') {
	      it = new StringIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i && o.length !== undefined) {
	      it = new ArrayIterable(o);
	      return it[$iterator$]();
	    }
	    if (!i) { throw new TypeError('Object is not iterable'); }
	    return o[$iterator$]();
	  }
	
	  function sign(value) {
	    var number = +value;
	    if (number === 0) { return number; }
	    if (isNaN(number)) { return number; }
	    return number < 0 ? -1 : 1;
	  }
	
	  function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) { return 0; }
	    if (len === 0 || !numberIsFinite(len)) { return len; }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) { return 0; }
	    if (len > maxSafeInteger) { return maxSafeInteger; }
	    return len;
	  }
	
	  /**
	  * This method creates a new Observable sequence from an array-like or iterable object.
	  * @param {Any} arrayLike An array-like or iterable object to convert to an Observable sequence.
	  * @param {Function} [mapFn] Map function to call on every element of the array.
	  * @param {Any} [thisArg] The context to use calling the mapFn if provided.
	  * @param {Scheduler} [scheduler] Optional scheduler to use for scheduling.  If not provided, defaults to Scheduler.currentThread.
	  */
	  var observableFrom = Observable.from = function (iterable, mapFn, thisArg, scheduler) {
	    if (iterable == null) {
	      throw new Error('iterable cannot be null.')
	    }
	    if (mapFn && !isFunction(mapFn)) {
	      throw new Error('mapFn when provided must be a function');
	    }
	    if (mapFn) {
	      var mapper = bindCallback(mapFn, thisArg, 2);
	    }
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromObservable(iterable, mapper, scheduler);
	  }
	
	  var FromArrayObservable = (function(__super__) {
	    inherits(FromArrayObservable, __super__);
	    function FromArrayObservable(args, scheduler) {
	      this._args = args;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(o, args) {
	      var len = args.length;
	      return function loopRecursive (i, recurse) {
	        if (i < len) {
	          o.onNext(args[i]);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }
	
	    FromArrayObservable.prototype.subscribeCore = function (o) {
	      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._args));
	    };
	
	    return FromArrayObservable;
	  }(ObservableBase));
	
	  /**
	  *  Converts an array to an observable sequence, using an optional scheduler to enumerate the array.
	  * @deprecated use Observable.from or Observable.of
	  * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given enumerable sequence.
	  */
	  var observableFromArray = Observable.fromArray = function (array, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler)
	  };
	
	  var GenerateObservable = (function (__super__) {
	    inherits(GenerateObservable, __super__);
	    function GenerateObservable(state, cndFn, itrFn, resFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._s = s;
	      this._first = true;
	      __super__.call(this);
	    }
	
	    function scheduleRecursive(self, recurse) {
	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      var hasResult = tryCatch(self._cndFn)(self._state);
	      if (hasResult === errorObj) { return self._o.onError(hasResult.e); }
	      if (hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        self._o.onNext(result);
	        recurse(self);
	      } else {
	        self._o.onCompleted();
	      }
	    }
	
	    GenerateObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursive(this, scheduleRecursive);
	    };
	
	    return GenerateObservable;
	  }(ObservableBase));
	
	  /**
	   *  Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
	   *
	   * @example
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; });
	   *  var res = Rx.Observable.generate(0, function (x) { return x < 10; }, function (x) { return x + 1; }, function (x) { return x; }, Rx.Scheduler.timeout);
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Scheduler} [scheduler] Scheduler on which to run the generator loop. If not provided, defaults to Scheduler.currentThread.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generate = function (initialState, condition, iterate, resultSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new GenerateObservable(initialState, condition, iterate, resultSelector, scheduler);
	  };
	
	  function observableOf (scheduler, array) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new FromArrayObservable(array, scheduler);
	  }
	
	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.of = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return new FromArrayObservable(args, currentThreadScheduler);
	  };
	
	  /**
	  *  This method creates a new Observable instance with a variable number of arguments, regardless of number or type of the arguments.
	  * @param {Scheduler} scheduler A scheduler to use for scheduling the arguments.
	  * @returns {Observable} The observable sequence whose elements are pulled from the given arguments.
	  */
	  Observable.ofWithScheduler = function (scheduler) {
	    var len = arguments.length, args = new Array(len - 1);
	    for(var i = 1; i < len; i++) { args[i - 1] = arguments[i]; }
	    return new FromArrayObservable(args, scheduler);
	  };
	
	  /**
	   * Creates an Observable sequence from changes to an array using Array.observe.
	   * @param {Array} array An array to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an array from Array.observe.
	   */
	  Observable.ofArrayChanges = function(array) {
	    if (!Array.isArray(array)) { throw new TypeError('Array.observe only accepts arrays.'); }
	    if (typeof Array.observe !== 'function' && typeof Array.unobserve !== 'function') { throw new TypeError('Array.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }
	      
	      Array.observe(array, observerFn);
	
	      return function () {
	        Array.unobserve(array, observerFn);
	      };
	    });
	  };
	
	  /**
	   * Creates an Observable sequence from changes to an object using Object.observe.
	   * @param {Object} obj An object to observe changes.
	   * @returns {Observable} An observable sequence containing changes to an object from Object.observe.
	   */
	  Observable.ofObjectChanges = function(obj) {
	    if (obj == null) { throw new TypeError('object must not be null or undefined.'); }
	    if (typeof Object.observe !== 'function' && typeof Object.unobserve !== 'function') { throw new TypeError('Object.observe is not supported on your platform') }
	    return new AnonymousObservable(function(observer) {
	      function observerFn(changes) {
	        for(var i = 0, len = changes.length; i < len; i++) {
	          observer.onNext(changes[i]);
	        }
	      }
	
	      Object.observe(obj, observerFn);
	
	      return function () {
	        Object.unobserve(obj, observerFn);
	      };
	    });
	  };
	
	  var NeverObservable = (function(__super__) {
	    inherits(NeverObservable, __super__);
	    function NeverObservable() {
	      __super__.call(this);
	    }
	
	    NeverObservable.prototype.subscribeCore = function (observer) {
	      return disposableEmpty;
	    };
	
	    return NeverObservable;
	  }(ObservableBase));
	
	  var NEVER_OBSERVABLE = new NeverObservable();
	
	  /**
	   * Returns a non-terminating observable sequence, which can be used to denote an infinite duration (e.g. when using reactive joins).
	   * @returns {Observable} An observable sequence whose observers will never get called.
	   */
	  var observableNever = Observable.never = function () {
	    return NEVER_OBSERVABLE;
	  };
	
	  var PairsObservable = (function(__super__) {
	    inherits(PairsObservable, __super__);
	    function PairsObservable(o, scheduler) {
	      this._o = o;
	      this._keys = Object.keys(o);
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(o, obj, keys) {
	      return function loopRecursive(i, recurse) {
	        if (i < keys.length) {
	          var key = keys[i];
	          o.onNext([key, obj[key]]);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }
	
	    PairsObservable.prototype.subscribeCore = function (o) {
	      return this._scheduler.scheduleRecursive(0, scheduleMethod(o, this._o, this._keys));
	    };
	
	    return PairsObservable;
	  }(ObservableBase));
	
	  /**
	   * Convert an object into an observable sequence of [key, value] pairs.
	   * @param {Object} obj The object to inspect.
	   * @param {Scheduler} [scheduler] Scheduler to run the enumeration of the input sequence on.
	   * @returns {Observable} An observable sequence of [key, value] pairs from the object.
	   */
	  Observable.pairs = function (obj, scheduler) {
	    scheduler || (scheduler = currentThreadScheduler);
	    return new PairsObservable(obj, scheduler);
	  };
	
	    var RangeObservable = (function(__super__) {
	    inherits(RangeObservable, __super__);
	    function RangeObservable(start, count, scheduler) {
	      this.start = start;
	      this.rangeCount = count;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    function loopRecursive(start, count, o) {
	      return function loop (i, recurse) {
	        if (i < count) {
	          o.onNext(start + i);
	          recurse(i + 1);
	        } else {
	          o.onCompleted();
	        }
	      };
	    }
	
	    RangeObservable.prototype.subscribeCore = function (o) {
	      return this.scheduler.scheduleRecursive(
	        0,
	        loopRecursive(this.start, this.rangeCount, o)
	      );
	    };
	
	    return RangeObservable;
	  }(ObservableBase));
	
	  /**
	  *  Generates an observable sequence of integral numbers within a specified range, using the specified scheduler to send out observer messages.
	  * @param {Number} start The value of the first integer in the sequence.
	  * @param {Number} count The number of sequential integers to generate.
	  * @param {Scheduler} [scheduler] Scheduler to run the generator loop on. If not specified, defaults to Scheduler.currentThread.
	  * @returns {Observable} An observable sequence that contains a range of sequential integral numbers.
	  */
	  Observable.range = function (start, count, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RangeObservable(start, count, scheduler);
	  };
	
	  var RepeatObservable = (function(__super__) {
	    inherits(RepeatObservable, __super__);
	    function RepeatObservable(value, repeatCount, scheduler) {
	      this.value = value;
	      this.repeatCount = repeatCount == null ? -1 : repeatCount;
	      this.scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    RepeatObservable.prototype.subscribeCore = function (observer) {
	      var sink = new RepeatSink(observer, this);
	      return sink.run();
	    };
	
	    return RepeatObservable;
	  }(ObservableBase));
	
	  function RepeatSink(observer, parent) {
	    this.observer = observer;
	    this.parent = parent;
	  }
	
	  RepeatSink.prototype.run = function () {
	    var observer = this.observer, value = this.parent.value;
	    function loopRecursive(i, recurse) {
	      if (i === -1 || i > 0) {
	        observer.onNext(value);
	        i > 0 && i--;
	      }
	      if (i === 0) { return observer.onCompleted(); }
	      recurse(i);
	    }
	
	    return this.parent.scheduler.scheduleRecursive(this.parent.repeatCount, loopRecursive);
	  };
	
	  /**
	   *  Generates an observable sequence that repeats the given element the specified number of times, using the specified scheduler to send out observer messages.
	   * @param {Mixed} value Element to repeat.
	   * @param {Number} repeatCount [Optiona] Number of times to repeat the element. If not specified, repeats indefinitely.
	   * @param {Scheduler} scheduler Scheduler to run the producer loop on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence that repeats the given element the specified number of times.
	   */
	  Observable.repeat = function (value, repeatCount, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new RepeatObservable(value, repeatCount, scheduler);
	  };
	
	  var JustObservable = (function(__super__) {
	    inherits(JustObservable, __super__);
	    function JustObservable(value, scheduler) {
	      this._value = value;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    JustObservable.prototype.subscribeCore = function (o) {
	      var state = [this._value, o];
	      return this._scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this._scheduler.schedule(state, scheduleItem);
	    };
	
	    function scheduleItem(s, state) {
	      var value = state[0], observer = state[1];
	      observer.onNext(value);
	      observer.onCompleted();
	      return disposableEmpty;
	    }
	
	    return JustObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns an observable sequence that contains a single element, using the specified scheduler to send out observer messages.
	   *  There is an alias called 'just' or browsers <IE9.
	   * @param {Mixed} value Single element in the resulting observable sequence.
	   * @param {Scheduler} scheduler Scheduler to send the single element on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} An observable sequence containing the single specified element.
	   */
	  var observableReturn = Observable['return'] = Observable.just = function (value, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new JustObservable(value, scheduler);
	  };
	
	  var ThrowObservable = (function(__super__) {
	    inherits(ThrowObservable, __super__);
	    function ThrowObservable(error, scheduler) {
	      this._error = error;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    ThrowObservable.prototype.subscribeCore = function (o) {
	      var state = [this._error, o];
	      return this._scheduler === immediateScheduler ?
	        scheduleItem(null, state) :
	        this._scheduler.schedule(state, scheduleItem);
	    };
	
	    function scheduleItem(s, state) {
	      var e = state[0], o = state[1];
	      o.onError(e);
	      return disposableEmpty;
	    }
	
	    return ThrowObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns an observable sequence that terminates with an exception, using the specified scheduler to send out the single onError message.
	   *  There is an alias to this method called 'throwError' for browsers <IE9.
	   * @param {Mixed} error An object used for the sequence's termination.
	   * @param {Scheduler} scheduler Scheduler to send the exceptional termination call on. If not specified, defaults to Scheduler.immediate.
	   * @returns {Observable} The observable sequence that terminates exceptionally with the specified exception object.
	   */
	  var observableThrow = Observable['throw'] = function (error, scheduler) {
	    isScheduler(scheduler) || (scheduler = immediateScheduler);
	    return new ThrowObservable(error, scheduler);
	  };
	
	  var UsingObservable = (function (__super__) {
	    inherits(UsingObservable, __super__);
	    function UsingObservable(resFn, obsFn) {
	      this._resFn = resFn;
	      this._obsFn = obsFn;
	      __super__.call(this);
	    }
	
	    UsingObservable.prototype.subscribeCore = function (o) {
	      var disposable = disposableEmpty;
	      var resource = tryCatch(this._resFn)();
	      if (resource === errorObj) {
	        return new BinaryDisposable(observableThrow(resource.e).subscribe(o), disposable);
	      }
	      resource && (disposable = resource);
	      var source = tryCatch(this._obsFn)(resource);
	      if (source === errorObj) {
	        return new BinaryDisposable(observableThrow(source.e).subscribe(o), disposable);
	      }
	      return new BinaryDisposable(source.subscribe(o), disposable);
	    };
	
	    return UsingObservable;
	  }(ObservableBase));
	
	  /**
	   * Constructs an observable sequence that depends on a resource object, whose lifetime is tied to the resulting observable sequence's lifetime.
	   * @param {Function} resourceFactory Factory function to obtain a resource object.
	   * @param {Function} observableFactory Factory function to obtain an observable sequence that depends on the obtained resource.
	   * @returns {Observable} An observable sequence whose lifetime controls the lifetime of the dependent resource object.
	   */
	  Observable.using = function (resourceFactory, observableFactory) {
	    return new UsingObservable(resourceFactory, observableFactory);
	  };
	
	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @param {Observable} rightSource Second observable sequence or Promise.
	   * @returns {Observable} {Observable} An observable sequence that surfaces either of the given sequences, whichever reacted first.
	   */
	  observableProto.amb = function (rightSource) {
	    var leftSource = this;
	    return new AnonymousObservable(function (observer) {
	      var choice,
	        leftChoice = 'L', rightChoice = 'R',
	        leftSubscription = new SingleAssignmentDisposable(),
	        rightSubscription = new SingleAssignmentDisposable();
	
	      isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));
	
	      function choiceL() {
	        if (!choice) {
	          choice = leftChoice;
	          rightSubscription.dispose();
	        }
	      }
	
	      function choiceR() {
	        if (!choice) {
	          choice = rightChoice;
	          leftSubscription.dispose();
	        }
	      }
	
	      var leftSubscribe = observerCreate(
	        function (left) {
	          choiceL();
	          choice === leftChoice && observer.onNext(left);
	        },
	        function (e) {
	          choiceL();
	          choice === leftChoice && observer.onError(e);
	        },
	        function () {
	          choiceL();
	          choice === leftChoice && observer.onCompleted();
	        }
	      );
	      var rightSubscribe = observerCreate(
	        function (right) {
	          choiceR();
	          choice === rightChoice && observer.onNext(right);
	        },
	        function (e) {
	          choiceR();
	          choice === rightChoice && observer.onError(e);
	        },
	        function () {
	          choiceR();
	          choice === rightChoice && observer.onCompleted();
	        }
	      );
	
	      leftSubscription.setDisposable(leftSource.subscribe(leftSubscribe));
	      rightSubscription.setDisposable(rightSource.subscribe(rightSubscribe));
	
	      return new BinaryDisposable(leftSubscription, rightSubscription);
	    });
	  };
	
	  function amb(p, c) { return p.amb(c); }
	
	  /**
	   * Propagates the observable sequence or Promise that reacts first.
	   * @returns {Observable} An observable sequence that surfaces any of the given sequences, whichever reacted first.
	   */
	  Observable.amb = function () {
	    var acc = observableNever(), items;
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      var len = arguments.length;
	      items = new Array(items);
	      for(var i = 0; i < len; i++) { items[i] = arguments[i]; }
	    }
	    for (var i = 0, len = items.length; i < len; i++) {
	      acc = amb(acc, items[i]);
	    }
	    return acc;
	  };
	
	  var CatchObservable = (function (__super__) {
	    inherits(CatchObservable, __super__);
	    function CatchObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    CatchObservable.prototype.subscribeCore = function (o) {
	      var d1 = new SingleAssignmentDisposable(), subscription = new SerialDisposable();
	      subscription.setDisposable(d1);
	      d1.setDisposable(this.source.subscribe(new CatchObserver(o, subscription, this._fn)));
	      return subscription;
	    };
	
	    return CatchObservable;
	  }(ObservableBase));
	
	  var CatchObserver = (function(__super__) {
	    inherits(CatchObserver, __super__);
	    function CatchObserver(o, s, fn) {
	      this._o = o;
	      this._s = s;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    CatchObserver.prototype.next = function (x) { this._o.onNext(x); };
	    CatchObserver.prototype.completed = function () { return this._o.onCompleted(); };
	    CatchObserver.prototype.error = function (e) {
	      var result = tryCatch(this._fn)(e);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      isPromise(result) && (result = observableFromPromise(result));
	
	      var d = new SingleAssignmentDisposable();
	      this._s.setDisposable(d);
	      d.setDisposable(result.subscribe(this._o));
	    };
	
	    return CatchObserver;
	  }(AbstractObserver));
	
	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Mixed} handlerOrSecond Exception handler function that returns an observable sequence given the error that occurred in the first sequence, or a second observable sequence used to produce results when an error occurred in the first sequence.
	   * @returns {Observable} An observable sequence containing the first sequence's elements, followed by the elements of the handler sequence in case an exception occurred.
	   */
	  observableProto['catch'] = function (handlerOrSecond) {
	    return isFunction(handlerOrSecond) ? new CatchObservable(this, handlerOrSecond) : observableCatch([this, handlerOrSecond]);
	  };
	
	  /**
	   * Continues an observable sequence that is terminated by an exception with the next observable sequence.
	   * @param {Array | Arguments} args Arguments or an array to use as the next sequence if an error occurs.
	   * @returns {Observable} An observable sequence containing elements from consecutive source sequences until a source sequence terminates successfully.
	   */
	  var observableCatch = Observable['catch'] = function () {
	    var items;
	    if (Array.isArray(arguments[0])) {
	      items = arguments[0];
	    } else {
	      var len = arguments.length;
	      items = new Array(len);
	      for(var i = 0; i < len; i++) { items[i] = arguments[i]; }
	    }
	    return enumerableOf(items).catchError();
	  };
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	   * This can be in the form of an argument list of observables or an array.
	   *
	   * @example
	   * 1 - obs = observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	   * 2 - obs = observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return combineLatest.apply(this, args);
	  };
	
	  function falseFactory() { return false; }
	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }
	
	  var CombineLatestObservable = (function(__super__) {
	    inherits(CombineLatestObservable, __super__);
	    function CombineLatestObservable(params, cb) {
	      this._params = params;
	      this._cb = cb;
	      __super__.call(this);
	    }
	
	    CombineLatestObservable.prototype.subscribeCore = function(observer) {
	      var len = this._params.length,
	          subscriptions = new Array(len);
	
	      var state = {
	        hasValue: arrayInitialize(len, falseFactory),
	        hasValueAll: false,
	        isDone: arrayInitialize(len, falseFactory),
	        values: new Array(len)
	      };
	
	      for (var i = 0; i < len; i++) {
	        var source = this._params[i], sad = new SingleAssignmentDisposable();
	        subscriptions[i] = sad;
	        isPromise(source) && (source = observableFromPromise(source));
	        sad.setDisposable(source.subscribe(new CombineLatestObserver(observer, i, this._cb, state)));
	      }
	
	      return new NAryDisposable(subscriptions);
	    };
	
	    return CombineLatestObservable;
	  }(ObservableBase));
	
	  var CombineLatestObserver = (function (__super__) {
	    inherits(CombineLatestObserver, __super__);
	    function CombineLatestObserver(o, i, cb, state) {
	      this._o = o;
	      this._i = i;
	      this._cb = cb;
	      this._state = state;
	      __super__.call(this);
	    }
	
	    function notTheSame(i) {
	      return function (x, j) {
	        return j !== i;
	      };
	    }
	
	    CombineLatestObserver.prototype.next = function (x) {
	      this._state.values[this._i] = x;
	      this._state.hasValue[this._i] = true;
	      if (this._state.hasValueAll || (this._state.hasValueAll = this._state.hasValue.every(identity))) {
	        var res = tryCatch(this._cb).apply(null, this._state.values);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._o.onNext(res);
	      } else if (this._state.isDone.filter(notTheSame(this._i)).every(identity)) {
	        this._o.onCompleted();
	      }
	    };
	
	    CombineLatestObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    CombineLatestObserver.prototype.completed = function () {
	      this._state.isDone[this._i] = true;
	      this._state.isDone.every(identity) && this._o.onCompleted();
	    };
	
	    return CombineLatestObserver;
	  }(AbstractObserver));
	
	  /**
	  * Merges the specified observable sequences into one observable sequence by using the selector function whenever any of the observable sequences or Promises produces an element.
	  *
	  * @example
	  * 1 - obs = Rx.Observable.combineLatest(obs1, obs2, obs3, function (o1, o2, o3) { return o1 + o2 + o3; });
	  * 2 - obs = Rx.Observable.combineLatest([obs1, obs2, obs3], function (o1, o2, o3) { return o1 + o2 + o3; });
	  * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	  */
	  var combineLatest = Observable.combineLatest = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	    return new CombineLatestObservable(args, resultSelector);
	  };
	
	  /**
	   * Concatenates all the observable sequences.  This takes in either an array or variable arguments to concatenate.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  observableProto.concat = function () {
	    for(var args = [], i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    args.unshift(this);
	    return observableConcat.apply(null, args);
	  };
	
	  var ConcatObserver = (function(__super__) {
	    inherits(ConcatObserver, __super__);
	    function ConcatObserver(s, fn) {
	      this._s = s;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    ConcatObserver.prototype.next = function (x) { this._s.o.onNext(x); };
	    ConcatObserver.prototype.error = function (e) { this._s.o.onError(e); };
	    ConcatObserver.prototype.completed = function () { this._s.i++; this._fn(this._s); };
	
	    return ConcatObserver;
	  }(AbstractObserver));
	
	  var ConcatObservable = (function(__super__) {
	    inherits(ConcatObservable, __super__);
	    function ConcatObservable(sources) {
	      this._sources = sources;
	      __super__.call(this);
	    }
	
	    function scheduleRecursive (state, recurse) {
	      if (state.disposable.isDisposed) { return; }
	      if (state.i === state.sources.length) { return state.o.onCompleted(); }
	
	      // Check if promise
	      var currentValue = state.sources[state.i];
	      isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
	
	      var d = new SingleAssignmentDisposable();
	      state.subscription.setDisposable(d);
	      d.setDisposable(currentValue.subscribe(new ConcatObserver(state, recurse)));
	    }
	
	    ConcatObservable.prototype.subscribeCore = function(o) {
	      var subscription = new SerialDisposable();
	      var disposable = disposableCreate(noop);
	      var state = {
	        o: o,
	        i: 0,
	        subscription: subscription,
	        disposable: disposable,
	        sources: this._sources
	      };
	
	      var cancelable = immediateScheduler.scheduleRecursive(state, scheduleRecursive);
	      return new NAryDisposable([subscription, disposable, cancelable]);
	    };
	
	    return ConcatObservable;
	  }(ObservableBase));
	
	  /**
	   * Concatenates all the observable sequences.
	   * @param {Array | Arguments} args Arguments or an array to concat to the observable sequence.
	   * @returns {Observable} An observable sequence that contains the elements of each given sequence, in sequential order.
	   */
	  var observableConcat = Observable.concat = function () {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      args = new Array(arguments.length);
	      for(var i = 0, len = arguments.length; i < len; i++) { args[i] = arguments[i]; }
	    }
	    return new ConcatObservable(args);
	  };
	
	  /**
	   * Concatenates an observable sequence of observable sequences.
	   * @returns {Observable} An observable sequence that contains the elements of each observed inner sequence, in sequential order.
	   */
	  observableProto.concatAll = function () {
	    return this.merge(1);
	  };
	
	  var MergeObservable = (function (__super__) {
	    inherits(MergeObservable, __super__);
	
	    function MergeObservable(source, maxConcurrent) {
	      this.source = source;
	      this.maxConcurrent = maxConcurrent;
	      __super__.call(this);
	    }
	
	    MergeObservable.prototype.subscribeCore = function(observer) {
	      var g = new CompositeDisposable();
	      g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
	      return g;
	    };
	
	    return MergeObservable;
	
	  }(ObservableBase));
	
	  var MergeObserver = (function (__super__) {
	    function MergeObserver(o, max, g) {
	      this.o = o;
	      this.max = max;
	      this.g = g;
	      this.done = false;
	      this.q = [];
	      this.activeCount = 0;
	      __super__.call(this);
	    }
	
	    inherits(MergeObserver, __super__);
	
	    MergeObserver.prototype.handleSubscribe = function (xs) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(xs) && (xs = observableFromPromise(xs));
	      sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
	    };
	
	    MergeObserver.prototype.next = function (innerSource) {
	      if(this.activeCount < this.max) {
	        this.activeCount++;
	        this.handleSubscribe(innerSource);
	      } else {
	        this.q.push(innerSource);
	      }
	    };
	    MergeObserver.prototype.error = function (e) { this.o.onError(e); };
	    MergeObserver.prototype.completed = function () { this.done = true; this.activeCount === 0 && this.o.onCompleted(); };
	
	    function InnerObserver(parent, sad) {
	      this.parent = parent;
	      this.sad = sad;
	      __super__.call(this);
	    }
	
	    inherits(InnerObserver, __super__);
	
	    InnerObserver.prototype.next = function (x) { this.parent.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this.parent.o.onError(e); };
	    InnerObserver.prototype.completed = function () {
	      this.parent.g.remove(this.sad);
	      if (this.parent.q.length > 0) {
	        this.parent.handleSubscribe(this.parent.q.shift());
	      } else {
	        this.parent.activeCount--;
	        this.parent.done && this.parent.activeCount === 0 && this.parent.o.onCompleted();
	      }
	    };
	
	    return MergeObserver;
	  }(AbstractObserver));
	
	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence, limiting the number of concurrent subscriptions to inner sequences.
	  * Or merges two observable sequences into a single observable sequence.
	  * @param {Mixed} [maxConcurrentOrOther] Maximum number of inner observable sequences being subscribed to concurrently or the second observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.merge = function (maxConcurrentOrOther) {
	    return typeof maxConcurrentOrOther !== 'number' ?
	      observableMerge(this, maxConcurrentOrOther) :
	      new MergeObservable(this, maxConcurrentOrOther);
	  };
	
	  /**
	   * Merges all the observable sequences into a single observable sequence.
	   * The scheduler is optional and if not specified, the immediate scheduler is used.
	   * @returns {Observable} The observable sequence that merges the elements of the observable sequences.
	   */
	  var observableMerge = Observable.merge = function () {
	    var scheduler, sources = [], i, len = arguments.length;
	    if (!arguments[0]) {
	      scheduler = immediateScheduler;
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else if (isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      for(i = 1; i < len; i++) { sources.push(arguments[i]); }
	    } else {
	      scheduler = immediateScheduler;
	      for(i = 0; i < len; i++) { sources.push(arguments[i]); }
	    }
	    if (Array.isArray(sources[0])) {
	      sources = sources[0];
	    }
	    return observableOf(scheduler, sources).mergeAll();
	  };
	
	  var MergeAllObservable = (function (__super__) {
	    inherits(MergeAllObservable, __super__);
	
	    function MergeAllObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    MergeAllObservable.prototype.subscribeCore = function (o) {
	      var g = new CompositeDisposable(), m = new SingleAssignmentDisposable();
	      g.add(m);
	      m.setDisposable(this.source.subscribe(new MergeAllObserver(o, g)));
	      return g;
	    };
	
	    return MergeAllObservable;
	  }(ObservableBase));
	
	  var MergeAllObserver = (function (__super__) {
	    function MergeAllObserver(o, g) {
	      this.o = o;
	      this.g = g;
	      this.done = false;
	      __super__.call(this);
	    }
	
	    inherits(MergeAllObserver, __super__);
	
	    MergeAllObserver.prototype.next = function(innerSource) {
	      var sad = new SingleAssignmentDisposable();
	      this.g.add(sad);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      sad.setDisposable(innerSource.subscribe(new InnerObserver(this, sad)));
	    };
	
	    MergeAllObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };
	
	    MergeAllObserver.prototype.completed = function () {
	      this.done = true;
	      this.g.length === 1 && this.o.onCompleted();
	    };
	
	    function InnerObserver(parent, sad) {
	      this.parent = parent;
	      this.sad = sad;
	      __super__.call(this);
	    }
	
	    inherits(InnerObserver, __super__);
	
	    InnerObserver.prototype.next = function (x) {
	      this.parent.o.onNext(x);
	    };
	    InnerObserver.prototype.error = function (e) {
	      this.parent.o.onError(e);
	    };
	    InnerObserver.prototype.completed = function () {
	      this.parent.g.remove(this.sad);
	      this.parent.done && this.parent.g.length === 1 && this.parent.o.onCompleted();
	    };
	
	    return MergeAllObserver;
	  }(AbstractObserver));
	
	  /**
	  * Merges an observable sequence of observable sequences into an observable sequence.
	  * @returns {Observable} The observable sequence that merges the elements of the inner sequences.
	  */
	  observableProto.mergeAll = function () {
	    return new MergeAllObservable(this);
	  };
	
	  var CompositeError = Rx.CompositeError = function(errors) {
	    this.innerErrors = errors;
	    this.message = 'This contains multiple errors. Check the innerErrors';
	    Error.call(this);
	  };
	  CompositeError.prototype = Object.create(Error.prototype);
	  CompositeError.prototype.name = 'CompositeError';
	
	  var MergeDelayErrorObservable = (function(__super__) {
	    inherits(MergeDelayErrorObservable, __super__);
	    function MergeDelayErrorObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    MergeDelayErrorObservable.prototype.subscribeCore = function (o) {
	      var group = new CompositeDisposable(),
	        m = new SingleAssignmentDisposable(),
	        state = { isStopped: false, errors: [], o: o };
	
	      group.add(m);
	      m.setDisposable(this.source.subscribe(new MergeDelayErrorObserver(group, state)));
	
	      return group;
	    };
	
	    return MergeDelayErrorObservable;
	  }(ObservableBase));
	
	  var MergeDelayErrorObserver = (function(__super__) {
	    inherits(MergeDelayErrorObserver, __super__);
	    function MergeDelayErrorObserver(group, state) {
	      this._group = group;
	      this._state = state;
	      __super__.call(this);
	    }
	
	    function setCompletion(o, errors) {
	      if (errors.length === 0) {
	        o.onCompleted();
	      } else if (errors.length === 1) {
	        o.onError(errors[0]);
	      } else {
	        o.onError(new CompositeError(errors));
	      }
	    }
	
	    MergeDelayErrorObserver.prototype.next = function (x) {
	      var inner = new SingleAssignmentDisposable();
	      this._group.add(inner);
	
	      // Check for promises support
	      isPromise(x) && (x = observableFromPromise(x));
	      inner.setDisposable(x.subscribe(new InnerObserver(inner, this._group, this._state)));
	    };
	
	    MergeDelayErrorObserver.prototype.error = function (e) {
	      this._state.errors.push(e);
	      this._state.isStopped = true;
	      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };
	
	    MergeDelayErrorObserver.prototype.completed = function () {
	      this._state.isStopped = true;
	      this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };
	
	    inherits(InnerObserver, __super__);
	    function InnerObserver(inner, group, state) {
	      this._inner = inner;
	      this._group = group;
	      this._state = state;
	      __super__.call(this);
	    }
	
	    InnerObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) {
	      this._state.errors.push(e);
	      this._group.remove(this._inner);
	      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };
	    InnerObserver.prototype.completed = function () {
	      this._group.remove(this._inner);
	      this._state.isStopped && this._group.length === 1 && setCompletion(this._state.o, this._state.errors);
	    };
	
	    return MergeDelayErrorObserver;
	  }(AbstractObserver));
	
	  /**
	  * Flattens an Observable that emits Observables into one Observable, in a way that allows an Observer to
	  * receive all successfully emitted items from all of the source Observables without being interrupted by
	  * an error notification from one of them.
	  *
	  * This behaves like Observable.prototype.mergeAll except that if any of the merged Observables notify of an
	  * error via the Observer's onError, mergeDelayError will refrain from propagating that
	  * error notification until all of the merged Observables have finished emitting items.
	  * @param {Array | Arguments} args Arguments or an array to merge.
	  * @returns {Observable} an Observable that emits all of the items emitted by the Observables emitted by the Observable
	  */
	  Observable.mergeDelayError = function() {
	    var args;
	    if (Array.isArray(arguments[0])) {
	      args = arguments[0];
	    } else {
	      var len = arguments.length;
	      args = new Array(len);
	      for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    }
	    var source = observableOf(null, args);
	    return new MergeDelayErrorObservable(source);
	  };
	
	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @param {Observable} second Second observable sequence used to produce results after the first sequence terminates.
	   * @returns {Observable} An observable sequence that concatenates the first and second sequence, even if the first sequence terminates exceptionally.
	   */
	  observableProto.onErrorResumeNext = function (second) {
	    if (!second) { throw new Error('Second observable is required'); }
	    return onErrorResumeNext([this, second]);
	  };
	
	  var OnErrorResumeNextObservable = (function(__super__) {
	    inherits(OnErrorResumeNextObservable, __super__);
	    function OnErrorResumeNextObservable(sources) {
	      this.sources = sources;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(state, recurse) {
	      if (state.pos < state.sources.length) {
	        var current = state.sources[state.pos++];
	        isPromise(current) && (current = observableFromPromise(current));
	        var d = new SingleAssignmentDisposable();
	        state.subscription.setDisposable(d);
	        d.setDisposable(current.subscribe(new OnErrorResumeNextObserver(state, recurse)));
	      } else {
	        state.o.onCompleted();
	      }
	    }
	
	    OnErrorResumeNextObservable.prototype.subscribeCore = function (o) {
	      var subscription = new SerialDisposable(),
	          state = {pos: 0, subscription: subscription, o: o, sources: this.sources },
	          cancellable = immediateScheduler.scheduleRecursive(state, scheduleMethod);
	
	      return new BinaryDisposable(subscription, cancellable);
	    };
	
	    return OnErrorResumeNextObservable;
	  }(ObservableBase));
	
	  var OnErrorResumeNextObserver = (function(__super__) {
	    inherits(OnErrorResumeNextObserver, __super__);
	    function OnErrorResumeNextObserver(state, recurse) {
	      this._state = state;
	      this._recurse = recurse;
	      __super__.call(this);
	    }
	
	    OnErrorResumeNextObserver.prototype.next = function (x) { this._state.o.onNext(x); };
	    OnErrorResumeNextObserver.prototype.error = function () { this._recurse(this._state); };
	    OnErrorResumeNextObserver.prototype.completed = function () { this._recurse(this._state); };
	
	    return OnErrorResumeNextObserver;
	  }(AbstractObserver));
	
	  /**
	   * Continues an observable sequence that is terminated normally or by an exception with the next observable sequence.
	   * @returns {Observable} An observable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
	   */
	  var onErrorResumeNext = Observable.onErrorResumeNext = function () {
	    var sources = [];
	    if (Array.isArray(arguments[0])) {
	      sources = arguments[0];
	    } else {
	      var len = arguments.length;
	      sources = new Array(len);
	      for(var i = 0; i < len; i++) { sources[i] = arguments[i]; }
	    }
	    return new OnErrorResumeNextObservable(sources);
	  };
	
	  var SkipUntilObservable = (function(__super__) {
	    inherits(SkipUntilObservable, __super__);
	
	    function SkipUntilObservable(source, other) {
	      this._s = source;
	      this._o = isPromise(other) ? observableFromPromise(other) : other;
	      this._open = false;
	      __super__.call(this);
	    }
	
	    SkipUntilObservable.prototype.subscribeCore = function(o) {
	      var leftSubscription = new SingleAssignmentDisposable();
	      leftSubscription.setDisposable(this._s.subscribe(new SkipUntilSourceObserver(o, this)));
	
	      isPromise(this._o) && (this._o = observableFromPromise(this._o));
	
	      var rightSubscription = new SingleAssignmentDisposable();
	      rightSubscription.setDisposable(this._o.subscribe(new SkipUntilOtherObserver(o, this, rightSubscription)));
	
	      return new BinaryDisposable(leftSubscription, rightSubscription);
	    };
	
	    return SkipUntilObservable;
	  }(ObservableBase));
	
	  var SkipUntilSourceObserver = (function(__super__) {
	    inherits(SkipUntilSourceObserver, __super__);
	    function SkipUntilSourceObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }
	
	    SkipUntilSourceObserver.prototype.next = function (x) {
	      this._p._open && this._o.onNext(x);
	    };
	
	    SkipUntilSourceObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };
	
	    SkipUntilSourceObserver.prototype.onCompleted = function () {
	      this._p._open && this._o.onCompleted();
	    };
	
	    return SkipUntilSourceObserver;
	  }(AbstractObserver));
	
	  var SkipUntilOtherObserver = (function(__super__) {
	    inherits(SkipUntilOtherObserver, __super__);
	    function SkipUntilOtherObserver(o, p, r) {
	      this._o = o;
	      this._p = p;
	      this._r = r;
	      __super__.call(this);
	    }
	
	    SkipUntilOtherObserver.prototype.next = function () {
	      this._p._open = true;
	      this._r.dispose();
	    };
	
	    SkipUntilOtherObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };
	
	    SkipUntilOtherObserver.prototype.onCompleted = function () {
	      this._r.dispose();
	    };
	
	    return SkipUntilOtherObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the values from the source observable sequence only after the other observable sequence produces a value.
	   * @param {Observable | Promise} other The observable sequence or Promise that triggers propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence starting from the point the other sequence triggered propagation.
	   */
	  observableProto.skipUntil = function (other) {
	    return new SkipUntilObservable(this, other);
	  };
	
	  var SwitchObservable = (function(__super__) {
	    inherits(SwitchObservable, __super__);
	    function SwitchObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    SwitchObservable.prototype.subscribeCore = function (o) {
	      var inner = new SerialDisposable(), s = this.source.subscribe(new SwitchObserver(o, inner));
	      return new BinaryDisposable(s, inner);
	    };
	
	    inherits(SwitchObserver, AbstractObserver);
	    function SwitchObserver(o, inner) {
	      this.o = o;
	      this.inner = inner;
	      this.stopped = false;
	      this.latest = 0;
	      this.hasLatest = false;
	      AbstractObserver.call(this);
	    }
	
	    SwitchObserver.prototype.next = function (innerSource) {
	      var d = new SingleAssignmentDisposable(), id = ++this.latest;
	      this.hasLatest = true;
	      this.inner.setDisposable(d);
	      isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
	      d.setDisposable(innerSource.subscribe(new InnerObserver(this, id)));
	    };
	
	    SwitchObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };
	
	    SwitchObserver.prototype.completed = function () {
	      this.stopped = true;
	      !this.hasLatest && this.o.onCompleted();
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(parent, id) {
	      this.parent = parent;
	      this.id = id;
	      AbstractObserver.call(this);
	    }
	    InnerObserver.prototype.next = function (x) {
	      this.parent.latest === this.id && this.parent.o.onNext(x);
	    };
	
	    InnerObserver.prototype.error = function (e) {
	      this.parent.latest === this.id && this.parent.o.onError(e);
	    };
	
	    InnerObserver.prototype.completed = function () {
	      if (this.parent.latest === this.id) {
	        this.parent.hasLatest = false;
	        this.parent.stopped && this.parent.o.onCompleted();
	      }
	    };
	
	    return SwitchObservable;
	  }(ObservableBase));
	
	  /**
	  * Transforms an observable sequence of observable sequences into an observable sequence producing values only from the most recent observable sequence.
	  * @returns {Observable} The observable sequence that at any point in time produces the elements of the most recent inner observable sequence that has been received.
	  */
	  observableProto['switch'] = observableProto.switchLatest = function () {
	    return new SwitchObservable(this);
	  };
	
	  var TakeUntilObservable = (function(__super__) {
	    inherits(TakeUntilObservable, __super__);
	
	    function TakeUntilObservable(source, other) {
	      this.source = source;
	      this.other = isPromise(other) ? observableFromPromise(other) : other;
	      __super__.call(this);
	    }
	
	    TakeUntilObservable.prototype.subscribeCore = function(o) {
	      return new BinaryDisposable(
	        this.source.subscribe(o),
	        this.other.subscribe(new TakeUntilObserver(o))
	      );
	    };
	
	    return TakeUntilObservable;
	  }(ObservableBase));
	
	  var TakeUntilObserver = (function(__super__) {
	    inherits(TakeUntilObserver, __super__);
	    function TakeUntilObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }
	
	    TakeUntilObserver.prototype.next = function () {
	      this._o.onCompleted();
	    };
	
	    TakeUntilObserver.prototype.error = function (err) {
	      this._o.onError(err);
	    };
	
	    TakeUntilObserver.prototype.onCompleted = noop;
	
	    return TakeUntilObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the values from the source observable sequence until the other observable sequence produces a value.
	   * @param {Observable | Promise} other Observable sequence or Promise that terminates propagation of elements of the source sequence.
	   * @returns {Observable} An observable sequence containing the elements of the source sequence up to the point the other sequence interrupted further propagation.
	   */
	  observableProto.takeUntil = function (other) {
	    return new TakeUntilObservable(this, other);
	  };
	
	  function falseFactory() { return false; }
	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }
	
	  var WithLatestFromObservable = (function(__super__) {
	    inherits(WithLatestFromObservable, __super__);
	    function WithLatestFromObservable(source, sources, resultSelector) {
	      this._s = source;
	      this._ss = sources;
	      this._cb = resultSelector;
	      __super__.call(this);
	    }
	
	    WithLatestFromObservable.prototype.subscribeCore = function (o) {
	      var len = this._ss.length;
	      var state = {
	        hasValue: arrayInitialize(len, falseFactory),
	        hasValueAll: false,
	        values: new Array(len)
	      };
	
	      var n = this._ss.length, subscriptions = new Array(n + 1);
	      for (var i = 0; i < n; i++) {
	        var other = this._ss[i], sad = new SingleAssignmentDisposable();
	        isPromise(other) && (other = observableFromPromise(other));
	        sad.setDisposable(other.subscribe(new WithLatestFromOtherObserver(o, i, state)));
	        subscriptions[i] = sad;
	      }
	
	      var outerSad = new SingleAssignmentDisposable();
	      outerSad.setDisposable(this._s.subscribe(new WithLatestFromSourceObserver(o, this._cb, state)));
	      subscriptions[n] = outerSad;
	
	      return new NAryDisposable(subscriptions);
	    };
	
	    return WithLatestFromObservable;
	  }(ObservableBase));
	
	  var WithLatestFromOtherObserver = (function (__super__) {
	    inherits(WithLatestFromOtherObserver, __super__);
	    function WithLatestFromOtherObserver(o, i, state) {
	      this._o = o;
	      this._i = i;
	      this._state = state;
	      __super__.call(this);
	    }
	
	    WithLatestFromOtherObserver.prototype.next = function (x) {
	      this._state.values[this._i] = x;
	      this._state.hasValue[this._i] = true;
	      this._state.hasValueAll = this._state.hasValue.every(identity);
	    };
	
	    WithLatestFromOtherObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    WithLatestFromOtherObserver.prototype.completed = noop;
	
	    return WithLatestFromOtherObserver;
	  }(AbstractObserver));
	
	  var WithLatestFromSourceObserver = (function (__super__) {
	    inherits(WithLatestFromSourceObserver, __super__);
	    function WithLatestFromSourceObserver(o, cb, state) {
	      this._o = o;
	      this._cb = cb;
	      this._state = state;
	      __super__.call(this);
	    }
	
	    WithLatestFromSourceObserver.prototype.next = function (x) {
	      var allValues = [x].concat(this._state.values);
	      if (!this._state.hasValueAll) { return; }
	      var res = tryCatch(this._cb).apply(null, allValues);
	      if (res === errorObj) { return this._o.onError(res.e); }
	      this._o.onNext(res);
	    };
	
	    WithLatestFromSourceObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    WithLatestFromSourceObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };
	
	    return WithLatestFromSourceObserver;
	  }(AbstractObserver));
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function only when the (first) source observable sequence produces an element.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  observableProto.withLatestFrom = function () {
	    if (arguments.length === 0) { throw new Error('invalid arguments'); }
	
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	
	    return new WithLatestFromObservable(this, args, resultSelector);
	  };
	
	  function falseFactory() { return false; }
	  function emptyArrayFactory() { return []; }
	
	  var ZipObservable = (function(__super__) {
	    inherits(ZipObservable, __super__);
	    function ZipObservable(sources, resultSelector) {
	      this._s = sources;
	      this._cb = resultSelector;
	      __super__.call(this);
	    }
	
	    ZipObservable.prototype.subscribeCore = function(observer) {
	      var n = this._s.length,
	          subscriptions = new Array(n),
	          done = arrayInitialize(n, falseFactory),
	          q = arrayInitialize(n, emptyArrayFactory);
	
	      for (var i = 0; i < n; i++) {
	        var source = this._s[i], sad = new SingleAssignmentDisposable();
	        subscriptions[i] = sad;
	        isPromise(source) && (source = observableFromPromise(source));
	        sad.setDisposable(source.subscribe(new ZipObserver(observer, i, this, q, done)));
	      }
	
	      return new NAryDisposable(subscriptions);
	    };
	
	    return ZipObservable;
	  }(ObservableBase));
	
	  var ZipObserver = (function (__super__) {
	    inherits(ZipObserver, __super__);
	    function ZipObserver(o, i, p, q, d) {
	      this._o = o;
	      this._i = i;
	      this._p = p;
	      this._q = q;
	      this._d = d;
	      __super__.call(this);
	    }
	
	    function notEmpty(x) { return x.length > 0; }
	    function shiftEach(x) { return x.shift(); }
	    function notTheSame(i) {
	      return function (x, j) {
	        return j !== i;
	      };
	    }
	
	    ZipObserver.prototype.next = function (x) {
	      this._q[this._i].push(x);
	      if (this._q.every(notEmpty)) {
	        var queuedValues = this._q.map(shiftEach);
	        var res = tryCatch(this._p._cb).apply(null, queuedValues);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._o.onNext(res);
	      } else if (this._d.filter(notTheSame(this._i)).every(identity)) {
	        this._o.onCompleted();
	      }
	    };
	
	    ZipObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ZipObserver.prototype.completed = function () {
	      this._d[this._i] = true;
	      this._d.every(identity) && this._o.onCompleted();
	    };
	
	    return ZipObserver;
	  }(AbstractObserver));
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	   * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	   */
	  observableProto.zip = function () {
	    if (arguments.length === 0) { throw new Error('invalid arguments'); }
	
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	
	    var parent = this;
	    args.unshift(parent);
	
	    return new ZipObservable(args, resultSelector);
	  };
	
	  /**
	   * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences have produced an element at a corresponding index.
	   * @param arguments Observable sources.
	   * @param {Function} resultSelector Function to invoke for each series of elements at corresponding indexes in the sources.
	   * @returns {Observable} An observable sequence containing the result of combining elements of the sources using the specified result selector function.
	   */
	  Observable.zip = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args = isFunction(args[1]) ? args[0].concat(args[1]) : args[0];
	    }
	    var first = args.shift();
	    return first.zip.apply(first, args);
	  };
	
	function falseFactory() { return false; }
	function emptyArrayFactory() { return []; }
	function argumentsToArray() {
	  var len = arguments.length, args = new Array(len);
	  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	  return args;
	}
	
	var ZipIterableObservable = (function(__super__) {
	  inherits(ZipIterableObservable, __super__);
	  function ZipIterableObservable(sources, cb) {
	    this.sources = sources;
	    this._cb = cb;
	    __super__.call(this);
	  }
	
	  ZipIterableObservable.prototype.subscribeCore = function (o) {
	    var sources = this.sources, len = sources.length, subscriptions = new Array(len);
	
	    var state = {
	      q: arrayInitialize(len, emptyArrayFactory),
	      done: arrayInitialize(len, falseFactory),
	      cb: this._cb,
	      o: o
	    };
	
	    for (var i = 0; i < len; i++) {
	      (function (i) {
	        var source = sources[i], sad = new SingleAssignmentDisposable();
	        (isArrayLike(source) || isIterable(source)) && (source = observableFrom(source));
	
	        subscriptions[i] = sad;
	        sad.setDisposable(source.subscribe(new ZipIterableObserver(state, i)));
	      }(i));
	    }
	
	    return new NAryDisposable(subscriptions);
	  };
	
	  return ZipIterableObservable;
	}(ObservableBase));
	
	var ZipIterableObserver = (function (__super__) {
	  inherits(ZipIterableObserver, __super__);
	  function ZipIterableObserver(s, i) {
	    this._s = s;
	    this._i = i;
	    __super__.call(this);
	  }
	
	  function notEmpty(x) { return x.length > 0; }
	  function shiftEach(x) { return x.shift(); }
	  function notTheSame(i) {
	    return function (x, j) {
	      return j !== i;
	    };
	  }
	
	  ZipIterableObserver.prototype.next = function (x) {
	    this._s.q[this._i].push(x);
	    if (this._s.q.every(notEmpty)) {
	      var queuedValues = this._s.q.map(shiftEach),
	          res = tryCatch(this._s.cb).apply(null, queuedValues);
	      if (res === errorObj) { return this._s.o.onError(res.e); }
	      this._s.o.onNext(res);
	    } else if (this._s.done.filter(notTheSame(this._i)).every(identity)) {
	      this._s.o.onCompleted();
	    }
	  };
	
	  ZipIterableObserver.prototype.error = function (e) { this._s.o.onError(e); };
	
	  ZipIterableObserver.prototype.completed = function () {
	    this._s.done[this._i] = true;
	    this._s.done.every(identity) && this._s.o.onCompleted();
	  };
	
	  return ZipIterableObserver;
	}(AbstractObserver));
	
	/**
	 * Merges the specified observable sequences into one observable sequence by using the selector function whenever all of the observable sequences or an array have produced an element at a corresponding index.
	 * The last element in the arguments must be a function to invoke for each series of elements at corresponding indexes in the args.
	 * @returns {Observable} An observable sequence containing the result of combining elements of the args using the specified result selector function.
	 */
	observableProto.zipIterable = function () {
	  if (arguments.length === 0) { throw new Error('invalid arguments'); }
	
	  var len = arguments.length, args = new Array(len);
	  for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	  var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	
	  var parent = this;
	  args.unshift(parent);
	  return new ZipIterableObservable(args, resultSelector);
	};
	
	  function asObservable(source) {
	    return function subscribe(o) { return source.subscribe(o); };
	  }
	
	  /**
	   *  Hides the identity of an observable sequence.
	   * @returns {Observable} An observable sequence that hides the identity of the source sequence.
	   */
	  observableProto.asObservable = function () {
	    return new AnonymousObservable(asObservable(this), this);
	  };
	
	  function toArray(x) { return x.toArray(); }
	  function notEmpty(x) { return x.length > 0; }
	
	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on element count information.
	   * @param {Number} count Length of each buffer.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive buffers. If not provided, defaults to the count.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithCount = function (count, skip) {
	    typeof skip !== 'number' && (skip = count);
	    return this.windowWithCount(count, skip)
	      .flatMap(toArray)
	      .filter(notEmpty);
	  };
	
	  var DematerializeObservable = (function (__super__) {
	    inherits(DematerializeObservable, __super__);
	    function DematerializeObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    DematerializeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DematerializeObserver(o));
	    };
	
	    return DematerializeObservable;
	  }(ObservableBase));
	
	  var DematerializeObserver = (function (__super__) {
	    inherits(DematerializeObserver, __super__);
	
	    function DematerializeObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }
	
	    DematerializeObserver.prototype.next = function (x) { x.accept(this._o); };
	    DematerializeObserver.prototype.error = function (e) { this._o.onError(e); };
	    DematerializeObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return DematerializeObserver;
	  }(AbstractObserver));
	
	  /**
	   * Dematerializes the explicit notification values of an observable sequence as implicit notifications.
	   * @returns {Observable} An observable sequence exhibiting the behavior corresponding to the source sequence's notification values.
	   */
	  observableProto.dematerialize = function () {
	    return new DematerializeObservable(this);
	  };
	
	  var DistinctUntilChangedObservable = (function(__super__) {
	    inherits(DistinctUntilChangedObservable, __super__);
	    function DistinctUntilChangedObservable(source, keyFn, comparer) {
	      this.source = source;
	      this.keyFn = keyFn;
	      this.comparer = comparer;
	      __super__.call(this);
	    }
	
	    DistinctUntilChangedObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DistinctUntilChangedObserver(o, this.keyFn, this.comparer));
	    };
	
	    return DistinctUntilChangedObservable;
	  }(ObservableBase));
	
	  var DistinctUntilChangedObserver = (function(__super__) {
	    inherits(DistinctUntilChangedObserver, __super__);
	    function DistinctUntilChangedObserver(o, keyFn, comparer) {
	      this.o = o;
	      this.keyFn = keyFn;
	      this.comparer = comparer;
	      this.hasCurrentKey = false;
	      this.currentKey = null;
	      __super__.call(this);
	    }
	
	    DistinctUntilChangedObserver.prototype.next = function (x) {
	      var key = x, comparerEquals;
	      if (isFunction(this.keyFn)) {
	        key = tryCatch(this.keyFn)(x);
	        if (key === errorObj) { return this.o.onError(key.e); }
	      }
	      if (this.hasCurrentKey) {
	        comparerEquals = tryCatch(this.comparer)(this.currentKey, key);
	        if (comparerEquals === errorObj) { return this.o.onError(comparerEquals.e); }
	      }
	      if (!this.hasCurrentKey || !comparerEquals) {
	        this.hasCurrentKey = true;
	        this.currentKey = key;
	        this.o.onNext(x);
	      }
	    };
	    DistinctUntilChangedObserver.prototype.error = function(e) {
	      this.o.onError(e);
	    };
	    DistinctUntilChangedObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };
	
	    return DistinctUntilChangedObserver;
	  }(AbstractObserver));
	
	  /**
	  *  Returns an observable sequence that contains only distinct contiguous elements according to the keyFn and the comparer.
	  * @param {Function} [keyFn] A function to compute the comparison key for each element. If not provided, it projects the value.
	  * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
	  * @returns {Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
	  */
	  observableProto.distinctUntilChanged = function (keyFn, comparer) {
	    comparer || (comparer = defaultComparer);
	    return new DistinctUntilChangedObservable(this, keyFn, comparer);
	  };
	
	  var TapObservable = (function(__super__) {
	    inherits(TapObservable,__super__);
	    function TapObservable(source, observerOrOnNext, onError, onCompleted) {
	      this.source = source;
	      this._oN = observerOrOnNext;
	      this._oE = onError;
	      this._oC = onCompleted;
	      __super__.call(this);
	    }
	
	    TapObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new InnerObserver(o, this));
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, p) {
	      this.o = o;
	      this.t = !p._oN || isFunction(p._oN) ?
	        observerCreate(p._oN || noop, p._oE || noop, p._oC || noop) :
	        p._oN;
	      this.isStopped = false;
	      AbstractObserver.call(this);
	    }
	    InnerObserver.prototype.next = function(x) {
	      var res = tryCatch(this.t.onNext).call(this.t, x);
	      if (res === errorObj) { this.o.onError(res.e); }
	      this.o.onNext(x);
	    };
	    InnerObserver.prototype.error = function(err) {
	      var res = tryCatch(this.t.onError).call(this.t, err);
	      if (res === errorObj) { return this.o.onError(res.e); }
	      this.o.onError(err);
	    };
	    InnerObserver.prototype.completed = function() {
	      var res = tryCatch(this.t.onCompleted).call(this.t);
	      if (res === errorObj) { return this.o.onError(res.e); }
	      this.o.onCompleted();
	    };
	
	    return TapObservable;
	  }(ObservableBase));
	
	  /**
	  *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function | Observer} observerOrOnNext Action to invoke for each element in the observable sequence or an o.
	  * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto['do'] = observableProto.tap = observableProto.doAction = function (observerOrOnNext, onError, onCompleted) {
	    return new TapObservable(this, observerOrOnNext, onError, onCompleted);
	  };
	
	  /**
	  *  Invokes an action for each element in the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onNext Action to invoke for each element in the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnNext = observableProto.tapOnNext = function (onNext, thisArg) {
	    return this.tap(typeof thisArg !== 'undefined' ? function (x) { onNext.call(thisArg, x); } : onNext);
	  };
	
	  /**
	  *  Invokes an action upon exceptional termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onError Action to invoke upon exceptional termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnError = observableProto.tapOnError = function (onError, thisArg) {
	    return this.tap(noop, typeof thisArg !== 'undefined' ? function (e) { onError.call(thisArg, e); } : onError);
	  };
	
	  /**
	  *  Invokes an action upon graceful termination of the observable sequence.
	  *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
	  * @param {Function} onCompleted Action to invoke upon graceful termination of the observable sequence.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} The source sequence with the side-effecting behavior applied.
	  */
	  observableProto.doOnCompleted = observableProto.tapOnCompleted = function (onCompleted, thisArg) {
	    return this.tap(noop, null, typeof thisArg !== 'undefined' ? function () { onCompleted.call(thisArg); } : onCompleted);
	  };
	
	  var FinallyObservable = (function (__super__) {
	    inherits(FinallyObservable, __super__);
	    function FinallyObservable(source, fn, thisArg) {
	      this.source = source;
	      this._fn = bindCallback(fn, thisArg, 0);
	      __super__.call(this);
	    }
	
	    FinallyObservable.prototype.subscribeCore = function (o) {
	      var d = tryCatch(this.source.subscribe).call(this.source, o);
	      if (d === errorObj) {
	        this._fn();
	        thrower(d.e);
	      }
	
	      return new FinallyDisposable(d, this._fn);
	    };
	
	    function FinallyDisposable(s, fn) {
	      this.isDisposed = false;
	      this._s = s;
	      this._fn = fn;
	    }
	    FinallyDisposable.prototype.dispose = function () {
	      if (!this.isDisposed) {
	        var res = tryCatch(this._s.dispose).call(this._s);
	        this._fn();
	        res === errorObj && thrower(res.e);
	      }
	    };
	
	    return FinallyObservable;
	
	  }(ObservableBase));
	
	  /**
	   *  Invokes a specified action after the source observable sequence terminates gracefully or exceptionally.
	   * @param {Function} finallyAction Action to invoke after the source observable sequence terminates.
	   * @returns {Observable} Source sequence with the action-invoking termination behavior applied.
	   */
	  observableProto['finally'] = function (action, thisArg) {
	    return new FinallyObservable(this, action, thisArg);
	  };
	
	  var IgnoreElementsObservable = (function(__super__) {
	    inherits(IgnoreElementsObservable, __super__);
	
	    function IgnoreElementsObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    IgnoreElementsObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o));
	    };
	
	    function InnerObserver(o) {
	      this.o = o;
	      this.isStopped = false;
	    }
	    InnerObserver.prototype.onNext = noop;
	    InnerObserver.prototype.onError = function (err) {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onError(err);
	      }
	    };
	    InnerObserver.prototype.onCompleted = function () {
	      if(!this.isStopped) {
	        this.isStopped = true;
	        this.o.onCompleted();
	      }
	    };
	    InnerObserver.prototype.dispose = function() { this.isStopped = true; };
	    InnerObserver.prototype.fail = function (e) {
	      if (!this.isStopped) {
	        this.isStopped = true;
	        this.observer.onError(e);
	        return true;
	      }
	
	      return false;
	    };
	
	    return IgnoreElementsObservable;
	  }(ObservableBase));
	
	  /**
	   *  Ignores all elements in an observable sequence leaving only the termination messages.
	   * @returns {Observable} An empty observable sequence that signals termination, successful or exceptional, of the source sequence.
	   */
	  observableProto.ignoreElements = function () {
	    return new IgnoreElementsObservable(this);
	  };
	
	  var MaterializeObservable = (function (__super__) {
	    inherits(MaterializeObservable, __super__);
	    function MaterializeObservable(source, fn) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    MaterializeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new MaterializeObserver(o));
	    };
	
	    return MaterializeObservable;
	  }(ObservableBase));
	
	  var MaterializeObserver = (function (__super__) {
	    inherits(MaterializeObserver, __super__);
	
	    function MaterializeObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }
	
	    MaterializeObserver.prototype.next = function (x) { this._o.onNext(notificationCreateOnNext(x)) };
	    MaterializeObserver.prototype.error = function (e) { this._o.onNext(notificationCreateOnError(e)); this._o.onCompleted(); };
	    MaterializeObserver.prototype.completed = function () { this._o.onNext(notificationCreateOnCompleted()); this._o.onCompleted(); };
	
	    return MaterializeObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Materializes the implicit notifications of an observable sequence as explicit notification values.
	   * @returns {Observable} An observable sequence containing the materialized notification values from the source sequence.
	   */
	  observableProto.materialize = function () {
	    return new MaterializeObservable(this);
	  };
	
	  /**
	   *  Repeats the observable sequence a specified number of times. If the repeat count is not specified, the sequence repeats indefinitely.
	   * @param {Number} [repeatCount]  Number of times to repeat the sequence. If not provided, repeats the sequence indefinitely.
	   * @returns {Observable} The observable sequence producing the elements of the given sequence repeatedly.
	   */
	  observableProto.repeat = function (repeatCount) {
	    return enumerableRepeat(this, repeatCount).concat();
	  };
	
	  /**
	   *  Repeats the source observable sequence the specified number of times or until it successfully terminates. If the retry count is not specified, it retries indefinitely.
	   *  Note if you encounter an error and want it to retry once, then you must use .retry(2);
	   *
	   * @example
	   *  var res = retried = retry.repeat();
	   *  var res = retried = retry.repeat(2);
	   * @param {Number} [retryCount]  Number of times to retry the sequence. If not provided, retry the sequence indefinitely.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retry = function (retryCount) {
	    return enumerableRepeat(this, retryCount).catchError();
	  };
	
	  /**
	   *  Repeats the source observable sequence upon error each time the notifier emits or until it successfully terminates. 
	   *  if the notifier completes, the observable sequence completes.
	   *
	   * @example
	   *  var timer = Observable.timer(500);
	   *  var source = observable.retryWhen(timer);
	   * @param {Observable} [notifier] An observable that triggers the retries or completes the observable with onNext or onCompleted respectively.
	   * @returns {Observable} An observable sequence producing the elements of the given sequence repeatedly until it terminates successfully.
	   */
	  observableProto.retryWhen = function (notifier) {
	    return enumerableRepeat(this).catchErrorWhen(notifier);
	  };
	  var ScanObservable = (function(__super__) {
	    inherits(ScanObservable, __super__);
	    function ScanObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }
	
	    ScanObservable.prototype.subscribeCore = function(o) {
	      return this.source.subscribe(new ScanObserver(o,this));
	    };
	
	    return ScanObservable;
	  }(ObservableBase));
	
	  var ScanObserver = (function (__super__) {
	    inherits(ScanObserver, __super__);
	    function ScanObserver(o, parent) {
	      this._o = o;
	      this._p = parent;
	      this._fn = parent.accumulator;
	      this._hs = parent.hasSeed;
	      this._s = parent.seed;
	      this._ha = false;
	      this._a = null;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    ScanObserver.prototype.next = function (x) {
	      !this._hv && (this._hv = true);
	      if (this._ha) {
	        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
	      } else {
	        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
	        this._ha = true;
	      }
	      if (this._a === errorObj) { return this._o.onError(this._a.e); }
	      this._o.onNext(this._a);
	      this._i++;
	    };
	
	    ScanObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ScanObserver.prototype.completed = function () {
	      !this._hv && this._hs && this._o.onNext(this._s);
	      this._o.onCompleted();
	    };
	
	    return ScanObserver;
	  }(AbstractObserver));
	
	  /**
	  *  Applies an accumulator function over an observable sequence and returns each intermediate result. The optional seed value is used as the initial accumulator value.
	  *  For aggregation behavior with no intermediate results, see Observable.aggregate.
	  * @param {Mixed} [seed] The initial accumulator value.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @returns {Observable} An observable sequence containing the accumulated values.
	  */
	  observableProto.scan = function () {
	    var hasSeed = false, seed, accumulator = arguments[0];
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[1];
	    }
	    return new ScanObservable(this, accumulator, hasSeed, seed);
	  };
	
	  var SkipLastObservable = (function (__super__) {
	    inherits(SkipLastObservable, __super__);
	    function SkipLastObservable(source, c) {
	      this.source = source;
	      this._c = c;
	      __super__.call(this);
	    }
	
	    SkipLastObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipLastObserver(o, this._c));
	    };
	
	    return SkipLastObservable;
	  }(ObservableBase));
	
	  var SkipLastObserver = (function (__super__) {
	    inherits(SkipLastObserver, __super__);
	    function SkipLastObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }
	
	    SkipLastObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._o.onNext(this._q.shift());
	    };
	
	    SkipLastObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    SkipLastObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };
	
	    return SkipLastObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Bypasses a specified number of elements at the end of an observable sequence.
	   * @description
	   *  This operator accumulates a queue with a length enough to store the first `count` elements. As more elements are
	   *  received, elements are taken from the front of the queue and produced on the result sequence. This causes elements to be delayed.
	   * @param count Number of elements to bypass at the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the source sequence elements except for the bypassed ones at the end.
	   */
	  observableProto.skipLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipLastObservable(this, count);
	  };
	
	  /**
	   *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
	   *  @example
	   *  var res = source.startWith(1, 2, 3);
	   *  var res = source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
	   * @param {Arguments} args The specified values to prepend to the observable sequence
	   * @returns {Observable} The source sequence prepended with the specified values.
	   */
	  observableProto.startWith = function () {
	    var values, scheduler, start = 0;
	    if (!!arguments.length && isScheduler(arguments[0])) {
	      scheduler = arguments[0];
	      start = 1;
	    } else {
	      scheduler = immediateScheduler;
	    }
	    for(var args = [], i = start, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	    return enumerableOf([observableFromArray(args, scheduler), this]).concat();
	  };
	
	  var TakeLastObserver = (function (__super__) {
	    inherits(TakeLastObserver, __super__);
	    function TakeLastObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }
	
	    TakeLastObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._q.shift();
	    };
	
	    TakeLastObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    TakeLastObserver.prototype.completed = function () {
	      while (this._q.length > 0) { this._o.onNext(this._q.shift()); }
	      this._o.onCompleted();
	    };
	
	    return TakeLastObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns a specified number of contiguous elements from the end of an observable sequence.
	   * @description
	   *  This operator accumulates a buffer with a length enough to store elements count elements. Upon completion of
	   *  the source sequence, this buffer is drained on the result sequence. This causes the elements to be delayed.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLast = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new TakeLastObserver(o, count));
	    }, source);
	  };
	
	  var TakeLastBufferObserver = (function (__super__) {
	    inherits(TakeLastBufferObserver, __super__);
	    function TakeLastBufferObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._q = [];
	      __super__.call(this);
	    }
	
	    TakeLastBufferObserver.prototype.next = function (x) {
	      this._q.push(x);
	      this._q.length > this._c && this._q.shift();
	    };
	
	    TakeLastBufferObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    TakeLastBufferObserver.prototype.completed = function () {
	      this._o.onNext(this._q);
	      this._o.onCompleted();
	    };
	
	    return TakeLastBufferObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns an array with the specified number of contiguous elements from the end of an observable sequence.
	   *
	   * @description
	   *  This operator accumulates a buffer with a length enough to store count elements. Upon completion of the
	   *  source sequence, this buffer is produced on the result sequence.
	   * @param {Number} count Number of elements to take from the end of the source sequence.
	   * @returns {Observable} An observable sequence containing a single array with the specified number of elements from the end of the source sequence.
	   */
	  observableProto.takeLastBuffer = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new TakeLastBufferObserver(o, count));
	    }, source);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on element count information.
	   * @param {Number} count Length of each window.
	   * @param {Number} [skip] Number of elements to skip between creation of consecutive windows. If not specified, defaults to the count.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithCount = function (count, skip) {
	    var source = this;
	    +count || (count = 0);
	    Math.abs(count) === Infinity && (count = 0);
	    if (count <= 0) { throw new ArgumentOutOfRangeError(); }
	    skip == null && (skip = count);
	    +skip || (skip = 0);
	    Math.abs(skip) === Infinity && (skip = 0);
	
	    if (skip <= 0) { throw new ArgumentOutOfRangeError(); }
	    return new AnonymousObservable(function (observer) {
	      var m = new SingleAssignmentDisposable(),
	        refCountDisposable = new RefCountDisposable(m),
	        n = 0,
	        q = [];
	
	      function createWindow () {
	        var s = new Subject();
	        q.push(s);
	        observer.onNext(addRef(s, refCountDisposable));
	      }
	
	      createWindow();
	
	      m.setDisposable(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	          var c = n - count + 1;
	          c >= 0 && c % skip === 0 && q.shift().onCompleted();
	          ++n % skip === 0 && createWindow();
	        },
	        function (e) {
	          while (q.length > 0) { q.shift().onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          while (q.length > 0) { q.shift().onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	  function concatMap(source, selector, thisArg) {
	    var selectorFunc = bindCallback(selector, thisArg, 3);
	    return source.map(function (x, i) {
	      var result = selectorFunc(x, i, source);
	      isPromise(result) && (result = observableFromPromise(result));
	      (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
	      return result;
	    }).concatAll();
	  }
	
	  /**
	   *  One of the Following:
	   *  Projects each element of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   * @example
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); });
	   *  Or:
	   *  Projects each element of an observable sequence to an observable sequence, invokes the result selector for the source element and each of the corresponding inner sequence's elements, and merges the results into one observable sequence.
	   *
	   *  var res = source.concatMap(function (x) { return Rx.Observable.range(0, x); }, function (x, y) { return x + y; });
	   *  Or:
	   *  Projects each element of the source observable sequence to the other observable sequence and merges the resulting observable sequences into one observable sequence.
	   *
	   *  var res = source.concatMap(Rx.Observable.fromArray([1,2,3]));
	   * @param {Function} selector A transform function to apply to each element or an observable sequence to project each element from the
	   * source sequence onto which could be either an observable or Promise.
	   * @param {Function} [resultSelector]  A transform function to apply to each element of the intermediate sequence.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of the input sequence and then mapping each of those sequence elements and their corresponding source element to a result element.
	   */
	  observableProto.selectConcat = observableProto.concatMap = function (selector, resultSelector, thisArg) {
	    if (isFunction(selector) && isFunction(resultSelector)) {
	      return this.concatMap(function (x, i) {
	        var selectorResult = selector(x, i);
	        isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
	        (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));
	
	        return selectorResult.map(function (y, i2) {
	          return resultSelector(x, y, i, i2);
	        });
	      });
	    }
	    return isFunction(selector) ?
	      concatMap(this, selector, thisArg) :
	      concatMap(this, function () { return selector; });
	  };
	
	  /**
	   * Projects each notification of an observable sequence to an observable sequence and concats the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
	    var source = this,
	        onNextFunc = bindCallback(onNext, thisArg, 2),
	        onErrorFunc = bindCallback(onError, thisArg, 1),
	        onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNextFunc(x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onErrorFunc(err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompletedFunc();
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, this).concatAll();
	  };
	
	  var DefaultIfEmptyObserver = (function (__super__) {
	    inherits(DefaultIfEmptyObserver, __super__);
	    function DefaultIfEmptyObserver(o, d) {
	      this._o = o;
	      this._d = d;
	      this._f = false;
	      __super__.call(this);
	    }
	
	    DefaultIfEmptyObserver.prototype.next = function (x) {
	      this._f = true;
	      this._o.onNext(x);
	    };
	
	    DefaultIfEmptyObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    DefaultIfEmptyObserver.prototype.completed = function () {
	      !this._f && this._o.onNext(this._d);
	      this._o.onCompleted();
	    };
	
	    return DefaultIfEmptyObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns the elements of the specified sequence or the specified value in a singleton sequence if the sequence is empty.
	   *
	   *  var res = obs = xs.defaultIfEmpty();
	   *  2 - obs = xs.defaultIfEmpty(false);
	   *
	   * @memberOf Observable#
	   * @param defaultValue The value to return if the sequence is empty. If not provided, this defaults to null.
	   * @returns {Observable} An observable sequence that contains the specified default value if the source is empty; otherwise, the elements of the source itself.
	   */
	    observableProto.defaultIfEmpty = function (defaultValue) {
	      var source = this;
	      defaultValue === undefined && (defaultValue = null);
	      return new AnonymousObservable(function (o) {
	        return source.subscribe(new DefaultIfEmptyObserver(o, defaultValue));
	      }, source);
	    };
	
	  // Swap out for Array.findIndex
	  function arrayIndexOfComparer(array, item, comparer) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      if (comparer(array[i], item)) { return i; }
	    }
	    return -1;
	  }
	
	  function HashSet(comparer) {
	    this.comparer = comparer;
	    this.set = [];
	  }
	  HashSet.prototype.push = function(value) {
	    var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
	    retValue && this.set.push(value);
	    return retValue;
	  };
	
	  var DistinctObservable = (function (__super__) {
	    inherits(DistinctObservable, __super__);
	    function DistinctObservable(source, keyFn, cmpFn) {
	      this.source = source;
	      this._keyFn = keyFn;
	      this._cmpFn = cmpFn;
	      __super__.call(this);
	    }
	
	    DistinctObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new DistinctObserver(o, this._keyFn, this._cmpFn));
	    };
	
	    return DistinctObservable;
	  }(ObservableBase));
	
	  var DistinctObserver = (function (__super__) {
	    inherits(DistinctObserver, __super__);
	    function DistinctObserver(o, keyFn, cmpFn) {
	      this._o = o;
	      this._keyFn = keyFn;
	      this._h = new HashSet(cmpFn);
	      __super__.call(this);
	    }
	
	    DistinctObserver.prototype.next = function (x) {
	      var key = x;
	      if (isFunction(this._keyFn)) {
	        key = tryCatch(this._keyFn)(x);
	        if (key === errorObj) { return this._o.onError(key.e); }
	      }
	      this._h.push(key) && this._o.onNext(x);
	    };
	
	    DistinctObserver.prototype.error = function (e) { this._o.onError(e); };
	    DistinctObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return DistinctObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns an observable sequence that contains only distinct elements according to the keySelector and the comparer.
	   *  Usage of this operator should be considered carefully due to the maintenance of an internal lookup structure which can grow large.
	   *
	   * @example
	   *  var res = obs = xs.distinct();
	   *  2 - obs = xs.distinct(function (x) { return x.id; });
	   *  2 - obs = xs.distinct(function (x) { return x.id; }, function (a,b) { return a === b; });
	   * @param {Function} [keySelector]  A function to compute the comparison key for each element.
	   * @param {Function} [comparer]  Used to compare items in the collection.
	   * @returns {Observable} An observable sequence only containing the distinct elements, based on a computed key value, from the source sequence.
	   */
	  observableProto.distinct = function (keySelector, comparer) {
	    comparer || (comparer = defaultComparer);
	    return new DistinctObservable(this, keySelector, comparer);
	  };
	
	  /**
	   *  Groups the elements of an observable sequence according to a specified key selector function and comparer and selects the resulting elements by using a specified function.
	   *
	   * @example
	   *  var res = observable.groupBy(function (x) { return x.id; });
	   *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; });
	   *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; }, function (x) { return x.toString(); });
	   * @param {Function} keySelector A function to extract the key for each element.
	   * @param {Function} [elementSelector]  A function to map each source element to an element in an observable group.
	   * @returns {Observable} A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	   */
	  observableProto.groupBy = function (keySelector, elementSelector) {
	    return this.groupByUntil(keySelector, elementSelector, observableNever);
	  };
	
	    /**
	     *  Groups the elements of an observable sequence according to a specified key selector function.
	     *  A duration selector function is used to control the lifetime of groups. When a group expires, it receives an OnCompleted notification. When a new element with the same
	     *  key value as a reclaimed group occurs, the group will be reborn with a new lifetime request.
	     *
	     * @example
	     *  var res = observable.groupByUntil(function (x) { return x.id; }, null,  function () { return Rx.Observable.never(); });
	     *  2 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); });
	     *  3 - observable.groupBy(function (x) { return x.id; }), function (x) { return x.name; },  function () { return Rx.Observable.never(); }, function (x) { return x.toString(); });
	     * @param {Function} keySelector A function to extract the key for each element.
	     * @param {Function} durationSelector A function to signal the expiration of a group.
	     * @returns {Observable}
	     *  A sequence of observable groups, each of which corresponds to a unique key value, containing all elements that share that same key value.
	     *  If a group's lifetime expires, a new group with the same key value can be created once an element with such a key value is encoutered.
	     *
	     */
	    observableProto.groupByUntil = function (keySelector, elementSelector, durationSelector) {
	      var source = this;
	      return new AnonymousObservable(function (o) {
	        var map = new Map(),
	          groupDisposable = new CompositeDisposable(),
	          refCountDisposable = new RefCountDisposable(groupDisposable),
	          handleError = function (e) { return function (item) { item.onError(e); }; };
	
	        groupDisposable.add(
	          source.subscribe(function (x) {
	            var key = tryCatch(keySelector)(x);
	            if (key === errorObj) {
	              map.forEach(handleError(key.e));
	              return o.onError(key.e);
	            }
	
	            var fireNewMapEntry = false, writer = map.get(key);
	            if (writer === undefined) {
	              writer = new Subject();
	              map.set(key, writer);
	              fireNewMapEntry = true;
	            }
	
	            if (fireNewMapEntry) {
	              var group = new GroupedObservable(key, writer, refCountDisposable),
	                durationGroup = new GroupedObservable(key, writer);
	              var duration = tryCatch(durationSelector)(durationGroup);
	              if (duration === errorObj) {
	                map.forEach(handleError(duration.e));
	                return o.onError(duration.e);
	              }
	
	              o.onNext(group);
	
	              var md = new SingleAssignmentDisposable();
	              groupDisposable.add(md);
	
	              md.setDisposable(duration.take(1).subscribe(
	                noop,
	                function (e) {
	                  map.forEach(handleError(e));
	                  o.onError(e);
	                },
	                function () {
	                  if (map['delete'](key)) { writer.onCompleted(); }
	                  groupDisposable.remove(md);
	                }));
	            }
	
	            var element = x;
	            if (isFunction(elementSelector)) {
	              element = tryCatch(elementSelector)(x);
	              if (element === errorObj) {
	                map.forEach(handleError(element.e));
	                return o.onError(element.e);
	              }
	            }
	
	            writer.onNext(element);
	        }, function (e) {
	          map.forEach(handleError(e));
	          o.onError(e);
	        }, function () {
	          map.forEach(function (item) { item.onCompleted(); });
	          o.onCompleted();
	        }));
	
	      return refCountDisposable;
	    }, source);
	  };
	
	  var MapObservable = (function (__super__) {
	    inherits(MapObservable, __super__);
	
	    function MapObservable(source, selector, thisArg) {
	      this.source = source;
	      this.selector = bindCallback(selector, thisArg, 3);
	      __super__.call(this);
	    }
	
	    function innerMap(selector, self) {
	      return function (x, i, o) { return selector.call(this, self.selector(x, i, o), i, o); };
	    }
	
	    MapObservable.prototype.internalMap = function (selector, thisArg) {
	      return new MapObservable(this.source, innerMap(selector, this), thisArg);
	    };
	
	    MapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.selector, this));
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, selector, source) {
	      this.o = o;
	      this.selector = selector;
	      this.source = source;
	      this.i = 0;
	      AbstractObserver.call(this);
	    }
	
	    InnerObserver.prototype.next = function(x) {
	      var result = tryCatch(this.selector)(x, this.i++, this.source);
	      if (result === errorObj) { return this.o.onError(result.e); }
	      this.o.onNext(result);
	    };
	
	    InnerObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };
	
	    InnerObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };
	
	    return MapObservable;
	
	  }(ObservableBase));
	
	  /**
	  * Projects each element of an observable sequence into a new form by incorporating the element's index.
	  * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
	  */
	  observableProto.map = observableProto.select = function (selector, thisArg) {
	    var selectorFn = typeof selector === 'function' ? selector : function () { return selector; };
	    return this instanceof MapObservable ?
	      this.internalMap(selectorFn, thisArg) :
	      new MapObservable(this, selectorFn, thisArg);
	  };
	
	  function plucker(args, len) {
	    return function mapper(x) {
	      var currentProp = x;
	      for (var i = 0; i < len; i++) {
	        var p = currentProp[args[i]];
	        if (typeof p !== 'undefined') {
	          currentProp = p;
	        } else {
	          return undefined;
	        }
	      }
	      return currentProp;
	    }
	  }
	
	  /**
	   * Retrieves the value of a specified nested property from all elements in
	   * the Observable sequence.
	   * @param {Arguments} arguments The nested properties to pluck.
	   * @returns {Observable} Returns a new Observable sequence of property values.
	   */
	  observableProto.pluck = function () {
	    var len = arguments.length, args = new Array(len);
	    if (len === 0) { throw new Error('List of properties cannot be empty.'); }
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return this.map(plucker(args, len));
	  };
	
	observableProto.flatMap = observableProto.selectMany = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).mergeAll();
	};
	
	  /**
	   * Projects each notification of an observable sequence to an observable sequence and merges the resulting observable sequences into one observable sequence.
	   * @param {Function} onNext A transform function to apply to each element; the second parameter of the function represents the index of the source element.
	   * @param {Function} onError A transform function to apply when an error occurs in the source sequence.
	   * @param {Function} onCompleted A transform function to apply when the end of the source sequence is reached.
	   * @param {Any} [thisArg] An optional "this" to use to invoke each transform.
	   * @returns {Observable} An observable sequence whose elements are the result of invoking the one-to-many transform function corresponding to each notification in the input sequence.
	   */
	  observableProto.flatMapObserver = observableProto.selectManyObserver = function (onNext, onError, onCompleted, thisArg) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var index = 0;
	
	      return source.subscribe(
	        function (x) {
	          var result;
	          try {
	            result = onNext.call(thisArg, x, index++);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	        },
	        function (err) {
	          var result;
	          try {
	            result = onError.call(thisArg, err);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        },
	        function () {
	          var result;
	          try {
	            result = onCompleted.call(thisArg);
	          } catch (e) {
	            observer.onError(e);
	            return;
	          }
	          isPromise(result) && (result = observableFromPromise(result));
	          observer.onNext(result);
	          observer.onCompleted();
	        });
	    }, source).mergeAll();
	  };
	
	Rx.Observable.prototype.flatMapLatest = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchLatest();
	};
	  var SkipObservable = (function(__super__) {
	    inherits(SkipObservable, __super__);
	    function SkipObservable(source, count) {
	      this.source = source;
	      this._count = count;
	      __super__.call(this);
	    }
	
	    SkipObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipObserver(o, this._count));
	    };
	
	    function SkipObserver(o, c) {
	      this._o = o;
	      this._r = c;
	      AbstractObserver.call(this);
	    }
	
	    inherits(SkipObserver, AbstractObserver);
	
	    SkipObserver.prototype.next = function (x) {
	      if (this._r <= 0) {
	        this._o.onNext(x);
	      } else {
	        this._r--;
	      }
	    };
	    SkipObserver.prototype.error = function(e) { this._o.onError(e); };
	    SkipObserver.prototype.completed = function() { this._o.onCompleted(); };
	
	    return SkipObservable;
	  }(ObservableBase));
	
	  /**
	   * Bypasses a specified number of elements in an observable sequence and then returns the remaining elements.
	   * @param {Number} count The number of elements to skip before returning the remaining elements.
	   * @returns {Observable} An observable sequence that contains the elements that occur after the specified index in the input sequence.
	   */
	  observableProto.skip = function (count) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    return new SkipObservable(this, count);
	  };
	
	  var SkipWhileObservable = (function (__super__) {
	    inherits(SkipWhileObservable, __super__);
	    function SkipWhileObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    SkipWhileObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipWhileObserver(o, this));
	    };
	
	    return SkipWhileObservable;
	  }(ObservableBase));
	
	  var SkipWhileObserver = (function (__super__) {
	    inherits(SkipWhileObserver, __super__);
	
	    function SkipWhileObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      this._i = 0;
	      this._r = false;
	      __super__.call(this);
	    }
	
	    SkipWhileObserver.prototype.next = function (x) {
	      if (!this._r) {
	        var res = tryCatch(this._p._fn)(x, this._i++, this._p);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        this._r = !res;
	      }
	      this._r && this._o.onNext(x);
	    };
	    SkipWhileObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipWhileObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return SkipWhileObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Bypasses elements in an observable sequence as long as a specified condition is true and then returns the remaining elements.
	   *  The element's index is used in the logic of the predicate function.
	   *
	   *  var res = source.skipWhile(function (value) { return value < 10; });
	   *  var res = source.skipWhile(function (value, index) { return value < 10 || index < 10; });
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
	   */
	  observableProto.skipWhile = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new SkipWhileObservable(this, fn);
	  };
	
	  var TakeObservable = (function(__super__) {
	    inherits(TakeObservable, __super__);
	    function TakeObservable(source, count) {
	      this.source = source;
	      this._count = count;
	      __super__.call(this);
	    }
	
	    TakeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeObserver(o, this._count));
	    };
	
	    function TakeObserver(o, c) {
	      this._o = o;
	      this._c = c;
	      this._r = c;
	      AbstractObserver.call(this);
	    }
	
	    inherits(TakeObserver, AbstractObserver);
	
	    TakeObserver.prototype.next = function (x) {
	      if (this._r-- > 0) {
	        this._o.onNext(x);
	        this._r <= 0 && this._o.onCompleted();
	      }
	    };
	
	    TakeObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return TakeObservable;
	  }(ObservableBase));
	
	  /**
	   *  Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0).
	   * @param {Number} count The number of elements to return.
	   * @param {Scheduler} [scheduler] Scheduler used to produce an OnCompleted message in case <paramref name="count count</paramref> is set to 0.
	   * @returns {Observable} An observable sequence that contains the specified number of elements from the start of the input sequence.
	   */
	  observableProto.take = function (count, scheduler) {
	    if (count < 0) { throw new ArgumentOutOfRangeError(); }
	    if (count === 0) { return observableEmpty(scheduler); }
	    return new TakeObservable(this, count);
	  };
	
	  var TakeWhileObservable = (function (__super__) {
	    inherits(TakeWhileObservable, __super__);
	    function TakeWhileObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    TakeWhileObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeWhileObserver(o, this));
	    };
	
	    return TakeWhileObservable;
	  }(ObservableBase));
	
	  var TakeWhileObserver = (function (__super__) {
	    inherits(TakeWhileObserver, __super__);
	
	    function TakeWhileObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      this._i = 0;
	      this._r = true;
	      __super__.call(this);
	    }
	
	    TakeWhileObserver.prototype.next = function (x) {
	      if (this._r) {
	        this._r = tryCatch(this._p._fn)(x, this._i++, this._p);
	        if (this._r === errorObj) { return this._o.onError(this._r.e); }
	      }
	      if (this._r) {
	        this._o.onNext(x);
	      } else {
	        this._o.onCompleted();
	      }
	    };
	    TakeWhileObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeWhileObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return TakeWhileObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns elements from an observable sequence as long as a specified condition is true.
	   *  The element's index is used in the logic of the predicate function.
	   * @param {Function} predicate A function to test each element for a condition; the second parameter of the function represents the index of the source element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.
	   */
	  observableProto.takeWhile = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new TakeWhileObservable(this, fn);
	  };
	
	  var FilterObservable = (function (__super__) {
	    inherits(FilterObservable, __super__);
	
	    function FilterObservable(source, predicate, thisArg) {
	      this.source = source;
	      this.predicate = bindCallback(predicate, thisArg, 3);
	      __super__.call(this);
	    }
	
	    FilterObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new InnerObserver(o, this.predicate, this));
	    };
	
	    function innerPredicate(predicate, self) {
	      return function(x, i, o) { return self.predicate(x, i, o) && predicate.call(this, x, i, o); }
	    }
	
	    FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
	      return new FilterObservable(this.source, innerPredicate(predicate, this), thisArg);
	    };
	
	    inherits(InnerObserver, AbstractObserver);
	    function InnerObserver(o, predicate, source) {
	      this.o = o;
	      this.predicate = predicate;
	      this.source = source;
	      this.i = 0;
	      AbstractObserver.call(this);
	    }
	
	    InnerObserver.prototype.next = function(x) {
	      var shouldYield = tryCatch(this.predicate)(x, this.i++, this.source);
	      if (shouldYield === errorObj) {
	        return this.o.onError(shouldYield.e);
	      }
	      shouldYield && this.o.onNext(x);
	    };
	
	    InnerObserver.prototype.error = function (e) {
	      this.o.onError(e);
	    };
	
	    InnerObserver.prototype.completed = function () {
	      this.o.onCompleted();
	    };
	
	    return FilterObservable;
	
	  }(ObservableBase));
	
	  /**
	  *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
	  * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
	  * @param {Any} [thisArg] Object to use as this when executing callback.
	  * @returns {Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
	  */
	  observableProto.filter = observableProto.where = function (predicate, thisArg) {
	    return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) :
	      new FilterObservable(this, predicate, thisArg);
	  };
	
	  var ExtremaByObservable = (function (__super__) {
	    inherits(ExtremaByObservable, __super__);
	    function ExtremaByObservable(source, k, c) {
	      this.source = source;
	      this._k = k;
	      this._c = c;
	      __super__.call(this);
	    }
	
	    ExtremaByObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ExtremaByObserver(o, this._k, this._c));
	    };
	
	    return ExtremaByObservable;
	  }(ObservableBase));
	
	  var ExtremaByObserver = (function (__super__) {
	    inherits(ExtremaByObserver, __super__);
	    function ExtremaByObserver(o, k, c) {
	      this._o = o;
	      this._k = k;
	      this._c = c;
	      this._v = null;
	      this._hv = false;
	      this._l = [];
	      __super__.call(this);
	    }
	
	    ExtremaByObserver.prototype.next = function (x) {
	      var key = tryCatch(this._k)(x);
	      if (key === errorObj) { return this._o.onError(key.e); }
	      var comparison = 0;
	      if (!this._hv) {
	        this._hv = true;
	        this._v = key;
	      } else {
	        comparison = tryCatch(this._c)(key, this._v);
	        if (comparison === errorObj) { return this._o.onError(comparison.e); }
	      }
	      if (comparison > 0) {
	        this._v = key;
	        this._l = [];
	      }
	      if (comparison >= 0) { this._l.push(x); }
	    };
	
	    ExtremaByObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ExtremaByObserver.prototype.completed = function () {
	      this._o.onNext(this._l);
	      this._o.onCompleted();
	    };
	
	    return ExtremaByObserver;
	  }(AbstractObserver));
	
	  function firstOnly(x) {
	    if (x.length === 0) { throw new EmptyError(); }
	    return x[0];
	  }
	
	  var ReduceObservable = (function(__super__) {
	    inherits(ReduceObservable, __super__);
	    function ReduceObservable(source, accumulator, hasSeed, seed) {
	      this.source = source;
	      this.accumulator = accumulator;
	      this.hasSeed = hasSeed;
	      this.seed = seed;
	      __super__.call(this);
	    }
	
	    ReduceObservable.prototype.subscribeCore = function(observer) {
	      return this.source.subscribe(new ReduceObserver(observer,this));
	    };
	
	    return ReduceObservable;
	  }(ObservableBase));
	
	  var ReduceObserver = (function (__super__) {
	    inherits(ReduceObserver, __super__);
	    function ReduceObserver(o, parent) {
	      this._o = o;
	      this._p = parent;
	      this._fn = parent.accumulator;
	      this._hs = parent.hasSeed;
	      this._s = parent.seed;
	      this._ha = false;
	      this._a = null;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    ReduceObserver.prototype.next = function (x) {
	      !this._hv && (this._hv = true);
	      if (this._ha) {
	        this._a = tryCatch(this._fn)(this._a, x, this._i, this._p);
	      } else {
	        this._a = this._hs ? tryCatch(this._fn)(this._s, x, this._i, this._p) : x;
	        this._ha = true;
	      }
	      if (this._a === errorObj) { return this._o.onError(this._a.e); }
	      this._i++;
	    };
	
	    ReduceObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ReduceObserver.prototype.completed = function () {
	      this._hv && this._o.onNext(this._a);
	      !this._hv && this._hs && this._o.onNext(this._s);
	      !this._hv && !this._hs && this._o.onError(new EmptyError());
	      this._o.onCompleted();
	    };
	
	    return ReduceObserver;
	  }(AbstractObserver));
	
	  /**
	  * Applies an accumulator function over an observable sequence, returning the result of the aggregation as a single element in the result sequence. The specified seed value is used as the initial accumulator value.
	  * For aggregation behavior with incremental intermediate results, see Observable.scan.
	  * @param {Function} accumulator An accumulator function to be invoked on each element.
	  * @param {Any} [seed] The initial accumulator value.
	  * @returns {Observable} An observable sequence containing a single element with the final accumulator value.
	  */
	  observableProto.reduce = function () {
	    var hasSeed = false, seed, accumulator = arguments[0];
	    if (arguments.length === 2) {
	      hasSeed = true;
	      seed = arguments[1];
	    }
	    return new ReduceObservable(this, accumulator, hasSeed, seed);
	  };
	
	  var SomeObservable = (function (__super__) {
	    inherits(SomeObservable, __super__);
	    function SomeObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    SomeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SomeObserver(o, this._fn, this.source));
	    };
	
	    return SomeObservable;
	  }(ObservableBase));
	
	  var SomeObserver = (function (__super__) {
	    inherits(SomeObserver, __super__);
	
	    function SomeObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    SomeObserver.prototype.next = function (x) {
	      var result = tryCatch(this._fn)(x, this._i++, this._s);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      if (Boolean(result)) {
	        this._o.onNext(true);
	        this._o.onCompleted();
	      }
	    };
	    SomeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SomeObserver.prototype.completed = function () {
	      this._o.onNext(false);
	      this._o.onCompleted();
	    };
	
	    return SomeObserver;
	  }(AbstractObserver));
	
	  /**
	   * Determines whether any element of an observable sequence satisfies a condition if present, else if any items are in the sequence.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @returns {Observable} An observable sequence containing a single element determining whether any elements in the source sequence pass the test in the specified predicate if given, else if any items are in the sequence.
	   */
	  observableProto.some = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new SomeObservable(this, fn);
	  };
	
	  var IsEmptyObservable = (function (__super__) {
	    inherits(IsEmptyObservable, __super__);
	    function IsEmptyObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    IsEmptyObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new IsEmptyObserver(o));
	    };
	
	    return IsEmptyObservable;
	  }(ObservableBase));
	
	  var IsEmptyObserver = (function(__super__) {
	    inherits(IsEmptyObserver, __super__);
	    function IsEmptyObserver(o) {
	      this._o = o;
	      __super__.call(this);
	    }
	
	    IsEmptyObserver.prototype.next = function () {
	      this._o.onNext(false);
	      this._o.onCompleted();
	    };
	    IsEmptyObserver.prototype.error = function (e) { this._o.onError(e); };
	    IsEmptyObserver.prototype.completed = function () {
	      this._o.onNext(true);
	      this._o.onCompleted();
	    };
	
	    return IsEmptyObserver;
	  }(AbstractObserver));
	
	  /**
	   * Determines whether an observable sequence is empty.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence is empty.
	   */
	  observableProto.isEmpty = function () {
	    return new IsEmptyObservable(this);
	  };
	
	  var EveryObservable = (function (__super__) {
	    inherits(EveryObservable, __super__);
	    function EveryObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    EveryObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new EveryObserver(o, this._fn, this.source));
	    };
	
	    return EveryObservable;
	  }(ObservableBase));
	
	  var EveryObserver = (function (__super__) {
	    inherits(EveryObserver, __super__);
	
	    function EveryObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    EveryObserver.prototype.next = function (x) {
	      var result = tryCatch(this._fn)(x, this._i++, this._s);
	      if (result === errorObj) { return this._o.onError(result.e); }
	      if (!Boolean(result)) {
	        this._o.onNext(false);
	        this._o.onCompleted();
	      }
	    };
	    EveryObserver.prototype.error = function (e) { this._o.onError(e); };
	    EveryObserver.prototype.completed = function () {
	      this._o.onNext(true);
	      this._o.onCompleted();
	    };
	
	    return EveryObserver;
	  }(AbstractObserver));
	
	  /**
	   * Determines whether all elements of an observable sequence satisfy a condition.
	   * @param {Function} [predicate] A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element determining whether all elements in the source sequence pass the test in the specified predicate.
	   */
	  observableProto.every = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new EveryObservable(this, fn);
	  };
	
	  var IncludesObservable = (function (__super__) {
	    inherits(IncludesObservable, __super__);
	    function IncludesObservable(source, elem, idx) {
	      var n = +idx || 0;
	      Math.abs(n) === Infinity && (n = 0);
	
	      this.source = source;
	      this._elem = elem;
	      this._n = n;
	      __super__.call(this);
	    }
	
	    IncludesObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(false);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	
	      return this.source.subscribe(new IncludesObserver(o, this._elem, this._n));
	    };
	
	    return IncludesObservable;
	  }(ObservableBase));
	
	  var IncludesObserver = (function (__super__) {
	    inherits(IncludesObserver, __super__);
	    function IncludesObserver(o, elem, n) {
	      this._o = o;
	      this._elem = elem;
	      this._n = n;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    function comparer(a, b) {
	      return (a === 0 && b === 0) || (a === b || (isNaN(a) && isNaN(b)));
	    }
	
	    IncludesObserver.prototype.next = function (x) {
	      if (this._i++ >= this._n && comparer(x, this._elem)) {
	        this._o.onNext(true);
	        this._o.onCompleted();
	      }
	    };
	    IncludesObserver.prototype.error = function (e) { this._o.onError(e); };
	    IncludesObserver.prototype.completed = function () { this._o.onNext(false); this._o.onCompleted(); };
	
	    return IncludesObserver;
	  }(AbstractObserver));
	
	  /**
	   * Determines whether an observable sequence includes a specified element with an optional equality comparer.
	   * @param searchElement The value to locate in the source sequence.
	   * @param {Number} [fromIndex] An equality comparer to compare elements.
	   * @returns {Observable} An observable sequence containing a single element determining whether the source sequence includes an element that has the specified value from the given index.
	   */
	  observableProto.includes = function (searchElement, fromIndex) {
	    return new IncludesObservable(this, searchElement, fromIndex);
	  };
	
	  var CountObservable = (function (__super__) {
	    inherits(CountObservable, __super__);
	    function CountObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    CountObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new CountObserver(o, this._fn, this.source));
	    };
	
	    return CountObservable;
	  }(ObservableBase));
	
	  var CountObserver = (function (__super__) {
	    inherits(CountObserver, __super__);
	
	    function CountObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      this._c = 0;
	      __super__.call(this);
	    }
	
	    CountObserver.prototype.next = function (x) {
	      if (this._fn) {
	        var result = tryCatch(this._fn)(x, this._i++, this._s);
	        if (result === errorObj) { return this._o.onError(result.e); }
	        Boolean(result) && (this._c++);
	      } else {
	        this._c++;
	      }
	    };
	    CountObserver.prototype.error = function (e) { this._o.onError(e); };
	    CountObserver.prototype.completed = function () {
	      this._o.onNext(this._c);
	      this._o.onCompleted();
	    };
	
	    return CountObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns an observable sequence containing a value that represents how many elements in the specified observable sequence satisfy a condition if provided, else the count of items.
	   * @example
	   * res = source.count();
	   * res = source.count(function (x) { return x > 3; });
	   * @param {Function} [predicate]A function to test each element for a condition.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with a number that represents how many elements in the input sequence satisfy the condition in the predicate function if provided, else the count of items in the sequence.
	   */
	  observableProto.count = function (predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return new CountObservable(this, fn);
	  };
	
	  var IndexOfObservable = (function (__super__) {
	    inherits(IndexOfObservable, __super__);
	    function IndexOfObservable(source, e, n) {
	      this.source = source;
	      this._e = e;
	      this._n = n;
	      __super__.call(this);
	    }
	
	    IndexOfObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	
	      return this.source.subscribe(new IndexOfObserver(o, this._e, this._n));
	    };
	
	    return IndexOfObservable;
	  }(ObservableBase));
	
	  var IndexOfObserver = (function (__super__) {
	    inherits(IndexOfObserver, __super__);
	    function IndexOfObserver(o, e, n) {
	      this._o = o;
	      this._e = e;
	      this._n = n;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    IndexOfObserver.prototype.next = function (x) {
	      if (this._i >= this._n && x === this._e) {
	        this._o.onNext(this._i);
	        this._o.onCompleted();
	      }
	      this._i++;
	    };
	    IndexOfObserver.prototype.error = function (e) { this._o.onError(e); };
	    IndexOfObserver.prototype.completed = function () { this._o.onNext(-1); this._o.onCompleted(); };
	
	    return IndexOfObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the first index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.indexOf = function(searchElement, fromIndex) {
	    var n = +fromIndex || 0;
	    Math.abs(n) === Infinity && (n = 0);
	    return new IndexOfObservable(this, searchElement, n);
	  };
	
	  var SumObservable = (function (__super__) {
	    inherits(SumObservable, __super__);
	    function SumObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    SumObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SumObserver(o, this._fn, this.source));
	    };
	
	    return SumObservable;
	  }(ObservableBase));
	
	  var SumObserver = (function (__super__) {
	    inherits(SumObserver, __super__);
	
	    function SumObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._i = 0;
	      this._c = 0;
	      __super__.call(this);
	    }
	
	    SumObserver.prototype.next = function (x) {
	      if (this._fn) {
	        var result = tryCatch(this._fn)(x, this._i++, this._s);
	        if (result === errorObj) { return this._o.onError(result.e); }
	        this._c += result;
	      } else {
	        this._c += x;
	      }
	    };
	    SumObserver.prototype.error = function (e) { this._o.onError(e); };
	    SumObserver.prototype.completed = function () {
	      this._o.onNext(this._c);
	      this._o.onCompleted();
	    };
	
	    return SumObserver;
	  }(AbstractObserver));
	
	  /**
	   * Computes the sum of a sequence of values that are obtained by invoking an optional transform function on each element of the input sequence, else if not specified computes the sum on each item in the sequence.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the sum of the values in the source sequence.
	   */
	  observableProto.sum = function (keySelector, thisArg) {
	    var fn = bindCallback(keySelector, thisArg, 3);
	    return new SumObservable(this, fn);
	  };
	
	  /**
	   * Returns the elements in an observable sequence with the minimum key value according to the specified comparer.
	   * @example
	   * var res = source.minBy(function (x) { return x.value; });
	   * var res = source.minBy(function (x) { return x.value; }, function (x, y) { return x - y; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer] Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a minimum key value.
	   */
	  observableProto.minBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return new ExtremaByObservable(this, keySelector, function (x, y) { return comparer(x, y) * -1; });
	  };
	
	  /**
	   * Returns the minimum element in an observable sequence according to the optional comparer else a default greater than less than check.
	   * @example
	   * var res = source.min();
	   * var res = source.min(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the minimum element in the source sequence.
	   */
	  observableProto.min = function (comparer) {
	    return this.minBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };
	
	  /**
	   * Returns the elements in an observable sequence with the maximum  key value according to the specified comparer.
	   * @example
	   * var res = source.maxBy(function (x) { return x.value; });
	   * var res = source.maxBy(function (x) { return x.value; }, function (x, y) { return x - y;; });
	   * @param {Function} keySelector Key selector function.
	   * @param {Function} [comparer]  Comparer used to compare key values.
	   * @returns {Observable} An observable sequence containing a list of zero or more elements that have a maximum key value.
	   */
	  observableProto.maxBy = function (keySelector, comparer) {
	    comparer || (comparer = defaultSubComparer);
	    return new ExtremaByObservable(this, keySelector, comparer);
	  };
	
	  /**
	   * Returns the maximum value in an observable sequence according to the specified comparer.
	   * @example
	   * var res = source.max();
	   * var res = source.max(function (x, y) { return x.value - y.value; });
	   * @param {Function} [comparer] Comparer used to compare elements.
	   * @returns {Observable} An observable sequence containing a single element with the maximum element in the source sequence.
	   */
	  observableProto.max = function (comparer) {
	    return this.maxBy(identity, comparer).map(function (x) { return firstOnly(x); });
	  };
	
	  var AverageObservable = (function (__super__) {
	    inherits(AverageObservable, __super__);
	    function AverageObservable(source, fn) {
	      this.source = source;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    AverageObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new AverageObserver(o, this._fn, this.source));
	    };
	
	    return AverageObservable;
	  }(ObservableBase));
	
	  var AverageObserver = (function(__super__) {
	    inherits(AverageObserver, __super__);
	    function AverageObserver(o, fn, s) {
	      this._o = o;
	      this._fn = fn;
	      this._s = s;
	      this._c = 0;
	      this._t = 0;
	      __super__.call(this);
	    }
	
	    AverageObserver.prototype.next = function (x) {
	      if(this._fn) {
	        var r = tryCatch(this._fn)(x, this._c++, this._s);
	        if (r === errorObj) { return this._o.onError(r.e); }
	        this._t += r;
	      } else {
	        this._c++;
	        this._t += x;
	      }
	    };
	    AverageObserver.prototype.error = function (e) { this._o.onError(e); };
	    AverageObserver.prototype.completed = function () {
	      if (this._c === 0) { return this._o.onError(new EmptyError()); }
	      this._o.onNext(this._t / this._c);
	      this._o.onCompleted();
	    };
	
	    return AverageObserver;
	  }(AbstractObserver));
	
	  /**
	   * Computes the average of an observable sequence of values that are in the sequence or obtained by invoking a transform function on each element of the input sequence if present.
	   * @param {Function} [selector] A transform function to apply to each element.
	   * @param {Any} [thisArg] Object to use as this when executing callback.
	   * @returns {Observable} An observable sequence containing a single element with the average of the sequence of values.
	   */
	  observableProto.average = function (keySelector, thisArg) {
	    var source = this, fn;
	    if (isFunction(keySelector)) {
	      fn = bindCallback(keySelector, thisArg, 3);
	    }
	    return new AverageObservable(source, fn);
	  };
	
	  /**
	   *  Determines whether two sequences are equal by comparing the elements pairwise using a specified equality comparer.
	   *
	   * @example
	   * var res = res = source.sequenceEqual([1,2,3]);
	   * var res = res = source.sequenceEqual([{ value: 42 }], function (x, y) { return x.value === y.value; });
	   * 3 - res = source.sequenceEqual(Rx.Observable.returnValue(42));
	   * 4 - res = source.sequenceEqual(Rx.Observable.returnValue({ value: 42 }), function (x, y) { return x.value === y.value; });
	   * @param {Observable} second Second observable sequence or array to compare.
	   * @param {Function} [comparer] Comparer used to compare elements of both sequences.
	   * @returns {Observable} An observable sequence that contains a single element which indicates whether both sequences are of equal length and their corresponding elements are equal according to the specified equality comparer.
	   */
	  observableProto.sequenceEqual = function (second, comparer) {
	    var first = this;
	    comparer || (comparer = defaultComparer);
	    return new AnonymousObservable(function (o) {
	      var donel = false, doner = false, ql = [], qr = [];
	      var subscription1 = first.subscribe(function (x) {
	        if (qr.length > 0) {
	          var v = qr.shift();
	          var equal = tryCatch(comparer)(v, x);
	          if (equal === errorObj) { return o.onError(equal.e); }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (doner) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          ql.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        donel = true;
	        if (ql.length === 0) {
	          if (qr.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (doner) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	
	      (isArrayLike(second) || isIterable(second)) && (second = observableFrom(second));
	      isPromise(second) && (second = observableFromPromise(second));
	      var subscription2 = second.subscribe(function (x) {
	        if (ql.length > 0) {
	          var v = ql.shift();
	          var equal = tryCatch(comparer)(v, x);
	          if (equal === errorObj) { return o.onError(equal.e); }
	          if (!equal) {
	            o.onNext(false);
	            o.onCompleted();
	          }
	        } else if (donel) {
	          o.onNext(false);
	          o.onCompleted();
	        } else {
	          qr.push(x);
	        }
	      }, function(e) { o.onError(e); }, function () {
	        doner = true;
	        if (qr.length === 0) {
	          if (ql.length > 0) {
	            o.onNext(false);
	            o.onCompleted();
	          } else if (donel) {
	            o.onNext(true);
	            o.onCompleted();
	          }
	        }
	      });
	      return new BinaryDisposable(subscription1, subscription2);
	    }, first);
	  };
	
	  var ElementAtObservable = (function (__super__) {
	    inherits(ElementAtObservable, __super__);
	    function ElementAtObservable(source, i, d) {
	      this.source = source;
	      this._i = i;
	      this._d = d;
	      __super__.call(this);
	    }
	
	    ElementAtObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ElementAtObserver(o, this._i, this._d));
	    };
	
	    return ElementAtObservable;
	  }(ObservableBase));
	
	  var ElementAtObserver = (function (__super__) {
	    inherits(ElementAtObserver, __super__);
	
	    function ElementAtObserver(o, i, d) {
	      this._o = o;
	      this._i = i;
	      this._d = d;
	      __super__.call(this);
	    }
	
	    ElementAtObserver.prototype.next = function (x) {
	      if (this._i-- === 0) {
	        this._o.onNext(x);
	        this._o.onCompleted();
	      }
	    };
	    ElementAtObserver.prototype.error = function (e) { this._o.onError(e); };
	    ElementAtObserver.prototype.completed = function () {
	      if (this._d === undefined) {
	        this._o.onError(new ArgumentOutOfRangeError());
	      } else {
	        this._o.onNext(this._d);
	        this._o.onCompleted();
	      }
	    };
	
	    return ElementAtObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the element at a specified index in a sequence or default value if not found.
	   * @param {Number} index The zero-based index of the element to retrieve.
	   * @param {Any} [defaultValue] The default value to use if elementAt does not find a value.
	   * @returns {Observable} An observable sequence that produces the element at the specified position in the source sequence.
	   */
	  observableProto.elementAt =  function (index, defaultValue) {
	    if (index < 0) { throw new ArgumentOutOfRangeError(); }
	    return new ElementAtObservable(this, index, defaultValue);
	  };
	
	  var SingleObserver = (function(__super__) {
	    inherits(SingleObserver, __super__);
	    function SingleObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      this._hv = false;
	      this._v = null;
	      __super__.call(this);
	    }
	
	    SingleObserver.prototype.next = function (x) {
	      var shouldYield = false;
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        Boolean(res) && (shouldYield = true);
	      } else if (!this._obj.predicate) {
	        shouldYield = true;
	      }
	      if (shouldYield) {
	        if (this._hv) {
	          return this._o.onError(new Error('Sequence contains more than one matching element'));
	        }
	        this._hv = true;
	        this._v = x;
	      }
	    };
	    SingleObserver.prototype.error = function (e) { this._o.onError(e); };
	    SingleObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	        this._o.onCompleted();
	      }
	      else if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };
	
	    return SingleObserver;
	  }(AbstractObserver));
	
	
	    /**
	     * Returns the only element of an observable sequence that satisfies the condition in the optional predicate, and reports an exception if there is not exactly one element in the observable sequence.
	     * @returns {Observable} Sequence containing the single element in the observable sequence that satisfies the condition in the predicate.
	     */
	    observableProto.single = function (predicate, thisArg) {
	      var obj = {}, source = this;
	      if (typeof arguments[0] === 'object') {
	        obj = arguments[0];
	      } else {
	        obj = {
	          predicate: arguments[0],
	          thisArg: arguments[1],
	          defaultValue: arguments[2]
	        };
	      }
	      if (isFunction (obj.predicate)) {
	        var fn = obj.predicate;
	        obj.predicate = bindCallback(fn, obj.thisArg, 3);
	      }
	      return new AnonymousObservable(function (o) {
	        return source.subscribe(new SingleObserver(o, obj, source));
	      }, source);
	    };
	
	  var FirstObservable = (function (__super__) {
	    inherits(FirstObservable, __super__);
	    function FirstObservable(source, obj) {
	      this.source = source;
	      this._obj = obj;
	      __super__.call(this);
	    }
	
	    FirstObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new FirstObserver(o, this._obj, this.source));
	    };
	
	    return FirstObservable;
	  }(ObservableBase));
	
	  var FirstObserver = (function(__super__) {
	    inherits(FirstObserver, __super__);
	    function FirstObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    FirstObserver.prototype.next = function (x) {
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        if (Boolean(res)) {
	          this._o.onNext(x);
	          this._o.onCompleted();
	        }
	      } else if (!this._obj.predicate) {
	        this._o.onNext(x);
	        this._o.onCompleted();
	      }
	    };
	    FirstObserver.prototype.error = function (e) { this._o.onError(e); };
	    FirstObserver.prototype.completed = function () {
	      if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };
	
	    return FirstObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the first element of an observable sequence that satisfies the condition in the predicate if present else the first item in the sequence.
	   * @returns {Observable} Sequence containing the first element in the observable sequence that satisfies the condition in the predicate if provided, else the first item in the sequence.
	   */
	  observableProto.first = function () {
	    var obj = {}, source = this;
	    if (typeof arguments[0] === 'object') {
	      obj = arguments[0];
	    } else {
	      obj = {
	        predicate: arguments[0],
	        thisArg: arguments[1],
	        defaultValue: arguments[2]
	      };
	    }
	    if (isFunction (obj.predicate)) {
	      var fn = obj.predicate;
	      obj.predicate = bindCallback(fn, obj.thisArg, 3);
	    }
	    return new FirstObservable(this, obj);
	  };
	
	  var LastObservable = (function (__super__) {
	    inherits(LastObservable, __super__);
	    function LastObservable(source, obj) {
	      this.source = source;
	      this._obj = obj;
	      __super__.call(this);
	    }
	
	    LastObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new LastObserver(o, this._obj, this.source));
	    };
	
	    return LastObservable;
	  }(ObservableBase));
	
	  var LastObserver = (function(__super__) {
	    inherits(LastObserver, __super__);
	    function LastObserver(o, obj, s) {
	      this._o = o;
	      this._obj = obj;
	      this._s = s;
	      this._i = 0;
	      this._hv = false;
	      this._v = null;
	      __super__.call(this);
	    }
	
	    LastObserver.prototype.next = function (x) {
	      var shouldYield = false;
	      if (this._obj.predicate) {
	        var res = tryCatch(this._obj.predicate)(x, this._i++, this._s);
	        if (res === errorObj) { return this._o.onError(res.e); }
	        Boolean(res) && (shouldYield = true);
	      } else if (!this._obj.predicate) {
	        shouldYield = true;
	      }
	      if (shouldYield) {
	        this._hv = true;
	        this._v = x;
	      }
	    };
	    LastObserver.prototype.error = function (e) { this._o.onError(e); };
	    LastObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	        this._o.onCompleted();
	      }
	      else if (this._obj.defaultValue === undefined) {
	        this._o.onError(new EmptyError());
	      } else {
	        this._o.onNext(this._obj.defaultValue);
	        this._o.onCompleted();
	      }
	    };
	
	    return LastObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the last element of an observable sequence that satisfies the condition in the predicate if specified, else the last element.
	   * @returns {Observable} Sequence containing the last element in the observable sequence that satisfies the condition in the predicate.
	   */
	  observableProto.last = function () {
	    var obj = {}, source = this;
	    if (typeof arguments[0] === 'object') {
	      obj = arguments[0];
	    } else {
	      obj = {
	        predicate: arguments[0],
	        thisArg: arguments[1],
	        defaultValue: arguments[2]
	      };
	    }
	    if (isFunction (obj.predicate)) {
	      var fn = obj.predicate;
	      obj.predicate = bindCallback(fn, obj.thisArg, 3);
	    }
	    return new LastObservable(this, obj);
	  };
	
	  var FindValueObserver = (function(__super__) {
	    inherits(FindValueObserver, __super__);
	    function FindValueObserver(observer, source, callback, yieldIndex) {
	      this._o = observer;
	      this._s = source;
	      this._cb = callback;
	      this._y = yieldIndex;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    FindValueObserver.prototype.next = function (x) {
	      var shouldRun = tryCatch(this._cb)(x, this._i, this._s);
	      if (shouldRun === errorObj) { return this._o.onError(shouldRun.e); }
	      if (shouldRun) {
	        this._o.onNext(this._y ? this._i : x);
	        this._o.onCompleted();
	      } else {
	        this._i++;
	      }
	    };
	
	    FindValueObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    FindValueObserver.prototype.completed = function () {
	      this._y && this._o.onNext(-1);
	      this._o.onCompleted();
	    };
	
	    return FindValueObserver;
	  }(AbstractObserver));
	
	  function findValue (source, predicate, thisArg, yieldIndex) {
	    var callback = bindCallback(predicate, thisArg, 3);
	    return new AnonymousObservable(function (o) {
	      return source.subscribe(new FindValueObserver(o, source, callback, yieldIndex));
	    }, source);
	  }
	
	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the first element that matches the conditions defined by the specified predicate, if found; otherwise, undefined.
	   */
	  observableProto.find = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, false);
	  };
	
	  /**
	   * Searches for an element that matches the conditions defined by the specified predicate, and returns
	   * an Observable sequence with the zero-based index of the first occurrence within the entire Observable sequence.
	   * @param {Function} predicate The predicate that defines the conditions of the element to search for.
	   * @param {Any} [thisArg] Object to use as `this` when executing the predicate.
	   * @returns {Observable} An Observable sequence with the zero-based index of the first occurrence of an element that matches the conditions defined by match, if found; otherwise, –1.
	  */
	  observableProto.findIndex = function (predicate, thisArg) {
	    return findValue(this, predicate, thisArg, true);
	  };
	
	  var ToSetObservable = (function (__super__) {
	    inherits(ToSetObservable, __super__);
	    function ToSetObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    ToSetObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ToSetObserver(o));
	    };
	
	    return ToSetObservable;
	  }(ObservableBase));
	
	  var ToSetObserver = (function (__super__) {
	    inherits(ToSetObserver, __super__);
	    function ToSetObserver(o) {
	      this._o = o;
	      this._s = new root.Set();
	      __super__.call(this);
	    }
	
	    ToSetObserver.prototype.next = function (x) {
	      this._s.add(x);
	    };
	
	    ToSetObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ToSetObserver.prototype.completed = function () {
	      this._o.onNext(this._s);
	      this._o.onCompleted();
	    };
	
	    return ToSetObserver;
	  }(AbstractObserver));
	
	  /**
	   * Converts the observable sequence to a Set if it exists.
	   * @returns {Observable} An observable sequence with a single value of a Set containing the values from the observable sequence.
	   */
	  observableProto.toSet = function () {
	    if (typeof root.Set === 'undefined') { throw new TypeError(); }
	    return new ToSetObservable(this);
	  };
	
	  var ToMapObservable = (function (__super__) {
	    inherits(ToMapObservable, __super__);
	    function ToMapObservable(source, k, e) {
	      this.source = source;
	      this._k = k;
	      this._e = e;
	      __super__.call(this);
	    }
	
	    ToMapObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new ToMapObserver(o, this._k, this._e));
	    };
	
	    return ToMapObservable;
	  }(ObservableBase));
	
	  var ToMapObserver = (function (__super__) {
	    inherits(ToMapObserver, __super__);
	    function ToMapObserver(o, k, e) {
	      this._o = o;
	      this._k = k;
	      this._e = e;
	      this._m = new root.Map();
	      __super__.call(this);
	    }
	
	    ToMapObserver.prototype.next = function (x) {
	      var key = tryCatch(this._k)(x);
	      if (key === errorObj) { return this._o.onError(key.e); }
	      var elem = x;
	      if (this._e) {
	        elem = tryCatch(this._e)(x);
	        if (elem === errorObj) { return this._o.onError(elem.e); }
	      }
	
	      this._m.set(key, elem);
	    };
	
	    ToMapObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    ToMapObserver.prototype.completed = function () {
	      this._o.onNext(this._m);
	      this._o.onCompleted();
	    };
	
	    return ToMapObserver;
	  }(AbstractObserver));
	
	  /**
	  * Converts the observable sequence to a Map if it exists.
	  * @param {Function} keySelector A function which produces the key for the Map.
	  * @param {Function} [elementSelector] An optional function which produces the element for the Map. If not present, defaults to the value from the observable sequence.
	  * @returns {Observable} An observable sequence with a single value of a Map containing the values from the observable sequence.
	  */
	  observableProto.toMap = function (keySelector, elementSelector) {
	    if (typeof root.Map === 'undefined') { throw new TypeError(); }
	    return new ToMapObservable(this, keySelector, elementSelector);
	  };
	
	  var SliceObservable = (function (__super__) {
	    inherits(SliceObservable, __super__);
	    function SliceObservable(source, b, e) {
	      this.source = source;
	      this._b = b;
	      this._e = e;
	      __super__.call(this);
	    }
	
	    SliceObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SliceObserver(o, this._b, this._e));
	    };
	
	    return SliceObservable;
	  }(ObservableBase));
	
	  var SliceObserver = (function (__super__) {
	    inherits(SliceObserver, __super__);
	
	    function SliceObserver(o, b, e) {
	      this._o = o;
	      this._b = b;
	      this._e = e;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    SliceObserver.prototype.next = function (x) {
	      if (this._i >= this._b) {
	        if (this._e === this._i) {
	          this._o.onCompleted();
	        } else {
	          this._o.onNext(x);
	        }
	      }
	      this._i++;
	    };
	    SliceObserver.prototype.error = function (e) { this._o.onError(e); };
	    SliceObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return SliceObserver;
	  }(AbstractObserver));
	
	  /*
	  * The slice() method returns a shallow copy of a portion of an Observable into a new Observable object.
	  * Unlike the array version, this does not support negative numbers for being or end.
	  * @param {Number} [begin] Zero-based index at which to begin extraction. If omitted, this will default to zero.
	  * @param {Number} [end] Zero-based index at which to end extraction. slice extracts up to but not including end.
	  * If omitted, this will emit the rest of the Observable object.
	  * @returns {Observable} A shallow copy of a portion of an Observable into a new Observable object.
	  */
	  observableProto.slice = function (begin, end) {
	    var start = begin || 0;
	    if (start < 0) { throw new Rx.ArgumentOutOfRangeError(); }
	    if (typeof end === 'number' && end < start) {
	      throw new Rx.ArgumentOutOfRangeError();
	    }
	    return new SliceObservable(this, start, end);
	  };
	
	  var LastIndexOfObservable = (function (__super__) {
	    inherits(LastIndexOfObservable, __super__);
	    function LastIndexOfObservable(source, e, n) {
	      this.source = source;
	      this._e = e;
	      this._n = n;
	      __super__.call(this);
	    }
	
	    LastIndexOfObservable.prototype.subscribeCore = function (o) {
	      if (this._n < 0) {
	        o.onNext(-1);
	        o.onCompleted();
	        return disposableEmpty;
	      }
	
	      return this.source.subscribe(new LastIndexOfObserver(o, this._e, this._n));
	    };
	
	    return LastIndexOfObservable;
	  }(ObservableBase));
	
	  var LastIndexOfObserver = (function (__super__) {
	    inherits(LastIndexOfObserver, __super__);
	    function LastIndexOfObserver(o, e, n) {
	      this._o = o;
	      this._e = e;
	      this._n = n;
	      this._v = 0;
	      this._hv = false;
	      this._i = 0;
	      __super__.call(this);
	    }
	
	    LastIndexOfObserver.prototype.next = function (x) {
	      if (this._i >= this._n && x === this._e) {
	        this._hv = true;
	        this._v = this._i;
	      }
	      this._i++;
	    };
	    LastIndexOfObserver.prototype.error = function (e) { this._o.onError(e); };
	    LastIndexOfObserver.prototype.completed = function () {
	      if (this._hv) {
	        this._o.onNext(this._v);
	      } else {
	        this._o.onNext(-1);
	      }
	      this._o.onCompleted();
	    };
	
	    return LastIndexOfObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns the last index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   * @param {Any} searchElement Element to locate in the array.
	   * @param {Number} [fromIndex] The index to start the search.  If not specified, defaults to 0.
	   * @returns {Observable} And observable sequence containing the last index at which a given element can be found in the observable sequence, or -1 if it is not present.
	   */
	  observableProto.lastIndexOf = function(searchElement, fromIndex) {
	    var n = +fromIndex || 0;
	    Math.abs(n) === Infinity && (n = 0);
	    return new LastIndexOfObservable(this, searchElement, n);
	  };
	
	  Observable.wrap = function (fn) {
	    function createObservable() {
	      return Observable.spawn.call(this, fn.apply(this, arguments));
	    }
	
	    createObservable.__generatorFunction__ = fn;
	    return createObservable;
	  };
	
	  var spawn = Observable.spawn = function () {
	    var gen = arguments[0], self = this, args = [];
	    for (var i = 1, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	
	    return new AnonymousObservable(function (o) {
	      var g = new CompositeDisposable();
	
	      if (isFunction(gen)) { gen = gen.apply(self, args); }
	      if (!gen || !isFunction(gen.next)) {
	        o.onNext(gen);
	        return o.onCompleted();
	      }
	
	      function processGenerator(res) {
	        var ret = tryCatch(gen.next).call(gen, res);
	        if (ret === errorObj) { return o.onError(ret.e); }
	        next(ret);
	      }
	
	      processGenerator();
	
	      function onError(err) {
	        var ret = tryCatch(gen.next).call(gen, err);
	        if (ret === errorObj) { return o.onError(ret.e); }
	        next(ret);
	      }
	
	      function next(ret) {
	        if (ret.done) {
	          o.onNext(ret.value);
	          o.onCompleted();
	          return;
	        }
	        var obs = toObservable.call(self, ret.value);
	        var value = null;
	        var hasValue = false;
	        if (Observable.isObservable(obs)) {
	          g.add(obs.subscribe(function(val) {
	            hasValue = true;
	            value = val;
	          }, onError, function() {
	            hasValue && processGenerator(value);
	          }));
	        } else {
	          onError(new TypeError('type not supported'));
	        }
	      }
	
	      return g;
	    });
	  };
	
	  function toObservable(obj) {
	    if (!obj) { return obj; }
	    if (Observable.isObservable(obj)) { return obj; }
	    if (isPromise(obj)) { return Observable.fromPromise(obj); }
	    if (isGeneratorFunction(obj) || isGenerator(obj)) { return spawn.call(this, obj); }
	    if (isFunction(obj)) { return thunkToObservable.call(this, obj); }
	    if (isArrayLike(obj) || isIterable(obj)) { return arrayToObservable.call(this, obj); }
	    if (isObject(obj)) {return objectToObservable.call(this, obj);}
	    return obj;
	  }
	
	  function arrayToObservable (obj) {
	    return Observable.from(obj).concatMap(function(o) {
	      if(Observable.isObservable(o) || isObject(o)) {
	        return toObservable.call(null, o);
	      } else {
	        return Rx.Observable.just(o);
	      }
	    }).toArray();
	  }
	
	  function objectToObservable (obj) {
	    var results = new obj.constructor(), keys = Object.keys(obj), observables = [];
	    for (var i = 0, len = keys.length; i < len; i++) {
	      var key = keys[i];
	      var observable = toObservable.call(this, obj[key]);
	
	      if(observable && Observable.isObservable(observable)) {
	        defer(observable, key);
	      } else {
	        results[key] = obj[key];
	      }
	    }
	
	    return Observable.forkJoin.apply(Observable, observables).map(function() {
	      return results;
	    });
	
	
	    function defer (observable, key) {
	      results[key] = undefined;
	      observables.push(observable.map(function (next) {
	        results[key] = next;
	      }));
	    }
	  }
	
	  function thunkToObservable(fn) {
	    var self = this;
	    return new AnonymousObservable(function (o) {
	      fn.call(self, function () {
	        var err = arguments[0], res = arguments[1];
	        if (err) { return o.onError(err); }
	        if (arguments.length > 2) {
	          var args = [];
	          for (var i = 1, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
	          res = args;
	        }
	        o.onNext(res);
	        o.onCompleted();
	      });
	    });
	  }
	
	  function isGenerator(obj) {
	    return isFunction (obj.next) && isFunction (obj['throw']);
	  }
	
	  function isGeneratorFunction(obj) {
	    var ctor = obj.constructor;
	    if (!ctor) { return false; }
	    if (ctor.name === 'GeneratorFunction' || ctor.displayName === 'GeneratorFunction') { return true; }
	    return isGenerator(ctor.prototype);
	  }
	
	  function isObject(val) {
	    return Object == val.constructor;
	  }
	
	  /**
	   * Invokes the specified function asynchronously on the specified scheduler, surfacing the result through an observable sequence.
	   *
	   * @example
	   * var res = Rx.Observable.start(function () { console.log('hello'); });
	   * var res = Rx.Observable.start(function () { console.log('hello'); }, Rx.Scheduler.timeout);
	   * var res = Rx.Observable.start(function () { this.log('hello'); }, Rx.Scheduler.timeout, console);
	   *
	   * @param {Function} func Function to run asynchronously.
	   * @param {Scheduler} [scheduler]  Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param [context]  The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   *
	   * Remarks
	   * * The function is called immediately, not during the subscription of the resulting sequence.
	   * * Multiple subscriptions to the resulting sequence can observe the function's result.
	   */
	  Observable.start = function (func, context, scheduler) {
	    return observableToAsync(func, context, scheduler)();
	  };
	
	  /**
	   * Converts the function into an asynchronous function. Each invocation of the resulting asynchronous function causes an invocation of the original synchronous function on the specified scheduler.
	   * @param {Function} function Function to convert to an asynchronous function.
	   * @param {Scheduler} [scheduler] Scheduler to run the function on. If not specified, defaults to Scheduler.timeout.
	   * @param {Mixed} [context] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	   * @returns {Function} Asynchronous function.
	   */
	  var observableToAsync = Observable.toAsync = function (func, context, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return function () {
	      var args = arguments,
	        subject = new AsyncSubject();
	
	      scheduler.schedule(null, function () {
	        var result;
	        try {
	          result = func.apply(context, args);
	        } catch (e) {
	          subject.onError(e);
	          return;
	        }
	        subject.onNext(result);
	        subject.onCompleted();
	      });
	      return subject.asObservable();
	    };
	  };
	
	function createCbObservable(fn, ctx, selector, args) {
	  var o = new AsyncSubject();
	
	  args.push(createCbHandler(o, ctx, selector));
	  fn.apply(ctx, args);
	
	  return o.asObservable();
	}
	
	function createCbHandler(o, ctx, selector) {
	  return function handler () {
	    var len = arguments.length, results = new Array(len);
	    for(var i = 0; i < len; i++) { results[i] = arguments[i]; }
	
	    if (isFunction(selector)) {
	      results = tryCatch(selector).apply(ctx, results);
	      if (results === errorObj) { return o.onError(results.e); }
	      o.onNext(results);
	    } else {
	      if (results.length <= 1) {
	        o.onNext(results[0]);
	      } else {
	        o.onNext(results);
	      }
	    }
	
	    o.onCompleted();
	  };
	}
	
	/**
	 * Converts a callback function to an observable sequence.
	 *
	 * @param {Function} fn Function with a callback as the last parameter to convert to an Observable sequence.
	 * @param {Mixed} [ctx] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	 * @param {Function} [selector] A selector which takes the arguments from the callback to produce a single item to yield on next.
	 * @returns {Function} A function, when executed with the required parameters minus the callback, produces an Observable sequence with a single value of the arguments to the callback as an array.
	 */
	Observable.fromCallback = function (fn, ctx, selector) {
	  return function () {
	    typeof ctx === 'undefined' && (ctx = this); 
	
	    var len = arguments.length, args = new Array(len)
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return createCbObservable(fn, ctx, selector, args);
	  };
	};
	
	function createNodeObservable(fn, ctx, selector, args) {
	  var o = new AsyncSubject();
	
	  args.push(createNodeHandler(o, ctx, selector));
	  fn.apply(ctx, args);
	
	  return o.asObservable();
	}
	
	function createNodeHandler(o, ctx, selector) {
	  return function handler () {
	    var err = arguments[0];
	    if (err) { return o.onError(err); }
	
	    var len = arguments.length, results = [];
	    for(var i = 1; i < len; i++) { results[i - 1] = arguments[i]; }
	
	    if (isFunction(selector)) {
	      var results = tryCatch(selector).apply(ctx, results);
	      if (results === errorObj) { return o.onError(results.e); }
	      o.onNext(results);
	    } else {
	      if (results.length <= 1) {
	        o.onNext(results[0]);
	      } else {
	        o.onNext(results);
	      }
	    }
	
	    o.onCompleted();
	  };
	}
	
	/**
	 * Converts a Node.js callback style function to an observable sequence.  This must be in function (err, ...) format.
	 * @param {Function} fn The function to call
	 * @param {Mixed} [ctx] The context for the func parameter to be executed.  If not specified, defaults to undefined.
	 * @param {Function} [selector] A selector which takes the arguments from the callback minus the error to produce a single item to yield on next.
	 * @returns {Function} An async function which when applied, returns an observable sequence with the callback arguments as an array.
	 */
	Observable.fromNodeCallback = function (fn, ctx, selector) {
	  return function () {
	    typeof ctx === 'undefined' && (ctx = this); 
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return createNodeObservable(fn, ctx, selector, args);
	  };
	};
	
	  function isNodeList(el) {
	    if (root.StaticNodeList) {
	      // IE8 Specific
	      // instanceof is slower than Object#toString, but Object#toString will not work as intended in IE8
	      return el instanceof root.StaticNodeList || el instanceof root.NodeList;
	    } else {
	      return Object.prototype.toString.call(el) === '[object NodeList]';
	    }
	  }
	
	  function ListenDisposable(e, n, fn) {
	    this._e = e;
	    this._n = n;
	    this._fn = fn;
	    this._e.addEventListener(this._n, this._fn, false);
	    this.isDisposed = false;
	  }
	  ListenDisposable.prototype.dispose = function () {
	    if (!this.isDisposed) {
	      this._e.removeEventListener(this._n, this._fn, false);
	      this.isDisposed = true;
	    }
	  };
	
	  function createEventListener (el, eventName, handler) {
	    var disposables = new CompositeDisposable();
	
	    // Asume NodeList or HTMLCollection
	    var elemToString = Object.prototype.toString.call(el);
	    if (isNodeList(el) || elemToString === '[object HTMLCollection]') {
	      for (var i = 0, len = el.length; i < len; i++) {
	        disposables.add(createEventListener(el.item(i), eventName, handler));
	      }
	    } else if (el) {
	      disposables.add(new ListenDisposable(el, eventName, handler));
	    }
	
	    return disposables;
	  }
	
	  /**
	   * Configuration option to determine whether to use native events only
	   */
	  Rx.config.useNativeEvents = false;
	
	  var EventObservable = (function(__super__) {
	    inherits(EventObservable, __super__);
	    function EventObservable(el, name, fn) {
	      this._el = el;
	      this._n = name;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    function createHandler(o, fn) {
	      return function handler () {
	        var results = arguments[0];
	        if (isFunction(fn)) {
	          results = tryCatch(fn).apply(null, arguments);
	          if (results === errorObj) { return o.onError(results.e); }
	        }
	        o.onNext(results);
	      };
	    }
	
	    EventObservable.prototype.subscribeCore = function (o) {
	      return createEventListener(
	        this._el,
	        this._n,
	        createHandler(o, this._fn));
	    };
	
	    return EventObservable;
	  }(ObservableBase));
	
	  /**
	   * Creates an observable sequence by adding an event listener to the matching DOMElement or each item in the NodeList.
	   * @param {Object} element The DOMElement or NodeList to attach a listener.
	   * @param {String} eventName The event name to attach the observable sequence.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence of events from the specified element and the specified event.
	   */
	  Observable.fromEvent = function (element, eventName, selector) {
	    // Node.js specific
	    if (element.addListener) {
	      return fromEventPattern(
	        function (h) { element.addListener(eventName, h); },
	        function (h) { element.removeListener(eventName, h); },
	        selector);
	    }
	
	    // Use only if non-native events are allowed
	    if (!Rx.config.useNativeEvents) {
	      // Handles jq, Angular.js, Zepto, Marionette, Ember.js
	      if (typeof element.on === 'function' && typeof element.off === 'function') {
	        return fromEventPattern(
	          function (h) { element.on(eventName, h); },
	          function (h) { element.off(eventName, h); },
	          selector);
	      }
	    }
	
	    return new EventObservable(element, eventName, selector).publish().refCount();
	  };
	
	  var EventPatternObservable = (function(__super__) {
	    inherits(EventPatternObservable, __super__);
	    function EventPatternObservable(add, del, fn) {
	      this._add = add;
	      this._del = del;
	      this._fn = fn;
	      __super__.call(this);
	    }
	
	    function createHandler(o, fn) {
	      return function handler () {
	        var results = arguments[0];
	        if (isFunction(fn)) {
	          results = tryCatch(fn).apply(null, arguments);
	          if (results === errorObj) { return o.onError(results.e); }
	        }
	        o.onNext(results);
	      };
	    }
	
	    EventPatternObservable.prototype.subscribeCore = function (o) {
	      var fn = createHandler(o, this._fn);
	      var returnValue = this._add(fn);
	      return new EventPatternDisposable(this._del, fn, returnValue);
	    };
	
	    function EventPatternDisposable(del, fn, ret) {
	      this._del = del;
	      this._fn = fn;
	      this._ret = ret;
	      this.isDisposed = false;
	    }
	
	    EventPatternDisposable.prototype.dispose = function () {
	      if(!this.isDisposed) {
	        isFunction(this._del) && this._del(this._fn, this._ret);
	      }
	    };
	
	    return EventPatternObservable;
	  }(ObservableBase));
	
	  /**
	   * Creates an observable sequence from an event emitter via an addHandler/removeHandler pair.
	   * @param {Function} addHandler The function to add a handler to the emitter.
	   * @param {Function} [removeHandler] The optional function to remove a handler from an emitter.
	   * @param {Function} [selector] A selector which takes the arguments from the event handler to produce a single item to yield on next.
	   * @returns {Observable} An observable sequence which wraps an event from an event emitter
	   */
	  var fromEventPattern = Observable.fromEventPattern = function (addHandler, removeHandler, selector) {
	    return new EventPatternObservable(addHandler, removeHandler, selector).publish().refCount();
	  };
	
	  /**
	   * Invokes the asynchronous function, surfacing the result through an observable sequence.
	   * @param {Function} functionAsync Asynchronous function which returns a Promise to run.
	   * @returns {Observable} An observable sequence exposing the function's result value, or an exception.
	   */
	  Observable.startAsync = function (functionAsync) {
	    var promise = tryCatch(functionAsync)();
	    if (promise === errorObj) { return observableThrow(promise.e); }
	    return observableFromPromise(promise);
	  };
	
	  var PausableObservable = (function (__super__) {
	    inherits(PausableObservable, __super__);
	    function PausableObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();
	
	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }
	
	      __super__.call(this);
	    }
	
	    PausableObservable.prototype._subscribe = function (o) {
	      var conn = this.source.publish(),
	        subscription = conn.subscribe(o),
	        connection = disposableEmpty;
	
	      var pausable = this.pauser.distinctUntilChanged().subscribe(function (b) {
	        if (b) {
	          connection = conn.connect();
	        } else {
	          connection.dispose();
	          connection = disposableEmpty;
	        }
	      });
	
	      return new NAryDisposable([subscription, connection, pausable]);
	    };
	
	    PausableObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };
	
	    PausableObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };
	
	    return PausableObservable;
	
	  }(Observable));
	
	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausable(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausable = function (pauser) {
	    return new PausableObservable(this, pauser);
	  };
	
	  function combineLatestSource(source, subject, resultSelector) {
	    return new AnonymousObservable(function (o) {
	      var hasValue = [false, false],
	        hasValueAll = false,
	        isDone = false,
	        values = new Array(2),
	        err;
	
	      function next(x, i) {
	        values[i] = x;
	        hasValue[i] = true;
	        if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
	          if (err) { return o.onError(err); }
	          var res = tryCatch(resultSelector).apply(null, values);
	          if (res === errorObj) { return o.onError(res.e); }
	          o.onNext(res);
	        }
	        isDone && values[1] && o.onCompleted();
	      }
	
	      return new BinaryDisposable(
	        source.subscribe(
	          function (x) {
	            next(x, 0);
	          },
	          function (e) {
	            if (values[1]) {
	              o.onError(e);
	            } else {
	              err = e;
	            }
	          },
	          function () {
	            isDone = true;
	            values[1] && o.onCompleted();
	          }),
	        subject.subscribe(
	          function (x) {
	            next(x, 1);
	          },
	          function (e) { o.onError(e); },
	          function () {
	            isDone = true;
	            next(true, 1);
	          })
	        );
	    }, source);
	  }
	
	  var PausableBufferedObservable = (function (__super__) {
	    inherits(PausableBufferedObservable, __super__);
	    function PausableBufferedObservable(source, pauser) {
	      this.source = source;
	      this.controller = new Subject();
	
	      if (pauser && pauser.subscribe) {
	        this.pauser = this.controller.merge(pauser);
	      } else {
	        this.pauser = this.controller;
	      }
	
	      __super__.call(this);
	    }
	
	    PausableBufferedObservable.prototype._subscribe = function (o) {
	      var q = [], previousShouldFire;
	
	      function drainQueue() { while (q.length > 0) { o.onNext(q.shift()); } }
	
	      var subscription =
	        combineLatestSource(
	          this.source,
	          this.pauser.startWith(false).distinctUntilChanged(),
	          function (data, shouldFire) {
	            return { data: data, shouldFire: shouldFire };
	          })
	          .subscribe(
	            function (results) {
	              if (previousShouldFire !== undefined && results.shouldFire !== previousShouldFire) {
	                previousShouldFire = results.shouldFire;
	                // change in shouldFire
	                if (results.shouldFire) { drainQueue(); }
	              } else {
	                previousShouldFire = results.shouldFire;
	                // new data
	                if (results.shouldFire) {
	                  o.onNext(results.data);
	                } else {
	                  q.push(results.data);
	                }
	              }
	            },
	            function (err) {
	              drainQueue();
	              o.onError(err);
	            },
	            function () {
	              drainQueue();
	              o.onCompleted();
	            }
	          );
	      return subscription;      
	    };
	
	    PausableBufferedObservable.prototype.pause = function () {
	      this.controller.onNext(false);
	    };
	
	    PausableBufferedObservable.prototype.resume = function () {
	      this.controller.onNext(true);
	    };
	
	    return PausableBufferedObservable;
	
	  }(Observable));
	
	  /**
	   * Pauses the underlying observable sequence based upon the observable sequence which yields true/false,
	   * and yields the values that were buffered while paused.
	   * @example
	   * var pauser = new Rx.Subject();
	   * var source = Rx.Observable.interval(100).pausableBuffered(pauser);
	   * @param {Observable} pauser The observable sequence used to pause the underlying sequence.
	   * @returns {Observable} The observable sequence which is paused based upon the pauser.
	   */
	  observableProto.pausableBuffered = function (pauser) {
	    return new PausableBufferedObservable(this, pauser);
	  };
	
	  var ControlledObservable = (function (__super__) {
	    inherits(ControlledObservable, __super__);
	    function ControlledObservable (source, enableQueue, scheduler) {
	      __super__.call(this);
	      this.subject = new ControlledSubject(enableQueue, scheduler);
	      this.source = source.multicast(this.subject).refCount();
	    }
	
	    ControlledObservable.prototype._subscribe = function (o) {
	      return this.source.subscribe(o);
	    };
	
	    ControlledObservable.prototype.request = function (numberOfItems) {
	      return this.subject.request(numberOfItems == null ? -1 : numberOfItems);
	    };
	
	    return ControlledObservable;
	
	  }(Observable));
	
	  var ControlledSubject = (function (__super__) {
	    inherits(ControlledSubject, __super__);
	    function ControlledSubject(enableQueue, scheduler) {
	      enableQueue == null && (enableQueue = true);
	
	      __super__.call(this);
	      this.subject = new Subject();
	      this.enableQueue = enableQueue;
	      this.queue = enableQueue ? [] : null;
	      this.requestedCount = 0;
	      this.requestedDisposable = null;
	      this.error = null;
	      this.hasFailed = false;
	      this.hasCompleted = false;
	      this.scheduler = scheduler || currentThreadScheduler;
	    }
	
	    addProperties(ControlledSubject.prototype, Observer, {
	      _subscribe: function (o) {
	        return this.subject.subscribe(o);
	      },
	      onCompleted: function () {
	        this.hasCompleted = true;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onCompleted();
	          this.disposeCurrentRequest();
	        } else {
	          this.queue.push(Notification.createOnCompleted());
	        }
	      },
	      onError: function (error) {
	        this.hasFailed = true;
	        this.error = error;
	        if (!this.enableQueue || this.queue.length === 0) {
	          this.subject.onError(error);
	          this.disposeCurrentRequest();
	        } else {
	          this.queue.push(Notification.createOnError(error));
	        }
	      },
	      onNext: function (value) {
	        if (this.requestedCount <= 0) {
	          this.enableQueue && this.queue.push(Notification.createOnNext(value));
	        } else {
	          (this.requestedCount-- === 0) && this.disposeCurrentRequest();
	          this.subject.onNext(value);
	        }
	      },
	      _processRequest: function (numberOfItems) {
	        if (this.enableQueue) {
	          while (this.queue.length > 0 && (numberOfItems > 0 || this.queue[0].kind !== 'N')) {
	            var first = this.queue.shift();
	            first.accept(this.subject);
	            if (first.kind === 'N') {
	              numberOfItems--;
	            } else {
	              this.disposeCurrentRequest();
	              this.queue = [];
	            }
	          }
	        }
	
	        return numberOfItems;
	      },
	      request: function (number) {
	        this.disposeCurrentRequest();
	        var self = this;
	
	        this.requestedDisposable = this.scheduler.schedule(number,
	        function(s, i) {
	          var remaining = self._processRequest(i);
	          var stopped = self.hasCompleted || self.hasFailed;
	          if (!stopped && remaining > 0) {
	            self.requestedCount = remaining;
	
	            return disposableCreate(function () {
	              self.requestedCount = 0;
	            });
	              // Scheduled item is still in progress. Return a new
	              // disposable to allow the request to be interrupted
	              // via dispose.
	          }
	        });
	
	        return this.requestedDisposable;
	      },
	      disposeCurrentRequest: function () {
	        if (this.requestedDisposable) {
	          this.requestedDisposable.dispose();
	          this.requestedDisposable = null;
	        }
	      }
	    });
	
	    return ControlledSubject;
	  }(Observable));
	
	  /**
	   * Attaches a controller to the observable sequence with the ability to queue.
	   * @example
	   * var source = Rx.Observable.interval(100).controlled();
	   * source.request(3); // Reads 3 values
	   * @param {bool} enableQueue truthy value to determine if values should be queued pending the next request
	   * @param {Scheduler} scheduler determines how the requests will be scheduled
	   * @returns {Observable} The observable sequence which only propagates values on request.
	   */
	  observableProto.controlled = function (enableQueue, scheduler) {
	
	    if (enableQueue && isScheduler(enableQueue)) {
	      scheduler = enableQueue;
	      enableQueue = true;
	    }
	
	    if (enableQueue == null) {  enableQueue = true; }
	    return new ControlledObservable(this, enableQueue, scheduler);
	  };
	
	  var StopAndWaitObservable = (function (__super__) {
	    inherits(StopAndWaitObservable, __super__);
	    function StopAndWaitObservable (source) {
	      __super__.call(this);
	      this.source = source;
	    }
	
	    function scheduleMethod(s, self) {
	      self.source.request(1);
	    }
	
	    StopAndWaitObservable.prototype._subscribe = function (o) {
	      this.subscription = this.source.subscribe(new StopAndWaitObserver(o, this, this.subscription));
	      return new BinaryDisposable(
	        this.subscription,
	        defaultScheduler.schedule(this, scheduleMethod)
	      );
	    };
	
	    var StopAndWaitObserver = (function (__sub__) {
	      inherits(StopAndWaitObserver, __sub__);
	      function StopAndWaitObserver (observer, observable, cancel) {
	        __sub__.call(this);
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	        this.scheduleDisposable = null;
	      }
	
	      StopAndWaitObserver.prototype.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };
	
	      StopAndWaitObserver.prototype.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      };
	
	      function innerScheduleMethod(s, self) {
	        self.observable.source.request(1);
	      }
	
	      StopAndWaitObserver.prototype.next = function (value) {
	        this.observer.onNext(value);
	        this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod);
	      };
	
	      StopAndWaitObservable.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        if (this.scheduleDisposable) {
	          this.scheduleDisposable.dispose();
	          this.scheduleDisposable = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };
	
	      return StopAndWaitObserver;
	    }(AbstractObserver));
	
	    return StopAndWaitObservable;
	  }(Observable));
	
	
	  /**
	   * Attaches a stop and wait observable to the current observable.
	   * @returns {Observable} A stop and wait observable.
	   */
	  ControlledObservable.prototype.stopAndWait = function () {
	    return new StopAndWaitObservable(this);
	  };
	
	  var WindowedObservable = (function (__super__) {
	    inherits(WindowedObservable, __super__);
	    function WindowedObservable(source, windowSize) {
	      __super__.call(this);
	      this.source = source;
	      this.windowSize = windowSize;
	    }
	
	    function scheduleMethod(s, self) {
	      self.source.request(self.windowSize);
	    }
	
	    WindowedObservable.prototype._subscribe = function (o) {
	      this.subscription = this.source.subscribe(new WindowedObserver(o, this, this.subscription));
	      return new BinaryDisposable(
	        this.subscription,
	        defaultScheduler.schedule(this, scheduleMethod)
	      );
	    };
	
	    var WindowedObserver = (function (__sub__) {
	      inherits(WindowedObserver, __sub__);
	      function WindowedObserver(observer, observable, cancel) {
	        this.observer = observer;
	        this.observable = observable;
	        this.cancel = cancel;
	        this.received = 0;
	        this.scheduleDisposable = null;
	        __sub__.call(this);
	      }
	
	      WindowedObserver.prototype.completed = function () {
	        this.observer.onCompleted();
	        this.dispose();
	      };
	
	      WindowedObserver.prototype.error = function (error) {
	        this.observer.onError(error);
	        this.dispose();
	      };
	
	      function innerScheduleMethod(s, self) {
	        self.observable.source.request(self.observable.windowSize);
	      }
	
	      WindowedObserver.prototype.next = function (value) {
	        this.observer.onNext(value);
	        this.received = ++this.received % this.observable.windowSize;
	        this.received === 0 && (this.scheduleDisposable = defaultScheduler.schedule(this, innerScheduleMethod));
	      };
	
	      WindowedObserver.prototype.dispose = function () {
	        this.observer = null;
	        if (this.cancel) {
	          this.cancel.dispose();
	          this.cancel = null;
	        }
	        if (this.scheduleDisposable) {
	          this.scheduleDisposable.dispose();
	          this.scheduleDisposable = null;
	        }
	        __sub__.prototype.dispose.call(this);
	      };
	
	      return WindowedObserver;
	    }(AbstractObserver));
	
	    return WindowedObservable;
	  }(Observable));
	
	  /**
	   * Creates a sliding windowed observable based upon the window size.
	   * @param {Number} windowSize The number of items in the window
	   * @returns {Observable} A windowed observable based upon the window size.
	   */
	  ControlledObservable.prototype.windowed = function (windowSize) {
	    return new WindowedObservable(this, windowSize);
	  };
	
	  /**
	   * Pipes the existing Observable sequence into a Node.js Stream.
	   * @param {Stream} dest The destination Node.js stream.
	   * @returns {Stream} The destination stream.
	   */
	  observableProto.pipe = function (dest) {
	    var source = this.pausableBuffered();
	
	    function onDrain() {
	      source.resume();
	    }
	
	    dest.addListener('drain', onDrain);
	
	    source.subscribe(
	      function (x) {
	        !dest.write(String(x)) && source.pause();
	      },
	      function (err) {
	        dest.emit('error', err);
	      },
	      function () {
	        // Hack check because STDIO is not closable
	        !dest._isStdio && dest.end();
	        dest.removeListener('drain', onDrain);
	      });
	
	    source.resume();
	
	    return dest;
	  };
	
	  var MulticastObservable = (function (__super__) {
	    inherits(MulticastObservable, __super__);
	    function MulticastObservable(source, fn1, fn2) {
	      this.source = source;
	      this._fn1 = fn1;
	      this._fn2 = fn2;
	      __super__.call(this);
	    }
	
	    MulticastObservable.prototype.subscribeCore = function (o) {
	      var connectable = this.source.multicast(this._fn1());
	      return new BinaryDisposable(this._fn2(connectable).subscribe(o), connectable.connect());
	    };
	
	    return MulticastObservable;
	  }(ObservableBase));
	
	  /**
	   * Multicasts the source sequence notifications through an instantiated subject into all uses of the sequence within a selector function. Each
	   * subscription to the resulting sequence causes a separate multicast invocation, exposing the sequence resulting from the selector function's
	   * invocation. For specializations with fixed subject types, see Publish, PublishLast, and Replay.
	   *
	   * @example
	   * 1 - res = source.multicast(observable);
	   * 2 - res = source.multicast(function () { return new Subject(); }, function (x) { return x; });
	   *
	   * @param {Function|Subject} subjectOrSubjectSelector
	   * Factory function to create an intermediate subject through which the source sequence's elements will be multicast to the selector function.
	   * Or:
	   * Subject to push source elements into.
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence subject to the policies enforced by the created subject. Specified only if <paramref name="subjectOrSubjectSelector" is a factory function.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.multicast = function (subjectOrSubjectSelector, selector) {
	    return isFunction(subjectOrSubjectSelector) ?
	      new MulticastObservable(this, subjectOrSubjectSelector, selector) :
	      new ConnectableObservable(this, subjectOrSubjectSelector);
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of Multicast using a regular Subject.
	   *
	   * @example
	   * var resres = source.publish();
	   * var res = source.publish(function (x) { return x; });
	   *
	   * @param {Function} [selector] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publish = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new Subject(); }, selector) :
	      this.multicast(new Subject());
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence.
	   * This operator is a specialization of publish which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.share = function () {
	    return this.publish().refCount();
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence containing only the last notification.
	   * This operator is a specialization of Multicast using a AsyncSubject.
	   *
	   * @example
	   * var res = source.publishLast();
	   * var res = source.publishLast(function (x) { return x; });
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will only receive the last notification of the source.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishLast = function (selector) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new AsyncSubject(); }, selector) :
	      this.multicast(new AsyncSubject());
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence and starts with initialValue.
	   * This operator is a specialization of Multicast using a BehaviorSubject.
	   *
	   * @example
	   * var res = source.publishValue(42);
	   * var res = source.publishValue(function (x) { return x.select(function (y) { return y * y; }) }, 42);
	   *
	   * @param {Function} [selector] Optional selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive immediately receive the initial value, followed by all notifications of the source from the time of the subscription on.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.publishValue = function (initialValueOrSelector, initialValue) {
	    return arguments.length === 2 ?
	      this.multicast(function () {
	        return new BehaviorSubject(initialValue);
	      }, initialValueOrSelector) :
	      this.multicast(new BehaviorSubject(initialValueOrSelector));
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence and starts with an initialValue.
	   * This operator is a specialization of publishValue which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   * @param {Mixed} initialValue Initial value received by observers upon subscription.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareValue = function (initialValue) {
	    return this.publishValue(initialValue).refCount();
	  };
	
	  /**
	   * Returns an observable sequence that is the result of invoking the selector on a connectable observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of Multicast using a ReplaySubject.
	   *
	   * @example
	   * var res = source.replay(null, 3);
	   * var res = source.replay(null, 3, 500);
	   * var res = source.replay(null, 3, 500, scheduler);
	   * var res = source.replay(function (x) { return x.take(6).repeat(); }, 3, 500, scheduler);
	   *
	   * @param selector [Optional] Selector function which can use the multicasted source sequence as many times as needed, without causing multiple subscriptions to the source sequence. Subscribers to the given source will receive all the notifications of the source subject to the specified replay buffer trimming policy.
	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param windowSize [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.replay = function (selector, bufferSize, windowSize, scheduler) {
	    return selector && isFunction(selector) ?
	      this.multicast(function () { return new ReplaySubject(bufferSize, windowSize, scheduler); }, selector) :
	      this.multicast(new ReplaySubject(bufferSize, windowSize, scheduler));
	  };
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence replaying notifications subject to a maximum time length for the replay buffer.
	   * This operator is a specialization of replay which creates a subscription when the number of observers goes from zero to one, then shares that subscription with all subsequent observers until the number of observers returns to zero, at which point the subscription is disposed.
	   *
	   * @example
	   * var res = source.shareReplay(3);
	   * var res = source.shareReplay(3, 500);
	   * var res = source.shareReplay(3, 500, scheduler);
	   *
	
	   * @param bufferSize [Optional] Maximum element count of the replay buffer.
	   * @param window [Optional] Maximum time length of the replay buffer.
	   * @param scheduler [Optional] Scheduler where connected observers within the selector function will be invoked on.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence.
	   */
	  observableProto.shareReplay = function (bufferSize, windowSize, scheduler) {
	    return this.replay(null, bufferSize, windowSize, scheduler).refCount();
	  };
	
	  var InnerSubscription = function (s, o) {
	    this._s = s;
	    this._o = o;
	  };
	
	  InnerSubscription.prototype.dispose = function () {
	    if (!this._s.isDisposed && this._o !== null) {
	      var idx = this._s.observers.indexOf(this._o);
	      this._s.observers.splice(idx, 1);
	      this._o = null;
	    }
	  };
	
	  var RefCountObservable = (function (__super__) {
	    inherits(RefCountObservable, __super__);
	    function RefCountObservable(source) {
	      this.source = source;
	      this._count = 0;
	      this._connectableSubscription = null;
	      __super__.call(this);
	    }
	
	    RefCountObservable.prototype.subscribeCore = function (o) {
	      var subscription = this.source.subscribe(o);
	      ++this._count === 1 && (this._connectableSubscription = this.source.connect());
	      return new RefCountDisposable(this, subscription);
	    };
	
	    function RefCountDisposable(p, s) {
	      this._p = p;
	      this._s = s;
	      this.isDisposed = false;
	    }
	
	    RefCountDisposable.prototype.dispose = function () {
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this._s.dispose();
	        --this._p._count === 0 && this._p._connectableSubscription.dispose();
	      }
	    };
	
	    return RefCountObservable;
	  }(ObservableBase));
	
	  var ConnectableObservable = Rx.ConnectableObservable = (function (__super__) {
	    inherits(ConnectableObservable, __super__);
	    function ConnectableObservable(source, subject) {
	      this.source = source;
	      this._connection = null;
	      this._source = source.asObservable();
	      this._subject = subject;
	      __super__.call(this);
	    }
	
	    function ConnectDisposable(parent, subscription) {
	      this._p = parent;
	      this._s = subscription;
	    }
	
	    ConnectDisposable.prototype.dispose = function () {
	      if (this._s) {
	        this._s.dispose();
	        this._s = null;
	        this._p._connection = null;
	      }
	    };
	
	    ConnectableObservable.prototype.connect = function () {
	      if (!this._connection) {
	        var subscription = this._source.subscribe(this._subject);
	        this._connection = new ConnectDisposable(this, subscription);
	      }
	      return this._connection;
	    };
	
	    ConnectableObservable.prototype._subscribe = function (o) {
	      return this._subject.subscribe(o);
	    };
	
	    ConnectableObservable.prototype.refCount = function () {
	      return new RefCountObservable(this);
	    };
	
	    return ConnectableObservable;
	  }(Observable));
	
	  /**
	   * Returns an observable sequence that shares a single subscription to the underlying sequence. This observable sequence
	   * can be resubscribed to, even if all prior subscriptions have ended. (unlike `.publish().refCount()`)
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source.
	   */
	  observableProto.singleInstance = function() {
	    var source = this, hasObservable = false, observable;
	
	    function getObservable() {
	      if (!hasObservable) {
	        hasObservable = true;
	        observable = source['finally'](function() { hasObservable = false; }).publish().refCount();
	      }
	      return observable;
	    }
	
	    return new AnonymousObservable(function(o) {
	      return getObservable().subscribe(o);
	    });
	  };
	
	  /**
	   *  Correlates the elements of two sequences based on overlapping durations.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any two overlapping elements of the left and right observable sequences. The parameters passed to the function correspond with the elements from the left and right source sequences for which overlap occurs.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.join = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable();
	      var leftDone = false, rightDone = false;
	      var leftId = 0, rightId = 0;
	      var leftMap = new Map(), rightMap = new Map();
	      var handleError = function (e) { o.onError(e); };
	
	      group.add(left.subscribe(
	        function (value) {
	          var id = leftId++, md = new SingleAssignmentDisposable();
	
	          leftMap.set(id, value);
	          group.add(md);
	
	          var duration = tryCatch(leftDurationSelector)(value);
	          if (duration === errorObj) { return o.onError(duration.e); }
	
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            handleError,
	            function () {
	              leftMap['delete'](id) && leftMap.size === 0 && leftDone && o.onCompleted();
	              group.remove(md);
	            }));
	
	          rightMap.forEach(function (v) {
	            var result = tryCatch(resultSelector)(value, v);
	            if (result === errorObj) { return o.onError(result.e); }
	            o.onNext(result);
	          });
	        },
	        handleError,
	        function () {
	          leftDone = true;
	          (rightDone || leftMap.size === 0) && o.onCompleted();
	        })
	      );
	
	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++, md = new SingleAssignmentDisposable();
	
	          rightMap.set(id, value);
	          group.add(md);
	
	          var duration = tryCatch(rightDurationSelector)(value);
	          if (duration === errorObj) { return o.onError(duration.e); }
	
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            handleError,
	            function () {
	              rightMap['delete'](id) && rightMap.size === 0 && rightDone && o.onCompleted();
	              group.remove(md);
	            }));
	
	          leftMap.forEach(function (v) {
	            var result = tryCatch(resultSelector)(v, value);
	            if (result === errorObj) { return o.onError(result.e); }
	            o.onNext(result);
	          });
	        },
	        handleError,
	        function () {
	          rightDone = true;
	          (leftDone || rightMap.size === 0) && o.onCompleted();
	        })
	      );
	      return group;
	    }, left);
	  };
	
	  /**
	   *  Correlates the elements of two sequences based on overlapping durations, and groups the results.
	   *
	   *  @param {Observable} right The right observable sequence to join elements for.
	   *  @param {Function} leftDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the left observable sequence, used to determine overlap.
	   *  @param {Function} rightDurationSelector A function to select the duration (expressed as an observable sequence) of each element of the right observable sequence, used to determine overlap.
	   *  @param {Function} resultSelector A function invoked to compute a result element for any element of the left sequence with overlapping elements from the right observable sequence. The first parameter passed to the function is an element of the left sequence. The second parameter passed to the function is an observable sequence with elements from the right sequence that overlap with the left sequence's element.
	   *  @returns {Observable} An observable sequence that contains result elements computed from source elements that have an overlapping duration.
	   */
	  observableProto.groupJoin = function (right, leftDurationSelector, rightDurationSelector, resultSelector) {
	    var left = this;
	    return new AnonymousObservable(function (o) {
	      var group = new CompositeDisposable();
	      var r = new RefCountDisposable(group);
	      var leftMap = new Map(), rightMap = new Map();
	      var leftId = 0, rightId = 0;
	      var handleError = function (e) { return function (v) { v.onError(e); }; };
	
	      function handleError(e) { };
	
	      group.add(left.subscribe(
	        function (value) {
	          var s = new Subject();
	          var id = leftId++;
	          leftMap.set(id, s);
	
	          var result = tryCatch(resultSelector)(value, addRef(s, r));
	          if (result === errorObj) {
	            leftMap.forEach(handleError(result.e));
	            return o.onError(result.e);
	          }
	          o.onNext(result);
	
	          rightMap.forEach(function (v) { s.onNext(v); });
	
	          var md = new SingleAssignmentDisposable();
	          group.add(md);
	
	          var duration = tryCatch(leftDurationSelector)(value);
	          if (duration === errorObj) {
	            leftMap.forEach(handleError(duration.e));
	            return o.onError(duration.e);
	          }
	
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.forEach(handleError(e));
	              o.onError(e);
	            },
	            function () {
	              leftMap['delete'](id) && s.onCompleted();
	              group.remove(md);
	            }));
	        },
	        function (e) {
	          leftMap.forEach(handleError(e));
	          o.onError(e);
	        },
	        function () { o.onCompleted(); })
	      );
	
	      group.add(right.subscribe(
	        function (value) {
	          var id = rightId++;
	          rightMap.set(id, value);
	
	          var md = new SingleAssignmentDisposable();
	          group.add(md);
	
	          var duration = tryCatch(rightDurationSelector)(value);
	          if (duration === errorObj) {
	            leftMap.forEach(handleError(duration.e));
	            return o.onError(duration.e);
	          }
	
	          md.setDisposable(duration.take(1).subscribe(
	            noop,
	            function (e) {
	              leftMap.forEach(handleError(e));
	              o.onError(e);
	            },
	            function () {
	              rightMap['delete'](id);
	              group.remove(md);
	            }));
	
	          leftMap.forEach(function (v) { v.onNext(value); });
	        },
	        function (e) {
	          leftMap.forEach(handleError(e));
	          o.onError(e);
	        })
	      );
	
	      return r;
	    }, left);
	  };
	
	  function toArray(x) { return x.toArray(); }
	
	  /**
	   *  Projects each element of an observable sequence into zero or more buffers.
	   *  @param {Mixed} bufferOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	   *  @param {Function} [bufferClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	   *  @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.buffer = function () {
	    return this.window.apply(this, arguments)
	      .flatMap(toArray);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows.
	   *
	   *  @param {Mixed} windowOpeningsOrClosingSelector Observable sequence whose elements denote the creation of new windows, or, a function invoked to define the boundaries of the produced windows (a new window is started when the previous one is closed, resulting in non-overlapping windows).
	   *  @param {Function} [windowClosingSelector] A function invoked to define the closing of each produced window. If a closing selector function is specified for the first parameter, this parameter is ignored.
	   *  @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.window = function (windowOpeningsOrClosingSelector, windowClosingSelector) {
	    if (arguments.length === 1 && typeof arguments[0] !== 'function') {
	      return observableWindowWithBoundaries.call(this, windowOpeningsOrClosingSelector);
	    }
	    return typeof windowOpeningsOrClosingSelector === 'function' ?
	      observableWindowWithClosingSelector.call(this, windowOpeningsOrClosingSelector) :
	      observableWindowWithOpenings.call(this, windowOpeningsOrClosingSelector, windowClosingSelector);
	  };
	
	  function observableWindowWithOpenings(windowOpenings, windowClosingSelector) {
	    return windowOpenings.groupJoin(this, windowClosingSelector, observableEmpty, function (_, win) {
	      return win;
	    });
	  }
	
	  function observableWindowWithBoundaries(windowBoundaries) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var win = new Subject(),
	        d = new CompositeDisposable(),
	        r = new RefCountDisposable(d);
	
	      observer.onNext(addRef(win, r));
	
	      d.add(source.subscribe(function (x) {
	        win.onNext(x);
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));
	
	      isPromise(windowBoundaries) && (windowBoundaries = observableFromPromise(windowBoundaries));
	
	      d.add(windowBoundaries.subscribe(function (w) {
	        win.onCompleted();
	        win = new Subject();
	        observer.onNext(addRef(win, r));
	      }, function (err) {
	        win.onError(err);
	        observer.onError(err);
	      }, function () {
	        win.onCompleted();
	        observer.onCompleted();
	      }));
	
	      return r;
	    }, source);
	  }
	
	  function observableWindowWithClosingSelector(windowClosingSelector) {
	    var source = this;
	    return new AnonymousObservable(function (observer) {
	      var m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        r = new RefCountDisposable(d),
	        win = new Subject();
	      observer.onNext(addRef(win, r));
	      d.add(source.subscribe(function (x) {
	          win.onNext(x);
	      }, function (err) {
	          win.onError(err);
	          observer.onError(err);
	      }, function () {
	          win.onCompleted();
	          observer.onCompleted();
	      }));
	
	      function createWindowClose () {
	        var windowClose;
	        try {
	          windowClose = windowClosingSelector();
	        } catch (e) {
	          observer.onError(e);
	          return;
	        }
	
	        isPromise(windowClose) && (windowClose = observableFromPromise(windowClose));
	
	        var m1 = new SingleAssignmentDisposable();
	        m.setDisposable(m1);
	        m1.setDisposable(windowClose.take(1).subscribe(noop, function (err) {
	          win.onError(err);
	          observer.onError(err);
	        }, function () {
	          win.onCompleted();
	          win = new Subject();
	          observer.onNext(addRef(win, r));
	          createWindowClose();
	        }));
	      }
	
	      createWindowClose();
	      return r;
	    }, source);
	  }
	
	  var PairwiseObservable = (function (__super__) {
	    inherits(PairwiseObservable, __super__);
	    function PairwiseObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    PairwiseObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new PairwiseObserver(o));
	    };
	
	    return PairwiseObservable;
	  }(ObservableBase));
	
	  var PairwiseObserver = (function(__super__) {
	    inherits(PairwiseObserver, __super__);
	    function PairwiseObserver(o) {
	      this._o = o;
	      this._p = null;
	      this._hp = false;
	    }
	
	    PairwiseObserver.prototype.next = function (x) {
	      if (this._hp) {
	        this._o.onNext([this._p, x]);
	      } else {
	        this._hp = true;
	      }
	      this._p = x;
	    };
	    PairwiseObserver.prototype.error = function (err) { this._o.onError(err); };
	    PairwiseObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return PairwiseObserver;
	  }(AbstractObserver));
	
	  /**
	   * Returns a new observable that triggers on the second and subsequent triggerings of the input observable.
	   * The Nth triggering of the input observable passes the arguments from the N-1th and Nth triggering as a pair.
	   * The argument passed to the N-1th triggering is held in hidden internal state until the Nth triggering occurs.
	   * @returns {Observable} An observable that triggers on successive pairs of observations from the input observable as an array.
	   */
	  observableProto.pairwise = function () {
	    return new PairwiseObservable(this);
	  };
	
	  /**
	   * Returns two observables which partition the observations of the source by the given function.
	   * The first will trigger observations for those values for which the predicate returns true.
	   * The second will trigger observations for those values where the predicate returns false.
	   * The predicate is executed once for each subscribed observer.
	   * Both also propagate all error observations arising from the source and each completes
	   * when the source completes.
	   * @param {Function} predicate
	   *    The function to determine which output Observable will trigger a particular observation.
	   * @returns {Array}
	   *    An array of observables. The first triggers when the predicate returns true,
	   *    and the second triggers when the predicate returns false.
	  */
	  observableProto.partition = function(predicate, thisArg) {
	    var fn = bindCallback(predicate, thisArg, 3);
	    return [
	      this.filter(predicate, thisArg),
	      this.filter(function (x, i, o) { return !fn(x, i, o); })
	    ];
	  };
	
	  var WhileEnumerable = (function(__super__) {
	    inherits(WhileEnumerable, __super__);
	    function WhileEnumerable(c, s) {
	      this.c = c;
	      this.s = s;
	    }
	    WhileEnumerable.prototype[$iterator$] = function () {
	      var self = this;
	      return {
	        next: function () {
	          return self.c() ?
	           { done: false, value: self.s } :
	           { done: true, value: void 0 };
	        }
	      };
	    };
	    return WhileEnumerable;
	  }(Enumerable));
	  
	  function enumerableWhile(condition, source) {
	    return new WhileEnumerable(condition, source);
	  }  
	
	   /**
	   *  Returns an observable sequence that is the result of invoking the selector on the source sequence, without sharing subscriptions.
	   *  This operator allows for a fluent style of writing queries that use the same sequence multiple times.
	   *
	   * @param {Function} selector Selector function which can use the source sequence as many times as needed, without sharing subscriptions to the source sequence.
	   * @returns {Observable} An observable sequence that contains the elements of a sequence produced by multicasting the source sequence within a selector function.
	   */
	  observableProto.letBind = observableProto['let'] = function (func) {
	    return func(this);
	  };
	
	   /**
	   *  Determines whether an observable collection contains values. 
	   *
	   * @example
	   *  1 - res = Rx.Observable.if(condition, obs1);
	   *  2 - res = Rx.Observable.if(condition, obs1, obs2);
	   *  3 - res = Rx.Observable.if(condition, obs1, scheduler);
	   * @param {Function} condition The condition which determines if the thenSource or elseSource will be run.
	   * @param {Observable} thenSource The observable sequence or Promise that will be run if the condition function returns true.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the condition function returns false. If this is not provided, it defaults to Rx.Observabe.Empty with the specified scheduler.
	   * @returns {Observable} An observable sequence which is either the thenSource or elseSource.
	   */
	  Observable['if'] = function (condition, thenSource, elseSourceOrScheduler) {
	    return observableDefer(function () {
	      elseSourceOrScheduler || (elseSourceOrScheduler = observableEmpty());
	
	      isPromise(thenSource) && (thenSource = observableFromPromise(thenSource));
	      isPromise(elseSourceOrScheduler) && (elseSourceOrScheduler = observableFromPromise(elseSourceOrScheduler));
	
	      // Assume a scheduler for empty only
	      typeof elseSourceOrScheduler.now === 'function' && (elseSourceOrScheduler = observableEmpty(elseSourceOrScheduler));
	      return condition() ? thenSource : elseSourceOrScheduler;
	    });
	  };
	
	   /**
	   *  Concatenates the observable sequences obtained by running the specified result selector for each element in source.
	   * There is an alias for this method called 'forIn' for browsers <IE9
	   * @param {Array} sources An array of values to turn into an observable sequence.
	   * @param {Function} resultSelector A function to apply to each item in the sources array to turn it into an observable sequence.
	   * @returns {Observable} An observable sequence from the concatenated observable sequences.
	   */
	  Observable['for'] = Observable.forIn = function (sources, resultSelector, thisArg) {
	    return enumerableOf(sources, resultSelector, thisArg).concat();
	  };
	
	   /**
	   *  Repeats source as long as condition holds emulating a while loop.
	   * There is an alias for this method called 'whileDo' for browsers <IE9
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  var observableWhileDo = Observable['while'] = Observable.whileDo = function (condition, source) {
	    isPromise(source) && (source = observableFromPromise(source));
	    return enumerableWhile(condition, source).concat();
	  };
	
	   /**
	   *  Repeats source as long as condition holds emulating a do while loop.
	   *
	   * @param {Function} condition The condition which determines if the source will be repeated.
	   * @param {Observable} source The observable sequence that will be run if the condition function returns true.
	   * @returns {Observable} An observable sequence which is repeated as long as the condition holds.
	   */
	  observableProto.doWhile = function (condition) {
	    return observableConcat([this, observableWhileDo(condition, this)]);
	  };
	
	   /**
	   *  Uses selector to determine which source in sources to use.
	   * @param {Function} selector The function which extracts the value for to test in a case statement.
	   * @param {Array} sources A object which has keys which correspond to the case statement labels.
	   * @param {Observable} [elseSource] The observable sequence or Promise that will be run if the sources are not matched. If this is not provided, it defaults to Rx.Observabe.empty with the specified scheduler.
	   *
	   * @returns {Observable} An observable sequence which is determined by a case statement.
	   */
	  Observable['case'] = function (selector, sources, defaultSourceOrScheduler) {
	    return observableDefer(function () {
	      isPromise(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableFromPromise(defaultSourceOrScheduler));
	      defaultSourceOrScheduler || (defaultSourceOrScheduler = observableEmpty());
	
	      isScheduler(defaultSourceOrScheduler) && (defaultSourceOrScheduler = observableEmpty(defaultSourceOrScheduler));
	
	      var result = sources[selector()];
	      isPromise(result) && (result = observableFromPromise(result));
	
	      return result || defaultSourceOrScheduler;
	    });
	  };
	
	  var ExpandObservable = (function(__super__) {
	    inherits(ExpandObservable, __super__);
	    function ExpandObservable(source, fn, scheduler) {
	      this.source = source;
	      this._fn = fn;
	      this._scheduler = scheduler;
	      __super__.call(this);
	    }
	
	    function scheduleRecursive(args, recurse) {
	      var state = args[0], self = args[1];
	      var work;
	      if (state.q.length > 0) {
	        work = state.q.shift();
	      } else {
	        state.isAcquired = false;
	        return;
	      }
	      var m1 = new SingleAssignmentDisposable();
	      state.d.add(m1);
	      m1.setDisposable(work.subscribe(new ExpandObserver(state, self, m1)));
	      recurse([state, self]);
	    }
	
	    ExpandObservable.prototype._ensureActive = function (state) {
	      var isOwner = false;
	      if (state.q.length > 0) {
	        isOwner = !state.isAcquired;
	        state.isAcquired = true;
	      }
	      isOwner && state.m.setDisposable(this._scheduler.scheduleRecursive([state, this], scheduleRecursive));
	    };
	
	    ExpandObservable.prototype.subscribeCore = function (o) {
	      var m = new SerialDisposable(),
	        d = new CompositeDisposable(m),
	        state = {
	          q: [],
	          m: m,
	          d: d,
	          activeCount: 0,
	          isAcquired: false,
	          o: o
	        };
	
	      state.q.push(this.source);
	      state.activeCount++;
	      this._ensureActive(state);
	      return d;
	    };
	
	    return ExpandObservable;
	  }(ObservableBase));
	
	  var ExpandObserver = (function(__super__) {
	    inherits(ExpandObserver, __super__);
	    function ExpandObserver(state, parent, m1) {
	      this._s = state;
	      this._p = parent;
	      this._m1 = m1;
	      __super__.call(this);
	    }
	
	    ExpandObserver.prototype.next = function (x) {
	      this._s.o.onNext(x);
	      var result = tryCatch(this._p._fn)(x);
	      if (result === errorObj) { return this._s.o.onError(result.e); }
	      this._s.q.push(result);
	      this._s.activeCount++;
	      this._p._ensureActive(this._s);
	    };
	
	    ExpandObserver.prototype.error = function (e) {
	      this._s.o.onError(e);
	    };
	
	    ExpandObserver.prototype.completed = function () {
	      this._s.d.remove(this._m1);
	      this._s.activeCount--;
	      this._s.activeCount === 0 && this._s.o.onCompleted();
	    };
	
	    return ExpandObserver;
	  }(AbstractObserver));
	
	   /**
	   *  Expands an observable sequence by recursively invoking selector.
	   *
	   * @param {Function} selector Selector function to invoke for each produced element, resulting in another sequence to which the selector will be invoked recursively again.
	   * @param {Scheduler} [scheduler] Scheduler on which to perform the expansion. If not provided, this defaults to the current thread scheduler.
	   * @returns {Observable} An observable sequence containing all the elements produced by the recursive expansion.
	   */
	  observableProto.expand = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = currentThreadScheduler);
	    return new ExpandObservable(this, selector, scheduler);
	  };
	
	  function argumentsToArray() {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    return args;
	  }
	
	  var ForkJoinObservable = (function (__super__) {
	    inherits(ForkJoinObservable, __super__);
	    function ForkJoinObservable(sources, cb) {
	      this._sources = sources;
	      this._cb = cb;
	      __super__.call(this);
	    }
	
	    ForkJoinObservable.prototype.subscribeCore = function (o) {
	      if (this._sources.length === 0) {
	        o.onCompleted();
	        return disposableEmpty;
	      }
	
	      var count = this._sources.length;
	      var state = {
	        finished: false,
	        hasResults: new Array(count),
	        hasCompleted: new Array(count),
	        results: new Array(count)
	      };
	
	      var subscriptions = new CompositeDisposable();
	      for (var i = 0, len = this._sources.length; i < len; i++) {
	        var source = this._sources[i];
	        isPromise(source) && (source = observableFromPromise(source));
	        subscriptions.add(source.subscribe(new ForkJoinObserver(o, state, i, this._cb, subscriptions)));
	      }
	
	      return subscriptions;
	    };
	
	    return ForkJoinObservable;
	  }(ObservableBase));
	
	  var ForkJoinObserver = (function(__super__) {
	    inherits(ForkJoinObserver, __super__);
	    function ForkJoinObserver(o, s, i, cb, subs) {
	      this._o = o;
	      this._s = s;
	      this._i = i;
	      this._cb = cb;
	      this._subs = subs;
	      __super__.call(this);
	    }
	
	    ForkJoinObserver.prototype.next = function (x) {
	      if (!this._s.finished) {
	        this._s.hasResults[this._i] = true;
	        this._s.results[this._i] = x;
	      }
	    };
	
	    ForkJoinObserver.prototype.error = function (e) {
	      this._s.finished = true;
	      this._o.onError(e);
	      this._subs.dispose();
	    };
	
	    ForkJoinObserver.prototype.completed = function () {
	      if (!this._s.finished) {
	        if (!this._s.hasResults[this._i]) {
	          return this._o.onCompleted();
	        }
	        this._s.hasCompleted[this._i] = true;
	        for (var i = 0; i < this._s.results.length; i++) {
	          if (!this._s.hasCompleted[i]) { return; }
	        }
	        this._s.finished = true;
	
	        var res = tryCatch(this._cb).apply(null, this._s.results);
	        if (res === errorObj) { return this._o.onError(res.e); }
	
	        this._o.onNext(res);
	        this._o.onCompleted();
	      }
	    };
	
	    return ForkJoinObserver;
	  }(AbstractObserver));
	
	   /**
	   *  Runs all observable sequences in parallel and collect their last elements.
	   *
	   * @example
	   *  1 - res = Rx.Observable.forkJoin([obs1, obs2]);
	   *  1 - res = Rx.Observable.forkJoin(obs1, obs2, ...);
	   * @returns {Observable} An observable sequence with an array collecting the last elements of all the input sequences.
	   */
	  Observable.forkJoin = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    var resultSelector = isFunction(args[len - 1]) ? args.pop() : argumentsToArray;
	    Array.isArray(args[0]) && (args = args[0]);
	    return new ForkJoinObservable(args, resultSelector);
	  };
	
	   /**
	   *  Runs two observable sequences in parallel and combines their last elemenets.
	   * @param {Observable} second Second observable sequence.
	   * @param {Function} resultSelector Result selector function to invoke with the last elements of both sequences.
	   * @returns {Observable} An observable sequence with the result of calling the selector function with the last elements of both input sequences.
	   */
	  observableProto.forkJoin = function () {
	    var len = arguments.length, args = new Array(len);
	    for(var i = 0; i < len; i++) { args[i] = arguments[i]; }
	    if (Array.isArray(args[0])) {
	      args[0].unshift(this);
	    } else {
	      args.unshift(this);
	    }
	    return Observable.forkJoin.apply(null, args);
	  };
	
	  /**
	   * Comonadic bind operator.
	   * @param {Function} selector A transform function to apply to each element.
	   * @param {Object} scheduler Scheduler used to execute the operation. If not specified, defaults to the ImmediateScheduler.
	   * @returns {Observable} An observable sequence which results from the comonadic bind operation.
	   */
	  observableProto.manySelect = observableProto.extend = function (selector, scheduler) {
	    isScheduler(scheduler) || (scheduler = Rx.Scheduler.immediate);
	    var source = this;
	    return observableDefer(function () {
	      var chain;
	
	      return source
	        .map(function (x) {
	          var curr = new ChainObservable(x);
	
	          chain && chain.onNext(x);
	          chain = curr;
	
	          return curr;
	        })
	        .tap(
	          noop,
	          function (e) { chain && chain.onError(e); },
	          function () { chain && chain.onCompleted(); }
	        )
	        .observeOn(scheduler)
	        .map(selector);
	    }, source);
	  };
	
	  var ChainObservable = (function (__super__) {
	    inherits(ChainObservable, __super__);
	    function ChainObservable(head) {
	      __super__.call(this);
	      this.head = head;
	      this.tail = new AsyncSubject();
	    }
	
	    addProperties(ChainObservable.prototype, Observer, {
	      _subscribe: function (o) {
	        var g = new CompositeDisposable();
	        g.add(currentThreadScheduler.schedule(this, function (_, self) {
	          o.onNext(self.head);
	          g.add(self.tail.mergeAll().subscribe(o));
	        }));
	
	        return g;
	      },
	      onCompleted: function () {
	        this.onNext(Observable.empty());
	      },
	      onError: function (e) {
	        this.onNext(Observable['throw'](e));
	      },
	      onNext: function (v) {
	        this.tail.onNext(v);
	        this.tail.onCompleted();
	      }
	    });
	
	    return ChainObservable;
	
	  }(Observable));
	
	  var Map = root.Map || (function () {
	    function Map() {
	      this.size = 0;
	      this._values = [];
	      this._keys = [];
	    }
	
	    Map.prototype['delete'] = function (key) {
	      var i = this._keys.indexOf(key);
	      if (i === -1) { return false; }
	      this._values.splice(i, 1);
	      this._keys.splice(i, 1);
	      this.size--;
	      return true;
	    };
	
	    Map.prototype.get = function (key) {
	      var i = this._keys.indexOf(key);
	      return i === -1 ? undefined : this._values[i];
	    };
	
	    Map.prototype.set = function (key, value) {
	      var i = this._keys.indexOf(key);
	      if (i === -1) {
	        this._keys.push(key);
	        this._values.push(value);
	        this.size++;
	      } else {
	        this._values[i] = value;
	      }
	      return this;
	    };
	
	    Map.prototype.forEach = function (cb, thisArg) {
	      for (var i = 0; i < this.size; i++) {
	        cb.call(thisArg, this._values[i], this._keys[i]);
	      }
	    };
	
	    return Map;
	  }());
	
	  /**
	   * @constructor
	   * Represents a join pattern over observable sequences.
	   */
	  function Pattern(patterns) {
	    this.patterns = patterns;
	  }
	
	  /**
	   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
	   *  @param other Observable sequence to match in addition to the current pattern.
	   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
	   */
	  Pattern.prototype.and = function (other) {
	    return new Pattern(this.patterns.concat(other));
	  };
	
	  /**
	   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
	   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
	   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  Pattern.prototype.thenDo = function (selector) {
	    return new Plan(this, selector);
	  };
	
	  function Plan(expression, selector) {
	    this.expression = expression;
	    this.selector = selector;
	  }
	
	  function handleOnError(o) { return function (e) { o.onError(e); }; }
	  function handleOnNext(self, observer) {
	    return function onNext () {
	      var result = tryCatch(self.selector).apply(self, arguments);
	      if (result === errorObj) { return observer.onError(result.e); }
	      observer.onNext(result);
	    };
	  }
	
	  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
	    var joinObservers = [], errHandler = handleOnError(observer);
	    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
	      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], errHandler));
	    }
	    var activePlan = new ActivePlan(joinObservers, handleOnNext(this, observer), function () {
	      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
	        joinObservers[j].removeActivePlan(activePlan);
	      }
	      deactivate(activePlan);
	    });
	    for (i = 0, len = joinObservers.length; i < len; i++) {
	      joinObservers[i].addActivePlan(activePlan);
	    }
	    return activePlan;
	  };
	
	  function planCreateObserver(externalSubscriptions, observable, onError) {
	    var entry = externalSubscriptions.get(observable);
	    if (!entry) {
	      var observer = new JoinObserver(observable, onError);
	      externalSubscriptions.set(observable, observer);
	      return observer;
	    }
	    return entry;
	  }
	
	  function ActivePlan(joinObserverArray, onNext, onCompleted) {
	    this.joinObserverArray = joinObserverArray;
	    this.onNext = onNext;
	    this.onCompleted = onCompleted;
	    this.joinObservers = new Map();
	    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      var joinObserver = this.joinObserverArray[i];
	      this.joinObservers.set(joinObserver, joinObserver);
	    }
	  }
	
	  ActivePlan.prototype.dequeue = function () {
	    this.joinObservers.forEach(function (v) { v.queue.shift(); });
	  };
	
	  ActivePlan.prototype.match = function () {
	    var i, len, hasValues = true;
	    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      if (this.joinObserverArray[i].queue.length === 0) {
	        hasValues = false;
	        break;
	      }
	    }
	    if (hasValues) {
	      var firstValues = [],
	          isCompleted = false;
	      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	        firstValues.push(this.joinObserverArray[i].queue[0]);
	        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
	      }
	      if (isCompleted) {
	        this.onCompleted();
	      } else {
	        this.dequeue();
	        var values = [];
	        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
	          values.push(firstValues[i].value);
	        }
	        this.onNext.apply(this, values);
	      }
	    }
	  };
	
	  var JoinObserver = (function (__super__) {
	    inherits(JoinObserver, __super__);
	
	    function JoinObserver(source, onError) {
	      __super__.call(this);
	      this.source = source;
	      this.onError = onError;
	      this.queue = [];
	      this.activePlans = [];
	      this.subscription = new SingleAssignmentDisposable();
	      this.isDisposed = false;
	    }
	
	    var JoinObserverPrototype = JoinObserver.prototype;
	
	    JoinObserverPrototype.next = function (notification) {
	      if (!this.isDisposed) {
	        if (notification.kind === 'E') {
	          return this.onError(notification.error);
	        }
	        this.queue.push(notification);
	        var activePlans = this.activePlans.slice(0);
	        for (var i = 0, len = activePlans.length; i < len; i++) {
	          activePlans[i].match();
	        }
	      }
	    };
	
	    JoinObserverPrototype.error = noop;
	    JoinObserverPrototype.completed = noop;
	
	    JoinObserverPrototype.addActivePlan = function (activePlan) {
	      this.activePlans.push(activePlan);
	    };
	
	    JoinObserverPrototype.subscribe = function () {
	      this.subscription.setDisposable(this.source.materialize().subscribe(this));
	    };
	
	    JoinObserverPrototype.removeActivePlan = function (activePlan) {
	      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
	      this.activePlans.length === 0 && this.dispose();
	    };
	
	    JoinObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this.subscription.dispose();
	      }
	    };
	
	    return JoinObserver;
	  } (AbstractObserver));
	
	  /**
	   *  Creates a pattern that matches when both observable sequences have an available value.
	   *
	   *  @param right Observable sequence to match with the current sequence.
	   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
	   */
	  observableProto.and = function (right) {
	    return new Pattern([this, right]);
	  };
	
	  /**
	   *  Matches when the observable sequence has an available value and projects the value.
	   *
	   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
	   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  observableProto.thenDo = function (selector) {
	    return new Pattern([this]).thenDo(selector);
	  };
	
	  /**
	   *  Joins together the results from several patterns.
	   *
	   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
	   *  @returns {Observable} Observable sequence with the results form matching several patterns.
	   */
	  Observable.when = function () {
	    var len = arguments.length, plans;
	    if (Array.isArray(arguments[0])) {
	      plans = arguments[0];
	    } else {
	      plans = new Array(len);
	      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var activePlans = [],
	          externalSubscriptions = new Map();
	      var outObserver = observerCreate(
	        function (x) { o.onNext(x); },
	        function (err) {
	          externalSubscriptions.forEach(function (v) { v.onError(err); });
	          o.onError(err);
	        },
	        function (x) { o.onCompleted(); }
	      );
	      try {
	        for (var i = 0, len = plans.length; i < len; i++) {
	          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
	            var idx = activePlans.indexOf(activePlan);
	            activePlans.splice(idx, 1);
	            activePlans.length === 0 && o.onCompleted();
	          }));
	        }
	      } catch (e) {
	        observableThrow(e).subscribe(o);
	      }
	      var group = new CompositeDisposable();
	      externalSubscriptions.forEach(function (joinObserver) {
	        joinObserver.subscribe();
	        group.add(joinObserver);
	      });
	
	      return group;
	    });
	  };
	
	  var TimerObservable = (function(__super__) {
	    inherits(TimerObservable, __super__);
	    function TimerObservable(dt, s) {
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    TimerObservable.prototype.subscribeCore = function (o) {
	      return this._s.scheduleFuture(o, this._dt, scheduleMethod);
	    };
	
	    function scheduleMethod(s, o) {
	      o.onNext(0);
	      o.onCompleted();
	    }
	
	    return TimerObservable;
	  }(ObservableBase));
	
	  function _observableTimer(dueTime, scheduler) {
	    return new TimerObservable(dueTime, scheduler);
	  }
	
	  function observableTimerDateAndPeriod(dueTime, period, scheduler) {
	    return new AnonymousObservable(function (observer) {
	      var d = dueTime, p = normalizeTime(period);
	      return scheduler.scheduleRecursiveFuture(0, d, function (count, self) {
	        if (p > 0) {
	          var now = scheduler.now();
	          d = new Date(d.getTime() + p);
	          d.getTime() <= now && (d = new Date(now + p));
	        }
	        observer.onNext(count);
	        self(count + 1, new Date(d));
	      });
	    });
	  }
	
	  function observableTimerTimeSpanAndPeriod(dueTime, period, scheduler) {
	    return dueTime === period ?
	      new AnonymousObservable(function (observer) {
	        return scheduler.schedulePeriodic(0, period, function (count) {
	          observer.onNext(count);
	          return count + 1;
	        });
	      }) :
	      observableDefer(function () {
	        return observableTimerDateAndPeriod(new Date(scheduler.now() + dueTime), period, scheduler);
	      });
	  }
	
	  /**
	   *  Returns an observable sequence that produces a value after each period.
	   *
	   * @example
	   *  1 - res = Rx.Observable.interval(1000);
	   *  2 - res = Rx.Observable.interval(1000, Rx.Scheduler.timeout);
	   *
	   * @param {Number} period Period for producing the values in the resulting sequence (specified as an integer denoting milliseconds).
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, Rx.Scheduler.timeout is used.
	   * @returns {Observable} An observable sequence that produces a value after each period.
	   */
	  var observableinterval = Observable.interval = function (period, scheduler) {
	    return observableTimerTimeSpanAndPeriod(period, period, isScheduler(scheduler) ? scheduler : defaultScheduler);
	  };
	
	  /**
	   *  Returns an observable sequence that produces a value after dueTime has elapsed and then after each period.
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) at which to produce the first value.
	   * @param {Mixed} [periodOrScheduler]  Period to produce subsequent values (specified as an integer denoting milliseconds), or the scheduler to run the timer on. If not specified, the resulting timer is not recurring.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence that produces a value after due time has elapsed and then each period.
	   */
	  var observableTimer = Observable.timer = function (dueTime, periodOrScheduler, scheduler) {
	    var period;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    if (periodOrScheduler != null && typeof periodOrScheduler === 'number') {
	      period = periodOrScheduler;
	    } else if (isScheduler(periodOrScheduler)) {
	      scheduler = periodOrScheduler;
	    }
	    if ((dueTime instanceof Date || typeof dueTime === 'number') && period === undefined) {
	      return _observableTimer(dueTime, scheduler);
	    }
	    if (dueTime instanceof Date && period !== undefined) {
	      return observableTimerDateAndPeriod(dueTime.getTime(), periodOrScheduler, scheduler);
	    }
	    return observableTimerTimeSpanAndPeriod(dueTime, period, scheduler);
	  };
	
	  function observableDelayRelative(source, dueTime, scheduler) {
	    return new AnonymousObservable(function (o) {
	      var active = false,
	        cancelable = new SerialDisposable(),
	        exception = null,
	        q = [],
	        running = false,
	        subscription;
	      subscription = source.materialize().timestamp(scheduler).subscribe(function (notification) {
	        var d, shouldRun;
	        if (notification.value.kind === 'E') {
	          q = [];
	          q.push(notification);
	          exception = notification.value.error;
	          shouldRun = !running;
	        } else {
	          q.push({ value: notification.value, timestamp: notification.timestamp + dueTime });
	          shouldRun = !active;
	          active = true;
	        }
	        if (shouldRun) {
	          if (exception !== null) {
	            o.onError(exception);
	          } else {
	            d = new SingleAssignmentDisposable();
	            cancelable.setDisposable(d);
	            d.setDisposable(scheduler.scheduleRecursiveFuture(null, dueTime, function (_, self) {
	              var e, recurseDueTime, result, shouldRecurse;
	              if (exception !== null) {
	                return;
	              }
	              running = true;
	              do {
	                result = null;
	                if (q.length > 0 && q[0].timestamp - scheduler.now() <= 0) {
	                  result = q.shift().value;
	                }
	                if (result !== null) {
	                  result.accept(o);
	                }
	              } while (result !== null);
	              shouldRecurse = false;
	              recurseDueTime = 0;
	              if (q.length > 0) {
	                shouldRecurse = true;
	                recurseDueTime = Math.max(0, q[0].timestamp - scheduler.now());
	              } else {
	                active = false;
	              }
	              e = exception;
	              running = false;
	              if (e !== null) {
	                o.onError(e);
	              } else if (shouldRecurse) {
	                self(null, recurseDueTime);
	              }
	            }));
	          }
	        }
	      });
	      return new BinaryDisposable(subscription, cancelable);
	    }, source);
	  }
	
	  function observableDelayAbsolute(source, dueTime, scheduler) {
	    return observableDefer(function () {
	      return observableDelayRelative(source, dueTime - scheduler.now(), scheduler);
	    });
	  }
	
	  function delayWithSelector(source, subscriptionDelay, delayDurationSelector) {
	    var subDelay, selector;
	    if (isFunction(subscriptionDelay)) {
	      selector = subscriptionDelay;
	    } else {
	      subDelay = subscriptionDelay;
	      selector = delayDurationSelector;
	    }
	    return new AnonymousObservable(function (o) {
	      var delays = new CompositeDisposable(), atEnd = false, subscription = new SerialDisposable();
	
	      function start() {
	        subscription.setDisposable(source.subscribe(
	          function (x) {
	            var delay = tryCatch(selector)(x);
	            if (delay === errorObj) { return o.onError(delay.e); }
	            var d = new SingleAssignmentDisposable();
	            delays.add(d);
	            d.setDisposable(delay.subscribe(
	              function () {
	                o.onNext(x);
	                delays.remove(d);
	                done();
	              },
	              function (e) { o.onError(e); },
	              function () {
	                o.onNext(x);
	                delays.remove(d);
	                done();
	              }
	            ));
	          },
	          function (e) { o.onError(e); },
	          function () {
	            atEnd = true;
	            subscription.dispose();
	            done();
	          }
	        ));
	      }
	
	      function done () {
	        atEnd && delays.length === 0 && o.onCompleted();
	      }
	
	      if (!subDelay) {
	        start();
	      } else {
	        subscription.setDisposable(subDelay.subscribe(start, function (e) { o.onError(e); }, start));
	      }
	
	      return new BinaryDisposable(subscription, delays);
	    }, this);
	  }
	
	  /**
	   *  Time shifts the observable sequence by dueTime.
	   *  The relative time intervals between the values are preserved.
	   *
	   * @param {Number} dueTime Absolute (specified as a Date object) or relative time (specified as an integer denoting milliseconds) by which to shift the observable sequence.
	   * @param {Scheduler} [scheduler] Scheduler to run the delay timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delay = function () {
	    var firstArg = arguments[0];
	    if (typeof firstArg === 'number' || firstArg instanceof Date) {
	      var dueTime = firstArg, scheduler = arguments[1];
	      isScheduler(scheduler) || (scheduler = defaultScheduler);
	      return dueTime instanceof Date ?
	        observableDelayAbsolute(this, dueTime, scheduler) :
	        observableDelayRelative(this, dueTime, scheduler);
	    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
	      return delayWithSelector(this, firstArg, arguments[1]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };
	
	  var DebounceObservable = (function (__super__) {
	    inherits(DebounceObservable, __super__);
	    function DebounceObservable(source, dt, s) {
	      isScheduler(s) || (s = defaultScheduler);
	      this.source = source;
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    DebounceObservable.prototype.subscribeCore = function (o) {
	      var cancelable = new SerialDisposable();
	      return new BinaryDisposable(
	        this.source.subscribe(new DebounceObserver(o, this.source, this._dt, this._s, cancelable)),
	        cancelable);
	    };
	
	    return DebounceObservable;
	  }(ObservableBase));
	
	  var DebounceObserver = (function (__super__) {
	    inherits(DebounceObserver, __super__);
	    function DebounceObserver(observer, source, dueTime, scheduler, cancelable) {
	      this._o = observer;
	      this._s = source;
	      this._d = dueTime;
	      this._scheduler = scheduler;
	      this._c = cancelable;
	      this._v = null;
	      this._hv = false;
	      this._id = 0;
	      __super__.call(this);
	    }
	
	    DebounceObserver.prototype.next = function (x) {
	      this._hv = true;
	      this._v = x;
	      var currentId = ++this._id, d = new SingleAssignmentDisposable();
	      this._c.setDisposable(d);
	      d.setDisposable(this._scheduler.scheduleFuture(this, this._d, function (_, self) {
	        self._hv && self._id === currentId && self._o.onNext(x);
	        self._hv = false;
	      }));
	    };
	
	    DebounceObserver.prototype.error = function (e) {
	      this._c.dispose();
	      this._o.onError(e);
	      this._hv = false;
	      this._id++;
	    };
	
	    DebounceObserver.prototype.completed = function () {
	      this._c.dispose();
	      this._hv && this._o.onNext(this._v);
	      this._o.onCompleted();
	      this._hv = false;
	      this._id++;
	    };
	
	    return DebounceObserver;
	  }(AbstractObserver));
	
	  function debounceWithSelector(source, durationSelector) {
	    return new AnonymousObservable(function (o) {
	      var value, hasValue = false, cancelable = new SerialDisposable(), id = 0;
	      var subscription = source.subscribe(
	        function (x) {
	          var throttle = tryCatch(durationSelector)(x);
	          if (throttle === errorObj) { return o.onError(throttle.e); }
	
	          isPromise(throttle) && (throttle = observableFromPromise(throttle));
	
	          hasValue = true;
	          value = x;
	          id++;
	          var currentid = id, d = new SingleAssignmentDisposable();
	          cancelable.setDisposable(d);
	          d.setDisposable(throttle.subscribe(
	            function () {
	              hasValue && id === currentid && o.onNext(value);
	              hasValue = false;
	              d.dispose();
	            },
	            function (e) { o.onError(e); },
	            function () {
	              hasValue && id === currentid && o.onNext(value);
	              hasValue = false;
	              d.dispose();
	            }
	          ));
	        },
	        function (e) {
	          cancelable.dispose();
	          o.onError(e);
	          hasValue = false;
	          id++;
	        },
	        function () {
	          cancelable.dispose();
	          hasValue && o.onNext(value);
	          o.onCompleted();
	          hasValue = false;
	          id++;
	        }
	      );
	      return new BinaryDisposable(subscription, cancelable);
	    }, source);
	  }
	
	  observableProto.debounce = function () {
	    if (isFunction (arguments[0])) {
	      return debounceWithSelector(this, arguments[0]);
	    } else if (typeof arguments[0] === 'number') {
	      return new DebounceObservable(this, arguments[0], arguments[1]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };
	
	  /**
	   *  Projects each element of an observable sequence into zero or more windows which are produced based on timing information.
	   * @param {Number} timeSpan Length of each window (specified as an integer denoting milliseconds).
	   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive windows (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent windows.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	    var source = this, timeShift;
	    timeShiftOrScheduler == null && (timeShift = timeSpan);
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    if (typeof timeShiftOrScheduler === 'number') {
	      timeShift = timeShiftOrScheduler;
	    } else if (isScheduler(timeShiftOrScheduler)) {
	      timeShift = timeSpan;
	      scheduler = timeShiftOrScheduler;
	    }
	    return new AnonymousObservable(function (observer) {
	      var groupDisposable,
	        nextShift = timeShift,
	        nextSpan = timeSpan,
	        q = [],
	        refCountDisposable,
	        timerD = new SerialDisposable(),
	        totalTime = 0;
	        groupDisposable = new CompositeDisposable(timerD),
	        refCountDisposable = new RefCountDisposable(groupDisposable);
	
	       function createTimer () {
	        var m = new SingleAssignmentDisposable(),
	          isSpan = false,
	          isShift = false;
	        timerD.setDisposable(m);
	        if (nextSpan === nextShift) {
	          isSpan = true;
	          isShift = true;
	        } else if (nextSpan < nextShift) {
	            isSpan = true;
	        } else {
	          isShift = true;
	        }
	        var newTotalTime = isSpan ? nextSpan : nextShift,
	          ts = newTotalTime - totalTime;
	        totalTime = newTotalTime;
	        if (isSpan) {
	          nextSpan += timeShift;
	        }
	        if (isShift) {
	          nextShift += timeShift;
	        }
	        m.setDisposable(scheduler.scheduleFuture(null, ts, function () {
	          if (isShift) {
	            var s = new Subject();
	            q.push(s);
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          isSpan && q.shift().onCompleted();
	          createTimer();
	        }));
	      };
	      q.push(new Subject());
	      observer.onNext(addRef(q[0], refCountDisposable));
	      createTimer();
	      groupDisposable.add(source.subscribe(
	        function (x) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onNext(x); }
	        },
	        function (e) {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onError(e); }
	          observer.onError(e);
	        },
	        function () {
	          for (var i = 0, len = q.length; i < len; i++) { q[i].onCompleted(); }
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	  /**
	   *  Projects each element of an observable sequence into a window that is completed when either it's full or a given amount of time has elapsed.
	   * @param {Number} timeSpan Maximum time length of a window.
	   * @param {Number} count Maximum element count of a window.
	   * @param {Scheduler} [scheduler]  Scheduler to run windowing timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of windows.
	   */
	  observableProto.windowWithTimeOrCount = function (timeSpan, count, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new AnonymousObservable(function (observer) {
	      var timerD = new SerialDisposable(),
	          groupDisposable = new CompositeDisposable(timerD),
	          refCountDisposable = new RefCountDisposable(groupDisposable),
	          n = 0,
	          windowId = 0,
	          s = new Subject();
	
	      function createTimer(id) {
	        var m = new SingleAssignmentDisposable();
	        timerD.setDisposable(m);
	        m.setDisposable(scheduler.scheduleFuture(null, timeSpan, function () {
	          if (id !== windowId) { return; }
	          n = 0;
	          var newId = ++windowId;
	          s.onCompleted();
	          s = new Subject();
	          observer.onNext(addRef(s, refCountDisposable));
	          createTimer(newId);
	        }));
	      }
	
	      observer.onNext(addRef(s, refCountDisposable));
	      createTimer(0);
	
	      groupDisposable.add(source.subscribe(
	        function (x) {
	          var newId = 0, newWindow = false;
	          s.onNext(x);
	          if (++n === count) {
	            newWindow = true;
	            n = 0;
	            newId = ++windowId;
	            s.onCompleted();
	            s = new Subject();
	            observer.onNext(addRef(s, refCountDisposable));
	          }
	          newWindow && createTimer(newId);
	        },
	        function (e) {
	          s.onError(e);
	          observer.onError(e);
	        }, function () {
	          s.onCompleted();
	          observer.onCompleted();
	        }
	      ));
	      return refCountDisposable;
	    }, source);
	  };
	
	  function toArray(x) { return x.toArray(); }
	
	  /**
	   *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
	   * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
	   * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
	   * @param {Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {
	    return this.windowWithTime(timeSpan, timeShiftOrScheduler, scheduler).flatMap(toArray);
	  };
	
	  function toArray(x) { return x.toArray(); }
	
	  /**
	   *  Projects each element of an observable sequence into a buffer that is completed when either it's full or a given amount of time has elapsed.
	   * @param {Number} timeSpan Maximum time length of a buffer.
	   * @param {Number} count Maximum element count of a buffer.
	   * @param {Scheduler} [scheduler]  Scheduler to run bufferin timers on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence of buffers.
	   */
	  observableProto.bufferWithTimeOrCount = function (timeSpan, count, scheduler) {
	    return this.windowWithTimeOrCount(timeSpan, count, scheduler).flatMap(toArray);
	  };
	
	  var TimeIntervalObservable = (function (__super__) {
	    inherits(TimeIntervalObservable, __super__);
	    function TimeIntervalObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    TimeIntervalObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TimeIntervalObserver(o, this._s));
	    };
	
	    return TimeIntervalObservable;
	  }(ObservableBase));
	
	  var TimeIntervalObserver = (function (__super__) {
	    inherits(TimeIntervalObserver, __super__);
	
	    function TimeIntervalObserver(o, s) {
	      this._o = o;
	      this._s = s;
	      this._l = s.now();
	      __super__.call(this);
	    }
	
	    TimeIntervalObserver.prototype.next = function (x) {
	      var now = this._s.now(), span = now - this._l;
	      this._l = now;
	      this._o.onNext({ value: x, interval: span });
	    };
	    TimeIntervalObserver.prototype.error = function (e) { this._o.onError(e); };
	    TimeIntervalObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return TimeIntervalObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Records the time interval between consecutive values in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timeInterval();
	   *  2 - res = source.timeInterval(Rx.Scheduler.timeout);
	   *
	   * @param [scheduler]  Scheduler used to compute time intervals. If not specified, the timeout scheduler is used.
	   * @returns {Observable} An observable sequence with time interval information on values.
	   */
	  observableProto.timeInterval = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TimeIntervalObservable(this, scheduler);
	  };
	
	  var TimestampObservable = (function (__super__) {
	    inherits(TimestampObservable, __super__);
	    function TimestampObservable(source, s) {
	      this.source = source;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    TimestampObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TimestampObserver(o, this._s));
	    };
	
	    return TimestampObservable;
	  }(ObservableBase));
	
	  var TimestampObserver = (function (__super__) {
	    inherits(TimestampObserver, __super__);
	    function TimestampObserver(o, s) {
	      this._o = o;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    TimestampObserver.prototype.next = function (x) {
	      this._o.onNext({ value: x, timestamp: this._s.now() });
	    };
	
	    TimestampObserver.prototype.error = function (e) {
	      this._o.onError(e);
	    };
	
	    TimestampObserver.prototype.completed = function () {
	      this._o.onCompleted();
	    };
	
	    return TimestampObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Records the timestamp for each value in an observable sequence.
	   *
	   * @example
	   *  1 - res = source.timestamp(); // produces { value: x, timestamp: ts }
	   *  2 - res = source.timestamp(Rx.Scheduler.default);
	   *
	   * @param {Scheduler} [scheduler]  Scheduler used to compute timestamps. If not specified, the default scheduler is used.
	   * @returns {Observable} An observable sequence with timestamp information on values.
	   */
	  observableProto.timestamp = function (scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TimestampObservable(this, scheduler);
	  };
	
	  function sampleObservable(source, sampler) {
	    return new AnonymousObservable(function (o) {
	      var atEnd = false, value, hasValue = false;
	
	      function sampleSubscribe() {
	        if (hasValue) {
	          hasValue = false;
	          o.onNext(value);
	        }
	        atEnd && o.onCompleted();
	      }
	
	      var sourceSubscription = new SingleAssignmentDisposable();
	      sourceSubscription.setDisposable(source.subscribe(
	        function (newValue) {
	          hasValue = true;
	          value = newValue;
	        },
	        function (e) { o.onError(e); },
	        function () {
	          atEnd = true;
	          sourceSubscription.dispose();
	        }
	      ));
	
	      return new BinaryDisposable(
	        sourceSubscription,
	        sampler.subscribe(sampleSubscribe, function (e) { o.onError(e); }, sampleSubscribe)
	      );
	    }, source);
	  }
	
	  /**
	   *  Samples the observable sequence at each interval.
	   *
	   * @example
	   *  1 - res = source.sample(sampleObservable); // Sampler tick sequence
	   *  2 - res = source.sample(5000); // 5 seconds
	   *  2 - res = source.sample(5000, Rx.Scheduler.timeout); // 5 seconds
	   *
	   * @param {Mixed} intervalOrSampler Interval at which to sample (specified as an integer denoting milliseconds) or Sampler Observable.
	   * @param {Scheduler} [scheduler]  Scheduler to run the sampling timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Sampled observable sequence.
	   */
	  observableProto.sample = observableProto.throttleLatest = function (intervalOrSampler, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return typeof intervalOrSampler === 'number' ?
	      sampleObservable(this, observableinterval(intervalOrSampler, scheduler)) :
	      sampleObservable(this, intervalOrSampler);
	  };
	
	  var TimeoutError = Rx.TimeoutError = function(message) {
	    this.message = message || 'Timeout has occurred';
	    this.name = 'TimeoutError';
	    Error.call(this);
	  };
	  TimeoutError.prototype = Object.create(Error.prototype);
	
	  function timeoutWithSelector(source, firstTimeout, timeoutDurationSelector, other) {
	    if (isFunction(firstTimeout)) {
	      other = timeoutDurationSelector;
	      timeoutDurationSelector = firstTimeout;
	      firstTimeout = observableNever();
	    }
	    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
	    return new AnonymousObservable(function (o) {
	      var subscription = new SerialDisposable(),
	        timer = new SerialDisposable(),
	        original = new SingleAssignmentDisposable();
	
	      subscription.setDisposable(original);
	
	      var id = 0, switched = false;
	
	      function setTimer(timeout) {
	        var myId = id, d = new SingleAssignmentDisposable();
	
	        function timerWins() {
	          switched = (myId === id);
	          return switched;
	        }
	
	        timer.setDisposable(d);
	        d.setDisposable(timeout.subscribe(function () {
	          timerWins() && subscription.setDisposable(other.subscribe(o));
	          d.dispose();
	        }, function (e) {
	          timerWins() && o.onError(e);
	        }, function () {
	          timerWins() && subscription.setDisposable(other.subscribe(o));
	        }));
	      };
	
	      setTimer(firstTimeout);
	
	      function oWins() {
	        var res = !switched;
	        if (res) { id++; }
	        return res;
	      }
	
	      original.setDisposable(source.subscribe(function (x) {
	        if (oWins()) {
	          o.onNext(x);
	          var timeout = tryCatch(timeoutDurationSelector)(x);
	          if (timeout === errorObj) { return o.onError(timeout.e); }
	          setTimer(isPromise(timeout) ? observableFromPromise(timeout) : timeout);
	        }
	      }, function (e) {
	        oWins() && o.onError(e);
	      }, function () {
	        oWins() && o.onCompleted();
	      }));
	      return new BinaryDisposable(subscription, timer);
	    }, source);
	  }
	
	  function timeout(source, dueTime, other, scheduler) {
	    if (isScheduler(other)) {
	      scheduler = other;
	      other = observableThrow(new TimeoutError());
	    }
	    if (other instanceof Error) { other = observableThrow(other); }
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    Observable.isObservable(other) || (other = observableThrow(new TimeoutError()));
	    return new AnonymousObservable(function (o) {
	      var id = 0,
	        original = new SingleAssignmentDisposable(),
	        subscription = new SerialDisposable(),
	        switched = false,
	        timer = new SerialDisposable();
	
	      subscription.setDisposable(original);
	
	      function createTimer() {
	        var myId = id;
	        timer.setDisposable(scheduler.scheduleFuture(null, dueTime, function () {
	          switched = id === myId;
	          if (switched) {
	            isPromise(other) && (other = observableFromPromise(other));
	            subscription.setDisposable(other.subscribe(o));
	          }
	        }));
	      }
	
	      createTimer();
	
	      original.setDisposable(source.subscribe(function (x) {
	        if (!switched) {
	          id++;
	          o.onNext(x);
	          createTimer();
	        }
	      }, function (e) {
	        if (!switched) {
	          id++;
	          o.onError(e);
	        }
	      }, function () {
	        if (!switched) {
	          id++;
	          o.onCompleted();
	        }
	      }));
	      return new BinaryDisposable(subscription, timer);
	    }, source);
	  }
	
	  observableProto.timeout = function () {
	    var firstArg = arguments[0];
	    if (firstArg instanceof Date || typeof firstArg === 'number') {
	      return timeout(this, firstArg, arguments[1], arguments[2]);
	    } else if (Observable.isObservable(firstArg) || isFunction(firstArg)) {
	      return timeoutWithSelector(this, firstArg, arguments[1], arguments[2]);
	    } else {
	      throw new Error('Invalid arguments');
	    }
	  };
	
	  var GenerateAbsoluteObservable = (function (__super__) {
	    inherits(GenerateAbsoluteObservable, __super__);
	    function GenerateAbsoluteObservable(state, cndFn, itrFn, resFn, timeFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._timeFn = timeFn;
	      this._s = s;
	      this._first = true;
	      this._hasResult = false;
	      __super__.call(this);
	    }
	
	    function scheduleRecursive(self, recurse) {
	      self._hasResult && self._o.onNext(self._state);
	
	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      self._hasResult = tryCatch(self._cndFn)(self._state);
	      if (self._hasResult === errorObj) { return self._o.onError(self._hasResult.e); }
	      if (self._hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        var time = tryCatch(self._timeFn)(self._state);
	        if (time === errorObj) { return self._o.onError(time.e); }
	        recurse(self, time);
	      } else {
	        self._o.onCompleted();
	      }
	    }
	
	    GenerateAbsoluteObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursiveFuture(this, new Date(this._s.now()), scheduleRecursive);
	    };
	
	    return GenerateAbsoluteObservable;
	  }(ObservableBase));
	
	  /**
	   *  GenerateAbsolutes an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithAbsoluteTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return new Date(); }
	   *  });
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning Date values.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithAbsoluteTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new GenerateAbsoluteObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
	  };
	
	  var GenerateRelativeObservable = (function (__super__) {
	    inherits(GenerateRelativeObservable, __super__);
	    function GenerateRelativeObservable(state, cndFn, itrFn, resFn, timeFn, s) {
	      this._state = state;
	      this._cndFn = cndFn;
	      this._itrFn = itrFn;
	      this._resFn = resFn;
	      this._timeFn = timeFn;
	      this._s = s;
	      this._first = true;
	      this._hasResult = false;
	      __super__.call(this);
	    }
	
	    function scheduleRecursive(self, recurse) {
	      self._hasResult && self._o.onNext(self._state);
	
	      if (self._first) {
	        self._first = false;
	      } else {
	        self._state = tryCatch(self._itrFn)(self._state);
	        if (self._state === errorObj) { return self._o.onError(self._state.e); }
	      }
	      self._hasResult = tryCatch(self._cndFn)(self._state);
	      if (self._hasResult === errorObj) { return self._o.onError(self._hasResult.e); }
	      if (self._hasResult) {
	        var result = tryCatch(self._resFn)(self._state);
	        if (result === errorObj) { return self._o.onError(result.e); }
	        var time = tryCatch(self._timeFn)(self._state);
	        if (time === errorObj) { return self._o.onError(time.e); }
	        recurse(self, time);
	      } else {
	        self._o.onCompleted();
	      }
	    }
	
	    GenerateRelativeObservable.prototype.subscribeCore = function (o) {
	      this._o = o;
	      return this._s.scheduleRecursiveFuture(this, 0, scheduleRecursive);
	    };
	
	    return GenerateRelativeObservable;
	  }(ObservableBase));
	
	  /**
	   *  Generates an observable sequence by iterating a state from an initial state until the condition fails.
	   *
	   * @example
	   *  res = source.generateWithRelativeTime(0,
	   *      function (x) { return return true; },
	   *      function (x) { return x + 1; },
	   *      function (x) { return x; },
	   *      function (x) { return 500; }
	   *  );
	   *
	   * @param {Mixed} initialState Initial state.
	   * @param {Function} condition Condition to terminate generation (upon returning false).
	   * @param {Function} iterate Iteration step function.
	   * @param {Function} resultSelector Selector function for results produced in the sequence.
	   * @param {Function} timeSelector Time selector function to control the speed of values being produced each iteration, returning integer values denoting milliseconds.
	   * @param {Scheduler} [scheduler]  Scheduler on which to run the generator loop. If not specified, the timeout scheduler is used.
	   * @returns {Observable} The generated sequence.
	   */
	  Observable.generateWithRelativeTime = function (initialState, condition, iterate, resultSelector, timeSelector, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new GenerateRelativeObservable(initialState, condition, iterate, resultSelector, timeSelector, scheduler);
	  };
	
	  var DelaySubscription = (function(__super__) {
	    inherits(DelaySubscription, __super__);
	    function DelaySubscription(source, dt, s) {
	      this.source = source;
	      this._dt = dt;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    DelaySubscription.prototype.subscribeCore = function (o) {
	      var d = new SerialDisposable();
	
	      d.setDisposable(this._s.scheduleFuture([this.source, o, d], this._dt, scheduleMethod));
	
	      return d;
	    };
	
	    function scheduleMethod(s, state) {
	      var source = state[0], o = state[1], d = state[2];
	      d.setDisposable(source.subscribe(o));
	    }
	
	    return DelaySubscription;
	  }(ObservableBase));
	
	  /**
	   *  Time shifts the observable sequence by delaying the subscription with the specified relative time duration, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.delaySubscription(5000); // 5s
	   *  2 - res = source.delaySubscription(5000, Rx.Scheduler.default); // 5 seconds
	   *
	   * @param {Number} dueTime Relative or absolute time shift of the subscription.
	   * @param {Scheduler} [scheduler]  Scheduler to run the subscription delay timer on. If not specified, the timeout scheduler is used.
	   * @returns {Observable} Time-shifted sequence.
	   */
	  observableProto.delaySubscription = function (dueTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new DelaySubscription(this, dueTime, scheduler);
	  };
	
	  var SkipLastWithTimeObservable = (function (__super__) {
	    inherits(SkipLastWithTimeObservable, __super__);
	    function SkipLastWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    SkipLastWithTimeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new SkipLastWithTimeObserver(o, this));
	    };
	
	    return SkipLastWithTimeObservable;
	  }(ObservableBase));
	
	  var SkipLastWithTimeObserver = (function (__super__) {
	    inherits(SkipLastWithTimeObserver, __super__);
	
	    function SkipLastWithTimeObserver(o, p) {
	      this._o = o;
	      this._s = p._s;
	      this._d = p._d;
	      this._q = [];
	      __super__.call(this);
	    }
	
	    SkipLastWithTimeObserver.prototype.next = function (x) {
	      var now = this._s.now();
	      this._q.push({ interval: now, value: x });
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._o.onNext(this._q.shift().value);
	      }
	    };
	    SkipLastWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipLastWithTimeObserver.prototype.completed = function () {
	      var now = this._s.now();
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._o.onNext(this._q.shift().value);
	      }
	      this._o.onCompleted();
	    };
	
	    return SkipLastWithTimeObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Skips elements for the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for skipping elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the end of the source sequence.
	   */
	  observableProto.skipLastWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipLastWithTimeObservable(this, duration, scheduler);
	  };
	
	  var TakeLastWithTimeObservable = (function (__super__) {
	    inherits(TakeLastWithTimeObservable, __super__);
	    function TakeLastWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    TakeLastWithTimeObservable.prototype.subscribeCore = function (o) {
	      return this.source.subscribe(new TakeLastWithTimeObserver(o, this._d, this._s));
	    };
	
	    return TakeLastWithTimeObservable;
	  }(ObservableBase));
	
	  var TakeLastWithTimeObserver = (function (__super__) {
	    inherits(TakeLastWithTimeObserver, __super__);
	
	    function TakeLastWithTimeObserver(o, d, s) {
	      this._o = o;
	      this._d = d;
	      this._s = s;
	      this._q = [];
	      __super__.call(this);
	    }
	
	    TakeLastWithTimeObserver.prototype.next = function (x) {
	      var now = this._s.now();
	      this._q.push({ interval: now, value: x });
	      while (this._q.length > 0 && now - this._q[0].interval >= this._d) {
	        this._q.shift();
	      }
	    };
	    TakeLastWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    TakeLastWithTimeObserver.prototype.completed = function () {
	      var now = this._s.now();
	      while (this._q.length > 0) {
	        var next = this._q.shift();
	        if (now - next.interval <= this._d) { this._o.onNext(next.value); }
	      }
	      this._o.onCompleted();
	    };
	
	    return TakeLastWithTimeObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Returns elements within the specified duration from the end of the observable source sequence, using the specified schedulers to run timers and to drain the collected elements.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} [scheduler]  Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TakeLastWithTimeObservable(this, duration, scheduler);
	  };
	
	  /**
	   *  Returns an array with the elements within the specified duration from the end of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the end of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence containing a single array with the elements taken during the specified duration from the end of the source sequence.
	   */
	  observableProto.takeLastBufferWithTime = function (duration, scheduler) {
	    var source = this;
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new AnonymousObservable(function (o) {
	      var q = [];
	      return source.subscribe(function (x) {
	        var now = scheduler.now();
	        q.push({ interval: now, value: x });
	        while (q.length > 0 && now - q[0].interval >= duration) {
	          q.shift();
	        }
	      }, function (e) { o.onError(e); }, function () {
	        var now = scheduler.now(), res = [];
	        while (q.length > 0) {
	          var next = q.shift();
	          now - next.interval <= duration && res.push(next.value);
	        }
	        o.onNext(res);
	        o.onCompleted();
	      });
	    }, source);
	  };
	
	  var TakeWithTimeObservable = (function (__super__) {
	    inherits(TakeWithTimeObservable, __super__);
	    function TakeWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(s, o) {
	      o.onCompleted();
	    }
	
	    TakeWithTimeObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(
	        this._s.scheduleFuture(o, this._d, scheduleMethod),
	        this.source.subscribe(o)
	      );
	    };
	
	    return TakeWithTimeObservable;
	  }(ObservableBase));
	
	  /**
	   *  Takes elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   *
	   * @example
	   *  1 - res = source.takeWithTime(5000,  [optional scheduler]);
	   * @description
	   *  This operator accumulates a queue with a length enough to store elements received during the initial duration window.
	   *  As more elements are received, elements older than the specified duration are taken from the queue and produced on the
	   *  result sequence. This causes elements to be delayed with duration.
	   * @param {Number} duration Duration for taking elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements taken during the specified duration from the start of the source sequence.
	   */
	  observableProto.takeWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new TakeWithTimeObservable(this, duration, scheduler);
	  };
	
	  var SkipWithTimeObservable = (function (__super__) {
	    inherits(SkipWithTimeObservable, __super__);
	    function SkipWithTimeObservable(source, d, s) {
	      this.source = source;
	      this._d = d;
	      this._s = s;
	      this._open = false;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(s, self) {
	      self._open = true;
	    }
	
	    SkipWithTimeObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(
	        this._s.scheduleFuture(this, this._d, scheduleMethod),
	        this.source.subscribe(new SkipWithTimeObserver(o, this))
	      );
	    };
	
	    return SkipWithTimeObservable;
	  }(ObservableBase));
	
	  var SkipWithTimeObserver = (function (__super__) {
	    inherits(SkipWithTimeObserver, __super__);
	
	    function SkipWithTimeObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }
	
	    SkipWithTimeObserver.prototype.next = function (x) { this._p._open && this._o.onNext(x); };
	    SkipWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipWithTimeObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return SkipWithTimeObserver;
	  }(AbstractObserver));
	
	  /**
	   *  Skips elements for the specified duration from the start of the observable source sequence, using the specified scheduler to run timers.
	   * @description
	   *  Specifying a zero value for duration doesn't guarantee no elements will be dropped from the start of the source sequence.
	   *  This is a side-effect of the asynchrony introduced by the scheduler, where the action that causes callbacks from the source sequence to be forwarded
	   *  may not execute immediately, despite the zero due time.
	   *
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the duration.
	   * @param {Number} duration Duration for skipping elements from the start of the sequence.
	   * @param {Scheduler} scheduler Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped during the specified duration from the start of the source sequence.
	   */
	  observableProto.skipWithTime = function (duration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipWithTimeObservable(this, duration, scheduler);
	  };
	
	  var SkipUntilWithTimeObservable = (function (__super__) {
	    inherits(SkipUntilWithTimeObservable, __super__);
	    function SkipUntilWithTimeObservable(source, startTime, scheduler) {
	      this.source = source;
	      this._st = startTime;
	      this._s = scheduler;
	      __super__.call(this);
	    }
	
	    function scheduleMethod(s, state) {
	      state._open = true;
	    }
	
	    SkipUntilWithTimeObservable.prototype.subscribeCore = function (o) {
	      this._open = false;
	      return new BinaryDisposable(
	        this._s.scheduleFuture(this, this._st, scheduleMethod),
	        this.source.subscribe(new SkipUntilWithTimeObserver(o, this))
	      );
	    };
	
	    return SkipUntilWithTimeObservable;
	  }(ObservableBase));
	
	  var SkipUntilWithTimeObserver = (function (__super__) {
	    inherits(SkipUntilWithTimeObserver, __super__);
	
	    function SkipUntilWithTimeObserver(o, p) {
	      this._o = o;
	      this._p = p;
	      __super__.call(this);
	    }
	
	    SkipUntilWithTimeObserver.prototype.next = function (x) { this._p._open && this._o.onNext(x); };
	    SkipUntilWithTimeObserver.prototype.error = function (e) { this._o.onError(e); };
	    SkipUntilWithTimeObserver.prototype.completed = function () { this._o.onCompleted(); };
	
	    return SkipUntilWithTimeObserver;
	  }(AbstractObserver));
	
	
	  /**
	   *  Skips elements from the observable source sequence until the specified start time, using the specified scheduler to run timers.
	   *  Errors produced by the source sequence are always forwarded to the result sequence, even if the error occurs before the start time.
	   *
	   * @examples
	   *  1 - res = source.skipUntilWithTime(new Date(), [scheduler]);
	   *  2 - res = source.skipUntilWithTime(5000, [scheduler]);
	   * @param {Date|Number} startTime Time to start taking elements from the source sequence. If this value is less than or equal to Date(), no elements will be skipped.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on. If not specified, defaults to Rx.Scheduler.timeout.
	   * @returns {Observable} An observable sequence with the elements skipped until the specified start time.
	   */
	  observableProto.skipUntilWithTime = function (startTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    return new SkipUntilWithTimeObservable(this, startTime, scheduler);
	  };
	
	  /**
	   *  Takes elements for the specified duration until the specified end time, using the specified scheduler to run timers.
	   * @param {Number | Date} endTime Time to stop taking elements from the source sequence. If this value is less than or equal to new Date(), the result stream will complete immediately.
	   * @param {Scheduler} [scheduler] Scheduler to run the timer on.
	   * @returns {Observable} An observable sequence with the elements taken until the specified end time.
	   */
	  observableProto.takeUntilWithTime = function (endTime, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      return new BinaryDisposable(
	        scheduler.scheduleFuture(o, endTime, function (_, o) { o.onCompleted(); }),
	        source.subscribe(o));
	    }, source);
	  };
	
	  /**
	   * Returns an Observable that emits only the first item emitted by the source Observable during sequential time windows of a specified duration.
	   * @param {Number} windowDuration time to wait before emitting another item after emitting the last item
	   * @param {Scheduler} [scheduler] the Scheduler to use internally to manage the timers that handle timeout for each item. If not provided, defaults to Scheduler.timeout.
	   * @returns {Observable} An Observable that performs the throttle operation.
	   */
	  observableProto.throttle = function (windowDuration, scheduler) {
	    isScheduler(scheduler) || (scheduler = defaultScheduler);
	    var duration = +windowDuration || 0;
	    if (duration <= 0) { throw new RangeError('windowDuration cannot be less or equal zero.'); }
	    var source = this;
	    return new AnonymousObservable(function (o) {
	      var lastOnNext = 0;
	      return source.subscribe(
	        function (x) {
	          var now = scheduler.now();
	          if (lastOnNext === 0 || now - lastOnNext >= duration) {
	            lastOnNext = now;
	            o.onNext(x);
	          }
	        },function (e) { o.onError(e); }, function () { o.onCompleted(); }
	      );
	    }, source);
	  };
	
	  var TransduceObserver = (function (__super__) {
	    inherits(TransduceObserver, __super__);
	    function TransduceObserver(o, xform) {
	      this._o = o;
	      this._xform = xform;
	      __super__.call(this);
	    }
	
	    TransduceObserver.prototype.next = function (x) {
	      var res = tryCatch(this._xform['@@transducer/step']).call(this._xform, this._o, x);
	      if (res === errorObj) { this._o.onError(res.e); }
	    };
	
	    TransduceObserver.prototype.error = function (e) { this._o.onError(e); };
	
	    TransduceObserver.prototype.completed = function () {
	      this._xform['@@transducer/result'](this._o);
	    };
	
	    return TransduceObserver;
	  }(AbstractObserver));
	
	  function transformForObserver(o) {
	    return {
	      '@@transducer/init': function() {
	        return o;
	      },
	      '@@transducer/step': function(obs, input) {
	        return obs.onNext(input);
	      },
	      '@@transducer/result': function(obs) {
	        return obs.onCompleted();
	      }
	    };
	  }
	
	  /**
	   * Executes a transducer to transform the observable sequence
	   * @param {Transducer} transducer A transducer to execute
	   * @returns {Observable} An Observable sequence containing the results from the transducer.
	   */
	  observableProto.transduce = function(transducer) {
	    var source = this;
	    return new AnonymousObservable(function(o) {
	      var xform = transducer(transformForObserver(o));
	      return source.subscribe(new TransduceObserver(o, xform));
	    }, source);
	  };
	
	  var SwitchFirstObservable = (function (__super__) {
	    inherits(SwitchFirstObservable, __super__);
	    function SwitchFirstObservable(source) {
	      this.source = source;
	      __super__.call(this);
	    }
	
	    SwitchFirstObservable.prototype.subscribeCore = function (o) {
	      var m = new SingleAssignmentDisposable(),
	        g = new CompositeDisposable(),
	        state = {
	          hasCurrent: false,
	          isStopped: false,
	          o: o,
	          g: g
	        };
	
	      g.add(m);
	      m.setDisposable(this.source.subscribe(new SwitchFirstObserver(state)));
	      return g;
	    };
	
	    return SwitchFirstObservable;
	  }(ObservableBase));
	
	  var SwitchFirstObserver = (function(__super__) {
	    inherits(SwitchFirstObserver, __super__);
	    function SwitchFirstObserver(state) {
	      this._s = state;
	      __super__.call(this);
	    }
	
	    SwitchFirstObserver.prototype.next = function (x) {
	      if (!this._s.hasCurrent) {
	        this._s.hasCurrent = true;
	        isPromise(x) && (x = observableFromPromise(x));
	        var inner = new SingleAssignmentDisposable();
	        this._s.g.add(inner);
	        inner.setDisposable(x.subscribe(new InnerObserver(this._s, inner)));
	      }
	    };
	
	    SwitchFirstObserver.prototype.error = function (e) {
	      this._s.o.onError(e);
	    };
	
	    SwitchFirstObserver.prototype.completed = function () {
	      this._s.isStopped = true;
	      !this._s.hasCurrent && this._s.g.length === 1 && this._s.o.onCompleted();
	    };
	
	    inherits(InnerObserver, __super__);
	    function InnerObserver(state, inner) {
	      this._s = state;
	      this._i = inner;
	      __super__.call(this);
	    }
	
	    InnerObserver.prototype.next = function (x) { this._s.o.onNext(x); };
	    InnerObserver.prototype.error = function (e) { this._s.o.onError(e); };
	    InnerObserver.prototype.completed = function () {
	      this._s.g.remove(this._i);
	      this._s.hasCurrent = false;
	      this._s.isStopped && this._s.g.length === 1 && this._s.o.onCompleted();
	    };
	
	    return SwitchFirstObserver;
	  }(AbstractObserver));
	
	  /**
	   * Performs a exclusive waiting for the first to finish before subscribing to another observable.
	   * Observables that come in between subscriptions will be dropped on the floor.
	   * @returns {Observable} A exclusive observable with only the results that happen when subscribed.
	   */
	  observableProto.switchFirst = function () {
	    return new SwitchFirstObservable(this);
	  };
	
	observableProto.flatMapFirst = observableProto.selectManyFirst = function(selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).switchFirst();
	};
	
	Rx.Observable.prototype.flatMapWithMaxConcurrent = function(limit, selector, resultSelector, thisArg) {
	    return new FlatMapObservable(this, selector, resultSelector, thisArg).merge(limit);
	};
	  /** Provides a set of extension methods for virtual time scheduling. */
	  var VirtualTimeScheduler = Rx.VirtualTimeScheduler = (function (__super__) {
	    inherits(VirtualTimeScheduler, __super__);
	
	    /**
	     * Creates a new virtual time scheduler with the specified initial clock value and absolute time comparer.
	     *
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function VirtualTimeScheduler(initialClock, comparer) {
	      this.clock = initialClock;
	      this.comparer = comparer;
	      this.isEnabled = false;
	      this.queue = new PriorityQueue(1024);
	      __super__.call(this);
	    }
	
	    var VirtualTimeSchedulerPrototype = VirtualTimeScheduler.prototype;
	
	    VirtualTimeSchedulerPrototype.now = function () {
	      return this.toAbsoluteTime(this.clock);
	    };
	
	    VirtualTimeSchedulerPrototype.schedule = function (state, action) {
	      return this.scheduleAbsolute(state, this.clock, action);
	    };
	
	    VirtualTimeSchedulerPrototype.scheduleFuture = function (state, dueTime, action) {
	      var dt = dueTime instanceof Date ?
	        this.toRelativeTime(dueTime - this.now()) :
	        this.toRelativeTime(dueTime);
	
	      return this.scheduleRelative(state, dt, action);
	    };
	
	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    VirtualTimeSchedulerPrototype.add = notImplemented;
	
	    /**
	     * Converts an absolute time to a number
	     * @param {Any} The absolute time.
	     * @returns {Number} The absolute time in ms
	     */
	    VirtualTimeSchedulerPrototype.toAbsoluteTime = notImplemented;
	
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    VirtualTimeSchedulerPrototype.toRelativeTime = notImplemented;
	
	    /**
	     * Schedules a periodic piece of work by dynamically discovering the scheduler's capabilities. The periodic task will be emulated using recursive scheduling.
	     * @param {Mixed} state Initial state passed to the action upon the first iteration.
	     * @param {Number} period Period for running the work periodically.
	     * @param {Function} action Action to be executed, potentially updating the state.
	     * @returns {Disposable} The disposable object used to cancel the scheduled recurring action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.schedulePeriodic = function (state, period, action) {
	      var s = new SchedulePeriodicRecursive(this, state, period, action);
	      return s.start();
	    };
	
	    /**
	     * Schedules an action to be executed after dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Relative time after which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleRelative = function (state, dueTime, action) {
	      var runAt = this.add(this.clock, dueTime);
	      return this.scheduleAbsolute(state, runAt, action);
	    };
	
	    /**
	     * Starts the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.start = function () {
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	      }
	    };
	
	    /**
	     * Stops the virtual time scheduler.
	     */
	    VirtualTimeSchedulerPrototype.stop = function () {
	      this.isEnabled = false;
	    };
	
	    /**
	     * Advances the scheduler's clock to the specified time, running all work till that point.
	     * @param {Number} time Absolute time to advance the scheduler's clock to.
	     */
	    VirtualTimeSchedulerPrototype.advanceTo = function (time) {
	      var dueToClock = this.comparer(this.clock, time);
	      if (this.comparer(this.clock, time) > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) { return; }
	      if (!this.isEnabled) {
	        this.isEnabled = true;
	        do {
	          var next = this.getNext();
	          if (next !== null && this.comparer(next.dueTime, time) <= 0) {
	            this.comparer(next.dueTime, this.clock) > 0 && (this.clock = next.dueTime);
	            next.invoke();
	          } else {
	            this.isEnabled = false;
	          }
	        } while (this.isEnabled);
	        this.clock = time;
	      }
	    };
	
	    /**
	     * Advances the scheduler's clock by the specified relative time, running all work scheduled for that timespan.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.advanceBy = function (time) {
	      var dt = this.add(this.clock, time),
	          dueToClock = this.comparer(this.clock, dt);
	      if (dueToClock > 0) { throw new ArgumentOutOfRangeError(); }
	      if (dueToClock === 0) {  return; }
	
	      this.advanceTo(dt);
	    };
	
	    /**
	     * Advances the scheduler's clock by the specified relative time.
	     * @param {Number} time Relative time to advance the scheduler's clock by.
	     */
	    VirtualTimeSchedulerPrototype.sleep = function (time) {
	      var dt = this.add(this.clock, time);
	      if (this.comparer(this.clock, dt) >= 0) { throw new ArgumentOutOfRangeError(); }
	
	      this.clock = dt;
	    };
	
	    /**
	     * Gets the next scheduled item to be executed.
	     * @returns {ScheduledItem} The next scheduled item.
	     */
	    VirtualTimeSchedulerPrototype.getNext = function () {
	      while (this.queue.length > 0) {
	        var next = this.queue.peek();
	        if (next.isCancelled()) {
	          this.queue.dequeue();
	        } else {
	          return next;
	        }
	      }
	      return null;
	    };
	
	    /**
	     * Schedules an action to be executed at dueTime.
	     * @param {Mixed} state State passed to the action to be executed.
	     * @param {Number} dueTime Absolute time at which to execute the action.
	     * @param {Function} action Action to be executed.
	     * @returns {Disposable} The disposable object used to cancel the scheduled action (best effort).
	     */
	    VirtualTimeSchedulerPrototype.scheduleAbsolute = function (state, dueTime, action) {
	      var self = this;
	
	      function run(scheduler, state1) {
	        self.queue.remove(si);
	        return action(scheduler, state1);
	      }
	
	      var si = new ScheduledItem(this, state, run, dueTime, this.comparer);
	      this.queue.enqueue(si);
	
	      return si.disposable;
	    };
	
	    return VirtualTimeScheduler;
	  }(Scheduler));
	
	  /** Provides a virtual time scheduler that uses Date for absolute time and number for relative time. */
	  Rx.HistoricalScheduler = (function (__super__) {
	    inherits(HistoricalScheduler, __super__);
	
	    /**
	     * Creates a new historical scheduler with the specified initial clock value.
	     * @constructor
	     * @param {Number} initialClock Initial value for the clock.
	     * @param {Function} comparer Comparer to determine causality of events based on absolute time.
	     */
	    function HistoricalScheduler(initialClock, comparer) {
	      var clock = initialClock == null ? 0 : initialClock;
	      var cmp = comparer || defaultSubComparer;
	      __super__.call(this, clock, cmp);
	    }
	
	    var HistoricalSchedulerProto = HistoricalScheduler.prototype;
	
	    /**
	     * Adds a relative time value to an absolute time value.
	     * @param {Number} absolute Absolute virtual time value.
	     * @param {Number} relative Relative virtual time value to add.
	     * @return {Number} Resulting absolute virtual time sum value.
	     */
	    HistoricalSchedulerProto.add = function (absolute, relative) {
	      return absolute + relative;
	    };
	
	    HistoricalSchedulerProto.toAbsoluteTime = function (absolute) {
	      return new Date(absolute).getTime();
	    };
	
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     * @memberOf HistoricalScheduler
	     * @param {Number} timeSpan TimeSpan value to convert.
	     * @return {Number} Corresponding relative virtual time value.
	     */
	    HistoricalSchedulerProto.toRelativeTime = function (timeSpan) {
	      return timeSpan;
	    };
	
	    return HistoricalScheduler;
	  }(Rx.VirtualTimeScheduler));
	
	function OnNextPredicate(predicate) {
	    this.predicate = predicate;
	}
	
	OnNextPredicate.prototype.equals = function (other) {
	  if (other === this) { return true; }
	  if (other == null) { return false; }
	  if (other.kind !== 'N') { return false; }
	  return this.predicate(other.value);
	};
	
	function OnErrorPredicate(predicate) {
	  this.predicate = predicate;
	}
	
	OnErrorPredicate.prototype.equals = function (other) {
	  if (other === this) { return true; }
	  if (other == null) { return false; }
	  if (other.kind !== 'E') { return false; }
	  return this.predicate(other.error);
	};
	
	var ReactiveTest = Rx.ReactiveTest = {
	  /** Default virtual time used for creation of observable sequences in unit tests. */
	  created: 100,
	  /** Default virtual time used to subscribe to observable sequences in unit tests. */
	  subscribed: 200,
	  /** Default virtual time used to dispose subscriptions in unit tests. */
	  disposed: 1000,
	
	  /**
	   * Factory method for an OnNext notification record at a given time with a given value or a predicate function.
	   *
	   * 1 - ReactiveTest.onNext(200, 42);
	   * 2 - ReactiveTest.onNext(200, function (x) { return x.length == 2; });
	   *
	   * @param ticks Recorded virtual time the OnNext notification occurs.
	   * @param value Recorded value stored in the OnNext notification or a predicate.
	   * @return Recorded OnNext notification.
	   */
	  onNext: function (ticks, value) {
	    return typeof value === 'function' ?
	      new Recorded(ticks, new OnNextPredicate(value)) :
	      new Recorded(ticks, Notification.createOnNext(value));
	  },
	  /**
	   * Factory method for an OnError notification record at a given time with a given error.
	   *
	   * 1 - ReactiveTest.onNext(200, new Error('error'));
	   * 2 - ReactiveTest.onNext(200, function (e) { return e.message === 'error'; });
	   *
	   * @param ticks Recorded virtual time the OnError notification occurs.
	   * @param exception Recorded exception stored in the OnError notification.
	   * @return Recorded OnError notification.
	   */
	  onError: function (ticks, error) {
	    return typeof error === 'function' ?
	      new Recorded(ticks, new OnErrorPredicate(error)) :
	      new Recorded(ticks, Notification.createOnError(error));
	  },
	  /**
	   * Factory method for an OnCompleted notification record at a given time.
	   *
	   * @param ticks Recorded virtual time the OnCompleted notification occurs.
	   * @return Recorded OnCompleted notification.
	   */
	  onCompleted: function (ticks) {
	    return new Recorded(ticks, Notification.createOnCompleted());
	  },
	  /**
	   * Factory method for a subscription record based on a given subscription and disposal time.
	   *
	   * @param start Virtual time indicating when the subscription was created.
	   * @param end Virtual time indicating when the subscription was disposed.
	   * @return Subscription object.
	   */
	  subscribe: function (start, end) {
	    return new Subscription(start, end);
	  }
	};
	
	  /**
	   * Creates a new object recording the production of the specified value at the given virtual time.
	   *
	   * @constructor
	   * @param {Number} time Virtual time the value was produced on.
	   * @param {Mixed} value Value that was produced.
	   * @param {Function} comparer An optional comparer.
	   */
	  var Recorded = Rx.Recorded = function (time, value, comparer) {
	    this.time = time;
	    this.value = value;
	    this.comparer = comparer || defaultComparer;
	  };
	
	  /**
	   * Checks whether the given recorded object is equal to the current instance.
	   *
	   * @param {Recorded} other Recorded object to check for equality.
	   * @returns {Boolean} true if both objects are equal; false otherwise.
	   */
	  Recorded.prototype.equals = function (other) {
	    return this.time === other.time && this.comparer(this.value, other.value);
	  };
	
	  /**
	   * Returns a string representation of the current Recorded value.
	   *
	   * @returns {String} String representation of the current Recorded value.
	   */
	  Recorded.prototype.toString = function () {
	    return this.value.toString() + '@' + this.time;
	  };
	
	  /**
	   * Creates a new subscription object with the given virtual subscription and unsubscription time.
	   *
	   * @constructor
	   * @param {Number} subscribe Virtual time at which the subscription occurred.
	   * @param {Number} unsubscribe Virtual time at which the unsubscription occurred.
	   */
	  var Subscription = Rx.Subscription = function (start, end) {
	    this.subscribe = start;
	    this.unsubscribe = end || Number.MAX_VALUE;
	  };
	
	  /**
	   * Checks whether the given subscription is equal to the current instance.
	   * @param other Subscription object to check for equality.
	   * @returns {Boolean} true if both objects are equal; false otherwise.
	   */
	  Subscription.prototype.equals = function (other) {
	    return this.subscribe === other.subscribe && this.unsubscribe === other.unsubscribe;
	  };
	
	  /**
	   * Returns a string representation of the current Subscription value.
	   * @returns {String} String representation of the current Subscription value.
	   */
	  Subscription.prototype.toString = function () {
	    return '(' + this.subscribe + ', ' + (this.unsubscribe === Number.MAX_VALUE ? 'Infinite' : this.unsubscribe) + ')';
	  };
	
	  var MockDisposable = Rx.MockDisposable = function (scheduler) {
	    this.scheduler = scheduler;
	    this.disposes = [];
	    this.disposes.push(this.scheduler.clock);
	  };
	
	  MockDisposable.prototype.dispose = function () {
	    this.disposes.push(this.scheduler.clock);
	  };
	
	  var MockObserver = (function (__super__) {
	    inherits(MockObserver, __super__);
	
	    function MockObserver(scheduler) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.messages = [];
	    }
	
	    var MockObserverPrototype = MockObserver.prototype;
	
	    MockObserverPrototype.onNext = function (value) {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnNext(value)));
	    };
	
	    MockObserverPrototype.onError = function (e) {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnError(e)));
	    };
	
	    MockObserverPrototype.onCompleted = function () {
	      this.messages.push(new Recorded(this.scheduler.clock, Notification.createOnCompleted()));
	    };
	
	    return MockObserver;
	  })(Observer);
	
	  function MockPromise(scheduler, messages) {
	    var self = this;
	    this.scheduler = scheduler;
	    this.messages = messages;
	    this.subscriptions = [];
	    this.observers = [];
	    for (var i = 0, len = this.messages.length; i < len; i++) {
	      var message = this.messages[i],
	          notification = message.value;
	      (function (innerNotification) {
	        scheduler.scheduleAbsolute(null, message.time, function () {
	          var obs = self.observers.slice(0);
	
	          for (var j = 0, jLen = obs.length; j < jLen; j++) {
	            innerNotification.accept(obs[j]);
	          }
	          return disposableEmpty;
	        });
	      })(notification);
	    }
	  }
	
	  MockPromise.prototype.then = function (onResolved, onRejected) {
	    var self = this;
	
	    this.subscriptions.push(new Subscription(this.scheduler.clock));
	    var index = this.subscriptions.length - 1;
	
	    var newPromise;
	
	    var observer = Rx.Observer.create(
	      function (x) {
	        var retValue = onResolved(x);
	        if (retValue && typeof retValue.then === 'function') {
	          newPromise = retValue;
	        } else {
	          var ticks = self.scheduler.clock;
	          newPromise = new MockPromise(self.scheduler, [Rx.ReactiveTest.onNext(ticks, undefined), Rx.ReactiveTest.onCompleted(ticks)]);
	        }
	        var idx = self.observers.indexOf(observer);
	        self.observers.splice(idx, 1);
	        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
	      },
	      function (err) {
	        onRejected(err);
	        var idx = self.observers.indexOf(observer);
	        self.observers.splice(idx, 1);
	        self.subscriptions[index] = new Subscription(self.subscriptions[index].subscribe, self.scheduler.clock);
	      }
	    );
	    this.observers.push(observer);
	
	    return newPromise || new MockPromise(this.scheduler, this.messages);
	  };
	
	  var HotObservable = (function (__super__) {
	    inherits(HotObservable, __super__);
	
	    function HotObservable(scheduler, messages) {
	      __super__.call(this);
	      var message, notification, observable = this;
	      this.scheduler = scheduler;
	      this.messages = messages;
	      this.subscriptions = [];
	      this.observers = [];
	      for (var i = 0, len = this.messages.length; i < len; i++) {
	        message = this.messages[i];
	        notification = message.value;
	        (function (innerNotification) {
	          scheduler.scheduleAbsolute(null, message.time, function () {
	            var obs = observable.observers.slice(0);
	
	            for (var j = 0, jLen = obs.length; j < jLen; j++) {
	              innerNotification.accept(obs[j]);
	            }
	            return disposableEmpty;
	          });
	        })(notification);
	      }
	    }
	
	    HotObservable.prototype._subscribe = function (o) {
	      var observable = this;
	      this.observers.push(o);
	      this.subscriptions.push(new Subscription(this.scheduler.clock));
	      var index = this.subscriptions.length - 1;
	      return disposableCreate(function () {
	        var idx = observable.observers.indexOf(o);
	        observable.observers.splice(idx, 1);
	        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
	      });
	    };
	
	    return HotObservable;
	  })(Observable);
	
	  var ColdObservable = (function (__super__) {
	    inherits(ColdObservable, __super__);
	
	    function ColdObservable(scheduler, messages) {
	      __super__.call(this);
	      this.scheduler = scheduler;
	      this.messages = messages;
	      this.subscriptions = [];
	    }
	
	    ColdObservable.prototype._subscribe = function (o) {
	      var message, notification, observable = this;
	      this.subscriptions.push(new Subscription(this.scheduler.clock));
	      var index = this.subscriptions.length - 1;
	      var d = new CompositeDisposable();
	      for (var i = 0, len = this.messages.length; i < len; i++) {
	        message = this.messages[i];
	        notification = message.value;
	        (function (innerNotification) {
	          d.add(observable.scheduler.scheduleRelative(null, message.time, function () {
	            innerNotification.accept(o);
	            return disposableEmpty;
	          }));
	        })(notification);
	      }
	      return disposableCreate(function () {
	        observable.subscriptions[index] = new Subscription(observable.subscriptions[index].subscribe, observable.scheduler.clock);
	        d.dispose();
	      });
	    };
	
	    return ColdObservable;
	  })(Observable);
	
	  /** Virtual time scheduler used for testing applications and libraries built using Reactive Extensions. */
	  Rx.TestScheduler = (function (__super__) {
	    inherits(TestScheduler, __super__);
	
	    function baseComparer(x, y) {
	      return x > y ? 1 : (x < y ? -1 : 0);
	    }
	
	    function TestScheduler() {
	      __super__.call(this, 0, baseComparer);
	    }
	
	    /**
	     * Schedules an action to be executed at the specified virtual time.
	     *
	     * @param state State passed to the action to be executed.
	     * @param dueTime Absolute virtual time at which to execute the action.
	     * @param action Action to be executed.
	     * @return Disposable object used to cancel the scheduled action (best effort).
	     */
	    TestScheduler.prototype.scheduleAbsolute = function (state, dueTime, action) {
	      dueTime <= this.clock && (dueTime = this.clock + 1);
	      return __super__.prototype.scheduleAbsolute.call(this, state, dueTime, action);
	    };
	    /**
	     * Adds a relative virtual time to an absolute virtual time value.
	     *
	     * @param absolute Absolute virtual time value.
	     * @param relative Relative virtual time value to add.
	     * @return Resulting absolute virtual time sum value.
	     */
	    TestScheduler.prototype.add = function (absolute, relative) {
	      return absolute + relative;
	    };
	    /**
	     * Converts the absolute virtual time value to a DateTimeOffset value.
	     *
	     * @param absolute Absolute virtual time value to convert.
	     * @return Corresponding DateTimeOffset value.
	     */
	    TestScheduler.prototype.toAbsoluteTime = function (absolute) {
	      return new Date(absolute).getTime();
	    };
	    /**
	     * Converts the TimeSpan value to a relative virtual time value.
	     *
	     * @param timeSpan TimeSpan value to convert.
	     * @return Corresponding relative virtual time value.
	     */
	    TestScheduler.prototype.toRelativeTime = function (timeSpan) {
	      return timeSpan;
	    };
	    /**
	     * Starts the test scheduler and uses the specified virtual times to invoke the factory function, subscribe to the resulting sequence, and dispose the subscription.
	     *
	     * @param create Factory method to create an observable sequence.
	     * @param created Virtual time at which to invoke the factory to create an observable sequence.
	     * @param subscribed Virtual time at which to subscribe to the created observable sequence.
	     * @param disposed Virtual time at which to dispose the subscription.
	     * @return Observer with timestamped recordings of notification messages that were received during the virtual time window when the subscription to the source sequence was active.
	     */
	    TestScheduler.prototype.startScheduler = function (createFn, settings) {
	      settings || (settings = {});
	      settings.created == null && (settings.created = ReactiveTest.created);
	      settings.subscribed == null && (settings.subscribed = ReactiveTest.subscribed);
	      settings.disposed == null && (settings.disposed = ReactiveTest.disposed);
	
	      var observer = this.createObserver(), source, subscription;
	
	      this.scheduleAbsolute(null, settings.created, function () {
	        source = createFn();
	        return disposableEmpty;
	      });
	
	      this.scheduleAbsolute(null, settings.subscribed, function () {
	        subscription = source.subscribe(observer);
	        return disposableEmpty;
	      });
	
	      this.scheduleAbsolute(null, settings.disposed, function () {
	        subscription.dispose();
	        return disposableEmpty;
	      });
	
	      this.start();
	
	      return observer;
	    };
	
	    /**
	     * Creates a hot observable using the specified timestamped notification messages either as an array or arguments.
	     * @param messages Notifications to surface through the created sequence at their specified absolute virtual times.
	     * @return Hot observable sequence that can be used to assert the timing of subscriptions and notifications.
	     */
	    TestScheduler.prototype.createHotObservable = function () {
	      var len = arguments.length, args;
	      if (Array.isArray(arguments[0])) {
	        args = arguments[0];
	      } else {
	        args = new Array(len);
	        for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
	      }
	      return new HotObservable(this, args);
	    };
	
	    /**
	     * Creates a cold observable using the specified timestamped notification messages either as an array or arguments.
	     * @param messages Notifications to surface through the created sequence at their specified virtual time offsets from the sequence subscription time.
	     * @return Cold observable sequence that can be used to assert the timing of subscriptions and notifications.
	     */
	    TestScheduler.prototype.createColdObservable = function () {
	      var len = arguments.length, args;
	      if (Array.isArray(arguments[0])) {
	        args = arguments[0];
	      } else {
	        args = new Array(len);
	        for (var i = 0; i < len; i++) { args[i] = arguments[i]; }
	      }
	      return new ColdObservable(this, args);
	    };
	
	    /**
	     * Creates a resolved promise with the given value and ticks
	     * @param {Number} ticks The absolute time of the resolution.
	     * @param {Any} value The value to yield at the given tick.
	     * @returns {MockPromise} A mock Promise which fulfills with the given value.
	     */
	    TestScheduler.prototype.createResolvedPromise = function (ticks, value) {
	      return new MockPromise(this, [Rx.ReactiveTest.onNext(ticks, value), Rx.ReactiveTest.onCompleted(ticks)]);
	    };
	
	    /**
	     * Creates a rejected promise with the given reason and ticks
	     * @param {Number} ticks The absolute time of the resolution.
	     * @param {Any} reason The reason for rejection to yield at the given tick.
	     * @returns {MockPromise} A mock Promise which rejects with the given reason.
	     */
	    TestScheduler.prototype.createRejectedPromise = function (ticks, reason) {
	      return new MockPromise(this, [Rx.ReactiveTest.onError(ticks, reason)]);
	    };
	
	    /**
	     * Creates an observer that records received notification messages and timestamps those.
	     * @return Observer that can be used to assert the timing of received notifications.
	     */
	    TestScheduler.prototype.createObserver = function () {
	      return new MockObserver(this);
	    };
	
	    return TestScheduler;
	  })(VirtualTimeScheduler);
	
	  var AnonymousObservable = Rx.AnonymousObservable = (function (__super__) {
	    inherits(AnonymousObservable, __super__);
	
	    // Fix subscriber to check for undefined or function returned to decorate as Disposable
	    function fixSubscriber(subscriber) {
	      return subscriber && isFunction(subscriber.dispose) ? subscriber :
	        isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
	    }
	
	    function setDisposable(s, state) {
	      var ado = state[0], self = state[1];
	      var sub = tryCatch(self.__subscribe).call(self, ado);
	      if (sub === errorObj && !ado.fail(errorObj.e)) { thrower(errorObj.e); }
	      ado.setDisposable(fixSubscriber(sub));
	    }
	
	    function AnonymousObservable(subscribe, parent) {
	      this.source = parent;
	      this.__subscribe = subscribe;
	      __super__.call(this);
	    }
	
	    AnonymousObservable.prototype._subscribe = function (o) {
	      var ado = new AutoDetachObserver(o), state = [ado, this];
	
	      if (currentThreadScheduler.scheduleRequired()) {
	        currentThreadScheduler.schedule(state, setDisposable);
	      } else {
	        setDisposable(null, state);
	      }
	      return ado;
	    };
	
	    return AnonymousObservable;
	
	  }(Observable));
	
	  var AutoDetachObserver = (function (__super__) {
	    inherits(AutoDetachObserver, __super__);
	
	    function AutoDetachObserver(observer) {
	      __super__.call(this);
	      this.observer = observer;
	      this.m = new SingleAssignmentDisposable();
	    }
	
	    var AutoDetachObserverPrototype = AutoDetachObserver.prototype;
	
	    AutoDetachObserverPrototype.next = function (value) {
	      var result = tryCatch(this.observer.onNext).call(this.observer, value);
	      if (result === errorObj) {
	        this.dispose();
	        thrower(result.e);
	      }
	    };
	
	    AutoDetachObserverPrototype.error = function (err) {
	      var result = tryCatch(this.observer.onError).call(this.observer, err);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };
	
	    AutoDetachObserverPrototype.completed = function () {
	      var result = tryCatch(this.observer.onCompleted).call(this.observer);
	      this.dispose();
	      result === errorObj && thrower(result.e);
	    };
	
	    AutoDetachObserverPrototype.setDisposable = function (value) { this.m.setDisposable(value); };
	    AutoDetachObserverPrototype.getDisposable = function () { return this.m.getDisposable(); };
	
	    AutoDetachObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      this.m.dispose();
	    };
	
	    return AutoDetachObserver;
	  }(AbstractObserver));
	
	  var UnderlyingObservable = (function (__super__) {
	    inherits(UnderlyingObservable, __super__);
	    function UnderlyingObservable(m, u) {
	      this._m = m;
	      this._u = u;
	      __super__.call(this);
	    }
	
	    UnderlyingObservable.prototype.subscribeCore = function (o) {
	      return new BinaryDisposable(this._m.getDisposable(), this._u.subscribe(o));
	    };
	
	    return UnderlyingObservable;
	  }(ObservableBase));
	
	  var GroupedObservable = (function (__super__) {
	    inherits(GroupedObservable, __super__);
	    function GroupedObservable(key, underlyingObservable, mergedDisposable) {
	      __super__.call(this);
	      this.key = key;
	      this.underlyingObservable = !mergedDisposable ?
	        underlyingObservable :
	        new UnderlyingObservable(mergedDisposable, underlyingObservable);
	    }
	
	    GroupedObservable.prototype._subscribe = function (o) {
	      return this.underlyingObservable.subscribe(o);
	    };
	
	    return GroupedObservable;
	  }(Observable));
	
	  /**
	   *  Represents an object that is both an observable sequence as well as an observer.
	   *  Each notification is broadcasted to all subscribed observers.
	   */
	  var Subject = Rx.Subject = (function (__super__) {
	    inherits(Subject, __super__);
	    function Subject() {
	      __super__.call(this);
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.observers = [];
	      this.hasError = false;
	    }
	
	    addProperties(Subject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.observers.push(o);
	          return new InnerSubscription(this, o);
	        }
	        if (this.hasError) {
	          o.onError(this.error);
	          return disposableEmpty;
	        }
	        o.onCompleted();
	        return disposableEmpty;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onCompleted();
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.error = error;
	          this.hasError = true;
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onNext(value);
	          }
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });
	
	    /**
	     * Creates a subject from the specified observer and observable.
	     * @param {Observer} observer The observer used to send messages to the subject.
	     * @param {Observable} observable The observable used to subscribe to messages sent from the subject.
	     * @returns {Subject} Subject implemented using the given observer and observable.
	     */
	    Subject.create = function (observer, observable) {
	      return new AnonymousSubject(observer, observable);
	    };
	
	    return Subject;
	  }(Observable));
	
	  /**
	   *  Represents the result of an asynchronous operation.
	   *  The last value before the OnCompleted notification, or the error received through OnError, is sent to all subscribed observers.
	   */
	  var AsyncSubject = Rx.AsyncSubject = (function (__super__) {
	    inherits(AsyncSubject, __super__);
	
	    /**
	     * Creates a subject that can only receive one value and that value is cached for all future observations.
	     * @constructor
	     */
	    function AsyncSubject() {
	      __super__.call(this);
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasValue = false;
	      this.observers = [];
	      this.hasError = false;
	    }
	
	    addProperties(AsyncSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	
	        if (!this.isStopped) {
	          this.observers.push(o);
	          return new InnerSubscription(this, o);
	        }
	
	        if (this.hasError) {
	          o.onError(this.error);
	        } else if (this.hasValue) {
	          o.onNext(this.value);
	          o.onCompleted();
	        } else {
	          o.onCompleted();
	        }
	
	        return disposableEmpty;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        checkDisposed(this);
	        return this.observers.length > 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence, also causing the last received value to be sent out (if any).
	       */
	      onCompleted: function () {
	        var i, len;
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          var os = cloneArray(this.observers), len = os.length;
	
	          if (this.hasValue) {
	            for (i = 0; i < len; i++) {
	              var o = os[i];
	              o.onNext(this.value);
	              o.onCompleted();
	            }
	          } else {
	            for (i = 0; i < len; i++) {
	              os[i].onCompleted();
	            }
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the error.
	       * @param {Mixed} error The Error to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.isStopped = true;
	          this.hasError = true;
	          this.error = error;
	
	          for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	            os[i].onError(error);
	          }
	
	          this.observers.length = 0;
	        }
	      },
	      /**
	       * Sends a value to the subject. The last value received before successful termination will be sent to all subscribed and future observers.
	       * @param {Mixed} value The value to store in the subject.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        this.hasValue = true;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.error = null;
	        this.value = null;
	      }
	    });
	
	    return AsyncSubject;
	  }(Observable));
	
	  /**
	   *  Represents a value that changes over time.
	   *  Observers can subscribe to the subject to receive the last (or initial) value and all subsequent notifications.
	   */
	  var BehaviorSubject = Rx.BehaviorSubject = (function (__super__) {
	    inherits(BehaviorSubject, __super__);
	    function BehaviorSubject(value) {
	      __super__.call(this);
	      this.value = value;
	      this.observers = [];
	      this.isDisposed = false;
	      this.isStopped = false;
	      this.hasError = false;
	    }
	
	    addProperties(BehaviorSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        if (!this.isStopped) {
	          this.observers.push(o);
	          o.onNext(this.value);
	          return new InnerSubscription(this, o);
	        }
	        if (this.hasError) {
	          o.onError(this.error);
	        } else {
	          o.onCompleted();
	        }
	        return disposableEmpty;
	      },
	      /**
	       * Gets the current value or throws an exception.
	       * Value is frozen after onCompleted is called.
	       * After onError is called always throws the specified exception.
	       * An exception is always thrown after dispose is called.
	       * @returns {Mixed} The initial value passed to the constructor until onNext is called; after which, the last value passed to onNext.
	       */
	      getValue: function () {
	        checkDisposed(this);
	        if (this.hasError) { thrower(this.error); }
	        return this.value;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () { return this.observers.length > 0; },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onCompleted();
	        }
	
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.hasError = true;
	        this.error = error;
	
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onError(error);
	        }
	
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.value = value;
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          os[i].onNext(value);
	        }
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	        this.value = null;
	        this.error = null;
	      }
	    });
	
	    return BehaviorSubject;
	  }(Observable));
	
	  /**
	   * Represents an object that is both an observable sequence as well as an observer.
	   * Each notification is broadcasted to all subscribed and future observers, subject to buffer trimming policies.
	   */
	  var ReplaySubject = Rx.ReplaySubject = (function (__super__) {
	
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	
	    function createRemovableDisposable(subject, observer) {
	      return disposableCreate(function () {
	        observer.dispose();
	        !subject.isDisposed && subject.observers.splice(subject.observers.indexOf(observer), 1);
	      });
	    }
	
	    inherits(ReplaySubject, __super__);
	
	    /**
	     *  Initializes a new instance of the ReplaySubject class with the specified buffer size, window size and scheduler.
	     *  @param {Number} [bufferSize] Maximum element count of the replay buffer.
	     *  @param {Number} [windowSize] Maximum time length of the replay buffer.
	     *  @param {Scheduler} [scheduler] Scheduler the observers are invoked on.
	     */
	    function ReplaySubject(bufferSize, windowSize, scheduler) {
	      this.bufferSize = bufferSize == null ? maxSafeInteger : bufferSize;
	      this.windowSize = windowSize == null ? maxSafeInteger : windowSize;
	      this.scheduler = scheduler || currentThreadScheduler;
	      this.q = [];
	      this.observers = [];
	      this.isStopped = false;
	      this.isDisposed = false;
	      this.hasError = false;
	      this.error = null;
	      __super__.call(this);
	    }
	
	    addProperties(ReplaySubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        checkDisposed(this);
	        var so = new ScheduledObserver(this.scheduler, o), subscription = createRemovableDisposable(this, so);
	
	        this._trim(this.scheduler.now());
	        this.observers.push(so);
	
	        for (var i = 0, len = this.q.length; i < len; i++) {
	          so.onNext(this.q[i].value);
	        }
	
	        if (this.hasError) {
	          so.onError(this.error);
	        } else if (this.isStopped) {
	          so.onCompleted();
	        }
	
	        so.ensureActive();
	        return subscription;
	      },
	      /**
	       * Indicates whether the subject has observers subscribed to it.
	       * @returns {Boolean} Indicates whether the subject has observers subscribed to it.
	       */
	      hasObservers: function () {
	        return this.observers.length > 0;
	      },
	      _trim: function (now) {
	        while (this.q.length > this.bufferSize) {
	          this.q.shift();
	        }
	        while (this.q.length > 0 && (now - this.q[0].interval) > this.windowSize) {
	          this.q.shift();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the arrival of the specified element in the sequence.
	       * @param {Mixed} value The value to send to all observers.
	       */
	      onNext: function (value) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        var now = this.scheduler.now();
	        this.q.push({ interval: now, value: value });
	        this._trim(now);
	
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onNext(value);
	          observer.ensureActive();
	        }
	      },
	      /**
	       * Notifies all subscribed observers about the exception.
	       * @param {Mixed} error The exception to send to all observers.
	       */
	      onError: function (error) {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        this.error = error;
	        this.hasError = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onError(error);
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Notifies all subscribed observers about the end of the sequence.
	       */
	      onCompleted: function () {
	        checkDisposed(this);
	        if (this.isStopped) { return; }
	        this.isStopped = true;
	        var now = this.scheduler.now();
	        this._trim(now);
	        for (var i = 0, os = cloneArray(this.observers), len = os.length; i < len; i++) {
	          var observer = os[i];
	          observer.onCompleted();
	          observer.ensureActive();
	        }
	        this.observers.length = 0;
	      },
	      /**
	       * Unsubscribe all observers and release resources.
	       */
	      dispose: function () {
	        this.isDisposed = true;
	        this.observers = null;
	      }
	    });
	
	    return ReplaySubject;
	  }(Observable));
	
	  var AnonymousSubject = Rx.AnonymousSubject = (function (__super__) {
	    inherits(AnonymousSubject, __super__);
	    function AnonymousSubject(observer, observable) {
	      this.observer = observer;
	      this.observable = observable;
	      __super__.call(this);
	    }
	
	    addProperties(AnonymousSubject.prototype, Observer.prototype, {
	      _subscribe: function (o) {
	        return this.observable.subscribe(o);
	      },
	      onCompleted: function () {
	        this.observer.onCompleted();
	      },
	      onError: function (error) {
	        this.observer.onError(error);
	      },
	      onNext: function (value) {
	        this.observer.onNext(value);
	      }
	    });
	
	    return AnonymousSubject;
	  }(Observable));
	
	  /**
	  * Used to pause and resume streams.
	  */
	  Rx.Pauser = (function (__super__) {
	    inherits(Pauser, __super__);
	    function Pauser() {
	      __super__.call(this);
	    }
	
	    /**
	     * Pauses the underlying sequence.
	     */
	    Pauser.prototype.pause = function () { this.onNext(false); };
	
	    /**
	    * Resumes the underlying sequence.
	    */
	    Pauser.prototype.resume = function () { this.onNext(true); };
	
	    return Pauser;
	  }(Subject));
	
	  if (true) {
	    root.Rx = Rx;
	
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Rx;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = Rx).Rx = Rx;
	    } else {
	      freeExports.Rx = Rx;
	    }
	  } else {
	    // in a browser or Rhino
	    root.Rx = Rx;
	  }
	
	  // All code before this point will be filtered from stack traces.
	  var rEndingLine = captureLine();
	
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 3 */
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
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(7);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ramda = __webpack_require__(11);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _dialogue = __webpack_require__(12);
	
	var _dialogue2 = _interopRequireDefault(_dialogue);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var story = [{
		"scene": "intro",
		"src": "vid/Intro.mp4",
		"next": "conflict"
	}, {
		"scene": "conflict",
		"src": "vid/Background.mp4",
		"dialogue": "intro_dialog"
	}, {
		"scene": "mech_force",
		"src": "vid/Meteor.mp4",
		"next": "mech_force_dialog"
	}, {
		"scene": "mech_force_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "asteroid_dialog"
	}, {
		"scene": "compete_kind",
		"src": "vid/Background.mp4",
		"dialogue": "compete_kind_dialog"
	}, {
		"scene": "compete_hard",
		"src": "vid/Background.mp4",
		"dialogue": "compete_hard_dialog"
	}, {
		"scene": "electrical_density",
		"src": "vid/Cars.mp4",
		"next": "ed_dialog"
	
	}, {
		"scene": "conductivity",
		"src": "vid/Phone.mp4",
		"next": "c_dialog"
	}, {
		"scene": "ed_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "ed_c_dialog"
	}, {
		"scene": "c_dialog",
		"src": "vid/Background.mp4",
		"dialogue": "c_c_dialog"
	}, {
		"scene": "electrical_density_2",
		"src": "vid/Cars.mp4",
		"next": "end1"
	
	}, {
		"scene": "conductivity_2",
		"src": "vid/Phone.mp4",
		"next": "end1"
	}, {
		"scene": "electrical_density_good",
		"src": "vid/Cars.mp4",
		"next": "end2"
	
	}, {
		"scene": "conductivity_good",
		"src": "vid/Phone.mp4",
		"next": "good_mid"
	}, {
		"scene": "good_mid",
		"src": "vid/Background.mp4",
		"dialogue": "good_dialog"
	}, {
		"src": "vid/Background.mp4",
		"scene": "end1",
		"dialogue": "ending_dialog_1"
	}, {
		"src": "vid/Background.mp4",
		"dialogue": "ending_dialog_2",
		"scene": "end2"
	}, {
		"src": "vid/Background.mp4",
		"scene": "end_true",
		"next": "test"
	}, {
		"src": "vid/Background.mp4",
		"scene": "test"
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
	
	var Story = function () {
		function Story() {
			(0, _classCallCheck3.default)(this, Story);
	
			this.story = story;
			this.showDialogue = false;
			this.dialogue = new _dialogue2.default();
			this.current = this.story[0];
			this.story.forEach(createVideo);
			console.log(cache);
		}
	
		(0, _createClass3.default)(Story, [{
			key: "defaultVideo",
			value: function defaultVideo() {
				return _ramda2.default.find(_ramda2.default.propEq("src", "vid/Background.mp4"))(cache);
			}
		}, {
			key: "scene",
			value: function scene(name) {
				return _ramda2.default.find(_ramda2.default.propEq("scene", name))(this.story);
			}
		}, {
			key: "exists",
			value: function exists(scene) {
				return this.scene(scene) != null;
			}
		}, {
			key: "choices",
			value: function choices() {
				if (this.current.dialogue != null) {
					if (this.dialogue.hasChoices()) {
						return this.dialogue.choices();
					} else {
						return this.dialogue.say();
					}
				}
				if (this.current.choice != null) {
					return this.current.choice.map(function (o) {
						return o.show;
					});
				} else {
					return [];
				}
			}
		}, {
			key: "hasChoices",
			value: function hasChoices() {
				return this.current.choice != null || this.dialogue.hasChoices();
			}
		}, {
			key: "setHasDialogue",
			value: function setHasDialogue(bool /* bool */) {
				this.showDialogue = bool;
			}
		}, {
			key: "hasDialogue",
			value: function hasDialogue() {
				return this.showDialogue;
			}
		}, {
			key: "neededVideos",
			value: function neededVideos() {
				var _this = this;
	
				if (this.current.choice) {
					return this.current.choice.map(function (e) {
						return _this.scene(e.scene);
					});
				} else {
					return [this.scene(this.current.next)];
				}
			}
	
			//events for the scene
	
		}, {
			key: "onBefore",
			value: function onBefore(scene, fn) {
				if (this.exists(scene)) {
					this.scene(scene).onBefore = fn;
				}
			}
		}, {
			key: "offBefore",
			value: function offBefore(scene) {
				if (this.exists(scene)) {
					delete this.scene(scene).onBefore;
				}
			}
		}, {
			key: "onAfter",
			value: function onAfter(scene, fn) {
				if (this.exists(scene)) {
					this.scene(scene).onAfter = fn;
				}
			}
		}, {
			key: "offAfetr",
			value: function offAfetr(scene) {
				if (this.exists(scene)) {
					delete this.scene(scene).onAfter;
				}
			}
		}, {
			key: "switchTo",
			value: function switchTo(scene) {
				if (scene != null) {
					if (this.current.onAfter != null) {
						// calls onAfter just before switching the video
						this.current.onAfter();
					}
	
					this.current = this.scene(scene); // switch the video with the next one
	
					if (this.current.dialogue != null) {
						this.dialogue.select(this.current.dialogue);
						this.showDialogue = true;
					} else {
						this.showDialogue = false;
					}
	
					if (this.current.onBefore != null) {
						// call onBefore for the the next video
						this.current.onBefore();
					}
				}
			}
		}, {
			key: "next",
			value: function next(choice) {
				if (this.current.dialogue != null) {
					var scene = this.dialogue.next(choice);
					this.switchTo(scene);
				} else {
					this.switchTo(this.current.next);
				}
			}
		}]);
		return Story;
	}();

	exports.default = Story;

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _classCallCheck2 = __webpack_require__(6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(7);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _ramda = __webpack_require__(11);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var participants = ["Graphene", "Carbon"];
	
	var dialogue = [{
		name: "intro_dialog",
		array: [{ //loc: 0
			//say: "Loerm ipsum"
			who: "Карбон",
			say: "Кой си ти?",
			loc: 1
		}, { //loc: 1
			who: "Графен",
			say: "Аз съм материал създаден от един ред въглеродни атоми и имам уникални свойства!",
			loc: 2
		}, { //loc: 2
			who: "Карбон",
			say: "Хаха, за много по-полезен ли се мислиш?",
			loc: 3
		}, { //loc: 3
			who: "Графен",
			answer: [{ say: "Покажи свойствата си.", loc: 4 }, { say: "Опитай да решиш всичко с думи.", loc: 6 /* scene: "use_words" */ }, { say: "Игнорирай го.", loc: 9 }]
		}, { //loc: 4
			who: "Графен",
			say: "Да.",
			loc: 5
		}, { //loc: 5
			who: "Карбон",
			say: "Не мисля, че е възможно да имаш по-добри характеристики от моите.",
			loc: 13
		}, { //loc: 6
			who: "Графен",
			say: "Няма смисъл да спорим.",
			loc: 7
	
		}, { //loc: 7
			who: "Карбон",
			say: "Да прав си!",
			loc: 8
		}, { //loc: 8
			who: "Графен",
			answer: [{ say: "Остави го да говори.", loc: 16 }, { say: "Все пак му покажи възможностите си.", loc: 18 }]
		}, { //loc: 9
			who: "Карбон",
			say: "Защо ме игнорираш, да не ме имаш за много по-слаб?",
			loc: 10
		}, { //loc: 10
			who: "Карбон",
			say: "Сигурно те е страх, че не можеш да покажеш нищо кой знае какво!?",
			loc: 11
		}, { //loc: 11
			who: "Графен",
			say: "Не искам да навлизам в излишни конфликти.",
			loc: 12
		}, { //loc: 12
			who: "Карбон",
			say: "Така ли? Покажи ми какво можеш тогава.",
			loc: 13 //"conductivity"
		}, { //loc: 13
			who: "Графен",
			say: "С моята невероятната здравина от 1100 GPa, ще спра метеорита летящ към земята.", //"Сега не е времето за това!! Виж метеорит е на път да се разбие в земята, трябва да го спрем!!!",
			loc: 14
		}, { //loc: 14
			who: "Карбон",
			say: "Не ми трябваш, аз мога да се справя сам.",
			scene: "mech_force"
		}, { //loc: 15
			who: "Графен",
			say: "...",
			scene: "mech_force"
		}, { //loc: 16
			who: "Карбон",
			say: "Почуствах се застрашен. Не искам да повярвам, че има по-полезна вариация на въглерода от мен.",
			loc: 17
		}, { //loc: 17
			who: "Карбон",
			say: "Аз съм здрав, лек и всичко което някой би искал.",
			loc: 18
		}, { //loc: 18
			who: "Графен",
			say: "Ами да, но е факт, че аз съм по-електропроводим, здрав и с по-голяма енергийна плътност",
			loc: 19
		}, { //loc: 19
			who: "Карбон",
			say: "Разбира се!",
			loc: 20
		}, { //loc: 20
			who: "Графен",
			say: "Например благодарение на моята електропроводимост от\n 1738 siemens/m мога да заредя телефон за секунди!",
			scene: "conductivity_good"
		}, { //loc: 21
			who: "Графен",
			say: "С моята невероятната здравина от 1100 GPa ще спра метеорита летящ към земята!",
			loc: 13
		}]
	}, {
		name: "asteroid_dialog",
		array: [{ //loc: 0
			who: "Карбон",
			say: "Просто изкара късмет, че нямах време да направя стената по-голяма.",
			loc: 1
		}, {
			who: "Графен",
			say: "Дали? Или просто аз съм по-здравия?",
			loc: 2
		}, { //loc: 2
			who: "Карбон",
			say: "Да видим другите ти свойства тогава.",
			loc: 3
		}, { //loc: 3
			who: "Графен",
			say: "Както пожелаеш.",
			scene: "compete_hard"
		}]
	}, {
		name: "compete_hard_dialog",
		array: [{ //loc: 0
			who: "Карбон",
			say: "Чакам. ",
			loc: 1
		}, { //loc: 1
			who: "Графен",
			answer: [{ say: "Покажи - електропроводимост\n от 1738 siemens/m.", loc: 2 }, { say: "Покажи - енергийна плътност\n от 75 F/g и 31·9 Wh/kg.", loc: 3 }]
		}, { //loc: 2
			who: "Графен",
			say: "Ето виж!",
			scene: "conductivity"
		}, { //loc: 3
			who: "Графен",
			say: "A знаеше ли, че бaтерия и акумулатор, направена с моята помощ,\n издържа в пъти повече от нормална батерия?",
			scene: "electrical_density"
		}]
	}, {
		name: "good_dialog",
		array: [{ //loc: 0
			who: "Графен",
			say: "A също така, бaтерия и акумулатор, направена с моята помощ,\n издържа в пъти повече от нормална батерия.",
			scene: "electrical_density_good"
		}]
	}, {
		name: "ed_c_dialog",
		array: [{ //loc: 0
			who: "Графен",
			say: "А виж какво мога, благодарение на моята електропроводимост от 1738 siemens/m.",
			scene: "conductivity_2"
		}]
	}, {
		name: "c_c_dialog",
		array: [{ //loc: 0
			who: "Графен",
			say: "А виж какво мога, благодарение на моята енергийна плътност от 75 F/g и 31·9 Wh/kg.\n Заради нея, могат да се направят много по издържливи батерии и акумулатори.",
			scene: "electrical_density_2"
		}]
	}, {
		name: "ending_dialog_1",
		array: [{
			who: "Карбон",
			say: "Добре признавам, че си по-полезен в повечето ситуации!",
			scene: "end_true"
		}]
	}, {
		name: "ending_dialog_2",
		array: [{
			who: "Карбон",
			say: "Разбирам и признавам, че си по-полезен!",
			scene: "end_true"
		}]
	}];
	
	window.d = dialogue;
	
	var Dialogue = function () {
		function Dialogue() {
			(0, _classCallCheck3.default)(this, Dialogue);
	
			this.dialogue = dialogue;
		}
	
		(0, _createClass3.default)(Dialogue, [{
			key: "select",
			value: function select(name) {
				this.currentDialogue = _ramda2.default.find(_ramda2.default.propEq("name", name))(this.dialogue);
				this.currentPhrase = this.currentDialogue.array[0];
			}
		}, {
			key: "phrase",
			value: function phrase(loc) {
				return this.currentDialogue.array[loc];
			}
		}, {
			key: "choices",
			value: function choices() {
				return this.currentPhrase.answer.map(function (o) {
					return o.say;
				});
			}
		}, {
			key: "hasChoices",
			value: function hasChoices() {
				if (this.currentPhrase) {
					return this.currentPhrase.answer != null;
				}
				return false;
			}
		}, {
			key: "say",
			value: function say() {
				return this.currentPhrase;
			}
		}, {
			key: "hasNext",
			value: function hasNext() {
				return this.loc < this.currentDialogue.array.length() - 1;
			}
		}, {
			key: "next",
			value: function next(choice) {
				if (this.currentPhrase.answer) {
					if (arguments.length > 0) {
						if (choice <= this.currentPhrase.answer.length) {
							if (this.currentPhrase.answer[choice].scene) {
								return this.currentPhrase.answer[choice].scene;
							}
							this.loc = this.currentPhrase.answer[choice].loc;
							this.currentPhrase = this.phrase(this.currentPhrase.answer[choice].loc);
						} else {
							throw "This answer does not exists";
						}
					} else {
						throw "This transition to the next phrase requires an argument";
					}
				} else if (this.currentPhrase.loc) {
					this.loc = this.currentPhrase.loc;
					this.currentPhrase = this.phrase(this.currentPhrase.loc);
				} else if (this.currentPhrase.scene) {
					return this.currentPhrase.scene;
				}
	
				console.log(this.loc);
			}
		}]);
		return Dialogue;
	}();

	exports.default = Dialogue;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*! Kefir.js v3.2.1
	 *  https://github.com/rpominov/kefir
	 */
	
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.Kefir = global.Kefir || {})));
	}(this, function (exports) { 'use strict';
	
	  function createObj(proto) {
	    var F = function () {};
	    F.prototype = proto;
	    return new F();
	  }
	
	  function extend(target /*, mixin1, mixin2...*/) {
	    var length = arguments.length,
	        i = undefined,
	        prop = undefined;
	    for (i = 1; i < length; i++) {
	      for (prop in arguments[i]) {
	        target[prop] = arguments[i][prop];
	      }
	    }
	    return target;
	  }
	
	  function inherit(Child, Parent /*, mixin1, mixin2...*/) {
	    var length = arguments.length,
	        i = undefined;
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
	    var result = undefined,
	        length = undefined,
	        i = undefined,
	        j = undefined;
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
	        i = undefined;
	    for (i = 0; i < length; i++) {
	      if (arr[i] === value) {
	        return i;
	      }
	    }
	    return -1;
	  }
	
	  function findByPred(arr, pred) {
	    var length = arr.length,
	        i = undefined;
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
	        i = undefined;
	    for (i = 0; i < length; i++) {
	      result[i] = input[i];
	    }
	    return result;
	  }
	
	  function remove(input, index) {
	    var length = input.length,
	        result = undefined,
	        i = undefined,
	        j = undefined;
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
	        i = undefined;
	    for (i = 0; i < length; i++) {
	      result[i] = fn(input[i]);
	    }
	    return result;
	  }
	
	  function forEach(arr, fn) {
	    var length = arr.length,
	        i = undefined;
	    for (i = 0; i < length; i++) {
	      fn(arr[i]);
	    }
	  }
	
	  function fillArray(arr, value) {
	    var length = arr.length,
	        i = undefined;
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
	        i = undefined;
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
	
	
	      var isCurrent = undefined;
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
	    var sub = undefined,
	        unsub = undefined;
	
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
	
	  function symbol_ (key) {
	    if (typeof Symbol !== 'undefined' && Symbol[key]) {
	      return Symbol[key];
	    } else if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
	      return Symbol.for(key);
	    } else {
	      return '@@' + key;
	    }
	  }
	
	  var symbol = symbol_('observable');
	
	  function fromESObservable(_observable) {
	    var observable = _observable[symbol] ? _observable[symbol]() : _observable;
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
	      this._source.onAny(this._$handleAny); // copied from patterns/one-source
	      this._intervalId = setInterval(this._$onTick, this._wait);
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
	    var latestError = undefined;
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
	          i = undefined;
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
	  Observable.prototype[symbol_('observable')] = toESObservable;
	
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
	
	  function warn(msg) {
	    if (Kefir.DEPRECATION_WARNINGS !== false && console && typeof console.warn === 'function') {
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Atom = exports.LensedAtom = exports.AbstractMutable = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _kefir = __webpack_require__(13);
	
	var _kefir2 = _interopRequireDefault(_kefir);
	
	var _partial = __webpack_require__(15);
	
	var _partial2 = _interopRequireDefault(_partial);
	
	var _ramda = __webpack_require__(11);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	    value: function lens(l) {
	      for (var _len = arguments.length, ls = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        ls[_key - 1] = arguments[_key];
	      }
	
	      return new LensedAtom(this, ls.length === 0 ? l : _partial2.default.apply(undefined, [l].concat(ls)));
	    }
	  }, {
	    key: "view",
	    value: function view(l) {
	      for (var _len2 = arguments.length, ls = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        ls[_key2 - 1] = arguments[_key2];
	      }
	
	      return this.lens.apply(this, [l].concat(ls));
	    }
	  }, {
	    key: "_maybeEmitValue",
	    value: function _maybeEmitValue(next) {
	      var prev = this._currentEvent;
	      if (!prev || !_ramda2.default.equals(prev.value, next)) this._emitValue(next);
	    }
	  }]);
	
	  return AbstractMutable;
	}(_kefir2.default.Property);
	
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
	      return _partial2.default.view(this._lens, this._source.get());
	    }
	  }, {
	    key: "modify",
	    value: function modify(fn) {
	      this._source.modify(_partial2.default.over(this._lens, fn));
	    }
	  }, {
	    key: "_handleValue",
	    value: function _handleValue(context) {
	      this._maybeEmitValue(_partial2.default.view(this._lens, context));
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rZWZpci5hdG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFNYTs7Ozs7Ozs7Ozs7d0JBQ1AsT0FBTztBQUNULFdBQUssTUFBTCxDQUFZO2VBQU07T0FBTixDQUFaLENBRFM7Ozs7eUJBR04sR0FBVTt3Q0FBSjs7T0FBSTs7QUFDYixhQUFPLElBQUksVUFBSixDQUFlLElBQWYsRUFBcUIsR0FBRyxNQUFILEtBQWMsQ0FBZCxHQUFrQixDQUFsQixHQUFzQixvQ0FBRSxVQUFNLEdBQVIsQ0FBdEIsQ0FBNUIsQ0FEYTs7Ozt5QkFHVixHQUFVO3lDQUFKOztPQUFJOztBQUNiLGFBQU8sS0FBSyxJQUFMLGNBQVUsVUFBTSxHQUFoQixDQUFQLENBRGE7Ozs7b0NBR0MsTUFBTTtBQUNwQixVQUFNLE9BQU8sS0FBSyxhQUFMLENBRE87QUFFcEIsVUFBSSxDQUFDLElBQUQsSUFBUyxDQUFDLGdCQUFFLE1BQUYsQ0FBUyxLQUFLLEtBQUwsRUFBWSxJQUFyQixDQUFELEVBQ1gsS0FBSyxVQUFMLENBQWdCLElBQWhCLEVBREY7Ozs7U0FaUztFQUF3QixnQkFBTSxRQUFOOzs7O0lBbUJ4Qjs7O0FBQ1gsV0FEVyxVQUNYLENBQVksTUFBWixFQUFvQixJQUFwQixFQUEwQjswQkFEZixZQUNlOzt3RUFEZix3QkFDZTs7QUFFeEIsV0FBSyxPQUFMLEdBQWUsTUFBZixDQUZ3QjtBQUd4QixXQUFLLEtBQUwsR0FBYSxJQUFiLENBSHdCO0FBSXhCLFdBQUssYUFBTCxHQUFxQixJQUFyQixDQUp3Qjs7R0FBMUI7O2VBRFc7OzBCQU9MO0FBQ0osYUFBTyxrQkFBRSxJQUFGLENBQU8sS0FBSyxLQUFMLEVBQVksS0FBSyxPQUFMLENBQWEsR0FBYixFQUFuQixDQUFQLENBREk7Ozs7MkJBR0MsSUFBSTtBQUNULFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQUUsSUFBRixDQUFPLEtBQUssS0FBTCxFQUFZLEVBQW5CLENBQXBCLEVBRFM7Ozs7aUNBR0UsU0FBUztBQUNwQixXQUFLLGVBQUwsQ0FBcUIsa0JBQUUsSUFBRixDQUFPLEtBQUssS0FBTCxFQUFZLE9BQW5CLENBQXJCLEVBRG9COzs7O29DQUdOOzs7QUFDZCxVQUFNLGNBQWMsU0FBZCxXQUFjO2VBQVMsT0FBSyxZQUFMLENBQWtCLEtBQWxCO09BQVQsQ0FETjtBQUVkLFdBQUssYUFBTCxHQUFxQixXQUFyQixDQUZjO0FBR2QsV0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixXQUFyQixFQUhjOzs7O3NDQUtFO0FBQ2hCLFdBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsS0FBSyxhQUFMLENBQXRCLENBRGdCO0FBRWhCLFdBQUssYUFBTCxHQUFxQixJQUFyQixDQUZnQjtBQUdoQixXQUFLLGFBQUwsR0FBcUIsSUFBckIsQ0FIZ0I7Ozs7U0FyQlA7RUFBbUI7Ozs7SUE4Qm5COzs7QUFDWCxXQURXLElBQ1gsQ0FBWSxLQUFaLEVBQW1COzBCQURSLE1BQ1E7O3dFQURSLGtCQUNROztBQUVqQixXQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsRUFGaUI7O0dBQW5COztlQURXOzswQkFLTDtBQUNKLGFBQU8sS0FBSyxhQUFMLENBQW1CLEtBQW5CLENBREg7Ozs7MkJBR0MsSUFBSTtBQUNULFdBQUssZUFBTCxDQUFxQixHQUFHLEtBQUssR0FBTCxFQUFILENBQXJCLEVBRFM7Ozs7U0FSQTtFQUFhOzs7O2tCQWVYO1NBQVMsSUFBSSxJQUFKLENBQVMsS0FBVDtDQUFUIiwiZmlsZSI6ImtlZmlyLmF0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgS2VmaXIgZnJvbSBcImtlZmlyXCJcbmltcG9ydCBMICAgICBmcm9tIFwicGFydGlhbC5sZW5zZXNcIlxuaW1wb3J0IFIgICAgIGZyb20gXCJyYW1kYVwiXG5cbi8vXG5cbmV4cG9ydCBjbGFzcyBBYnN0cmFjdE11dGFibGUgZXh0ZW5kcyBLZWZpci5Qcm9wZXJ0eSB7XG4gIHNldCh2YWx1ZSkge1xuICAgIHRoaXMubW9kaWZ5KCgpID0+IHZhbHVlKVxuICB9XG4gIGxlbnMobCwgLi4ubHMpIHtcbiAgICByZXR1cm4gbmV3IExlbnNlZEF0b20odGhpcywgbHMubGVuZ3RoID09PSAwID8gbCA6IEwobCwgLi4ubHMpKVxuICB9XG4gIHZpZXcobCwgLi4ubHMpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5zKGwsIC4uLmxzKVxuICB9XG4gIF9tYXliZUVtaXRWYWx1ZShuZXh0KSB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX2N1cnJlbnRFdmVudFxuICAgIGlmICghcHJldiB8fCAhUi5lcXVhbHMocHJldi52YWx1ZSwgbmV4dCkpXG4gICAgICB0aGlzLl9lbWl0VmFsdWUobmV4dClcbiAgfVxufVxuXG4vL1xuXG5leHBvcnQgY2xhc3MgTGVuc2VkQXRvbSBleHRlbmRzIEFic3RyYWN0TXV0YWJsZSB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZSwgbGVucykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2VcbiAgICB0aGlzLl9sZW5zID0gbGVuc1xuICAgIHRoaXMuXyRoYW5kbGVWYWx1ZSA9IG51bGxcbiAgfVxuICBnZXQoKSB7XG4gICAgcmV0dXJuIEwudmlldyh0aGlzLl9sZW5zLCB0aGlzLl9zb3VyY2UuZ2V0KCkpXG4gIH1cbiAgbW9kaWZ5KGZuKSB7XG4gICAgdGhpcy5fc291cmNlLm1vZGlmeShMLm92ZXIodGhpcy5fbGVucywgZm4pKVxuICB9XG4gIF9oYW5kbGVWYWx1ZShjb250ZXh0KSB7XG4gICAgdGhpcy5fbWF5YmVFbWl0VmFsdWUoTC52aWV3KHRoaXMuX2xlbnMsIGNvbnRleHQpKVxuICB9XG4gIF9vbkFjdGl2YXRpb24oKSB7XG4gICAgY29uc3QgaGFuZGxlVmFsdWUgPSB2YWx1ZSA9PiB0aGlzLl9oYW5kbGVWYWx1ZSh2YWx1ZSlcbiAgICB0aGlzLl8kaGFuZGxlVmFsdWUgPSBoYW5kbGVWYWx1ZVxuICAgIHRoaXMuX3NvdXJjZS5vblZhbHVlKGhhbmRsZVZhbHVlKVxuICB9XG4gIF9vbkRlYWN0aXZhdGlvbigpIHtcbiAgICB0aGlzLl9zb3VyY2Uub2ZmVmFsdWUodGhpcy5fJGhhbmRsZVZhbHVlKVxuICAgIHRoaXMuXyRoYW5kbGVWYWx1ZSA9IG51bGxcbiAgICB0aGlzLl9jdXJyZW50RXZlbnQgPSBudWxsXG4gIH1cbn1cblxuLy9cblxuZXhwb3J0IGNsYXNzIEF0b20gZXh0ZW5kcyBBYnN0cmFjdE11dGFibGUge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLl9lbWl0VmFsdWUodmFsdWUpXG4gIH1cbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RXZlbnQudmFsdWVcbiAgfVxuICBtb2RpZnkoZm4pIHtcbiAgICB0aGlzLl9tYXliZUVtaXRWYWx1ZShmbih0aGlzLmdldCgpKSlcbiAgfVxufVxuXG4vL1xuXG5leHBvcnQgZGVmYXVsdCB2YWx1ZSA9PiBuZXcgQXRvbSh2YWx1ZSlcbiJdfQ==

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.lift = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _ramda = __webpack_require__(11);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	//
	
	var deleteKey = function deleteKey(k, o) {
	  if (o === undefined || !(k in o)) return o;
	  var r = undefined;
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
	  if (k in o && _ramda2.default.equals(v, o[k])) return o;
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
	
	var conserve = function conserve(c0, c1) {
	  return _ramda2.default.equals(c0, c1) ? c0 : c1;
	};
	
	var toConserve = function toConserve(f) {
	  return function (y, c0) {
	    return conserve(c0, f(y, c0));
	  };
	};
	
	//
	
	var lift = exports.lift = function lift(l) {
	  switch (typeof l === "undefined" ? "undefined" : _typeof(l)) {
	    case "string":
	      return L.prop(l);
	    case "number":
	      return L.index(l);
	    default:
	      return l;
	  }
	};
	
	var L = function L(l) {
	  for (var _len = arguments.length, ls = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    ls[_key - 1] = arguments[_key];
	  }
	
	  return ls.length === 0 ? lift(l) : _ramda2.default.compose.apply(_ramda2.default, [lift(l)].concat(_toConsumableArray(ls.map(lift))));
	};
	
	L.compose = L;
	L.delete = _ramda2.default.curry(function (l, s) {
	  return _ramda2.default.set(lift(l), undefined, s);
	});
	L.deleteAll = _ramda2.default.curry(function (lens, data) {
	  while (L.view(lens, data) !== undefined) {
	    data = L.delete(lens, data);
	  }return data;
	});
	L.lens = _ramda2.default.lens;
	L.over = _ramda2.default.curry(function (l, x2x, s) {
	  return _ramda2.default.over(lift(l), x2x, s);
	});
	L.set = _ramda2.default.curry(function (l, x, s) {
	  return _ramda2.default.set(lift(l), x, s);
	});
	L.view = _ramda2.default.curry(function (l, s) {
	  return _ramda2.default.view(lift(l), s);
	});
	
	L.choose = function (x2yL) {
	  return function (toFunctor) {
	    return function (target) {
	      var l = lift(x2yL(target));
	      return _ramda2.default.map(function (focus) {
	        return _ramda2.default.set(l, focus, target);
	      }, toFunctor(_ramda2.default.view(l, target)));
	    };
	  };
	};
	
	L.firstOf = function (l) {
	  for (var _len2 = arguments.length, ls = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    ls[_key2 - 1] = arguments[_key2];
	  }
	
	  return L.choose(function (x) {
	    var lls = [l].concat(ls);
	    return lls[Math.max(0, lls.findIndex(function (l) {
	      return L.view(l, x) !== undefined;
	    }))];
	  });
	};
	
	L.replace = _ramda2.default.curry(function (inn, out) {
	  return _ramda2.default.lens(function (x) {
	    return _ramda2.default.equals(x, inn) ? out : x;
	  }, toConserve(function (y) {
	    return _ramda2.default.equals(y, out) ? inn : y;
	  }));
	});
	
	L.default = L.replace(undefined);
	L.required = function (inn) {
	  return L.replace(inn, undefined);
	};
	L.define = function (v) {
	  return _ramda2.default.compose(L.required(v), L.default(v));
	};
	
	L.normalize = function (transform) {
	  return _ramda2.default.lens(toPartial(transform), toConserve(toPartial(transform)));
	};
	
	L.prop = function (k) {
	  return _ramda2.default.lens(function (o) {
	    return o && o[k];
	  }, function (v, o) {
	    return v === undefined ? deleteKey(k, o) : setKey(k, v, o);
	  });
	};
	
	L.find = function (predicate) {
	  return L.choose(function (xs) {
	    if (xs === undefined) return L.append;
	    var i = xs.findIndex(predicate);
	    return i < 0 ? L.append : i;
	  });
	};
	
	L.findWith = function (l) {
	  for (var _len3 = arguments.length, ls = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    ls[_key3 - 1] = arguments[_key3];
	  }
	
	  var lls = L.apply(undefined, [l].concat(ls));
	  return L(L.find(function (x) {
	    return L.view(lls, x) !== undefined;
	  }), lls);
	};
	
	L.index = function (i) {
	  return _ramda2.default.lens(function (xs) {
	    return xs && xs[i];
	  }, function (x, xs) {
	    if (x === undefined) {
	      if (xs === undefined) return undefined;
	      if (i < xs.length) return dropped(xs.slice(0, i).concat(xs.slice(i + 1)));
	      return xs;
	    } else {
	      if (xs === undefined) return Array(i).concat([x]);
	      if (xs.length <= i) return xs.concat(Array(i - xs.length), [x]);
	      if (_ramda2.default.equals(x, xs[i])) return xs;
	      return xs.slice(0, i).concat([x], xs.slice(i + 1));
	    }
	  });
	};
	
	L.append = _ramda2.default.lens(function () {}, function (x, xs) {
	  return x === undefined ? xs : xs === undefined ? [x] : xs.concat([x]);
	});
	
	L.filter = function (p) {
	  return _ramda2.default.lens(function (xs) {
	    return xs && xs.filter(p);
	  }, function (ys, xs) {
	    return conserve(xs, dropped(_ramda2.default.concat(ys || [], (xs || []).filter(_ramda2.default.complement(p)))));
	  });
	};
	
	L.augment = function (template) {
	  return _ramda2.default.lens(toPartial(function (x) {
	    var z = _extends({}, x);
	    for (var k in template) {
	      z[k] = template[k](x);
	    }return z;
	  }), toConserve(function (y, c) {
	    if (y === undefined) return undefined;
	    var z = undefined;
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
	
	exports.default = L;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJ0aWFsLmxlbnNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQzFCLE1BQUksTUFBTSxTQUFOLElBQW1CLEVBQUUsS0FBSyxDQUFMLENBQUYsRUFDckIsT0FBTyxDQUFQLENBREY7QUFFQSxNQUFJLGFBQUosQ0FIMEI7QUFJMUIsT0FBSyxJQUFNLENBQU4sSUFBVyxDQUFoQixFQUFtQjtBQUNqQixRQUFJLE1BQU0sQ0FBTixFQUFTO0FBQ1gsVUFBSSxjQUFjLENBQWQsRUFDRixJQUFJLEVBQUosQ0FERjtBQUVBLFFBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFQLENBSFc7S0FBYjtHQURGO0FBT0EsU0FBTyxDQUFQLENBWDBCO0NBQVY7O0FBY2xCLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBYTtBQUMxQixNQUFJLE1BQU0sU0FBTixFQUNGLDJCQUFTLEdBQUksRUFBYixDQURGO0FBRUEsTUFBSSxLQUFLLENBQUwsSUFBVSxnQkFBRSxNQUFGLENBQVMsQ0FBVCxFQUFZLEVBQUUsQ0FBRixDQUFaLENBQVYsRUFDRixPQUFPLENBQVAsQ0FERjtBQUVBLE1BQU0sd0JBQU0sR0FBSSxFQUFWLENBTG9CO0FBTTFCLE9BQUssSUFBTSxDQUFOLElBQVcsQ0FBaEI7QUFDRSxRQUFJLE1BQU0sQ0FBTixFQUNGLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFQLENBREY7R0FERixPQUdPLENBQVAsQ0FUMEI7Q0FBYjs7OztBQWNmLElBQU0sVUFBVSxTQUFWLE9BQVU7U0FBTSxPQUFPLElBQVAsQ0FBWSxFQUFaLEVBQWdCLE1BQWhCLEtBQTJCLENBQTNCLEdBQStCLFNBQS9CLEdBQTJDLEVBQTNDO0NBQU47Ozs7QUFJaEIsSUFBTSxZQUFZLFNBQVosU0FBWTtTQUFhO1dBQUssY0FBYyxDQUFkLEdBQWtCLENBQWxCLEdBQXNCLFVBQVUsQ0FBVixDQUF0QjtHQUFMO0NBQWI7Ozs7QUFJbEIsSUFBTSxXQUFXLFNBQVgsUUFBVyxDQUFDLEVBQUQsRUFBSyxFQUFMO1NBQVksZ0JBQUUsTUFBRixDQUFTLEVBQVQsRUFBYSxFQUFiLElBQW1CLEVBQW5CLEdBQXdCLEVBQXhCO0NBQVo7O0FBRWpCLElBQU0sYUFBYSxTQUFiLFVBQWE7U0FBSyxVQUFDLENBQUQsRUFBSSxFQUFKO1dBQVcsU0FBUyxFQUFULEVBQWEsRUFBRSxDQUFGLEVBQUssRUFBTCxDQUFiO0dBQVg7Q0FBTDs7OztBQUlaLElBQU0sc0JBQU8sU0FBUCxJQUFPLElBQUs7QUFDdkIsaUJBQWUsNENBQWY7QUFDQSxTQUFLLFFBQUw7QUFBZSxhQUFPLEVBQUUsSUFBRixDQUFPLENBQVAsQ0FBUCxDQUFmO0FBREEsU0FFSyxRQUFMO0FBQWUsYUFBTyxFQUFFLEtBQUYsQ0FBUSxDQUFSLENBQVAsQ0FBZjtBQUZBO0FBR2UsYUFBTyxDQUFQLENBQWY7QUFIQSxHQUR1QjtDQUFMOztBQVFwQixJQUFNLElBQUksU0FBSixDQUFJLENBQUMsQ0FBRDtvQ0FBTzs7OztTQUNmLEdBQUcsTUFBSCxLQUFjLENBQWQsR0FBa0IsS0FBSyxDQUFMLENBQWxCLEdBQTRCLGdCQUFFLE9BQUYseUJBQVUsS0FBSyxDQUFMLDZCQUFZLEdBQUcsR0FBSCxDQUFPLElBQVAsR0FBdEIsQ0FBNUI7Q0FEUTs7QUFHVixFQUFFLE9BQUYsR0FBWSxDQUFaO0FBQ0EsRUFBRSxNQUFGLEdBQVcsZ0JBQUUsS0FBRixDQUFRLFVBQUMsQ0FBRCxFQUFJLENBQUo7U0FBVSxnQkFBRSxHQUFGLENBQU0sS0FBSyxDQUFMLENBQU4sRUFBZSxTQUFmLEVBQTBCLENBQTFCO0NBQVYsQ0FBbkI7QUFDQSxFQUFFLFNBQUYsR0FBYyxnQkFBRSxLQUFGLENBQVEsVUFBQyxJQUFELEVBQU8sSUFBUCxFQUFnQjtBQUNwQyxTQUFPLEVBQUUsSUFBRixDQUFPLElBQVAsRUFBYSxJQUFiLE1BQXVCLFNBQXZCO0FBQ0wsV0FBTyxFQUFFLE1BQUYsQ0FBUyxJQUFULEVBQWUsSUFBZixDQUFQO0dBREYsT0FFTyxJQUFQLENBSG9DO0NBQWhCLENBQXRCO0FBS0EsRUFBRSxJQUFGLEdBQVMsZ0JBQUUsSUFBRjtBQUNULEVBQUUsSUFBRixHQUFTLGdCQUFFLEtBQUYsQ0FBUSxVQUFDLENBQUQsRUFBSSxHQUFKLEVBQVMsQ0FBVDtTQUFlLGdCQUFFLElBQUYsQ0FBTyxLQUFLLENBQUwsQ0FBUCxFQUFnQixHQUFoQixFQUFxQixDQUFyQjtDQUFmLENBQWpCO0FBQ0EsRUFBRSxHQUFGLEdBQVEsZ0JBQUUsS0FBRixDQUFRLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO1NBQWEsZ0JBQUUsR0FBRixDQUFNLEtBQUssQ0FBTCxDQUFOLEVBQWUsQ0FBZixFQUFrQixDQUFsQjtDQUFiLENBQWhCO0FBQ0EsRUFBRSxJQUFGLEdBQVMsZ0JBQUUsS0FBRixDQUFRLFVBQUMsQ0FBRCxFQUFJLENBQUo7U0FBVSxnQkFBRSxJQUFGLENBQU8sS0FBSyxDQUFMLENBQVAsRUFBZ0IsQ0FBaEI7Q0FBVixDQUFqQjs7QUFFQSxFQUFFLE1BQUYsR0FBVztTQUFRO1dBQWEsa0JBQVU7QUFDeEMsVUFBTSxJQUFJLEtBQUssS0FBSyxNQUFMLENBQUwsQ0FBSixDQURrQztBQUV4QyxhQUFPLGdCQUFFLEdBQUYsQ0FBTTtlQUFTLGdCQUFFLEdBQUYsQ0FBTSxDQUFOLEVBQVMsS0FBVCxFQUFnQixNQUFoQjtPQUFULEVBQWtDLFVBQVUsZ0JBQUUsSUFBRixDQUFPLENBQVAsRUFBVSxNQUFWLENBQVYsQ0FBeEMsQ0FBUCxDQUZ3QztLQUFWO0dBQWI7Q0FBUjs7QUFLWCxFQUFFLE9BQUYsR0FBWSxVQUFDLENBQUQ7cUNBQU87Ozs7U0FBTyxFQUFFLE1BQUYsQ0FBUyxhQUFLO0FBQ3RDLFFBQU0sT0FBTyxVQUFNLEdBQWIsQ0FEZ0M7QUFFdEMsV0FBTyxJQUFJLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxJQUFJLFNBQUosQ0FBYzthQUFLLEVBQUUsSUFBRixDQUFPLENBQVAsRUFBVSxDQUFWLE1BQWlCLFNBQWpCO0tBQUwsQ0FBMUIsQ0FBSixDQUFQLENBRnNDO0dBQUw7Q0FBdkI7O0FBS1osRUFBRSxPQUFGLEdBQVksZ0JBQUUsS0FBRixDQUFRLFVBQUMsR0FBRCxFQUFNLEdBQU47U0FDbEIsZ0JBQUUsSUFBRixDQUFPO1dBQUssZ0JBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFaLElBQW1CLEdBQW5CLEdBQXlCLENBQXpCO0dBQUwsRUFDQSxXQUFXO1dBQUssZ0JBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFaLElBQW1CLEdBQW5CLEdBQXlCLENBQXpCO0dBQUwsQ0FEbEI7Q0FEa0IsQ0FBcEI7O0FBSUEsRUFBRSxPQUFGLEdBQVksRUFBRSxPQUFGLENBQVUsU0FBVixDQUFaO0FBQ0EsRUFBRSxRQUFGLEdBQWE7U0FBTyxFQUFFLE9BQUYsQ0FBVSxHQUFWLEVBQWUsU0FBZjtDQUFQO0FBQ2IsRUFBRSxNQUFGLEdBQVc7U0FBSyxnQkFBRSxPQUFGLENBQVUsRUFBRSxRQUFGLENBQVcsQ0FBWCxDQUFWLEVBQXlCLEVBQUUsT0FBRixDQUFVLENBQVYsQ0FBekI7Q0FBTDs7QUFFWCxFQUFFLFNBQUYsR0FBYztTQUNaLGdCQUFFLElBQUYsQ0FBTyxVQUFVLFNBQVYsQ0FBUCxFQUE2QixXQUFXLFVBQVUsU0FBVixDQUFYLENBQTdCO0NBRFk7O0FBR2QsRUFBRSxJQUFGLEdBQVM7U0FDUCxnQkFBRSxJQUFGLENBQU87V0FBSyxLQUFLLEVBQUUsQ0FBRixDQUFMO0dBQUwsRUFDQSxVQUFDLENBQUQsRUFBSSxDQUFKO1dBQVUsTUFBTSxTQUFOLEdBQWtCLFVBQVUsQ0FBVixFQUFhLENBQWIsQ0FBbEIsR0FBb0MsT0FBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsQ0FBcEM7R0FBVjtDQUZBOztBQUlULEVBQUUsSUFBRixHQUFTO1NBQWEsRUFBRSxNQUFGLENBQVMsY0FBTTtBQUNuQyxRQUFJLE9BQU8sU0FBUCxFQUNGLE9BQU8sRUFBRSxNQUFGLENBRFQ7QUFFQSxRQUFNLElBQUksR0FBRyxTQUFILENBQWEsU0FBYixDQUFKLENBSDZCO0FBSW5DLFdBQU8sSUFBSSxDQUFKLEdBQVEsRUFBRSxNQUFGLEdBQVcsQ0FBbkIsQ0FKNEI7R0FBTjtDQUF0Qjs7QUFPVCxFQUFFLFFBQUYsR0FBYSxVQUFDLENBQUQsRUFBYztxQ0FBUDs7R0FBTzs7QUFDekIsTUFBTSxNQUFNLG9CQUFFLFVBQU0sR0FBUixDQUFOLENBRG1CO0FBRXpCLFNBQU8sRUFBRSxFQUFFLElBQUYsQ0FBTztXQUFLLEVBQUUsSUFBRixDQUFPLEdBQVAsRUFBWSxDQUFaLE1BQW1CLFNBQW5CO0dBQUwsQ0FBVCxFQUE2QyxHQUE3QyxDQUFQLENBRnlCO0NBQWQ7O0FBS2IsRUFBRSxLQUFGLEdBQVU7U0FBSyxnQkFBRSxJQUFGLENBQU87V0FBTSxNQUFNLEdBQUcsQ0FBSCxDQUFOO0dBQU4sRUFBbUIsVUFBQyxDQUFELEVBQUksRUFBSixFQUFXO0FBQ2xELFFBQUksTUFBTSxTQUFOLEVBQWlCO0FBQ25CLFVBQUksT0FBTyxTQUFQLEVBQ0YsT0FBTyxTQUFQLENBREY7QUFFQSxVQUFJLElBQUksR0FBRyxNQUFILEVBQ04sT0FBTyxRQUFRLEdBQUcsS0FBSCxDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsTUFBZixDQUFzQixHQUFHLEtBQUgsQ0FBUyxJQUFFLENBQUYsQ0FBL0IsQ0FBUixDQUFQLENBREY7QUFFQSxhQUFPLEVBQVAsQ0FMbUI7S0FBckIsTUFNTztBQUNMLFVBQUksT0FBTyxTQUFQLEVBQ0YsT0FBTyxNQUFNLENBQU4sRUFBUyxNQUFULENBQWdCLENBQUMsQ0FBRCxDQUFoQixDQUFQLENBREY7QUFFQSxVQUFJLEdBQUcsTUFBSCxJQUFhLENBQWIsRUFDRixPQUFPLEdBQUcsTUFBSCxDQUFVLE1BQU0sSUFBSSxHQUFHLE1BQUgsQ0FBcEIsRUFBZ0MsQ0FBQyxDQUFELENBQWhDLENBQVAsQ0FERjtBQUVBLFVBQUksZ0JBQUUsTUFBRixDQUFTLENBQVQsRUFBWSxHQUFHLENBQUgsQ0FBWixDQUFKLEVBQ0UsT0FBTyxFQUFQLENBREY7QUFFQSxhQUFPLEdBQUcsS0FBSCxDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsTUFBZixDQUFzQixDQUFDLENBQUQsQ0FBdEIsRUFBMkIsR0FBRyxLQUFILENBQVMsSUFBRSxDQUFGLENBQXBDLENBQVAsQ0FQSztLQU5QO0dBRHVDO0NBQS9COztBQWtCVixFQUFFLE1BQUYsR0FBVyxnQkFBRSxJQUFGLENBQU8sWUFBTSxFQUFOLEVBQVUsVUFBQyxDQUFELEVBQUksRUFBSjtTQUMxQixNQUFNLFNBQU4sR0FBa0IsRUFBbEIsR0FBdUIsT0FBTyxTQUFQLEdBQW1CLENBQUMsQ0FBRCxDQUFuQixHQUF5QixHQUFHLE1BQUgsQ0FBVSxDQUFDLENBQUQsQ0FBVixDQUF6QjtDQURHLENBQTVCOztBQUdBLEVBQUUsTUFBRixHQUFXO1NBQUssZ0JBQUUsSUFBRixDQUFPO1dBQU0sTUFBTSxHQUFHLE1BQUgsQ0FBVSxDQUFWLENBQU47R0FBTixFQUEwQixVQUFDLEVBQUQsRUFBSyxFQUFMO1dBQy9DLFNBQVMsRUFBVCxFQUFhLFFBQVEsZ0JBQUUsTUFBRixDQUFTLE1BQU0sRUFBTixFQUFVLENBQUMsTUFBTSxFQUFOLENBQUQsQ0FBVyxNQUFYLENBQWtCLGdCQUFFLFVBQUYsQ0FBYSxDQUFiLENBQWxCLENBQW5CLENBQVIsQ0FBYjtHQUQrQztDQUF0Qzs7QUFHWCxFQUFFLE9BQUYsR0FBWTtTQUFZLGdCQUFFLElBQUYsQ0FDdEIsVUFBVSxhQUFLO0FBQ2IsUUFBTSxpQkFBUSxFQUFSLENBRE87QUFFYixTQUFLLElBQU0sQ0FBTixJQUFXLFFBQWhCO0FBQ0UsUUFBRSxDQUFGLElBQU8sU0FBUyxDQUFULEVBQVksQ0FBWixDQUFQO0tBREYsT0FFTyxDQUFQLENBSmE7R0FBTCxDQURZLEVBT3RCLFdBQVcsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ25CLFFBQUksTUFBTSxTQUFOLEVBQ0YsT0FBTyxTQUFQLENBREY7QUFFQSxRQUFJLGFBQUosQ0FIbUI7QUFJbkIsUUFBTSxNQUFNLFNBQU4sR0FBTSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDcEIsVUFBSSxjQUFjLENBQWQsRUFDRixJQUFJLEVBQUosQ0FERjtBQUVBLFFBQUUsQ0FBRixJQUFPLENBQVAsQ0FIb0I7S0FBVixDQUpPO0FBU25CLFNBQUssSUFBTSxDQUFOLElBQVcsQ0FBaEIsRUFBbUI7QUFDakIsVUFBSSxFQUFFLEtBQUssUUFBTCxDQUFGLEVBQ0YsSUFBSSxDQUFKLEVBQU8sRUFBRSxDQUFGLENBQVAsRUFERixLQUdFLElBQUksS0FBSyxDQUFMLEVBQ0YsSUFBSSxDQUFKLEVBQU8sRUFBRSxDQUFGLENBQVAsRUFERjtLQUpKO0FBT0EsV0FBTyxDQUFQLENBaEJtQjtHQUFWLENBUFc7Q0FBWjs7a0JBMEJHIiwiZmlsZSI6InBhcnRpYWwubGVuc2VzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFIgZnJvbSBcInJhbWRhXCJcblxuLy9cblxuY29uc3QgZGVsZXRlS2V5ID0gKGssIG8pID0+IHtcbiAgaWYgKG8gPT09IHVuZGVmaW5lZCB8fCAhKGsgaW4gbykpXG4gICAgcmV0dXJuIG9cbiAgbGV0IHJcbiAgZm9yIChjb25zdCBwIGluIG8pIHtcbiAgICBpZiAocCAhPT0gaykge1xuICAgICAgaWYgKHVuZGVmaW5lZCA9PT0gcilcbiAgICAgICAgciA9IHt9XG4gICAgICByW3BdID0gb1twXVxuICAgIH1cbiAgfVxuICByZXR1cm4gclxufVxuXG5jb25zdCBzZXRLZXkgPSAoaywgdiwgbykgPT4ge1xuICBpZiAobyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiB7W2tdOiB2fVxuICBpZiAoayBpbiBvICYmIFIuZXF1YWxzKHYsIG9ba10pKVxuICAgIHJldHVybiBvXG4gIGNvbnN0IHIgPSB7W2tdOiB2fVxuICBmb3IgKGNvbnN0IHAgaW4gbylcbiAgICBpZiAocCAhPT0gaylcbiAgICAgIHJbcF0gPSBvW3BdXG4gIHJldHVybiByXG59XG5cbi8vXG5cbmNvbnN0IGRyb3BwZWQgPSB4cyA9PiBPYmplY3Qua2V5cyh4cykubGVuZ3RoID09PSAwID8gdW5kZWZpbmVkIDogeHNcblxuLy9cblxuY29uc3QgdG9QYXJ0aWFsID0gdHJhbnNmb3JtID0+IHggPT4gdW5kZWZpbmVkID09PSB4ID8geCA6IHRyYW5zZm9ybSh4KVxuXG4vL1xuXG5jb25zdCBjb25zZXJ2ZSA9IChjMCwgYzEpID0+IFIuZXF1YWxzKGMwLCBjMSkgPyBjMCA6IGMxXG5cbmNvbnN0IHRvQ29uc2VydmUgPSBmID0+ICh5LCBjMCkgPT4gY29uc2VydmUoYzAsIGYoeSwgYzApKVxuXG4vL1xuXG5leHBvcnQgY29uc3QgbGlmdCA9IGwgPT4ge1xuICBzd2l0Y2ggKHR5cGVvZiBsKSB7XG4gIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIEwucHJvcChsKVxuICBjYXNlIFwibnVtYmVyXCI6IHJldHVybiBMLmluZGV4KGwpXG4gIGRlZmF1bHQ6ICAgICAgIHJldHVybiBsXG4gIH1cbn1cblxuY29uc3QgTCA9IChsLCAuLi5scykgPT5cbiAgbHMubGVuZ3RoID09PSAwID8gbGlmdChsKSA6IFIuY29tcG9zZShsaWZ0KGwpLCAuLi5scy5tYXAobGlmdCkpXG5cbkwuY29tcG9zZSA9IExcbkwuZGVsZXRlID0gUi5jdXJyeSgobCwgcykgPT4gUi5zZXQobGlmdChsKSwgdW5kZWZpbmVkLCBzKSlcbkwuZGVsZXRlQWxsID0gUi5jdXJyeSgobGVucywgZGF0YSkgPT4ge1xuICB3aGlsZSAoTC52aWV3KGxlbnMsIGRhdGEpICE9PSB1bmRlZmluZWQpXG4gICAgZGF0YSA9IEwuZGVsZXRlKGxlbnMsIGRhdGEpXG4gIHJldHVybiBkYXRhXG59KVxuTC5sZW5zID0gUi5sZW5zXG5MLm92ZXIgPSBSLmN1cnJ5KChsLCB4MngsIHMpID0+IFIub3ZlcihsaWZ0KGwpLCB4MngsIHMpKVxuTC5zZXQgPSBSLmN1cnJ5KChsLCB4LCBzKSA9PiBSLnNldChsaWZ0KGwpLCB4LCBzKSlcbkwudmlldyA9IFIuY3VycnkoKGwsIHMpID0+IFIudmlldyhsaWZ0KGwpLCBzKSlcblxuTC5jaG9vc2UgPSB4MnlMID0+IHRvRnVuY3RvciA9PiB0YXJnZXQgPT4ge1xuICBjb25zdCBsID0gbGlmdCh4MnlMKHRhcmdldCkpXG4gIHJldHVybiBSLm1hcChmb2N1cyA9PiBSLnNldChsLCBmb2N1cywgdGFyZ2V0KSwgdG9GdW5jdG9yKFIudmlldyhsLCB0YXJnZXQpKSlcbn1cblxuTC5maXJzdE9mID0gKGwsIC4uLmxzKSA9PiBMLmNob29zZSh4ID0+IHtcbiAgY29uc3QgbGxzID0gW2wsIC4uLmxzXVxuICByZXR1cm4gbGxzW01hdGgubWF4KDAsIGxscy5maW5kSW5kZXgobCA9PiBMLnZpZXcobCwgeCkgIT09IHVuZGVmaW5lZCkpXVxufSlcblxuTC5yZXBsYWNlID0gUi5jdXJyeSgoaW5uLCBvdXQpID0+XG4gIFIubGVucyh4ID0+IFIuZXF1YWxzKHgsIGlubikgPyBvdXQgOiB4LFxuICAgICAgICAgdG9Db25zZXJ2ZSh5ID0+IFIuZXF1YWxzKHksIG91dCkgPyBpbm4gOiB5KSkpXG5cbkwuZGVmYXVsdCA9IEwucmVwbGFjZSh1bmRlZmluZWQpXG5MLnJlcXVpcmVkID0gaW5uID0+IEwucmVwbGFjZShpbm4sIHVuZGVmaW5lZClcbkwuZGVmaW5lID0gdiA9PiBSLmNvbXBvc2UoTC5yZXF1aXJlZCh2KSwgTC5kZWZhdWx0KHYpKVxuXG5MLm5vcm1hbGl6ZSA9IHRyYW5zZm9ybSA9PlxuICBSLmxlbnModG9QYXJ0aWFsKHRyYW5zZm9ybSksIHRvQ29uc2VydmUodG9QYXJ0aWFsKHRyYW5zZm9ybSkpKVxuXG5MLnByb3AgPSBrID0+XG4gIFIubGVucyhvID0+IG8gJiYgb1trXSxcbiAgICAgICAgICh2LCBvKSA9PiB2ID09PSB1bmRlZmluZWQgPyBkZWxldGVLZXkoaywgbykgOiBzZXRLZXkoaywgdiwgbykpXG5cbkwuZmluZCA9IHByZWRpY2F0ZSA9PiBMLmNob29zZSh4cyA9PiB7XG4gIGlmICh4cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBMLmFwcGVuZFxuICBjb25zdCBpID0geHMuZmluZEluZGV4KHByZWRpY2F0ZSlcbiAgcmV0dXJuIGkgPCAwID8gTC5hcHBlbmQgOiBpXG59KVxuXG5MLmZpbmRXaXRoID0gKGwsIC4uLmxzKSA9PiB7XG4gIGNvbnN0IGxscyA9IEwobCwgLi4ubHMpXG4gIHJldHVybiBMKEwuZmluZCh4ID0+IEwudmlldyhsbHMsIHgpICE9PSB1bmRlZmluZWQpLCBsbHMpXG59XG5cbkwuaW5kZXggPSBpID0+IFIubGVucyh4cyA9PiB4cyAmJiB4c1tpXSwgKHgsIHhzKSA9PiB7XG4gIGlmICh4ID09PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoeHMgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICBpZiAoaSA8IHhzLmxlbmd0aClcbiAgICAgIHJldHVybiBkcm9wcGVkKHhzLnNsaWNlKDAsIGkpLmNvbmNhdCh4cy5zbGljZShpKzEpKSlcbiAgICByZXR1cm4geHNcbiAgfSBlbHNlIHtcbiAgICBpZiAoeHMgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiBBcnJheShpKS5jb25jYXQoW3hdKVxuICAgIGlmICh4cy5sZW5ndGggPD0gaSlcbiAgICAgIHJldHVybiB4cy5jb25jYXQoQXJyYXkoaSAtIHhzLmxlbmd0aCksIFt4XSlcbiAgICBpZiAoUi5lcXVhbHMoeCwgeHNbaV0pKVxuICAgICAgcmV0dXJuIHhzXG4gICAgcmV0dXJuIHhzLnNsaWNlKDAsIGkpLmNvbmNhdChbeF0sIHhzLnNsaWNlKGkrMSkpXG4gIH1cbn0pXG5cbkwuYXBwZW5kID0gUi5sZW5zKCgpID0+IHt9LCAoeCwgeHMpID0+XG4gIHggPT09IHVuZGVmaW5lZCA/IHhzIDogeHMgPT09IHVuZGVmaW5lZCA/IFt4XSA6IHhzLmNvbmNhdChbeF0pKVxuXG5MLmZpbHRlciA9IHAgPT4gUi5sZW5zKHhzID0+IHhzICYmIHhzLmZpbHRlcihwKSwgKHlzLCB4cykgPT5cbiAgY29uc2VydmUoeHMsIGRyb3BwZWQoUi5jb25jYXQoeXMgfHwgW10sICh4cyB8fCBbXSkuZmlsdGVyKFIuY29tcGxlbWVudChwKSkpKSkpXG5cbkwuYXVnbWVudCA9IHRlbXBsYXRlID0+IFIubGVucyhcbiAgdG9QYXJ0aWFsKHggPT4ge1xuICAgIGNvbnN0IHogPSB7Li4ueH1cbiAgICBmb3IgKGNvbnN0IGsgaW4gdGVtcGxhdGUpXG4gICAgICB6W2tdID0gdGVtcGxhdGVba10oeClcbiAgICByZXR1cm4gelxuICB9KSxcbiAgdG9Db25zZXJ2ZSgoeSwgYykgPT4ge1xuICAgIGlmICh5ID09PSB1bmRlZmluZWQpXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IHpcbiAgICBjb25zdCBzZXQgPSAoaywgdikgPT4ge1xuICAgICAgaWYgKHVuZGVmaW5lZCA9PT0geilcbiAgICAgICAgeiA9IHt9XG4gICAgICB6W2tdID0gdlxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGsgaW4geSkge1xuICAgICAgaWYgKCEoayBpbiB0ZW1wbGF0ZSkpXG4gICAgICAgIHNldChrLCB5W2tdKVxuICAgICAgZWxzZVxuICAgICAgICBpZiAoayBpbiBjKVxuICAgICAgICAgIHNldChrLCBjW2tdKVxuICAgIH1cbiAgICByZXR1cm4gelxuICB9KSlcblxuZXhwb3J0IGRlZmF1bHQgTFxuIl19

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	(function () {
	  'use strict';
	
	  var ElementPrototype = Element.prototype;
	
	  /**
	   * Detect full support
	   */
	
	  var isSupported = ElementPrototype.after && ElementPrototype.append && ElementPrototype.before && ElementPrototype.prepend && ElementPrototype.remove && ElementPrototype.replace;
	
	  if (isSupported) {
	    return;
	  }
	
	  /**
	   * Apply mutation shims
	   */
	
	  function toNode(node) {
	    return typeof node === 'string' ? document.createTextNode(node) : node;
	  }
	
	  function mutationMacro(nodes) {
	    var fragment, i, len;
	    if (nodes) {
	      len = nodes.length;
	    }
	
	    if (!len) {
	      throw new Error('No node was specified (DOM Exception 8)');
	    }
	
	    if (len === 1) {
	      return toNode(nodes[0]);
	    } else {
	      fragment = document.createDocumentFragment();
	      for (i = 0; i < len; i++) {
	        fragment.appendChild(toNode(nodes[i]));
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
	  ElementPrototype['remove'] = function remove() {
	    var parentNode = this.parentNode;
	    if (parentNode) {
	      parentNode.removeChild(this);
	    }
	  };
	})();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./global.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./global.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, "body, html {\n\tmargin: 0px;\n\tbackground-color: black;\n    overflow: hidden;\n    height: 100%;\n}\n\ncanvas[resize] {\n    width: 100%;\n    height: 100%;\n}\n\nvideo {\n\twidth: 100%;\n}\n\n.draw {\n\tposition: absolute;\n\ttop: 0px;\n\tleft: 0px;\n}", ""]);
	
	// exports


/***/ }
]);
//# sourceMappingURL=main.bundle.js.map