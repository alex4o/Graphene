webpackJsonp([ 2 ], {
    0: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t) {
            var e = T["default"].clone(t), n = 10;
            return e.x -= n / 2, e.y -= n / 2, e.width += n, e.height += n, e;
        }
        function s(t) {
            for (var e = t.width - this.width, n = e / (this.list.length + 1), i = n, r = 0; r < this.list.length; r++) {
                var s = this.list[r];
                s.bounds.x = i, s.bounds.y = t.height - 75, i += s.bounds.width + n;
            }
        }
        function a(t) {
            return t.remove();
        }
        function o() {
            this.list.forEach(a), this.list = [], this.width = 0;
        }
        function u(t, e) {
            return function(n) {
                t[e] = n;
            };
        }
        function h(t) {
            j.visible = t, B.visible = t, q.visible = t, $.visible = t, W.visible = t, C["default"].view.draw(), 
            C["default"].view.update(!0);
        }
        function l() {
            window.next();
        }
        function c() {
            var t = L.choices();
            if (T["default"].isArrayLike(t)) R.create(t), R.calculate({
                height: window.innerHeight,
                width: window.innerWidth
            }), C["default"].view.draw(); else {
                q.content = t.who + ": " + t.say;
                var e = t.say.length, n = 0;
                n = 10 > e ? 5e3 : 200 * e, H = setTimeout(l, n);
            }
            C["default"].view.draw();
        }
        function f() {
            return window.next();
        }
        function d(t) {
            var e = L.current.video;
            return e == t ? e : (t && (console.log("Removeing: ", e), t.remove()), e.addEventListener("ended", f), 
            V.appendChild(e), e.play(), e);
        }
        function _(t) {
            return t.wheelDelta < 0 ? -Y : Y;
        }
        function g(t) {
            Z.modify(function(e) {
                var n = e + t;
                return 0 > n ? n = 0 : n > 1 && (n = 1), n;
            });
        }
        function p(t) {
            return new C["default"].Point(t.x, 2 * t.y - 100);
        }
        function v() {
            window.next();
        }
        var m = n(56), y = i(m), w = n(57), b = i(w), x = n(165), C = i(x), S = n(226), E = i(S), P = n(224), A = i(P), k = n(148), I = n(289), M = i(I), O = n(47), T = i(O);
        n(223), window.R = T["default"], window.p = C["default"], n(453), k.Kefir.Observable.prototype.pluck = function(t) {
            return this.map(T["default"].view(T["default"].lensProp(t)));
        };
        var z = function() {
            function t() {
                (0, y["default"])(this, t), this.list = [], this.width = 0;
            }
            return (0, b["default"])(t, [ {
                key: "create",
                value: function(t) {
                    var e = this;
                    this.remove(), this.list = t.map(function(t, n) {
                        var i = new C["default"].Group(), r = new C["default"].PointText({
                            content: t,
                            fillColor: "#AEE1F9",
                            fontFamily: "Verdana",
                            fontWeight: "bold",
                            fontSize: F,
                            justification: "left"
                        });
                        r.onClick = function() {
                            return window.next(n);
                        };
                        var s = U.clone();
                        return s.visible = !0, s.setBounds(e.calculateButtonSize(r.bounds)), i.addChild(s), 
                        i.addChild(r), e.width += i.getBounds().width, i;
                    });
                }
            }, {
                key: "calculateButtonSize",
                value: r
            }, {
                key: "calculate",
                value: s
            }, {
                key: "remove",
                value: o
            } ]), t;
        }(), L = new E["default"](), N = null, V = null, j = null, B = null, D = null, R = new z(), q = null, F = 18, $ = null, W = null, H = 0, U = null, Z = new M["default"](.5), G = !1;
        L.onBefore("end_true", function() {
            L.showDialogue = !1, G = !0, h(!1), j.visible = !0, q.visible = !0, j.setPosition(C["default"].view.center), 
            q.content = "А ти какво научи от всичко това?", C["default"].view.update(!0);
        }), L.onBefore("test", function() {
            window.location.href = "./test.html";
        });
        var X = k.Kefir.fromEvents(window, "resize").toProperty(function() {
            return null;
        }).map(function() {
            return {
                height: window.innerHeight,
                width: window.innerWidth
            };
        }), J = X.map(function() {
            return C["default"].view.center;
        }).toProperty(function() {
            return C["default"].view.center;
        });
        window.next = function(t) {
            clearTimeout(H), L.hasChoices() && null == t || (R.remove(), L.next(t), L.hasDialogue() ? (c(), 
            h(!0)) : G || h(!1), C["default"].view.update(!0), D = d(D), D.volume = Z.get(), 
            console.log(D));
        };
        var Y = .05;
        window.addEventListener("load", function() {
            console.log("Loading"), N = document.getElementById("drawSurf"), V = document.getElementById("container"), 
            k.Kefir.fromEvents(N, "mousewheel").map(_).onValue(g), C["default"].setup(N), j = new C["default"].Raster("./img/Graphene.png"), 
            B = new C["default"].Raster("./img/Carbon1.png"), j.scale(-1, 1), B.position.x = 100, 
            B.scale(.8, .8), j.scale(.8, .8), q = new C["default"].PointText({
                point: C["default"].view.center,
                fillColor: "white",
                fontFamily: "Verdana",
                fontWeight: "bold",
                fontSize: F,
                justification: "center"
            }), $ = new C["default"].PointText({
                point: C["default"].view.center,
                content: "Графен",
                fillColor: "white",
                fontFamily: "Verdana",
                fontWeight: "bold",
                fontSize: F,
                justification: "center"
            }), W = new C["default"].PointText({
                point: C["default"].view.center,
                content: "Карбон",
                fillColor: "white",
                fontFamily: "Verdana",
                fontWeight: "bold",
                fontSize: F,
                justification: "center"
            }), q.importSVG("./img/button.svg", function(t) {
                U = t, U.visible = !1;
            }), W.position.x = 100, X.onValue(function(t) {
                N.width = t.width, N.height = t.height, C["default"].view.setViewSize(t.width, t.height), 
                $.position.x = t.width - 100, j.position.x = t.width - 100, R.calculate(t);
                var e = C["default"].view.center;
                B.position.y = e.y - 100, j.position.y = e.y - 100, $.position.y = e.y + 200, W.position.y = e.y + 200, 
                C["default"].view.update(!0), C["default"].view.draw();
            }), J.map(p).onValue(u(q, "point")), C["default"].view.onMouseDown = v, D = d(), 
            h(!1);
            var t = new A["default"](Z.get());
            Z.onValue(function(e) {
                null != D && (D.volume = e), t.update(e);
            }), console.log("Loaded");
        }, !1);
    },
    47: function(t, e, n) {
        (function() {
            "use strict";
            var e = {
                "@@functional/placeholder": !0
            }, n = function(t, e) {
                switch (t) {
                  case 0:
                    return function() {
                        return e.apply(this, arguments);
                    };

                  case 1:
                    return function(t) {
                        return e.apply(this, arguments);
                    };

                  case 2:
                    return function(t, n) {
                        return e.apply(this, arguments);
                    };

                  case 3:
                    return function(t, n, i) {
                        return e.apply(this, arguments);
                    };

                  case 4:
                    return function(t, n, i, r) {
                        return e.apply(this, arguments);
                    };

                  case 5:
                    return function(t, n, i, r, s) {
                        return e.apply(this, arguments);
                    };

                  case 6:
                    return function(t, n, i, r, s, a) {
                        return e.apply(this, arguments);
                    };

                  case 7:
                    return function(t, n, i, r, s, a, o) {
                        return e.apply(this, arguments);
                    };

                  case 8:
                    return function(t, n, i, r, s, a, o, u) {
                        return e.apply(this, arguments);
                    };

                  case 9:
                    return function(t, n, i, r, s, a, o, u, h) {
                        return e.apply(this, arguments);
                    };

                  case 10:
                    return function(t, n, i, r, s, a, o, u, h, l) {
                        return e.apply(this, arguments);
                    };

                  default:
                    throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
                }
            }, i = function(t) {
                for (var e, n = []; !(e = t.next()).done; ) n.push(e.value);
                return n;
            }, r = function(t) {
                return new RegExp(t.source, (t.global ? "g" : "") + (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.sticky ? "y" : "") + (t.unicode ? "u" : ""));
            }, s = function(t) {
                return function() {
                    return !t.apply(this, arguments);
                };
            }, a = function(t, e) {
                t = t || [], e = e || [];
                var n, i = t.length, r = e.length, s = [];
                for (n = 0; i > n; ) s[s.length] = t[n], n += 1;
                for (n = 0; r > n; ) s[s.length] = e[n], n += 1;
                return s;
            }, o = function(t, e, n) {
                for (var i = 0, r = n.length; r > i; ) {
                    if (t(e, n[i])) return !0;
                    i += 1;
                }
                return !1;
            }, u = function(t, e) {
                for (var n = 0, i = e.length, r = []; i > n; ) t(e[n]) && (r[r.length] = e[n]), 
                n += 1;
                return r;
            }, h = function(t) {
                return {
                    "@@transducer/value": t,
                    "@@transducer/reduced": !0
                };
            }, l = function(t, e) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }, c = function(t) {
                return t;
            }, f = function() {
                var t = Object.prototype.toString;
                return "[object Arguments]" === t.call(arguments) ? function(e) {
                    return "[object Arguments]" === t.call(e);
                } : function(t) {
                    return l("callee", t);
                };
            }(), d = Array.isArray || function(t) {
                return null != t && t.length >= 0 && "[object Array]" === Object.prototype.toString.call(t);
            }, _ = Number.isInteger || function(t) {
                return t << 0 === t;
            }, g = function(t) {
                return "[object Number]" === Object.prototype.toString.call(t);
            }, p = function(t) {
                return "[object Object]" === Object.prototype.toString.call(t);
            }, v = function(t) {
                return null != t && "object" == typeof t && t["@@functional/placeholder"] === !0;
            }, m = function(t) {
                return "[object RegExp]" === Object.prototype.toString.call(t);
            }, y = function(t) {
                return "[object String]" === Object.prototype.toString.call(t);
            }, w = function(t) {
                return "function" == typeof t["@@transducer/step"];
            }, b = function(t, e) {
                for (var n = 0, i = e.length, r = Array(i); i > n; ) r[n] = t(e[n]), n += 1;
                return r;
            }, x = function(t) {
                return [ t ];
            }, C = function(t, e) {
                return function() {
                    return e.call(this, t.apply(this, arguments));
                };
            }, S = function(t, e) {
                return function() {
                    var n = this;
                    return t.apply(n, arguments).then(function(t) {
                        return e.call(n, t);
                    });
                };
            }, E = function(t) {
                var e = t.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
                return '"' + e.replace(/"/g, '\\"') + '"';
            }, P = function(t) {
                return t && t["@@transducer/reduced"] ? t : {
                    "@@transducer/value": t,
                    "@@transducer/reduced": !0
                };
            }, A = function Mr(t, e, n) {
                switch (arguments.length) {
                  case 1:
                    return Mr(t, 0, t.length);

                  case 2:
                    return Mr(t, e, t.length);

                  default:
                    for (var i = [], r = 0, s = Math.max(0, Math.min(t.length, n) - e); s > r; ) i[r] = t[e + r], 
                    r += 1;
                    return i;
                }
            }, k = function() {
                var t = function(t) {
                    return (10 > t ? "0" : "") + t;
                };
                return "function" == typeof Date.prototype.toISOString ? function(t) {
                    return t.toISOString();
                } : function(e) {
                    return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "." + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
                };
            }(), I = {
                init: function() {
                    return this.xf["@@transducer/init"]();
                },
                result: function(t) {
                    return this.xf["@@transducer/result"](t);
                }
            }, M = function() {
                function t(t) {
                    this.f = t;
                }
                return t.prototype["@@transducer/init"] = function() {
                    throw new Error("init not implemented on XWrap");
                }, t.prototype["@@transducer/result"] = function(t) {
                    return t;
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(t, e);
                }, function(e) {
                    return new t(e);
                };
            }(), O = function(t, e) {
                for (var n = 0, i = e.length - (t - 1), r = new Array(i >= 0 ? i : 0); i > n; ) r[n] = A(e, n, n + t), 
                n += 1;
                return r;
            }, T = function(t, e) {
                return function() {
                    var n = arguments.length;
                    if (0 === n) return e();
                    var i = arguments[n - 1];
                    return d(i) || "function" != typeof i[t] ? e.apply(this, arguments) : i[t].apply(i, A(arguments, 0, n - 1));
                };
            }, z = function(t) {
                return function e(n) {
                    return 0 === arguments.length || v(n) ? e : t.apply(this, arguments);
                };
            }, L = function(t) {
                return function e(n, i) {
                    switch (arguments.length) {
                      case 0:
                        return e;

                      case 1:
                        return v(n) ? e : z(function(e) {
                            return t(n, e);
                        });

                      default:
                        return v(n) && v(i) ? e : v(n) ? z(function(e) {
                            return t(e, i);
                        }) : v(i) ? z(function(e) {
                            return t(n, e);
                        }) : t(n, i);
                    }
                };
            }, N = function(t) {
                return function e(n, i, r) {
                    switch (arguments.length) {
                      case 0:
                        return e;

                      case 1:
                        return v(n) ? e : L(function(e, i) {
                            return t(n, e, i);
                        });

                      case 2:
                        return v(n) && v(i) ? e : v(n) ? L(function(e, n) {
                            return t(e, i, n);
                        }) : v(i) ? L(function(e, i) {
                            return t(n, e, i);
                        }) : z(function(e) {
                            return t(n, i, e);
                        });

                      default:
                        return v(n) && v(i) && v(r) ? e : v(n) && v(i) ? L(function(e, n) {
                            return t(e, n, r);
                        }) : v(n) && v(r) ? L(function(e, n) {
                            return t(e, i, n);
                        }) : v(i) && v(r) ? L(function(e, i) {
                            return t(n, e, i);
                        }) : v(n) ? z(function(e) {
                            return t(e, i, r);
                        }) : v(i) ? z(function(e) {
                            return t(n, e, r);
                        }) : v(r) ? z(function(e) {
                            return t(n, i, e);
                        }) : t(n, i, r);
                    }
                };
            }, V = function Or(t, e, i) {
                return function() {
                    for (var r = [], s = 0, a = t, o = 0; o < e.length || s < arguments.length; ) {
                        var u;
                        o < e.length && (!v(e[o]) || s >= arguments.length) ? u = e[o] : (u = arguments[s], 
                        s += 1), r[o] = u, v(u) || (a -= 1), o += 1;
                    }
                    return 0 >= a ? i.apply(this, r) : n(a, Or(t, r, i));
                };
            }, j = function(t, e, n) {
                return function() {
                    var i = arguments.length;
                    if (0 === i) return n();
                    var r = arguments[i - 1];
                    if (!d(r)) {
                        var s = A(arguments, 0, i - 1);
                        if ("function" == typeof r[t]) return r[t].apply(r, s);
                        if (w(r)) {
                            var a = e.apply(null, s);
                            return a(r);
                        }
                    }
                    return n.apply(this, arguments);
                };
            }, B = function(t, e) {
                for (var n = e.length - 1; n >= 0 && t(e[n]); ) n -= 1;
                return A(e, 0, n + 1);
            }, D = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.all = !0;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.all && (t = this.xf["@@transducer/step"](t, !0)), this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) || (this.all = !1, t = P(this.xf["@@transducer/step"](t, !1))), 
                    t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), R = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.any = !1;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.any || (t = this.xf["@@transducer/step"](t, !1)), this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) && (this.any = !0, t = P(this.xf["@@transducer/step"](t, !0))), 
                    t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), q = function() {
                function t(t, e) {
                    this.xf = e, this.pos = 0, this.full = !1, this.acc = new Array(t);
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.acc = null, this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.store(e), this.full ? this.xf["@@transducer/step"](t, this.getCopy()) : t;
                }, t.prototype.store = function(t) {
                    this.acc[this.pos] = t, this.pos += 1, this.pos === this.acc.length && (this.pos = 0, 
                    this.full = !0);
                }, t.prototype.getCopy = function() {
                    return a(A(this.acc, this.pos), A(this.acc, 0, this.pos));
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), F = function() {
                function t(t, e) {
                    this.xf = e, this.n = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    return this.n > 0 ? (this.n -= 1, t) : this.xf["@@transducer/step"](t, e);
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), $ = function() {
                function t(t, e) {
                    this.xf = e, this.pos = 0, this.full = !1, this.acc = new Array(t);
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.acc = null, this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.full && (t = this.xf["@@transducer/step"](t, this.acc[this.pos])), this.store(e), 
                    t;
                }, t.prototype.store = function(t) {
                    this.acc[this.pos] = t, this.pos += 1, this.pos === this.acc.length && (this.pos = 0, 
                    this.full = !0);
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), W = function() {
                function t(t, e) {
                    this.xf = e, this.pred = t, this.lastValue = void 0, this.seenFirstValue = !1;
                }
                return t.prototype["@@transducer/init"] = function() {
                    return this.xf["@@transducer/init"]();
                }, t.prototype["@@transducer/result"] = function(t) {
                    return this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    var n = !1;
                    return this.seenFirstValue ? this.pred(this.lastValue, e) && (n = !0) : this.seenFirstValue = !0, 
                    this.lastValue = e, n ? t : this.xf["@@transducer/step"](t, e);
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), H = function() {
                function t(t, e) {
                    this.xf = e, this.f = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    if (this.f) {
                        if (this.f(e)) return t;
                        this.f = null;
                    }
                    return this.xf["@@transducer/step"](t, e);
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), U = function() {
                function t(t, e) {
                    this.xf = e, this.f = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) ? this.xf["@@transducer/step"](t, e) : t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), Z = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.found = !1;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.found || (t = this.xf["@@transducer/step"](t, void 0)), this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) && (this.found = !0, t = P(this.xf["@@transducer/step"](t, e))), 
                    t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), G = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.idx = -1, this.found = !1;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.found || (t = this.xf["@@transducer/step"](t, -1)), this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.idx += 1, this.f(e) && (this.found = !0, t = P(this.xf["@@transducer/step"](t, this.idx))), 
                    t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), X = function() {
                function t(t, e) {
                    this.xf = e, this.f = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t, this.last));
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) && (this.last = e), t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), J = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.idx = -1, this.lastIdx = -1;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t, this.lastIdx));
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.idx += 1, this.f(e) && (this.lastIdx = this.idx), t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), Y = function() {
                function t(t, e) {
                    this.xf = e, this.f = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    return this.xf["@@transducer/step"](t, this.f(e));
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), K = function() {
                function t(t, e) {
                    this.xf = e, this.n = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    return 0 === this.n ? P(t) : (this.n -= 1, this.xf["@@transducer/step"](t, e));
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), Q = function() {
                function t(t, e) {
                    this.xf = e, this.f = t;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = I.result, 
                t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) ? this.xf["@@transducer/step"](t, e) : P(t);
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), tt = L(function(t, e) {
                return t + e;
            }), et = N(function(t, e, n) {
                if (e >= n.length || e < -n.length) return n;
                var i = 0 > e ? n.length : 0, r = i + e, s = a(n);
                return s[r] = t(n[r]), s;
            }), nt = L(j("all", D, function(t, e) {
                for (var n = 0; n < e.length; ) {
                    if (!t(e[n])) return !1;
                    n += 1;
                }
                return !0;
            })), it = z(function(t) {
                return function() {
                    return t;
                };
            }), rt = L(function(t, e) {
                return t && e;
            }), st = L(j("any", R, function(t, e) {
                for (var n = 0; n < e.length; ) {
                    if (t(e[n])) return !0;
                    n += 1;
                }
                return !1;
            })), at = L(j("aperture", q, O)), ot = L(function(t, e) {
                return a(e, [ t ]);
            }), ut = L(function(t, e) {
                return t.apply(this, e);
            }), ht = N(function(t, e, n) {
                var i = {};
                for (var r in n) i[r] = n[r];
                return i[t] = e, i;
            }), lt = N(function Tr(t, e, n) {
                switch (t.length) {
                  case 0:
                    return e;

                  case 1:
                    return ht(t[0], e, n);

                  default:
                    return ht(t[0], Tr(A(t, 1), e, Object(n[t[0]])), n);
                }
            }), ct = L(function(t, e) {
                return n(t.length, function() {
                    return t.apply(e, arguments);
                });
            }), ft = L(function(t, e) {
                return function() {
                    return t.apply(this, arguments) && e.apply(this, arguments);
                };
            }), dt = z(function(t) {
                return function(e, n) {
                    return t(e, n) ? -1 : t(n, e) ? 1 : 0;
                };
            }), _t = z(function(t) {
                return function() {
                    for (var e = 0; e < t.length; ) {
                        if (t[e][0].apply(this, arguments)) return t[e][1].apply(this, arguments);
                        e += 1;
                    }
                };
            }), gt = L(function(t, e) {
                for (var n = {}, i = e.length, r = 0; i > r; ) {
                    var s = t(e[r]);
                    n[s] = (l(s, n) ? n[s] : 0) + 1, r += 1;
                }
                return n;
            }), pt = L(function(t, e) {
                return 1 === t ? z(e) : n(t, V(t, [], e));
            }), vt = tt(-1), mt = L(function(t, e) {
                return null == e || e !== e ? t : e;
            }), yt = N(function(t, e, n) {
                for (var i = [], r = 0, s = e.length; s > r; ) o(t, e[r], n) || o(t, e[r], i) || i.push(e[r]), 
                r += 1;
                return i;
            }), wt = L(function(t, e) {
                var n = {};
                for (var i in e) i !== t && (n[i] = e[i]);
                return n;
            }), bt = L(function zr(t, e) {
                switch (t.length) {
                  case 0:
                    return e;

                  case 1:
                    return wt(t[0], e);

                  default:
                    var n = t[0], i = A(t, 1);
                    return null == e[n] ? e : ht(n, zr(i, e[n]), e);
                }
            }), xt = L(function(t, e) {
                return t / e;
            }), Ct = L(j("dropWhile", H, function(t, e) {
                for (var n = 0, i = e.length; i > n && t(e[n]); ) n += 1;
                return A(e, n);
            })), St = L(function(t, e) {
                return function() {
                    return t.apply(this, arguments) || e.apply(this, arguments);
                };
            }), Et = z(function(t) {
                return null != t && "function" == typeof t.empty ? t.empty() : null != t && null != t.constructor && "function" == typeof t.constructor.empty ? t.constructor.empty() : d(t) ? [] : y(t) ? "" : p(t) ? {} : f(t) ? function() {
                    return arguments;
                }() : void 0;
            }), Pt = L(function Lr(t, e) {
                var n, i, r, s = {};
                for (i in e) n = t[i], r = typeof n, s[i] = "function" === r ? n(e[i]) : "object" === r ? Lr(t[i], e[i]) : e[i];
                return s;
            }), At = L(j("find", Z, function(t, e) {
                for (var n = 0, i = e.length; i > n; ) {
                    if (t(e[n])) return e[n];
                    n += 1;
                }
            })), kt = L(j("findIndex", G, function(t, e) {
                for (var n = 0, i = e.length; i > n; ) {
                    if (t(e[n])) return n;
                    n += 1;
                }
                return -1;
            })), It = L(j("findLast", X, function(t, e) {
                for (var n = e.length - 1; n >= 0; ) {
                    if (t(e[n])) return e[n];
                    n -= 1;
                }
            })), Mt = L(j("findLastIndex", J, function(t, e) {
                for (var n = e.length - 1; n >= 0; ) {
                    if (t(e[n])) return n;
                    n -= 1;
                }
                return -1;
            })), Ot = L(T("forEach", function(t, e) {
                for (var n = e.length, i = 0; n > i; ) t(e[i]), i += 1;
                return e;
            })), Tt = z(function(t) {
                for (var e = 0, n = t.length, i = {}; n > e; ) d(t[e]) && t[e].length && (i[t[e][0]] = t[e][1]), 
                e += 1;
                return i;
            }), zt = L(function(t, e) {
                return t > e;
            }), Lt = L(function(t, e) {
                return t >= e;
            }), Nt = L(l), Vt = L(function(t, e) {
                return t in e;
            }), jt = L(function(t, e) {
                return t === e ? 0 !== t || 1 / t === 1 / e : t !== t && e !== e;
            }), Bt = z(c), Dt = N(function(t, e, n) {
                return pt(Math.max(t.length, e.length, n.length), function() {
                    return t.apply(this, arguments) ? e.apply(this, arguments) : n.apply(this, arguments);
                });
            }), Rt = tt(1), qt = N(function(t, e, n) {
                t = t < n.length && t >= 0 ? t : n.length;
                var i = A(n);
                return i.splice(t, 0, e), i;
            }), Ft = N(function(t, e, n) {
                return t = t < n.length && t >= 0 ? t : n.length, a(a(A(n, 0, t), e), A(n, t));
            }), $t = L(T("intersperse", function(t, e) {
                for (var n = [], i = 0, r = e.length; r > i; ) i === r - 1 ? n.push(e[i]) : n.push(e[i], t), 
                i += 1;
                return n;
            })), Wt = L(function(t, e) {
                return null != e && e.constructor === t || e instanceof t;
            }), Ht = z(function(t) {
                return d(t) ? !0 : t ? "object" != typeof t ? !1 : t instanceof String ? !1 : 1 === t.nodeType ? !!t.length : 0 === t.length ? !0 : t.length > 0 ? t.hasOwnProperty(0) && t.hasOwnProperty(t.length - 1) : !1 : !1;
            }), Ut = z(function(t) {
                return null == t;
            }), Zt = function() {
                var t = !{
                    toString: null
                }.propertyIsEnumerable("toString"), e = [ "constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ], n = function() {
                    return arguments.propertyIsEnumerable("length");
                }(), i = function(t, e) {
                    for (var n = 0; n < t.length; ) {
                        if (t[n] === e) return !0;
                        n += 1;
                    }
                    return !1;
                };
                return z("function" != typeof Object.keys || n ? function(r) {
                    if (Object(r) !== r) return [];
                    var s, a, o = [], u = n && f(r);
                    for (s in r) !l(s, r) || u && "length" === s || (o[o.length] = s);
                    if (t) for (a = e.length - 1; a >= 0; ) s = e[a], l(s, r) && !i(o, s) && (o[o.length] = s), 
                    a -= 1;
                    return o;
                } : function(t) {
                    return Object(t) !== t ? [] : Object.keys(t);
                });
            }(), Gt = z(function(t) {
                var e, n = [];
                for (e in t) n[n.length] = e;
                return n;
            }), Xt = z(function(t) {
                return null != t && Wt(Number, t.length) ? t.length : NaN;
            }), Jt = L(function(t, e) {
                return e > t;
            }), Yt = L(function(t, e) {
                return e >= t;
            }), Kt = N(function(t, e, n) {
                for (var i = 0, r = n.length, s = [], a = [ e ]; r > i; ) a = t(a[0], n[i]), s[i] = a[1], 
                i += 1;
                return [ a[0], s ];
            }), Qt = N(function(t, e, n) {
                for (var i = n.length - 1, r = [], s = [ e ]; i >= 0; ) s = t(s[0], n[i]), r[i] = s[1], 
                i -= 1;
                return [ s[0], r ];
            }), te = L(function(t, e) {
                return e.match(t) || [];
            }), ee = L(function(t, e) {
                return _(t) ? !_(e) || 1 > e ? NaN : (t % e + e) % e : NaN;
            }), ne = L(function(t, e) {
                return e > t ? e : t;
            }), ie = N(function(t, e, n) {
                return t(n) > t(e) ? n : e;
            }), re = N(function(t, e, n) {
                var i, r = {};
                for (i in e) l(i, e) && (r[i] = l(i, n) ? t(i, e[i], n[i]) : e[i]);
                for (i in n) l(i, n) && !l(i, r) && (r[i] = n[i]);
                return r;
            }), se = L(function(t, e) {
                return t > e ? e : t;
            }), ae = N(function(t, e, n) {
                return t(n) < t(e) ? n : e;
            }), oe = L(function(t, e) {
                return t % e;
            }), ue = L(function(t, e) {
                return t * e;
            }), he = L(function(t, e) {
                switch (t) {
                  case 0:
                    return function() {
                        return e.call(this);
                    };

                  case 1:
                    return function(t) {
                        return e.call(this, t);
                    };

                  case 2:
                    return function(t, n) {
                        return e.call(this, t, n);
                    };

                  case 3:
                    return function(t, n, i) {
                        return e.call(this, t, n, i);
                    };

                  case 4:
                    return function(t, n, i, r) {
                        return e.call(this, t, n, i, r);
                    };

                  case 5:
                    return function(t, n, i, r, s) {
                        return e.call(this, t, n, i, r, s);
                    };

                  case 6:
                    return function(t, n, i, r, s, a) {
                        return e.call(this, t, n, i, r, s, a);
                    };

                  case 7:
                    return function(t, n, i, r, s, a, o) {
                        return e.call(this, t, n, i, r, s, a, o);
                    };

                  case 8:
                    return function(t, n, i, r, s, a, o, u) {
                        return e.call(this, t, n, i, r, s, a, o, u);
                    };

                  case 9:
                    return function(t, n, i, r, s, a, o, u, h) {
                        return e.call(this, t, n, i, r, s, a, o, u, h);
                    };

                  case 10:
                    return function(t, n, i, r, s, a, o, u, h, l) {
                        return e.call(this, t, n, i, r, s, a, o, u, h, l);
                    };

                  default:
                    throw new Error("First argument to nAry must be a non-negative integer no greater than ten");
                }
            }), le = z(function(t) {
                return -t;
            }), ce = L(s(j("any", R, st))), fe = z(function(t) {
                return !t;
            }), de = L(function(t, e) {
                var n = 0 > t ? e.length + t : t;
                return y(e) ? e.charAt(n) : e[n];
            }), _e = z(function(t) {
                return function() {
                    return de(t, arguments);
                };
            }), ge = L(function(t, e) {
                var n = {};
                return n[t] = e, n;
            }), pe = z(x), ve = z(function(t) {
                var e, i = !1;
                return n(t.length, function() {
                    return i ? e : (i = !0, e = t.apply(this, arguments));
                });
            }), me = L(function(t, e) {
                return t || e;
            }), ye = function() {
                var t = function(e) {
                    return {
                        value: e,
                        map: function(n) {
                            return t(n(e));
                        }
                    };
                };
                return N(function(e, n, i) {
                    return e(function(e) {
                        return t(n(e));
                    })(i).value;
                });
            }(), we = L(function(t, e) {
                return [ t, e ];
            }), be = L(function(t, e) {
                for (var n = e, i = 0; i < t.length; ) {
                    if (null == n) return;
                    n = n[t[i]], i += 1;
                }
                return n;
            }), xe = N(function(t, e, n) {
                return mt(t, be(e, n));
            }), Ce = N(function(t, e, n) {
                return e.length > 0 && t(be(e, n));
            }), Se = L(function(t, e) {
                for (var n = {}, i = 0; i < t.length; ) t[i] in e && (n[t[i]] = e[t[i]]), i += 1;
                return n;
            }), Ee = L(function(t, e) {
                for (var n = {}, i = 0, r = t.length; r > i; ) {
                    var s = t[i];
                    n[s] = e[s], i += 1;
                }
                return n;
            }), Pe = L(function(t, e) {
                var n = {};
                for (var i in e) t(e[i], i, e) && (n[i] = e[i]);
                return n;
            }), Ae = L(function(t, e) {
                return a([ t ], e);
            }), ke = L(function(t, e) {
                return e[t];
            }), Ie = N(function(t, e, n) {
                return null != n && l(e, n) ? n[e] : t;
            }), Me = N(function(t, e, n) {
                return t(n[e]);
            }), Oe = L(function(t, e) {
                for (var n = t.length, i = [], r = 0; n > r; ) i[r] = e[t[r]], r += 1;
                return i;
            }), Te = L(function(t, e) {
                if (!g(t) || !g(e)) throw new TypeError("Both arguments to range must be numbers");
                for (var n = [], i = t; e > i; ) n.push(i), i += 1;
                return n;
            }), ze = N(function(t, e, n) {
                for (var i = n.length - 1; i >= 0; ) e = t(e, n[i]), i -= 1;
                return e;
            }), Le = z(P), Ne = N(function(t, e, n) {
                return a(A(n, 0, Math.min(t, n.length)), A(n, Math.min(n.length, t + e)));
            }), Ve = N(function(t, e, n) {
                return n.replace(t, e);
            }), je = z(function(t) {
                return y(t) ? t.split("").reverse().join("") : A(t).reverse();
            }), Be = N(function(t, e, n) {
                for (var i = 0, r = n.length, s = [ e ]; r > i; ) e = t(e, n[i]), s[i + 1] = e, 
                i += 1;
                return s;
            }), De = N(function(t, e, n) {
                return ye(t, it(e), n);
            }), Re = N(T("slice", function(t, e, n) {
                return Array.prototype.slice.call(n, t, e);
            })), qe = L(function(t, e) {
                return A(e).sort(t);
            }), Fe = L(function(t, e) {
                return A(e).sort(function(e, n) {
                    var i = t(e), r = t(n);
                    return r > i ? -1 : i > r ? 1 : 0;
                });
            }), $e = L(function(t, e) {
                return [ Re(0, t, e), Re(t, Xt(e), e) ];
            }), We = L(function(t, e) {
                if (0 >= t) throw new Error("First argument to splitEvery must be a positive integer");
                for (var n = [], i = 0; i < e.length; ) n.push(Re(i, i += t, e));
                return n;
            }), He = L(function(t, e) {
                for (var n = 0, i = e.length, r = []; i > n && !t(e[n]); ) r.push(e[n]), n += 1;
                return [ r, A(e, n) ];
            }), Ue = L(function(t, e) {
                return t - e;
            }), Ze = T("tail", Re(1, 1 / 0)), Ge = L(j("take", K, function(t, e) {
                return Re(0, 0 > t ? 1 / 0 : t, e);
            })), Xe = L(function(t, e) {
                for (var n = e.length - 1; n >= 0 && t(e[n]); ) n -= 1;
                return A(e, n + 1, 1 / 0);
            }), Je = L(j("takeWhile", Q, function(t, e) {
                for (var n = 0, i = e.length; i > n && t(e[n]); ) n += 1;
                return A(e, 0, n);
            })), Ye = L(function(t, e) {
                return t(e), e;
            }), Ke = L(function(t, e) {
                var n, i = Number(e), r = 0;
                if (0 > i || isNaN(i)) throw new RangeError("n must be a non-negative number");
                for (n = new Array(i); i > r; ) n[r] = t(r), r += 1;
                return n;
            }), Qe = z(function(t) {
                var e = [];
                for (var n in t) l(n, t) && (e[e.length] = [ n, t[n] ]);
                return e;
            }), tn = z(function(t) {
                var e = [];
                for (var n in t) e[e.length] = [ n, t[n] ];
                return e;
            }), en = z(function(t) {
                for (var e = 0, n = []; e < t.length; ) {
                    for (var i = t[e], r = 0; r < i.length; ) "undefined" == typeof n[r] && (n[r] = []), 
                    n[r].push(i[r]), r += 1;
                    e += 1;
                }
                return n;
            }), nn = function() {
                var t = "	\n\x0B\f\r   ᠎             　\u2028\u2029\ufeff", e = "​", n = "function" == typeof String.prototype.trim;
                return z(n && !t.trim() && e.trim() ? function(t) {
                    return t.trim();
                } : function(e) {
                    var n = new RegExp("^[" + t + "][" + t + "]*"), i = new RegExp("[" + t + "][" + t + "]*$");
                    return e.replace(n, "").replace(i, "");
                });
            }(), rn = z(function(t) {
                return null === t ? "Null" : void 0 === t ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
            }), sn = z(function(t) {
                return function() {
                    return t(A(arguments));
                };
            }), an = z(function(t) {
                return he(1, t);
            }), on = L(function(t, e) {
                return pt(t, function() {
                    for (var n, i = 1, r = e, s = 0; t >= i && "function" == typeof r; ) n = i === t ? arguments.length : s + r.length, 
                    r = r.apply(this, A(arguments, s, n)), i += 1, s = n;
                    return r;
                });
            }), un = L(function(t, e) {
                for (var n = t(e), i = []; n && n.length; ) i[i.length] = n[0], n = t(n[1]);
                return i;
            }), hn = L(function(t, e) {
                for (var n, i = 0, r = e.length, s = []; r > i; ) n = e[i], o(t, n, s) || (s[s.length] = n), 
                i += 1;
                return s;
            }), ln = N(function(t, e, n) {
                return t(n) ? n : e(n);
            }), cn = N(function(t, e, n) {
                return et(it(e), t, n);
            }), fn = L(function(t, e) {
                return pt(e.length, function() {
                    for (var n = [], i = 0; i < e.length; ) n.push(e[i].call(this, arguments[i])), i += 1;
                    return t.apply(this, n.concat(A(arguments, e.length)));
                });
            }), dn = z(function(t) {
                for (var e = Zt(t), n = e.length, i = [], r = 0; n > r; ) i[r] = t[e[r]], r += 1;
                return i;
            }), _n = z(function(t) {
                var e, n = [];
                for (e in t) n[n.length] = t[e];
                return n;
            }), gn = function() {
                var t = function(t) {
                    return {
                        value: t,
                        map: function() {
                            return this;
                        }
                    };
                };
                return L(function(e, n) {
                    return e(t)(n).value;
                });
            }(), pn = N(function(t, e, n) {
                return t(n) ? e(n) : n;
            }), vn = L(function(t, e) {
                for (var n in t) if (l(n, t) && !t[n](e[n])) return !1;
                return !0;
            }), mn = L(function(t, e) {
                return pt(t.length, function() {
                    return e.apply(this, a([ t ], arguments));
                });
            }), yn = L(function(t, e) {
                for (var n, i = 0, r = t.length, s = e.length, a = []; r > i; ) {
                    for (n = 0; s > n; ) a[a.length] = [ t[i], e[n] ], n += 1;
                    i += 1;
                }
                return a;
            }), wn = L(function(t, e) {
                for (var n = [], i = 0, r = Math.min(t.length, e.length); r > i; ) n[i] = [ t[i], e[i] ], 
                i += 1;
                return n;
            }), bn = L(function(t, e) {
                for (var n = 0, i = t.length, r = {}; i > n; ) r[t[n]] = e[n], n += 1;
                return r;
            }), xn = N(function(t, e, n) {
                for (var i = [], r = 0, s = Math.min(e.length, n.length); s > r; ) i[r] = t(e[r], n[r]), 
                r += 1;
                return i;
            }), Cn = it(!1), Sn = it(!0), En = function Nr(t, e, n) {
                var i = function(i) {
                    for (var r = e.length, s = 0; r > s; ) {
                        if (t === e[s]) return n[s];
                        s += 1;
                    }
                    e[s + 1] = t, n[s + 1] = i;
                    for (var a in t) i[a] = Nr(t[a], e, n);
                    return i;
                };
                switch (rn(t)) {
                  case "Object":
                    return i({});

                  case "Array":
                    return i([]);

                  case "Date":
                    return new Date(t.valueOf());

                  case "RegExp":
                    return r(t);

                  default:
                    return t;
                }
            }, Pn = function(t) {
                return L(function(e, i) {
                    return n(Math.max(0, e.length - i.length), function() {
                        return e.apply(this, t(i, arguments));
                    });
                });
            }, An = function(t, e) {
                return Ge(t < e.length ? e.length - t : 0, e);
            }, kn = function Vr(t, e, n, r) {
                if (jt(t, e)) return !0;
                if (rn(t) !== rn(e)) return !1;
                if (null == t || null == e) return !1;
                if ("function" == typeof t.equals || "function" == typeof e.equals) return "function" == typeof t.equals && t.equals(e) && "function" == typeof e.equals && e.equals(t);
                switch (rn(t)) {
                  case "Arguments":
                  case "Array":
                  case "Object":
                    break;

                  case "Boolean":
                  case "Number":
                  case "String":
                    if (typeof t != typeof e || !jt(t.valueOf(), e.valueOf())) return !1;
                    break;

                  case "Date":
                    if (!jt(t.valueOf(), e.valueOf())) return !1;
                    break;

                  case "Error":
                    return t.name === e.name && t.message === e.message;

                  case "RegExp":
                    if (t.source !== e.source || t.global !== e.global || t.ignoreCase !== e.ignoreCase || t.multiline !== e.multiline || t.sticky !== e.sticky || t.unicode !== e.unicode) return !1;
                    break;

                  case "Map":
                  case "Set":
                    if (!Vr(i(t.entries()), i(e.entries()), n, r)) return !1;
                    break;

                  case "Int8Array":
                  case "Uint8Array":
                  case "Uint8ClampedArray":
                  case "Int16Array":
                  case "Uint16Array":
                  case "Int32Array":
                  case "Uint32Array":
                  case "Float32Array":
                  case "Float64Array":
                    break;

                  case "ArrayBuffer":
                    break;

                  default:
                    return !1;
                }
                var s = Zt(t);
                if (s.length !== Zt(e).length) return !1;
                for (var a = n.length - 1; a >= 0; ) {
                    if (n[a] === t) return r[a] === e;
                    a -= 1;
                }
                for (n.push(t), r.push(e), a = s.length - 1; a >= 0; ) {
                    var o = s[a];
                    if (!l(o, e) || !Vr(e[o], t[o], n, r)) return !1;
                    a -= 1;
                }
                return n.pop(), r.pop(), !0;
            }, In = function(t) {
                return function e(n) {
                    for (var i, r, s, a = [], o = 0, u = n.length; u > o; ) {
                        if (Ht(n[o])) for (i = t ? e(n[o]) : n[o], s = 0, r = i.length; r > s; ) a[a.length] = i[s], 
                        s += 1; else a[a.length] = n[o];
                        o += 1;
                    }
                    return a;
                };
            }, Mn = function() {
                function t(t, e, n) {
                    for (var i = 0, r = n.length; r > i; ) {
                        if (e = t["@@transducer/step"](e, n[i]), e && e["@@transducer/reduced"]) {
                            e = e["@@transducer/value"];
                            break;
                        }
                        i += 1;
                    }
                    return t["@@transducer/result"](e);
                }
                function e(t, e, n) {
                    for (var i = n.next(); !i.done; ) {
                        if (e = t["@@transducer/step"](e, i.value), e && e["@@transducer/reduced"]) {
                            e = e["@@transducer/value"];
                            break;
                        }
                        i = n.next();
                    }
                    return t["@@transducer/result"](e);
                }
                function n(t, e, n) {
                    return t["@@transducer/result"](n.reduce(ct(t["@@transducer/step"], t), e));
                }
                var i = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator";
                return function(r, s, a) {
                    if ("function" == typeof r && (r = M(r)), Ht(a)) return t(r, s, a);
                    if ("function" == typeof a.reduce) return n(r, s, a);
                    if (null != a[i]) return e(r, s, a[i]());
                    if ("function" == typeof a.next) return e(r, s, a);
                    throw new TypeError("reduce: list must be array or iterable");
                };
            }(), On = function() {
                function t(t, e) {
                    this.f = t, this.retained = [], this.xf = e;
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    return this.retained = null, this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    return this.f(e) ? this.retain(t, e) : this.flush(t, e);
                }, t.prototype.flush = function(t, e) {
                    return t = Mn(this.xf["@@transducer/step"], t, this.retained), this.retained = [], 
                    this.xf["@@transducer/step"](t, e);
                }, t.prototype.retain = function(t, e) {
                    return this.retained.push(e), t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), Tn = function() {
                function t(t, e) {
                    this.xf = e, this.f = t, this.inputs = {};
                }
                return t.prototype["@@transducer/init"] = I.init, t.prototype["@@transducer/result"] = function(t) {
                    var e;
                    for (e in this.inputs) if (l(e, this.inputs) && (t = this.xf["@@transducer/step"](t, this.inputs[e]), 
                    t["@@transducer/reduced"])) {
                        t = t["@@transducer/value"];
                        break;
                    }
                    return this.inputs = null, this.xf["@@transducer/result"](t);
                }, t.prototype["@@transducer/step"] = function(t, e) {
                    var n = this.f(e);
                    return this.inputs[n] = this.inputs[n] || [ n, [] ], this.inputs[n][1] = ot(e, this.inputs[n][1]), 
                    t;
                }, L(function(e, n) {
                    return new t(e, n);
                });
            }(), zn = z(function(t) {
                return pt(t.length, function() {
                    var e = 0, n = arguments[0], i = arguments[arguments.length - 1], r = A(arguments);
                    return r[0] = function() {
                        var t = n.apply(this, a(arguments, [ e, i ]));
                        return e += 1, t;
                    }, t.apply(this, r);
                });
            }), Ln = z(function(t) {
                return he(2, t);
            }), Nn = z(function(t) {
                return null != t && "function" == typeof t.clone ? t.clone() : En(t, [], []);
            }), Vn = z(function(t) {
                return pt(t.length, t);
            }), jn = L(j("drop", F, function(t, e) {
                return Re(Math.max(0, t), 1 / 0, e);
            })), Bn = L(j("dropLast", $, An)), Dn = L(j("dropLastWhile", On, B)), Rn = L(function(t, e) {
                return kn(t, e, [], []);
            }), qn = L(j("filter", U, function(t, e) {
                return p(e) ? Mn(function(n, i) {
                    return t(e[i]) && (n[i] = e[i]), n;
                }, {}, Zt(e)) : u(t, e);
            })), Fn = z(In(!0)), $n = z(function(t) {
                return Vn(function(e, n) {
                    var i = A(arguments);
                    return i[0] = n, i[1] = e, t.apply(this, i);
                });
            }), Wn = L(j("groupBy", Tn, function(t, e) {
                return Mn(function(e, n) {
                    var i = t(n);
                    return e[i] = ot(n, e[i] || (e[i] = [])), e;
                }, {}, e);
            })), Hn = de(0), Un = L(function(t, e) {
                return Mn(function(e, n) {
                    var i = t(n);
                    return e[i] = n, e;
                }, {}, e);
            }), Zn = Re(0, -1), Gn = N(function(t, e, n) {
                for (var i = [], r = 0; r < e.length; ) o(t, e[r], n) && (i[i.length] = e[r]), r += 1;
                return hn(t, i);
            }), Xn = z(function(t) {
                for (var e = Zt(t), n = e.length, i = 0, r = {}; n > i; ) {
                    var s = e[i], a = t[s], o = l(a, r) ? r[a] : r[a] = [];
                    o[o.length] = s, i += 1;
                }
                return r;
            }), Jn = z(function(t) {
                for (var e = Zt(t), n = e.length, i = 0, r = {}; n > i; ) {
                    var s = e[i];
                    r[t[s]] = s, i += 1;
                }
                return r;
            }), Yn = z(function(t) {
                return null != t && Rn(t, Et(t));
            }), Kn = de(-1), Qn = L(function(t, e) {
                if ("function" != typeof e.lastIndexOf || d(e)) {
                    for (var n = e.length - 1; n >= 0; ) {
                        if (Rn(e[n], t)) return n;
                        n -= 1;
                    }
                    return -1;
                }
                return e.lastIndexOf(t);
            }), ti = L(j("map", Y, function(t, e) {
                switch (Object.prototype.toString.call(e)) {
                  case "[object Function]":
                    return pt(e.length, function() {
                        return t.call(this, e.apply(this, arguments));
                    });

                  case "[object Object]":
                    return Mn(function(n, i) {
                        return n[i] = t(e[i]), n;
                    }, {}, Zt(e));

                  default:
                    return b(t, e);
                }
            })), ei = L(function(t, e) {
                return Mn(function(n, i) {
                    return n[i] = t(e[i], i, e), n;
                }, {}, Zt(e));
            }), ni = N(function(t, e, n) {
                return re(function(e, n, i) {
                    return t(n, i);
                }, e, n);
            }), ii = Pn(a), ri = Pn($n(a)), si = L(function(t, e) {
                return Mn(function(e, n) {
                    var i = e[t(n) ? 0 : 1];
                    return i[i.length] = n, e;
                }, [ [], [] ], e);
            }), ai = N(function(t, e, n) {
                return Rn(be(t, n), e);
            }), oi = L(function(t, e) {
                return ti(ke(t), e);
            }), ui = fn(b, [ Ee, Bt ]), hi = N(function(t, e, n) {
                return Me(Rn(e), t, n);
            }), li = N(function(t, e, n) {
                return Me(Wt(t), e, n);
            }), ci = N(Mn), fi = L(function(t, e) {
                return qn(s(t), e);
            }), di = L(function(t, e) {
                return Ke(it(t), e);
            }), _i = ci(tt, 0), gi = L(function(t, e) {
                return jn(t >= 0 ? e.length - t : 0, e);
            }), pi = pt(4, function(t, e, n, i) {
                return Mn(t("function" == typeof e ? M(e) : e), n, i);
            }), vi = N(function(t, e, n) {
                return hn(t, a(e, n));
            }), mi = L(function(t, e) {
                return vn(ti(Rn, t), e);
            }), yi = function() {
                var t = function(t) {
                    return {
                        "@@transducer/init": I.init,
                        "@@transducer/result": function(e) {
                            return t["@@transducer/result"](e);
                        },
                        "@@transducer/step": function(e, n) {
                            var i = t["@@transducer/step"](e, n);
                            return i["@@transducer/reduced"] ? h(i) : i;
                        }
                    };
                };
                return function(e) {
                    var n = t(e);
                    return {
                        "@@transducer/init": I.init,
                        "@@transducer/result": function(t) {
                            return n["@@transducer/result"](t);
                        },
                        "@@transducer/step": function(t, e) {
                            return Ht(e) ? Mn(n, t, e) : Mn(n, t, [ e ]);
                        }
                    };
                };
            }(), wi = function(t, e, n) {
                var i, r;
                if ("function" == typeof t.indexOf) switch (typeof e) {
                  case "number":
                    if (0 === e) {
                        for (i = 1 / e; n < t.length; ) {
                            if (r = t[n], 0 === r && 1 / r === i) return n;
                            n += 1;
                        }
                        return -1;
                    }
                    if (e !== e) {
                        for (;n < t.length; ) {
                            if (r = t[n], "number" == typeof r && r !== r) return n;
                            n += 1;
                        }
                        return -1;
                    }
                    return t.indexOf(e, n);

                  case "string":
                  case "boolean":
                  case "function":
                  case "undefined":
                    return t.indexOf(e, n);

                  case "object":
                    if (null === e) return t.indexOf(e, n);
                }
                for (;n < t.length; ) {
                    if (Rn(t[n], e)) return n;
                    n += 1;
                }
                return -1;
            }, bi = L(function(t, e) {
                return ti(t, yi(e));
            }), xi = z(function(t) {
                return pt(ci(ne, 0, oi("length", t)), function() {
                    for (var e = 0, n = t.length; n > e; ) {
                        if (!t[e].apply(this, arguments)) return !1;
                        e += 1;
                    }
                    return !0;
                });
            }), Ci = z(function(t) {
                for (var e = t.length, n = 0; e > n; ) {
                    if (wi(t, t[n], n + 1) >= 0) return !1;
                    n += 1;
                }
                return !0;
            }), Si = z(function(t) {
                return pt(ci(ne, 0, oi("length", t)), function() {
                    for (var e = 0, n = t.length; n > e; ) {
                        if (t[e].apply(this, arguments)) return !0;
                        e += 1;
                    }
                    return !1;
                });
            }), Ei = L(function(t, e) {
                return "function" == typeof t.ap ? t.ap(e) : "function" == typeof t ? pt(Math.max(t.length, e.length), function() {
                    return t.apply(this, arguments)(e.apply(this, arguments));
                }) : Mn(function(t, n) {
                    return a(t, ti(n, e));
                }, [], t);
            }), Pi = Vn(function(t) {
                return t.apply(this, A(arguments, 1));
            }), Ai = L(j("chain", bi, function(t, e) {
                return "function" == typeof e ? function() {
                    return e.call(this, t.apply(this, arguments)).apply(this, arguments);
                } : In(!1)(ti(t, e));
            })), ki = N(function(t, e, n) {
                function i(e, n) {
                    return Ei(ti(Ae, t(n)), e);
                }
                return ze(i, e([]), n);
            }), Ii = L(function(t, e) {
                if (t > 10) throw new Error("Constructor with greater than ten arguments");
                return 0 === t ? function() {
                    return new e();
                } : Vn(he(t, function(t, n, i, r, s, a, o, u, h, l) {
                    switch (arguments.length) {
                      case 1:
                        return new e(t);

                      case 2:
                        return new e(t, n);

                      case 3:
                        return new e(t, n, i);

                      case 4:
                        return new e(t, n, i, r);

                      case 5:
                        return new e(t, n, i, r, s);

                      case 6:
                        return new e(t, n, i, r, s, a);

                      case 7:
                        return new e(t, n, i, r, s, a, o);

                      case 8:
                        return new e(t, n, i, r, s, a, o, u);

                      case 9:
                        return new e(t, n, i, r, s, a, o, u, h);

                      case 10:
                        return new e(t, n, i, r, s, a, o, u, h, l);
                    }
                }));
            }), Mi = L(function(t, e) {
                return pt(Math.max.apply(Math, oi("length", e)), function() {
                    var n = arguments, i = this;
                    return t.apply(i, b(function(t) {
                        return t.apply(i, n);
                    }, e));
                });
            }), Oi = L(j("dropRepeatsWith", W, function(t, e) {
                var n = [], i = 1, r = e.length;
                if (0 !== r) for (n[0] = e[0]; r > i; ) t(Kn(n), e[i]) || (n[n.length] = e[i]), 
                i += 1;
                return n;
            })), Ti = N(function(t, e, n) {
                return Rn(t(e), t(n));
            }), zi = N(function(t, e, n) {
                return Rn(e[t], n[t]);
            }), Li = L(function(t, e) {
                return "function" != typeof e.indexOf || d(e) ? wi(e, t, 0) : e.indexOf(t);
            }), Ni = z(function(t) {
                return function() {
                    return ti(ut(e, arguments), t);
                };
            }), Vi = L(function(t, e) {
                return function(n) {
                    return function(i) {
                        return ti(function(t) {
                            return e(t, i);
                        }, n(t(i)));
                    };
                };
            }), ji = z(function(t) {
                return Vi(de(t), cn(t));
            }), Bi = z(function(t) {
                return Vi(be(t), lt(t));
            }), Di = z(function(t) {
                return Vi(ke(t), ht(t));
            }), Ri = L(function(t, e) {
                var n = pt(t, e);
                return pt(t, function() {
                    return Mn(Ei, ti(n, arguments[0]), A(arguments, 1));
                });
            }), qi = z(function(t) {
                return _i(t) / t.length;
            }), Fi = z(function(t) {
                var e = t.length;
                if (0 === e) return NaN;
                var n = 2 - e % 2, i = (e - n) / 2;
                return qi(A(t).sort(function(t, e) {
                    return e > t ? -1 : t > e ? 1 : 0;
                }).slice(i, i + n));
            }), $i = ni(function(t, e) {
                return e;
            }), Wi = z(function(t) {
                return ci($i, {}, t);
            }), Hi = function() {
                if (0 === arguments.length) throw new Error("pipe requires at least one argument");
                return n(arguments[0].length, ci(C, arguments[0], Ze(arguments)));
            }, Ui = function() {
                if (0 === arguments.length) throw new Error("pipeP requires at least one argument");
                return n(arguments[0].length, ci(S, arguments[0], Ze(arguments)));
            }, Zi = ci(ue, 1), Gi = L(function(t, e) {
                return "function" == typeof e.sequence ? e.sequence(t) : ze(function(t, e) {
                    return Ei(ti(Ae, e), t);
                }, t([]), e);
            }), Xi = N(function(t, e, n) {
                return Gi(t, ti(e, n));
            }), Ji = Ai(c), Yi = function(t, e) {
                return wi(e, t, 0) >= 0;
            }, Ki = function() {
                var t = {
                    "@@transducer/init": Array,
                    "@@transducer/step": function(t, e) {
                        return a(t, [ e ]);
                    },
                    "@@transducer/result": c
                }, e = {
                    "@@transducer/init": String,
                    "@@transducer/step": function(t, e) {
                        return t + e;
                    },
                    "@@transducer/result": c
                }, n = {
                    "@@transducer/init": Object,
                    "@@transducer/step": function(t, e) {
                        return $i(t, Ht(e) ? ge(e[0], e[1]) : e);
                    },
                    "@@transducer/result": c
                };
                return function(i) {
                    if (w(i)) return i;
                    if (Ht(i)) return t;
                    if ("string" == typeof i) return e;
                    if ("object" == typeof i) return n;
                    throw new Error("Cannot create transformer for " + i);
                };
            }(), Qi = function jr(t, e) {
                var n = function(n) {
                    var i = e.concat([ t ]);
                    return Yi(n, i) ? "<Circular>" : jr(n, i);
                }, i = function(t, e) {
                    return b(function(e) {
                        return E(e) + ": " + n(t[e]);
                    }, e.slice().sort());
                };
                switch (Object.prototype.toString.call(t)) {
                  case "[object Arguments]":
                    return "(function() { return arguments; }(" + b(n, t).join(", ") + "))";

                  case "[object Array]":
                    return "[" + b(n, t).concat(i(t, fi(function(t) {
                        return /^\d+$/.test(t);
                    }, Zt(t)))).join(", ") + "]";

                  case "[object Boolean]":
                    return "object" == typeof t ? "new Boolean(" + n(t.valueOf()) + ")" : t.toString();

                  case "[object Date]":
                    return "new Date(" + (isNaN(t.valueOf()) ? n(NaN) : E(k(t))) + ")";

                  case "[object Null]":
                    return "null";

                  case "[object Number]":
                    return "object" == typeof t ? "new Number(" + n(t.valueOf()) + ")" : 1 / t === -(1 / 0) ? "-0" : t.toString(10);

                  case "[object String]":
                    return "object" == typeof t ? "new String(" + n(t.valueOf()) + ")" : E(t);

                  case "[object Undefined]":
                    return "undefined";

                  default:
                    if ("function" == typeof t.toString) {
                        var r = t.toString();
                        if ("[object Object]" !== r) return r;
                    }
                    return "{" + i(t, Zt(t)).join(", ") + "}";
                }
            }, tr = ki(Bt), er = function() {
                if (0 === arguments.length) throw new Error("compose requires at least one argument");
                return Hi.apply(this, je(arguments));
            }, nr = function() {
                return er.apply(this, Ae(Bt, ti(Ai, arguments)));
            }, ir = function() {
                if (0 === arguments.length) throw new Error("composeP requires at least one argument");
                return Ui.apply(this, je(arguments));
            }, rr = z(function(t) {
                return Ii(t.length, t);
            }), sr = L(Yi), ar = L(function(t, e) {
                for (var n = [], i = 0, r = t.length; r > i; ) Yi(t[i], e) || Yi(t[i], n) || (n[n.length] = t[i]), 
                i += 1;
                return n;
            }), or = z(j("dropRepeats", W(Rn), Oi(Rn))), ur = N(function(t, e, n) {
                return w(t) ? Mn(e(t), t["@@transducer/init"](), n) : Mn(e(Ki(t)), t, n);
            }), hr = z(function(t) {
                return Ri(t.length, t);
            }), lr = L(function(t, e) {
                var n = {};
                for (var i in e) Yi(i, t) || (n[i] = e[i]);
                return n;
            }), cr = function() {
                return nr.apply(this, je(arguments));
            }, fr = z(function(t) {
                return Qi(t, []);
            }), dr = L("undefined" == typeof Set ? function(t, e) {
                for (var n, i, r = 0, s = [], a = []; r < e.length; ) i = e[r], n = t(i), Yi(n, s) || (a.push(i), 
                s.push(n)), r += 1;
                return a;
            } : function(t, e) {
                for (var n, i, r, s = new Set(), a = [], o = 0, u = [], h = !1, l = !1, c = 0; c < e.length; ) {
                    switch (i = e[c], n = t(i), typeof n) {
                      case "number":
                        if (0 === n && !l && 1 / n === -(1 / 0)) {
                            l = !0, u.push(i);
                            break;
                        }

                      case "string":
                      case "boolean":
                      case "function":
                      case "undefined":
                        s.add(n), r = s.size, r > o && (u.push(i), o = r);
                        break;

                      case "object":
                        if (null === n) {
                            h || (h = !0, u.push(null));
                            break;
                        }

                      default:
                        Yi(n, a) || (a.push(n), u.push(i));
                    }
                    c += 1;
                }
                return u;
            }), _r = L(function(t, e) {
                return fi($n(Yi)(t), e);
            }), gr = hr(fe), pr = L(function(t, e) {
                return pt(t + 1, function() {
                    var n = arguments[t];
                    if (null != n && Wt(Function, n[e])) return n[e].apply(n, A(arguments, 0, t));
                    throw new TypeError(fr(n) + ' does not have a method named "' + e + '"');
                });
            }), vr = pr(1, "join"), mr = z(function(t) {
                var e = {};
                return n(t.length, function() {
                    var n = fr(arguments);
                    return l(n, e) || (e[n] = t.apply(this, arguments)), e[n];
                });
            }), yr = pr(1, "split"), wr = L(function(t, e) {
                if (!m(t)) throw new TypeError("‘test’ requires a value of type RegExp as its first argument; received " + fr(t));
                return r(t).test(e);
            }), br = pr(0, "toLowerCase"), xr = pr(0, "toUpperCase"), Cr = dr(Bt), Sr = $n(pr(1, "concat")), Er = L(function(t, e) {
                return Cr(u($n(Yi)(t), e));
            }), Pr = L(function(t, e) {
                return Sr(ar(t, e), ar(e, t));
            }), Ar = N(function(t, e, n) {
                return Sr(yt(t, e, n), yt(t, n, e));
            }), kr = L(er(Cr, a)), Ir = {
                F: Cn,
                T: Sn,
                __: e,
                add: tt,
                addIndex: zn,
                adjust: et,
                all: nt,
                allPass: xi,
                allUniq: Ci,
                always: it,
                and: rt,
                any: st,
                anyPass: Si,
                ap: Ei,
                aperture: at,
                append: ot,
                apply: ut,
                assoc: ht,
                assocPath: lt,
                binary: Ln,
                bind: ct,
                both: ft,
                call: Pi,
                chain: Ai,
                clone: Nn,
                commute: tr,
                commuteMap: ki,
                comparator: dt,
                complement: gr,
                compose: er,
                composeK: nr,
                composeP: ir,
                concat: Sr,
                cond: _t,
                construct: rr,
                constructN: Ii,
                contains: sr,
                converge: Mi,
                countBy: gt,
                curry: Vn,
                curryN: pt,
                dec: vt,
                defaultTo: mt,
                difference: ar,
                differenceWith: yt,
                dissoc: wt,
                dissocPath: bt,
                divide: xt,
                drop: jn,
                dropLast: Bn,
                dropLastWhile: Dn,
                dropRepeats: or,
                dropRepeatsWith: Oi,
                dropWhile: Ct,
                either: St,
                empty: Et,
                eqBy: Ti,
                eqProps: zi,
                equals: Rn,
                evolve: Pt,
                filter: qn,
                find: At,
                findIndex: kt,
                findLast: It,
                findLastIndex: Mt,
                flatten: Fn,
                flip: $n,
                forEach: Ot,
                fromPairs: Tt,
                groupBy: Wn,
                gt: zt,
                gte: Lt,
                has: Nt,
                hasIn: Vt,
                head: Hn,
                identical: jt,
                identity: Bt,
                ifElse: Dt,
                inc: Rt,
                indexBy: Un,
                indexOf: Li,
                init: Zn,
                insert: qt,
                insertAll: Ft,
                intersection: Er,
                intersectionWith: Gn,
                intersperse: $t,
                into: ur,
                invert: Xn,
                invertObj: Jn,
                invoker: pr,
                is: Wt,
                isArrayLike: Ht,
                isEmpty: Yn,
                isNil: Ut,
                join: vr,
                juxt: Ni,
                keys: Zt,
                keysIn: Gt,
                last: Kn,
                lastIndexOf: Qn,
                length: Xt,
                lens: Vi,
                lensIndex: ji,
                lensPath: Bi,
                lensProp: Di,
                lift: hr,
                liftN: Ri,
                lt: Jt,
                lte: Yt,
                map: ti,
                mapAccum: Kt,
                mapAccumRight: Qt,
                mapObjIndexed: ei,
                match: te,
                mathMod: ee,
                max: ne,
                maxBy: ie,
                mean: qi,
                median: Fi,
                memoize: mr,
                merge: $i,
                mergeAll: Wi,
                mergeWith: ni,
                mergeWithKey: re,
                min: se,
                minBy: ae,
                modulo: oe,
                multiply: ue,
                nAry: he,
                negate: le,
                none: ce,
                not: fe,
                nth: de,
                nthArg: _e,
                objOf: ge,
                of: pe,
                omit: lr,
                once: ve,
                or: me,
                over: ye,
                pair: we,
                partial: ii,
                partialRight: ri,
                partition: si,
                path: be,
                pathEq: ai,
                pathOr: xe,
                pathSatisfies: Ce,
                pick: Se,
                pickAll: Ee,
                pickBy: Pe,
                pipe: Hi,
                pipeK: cr,
                pipeP: Ui,
                pluck: oi,
                prepend: Ae,
                product: Zi,
                project: ui,
                prop: ke,
                propEq: hi,
                propIs: li,
                propOr: Ie,
                propSatisfies: Me,
                props: Oe,
                range: Te,
                reduce: ci,
                reduceRight: ze,
                reduced: Le,
                reject: fi,
                remove: Ne,
                repeat: di,
                replace: Ve,
                reverse: je,
                scan: Be,
                sequence: Gi,
                set: De,
                slice: Re,
                sort: qe,
                sortBy: Fe,
                split: yr,
                splitAt: $e,
                splitEvery: We,
                splitWhen: He,
                subtract: Ue,
                sum: _i,
                symmetricDifference: Pr,
                symmetricDifferenceWith: Ar,
                tail: Ze,
                take: Ge,
                takeLast: gi,
                takeLastWhile: Xe,
                takeWhile: Je,
                tap: Ye,
                test: wr,
                times: Ke,
                toLower: br,
                toPairs: Qe,
                toPairsIn: tn,
                toString: fr,
                toUpper: xr,
                transduce: pi,
                transpose: en,
                traverse: Xi,
                trim: nn,
                type: rn,
                unapply: sn,
                unary: an,
                uncurryN: on,
                unfold: un,
                union: kr,
                unionWith: vi,
                uniq: Cr,
                uniqBy: dr,
                uniqWith: hn,
                unless: ln,
                unnest: Ji,
                update: cn,
                useWith: fn,
                values: dn,
                valuesIn: _n,
                view: gn,
                when: pn,
                where: vn,
                whereEq: mi,
                without: _r,
                wrap: mn,
                xprod: yn,
                zip: wn,
                zipObj: bn,
                zipWith: xn
            };
            t.exports = Ir;
        }).call(this);
    },
    148: function(t, e, n) {
        /*! Kefir.js v3.2.1
	 *  https://github.com/rpominov/kefir
	 */
        !function(t, n) {
            n(e);
        }(this, function(t) {
            "use strict";
            function e(t) {
                var e = function() {};
                return e.prototype = t, new e();
            }
            function n(t) {
                var e = arguments.length, n = void 0, i = void 0;
                for (n = 1; e > n; n++) for (i in arguments[n]) t[i] = arguments[n][i];
                return t;
            }
            function i(t, i) {
                var r = arguments.length, s = void 0;
                for (t.prototype = e(i.prototype), t.prototype.constructor = t, s = 2; r > s; s++) n(t.prototype, arguments[s]);
                return t;
            }
            function r(t, e) {
                var n = void 0, i = void 0, r = void 0, s = void 0;
                if (0 === t.length) return e;
                if (0 === e.length) return t;
                for (s = 0, n = new Array(t.length + e.length), i = t.length, r = 0; i > r; r++, 
                s++) n[s] = t[r];
                for (i = e.length, r = 0; i > r; r++, s++) n[s] = e[r];
                return n;
            }
            function s(t, e) {
                var n = t.length, i = void 0;
                for (i = 0; n > i; i++) if (t[i] === e) return i;
                return -1;
            }
            function a(t, e) {
                var n = t.length, i = void 0;
                for (i = 0; n > i; i++) if (e(t[i])) return i;
                return -1;
            }
            function o(t) {
                var e = t.length, n = new Array(e), i = void 0;
                for (i = 0; e > i; i++) n[i] = t[i];
                return n;
            }
            function u(t, e) {
                var n = t.length, i = void 0, r = void 0, s = void 0;
                if (e >= 0 && n > e) {
                    if (1 === n) return [];
                    for (i = new Array(n - 1), r = 0, s = 0; n > r; r++) r !== e && (i[s] = t[r], s++);
                    return i;
                }
                return t;
            }
            function h(t, e) {
                var n = t.length, i = new Array(n), r = void 0;
                for (r = 0; n > r; r++) i[r] = e(t[r]);
                return i;
            }
            function l(t, e) {
                var n = t.length, i = void 0;
                for (i = 0; n > i; i++) e(t[i]);
            }
            function c(t, e) {
                var n = t.length, i = void 0;
                for (i = 0; n > i; i++) t[i] = e;
            }
            function f(t, e) {
                return -1 !== s(t, e);
            }
            function d(t, e, n) {
                var i = Math.min(n, t.length + 1), r = t.length - i + 1, s = new Array(i), a = void 0;
                for (a = r; i > a; a++) s[a - r] = t[a];
                return s[i - 1] = e, s;
            }
            function _(t, e, n) {
                t === ae ? e(n) : t === n.type && (t === re || t === se ? e(n.value) : e());
            }
            function g() {
                this._items = [], this._inLoop = 0, this._removedItems = null;
            }
            function p() {
                this._dispatcher = new g(), this._active = !1, this._alive = !0, this._activating = !1, 
                this._logHandlers = null;
            }
            function v() {
                p.call(this);
            }
            function m() {
                p.call(this), this._currentEvent = null;
            }
            function y() {
                return oe;
            }
            function w(t) {
                function e(t, e) {
                    var n = this;
                    v.call(this), this._wait = t, this._intervalId = null, this._$onTick = function() {
                        return n._onTick();
                    }, this._init(e);
                }
                return i(e, v, {
                    _init: function() {},
                    _free: function() {},
                    _onTick: function() {},
                    _onActivation: function() {
                        this._intervalId = setInterval(this._$onTick, this._wait);
                    },
                    _onDeactivation: function() {
                        null !== this._intervalId && (clearInterval(this._intervalId), this._intervalId = null);
                    },
                    _clear: function() {
                        v.prototype._clear.call(this), this._$onTick = null, this._free();
                    }
                }, t), e;
            }
            function b(t, e) {
                return new ue(t, {
                    x: e
                });
            }
            function x(t, e) {
                return new he(t, {
                    x: e
                });
            }
            function C(t, e) {
                return 0 === e.length ? y() : new le(t, {
                    xs: e
                });
            }
            function S(t, e) {
                return new ce(t, {
                    fn: e
                });
            }
            function E(t) {
                function e(e) {
                    return t._emitValue(e), t._active;
                }
                function n(e) {
                    return t._emitError(e), t._active;
                }
                function i() {
                    return t._emitEnd(), t._active;
                }
                function r(e) {
                    return t._emit(e.type, e.value), t._active;
                }
                return {
                    value: e,
                    error: n,
                    end: i,
                    event: r,
                    emit: e,
                    emitEvent: r
                };
            }
            function P(t, e) {
                return new fe(t, {
                    fn: e
                });
            }
            function A(t) {
                v.call(this), this._fn = t, this._unsubscribe = null;
            }
            function k(t) {
                return new A(t);
            }
            function I(t) {
                var e = !1;
                return k(function(n) {
                    e || (t(function(t) {
                        n.emit(t), n.end();
                    }), e = !0);
                }).setName("fromCallback");
            }
            function M(t) {
                var e = !1;
                return k(function(n) {
                    e || (t(function(t, e) {
                        t ? n.error(t) : n.emit(e), n.end();
                    }), e = !0);
                }).setName("fromNodeCallback");
            }
            function O(t, e) {
                switch (e) {
                  case 0:
                    return function() {
                        return t();
                    };

                  case 1:
                    return function(e) {
                        return t(e[0]);
                    };

                  case 2:
                    return function(e) {
                        return t(e[0], e[1]);
                    };

                  case 3:
                    return function(e) {
                        return t(e[0], e[1], e[2]);
                    };

                  case 4:
                    return function(e) {
                        return t(e[0], e[1], e[2], e[3]);
                    };

                  default:
                    return function(e) {
                        return t.apply(null, e);
                    };
                }
            }
            function T(t, e, n) {
                var i = n ? n.length : 0;
                if (null == e) switch (i) {
                  case 0:
                    return t();

                  case 1:
                    return t(n[0]);

                  case 2:
                    return t(n[0], n[1]);

                  case 3:
                    return t(n[0], n[1], n[2]);

                  case 4:
                    return t(n[0], n[1], n[2], n[3]);

                  default:
                    return t.apply(null, n);
                } else switch (i) {
                  case 0:
                    return t.call(e);

                  default:
                    return t.apply(e, n);
                }
            }
            function z(t, e, n) {
                return k(function(i) {
                    var r = n ? function() {
                        i.emit(T(n, this, arguments));
                    } : function(t) {
                        i.emit(t);
                    };
                    return t(r), function() {
                        return e(r);
                    };
                }).setName("fromSubUnsub");
            }
            function L(t, e, n) {
                for (var i = void 0, r = void 0, s = 0; s < de.length; s++) if ("function" == typeof t[de[s][0]] && "function" == typeof t[de[s][1]]) {
                    i = de[s][0], r = de[s][1];
                    break;
                }
                if (void 0 === i) throw new Error("target don't support any of addEventListener/removeEventListener, addListener/removeListener, on/off method pair");
                return z(function(n) {
                    return t[i](e, n);
                }, function(n) {
                    return t[r](e, n);
                }, n).setName("fromEvents");
            }
            function N(t) {
                this._currentEvent = {
                    type: "value",
                    value: t,
                    current: !0
                };
            }
            function V(t) {
                return new N(t);
            }
            function j(t) {
                this._currentEvent = {
                    type: "error",
                    value: t,
                    current: !0
                };
            }
            function B(t) {
                return new j(t);
            }
            function D(t, e) {
                return function(n, i) {
                    var r = this;
                    t.call(this), this._source = n, this._name = n._name + "." + e, this._init(i), this._$handleAny = function(t) {
                        return r._handleAny(t);
                    };
                };
            }
            function R(t) {
                return {
                    _init: function() {},
                    _free: function() {},
                    _handleValue: function(t) {
                        this._emitValue(t);
                    },
                    _handleError: function(t) {
                        this._emitError(t);
                    },
                    _handleEnd: function() {
                        this._emitEnd();
                    },
                    _handleAny: function(t) {
                        switch (t.type) {
                          case re:
                            return this._handleValue(t.value);

                          case se:
                            return this._handleError(t.value);

                          case ie:
                            return this._handleEnd();
                        }
                    },
                    _onActivation: function() {
                        this._source.onAny(this._$handleAny);
                    },
                    _onDeactivation: function() {
                        this._source.offAny(this._$handleAny);
                    },
                    _clear: function() {
                        t.prototype._clear.call(this), this._source = null, this._$handleAny = null, this._free();
                    }
                };
            }
            function q(t, e) {
                var n = D(v, t);
                return i(n, v, R(v), e), n;
            }
            function F(t, e) {
                var n = D(m, t);
                return i(n, m, R(m), e), n;
            }
            function $(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? null : arguments[1];
                if (null !== e && "function" != typeof e) throw new Error("You should call toProperty() with a function or no arguments.");
                return new _e(t, {
                    fn: e
                });
            }
            function W(t) {
                return new ge(t);
            }
            function H(t) {
                var e = !1, n = k(function(n) {
                    if (!e) {
                        var i = function(t) {
                            n.emit(t), n.end();
                        }, r = function(t) {
                            n.error(t), n.end();
                        }, s = t.then(i, r);
                        s && "function" == typeof s.done && s.done(), e = !0;
                    }
                });
                return $(n, null).setName("fromPromise");
            }
            function U() {
                if ("function" == typeof Promise) return Promise;
                throw new Error("There isn't default Promise, use shim or parameter");
            }
            function Z(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? U() : arguments[1], n = null;
                return new e(function(e, i) {
                    t.onAny(function(t) {
                        t.type === ie && null !== n ? ((n.type === re ? e : i)(n.value), n = null) : n = t;
                    });
                });
            }
            function G(t) {
                return "undefined" != typeof Symbol && Symbol[t] ? Symbol[t] : "undefined" != typeof Symbol && "function" == typeof Symbol["for"] ? Symbol["for"](t) : "@@" + t;
            }
            function X(t) {
                var e = t[pe] ? t[pe]() : t;
                return k(function(t) {
                    var n = e.subscribe({
                        error: function(e) {
                            t.error(e), t.end();
                        },
                        next: function(e) {
                            t.emit(e);
                        },
                        complete: function() {
                            t.end();
                        }
                    });
                    return n.unsubscribe ? function() {
                        n.unsubscribe();
                    } : n;
                }).setName("fromESObservable");
            }
            function J(t) {
                this._observable = t.takeErrors(1);
            }
            function Y() {
                return new J(this);
            }
            function K(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? we : arguments[1];
                return new (t._ofSameType(me, ye))(t, {
                    fn: e
                });
            }
            function Q(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? Se : arguments[1];
                return new (t._ofSameType(xe, Ce))(t, {
                    fn: e
                });
            }
            function tt(t, e) {
                return new (t._ofSameType(Pe, Ae))(t, {
                    n: e
                });
            }
            function et(t, e) {
                return new (t._ofSameType(Ie, Me))(t, {
                    n: e
                });
            }
            function nt(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? Le : arguments[1];
                return new (t._ofSameType(Te, ze))(t, {
                    fn: e
                });
            }
            function it(t) {
                return new (t._ofSameType(Ve, je))(t);
            }
            function rt(t, e) {
                return new (t._ofSameType(De, Re))(t, {
                    n: e
                });
            }
            function st(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? We : arguments[1];
                return new (t._ofSameType(Fe, $e))(t, {
                    fn: e
                });
            }
            function at(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? Ge : arguments[1];
                return new (t._ofSameType(Ue, Ze))(t, {
                    fn: e
                });
            }
            function ot(t, e) {
                return [ t, e ];
            }
            function ut(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? ne : arguments[2];
                return new (t._ofSameType(Je, Ye))(t, {
                    fn: e || ot,
                    seed: n
                });
            }
            function ht(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? ne : arguments[2];
                return new Ke(t, {
                    fn: e,
                    seed: n
                });
            }
            function lt(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? en : arguments[1];
                return new tn(t, {
                    fn: e
                });
            }
            function ct(t, e) {
                return new (t._ofSameType(sn, an))(t, {
                    wait: e
                });
            }
            function ft(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], i = n.leading, r = void 0 === i ? !0 : i, s = n.trailing, a = void 0 === s ? !0 : s;
                return new (t._ofSameType(hn, ln))(t, {
                    wait: e,
                    leading: r,
                    trailing: a
                });
            }
            function dt(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], i = n.immediate, r = void 0 === i ? !1 : i;
                return new (t._ofSameType(fn, dn))(t, {
                    wait: e,
                    immediate: r
                });
            }
            function _t(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? vn : arguments[1];
                return new (t._ofSameType(gn, pn))(t, {
                    fn: e
                });
            }
            function gt(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? bn : arguments[1];
                return new (t._ofSameType(yn, wn))(t, {
                    fn: e
                });
            }
            function pt(t) {
                return new (t._ofSameType(Cn, Sn))(t);
            }
            function vt(t) {
                return new (t._ofSameType(Pn, An))(t);
            }
            function mt(t) {
                return new (t._ofSameType(In, Mn))(t);
            }
            function yt(t, e) {
                return new (t._ofSameType(Tn, zn))(t, {
                    fn: e
                });
            }
            function wt(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2];
                return new (t._ofSameType(Nn, Vn))(t, {
                    min: n,
                    max: e
                });
            }
            function bt(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], i = n.flushOnEnd, r = void 0 === i ? !0 : i;
                return new (t._ofSameType(Bn, Dn))(t, {
                    fn: e || Rn,
                    flushOnEnd: r
                });
            }
            function xt(t, e) {
                var n = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2], i = n.flushOnEnd, r = void 0 === i ? !0 : i;
                return new (t._ofSameType(Fn, $n))(t, {
                    count: e,
                    flushOnEnd: r
                });
            }
            function Ct(t, e, n) {
                var i = arguments.length <= 3 || void 0 === arguments[3] ? {} : arguments[3], r = i.flushOnEnd, s = void 0 === r ? !0 : r;
                return new (t._ofSameType(Hn, Un))(t, {
                    wait: e,
                    count: n,
                    flushOnEnd: s
                });
            }
            function St(t) {
                return {
                    "@@transducer/step": function(e, n) {
                        return t._emitValue(n), null;
                    },
                    "@@transducer/result": function() {
                        return t._emitEnd(), null;
                    }
                };
            }
            function Et(t, e) {
                return new (t._ofSameType(Gn, Xn))(t, {
                    transducer: e
                });
            }
            function Pt(t, e) {
                return new (t._ofSameType(Yn, Kn))(t, {
                    fn: e
                });
            }
            function At(t) {
                for (var e = void 0, n = 0; n < t.length; n++) void 0 !== t[n] && (void 0 === e || e.index < t[n].index) && (e = t[n]);
                return e.error;
            }
            function kt(t, e, n) {
                var i = this;
                v.call(this), this._activeCount = t.length, this._sources = r(t, e), this._combinator = n ? O(n, this._sources.length) : function(t) {
                    return t;
                }, this._aliveCount = 0, this._latestValues = new Array(this._sources.length), this._latestErrors = new Array(this._sources.length), 
                c(this._latestValues, ne), this._emitAfterActivation = !1, this._endAfterActivation = !1, 
                this._latestErrorIndex = 0, this._$handlers = [];
                for (var s = function(t) {
                    i._$handlers.push(function(e) {
                        return i._handleAny(t, e);
                    });
                }, a = 0; a < this._sources.length; a++) s(a);
            }
            function It(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1], n = arguments[2];
                return "function" == typeof e && (n = e, e = []), 0 === t.length ? y() : new kt(t, e, n);
            }
            function Mt(t, e) {
                var n = this;
                v.call(this), this._buffers = h(t, function(t) {
                    return Qn(t) ? o(t) : [];
                }), this._sources = h(t, function(t) {
                    return Qn(t) ? y() : t;
                }), this._combinator = e ? O(e, this._sources.length) : function(t) {
                    return t;
                }, this._aliveCount = 0, this._$handlers = [];
                for (var i = function(t) {
                    n._$handlers.push(function(e) {
                        return n._handleAny(t, e);
                    });
                }, r = 0; r < this._sources.length; r++) i(r);
            }
            function Ot(t, e) {
                return 0 === t.length ? y() : new Mt(t, e);
            }
            function Tt() {
                var t = this, e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], n = e.queueLim, i = void 0 === n ? 0 : n, r = e.concurLim, s = void 0 === r ? -1 : r, a = e.drop, o = void 0 === a ? "new" : a;
                v.call(this), this._queueLim = 0 > i ? -1 : i, this._concurLim = 0 > s ? -1 : s, 
                this._drop = o, this._queue = [], this._curSources = [], this._$handleSubAny = function(e) {
                    return t._handleSubAny(e);
                }, this._$endHandlers = [], this._currentlyAdding = null, 0 === this._concurLim && this._emitEnd();
            }
            function zt(t) {
                Tt.call(this), this._addAll(t), this._initialised = !0;
            }
            function Lt(t) {
                return 0 === t.length ? y() : new zt(t);
            }
            function Nt(t) {
                var e = this;
                v.call(this), this._generator = t, this._source = null, this._inLoop = !1, this._iteration = 0, 
                this._$handleAny = function(t) {
                    return e._handleAny(t);
                };
            }
            function Vt(t) {
                return new Nt(t);
            }
            function jt(t) {
                return Vt(function(e) {
                    return t.length > e ? t[e] : !1;
                }).setName("concat");
            }
            function Bt() {
                Tt.call(this);
            }
            function Dt(t, e, n) {
                var i = this;
                Tt.call(this, n), this._source = t, this._fn = e, this._mainEnded = !1, this._lastCurrent = null, 
                this._$handleMain = function(t) {
                    return i._handleMain(t);
                };
            }
            function Rt(t, e) {
                Dt.call(this, t, e);
            }
            function qt(t, e) {
                return function(n, i, r) {
                    var s = this;
                    t.call(this), this._primary = n, this._secondary = i, this._name = n._name + "." + e, 
                    this._lastSecondary = ne, this._$handleSecondaryAny = function(t) {
                        return s._handleSecondaryAny(t);
                    }, this._$handlePrimaryAny = function(t) {
                        return s._handlePrimaryAny(t);
                    }, this._init(r);
                };
            }
            function Ft(t) {
                return {
                    _init: function() {},
                    _free: function() {},
                    _handlePrimaryValue: function(t) {
                        this._emitValue(t);
                    },
                    _handlePrimaryError: function(t) {
                        this._emitError(t);
                    },
                    _handlePrimaryEnd: function() {
                        this._emitEnd();
                    },
                    _handleSecondaryValue: function(t) {
                        this._lastSecondary = t;
                    },
                    _handleSecondaryError: function(t) {
                        this._emitError(t);
                    },
                    _handleSecondaryEnd: function() {},
                    _handlePrimaryAny: function(t) {
                        switch (t.type) {
                          case re:
                            return this._handlePrimaryValue(t.value);

                          case se:
                            return this._handlePrimaryError(t.value);

                          case ie:
                            return this._handlePrimaryEnd(t.value);
                        }
                    },
                    _handleSecondaryAny: function(t) {
                        switch (t.type) {
                          case re:
                            return this._handleSecondaryValue(t.value);

                          case se:
                            return this._handleSecondaryError(t.value);

                          case ie:
                            this._handleSecondaryEnd(t.value), this._removeSecondary();
                        }
                    },
                    _removeSecondary: function() {
                        null !== this._secondary && (this._secondary.offAny(this._$handleSecondaryAny), 
                        this._$handleSecondaryAny = null, this._secondary = null);
                    },
                    _onActivation: function() {
                        null !== this._secondary && this._secondary.onAny(this._$handleSecondaryAny), this._active && this._primary.onAny(this._$handlePrimaryAny);
                    },
                    _onDeactivation: function() {
                        null !== this._secondary && this._secondary.offAny(this._$handleSecondaryAny), this._primary.offAny(this._$handlePrimaryAny);
                    },
                    _clear: function() {
                        t.prototype._clear.call(this), this._primary = null, this._secondary = null, this._lastSecondary = null, 
                        this._$handleSecondaryAny = null, this._$handlePrimaryAny = null, this._free();
                    }
                };
            }
            function $t(t, e) {
                var n = qt(v, t);
                return i(n, v, Ft(v), e), n;
            }
            function Wt(t, e) {
                var n = qt(m, t);
                return i(n, m, Ft(m), e), n;
            }
            function Ht(t, e) {
                return new (t._ofSameType(ni, ii))(t, e);
            }
            function Ut(t, e, n) {
                var i = n ? function(t, e) {
                    return n(e, t);
                } : ri;
                return It([ e ], [ t ], i).setName(t, "sampledBy");
            }
            function Zt(t, e) {
                return new (t._ofSameType(ai, oi))(t, e);
            }
            function Gt(t, e) {
                return new (t._ofSameType(hi, li))(t, e);
            }
            function Xt(t, e, n) {
                return new (t._ofSameType(fi, di))(t, e, n);
            }
            function Jt(t, e, n) {
                return new (t._ofSameType(gi, pi))(t, e, n);
            }
            function Yt(t, e) {
                var n = Lt([ K(t, mi), K(e, vi) ]);
                return n = at(n), n = $(n, vi), n.setName(t, "awaiting");
            }
            function Kt(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? xi : arguments[1];
                return new (t._ofSameType(wi, bi))(t, {
                    fn: e
                });
            }
            function Qt(t) {
                var e = arguments.length <= 1 || void 0 === arguments[1] ? Pi : arguments[1];
                return new (t._ofSameType(Si, Ei))(t, {
                    fn: e
                });
            }
            function te(t) {
                return new (t._ofSameType(ki, Ii))(t);
            }
            function ee(t) {
                if (Oi.DEPRECATION_WARNINGS !== !1 && console && "function" == typeof console.warn) {
                    var e = "\nHere is an Error object for you containing the call stack:";
                    console.warn(t, e, new Error());
                }
            }
            var ne = [ "<nothing>" ], ie = "end", re = "value", se = "error", ae = "any";
            n(g.prototype, {
                add: function(t, e) {
                    return this._items = r(this._items, [ {
                        type: t,
                        fn: e
                    } ]), this._items.length;
                },
                remove: function(t, e) {
                    var n = a(this._items, function(n) {
                        return n.type === t && n.fn === e;
                    });
                    return 0 !== this._inLoop && -1 !== n && (null === this._removedItems && (this._removedItems = []), 
                    this._removedItems.push(this._items[n])), this._items = u(this._items, n), this._items.length;
                },
                dispatch: function(t) {
                    this._inLoop++;
                    for (var e = 0, n = this._items; e < n.length && null !== this._items; e++) null !== this._removedItems && f(this._removedItems, n[e]) || _(n[e].type, n[e].fn, t);
                    this._inLoop--, 0 === this._inLoop && (this._removedItems = null);
                },
                cleanup: function() {
                    this._items = null;
                }
            }), n(p.prototype, {
                _name: "observable",
                _onActivation: function() {},
                _onDeactivation: function() {},
                _setActive: function(t) {
                    this._active !== t && (this._active = t, t ? (this._activating = !0, this._onActivation(), 
                    this._activating = !1) : this._onDeactivation());
                },
                _clear: function() {
                    this._setActive(!1), this._dispatcher.cleanup(), this._dispatcher = null, this._logHandlers = null;
                },
                _emit: function(t, e) {
                    switch (t) {
                      case re:
                        return this._emitValue(e);

                      case se:
                        return this._emitError(e);

                      case ie:
                        return this._emitEnd();
                    }
                },
                _emitValue: function(t) {
                    this._alive && this._dispatcher.dispatch({
                        type: re,
                        value: t
                    });
                },
                _emitError: function(t) {
                    this._alive && this._dispatcher.dispatch({
                        type: se,
                        value: t
                    });
                },
                _emitEnd: function() {
                    this._alive && (this._alive = !1, this._dispatcher.dispatch({
                        type: ie
                    }), this._clear());
                },
                _on: function(t, e) {
                    return this._alive ? (this._dispatcher.add(t, e), this._setActive(!0)) : _(t, e, {
                        type: ie
                    }), this;
                },
                _off: function(t, e) {
                    if (this._alive) {
                        var n = this._dispatcher.remove(t, e);
                        0 === n && this._setActive(!1);
                    }
                    return this;
                },
                onValue: function(t) {
                    return this._on(re, t);
                },
                onError: function(t) {
                    return this._on(se, t);
                },
                onEnd: function(t) {
                    return this._on(ie, t);
                },
                onAny: function(t) {
                    return this._on(ae, t);
                },
                offValue: function(t) {
                    return this._off(re, t);
                },
                offError: function(t) {
                    return this._off(se, t);
                },
                offEnd: function(t) {
                    return this._off(ie, t);
                },
                offAny: function(t) {
                    return this._off(ae, t);
                },
                _ofSameType: function(t, e) {
                    return t.prototype.getType() === this.getType() ? t : e;
                },
                setName: function(t, e) {
                    return this._name = e ? t._name + "." + e : t, this;
                },
                log: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? this.toString() : arguments[0], e = void 0, n = function(n) {
                        var i = "<" + n.type + (e ? ":current" : "") + ">";
                        n.type === ie ? console.log(t, i) : console.log(t, i, n.value);
                    };
                    return this._alive && (this._logHandlers || (this._logHandlers = []), this._logHandlers.push({
                        name: t,
                        handler: n
                    })), e = !0, this.onAny(n), e = !1, this;
                },
                offLog: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? this.toString() : arguments[0];
                    if (this._logHandlers) {
                        var e = a(this._logHandlers, function(e) {
                            return e.name === t;
                        });
                        -1 !== e && (this.offAny(this._logHandlers[e].handler), this._logHandlers.splice(e, 1));
                    }
                    return this;
                }
            }), p.prototype.toString = function() {
                return "[" + this._name + "]";
            }, i(v, p, {
                _name: "stream",
                getType: function() {
                    return "stream";
                }
            }), i(m, p, {
                _name: "property",
                _emitValue: function(t) {
                    this._alive && (this._currentEvent = {
                        type: re,
                        value: t
                    }, this._activating || this._dispatcher.dispatch({
                        type: re,
                        value: t
                    }));
                },
                _emitError: function(t) {
                    this._alive && (this._currentEvent = {
                        type: se,
                        value: t
                    }, this._activating || this._dispatcher.dispatch({
                        type: se,
                        value: t
                    }));
                },
                _emitEnd: function() {
                    this._alive && (this._alive = !1, this._activating || this._dispatcher.dispatch({
                        type: ie
                    }), this._clear());
                },
                _on: function(t, e) {
                    return this._alive && (this._dispatcher.add(t, e), this._setActive(!0)), null !== this._currentEvent && _(t, e, this._currentEvent), 
                    this._alive || _(t, e, {
                        type: ie
                    }), this;
                },
                getType: function() {
                    return "property";
                }
            });
            var oe = new v();
            oe._emitEnd(), oe._name = "never";
            var ue = w({
                _name: "later",
                _init: function(t) {
                    var e = t.x;
                    this._x = e;
                },
                _free: function() {
                    this._x = null;
                },
                _onTick: function() {
                    this._emitValue(this._x), this._emitEnd();
                }
            }), he = w({
                _name: "interval",
                _init: function(t) {
                    var e = t.x;
                    this._x = e;
                },
                _free: function() {
                    this._x = null;
                },
                _onTick: function() {
                    this._emitValue(this._x);
                }
            }), le = w({
                _name: "sequentially",
                _init: function(t) {
                    var e = t.xs;
                    this._xs = o(e);
                },
                _free: function() {
                    this._xs = null;
                },
                _onTick: function() {
                    1 === this._xs.length ? (this._emitValue(this._xs[0]), this._emitEnd()) : this._emitValue(this._xs.shift());
                }
            }), ce = w({
                _name: "fromPoll",
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _onTick: function() {
                    var t = this._fn;
                    this._emitValue(t());
                }
            }), fe = w({
                _name: "withInterval",
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e, this._emitter = E(this);
                },
                _free: function() {
                    this._fn = null, this._emitter = null;
                },
                _onTick: function() {
                    var t = this._fn;
                    t(this._emitter);
                }
            });
            i(A, v, {
                _name: "stream",
                _onActivation: function() {
                    var t = this._fn, e = t(E(this));
                    this._unsubscribe = "function" == typeof e ? e : null, this._active || this._callUnsubscribe();
                },
                _callUnsubscribe: function() {
                    null !== this._unsubscribe && (this._unsubscribe(), this._unsubscribe = null);
                },
                _onDeactivation: function() {
                    this._callUnsubscribe();
                },
                _clear: function() {
                    v.prototype._clear.call(this), this._fn = null;
                }
            });
            var de = [ [ "addEventListener", "removeEventListener" ], [ "addListener", "removeListener" ], [ "on", "off" ] ];
            i(N, m, {
                _name: "constant",
                _active: !1,
                _activating: !1,
                _alive: !1,
                _dispatcher: null,
                _logHandlers: null
            }), i(j, m, {
                _name: "constantError",
                _active: !1,
                _activating: !1,
                _alive: !1,
                _dispatcher: null,
                _logHandlers: null
            });
            var _e = F("toProperty", {
                _init: function(t) {
                    var e = t.fn;
                    this._getInitialCurrent = e;
                },
                _onActivation: function() {
                    if (null !== this._getInitialCurrent) {
                        var t = this._getInitialCurrent;
                        this._emitValue(t());
                    }
                    this._source.onAny(this._$handleAny);
                }
            }), ge = q("changes", {
                _handleValue: function(t) {
                    this._activating || this._emitValue(t);
                },
                _handleError: function(t) {
                    this._activating || this._emitError(t);
                }
            }), pe = G("observable");
            n(J.prototype, {
                subscribe: function(t) {
                    var e = this, n = function(e) {
                        e.type === re && t.next ? t.next(e.value) : e.type === se && t.error ? t.error(e.value) : e.type === ie && t.complete && t.complete(e.value);
                    };
                    return this._observable.onAny(n), function() {
                        return e._observable.offAny(n);
                    };
                }
            });
            var ve = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    this._emitValue(e(t));
                }
            }, me = q("map", ve), ye = F("map", ve), we = function(t) {
                return t;
            }, be = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    e(t) && this._emitValue(t);
                }
            }, xe = q("filter", be), Ce = F("filter", be), Se = function(t) {
                return t;
            }, Ee = {
                _init: function(t) {
                    var e = t.n;
                    this._n = e, 0 >= e && this._emitEnd();
                },
                _handleValue: function(t) {
                    this._n--, this._emitValue(t), 0 === this._n && this._emitEnd();
                }
            }, Pe = q("take", Ee), Ae = F("take", Ee), ke = {
                _init: function(t) {
                    var e = t.n;
                    this._n = e, 0 >= e && this._emitEnd();
                },
                _handleError: function(t) {
                    this._n--, this._emitError(t), 0 === this._n && this._emitEnd();
                }
            }, Ie = q("takeErrors", ke), Me = F("takeErrors", ke), Oe = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    e(t) ? this._emitValue(t) : this._emitEnd();
                }
            }, Te = q("takeWhile", Oe), ze = F("takeWhile", Oe), Le = function(t) {
                return t;
            }, Ne = {
                _init: function() {
                    this._lastValue = ne;
                },
                _free: function() {
                    this._lastValue = null;
                },
                _handleValue: function(t) {
                    this._lastValue = t;
                },
                _handleEnd: function() {
                    this._lastValue !== ne && this._emitValue(this._lastValue), this._emitEnd();
                }
            }, Ve = q("last", Ne), je = F("last", Ne), Be = {
                _init: function(t) {
                    var e = t.n;
                    this._n = Math.max(0, e);
                },
                _handleValue: function(t) {
                    0 === this._n ? this._emitValue(t) : this._n--;
                }
            }, De = q("skip", Be), Re = F("skip", Be), qe = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    null === this._fn || e(t) || (this._fn = null), null === this._fn && this._emitValue(t);
                }
            }, Fe = q("skipWhile", qe), $e = F("skipWhile", qe), We = function(t) {
                return t;
            }, He = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e, this._prev = ne;
                },
                _free: function() {
                    this._fn = null, this._prev = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    this._prev !== ne && e(this._prev, t) || (this._prev = t, this._emitValue(t));
                }
            }, Ue = q("skipDuplicates", He), Ze = F("skipDuplicates", He), Ge = function(t, e) {
                return t === e;
            }, Xe = {
                _init: function(t) {
                    var e = t.fn, n = t.seed;
                    this._fn = e, this._prev = n;
                },
                _free: function() {
                    this._prev = null, this._fn = null;
                },
                _handleValue: function(t) {
                    if (this._prev !== ne) {
                        var e = this._fn;
                        this._emitValue(e(this._prev, t));
                    }
                    this._prev = t;
                }
            }, Je = q("diff", Xe), Ye = F("diff", Xe), Ke = F("scan", {
                _init: function(t) {
                    var e = t.fn, n = t.seed;
                    this._fn = e, this._seed = n, n !== ne && this._emitValue(n);
                },
                _free: function() {
                    this._fn = null, this._seed = null;
                },
                _handleValue: function(t) {
                    var e = this._fn;
                    null === this._currentEvent || this._currentEvent.type === se ? this._emitValue(this._seed === ne ? t : e(this._seed, t)) : this._emitValue(e(this._currentEvent.value, t));
                }
            }), Qe = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    for (var e = this._fn, n = e(t), i = 0; i < n.length; i++) this._emitValue(n[i]);
                }
            }, tn = q("flatten", Qe), en = function(t) {
                return t;
            }, nn = {}, rn = {
                _init: function(t) {
                    var e = this, n = t.wait;
                    this._wait = Math.max(0, n), this._buff = [], this._$shiftBuff = function() {
                        var t = e._buff.shift();
                        t === nn ? e._emitEnd() : e._emitValue(t);
                    };
                },
                _free: function() {
                    this._buff = null, this._$shiftBuff = null;
                },
                _handleValue: function(t) {
                    this._activating ? this._emitValue(t) : (this._buff.push(t), setTimeout(this._$shiftBuff, this._wait));
                },
                _handleEnd: function() {
                    this._activating ? this._emitEnd() : (this._buff.push(nn), setTimeout(this._$shiftBuff, this._wait));
                }
            }, sn = q("delay", rn), an = F("delay", rn), on = Date.now ? function() {
                return Date.now();
            } : function() {
                return new Date().getTime();
            }, un = {
                _init: function(t) {
                    var e = this, n = t.wait, i = t.leading, r = t.trailing;
                    this._wait = Math.max(0, n), this._leading = i, this._trailing = r, this._trailingValue = null, 
                    this._timeoutId = null, this._endLater = !1, this._lastCallTime = 0, this._$trailingCall = function() {
                        return e._trailingCall();
                    };
                },
                _free: function() {
                    this._trailingValue = null, this._$trailingCall = null;
                },
                _handleValue: function(t) {
                    if (this._activating) this._emitValue(t); else {
                        var e = on();
                        0 !== this._lastCallTime || this._leading || (this._lastCallTime = e);
                        var n = this._wait - (e - this._lastCallTime);
                        0 >= n ? (this._cancelTrailing(), this._lastCallTime = e, this._emitValue(t)) : this._trailing && (this._cancelTrailing(), 
                        this._trailingValue = t, this._timeoutId = setTimeout(this._$trailingCall, n));
                    }
                },
                _handleEnd: function() {
                    this._activating ? this._emitEnd() : this._timeoutId ? this._endLater = !0 : this._emitEnd();
                },
                _cancelTrailing: function() {
                    null !== this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null);
                },
                _trailingCall: function() {
                    this._emitValue(this._trailingValue), this._timeoutId = null, this._trailingValue = null, 
                    this._lastCallTime = this._leading ? on() : 0, this._endLater && this._emitEnd();
                }
            }, hn = q("throttle", un), ln = F("throttle", un), cn = {
                _init: function(t) {
                    var e = this, n = t.wait, i = t.immediate;
                    this._wait = Math.max(0, n), this._immediate = i, this._lastAttempt = 0, this._timeoutId = null, 
                    this._laterValue = null, this._endLater = !1, this._$later = function() {
                        return e._later();
                    };
                },
                _free: function() {
                    this._laterValue = null, this._$later = null;
                },
                _handleValue: function(t) {
                    this._activating ? this._emitValue(t) : (this._lastAttempt = on(), this._immediate && !this._timeoutId && this._emitValue(t), 
                    this._timeoutId || (this._timeoutId = setTimeout(this._$later, this._wait)), this._immediate || (this._laterValue = t));
                },
                _handleEnd: function() {
                    this._activating ? this._emitEnd() : this._timeoutId && !this._immediate ? this._endLater = !0 : this._emitEnd();
                },
                _later: function() {
                    var t = on() - this._lastAttempt;
                    t < this._wait && t >= 0 ? this._timeoutId = setTimeout(this._$later, this._wait - t) : (this._timeoutId = null, 
                    this._immediate || (this._emitValue(this._laterValue), this._laterValue = null), 
                    this._endLater && this._emitEnd());
                }
            }, fn = q("debounce", cn), dn = F("debounce", cn), _n = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleError: function(t) {
                    var e = this._fn;
                    this._emitError(e(t));
                }
            }, gn = q("mapErrors", _n), pn = F("mapErrors", _n), vn = function(t) {
                return t;
            }, mn = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleError: function(t) {
                    var e = this._fn;
                    e(t) && this._emitError(t);
                }
            }, yn = q("filterErrors", mn), wn = F("filterErrors", mn), bn = function(t) {
                return t;
            }, xn = {
                _handleValue: function() {}
            }, Cn = q("ignoreValues", xn), Sn = F("ignoreValues", xn), En = {
                _handleError: function() {}
            }, Pn = q("ignoreErrors", En), An = F("ignoreErrors", En), kn = {
                _handleEnd: function() {}
            }, In = q("ignoreEnd", kn), Mn = F("ignoreEnd", kn), On = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleEnd: function() {
                    var t = this._fn;
                    this._emitValue(t()), this._emitEnd();
                }
            }, Tn = q("beforeEnd", On), zn = F("beforeEnd", On), Ln = {
                _init: function(t) {
                    var e = t.min, n = t.max;
                    this._max = n, this._min = e, this._buff = [];
                },
                _free: function() {
                    this._buff = null;
                },
                _handleValue: function(t) {
                    this._buff = d(this._buff, t, this._max), this._buff.length >= this._min && this._emitValue(this._buff);
                }
            }, Nn = q("slidingWindow", Ln), Vn = F("slidingWindow", Ln), jn = {
                _init: function(t) {
                    var e = t.fn, n = t.flushOnEnd;
                    this._fn = e, this._flushOnEnd = n, this._buff = [];
                },
                _free: function() {
                    this._buff = null;
                },
                _flush: function() {
                    null !== this._buff && 0 !== this._buff.length && (this._emitValue(this._buff), 
                    this._buff = []);
                },
                _handleValue: function(t) {
                    this._buff.push(t);
                    var e = this._fn;
                    e(t) || this._flush();
                },
                _handleEnd: function() {
                    this._flushOnEnd && this._flush(), this._emitEnd();
                }
            }, Bn = q("bufferWhile", jn), Dn = F("bufferWhile", jn), Rn = function(t) {
                return t;
            }, qn = {
                _init: function(t) {
                    var e = t.count, n = t.flushOnEnd;
                    this._count = e, this._flushOnEnd = n, this._buff = [];
                },
                _free: function() {
                    this._buff = null;
                },
                _flush: function() {
                    null !== this._buff && 0 !== this._buff.length && (this._emitValue(this._buff), 
                    this._buff = []);
                },
                _handleValue: function(t) {
                    this._buff.push(t), this._buff.length >= this._count && this._flush();
                },
                _handleEnd: function() {
                    this._flushOnEnd && this._flush(), this._emitEnd();
                }
            }, Fn = q("bufferWithCount", qn), $n = F("bufferWithCount", qn), Wn = {
                _init: function(t) {
                    var e = this, n = t.wait, i = t.count, r = t.flushOnEnd;
                    this._wait = n, this._count = i, this._flushOnEnd = r, this._intervalId = null, 
                    this._$onTick = function() {
                        return e._flush();
                    }, this._buff = [];
                },
                _free: function() {
                    this._$onTick = null, this._buff = null;
                },
                _flush: function() {
                    null !== this._buff && (this._emitValue(this._buff), this._buff = []);
                },
                _handleValue: function(t) {
                    this._buff.push(t), this._buff.length >= this._count && (clearInterval(this._intervalId), 
                    this._flush(), this._intervalId = setInterval(this._$onTick, this._wait));
                },
                _handleEnd: function() {
                    this._flushOnEnd && 0 !== this._buff.length && this._flush(), this._emitEnd();
                },
                _onActivation: function() {
                    this._source.onAny(this._$handleAny), this._intervalId = setInterval(this._$onTick, this._wait);
                },
                _onDeactivation: function() {
                    null !== this._intervalId && (clearInterval(this._intervalId), this._intervalId = null), 
                    this._source.offAny(this._$handleAny);
                }
            }, Hn = q("bufferWithTimeOrCount", Wn), Un = F("bufferWithTimeOrCount", Wn), Zn = {
                _init: function(t) {
                    var e = t.transducer;
                    this._xform = e(St(this));
                },
                _free: function() {
                    this._xform = null;
                },
                _handleValue: function(t) {
                    null !== this._xform["@@transducer/step"](null, t) && this._xform["@@transducer/result"](null);
                },
                _handleEnd: function() {
                    this._xform["@@transducer/result"](null);
                }
            }, Gn = q("transduce", Zn), Xn = F("transduce", Zn), Jn = {
                _init: function(t) {
                    var e = t.fn;
                    this._handler = e, this._emitter = E(this);
                },
                _free: function() {
                    this._handler = null, this._emitter = null;
                },
                _handleAny: function(t) {
                    this._handler(this._emitter, t);
                }
            }, Yn = q("withHandler", Jn), Kn = F("withHandler", Jn);
            i(kt, v, {
                _name: "combine",
                _onActivation: function() {
                    this._aliveCount = this._activeCount;
                    for (var t = this._activeCount; t < this._sources.length; t++) this._sources[t].onAny(this._$handlers[t]);
                    for (var t = 0; t < this._activeCount; t++) this._sources[t].onAny(this._$handlers[t]);
                    this._emitAfterActivation && (this._emitAfterActivation = !1, this._emitIfFull()), 
                    this._endAfterActivation && this._emitEnd();
                },
                _onDeactivation: function() {
                    var t = this._sources.length, e = void 0;
                    for (e = 0; t > e; e++) this._sources[e].offAny(this._$handlers[e]);
                },
                _emitIfFull: function() {
                    for (var t = !0, e = !1, n = this._latestValues.length, i = new Array(n), r = new Array(n), s = 0; n > s; s++) i[s] = this._latestValues[s], 
                    r[s] = this._latestErrors[s], i[s] === ne && (t = !1), void 0 !== r[s] && (e = !0);
                    if (t) {
                        var a = this._combinator;
                        this._emitValue(a(i));
                    }
                    e && this._emitError(At(r));
                },
                _handleAny: function(t, e) {
                    e.type === re || e.type === se ? (e.type === re && (this._latestValues[t] = e.value, 
                    this._latestErrors[t] = void 0), e.type === se && (this._latestValues[t] = ne, this._latestErrors[t] = {
                        index: this._latestErrorIndex++,
                        error: e.value
                    }), t < this._activeCount && (this._activating ? this._emitAfterActivation = !0 : this._emitIfFull())) : t < this._activeCount && (this._aliveCount--, 
                    0 === this._aliveCount && (this._activating ? this._endAfterActivation = !0 : this._emitEnd()));
                },
                _clear: function() {
                    v.prototype._clear.call(this), this._sources = null, this._latestValues = null, 
                    this._latestErrors = null, this._combinator = null, this._$handlers = null;
                }
            });
            var Qn = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t);
            };
            i(Mt, v, {
                _name: "zip",
                _onActivation: function() {
                    for (;this._isFull(); ) this._emit();
                    var t = this._sources.length;
                    this._aliveCount = t;
                    for (var e = 0; t > e && this._active; e++) this._sources[e].onAny(this._$handlers[e]);
                },
                _onDeactivation: function() {
                    for (var t = 0; t < this._sources.length; t++) this._sources[t].offAny(this._$handlers[t]);
                },
                _emit: function() {
                    for (var t = new Array(this._buffers.length), e = 0; e < this._buffers.length; e++) t[e] = this._buffers[e].shift();
                    var n = this._combinator;
                    this._emitValue(n(t));
                },
                _isFull: function() {
                    for (var t = 0; t < this._buffers.length; t++) if (0 === this._buffers[t].length) return !1;
                    return !0;
                },
                _handleAny: function(t, e) {
                    e.type === re && (this._buffers[t].push(e.value), this._isFull() && this._emit()), 
                    e.type === se && this._emitError(e.value), e.type === ie && (this._aliveCount--, 
                    0 === this._aliveCount && this._emitEnd());
                },
                _clear: function() {
                    v.prototype._clear.call(this), this._sources = null, this._buffers = null, this._combinator = null, 
                    this._$handlers = null;
                }
            });
            var ti = function(t) {
                return t;
            };
            i(Tt, v, {
                _name: "abstractPool",
                _add: function(t, e) {
                    e = e || ti, -1 === this._concurLim || this._curSources.length < this._concurLim ? this._addToCur(e(t)) : -1 === this._queueLim || this._queue.length < this._queueLim ? this._addToQueue(e(t)) : "old" === this._drop && (this._removeOldest(), 
                    this._add(t, e));
                },
                _addAll: function(t) {
                    var e = this;
                    l(t, function(t) {
                        return e._add(t);
                    });
                },
                _remove: function(t) {
                    -1 === this._removeCur(t) && this._removeQueue(t);
                },
                _addToQueue: function(t) {
                    this._queue = r(this._queue, [ t ]);
                },
                _addToCur: function(t) {
                    if (this._active) {
                        if (!t._alive) return void (t._currentEvent && this._emit(t._currentEvent.type, t._currentEvent.value));
                        this._currentlyAdding = t, t.onAny(this._$handleSubAny), this._currentlyAdding = null, 
                        t._alive && (this._curSources = r(this._curSources, [ t ]), this._active && this._subToEnd(t));
                    } else this._curSources = r(this._curSources, [ t ]);
                },
                _subToEnd: function(t) {
                    var e = this, n = function() {
                        return e._removeCur(t);
                    };
                    this._$endHandlers.push({
                        obs: t,
                        handler: n
                    }), t.onEnd(n);
                },
                _subscribe: function(t) {
                    t.onAny(this._$handleSubAny), this._active && this._subToEnd(t);
                },
                _unsubscribe: function(t) {
                    t.offAny(this._$handleSubAny);
                    var e = a(this._$endHandlers, function(e) {
                        return e.obs === t;
                    });
                    -1 !== e && (t.offEnd(this._$endHandlers[e].handler), this._$endHandlers.splice(e, 1));
                },
                _handleSubAny: function(t) {
                    t.type === re ? this._emitValue(t.value) : t.type === se && this._emitError(t.value);
                },
                _removeQueue: function(t) {
                    var e = s(this._queue, t);
                    return this._queue = u(this._queue, e), e;
                },
                _removeCur: function(t) {
                    this._active && this._unsubscribe(t);
                    var e = s(this._curSources, t);
                    return this._curSources = u(this._curSources, e), -1 !== e && (0 !== this._queue.length ? this._pullQueue() : 0 === this._curSources.length && this._onEmpty()), 
                    e;
                },
                _removeOldest: function() {
                    this._removeCur(this._curSources[0]);
                },
                _pullQueue: function() {
                    0 !== this._queue.length && (this._queue = o(this._queue), this._addToCur(this._queue.shift()));
                },
                _onActivation: function() {
                    for (var t = 0, e = this._curSources; t < e.length && this._active; t++) this._subscribe(e[t]);
                },
                _onDeactivation: function() {
                    for (var t = 0, e = this._curSources; t < e.length; t++) this._unsubscribe(e[t]);
                    null !== this._currentlyAdding && this._unsubscribe(this._currentlyAdding);
                },
                _isEmpty: function() {
                    return 0 === this._curSources.length;
                },
                _onEmpty: function() {},
                _clear: function() {
                    v.prototype._clear.call(this), this._queue = null, this._curSources = null, this._$handleSubAny = null, 
                    this._$endHandlers = null;
                }
            }), i(zt, Tt, {
                _name: "merge",
                _onEmpty: function() {
                    this._initialised && this._emitEnd();
                }
            }), i(Nt, v, {
                _name: "repeat",
                _handleAny: function(t) {
                    t.type === ie ? (this._source = null, this._getSource()) : this._emit(t.type, t.value);
                },
                _getSource: function() {
                    if (!this._inLoop) {
                        this._inLoop = !0;
                        for (var t = this._generator; null === this._source && this._alive && this._active; ) this._source = t(this._iteration++), 
                        this._source ? this._source.onAny(this._$handleAny) : this._emitEnd();
                        this._inLoop = !1;
                    }
                },
                _onActivation: function() {
                    this._source ? this._source.onAny(this._$handleAny) : this._getSource();
                },
                _onDeactivation: function() {
                    this._source && this._source.offAny(this._$handleAny);
                },
                _clear: function() {
                    v.prototype._clear.call(this), this._generator = null, this._source = null, this._$handleAny = null;
                }
            }), i(Bt, Tt, {
                _name: "pool",
                plug: function(t) {
                    return this._add(t), this;
                },
                unplug: function(t) {
                    return this._remove(t), this;
                }
            }), i(Dt, Tt, {
                _onActivation: function() {
                    Tt.prototype._onActivation.call(this), this._active && this._source.onAny(this._$handleMain);
                },
                _onDeactivation: function() {
                    Tt.prototype._onDeactivation.call(this), this._source.offAny(this._$handleMain), 
                    this._hadNoEvSinceDeact = !0;
                },
                _handleMain: function(t) {
                    if (t.type === re) {
                        var e = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === t.value;
                        e || this._add(t.value, this._fn), this._lastCurrent = t.value, this._hadNoEvSinceDeact = !1;
                    }
                    t.type === se && this._emitError(t.value), t.type === ie && (this._isEmpty() ? this._emitEnd() : this._mainEnded = !0);
                },
                _onEmpty: function() {
                    this._mainEnded && this._emitEnd();
                },
                _clear: function() {
                    Tt.prototype._clear.call(this), this._source = null, this._lastCurrent = null, this._$handleMain = null;
                }
            }), i(Rt, Dt, {
                _handleMain: function(t) {
                    if (t.type === se) {
                        var e = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === t.value;
                        e || this._add(t.value, this._fn), this._lastCurrent = t.value, this._hadNoEvSinceDeact = !1;
                    }
                    t.type === re && this._emitValue(t.value), t.type === ie && (this._isEmpty() ? this._emitEnd() : this._mainEnded = !0);
                }
            });
            var ei = {
                _handlePrimaryValue: function(t) {
                    this._lastSecondary !== ne && this._lastSecondary && this._emitValue(t);
                },
                _handleSecondaryEnd: function() {
                    this._lastSecondary !== ne && this._lastSecondary || this._emitEnd();
                }
            }, ni = $t("filterBy", ei), ii = Wt("filterBy", ei), ri = function(t, e) {
                return e;
            }, si = {
                _handlePrimaryValue: function(t) {
                    this._lastSecondary !== ne && this._emitValue(t);
                },
                _handleSecondaryEnd: function() {
                    this._lastSecondary === ne && this._emitEnd();
                }
            }, ai = $t("skipUntilBy", si), oi = Wt("skipUntilBy", si), ui = {
                _handleSecondaryValue: function() {
                    this._emitEnd();
                }
            }, hi = $t("takeUntilBy", ui), li = Wt("takeUntilBy", ui), ci = {
                _init: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = t.flushOnEnd, n = void 0 === e ? !0 : e;
                    this._buff = [], this._flushOnEnd = n;
                },
                _free: function() {
                    this._buff = null;
                },
                _flush: function() {
                    null !== this._buff && (this._emitValue(this._buff), this._buff = []);
                },
                _handlePrimaryEnd: function() {
                    this._flushOnEnd && this._flush(), this._emitEnd();
                },
                _onActivation: function() {
                    this._primary.onAny(this._$handlePrimaryAny), this._alive && null !== this._secondary && this._secondary.onAny(this._$handleSecondaryAny);
                },
                _handlePrimaryValue: function(t) {
                    this._buff.push(t);
                },
                _handleSecondaryValue: function() {
                    this._flush();
                },
                _handleSecondaryEnd: function() {
                    this._flushOnEnd || this._emitEnd();
                }
            }, fi = $t("bufferBy", ci), di = Wt("bufferBy", ci), _i = {
                _init: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], e = t.flushOnEnd, n = void 0 === e ? !0 : e, i = t.flushOnChange, r = void 0 === i ? !1 : i;
                    this._buff = [], this._flushOnEnd = n, this._flushOnChange = r;
                },
                _free: function() {
                    this._buff = null;
                },
                _flush: function() {
                    null !== this._buff && (this._emitValue(this._buff), this._buff = []);
                },
                _handlePrimaryEnd: function() {
                    this._flushOnEnd && this._flush(), this._emitEnd();
                },
                _handlePrimaryValue: function(t) {
                    this._buff.push(t), this._lastSecondary === ne || this._lastSecondary || this._flush();
                },
                _handleSecondaryEnd: function() {
                    this._flushOnEnd || this._lastSecondary !== ne && !this._lastSecondary || this._emitEnd();
                },
                _handleSecondaryValue: function(t) {
                    this._flushOnChange && !t && this._flush(), this._lastSecondary = t;
                }
            }, gi = $t("bufferWhileBy", _i), pi = Wt("bufferWhileBy", _i), vi = function() {
                return !1;
            }, mi = function() {
                return !0;
            }, yi = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleValue: function(t) {
                    var e = this._fn, n = e(t);
                    n.convert ? this._emitError(n.error) : this._emitValue(t);
                }
            }, wi = q("valuesToErrors", yi), bi = F("valuesToErrors", yi), xi = function(t) {
                return {
                    convert: !0,
                    error: t
                };
            }, Ci = {
                _init: function(t) {
                    var e = t.fn;
                    this._fn = e;
                },
                _free: function() {
                    this._fn = null;
                },
                _handleError: function(t) {
                    var e = this._fn, n = e(t);
                    n.convert ? this._emitValue(n.value) : this._emitError(t);
                }
            }, Si = q("errorsToValues", Ci), Ei = F("errorsToValues", Ci), Pi = function(t) {
                return {
                    convert: !0,
                    value: t
                };
            }, Ai = {
                _handleError: function(t) {
                    this._emitError(t), this._emitEnd();
                }
            }, ki = q("endOnError", Ai), Ii = F("endOnError", Ai);
            p.prototype.toProperty = function(t) {
                return $(this, t);
            }, p.prototype.changes = function() {
                return W(this);
            }, p.prototype.toPromise = function(t) {
                return Z(this, t);
            }, p.prototype.toESObservable = Y, p.prototype[G("observable")] = Y, p.prototype.map = function(t) {
                return K(this, t);
            }, p.prototype.filter = function(t) {
                return Q(this, t);
            }, p.prototype.take = function(t) {
                return tt(this, t);
            }, p.prototype.takeErrors = function(t) {
                return et(this, t);
            }, p.prototype.takeWhile = function(t) {
                return nt(this, t);
            }, p.prototype.last = function() {
                return it(this);
            }, p.prototype.skip = function(t) {
                return rt(this, t);
            }, p.prototype.skipWhile = function(t) {
                return st(this, t);
            }, p.prototype.skipDuplicates = function(t) {
                return at(this, t);
            }, p.prototype.diff = function(t, e) {
                return ut(this, t, e);
            }, p.prototype.scan = function(t, e) {
                return ht(this, t, e);
            }, p.prototype.flatten = function(t) {
                return lt(this, t);
            }, p.prototype.delay = function(t) {
                return ct(this, t);
            }, p.prototype.throttle = function(t, e) {
                return ft(this, t, e);
            }, p.prototype.debounce = function(t, e) {
                return dt(this, t, e);
            }, p.prototype.mapErrors = function(t) {
                return _t(this, t);
            }, p.prototype.filterErrors = function(t) {
                return gt(this, t);
            }, p.prototype.ignoreValues = function() {
                return pt(this);
            }, p.prototype.ignoreErrors = function() {
                return vt(this);
            }, p.prototype.ignoreEnd = function() {
                return mt(this);
            }, p.prototype.beforeEnd = function(t) {
                return yt(this, t);
            }, p.prototype.slidingWindow = function(t, e) {
                return wt(this, t, e);
            }, p.prototype.bufferWhile = function(t, e) {
                return bt(this, t, e);
            }, p.prototype.bufferWithCount = function(t, e) {
                return xt(this, t, e);
            }, p.prototype.bufferWithTimeOrCount = function(t, e, n) {
                return Ct(this, t, e, n);
            }, p.prototype.transduce = function(t) {
                return Et(this, t);
            }, p.prototype.withHandler = function(t) {
                return Pt(this, t);
            }, p.prototype.combine = function(t, e) {
                return It([ this, t ], e);
            }, p.prototype.zip = function(t, e) {
                return Ot([ this, t ], e);
            }, p.prototype.merge = function(t) {
                return Lt([ this, t ]);
            }, p.prototype.concat = function(t) {
                return jt([ this, t ]);
            };
            var Mi = function() {
                return new Bt();
            };
            p.prototype.flatMap = function(t) {
                return new Dt(this, t).setName(this, "flatMap");
            }, p.prototype.flatMapLatest = function(t) {
                return new Dt(this, t, {
                    concurLim: 1,
                    drop: "old"
                }).setName(this, "flatMapLatest");
            }, p.prototype.flatMapFirst = function(t) {
                return new Dt(this, t, {
                    concurLim: 1
                }).setName(this, "flatMapFirst");
            }, p.prototype.flatMapConcat = function(t) {
                return new Dt(this, t, {
                    queueLim: -1,
                    concurLim: 1
                }).setName(this, "flatMapConcat");
            }, p.prototype.flatMapConcurLimit = function(t, e) {
                return new Dt(this, t, {
                    queueLim: -1,
                    concurLim: e
                }).setName(this, "flatMapConcurLimit");
            }, p.prototype.flatMapErrors = function(t) {
                return new Rt(this, t).setName(this, "flatMapErrors");
            }, p.prototype.filterBy = function(t) {
                return Ht(this, t);
            }, p.prototype.sampledBy = function(t, e) {
                return Ut(this, t, e);
            }, p.prototype.skipUntilBy = function(t) {
                return Zt(this, t);
            }, p.prototype.takeUntilBy = function(t) {
                return Gt(this, t);
            }, p.prototype.bufferBy = function(t, e) {
                return Xt(this, t, e);
            }, p.prototype.bufferWhileBy = function(t, e) {
                return Jt(this, t, e);
            }, p.prototype.awaiting = function(t) {
                return ee("You are using deprecated .awaiting() method, see https://github.com/rpominov/kefir/issues/145"), 
                Yt(this, t);
            }, p.prototype.valuesToErrors = function(t) {
                return ee("You are using deprecated .valuesToErrors() method, see https://github.com/rpominov/kefir/issues/149"), 
                Kt(this, t);
            }, p.prototype.errorsToValues = function(t) {
                return ee("You are using deprecated .errorsToValues() method, see https://github.com/rpominov/kefir/issues/149"), 
                Qt(this, t);
            }, p.prototype.endOnError = function() {
                return ee("You are using deprecated .endOnError() method, see https://github.com/rpominov/kefir/issues/150"), 
                te(this);
            };
            var Oi = {
                Observable: p,
                Stream: v,
                Property: m,
                never: y,
                later: b,
                interval: x,
                sequentially: C,
                fromPoll: S,
                withInterval: P,
                fromCallback: I,
                fromNodeCallback: M,
                fromEvents: L,
                stream: k,
                constant: V,
                constantError: B,
                fromPromise: H,
                fromESObservable: X,
                combine: It,
                zip: Ot,
                merge: Lt,
                concat: jt,
                Pool: Bt,
                pool: Mi,
                repeat: Vt
            };
            Oi.Kefir = Oi, t.Kefir = Oi, t.Observable = p, t.Stream = v, t.Property = m, t.never = y, 
            t.later = b, t.interval = x, t.sequentially = C, t.fromPoll = S, t.withInterval = P, 
            t.fromCallback = I, t.fromNodeCallback = M, t.fromEvents = L, t.stream = k, t.constant = V, 
            t.constantError = B, t.fromPromise = H, t.fromESObservable = X, t.combine = It, 
            t.zip = Ot, t.merge = Lt, t.concat = jt, t.Pool = Bt, t.pool = Mi, t.repeat = Vt, 
            t["default"] = Oi;
        });
    },
    165: function(t, e, n) {
        var i, r, s = new function(a) {
            var o = new function() {
                function t(t, e, n, r, s) {
                    function a(i, a) {
                        a = a || (a = h(e, i)) && (a.get ? a : a.value), "string" == typeof a && "#" === a[0] && (a = t[a.substring(1)] || a);
                        var l, f = "function" == typeof a, d = a, _ = s || f && !a.base ? a && a.get ? i in t : t[i] : null;
                        s && _ || (f && _ && (a.base = _), f && r !== !1 && (l = i.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (u[l[3].toLowerCase() + l[4]] = l[2]), 
                        d && !f && d.get && "function" == typeof d.get && o.isPlainObject(d) || (d = {
                            value: d,
                            writable: !0
                        }), (h(t, i) || {
                            configurable: !0
                        }).configurable && (d.configurable = !0, d.enumerable = n), c(t, i, d));
                    }
                    var u = {};
                    if (e) {
                        for (var l in e) e.hasOwnProperty(l) && !i.test(l) && a(l);
                        for (var l in u) {
                            var f = u[l], d = t["set" + f], _ = t["get" + f] || d && t["is" + f];
                            !_ || r !== !0 && 0 !== _.length || a(l, {
                                get: _,
                                set: d
                            });
                        }
                    }
                    return t;
                }
                function e(t, e, n) {
                    return t && ("length" in t && !t.getLength && "number" == typeof t.length ? r : s).call(t, e, n = n || t), 
                    n;
                }
                function n(t, e, n) {
                    for (var i in e) !e.hasOwnProperty(i) || n && n[i] || (t[i] = e[i]);
                    return t;
                }
                var i = /^(statics|enumerable|beans|preserve)$/, r = [].forEach || function(t, e) {
                    for (var n = 0, i = this.length; i > n; n++) t.call(e, this[n], n, this);
                }, s = function(t, e) {
                    for (var n in this) this.hasOwnProperty(n) && t.call(e, this[n], n, this);
                }, u = Object.create || function(t) {
                    return {
                        __proto__: t
                    };
                }, h = Object.getOwnPropertyDescriptor || function(t, e) {
                    var n = t.__lookupGetter__ && t.__lookupGetter__(e);
                    return n ? {
                        get: n,
                        set: t.__lookupSetter__(e),
                        enumerable: !0,
                        configurable: !0
                    } : t.hasOwnProperty(e) ? {
                        value: t[e],
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    } : null;
                }, l = Object.defineProperty || function(t, e, n) {
                    return (n.get || n.set) && t.__defineGetter__ ? (n.get && t.__defineGetter__(e, n.get), 
                    n.set && t.__defineSetter__(e, n.set)) : t[e] = n.value, t;
                }, c = function(t, e, n) {
                    return delete t[e], l(t, e, n);
                };
                return t(function() {
                    for (var t = 0, e = arguments.length; e > t; t++) n(this, arguments[t]);
                }, {
                    inject: function(e) {
                        if (e) {
                            var n = e.statics === !0 ? e : e.statics, i = e.beans, r = e.preserve;
                            n !== e && t(this.prototype, e, e.enumerable, i, r), t(this, n, !0, i, r);
                        }
                        for (var s = 1, a = arguments.length; a > s; s++) this.inject(arguments[s]);
                        return this;
                    },
                    extend: function() {
                        for (var e, n, i = this, r = 0, s = arguments.length; s > r && !(e = arguments[r].initialize); r++) ;
                        return e = e || function() {
                            i.apply(this, arguments);
                        }, n = e.prototype = u(this.prototype), c(n, "constructor", {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }), t(e, this, !0), arguments.length && this.inject.apply(e, arguments), e.base = i, 
                        e;
                    }
                }, !0).inject({
                    inject: function() {
                        for (var e = 0, n = arguments.length; n > e; e++) {
                            var i = arguments[e];
                            i && t(this, i, i.enumerable, i.beans, i.preserve);
                        }
                        return this;
                    },
                    extend: function() {
                        var t = u(this);
                        return t.inject.apply(t, arguments);
                    },
                    each: function(t, n) {
                        return e(this, t, n);
                    },
                    set: function(t) {
                        return n(this, t);
                    },
                    clone: function() {
                        return new this.constructor(this);
                    },
                    statics: {
                        each: e,
                        create: u,
                        define: c,
                        describe: h,
                        set: n,
                        clone: function(t) {
                            return n(new t.constructor(), t);
                        },
                        isPlainObject: function(t) {
                            var e = null != t && t.constructor;
                            return e && (e === Object || e === o || "Object" === e.name);
                        },
                        pick: function(t, e) {
                            return t !== a ? t : e;
                        }
                    }
                });
            }();
            t.exports = o, o.inject({
                toString: function() {
                    return null != this._id ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id) : "{ " + o.each(this, function(t, e) {
                        if (!/^_/.test(e)) {
                            var n = typeof t;
                            this.push(e + ": " + ("number" === n ? c.instance.number(t) : "string" === n ? "'" + t + "'" : t));
                        }
                    }, []).join(", ") + " }";
                },
                getClassName: function() {
                    return this._class || "";
                },
                exportJSON: function(t) {
                    return o.exportJSON(this, t);
                },
                toJSON: function() {
                    return o.serialize(this);
                },
                _set: function(t, e, n) {
                    if (t && (n || o.isPlainObject(t))) {
                        for (var i = Object.keys(t._filtering || t), r = 0, s = i.length; s > r; r++) {
                            var u = i[r];
                            if (!e || !e[u]) {
                                var h = t[u];
                                h !== a && (this[u] = h);
                            }
                        }
                        return !0;
                    }
                },
                statics: {
                    exports: {
                        enumerable: !0
                    },
                    extend: function ot() {
                        var t = ot.base.apply(this, arguments), e = t.prototype._class;
                        return e && !o.exports[e] && (o.exports[e] = t), t;
                    },
                    equals: function(t, e) {
                        if (t === e) return !0;
                        if (t && t.equals) return t.equals(e);
                        if (e && e.equals) return e.equals(t);
                        if (t && e && "object" == typeof t && "object" == typeof e) {
                            if (Array.isArray(t) && Array.isArray(e)) {
                                var n = t.length;
                                if (n !== e.length) return !1;
                                for (;n--; ) if (!o.equals(t[n], e[n])) return !1;
                            } else {
                                var i = Object.keys(t), n = i.length;
                                if (n !== Object.keys(e).length) return !1;
                                for (;n--; ) {
                                    var r = i[n];
                                    if (!e.hasOwnProperty(r) || !o.equals(t[r], e[r])) return !1;
                                }
                            }
                            return !0;
                        }
                        return !1;
                    },
                    read: function(t, e, n, i) {
                        if (this === o) {
                            var r = this.peek(t, e);
                            return t.__index++, r;
                        }
                        var s = this.prototype, u = s._readIndex, h = e || u && t.__index || 0;
                        i || (i = t.length - h);
                        var l = t[h];
                        return l instanceof this || n && n.readNull && null == l && 1 >= i ? (u && (t.__index = h + 1), 
                        l && n && n.clone ? l.clone() : l) : (l = o.create(this.prototype), u && (l.__read = !0), 
                        l = l.initialize.apply(l, h > 0 || i < t.length ? Array.prototype.slice.call(t, h, h + i) : t) || l, 
                        u && (t.__index = h + l.__read, l.__read = a), l);
                    },
                    peek: function(t, e) {
                        return t[t.__index = e || t.__index || 0];
                    },
                    remain: function(t) {
                        return t.length - (t.__index || 0);
                    },
                    readAll: function(t, e, n) {
                        for (var i, r = [], s = e || 0, a = t.length; a > s; s++) r.push(Array.isArray(i = t[s]) ? this.read(i, 0, n) : this.read(t, s, n, 1));
                        return r;
                    },
                    readNamed: function(t, e, n, i, r) {
                        var s = this.getNamed(t, e), u = s !== a;
                        if (u) {
                            var h = t._filtered;
                            h || (h = t._filtered = o.create(t[0]), h._filtering = t[0]), h[e] = a;
                        }
                        return this.read(u ? [ s ] : t, n, i, r);
                    },
                    getNamed: function(t, e) {
                        var n = t[0];
                        return t._hasObject === a && (t._hasObject = 1 === t.length && o.isPlainObject(n)), 
                        t._hasObject ? e ? n[e] : t._filtered || n : void 0;
                    },
                    hasNamed: function(t, e) {
                        return !!this.getNamed(t, e);
                    },
                    isPlainValue: function(t, e) {
                        return this.isPlainObject(t) || Array.isArray(t) || e && "string" == typeof t;
                    },
                    serialize: function(t, e, n, i) {
                        e = e || {};
                        var r, s = !i;
                        if (s && (e.formatter = new c(e.precision), i = {
                            length: 0,
                            definitions: {},
                            references: {},
                            add: function(t, e) {
                                var n = "#" + t._id, i = this.references[n];
                                if (!i) {
                                    this.length++;
                                    var r = e.call(t), s = t._class;
                                    s && r[0] !== s && r.unshift(s), this.definitions[n] = r, i = this.references[n] = [ n ];
                                }
                                return i;
                            }
                        }), t && t._serialize) {
                            r = t._serialize(e, i);
                            var a = t._class;
                            !a || n || r._compact || r[0] === a || r.unshift(a);
                        } else if (Array.isArray(t)) {
                            r = [];
                            for (var u = 0, h = t.length; h > u; u++) r[u] = o.serialize(t[u], e, n, i);
                            n && (r._compact = !0);
                        } else if (o.isPlainObject(t)) {
                            r = {};
                            for (var l = Object.keys(t), u = 0, h = l.length; h > u; u++) {
                                var f = l[u];
                                r[f] = o.serialize(t[f], e, n, i);
                            }
                        } else r = "number" == typeof t ? e.formatter.number(t, e.precision) : t;
                        return s && i.length > 0 ? [ [ "dictionary", i.definitions ], r ] : r;
                    },
                    deserialize: function(t, e, n, i) {
                        var r = t, s = !n;
                        if (n = n || {}, Array.isArray(t)) {
                            var a = t[0], u = "dictionary" === a;
                            if (1 == t.length && /^#/.test(a)) return n.dictionary[a];
                            a = o.exports[a], r = [], i && (n.dictionary = r);
                            for (var h = a ? 1 : 0, l = t.length; l > h; h++) r.push(o.deserialize(t[h], e, n, u));
                            if (a) {
                                var c = r;
                                e ? r = e(a, c) : (r = o.create(a.prototype), a.apply(r, c));
                            }
                        } else if (o.isPlainObject(t)) {
                            r = {}, i && (n.dictionary = r);
                            for (var f in t) r[f] = o.deserialize(t[f], e, n);
                        }
                        return s && t && t.length && "dictionary" === t[0][0] ? r[1] : r;
                    },
                    exportJSON: function(t, e) {
                        var n = o.serialize(t, e);
                        return e && e.asString === !1 ? n : JSON.stringify(n);
                    },
                    importJSON: function(t, e) {
                        return o.deserialize("string" == typeof t ? JSON.parse(t) : t, function(t, n) {
                            var i = e && e.constructor === t ? e : o.create(t.prototype), r = i === e;
                            if (1 === n.length && i instanceof S && (r || !(i instanceof P))) {
                                var s = n[0];
                                o.isPlainObject(s) && (s.insert = !1);
                            }
                            return t.apply(i, n), r && (e = null), i;
                        });
                    },
                    splice: function(t, e, n, i) {
                        var r = e && e.length, s = n === a;
                        n = s ? t.length : n, n > t.length && (n = t.length);
                        for (var o = 0; r > o; o++) e[o]._index = n + o;
                        if (s) return t.push.apply(t, e), [];
                        var u = [ n, i ];
                        e && u.push.apply(u, e);
                        for (var h = t.splice.apply(t, u), o = 0, l = h.length; l > o; o++) h[o]._index = a;
                        for (var o = n + r, l = t.length; l > o; o++) t[o]._index = o;
                        return h;
                    },
                    capitalize: function(t) {
                        return t.replace(/\b[a-z]/g, function(t) {
                            return t.toUpperCase();
                        });
                    },
                    camelize: function(t) {
                        return t.replace(/-(.)/g, function(t, e) {
                            return e.toUpperCase();
                        });
                    },
                    hyphenate: function(t) {
                        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    }
                }
            });
            var u = {
                on: function(t, e) {
                    if ("string" != typeof t) o.each(t, function(t, e) {
                        this.on(e, t);
                    }, this); else {
                        var n = this._eventTypes, i = n && n[t], r = this._callbacks = this._callbacks || {};
                        r = r[t] = r[t] || [], -1 === r.indexOf(e) && (r.push(e), i && i.install && 1 === r.length && i.install.call(this, t));
                    }
                    return this;
                },
                off: function(t, e) {
                    if ("string" != typeof t) return void o.each(t, function(t, e) {
                        this.off(e, t);
                    }, this);
                    var n, i = this._eventTypes, r = i && i[t], s = this._callbacks && this._callbacks[t];
                    return s && (!e || -1 !== (n = s.indexOf(e)) && 1 === s.length ? (r && r.uninstall && r.uninstall.call(this, t), 
                    delete this._callbacks[t]) : -1 !== n && s.splice(n, 1)), this;
                },
                once: function(t, e) {
                    return this.on(t, function() {
                        e.apply(this, arguments), this.off(t, e);
                    });
                },
                emit: function(t, e) {
                    var n = this._callbacks && this._callbacks[t];
                    if (!n) return !1;
                    var i = [].slice.call(arguments, 1);
                    n = n.slice();
                    for (var r = 0, s = n.length; s > r; r++) if (n[r].apply(this, i) === !1) {
                        e && e.stop && e.stop();
                        break;
                    }
                    return !0;
                },
                responds: function(t) {
                    return !(!this._callbacks || !this._callbacks[t]);
                },
                attach: "#on",
                detach: "#off",
                fire: "#emit",
                _installEvents: function(t) {
                    var e = this._callbacks, n = t ? "install" : "uninstall";
                    for (var i in e) if (e[i].length > 0) {
                        var r = this._eventTypes, s = r && r[i], a = s && s[n];
                        a && a.call(this, i);
                    }
                },
                statics: {
                    inject: function ut(t) {
                        var e = t._events;
                        if (e) {
                            var n = {};
                            o.each(e, function(e, i) {
                                var r = "string" == typeof e, s = r ? e : i, a = o.capitalize(s), u = s.substring(2).toLowerCase();
                                n[u] = r ? {} : e, s = "_" + s, t["get" + a] = function() {
                                    return this[s];
                                }, t["set" + a] = function(t) {
                                    var e = this[s];
                                    e && this.off(u, e), t && this.on(u, t), this[s] = t;
                                };
                            }), t._eventTypes = n;
                        }
                        return ut.base.apply(this, arguments);
                    }
                }
            }, h = o.extend({
                _class: "PaperScope",
                initialize: function ht() {
                    s = this, this.settings = new o({
                        applyMatrix: !0,
                        handleSize: 4,
                        hitTolerance: 0
                    }), this.project = null, this.projects = [], this.tools = [], this.palettes = [], 
                    this._id = ht._id++, ht._scopes[this._id] = this;
                    var t = ht.prototype;
                    if (!this.support) {
                        var e = it.getContext(1, 1);
                        t.support = {
                            nativeDash: "setLineDash" in e || "mozDash" in e,
                            nativeBlendModes: rt.nativeModes
                        }, it.release(e);
                    }
                    if (!this.browser) {
                        var n = navigator.userAgent.toLowerCase(), i = (/(win)/.exec(n) || /(mac)/.exec(n) || /(linux)/.exec(n) || [])[0], r = t.browser = {
                            platform: i
                        };
                        i && (r[i] = !0), n.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:([.\d]+))?/g, function(t, e, n, i, s) {
                            if (!r.chrome) {
                                var a = "opera" === e ? i : n;
                                "trident" === e && (a = s, e = "msie"), r.version = a, r.versionNumber = parseFloat(a), 
                                r.name = e, r[e] = !0;
                            }
                        }), r.chrome && delete r.webkit, r.atom && delete r.chrome;
                    }
                },
                version: "0.9.25",
                getView: function() {
                    return this.project && this.project.getView();
                },
                getPaper: function() {
                    return this;
                },
                execute: function(t, e, n) {
                    s.PaperScript.execute(t, this, e, n), G.updateFocus();
                },
                install: function(t) {
                    var e = this;
                    o.each([ "project", "view", "tool" ], function(n) {
                        o.define(t, n, {
                            configurable: !0,
                            get: function() {
                                return e[n];
                            }
                        });
                    });
                    for (var n in this) !/^_/.test(n) && this[n] && (t[n] = this[n]);
                },
                setup: function(t) {
                    return s = this, this.project = new x(t), this;
                },
                activate: function() {
                    s = this;
                },
                clear: function() {
                    for (var t = this.projects.length - 1; t >= 0; t--) this.projects[t].remove();
                    for (var t = this.tools.length - 1; t >= 0; t--) this.tools[t].remove();
                    for (var t = this.palettes.length - 1; t >= 0; t--) this.palettes[t].remove();
                },
                remove: function() {
                    this.clear(), delete h._scopes[this._id];
                },
                statics: new function() {
                    function t(t) {
                        return t += "Attribute", function(e, n) {
                            return e[t](n) || e[t]("data-paper-" + n);
                        };
                    }
                    return {
                        _scopes: {},
                        _id: 0,
                        get: function(t) {
                            return this._scopes[t] || null;
                        },
                        getAttribute: t("get"),
                        hasAttribute: t("has")
                    };
                }()
            }), l = o.extend(u, {
                initialize: function(t) {
                    this._scope = s, this._index = this._scope[this._list].push(this) - 1, !t && this._scope[this._reference] || this.activate();
                },
                activate: function() {
                    if (!this._scope) return !1;
                    var t = this._scope[this._reference];
                    return t && t !== this && t.emit("deactivate"), this._scope[this._reference] = this, 
                    this.emit("activate", t), !0;
                },
                isActive: function() {
                    return this._scope[this._reference] === this;
                },
                remove: function() {
                    return null == this._index ? !1 : (o.splice(this._scope[this._list], null, this._index, 1), 
                    this._scope[this._reference] == this && (this._scope[this._reference] = null), this._scope = null, 
                    !0);
                }
            }), c = o.extend({
                initialize: function(t) {
                    this.precision = t || 5, this.multiplier = Math.pow(10, this.precision);
                },
                number: function(t) {
                    return Math.round(t * this.multiplier) / this.multiplier;
                },
                pair: function(t, e, n) {
                    return this.number(t) + (n || ",") + this.number(e);
                },
                point: function(t, e) {
                    return this.number(t.x) + (e || ",") + this.number(t.y);
                },
                size: function(t, e) {
                    return this.number(t.width) + (e || ",") + this.number(t.height);
                },
                rectangle: function(t, e) {
                    return this.point(t, e) + (e || ",") + this.size(t, e);
                }
            });
            c.instance = new c();
            var f = new function() {
                function t(t, e, n) {
                    return e > t ? e : t > n ? n : t;
                }
                var e = [ [ .5773502691896257 ], [ 0, .7745966692414834 ], [ .33998104358485626, .8611363115940526 ], [ 0, .5384693101056831, .906179845938664 ], [ .2386191860831969, .6612093864662645, .932469514203152 ], [ 0, .4058451513773972, .7415311855993945, .9491079123427585 ], [ .1834346424956498, .525532409916329, .7966664774136267, .9602898564975363 ], [ 0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261 ], [ .14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717 ], [ 0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057 ], [ .1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192 ], [ 0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881 ], [ .10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123 ], [ 0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854 ], [ .09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499 ] ], n = [ [ 1 ], [ .8888888888888888, .5555555555555556 ], [ .6521451548625461, .34785484513745385 ], [ .5688888888888889, .47862867049936647, .23692688505618908 ], [ .46791393457269104, .3607615730481386, .17132449237917036 ], [ .4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697 ], [ .362683783378362, .31370664587788727, .22238103445337448, .10122853629037626 ], [ .3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441 ], [ .29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814 ], [ .2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366 ], [ .24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183 ], [ .2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588 ], [ .2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186 ], [ .2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727 ], [ .1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096 ] ], i = Math.abs, r = Math.sqrt, s = Math.pow, a = 1e-12, o = 1.12e-16;
                return {
                    TOLERANCE: 1e-6,
                    EPSILON: a,
                    MACHINE_EPSILON: o,
                    CURVETIME_EPSILON: 4e-7,
                    GEOMETRIC_EPSILON: 2e-7,
                    WINDING_EPSILON: 2e-7,
                    TRIGONOMETRIC_EPSILON: 1e-7,
                    CLIPPING_EPSILON: 1e-7,
                    KAPPA: 4 * (r(2) - 1) / 3,
                    isZero: function(t) {
                        return t >= -a && a >= t;
                    },
                    integrate: function(t, i, r, s) {
                        for (var a = e[s - 2], o = n[s - 2], u = .5 * (r - i), h = u + i, l = 0, c = s + 1 >> 1, f = 1 & s ? o[l++] * t(h) : 0; c > l; ) {
                            var d = u * a[l];
                            f += o[l++] * (t(h + d) + t(h - d));
                        }
                        return u * f;
                    },
                    findRoot: function(t, e, n, r, s, a, o) {
                        for (var u = 0; a > u; u++) {
                            var h = t(n), l = h / e(n), c = n - l;
                            if (i(l) < o) return c;
                            h > 0 ? (s = n, n = r >= c ? .5 * (r + s) : c) : (r = n, n = c >= s ? .5 * (r + s) : c);
                        }
                        return n;
                    },
                    solveQuadratic: function(e, n, u, h, l, c) {
                        var f, d, _ = 0, g = l - a, p = c + a, v = 1 / 0, m = n;
                        if (n /= -2, d = n * n - e * u, 0 !== d && i(d) < o) {
                            var y = s(i(e * n * u), 1 / 3);
                            if (1e-8 > y) {
                                var w = s(10, i(Math.floor(Math.log(y) * Math.LOG10E)));
                                isFinite(w) || (w = 0), e *= w, n *= w, u *= w, d = n * n - e * u;
                            }
                        }
                        if (i(e) < a) {
                            if (i(m) < a) return i(u) < a ? -1 : 0;
                            f = -u / m;
                        } else if (d >= -o) {
                            var b = 0 > d ? 0 : r(d), x = n + (0 > n ? -b : b);
                            0 === x ? (f = u / e, v = -f) : (f = x / e, v = u / x);
                        }
                        return isFinite(f) && (null == l || f > g && p > f) && (h[_++] = null == l ? f : t(f, l, c)), 
                        v !== f && isFinite(v) && (null == l || v > g && p > v) && (h[_++] = null == l ? v : t(v, l, c)), 
                        _;
                    },
                    solveCubic: function(e, n, u, h, l, c, d) {
                        var _, g, p, v = 0;
                        if (i(e) < a) e = n, g = u, p = h, _ = 1 / 0; else if (i(h) < a) g = n, p = u, _ = 0; else {
                            var m, y, w, b, x, C, S, E = 1 + o;
                            if (_ = -(n / e) / 3, S = e * _, g = S + n, p = g * _ + u, w = (S + g) * _ + p, 
                            y = p * _ + h, b = y / e, x = s(i(b), 1 / 3), C = 0 > b ? -1 : 1, b = -w / e, x = b > 0 ? 1.3247179572 * Math.max(x, r(b)) : x, 
                            m = _ - C * x, m !== _) {
                                do if (_ = m, S = e * _, g = S + n, p = g * _ + u, w = (S + g) * _ + p, y = p * _ + h, 
                                m = 0 === w ? _ : _ - y / w / E, m === _) {
                                    _ = m;
                                    break;
                                } while (C * m > C * _);
                                i(e) * _ * _ > i(h / _) && (p = -h / _, g = (p - u) / _);
                            }
                        }
                        var v = f.solveQuadratic(e, g, p, l, c, d);
                        return isFinite(_) && (0 === v || _ !== l[v - 1]) && (null == c || _ > c - a && d + a > _) && (l[v++] = null == c ? _ : t(_, c, d)), 
                        v;
                    }
                };
            }(), d = {
                _id: 1,
                _pools: {},
                get: function(t) {
                    if (t) {
                        var e = t._class, n = this._pools[e];
                        return n || (n = this._pools[e] = {
                            _id: 1
                        }), n._id++;
                    }
                    return this._id++;
                }
            }, _ = o.extend({
                _class: "Point",
                _readIndex: !0,
                initialize: function(t, e) {
                    var n = typeof t;
                    if ("number" === n) {
                        var i = "number" == typeof e;
                        this.x = t, this.y = i ? e : t, this.__read && (this.__read = i ? 2 : 1);
                    } else "undefined" === n || null === t ? (this.x = this.y = 0, this.__read && (this.__read = null === t ? 1 : 0)) : (Array.isArray(t) ? (this.x = t[0], 
                    this.y = t.length > 1 ? t[1] : t[0]) : null != t.x ? (this.x = t.x, this.y = t.y) : null != t.width ? (this.x = t.width, 
                    this.y = t.height) : null != t.angle ? (this.x = t.length, this.y = 0, this.setAngle(t.angle)) : (this.x = this.y = 0, 
                    this.__read && (this.__read = 0)), this.__read && (this.__read = 1));
                },
                set: function(t, e) {
                    return this.x = t, this.y = e, this;
                },
                equals: function(t) {
                    return this === t || t && (this.x === t.x && this.y === t.y || Array.isArray(t) && this.x === t[0] && this.y === t[1]) || !1;
                },
                clone: function() {
                    return new _(this.x, this.y);
                },
                toString: function() {
                    var t = c.instance;
                    return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + " }";
                },
                _serialize: function(t) {
                    var e = t.formatter;
                    return [ e.number(this.x), e.number(this.y) ];
                },
                getLength: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                },
                setLength: function(t) {
                    if (this.isZero()) {
                        var e = this._angle || 0;
                        this.set(Math.cos(e) * t, Math.sin(e) * t);
                    } else {
                        var n = t / this.getLength();
                        f.isZero(n) && this.getAngle(), this.set(this.x * n, this.y * n);
                    }
                },
                getAngle: function() {
                    return 180 * this.getAngleInRadians.apply(this, arguments) / Math.PI;
                },
                setAngle: function(t) {
                    this.setAngleInRadians.call(this, t * Math.PI / 180);
                },
                getAngleInDegrees: "#getAngle",
                setAngleInDegrees: "#setAngle",
                getAngleInRadians: function() {
                    if (arguments.length) {
                        var t = _.read(arguments), e = this.getLength() * t.getLength();
                        if (f.isZero(e)) return NaN;
                        var n = this.dot(t) / e;
                        return Math.acos(-1 > n ? -1 : n > 1 ? 1 : n);
                    }
                    return this.isZero() ? this._angle || 0 : this._angle = Math.atan2(this.y, this.x);
                },
                setAngleInRadians: function(t) {
                    if (this._angle = t, !this.isZero()) {
                        var e = this.getLength();
                        this.set(Math.cos(t) * e, Math.sin(t) * e);
                    }
                },
                getQuadrant: function() {
                    return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
                }
            }, {
                beans: !1,
                getDirectedAngle: function() {
                    var t = _.read(arguments);
                    return 180 * Math.atan2(this.cross(t), this.dot(t)) / Math.PI;
                },
                getDistance: function() {
                    var t = _.read(arguments), e = t.x - this.x, n = t.y - this.y, i = e * e + n * n, r = o.read(arguments);
                    return r ? i : Math.sqrt(i);
                },
                normalize: function(t) {
                    t === a && (t = 1);
                    var e = this.getLength(), n = 0 !== e ? t / e : 0, i = new _(this.x * n, this.y * n);
                    return n >= 0 && (i._angle = this._angle), i;
                },
                rotate: function(t, e) {
                    if (0 === t) return this.clone();
                    t = t * Math.PI / 180;
                    var n = e ? this.subtract(e) : this, i = Math.sin(t), r = Math.cos(t);
                    return n = new _(n.x * r - n.y * i, n.x * i + n.y * r), e ? n.add(e) : n;
                },
                transform: function(t) {
                    return t ? t._transformPoint(this) : this;
                },
                add: function() {
                    var t = _.read(arguments);
                    return new _(this.x + t.x, this.y + t.y);
                },
                subtract: function() {
                    var t = _.read(arguments);
                    return new _(this.x - t.x, this.y - t.y);
                },
                multiply: function() {
                    var t = _.read(arguments);
                    return new _(this.x * t.x, this.y * t.y);
                },
                divide: function() {
                    var t = _.read(arguments);
                    return new _(this.x / t.x, this.y / t.y);
                },
                modulo: function() {
                    var t = _.read(arguments);
                    return new _(this.x % t.x, this.y % t.y);
                },
                negate: function() {
                    return new _(-this.x, -this.y);
                },
                isInside: function() {
                    return m.read(arguments).contains(this);
                },
                isClose: function() {
                    var t = _.read(arguments), e = o.read(arguments);
                    return this.getDistance(t) < e;
                },
                isCollinear: function() {
                    var t = _.read(arguments);
                    return _.isCollinear(this.x, this.y, t.x, t.y);
                },
                isColinear: "#isCollinear",
                isOrthogonal: function() {
                    var t = _.read(arguments);
                    return _.isOrthogonal(this.x, this.y, t.x, t.y);
                },
                isZero: function() {
                    return f.isZero(this.x) && f.isZero(this.y);
                },
                isNaN: function() {
                    return isNaN(this.x) || isNaN(this.y);
                },
                dot: function() {
                    var t = _.read(arguments);
                    return this.x * t.x + this.y * t.y;
                },
                cross: function() {
                    var t = _.read(arguments);
                    return this.x * t.y - this.y * t.x;
                },
                project: function() {
                    var t = _.read(arguments), e = t.isZero() ? 0 : this.dot(t) / t.dot(t);
                    return new _(t.x * e, t.y * e);
                },
                statics: {
                    min: function() {
                        var t = _.read(arguments), e = _.read(arguments);
                        return new _(Math.min(t.x, e.x), Math.min(t.y, e.y));
                    },
                    max: function() {
                        var t = _.read(arguments), e = _.read(arguments);
                        return new _(Math.max(t.x, e.x), Math.max(t.y, e.y));
                    },
                    random: function() {
                        return new _(Math.random(), Math.random());
                    },
                    isCollinear: function(t, e, n, i) {
                        return Math.abs(t * i - e * n) <= 1e-7 * Math.sqrt((t * t + e * e) * (n * n + i * i));
                    },
                    isOrthogonal: function(t, e, n, i) {
                        return Math.abs(t * n + e * i) <= 1e-7 * Math.sqrt((t * t + e * e) * (n * n + i * i));
                    }
                }
            }, o.each([ "round", "ceil", "floor", "abs" ], function(t) {
                var e = Math[t];
                this[t] = function() {
                    return new _(e(this.x), e(this.y));
                };
            }, {})), g = _.extend({
                initialize: function(t, e, n, i) {
                    this._x = t, this._y = e, this._owner = n, this._setter = i;
                },
                set: function(t, e, n) {
                    return this._x = t, this._y = e, n || this._owner[this._setter](this), this;
                },
                getX: function() {
                    return this._x;
                },
                setX: function(t) {
                    this._x = t, this._owner[this._setter](this);
                },
                getY: function() {
                    return this._y;
                },
                setY: function(t) {
                    this._y = t, this._owner[this._setter](this);
                }
            }), p = o.extend({
                _class: "Size",
                _readIndex: !0,
                initialize: function(t, e) {
                    var n = typeof t;
                    if ("number" === n) {
                        var i = "number" == typeof e;
                        this.width = t, this.height = i ? e : t, this.__read && (this.__read = i ? 2 : 1);
                    } else "undefined" === n || null === t ? (this.width = this.height = 0, this.__read && (this.__read = null === t ? 1 : 0)) : (Array.isArray(t) ? (this.width = t[0], 
                    this.height = t.length > 1 ? t[1] : t[0]) : null != t.width ? (this.width = t.width, 
                    this.height = t.height) : null != t.x ? (this.width = t.x, this.height = t.y) : (this.width = this.height = 0, 
                    this.__read && (this.__read = 0)), this.__read && (this.__read = 1));
                },
                set: function(t, e) {
                    return this.width = t, this.height = e, this;
                },
                equals: function(t) {
                    return t === this || t && (this.width === t.width && this.height === t.height || Array.isArray(t) && this.width === t[0] && this.height === t[1]) || !1;
                },
                clone: function() {
                    return new p(this.width, this.height);
                },
                toString: function() {
                    var t = c.instance;
                    return "{ width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
                },
                _serialize: function(t) {
                    var e = t.formatter;
                    return [ e.number(this.width), e.number(this.height) ];
                },
                add: function() {
                    var t = p.read(arguments);
                    return new p(this.width + t.width, this.height + t.height);
                },
                subtract: function() {
                    var t = p.read(arguments);
                    return new p(this.width - t.width, this.height - t.height);
                },
                multiply: function() {
                    var t = p.read(arguments);
                    return new p(this.width * t.width, this.height * t.height);
                },
                divide: function() {
                    var t = p.read(arguments);
                    return new p(this.width / t.width, this.height / t.height);
                },
                modulo: function() {
                    var t = p.read(arguments);
                    return new p(this.width % t.width, this.height % t.height);
                },
                negate: function() {
                    return new p(-this.width, -this.height);
                },
                isZero: function() {
                    return f.isZero(this.width) && f.isZero(this.height);
                },
                isNaN: function() {
                    return isNaN(this.width) || isNaN(this.height);
                },
                statics: {
                    min: function(t, e) {
                        return new p(Math.min(t.width, e.width), Math.min(t.height, e.height));
                    },
                    max: function(t, e) {
                        return new p(Math.max(t.width, e.width), Math.max(t.height, e.height));
                    },
                    random: function() {
                        return new p(Math.random(), Math.random());
                    }
                }
            }, o.each([ "round", "ceil", "floor", "abs" ], function(t) {
                var e = Math[t];
                this[t] = function() {
                    return new p(e(this.width), e(this.height));
                };
            }, {})), v = p.extend({
                initialize: function(t, e, n, i) {
                    this._width = t, this._height = e, this._owner = n, this._setter = i;
                },
                set: function(t, e, n) {
                    return this._width = t, this._height = e, n || this._owner[this._setter](this), 
                    this;
                },
                getWidth: function() {
                    return this._width;
                },
                setWidth: function(t) {
                    this._width = t, this._owner[this._setter](this);
                },
                getHeight: function() {
                    return this._height;
                },
                setHeight: function(t) {
                    this._height = t, this._owner[this._setter](this);
                }
            }), m = o.extend({
                _class: "Rectangle",
                _readIndex: !0,
                beans: !0,
                initialize: function(t, e, n, i) {
                    var r = typeof t, s = 0;
                    if ("number" === r ? (this.x = t, this.y = e, this.width = n, this.height = i, s = 4) : "undefined" === r || null === t ? (this.x = this.y = this.width = this.height = 0, 
                    s = null === t ? 1 : 0) : 1 === arguments.length && (Array.isArray(t) ? (this.x = t[0], 
                    this.y = t[1], this.width = t[2], this.height = t[3], s = 1) : t.x !== a || t.width !== a ? (this.x = t.x || 0, 
                    this.y = t.y || 0, this.width = t.width || 0, this.height = t.height || 0, s = 1) : t.from === a && t.to === a && (this.x = this.y = this.width = this.height = 0, 
                    this._set(t), s = 1)), !s) {
                        var u = _.readNamed(arguments, "from"), h = o.peek(arguments);
                        if (this.x = u.x, this.y = u.y, h && h.x !== a || o.hasNamed(arguments, "to")) {
                            var l = _.readNamed(arguments, "to");
                            this.width = l.x - u.x, this.height = l.y - u.y, this.width < 0 && (this.x = l.x, 
                            this.width = -this.width), this.height < 0 && (this.y = l.y, this.height = -this.height);
                        } else {
                            var c = p.read(arguments);
                            this.width = c.width, this.height = c.height;
                        }
                        s = arguments.__index;
                    }
                    this.__read && (this.__read = s);
                },
                set: function(t, e, n, i) {
                    return this.x = t, this.y = e, this.width = n, this.height = i, this;
                },
                clone: function() {
                    return new m(this.x, this.y, this.width, this.height);
                },
                equals: function(t) {
                    var e = o.isPlainValue(t) ? m.read(arguments) : t;
                    return e === this || e && this.x === e.x && this.y === e.y && this.width === e.width && this.height === e.height || !1;
                },
                toString: function() {
                    var t = c.instance;
                    return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + ", width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
                },
                _serialize: function(t) {
                    var e = t.formatter;
                    return [ e.number(this.x), e.number(this.y), e.number(this.width), e.number(this.height) ];
                },
                getPoint: function(t) {
                    var e = t ? _ : g;
                    return new e(this.x, this.y, this, "setPoint");
                },
                setPoint: function() {
                    var t = _.read(arguments);
                    this.x = t.x, this.y = t.y;
                },
                getSize: function(t) {
                    var e = t ? p : v;
                    return new e(this.width, this.height, this, "setSize");
                },
                setSize: function() {
                    var t = p.read(arguments);
                    this._fixX && (this.x += (this.width - t.width) * this._fixX), this._fixY && (this.y += (this.height - t.height) * this._fixY), 
                    this.width = t.width, this.height = t.height, this._fixW = 1, this._fixH = 1;
                },
                getLeft: function() {
                    return this.x;
                },
                setLeft: function(t) {
                    this._fixW || (this.width -= t - this.x), this.x = t, this._fixX = 0;
                },
                getTop: function() {
                    return this.y;
                },
                setTop: function(t) {
                    this._fixH || (this.height -= t - this.y), this.y = t, this._fixY = 0;
                },
                getRight: function() {
                    return this.x + this.width;
                },
                setRight: function(t) {
                    this._fixX !== a && 1 !== this._fixX && (this._fixW = 0), this._fixW ? this.x = t - this.width : this.width = t - this.x, 
                    this._fixX = 1;
                },
                getBottom: function() {
                    return this.y + this.height;
                },
                setBottom: function(t) {
                    this._fixY !== a && 1 !== this._fixY && (this._fixH = 0), this._fixH ? this.y = t - this.height : this.height = t - this.y, 
                    this._fixY = 1;
                },
                getCenterX: function() {
                    return this.x + .5 * this.width;
                },
                setCenterX: function(t) {
                    this.x = t - .5 * this.width, this._fixX = .5;
                },
                getCenterY: function() {
                    return this.y + .5 * this.height;
                },
                setCenterY: function(t) {
                    this.y = t - .5 * this.height, this._fixY = .5;
                },
                getCenter: function(t) {
                    var e = t ? _ : g;
                    return new e(this.getCenterX(), this.getCenterY(), this, "setCenter");
                },
                setCenter: function() {
                    var t = _.read(arguments);
                    return this.setCenterX(t.x), this.setCenterY(t.y), this;
                },
                getArea: function() {
                    return this.width * this.height;
                },
                isEmpty: function() {
                    return 0 === this.width || 0 === this.height;
                },
                contains: function(t) {
                    return t && t.width !== a || 4 == (Array.isArray(t) ? t : arguments).length ? this._containsRectangle(m.read(arguments)) : this._containsPoint(_.read(arguments));
                },
                _containsPoint: function(t) {
                    var e = t.x, n = t.y;
                    return e >= this.x && n >= this.y && e <= this.x + this.width && n <= this.y + this.height;
                },
                _containsRectangle: function(t) {
                    var e = t.x, n = t.y;
                    return e >= this.x && n >= this.y && e + t.width <= this.x + this.width && n + t.height <= this.y + this.height;
                },
                intersects: function() {
                    var t = m.read(arguments);
                    return t.x + t.width > this.x && t.y + t.height > this.y && t.x < this.x + this.width && t.y < this.y + this.height;
                },
                touches: function() {
                    var t = m.read(arguments);
                    return t.x + t.width >= this.x && t.y + t.height >= this.y && t.x <= this.x + this.width && t.y <= this.y + this.height;
                },
                intersect: function() {
                    var t = m.read(arguments), e = Math.max(this.x, t.x), n = Math.max(this.y, t.y), i = Math.min(this.x + this.width, t.x + t.width), r = Math.min(this.y + this.height, t.y + t.height);
                    return new m(e, n, i - e, r - n);
                },
                unite: function() {
                    var t = m.read(arguments), e = Math.min(this.x, t.x), n = Math.min(this.y, t.y), i = Math.max(this.x + this.width, t.x + t.width), r = Math.max(this.y + this.height, t.y + t.height);
                    return new m(e, n, i - e, r - n);
                },
                include: function() {
                    var t = _.read(arguments), e = Math.min(this.x, t.x), n = Math.min(this.y, t.y), i = Math.max(this.x + this.width, t.x), r = Math.max(this.y + this.height, t.y);
                    return new m(e, n, i - e, r - n);
                },
                expand: function() {
                    var t = p.read(arguments), e = t.width, n = t.height;
                    return new m(this.x - e / 2, this.y - n / 2, this.width + e, this.height + n);
                },
                scale: function(t, e) {
                    return this.expand(this.width * t - this.width, this.height * (e === a ? t : e) - this.height);
                }
            }, o.each([ [ "Top", "Left" ], [ "Top", "Right" ], [ "Bottom", "Left" ], [ "Bottom", "Right" ], [ "Left", "Center" ], [ "Top", "Center" ], [ "Right", "Center" ], [ "Bottom", "Center" ] ], function(t, e) {
                var n = t.join(""), i = /^[RL]/.test(n);
                e >= 4 && (t[1] += i ? "Y" : "X");
                var r = t[i ? 0 : 1], s = t[i ? 1 : 0], a = "get" + r, o = "get" + s, u = "set" + r, h = "set" + s, l = "get" + n, c = "set" + n;
                this[l] = function(t) {
                    var e = t ? _ : g;
                    return new e(this[a](), this[o](), this, c);
                }, this[c] = function() {
                    var t = _.read(arguments);
                    this[u](t.x), this[h](t.y);
                };
            }, {
                beans: !0
            })), y = m.extend({
                initialize: function(t, e, n, i, r, s) {
                    this.set(t, e, n, i, !0), this._owner = r, this._setter = s;
                },
                set: function(t, e, n, i, r) {
                    return this._x = t, this._y = e, this._width = n, this._height = i, r || this._owner[this._setter](this), 
                    this;
                }
            }, new function() {
                var t = m.prototype;
                return o.each([ "x", "y", "width", "height" ], function(t) {
                    var e = o.capitalize(t), n = "_" + t;
                    this["get" + e] = function() {
                        return this[n];
                    }, this["set" + e] = function(t) {
                        this[n] = t, this._dontNotify || this._owner[this._setter](this);
                    };
                }, o.each([ "Point", "Size", "Center", "Left", "Top", "Right", "Bottom", "CenterX", "CenterY", "TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter" ], function(e) {
                    var n = "set" + e;
                    this[n] = function() {
                        this._dontNotify = !0, t[n].apply(this, arguments), this._dontNotify = !1, this._owner[this._setter](this);
                    };
                }, {
                    isSelected: function() {
                        return this._owner._boundsSelected;
                    },
                    setSelected: function(t) {
                        var e = this._owner;
                        e.setSelected && (e._boundsSelected = t, e.setSelected(t || e._selectedSegmentState > 0));
                    }
                }));
            }()), w = o.extend({
                _class: "Matrix",
                initialize: function lt(t) {
                    var e = arguments.length, n = !0;
                    if (6 === e ? this.set.apply(this, arguments) : 1 === e ? t instanceof lt ? this.set(t._a, t._c, t._b, t._d, t._tx, t._ty) : Array.isArray(t) ? this.set.apply(this, t) : n = !1 : 0 === e ? this.reset() : n = !1, 
                    !n) throw new Error("Unsupported matrix parameters");
                },
                set: function(t, e, n, i, r, s, a) {
                    return this._a = t, this._c = e, this._b = n, this._d = i, this._tx = r, this._ty = s, 
                    a || this._changed(), this;
                },
                _serialize: function(t) {
                    return o.serialize(this.getValues(), t);
                },
                _changed: function() {
                    var t = this._owner;
                    t && (t._applyMatrix ? t.transform(null, !0) : t._changed(9));
                },
                clone: function() {
                    return new w(this._a, this._c, this._b, this._d, this._tx, this._ty);
                },
                equals: function(t) {
                    return t === this || t && this._a === t._a && this._b === t._b && this._c === t._c && this._d === t._d && this._tx === t._tx && this._ty === t._ty || !1;
                },
                toString: function() {
                    var t = c.instance;
                    return "[[" + [ t.number(this._a), t.number(this._b), t.number(this._tx) ].join(", ") + "], [" + [ t.number(this._c), t.number(this._d), t.number(this._ty) ].join(", ") + "]]";
                },
                reset: function(t) {
                    return this._a = this._d = 1, this._c = this._b = this._tx = this._ty = 0, t || this._changed(), 
                    this;
                },
                apply: function(t, e) {
                    var n = this._owner;
                    return n ? (n.transform(null, !0, o.pick(t, !0), e), this.isIdentity()) : !1;
                },
                translate: function() {
                    var t = _.read(arguments), e = t.x, n = t.y;
                    return this._tx += e * this._a + n * this._b, this._ty += e * this._c + n * this._d, 
                    this._changed(), this;
                },
                scale: function() {
                    var t = _.read(arguments), e = _.read(arguments, 0, {
                        readNull: !0
                    });
                    return e && this.translate(e), this._a *= t.x, this._c *= t.x, this._b *= t.y, this._d *= t.y, 
                    e && this.translate(e.negate()), this._changed(), this;
                },
                rotate: function(t) {
                    t *= Math.PI / 180;
                    var e = _.read(arguments, 1), n = e.x, i = e.y, r = Math.cos(t), s = Math.sin(t), a = n - n * r + i * s, o = i - n * s - i * r, u = this._a, h = this._b, l = this._c, c = this._d;
                    return this._a = r * u + s * h, this._b = -s * u + r * h, this._c = r * l + s * c, 
                    this._d = -s * l + r * c, this._tx += a * u + o * h, this._ty += a * l + o * c, 
                    this._changed(), this;
                },
                shear: function() {
                    var t = _.read(arguments), e = _.read(arguments, 0, {
                        readNull: !0
                    });
                    e && this.translate(e);
                    var n = this._a, i = this._c;
                    return this._a += t.y * this._b, this._c += t.y * this._d, this._b += t.x * n, this._d += t.x * i, 
                    e && this.translate(e.negate()), this._changed(), this;
                },
                skew: function() {
                    var t = _.read(arguments), e = _.read(arguments, 0, {
                        readNull: !0
                    }), n = Math.PI / 180, i = new _(Math.tan(t.x * n), Math.tan(t.y * n));
                    return this.shear(i, e);
                },
                concatenate: function(t) {
                    var e = this._a, n = this._b, i = this._c, r = this._d, s = t._a, a = t._b, o = t._c, u = t._d, h = t._tx, l = t._ty;
                    return this._a = s * e + o * n, this._b = a * e + u * n, this._c = s * i + o * r, 
                    this._d = a * i + u * r, this._tx += h * e + l * n, this._ty += h * i + l * r, this._changed(), 
                    this;
                },
                preConcatenate: function(t) {
                    var e = this._a, n = this._b, i = this._c, r = this._d, s = this._tx, a = this._ty, o = t._a, u = t._b, h = t._c, l = t._d, c = t._tx, f = t._ty;
                    return this._a = o * e + u * i, this._b = o * n + u * r, this._c = h * e + l * i, 
                    this._d = h * n + l * r, this._tx = o * s + u * a + c, this._ty = h * s + l * a + f, 
                    this._changed(), this;
                },
                chain: function(t) {
                    var e = this._a, n = this._b, i = this._c, r = this._d, s = this._tx, a = this._ty, o = t._a, u = t._b, h = t._c, l = t._d, c = t._tx, f = t._ty;
                    return new w(o * e + h * n, o * i + h * r, u * e + l * n, u * i + l * r, s + c * e + f * n, a + c * i + f * r);
                },
                isIdentity: function() {
                    return 1 === this._a && 0 === this._c && 0 === this._b && 1 === this._d && 0 === this._tx && 0 === this._ty;
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
                transform: function(t, e, n) {
                    return arguments.length < 3 ? this._transformPoint(_.read(arguments)) : this._transformCoordinates(t, e, n);
                },
                _transformPoint: function(t, e, n) {
                    var i = t.x, r = t.y;
                    return e || (e = new _()), e.set(i * this._a + r * this._b + this._tx, i * this._c + r * this._d + this._ty, n);
                },
                _transformCoordinates: function(t, e, n) {
                    for (var i = 0, r = 0, s = 2 * n; s > i; ) {
                        var a = t[i++], o = t[i++];
                        e[r++] = a * this._a + o * this._b + this._tx, e[r++] = a * this._c + o * this._d + this._ty;
                    }
                    return e;
                },
                _transformCorners: function(t) {
                    var e = t.x, n = t.y, i = e + t.width, r = n + t.height, s = [ e, n, i, n, i, r, e, r ];
                    return this._transformCoordinates(s, s, 4);
                },
                _transformBounds: function(t, e, n) {
                    for (var i = this._transformCorners(t), r = i.slice(0, 2), s = r.slice(), a = 2; 8 > a; a++) {
                        var o = i[a], u = 1 & a;
                        o < r[u] ? r[u] = o : o > s[u] && (s[u] = o);
                    }
                    return e || (e = new m()), e.set(r[0], r[1], s[0] - r[0], s[1] - r[1], n);
                },
                inverseTransform: function() {
                    return this._inverseTransform(_.read(arguments));
                },
                _getDeterminant: function() {
                    var t = this._a * this._d - this._b * this._c;
                    return isFinite(t) && !f.isZero(t) && isFinite(this._tx) && isFinite(this._ty) ? t : null;
                },
                _inverseTransform: function(t, e, n) {
                    var i = this._getDeterminant();
                    if (!i) return null;
                    var r = t.x - this._tx, s = t.y - this._ty;
                    return e || (e = new _()), e.set((r * this._d - s * this._b) / i, (s * this._a - r * this._c) / i, n);
                },
                decompose: function() {
                    var t = this._a, e = this._b, n = this._c, i = this._d;
                    if (f.isZero(t * i - e * n)) return null;
                    var r = Math.sqrt(t * t + e * e);
                    t /= r, e /= r;
                    var s = t * n + e * i;
                    n -= t * s, i -= e * s;
                    var a = Math.sqrt(n * n + i * i);
                    return n /= a, i /= a, s /= a, e * n > t * i && (t = -t, e = -e, s = -s, r = -r), 
                    {
                        scaling: new _(r, a),
                        rotation: 180 * -Math.atan2(e, t) / Math.PI,
                        shearing: s
                    };
                },
                getValues: function() {
                    return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
                },
                getTranslation: function() {
                    return new _(this._tx, this._ty);
                },
                getScaling: function() {
                    return (this.decompose() || {}).scaling;
                },
                getRotation: function() {
                    return (this.decompose() || {}).rotation;
                },
                inverted: function() {
                    var t = this._getDeterminant();
                    return t && new w(this._d / t, -this._c / t, -this._b / t, this._a / t, (this._b * this._ty - this._d * this._tx) / t, (this._c * this._tx - this._a * this._ty) / t);
                },
                shiftless: function() {
                    return new w(this._a, this._c, this._b, this._d, 0, 0);
                },
                applyToContext: function(t) {
                    t.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
                }
            }, o.each([ "a", "c", "b", "d", "tx", "ty" ], function(t) {
                var e = o.capitalize(t), n = "_" + t;
                this["get" + e] = function() {
                    return this[n];
                }, this["set" + e] = function(t) {
                    this[n] = t, this._changed();
                };
            }, {})), b = o.extend({
                _class: "Line",
                initialize: function(t, e, n, i, r) {
                    var s = !1;
                    arguments.length >= 4 ? (this._px = t, this._py = e, this._vx = n, this._vy = i, 
                    s = r) : (this._px = t.x, this._py = t.y, this._vx = e.x, this._vy = e.y, s = n), 
                    s || (this._vx -= this._px, this._vy -= this._py);
                },
                getPoint: function() {
                    return new _(this._px, this._py);
                },
                getVector: function() {
                    return new _(this._vx, this._vy);
                },
                getLength: function() {
                    return this.getVector().getLength();
                },
                intersect: function(t, e) {
                    return b.intersect(this._px, this._py, this._vx, this._vy, t._px, t._py, t._vx, t._vy, !0, e);
                },
                getSide: function(t, e) {
                    return b.getSide(this._px, this._py, this._vx, this._vy, t.x, t.y, !0, e);
                },
                getDistance: function(t) {
                    return Math.abs(b.getSignedDistance(this._px, this._py, this._vx, this._vy, t.x, t.y, !0));
                },
                isCollinear: function(t) {
                    return _.isCollinear(this._vx, this._vy, t._vx, t._vy);
                },
                isOrthogonal: function(t) {
                    return _.isOrthogonal(this._vx, this._vy, t._vx, t._vy);
                },
                statics: {
                    intersect: function(t, e, n, i, r, s, a, o, u, h) {
                        u || (n -= t, i -= e, a -= r, o -= s);
                        var l = n * o - i * a;
                        if (!f.isZero(l)) {
                            var c = t - r, d = e - s, g = (a * d - o * c) / l, p = (n * d - i * c) / l, v = 1e-12, m = -v, y = 1 + v;
                            if (h || g > m && y > g && p > m && y > p) return h || (g = 0 >= g ? 0 : g >= 1 ? 1 : g), 
                            new _(t + g * n, e + g * i);
                        }
                    },
                    getSide: function(t, e, n, i, r, s, a, o) {
                        a || (n -= t, i -= e);
                        var u = r - t, h = s - e, l = u * i - h * n;
                        return 0 !== l || o || (l = (u * n + u * n) / (n * n + i * i), l >= 0 && 1 >= l && (l = 0)), 
                        0 > l ? -1 : l > 0 ? 1 : 0;
                    },
                    getSignedDistance: function(t, e, n, i, r, s, a) {
                        return a || (n -= t, i -= e), 0 === n ? i > 0 ? r - t : t - r : 0 === i ? 0 > n ? s - e : e - s : ((r - t) * i - (s - e) * n) / Math.sqrt(n * n + i * i);
                    }
                }
            }), x = l.extend({
                _class: "Project",
                _list: "projects",
                _reference: "project",
                initialize: function(t) {
                    l.call(this, !0), this.layers = [], this._activeLayer = null, this.symbols = [], 
                    this._currentStyle = new H(null, null, this), this._view = G.create(this, t || it.getCanvas(1, 1)), 
                    this._selectedItems = {}, this._selectedItemCount = 0, this._updateVersion = 0;
                },
                _serialize: function(t, e) {
                    return o.serialize(this.layers, t, !0, e);
                },
                clear: function() {
                    for (var t = this.layers.length - 1; t >= 0; t--) this.layers[t].remove();
                    this.symbols = [];
                },
                isEmpty: function() {
                    return 0 === this.layers.length;
                },
                remove: function ct() {
                    return ct.base.call(this) ? (this._view && this._view.remove(), !0) : !1;
                },
                getView: function() {
                    return this._view;
                },
                getCurrentStyle: function() {
                    return this._currentStyle;
                },
                setCurrentStyle: function(t) {
                    this._currentStyle.initialize(t);
                },
                getIndex: function() {
                    return this._index;
                },
                getOptions: function() {
                    return this._scope.settings;
                },
                getActiveLayer: function() {
                    return this._activeLayer || new P({
                        project: this
                    });
                },
                getSelectedItems: function() {
                    var t = [];
                    for (var e in this._selectedItems) {
                        var n = this._selectedItems[e];
                        n.isInserted() && t.push(n);
                    }
                    return t;
                },
                insertChild: function(t, e, n) {
                    return e instanceof P ? (e._remove(!1, !0), o.splice(this.layers, [ e ], t, 0), 
                    e._setProject(this, !0), this._changes && e._changed(5), this._activeLayer || (this._activeLayer = e)) : e instanceof S ? (this._activeLayer || this.insertChild(t, new P(S.NO_INSERT))).insertChild(t, e, n) : e = null, 
                    e;
                },
                addChild: function(t, e) {
                    return this.insertChild(a, t, e);
                },
                _updateSelection: function(t) {
                    var e = t._id, n = this._selectedItems;
                    t._selected ? n[e] !== t && (this._selectedItemCount++, n[e] = t) : n[e] === t && (this._selectedItemCount--, 
                    delete n[e]);
                },
                selectAll: function() {
                    for (var t = this.layers, e = 0, n = t.length; n > e; e++) t[e].setFullySelected(!0);
                },
                deselectAll: function() {
                    var t = this._selectedItems;
                    for (var e in t) t[e].setFullySelected(!1);
                },
                hitTest: function() {
                    for (var t = _.read(arguments), e = M.getOptions(o.read(arguments)), n = this.layers.length - 1; n >= 0; n--) {
                        var i = this.layers[n]._hitTest(t, e);
                        if (i) return i;
                    }
                    return null;
                },
                getItems: function(t) {
                    return S._getItems(this.layers, t);
                },
                getItem: function(t) {
                    return S._getItems(this.layers, t, null, null, !0)[0] || null;
                },
                importJSON: function(t) {
                    this.activate();
                    var e = this._activeLayer;
                    return o.importJSON(t, e && e.isEmpty() && e);
                },
                draw: function(t, e, n) {
                    this._updateVersion++, t.save(), e.applyToContext(t);
                    for (var i = new o({
                        offset: new _(0, 0),
                        pixelRatio: n,
                        viewMatrix: e.isIdentity() ? null : e,
                        matrices: [ new w() ],
                        updateMatrix: !0
                    }), r = 0, s = this.layers, a = s.length; a > r; r++) s[r].draw(t, i);
                    if (t.restore(), this._selectedItemCount > 0) {
                        t.save(), t.strokeWidth = 1;
                        var u = this._selectedItems, h = this._scope.settings.handleSize, l = this._updateVersion;
                        for (var c in u) u[c]._drawSelection(t, e, h, u, l);
                        t.restore();
                    }
                }
            }), C = o.extend({
                _class: "Symbol",
                initialize: function(t, e) {
                    this._id = d.get(), this.project = s.project, this.project.symbols.push(this), t && this.setDefinition(t, e);
                },
                _serialize: function(t, e) {
                    return e.add(this, function() {
                        return o.serialize([ this._class, this._definition ], t, !1, e);
                    });
                },
                _changed: function(t) {
                    8 & t && S._clearBoundsCache(this), 1 & t && (this.project._needsUpdate = !0);
                },
                getDefinition: function() {
                    return this._definition;
                },
                setDefinition: function(t, e) {
                    t._parentSymbol && (t = t.clone()), this._definition && (this._definition._parentSymbol = null), 
                    this._definition = t, t.remove(), t.setSelected(!1), e || t.setPosition(new _()), 
                    t._parentSymbol = this, this._changed(9);
                },
                place: function(t) {
                    return new I(this, t);
                },
                clone: function() {
                    return new C(this._definition.clone(!1));
                },
                equals: function(t) {
                    return t === this || t && this.definition.equals(t.definition) || !1;
                }
            }), S = o.extend(u, {
                statics: {
                    extend: function ft(t) {
                        return t._serializeFields && (t._serializeFields = new o(this.prototype._serializeFields, t._serializeFields)), 
                        ft.base.apply(this, arguments);
                    },
                    NO_INSERT: {
                        insert: !1
                    }
                },
                _class: "Item",
                _applyMatrix: !0,
                _canApplyMatrix: !0,
                _boundsSelected: !1,
                _selectChildren: !1,
                _serializeFields: {
                    name: null,
                    applyMatrix: null,
                    matrix: new w(),
                    pivot: null,
                    locked: !1,
                    visible: !0,
                    blendMode: "normal",
                    opacity: 1,
                    guide: !1,
                    selected: !1,
                    clipMask: !1,
                    data: {}
                },
                initialize: function() {},
                _initialize: function(t, e) {
                    var n = t && o.isPlainObject(t), i = n && t.internal === !0, r = this._matrix = new w(), a = n && t.project || s.project;
                    return i || (this._id = d.get()), this._applyMatrix = this._canApplyMatrix && s.settings.applyMatrix, 
                    e && r.translate(e), r._owner = this, this._style = new H(a._currentStyle, this, a), 
                    this._project || (i || n && t.insert === !1 ? this._setProject(a) : n && t.parent ? this.setParent(t.parent) : (a._activeLayer || new P()).addChild(this)), 
                    n && t !== S.NO_INSERT && this._set(t, {
                        insert: !0,
                        project: !0,
                        parent: !0
                    }, !0), n;
                },
                _events: o.each([ "onMouseDown", "onMouseUp", "onMouseDrag", "onClick", "onDoubleClick", "onMouseMove", "onMouseEnter", "onMouseLeave" ], function(t) {
                    this[t] = {
                        install: function(t) {
                            this.getView()._installEvent(t);
                        },
                        uninstall: function(t) {
                            this.getView()._uninstallEvent(t);
                        }
                    };
                }, {
                    onFrame: {
                        install: function() {
                            this.getView()._animateItem(this, !0);
                        },
                        uninstall: function() {
                            this.getView()._animateItem(this, !1);
                        }
                    },
                    onLoad: {}
                }),
                _serialize: function(t, e) {
                    function n(n) {
                        for (var s in n) {
                            var a = r[s];
                            o.equals(a, "leading" === s ? 1.2 * n.fontSize : n[s]) || (i[s] = o.serialize(a, t, "data" !== s, e));
                        }
                    }
                    var i = {}, r = this;
                    return n(this._serializeFields), this instanceof E || n(this._style._defaults), 
                    [ this._class, i ];
                },
                _changed: function(t) {
                    var e = this._parentSymbol, n = this._parent || e, i = this._project;
                    if (8 & t && (this._bounds = this._position = this._decomposed = this._globalMatrix = this._currentPath = a), 
                    n && 40 & t && S._clearBoundsCache(n), 2 & t && S._clearBoundsCache(this), i && (1 & t && (i._needsUpdate = !0), 
                    i._changes)) {
                        var r = i._changesById[this._id];
                        r ? r.flags |= t : (r = {
                            item: this,
                            flags: t
                        }, i._changesById[this._id] = r, i._changes.push(r));
                    }
                    e && e._changed(t);
                },
                set: function(t) {
                    return t && this._set(t), this;
                },
                getId: function() {
                    return this._id;
                },
                getName: function() {
                    return this._name;
                },
                setName: function(t, e) {
                    if (this._name && this._removeNamed(), t === +t + "") throw new Error("Names consisting only of numbers are not supported.");
                    var n = this._parent;
                    if (t && n) {
                        for (var i = n._children, r = n._namedChildren, s = t, o = 1; e && i[t]; ) t = s + " " + o++;
                        (r[t] = r[t] || []).push(this), i[t] = this;
                    }
                    this._name = t || a, this._changed(128);
                },
                getStyle: function() {
                    return this._style;
                },
                setStyle: function(t) {
                    this.getStyle().set(t);
                }
            }, o.each([ "locked", "visible", "blendMode", "opacity", "guide" ], function(t) {
                var e = o.capitalize(t), t = "_" + t;
                this["get" + e] = function() {
                    return this[t];
                }, this["set" + e] = function(e) {
                    e != this[t] && (this[t] = e, this._changed("_locked" === t ? 128 : 129));
                };
            }, {}), {
                beans: !0,
                _locked: !1,
                _visible: !0,
                _blendMode: "normal",
                _opacity: 1,
                _guide: !1,
                isSelected: function() {
                    if (this._selectChildren) for (var t = this._children, e = 0, n = t.length; n > e; e++) if (t[e].isSelected()) return !0;
                    return this._selected;
                },
                setSelected: function(t, e) {
                    if (!e && this._selectChildren) for (var n = this._children, i = 0, r = n.length; r > i; i++) n[i].setSelected(t);
                    (t = !!t) ^ this._selected && (this._selected = t, this._project._updateSelection(this), 
                    this._changed(129));
                },
                _selected: !1,
                isFullySelected: function() {
                    var t = this._children;
                    if (t && this._selected) {
                        for (var e = 0, n = t.length; n > e; e++) if (!t[e].isFullySelected()) return !1;
                        return !0;
                    }
                    return this._selected;
                },
                setFullySelected: function(t) {
                    var e = this._children;
                    if (e) for (var n = 0, i = e.length; i > n; n++) e[n].setFullySelected(t);
                    this.setSelected(t, !0);
                },
                isClipMask: function() {
                    return this._clipMask;
                },
                setClipMask: function(t) {
                    this._clipMask != (t = !!t) && (this._clipMask = t, t && (this.setFillColor(null), 
                    this.setStrokeColor(null)), this._changed(129), this._parent && this._parent._changed(1024));
                },
                _clipMask: !1,
                getData: function() {
                    return this._data || (this._data = {}), this._data;
                },
                setData: function(t) {
                    this._data = t;
                },
                getPosition: function(t) {
                    var e = this._position, n = t ? _ : g;
                    if (!e) {
                        var i = this._pivot;
                        e = this._position = i ? this._matrix._transformPoint(i) : this.getBounds().getCenter(!0);
                    }
                    return new n(e.x, e.y, this, "setPosition");
                },
                setPosition: function() {
                    this.translate(_.read(arguments).subtract(this.getPosition(!0)));
                },
                getPivot: function(t) {
                    var e = this._pivot;
                    if (e) {
                        var n = t ? _ : g;
                        e = new n(e.x, e.y, this, "setPivot");
                    }
                    return e;
                },
                setPivot: function() {
                    this._pivot = _.read(arguments, 0, {
                        clone: !0,
                        readNull: !0
                    }), this._position = a;
                },
                _pivot: null
            }, o.each([ "bounds", "strokeBounds", "handleBounds", "roughBounds", "internalBounds", "internalRoughBounds" ], function(t) {
                var e = "get" + o.capitalize(t), n = t.match(/^internal(.*)$/), i = n ? "get" + n[1] : null;
                this[e] = function(n) {
                    var r = this._boundsGetter, s = !i && ("string" == typeof r ? r : r && r[e]) || e, a = this._getCachedBounds(s, n, this, i);
                    return "bounds" === t ? new y(a.x, a.y, a.width, a.height, this, "setBounds") : a;
                };
            }, {
                beans: !0,
                _getBounds: function(t, e, n) {
                    var i = this._children;
                    if (!i || 0 == i.length) return new m();
                    S._updateBoundsCache(this, n);
                    for (var r = 1 / 0, s = -r, a = r, o = s, u = 0, h = i.length; h > u; u++) {
                        var l = i[u];
                        if (l._visible && !l.isEmpty()) {
                            var c = l._getCachedBounds(t, e && e.chain(l._matrix), n);
                            r = Math.min(c.x, r), a = Math.min(c.y, a), s = Math.max(c.x + c.width, s), o = Math.max(c.y + c.height, o);
                        }
                    }
                    return isFinite(r) ? new m(r, a, s - r, o - a) : new m();
                },
                setBounds: function() {
                    var t = m.read(arguments), e = this.getBounds(), n = new w(), i = t.getCenter();
                    n.translate(i), t.width == e.width && t.height == e.height || n.scale(0 != e.width ? t.width / e.width : 1, 0 != e.height ? t.height / e.height : 1), 
                    i = e.getCenter(), n.translate(-i.x, -i.y), this.transform(n);
                },
                _getCachedBounds: function(t, e, n, i) {
                    e = e && e.orNullIfIdentity();
                    var r = i ? null : this._matrix.orNullIfIdentity(), s = (!e || e.equals(r)) && t;
                    if (S._updateBoundsCache(this._parent || this._parentSymbol, n), s && this._bounds && this._bounds[s]) return this._bounds[s].clone();
                    var a = this._getBounds(i || t, e || r, n);
                    if (s) {
                        this._bounds || (this._bounds = {});
                        var o = this._bounds[s] = a.clone();
                        o._internal = !!i;
                    }
                    return a;
                },
                statics: {
                    _updateBoundsCache: function(t, e) {
                        if (t) {
                            var n = e._id, i = t._boundsCache = t._boundsCache || {
                                ids: {},
                                list: []
                            };
                            i.ids[n] || (i.list.push(e), i.ids[n] = e);
                        }
                    },
                    _clearBoundsCache: function(t) {
                        var e = t._boundsCache;
                        if (e) {
                            t._bounds = t._position = t._boundsCache = a;
                            for (var n = 0, i = e.list, r = i.length; r > n; n++) {
                                var s = i[n];
                                s !== t && (s._bounds = s._position = a, s._boundsCache && S._clearBoundsCache(s));
                            }
                        }
                    }
                }
            }), {
                beans: !0,
                _decompose: function() {
                    return this._decomposed = this._matrix.decompose();
                },
                getRotation: function() {
                    var t = this._decomposed || this._decompose();
                    return t && t.rotation;
                },
                setRotation: function(t) {
                    var e = this.getRotation();
                    if (null != e && null != t) {
                        var n = this._decomposed;
                        this.rotate(t - e), n.rotation = t, this._decomposed = n;
                    }
                },
                getScaling: function(t) {
                    var e = this._decomposed || this._decompose(), n = e && e.scaling, i = t ? _ : g;
                    return n && new i(n.x, n.y, this, "setScaling");
                },
                setScaling: function() {
                    var t = this.getScaling();
                    if (t) {
                        var e = _.read(arguments, 0, {
                            clone: !0
                        }), n = this._decomposed;
                        this.scale(e.x / t.x, e.y / t.y), n.scaling = e, this._decomposed = n;
                    }
                },
                getMatrix: function() {
                    return this._matrix;
                },
                setMatrix: function() {
                    var t = this._matrix;
                    t.initialize.apply(t, arguments), this._applyMatrix ? this.transform(null, !0) : this._changed(9);
                },
                getGlobalMatrix: function(t) {
                    var e = this._globalMatrix, n = this._project._updateVersion;
                    if (e && e._updateVersion !== n && (e = null), !e) {
                        e = this._globalMatrix = this._matrix.clone();
                        var i = this._parent;
                        i && e.preConcatenate(i.getGlobalMatrix(!0)), e._updateVersion = n;
                    }
                    return t ? e : e.clone();
                },
                getApplyMatrix: function() {
                    return this._applyMatrix;
                },
                setApplyMatrix: function(t) {
                    (this._applyMatrix = this._canApplyMatrix && !!t) && this.transform(null, !0);
                },
                getTransformContent: "#getApplyMatrix",
                setTransformContent: "#setApplyMatrix"
            }, {
                getProject: function() {
                    return this._project;
                },
                _setProject: function(t, e) {
                    if (this._project !== t) {
                        this._project && this._installEvents(!1), this._project = t;
                        for (var n = this._children, i = 0, r = n && n.length; r > i; i++) n[i]._setProject(t);
                        e = !0;
                    }
                    e && this._installEvents(!0);
                },
                getView: function() {
                    return this._project.getView();
                },
                _installEvents: function dt(t) {
                    dt.base.call(this, t);
                    for (var e = this._children, n = 0, i = e && e.length; i > n; n++) e[n]._installEvents(t);
                },
                getLayer: function() {
                    for (var t = this; t = t._parent; ) if (t instanceof P) return t;
                    return null;
                },
                getParent: function() {
                    return this._parent;
                },
                setParent: function(t) {
                    return t.addChild(this);
                },
                getChildren: function() {
                    return this._children;
                },
                setChildren: function(t) {
                    this.removeChildren(), this.addChildren(t);
                },
                getFirstChild: function() {
                    return this._children && this._children[0] || null;
                },
                getLastChild: function() {
                    return this._children && this._children[this._children.length - 1] || null;
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
                equals: function(t) {
                    return t === this || t && this._class === t._class && this._style.equals(t._style) && this._matrix.equals(t._matrix) && this._locked === t._locked && this._visible === t._visible && this._blendMode === t._blendMode && this._opacity === t._opacity && this._clipMask === t._clipMask && this._guide === t._guide && this._equals(t) || !1;
                },
                _equals: function(t) {
                    return o.equals(this._children, t._children);
                },
                clone: function(t) {
                    return this._clone(new this.constructor(S.NO_INSERT), t);
                },
                _clone: function(t, e, n) {
                    var i = [ "_locked", "_visible", "_blendMode", "_opacity", "_clipMask", "_guide" ], r = this._children;
                    t.setStyle(this._style);
                    for (var s = 0, u = r && r.length; u > s; s++) t.addChild(r[s].clone(!1), !0);
                    for (var s = 0, u = i.length; u > s; s++) {
                        var h = i[s];
                        this.hasOwnProperty(h) && (t[h] = this[h]);
                    }
                    return n !== !1 && t._matrix.initialize(this._matrix), t.setApplyMatrix(this._applyMatrix), 
                    t.setPivot(this._pivot), t.setSelected(this._selected), t._data = this._data ? o.clone(this._data) : null, 
                    (e || e === a) && t.insertAbove(this), this._name && t.setName(this._name, !0), 
                    t;
                },
                copyTo: function(t) {
                    return t.addChild(this.clone(!1));
                },
                rasterize: function(t) {
                    var e = this.getStrokeBounds(), n = (t || this.getView().getResolution()) / 72, i = e.getTopLeft().floor(), r = e.getBottomRight().ceil(), s = new p(r.subtract(i)), a = it.getCanvas(s.multiply(n)), u = a.getContext("2d"), h = new w().scale(n).translate(i.negate());
                    u.save(), h.applyToContext(u), this.draw(u, new o({
                        matrices: [ h ]
                    })), u.restore();
                    var l = new k(S.NO_INSERT);
                    return l.setCanvas(a), l.transform(new w().translate(i.add(s.divide(2))).scale(1 / n)), 
                    l.insertAbove(this), l;
                },
                contains: function() {
                    return !!this._contains(this._matrix._inverseTransform(_.read(arguments)));
                },
                _contains: function(t) {
                    if (this._children) {
                        for (var e = this._children.length - 1; e >= 0; e--) if (this._children[e].contains(t)) return !0;
                        return !1;
                    }
                    return t.isInside(this.getInternalBounds());
                },
                isInside: function() {
                    return m.read(arguments).contains(this.getBounds());
                },
                _asPathItem: function() {
                    return new V.Rectangle({
                        rectangle: this.getInternalBounds(),
                        matrix: this._matrix,
                        insert: !1
                    });
                },
                intersects: function(t, e) {
                    return t instanceof S ? this._asPathItem().getIntersections(t._asPathItem(), null, e || t._matrix, !0).length > 0 : !1;
                },
                hitTest: function() {
                    return this._hitTest(_.read(arguments), M.getOptions(o.read(arguments)));
                },
                _hitTest: function(t, e) {
                    function n(e, n) {
                        var i = f["get" + n]();
                        return t.subtract(i).divide(u).length <= 1 ? new M(e, c, {
                            name: o.hyphenate(n),
                            point: i
                        }) : void 0;
                    }
                    if (this._locked || !this._visible || this._guide && !e.guides || this.isEmpty()) return null;
                    var i = this._matrix, r = e._totalMatrix, s = this.getView(), a = e._totalMatrix = r ? r.chain(i) : this.getGlobalMatrix().preConcatenate(s._matrix), u = e._tolerancePadding = new p(V._getPenPadding(1, a.inverted())).multiply(Math.max(e.tolerance, 1e-6));
                    if (t = i._inverseTransform(t), !this._children && !this.getInternalRoughBounds().expand(u.multiply(2))._containsPoint(t)) return null;
                    var h, l = !(e.guides && !this._guide || e.selected && !this._selected || e.type && e.type !== o.hyphenate(this._class) || e["class"] && !(this instanceof e["class"])), c = this;
                    if (l && (e.center || e.bounds) && this._parent) {
                        var f = this.getInternalBounds();
                        if (e.center && (h = n("center", "Center")), !h && e.bounds) for (var d = [ "TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter" ], _ = 0; 8 > _ && !h; _++) h = n("bounds", d[_]);
                    }
                    var g = !h && this._children;
                    if (g) for (var v = this._getChildHitTestOptions(e), _ = g.length - 1; _ >= 0 && !h; _--) h = g[_]._hitTest(t, v);
                    return !h && l && (h = this._hitTestSelf(t, e)), h && h.point && (h.point = i.transform(h.point)), 
                    e._totalMatrix = r, h;
                },
                _getChildHitTestOptions: function(t) {
                    return t;
                },
                _hitTestSelf: function(t, e) {
                    return e.fill && this.hasFill() && this._contains(t) ? new M("fill", this) : void 0;
                },
                matches: function(t, e) {
                    function n(t, e) {
                        for (var i in t) if (t.hasOwnProperty(i)) {
                            var r = t[i], s = e[i];
                            if (o.isPlainObject(r) && o.isPlainObject(s)) {
                                if (!n(r, s)) return !1;
                            } else if (!o.equals(r, s)) return !1;
                        }
                        return !0;
                    }
                    var i = typeof t;
                    if ("object" === i) {
                        for (var r in t) if (t.hasOwnProperty(r) && !this.matches(r, t[r])) return !1;
                    } else {
                        if ("function" === i) return t(this);
                        var s = /^(empty|editable)$/.test(t) ? this["is" + o.capitalize(t)]() : "type" === t ? o.hyphenate(this._class) : this[t];
                        if (/^(constructor|class)$/.test(t)) {
                            if (!(this instanceof e)) return !1;
                        } else if (e instanceof RegExp) {
                            if (!e.test(s)) return !1;
                        } else if ("function" == typeof e) {
                            if (!e(s)) return !1;
                        } else if (o.isPlainObject(e)) {
                            if (!n(e, s)) return !1;
                        } else if (!o.equals(s, e)) return !1;
                    }
                    return !0;
                },
                getItems: function(t) {
                    return S._getItems(this._children, t, this._matrix);
                },
                getItem: function(t) {
                    return S._getItems(this._children, t, this._matrix, null, !0)[0] || null;
                },
                statics: {
                    _getItems: function _t(t, e, n, i, r) {
                        if (!i && "object" == typeof e) {
                            var s = e.overlapping, a = e.inside, u = s || a, h = u && m.read([ u ]);
                            i = {
                                items: [],
                                inside: !!a,
                                overlapping: !!s,
                                rect: h,
                                path: s && new V.Rectangle({
                                    rectangle: h,
                                    insert: !1
                                })
                            }, u && (e = o.set({}, e, {
                                inside: !0,
                                overlapping: !0
                            }));
                        }
                        var l = i && i.items, h = i && i.rect;
                        n = h && (n || new w());
                        for (var c = 0, f = t && t.length; f > c; c++) {
                            var d = t[c], _ = n && n.chain(d._matrix), g = !0;
                            if (h) {
                                var u = d.getBounds(_);
                                if (!h.intersects(u)) continue;
                                i.inside && h.contains(u) || i.overlapping && (u.contains(h) || i.path.intersects(d, _)) || (g = !1);
                            }
                            if (g && d.matches(e) && (l.push(d), r)) break;
                            if (_t(d._children, e, _, i, r), r && l.length > 0) break;
                        }
                        return l;
                    }
                }
            }, {
                importJSON: function(t) {
                    var e = o.importJSON(t, this);
                    return e !== this ? this.addChild(e) : e;
                },
                addChild: function(t, e) {
                    return this.insertChild(a, t, e);
                },
                insertChild: function(t, e, n) {
                    var i = e ? this.insertChildren(t, [ e ], n) : null;
                    return i && i[0];
                },
                addChildren: function(t, e) {
                    return this.insertChildren(this._children.length, t, e);
                },
                insertChildren: function(t, e, n, i) {
                    var r = this._children;
                    if (r && e && e.length > 0) {
                        e = Array.prototype.slice.apply(e);
                        for (var s = e.length - 1; s >= 0; s--) {
                            var a = e[s];
                            if (!i || a instanceof i) {
                                var u = a._parent === this && a._index < t;
                                a._remove(!1, !0) && u && t--;
                            } else e.splice(s, 1);
                        }
                        o.splice(r, e, t, 0);
                        for (var h = this._project, l = h && h._changes, s = 0, c = e.length; c > s; s++) {
                            var a = e[s];
                            a._parent = this, a._setProject(this._project, !0), a._name && a.setName(a._name), 
                            l && this._changed(5);
                        }
                        this._changed(11);
                    } else e = null;
                    return e;
                },
                _insertSibling: function(t, e, n) {
                    return this._parent ? this._parent.insertChild(t, e, n) : null;
                },
                insertAbove: function(t, e) {
                    return t._insertSibling(t._index + 1, this, e);
                },
                insertBelow: function(t, e) {
                    return t._insertSibling(t._index, this, e);
                },
                sendToBack: function() {
                    return (this._parent || this instanceof P && this._project).insertChild(0, this);
                },
                bringToFront: function() {
                    return (this._parent || this instanceof P && this._project).addChild(this);
                },
                appendTop: "#addChild",
                appendBottom: function(t) {
                    return this.insertChild(0, t);
                },
                moveAbove: "#insertAbove",
                moveBelow: "#insertBelow",
                reduce: function() {
                    if (this._children && 1 === this._children.length) {
                        var t = this._children[0].reduce();
                        return t.insertAbove(this), t.setStyle(this._style), this.remove(), t;
                    }
                    return this;
                },
                _removeNamed: function() {
                    var t = this._parent;
                    if (t) {
                        var e = t._children, n = t._namedChildren, i = this._name, r = n[i], s = r ? r.indexOf(this) : -1;
                        -1 !== s && (e[i] == this && delete e[i], r.splice(s, 1), r.length ? e[i] = r[r.length - 1] : delete n[i]);
                    }
                },
                _remove: function(t, e) {
                    var n = this._parent;
                    if (n) {
                        if (this._name && this._removeNamed(), null != this._index && o.splice(n._children, null, this._index, 1), 
                        this._installEvents(!1), t) {
                            var i = this._project;
                            i && i._changes && this._changed(5);
                        }
                        return e && n._changed(11), this._parent = null, !0;
                    }
                    return !1;
                },
                remove: function() {
                    return this._remove(!0, !0);
                },
                replaceWith: function(t) {
                    var e = t && t.insertBelow(this);
                    return e && this.remove(), e;
                },
                removeChildren: function(t, e) {
                    if (!this._children) return null;
                    t = t || 0, e = o.pick(e, this._children.length);
                    for (var n = o.splice(this._children, null, t, e - t), i = n.length - 1; i >= 0; i--) n[i]._remove(!0, !1);
                    return n.length > 0 && this._changed(11), n;
                },
                clear: "#removeChildren",
                reverseChildren: function() {
                    if (this._children) {
                        this._children.reverse();
                        for (var t = 0, e = this._children.length; e > t; t++) this._children[t]._index = t;
                        this._changed(11);
                    }
                },
                isEmpty: function() {
                    return !this._children || 0 === this._children.length;
                },
                isEditable: function() {
                    for (var t = this; t; ) {
                        if (!t._visible || t._locked) return !1;
                        t = t._parent;
                    }
                    return !0;
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
                _getOrder: function(t) {
                    function e(t) {
                        var e = [];
                        do e.unshift(t); while (t = t._parent);
                        return e;
                    }
                    for (var n = e(this), i = e(t), r = 0, s = Math.min(n.length, i.length); s > r; r++) if (n[r] != i[r]) return n[r]._index < i[r]._index ? 1 : -1;
                    return 0;
                },
                hasChildren: function() {
                    return this._children && this._children.length > 0;
                },
                isInserted: function() {
                    return this._parent ? this._parent.isInserted() : !1;
                },
                isAbove: function(t) {
                    return -1 === this._getOrder(t);
                },
                isBelow: function(t) {
                    return 1 === this._getOrder(t);
                },
                isParent: function(t) {
                    return this._parent === t;
                },
                isChild: function(t) {
                    return t && t._parent === this;
                },
                isDescendant: function(t) {
                    for (var e = this; e = e._parent; ) if (e == t) return !0;
                    return !1;
                },
                isAncestor: function(t) {
                    return t ? t.isDescendant(this) : !1;
                },
                isSibling: function(t) {
                    return this._parent === t._parent;
                },
                isGroupedWith: function(t) {
                    for (var e = this._parent; e; ) {
                        if (e._parent && /^(Group|Layer|CompoundPath)$/.test(e._class) && t.isDescendant(e)) return !0;
                        e = e._parent;
                    }
                    return !1;
                },
                translate: function() {
                    var t = new w();
                    return this.transform(t.translate.apply(t, arguments));
                },
                rotate: function(t) {
                    return this.transform(new w().rotate(t, _.read(arguments, 1, {
                        readNull: !0
                    }) || this.getPosition(!0)));
                }
            }, o.each([ "scale", "shear", "skew" ], function(t) {
                this[t] = function() {
                    var e = _.read(arguments), n = _.read(arguments, 0, {
                        readNull: !0
                    });
                    return this.transform(new w()[t](e, n || this.getPosition(!0)));
                };
            }, {}), {
                transform: function(t, e, n, i) {
                    t && t.isIdentity() && (t = null);
                    var r = this._matrix, s = (e || this._applyMatrix) && (!r.isIdentity() || t || e && n && this._children);
                    if (!t && !s) return this;
                    if (t && r.preConcatenate(t), s = s && this._transformContent(r, n, i)) {
                        var a = this._pivot, o = this._style, u = o.getFillColor(!0), h = o.getStrokeColor(!0);
                        a && r._transformPoint(a, a, !0), u && u.transform(r), h && h.transform(r), r.reset(!0), 
                        i && this._canApplyMatrix && (this._applyMatrix = !0);
                    }
                    var l = this._bounds, c = this._position;
                    this._changed(9);
                    var f = l && t && t.decompose();
                    if (f && !f.shearing && f.rotation % 90 === 0) {
                        for (var d in l) {
                            var _ = l[d];
                            !s && _._internal || t._transformBounds(_, _);
                        }
                        var g = this._boundsGetter, _ = l[g && g.getBounds || g || "getBounds"];
                        _ && (this._position = _.getCenter(!0)), this._bounds = l;
                    } else t && c && (this._position = t._transformPoint(c, c));
                    return this;
                },
                _transformContent: function(t, e, n) {
                    var i = this._children;
                    if (i) {
                        for (var r = 0, s = i.length; s > r; r++) i[r].transform(t, !0, e, n);
                        return !0;
                    }
                },
                globalToLocal: function() {
                    return this.getGlobalMatrix(!0)._inverseTransform(_.read(arguments));
                },
                localToGlobal: function() {
                    return this.getGlobalMatrix(!0)._transformPoint(_.read(arguments));
                },
                parentToLocal: function() {
                    return this._matrix._inverseTransform(_.read(arguments));
                },
                localToParent: function() {
                    return this._matrix._transformPoint(_.read(arguments));
                },
                fitBounds: function(t, e) {
                    t = m.read(arguments);
                    var n = this.getBounds(), i = n.height / n.width, r = t.height / t.width, s = (e ? i > r : r > i) ? t.width / n.width : t.height / n.height, a = new m(new _(), new p(n.width * s, n.height * s));
                    a.setCenter(t.getCenter()), this.setBounds(a);
                },
                _setStyles: function(t) {
                    var e = this._style, n = e.getFillColor(), i = e.getStrokeColor(), r = e.getShadowColor();
                    if (n && (t.fillStyle = n.toCanvasStyle(t)), i) {
                        var a = e.getStrokeWidth();
                        if (a > 0) {
                            t.strokeStyle = i.toCanvasStyle(t), t.lineWidth = a;
                            var o = e.getStrokeJoin(), u = e.getStrokeCap(), h = e.getMiterLimit();
                            if (o && (t.lineJoin = o), u && (t.lineCap = u), h && (t.miterLimit = h), s.support.nativeDash) {
                                var l = e.getDashArray(), c = e.getDashOffset();
                                l && l.length && ("setLineDash" in t ? (t.setLineDash(l), t.lineDashOffset = c) : (t.mozDash = l, 
                                t.mozDashOffset = c));
                            }
                        }
                    }
                    if (r) {
                        var f = e.getShadowBlur();
                        if (f > 0) {
                            t.shadowColor = r.toCanvasStyle(t), t.shadowBlur = f;
                            var d = this.getShadowOffset();
                            t.shadowOffsetX = d.x, t.shadowOffsetY = d.y;
                        }
                    }
                },
                draw: function(t, e, n) {
                    function i(t) {
                        return a ? a.chain(t) : t;
                    }
                    var r = this._updateVersion = this._project._updateVersion;
                    if (this._visible && 0 !== this._opacity) {
                        var s = e.matrices, a = e.viewMatrix, o = this._matrix, u = s[s.length - 1].chain(o);
                        if (u.isInvertible()) {
                            s.push(u), e.updateMatrix && (u._updateVersion = r, this._globalMatrix = u);
                            var h, l, c, f = this._blendMode, d = this._opacity, _ = "normal" === f, g = rt.nativeModes[f], p = _ && 1 === d || e.dontStart || e.clip || (g || _ && 1 > d) && this._canComposite(), v = e.pixelRatio || 1;
                            if (!p) {
                                var m = this.getStrokeBounds(i(u));
                                if (!m.width || !m.height) return;
                                c = e.offset, l = e.offset = m.getTopLeft().floor(), h = t, t = it.getContext(m.getSize().ceil().add(1).multiply(v)), 
                                1 !== v && t.scale(v, v);
                            }
                            t.save();
                            var y = n ? n.chain(o) : !this.getStrokeScaling(!0) && i(u), w = !p && e.clipItem, b = !y || w;
                            if (p ? (t.globalAlpha = d, g && (t.globalCompositeOperation = f)) : b && t.translate(-l.x, -l.y), 
                            b && (p ? o : i(u)).applyToContext(t), w && e.clipItem.draw(t, e.extend({
                                clip: !0
                            })), y) {
                                t.setTransform(v, 0, 0, v, 0, 0);
                                var x = e.offset;
                                x && t.translate(-x.x, -x.y);
                            }
                            this._draw(t, e, y), t.restore(), s.pop(), e.clip && !e.dontFinish && t.clip(), 
                            p || (rt.process(f, t, h, d, l.subtract(c).multiply(v)), it.release(t), e.offset = c);
                        }
                    }
                },
                _isUpdated: function(t) {
                    var e = this._parent;
                    if (e instanceof j) return e._isUpdated(t);
                    var n = this._updateVersion === t;
                    return !n && e && e._visible && e._isUpdated(t) && (this._updateVersion = t, n = !0), 
                    n;
                },
                _drawSelection: function(t, e, n, i, r) {
                    if ((this._drawSelected || this._boundsSelected) && this._isUpdated(r)) {
                        var s = this.getSelectedColor(!0) || this.getLayer().getSelectedColor(!0), a = e.chain(this.getGlobalMatrix(!0));
                        if (t.strokeStyle = t.fillStyle = s ? s.toCanvasStyle(t) : "#009dec", this._drawSelected && this._drawSelected(t, a, i), 
                        this._boundsSelected) {
                            var o = n / 2, u = a._transformCorners(this.getInternalBounds());
                            t.beginPath();
                            for (var h = 0; 8 > h; h++) t[0 === h ? "moveTo" : "lineTo"](u[h], u[++h]);
                            t.closePath(), t.stroke();
                            for (var h = 0; 8 > h; h++) t.fillRect(u[h] - o, u[++h] - o, n, n);
                        }
                    }
                },
                _canComposite: function() {
                    return !1;
                }
            }, o.each([ "down", "drag", "up", "move" ], function(t) {
                this["removeOn" + o.capitalize(t)] = function() {
                    var e = {};
                    return e[t] = !0, this.removeOn(e);
                };
            }, {
                removeOn: function(t) {
                    for (var e in t) if (t[e]) {
                        var n = "mouse" + e, i = this._project, r = i._removeSets = i._removeSets || {};
                        r[n] = r[n] || {}, r[n][this._id] = this;
                    }
                    return this;
                }
            })), E = S.extend({
                _class: "Group",
                _selectChildren: !0,
                _serializeFields: {
                    children: []
                },
                initialize: function(t) {
                    this._children = [], this._namedChildren = {}, this._initialize(t) || this.addChildren(Array.isArray(t) ? t : arguments);
                },
                _changed: function gt(t) {
                    gt.base.call(this, t), 1026 & t && (this._clipItem = a);
                },
                _getClipItem: function() {
                    var t = this._clipItem;
                    if (t === a) {
                        t = null;
                        for (var e = 0, n = this._children.length; n > e; e++) {
                            var i = this._children[e];
                            if (i._clipMask) {
                                t = i;
                                break;
                            }
                        }
                        this._clipItem = t;
                    }
                    return t;
                },
                isClipped: function() {
                    return !!this._getClipItem();
                },
                setClipped: function(t) {
                    var e = this.getFirstChild();
                    e && e.setClipMask(t);
                },
                _draw: function(t, e) {
                    var n = e.clip, i = !n && this._getClipItem(), r = !0;
                    if (e = e.extend({
                        clipItem: i,
                        clip: !1
                    }), n ? this._currentPath ? (t.currentPath = this._currentPath, r = !1) : (t.beginPath(), 
                    e.dontStart = e.dontFinish = !0) : i && i.draw(t, e.extend({
                        clip: !0
                    })), r) for (var s = 0, a = this._children.length; a > s; s++) {
                        var o = this._children[s];
                        o !== i && o.draw(t, e);
                    }
                    n && (this._currentPath = t.currentPath);
                }
            }), P = E.extend({
                _class: "Layer",
                initialize: function(t) {
                    var e = o.isPlainObject(t) ? new o(t) : {
                        children: Array.isArray(t) ? t : arguments
                    }, n = e.insert;
                    e.insert = !1, E.call(this, e), (n || n === a) && (this._project.addChild(this), 
                    this.activate());
                },
                _remove: function pt(t, e) {
                    if (this._parent) return pt.base.call(this, t, e);
                    if (null != this._index) {
                        var n = this._project;
                        return n._activeLayer === this && (n._activeLayer = this.getNextSibling() || this.getPreviousSibling()), 
                        o.splice(n.layers, null, this._index, 1), this._installEvents(!1), t && n._changes && this._changed(5), 
                        e && (n._needsUpdate = !0), !0;
                    }
                    return !1;
                },
                getNextSibling: function vt() {
                    return this._parent ? vt.base.call(this) : this._project.layers[this._index + 1] || null;
                },
                getPreviousSibling: function mt() {
                    return this._parent ? mt.base.call(this) : this._project.layers[this._index - 1] || null;
                },
                isInserted: function yt() {
                    return this._parent ? yt.base.call(this) : null != this._index;
                },
                activate: function() {
                    this._project._activeLayer = this;
                },
                _insertSibling: function wt(t, e, n) {
                    return this._parent ? wt.base.call(this, t, e, n) : this._project.insertChild(t, e, n);
                }
            }), A = S.extend({
                _class: "Shape",
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _boundsSelected: !0,
                _serializeFields: {
                    type: null,
                    size: null,
                    radius: null
                },
                initialize: function(t) {
                    this._initialize(t);
                },
                _equals: function(t) {
                    return this._type === t._type && this._size.equals(t._size) && o.equals(this._radius, t._radius);
                },
                clone: function(t) {
                    var e = new A(S.NO_INSERT);
                    return e.setType(this._type), e.setSize(this._size), e.setRadius(this._radius), 
                    this._clone(e, t);
                },
                getType: function() {
                    return this._type;
                },
                setType: function(t) {
                    this._type = t;
                },
                getShape: "#getType",
                setShape: "#setType",
                getSize: function() {
                    var t = this._size;
                    return new v(t.width, t.height, this, "setSize");
                },
                setSize: function() {
                    var t = p.read(arguments);
                    if (this._size) {
                        if (!this._size.equals(t)) {
                            var e = this._type, n = t.width, i = t.height;
                            if ("rectangle" === e) {
                                var r = p.min(this._radius, t.divide(2));
                                this._radius.set(r.width, r.height);
                            } else "circle" === e ? (n = i = (n + i) / 2, this._radius = n / 2) : "ellipse" === e && this._radius.set(n / 2, i / 2);
                            this._size.set(n, i), this._changed(9);
                        }
                    } else this._size = t.clone();
                },
                getRadius: function() {
                    var t = this._radius;
                    return "circle" === this._type ? t : new v(t.width, t.height, this, "setRadius");
                },
                setRadius: function(t) {
                    var e = this._type;
                    if ("circle" === e) {
                        if (t === this._radius) return;
                        var n = 2 * t;
                        this._radius = t, this._size.set(n, n);
                    } else if (t = p.read(arguments), this._radius) {
                        if (this._radius.equals(t)) return;
                        if (this._radius.set(t.width, t.height), "rectangle" === e) {
                            var n = p.max(this._size, t.multiply(2));
                            this._size.set(n.width, n.height);
                        } else "ellipse" === e && this._size.set(2 * t.width, 2 * t.height);
                    } else this._radius = t.clone();
                    this._changed(9);
                },
                isEmpty: function() {
                    return !1;
                },
                toPath: function(t) {
                    var e = this._clone(new (V[o.capitalize(this._type)])({
                        center: new _(),
                        size: this._size,
                        radius: this._radius,
                        insert: !1
                    }), t);
                    return s.settings.applyMatrix && e.setApplyMatrix(!0), e;
                },
                _draw: function(t, e, n) {
                    var i = this._style, r = i.hasFill(), s = i.hasStroke(), a = e.dontFinish || e.clip, o = !n;
                    if (r || s || a) {
                        var u = this._type, h = this._radius, l = "circle" === u;
                        if (e.dontStart || t.beginPath(), o && l) t.arc(0, 0, h, 0, 2 * Math.PI, !0); else {
                            var c = l ? h : h.width, f = l ? h : h.height, d = this._size, _ = d.width, g = d.height;
                            if (o && "rectangle" === u && 0 === c && 0 === f) t.rect(-_ / 2, -g / 2, _, g); else {
                                var p = _ / 2, v = g / 2, m = .44771525016920644, y = c * m, w = f * m, b = [ -p, -v + f, -p, -v + w, -p + y, -v, -p + c, -v, p - c, -v, p - y, -v, p, -v + w, p, -v + f, p, v - f, p, v - w, p - y, v, p - c, v, -p + c, v, -p + y, v, -p, v - w, -p, v - f ];
                                n && n.transform(b, b, 32), t.moveTo(b[0], b[1]), t.bezierCurveTo(b[2], b[3], b[4], b[5], b[6], b[7]), 
                                p !== c && t.lineTo(b[8], b[9]), t.bezierCurveTo(b[10], b[11], b[12], b[13], b[14], b[15]), 
                                v !== f && t.lineTo(b[16], b[17]), t.bezierCurveTo(b[18], b[19], b[20], b[21], b[22], b[23]), 
                                p !== c && t.lineTo(b[24], b[25]), t.bezierCurveTo(b[26], b[27], b[28], b[29], b[30], b[31]);
                            }
                        }
                        t.closePath();
                    }
                    a || !r && !s || (this._setStyles(t), r && (t.fill(i.getWindingRule()), t.shadowColor = "rgba(0,0,0,0)"), 
                    s && t.stroke());
                },
                _canComposite: function() {
                    return !(this.hasFill() && this.hasStroke());
                },
                _getBounds: function(t, e) {
                    var n = new m(this._size).setCenter(0, 0);
                    return "getBounds" !== t && this.hasStroke() && (n = n.expand(this.getStrokeWidth())), 
                    e ? e._transformBounds(n) : n;
                }
            }, new function() {
                function t(t, e, n) {
                    var i = t._radius;
                    if (!i.isZero()) for (var r = t._size.divide(2), s = 0; 4 > s; s++) {
                        var a = new _(1 & s ? 1 : -1, s > 1 ? 1 : -1), o = a.multiply(r), u = o.subtract(a.multiply(i)), h = new m(o, u);
                        if ((n ? h.expand(n) : h).contains(e)) return u;
                    }
                }
                function e(t, e) {
                    var n = t.getAngleInRadians(), i = 2 * e.width, r = 2 * e.height, s = i * Math.sin(n), a = r * Math.cos(n);
                    return i * r / (2 * Math.sqrt(s * s + a * a));
                }
                return {
                    _contains: function n(e) {
                        if ("rectangle" === this._type) {
                            var i = t(this, e);
                            return i ? e.subtract(i).divide(this._radius).getLength() <= 1 : n.base.call(this, e);
                        }
                        return e.divide(this.size).getLength() <= .5;
                    },
                    _hitTestSelf: function i(n, r) {
                        var s = !1;
                        if (this.hasStroke()) {
                            var a = this._type, o = this._radius, u = this.getStrokeWidth() + 2 * r.tolerance;
                            if ("rectangle" === a) {
                                var h = t(this, n, u);
                                if (h) {
                                    var l = n.subtract(h);
                                    s = 2 * Math.abs(l.getLength() - e(l, o)) <= u;
                                } else {
                                    var c = new m(this._size).setCenter(0, 0), f = c.expand(u), d = c.expand(-u);
                                    s = f._containsPoint(n) && !d._containsPoint(n);
                                }
                            } else "ellipse" === a && (o = e(n, o)), s = 2 * Math.abs(n.getLength() - o) <= u;
                        }
                        return s ? new M("stroke", this) : i.base.apply(this, arguments);
                    }
                };
            }(), {
                statics: new function() {
                    function t(t, e, n, i, r) {
                        var s = new A(o.getNamed(r));
                        return s._type = t, s._size = n, s._radius = i, s.translate(e);
                    }
                    return {
                        Circle: function() {
                            var e = _.readNamed(arguments, "center"), n = o.readNamed(arguments, "radius");
                            return t("circle", e, new p(2 * n), n, arguments);
                        },
                        Rectangle: function() {
                            var e = m.readNamed(arguments, "rectangle"), n = p.min(p.readNamed(arguments, "radius"), e.getSize(!0).divide(2));
                            return t("rectangle", e.getCenter(!0), e.getSize(!0), n, arguments);
                        },
                        Ellipse: function() {
                            var e = A._readEllipse(arguments), n = e.radius;
                            return t("ellipse", e.center, n.multiply(2), n, arguments);
                        },
                        _readEllipse: function(t) {
                            var e, n;
                            if (o.hasNamed(t, "radius")) e = _.readNamed(t, "center"), n = p.readNamed(t, "radius"); else {
                                var i = m.readNamed(t, "rectangle");
                                e = i.getCenter(!0), n = i.getSize(!0).divide(2);
                            }
                            return {
                                center: e,
                                radius: n
                            };
                        }
                    };
                }()
            }), k = S.extend({
                _class: "Raster",
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _boundsGetter: "getBounds",
                _boundsSelected: !0,
                _serializeFields: {
                    crossOrigin: null,
                    source: null
                },
                initialize: function(t, e) {
                    this._initialize(t, e !== a && _.read(arguments, 1)) || ("string" == typeof t ? this.setSource(t) : this.setImage(t)), 
                    this._size || (this._size = new p(), this._loaded = !1);
                },
                _equals: function(t) {
                    return this.getSource() === t.getSource();
                },
                clone: function(t) {
                    var e = new k(S.NO_INSERT), n = this._image, i = this._canvas;
                    if (n) e.setImage(n); else if (i) {
                        var r = it.getCanvas(this._size);
                        r.getContext("2d").drawImage(i, 0, 0), e.setImage(r);
                    }
                    return e._crossOrigin = this._crossOrigin, this._clone(e, t);
                },
                getSize: function() {
                    var t = this._size;
                    return new v(t ? t.width : 0, t ? t.height : 0, this, "setSize");
                },
                setSize: function() {
                    var t = p.read(arguments);
                    if (!t.equals(this._size)) if (t.width > 0 && t.height > 0) {
                        var e = this.getElement();
                        this.setImage(it.getCanvas(t)), e && this.getContext(!0).drawImage(e, 0, 0, t.width, t.height);
                    } else this._canvas && it.release(this._canvas), this._size = t.clone();
                },
                getWidth: function() {
                    return this._size ? this._size.width : 0;
                },
                setWidth: function(t) {
                    this.setSize(t, this.getHeight());
                },
                getHeight: function() {
                    return this._size ? this._size.height : 0;
                },
                setHeight: function(t) {
                    this.setSize(this.getWidth(), t);
                },
                isEmpty: function() {
                    var t = this._size;
                    return !t || 0 === t.width && 0 === t.height;
                },
                getResolution: function() {
                    var t = this._matrix, e = new _(0, 0).transform(t), n = new _(1, 0).transform(t).subtract(e), i = new _(0, 1).transform(t).subtract(e);
                    return new p(72 / n.getLength(), 72 / i.getLength());
                },
                getPpi: "#getResolution",
                getImage: function() {
                    return this._image;
                },
                setImage: function(t) {
                    this._canvas && it.release(this._canvas), t && t.getContext ? (this._image = null, 
                    this._canvas = t, this._loaded = !0) : (this._image = t, this._canvas = null, this._loaded = t && t.complete), 
                    this._size = new p(t ? t.naturalWidth || t.width : 0, t ? t.naturalHeight || t.height : 0), 
                    this._context = null, this._changed(521);
                },
                getCanvas: function() {
                    if (!this._canvas) {
                        var t = it.getContext(this._size);
                        try {
                            this._image && t.drawImage(this._image, 0, 0), this._canvas = t.canvas;
                        } catch (e) {
                            it.release(t);
                        }
                    }
                    return this._canvas;
                },
                setCanvas: "#setImage",
                getContext: function(t) {
                    return this._context || (this._context = this.getCanvas().getContext("2d")), t && (this._image = null, 
                    this._changed(513)), this._context;
                },
                setContext: function(t) {
                    this._context = t;
                },
                getSource: function() {
                    return this._image && this._image.src || this.toDataURL();
                },
                setSource: function(t) {
                    function e() {
                        var t = i.getView();
                        t && (s = t._scope, i.setImage(n), i.emit("load"), t.update());
                    }
                    var n, i = this, r = this._crossOrigin;
                    n = document.getElementById(t) || new Image(), r && (n.crossOrigin = r), n.naturalWidth && n.naturalHeight ? setTimeout(e, 0) : (Z.add(n, {
                        load: e
                    }), n.src || (n.src = t)), this.setImage(n);
                },
                getCrossOrigin: function() {
                    return this._image && this._image.crossOrigin || this._crossOrigin || "";
                },
                setCrossOrigin: function(t) {
                    this._crossOrigin = t, this._image && (this._image.crossOrigin = t);
                },
                getElement: function() {
                    return this._canvas || this._loaded && this._image;
                }
            }, {
                beans: !1,
                getSubCanvas: function() {
                    var t = m.read(arguments), e = it.getContext(t.getSize());
                    return e.drawImage(this.getCanvas(), t.x, t.y, t.width, t.height, 0, 0, t.width, t.height), 
                    e.canvas;
                },
                getSubRaster: function() {
                    var t = m.read(arguments), e = new k(S.NO_INSERT);
                    return e.setImage(this.getSubCanvas(t)), e.translate(t.getCenter().subtract(this.getSize().divide(2))), 
                    e._matrix.preConcatenate(this._matrix), e.insertAbove(this), e;
                },
                toDataURL: function() {
                    var t = this._image && this._image.src;
                    if (/^data:/.test(t)) return t;
                    var e = this.getCanvas();
                    return e ? e.toDataURL.apply(e, arguments) : null;
                },
                drawImage: function(t) {
                    var e = _.read(arguments, 1);
                    this.getContext(!0).drawImage(t, e.x, e.y);
                },
                getAverageColor: function(t) {
                    var e, n;
                    t ? t instanceof N ? (n = t, e = t.getBounds()) : t.width ? e = new m(t) : t.x && (e = new m(t.x - .5, t.y - .5, 1, 1)) : e = this.getBounds();
                    var i = 32, r = Math.min(e.width, i), s = Math.min(e.height, i), a = k._sampleContext;
                    a ? a.clearRect(0, 0, i + 1, i + 1) : a = k._sampleContext = it.getContext(new p(i)), 
                    a.save();
                    var u = new w().scale(r / e.width, s / e.height).translate(-e.x, -e.y);
                    u.applyToContext(a), n && n.draw(a, new o({
                        clip: !0,
                        matrices: [ u ]
                    })), this._matrix.applyToContext(a);
                    var h = this.getElement(), l = this._size;
                    h && a.drawImage(h, -l.width / 2, -l.height / 2), a.restore();
                    for (var c = a.getImageData(.5, .5, Math.ceil(r), Math.ceil(s)).data, f = [ 0, 0, 0 ], d = 0, _ = 0, g = c.length; g > _; _ += 4) {
                        var v = c[_ + 3];
                        d += v, v /= 255, f[0] += c[_] * v, f[1] += c[_ + 1] * v, f[2] += c[_ + 2] * v;
                    }
                    for (var _ = 0; 3 > _; _++) f[_] /= d;
                    return d ? F.read(f) : null;
                },
                getPixel: function() {
                    var t = _.read(arguments), e = this.getContext().getImageData(t.x, t.y, 1, 1).data;
                    return new F("rgb", [ e[0] / 255, e[1] / 255, e[2] / 255 ], e[3] / 255);
                },
                setPixel: function() {
                    var t = _.read(arguments), e = F.read(arguments), n = e._convert("rgb"), i = e._alpha, r = this.getContext(!0), s = r.createImageData(1, 1), a = s.data;
                    a[0] = 255 * n[0], a[1] = 255 * n[1], a[2] = 255 * n[2], a[3] = null != i ? 255 * i : 255, 
                    r.putImageData(s, t.x, t.y);
                },
                createImageData: function() {
                    var t = p.read(arguments);
                    return this.getContext().createImageData(t.width, t.height);
                },
                getImageData: function() {
                    var t = m.read(arguments);
                    return t.isEmpty() && (t = new m(this._size)), this.getContext().getImageData(t.x, t.y, t.width, t.height);
                },
                setImageData: function(t) {
                    var e = _.read(arguments, 1);
                    this.getContext(!0).putImageData(t, e.x, e.y);
                },
                _getBounds: function(t, e) {
                    var n = new m(this._size).setCenter(0, 0);
                    return e ? e._transformBounds(n) : n;
                },
                _hitTestSelf: function(t) {
                    if (this._contains(t)) {
                        var e = this;
                        return new M("pixel", e, {
                            offset: t.add(e._size.divide(2)).round(),
                            color: {
                                get: function() {
                                    return e.getPixel(this.offset);
                                }
                            }
                        });
                    }
                },
                _draw: function(t) {
                    var e = this.getElement();
                    e && (t.globalAlpha = this._opacity, t.drawImage(e, -this._size.width / 2, -this._size.height / 2));
                },
                _canComposite: function() {
                    return !0;
                }
            }), I = S.extend({
                _class: "PlacedSymbol",
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _boundsGetter: {
                    getBounds: "getStrokeBounds"
                },
                _boundsSelected: !0,
                _serializeFields: {
                    symbol: null
                },
                initialize: function(t, e) {
                    this._initialize(t, e !== a && _.read(arguments, 1)) || this.setSymbol(t instanceof C ? t : new C(t));
                },
                _equals: function(t) {
                    return this._symbol === t._symbol;
                },
                getSymbol: function() {
                    return this._symbol;
                },
                setSymbol: function(t) {
                    this._symbol = t, this._changed(9);
                },
                clone: function(t) {
                    var e = new I(S.NO_INSERT);
                    return e.setSymbol(this._symbol), this._clone(e, t);
                },
                isEmpty: function() {
                    return this._symbol._definition.isEmpty();
                },
                _getBounds: function(t, e, n) {
                    var i = this.symbol._definition;
                    return i._getCachedBounds(t, e && e.chain(i._matrix), n);
                },
                _hitTestSelf: function(t, e) {
                    var n = this._symbol._definition._hitTest(t, e);
                    return n && (n.item = this), n;
                },
                _draw: function(t, e) {
                    this.symbol._definition.draw(t, e);
                }
            }), M = o.extend({
                _class: "HitResult",
                initialize: function(t, e, n) {
                    this.type = t, this.item = e, n && (n.enumerable = !0, this.inject(n));
                },
                statics: {
                    getOptions: function(t) {
                        return new o({
                            type: null,
                            tolerance: s.settings.hitTolerance,
                            fill: !t,
                            stroke: !t,
                            segments: !t,
                            handles: !1,
                            ends: !1,
                            center: !1,
                            bounds: !1,
                            guides: !1,
                            selected: !1
                        }, t);
                    }
                }
            }), O = o.extend({
                _class: "Segment",
                beans: !0,
                initialize: function(t, e, n, i, r, s) {
                    var o, u, h, l = arguments.length;
                    0 === l || (1 === l ? "point" in t ? (o = t.point, u = t.handleIn, h = t.handleOut) : o = t : 2 === l && "number" == typeof t ? o = arguments : 3 >= l ? (o = t, 
                    u = e, h = n) : (o = t !== a ? [ t, e ] : null, u = n !== a ? [ n, i ] : null, h = r !== a ? [ r, s ] : null)), 
                    new T(o, this, "_point"), new T(u, this, "_handleIn"), new T(h, this, "_handleOut");
                },
                _serialize: function(t) {
                    return o.serialize(this.hasHandles() ? [ this._point, this._handleIn, this._handleOut ] : this._point, t, !0);
                },
                _changed: function(t) {
                    var e = this._path;
                    if (e) {
                        var n, i = e._curves, r = this._index;
                        i && (t && t !== this._point && t !== this._handleIn || !(n = r > 0 ? i[r - 1] : e._closed ? i[i.length - 1] : null) || n._changed(), 
                        t && t !== this._point && t !== this._handleOut || !(n = i[r]) || n._changed()), 
                        e._changed(25);
                    }
                },
                getPoint: function() {
                    return this._point;
                },
                setPoint: function() {
                    var t = _.read(arguments);
                    this._point.set(t.x, t.y);
                },
                getHandleIn: function() {
                    return this._handleIn;
                },
                setHandleIn: function() {
                    var t = _.read(arguments);
                    this._handleIn.set(t.x, t.y);
                },
                getHandleOut: function() {
                    return this._handleOut;
                },
                setHandleOut: function() {
                    var t = _.read(arguments);
                    this._handleOut.set(t.x, t.y);
                },
                hasHandles: function() {
                    return !this._handleIn.isZero() || !this._handleOut.isZero();
                },
                clearHandles: function() {
                    this._handleIn.set(0, 0), this._handleOut.set(0, 0);
                },
                _selectionState: 0,
                isSelected: function(t) {
                    var e = this._selectionState;
                    return t ? t === this._point ? !!(4 & e) : t === this._handleIn ? !!(1 & e) : t === this._handleOut ? !!(2 & e) : !1 : !!(7 & e);
                },
                setSelected: function(t, e) {
                    var n = this._path, t = !!t, i = this._selectionState, r = i, s = e ? e === this._point ? 4 : e === this._handleIn ? 1 : e === this._handleOut ? 2 : 0 : 7;
                    t ? i |= s : i &= ~s, this._selectionState = i, n && i !== r && (n._updateSelection(this, r, i), 
                    n._changed(129));
                },
                getIndex: function() {
                    return this._index !== a ? this._index : null;
                },
                getPath: function() {
                    return this._path || null;
                },
                getCurve: function() {
                    var t = this._path, e = this._index;
                    return t ? (e > 0 && !t._closed && e === t._segments.length - 1 && e--, t.getCurves()[e] || null) : null;
                },
                getLocation: function() {
                    var t = this.getCurve();
                    return t ? new L(t, this === t._segment1 ? 0 : 1) : null;
                },
                getNext: function() {
                    var t = this._path && this._path._segments;
                    return t && (t[this._index + 1] || this._path._closed && t[0]) || null;
                },
                getPrevious: function() {
                    var t = this._path && this._path._segments;
                    return t && (t[this._index - 1] || this._path._closed && t[t.length - 1]) || null;
                },
                isFirst: function() {
                    return 0 === this._index;
                },
                isLast: function() {
                    var t = this._path;
                    return t && this._index === t._segments.length - 1 || !1;
                },
                reverse: function() {
                    var t = this._handleIn, e = this._handleOut, n = t._x, i = t._y;
                    t.set(e._x, e._y), e.set(n, i);
                },
                reversed: function() {
                    return new O(this._point, this._handleOut, this._handleIn);
                },
                remove: function() {
                    return this._path ? !!this._path.removeSegment(this._index) : !1;
                },
                clone: function() {
                    return new O(this._point, this._handleIn, this._handleOut);
                },
                equals: function(t) {
                    return t === this || t && this._class === t._class && this._point.equals(t._point) && this._handleIn.equals(t._handleIn) && this._handleOut.equals(t._handleOut) || !1;
                },
                toString: function() {
                    var t = [ "point: " + this._point ];
                    return this._handleIn.isZero() || t.push("handleIn: " + this._handleIn), this._handleOut.isZero() || t.push("handleOut: " + this._handleOut), 
                    "{ " + t.join(", ") + " }";
                },
                transform: function(t) {
                    this._transformCoordinates(t, new Array(6), !0), this._changed();
                },
                _transformCoordinates: function(t, e, n) {
                    var i = this._point, r = n && this._handleIn.isZero() ? null : this._handleIn, s = n && this._handleOut.isZero() ? null : this._handleOut, a = i._x, o = i._y, u = 2;
                    return e[0] = a, e[1] = o, r && (e[u++] = r._x + a, e[u++] = r._y + o), s && (e[u++] = s._x + a, 
                    e[u++] = s._y + o), t && (t._transformCoordinates(e, e, u / 2), a = e[0], o = e[1], 
                    n ? (i._x = a, i._y = o, u = 2, r && (r._x = e[u++] - a, r._y = e[u++] - o), s && (s._x = e[u++] - a, 
                    s._y = e[u++] - o)) : (r || (e[u++] = a, e[u++] = o), s || (e[u++] = a, e[u++] = o))), 
                    e;
                }
            }), T = _.extend({
                initialize: function(t, e, n) {
                    var i, r, s;
                    if (t) if ((i = t[0]) !== a) r = t[1]; else {
                        var o = t;
                        (i = o.x) === a && (o = _.read(arguments), i = o.x), r = o.y, s = o.selected;
                    } else i = r = 0;
                    this._x = i, this._y = r, this._owner = e, e[n] = this, s && this.setSelected(!0);
                },
                set: function(t, e) {
                    return this._x = t, this._y = e, this._owner._changed(this), this;
                },
                _serialize: function(t) {
                    var e = t.formatter, n = e.number(this._x), i = e.number(this._y);
                    return this.isSelected() ? {
                        x: n,
                        y: i,
                        selected: !0
                    } : [ n, i ];
                },
                getX: function() {
                    return this._x;
                },
                setX: function(t) {
                    this._x = t, this._owner._changed(this);
                },
                getY: function() {
                    return this._y;
                },
                setY: function(t) {
                    this._y = t, this._owner._changed(this);
                },
                isZero: function() {
                    return f.isZero(this._x) && f.isZero(this._y);
                },
                setSelected: function(t) {
                    this._owner.setSelected(t, this);
                },
                isSelected: function() {
                    return this._owner.isSelected(this);
                }
            }), z = o.extend({
                _class: "Curve",
                initialize: function(t, e, n, i, r, s, a, o) {
                    var u, h, l, c, f, d, _ = arguments.length;
                    3 === _ ? (this._path = t, u = e, h = n) : 0 === _ ? (u = new O(), h = new O()) : 1 === _ ? "segment1" in t ? (u = new O(t.segment1), 
                    h = new O(t.segment2)) : "point1" in t ? (l = t.point1, f = t.handle1, d = t.handle2, 
                    c = t.point2) : Array.isArray(t) && (l = [ t[0], t[1] ], c = [ t[6], t[7] ], f = [ t[2] - t[0], t[3] - t[1] ], 
                    d = [ t[4] - t[6], t[5] - t[7] ]) : 2 === _ ? (u = new O(t), h = new O(e)) : 4 === _ ? (l = t, 
                    f = e, d = n, c = i) : 8 === _ && (l = [ t, e ], c = [ a, o ], f = [ n - t, i - e ], 
                    d = [ r - a, s - o ]), this._segment1 = u || new O(l, null, f), this._segment2 = h || new O(c, d, null);
                },
                _serialize: function(t) {
                    return o.serialize(this.hasHandles() ? [ this.getPoint1(), this.getHandle1(), this.getHandle2(), this.getPoint2() ] : [ this.getPoint1(), this.getPoint2() ], t, !0);
                },
                _changed: function() {
                    this._length = this._bounds = a;
                },
                clone: function() {
                    return new z(this._segment1, this._segment2);
                },
                toString: function() {
                    var t = [ "point1: " + this._segment1._point ];
                    return this._segment1._handleOut.isZero() || t.push("handle1: " + this._segment1._handleOut), 
                    this._segment2._handleIn.isZero() || t.push("handle2: " + this._segment2._handleIn), 
                    t.push("point2: " + this._segment2._point), "{ " + t.join(", ") + " }";
                },
                remove: function() {
                    var t = !1;
                    if (this._path) {
                        var e = this._segment2, n = e._handleOut;
                        t = e.remove(), t && this._segment1._handleOut.set(n.x, n.y);
                    }
                    return t;
                },
                getPoint1: function() {
                    return this._segment1._point;
                },
                setPoint1: function() {
                    var t = _.read(arguments);
                    this._segment1._point.set(t.x, t.y);
                },
                getPoint2: function() {
                    return this._segment2._point;
                },
                setPoint2: function() {
                    var t = _.read(arguments);
                    this._segment2._point.set(t.x, t.y);
                },
                getHandle1: function() {
                    return this._segment1._handleOut;
                },
                setHandle1: function() {
                    var t = _.read(arguments);
                    this._segment1._handleOut.set(t.x, t.y);
                },
                getHandle2: function() {
                    return this._segment2._handleIn;
                },
                setHandle2: function() {
                    var t = _.read(arguments);
                    this._segment2._handleIn.set(t.x, t.y);
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
                    var t = this._path && this._path._curves;
                    return t && (t[this._segment1._index + 1] || this._path._closed && t[0]) || null;
                },
                getPrevious: function() {
                    var t = this._path && this._path._curves;
                    return t && (t[this._segment1._index - 1] || this._path._closed && t[t.length - 1]) || null;
                },
                isFirst: function() {
                    return 0 === this._segment1._index;
                },
                isLast: function() {
                    var t = this._path;
                    return t && this._segment1._index === t._curves.length - 1 || !1;
                },
                isSelected: function() {
                    return this.getPoint1().isSelected() && this.getHandle2().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected();
                },
                setSelected: function(t) {
                    this.getPoint1().setSelected(t), this.getHandle1().setSelected(t), this.getHandle2().setSelected(t), 
                    this.getPoint2().setSelected(t);
                },
                getValues: function(t) {
                    return z.getValues(this._segment1, this._segment2, t);
                },
                getPoints: function() {
                    for (var t = this.getValues(), e = [], n = 0; 8 > n; n += 2) e.push(new _(t[n], t[n + 1]));
                    return e;
                },
                getLength: function() {
                    return null == this._length && (this._length = z.getLength(this.getValues(), 0, 1)), 
                    this._length;
                },
                getArea: function() {
                    return z.getArea(this.getValues());
                },
                getLine: function() {
                    return new b(this._segment1._point, this._segment2._point);
                },
                getPart: function(t, e) {
                    return new z(z.getPart(this.getValues(), t, e));
                },
                getPartLength: function(t, e) {
                    return z.getLength(this.getValues(), t, e);
                },
                getIntersections: function(t) {
                    return z._getIntersections(this.getValues(), t && t !== this ? t.getValues() : null, this, t, [], {});
                },
                _getParameter: function(t, e) {
                    return e ? t : t && t.curve === this ? t.parameter : t === a && e === a ? .5 : this.getParameterAt(t, 0);
                },
                divide: function(t, e, n) {
                    var i = this._getParameter(t, e), r = 4e-7, s = 1 - r, a = null;
                    if (i >= r && s >= i) {
                        var o = z.subdivide(this.getValues(), i), u = o[0], h = o[1], l = n || this.hasHandles(), c = this._segment1, f = this._segment2, d = this._path;
                        l && (c._handleOut.set(u[2] - u[0], u[3] - u[1]), f._handleIn.set(h[4] - h[6], h[5] - h[7]));
                        var g = u[6], p = u[7], v = new O(new _(g, p), l && new _(u[4] - g, u[5] - p), l && new _(h[2] - g, h[3] - p));
                        d ? (d.insert(c._index + 1, v), a = this.getNext()) : (this._segment2 = v, a = new z(v, f));
                    }
                    return a;
                },
                split: function(t, e) {
                    return this._path ? this._path.split(this._segment1._index, this._getParameter(t, e)) : null;
                },
                reversed: function() {
                    return new z(this._segment2.reversed(), this._segment1.reversed());
                },
                clearHandles: function() {
                    this._segment1._handleOut.set(0, 0), this._segment2._handleIn.set(0, 0);
                },
                statics: {
                    getValues: function(t, e, n) {
                        var i = t._point, r = t._handleOut, s = e._handleIn, a = e._point, o = [ i._x, i._y, i._x + r._x, i._y + r._y, a._x + s._x, a._y + s._y, a._x, a._y ];
                        return n && n._transformCoordinates(o, o, 4), o;
                    },
                    subdivide: function(t, e) {
                        var n = t[0], i = t[1], r = t[2], s = t[3], o = t[4], u = t[5], h = t[6], l = t[7];
                        e === a && (e = .5);
                        var c = 1 - e, f = c * n + e * r, d = c * i + e * s, _ = c * r + e * o, g = c * s + e * u, p = c * o + e * h, v = c * u + e * l, m = c * f + e * _, y = c * d + e * g, w = c * _ + e * p, b = c * g + e * v, x = c * m + e * w, C = c * y + e * b;
                        return [ [ n, i, f, d, m, y, x, C ], [ x, C, w, b, p, v, h, l ] ];
                    },
                    solveCubic: function(t, e, n, i, r, s) {
                        var a = t[e], o = t[e + 2], u = t[e + 4], h = t[e + 6], l = 3 * (o - a), c = 3 * (u - o) - l, d = h - a - l - c;
                        return f.solveCubic(d, c, l, a - n, i, r, s);
                    },
                    getParameterOf: function(t, e) {
                        var n = new _(t[0], t[1]), i = new _(t[6], t[7]), r = 1e-12, s = e.isClose(n, r) ? 0 : e.isClose(i, r) ? 1 : null;
                        if (null !== s) return s;
                        for (var a = [ e.x, e.y ], o = [], u = 2e-7, h = 0; 2 > h; h++) for (var l = z.solveCubic(t, h, a[h], o, 0, 1), c = 0; l > c; c++) if (s = o[c], 
                        e.isClose(z.getPoint(t, s), u)) return s;
                        return e.isClose(n, u) ? 0 : e.isClose(i, u) ? 1 : null;
                    },
                    getNearestParameter: function(t, e) {
                        function n(n) {
                            if (n >= 0 && 1 >= n) {
                                var i = e.getDistance(z.getPoint(t, n), !0);
                                if (f > i) return f = i, d = n, !0;
                            }
                        }
                        if (z.isStraight(t)) {
                            var i = t[0], r = t[1], s = t[6], a = t[7], o = s - i, u = a - r, h = o * o + u * u;
                            if (0 === h) return 0;
                            var l = ((e.x - i) * o + (e.y - r) * u) / h;
                            return 1e-12 > l ? 0 : l > .999999999999 ? 1 : z.getParameterOf(t, new _(i + l * o, r + l * u));
                        }
                        for (var c = 100, f = 1 / 0, d = 0, g = 0; c >= g; g++) n(g / c);
                        for (var p = 1 / (2 * c); p > 4e-7; ) n(d - p) || n(d + p) || (p /= 2);
                        return d;
                    },
                    getPart: function(t, e, n) {
                        var i = e > n;
                        if (i) {
                            var r = e;
                            e = n, n = r;
                        }
                        return e > 0 && (t = z.subdivide(t, e)[1]), 1 > n && (t = z.subdivide(t, (n - e) / (1 - e))[0]), 
                        i ? [ t[6], t[7], t[4], t[5], t[2], t[3], t[0], t[1] ] : t;
                    },
                    hasHandles: function(t) {
                        var e = f.isZero;
                        return !(e(t[0] - t[2]) && e(t[1] - t[3]) && e(t[4] - t[6]) && e(t[5] - t[7]));
                    },
                    isFlatEnough: function(t, e) {
                        var n = t[0], i = t[1], r = t[2], s = t[3], a = t[4], o = t[5], u = t[6], h = t[7], l = 3 * r - 2 * n - u, c = 3 * s - 2 * i - h, f = 3 * a - 2 * u - n, d = 3 * o - 2 * h - i;
                        return Math.max(l * l, f * f) + Math.max(c * c, d * d) < 10 * e * e;
                    },
                    getArea: function(t) {
                        var e = t[0], n = t[1], i = t[6], r = t[7], s = (t[2] + e) / 2, a = (t[3] + n) / 2, o = (t[4] + t[6]) / 2, u = (t[5] + t[7]) / 2;
                        return 6 * ((e - s) * (a + n) + (s - o) * (u + a) + (o - i) * (r + u)) / 10;
                    },
                    getBounds: function(t) {
                        for (var e = t.slice(0, 2), n = e.slice(), i = [ 0, 0 ], r = 0; 2 > r; r++) z._addBounds(t[r], t[r + 2], t[r + 4], t[r + 6], r, 0, e, n, i);
                        return new m(e[0], e[1], n[0] - e[0], n[1] - e[1]);
                    },
                    _addBounds: function(t, e, n, i, r, s, a, o, u) {
                        function h(t, e) {
                            var n = t - e, i = t + e;
                            n < a[r] && (a[r] = n), i > o[r] && (o[r] = i);
                        }
                        var l = 3 * (e - n) - t + i, c = 2 * (t + n) - 4 * e, d = e - t, _ = f.solveQuadratic(l, c, d, u), g = 4e-7, p = 1 - g;
                        h(i, 0);
                        for (var v = 0; _ > v; v++) {
                            var m = u[v], y = 1 - m;
                            m > g && p > m && h(y * y * y * t + 3 * y * y * m * e + 3 * y * m * m * n + m * m * m * i, s);
                        }
                    }
                }
            }, o.each([ "getBounds", "getStrokeBounds", "getHandleBounds", "getRoughBounds" ], function(t) {
                this[t] = function() {
                    this._bounds || (this._bounds = {});
                    var e = this._bounds[t];
                    if (!e) {
                        var n = this._path;
                        e = this._bounds[t] = V[t]([ this._segment1, this._segment2 ], !1, n && n.getStyle());
                    }
                    return e.clone();
                };
            }, {}), o.each({
                isStraight: function(t, e, n) {
                    if (e.isZero() && n.isZero()) return !0;
                    if (t.isZero()) return !1;
                    if (e.isCollinear(t) && n.isCollinear(t)) {
                        var i = t.dot(t), r = t.dot(e) / i, s = t.dot(n) / i;
                        return r >= 0 && 1 >= r && 0 >= s && s >= -1;
                    }
                    return !1;
                },
                isLinear: function(t, e, n) {
                    var i = t.divide(3);
                    return e.equals(i) && n.negate().equals(i);
                }
            }, function(t, e) {
                this[e] = function() {
                    var e = this._segment1, n = this._segment2;
                    return t(n._point.subtract(e._point), e._handleOut, n._handleIn);
                }, this.statics[e] = function(e) {
                    var n = e[0], i = e[1], r = e[6], s = e[7];
                    return t(new _(r - n, s - i), new _(e[2] - n, e[3] - i), new _(e[4] - r, e[5] - s));
                };
            }, {
                statics: {},
                hasHandles: function() {
                    return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero();
                },
                isCollinear: function(t) {
                    return t && this.isStraight() && t.isStraight() && this.getLine().isCollinear(t.getLine());
                },
                isHorizontal: function() {
                    return this.isStraight() && Math.abs(this.getTangentAt(.5, !0).y) < 1e-7;
                },
                isVertical: function() {
                    return this.isStraight() && Math.abs(this.getTangentAt(.5, !0).x) < 1e-7;
                }
            }), {
                beans: !1,
                getParameterAt: function(t, e) {
                    return z.getParameterAt(this.getValues(), t, e);
                },
                getParameterOf: function() {
                    return z.getParameterOf(this.getValues(), _.read(arguments));
                },
                getLocationAt: function(t, e) {
                    var n = e ? t : this.getParameterAt(t);
                    return null != n && n >= 0 && 1 >= n ? new L(this, n) : null;
                },
                getLocationOf: function() {
                    return this.getLocationAt(this.getParameterOf(_.read(arguments)), !0);
                },
                getOffsetOf: function() {
                    var t = this.getLocationOf.apply(this, arguments);
                    return t ? t.getOffset() : null;
                },
                getNearestLocation: function() {
                    var t = _.read(arguments), e = this.getValues(), n = z.getNearestParameter(e, t), i = z.getPoint(e, n);
                    return new L(this, n, i, null, t.getDistance(i));
                },
                getNearestPoint: function() {
                    return this.getNearestLocation.apply(this, arguments).getPoint();
                }
            }, new function() {
                var t = [ "getPoint", "getTangent", "getNormal", "getWeightedTangent", "getWeightedNormal", "getCurvature" ];
                return o.each(t, function(t) {
                    this[t + "At"] = function(e, n) {
                        var i = this.getValues();
                        return z[t](i, n ? e : z.getParameterAt(i, e, 0));
                    };
                }, {
                    statics: {
                        evaluateMethods: t
                    }
                });
            }(), new function() {
                function t(t) {
                    var e = t[0], n = t[1], i = t[2], r = t[3], s = t[4], a = t[5], o = t[6], u = t[7], h = 9 * (i - s) + 3 * (o - e), l = 6 * (e + s) - 12 * i, c = 3 * (i - e), f = 9 * (r - a) + 3 * (u - n), d = 6 * (n + a) - 12 * r, _ = 3 * (r - n);
                    return function(t) {
                        var e = (h * t + l) * t + c, n = (f * t + d) * t + _;
                        return Math.sqrt(e * e + n * n);
                    };
                }
                function e(t, e) {
                    return Math.max(2, Math.min(16, Math.ceil(32 * Math.abs(e - t))));
                }
                function n(t, e, n, i) {
                    if (null == e || 0 > e || e > 1) return null;
                    var r, s, a = t[0], o = t[1], u = t[2], h = t[3], l = t[4], c = t[5], f = t[6], d = t[7], g = 4e-7, p = 1 - g;
                    if (0 === n && (g > e || e > p)) {
                        var v = g > e;
                        r = v ? a : f, s = v ? o : d;
                    } else {
                        var m = 3 * (u - a), y = 3 * (l - u) - m, w = f - a - m - y, b = 3 * (h - o), x = 3 * (c - h) - b, C = d - o - b - x;
                        if (0 === n) r = ((w * e + y) * e + m) * e + a, s = ((C * e + x) * e + b) * e + o; else {
                            if (g > e ? (r = m, s = b) : e > p ? (r = 3 * (f - l), s = 3 * (d - c)) : (r = (3 * w * e + 2 * y) * e + m, 
                            s = (3 * C * e + 2 * x) * e + b), i) {
                                0 === r && 0 === s && (g > e || e > p) && (r = l - u, s = c - h);
                                var S = Math.sqrt(r * r + s * s);
                                S && (r /= S, s /= S);
                            }
                            if (3 === n) {
                                var E = 6 * w * e + 2 * y, P = 6 * C * e + 2 * x, A = Math.pow(r * r + s * s, 1.5);
                                r = 0 !== A ? (r * P - s * E) / A : 0, s = 0;
                            }
                        }
                    }
                    return 2 === n ? new _(s, -r) : new _(r, s);
                }
                return {
                    statics: {
                        getLength: function(n, i, r) {
                            if (i === a && (i = 0), r === a && (r = 1), 0 === i && 1 === r && z.isStraight(n)) {
                                var s = n[6] - n[0], o = n[7] - n[1];
                                return Math.sqrt(s * s + o * o);
                            }
                            var u = t(n);
                            return f.integrate(u, i, r, e(i, r));
                        },
                        getParameterAt: function(n, i, r) {
                            function s(t) {
                                return g += f.integrate(c, r, t, e(r, t)), r = t, g - i;
                            }
                            if (r === a && (r = 0 > i ? 1 : 0), 0 === i) return r;
                            var o = Math.abs, u = i > 0, h = u ? r : 0, l = u ? 1 : r, c = t(n), d = f.integrate(c, h, l, e(h, l));
                            if (o(i - d) < 1e-12) return u ? l : h;
                            if (o(i) > d) return null;
                            var _ = i / d, g = 0;
                            return f.findRoot(s, c, r + _, h, l, 32, 1e-12);
                        },
                        getPoint: function(t, e) {
                            return n(t, e, 0, !1);
                        },
                        getTangent: function(t, e) {
                            return n(t, e, 1, !0);
                        },
                        getWeightedTangent: function(t, e) {
                            return n(t, e, 1, !1);
                        },
                        getNormal: function(t, e) {
                            return n(t, e, 2, !0);
                        },
                        getWeightedNormal: function(t, e) {
                            return n(t, e, 2, !1);
                        },
                        getCurvature: function(t, e) {
                            return n(t, e, 3, !1).x;
                        }
                    }
                };
            }(), new function() {
                function t(t, e, n, i, r, s, a, o, u, h, l) {
                    var c = e.startConnected, f = e.endConnected, d = 4e-7, _ = 1 - d;
                    if (null == r && (r = z.getParameterOf(n, s)), null !== r && r >= (c ? d : 0) && (f ? _ : 1) >= r && (null == u && (u = z.getParameterOf(a, h)), 
                    null !== u && u >= (f ? d : 0) && (c ? _ : 1) >= u)) {
                        var g = e.renormalize;
                        if (g) {
                            var p = g(r, u);
                            r = p[0], u = p[1];
                        }
                        var v = new L(i, r, s || z.getPoint(n, r), l), m = new L(o, u, h || z.getPoint(a, u), l), y = v.getPath() === m.getPath() && v.getIndex() > m.getIndex(), w = y ? m : v, b = e.include;
                        v._intersection = m, m._intersection = v, b && !b(w) || L.insert(t, w, !0);
                    }
                }
                function e(r, s, a, o, u, h, l, c, f, d, _, g, p) {
                    if (!(++p >= 24)) {
                        var v, m, y = s[0], w = s[1], x = s[6], C = s[7], S = b.getSignedDistance, E = S(y, w, x, C, s[2], s[3]), P = S(y, w, x, C, s[4], s[5]), A = E * P > 0 ? .75 : 4 / 9, k = A * Math.min(0, E, P), I = A * Math.max(0, E, P), M = S(y, w, x, C, r[0], r[1]), O = S(y, w, x, C, r[2], r[3]), T = S(y, w, x, C, r[4], r[5]), L = S(y, w, x, C, r[6], r[7]), N = n(M, O, T, L), V = N[0], j = N[1];
                        if (null != (v = i(V, j, k, I)) && null != (m = i(V.reverse(), j.reverse(), k, I))) {
                            r = z.getPart(r, v, m);
                            var B = m - v, D = l + (c - l) * v, R = l + (c - l) * m;
                            if (_ > .5 && B > .5) if (R - D > d - f) {
                                var q = z.subdivide(r, .5), F = D + (R - D) / 2;
                                e(s, q[0], o, a, u, h, f, d, D, F, B, !g, p), e(s, q[1], o, a, u, h, f, d, F, R, B, !g, p);
                            } else {
                                var q = z.subdivide(s, .5), F = f + (d - f) / 2;
                                e(q[0], r, o, a, u, h, f, F, D, R, B, !g, p), e(q[1], r, o, a, u, h, F, d, D, R, B, !g, p);
                            } else if (Math.max(d - f, R - D) < 1e-7) {
                                var $ = D + (R - D) / 2, W = f + (d - f) / 2;
                                r = a.getValues(), s = o.getValues(), t(u, h, g ? s : r, g ? o : a, g ? W : $, null, g ? r : s, g ? a : o, g ? $ : W, null);
                            } else B > 1e-12 && e(s, r, o, a, u, h, f, d, D, R, B, !g, p);
                        }
                    }
                }
                function n(t, e, n, i) {
                    var r, s = [ 0, t ], a = [ 1 / 3, e ], o = [ 2 / 3, n ], u = [ 1, i ], h = e - (2 * t + i) / 3, l = n - (t + 2 * i) / 3;
                    if (0 > h * l) r = [ [ s, a, u ], [ s, o, u ] ]; else {
                        var c = h / l;
                        r = [ c >= 2 ? [ s, a, u ] : .5 >= c ? [ s, o, u ] : [ s, a, o, u ], [ s, u ] ];
                    }
                    return 0 > (h || l) ? r.reverse() : r;
                }
                function i(t, e, n, i) {
                    return t[0][1] < n ? r(t, !0, n) : e[0][1] > i ? r(e, !1, i) : t[0][0];
                }
                function r(t, e, n) {
                    for (var i = t[0][0], r = t[0][1], s = 1, a = t.length; a > s; s++) {
                        var o = t[s][0], u = t[s][1];
                        if (e ? u >= n : n >= u) return u === n ? o : i + (n - r) * (o - i) / (u - r);
                        i = o, r = u;
                    }
                    return null;
                }
                function s(e, n, i, r, s, a) {
                    for (var o = z.isStraight(e), u = o ? n : e, h = o ? e : n, l = h[0], c = h[1], d = h[6], _ = h[7], g = d - l, p = _ - c, v = Math.atan2(-p, g), m = Math.sin(v), y = Math.cos(v), w = [], b = 0; 8 > b; b += 2) {
                        var x = u[b] - l, C = u[b + 1] - c;
                        w.push(x * y - C * m, x * m + C * y);
                    }
                    for (var S = [], E = z.solveCubic(w, 1, 0, S, 0, 1), b = 0; E > b; b++) {
                        var P = S[b], A = z.getPoint(u, P), k = z.getParameterOf(h, A);
                        if (null !== k) {
                            var I = z.getPoint(h, k), M = o ? k : P, O = o ? P : k;
                            (!a.endConnected || O > f.CURVETIME_EPSILON) && t(s, a, e, i, M, o ? I : A, n, r, O, o ? A : I);
                        }
                    }
                }
                function a(e, n, i, r, s, a) {
                    var o = b.intersect(e[0], e[1], e[6], e[7], n[0], n[1], n[6], n[7]);
                    o && t(s, a, e, i, null, o, n, r, null, o);
                }
                return {
                    statics: {
                        _getIntersections: function(n, i, r, o, u, h) {
                            if (!i) return z._getSelfIntersection(n, r, u, h);
                            var l = n[0], c = n[1], f = n[6], d = n[7], g = i[0], p = i[1], v = i[6], m = i[7], y = (3 * n[2] + l) / 4, w = (3 * n[3] + c) / 4, b = (3 * n[4] + f) / 4, x = (3 * n[5] + d) / 4, C = (3 * i[2] + g) / 4, S = (3 * i[3] + p) / 4, E = (3 * i[4] + v) / 4, P = (3 * i[5] + m) / 4, A = Math.min, k = Math.max;
                            if (!(k(l, y, b, f) >= A(g, C, E, v) && A(l, y, b, f) <= k(g, C, E, v) && k(c, w, x, d) >= A(p, S, P, m) && A(c, w, x, d) <= k(p, S, P, m))) return u;
                            if (!h.startConnected && !h.endConnected) {
                                var I = z.getOverlaps(n, i);
                                if (I) {
                                    for (var M = 0; 2 > M; M++) {
                                        var O = I[M];
                                        t(u, h, n, r, O[0], null, i, o, O[1], null, !0);
                                    }
                                    return u;
                                }
                            }
                            var T = z.isStraight(n), L = z.isStraight(i), N = T && L, V = 1e-12, j = u.length;
                            if ((N ? a : T || L ? s : e)(n, i, r, o, u, h, 0, 1, 0, 1, 0, !1, 0), N && u.length > j) return u;
                            var B = new _(l, c), D = new _(f, d), R = new _(g, p), q = new _(v, m);
                            return B.isClose(R, V) && t(u, h, n, r, 0, B, i, o, 0, R), !h.startConnected && B.isClose(q, V) && t(u, h, n, r, 0, B, i, o, 1, q), 
                            !h.endConnected && D.isClose(R, V) && t(u, h, n, r, 1, D, i, o, 0, R), D.isClose(q, V) && t(u, h, n, r, 1, D, i, o, 1, q), 
                            u;
                        },
                        _getSelfIntersection: function(t, e, n, i) {
                            var r = t[0], s = t[1], a = t[2], o = t[3], u = t[4], h = t[5], l = t[6], c = t[7], d = new b(r, s, l, c, !1), g = d.getSide(new _(a, o), !0), p = d.getSide(new _(u, h), !0);
                            if (g === p) {
                                var v = (r - u) * (o - c) + (a - l) * (h - s);
                                if (v * g > 0) return n;
                            }
                            var m = l - 3 * u + 3 * a - r, y = u - 2 * a + r, w = a - r, x = c - 3 * h + 3 * o - s, C = h - 2 * o + s, S = o - s, E = x * w - m * S, P = x * y - m * C, A = C * w - y * S;
                            if (0 > E * E - 4 * P * A) {
                                var k, I = [], M = f.solveCubic(m * m + x * x, 3 * (m * y + x * C), 2 * (y * y + C * C) + m * w + x * S, y * w + C * S, I, 0, 1);
                                if (M > 0) {
                                    for (var O = 0, T = 0; M > O; O++) {
                                        var L = Math.abs(e.getCurvatureAt(I[O], !0));
                                        L > T && (T = L, k = I[O]);
                                    }
                                    var N = z.subdivide(t, k);
                                    i.endConnected = !0, i.renormalize = function(t, e) {
                                        return [ t * k, e * (1 - k) + k ];
                                    }, z._getIntersections(N[0], N[1], e, e, n, i);
                                }
                            }
                            return n;
                        },
                        getOverlaps: function(t, e) {
                            function n(t) {
                                var e = t[6] - t[0], n = t[7] - t[1];
                                return e * e + n * n;
                            }
                            var i = Math.abs, r = 4e-7, s = 2e-7, a = z.isStraight(t), o = z.isStraight(e), u = a && o;
                            if (u) {
                                var h = n(t) < n(e), l = h ? e : t, c = h ? t : e, f = new b(l[0], l[1], l[6], l[7]);
                                if (f.getDistance(new _(c[0], c[1])) > s || f.getDistance(new _(c[6], c[7])) > s) return null;
                            } else if (a ^ o) return null;
                            for (var d = [ t, e ], g = [], p = 0, v = 0; 2 > p && g.length < 2; p += 0 === v ? 0 : 1, 
                            v = 1 ^ v) {
                                var m = z.getParameterOf(d[1 ^ p], new _(d[p][0 === v ? 0 : 6], d[p][0 === v ? 1 : 7]));
                                if (null != m) {
                                    var y = 0 === p ? [ v, m ] : [ m, v ];
                                    (0 === g.length || i(y[0] - g[0][0]) > r && i(y[1] - g[0][1]) > r) && g.push(y);
                                }
                                if (1 === p && 0 === g.length) break;
                            }
                            if (2 !== g.length) g = null; else if (!u) {
                                var w = z.getPart(t, g[0][0], g[1][0]), x = z.getPart(e, g[0][1], g[1][1]);
                                (i(x[2] - w[2]) > s || i(x[3] - w[3]) > s || i(x[4] - w[4]) > s || i(x[5] - w[5]) > s) && (g = null);
                            }
                            return g;
                        }
                    }
                };
            }()), L = o.extend({
                _class: "CurveLocation",
                beans: !0,
                initialize: function bt(t, e, n, i, r) {
                    if (e > .9999996) {
                        var s = t.getNext();
                        s && (e = 0, t = s);
                    }
                    this._id = d.get(bt), this._setCurve(t), this._parameter = e, this._point = n || t.getPointAt(e, !0), 
                    this._overlap = i, this._distance = r, this._intersection = this._next = this._prev = null;
                },
                _setCurve: function(t) {
                    var e = t._path;
                    this._version = e ? e._version : 0, this._curve = t, this._segment = null, this._segment1 = t._segment1, 
                    this._segment2 = t._segment2;
                },
                _setSegment: function(t) {
                    this._setCurve(t.getCurve()), this._segment = t, this._parameter = t === this._segment1 ? 0 : 1, 
                    this._point = t._point.clone();
                },
                getSegment: function() {
                    var t = this.getCurve(), e = this._segment;
                    if (!e) {
                        var n = this.getParameter();
                        0 === n ? e = t._segment1 : 1 === n ? e = t._segment2 : null != n && (e = t.getPartLength(0, n) < t.getPartLength(n, 1) ? t._segment1 : t._segment2), 
                        this._segment = e;
                    }
                    return e;
                },
                getCurve: function() {
                    function t(t) {
                        var e = t && t.getCurve();
                        return e && null != (i._parameter = e.getParameterOf(i._point)) ? (i._setCurve(e), 
                        i._segment = t, e) : void 0;
                    }
                    var e = this._curve, n = e && e._path, i = this;
                    return n && n._version !== this._version && (e = this._parameter = this._curve = this._offset = null), 
                    e || t(this._segment) || t(this._segment1) || t(this._segment2.getPrevious());
                },
                getPath: function() {
                    var t = this.getCurve();
                    return t && t._path;
                },
                getIndex: function() {
                    var t = this.getCurve();
                    return t && t.getIndex();
                },
                getParameter: function() {
                    var t = this.getCurve(), e = this._parameter;
                    return t && null == e ? this._parameter = t.getParameterOf(this._point) : e;
                },
                getPoint: function() {
                    return this._point;
                },
                getOffset: function() {
                    var t = this._offset;
                    if (null == t) {
                        t = 0;
                        var e = this.getPath(), n = this.getIndex();
                        if (e && null != n) for (var i = e.getCurves(), r = 0; n > r; r++) t += i[r].getLength();
                        this._offset = t += this.getCurveOffset();
                    }
                    return t;
                },
                getCurveOffset: function() {
                    var t = this.getCurve(), e = this.getParameter();
                    return null != e && t && t.getPartLength(0, e);
                },
                getIntersection: function() {
                    return this._intersection;
                },
                getDistance: function() {
                    return this._distance;
                },
                divide: function() {
                    var t = this.getCurve(), e = null;
                    return t && (e = t.divide(this.getParameter(), !0), e && this._setSegment(e._segment1)), 
                    e;
                },
                split: function() {
                    var t = this.getCurve();
                    return t ? t.split(this.getParameter(), !0) : null;
                },
                equals: function(t, e) {
                    var n = this === t, i = 2e-7;
                    if (!n && t instanceof L && this.getPath() === t.getPath() && this.getPoint().isClose(t.getPoint(), i)) {
                        var r = this.getCurve(), s = t.getCurve(), a = Math.abs, o = a((r.isLast() && s.isFirst() ? -1 : r.getIndex()) + this.getParameter() - ((s.isLast() && r.isFirst() ? -1 : s.getIndex()) + t.getParameter()));
                        n = (4e-7 > o || (o = a(this.getOffset() - t.getOffset())) < i || a(this.getPath().getLength() - o) < i) && (e || !this._intersection && !t._intersection || this._intersection && this._intersection.equals(t._intersection, !0));
                    }
                    return n;
                },
                toString: function() {
                    var t = [], e = this.getPoint(), n = c.instance;
                    e && t.push("point: " + e);
                    var i = this.getIndex();
                    null != i && t.push("index: " + i);
                    var r = this.getParameter();
                    return null != r && t.push("parameter: " + n.number(r)), null != this._distance && t.push("distance: " + n.number(this._distance)), 
                    "{ " + t.join(", ") + " }";
                },
                isTouching: function() {
                    var t = this._intersection;
                    if (t && this.getTangent().isCollinear(t.getTangent())) {
                        var e = this.getCurve(), n = t.getCurve();
                        return !(e.isStraight() && n.isStraight() && e.getLine().intersect(n.getLine()));
                    }
                    return !1;
                },
                isCrossing: function() {
                    function t(t, e, n) {
                        return n > e ? t > e && n > t : t > e && l >= t || t >= -l && n > t;
                    }
                    var e = this._intersection;
                    if (!e) return !1;
                    var n = this.getParameter(), i = e.getParameter(), r = 4e-7, s = 1 - r;
                    if (n >= r && s >= n || i >= r && s >= i) return !this.isTouching();
                    var a = this.getCurve(), o = a.getPrevious(), u = e.getCurve(), h = u.getPrevious(), l = Math.PI;
                    if (!o || !h) return !1;
                    var c = o.getTangentAt(s, !0).negate().getAngleInRadians(), f = a.getTangentAt(r, !0).getAngleInRadians(), d = h.getTangentAt(s, !0).negate().getAngleInRadians(), _ = u.getTangentAt(r, !0).getAngleInRadians();
                    return t(d, c, f) ^ t(_, c, f) && t(d, f, c) ^ t(_, f, c);
                },
                isOverlap: function() {
                    return !!this._overlap;
                }
            }, o.each(z.evaluateMethods, function(t) {
                var e = t + "At";
                this[t] = function() {
                    var t = this.getParameter(), n = this.getCurve();
                    return null != t && n && n[e](t, !0);
                };
            }, {
                preserve: !0
            }), new function() {
                function t(t, e, n) {
                    function i(n, i) {
                        for (var s = n + i; s >= -1 && r >= s; s += i) {
                            var a = t[(s % r + r) % r];
                            if (!e.getPoint().isClose(a.getPoint(), 2e-7)) break;
                            if (e.equals(a)) return a;
                        }
                        return null;
                    }
                    for (var r = t.length, s = 0, a = r - 1; a >= s; ) {
                        var o, u = s + a >>> 1, h = t[u];
                        if (n && (o = e.equals(h) ? h : i(u, -1) || i(u, 1))) return e._overlap && (o._overlap = o._intersection._overlap = !0), 
                        o;
                        var l = e.getPath(), c = h.getPath(), f = l === c ? e.getIndex() + e.getParameter() - (h.getIndex() + h.getParameter()) : l._id - c._id;
                        0 > f ? a = u - 1 : s = u + 1;
                    }
                    return t.splice(s, 0, e), e;
                }
                return {
                    statics: {
                        insert: t,
                        expand: function(e) {
                            for (var n = e.slice(), i = 0, r = e.length; r > i; i++) t(n, e[i]._intersection, !1);
                            return n;
                        }
                    }
                };
            }()), N = S.extend({
                _class: "PathItem",
                initialize: function() {},
                getIntersections: function(t, e, n, i) {
                    var r = this === t || !t, s = this._matrix.orNullIfIdentity(), a = r ? s : (n || t._matrix).orNullIfIdentity();
                    if (!r && !this.getBounds(s).touches(t.getBounds(a))) return [];
                    for (var o, t, u = this.getCurves(), h = r ? u : t.getCurves(), l = u.length, c = r ? l : h.length, f = [], d = [], _ = 0; c > _; _++) f[_] = h[_].getValues(a);
                    for (var _ = 0; l > _; _++) {
                        var g = u[_], p = r ? f[_] : g.getValues(s), v = g.getPath();
                        v !== t && (t = v, o = [], d.push(o)), r && z._getSelfIntersection(p, g, o, {
                            include: e,
                            startConnected: 1 === l && g.getPoint1().equals(g.getPoint2())
                        });
                        for (var m = r ? _ + 1 : 0; c > m; m++) {
                            if (i && o.length) return o;
                            var y = h[m];
                            z._getIntersections(p, f[m], g, y, o, {
                                include: e,
                                startConnected: r && g.getPrevious() === y,
                                endConnected: r && g.getNext() === y
                            });
                        }
                    }
                    o = [];
                    for (var _ = 0, w = d.length; w > _; _++) o.push.apply(o, d[_]);
                    return o;
                },
                getCrossings: function(t) {
                    return this.getIntersections(t, function(t) {
                        return t.isCrossing();
                    });
                },
                _asPathItem: function() {
                    return this;
                },
                setPathData: function(t) {
                    function e(t, e) {
                        var n = +i[t];
                        return o && (n += u[e]), n;
                    }
                    function n(t) {
                        return new _(e(t, "x"), e(t + 1, "y"));
                    }
                    var i, r, s, a = t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi), o = !1, u = new _(), h = new _();
                    this.clear();
                    for (var l = 0, c = a && a.length; c > l; l++) {
                        var f = a[l], d = f[0], g = d.toLowerCase();
                        i = f.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
                        var v = i && i.length;
                        switch (o = d === g, "z" !== r || /[mz]/.test(g) || this.moveTo(u = h), g) {
                          case "m":
                          case "l":
                            for (var m = "m" === g, y = 0; v > y; y += 2) this[0 === y && m ? "moveTo" : "lineTo"](u = n(y));
                            s = u, m && (h = u);
                            break;

                          case "h":
                          case "v":
                            for (var w = "h" === g ? "x" : "y", y = 0; v > y; y++) u[w] = e(y, w), this.lineTo(u);
                            s = u;
                            break;

                          case "c":
                            for (var y = 0; v > y; y += 6) this.cubicCurveTo(n(y), s = n(y + 2), u = n(y + 4));
                            break;

                          case "s":
                            for (var y = 0; v > y; y += 4) this.cubicCurveTo(/[cs]/.test(r) ? u.multiply(2).subtract(s) : u, s = n(y), u = n(y + 2)), 
                            r = g;
                            break;

                          case "q":
                            for (var y = 0; v > y; y += 4) this.quadraticCurveTo(s = n(y), u = n(y + 2));
                            break;

                          case "t":
                            for (var y = 0; v > y; y += 2) this.quadraticCurveTo(s = /[qt]/.test(r) ? u.multiply(2).subtract(s) : u, u = n(y)), 
                            r = g;
                            break;

                          case "a":
                            for (var y = 0; v > y; y += 7) this.arcTo(u = n(y + 5), new p(+i[y], +i[y + 1]), +i[y + 2], +i[y + 4], +i[y + 3]);
                            break;

                          case "z":
                            this.closePath(!0);
                        }
                        r = g;
                    }
                },
                _canComposite: function() {
                    return !(this.hasFill() && this.hasStroke());
                },
                _contains: function(t) {
                    var e = this._getWinding(t, !1, !0);
                    return !!("evenodd" === this.getWindingRule() ? 1 & e : e);
                }
            }), V = N.extend({
                _class: "Path",
                _serializeFields: {
                    segments: [],
                    closed: !1
                },
                initialize: function(t) {
                    this._closed = !1, this._segments = [], this._version = 0;
                    var e = Array.isArray(t) ? "object" == typeof t[0] ? t : arguments : !t || t.size !== a || t.x === a && t.point === a ? null : arguments;
                    e && e.length > 0 ? this.setSegments(e) : (this._curves = a, this._selectedSegmentState = 0, 
                    e || "string" != typeof t || (this.setPathData(t), t = null)), this._initialize(!e && t);
                },
                _equals: function(t) {
                    return this._closed === t._closed && o.equals(this._segments, t._segments);
                },
                clone: function(t) {
                    var e = new V(S.NO_INSERT);
                    return e.setSegments(this._segments), e._closed = this._closed, this._clockwise !== a && (e._clockwise = this._clockwise), 
                    this._clone(e, t);
                },
                _changed: function xt(t) {
                    if (xt.base.call(this, t), 8 & t) {
                        var e = this._parent;
                        if (e && (e._currentPath = a), this._length = this._area = this._clockwise = this._monoCurves = a, 
                        16 & t) this._version++; else if (this._curves) for (var n = 0, i = this._curves.length; i > n; n++) this._curves[n]._changed();
                    } else 32 & t && (this._bounds = a);
                },
                getStyle: function() {
                    var t = this._parent;
                    return (t instanceof j ? t : this)._style;
                },
                getSegments: function() {
                    return this._segments;
                },
                setSegments: function(t) {
                    var e = this.isFullySelected();
                    this._segments.length = 0, this._selectedSegmentState = 0, this._curves = a, t && t.length > 0 && this._add(O.readAll(t)), 
                    e && this.setFullySelected(!0);
                },
                getFirstSegment: function() {
                    return this._segments[0];
                },
                getLastSegment: function() {
                    return this._segments[this._segments.length - 1];
                },
                getCurves: function() {
                    var t = this._curves, e = this._segments;
                    if (!t) {
                        var n = this._countCurves();
                        t = this._curves = new Array(n);
                        for (var i = 0; n > i; i++) t[i] = new z(this, e[i], e[i + 1] || e[0]);
                    }
                    return t;
                },
                getFirstCurve: function() {
                    return this.getCurves()[0];
                },
                getLastCurve: function() {
                    var t = this.getCurves();
                    return t[t.length - 1];
                },
                isClosed: function() {
                    return this._closed;
                },
                setClosed: function(t) {
                    if (this._closed != (t = !!t)) {
                        if (this._closed = t, this._curves) {
                            var e = this._curves.length = this._countCurves();
                            t && (this._curves[e - 1] = new z(this, this._segments[e - 1], this._segments[0]));
                        }
                        this._changed(25);
                    }
                }
            }, {
                beans: !0,
                getPathData: function(t, e) {
                    function n(e, n) {
                        e._transformCoordinates(t, g, !1), i = g[0], r = g[1], p ? (v.push("M" + _.pair(i, r)), 
                        p = !1) : (o = g[2], u = g[3], o === i && u === r && h === s && l === a ? n || v.push("l" + _.pair(i - s, r - a)) : v.push("c" + _.pair(h - s, l - a) + " " + _.pair(o - s, u - a) + " " + _.pair(i - s, r - a))), 
                        s = i, a = r, h = g[4], l = g[5];
                    }
                    var i, r, s, a, o, u, h, l, f = this._segments, d = f.length, _ = new c(e), g = new Array(6), p = !0, v = [];
                    if (0 === d) return "";
                    for (var m = 0; d > m; m++) n(f[m]);
                    return this._closed && d > 0 && (n(f[0], !0), v.push("z")), v.join("");
                }
            }, {
                isEmpty: function() {
                    return 0 === this._segments.length;
                },
                _transformContent: function(t) {
                    for (var e = new Array(6), n = 0, i = this._segments.length; i > n; n++) this._segments[n]._transformCoordinates(t, e, !0);
                    return !0;
                },
                _add: function(t, e) {
                    for (var n = this._segments, i = this._curves, r = t.length, s = null == e, e = s ? n.length : e, a = 0; r > a; a++) {
                        var o = t[a];
                        o._path && (o = t[a] = o.clone()), o._path = this, o._index = e + a, o._selectionState && this._updateSelection(o, 0, o._selectionState);
                    }
                    if (s) n.push.apply(n, t); else {
                        n.splice.apply(n, [ e, 0 ].concat(t));
                        for (var a = e + r, u = n.length; u > a; a++) n[a]._index = a;
                    }
                    if (i) {
                        var h = this._countCurves(), l = e + r - 1 === h ? e - 1 : e, c = l, f = Math.min(l + r, h);
                        t._curves && (i.splice.apply(i, [ l, 0 ].concat(t._curves)), c += t._curves.length);
                        for (var a = c; f > a; a++) i.splice(a, 0, new z(this, null, null));
                        this._adjustCurves(l, f);
                    }
                    return this._changed(25), t;
                },
                _adjustCurves: function(t, e) {
                    for (var n, i = this._segments, r = this._curves, s = t; e > s; s++) n = r[s], n._path = this, 
                    n._segment1 = i[s], n._segment2 = i[s + 1] || i[0], n._changed();
                    (n = r[this._closed && 0 === t ? i.length - 1 : t - 1]) && (n._segment2 = i[t] || i[0], 
                    n._changed()), (n = r[e]) && (n._segment1 = i[e], n._changed());
                },
                _countCurves: function() {
                    var t = this._segments.length;
                    return !this._closed && t > 0 ? t - 1 : t;
                },
                add: function(t) {
                    return arguments.length > 1 && "number" != typeof t ? this._add(O.readAll(arguments)) : this._add([ O.read(arguments) ])[0];
                },
                insert: function(t, e) {
                    return arguments.length > 2 && "number" != typeof e ? this._add(O.readAll(arguments, 1), t) : this._add([ O.read(arguments, 1) ], t)[0];
                },
                addSegment: function() {
                    return this._add([ O.read(arguments) ])[0];
                },
                insertSegment: function(t) {
                    return this._add([ O.read(arguments, 1) ], t)[0];
                },
                addSegments: function(t) {
                    return this._add(O.readAll(t));
                },
                insertSegments: function(t, e) {
                    return this._add(O.readAll(e), t);
                },
                removeSegment: function(t) {
                    return this.removeSegments(t, t + 1)[0] || null;
                },
                removeSegments: function(t, e, n) {
                    t = t || 0, e = o.pick(e, this._segments.length);
                    var i = this._segments, r = this._curves, s = i.length, a = i.splice(t, e - t), u = a.length;
                    if (!u) return a;
                    for (var h = 0; u > h; h++) {
                        var l = a[h];
                        l._selectionState && this._updateSelection(l, l._selectionState, 0), l._index = l._path = null;
                    }
                    for (var h = t, c = i.length; c > h; h++) i[h]._index = h;
                    if (r) {
                        var f = t > 0 && e === s + (this._closed ? 1 : 0) ? t - 1 : t, r = r.splice(f, u);
                        n && (a._curves = r.slice(1)), this._adjustCurves(f, f);
                    }
                    return this._changed(25), a;
                },
                clear: "#removeSegments",
                hasHandles: function() {
                    for (var t = this._segments, e = 0, n = t.length; n > e; e++) if (t[e].hasHandles()) return !0;
                    return !1;
                },
                clearHandles: function() {
                    for (var t = this._segments, e = 0, n = t.length; n > e; e++) t[e].clearHandles();
                },
                getLength: function() {
                    if (null == this._length) {
                        for (var t = this.getCurves(), e = 0, n = 0, i = t.length; i > n; n++) e += t[n].getLength();
                        this._length = e;
                    }
                    return this._length;
                },
                getArea: function() {
                    if (null == this._area) {
                        for (var t = this._segments, e = t.length, n = e - 1, i = 0, r = 0, s = this._closed ? e : n; s > r; r++) i += z.getArea(z.getValues(t[r], t[n > r ? r + 1 : 0]));
                        this._area = i;
                    }
                    return this._area;
                },
                isClockwise: function() {
                    return this._clockwise !== a ? this._clockwise : this.getArea() >= 0;
                },
                setClockwise: function(t) {
                    this.isClockwise() != (t = !!t) && this.reverse(), this._clockwise = t;
                },
                isFullySelected: function() {
                    var t = this._segments.length;
                    return this._selected && t > 0 && this._selectedSegmentState === 7 * t;
                },
                setFullySelected: function(t) {
                    t && this._selectSegments(!0), this.setSelected(t);
                },
                setSelected: function Ct(t) {
                    t || this._selectSegments(!1), Ct.base.call(this, t);
                },
                _selectSegments: function(t) {
                    var e = this._segments.length;
                    this._selectedSegmentState = t ? 7 * e : 0;
                    for (var n = 0; e > n; n++) this._segments[n]._selectionState = t ? 7 : 0;
                },
                _updateSelection: function(t, e, n) {
                    t._selectionState = n;
                    var i = this._selectedSegmentState += n - e;
                    i > 0 && this.setSelected(!0);
                },
                flatten: function(t) {
                    for (var e = new B(this, 64, .1), n = 0, i = e.length / Math.ceil(e.length / t), r = e.length + (this._closed ? -i : i) / 2, s = []; r >= n; ) s.push(new O(e.getPointAt(n))), 
                    n += i;
                    this.setSegments(s);
                },
                reduce: function() {
                    for (var t = this.getCurves(), e = t.length - 1; e >= 0; e--) {
                        var n = t[e];
                        n.hasHandles() || 0 !== n.getLength() && !n.isCollinear(n.getNext()) || n.remove();
                    }
                    return this;
                },
                simplify: function(t) {
                    if (this._segments.length > 2) {
                        var e = new D(this, t || 2.5);
                        this.setSegments(e.fit());
                    }
                },
                split: function(t, e) {
                    if (null === e) return null;
                    if (1 === arguments.length) {
                        var n = t;
                        if ("number" == typeof n && (n = this.getLocationAt(n)), !n) return null;
                        t = n.index, e = n.parameter;
                    }
                    var i = 4e-7, r = 1 - i;
                    e >= r && (t++, e--);
                    var s = this.getCurves();
                    if (t >= 0 && t < s.length) {
                        e >= i && s[t++].divide(e, !0);
                        var a, o = this.removeSegments(t, this._segments.length, !0);
                        return this._closed ? (this.setClosed(!1), a = this) : (a = new V(S.NO_INSERT), 
                        a.insertAbove(this, !0), this._clone(a)), a._add(o, 0), this.addSegment(o[0]), a;
                    }
                    return null;
                },
                reverse: function() {
                    this._segments.reverse();
                    for (var t = 0, e = this._segments.length; e > t; t++) {
                        var n = this._segments[t], i = n._handleIn;
                        n._handleIn = n._handleOut, n._handleOut = i, n._index = t;
                    }
                    this._curves = null, this._clockwise !== a && (this._clockwise = !this._clockwise), 
                    this._changed(9);
                },
                join: function(t) {
                    if (t) {
                        var e = t._segments, n = this.getLastSegment(), i = t.getLastSegment();
                        if (!i) return this;
                        n && n._point.equals(i._point) && t.reverse();
                        var r = t.getFirstSegment();
                        if (n && n._point.equals(r._point)) n.setHandleOut(r._handleOut), this._add(e.slice(1)); else {
                            var s = this.getFirstSegment();
                            s && s._point.equals(r._point) && t.reverse(), i = t.getLastSegment(), s && s._point.equals(i._point) ? (s.setHandleIn(i._handleIn), 
                            this._add(e.slice(0, e.length - 1), 0)) : this._add(e.slice());
                        }
                        t._closed && this._add([ e[0] ]), t.remove();
                    }
                    var a = this.getFirstSegment(), o = this.getLastSegment();
                    return a !== o && a._point.equals(o._point) && (a.setHandleIn(o._handleIn), o.remove(), 
                    this.setClosed(!0)), this;
                },
                toShape: function(t) {
                    function e(t, e) {
                        var n = h[t], i = n.getNext(), r = h[e], s = r.getNext();
                        return n._handleOut.isZero() && i._handleIn.isZero() && r._handleOut.isZero() && s._handleIn.isZero() && i._point.subtract(n._point).isCollinear(s._point.subtract(r._point));
                    }
                    function n(t) {
                        var e = h[t], n = e.getPrevious(), i = e.getNext();
                        return n._handleOut.isZero() && e._handleIn.isZero() && e._handleOut.isZero() && i._handleIn.isZero() && e._point.subtract(n._point).isOrthogonal(i._point.subtract(e._point));
                    }
                    function i(t) {
                        var e = h[t], n = e.getNext(), i = e._handleOut, r = n._handleIn, s = .5522847498307936;
                        if (i.isOrthogonal(r)) {
                            var a = e._point, o = n._point, u = new b(a, i, !0).intersect(new b(o, r, !0), !0);
                            return u && f.isZero(i.getLength() / u.subtract(a).getLength() - s) && f.isZero(r.getLength() / u.subtract(o).getLength() - s);
                        }
                        return !1;
                    }
                    function r(t, e) {
                        return h[t]._point.getDistance(h[e]._point);
                    }
                    if (!this._closed) return null;
                    var s, a, o, u, h = this._segments;
                    if (!this.hasHandles() && 4 === h.length && e(0, 2) && e(1, 3) && n(1) ? (s = A.Rectangle, 
                    a = new p(r(0, 3), r(0, 1)), u = h[1]._point.add(h[2]._point).divide(2)) : 8 === h.length && i(0) && i(2) && i(4) && i(6) && e(1, 5) && e(3, 7) ? (s = A.Rectangle, 
                    a = new p(r(1, 6), r(0, 3)), o = a.subtract(new p(r(0, 7), r(1, 2))).divide(2), 
                    u = h[3]._point.add(h[4]._point).divide(2)) : 4 === h.length && i(0) && i(1) && i(2) && i(3) && (f.isZero(r(0, 2) - r(1, 3)) ? (s = A.Circle, 
                    o = r(0, 2) / 2) : (s = A.Ellipse, o = new p(r(2, 0) / 2, r(3, 1) / 2)), u = h[1]._point), 
                    s) {
                        var l = this.getPosition(!0), c = this._clone(new s({
                            center: l,
                            size: a,
                            radius: o,
                            insert: !1
                        }), t, !1);
                        return c.rotate(u.subtract(l).getAngle() + 90), c;
                    }
                    return null;
                },
                _hitTestSelf: function(t, e) {
                    function n(e, n) {
                        return t.subtract(e).divide(n).length <= 1;
                    }
                    function i(t, i, r) {
                        if (!e.selected || i.isSelected()) {
                            var s = t._point;
                            if (i !== s && (i = i.add(s)), n(i, w)) return new M(r, d, {
                                segment: t,
                                point: i
                            });
                        }
                    }
                    function r(t, n) {
                        return (n || e.segments) && i(t, t._point, "segment") || !n && e.handles && (i(t, t._handleIn, "handle-in") || i(t, t._handleOut, "handle-out"));
                    }
                    function s(t) {
                        l.add(t);
                    }
                    function a(e) {
                        if (("round" !== o || "round" !== u) && (l = new V({
                            internal: !0,
                            closed: !0
                        }), m || e._index > 0 && e._index < v - 1 ? "round" !== o && (e._handleIn.isZero() || e._handleOut.isZero()) && V._addBevelJoin(e, o, S, h, s, !0) : "round" !== u && V._addSquareCap(e, u, S, s, !0), 
                        !l.isEmpty())) {
                            var i;
                            return l.contains(t) || (i = l.getNearestLocation(t)) && n(i.getPoint(), y);
                        }
                        return n(e._point, w);
                    }
                    var o, u, h, l, c, f, d = this, g = this.getStyle(), p = this._segments, v = p.length, m = this._closed, y = e._tolerancePadding, w = y, b = e.stroke && g.hasStroke(), x = e.fill && g.hasFill(), C = e.curves, S = b ? g.getStrokeWidth() / 2 : x && e.tolerance > 0 || C ? 0 : null;
                    if (null !== S && (S > 0 ? (o = g.getStrokeJoin(), u = g.getStrokeCap(), h = S * g.getMiterLimit(), 
                    w = y.add(new _(S, S))) : o = u = "round"), !e.ends || e.segments || m) {
                        if (e.segments || e.handles) for (var E = 0; v > E; E++) if (f = r(p[E])) return f;
                    } else if (f = r(p[0], !0) || r(p[v - 1], !0)) return f;
                    if (null !== S) {
                        if (c = this.getNearestLocation(t)) {
                            var P = c.getParameter();
                            0 === P || 1 === P && v > 1 ? a(c.getSegment()) || (c = null) : n(c.getPoint(), w) || (c = null);
                        }
                        if (!c && "miter" === o && v > 1) for (var E = 0; v > E; E++) {
                            var A = p[E];
                            if (t.getDistance(A._point) <= h && a(A)) {
                                c = A.getLocation();
                                break;
                            }
                        }
                    }
                    return !c && x && this._contains(t) || c && !b && !C ? new M("fill", this) : c ? new M(b ? "stroke" : "curve", this, {
                        location: c,
                        point: c.getPoint()
                    }) : null;
                }
            }, o.each(z.evaluateMethods, function(t) {
                this[t + "At"] = function(e, n) {
                    var i = this.getLocationAt(e, n);
                    return i && i[t]();
                };
            }, {
                beans: !1,
                getLocationOf: function() {
                    for (var t = _.read(arguments), e = this.getCurves(), n = 0, i = e.length; i > n; n++) {
                        var r = e[n].getLocationOf(t);
                        if (r) return r;
                    }
                    return null;
                },
                getOffsetOf: function() {
                    var t = this.getLocationOf.apply(this, arguments);
                    return t ? t.getOffset() : null;
                },
                getLocationAt: function(t, e) {
                    var n = this.getCurves(), i = 0;
                    if (e) {
                        var r = ~~t, s = n[r];
                        return s ? s.getLocationAt(t - r, !0) : null;
                    }
                    for (var a = 0, o = n.length; o > a; a++) {
                        var u = i, s = n[a];
                        if (i += s.getLength(), i > t) return s.getLocationAt(t - u);
                    }
                    return n.length > 0 && t <= this.getLength() ? new L(n[n.length - 1], 1) : null;
                },
                getNearestLocation: function() {
                    for (var t = _.read(arguments), e = this.getCurves(), n = 1 / 0, i = null, r = 0, s = e.length; s > r; r++) {
                        var a = e[r].getNearestLocation(t);
                        a._distance < n && (n = a._distance, i = a);
                    }
                    return i;
                },
                getNearestPoint: function() {
                    return this.getNearestLocation.apply(this, arguments).getPoint();
                }
            }), new function() {
                function t(t, e, n, i) {
                    function r(e) {
                        var n = a[e], i = a[e + 1];
                        c == n && f == i || (t.beginPath(), t.moveTo(c, f), t.lineTo(n, i), t.stroke(), 
                        t.beginPath(), t.arc(n, i, s, 0, 2 * Math.PI, !0), t.fill());
                    }
                    for (var s = i / 2, a = new Array(6), o = 0, u = e.length; u > o; o++) {
                        var h = e[o];
                        h._transformCoordinates(n, a, !1);
                        var l = h._selectionState, c = a[0], f = a[1];
                        if (1 & l && r(2), 2 & l && r(4), t.fillRect(c - s, f - s, i, i), !(4 & l)) {
                            var d = t.fillStyle;
                            t.fillStyle = "#ffffff", t.fillRect(c - s + 1, f - s + 1, i - 2, i - 2), t.fillStyle = d;
                        }
                    }
                }
                function e(t, e, n) {
                    function i(e) {
                        if (n) e._transformCoordinates(n, _, !1), r = _[0], s = _[1]; else {
                            var i = e._point;
                            r = i._x, s = i._y;
                        }
                        if (g) t.moveTo(r, s), g = !1; else {
                            if (n) u = _[2], h = _[3]; else {
                                var f = e._handleIn;
                                u = r + f._x, h = s + f._y;
                            }
                            u === r && h === s && l === a && c === o ? t.lineTo(r, s) : t.bezierCurveTo(l, c, u, h, r, s);
                        }
                        if (a = r, o = s, n) l = _[4], c = _[5]; else {
                            var f = e._handleOut;
                            l = a + f._x, c = o + f._y;
                        }
                    }
                    for (var r, s, a, o, u, h, l, c, f = e._segments, d = f.length, _ = new Array(6), g = !0, p = 0; d > p; p++) i(f[p]);
                    e._closed && d > 0 && i(f[0]);
                }
                return {
                    _draw: function(t, n, i) {
                        function r(t) {
                            return c[(t % f + f) % f];
                        }
                        var a = n.dontStart, o = n.dontFinish || n.clip, u = this.getStyle(), h = u.hasFill(), l = u.hasStroke(), c = u.getDashArray(), f = !s.support.nativeDash && l && c && c.length;
                        if (a || t.beginPath(), !a && this._currentPath ? t.currentPath = this._currentPath : (h || l && !f || o) && (e(t, this, i), 
                        this._closed && t.closePath(), a || (this._currentPath = t.currentPath)), !o && (h || l) && (this._setStyles(t), 
                        h && (t.fill(u.getWindingRule()), t.shadowColor = "rgba(0,0,0,0)"), l)) {
                            if (f) {
                                a || t.beginPath();
                                var d, _ = new B(this, 32, .25, i), g = _.length, p = -u.getDashOffset(), v = 0;
                                for (p %= g; p > 0; ) p -= r(v--) + r(v--);
                                for (;g > p; ) d = p + r(v++), (p > 0 || d > 0) && _.drawPart(t, Math.max(p, 0), Math.max(d, 0)), 
                                p = d + r(v++);
                            }
                            t.stroke();
                        }
                    },
                    _drawSelected: function(n, i) {
                        n.beginPath(), e(n, this, i), n.stroke(), t(n, this._segments, i, s.settings.handleSize);
                    }
                };
            }(), new function() {
                function t(t) {
                    var e = t.length, n = [], i = [], r = 2;
                    n[0] = t[0] / r;
                    for (var s = 1; e > s; s++) i[s] = 1 / r, r = (e - 1 > s ? 4 : 2) - i[s], n[s] = (t[s] - n[s - 1]) / r;
                    for (var s = 1; e > s; s++) n[e - s - 1] -= i[e - s] * n[e - s];
                    return n;
                }
                return {
                    smooth: function() {
                        var e = this._segments, n = e.length, i = this._closed, r = n, s = 0;
                        if (!(2 >= n)) {
                            i && (s = Math.min(n, 4), r += 2 * Math.min(n, s));
                            for (var a = [], o = 0; n > o; o++) a[o + s] = e[o]._point;
                            if (i) for (var o = 0; s > o; o++) a[o] = e[o + n - s]._point, a[o + n + s] = e[o]._point; else r--;
                            for (var u = [], o = 1; r - 1 > o; o++) u[o] = 4 * a[o]._x + 2 * a[o + 1]._x;
                            u[0] = a[0]._x + 2 * a[1]._x, u[r - 1] = 3 * a[r - 1]._x;
                            for (var h = t(u), o = 1; r - 1 > o; o++) u[o] = 4 * a[o]._y + 2 * a[o + 1]._y;
                            u[0] = a[0]._y + 2 * a[1]._y, u[r - 1] = 3 * a[r - 1]._y;
                            var l = t(u);
                            if (i) {
                                for (var o = 0, c = n; s > o; o++, c++) {
                                    var f = o / s, d = 1 - f, g = o + s, p = c + s;
                                    h[c] = h[o] * f + h[c] * d, l[c] = l[o] * f + l[c] * d, h[p] = h[g] * d + h[p] * f, 
                                    l[p] = l[g] * d + l[p] * f;
                                }
                                r--;
                            }
                            for (var v = null, o = s; r - s >= o; o++) {
                                var m = e[o - s];
                                v && m.setHandleIn(v.subtract(m._point)), r > o && (m.setHandleOut(new _(h[o], l[o]).subtract(m._point)), 
                                v = r - 1 > o ? new _(2 * a[o + 1]._x - h[o + 1], 2 * a[o + 1]._y - l[o + 1]) : new _((a[r]._x + h[r - 1]) / 2, (a[r]._y + l[r - 1]) / 2));
                            }
                            if (i && v) {
                                var m = this._segments[0];
                                m.setHandleIn(v.subtract(m._point));
                            }
                        }
                    }
                };
            }(), new function() {
                function t(t) {
                    var e = t._segments;
                    if (0 === e.length) throw new Error("Use a moveTo() command first");
                    return e[e.length - 1];
                }
                return {
                    moveTo: function() {
                        var t = this._segments;
                        1 === t.length && this.removeSegment(0), t.length || this._add([ new O(_.read(arguments)) ]);
                    },
                    moveBy: function() {
                        throw new Error("moveBy() is unsupported on Path items.");
                    },
                    lineTo: function() {
                        this._add([ new O(_.read(arguments)) ]);
                    },
                    cubicCurveTo: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = _.read(arguments), r = t(this);
                        r.setHandleOut(e.subtract(r._point)), this._add([ new O(i, n.subtract(i)) ]);
                    },
                    quadraticCurveTo: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = t(this)._point;
                        this.cubicCurveTo(e.add(i.subtract(e).multiply(1 / 3)), e.add(n.subtract(e).multiply(1 / 3)), n);
                    },
                    curveTo: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = o.pick(o.read(arguments), .5), r = 1 - i, s = t(this)._point, a = e.subtract(s.multiply(r * r)).subtract(n.multiply(i * i)).divide(2 * i * r);
                        if (a.isNaN()) throw new Error("Cannot put a curve through points with parameter = " + i);
                        this.quadraticCurveTo(a, n);
                    },
                    arcTo: function() {
                        var e, n, i, r, s, a = t(this), u = a._point, h = _.read(arguments), l = o.peek(arguments), c = o.pick(l, !0);
                        if ("boolean" == typeof c) var f = u.add(h).divide(2), e = f.add(f.subtract(u).rotate(c ? -90 : 90)); else if (o.remain(arguments) <= 2) e = h, 
                        h = _.read(arguments); else {
                            var d = p.read(arguments);
                            if (d.isZero()) return this.lineTo(h);
                            var g = o.read(arguments), c = !!o.read(arguments), v = !!o.read(arguments), f = u.add(h).divide(2), m = u.subtract(f).rotate(-g), y = m.x, x = m.y, C = Math.abs, S = C(d.width), E = C(d.height), P = S * S, A = E * E, k = y * y, I = x * x, M = Math.sqrt(k / P + I / A);
                            if (M > 1 && (S *= M, E *= M, P = S * S, A = E * E), M = (P * A - P * I - A * k) / (P * I + A * k), 
                            C(M) < 1e-12 && (M = 0), 0 > M) throw new Error("Cannot create an arc with the given arguments");
                            n = new _(S * x / E, -E * y / S).multiply((v === c ? -1 : 1) * Math.sqrt(M)).rotate(g).add(f), 
                            s = new w().translate(n).rotate(g).scale(S, E), r = s._inverseTransform(u), i = r.getDirectedAngle(s._inverseTransform(h)), 
                            !c && i > 0 ? i -= 360 : c && 0 > i && (i += 360);
                        }
                        if (e) {
                            var T = new b(u.add(e).divide(2), e.subtract(u).rotate(90), !0), z = new b(e.add(h).divide(2), h.subtract(e).rotate(90), !0), L = new b(u, h), N = L.getSide(e);
                            if (n = T.intersect(z, !0), !n) {
                                if (!N) return this.lineTo(h);
                                throw new Error("Cannot create an arc with the given arguments");
                            }
                            r = u.subtract(n), i = r.getDirectedAngle(h.subtract(n));
                            var V = L.getSide(n);
                            0 === V ? i = N * Math.abs(i) : N === V && (i += 0 > i ? 360 : -360);
                        }
                        for (var j = Math.abs(i), B = j >= 360 ? 4 : Math.ceil(j / 90), D = i / B, R = D * Math.PI / 360, q = 4 / 3 * Math.sin(R) / (1 + Math.cos(R)), F = [], $ = 0; B >= $; $++) {
                            var m = h, W = null;
                            if (B > $ && (W = r.rotate(90).multiply(q), s ? (m = s._transformPoint(r), W = s._transformPoint(r.add(W)).subtract(m)) : m = n.add(r)), 
                            0 === $) a.setHandleOut(W); else {
                                var H = r.rotate(-90).multiply(q);
                                s && (H = s._transformPoint(r.add(H)).subtract(m)), F.push(new O(m, H, W));
                            }
                            r = r.rotate(D);
                        }
                        this._add(F);
                    },
                    lineBy: function() {
                        var e = _.read(arguments), n = t(this)._point;
                        this.lineTo(n.add(e));
                    },
                    curveBy: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = o.read(arguments), r = t(this)._point;
                        this.curveTo(r.add(e), r.add(n), i);
                    },
                    cubicCurveBy: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = _.read(arguments), r = t(this)._point;
                        this.cubicCurveTo(r.add(e), r.add(n), r.add(i));
                    },
                    quadraticCurveBy: function() {
                        var e = _.read(arguments), n = _.read(arguments), i = t(this)._point;
                        this.quadraticCurveTo(i.add(e), i.add(n));
                    },
                    arcBy: function() {
                        var e = t(this)._point, n = e.add(_.read(arguments)), i = o.pick(o.peek(arguments), !0);
                        "boolean" == typeof i ? this.arcTo(n, i) : this.arcTo(n, e.add(_.read(arguments)));
                    },
                    closePath: function(t) {
                        this.setClosed(!0), t && this.join();
                    }
                };
            }(), {
                _getBounds: function(t, e) {
                    return V[t](this._segments, this._closed, this.getStyle(), e);
                },
                statics: {
                    getBounds: function(t, e, n, i, r) {
                        function s(t) {
                            t._transformCoordinates(i, o, !1);
                            for (var e = 0; 2 > e; e++) z._addBounds(u[e], u[e + 4], o[e + 2], o[e], e, r ? r[e] : 0, h, l, c);
                            var n = u;
                            u = o, o = n;
                        }
                        var a = t[0];
                        if (!a) return new m();
                        for (var o = new Array(6), u = a._transformCoordinates(i, new Array(6), !1), h = u.slice(0, 2), l = h.slice(), c = new Array(2), f = 1, d = t.length; d > f; f++) s(t[f]);
                        return e && s(a), new m(h[0], h[1], l[0] - h[0], l[1] - h[1]);
                    },
                    getStrokeBounds: function(t, e, n, i) {
                        function r(t) {
                            c = c.include(i ? i._transformPoint(t, t) : t);
                        }
                        function s(t) {
                            c = c.unite(g.setCenter(i ? i._transformPoint(t._point) : t._point));
                        }
                        function a(t, e) {
                            var n = t._handleIn, i = t._handleOut;
                            "round" === e || !n.isZero() && !i.isZero() && n.isCollinear(i) ? s(t) : V._addBevelJoin(t, e, h, _, r);
                        }
                        function o(t, e) {
                            "round" === e ? s(t) : V._addSquareCap(t, e, h, r);
                        }
                        if (!n.hasStroke()) return V.getBounds(t, e, n, i);
                        for (var u = t.length - (e ? 0 : 1), h = n.getStrokeWidth() / 2, l = V._getPenPadding(h, i), c = V.getBounds(t, e, n, i, l), f = n.getStrokeJoin(), d = n.getStrokeCap(), _ = h * n.getMiterLimit(), g = new m(new p(l).multiply(2)), v = 1; u > v; v++) a(t[v], f);
                        return e ? a(t[0], f) : u > 0 && (o(t[0], d), o(t[t.length - 1], d)), c;
                    },
                    _getPenPadding: function(t, e) {
                        if (!e) return [ t, t ];
                        var n = e.shiftless(), i = n.transform(new _(t, 0)), r = n.transform(new _(0, t)), s = i.getAngleInRadians(), a = i.getLength(), o = r.getLength(), u = Math.sin(s), h = Math.cos(s), l = Math.tan(s), c = -Math.atan(o * l / a), f = Math.atan(o / (l * a));
                        return [ Math.abs(a * Math.cos(c) * h - o * Math.sin(c) * u), Math.abs(o * Math.sin(f) * h + a * Math.cos(f) * u) ];
                    },
                    _addBevelJoin: function(t, e, n, i, r, s) {
                        var a = t.getCurve(), o = a.getPrevious(), u = a.getPointAt(0, !0), h = o.getNormalAt(1, !0), l = a.getNormalAt(0, !0), c = h.getDirectedAngle(l) < 0 ? -n : n;
                        if (h.setLength(c), l.setLength(c), s && (r(u), r(u.add(h))), "miter" === e) {
                            var f = new b(u.add(h), new _(-h.y, h.x), !0).intersect(new b(u.add(l), new _(-l.y, l.x), !0), !0);
                            if (f && u.getDistance(f) <= i && (r(f), !s)) return;
                        }
                        s || r(u.add(h)), r(u.add(l));
                    },
                    _addSquareCap: function(t, e, n, i, r) {
                        var s = t._point, a = t.getLocation(), o = a.getNormal().multiply(n);
                        r && (i(s.subtract(o)), i(s.add(o))), "square" === e && (s = s.add(o.rotate(0 === a.getParameter() ? -90 : 90))), 
                        i(s.add(o)), i(s.subtract(o));
                    },
                    getHandleBounds: function(t, e, n, i, r, s) {
                        for (var a = new Array(6), o = 1 / 0, u = -o, h = o, l = u, c = 0, f = t.length; f > c; c++) {
                            var d = t[c];
                            d._transformCoordinates(i, a, !1);
                            for (var _ = 0; 6 > _; _ += 2) {
                                var g = 0 === _ ? s : r, p = g ? g[0] : 0, v = g ? g[1] : 0, y = a[_], w = a[_ + 1], b = y - p, x = y + p, C = w - v, S = w + v;
                                o > b && (o = b), x > u && (u = x), h > C && (h = C), S > l && (l = S);
                            }
                        }
                        return new m(o, h, u - o, l - h);
                    },
                    getRoughBounds: function(t, e, n, i) {
                        var r = n.hasStroke() ? n.getStrokeWidth() / 2 : 0, s = r;
                        return r > 0 && ("miter" === n.getStrokeJoin() && (s = r * n.getMiterLimit()), "square" === n.getStrokeCap() && (s = Math.max(s, r * Math.sqrt(2)))), 
                        V.getHandleBounds(t, e, n, i, V._getPenPadding(r, i), V._getPenPadding(s, i));
                    }
                }
            });
            V.inject({
                statics: new function() {
                    function t(t, e, n) {
                        var i = o.getNamed(n), r = new V(i && i.insert === !1 && S.NO_INSERT);
                        return r._add(t), r._closed = e, r.set(i);
                    }
                    function e(e, n, r) {
                        for (var s = new Array(4), a = 0; 4 > a; a++) {
                            var o = i[a];
                            s[a] = new O(o._point.multiply(n).add(e), o._handleIn.multiply(n), o._handleOut.multiply(n));
                        }
                        return t(s, !0, r);
                    }
                    var n = .5522847498307936, i = [ new O([ -1, 0 ], [ 0, n ], [ 0, -n ]), new O([ 0, -1 ], [ -n, 0 ], [ n, 0 ]), new O([ 1, 0 ], [ 0, -n ], [ 0, n ]), new O([ 0, 1 ], [ n, 0 ], [ -n, 0 ]) ];
                    return {
                        Line: function() {
                            return t([ new O(_.readNamed(arguments, "from")), new O(_.readNamed(arguments, "to")) ], !1, arguments);
                        },
                        Circle: function() {
                            var t = _.readNamed(arguments, "center"), n = o.readNamed(arguments, "radius");
                            return e(t, new p(n), arguments);
                        },
                        Rectangle: function() {
                            var e, i = m.readNamed(arguments, "rectangle"), r = p.readNamed(arguments, "radius", 0, {
                                readNull: !0
                            }), s = i.getBottomLeft(!0), a = i.getTopLeft(!0), o = i.getTopRight(!0), u = i.getBottomRight(!0);
                            if (!r || r.isZero()) e = [ new O(s), new O(a), new O(o), new O(u) ]; else {
                                r = p.min(r, i.getSize(!0).divide(2));
                                var h = r.width, l = r.height, c = h * n, f = l * n;
                                e = [ new O(s.add(h, 0), null, [ -c, 0 ]), new O(s.subtract(0, l), [ 0, f ]), new O(a.add(0, l), null, [ 0, -f ]), new O(a.add(h, 0), [ -c, 0 ], null), new O(o.subtract(h, 0), null, [ c, 0 ]), new O(o.add(0, l), [ 0, -f ], null), new O(u.subtract(0, l), null, [ 0, f ]), new O(u.subtract(h, 0), [ c, 0 ]) ];
                            }
                            return t(e, !0, arguments);
                        },
                        RoundRectangle: "#Rectangle",
                        Ellipse: function() {
                            var t = A._readEllipse(arguments);
                            return e(t.center, t.radius, arguments);
                        },
                        Oval: "#Ellipse",
                        Arc: function() {
                            var t = _.readNamed(arguments, "from"), e = _.readNamed(arguments, "through"), n = _.readNamed(arguments, "to"), i = o.getNamed(arguments), r = new V(i && i.insert === !1 && S.NO_INSERT);
                            return r.moveTo(t), r.arcTo(e, n), r.set(i);
                        },
                        RegularPolygon: function() {
                            for (var e = _.readNamed(arguments, "center"), n = o.readNamed(arguments, "sides"), i = o.readNamed(arguments, "radius"), r = 360 / n, s = !(n % 3), a = new _(0, s ? -i : i), u = s ? -1 : .5, h = new Array(n), l = 0; n > l; l++) h[l] = new O(e.add(a.rotate((l + u) * r)));
                            return t(h, !0, arguments);
                        },
                        Star: function() {
                            for (var e = _.readNamed(arguments, "center"), n = 2 * o.readNamed(arguments, "points"), i = o.readNamed(arguments, "radius1"), r = o.readNamed(arguments, "radius2"), s = 360 / n, a = new _(0, -1), u = new Array(n), h = 0; n > h; h++) u[h] = new O(e.add(a.rotate(s * h).multiply(h % 2 ? r : i)));
                            return t(u, !0, arguments);
                        }
                    };
                }()
            });
            var j = N.extend({
                _class: "CompoundPath",
                _serializeFields: {
                    children: []
                },
                initialize: function(t) {
                    this._children = [], this._namedChildren = {}, this._initialize(t) || ("string" == typeof t ? this.setPathData(t) : this.addChildren(Array.isArray(t) ? t : arguments));
                },
                insertChildren: function St(t, e, n) {
                    for (var i = e.length - 1; i >= 0; i--) {
                        var r = e[i];
                        r instanceof j && (e.splice.apply(e, [ i, 1 ].concat(r.removeChildren())), r.remove());
                    }
                    e = St.base.call(this, t, e, n, V);
                    for (var i = 0, s = !n && e && e.length; s > i; i++) {
                        var r = e[i];
                        r._clockwise === a && r.setClockwise(0 === r._index);
                    }
                    return e;
                },
                reverse: function() {
                    for (var t = this._children, e = 0, n = t.length; n > e; e++) t[e].reverse();
                },
                smooth: function() {
                    for (var t = 0, e = this._children.length; e > t; t++) this._children[t].smooth();
                },
                reduce: function Et() {
                    for (var t = this._children, e = t.length - 1; e >= 0; e--) {
                        var n = t[e].reduce();
                        n.isEmpty() && t.splice(e, 1);
                    }
                    if (0 === t.length) {
                        var n = new V(S.NO_INSERT);
                        return n.insertAbove(this), n.setStyle(this._style), this.remove(), n;
                    }
                    return Et.base.call(this);
                },
                isClockwise: function() {
                    var t = this.getFirstChild();
                    return t && t.isClockwise();
                },
                setClockwise: function(t) {
                    this.isClockwise() !== !!t && this.reverse();
                },
                getFirstSegment: function() {
                    var t = this.getFirstChild();
                    return t && t.getFirstSegment();
                },
                getLastSegment: function() {
                    var t = this.getLastChild();
                    return t && t.getLastSegment();
                },
                getCurves: function() {
                    for (var t = this._children, e = [], n = 0, i = t.length; i > n; n++) e.push.apply(e, t[n].getCurves());
                    return e;
                },
                getFirstCurve: function() {
                    var t = this.getFirstChild();
                    return t && t.getFirstCurve();
                },
                getLastCurve: function() {
                    var t = this.getLastChild();
                    return t && t.getFirstCurve();
                },
                getArea: function() {
                    for (var t = this._children, e = 0, n = 0, i = t.length; i > n; n++) e += t[n].getArea();
                    return e;
                }
            }, {
                beans: !0,
                getPathData: function(t, e) {
                    for (var n = this._children, i = [], r = 0, s = n.length; s > r; r++) {
                        var a = n[r], o = a._matrix;
                        i.push(a.getPathData(t && !o.isIdentity() ? t.chain(o) : t, e));
                    }
                    return i.join(" ");
                }
            }, {
                _getChildHitTestOptions: function(t) {
                    return t["class"] === V || "path" === t.type ? t : new o(t, {
                        fill: !1
                    });
                },
                _draw: function(t, e, n) {
                    var i = this._children;
                    if (0 !== i.length) {
                        if (this._currentPath) t.currentPath = this._currentPath; else {
                            e = e.extend({
                                dontStart: !0,
                                dontFinish: !0
                            }), t.beginPath();
                            for (var r = 0, s = i.length; s > r; r++) i[r].draw(t, e, n);
                            this._currentPath = t.currentPath;
                        }
                        if (!e.clip) {
                            this._setStyles(t);
                            var a = this._style;
                            a.hasFill() && (t.fill(a.getWindingRule()), t.shadowColor = "rgba(0,0,0,0)"), a.hasStroke() && t.stroke();
                        }
                    }
                },
                _drawSelected: function(t, e, n) {
                    for (var i = this._children, r = 0, s = i.length; s > r; r++) {
                        var a = i[r], o = a._matrix;
                        n[a._id] || a._drawSelected(t, o.isIdentity() ? e : e.chain(o));
                    }
                }
            }, new function() {
                function t(t, e) {
                    var n = t._children;
                    if (e && 0 === n.length) throw new Error("Use a moveTo() command first");
                    return n[n.length - 1];
                }
                var e = {
                    moveTo: function() {
                        var e = t(this), n = e && e.isEmpty() ? e : new V(S.NO_INSERT);
                        n !== e && this.addChild(n), n.moveTo.apply(n, arguments);
                    },
                    moveBy: function() {
                        var e = t(this, !0), n = e && e.getLastSegment(), i = _.read(arguments);
                        this.moveTo(n ? i.add(n._point) : i);
                    },
                    closePath: function(e) {
                        t(this, !0).closePath(e);
                    }
                };
                return o.each([ "lineTo", "cubicCurveTo", "quadraticCurveTo", "curveTo", "arcTo", "lineBy", "cubicCurveBy", "quadraticCurveBy", "curveBy", "arcBy" ], function(n) {
                    e[n] = function() {
                        var e = t(this, !0);
                        e[n].apply(e, arguments);
                    };
                }), e;
            }());
            N.inject(new function() {
                function t(t, e) {
                    var n = t.clone(!1).reduce().transform(null, !0, !0);
                    return e ? n.resolveCrossings().reorient() : n;
                }
                function e(t, e, n, i, r) {
                    var s = new t(S.NO_INSERT);
                    return s.addChildren(e, !0), r && (s = s.reduce()), s.insertAbove(i && n.isSibling(i) && n.getIndex() < i.getIndex() ? i : n), 
                    s.setStyle(n._style), s;
                }
                function n(n, r, a) {
                    function h(t) {
                        for (var e = 0, n = t.length; n > e; e++) {
                            var i = t[e];
                            d.push.apply(d, i._segments), _.push.apply(_, i._getMonoCurves());
                        }
                    }
                    if (!n._children && !n._closed) return i(n, r, a);
                    var l = t(n, !0), c = r && n !== r && t(r, !0);
                    c && /^(subtract|exclude)$/.test(a) ^ c.isClockwise() !== l.isClockwise() && c.reverse();
                    var f = L.expand(l.getIntersections(c, function(t) {
                        return c && t.isOverlap() || t.isCrossing();
                    }));
                    s(f);
                    var d = [], _ = [];
                    h(l._children || [ l ]), c && h(c._children || [ c ]);
                    for (var g = 0, p = f.length; p > g; g++) o(f[g]._segment, l, c, _, a);
                    for (var g = 0, p = d.length; p > g; g++) {
                        var v = d[g];
                        null == v._winding && o(v, l, c, _, a);
                    }
                    return e(j, u(d, a), n, r, !0);
                }
                function i(n, i, r) {
                    function s(t) {
                        return o.contains(t.getPointAt(t.getLength() / 2)) ^ h ? (l.unshift(t), !0) : void 0;
                    }
                    if (!i || !i._children && !i._closed || !/^(subtract|intersect)$/.test(r)) return null;
                    for (var a = t(n, !1), o = t(i, !1), u = a.getIntersections(o, function(t) {
                        return t.isOverlap() || t.isCrossing();
                    }), h = "subtract" === r, l = [], c = u.length - 1; c >= 0; c--) {
                        var f = u[c].split();
                        f && (s(f) && f.getFirstSegment().setHandleIn(0, 0), a.getLastSegment().setHandleOut(0, 0));
                    }
                    return s(a), e(E, l, n, i);
                }
                function r(t, e) {
                    for (var n = t; n; ) {
                        if (n === e) return;
                        n = n._prev;
                    }
                    for (;t._next && t._next !== e; ) t = t._next;
                    if (!t._next) {
                        for (;e._prev; ) e = e._prev;
                        t._next = e, e._prev = t;
                    }
                }
                function s(t) {
                    for (var e, n, i = 4e-7, s = 1 - i, a = !1, o = [], u = t.length - 1; u >= 0; u--) {
                        var h = t[u], l = h._curve, c = h._parameter, f = c;
                        l !== e ? a = !l.hasHandles() : n > 0 && (c /= n);
                        var d;
                        i > c ? d = l._segment1 : c > s ? d = l._segment2 : (d = l.divide(c, !0, !0)._segment1, 
                        a && o.push(d)), h._setSegment(d);
                        var _ = d._intersection, g = h._intersection;
                        if (_) {
                            r(_, g);
                            for (var p = _; p; ) r(p._intersection, _), p = p._next;
                        } else d._intersection = g;
                        e = l, n = f;
                    }
                    for (var u = 0, v = o.length; v > u; u++) o[u].clearHandles();
                }
                function a(t, e, n, i) {
                    var r = 2e-7, s = 4e-7, o = 1 - s, u = t.x, h = t.y, l = 0, c = 0, d = [], g = Math.abs;
                    if (n) {
                        for (var p = -(1 / 0), v = 1 / 0, m = h - r, y = h + r, w = 0, b = e.length; b > w; w++) {
                            var x = e[w].values;
                            if (z.solveCubic(x, 0, u, d, 0, 1) > 0) for (var C = d.length - 1; C >= 0; C--) {
                                var S = z.getPoint(x, d[C]).y;
                                m > S && S > p ? p = S : S > y && v > S && (v = S);
                            }
                        }
                        p = (p + h) / 2, v = (v + h) / 2, p > -(1 / 0) && (l = a(new _(u, p), e, !1, i)), 
                        1 / 0 > v && (c = a(new _(u, v), e, !1, i));
                    } else for (var E, P, A = u - r, k = u + r, I = !1, w = 0, b = e.length; b > w; w++) {
                        var M = e[w], x = M.values, O = M.winding;
                        if (O && (1 === O && h >= x[1] && h <= x[7] || h >= x[7] && h <= x[1]) && 1 === z.solveCubic(x, 1, h, d, 0, 1)) {
                            var T = d[0];
                            if (!(T > o && I && M.next !== e[w + 1] || s > T && P > o && M.previous === E)) {
                                var L = z.getPoint(x, T).x, N = z.getTangent(x, T).y, V = !1;
                                f.isZero(N) && !z.isStraight(x) || s > T && N * z.getTangent(M.previous.values, 1).y < 0 || T > o && N * z.getTangent(M.next.values, 0).y < 0 ? i && L >= A && k >= L && (++l, 
                                ++c, V = !0) : A >= L ? (l += O, V = !0) : L >= k && (c += O, V = !0), M.previous !== e[w - 1] && (I = s > T && V);
                            }
                            E = M, P = T;
                        }
                    }
                    return Math.max(g(l), g(c));
                }
                function o(t, e, n, i, r) {
                    var s = 2e-7, o = [], u = t, h = 0, l = 0;
                    do {
                        var c = t.getCurve(), f = c.getLength();
                        o.push({
                            segment: t,
                            curve: c,
                            length: f
                        }), h += f, t = t.getNext();
                    } while (t && !t._intersection && t !== u);
                    for (var d = 0; 3 > d; d++) for (var f = h * (d + 1) / 4, _ = 0, g = o.length; g > _; _++) {
                        var p = o[_], v = p.length;
                        if (v >= f) {
                            (s > f || s > v - f) && (f = v / 2);
                            var c = p.curve, m = c._path, y = m._parent, w = c.getPointAt(f), b = c.isHorizontal();
                            y instanceof j && (m = y), l += "subtract" === r && n && (m === e && n._getWinding(w, b) || m === n && !e._getWinding(w, b)) ? 0 : a(w, i, b);
                            break;
                        }
                        f -= v;
                    }
                    for (var x = Math.round(l / 3), C = o.length - 1; C >= 0; C--) o[C].segment._winding = x;
                }
                function u(t, e) {
                    function n(t, e) {
                        if (t._visited) return !1;
                        if (!l) return !0;
                        var n = t._winding, i = t._intersection;
                        return i && e && c && i.isOverlap() && (n = c[n] || n), l(n);
                    }
                    function i(t) {
                        return t === a || t === o;
                    }
                    function r(t, e) {
                        if (!t._next) return t;
                        for (;t; ) {
                            var r = t._segment, s = r.getNext(), a = s._intersection;
                            if (i(s) || !r._visited && !s._visited && (!l || (!e || n(r)) && (!(e && a && a.isOverlap()) && n(s) || !e && a && n(a._segment)))) return t;
                            t = t._next;
                        }
                        return null;
                    }
                    function s(t, e) {
                        for (;t; ) {
                            var n = t._segment;
                            if (i(n)) return n;
                            t = t[e ? "_next" : "_prev"];
                        }
                    }
                    for (var a, o, u = [], l = h[e], c = {
                        unite: {
                            1: 2
                        },
                        intersect: {
                            2: 1
                        }
                    }[e], d = 0, _ = t.length; _ > d; d++) {
                        var g = t[d], p = null, v = !1;
                        if (n(g, !0)) {
                            for (a = o = null; !v; ) {
                                var m = g._intersection, y = p && g._handleIn;
                                m = m && (r(m, !0) || r(m, !1)) || m;
                                var w = m && m._segment;
                                if (w && n(w) && (g = w), g._visited) {
                                    if (v = i(g), !v && m) {
                                        var b = s(m, !0) || s(m, !1);
                                        b && (g = b, v = !0);
                                    }
                                    break;
                                }
                                p || (p = new V(S.NO_INSERT), a = g, o = w), p.add(new O(g._point, y, g._handleOut)), 
                                g._visited = !0, g = g.getNext(), v = i(g);
                            }
                            v ? (p.firstSegment.setHandleIn(g._handleIn), p.setClosed(!0)) : p && (console.error("Boolean operation resulted in open path", "segments =", p._segments.length, "length =", p.getLength()), 
                            p = null), p && (p._segments.length > 8 || !f.isZero(p.getArea())) && (u.push(p), 
                            p = null);
                        }
                    }
                    return u;
                }
                var h = {
                    unite: function(t) {
                        return 1 === t || 0 === t;
                    },
                    intersect: function(t) {
                        return 2 === t;
                    },
                    subtract: function(t) {
                        return 1 === t;
                    },
                    exclude: function(t) {
                        return 1 === t;
                    }
                };
                return {
                    _getWinding: function(t, e, n) {
                        return a(t, this._getMonoCurves(), e, n);
                    },
                    unite: function(t) {
                        return n(this, t, "unite");
                    },
                    intersect: function(t) {
                        return n(this, t, "intersect");
                    },
                    subtract: function(t) {
                        return n(this, t, "subtract");
                    },
                    exclude: function(t) {
                        return n(this, t, "exclude");
                    },
                    divide: function(t) {
                        return e(E, [ this.subtract(t), this.intersect(t) ], this, t, !0);
                    },
                    resolveCrossings: function() {
                        var t = this.getCrossings();
                        if (!t.length) return this;
                        s(L.expand(t));
                        for (var n = this._children || [ this ], i = [], r = 0, a = n.length; a > r; r++) i.push.apply(i, n[r]._segments);
                        return e(j, u(i), this, null, !1);
                    }
                };
            }()), V.inject({
                _getMonoCurves: function() {
                    function t(t) {
                        var e = t[1], r = t[7], s = {
                            values: t,
                            winding: e === r ? 0 : e > r ? -1 : 1,
                            previous: n,
                            next: null
                        };
                        n && (n.next = s), i.push(s), n = s;
                    }
                    function e(e) {
                        if (0 !== z.getLength(e)) {
                            var n = e[1], i = e[3], r = e[5], s = e[7];
                            if (z.isStraight(e)) t(e); else {
                                var a = 3 * (i - r) - n + s, o = 2 * (n + r) - 4 * i, u = i - n, h = 4e-7, l = 1 - h, c = [], d = f.solveQuadratic(a, o, u, c, h, l);
                                if (0 === d) t(e); else {
                                    c.sort();
                                    var _ = c[0], g = z.subdivide(e, _);
                                    t(g[0]), d > 1 && (_ = (c[1] - _) / (1 - _), g = z.subdivide(g[1], _), t(g[0])), 
                                    t(g[1]);
                                }
                            }
                        }
                    }
                    var n, i = this._monoCurves;
                    if (!i) {
                        i = this._monoCurves = [];
                        for (var r = this.getCurves(), s = this._segments, a = 0, o = r.length; o > a; a++) e(r[a].getValues());
                        if (!this._closed && s.length > 1) {
                            var u = s[s.length - 1]._point, h = s[0]._point, l = u._x, c = u._y, d = h._x, _ = h._y;
                            e([ l, c, l, c, d, _, d, _ ]);
                        }
                        if (i.length > 0) {
                            var g = i[0], p = i[i.length - 1];
                            g.previous = p, p.next = g;
                        }
                    }
                    return i;
                },
                getInteriorPoint: function() {
                    var t = this.getBounds(), e = t.getCenter(!0);
                    if (!this.contains(e)) {
                        for (var n = this._getMonoCurves(), i = [], r = e.y, s = [], a = 0, o = n.length; o > a; a++) {
                            var u = n[a].values;
                            if ((1 === n[a].winding && r >= u[1] && r <= u[7] || r >= u[7] && r <= u[1]) && z.solveCubic(u, 1, r, i, 0, 1) > 0) for (var h = i.length - 1; h >= 0; h--) s.push(z.getPoint(u, i[h]).x);
                            if (s.length > 1) break;
                        }
                        e.x = (s[0] + s[1]) / 2;
                    }
                    return e;
                },
                reorient: function() {
                    return this.setClockwise(!0), this;
                }
            }), j.inject({
                _getMonoCurves: function() {
                    for (var t = this._children, e = [], n = 0, i = t.length; i > n; n++) e.push.apply(e, t[n]._getMonoCurves());
                    return e;
                },
                reorient: function() {
                    var t = this.removeChildren().sort(function(t, e) {
                        return e.getBounds().getArea() - t.getBounds().getArea();
                    });
                    if (t.length > 0) {
                        this.addChildren(t);
                        for (var e = t[0].isClockwise(), n = 1, i = t.length; i > n; n++) {
                            for (var r = t[n].getInteriorPoint(), s = 0, a = n - 1; a >= 0; a--) t[a].contains(r) && s++;
                            t[n].setClockwise(s % 2 === 0 && e);
                        }
                    }
                    return this;
                }
            });
            var B = o.extend({
                _class: "PathIterator",
                initialize: function(t, e, n, i) {
                    function r(t, e) {
                        var n = z.getValues(t, e, i);
                        o.push(n), s(n, t._index, 0, 1);
                    }
                    function s(t, e, i, r) {
                        if (r - i > l && !z.isFlatEnough(t, n || .25)) {
                            var a = z.subdivide(t, .5), o = (i + r) / 2;
                            s(a[0], e, i, o), s(a[1], e, o, r);
                        } else {
                            var c = t[6] - t[0], f = t[7] - t[1], d = Math.sqrt(c * c + f * f);
                            d > 1e-6 && (h += d, u.push({
                                offset: h,
                                value: r,
                                index: e
                            }));
                        }
                    }
                    for (var a, o = [], u = [], h = 0, l = 1 / (e || 32), c = t._segments, f = c[0], d = 1, _ = c.length; _ > d; d++) a = c[d], 
                    r(f, a), f = a;
                    t._closed && r(a, c[0]), this.curves = o, this.parts = u, this.length = h, this.index = 0;
                },
                getParameterAt: function(t) {
                    for (var e, n = this.index; e = n, !(0 == n || this.parts[--n].offset < t); ) ;
                    for (var i = this.parts.length; i > e; e++) {
                        var r = this.parts[e];
                        if (r.offset >= t) {
                            this.index = e;
                            var s = this.parts[e - 1], a = s && s.index == r.index ? s.value : 0, o = s ? s.offset : 0;
                            return {
                                value: a + (r.value - a) * (t - o) / (r.offset - o),
                                index: r.index
                            };
                        }
                    }
                    var r = this.parts[this.parts.length - 1];
                    return {
                        value: 1,
                        index: r.index
                    };
                },
                drawPart: function(t, e, n) {
                    e = this.getParameterAt(e), n = this.getParameterAt(n);
                    for (var i = e.index; i <= n.index; i++) {
                        var r = z.getPart(this.curves[i], i == e.index ? e.value : 0, i == n.index ? n.value : 1);
                        i == e.index && t.moveTo(r[0], r[1]), t.bezierCurveTo.apply(t, r.slice(2));
                    }
                }
            }, o.each(z.evaluateMethods, function(t) {
                this[t + "At"] = function(e, n) {
                    var i = this.getParameterAt(e);
                    return z[t](this.curves[i.index], i.value, n);
                };
            }, {})), D = o.extend({
                initialize: function(t, e) {
                    for (var n, i = this.points = [], r = t._segments, s = 0, a = r.length; a > s; s++) {
                        var o = r[s].point.clone();
                        n && n.equals(o) || (i.push(o), n = o);
                    }
                    t._closed && (this.closed = !0, i.unshift(i[i.length - 1]), i.push(i[1])), this.error = e;
                },
                fit: function() {
                    var t = this.points, e = t.length, n = this.segments = e > 0 ? [ new O(t[0]) ] : [];
                    return e > 1 && this.fitCubic(0, e - 1, t[1].subtract(t[0]).normalize(), t[e - 2].subtract(t[e - 1]).normalize()), 
                    this.closed && (n.shift(), n.pop()), n;
                },
                fitCubic: function(t, e, n, i) {
                    if (e - t == 1) {
                        var r = this.points[t], s = this.points[e], a = r.getDistance(s) / 3;
                        return void this.addCurve([ r, r.add(n.normalize(a)), s.add(i.normalize(a)), s ]);
                    }
                    for (var o, u = this.chordLengthParameterize(t, e), h = Math.max(this.error, this.error * this.error), l = !0, c = 0; 4 >= c; c++) {
                        var f = this.generateBezier(t, e, u, n, i), d = this.findMaxError(t, e, f, u);
                        if (d.error < this.error && l) return void this.addCurve(f);
                        if (o = d.index, d.error >= h) break;
                        l = this.reparameterize(t, e, u, f), h = d.error;
                    }
                    var _ = this.points[o - 1].subtract(this.points[o]), g = this.points[o].subtract(this.points[o + 1]), p = _.add(g).divide(2).normalize();
                    this.fitCubic(t, o, n, p), this.fitCubic(o, e, p.negate(), i);
                },
                addCurve: function(t) {
                    var e = this.segments[this.segments.length - 1];
                    e.setHandleOut(t[1].subtract(t[0])), this.segments.push(new O(t[3], t[2].subtract(t[3])));
                },
                generateBezier: function(t, e, n, i, r) {
                    for (var s = 1e-12, a = this.points[t], o = this.points[e], u = [ [ 0, 0 ], [ 0, 0 ] ], h = [ 0, 0 ], l = 0, c = e - t + 1; c > l; l++) {
                        var f = n[l], d = 1 - f, _ = 3 * f * d, g = d * d * d, p = _ * d, v = _ * f, m = f * f * f, y = i.normalize(p), w = r.normalize(v), b = this.points[t + l].subtract(a.multiply(g + p)).subtract(o.multiply(v + m));
                        u[0][0] += y.dot(y), u[0][1] += y.dot(w), u[1][0] = u[0][1], u[1][1] += w.dot(w), 
                        h[0] += y.dot(b), h[1] += w.dot(b);
                    }
                    var x, C, S = u[0][0] * u[1][1] - u[1][0] * u[0][1];
                    if (Math.abs(S) > s) {
                        var E = u[0][0] * h[1] - u[1][0] * h[0], P = h[0] * u[1][1] - h[1] * u[0][1];
                        x = P / S, C = E / S;
                    } else {
                        var A = u[0][0] + u[0][1], k = u[1][0] + u[1][1];
                        x = C = Math.abs(A) > s ? h[0] / A : Math.abs(k) > s ? h[1] / k : 0;
                    }
                    var I, M, O = o.getDistance(a), T = s * O;
                    if (T > x || T > C) x = C = O / 3; else {
                        var z = o.subtract(a);
                        I = i.normalize(x), M = r.normalize(C), I.dot(z) - M.dot(z) > O * O && (x = C = O / 3, 
                        I = M = null);
                    }
                    return [ a, a.add(I || i.normalize(x)), o.add(M || r.normalize(C)), o ];
                },
                reparameterize: function(t, e, n, i) {
                    for (var r = t; e >= r; r++) n[r - t] = this.findRoot(i, this.points[r], n[r - t]);
                    for (var r = 1, s = n.length; s > r; r++) if (n[r] <= n[r - 1]) return !1;
                    return !0;
                },
                findRoot: function(t, e, n) {
                    for (var i = [], r = [], s = 0; 2 >= s; s++) i[s] = t[s + 1].subtract(t[s]).multiply(3);
                    for (var s = 0; 1 >= s; s++) r[s] = i[s + 1].subtract(i[s]).multiply(2);
                    var a = this.evaluate(3, t, n), o = this.evaluate(2, i, n), u = this.evaluate(1, r, n), h = a.subtract(e), l = o.dot(o) + h.dot(u);
                    return Math.abs(l) < 1e-6 ? n : n - h.dot(o) / l;
                },
                evaluate: function(t, e, n) {
                    for (var i = e.slice(), r = 1; t >= r; r++) for (var s = 0; t - r >= s; s++) i[s] = i[s].multiply(1 - n).add(i[s + 1].multiply(n));
                    return i[0];
                },
                chordLengthParameterize: function(t, e) {
                    for (var n = [ 0 ], i = t + 1; e >= i; i++) n[i - t] = n[i - t - 1] + this.points[i].getDistance(this.points[i - 1]);
                    for (var i = 1, r = e - t; r >= i; i++) n[i] /= n[r];
                    return n;
                },
                findMaxError: function(t, e, n, i) {
                    for (var r = Math.floor((e - t + 1) / 2), s = 0, a = t + 1; e > a; a++) {
                        var o = this.evaluate(3, n, i[a - t]), u = o.subtract(this.points[a]), h = u.x * u.x + u.y * u.y;
                        h >= s && (s = h, r = a);
                    }
                    return {
                        error: s,
                        index: r
                    };
                }
            }), R = S.extend({
                _class: "TextItem",
                _boundsSelected: !0,
                _applyMatrix: !1,
                _canApplyMatrix: !1,
                _serializeFields: {
                    content: null
                },
                _boundsGetter: "getBounds",
                initialize: function(t) {
                    this._content = "", this._lines = [];
                    var e = t && o.isPlainObject(t) && t.x === a && t.y === a;
                    this._initialize(e && t, !e && _.read(arguments));
                },
                _equals: function(t) {
                    return this._content === t._content;
                },
                _clone: function Pt(t, e, n) {
                    return t.setContent(this._content), Pt.base.call(this, t, e, n);
                },
                getContent: function() {
                    return this._content;
                },
                setContent: function(t) {
                    this._content = "" + t, this._lines = this._content.split(/\r\n|\n|\r/gm), this._changed(265);
                },
                isEmpty: function() {
                    return !this._content;
                },
                getCharacterStyle: "#getStyle",
                setCharacterStyle: "#setStyle",
                getParagraphStyle: "#getStyle",
                setParagraphStyle: "#setStyle"
            }), q = R.extend({
                _class: "PointText",
                initialize: function() {
                    R.apply(this, arguments);
                },
                clone: function(t) {
                    return this._clone(new q(S.NO_INSERT), t);
                },
                getPoint: function() {
                    var t = this._matrix.getTranslation();
                    return new g(t.x, t.y, this, "setPoint");
                },
                setPoint: function() {
                    var t = _.read(arguments);
                    this.translate(t.subtract(this._matrix.getTranslation()));
                },
                _draw: function(t) {
                    if (this._content) {
                        this._setStyles(t);
                        var e = this._style, n = this._lines, i = e.getLeading(), r = t.shadowColor;
                        t.font = e.getFontStyle(), t.textAlign = e.getJustification();
                        for (var s = 0, a = n.length; a > s; s++) {
                            t.shadowColor = r;
                            var o = n[s];
                            e.hasFill() && (t.fillText(o, 0, 0), t.shadowColor = "rgba(0,0,0,0)"), e.hasStroke() && t.strokeText(o, 0, 0), 
                            t.translate(0, i);
                        }
                    }
                },
                _getBounds: function(t, e) {
                    var n = this._style, i = this._lines, r = i.length, s = n.getJustification(), a = n.getLeading(), o = this.getView().getTextWidth(n.getFontStyle(), i), u = 0;
                    "left" !== s && (u -= o / ("center" === s ? 2 : 1));
                    var h = new m(u, r ? -.75 * a : 0, o, r * a);
                    return e ? e._transformBounds(h, h) : h;
                }
            }), F = o.extend(new function() {
                function t(t) {
                    var n, i = t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);
                    if (i) {
                        n = [ 0, 0, 0 ];
                        for (var s = 0; 3 > s; s++) {
                            var a = i[s + 1];
                            n[s] = parseInt(1 == a.length ? a + a : a, 16) / 255;
                        }
                    } else if (i = t.match(/^rgba?\((.*)\)$/)) {
                        n = i[1].split(",");
                        for (var s = 0, o = n.length; o > s; s++) {
                            var a = +n[s];
                            n[s] = 3 > s ? a / 255 : a;
                        }
                    } else {
                        var u = r[t];
                        if (!u) {
                            e || (e = it.getContext(1, 1), e.globalCompositeOperation = "copy"), e.fillStyle = "rgba(0,0,0,0)", 
                            e.fillStyle = t, e.fillRect(0, 0, 1, 1);
                            var h = e.getImageData(0, 0, 1, 1).data;
                            u = r[t] = [ h[0] / 255, h[1] / 255, h[2] / 255 ];
                        }
                        n = u.slice();
                    }
                    return n;
                }
                var e, n = {
                    gray: [ "gray" ],
                    rgb: [ "red", "green", "blue" ],
                    hsb: [ "hue", "saturation", "brightness" ],
                    hsl: [ "hue", "saturation", "lightness" ],
                    gradient: [ "gradient", "origin", "destination", "highlight" ]
                }, i = {}, r = {}, s = [ [ 0, 3, 1 ], [ 2, 0, 1 ], [ 1, 0, 3 ], [ 1, 2, 0 ], [ 3, 1, 0 ], [ 0, 1, 2 ] ], a = {
                    "rgb-hsb": function(t, e, n) {
                        var i = Math.max(t, e, n), r = Math.min(t, e, n), s = i - r, a = 0 === s ? 0 : 60 * (i == t ? (e - n) / s + (n > e ? 6 : 0) : i == e ? (n - t) / s + 2 : (t - e) / s + 4);
                        return [ a, 0 === i ? 0 : s / i, i ];
                    },
                    "hsb-rgb": function(t, e, n) {
                        t = (t / 60 % 6 + 6) % 6;
                        var i = Math.floor(t), r = t - i, i = s[i], a = [ n, n * (1 - e), n * (1 - e * r), n * (1 - e * (1 - r)) ];
                        return [ a[i[0]], a[i[1]], a[i[2]] ];
                    },
                    "rgb-hsl": function(t, e, n) {
                        var i = Math.max(t, e, n), r = Math.min(t, e, n), s = i - r, a = 0 === s, o = a ? 0 : 60 * (i == t ? (e - n) / s + (n > e ? 6 : 0) : i == e ? (n - t) / s + 2 : (t - e) / s + 4), u = (i + r) / 2, h = a ? 0 : .5 > u ? s / (i + r) : s / (2 - i - r);
                        return [ o, h, u ];
                    },
                    "hsl-rgb": function(t, e, n) {
                        if (t = (t / 360 % 1 + 1) % 1, 0 === e) return [ n, n, n ];
                        for (var i = [ t + 1 / 3, t, t - 1 / 3 ], r = .5 > n ? n * (1 + e) : n + e - n * e, s = 2 * n - r, a = [], o = 0; 3 > o; o++) {
                            var u = i[o];
                            0 > u && (u += 1), u > 1 && (u -= 1), a[o] = 1 > 6 * u ? s + 6 * (r - s) * u : 1 > 2 * u ? r : 2 > 3 * u ? s + (r - s) * (2 / 3 - u) * 6 : s;
                        }
                        return a;
                    },
                    "rgb-gray": function(t, e, n) {
                        return [ .2989 * t + .587 * e + .114 * n ];
                    },
                    "gray-rgb": function(t) {
                        return [ t, t, t ];
                    },
                    "gray-hsb": function(t) {
                        return [ 0, 0, t ];
                    },
                    "gray-hsl": function(t) {
                        return [ 0, 0, t ];
                    },
                    "gradient-rgb": function() {
                        return [];
                    },
                    "rgb-gradient": function() {
                        return [];
                    }
                };
                return o.each(n, function(t, e) {
                    i[e] = [], o.each(t, function(t, r) {
                        var s = o.capitalize(t), a = /^(hue|saturation)$/.test(t), u = i[e][r] = "gradient" === t ? function(t) {
                            var e = this._components[0];
                            return t = $.read(Array.isArray(t) ? t : arguments, 0, {
                                readNull: !0
                            }), e !== t && (e && e._removeOwner(this), t && t._addOwner(this)), t;
                        } : "gradient" === e ? function() {
                            return _.read(arguments, 0, {
                                readNull: "highlight" === t,
                                clone: !0
                            });
                        } : function(t) {
                            return null == t || isNaN(t) ? 0 : t;
                        };
                        this["get" + s] = function() {
                            return this._type === e || a && /^hs[bl]$/.test(this._type) ? this._components[r] : this._convert(e)[r];
                        }, this["set" + s] = function(t) {
                            this._type === e || a && /^hs[bl]$/.test(this._type) || (this._components = this._convert(e), 
                            this._properties = n[e], this._type = e), this._components[r] = u.call(this, t), 
                            this._changed();
                        };
                    }, this);
                }, {
                    _class: "Color",
                    _readIndex: !0,
                    initialize: function u(e) {
                        var r, s, a, o, h = Array.prototype.slice, l = arguments, c = 0;
                        Array.isArray(e) && (l = e, e = l[0]);
                        var f = null != e && typeof e;
                        if ("string" === f && e in n && (r = e, e = l[1], Array.isArray(e) ? (s = e, a = l[2]) : (this.__read && (c = 1), 
                        l = h.call(l, 1), f = typeof e)), !s) {
                            if (o = "number" === f ? l : "object" === f && null != e.length ? e : null) {
                                r || (r = o.length >= 3 ? "rgb" : "gray");
                                var _ = n[r].length;
                                a = o[_], this.__read && (c += o === arguments ? _ + (null != a ? 1 : 0) : 1), o.length > _ && (o = h.call(o, 0, _));
                            } else if ("string" === f) r = "rgb", s = t(e), 4 === s.length && (a = s[3], s.length--); else if ("object" === f) if (e.constructor === u) {
                                if (r = e._type, s = e._components.slice(), a = e._alpha, "gradient" === r) for (var g = 1, p = s.length; p > g; g++) {
                                    var v = s[g];
                                    v && (s[g] = v.clone());
                                }
                            } else if (e.constructor === $) r = "gradient", o = l; else {
                                r = "hue" in e ? "lightness" in e ? "hsl" : "hsb" : "gradient" in e || "stops" in e || "radial" in e ? "gradient" : "gray" in e ? "gray" : "rgb";
                                var m = n[r], y = i[r];
                                this._components = s = [];
                                for (var g = 0, p = m.length; p > g; g++) {
                                    var w = e[m[g]];
                                    null == w && 0 === g && "gradient" === r && "stops" in e && (w = {
                                        stops: e.stops,
                                        radial: e.radial
                                    }), w = y[g].call(this, w), null != w && (s[g] = w);
                                }
                                a = e.alpha;
                            }
                            this.__read && r && (c = 1);
                        }
                        if (this._type = r || "rgb", this._id = d.get(u), !s) {
                            this._components = s = [];
                            for (var y = i[this._type], g = 0, p = y.length; p > g; g++) {
                                var w = y[g].call(this, o && o[g]);
                                null != w && (s[g] = w);
                            }
                        }
                        this._components = s, this._properties = n[this._type], this._alpha = a, this.__read && (this.__read = c);
                    },
                    _serialize: function(t, e) {
                        var n = this.getComponents();
                        return o.serialize(/^(gray|rgb)$/.test(this._type) ? n : [ this._type ].concat(n), t, !0, e);
                    },
                    _changed: function() {
                        this._canvasStyle = null, this._owner && this._owner._changed(65);
                    },
                    _convert: function(t) {
                        var e;
                        return this._type === t ? this._components.slice() : (e = a[this._type + "-" + t]) ? e.apply(this, this._components) : a["rgb-" + t].apply(this, a[this._type + "-rgb"].apply(this, this._components));
                    },
                    convert: function(t) {
                        return new F(t, this._convert(t), this._alpha);
                    },
                    getType: function() {
                        return this._type;
                    },
                    setType: function(t) {
                        this._components = this._convert(t), this._properties = n[t], this._type = t;
                    },
                    getComponents: function() {
                        var t = this._components.slice();
                        return null != this._alpha && t.push(this._alpha), t;
                    },
                    getAlpha: function() {
                        return null != this._alpha ? this._alpha : 1;
                    },
                    setAlpha: function(t) {
                        this._alpha = null == t ? null : Math.min(Math.max(t, 0), 1), this._changed();
                    },
                    hasAlpha: function() {
                        return null != this._alpha;
                    },
                    equals: function(t) {
                        var e = o.isPlainValue(t, !0) ? F.read(arguments) : t;
                        return e === this || e && this._class === e._class && this._type === e._type && this._alpha === e._alpha && o.equals(this._components, e._components) || !1;
                    },
                    toString: function() {
                        for (var t = this._properties, e = [], n = "gradient" === this._type, i = c.instance, r = 0, s = t.length; s > r; r++) {
                            var a = this._components[r];
                            null != a && e.push(t[r] + ": " + (n ? a : i.number(a)));
                        }
                        return null != this._alpha && e.push("alpha: " + i.number(this._alpha)), "{ " + e.join(", ") + " }";
                    },
                    toCSS: function(t) {
                        function e(t) {
                            return Math.round(255 * (0 > t ? 0 : t > 1 ? 1 : t));
                        }
                        var n = this._convert("rgb"), i = t || null == this._alpha ? 1 : this._alpha;
                        return n = [ e(n[0]), e(n[1]), e(n[2]) ], 1 > i && n.push(0 > i ? 0 : i), t ? "#" + ((1 << 24) + (n[0] << 16) + (n[1] << 8) + n[2]).toString(16).slice(1) : (4 == n.length ? "rgba(" : "rgb(") + n.join(",") + ")";
                    },
                    toCanvasStyle: function(t) {
                        if (this._canvasStyle) return this._canvasStyle;
                        if ("gradient" !== this._type) return this._canvasStyle = this.toCSS();
                        var e, n = this._components, i = n[0], r = i._stops, s = n[1], a = n[2];
                        if (i._radial) {
                            var o = a.getDistance(s), u = n[3];
                            if (u) {
                                var h = u.subtract(s);
                                h.getLength() > o && (u = s.add(h.normalize(o - .1)));
                            }
                            var l = u || s;
                            e = t.createRadialGradient(l.x, l.y, 0, s.x, s.y, o);
                        } else e = t.createLinearGradient(s.x, s.y, a.x, a.y);
                        for (var c = 0, f = r.length; f > c; c++) {
                            var d = r[c];
                            e.addColorStop(d._rampPoint, d._color.toCanvasStyle());
                        }
                        return this._canvasStyle = e;
                    },
                    transform: function(t) {
                        if ("gradient" === this._type) {
                            for (var e = this._components, n = 1, i = e.length; i > n; n++) {
                                var r = e[n];
                                t._transformPoint(r, r, !0);
                            }
                            this._changed();
                        }
                    },
                    statics: {
                        _types: n,
                        random: function() {
                            var t = Math.random;
                            return new F(t(), t(), t());
                        }
                    }
                });
            }(), new function() {
                var t = {
                    add: function(t, e) {
                        return t + e;
                    },
                    subtract: function(t, e) {
                        return t - e;
                    },
                    multiply: function(t, e) {
                        return t * e;
                    },
                    divide: function(t, e) {
                        return t / e;
                    }
                };
                return o.each(t, function(t, e) {
                    this[e] = function(e) {
                        e = F.read(arguments);
                        for (var n = this._type, i = this._components, r = e._convert(n), s = 0, a = i.length; a > s; s++) r[s] = t(i[s], r[s]);
                        return new F(n, r, null != this._alpha ? t(this._alpha, e.getAlpha()) : null);
                    };
                }, {});
            }()), $ = o.extend({
                _class: "Gradient",
                initialize: function(t, e) {
                    this._id = d.get(), t && this._set(t) && (t = e = null), this._stops || this.setStops(t || [ "white", "black" ]), 
                    null == this._radial && this.setRadial("string" == typeof e && "radial" === e || e || !1);
                },
                _serialize: function(t, e) {
                    return e.add(this, function() {
                        return o.serialize([ this._stops, this._radial ], t, !0, e);
                    });
                },
                _changed: function() {
                    for (var t = 0, e = this._owners && this._owners.length; e > t; t++) this._owners[t]._changed();
                },
                _addOwner: function(t) {
                    this._owners || (this._owners = []), this._owners.push(t);
                },
                _removeOwner: function(t) {
                    var e = this._owners ? this._owners.indexOf(t) : -1;
                    -1 != e && (this._owners.splice(e, 1), 0 === this._owners.length && (this._owners = a));
                },
                clone: function() {
                    for (var t = [], e = 0, n = this._stops.length; n > e; e++) t[e] = this._stops[e].clone();
                    return new $(t, this._radial);
                },
                getStops: function() {
                    return this._stops;
                },
                setStops: function(t) {
                    if (this.stops) for (var e = 0, n = this._stops.length; n > e; e++) this._stops[e]._owner = a;
                    if (t.length < 2) throw new Error("Gradient stop list needs to contain at least two stops.");
                    this._stops = W.readAll(t, 0, {
                        clone: !0
                    });
                    for (var e = 0, n = this._stops.length; n > e; e++) {
                        var i = this._stops[e];
                        i._owner = this, i._defaultRamp && i.setRampPoint(e / (n - 1));
                    }
                    this._changed();
                },
                getRadial: function() {
                    return this._radial;
                },
                setRadial: function(t) {
                    this._radial = t, this._changed();
                },
                equals: function(t) {
                    if (t === this) return !0;
                    if (t && this._class === t._class && this._stops.length === t._stops.length) {
                        for (var e = 0, n = this._stops.length; n > e; e++) if (!this._stops[e].equals(t._stops[e])) return !1;
                        return !0;
                    }
                    return !1;
                }
            }), W = o.extend({
                _class: "GradientStop",
                initialize: function(t, e) {
                    if (t) {
                        var n, i;
                        e === a && Array.isArray(t) ? (n = t[0], i = t[1]) : t.color ? (n = t.color, i = t.rampPoint) : (n = t, 
                        i = e), this.setColor(n), this.setRampPoint(i);
                    }
                },
                clone: function() {
                    return new W(this._color.clone(), this._rampPoint);
                },
                _serialize: function(t, e) {
                    return o.serialize([ this._color, this._rampPoint ], t, !0, e);
                },
                _changed: function() {
                    this._owner && this._owner._changed(65);
                },
                getRampPoint: function() {
                    return this._rampPoint;
                },
                setRampPoint: function(t) {
                    this._defaultRamp = null == t, this._rampPoint = t || 0, this._changed();
                },
                getColor: function() {
                    return this._color;
                },
                setColor: function(t) {
                    this._color = F.read(arguments), this._color === t && (this._color = t.clone()), 
                    this._color._owner = this, this._changed();
                },
                equals: function(t) {
                    return t === this || t && this._class === t._class && this._color.equals(t._color) && this._rampPoint == t._rampPoint || !1;
                }
            }), H = o.extend(new function() {
                var t = {
                    fillColor: a,
                    strokeColor: a,
                    strokeWidth: 1,
                    strokeCap: "butt",
                    strokeJoin: "miter",
                    strokeScaling: !0,
                    miterLimit: 10,
                    dashOffset: 0,
                    dashArray: [],
                    windingRule: "nonzero",
                    shadowColor: a,
                    shadowBlur: 0,
                    shadowOffset: new _(),
                    selectedColor: a,
                    fontFamily: "sans-serif",
                    fontWeight: "normal",
                    fontSize: 12,
                    font: "sans-serif",
                    leading: null,
                    justification: "left"
                }, e = {
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
                }, n = {
                    beans: !0
                }, i = {
                    _defaults: t,
                    _textDefaults: new o(t, {
                        fillColor: new F()
                    }),
                    beans: !0
                };
                return o.each(t, function(t, r) {
                    var s = /Color$/.test(r), u = "shadowOffset" === r, h = o.capitalize(r), l = e[r], c = "set" + h, f = "get" + h;
                    i[c] = function(t) {
                        var e = this._owner, n = e && e._children;
                        if (n && n.length > 0 && !(e instanceof j)) for (var i = 0, o = n.length; o > i; i++) n[i]._style[c](t); else {
                            var u = this._values[r];
                            u !== t && (s && (u && (u._owner = a), t && t.constructor === F && (t._owner && (t = t.clone()), 
                            t._owner = e)), this._values[r] = t, e && e._changed(l || 65));
                        }
                    }, i[f] = function(t) {
                        var e, n = this._owner, i = n && n._children;
                        if (!i || 0 === i.length || t || n instanceof j) {
                            var e = this._values[r];
                            if (e === a) e = this._defaults[r], e && e.clone && (e = e.clone()); else {
                                var h = s ? F : u ? _ : null;
                                !h || e && e.constructor === h || (this._values[r] = e = h.read([ e ], 0, {
                                    readNull: !0,
                                    clone: !0
                                }), e && s && (e._owner = n));
                            }
                            return e;
                        }
                        for (var l = 0, c = i.length; c > l; l++) {
                            var d = i[l]._style[f]();
                            if (0 === l) e = d; else if (!o.equals(e, d)) return a;
                        }
                        return e;
                    }, n[f] = function(t) {
                        return this._style[f](t);
                    }, n[c] = function(t) {
                        this._style[c](t);
                    };
                }), S.inject(n), i;
            }(), {
                _class: "Style",
                initialize: function(t, e, n) {
                    this._values = {}, this._owner = e, this._project = e && e._project || n || s.project, 
                    e instanceof R && (this._defaults = this._textDefaults), t && this.set(t);
                },
                set: function(t) {
                    var e = t instanceof H, n = e ? t._values : t;
                    if (n) for (var i in n) if (i in this._defaults) {
                        var r = n[i];
                        this[i] = r && e && r.clone ? r.clone() : r;
                    }
                },
                equals: function(t) {
                    return t === this || t && this._class === t._class && o.equals(this._values, t._values) || !1;
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
                    var t = this.getFontSize();
                    return this.getFontWeight() + " " + t + (/[a-z]/i.test(t + "") ? " " : "px ") + this.getFontFamily();
                },
                getFont: "#getFontFamily",
                setFont: "#setFontFamily",
                getLeading: function At() {
                    var t = At.base.call(this), e = this.getFontSize();
                    return /pt|em|%|px/.test(e) && (e = this.getView().getPixelSize(e)), null != t ? t : 1.2 * e;
                }
            }), U = new function() {
                function t(t, e, n, i) {
                    for (var r = [ "", "webkit", "moz", "Moz", "ms", "o" ], s = e[0].toUpperCase() + e.substring(1), a = 0; 6 > a; a++) {
                        var o = r[a], u = o ? o + s : e;
                        if (u in t) {
                            if (!n) return t[u];
                            t[u] = i;
                            break;
                        }
                    }
                }
                return {
                    getStyles: function(t) {
                        var e = t && 9 !== t.nodeType ? t.ownerDocument : t, n = e && e.defaultView;
                        return n && n.getComputedStyle(t, "");
                    },
                    getBounds: function(t, e) {
                        var n, i = t.ownerDocument, r = i.body, s = i.documentElement;
                        try {
                            n = t.getBoundingClientRect();
                        } catch (a) {
                            n = {
                                left: 0,
                                top: 0,
                                width: 0,
                                height: 0
                            };
                        }
                        var o = n.left - (s.clientLeft || r.clientLeft || 0), u = n.top - (s.clientTop || r.clientTop || 0);
                        if (!e) {
                            var h = i.defaultView;
                            o += h.pageXOffset || s.scrollLeft || r.scrollLeft, u += h.pageYOffset || s.scrollTop || r.scrollTop;
                        }
                        return new m(o, u, n.width, n.height);
                    },
                    getViewportBounds: function(t) {
                        var e = t.ownerDocument, n = e.defaultView, i = e.documentElement;
                        return new m(0, 0, n.innerWidth || i.clientWidth, n.innerHeight || i.clientHeight);
                    },
                    getOffset: function(t, e) {
                        return U.getBounds(t, e).getPoint();
                    },
                    getSize: function(t) {
                        return U.getBounds(t, !0).getSize();
                    },
                    isInvisible: function(t) {
                        return U.getSize(t).equals(new p(0, 0));
                    },
                    isInView: function(t) {
                        return !U.isInvisible(t) && U.getViewportBounds(t).intersects(U.getBounds(t, !0));
                    },
                    getPrefixed: function(e, n) {
                        return t(e, n);
                    },
                    setPrefixed: function(e, n, i) {
                        if ("object" == typeof n) for (var r in n) t(e, r, !0, n[r]); else t(e, n, !0, i);
                    }
                };
            }(), Z = {
                add: function(t, e) {
                    for (var n in e) for (var i = e[n], r = n.split(/[\s,]+/g), s = 0, a = r.length; a > s; s++) t.addEventListener(r[s], i, !1);
                },
                remove: function(t, e) {
                    for (var n in e) for (var i = e[n], r = n.split(/[\s,]+/g), s = 0, a = r.length; a > s; s++) t.removeEventListener(r[s], i, !1);
                },
                getPoint: function(t) {
                    var e = t.targetTouches ? t.targetTouches.length ? t.targetTouches[0] : t.changedTouches[0] : t;
                    return new _(e.pageX || e.clientX + document.documentElement.scrollLeft, e.pageY || e.clientY + document.documentElement.scrollTop);
                },
                getTarget: function(t) {
                    return t.target || t.srcElement;
                },
                getRelatedTarget: function(t) {
                    return t.relatedTarget || t.toElement;
                },
                getOffset: function(t, e) {
                    return Z.getPoint(t).subtract(U.getOffset(e || Z.getTarget(t)));
                },
                stop: function(t) {
                    t.stopPropagation(), t.preventDefault();
                }
            };
            Z.requestAnimationFrame = new function() {
                function t() {
                    for (var e = r.length - 1; e >= 0; e--) {
                        var a = r[e], o = a[0], u = a[1];
                        (!u || ("true" == h.getAttribute(u, "keepalive") || s) && U.isInView(u)) && (r.splice(e, 1), 
                        o());
                    }
                    n && (r.length ? n(t) : i = !1);
                }
                var e, n = U.getPrefixed(window, "requestAnimationFrame"), i = !1, r = [], s = !0;
                return Z.add(window, {
                    focus: function() {
                        s = !0;
                    },
                    blur: function() {
                        s = !1;
                    }
                }), function(s, a) {
                    r.push([ s, a ]), n ? i || (n(t), i = !0) : e || (e = setInterval(t, 1e3 / 60));
                };
            }();
            var G = o.extend(u, {
                _class: "View",
                initialize: function kt(t, e) {
                    function n(t) {
                        return e[t] || parseInt(e.getAttribute(t), 10);
                    }
                    function i() {
                        var t = U.getSize(e);
                        return t.isNaN() || t.isZero() ? new p(n("width"), n("height")) : t;
                    }
                    this._project = t, this._scope = t._scope, this._element = e;
                    var r;
                    this._pixelRatio || (this._pixelRatio = window.devicePixelRatio || 1), this._id = e.getAttribute("id"), 
                    null == this._id && e.setAttribute("id", this._id = "view-" + kt._id++), Z.add(e, this._viewEvents);
                    var s = "none";
                    if (U.setPrefixed(e.style, {
                        userSelect: s,
                        touchAction: s,
                        touchCallout: s,
                        contentZooming: s,
                        userDrag: s,
                        tapHighlightColor: "rgba(0,0,0,0)"
                    }), h.hasAttribute(e, "resize")) {
                        var a = this;
                        Z.add(window, this._windowEvents = {
                            resize: function() {
                                a.setViewSize(i());
                            }
                        });
                    }
                    if (this._setViewSize(r = i()), h.hasAttribute(e, "stats") && "undefined" != typeof Stats) {
                        this._stats = new Stats();
                        var o = this._stats.domElement, u = o.style, l = U.getOffset(e);
                        u.position = "absolute", u.left = l.x + "px", u.top = l.y + "px", document.body.appendChild(o);
                    }
                    kt._views.push(this), kt._viewsById[this._id] = this, this._viewSize = r, (this._matrix = new w())._owner = this, 
                    this._zoom = 1, kt._focused || (kt._focused = this), this._frameItems = {}, this._frameItemCount = 0;
                },
                remove: function() {
                    return this._project ? (G._focused === this && (G._focused = null), G._views.splice(G._views.indexOf(this), 1), 
                    delete G._viewsById[this._id], this._project._view === this && (this._project._view = null), 
                    Z.remove(this._element, this._viewEvents), Z.remove(window, this._windowEvents), 
                    this._element = this._project = null, this.off("frame"), this._animate = !1, this._frameItems = {}, 
                    !0) : !1;
                },
                _events: o.each([ "onResize", "onMouseDown", "onMouseUp", "onMouseMove" ], function(t) {
                    this[t] = {
                        install: function(t) {
                            this._installEvent(t);
                        },
                        uninstall: function(t) {
                            this._uninstallEvent(t);
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
                }),
                _animate: !1,
                _time: 0,
                _count: 0,
                _requestFrame: function() {
                    var t = this;
                    Z.requestAnimationFrame(function() {
                        t._requested = !1, t._animate && (t._requestFrame(), t._handleFrame());
                    }, this._element), this._requested = !0;
                },
                _handleFrame: function() {
                    s = this._scope;
                    var t = Date.now() / 1e3, e = this._before ? t - this._before : 0;
                    this._before = t, this._handlingFrame = !0, this.emit("frame", new o({
                        delta: e,
                        time: this._time += e,
                        count: this._count++
                    })), this._stats && this._stats.update(), this._handlingFrame = !1, this.update();
                },
                _animateItem: function(t, e) {
                    var n = this._frameItems;
                    e ? (n[t._id] = {
                        item: t,
                        time: 0,
                        count: 0
                    }, 1 === ++this._frameItemCount && this.on("frame", this._handleFrameItems)) : (delete n[t._id], 
                    0 === --this._frameItemCount && this.off("frame", this._handleFrameItems));
                },
                _handleFrameItems: function(t) {
                    for (var e in this._frameItems) {
                        var n = this._frameItems[e];
                        n.item.emit("frame", new o(t, {
                            time: n.time += t.delta,
                            count: n.count++
                        }));
                    }
                },
                _update: function() {
                    this._project._needsUpdate = !0, this._handlingFrame || (this._animate ? this._handleFrame() : this.update());
                },
                _changed: function(t) {
                    1 & t && (this._project._needsUpdate = !0);
                },
                _transform: function(t) {
                    this._matrix.concatenate(t), this._bounds = null, this._update();
                },
                getElement: function() {
                    return this._element;
                },
                getPixelRatio: function() {
                    return this._pixelRatio;
                },
                getResolution: function() {
                    return 72 * this._pixelRatio;
                },
                getViewSize: function() {
                    var t = this._viewSize;
                    return new v(t.width, t.height, this, "setViewSize");
                },
                setViewSize: function() {
                    var t = p.read(arguments), e = t.subtract(this._viewSize);
                    e.isZero() || (this._viewSize.set(t.width, t.height), this._setViewSize(t), this._bounds = null, 
                    this.emit("resize", {
                        size: t,
                        delta: e
                    }), this._update());
                },
                _setViewSize: function(t) {
                    var e = this._element;
                    e.width = t.width, e.height = t.height;
                },
                getBounds: function() {
                    return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(new m(new _(), this._viewSize))), 
                    this._bounds;
                },
                getSize: function() {
                    return this.getBounds().getSize();
                },
                getCenter: function() {
                    return this.getBounds().getCenter();
                },
                setCenter: function() {
                    var t = _.read(arguments);
                    this.scrollBy(t.subtract(this.getCenter()));
                },
                getZoom: function() {
                    return this._zoom;
                },
                setZoom: function(t) {
                    this._transform(new w().scale(t / this._zoom, this.getCenter())), this._zoom = t;
                },
                isVisible: function() {
                    return U.isInView(this._element);
                },
                scrollBy: function() {
                    this._transform(new w().translate(_.read(arguments).negate()));
                },
                play: function() {
                    this._animate = !0, this._requested || this._requestFrame();
                },
                pause: function() {
                    this._animate = !1;
                },
                draw: function() {
                    this.update();
                },
                projectToView: function() {
                    return this._matrix._transformPoint(_.read(arguments));
                },
                viewToProject: function() {
                    return this._matrix._inverseTransform(_.read(arguments));
                }
            }, {
                statics: {
                    _views: [],
                    _viewsById: {},
                    _id: 0,
                    create: function(t, e) {
                        return "string" == typeof e && (e = document.getElementById(e)), new X(t, e);
                    }
                }
            }, new function() {
                function t(t) {
                    var e = Z.getTarget(t);
                    return e.getAttribute && G._viewsById[e.getAttribute("id")];
                }
                function e(t, e) {
                    return t.viewToProject(Z.getOffset(e, t._element));
                }
                function n() {
                    if (!G._focused || !G._focused.isVisible()) for (var t = 0, e = G._views.length; e > t; t++) {
                        var n = G._views[t];
                        if (n && n.isVisible()) {
                            G._focused = a = n;
                            break;
                        }
                    }
                }
                function i(t, e, n) {
                    t._handleEvent("mousemove", e, n);
                    var i = t._scope.tool;
                    return i && i._handleEvent(l && i.responds("mousedrag") ? "mousedrag" : "mousemove", e, n), 
                    t.update(), i;
                }
                var r, s, a, o, u, h, l = !1, c = window.navigator;
                c.pointerEnabled || c.msPointerEnabled ? (o = "pointerdown MSPointerDown", u = "pointermove MSPointerMove", 
                h = "pointerup pointercancel MSPointerUp MSPointerCancel") : (o = "touchstart", 
                u = "touchmove", h = "touchend touchcancel", "ontouchstart" in window && c.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i) || (o += " mousedown", 
                u += " mousemove", h += " mouseup"));
                var f = {
                    "selectstart dragstart": function(t) {
                        l && t.preventDefault();
                    }
                }, d = {
                    mouseout: function(t) {
                        var n = G._focused, r = Z.getRelatedTarget(t);
                        !n || r && "HTML" !== r.nodeName || i(n, e(n, t), t);
                    },
                    scroll: n
                };
                f[o] = function(n) {
                    var i = G._focused = t(n), s = e(i, n);
                    l = !0, i._handleEvent("mousedown", s, n), (r = i._scope.tool) && r._handleEvent("mousedown", s, n), 
                    i.update();
                }, d[u] = function(o) {
                    var u = G._focused;
                    if (!l) {
                        var h = t(o);
                        h ? (u !== h && i(u, e(u, o), o), s = u, u = G._focused = a = h) : a && a === u && (u = G._focused = s, 
                        n());
                    }
                    if (u) {
                        var c = e(u, o);
                        (l || u.getBounds().contains(c)) && (r = i(u, c, o));
                    }
                }, d[h] = function(t) {
                    var n = G._focused;
                    if (n && l) {
                        var i = e(n, t);
                        l = !1, n._handleEvent("mouseup", i, t), r && r._handleEvent("mouseup", i, t), n.update();
                    }
                }, Z.add(document, d), Z.add(window, {
                    load: n
                });
                var _ = {
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
                    _viewEvents: f,
                    _handleEvent: function() {},
                    _installEvent: function(t) {
                        var e = this._eventCounters;
                        if (e) for (var n in _) e[n] = (e[n] || 0) + (_[n][t] || 0);
                    },
                    _uninstallEvent: function(t) {
                        var e = this._eventCounters;
                        if (e) for (var n in _) e[n] -= _[n][t] || 0;
                    },
                    statics: {
                        updateFocus: n
                    }
                };
            }()), X = G.extend({
                _class: "CanvasView",
                initialize: function(t, e) {
                    if (!(e instanceof HTMLCanvasElement)) {
                        var n = p.read(arguments, 1);
                        if (n.isZero()) throw new Error("Cannot create CanvasView with the provided argument: " + [].slice.call(arguments, 1));
                        e = it.getCanvas(n);
                    }
                    if (this._context = e.getContext("2d"), this._eventCounters = {}, this._pixelRatio = 1, 
                    !/^off|false$/.test(h.getAttribute(e, "hidpi"))) {
                        var i = window.devicePixelRatio || 1, r = U.getPrefixed(this._context, "backingStorePixelRatio") || 1;
                        this._pixelRatio = i / r;
                    }
                    G.call(this, t, e);
                },
                _setViewSize: function(t) {
                    var e = this._element, n = this._pixelRatio, i = t.width, r = t.height;
                    if (e.width = i * n, e.height = r * n, 1 !== n) {
                        if (!h.hasAttribute(e, "resize")) {
                            var s = e.style;
                            s.width = i + "px", s.height = r + "px";
                        }
                        this._context.scale(n, n);
                    }
                },
                getPixelSize: function(t) {
                    var e, n = s.browser;
                    if (n && n.firefox) {
                        var i = this._element.parentNode, r = document.createElement("div");
                        r.style.fontSize = t, i.appendChild(r), e = parseFloat(U.getStyles(r).fontSize), 
                        i.removeChild(r);
                    } else {
                        var a = this._context, o = a.font;
                        a.font = t + " serif", e = parseFloat(a.font), a.font = o;
                    }
                    return e;
                },
                getTextWidth: function(t, e) {
                    var n = this._context, i = n.font, r = 0;
                    n.font = t;
                    for (var s = 0, a = e.length; a > s; s++) r = Math.max(r, n.measureText(e[s]).width);
                    return n.font = i, r;
                },
                update: function(t) {
                    var e = this._project;
                    if (!e || !t && !e._needsUpdate) return !1;
                    var n = this._context, i = this._viewSize;
                    return n.clearRect(0, 0, i.width + 1, i.height + 1), e.draw(n, this._matrix, this._pixelRatio), 
                    e._needsUpdate = !1, !0;
                }
            }, new function() {
                function t(t, e, n, i, r, s) {
                    function a(t) {
                        return t.responds(e) && (o || (o = new Q(e, n, i, r, s ? i.subtract(s) : null)), 
                        t.emit(e, o) && o.isStopped) ? (n.preventDefault(), !0) : void 0;
                    }
                    for (var o, u = r; u; ) {
                        if (a(u)) return !0;
                        u = u.getParent();
                    }
                    return !!a(t);
                }
                var e, n, i, r, s, a, o, u, h;
                return {
                    _handleEvent: function(l, c, f) {
                        if (this._eventCounters[l]) {
                            var d = this._project, _ = d.hitTest(c, {
                                tolerance: 0,
                                fill: !0,
                                stroke: !0
                            }), g = _ && _.item, p = !1;
                            switch (l) {
                              case "mousedown":
                                for (p = t(this, l, f, c, g), u = s == g && Date.now() - h < 300, r = s = g, e = n = i = c, 
                                o = !p && g; o && !o.responds("mousedrag"); ) o = o._parent;
                                break;

                              case "mouseup":
                                p = t(this, l, f, c, g, e), o && (n && !n.equals(c) && t(this, "mousedrag", f, c, o, n), 
                                g !== o && (i = c, t(this, "mousemove", f, c, g, i))), !p && g && g === r && (h = Date.now(), 
                                t(this, u && r.responds("doubleclick") ? "doubleclick" : "click", f, e, g), u = !1), 
                                r = o = null;
                                break;

                              case "mousemove":
                                o && (p = t(this, "mousedrag", f, c, o, n)), p || (g !== a && (i = c), p = t(this, l, f, c, g, i)), 
                                n = i = c, g !== a && (t(this, "mouseleave", f, c, a), a = g, t(this, "mouseenter", f, c, g));
                            }
                            return p;
                        }
                    }
                };
            }()), J = o.extend({
                _class: "Event",
                initialize: function(t) {
                    this.event = t;
                },
                isPrevented: !1,
                isStopped: !1,
                preventDefault: function() {
                    this.isPrevented = !0, this.event.preventDefault();
                },
                stopPropagation: function() {
                    this.isStopped = !0, this.event.stopPropagation();
                },
                stop: function() {
                    this.stopPropagation(), this.preventDefault();
                },
                getModifiers: function() {
                    return K.modifiers;
                }
            }), Y = J.extend({
                _class: "KeyEvent",
                initialize: function(t, e, n, i) {
                    J.call(this, i), this.type = t ? "keydown" : "keyup", this.key = e, this.character = n;
                },
                toString: function() {
                    return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }";
                }
            }), K = new function() {
                function t(n, r, l, c) {
                    var f, d = l ? String.fromCharCode(l) : "", _ = i[r], g = _ || d.toLowerCase(), p = n ? "keydown" : "keyup", v = G._focused, m = v && v.isVisible() && v._scope, y = m && m.tool;
                    if (h[g] = n, n ? u[r] = l : delete u[r], _ && (f = o.camelize(_)) in a) {
                        a[f] = n;
                        var w = s.browser;
                        if ("command" === f && w && w.mac) if (n) e = {}; else {
                            for (var b in e) b in u && t(!1, b, e[b], c);
                            e = null;
                        }
                    } else n && e && (e[r] = l);
                    y && y.responds(p) && (s = m, y.emit(p, new Y(n, g, d, c)), v && v.update());
                }
                var e, n, i = {
                    8: "backspace",
                    9: "tab",
                    13: "enter",
                    16: "shift",
                    17: "control",
                    18: "option",
                    19: "pause",
                    20: "caps-lock",
                    27: "escape",
                    32: "space",
                    35: "end",
                    36: "home",
                    37: "left",
                    38: "up",
                    39: "right",
                    40: "down",
                    46: "delete",
                    91: "command",
                    93: "command",
                    224: "command"
                }, r = {
                    9: !0,
                    13: !0,
                    32: !0
                }, a = new o({
                    shift: !1,
                    control: !1,
                    option: !1,
                    command: !1,
                    capsLock: !1,
                    space: !1
                }), u = {}, h = {};
                return Z.add(document, {
                    keydown: function(e) {
                        var s = e.which || e.keyCode;
                        s in i || a.command ? t(!0, s, s in r || a.command ? s : 0, e) : n = s;
                    },
                    keypress: function(e) {
                        null != n && (t(!0, n, e.which || e.keyCode, e), n = null);
                    },
                    keyup: function(e) {
                        var n = e.which || e.keyCode;
                        n in u && t(!1, n, u[n], e);
                    }
                }), Z.add(window, {
                    blur: function(e) {
                        for (var n in u) t(!1, n, u[n], e);
                    }
                }), {
                    modifiers: a,
                    isDown: function(t) {
                        return !!h[t];
                    }
                };
            }(), Q = J.extend({
                _class: "MouseEvent",
                initialize: function(t, e, n, i, r) {
                    J.call(this, e), this.type = t, this.point = n, this.target = i, this.delta = r;
                },
                toString: function() {
                    return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }";
                }
            }), tt = J.extend({
                _class: "ToolEvent",
                _item: null,
                initialize: function(t, e, n) {
                    this.tool = t, this.type = e, this.event = n;
                },
                _choosePoint: function(t, e) {
                    return t ? t : e ? e.clone() : null;
                },
                getPoint: function() {
                    return this._choosePoint(this._point, this.tool._point);
                },
                setPoint: function(t) {
                    this._point = t;
                },
                getLastPoint: function() {
                    return this._choosePoint(this._lastPoint, this.tool._lastPoint);
                },
                setLastPoint: function(t) {
                    this._lastPoint = t;
                },
                getDownPoint: function() {
                    return this._choosePoint(this._downPoint, this.tool._downPoint);
                },
                setDownPoint: function(t) {
                    this._downPoint = t;
                },
                getMiddlePoint: function() {
                    return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint;
                },
                setMiddlePoint: function(t) {
                    this._middlePoint = t;
                },
                getDelta: function() {
                    return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta;
                },
                setDelta: function(t) {
                    this._delta = t;
                },
                getCount: function() {
                    return /^mouse(down|up)$/.test(this.type) ? this.tool._downCount : this.tool._count;
                },
                setCount: function(t) {
                    this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = t;
                },
                getItem: function() {
                    if (!this._item) {
                        var t = this.tool._scope.project.hitTest(this.getPoint());
                        if (t) {
                            for (var e = t.item, n = e._parent; /^(Group|CompoundPath)$/.test(n._class); ) e = n, 
                            n = n._parent;
                            this._item = e;
                        }
                    }
                    return this._item;
                },
                setItem: function(t) {
                    this._item = t;
                },
                toString: function() {
                    return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }";
                }
            }), et = l.extend({
                _class: "Tool",
                _list: "tools",
                _reference: "tool",
                _events: [ "onActivate", "onDeactivate", "onEditOptions", "onMouseDown", "onMouseUp", "onMouseDrag", "onMouseMove", "onKeyDown", "onKeyUp" ],
                initialize: function(t) {
                    l.call(this), this._firstMove = !0, this._count = 0, this._downCount = 0, this._set(t);
                },
                getMinDistance: function() {
                    return this._minDistance;
                },
                setMinDistance: function(t) {
                    this._minDistance = t, null != t && null != this._maxDistance && t > this._maxDistance && (this._maxDistance = t);
                },
                getMaxDistance: function() {
                    return this._maxDistance;
                },
                setMaxDistance: function(t) {
                    this._maxDistance = t, null != this._minDistance && null != t && t < this._minDistance && (this._minDistance = t);
                },
                getFixedDistance: function() {
                    return this._minDistance == this._maxDistance ? this._minDistance : null;
                },
                setFixedDistance: function(t) {
                    this._minDistance = this._maxDistance = t;
                },
                _updateEvent: function(t, e, n, i, r, s, a) {
                    if (!r) {
                        if (null != n || null != i) {
                            var o = null != n ? n : 0, u = e.subtract(this._point), h = u.getLength();
                            if (o > h) return !1;
                            if (null != i && 0 != i) if (h > i) e = this._point.add(u.normalize(i)); else if (a) return !1;
                        }
                        if (s && e.equals(this._point)) return !1;
                    }
                    switch (this._lastPoint = r && "mousemove" == t ? e : this._point, this._point = e, 
                    t) {
                      case "mousedown":
                        this._lastPoint = this._downPoint, this._downPoint = this._point, this._downCount++;
                        break;

                      case "mouseup":
                        this._lastPoint = this._downPoint;
                    }
                    return this._count = r ? 0 : this._count + 1, !0;
                },
                _fireEvent: function(t, e) {
                    var n = s.project._removeSets;
                    if (n) {
                        "mouseup" === t && (n.mousedrag = null);
                        var i = n[t];
                        if (i) {
                            for (var r in i) {
                                var a = i[r];
                                for (var o in n) {
                                    var u = n[o];
                                    u && u != i && delete u[a._id];
                                }
                                a.remove();
                            }
                            n[t] = null;
                        }
                    }
                    return this.responds(t) && this.emit(t, new tt(this, t, e));
                },
                _handleEvent: function(t, e, n) {
                    s = this._scope;
                    var i = !1;
                    switch (t) {
                      case "mousedown":
                        this._updateEvent(t, e, null, null, !0, !1, !1), i = this._fireEvent(t, n);
                        break;

                      case "mousedrag":
                        for (var r = !1, a = !1; this._updateEvent(t, e, this.minDistance, this.maxDistance, !1, r, a); ) i = this._fireEvent(t, n) || i, 
                        r = !0, a = !0;
                        break;

                      case "mouseup":
                        !e.equals(this._point) && this._updateEvent("mousedrag", e, this.minDistance, this.maxDistance, !1, !1, !1) && (i = this._fireEvent("mousedrag", n)), 
                        this._updateEvent(t, e, null, this.maxDistance, !1, !1, !1), i = this._fireEvent(t, n) || i, 
                        this._updateEvent(t, e, null, null, !0, !1, !1), this._firstMove = !0;
                        break;

                      case "mousemove":
                        for (;this._updateEvent(t, e, this.minDistance, this.maxDistance, this._firstMove, !0, !1); ) i = this._fireEvent(t, n) || i, 
                        this._firstMove = !1;
                    }
                    return i && n.preventDefault(), i;
                }
            }), nt = {
                request: function(t, e, n, i) {
                    i = i === a ? !0 : i;
                    var r = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");
                    return r.open(t.toUpperCase(), e, i), "overrideMimeType" in r && r.overrideMimeType("text/plain"), 
                    r.onreadystatechange = function() {
                        if (4 === r.readyState) {
                            var t = r.status;
                            if (0 !== t && 200 !== t) throw new Error("Could not load " + e + " (Error " + t + ")");
                            n.call(r, r.responseText);
                        }
                    }, r.send(null);
                }
            }, it = {
                canvases: [],
                getCanvas: function(t, e) {
                    var n, i = !0;
                    "object" == typeof t && (e = t.height, t = t.width), n = this.canvases.length ? this.canvases.pop() : document.createElement("canvas");
                    var r = n.getContext("2d");
                    return n.width === t && n.height === e ? i && r.clearRect(0, 0, t + 1, e + 1) : (n.width = t, 
                    n.height = e), r.save(), n;
                },
                getContext: function(t, e) {
                    return this.getCanvas(t, e).getContext("2d");
                },
                release: function(t) {
                    var e = t.canvas ? t.canvas : t;
                    e.getContext("2d").restore(), this.canvases.push(e);
                }
            }, rt = new function() {
                function t(t, e, n) {
                    return .2989 * t + .587 * e + .114 * n;
                }
                function e(e, n, i, r) {
                    var s = r - t(e, n, i);
                    d = e + s, _ = n + s, g = i + s;
                    var r = t(d, _, g), a = p(d, _, g), o = v(d, _, g);
                    if (0 > a) {
                        var u = r - a;
                        d = r + (d - r) * r / u, _ = r + (_ - r) * r / u, g = r + (g - r) * r / u;
                    }
                    if (o > 255) {
                        var h = 255 - r, l = o - r;
                        d = r + (d - r) * h / l, _ = r + (_ - r) * h / l, g = r + (g - r) * h / l;
                    }
                }
                function n(t, e, n) {
                    return v(t, e, n) - p(t, e, n);
                }
                function i(t, e, n, i) {
                    var r, s = [ t, e, n ], a = v(t, e, n), o = p(t, e, n);
                    o = o === t ? 0 : o === e ? 1 : 2, a = a === t ? 0 : a === e ? 1 : 2, r = 0 === p(o, a) ? 1 === v(o, a) ? 2 : 1 : 0, 
                    s[a] > s[o] ? (s[r] = (s[r] - s[o]) * i / (s[a] - s[o]), s[a] = i) : s[r] = s[a] = 0, 
                    s[o] = 0, d = s[0], _ = s[1], g = s[2];
                }
                var r, s, a, u, h, l, c, f, d, _, g, p = Math.min, v = Math.max, m = Math.abs, y = {
                    multiply: function() {
                        d = h * r / 255, _ = l * s / 255, g = c * a / 255;
                    },
                    screen: function() {
                        d = h + r - h * r / 255, _ = l + s - l * s / 255, g = c + a - c * a / 255;
                    },
                    overlay: function() {
                        d = 128 > h ? 2 * h * r / 255 : 255 - 2 * (255 - h) * (255 - r) / 255, _ = 128 > l ? 2 * l * s / 255 : 255 - 2 * (255 - l) * (255 - s) / 255, 
                        g = 128 > c ? 2 * c * a / 255 : 255 - 2 * (255 - c) * (255 - a) / 255;
                    },
                    "soft-light": function() {
                        var t = r * h / 255;
                        d = t + h * (255 - (255 - h) * (255 - r) / 255 - t) / 255, t = s * l / 255, _ = t + l * (255 - (255 - l) * (255 - s) / 255 - t) / 255, 
                        t = a * c / 255, g = t + c * (255 - (255 - c) * (255 - a) / 255 - t) / 255;
                    },
                    "hard-light": function() {
                        d = 128 > r ? 2 * r * h / 255 : 255 - 2 * (255 - r) * (255 - h) / 255, _ = 128 > s ? 2 * s * l / 255 : 255 - 2 * (255 - s) * (255 - l) / 255, 
                        g = 128 > a ? 2 * a * c / 255 : 255 - 2 * (255 - a) * (255 - c) / 255;
                    },
                    "color-dodge": function() {
                        d = 0 === h ? 0 : 255 === r ? 255 : p(255, 255 * h / (255 - r)), _ = 0 === l ? 0 : 255 === s ? 255 : p(255, 255 * l / (255 - s)), 
                        g = 0 === c ? 0 : 255 === a ? 255 : p(255, 255 * c / (255 - a));
                    },
                    "color-burn": function() {
                        d = 255 === h ? 255 : 0 === r ? 0 : v(0, 255 - 255 * (255 - h) / r), _ = 255 === l ? 255 : 0 === s ? 0 : v(0, 255 - 255 * (255 - l) / s), 
                        g = 255 === c ? 255 : 0 === a ? 0 : v(0, 255 - 255 * (255 - c) / a);
                    },
                    darken: function() {
                        d = r > h ? h : r, _ = s > l ? l : s, g = a > c ? c : a;
                    },
                    lighten: function() {
                        d = h > r ? h : r, _ = l > s ? l : s, g = c > a ? c : a;
                    },
                    difference: function() {
                        d = h - r, 0 > d && (d = -d), _ = l - s, 0 > _ && (_ = -_), g = c - a, 0 > g && (g = -g);
                    },
                    exclusion: function() {
                        d = h + r * (255 - h - h) / 255, _ = l + s * (255 - l - l) / 255, g = c + a * (255 - c - c) / 255;
                    },
                    hue: function() {
                        i(r, s, a, n(h, l, c)), e(d, _, g, t(h, l, c));
                    },
                    saturation: function() {
                        i(h, l, c, n(r, s, a)), e(d, _, g, t(h, l, c));
                    },
                    luminosity: function() {
                        e(h, l, c, t(r, s, a));
                    },
                    color: function() {
                        e(r, s, a, t(h, l, c));
                    },
                    add: function() {
                        d = p(h + r, 255), _ = p(l + s, 255), g = p(c + a, 255);
                    },
                    subtract: function() {
                        d = v(h - r, 0), _ = v(l - s, 0), g = v(c - a, 0);
                    },
                    average: function() {
                        d = (h + r) / 2, _ = (l + s) / 2, g = (c + a) / 2;
                    },
                    negation: function() {
                        d = 255 - m(255 - r - h), _ = 255 - m(255 - s - l), g = 255 - m(255 - a - c);
                    }
                }, w = this.nativeModes = o.each([ "source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "darker", "copy", "xor" ], function(t) {
                    this[t] = !0;
                }, {}), b = it.getContext(1, 1);
                o.each(y, function(t, e) {
                    var n = "darken" === e, i = !1;
                    b.save();
                    try {
                        b.fillStyle = n ? "#300" : "#a00", b.fillRect(0, 0, 1, 1), b.globalCompositeOperation = e, 
                        b.globalCompositeOperation === e && (b.fillStyle = n ? "#a00" : "#300", b.fillRect(0, 0, 1, 1), 
                        i = b.getImageData(0, 0, 1, 1).data[0] !== n ? 170 : 51);
                    } catch (r) {}
                    b.restore(), w[e] = i;
                }), it.release(b), this.process = function(t, e, n, i, o) {
                    var p = e.canvas, v = "normal" === t;
                    if (v || w[t]) n.save(), n.setTransform(1, 0, 0, 1, 0, 0), n.globalAlpha = i, v || (n.globalCompositeOperation = t), 
                    n.drawImage(p, o.x, o.y), n.restore(); else {
                        var m = y[t];
                        if (!m) return;
                        for (var b = n.getImageData(o.x, o.y, p.width, p.height), x = b.data, C = e.getImageData(0, 0, p.width, p.height).data, S = 0, E = x.length; E > S; S += 4) {
                            r = C[S], h = x[S], s = C[S + 1], l = x[S + 1], a = C[S + 2], c = x[S + 2], u = C[S + 3], 
                            f = x[S + 3], m();
                            var P = u * i / 255, A = 1 - P;
                            x[S] = P * d + A * h, x[S + 1] = P * _ + A * l, x[S + 2] = P * g + A * c, x[S + 3] = u * i + A * f;
                        }
                        n.putImageData(b, o.x, o.y);
                    }
                };
            }(), st = o.each({
                fillColor: [ "fill", "color" ],
                strokeColor: [ "stroke", "color" ],
                strokeWidth: [ "stroke-width", "number" ],
                strokeCap: [ "stroke-linecap", "string" ],
                strokeJoin: [ "stroke-linejoin", "string" ],
                strokeScaling: [ "vector-effect", "lookup", {
                    "true": "none",
                    "false": "non-scaling-stroke"
                }, function(t, e) {
                    return !e && (t instanceof N || t instanceof A || t instanceof R);
                } ],
                miterLimit: [ "stroke-miterlimit", "number" ],
                dashArray: [ "stroke-dasharray", "array" ],
                dashOffset: [ "stroke-dashoffset", "number" ],
                fontFamily: [ "font-family", "string" ],
                fontWeight: [ "font-weight", "string" ],
                fontSize: [ "font-size", "number" ],
                justification: [ "text-anchor", "lookup", {
                    left: "start",
                    center: "middle",
                    right: "end"
                } ],
                opacity: [ "opacity", "number" ],
                blendMode: [ "mix-blend-mode", "string" ]
            }, function(t, e) {
                var n = o.capitalize(e), i = t[2];
                this[e] = {
                    type: t[1],
                    property: e,
                    attribute: t[0],
                    toSVG: i,
                    fromSVG: i && o.each(i, function(t, e) {
                        this[t] = e;
                    }, {}),
                    exportFilter: t[3],
                    get: "get" + n,
                    set: "set" + n
                };
            }, {}), at = {
                href: "http://www.w3.org/1999/xlink",
                xlink: "http://www.w3.org/2000/xmlns"
            };
            return new function() {
                function t(t, e) {
                    for (var n in e) {
                        var i = e[n], r = at[n];
                        "number" == typeof i && (i = w.number(i)), r ? t.setAttributeNS(r, n, i) : t.setAttribute(n, i);
                    }
                    return t;
                }
                function e(e, n) {
                    return t(document.createElementNS("http://www.w3.org/2000/svg", e), n);
                }
                function n(t, e, n) {
                    var i = new o(), r = t.getTranslation();
                    if (e) {
                        t = t.shiftless();
                        var s = t._inverseTransform(r);
                        i[n ? "cx" : "x"] = s.x, i[n ? "cy" : "y"] = s.y, r = null;
                    }
                    if (!t.isIdentity()) {
                        var a = t.decompose();
                        if (a && !a.shearing) {
                            var u = [], h = a.rotation, l = a.scaling;
                            r && !r.isZero() && u.push("translate(" + w.point(r) + ")"), f.isZero(l.x - 1) && f.isZero(l.y - 1) || u.push("scale(" + w.point(l) + ")"), 
                            h && u.push("rotate(" + w.number(h) + ")"), i.transform = u.join(" ");
                        } else i.transform = "matrix(" + t.getValues().join(",") + ")";
                    }
                    return i;
                }
                function i(i, r) {
                    for (var s = n(i._matrix), a = i._children, o = e("g", s), u = 0, h = a.length; h > u; u++) {
                        var l = a[u], c = m(l, r);
                        if (c) if (l.isClipMask()) {
                            var f = e("clipPath");
                            f.appendChild(c), p(l, f, "clip"), t(o, {
                                "clip-path": "url(#" + f.id + ")"
                            });
                        } else o.appendChild(c);
                    }
                    return o;
                }
                function r(t, i) {
                    var r = n(t._matrix, !0), s = t.getSize(), a = t.getImage();
                    return r.x -= s.width / 2, r.y -= s.height / 2, r.width = s.width, r.height = s.height, 
                    r.href = i.embedImages === !1 && a && a.src || t.toDataURL(), e("image", r);
                }
                function s(t, i) {
                    var r = i.matchShapes;
                    if (r) {
                        var s = t.toShape(!1);
                        if (s) return a(s, i);
                    }
                    var o, u = t._segments, h = n(t._matrix);
                    if (0 === u.length) return null;
                    if (r && !t.hasHandles()) if (u.length >= 3) {
                        o = t._closed ? "polygon" : "polyline";
                        for (var l = [], c = 0, f = u.length; f > c; c++) l.push(w.point(u[c]._point));
                        h.points = l.join(" ");
                    } else {
                        o = "line";
                        var d = u[0]._point, _ = u[u.length - 1]._point;
                        h.set({
                            x1: d.x,
                            y1: d.y,
                            x2: _.x,
                            y2: _.y
                        });
                    } else o = "path", h.d = t.getPathData(null, i.precision);
                    return e(o, h);
                }
                function a(t) {
                    var i = t._type, r = t._radius, s = n(t._matrix, !0, "rectangle" !== i);
                    if ("rectangle" === i) {
                        i = "rect";
                        var a = t._size, o = a.width, u = a.height;
                        s.x -= o / 2, s.y -= u / 2, s.width = o, s.height = u, r.isZero() && (r = null);
                    }
                    return r && ("circle" === i ? s.r = r : (s.rx = r.width, s.ry = r.height)), e(i, s);
                }
                function u(t, i) {
                    var r = n(t._matrix), s = t.getPathData(null, i.precision);
                    return s && (r.d = s), e("path", r);
                }
                function h(t, i) {
                    var r = n(t._matrix, !0), s = t.getSymbol(), a = g(s, "symbol"), o = s.getDefinition(), u = o.getBounds();
                    return a || (a = e("symbol", {
                        viewBox: w.rectangle(u)
                    }), a.appendChild(m(o, i)), p(s, a, "symbol")), r.href = "#" + a.id, r.x += u.x, 
                    r.y += u.y, r.width = w.number(u.width), r.height = w.number(u.height), r.overflow = "visible", 
                    e("use", r);
                }
                function l(t) {
                    var n = g(t, "color");
                    if (!n) {
                        var i, r = t.getGradient(), s = r._radial, a = t.getOrigin().transform(), o = t.getDestination().transform();
                        if (s) {
                            i = {
                                cx: a.x,
                                cy: a.y,
                                r: a.getDistance(o)
                            };
                            var u = t.getHighlight();
                            u && (u = u.transform(), i.fx = u.x, i.fy = u.y);
                        } else i = {
                            x1: a.x,
                            y1: a.y,
                            x2: o.x,
                            y2: o.y
                        };
                        i.gradientUnits = "userSpaceOnUse", n = e((s ? "radial" : "linear") + "Gradient", i);
                        for (var h = r._stops, l = 0, c = h.length; c > l; l++) {
                            var f = h[l], d = f._color, _ = d.getAlpha();
                            i = {
                                offset: f._rampPoint,
                                "stop-color": d.toCSS(!0)
                            }, 1 > _ && (i["stop-opacity"] = _), n.appendChild(e("stop", i));
                        }
                        p(t, n, "color");
                    }
                    return "url(#" + n.id + ")";
                }
                function d(t) {
                    var i = e("text", n(t._matrix, !0));
                    return i.textContent = t._content, i;
                }
                function _(e, n, i) {
                    var r = {}, s = !i && e.getParent();
                    return null != e._name && (r.id = e._name), o.each(st, function(t) {
                        var n = t.get, i = t.type, a = e[n]();
                        if (t.exportFilter ? t.exportFilter(e, a) : !s || !o.equals(s[n](), a)) {
                            if ("color" === i && null != a) {
                                var u = a.getAlpha();
                                1 > u && (r[t.attribute + "-opacity"] = u);
                            }
                            r[t.attribute] = null == a ? "none" : "number" === i ? w.number(a) : "color" === i ? a.gradient ? l(a, e) : a.toCSS(!0) : "array" === i ? a.join(",") : "lookup" === i ? t.toSVG[a] : a;
                        }
                    }), 1 === r.opacity && delete r.opacity, e._visible || (r.visibility = "hidden"), 
                    t(n, r);
                }
                function g(t, e) {
                    return b || (b = {
                        ids: {},
                        svgs: {}
                    }), t && b.svgs[e + "-" + t._id];
                }
                function p(t, e, n) {
                    b || g();
                    var i = b.ids[n] = (b.ids[n] || 0) + 1;
                    e.id = n + "-" + i, b.svgs[n + "-" + t._id] = e;
                }
                function v(t, n) {
                    var i = t, r = null;
                    if (b) {
                        i = "svg" === t.nodeName.toLowerCase() && t;
                        for (var s in b.svgs) r || (i || (i = e("svg"), i.appendChild(t)), r = i.insertBefore(e("defs"), i.firstChild)), 
                        r.appendChild(b.svgs[s]);
                        b = null;
                    }
                    return n.asString ? new XMLSerializer().serializeToString(i) : i;
                }
                function m(t, e, n) {
                    var i = C[t._class], r = i && i(t, e);
                    if (r) {
                        var s = e.onExport;
                        s && (r = s(t, r, e) || r);
                        var a = JSON.stringify(t._data);
                        a && "{}" !== a && "null" !== a && r.setAttribute("data-paper-data", a);
                    }
                    return r && _(t, r, n);
                }
                function y(t) {
                    return t || (t = {}), w = new c(t.precision), t;
                }
                var w, b, C = {
                    Group: i,
                    Layer: i,
                    Raster: r,
                    Path: s,
                    Shape: a,
                    CompoundPath: u,
                    PlacedSymbol: h,
                    PointText: d
                };
                S.inject({
                    exportSVG: function(t) {
                        return t = y(t), v(m(this, t, !0), t);
                    }
                }), x.inject({
                    exportSVG: function(t) {
                        t = y(t);
                        var i = this.layers, r = this.getView(), s = r.getViewSize(), a = e("svg", {
                            x: 0,
                            y: 0,
                            width: s.width,
                            height: s.height,
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg",
                            "xmlns:xlink": "http://www.w3.org/1999/xlink"
                        }), o = a, u = r._matrix;
                        u.isIdentity() || (o = a.appendChild(e("g", n(u))));
                        for (var h = 0, l = i.length; l > h; h++) o.appendChild(m(i[h], t, !0));
                        return v(a, t);
                    }
                });
            }(), new function() {
                function t(t, e, n, i) {
                    var r = at[e], s = r ? t.getAttributeNS(r, e) : t.getAttribute(e);
                    return "null" === s && (s = null), null == s ? i ? null : n ? "" : 0 : n ? s : parseFloat(s);
                }
                function e(e, n, i, r) {
                    return n = t(e, n, !1, r), i = t(e, i, !1, r), !r || null != n && null != i ? new _(n, i) : null;
                }
                function n(e, n, i, r) {
                    return n = t(e, n, !1, r), i = t(e, i, !1, r), !r || null != n && null != i ? new p(n, i) : null;
                }
                function i(t, e, n) {
                    return "none" === t ? null : "number" === e ? parseFloat(t) : "array" === e ? t ? t.split(/[\s,]+/g).map(parseFloat) : [] : "color" === e ? v(t) || t : "lookup" === e ? n[t] : t;
                }
                function r(t, e, n, i) {
                    var r = t.childNodes, s = "clippath" === e, a = new E(), o = a._project, u = o._currentStyle, h = [];
                    if (s || (a = g(a, t, i), o._currentStyle = a._style.clone()), i) for (var l = t.querySelectorAll("defs"), c = 0, f = l.length; f > c; c++) y(l[c], n, !1);
                    for (var c = 0, f = r.length; f > c; c++) {
                        var d, _ = r[c];
                        1 !== _.nodeType || "defs" === _.nodeName.toLowerCase() || !(d = y(_, n, !1)) || d instanceof C || h.push(d);
                    }
                    return a.addChildren(h), s && (a = g(a.reduce(), t, i)), o._currentStyle = u, (s || "defs" === e) && (a.remove(), 
                    a = null), a;
                }
                function u(t, e) {
                    for (var n = t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g), i = [], r = 0, s = n.length; s > r; r += 2) i.push(new _(parseFloat(n[r]), parseFloat(n[r + 1])));
                    var a = new V(i);
                    return "polygon" === e && a.closePath(), a;
                }
                function h(t) {
                    var e = t.getAttribute("d"), n = {
                        pathData: e
                    };
                    return (e.match(/m/gi) || []).length > 1 || /z\S+/i.test(e) ? new j(n) : new V(n);
                }
                function l(n, i) {
                    var r, s = (t(n, "href", !0) || "").substring(1), a = "radialgradient" === i;
                    if (s) r = I[s].getGradient(); else {
                        for (var o = n.childNodes, u = [], h = 0, l = o.length; l > h; h++) {
                            var c = o[h];
                            1 === c.nodeType && u.push(g(new W(), c));
                        }
                        r = new $(u, a);
                    }
                    var f, d, _;
                    return a ? (f = e(n, "cx", "cy"), d = f.add(t(n, "r"), 0), _ = e(n, "fx", "fy", !0)) : (f = e(n, "x1", "y1"), 
                    d = e(n, "x2", "y2")), g(new F(r, f, d, _), n), null;
                }
                function c(t, e, n, i) {
                    for (var r = (i.getAttribute(n) || "").split(/\)\s*/g), s = new w(), a = 0, o = r.length; o > a; a++) {
                        var u = r[a];
                        if (!u) break;
                        for (var h = u.split(/\(\s*/), l = h[0], c = h[1].split(/[\s,]+/g), f = 0, d = c.length; d > f; f++) c[f] = parseFloat(c[f]);
                        switch (l) {
                          case "matrix":
                            s.concatenate(new w(c[0], c[1], c[2], c[3], c[4], c[5]));
                            break;

                          case "rotate":
                            s.rotate(c[0], c[1], c[2]);
                            break;

                          case "translate":
                            s.translate(c[0], c[1]);
                            break;

                          case "scale":
                            s.scale(c);
                            break;

                          case "skewX":
                            s.skew(c[0], 0);
                            break;

                          case "skewY":
                            s.skew(0, c[0]);
                        }
                    }
                    t.transform(s);
                }
                function f(t, e, n) {
                    var i = t["fill-opacity" === n ? "getFillColor" : "getStrokeColor"]();
                    i && i.setAlpha(parseFloat(e));
                }
                function d(t, e, n) {
                    var i = t.attributes[e], r = i && i.value;
                    if (!r) {
                        var s = o.camelize(e);
                        r = t.style[s], r || n.node[s] === n.parent[s] || (r = n.node[s]);
                    }
                    return r ? "none" === r ? null : r : a;
                }
                function g(t, e, n) {
                    var i = {
                        node: U.getStyles(e) || {},
                        parent: !n && U.getStyles(e.parentNode) || {}
                    };
                    return o.each(P, function(n, r) {
                        var s = d(e, r, i);
                        s !== a && (t = o.pick(n(t, s, r, e, i), t));
                    }), t;
                }
                function v(t) {
                    var e = t && t.match(/\((?:#|)([^)']+)/);
                    return e && I[e[1]];
                }
                function y(t, e, n) {
                    function i(t) {
                        s = a;
                        var i = y(t, e, n), r = e.onLoad, o = a.project && a.getView();
                        r && r.call(this, i), o.update();
                    }
                    if (!t) return null;
                    e ? "function" == typeof e && (e = {
                        onLoad: e
                    }) : e = {};
                    var r = t, a = s;
                    if (n) if ("string" != typeof t || /^.*</.test(t)) {
                        if ("undefined" != typeof File && t instanceof File) {
                            var u = new FileReader();
                            return u.onload = function() {
                                i(u.result);
                            }, u.readAsText(t);
                        }
                    } else {
                        if (r = document.getElementById(t), !r) return nt.request("get", t, i);
                        t = null;
                    }
                    if ("string" == typeof t && (r = new DOMParser().parseFromString(t, "image/svg+xml")), 
                    !r.nodeName) throw new Error("Unsupported SVG source: " + t);
                    var h, l = r.nodeName.toLowerCase(), c = b[l], f = r.getAttribute && r.getAttribute("data-paper-data"), d = a.settings, _ = d.applyMatrix;
                    if (d.applyMatrix = !1, h = c && c(r, l, e, n) || null, d.applyMatrix = _, h) {
                        "#document" === l || h instanceof E || (h = g(h, r, n));
                        var p = e.onImport;
                        p && (h = p(r, h, e) || h), e.expandShapes && h instanceof A && (h.remove(), h = h.toPath()), 
                        f && (h._data = JSON.parse(f));
                    }
                    return n && (I = {}, h && o.pick(e.applyMatrix, _) && h.matrix.apply(!0, !0)), h;
                }
                var b = {
                    "#document": function(t, e, n, i) {
                        for (var r = t.childNodes, s = 0, a = r.length; a > s; s++) {
                            var o = r[s];
                            if (1 === o.nodeType) {
                                var u = o.nextSibling;
                                document.body.appendChild(o);
                                var h = y(o, n, i);
                                return u ? t.insertBefore(o, u) : t.appendChild(o), h;
                            }
                        }
                    },
                    g: r,
                    svg: r,
                    clippath: r,
                    polygon: u,
                    polyline: u,
                    path: h,
                    lineargradient: l,
                    radialgradient: l,
                    image: function(i) {
                        var r = new k(t(i, "href", !0));
                        return r.on("load", function() {
                            var t = n(i, "width", "height");
                            this.setSize(t);
                            var r = this._matrix._transformPoint(e(i, "x", "y").add(t.divide(2)));
                            this.translate(r);
                        }), r;
                    },
                    symbol: function(t, e, n, i) {
                        return new C(r(t, e, n, i), !0);
                    },
                    defs: r,
                    use: function(n) {
                        var i = (t(n, "href", !0) || "").substring(1), r = I[i], s = e(n, "x", "y");
                        return r ? r instanceof C ? r.place(s) : r.clone().translate(s) : null;
                    },
                    circle: function(n) {
                        return new A.Circle(e(n, "cx", "cy"), t(n, "r"));
                    },
                    ellipse: function(t) {
                        return new A.Ellipse({
                            center: e(t, "cx", "cy"),
                            radius: n(t, "rx", "ry")
                        });
                    },
                    rect: function(t) {
                        var i = e(t, "x", "y"), r = n(t, "width", "height"), s = n(t, "rx", "ry");
                        return new A.Rectangle(new m(i, r), s);
                    },
                    line: function(t) {
                        return new V.Line(e(t, "x1", "y1"), e(t, "x2", "y2"));
                    },
                    text: function(t) {
                        var n = new q(e(t, "x", "y").add(e(t, "dx", "dy")));
                        return n.setContent(t.textContent.trim() || ""), n;
                    }
                }, P = o.set(o.each(st, function(t) {
                    this[t.attribute] = function(e, n) {
                        if (e[t.set](i(n, t.type, t.fromSVG)), "color" === t.type && e instanceof A) {
                            var r = e[t.get]();
                            r && r.transform(new w().translate(e.getPosition(!0).negate()));
                        }
                    };
                }, {}), {
                    id: function(t, e) {
                        I[e] = t, t.setName && t.setName(e);
                    },
                    "clip-path": function(t, e) {
                        var n = v(e);
                        if (n) {
                            if (n = n.clone(), n.setClipMask(!0), !(t instanceof E)) return new E(n, t);
                            t.insertChild(0, n);
                        }
                    },
                    gradientTransform: c,
                    transform: c,
                    "fill-opacity": f,
                    "stroke-opacity": f,
                    visibility: function(t, e) {
                        t.setVisible("visible" === e);
                    },
                    display: function(t, e) {
                        t.setVisible(null !== e);
                    },
                    "stop-color": function(t, e) {
                        t.setColor && t.setColor(e);
                    },
                    "stop-opacity": function(t, e) {
                        t._color && t._color.setAlpha(parseFloat(e));
                    },
                    offset: function(t, e) {
                        var n = e.match(/(.*)%$/);
                        t.setRampPoint(n ? n[1] / 100 : parseFloat(e));
                    },
                    viewBox: function(t, e, r, s, a) {
                        var o = new m(i(e, "array")), u = n(s, "width", "height", !0);
                        if (t instanceof E) {
                            var h = u ? o.getSize().divide(u) : 1, l = new w().translate(o.getPoint()).scale(h);
                            t.transform(l.inverted());
                        } else if (t instanceof C) {
                            u && o.setSize(u);
                            var c = "visible" != d(s, "overflow", a), f = t._definition;
                            c && !o.contains(f.getBounds()) && (c = new A.Rectangle(o).transform(f._matrix), 
                            c.setClipMask(!0), f.addChild(c));
                        }
                    }
                }), I = {};
                S.inject({
                    importSVG: function(t, e) {
                        return this.addChild(y(t, e, !0));
                    }
                }), x.inject({
                    importSVG: function(t, e) {
                        return this.activate(), y(t, e, !0);
                    }
                });
            }(), o.exports.PaperScript = function() {
                function e(t, e, n) {
                    var i = v[e];
                    if (t && t[i]) {
                        var r = t[i](n);
                        return "!=" === e ? !r : r;
                    }
                    switch (e) {
                      case "+":
                        return t + n;

                      case "-":
                        return t - n;

                      case "*":
                        return t * n;

                      case "/":
                        return t / n;

                      case "%":
                        return t % n;

                      case "==":
                        return t == n;

                      case "!=":
                        return t != n;
                    }
                }
                function n(t, e) {
                    var n = m[t];
                    if (n && e && e[n]) return e[n]();
                    switch (t) {
                      case "+":
                        return +e;

                      case "-":
                        return -e;
                    }
                }
                function i(t, e) {
                    return g.acorn.parse(t, e);
                }
                function r(t, e, n) {
                    function r(t) {
                        for (var e = 0, n = l.length; n > e; e++) {
                            var i = l[e];
                            if (i[0] >= t) break;
                            t += i[1];
                        }
                        return t;
                    }
                    function a(e) {
                        return t.substring(r(e.range[0]), r(e.range[1]));
                    }
                    function o(e, n) {
                        return t.substring(r(e.range[1]), r(n.range[0]));
                    }
                    function u(e, n) {
                        for (var i = r(e.range[0]), s = r(e.range[1]), a = 0, o = l.length - 1; o >= 0; o--) if (i > l[o][0]) {
                            a = o + 1;
                            break;
                        }
                        l.splice(a, 0, [ i, n.length - s + i ]), t = t.substring(0, i) + n + t.substring(s);
                    }
                    function h(t, e) {
                        if (t) {
                            for (var n in t) if ("range" !== n && "loc" !== n) {
                                var i = t[n];
                                if (Array.isArray(i)) for (var r = 0, s = i.length; s > r; r++) h(i[r], t); else i && "object" == typeof i && h(i, t);
                            }
                            switch (t.type) {
                              case "UnaryExpression":
                                if (t.operator in m && "Literal" !== t.argument.type) {
                                    var l = a(t.argument);
                                    u(t, '$__("' + t.operator + '", ' + l + ")");
                                }
                                break;

                              case "BinaryExpression":
                                if (t.operator in v && "Literal" !== t.left.type) {
                                    var c = a(t.left), f = a(t.right), d = o(t.left, t.right), _ = t.operator;
                                    u(t, "__$__(" + c + "," + d.replace(new RegExp("\\" + _), '"' + _ + '"') + ", " + f + ")");
                                }
                                break;

                              case "UpdateExpression":
                              case "AssignmentExpression":
                                var g = e && e.type;
                                if (!("ForStatement" === g || "BinaryExpression" === g && /^[=!<>]/.test(e.operator) || "MemberExpression" === g && e.computed)) if ("UpdateExpression" === t.type) {
                                    var l = a(t.argument), p = "__$__(" + l + ', "' + t.operator[0] + '", 1)', y = l + " = " + p;
                                    t.prefix || "AssignmentExpression" !== g && "VariableDeclarator" !== g || (a(e.left || e.id) === l && (y = p), 
                                    y = l + "; " + y), u(t, y);
                                } else if (/^.=$/.test(t.operator) && "Literal" !== t.left.type) {
                                    var c = a(t.left), f = a(t.right);
                                    u(t, c + " = __$__(" + c + ', "' + t.operator[0] + '", ' + f + ")");
                                }
                            }
                        }
                    }
                    if (!t) return "";
                    n = n || {}, e = e || "";
                    var l = [], c = null, f = s.browser, d = f.versionNumber, _ = /\r\n|\n|\r/gm;
                    if (f.chrome && d >= 30 || f.webkit && d >= 537.76 || f.firefox && d >= 23) {
                        var g = 0;
                        if (0 === window.location.href.indexOf(e)) {
                            var p = document.getElementsByTagName("html")[0].innerHTML;
                            g = p.substr(0, p.indexOf(t) + 1).match(_).length + 1;
                        }
                        var y = [ "AAAA" ];
                        y.length = (t.match(_) || []).length + 1 + g, c = {
                            version: 3,
                            file: e,
                            names: [],
                            mappings: y.join(";AACA"),
                            sourceRoot: "",
                            sources: [ e ]
                        };
                        var w = n.source || !e && t;
                        w && (c.sourcesContent = [ w ]);
                    }
                    return h(i(t, {
                        ranges: !0
                    })), c && (t = new Array(g + 1).join("\n") + t + "\n//# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(c)))) + "\n//# sourceURL=" + (e || "paperscript")), 
                    t;
                }
                function a(t, i, a, u) {
                    function h(e, n) {
                        for (var i in e) !n && /^_/.test(i) || !new RegExp("([\\b\\s\\W]|^)" + i.replace(/\$/g, "\\$") + "\\b").test(t) || (p.push(i), 
                        v.push(e[i]));
                    }
                    s = i;
                    var l, c = i.getView(), f = /\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(t) ? new et() : null, d = f ? f._events : [], g = [ "onFrame", "onResize" ].concat(d), p = [], v = [];
                    t = r(t, a, u), h({
                        __$__: e,
                        $__: n,
                        paper: i,
                        view: c,
                        tool: f
                    }, !0), h(i), g = o.each(g, function(e) {
                        new RegExp("\\s+" + e + "\\b").test(t) && (p.push(e), this.push(e + ": " + e));
                    }, []).join(", "), g && (t += "\nreturn { " + g + " };");
                    var m = s.browser;
                    if (m.chrome || m.firefox) {
                        var y = document.createElement("script"), w = document.head || document.getElementsByTagName("head")[0];
                        m.firefox && (t = "\n" + t), y.appendChild(document.createTextNode("paper._execute = function(" + p + ") {" + t + "\n}")), 
                        w.appendChild(y), l = s._execute, delete s._execute, w.removeChild(y);
                    } else l = Function(p, t);
                    var b = l.apply(i, v) || {};
                    o.each(d, function(t) {
                        var e = b[t];
                        e && (f[t] = e);
                    }), c && (b.onResize && c.setOnResize(b.onResize), c.emit("resize", {
                        size: c.size,
                        delta: new _()
                    }), b.onFrame && c.setOnFrame(b.onFrame), c.update());
                }
                function u(t) {
                    if (/^text\/(?:x-|)paperscript$/.test(t.type) && "true" !== h.getAttribute(t, "ignore")) {
                        var e = h.getAttribute(t, "canvas"), n = document.getElementById(e), i = t.src || t.getAttribute("data-src"), r = h.hasAttribute(t, "async"), s = "data-paper-scope";
                        if (!n) throw new Error('Unable to find canvas with id "' + e + '"');
                        var o = h.get(n.getAttribute(s)) || new h().setup(n);
                        return n.setAttribute(s, o._id), i ? nt.request("get", i, function(t) {
                            a(t, o, i);
                        }, r) : a(t.innerHTML, o, t.baseURI), t.setAttribute("data-paper-ignore", "true"), 
                        o;
                    }
                }
                function l() {
                    o.each(document.getElementsByTagName("script"), u);
                }
                function c(t) {
                    return t ? u(t) : l();
                }
                var f, d, g = this;
                !function(e, n) {
                    return "object" == typeof f && "object" == typeof t ? n(f) : "function" == typeof d && d.amd ? d([ "exports" ], n) : void n(e.acorn || (e.acorn = {}));
                }(this, function(t) {
                    "use strict";
                    function e(t) {
                        ct = t || {};
                        for (var e in gt) Object.prototype.hasOwnProperty.call(ct, e) || (ct[e] = gt[e]);
                        _t = ct.sourceFile || null;
                    }
                    function n(t, e) {
                        var n = pt(ft, t);
                        e += " (" + n.line + ":" + n.column + ")";
                        var i = new SyntaxError(e);
                        throw i.pos = t, i.loc = n, i.raisedAt = vt, i;
                    }
                    function i(t) {
                        function e(t) {
                            if (1 == t.length) return n += "return str === " + JSON.stringify(t[0]) + ";";
                            n += "switch(str){";
                            for (var e = 0; e < t.length; ++e) n += "case " + JSON.stringify(t[e]) + ":";
                            n += "return true}return false;";
                        }
                        t = t.split(" ");
                        var n = "", i = [];
                        t: for (var r = 0; r < t.length; ++r) {
                            for (var s = 0; s < i.length; ++s) if (i[s][0].length == t[r].length) {
                                i[s].push(t[r]);
                                continue t;
                            }
                            i.push([ t[r] ]);
                        }
                        if (i.length > 3) {
                            i.sort(function(t, e) {
                                return e.length - t.length;
                            }), n += "switch(str.length){";
                            for (var r = 0; r < i.length; ++r) {
                                var a = i[r];
                                n += "case " + a[0].length + ":", e(a);
                            }
                            n += "}";
                        } else e(t);
                        return new Function("str", n);
                    }
                    function r() {
                        this.line = Et, this.column = vt - Pt;
                    }
                    function s() {
                        Et = 1, vt = Pt = 0, St = !0, h();
                    }
                    function a(t, e) {
                        yt = vt, ct.locations && (bt = new r()), xt = t, h(), Ct = e, St = t.beforeExpr;
                    }
                    function o() {
                        var t = ct.onComment && ct.locations && new r(), e = vt, i = ft.indexOf("*/", vt += 2);
                        if (-1 === i && n(vt - 2, "Unterminated comment"), vt = i + 2, ct.locations) {
                            Je.lastIndex = e;
                            for (var s; (s = Je.exec(ft)) && s.index < vt; ) ++Et, Pt = s.index + s[0].length;
                        }
                        ct.onComment && ct.onComment(!0, ft.slice(e + 2, i), e, vt, t, ct.locations && new r());
                    }
                    function u() {
                        for (var t = vt, e = ct.onComment && ct.locations && new r(), n = ft.charCodeAt(vt += 2); dt > vt && 10 !== n && 13 !== n && 8232 !== n && 8233 !== n; ) ++vt, 
                        n = ft.charCodeAt(vt);
                        ct.onComment && ct.onComment(!1, ft.slice(t + 2, vt), t, vt, e, ct.locations && new r());
                    }
                    function h() {
                        for (;dt > vt; ) {
                            var t = ft.charCodeAt(vt);
                            if (32 === t) ++vt; else if (13 === t) {
                                ++vt;
                                var e = ft.charCodeAt(vt);
                                10 === e && ++vt, ct.locations && (++Et, Pt = vt);
                            } else if (10 === t || 8232 === t || 8233 === t) ++vt, ct.locations && (++Et, Pt = vt); else if (t > 8 && 14 > t) ++vt; else if (47 === t) {
                                var e = ft.charCodeAt(vt + 1);
                                if (42 === e) o(); else {
                                    if (47 !== e) break;
                                    u();
                                }
                            } else if (160 === t) ++vt; else {
                                if (!(t >= 5760 && We.test(String.fromCharCode(t)))) break;
                                ++vt;
                            }
                        }
                    }
                    function l() {
                        var t = ft.charCodeAt(vt + 1);
                        return t >= 48 && 57 >= t ? S(!0) : (++vt, a(we));
                    }
                    function c() {
                        var t = ft.charCodeAt(vt + 1);
                        return St ? (++vt, b()) : 61 === t ? w(Se, 2) : w(xe, 1);
                    }
                    function f() {
                        var t = ft.charCodeAt(vt + 1);
                        return 61 === t ? w(Se, 2) : w(Ve, 1);
                    }
                    function d(t) {
                        var e = ft.charCodeAt(vt + 1);
                        return e === t ? w(124 === t ? ke : Ie, 2) : 61 === e ? w(Se, 2) : w(124 === t ? Me : Te, 1);
                    }
                    function _() {
                        var t = ft.charCodeAt(vt + 1);
                        return 61 === t ? w(Se, 2) : w(Oe, 1);
                    }
                    function g(t) {
                        var e = ft.charCodeAt(vt + 1);
                        return e === t ? 45 == e && 62 == ft.charCodeAt(vt + 2) && Xe.test(ft.slice(kt, vt)) ? (vt += 3, 
                        u(), h(), y()) : w(Pe, 2) : 61 === e ? w(Se, 2) : w(Ee, 1);
                    }
                    function p(t) {
                        var e = ft.charCodeAt(vt + 1), n = 1;
                        return e === t ? (n = 62 === t && 62 === ft.charCodeAt(vt + 2) ? 3 : 2, 61 === ft.charCodeAt(vt + n) ? w(Se, n + 1) : w(Ne, n)) : 33 == e && 60 == t && 45 == ft.charCodeAt(vt + 2) && 45 == ft.charCodeAt(vt + 3) ? (vt += 4, 
                        u(), h(), y()) : (61 === e && (n = 61 === ft.charCodeAt(vt + 2) ? 3 : 2), w(Le, n));
                    }
                    function v(t) {
                        var e = ft.charCodeAt(vt + 1);
                        return 61 === e ? w(ze, 61 === ft.charCodeAt(vt + 2) ? 3 : 2) : w(61 === t ? Ce : Ae, 1);
                    }
                    function m(t) {
                        switch (t) {
                          case 46:
                            return l();

                          case 40:
                            return ++vt, a(ge);

                          case 41:
                            return ++vt, a(pe);

                          case 59:
                            return ++vt, a(me);

                          case 44:
                            return ++vt, a(ve);

                          case 91:
                            return ++vt, a(ce);

                          case 93:
                            return ++vt, a(fe);

                          case 123:
                            return ++vt, a(de);

                          case 125:
                            return ++vt, a(_e);

                          case 58:
                            return ++vt, a(ye);

                          case 63:
                            return ++vt, a(be);

                          case 48:
                            var e = ft.charCodeAt(vt + 1);
                            if (120 === e || 88 === e) return C();

                          case 49:
                          case 50:
                          case 51:
                          case 52:
                          case 53:
                          case 54:
                          case 55:
                          case 56:
                          case 57:
                            return S(!1);

                          case 34:
                          case 39:
                            return E(t);

                          case 47:
                            return c(t);

                          case 37:
                          case 42:
                            return f();

                          case 124:
                          case 38:
                            return d(t);

                          case 94:
                            return _();

                          case 43:
                          case 45:
                            return g(t);

                          case 60:
                          case 62:
                            return p(t);

                          case 61:
                          case 33:
                            return v(t);

                          case 126:
                            return w(Ae, 1);
                        }
                        return !1;
                    }
                    function y(t) {
                        if (t ? vt = mt + 1 : mt = vt, ct.locations && (wt = new r()), t) return b();
                        if (vt >= dt) return a(Bt);
                        var e = ft.charCodeAt(vt);
                        if (Ye(e) || 92 === e) return k();
                        var i = m(e);
                        if (i === !1) {
                            var s = String.fromCharCode(e);
                            if ("\\" === s || Ze.test(s)) return k();
                            n(vt, "Unexpected character '" + s + "'");
                        }
                        return i;
                    }
                    function w(t, e) {
                        var n = ft.slice(vt, vt + e);
                        vt += e, a(t, n);
                    }
                    function b() {
                        for (var t, e, i = "", r = vt; ;) {
                            vt >= dt && n(r, "Unterminated regular expression");
                            var s = ft.charAt(vt);
                            if (Xe.test(s) && n(r, "Unterminated regular expression"), t) t = !1; else {
                                if ("[" === s) e = !0; else if ("]" === s && e) e = !1; else if ("/" === s && !e) break;
                                t = "\\" === s;
                            }
                            ++vt;
                        }
                        var i = ft.slice(r, vt);
                        ++vt;
                        var o = A();
                        return o && !/^[gmsiy]*$/.test(o) && n(r, "Invalid regexp flag"), a(Nt, new RegExp(i, o));
                    }
                    function x(t, e) {
                        for (var n = vt, i = 0, r = 0, s = null == e ? 1 / 0 : e; s > r; ++r) {
                            var a, o = ft.charCodeAt(vt);
                            if (a = o >= 97 ? o - 97 + 10 : o >= 65 ? o - 65 + 10 : o >= 48 && 57 >= o ? o - 48 : 1 / 0, 
                            a >= t) break;
                            ++vt, i = i * t + a;
                        }
                        return vt === n || null != e && vt - n !== e ? null : i;
                    }
                    function C() {
                        vt += 2;
                        var t = x(16);
                        return null == t && n(mt + 2, "Expected hexadecimal number"), Ye(ft.charCodeAt(vt)) && n(vt, "Identifier directly after number"), 
                        a(Lt, t);
                    }
                    function S(t) {
                        var e = vt, i = !1, r = 48 === ft.charCodeAt(vt);
                        t || null !== x(10) || n(e, "Invalid number"), 46 === ft.charCodeAt(vt) && (++vt, 
                        x(10), i = !0);
                        var s = ft.charCodeAt(vt);
                        (69 === s || 101 === s) && (s = ft.charCodeAt(++vt), (43 === s || 45 === s) && ++vt, 
                        null === x(10) && n(e, "Invalid number"), i = !0), Ye(ft.charCodeAt(vt)) && n(vt, "Identifier directly after number");
                        var o, u = ft.slice(e, vt);
                        return i ? o = parseFloat(u) : r && 1 !== u.length ? /[89]/.test(u) || Tt ? n(e, "Invalid number") : o = parseInt(u, 8) : o = parseInt(u, 10), 
                        a(Lt, o);
                    }
                    function E(t) {
                        vt++;
                        for (var e = ""; ;) {
                            vt >= dt && n(mt, "Unterminated string constant");
                            var i = ft.charCodeAt(vt);
                            if (i === t) return ++vt, a(Vt, e);
                            if (92 === i) {
                                i = ft.charCodeAt(++vt);
                                var r = /^[0-7]+/.exec(ft.slice(vt, vt + 3));
                                for (r && (r = r[0]); r && parseInt(r, 8) > 255; ) r = r.slice(0, r.length - 1);
                                if ("0" === r && (r = null), ++vt, r) Tt && n(vt - 2, "Octal literal in strict mode"), 
                                e += String.fromCharCode(parseInt(r, 8)), vt += r.length - 1; else switch (i) {
                                  case 110:
                                    e += "\n";
                                    break;

                                  case 114:
                                    e += "\r";
                                    break;

                                  case 120:
                                    e += String.fromCharCode(P(2));
                                    break;

                                  case 117:
                                    e += String.fromCharCode(P(4));
                                    break;

                                  case 85:
                                    e += String.fromCharCode(P(8));
                                    break;

                                  case 116:
                                    e += "	";
                                    break;

                                  case 98:
                                    e += "\b";
                                    break;

                                  case 118:
                                    e += "\x0B";
                                    break;

                                  case 102:
                                    e += "\f";
                                    break;

                                  case 48:
                                    e += "\x00";
                                    break;

                                  case 13:
                                    10 === ft.charCodeAt(vt) && ++vt;

                                  case 10:
                                    ct.locations && (Pt = vt, ++Et);
                                    break;

                                  default:
                                    e += String.fromCharCode(i);
                                }
                            } else (13 === i || 10 === i || 8232 === i || 8233 === i) && n(mt, "Unterminated string constant"), 
                            e += String.fromCharCode(i), ++vt;
                        }
                    }
                    function P(t) {
                        var e = x(16, t);
                        return null === e && n(mt, "Bad character escape sequence"), e;
                    }
                    function A() {
                        Be = !1;
                        for (var t, e = !0, i = vt; ;) {
                            var r = ft.charCodeAt(vt);
                            if (Ke(r)) Be && (t += ft.charAt(vt)), ++vt; else {
                                if (92 !== r) break;
                                Be || (t = ft.slice(i, vt)), Be = !0, 117 != ft.charCodeAt(++vt) && n(vt, "Expecting Unicode escape sequence \\uXXXX"), 
                                ++vt;
                                var s = P(4), a = String.fromCharCode(s);
                                a || n(vt - 1, "Invalid Unicode escape"), (e ? Ye(s) : Ke(s)) || n(vt - 4, "Invalid Unicode escape"), 
                                t += a;
                            }
                            e = !1;
                        }
                        return Be ? t : ft.slice(i, vt);
                    }
                    function k() {
                        var t = A(), e = jt;
                        return Be || ($e(t) ? e = le[t] : (ct.forbidReserved && (3 === ct.ecmaVersion ? De : Re)(t) || Tt && qe(t)) && n(mt, "The keyword '" + t + "' is reserved")), 
                        a(e, t);
                    }
                    function I() {
                        At = mt, kt = yt, It = bt, y();
                    }
                    function M(t) {
                        if (Tt = t, vt = kt, ct.locations) for (;Pt > vt; ) Pt = ft.lastIndexOf("\n", Pt - 2) + 1, 
                        --Et;
                        h(), y();
                    }
                    function O() {
                        this.type = null, this.start = mt, this.end = null;
                    }
                    function T() {
                        this.start = wt, this.end = null, null !== _t && (this.source = _t);
                    }
                    function z() {
                        var t = new O();
                        return ct.locations && (t.loc = new T()), ct.ranges && (t.range = [ mt, 0 ]), t;
                    }
                    function L(t) {
                        var e = new O();
                        return e.start = t.start, ct.locations && (e.loc = new T(), e.loc.start = t.loc.start), 
                        ct.ranges && (e.range = [ t.range[0], 0 ]), e;
                    }
                    function N(t, e) {
                        return t.type = e, t.end = kt, ct.locations && (t.loc.end = It), ct.ranges && (t.range[1] = kt), 
                        t;
                    }
                    function V(t) {
                        return ct.ecmaVersion >= 5 && "ExpressionStatement" === t.type && "Literal" === t.expression.type && "use strict" === t.expression.value;
                    }
                    function j(t) {
                        return xt === t ? (I(), !0) : void 0;
                    }
                    function B() {
                        return !ct.strictSemicolons && (xt === Bt || xt === _e || Xe.test(ft.slice(kt, mt)));
                    }
                    function D() {
                        j(me) || B() || q();
                    }
                    function R(t) {
                        xt === t ? I() : q();
                    }
                    function q() {
                        n(mt, "Unexpected token");
                    }
                    function F(t) {
                        "Identifier" !== t.type && "MemberExpression" !== t.type && n(t.start, "Assigning to rvalue"), 
                        Tt && "Identifier" === t.type && Fe(t.name) && n(t.start, "Assigning to " + t.name + " in strict mode");
                    }
                    function $(t) {
                        At = kt = vt, ct.locations && (It = new r()), Mt = Tt = null, Ot = [], y();
                        var e = t || z(), n = !0;
                        for (t || (e.body = []); xt !== Bt; ) {
                            var i = W();
                            e.body.push(i), n && V(i) && M(!0), n = !1;
                        }
                        return N(e, "Program");
                    }
                    function W() {
                        (xt === xe || xt === Se && "/=" == Ct) && y(!0);
                        var t = xt, e = z();
                        switch (t) {
                          case Dt:
                          case Ft:
                            I();
                            var i = t === Dt;
                            j(me) || B() ? e.label = null : xt !== jt ? q() : (e.label = lt(), D());
                            for (var r = 0; r < Ot.length; ++r) {
                                var s = Ot[r];
                                if (null == e.label || s.name === e.label.name) {
                                    if (null != s.kind && (i || "loop" === s.kind)) break;
                                    if (e.label && i) break;
                                }
                            }
                            return r === Ot.length && n(e.start, "Unsyntactic " + t.keyword), N(e, i ? "BreakStatement" : "ContinueStatement");

                          case $t:
                            return I(), D(), N(e, "DebuggerStatement");

                          case Ht:
                            return I(), Ot.push(Qe), e.body = W(), Ot.pop(), R(ne), e.test = H(), D(), N(e, "DoWhileStatement");

                          case Gt:
                            if (I(), Ot.push(Qe), R(ge), xt === me) return Z(e, null);
                            if (xt === ee) {
                                var a = z();
                                return I(), X(a, !0), N(a, "VariableDeclaration"), 1 === a.declarations.length && j(he) ? G(e, a) : Z(e, a);
                            }
                            var a = J(!1, !0);
                            return j(he) ? (F(a), G(e, a)) : Z(e, a);

                          case Xt:
                            return I(), ut(e, !0);

                          case Jt:
                            return I(), e.test = H(), e.consequent = W(), e.alternate = j(Ut) ? W() : null, 
                            N(e, "IfStatement");

                          case Yt:
                            return Mt || n(mt, "'return' outside of function"), I(), j(me) || B() ? e.argument = null : (e.argument = J(), 
                            D()), N(e, "ReturnStatement");

                          case Kt:
                            I(), e.discriminant = H(), e.cases = [], R(de), Ot.push(tn);
                            for (var o, u; xt != _e; ) if (xt === Rt || xt === Wt) {
                                var h = xt === Rt;
                                o && N(o, "SwitchCase"), e.cases.push(o = z()), o.consequent = [], I(), h ? o.test = J() : (u && n(At, "Multiple default clauses"), 
                                u = !0, o.test = null), R(ye);
                            } else o || q(), o.consequent.push(W());
                            return o && N(o, "SwitchCase"), I(), Ot.pop(), N(e, "SwitchStatement");

                          case Qt:
                            return I(), Xe.test(ft.slice(kt, mt)) && n(kt, "Illegal newline after throw"), e.argument = J(), 
                            D(), N(e, "ThrowStatement");

                          case te:
                            if (I(), e.block = U(), e.handler = null, xt === qt) {
                                var l = z();
                                I(), R(ge), l.param = lt(), Tt && Fe(l.param.name) && n(l.param.start, "Binding " + l.param.name + " in strict mode"), 
                                R(pe), l.guard = null, l.body = U(), e.handler = N(l, "CatchClause");
                            }
                            return e.guardedHandlers = zt, e.finalizer = j(Zt) ? U() : null, e.handler || e.finalizer || n(e.start, "Missing catch or finally clause"), 
                            N(e, "TryStatement");

                          case ee:
                            return I(), X(e), D(), N(e, "VariableDeclaration");

                          case ne:
                            return I(), e.test = H(), Ot.push(Qe), e.body = W(), Ot.pop(), N(e, "WhileStatement");

                          case ie:
                            return Tt && n(mt, "'with' in strict mode"), I(), e.object = H(), e.body = W(), 
                            N(e, "WithStatement");

                          case de:
                            return U();

                          case me:
                            return I(), N(e, "EmptyStatement");

                          default:
                            var c = Ct, f = J();
                            if (t === jt && "Identifier" === f.type && j(ye)) {
                                for (var r = 0; r < Ot.length; ++r) Ot[r].name === c && n(f.start, "Label '" + c + "' is already declared");
                                var d = xt.isLoop ? "loop" : xt === Kt ? "switch" : null;
                                return Ot.push({
                                    name: c,
                                    kind: d
                                }), e.body = W(), Ot.pop(), e.label = f, N(e, "LabeledStatement");
                            }
                            return e.expression = f, D(), N(e, "ExpressionStatement");
                        }
                    }
                    function H() {
                        R(ge);
                        var t = J();
                        return R(pe), t;
                    }
                    function U(t) {
                        var e, n = z(), i = !0, r = !1;
                        for (n.body = [], R(de); !j(_e); ) {
                            var s = W();
                            n.body.push(s), i && t && V(s) && (e = r, M(r = !0)), i = !1;
                        }
                        return r && !e && M(!1), N(n, "BlockStatement");
                    }
                    function Z(t, e) {
                        return t.init = e, R(me), t.test = xt === me ? null : J(), R(me), t.update = xt === pe ? null : J(), 
                        R(pe), t.body = W(), Ot.pop(), N(t, "ForStatement");
                    }
                    function G(t, e) {
                        return t.left = e, t.right = J(), R(pe), t.body = W(), Ot.pop(), N(t, "ForInStatement");
                    }
                    function X(t, e) {
                        for (t.declarations = [], t.kind = "var"; ;) {
                            var i = z();
                            if (i.id = lt(), Tt && Fe(i.id.name) && n(i.id.start, "Binding " + i.id.name + " in strict mode"), 
                            i.init = j(Ce) ? J(!0, e) : null, t.declarations.push(N(i, "VariableDeclarator")), 
                            !j(ve)) break;
                        }
                        return t;
                    }
                    function J(t, e) {
                        var n = Y(e);
                        if (!t && xt === ve) {
                            var i = L(n);
                            for (i.expressions = [ n ]; j(ve); ) i.expressions.push(Y(e));
                            return N(i, "SequenceExpression");
                        }
                        return n;
                    }
                    function Y(t) {
                        var e = K(t);
                        if (xt.isAssign) {
                            var n = L(e);
                            return n.operator = Ct, n.left = e, I(), n.right = Y(t), F(e), N(n, "AssignmentExpression");
                        }
                        return e;
                    }
                    function K(t) {
                        var e = Q(t);
                        if (j(be)) {
                            var n = L(e);
                            return n.test = e, n.consequent = J(!0), R(ye), n.alternate = J(!0, t), N(n, "ConditionalExpression");
                        }
                        return e;
                    }
                    function Q(t) {
                        return tt(et(), -1, t);
                    }
                    function tt(t, e, n) {
                        var i = xt.binop;
                        if (null != i && (!n || xt !== he) && i > e) {
                            var r = L(t);
                            r.left = t, r.operator = Ct, I(), r.right = tt(et(), i, n);
                            var s = N(r, /&&|\|\|/.test(r.operator) ? "LogicalExpression" : "BinaryExpression");
                            return tt(s, e, n);
                        }
                        return t;
                    }
                    function et() {
                        if (xt.prefix) {
                            var t = z(), e = xt.isUpdate;
                            return t.operator = Ct, t.prefix = !0, St = !0, I(), t.argument = et(), e ? F(t.argument) : Tt && "delete" === t.operator && "Identifier" === t.argument.type && n(t.start, "Deleting local variable in strict mode"), 
                            N(t, e ? "UpdateExpression" : "UnaryExpression");
                        }
                        for (var i = nt(); xt.postfix && !B(); ) {
                            var t = L(i);
                            t.operator = Ct, t.prefix = !1, t.argument = i, F(i), I(), i = N(t, "UpdateExpression");
                        }
                        return i;
                    }
                    function nt() {
                        return it(rt());
                    }
                    function it(t, e) {
                        if (j(we)) {
                            var n = L(t);
                            return n.object = t, n.property = lt(!0), n.computed = !1, it(N(n, "MemberExpression"), e);
                        }
                        if (j(ce)) {
                            var n = L(t);
                            return n.object = t, n.property = J(), n.computed = !0, R(fe), it(N(n, "MemberExpression"), e);
                        }
                        if (!e && j(ge)) {
                            var n = L(t);
                            return n.callee = t, n.arguments = ht(pe, !1), it(N(n, "CallExpression"), e);
                        }
                        return t;
                    }
                    function rt() {
                        switch (xt) {
                          case se:
                            var t = z();
                            return I(), N(t, "ThisExpression");

                          case jt:
                            return lt();

                          case Lt:
                          case Vt:
                          case Nt:
                            var t = z();
                            return t.value = Ct, t.raw = ft.slice(mt, yt), I(), N(t, "Literal");

                          case ae:
                          case oe:
                          case ue:
                            var t = z();
                            return t.value = xt.atomValue, t.raw = xt.keyword, I(), N(t, "Literal");

                          case ge:
                            var e = wt, n = mt;
                            I();
                            var i = J();
                            return i.start = n, i.end = yt, ct.locations && (i.loc.start = e, i.loc.end = bt), 
                            ct.ranges && (i.range = [ n, yt ]), R(pe), i;

                          case ce:
                            var t = z();
                            return I(), t.elements = ht(fe, !0, !0), N(t, "ArrayExpression");

                          case de:
                            return at();

                          case Xt:
                            var t = z();
                            return I(), ut(t, !1);

                          case re:
                            return st();

                          default:
                            q();
                        }
                    }
                    function st() {
                        var t = z();
                        return I(), t.callee = it(rt(), !0), t.arguments = j(ge) ? ht(pe, !1) : zt, N(t, "NewExpression");
                    }
                    function at() {
                        var t = z(), e = !0, i = !1;
                        for (t.properties = [], I(); !j(_e); ) {
                            if (e) e = !1; else if (R(ve), ct.allowTrailingCommas && j(_e)) break;
                            var r, s = {
                                key: ot()
                            }, a = !1;
                            if (j(ye) ? (s.value = J(!0), r = s.kind = "init") : ct.ecmaVersion >= 5 && "Identifier" === s.key.type && ("get" === s.key.name || "set" === s.key.name) ? (a = i = !0, 
                            r = s.kind = s.key.name, s.key = ot(), xt !== ge && q(), s.value = ut(z(), !1)) : q(), 
                            "Identifier" === s.key.type && (Tt || i)) for (var o = 0; o < t.properties.length; ++o) {
                                var u = t.properties[o];
                                if (u.key.name === s.key.name) {
                                    var h = r == u.kind || a && "init" === u.kind || "init" === r && ("get" === u.kind || "set" === u.kind);
                                    h && !Tt && "init" === r && "init" === u.kind && (h = !1), h && n(s.key.start, "Redefinition of property");
                                }
                            }
                            t.properties.push(s);
                        }
                        return N(t, "ObjectExpression");
                    }
                    function ot() {
                        return xt === Lt || xt === Vt ? rt() : lt(!0);
                    }
                    function ut(t, e) {
                        xt === jt ? t.id = lt() : e ? q() : t.id = null, t.params = [];
                        var i = !0;
                        for (R(ge); !j(pe); ) i ? i = !1 : R(ve), t.params.push(lt());
                        var r = Mt, s = Ot;
                        if (Mt = !0, Ot = [], t.body = U(!0), Mt = r, Ot = s, Tt || t.body.body.length && V(t.body.body[0])) for (var a = t.id ? -1 : 0; a < t.params.length; ++a) {
                            var o = 0 > a ? t.id : t.params[a];
                            if ((qe(o.name) || Fe(o.name)) && n(o.start, "Defining '" + o.name + "' in strict mode"), 
                            a >= 0) for (var u = 0; a > u; ++u) o.name === t.params[u].name && n(o.start, "Argument name clash in strict mode");
                        }
                        return N(t, e ? "FunctionDeclaration" : "FunctionExpression");
                    }
                    function ht(t, e, n) {
                        for (var i = [], r = !0; !j(t); ) {
                            if (r) r = !1; else if (R(ve), e && ct.allowTrailingCommas && j(t)) break;
                            n && xt === ve ? i.push(null) : i.push(J(!0));
                        }
                        return i;
                    }
                    function lt(t) {
                        var e = z();
                        return e.name = xt === jt ? Ct : t && !ct.forbidReserved && xt.keyword || q(), St = !1, 
                        I(), N(e, "Identifier");
                    }
                    t.version = "0.4.0";
                    var ct, ft, dt, _t;
                    t.parse = function(t, n) {
                        return ft = String(t), dt = ft.length, e(n), s(), $(ct.program);
                    };
                    var gt = t.defaultOptions = {
                        ecmaVersion: 5,
                        strictSemicolons: !1,
                        allowTrailingCommas: !0,
                        forbidReserved: !1,
                        locations: !1,
                        onComment: null,
                        ranges: !1,
                        program: null,
                        sourceFile: null
                    }, pt = t.getLineInfo = function(t, e) {
                        for (var n = 1, i = 0; ;) {
                            Je.lastIndex = i;
                            var r = Je.exec(t);
                            if (!(r && r.index < e)) break;
                            ++n, i = r.index + r[0].length;
                        }
                        return {
                            line: n,
                            column: e - i
                        };
                    };
                    t.tokenize = function(t, n) {
                        function i(t) {
                            return y(t), r.start = mt, r.end = yt, r.startLoc = wt, r.endLoc = bt, r.type = xt, 
                            r.value = Ct, r;
                        }
                        ft = String(t), dt = ft.length, e(n), s();
                        var r = {};
                        return i.jumpTo = function(t, e) {
                            if (vt = t, ct.locations) {
                                Et = 1, Pt = Je.lastIndex = 0;
                                for (var n; (n = Je.exec(ft)) && n.index < t; ) ++Et, Pt = n.index + n[0].length;
                            }
                            St = e, h();
                        }, i;
                    };
                    var vt, mt, yt, wt, bt, xt, Ct, St, Et, Pt, At, kt, It, Mt, Ot, Tt, zt = [], Lt = {
                        type: "num"
                    }, Nt = {
                        type: "regexp"
                    }, Vt = {
                        type: "string"
                    }, jt = {
                        type: "name"
                    }, Bt = {
                        type: "eof"
                    }, Dt = {
                        keyword: "break"
                    }, Rt = {
                        keyword: "case",
                        beforeExpr: !0
                    }, qt = {
                        keyword: "catch"
                    }, Ft = {
                        keyword: "continue"
                    }, $t = {
                        keyword: "debugger"
                    }, Wt = {
                        keyword: "default"
                    }, Ht = {
                        keyword: "do",
                        isLoop: !0
                    }, Ut = {
                        keyword: "else",
                        beforeExpr: !0
                    }, Zt = {
                        keyword: "finally"
                    }, Gt = {
                        keyword: "for",
                        isLoop: !0
                    }, Xt = {
                        keyword: "function"
                    }, Jt = {
                        keyword: "if"
                    }, Yt = {
                        keyword: "return",
                        beforeExpr: !0
                    }, Kt = {
                        keyword: "switch"
                    }, Qt = {
                        keyword: "throw",
                        beforeExpr: !0
                    }, te = {
                        keyword: "try"
                    }, ee = {
                        keyword: "var"
                    }, ne = {
                        keyword: "while",
                        isLoop: !0
                    }, ie = {
                        keyword: "with"
                    }, re = {
                        keyword: "new",
                        beforeExpr: !0
                    }, se = {
                        keyword: "this"
                    }, ae = {
                        keyword: "null",
                        atomValue: null
                    }, oe = {
                        keyword: "true",
                        atomValue: !0
                    }, ue = {
                        keyword: "false",
                        atomValue: !1
                    }, he = {
                        keyword: "in",
                        binop: 7,
                        beforeExpr: !0
                    }, le = {
                        "break": Dt,
                        "case": Rt,
                        "catch": qt,
                        "continue": Ft,
                        "debugger": $t,
                        "default": Wt,
                        "do": Ht,
                        "else": Ut,
                        "finally": Zt,
                        "for": Gt,
                        "function": Xt,
                        "if": Jt,
                        "return": Yt,
                        "switch": Kt,
                        "throw": Qt,
                        "try": te,
                        "var": ee,
                        "while": ne,
                        "with": ie,
                        "null": ae,
                        "true": oe,
                        "false": ue,
                        "new": re,
                        "in": he,
                        "instanceof": {
                            keyword: "instanceof",
                            binop: 7,
                            beforeExpr: !0
                        },
                        "this": se,
                        "typeof": {
                            keyword: "typeof",
                            prefix: !0,
                            beforeExpr: !0
                        },
                        "void": {
                            keyword: "void",
                            prefix: !0,
                            beforeExpr: !0
                        },
                        "delete": {
                            keyword: "delete",
                            prefix: !0,
                            beforeExpr: !0
                        }
                    }, ce = {
                        type: "[",
                        beforeExpr: !0
                    }, fe = {
                        type: "]"
                    }, de = {
                        type: "{",
                        beforeExpr: !0
                    }, _e = {
                        type: "}"
                    }, ge = {
                        type: "(",
                        beforeExpr: !0
                    }, pe = {
                        type: ")"
                    }, ve = {
                        type: ",",
                        beforeExpr: !0
                    }, me = {
                        type: ";",
                        beforeExpr: !0
                    }, ye = {
                        type: ":",
                        beforeExpr: !0
                    }, we = {
                        type: "."
                    }, be = {
                        type: "?",
                        beforeExpr: !0
                    }, xe = {
                        binop: 10,
                        beforeExpr: !0
                    }, Ce = {
                        isAssign: !0,
                        beforeExpr: !0
                    }, Se = {
                        isAssign: !0,
                        beforeExpr: !0
                    }, Ee = {
                        binop: 9,
                        prefix: !0,
                        beforeExpr: !0
                    }, Pe = {
                        postfix: !0,
                        prefix: !0,
                        isUpdate: !0
                    }, Ae = {
                        prefix: !0,
                        beforeExpr: !0
                    }, ke = {
                        binop: 1,
                        beforeExpr: !0
                    }, Ie = {
                        binop: 2,
                        beforeExpr: !0
                    }, Me = {
                        binop: 3,
                        beforeExpr: !0
                    }, Oe = {
                        binop: 4,
                        beforeExpr: !0
                    }, Te = {
                        binop: 5,
                        beforeExpr: !0
                    }, ze = {
                        binop: 6,
                        beforeExpr: !0
                    }, Le = {
                        binop: 7,
                        beforeExpr: !0
                    }, Ne = {
                        binop: 8,
                        beforeExpr: !0
                    }, Ve = {
                        binop: 10,
                        beforeExpr: !0
                    };
                    t.tokTypes = {
                        bracketL: ce,
                        bracketR: fe,
                        braceL: de,
                        braceR: _e,
                        parenL: ge,
                        parenR: pe,
                        comma: ve,
                        semi: me,
                        colon: ye,
                        dot: we,
                        question: be,
                        slash: xe,
                        eq: Ce,
                        name: jt,
                        eof: Bt,
                        num: Lt,
                        regexp: Nt,
                        string: Vt
                    };
                    for (var je in le) t.tokTypes["_" + je] = le[je];
                    var Be, De = i("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"), Re = i("class enum extends super const export import"), qe = i("implements interface let package private protected public static yield"), Fe = i("eval arguments"), $e = i("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"), We = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/, He = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Ue = "̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ؚؠ-ىٲ-ۓۧ-ۨۻ-ۼܰ-݊ࠀ-ࠔࠛ-ࠣࠥ-ࠧࠩ-࠭ࡀ-ࡗࣤ-ࣾऀ-ःऺ-़ा-ॏ॑-ॗॢ-ॣ०-९ঁ-ঃ়া-ৄেৈৗয়-ৠਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢ-ૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୟ-ୠ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఁ-ఃె-ైొ-్ౕౖౢ-ౣ౦-౯ಂಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢ-ೣ೦-೯ംഃെ-ൈൗൢ-ൣ൦-൯ංඃ්ා-ුූෘ-ෟෲෳิ-ฺเ-ๅ๐-๙ິ-ູ່-ໍ໐-໙༘༙༠-༩༹༵༷ཁ-ཇཱ-྄྆-྇ྍ-ྗྙ-ྼ࿆က-ဩ၀-၉ၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜎ-ᜐᜠ-ᜰᝀ-ᝐᝲᝳក-ឲ៝០-៩᠋-᠍᠐-᠙ᤠ-ᤫᤰ-᤻ᥑ-ᥭᦰ-ᧀᧈ-ᧉ᧐-᧙ᨀ-ᨕᨠ-ᩓ᩠-᩿᩼-᪉᪐-᪙ᭆ-ᭋ᭐-᭙᭫-᭳᮰-᮹᯦-᯳ᰀ-ᰢ᱀-᱉ᱛ-ᱽ᳐-᳒ᴀ-ᶾḁ-ἕ‌‍‿⁀⁔⃐-⃥⃜⃡-⃰ⶁ-ⶖⷠ-ⷿ〡-〨゙゚Ꙁ-ꙭꙴ-꙽ꚟ꛰-꛱ꟸ-ꠀ꠆ꠋꠣ-ꠧꢀ-ꢁꢴ-꣄꣐-꣙ꣳ-ꣷ꤀-꤉ꤦ-꤭ꤰ-ꥅꦀ-ꦃ꦳-꧀ꨀ-ꨧꩀ-ꩁꩌ-ꩍ꩐-꩙ꩻꫠ-ꫩꫲ-ꫳꯀ-ꯡ꯬꯭꯰-꯹ﬠ-ﬨ︀-️︠-︦︳︴﹍-﹏０-９＿", Ze = new RegExp("[" + He + "]"), Ge = new RegExp("[" + He + Ue + "]"), Xe = /[\n\r\u2028\u2029]/, Je = /\r\n|[\n\r\u2028\u2029]/g, Ye = t.isIdentifierStart = function(t) {
                        return 65 > t ? 36 === t : 91 > t ? !0 : 97 > t ? 95 === t : 123 > t ? !0 : t >= 170 && Ze.test(String.fromCharCode(t));
                    }, Ke = t.isIdentifierChar = function(t) {
                        return 48 > t ? 36 === t : 58 > t ? !0 : 65 > t ? !1 : 91 > t ? !0 : 97 > t ? 95 === t : 123 > t ? !0 : t >= 170 && Ge.test(String.fromCharCode(t));
                    }, Qe = {
                        kind: "loop"
                    }, tn = {
                        kind: "switch"
                    };
                });
                var v = {
                    "+": "__add",
                    "-": "__subtract",
                    "*": "__multiply",
                    "/": "__divide",
                    "%": "__modulo",
                    "==": "equals",
                    "!=": "equals"
                }, m = {
                    "-": "__negate",
                    "+": null
                }, y = o.each([ "add", "subtract", "multiply", "divide", "modulo", "negate" ], function(t) {
                    this["__" + t] = "#" + t;
                }, {});
                return _.inject(y), p.inject(y), F.inject(y), "complete" === document.readyState ? setTimeout(l) : Z.add(window, {
                    load: l
                }), {
                    compile: r,
                    execute: a,
                    load: c,
                    parse: i
                };
            }.call(this), s = new (h.inject(o.exports, {
                enumerable: !0,
                Base: o,
                Numerical: f,
                Key: K
            }))(), i = s, r = "function" == typeof i ? i.call(e, n, e, t) : i, !(r !== a && (t.exports = r)), 
            s;
        }();
    },
    223: function(t, e) {
        "use strict";
        function n(t) {
            return "string" == typeof t ? document.createTextNode(t) : t;
        }
        function i() {
            var t = this.parentNode;
            t && t.removeChild(this);
        }
        !function() {
            function t(t) {
                var e, i, r;
                if (t && (r = t.length), !r) throw new Error("No node was specified (DOM Exception 8)");
                if (1 === r) return n(t[0]);
                for (e = document.createDocumentFragment(), i = 0; r > i; i++) e.appendChild(n(t[i]));
                return e;
            }
            var e = Element.prototype, r = e.after && e.append && e.before && e.prepend && e.remove && e.replace;
            r || (e.prepend = function() {
                this.insertBefore(t(arguments), this.firstChild);
            }, e.append = function() {
                this.appendChild(t(arguments));
            }, e.before = function() {
                var e = this.parentNode;
                e && e.insertBefore(t(arguments), this);
            }, e.after = function() {
                var e = this.parentNode;
                e && e.insertBefore(t(arguments), this.nextSibling);
            }, e.replace = function() {
                var e = this.parentNode;
                e && e.replaceChild(t(arguments), this);
            }, e.remove = i);
        }();
    },
    224: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t) {
            var e = this;
            this.root.visible = !0, clearTimeout(this.timout);
            var n = 100 * t | 0, i = new l["default"].Rectangle(this.size.x + this.path.mw, this.size.y + this.path.mh, this.size.w - 2 * this.path.mw, (this.size.h - 20 - 2 * this.path.mh) * (1 - t) | 0);
            i.height < 1 && (i.height = 1), this.path_white.setBounds(i), this.text.content = n + "%", 
            l["default"].view.draw(), this.timout = setTimeout(function() {
                e.root.visible = !1, l["default"].view.draw();
            }, 500);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = n(56), a = i(s), o = n(57), u = i(o), h = n(165), l = i(h), c = 60, f = function() {
            function t(e) {
                (0, a["default"])(this, t), this.size = {
                    x: 20,
                    y: 20,
                    w: c,
                    h: 3 * c
                };
                var n = this.size;
                this.path = {
                    mw: 23,
                    mh: 15
                };
                var i = this.path;
                this.root = new l["default"].Group();
                var r = new l["default"].Rectangle(n.x, n.y, n.w, n.h), s = new l["default"].Shape.Rectangle(r);
                s.fillColor = "black", this.root.addChild(s);
                var o = new l["default"].Rectangle(n.x + i.mw, n.y + i.mh, n.w - 2 * i.mw, n.h - 20 - 2 * i.mh);
                this.path_blue = new l["default"].Shape.Rectangle(o), this.path_blue.fillColor = "#000080", 
                this.root.addChild(this.path_blue);
                var u = 100 * e | 0, h = new l["default"].Rectangle(n.x + i.mw, n.y + i.mh, n.w - 2 * i.mw, (n.h - 20 - 2 * i.mh) * (1 - e) | 0);
                this.path_white = new l["default"].Shape.Rectangle(h), this.path_white.fillColor = "white", 
                this.root.addChild(this.path_white), this.text = new l["default"].PointText({
                    point: new l["default"].Point(n.x + n.w / 2, n.w + (n.h - 25 - 2 * i.mh)),
                    content: u + "%",
                    fillColor: "white",
                    fontFamily: "Verdana",
                    fontWeight: "bold",
                    fontSize: 13,
                    justification: "center"
                }), this.root.addChild(this.text), this.root.visible = !1, window.vcg = this.root;
                var f = new l["default"].Shape.Rectangle(new l["default"].Rectangle(n.x + i.mw, n.y + i.mh, n.w - 2 * i.mw, 1));
                f.fillColor = "black", this.root.addChild(f), l["default"].view.draw();
            }
            return (0, u["default"])(t, [ {
                key: "update",
                value: r
            } ]), t;
        }();
        e["default"] = f;
    },
    225: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t) {
            this.currentDialogue = v["default"].find(v["default"].propEq("name", t))(this.dialogue), 
            this.currentPhrase = this.currentDialogue.array[0];
        }
        function s(t) {
            return this.currentDialogue.array[t];
        }
        function a(t) {
            return t.say;
        }
        function o() {
            return this.currentPhrase.answer.map(a);
        }
        function u() {
            return this.currentPhrase ? null != this.currentPhrase.answer : !1;
        }
        function h() {
            return this.currentPhrase;
        }
        function l() {
            return this.loc < this.currentDialogue.array.length() - 1;
        }
        function c(t) {
            if (this.currentPhrase.answer) {
                if (!(arguments.length > 0)) throw "This transition to the next phrase requires an argument";
                if (!(t <= this.currentPhrase.answer.length)) throw "This answer does not exists";
                if (this.currentPhrase.answer[t].scene) return this.currentPhrase.answer[t].scene;
                this.loc = this.currentPhrase.answer[t].loc, this.currentPhrase = this.phrase(this.currentPhrase.answer[t].loc);
            } else if (this.currentPhrase.loc) this.loc = this.currentPhrase.loc, this.currentPhrase = this.phrase(this.currentPhrase.loc); else if (this.currentPhrase.scene) return this.currentPhrase.scene;
            console.log(this.loc);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var f = n(56), d = i(f), _ = n(57), g = i(_), p = n(47), v = i(p), m = [ {
            name: "intro_dialog",
            array: [ {
                who: "Карбон",
                say: "Кой си ти?",
                loc: 1
            }, {
                who: "Графен",
                say: "Аз съм материал създаден от един ред въглеродни атоми и имам уникални свойства!",
                loc: 2
            }, {
                who: "Карбон",
                say: "Хаха, за много по-полезен ли се мислиш?",
                loc: 3
            }, {
                who: "Графен",
                answer: [ {
                    say: "Покажи свойствата си.",
                    loc: 4
                }, {
                    say: "Опитай да решиш всичко с думи.",
                    loc: 6
                }, {
                    say: "Игнорирай го.",
                    loc: 9
                } ]
            }, {
                who: "Графен",
                say: "Да.",
                loc: 5
            }, {
                who: "Карбон",
                say: "Не мисля, че е възможно да имаш по-добри характеристики от моите.",
                loc: 13
            }, {
                who: "Графен",
                say: "Няма смисъл да спорим.",
                loc: 7
            }, {
                who: "Карбон",
                say: "Да прав си!",
                loc: 8
            }, {
                who: "Графен",
                answer: [ {
                    say: "Остави го да говори.",
                    loc: 16
                }, {
                    say: "Все пак му покажи възможностите си.",
                    loc: 18
                } ]
            }, {
                who: "Карбон",
                say: "Защо ме игнорираш, да не ме имаш за много по-слаб?",
                loc: 10
            }, {
                who: "Карбон",
                say: "Сигурно те е страх, че не можеш да покажеш нищо кой знае какво!?",
                loc: 11
            }, {
                who: "Графен",
                say: "Не искам да навлизам в излишни конфликти.",
                loc: 12
            }, {
                who: "Карбон",
                say: "Така ли? Покажи ми какво можеш тогава.",
                loc: 13
            }, {
                who: "Графен",
                say: "С моята невероятната здравина от 1100 GPa, ще спра метеорита летящ към земята.",
                loc: 14
            }, {
                who: "Карбон",
                say: "Не ми трябваш, аз мога да се справя сам.",
                scene: "mech_force"
            }, {
                who: "Графен",
                say: "...",
                scene: "mech_force"
            }, {
                who: "Карбон",
                say: "Почуствах се застрашен. Не искам да повярвам, че има по-полезна вариация на въглерода от мен.",
                loc: 17
            }, {
                who: "Карбон",
                say: "Аз съм здрав, лек и всичко което някой би искал.",
                loc: 18
            }, {
                who: "Графен",
                say: "Ами да, но е факт, че аз съм по-електропроводим, здрав и с по-голяма енергийна плътност",
                loc: 19
            }, {
                who: "Карбон",
                say: "Разбира се!",
                loc: 20
            }, {
                who: "Графен",
                say: "Например благодарение на моята електропроводимост от\n 1738 siemens/m мога да заредя телефон за секунди!",
                scene: "conductivity_good"
            }, {
                who: "Графен",
                say: "С моята невероятната здравина от 1100 GPa ще спра метеорита летящ към земята!",
                loc: 13
            } ]
        }, {
            name: "asteroid_dialog",
            array: [ {
                who: "Карбон",
                say: "Просто изкара късмет, че нямах време да направя стената по-голяма.",
                loc: 1
            }, {
                who: "Графен",
                say: "Дали? Или просто аз съм по-здравия?",
                loc: 2
            }, {
                who: "Карбон",
                say: "Да видим другите ти свойства тогава.",
                loc: 3
            }, {
                who: "Графен",
                say: "Както пожелаеш.",
                scene: "compete_hard"
            } ]
        }, {
            name: "compete_hard_dialog",
            array: [ {
                who: "Карбон",
                say: "Чакам. ",
                loc: 1
            }, {
                who: "Графен",
                answer: [ {
                    say: "Покажи - електропроводимост\n от 1738 siemens/m.",
                    loc: 2
                }, {
                    say: "Покажи - енергийна плътност\n от 75 F/g и 31·9 Wh/kg.",
                    loc: 3
                } ]
            }, {
                who: "Графен",
                say: "Ето виж!",
                scene: "conductivity"
            }, {
                who: "Графен",
                say: "A знаеше ли, че бaтерия и акумулатор, направена с моята помощ,\n издържа в пъти повече от нормална батерия?",
                scene: "electrical_density"
            } ]
        }, {
            name: "good_dialog",
            array: [ {
                who: "Графен",
                say: "A също така, бaтерия и акумулатор, направена с моята помощ,\n издържа в пъти повече от нормална батерия.",
                scene: "electrical_density_good"
            } ]
        }, {
            name: "ed_c_dialog",
            array: [ {
                who: "Графен",
                say: "А виж какво мога, благодарение на моята електропроводимост от 1738 siemens/m.",
                scene: "conductivity_2"
            } ]
        }, {
            name: "c_c_dialog",
            array: [ {
                who: "Графен",
                say: "А виж какво мога, благодарение на моята енергийна плътност от 75 F/g и 31·9 Wh/kg.\n Заради нея, могат да се направят много по издържливи батерии и акумулатори.",
                scene: "electrical_density_2"
            } ]
        }, {
            name: "ending_dialog_1",
            array: [ {
                who: "Карбон",
                say: "Добре признавам, че си по-полезен в повечето ситуации!",
                scene: "end_true"
            } ]
        }, {
            name: "ending_dialog_2",
            array: [ {
                who: "Карбон",
                say: "Разбирам и признавам, че си по-полезен!",
                scene: "end_true"
            } ]
        } ];
        window.d = m;
        var y = function() {
            function t() {
                (0, d["default"])(this, t), this.dialogue = m;
            }
            return (0, g["default"])(t, [ {
                key: "select",
                value: r
            }, {
                key: "phrase",
                value: s
            }, {
                key: "choices",
                value: o
            }, {
                key: "hasChoices",
                value: u
            }, {
                key: "say",
                value: h
            }, {
                key: "hasNext",
                value: l
            }, {
                key: "next",
                value: c
            } ]), t;
        }();
        e["default"] = y;
    },
    226: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t) {
            var e = E["default"].find(E["default"].propEq("src", t.src))(I);
            if (null != e) t.video = e.video; else {
                var n = document.createElement("video");
                "vid/Background.mp4" == t.src && (n.loop = !0), n.src = t.src, I.push({
                    src: t.src,
                    video: n
                }), t.video = n;
            }
        }
        function s() {
            return E["default"].find(E["default"].propEq("src", "vid/Background.mp4"))(I);
        }
        function a(t) {
            return E["default"].find(E["default"].propEq("scene", t))(this.story);
        }
        function o(t) {
            return null != this.scene(t);
        }
        function u(t) {
            return t.show;
        }
        function h() {
            return null != this.current.dialogue ? this.dialogue.hasChoices() ? this.dialogue.choices() : this.dialogue.say() : null != this.current.choice ? this.current.choice.map(u) : [];
        }
        function l() {
            return null != this.current.choice || this.dialogue.hasChoices();
        }
        function c(t) {
            this.showDialogue = t;
        }
        function f() {
            return this.showDialogue;
        }
        function d() {
            var t = this;
            return this.current.choice ? this.current.choice.map(function(e) {
                return t.scene(e.scene);
            }) : [ this.scene(this.current.next) ];
        }
        function _(t, e) {
            this.exists(t) && (this.scene(t).onBefore = e);
        }
        function g(t) {
            this.exists(t) && delete this.scene(t).onBefore;
        }
        function p(t, e) {
            this.exists(t) && (this.scene(t).onAfter = e);
        }
        function v(t) {
            this.exists(t) && delete this.scene(t).onAfter;
        }
        function m(t) {
            null != t && (null != this.current.onAfter && this.current.onAfter(), this.current = this.scene(t), 
            null != this.current.dialogue ? (this.dialogue.select(this.current.dialogue), this.showDialogue = !0) : this.showDialogue = !1, 
            null != this.current.onBefore && this.current.onBefore());
        }
        function y(t) {
            if (null != this.current.dialogue) {
                var e = this.dialogue.next(t);
                this.switchTo(e);
            } else this.switchTo(this.current.next);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var w = n(56), b = i(w), x = n(57), C = i(x), S = n(47), E = i(S), P = n(225), A = i(P), k = [ {
            scene: "intro",
            src: "vid/Intro.mp4",
            next: "conflict"
        }, {
            scene: "conflict",
            src: "vid/Background.mp4",
            dialogue: "intro_dialog"
        }, {
            scene: "mech_force",
            src: "vid/Meteor.mp4",
            next: "mech_force_dialog"
        }, {
            scene: "mech_force_dialog",
            src: "vid/Background.mp4",
            dialogue: "asteroid_dialog"
        }, {
            scene: "compete_kind",
            src: "vid/Background.mp4",
            dialogue: "compete_kind_dialog"
        }, {
            scene: "compete_hard",
            src: "vid/Background.mp4",
            dialogue: "compete_hard_dialog"
        }, {
            scene: "electrical_density",
            src: "vid/Cars.mp4",
            next: "ed_dialog"
        }, {
            scene: "conductivity",
            src: "vid/Phone.mp4",
            next: "c_dialog"
        }, {
            scene: "ed_dialog",
            src: "vid/Background.mp4",
            dialogue: "ed_c_dialog"
        }, {
            scene: "c_dialog",
            src: "vid/Background.mp4",
            dialogue: "c_c_dialog"
        }, {
            scene: "electrical_density_2",
            src: "vid/Cars.mp4",
            next: "end1"
        }, {
            scene: "conductivity_2",
            src: "vid/Phone.mp4",
            next: "end1"
        }, {
            scene: "electrical_density_good",
            src: "vid/Cars.mp4",
            next: "end2"
        }, {
            scene: "conductivity_good",
            src: "vid/Phone.mp4",
            next: "good_mid"
        }, {
            scene: "good_mid",
            src: "vid/Background.mp4",
            dialogue: "good_dialog"
        }, {
            src: "vid/Background.mp4",
            scene: "end1",
            dialogue: "ending_dialog_1"
        }, {
            src: "vid/Background.mp4",
            dialogue: "ending_dialog_2",
            scene: "end2"
        }, {
            src: "vid/Background.mp4",
            scene: "end_true",
            next: "test"
        }, {
            src: "vid/Background.mp4",
            scene: "test"
        } ];
        window.s = k;
        var I = [], M = function() {
            function t() {
                (0, b["default"])(this, t), this.story = k, this.showDialogue = !1, this.dialogue = new A["default"](), 
                this.current = this.story[0], this.story.forEach(r), console.log(I);
            }
            return (0, C["default"])(t, [ {
                key: "defaultVideo",
                value: s
            }, {
                key: "scene",
                value: a
            }, {
                key: "exists",
                value: o
            }, {
                key: "choices",
                value: h
            }, {
                key: "hasChoices",
                value: l
            }, {
                key: "setHasDialogue",
                value: c
            }, {
                key: "hasDialogue",
                value: f
            }, {
                key: "neededVideos",
                value: d
            }, {
                key: "onBefore",
                value: _
            }, {
                key: "offBefore",
                value: g
            }, {
                key: "onAfter",
                value: p
            }, {
                key: "offAfetr",
                value: v
            }, {
                key: "switchTo",
                value: m
            }, {
                key: "next",
                value: y
            } ]), t;
        }();
        e["default"] = M;
    },
    257: function(t, e, n) {
        e = t.exports = n(133)(), e.push([ t.id, "body,html{margin:0;background-color:#000;overflow:hidden;height:100%}canvas[resize]{width:100%;height:100%}video{width:100%}.draw{position:absolute;top:0;left:0}", "" ]);
    },
    289: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(t, e) {
            if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e;
        }
        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Atom = e.LensedAtom = e.AbstractMutable = void 0;
        var o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
                    Object.defineProperty(t, i.key, i);
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e;
            };
        }(), u = n(148), h = i(u), l = n(329), c = i(l), f = n(47), d = i(f), _ = e.AbstractMutable = function(t) {
            function e() {
                return r(this, e), s(this, Object.getPrototypeOf(e).apply(this, arguments));
            }
            return a(e, t), o(e, [ {
                key: "set",
                value: function(t) {
                    this.modify(function() {
                        return t;
                    });
                }
            }, {
                key: "lens",
                value: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; e > i; i++) n[i - 1] = arguments[i];
                    return new g(this, 0 === n.length ? t : c["default"].apply(void 0, [ t ].concat(n)));
                }
            }, {
                key: "view",
                value: function(t) {
                    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; e > i; i++) n[i - 1] = arguments[i];
                    return this.lens.apply(this, [ t ].concat(n));
                }
            }, {
                key: "_maybeEmitValue",
                value: function(t) {
                    var e = this._currentEvent;
                    e && d["default"].equals(e.value, t) || this._emitValue(t);
                }
            } ]), e;
        }(h["default"].Property), g = e.LensedAtom = function(t) {
            function e(t, n) {
                r(this, e);
                var i = s(this, Object.getPrototypeOf(e).call(this));
                return i._source = t, i._lens = n, i._$handleValue = null, i;
            }
            return a(e, t), o(e, [ {
                key: "get",
                value: function() {
                    return c["default"].view(this._lens, this._source.get());
                }
            }, {
                key: "modify",
                value: function(t) {
                    this._source.modify(c["default"].over(this._lens, t));
                }
            }, {
                key: "_handleValue",
                value: function(t) {
                    this._maybeEmitValue(c["default"].view(this._lens, t));
                }
            }, {
                key: "_onActivation",
                value: function() {
                    var t = this, e = function(e) {
                        return t._handleValue(e);
                    };
                    this._$handleValue = e, this._source.onValue(e);
                }
            }, {
                key: "_onDeactivation",
                value: function() {
                    this._source.offValue(this._$handleValue), this._$handleValue = null, this._currentEvent = null;
                }
            } ]), e;
        }(_), p = e.Atom = function(t) {
            function e(t) {
                r(this, e);
                var n = s(this, Object.getPrototypeOf(e).call(this));
                return n._emitValue(t), n;
            }
            return a(e, t), o(e, [ {
                key: "get",
                value: function() {
                    return this._currentEvent.value;
                }
            }, {
                key: "modify",
                value: function(t) {
                    this._maybeEmitValue(t(this.get()));
                }
            } ]), e;
        }(_);
        e["default"] = function(t) {
            return new p(t);
        };
    },
    329: function(t, e, n) {
        "use strict";
        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }
        function r(t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
            }
            return Array.from(t);
        }
        function s(t, e, n) {
            return e in t ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = n, t;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.lift = void 0;
        var a = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
            }
            return t;
        }, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;
        }, u = n(47), h = i(u), l = function(t, e) {
            if (void 0 === e || !(t in e)) return e;
            var n = void 0;
            for (var i in e) i !== t && (void 0 === n && (n = {}), n[i] = e[i]);
            return n;
        }, c = function(t, e, n) {
            if (void 0 === n) return s({}, t, e);
            if (t in n && h["default"].equals(e, n[t])) return n;
            var i = s({}, t, e);
            for (var r in n) r !== t && (i[r] = n[r]);
            return i;
        }, f = function(t) {
            return 0 === Object.keys(t).length ? void 0 : t;
        }, d = function(t) {
            return function(e) {
                return void 0 === e ? e : t(e);
            };
        }, _ = function(t, e) {
            return h["default"].equals(t, e) ? t : e;
        }, g = function(t) {
            return function(e, n) {
                return _(n, t(e, n));
            };
        }, p = e.lift = function(t) {
            switch ("undefined" == typeof t ? "undefined" : o(t)) {
              case "string":
                return v.prop(t);

              case "number":
                return v.index(t);

              default:
                return t;
            }
        }, v = function(t) {
            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; e > i; i++) n[i - 1] = arguments[i];
            return 0 === n.length ? p(t) : h["default"].compose.apply(h["default"], [ p(t) ].concat(r(n.map(p))));
        };
        v.compose = v, v["delete"] = h["default"].curry(function(t, e) {
            return h["default"].set(p(t), void 0, e);
        }), v.deleteAll = h["default"].curry(function(t, e) {
            for (;void 0 !== v.view(t, e); ) e = v["delete"](t, e);
            return e;
        }), v.lens = h["default"].lens, v.over = h["default"].curry(function(t, e, n) {
            return h["default"].over(p(t), e, n);
        }), v.set = h["default"].curry(function(t, e, n) {
            return h["default"].set(p(t), e, n);
        }), v.view = h["default"].curry(function(t, e) {
            return h["default"].view(p(t), e);
        }), v.choose = function(t) {
            return function(e) {
                return function(n) {
                    var i = p(t(n));
                    return h["default"].map(function(t) {
                        return h["default"].set(i, t, n);
                    }, e(h["default"].view(i, n)));
                };
            };
        }, v.firstOf = function(t) {
            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; e > i; i++) n[i - 1] = arguments[i];
            return v.choose(function(e) {
                var i = [ t ].concat(n);
                return i[Math.max(0, i.findIndex(function(t) {
                    return void 0 !== v.view(t, e);
                }))];
            });
        }, v.replace = h["default"].curry(function(t, e) {
            return h["default"].lens(function(n) {
                return h["default"].equals(n, t) ? e : n;
            }, g(function(n) {
                return h["default"].equals(n, e) ? t : n;
            }));
        }), v["default"] = v.replace(void 0), v.required = function(t) {
            return v.replace(t, void 0);
        }, v.define = function(t) {
            return h["default"].compose(v.required(t), v["default"](t));
        }, v.normalize = function(t) {
            return h["default"].lens(d(t), g(d(t)));
        }, v.prop = function(t) {
            return h["default"].lens(function(e) {
                return e && e[t];
            }, function(e, n) {
                return void 0 === e ? l(t, n) : c(t, e, n);
            });
        }, v.find = function(t) {
            return v.choose(function(e) {
                if (void 0 === e) return v.append;
                var n = e.findIndex(t);
                return 0 > n ? v.append : n;
            });
        }, v.findWith = function(t) {
            for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), i = 1; e > i; i++) n[i - 1] = arguments[i];
            var r = v.apply(void 0, [ t ].concat(n));
            return v(v.find(function(t) {
                return void 0 !== v.view(r, t);
            }), r);
        }, v.index = function(t) {
            return h["default"].lens(function(e) {
                return e && e[t];
            }, function(e, n) {
                if (void 0 === e) {
                    if (void 0 === n) return;
                    return t < n.length ? f(n.slice(0, t).concat(n.slice(t + 1))) : n;
                }
                return void 0 === n ? Array(t).concat([ e ]) : n.length <= t ? n.concat(Array(t - n.length), [ e ]) : h["default"].equals(e, n[t]) ? n : n.slice(0, t).concat([ e ], n.slice(t + 1));
            });
        }, v.append = h["default"].lens(function() {}, function(t, e) {
            return void 0 === t ? e : void 0 === e ? [ t ] : e.concat([ t ]);
        }), v.filter = function(t) {
            return h["default"].lens(function(e) {
                return e && e.filter(t);
            }, function(e, n) {
                return _(n, f(h["default"].concat(e || [], (n || []).filter(h["default"].complement(t)))));
            });
        }, v.augment = function(t) {
            return h["default"].lens(d(function(e) {
                var n = a({}, e);
                for (var i in t) n[i] = t[i](e);
                return n;
            }), g(function(e, n) {
                if (void 0 !== e) {
                    var i = void 0, r = function(t, e) {
                        void 0 === i && (i = {}), i[t] = e;
                    };
                    for (var s in e) s in t ? s in n && r(s, n[s]) : r(s, e[s]);
                    return i;
                }
            }));
        }, e["default"] = v;
    },
    453: function(t, e, n) {
        var i = n(257);
        "string" == typeof i && (i = [ [ t.id, i, "" ] ]);
        n(221)(i, {});
        i.locals && (t.exports = i.locals);
    }
});
//# sourceMappingURL=main.bundle.js.map