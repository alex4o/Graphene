webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(457);

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a58fee717d107af8c4b9f75f48d68f67.jpg";

/***/ },

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(82)();
	// imports
	
	
	// module
	exports.push([module.id, "@font-face {\n\tfont-family:\"TeXGyreAdventor\";\n\tsrc:url(" + __webpack_require__(291) + ") format(\"woff\"),url(" + __webpack_require__(290) + ") format(\"truetype\");\n\tfont-weight:normal;\n\tfont-style:normal;\n}\n\n\nsection {\n\twidth: 100%;\n\theight: 100vh;\n\tdisplay: -webkit-box;\n\tdisplay: -webkit-flex;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n}\n\n.landing {\n\tbackground-image: url(" + __webpack_require__(84) + ");\n}\n\n#static > * {\n\tposition: fixed;\n}\n\n#static > .to-game {\n\tright: 20px;\n\ttop: 20px;\n\tborder-radius: 3px;\n\tpadding: 4px;\n\tfont-size: 1.5em;\n\tcolor: white;\n\t-webkit-transition:color 0.1s ;\n\ttransition: color 0.1s ;\n}\n\n#static > .to-game :hover {\n\tcolor: black;\n}\n\n#static > .to-game:before {\n\tcontent: \"\";\n\tposition: absolute;\n\tbackground: white;\n\tbottom: 0;\n\tleft: 0;\n\tright: 100%;\n\ttop: 0;\n\tz-index: -1;\n\t-webkit-transition:right 0.11s cubic-bezier(0, 0, 0.2, 1);\n\ttransition: right 0.11s cubic-bezier(0, 0, 0.2, 1);\n}\n\n#static > .to-game:hover:before {\n\tright: 0;\n}\n\n.landing {\n\t\n\n/*\t.button:before {\n\t\tcontent: \"\";\n\t\tposition: absolute;\n\t\tbackground: white;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\ttop: 100%;\n\t\tz-index: -1;\n\t\ttransition: top 0.09s ease-in;\n\t}\n\n\t.button:hover:before {\n\t\ttop: 0;\n\n\t} */\n\n}\n\n.landing h1, .landing h2{\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n\tcolor: white;\n}\n\n.landing h1 {\n\tfont-size: 4em;\n\tmargin: 0px;\n}\n\n.landing h2 {}\n\n.landing .button {\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: white 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: white;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\t-webkit-transition:background-color .4s, color .4s;\n\ttransition: background-color .4s, color .4s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n.landing .button:hover{\n\tbackground-color: #FFF;\n\tcolor: #000;\n}\n\n.landing .button-slide {\n\ttext-decoration: inherit;\n\tmargin: 10px;\n\tborder: white 3px solid;\n\tdisplay: inline-block;\n\twidth: 200px;\n\tcolor: white;\n\tpadding: 10px;\n\tbox-sizing: border-box;\n\tborder-radius: 2px;\n\tbackground: none;\n\tposition: relative;\n\tz-index: 1;\n\tbackground-image: -webkit-linear-gradient(white, white);\n\tbackground-image: linear-gradient(white, white);\n\tbackground-position: 50% 50%;\n\tbackground-size: 100% 0%;\n\tbackground-repeat: no-repeat;\n\t-webkit-transition:background-size .3s, color .3s;\n\ttransition: background-size .3s, color .3s;\n\tfont-family: TeXGyreAdventor,Verdana, sans-serif;\n}\n\n.landing .button-slide:hover{\n\tbackground-size: 100% 100%;\n\tcolor: #000;\n}\n\n.text {\n\tbackground-color: blue;\n}\n\nsection > .content {\n\t/*background-color: white;*/\n\tmargin: auto;\n\t-webkit-box-flex: 1;\n\t-webkit-flex: 1 1;\n\t    -ms-flex: 1 1;\n\t        flex: 1 1;\n\ttext-align: center;\n}\n\nbody {\n\twidth: 100%;\n\tmargin: 0px;\n\tpadding: 0px;\n}", ""]);
	
	// exports


/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3a18a6db9f9af0992340589c30592a82.ttf";

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "aa28063bb43c617cef178a26a2fe9d42.woff";

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(259);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(122)(content, {});
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

/***/ }

});
//# sourceMappingURL=main.bundle.js.map