"use strict";
! function (e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ResizeSensor = t()
}("undefined" != typeof window ? window : this, function () {
    if ("undefined" == typeof window) return null;
    var e = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")(),
        t = e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || function (t) {
            return e.setTimeout(t, 20)
        },
        n = e.cancelAnimationFrame || e.mozCancelAnimationFrame || e.webkitCancelAnimationFrame || function (t) {
            e.clearTimeout(t)
        };

    function i(e, t) {
        var n = Object.prototype.toString.call(e),
            i = "[object Array]" === n || "[object NodeList]" === n || "[object HTMLCollection]" === n || "[object Object]" === n || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements,
            o = 0,
            r = e.length;
        if (i)
            for (; o < r; o++) t(e[o]);
        else t(e)
    }

    function o(e) {
        if (!e.getBoundingClientRect) return {
            width: e.offsetWidth,
            height: e.offsetHeight
        };
        var t = e.getBoundingClientRect();
        return {
            width: Math.round(t.width),
            height: Math.round(t.height)
        }
    }

    function r(e, t) {
        Object.keys(t).forEach(function (n) {
            e.style[n] = t[n]
        })
    }
    var s = function (e, d) {
        var a = 0;

        function c() {
            var e, t, n = [];
            this.add = function (e) {
                n.push(e)
            }, this.call = function (i) {
                for (e = 0, t = n.length; e < t; e++) n[e].call(this, i)
            }, this.remove = function (i) {
                var o = [];
                for (e = 0, t = n.length; e < t; e++) n[e] !== i && o.push(n[e]);
                n = o
            }, this.length = function () {
                return n.length
            }
        }

        function f(e, n) {
            if (e)
                if (e.resizedAttached) e.resizedAttached.add(n);
                else {
                    e.resizedAttached = new c, e.resizedAttached.add(n), e.resizeSensor = document.createElement("div"), e.resizeSensor.dir = "ltr", e.resizeSensor.className = "resize-sensor";
                    var i = {
                            pointerEvents: "none",
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            right: "0px",
                            bottom: "0px",
                            overflow: "hidden",
                            zIndex: "-1",
                            visibility: "hidden",
                            maxWidth: "100%"
                        },
                        s = {
                            position: "absolute",
                            left: "0px",
                            top: "0px",
                            transition: "0s"
                        };
                    r(e.resizeSensor, i);
                    var d = document.createElement("div");
                    d.className = "resize-sensor-expand", r(d, i);
                    var f = document.createElement("div");
                    r(f, s), d.appendChild(f);
                    var h = document.createElement("div");
                    h.className = "resize-sensor-shrink", r(h, i);
                    var l = document.createElement("div");
                    r(l, s), r(l, {
                        width: "200%",
                        height: "200%"
                    }), h.appendChild(l), e.resizeSensor.appendChild(d), e.resizeSensor.appendChild(h), e.appendChild(e.resizeSensor);
                    var u = window.getComputedStyle(e),
                        p = u ? u.getPropertyValue("position") : null;
                    "absolute" !== p && "relative" !== p && "fixed" !== p && "sticky" !== p && (e.style.position = "relative");
                    var m = !1,
                        v = 0,
                        z = o(e),
                        w = 0,
                        g = 0,
                        y = !0;
                    a = 0;
                    var S = function () {
                        if (y) {
                            if (0 === e.offsetWidth && 0 === e.offsetHeight) return void(a || (a = t(function () {
                                a = 0, S()
                            })));
                            y = !1
                        }
                        var n, i;
                        n = e.offsetWidth, i = e.offsetHeight, f.style.width = n + 10 + "px", f.style.height = i + 10 + "px", d.scrollLeft = n + 10, d.scrollTop = i + 10, h.scrollLeft = n + 10, h.scrollTop = i + 10
                    };
                    e.resizeSensor.resetSensor = S;
                    var b = function () {
                            v = 0, m && (w = z.width, g = z.height, e.resizedAttached && e.resizedAttached.call(z))
                        },
                        A = function () {
                            z = o(e), (m = z.width !== w || z.height !== g) && !v && (v = t(b)), S()
                        },
                        x = function (e, t, n) {
                            e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n)
                        };
                    x(d, "scroll", A), x(h, "scroll", A), a = t(function () {
                        a = 0, S()
                    })
                }
        }
        i(e, function (e) {
            f(e, d)
        }), this.detach = function (t) {
            a && (n(a), a = 0), s.detach(e, t)
        }, this.reset = function () {
            e.resizeSensor.resetSensor && e.resizeSensor.resetSensor()
        }
    };
    if (s.reset = function (e) {
            i(e, function (t) {
                e.resizeSensor.resetSensor && t.resizeSensor.resetSensor()
            })
        }, s.detach = function (e, t) {
            i(e, function (e) {
                e && (e.resizedAttached && "function" == typeof t && (e.resizedAttached.remove(t), e.resizedAttached.length()) || e.resizeSensor && (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached))
            })
        }, "undefined" != typeof MutationObserver) {
        var d = new MutationObserver(function (e) {
            for (var t in e)
                if (e.hasOwnProperty(t))
                    for (var n = e[t].addedNodes, i = 0; i < n.length; i++) n[i].resizeSensor && s.reset(n[i])
        });
        document.addEventListener("DOMContentLoaded", function (e) {
            d.observe(document.body, {
                childList: !0,
                subtree: !0
            })
        })
    }
    return s
});

function scrollFunction() {
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 500 ? document.getElementById("buttombutton").style.bottom = "0px" : document.getElementById("buttombutton").style.bottom = "-45px"
}

function topFunction() {
    document.body.scrollTop = 0, document.documentElement.scrollTop = 0
}
window.onscroll = function () {
    scrollFunction()
};
document.getElementById("otoyear").innerHTML = new Date().getFullYear();
var _0xb776 = ["show-list", "getElementById", "classList", "menu-active", "toggle", " ", "split", "className", "indexOf", "splice", "push", "join", "body", "no-overflow"];

function menuButton() {
    var _0x276ex2 = document[_0xb776[1]](_0xb776[0]);
    if (_0x276ex2[_0xb776[2]]) {
        _0x276ex2[_0xb776[2]][_0xb776[4]](_0xb776[3])
    } else {
        var _0x276ex3 = _0x276ex2[_0xb776[7]][_0xb776[6]](_0xb776[5]),
            _0x276ex4 = _0x276ex3[_0xb776[8]](_0xb776[3]);
        _0x276ex4 >= 0 ? _0x276ex3[_0xb776[9]](_0x276ex4, 1) : _0x276ex3[_0xb776[10]](_0xb776[3]), _0x276ex2[_0xb776[7]] = _0x276ex3[_0xb776[11]](_0xb776[5])
    };
    var _0x276ex2 = document[_0xb776[12]];
    if (_0x276ex2[_0xb776[2]]) {
        _0x276ex2[_0xb776[2]][_0xb776[4]](_0xb776[13])
    } else {
        var _0x276ex3 = _0x276ex2[_0xb776[7]][_0xb776[6]](_0xb776[5]),
            _0x276ex4 = _0x276ex3[_0xb776[8]](_0xb776[13]);
        _0x276ex4 >= 0 ? _0x276ex3[_0xb776[9]](_0x276ex4, 1) : _0x276ex3[_0xb776[10]](_0xb776[13]), _0x276ex2[_0xb776[7]] = _0x276ex3[_0xb776[11]](_0xb776[5])
    }
};
var _0xd2f9 = ["a[href=\"https://www.janibanglay.xyz/"]", "querySelector", ".thumbox", "querySelectorAll", "length", "b-lazy", "add", "classList", "thumb-area", "getElementsByClassName", "innerHTML", "<span class=\'spanlabel\'>You Are Not Active Licence</span>", "style", "background-image:url(https://1.bp.blogspot.com/-uSFf8timpoM/Yg4LQ4fJSvI/AAAAAAAAAAQ/WvNE3F1jM4EFmjsEMyeevaTbwmNa0D0PgCK4BGAYYCw/w1600-h1600-p-k-no-nu/1645087514225.jpg)", "setAttribute"];
var crY;
if (crY = document[_0xd2f9[1]](_0xd2f9[0])) {
    const e = document[_0xd2f9[3]](_0xd2f9[2]);
    for (let a = 0; a < e[_0xd2f9[4]]; a++) {
        e[a][_0xd2f9[7]][_0xd2f9[6]](_0xd2f9[5])
    }
} else {
    for (var images = document[_0xd2f9[9]](_0xd2f9[8]), i = 0; i < images[_0xd2f9[4]]; i++) {
        images[i][_0xd2f9[10]] = _0xd2f9[11], images[i][_0xd2f9[14]](_0xd2f9[12], _0xd2f9[13])
    }
};
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.StickySidebar = {})
}(this, function (t) {
    "use strict";
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
    var e, i, n = (function (t, e) {
            (function (t) {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var l, n, e = function () {
                        function n(t, e) {
                            for (var i = 0; i < e.length; i++) {
                                var n = e[i];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                            }
                        }
                        return function (t, e, i) {
                            return e && n(t.prototype, e), i && n(t, i), t
                        }
                    }(),
                    i = (l = ".stickySidebar", n = {
                        topSpacing: 0,
                        bottomSpacing: 0,
                        containerSelector: !1,
                        innerWrapperSelector: ".inner-wrapper-sticky",
                        stickyClass: "is-affixed",
                        resizeSensor: !0,
                        minWidth: !1
                    }, function () {
                        function c(t) {
                            var e = this,
                                i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                            if (function (t, e) {
                                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                }(this, c), this.options = c.extend(n, i), this.sidebar = "string" == typeof t ? document.querySelector(t) : t, void 0 === this.sidebar) throw new Error("There is no specific sidebar element.");
                            this.sidebarInner = !1, this.container = this.sidebar.parentElement, this.affixedType = "STATIC", this.direction = "down", this.support = {
                                transform: !1,
                                transform3d: !1
                            }, this._initialized = !1, this._reStyle = !1, this._breakpoint = !1, this.dimensions = {
                                translateY: 0,
                                maxTranslateY: 0,
                                topSpacing: 0,
                                lastTopSpacing: 0,
                                bottomSpacing: 0,
                                lastBottomSpacing: 0,
                                sidebarHeight: 0,
                                sidebarWidth: 0,
                                containerTop: 0,
                                containerHeight: 0,
                                viewportHeight: 0,
                                viewportTop: 0,
                                lastViewportTop: 0
                            }, ["handleEvent"].forEach(function (t) {
                                e[t] = e[t].bind(e)
                            }), this.initialize()
                        }
                        return e(c, [{
                            key: "initialize",
                            value: function () {
                                var i = this;
                                if (this._setSupportFeatures(), this.options.innerWrapperSelector && (this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector), null === this.sidebarInner && (this.sidebarInner = !1)), !this.sidebarInner) {
                                    var t = document.createElement("div");
                                    for (t.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(t); this.sidebar.firstChild != t;) t.appendChild(this.sidebar.firstChild);
                                    this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky")
                                }
                                if (this.options.containerSelector) {
                                    var e = document.querySelectorAll(this.options.containerSelector);
                                    if ((e = Array.prototype.slice.call(e)).forEach(function (t, e) {
                                            t.contains(i.sidebar) && (i.container = t)
                                        }), !e.length) throw new Error("The container does not contains on the sidebar.")
                                }
                                "function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0), "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0), this._widthBreakpoint(), this.calcDimensions(), this.stickyPosition(), this.bindEvents(), this._initialized = !0
                            }
                        }, {
                            key: "bindEvents",
                            value: function () {
                                window.addEventListener("resize", this, {
                                    passive: !0,
                                    capture: !1
                                }), window.addEventListener("scroll", this, {
                                    passive: !0,
                                    capture: !1
                                }), this.sidebar.addEventListener("update" + l, this), this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent))
                            }
                        }, {
                            key: "handleEvent",
                            value: function (t) {
                                this.updateSticky(t)
                            }
                        }, {
                            key: "calcDimensions",
                            value: function () {
                                if (!this._breakpoint) {
                                    var t = this.dimensions;
                                    t.containerTop = c.offsetRelative(this.container).top, t.containerHeight = this.container.clientHeight, t.containerBottom = t.containerTop + t.containerHeight, t.sidebarHeight = this.sidebarInner.offsetHeight, t.sidebarWidth = this.sidebarInner.offsetWidth, t.viewportHeight = window.innerHeight, t.maxTranslateY = t.containerHeight - t.sidebarHeight, this._calcDimensionsWithScroll()
                                }
                            }
                        }, {
                            key: "_calcDimensionsWithScroll",
                            value: function () {
                                var t = this.dimensions;
                                t.sidebarLeft = c.offsetRelative(this.sidebar).left, t.viewportTop = document.documentElement.scrollTop || document.body.scrollTop, t.viewportBottom = t.viewportTop + t.viewportHeight, t.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft, t.topSpacing = this.options.topSpacing, t.bottomSpacing = this.options.bottomSpacing, "function" == typeof t.topSpacing && (t.topSpacing = parseInt(t.topSpacing(this.sidebar)) || 0), "function" == typeof t.bottomSpacing && (t.bottomSpacing = parseInt(t.bottomSpacing(this.sidebar)) || 0), "VIEWPORT-TOP" === this.affixedType ? t.topSpacing < t.lastTopSpacing && (t.translateY += t.lastTopSpacing - t.topSpacing, this._reStyle = !0) : "VIEWPORT-BOTTOM" === this.affixedType && t.bottomSpacing < t.lastBottomSpacing && (t.translateY += t.lastBottomSpacing - t.bottomSpacing, this._reStyle = !0), t.lastTopSpacing = t.topSpacing, t.lastBottomSpacing = t.bottomSpacing
                            }
                        }, {
                            key: "isSidebarFitsViewport",
                            value: function () {
                                var t = this.dimensions,
                                    e = "down" === this.scrollDirection ? t.lastBottomSpacing : t.lastTopSpacing;
                                return this.dimensions.sidebarHeight + e < this.dimensions.viewportHeight
                            }
                        }, {
                            key: "observeScrollDir",
                            value: function () {
                                var t = this.dimensions;
                                if (t.lastViewportTop !== t.viewportTop) {
                                    var e = "down" === this.direction ? Math.min : Math.max;
                                    t.viewportTop === e(t.viewportTop, t.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down")
                                }
                            }
                        }, {
                            key: "getAffixType",
                            value: function () {
                                this._calcDimensionsWithScroll();
                                var t = this.dimensions,
                                    e = t.viewportTop + t.topSpacing,
                                    i = this.affixedType;
                                return e <= t.containerTop || t.containerHeight <= t.sidebarHeight ? (t.translateY = 0, i = "STATIC") : i = "up" === this.direction ? this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown(), t.translateY = Math.max(0, t.translateY), t.translateY = Math.min(t.containerHeight, t.translateY), t.translateY = Math.round(t.translateY), t.lastViewportTop = t.viewportTop, i
                            }
                        }, {
                            key: "_getAffixTypeScrollingDown",
                            value: function () {
                                var t = this.dimensions,
                                    e = t.sidebarHeight + t.containerTop,
                                    i = t.viewportTop + t.topSpacing,
                                    n = t.viewportBottom - t.bottomSpacing,
                                    o = this.affixedType;
                                return this.isSidebarFitsViewport() ? t.sidebarHeight + i >= t.containerBottom ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : i >= t.containerTop && (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : e + t.translateY <= n ? (t.translateY = n - e, o = "VIEWPORT-BOTTOM") : t.containerTop + t.translateY <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                            }
                        }, {
                            key: "_getAffixTypeScrollingUp",
                            value: function () {
                                var t = this.dimensions,
                                    e = t.sidebarHeight + t.containerTop,
                                    i = t.viewportTop + t.topSpacing,
                                    n = t.viewportBottom - t.bottomSpacing,
                                    o = this.affixedType;
                                return i <= t.translateY + t.containerTop ? (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : this.isSidebarFitsViewport() || t.containerTop <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                            }
                        }, {
                            key: "_getStyle",
                            value: function (t) {
                                if (void 0 !== t) {
                                    var e = {
                                            inner: {},
                                            outer: {}
                                        },
                                        i = this.dimensions;
                                    switch (t) {
                                    case "VIEWPORT-TOP":
                                        e.inner = {
                                            position: "fixed",
                                            top: i.topSpacing,
                                            left: i.sidebarLeft - i.viewportLeft,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case "VIEWPORT-BOTTOM":
                                        e.inner = {
                                            position: "fixed",
                                            top: "auto",
                                            left: i.sidebarLeft,
                                            bottom: i.bottomSpacing,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case "CONTAINER-BOTTOM":
                                    case "VIEWPORT-UNBOTTOM":
                                        var n = this._getTranslate(0, i.translateY + "px");
                                        e.inner = n ? {
                                            transform: n
                                        } : {
                                            position: "absolute",
                                            top: i.translateY,
                                            width: i.sidebarWidth
                                        }
                                    }
                                    switch (t) {
                                    case "VIEWPORT-TOP":
                                    case "VIEWPORT-BOTTOM":
                                    case "VIEWPORT-UNBOTTOM":
                                    case "CONTAINER-BOTTOM":
                                        e.outer = {
                                            height: i.sidebarHeight,
                                            position: "relative"
                                        }
                                    }
                                    return e.outer = c.extend({
                                        height: "",
                                        position: ""
                                    }, e.outer), e.inner = c.extend({
                                        position: "relative",
                                        top: "",
                                        left: "",
                                        bottom: "",
                                        width: "",
                                        transform: ""
                                    }, e.inner), e
                                }
                            }
                        }, {
                            key: "stickyPosition",
                            value: function (t) {
                                if (!this._breakpoint) {
                                    t = this._reStyle || t || !1, this.options.topSpacing, this.options.bottomSpacing;
                                    var e = this.getAffixType(),
                                        i = this._getStyle(e);
                                    if ((this.affixedType != e || t) && e) {
                                        var n = "affix." + e.toLowerCase().replace("viewport-", "") + l;
                                        for (var o in c.eventTrigger(this.sidebar, n), "STATIC" === e ? c.removeClass(this.sidebar, this.options.stickyClass) : c.addClass(this.sidebar, this.options.stickyClass), i.outer) {
                                            var s = "number" == typeof i.outer[o] ? "px" : "";
                                            this.sidebar.style[o] = i.outer[o] + s
                                        }
                                        for (var r in i.inner) {
                                            var a = "number" == typeof i.inner[r] ? "px" : "";
                                            this.sidebarInner.style[r] = i.inner[r] + a
                                        }
                                        var p = "affixed." + e.toLowerCase().replace("viewport-", "") + l;
                                        c.eventTrigger(this.sidebar, p)
                                    } else this._initialized && (this.sidebarInner.style.left = i.inner.left);
                                    this.affixedType = e
                                }
                            }
                        }, {
                            key: "_widthBreakpoint",
                            value: function () {
                                window.innerWidth <= this.options.minWidth ? (this._breakpoint = !0, this.affixedType = "STATIC", this.sidebar.removeAttribute("style"), c.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style")) : this._breakpoint = !1
                            }
                        }, {
                            key: "updateSticky",
                            value: function () {
                                var t, e = this,
                                    i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                                this._running || (this._running = !0, t = i.type, requestAnimationFrame(function () {
                                    switch (t) {
                                    case "scroll":
                                        e._calcDimensionsWithScroll(), e.observeScrollDir(), e.stickyPosition();
                                        break;
                                    case "resize":
                                    default:
                                        e._widthBreakpoint(), e.calcDimensions(), e.stickyPosition(!0)
                                    }
                                    e._running = !1
                                }))
                            }
                        }, {
                            key: "_setSupportFeatures",
                            value: function () {
                                var t = this.support;
                                t.transform = c.supportTransform(), t.transform3d = c.supportTransform(!0)
                            }
                        }, {
                            key: "_getTranslate",
                            value: function () {
                                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                    e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                    i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                                return this.support.transform3d ? "translate3d(" + t + ", " + e + ", " + i + ")" : !!this.support.translate && "translate(" + t + ", " + e + ")"
                            }
                        }, {
                            key: "destroy",
                            value: function () {
                                window.removeEventListener("resize", this, {
                                    capture: !1
                                }), window.removeEventListener("scroll", this, {
                                    capture: !1
                                }), this.sidebar.classList.remove(this.options.stickyClass), this.sidebar.style.minHeight = "", this.sidebar.removeEventListener("update" + l, this);
                                var t = {
                                    inner: {},
                                    outer: {}
                                };
                                for (var e in t.inner = {
                                        position: "",
                                        top: "",
                                        left: "",
                                        bottom: "",
                                        width: "",
                                        transform: ""
                                    }, t.outer = {
                                        height: "",
                                        position: ""
                                    }, t.outer) this.sidebar.style[e] = t.outer[e];
                                for (var i in t.inner) this.sidebarInner.style[i] = t.inner[i];
                                this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent))
                            }
                        }], [{
                            key: "supportTransform",
                            value: function (t) {
                                var i = !1,
                                    e = t ? "perspective" : "transform",
                                    n = e.charAt(0).toUpperCase() + e.slice(1),
                                    o = document.createElement("support").style;
                                return (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ").forEach(function (t, e) {
                                    if (void 0 !== o[t]) return i = t, !1
                                }), i
                            }
                        }, {
                            key: "eventTrigger",
                            value: function (t, e, i) {
                                try {
                                    var n = new CustomEvent(e, {
                                        detail: i
                                    })
                                } catch (t) {
                                    (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, i)
                                }
                                t.dispatchEvent(n)
                            }
                        }, {
                            key: "extend",
                            value: function (t, e) {
                                var i = {};
                                for (var n in t) void 0 !== e[n] ? i[n] = e[n] : i[n] = t[n];
                                return i
                            }
                        }, {
                            key: "offsetRelative",
                            value: function (t) {
                                var e = {
                                    left: 0,
                                    top: 0
                                };
                                do {
                                    var i = t.offsetTop,
                                        n = t.offsetLeft;
                                    isNaN(i) || (e.top += i), isNaN(n) || (e.left += n), t = "BODY" === t.tagName ? t.parentElement : t.offsetParent
                                } while (t);
                                return e
                            }
                        }, {
                            key: "addClass",
                            value: function (t, e) {
                                c.hasClass(t, e) || (t.classList ? t.classList.add(e) : t.className += " " + e)
                            }
                        }, {
                            key: "removeClass",
                            value: function (t, e) {
                                c.hasClass(t, e) && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
                            }
                        }, {
                            key: "hasClass",
                            value: function (t, e) {
                                return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
                            }
                        }, {
                            key: "defaults",
                            get: function () {
                                return n
                            }
                        }]), c
                    }());
                t.default = i, window.StickySidebar = i
            })(e)
        }(e = {
            exports: {}
        }, e.exports), e.exports),
        o = (i = n) && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
    t.default = o, t.__moduleExports = n, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
var sidebar = new StickySidebar("#sidebar-wrapper", {
    topSpacing: 20,
    bottomSpacing: 20,
    containerSelector: "#outer-wrapper",
    innerWrapperSelector: ".sidebar__inner",
    minWidth: 1024
});
