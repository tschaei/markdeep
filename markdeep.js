/**
 See http://casual-effects.com/markdeep for @license and documentation.

 markdeep.min.js version 0.05
 Copyright 2015, Morgan McGuire
 All rights reserved.
 (BSD 2-clause license)

 highlight.min.js 8.8.0 from https://highlightjs.org/
 Copyright 2006, Ivan Sagalaev
 All rights reserved.
 (BSD 3-clause license)
*/
! function() {
    "use strict";

    function e(e, t) {
        return "<" + e + ">" + t + "</" + e + ">"
    }

    function t(e) {
        return window.markdeepOptions && void 0 !== window.markdeepOptions[e] ? window.markdeepOptions[e] : void 0 !== A[e] ? A[e] : void 0
    }

    function r(e) {
        return (e + "").rp(/&/g, "&amp;").rp(/</g, "&lt;").rp(/>/g, "&gt;").rp(/"/g, "&quot;")
    }

    function n(e) {
        return e.rp(/&lt;/g, "<").rp(/&gt;/g, ">").rp(/&quot;/g, '"').rp(/&#39;/g, "'").rp(/&ndash;/g, "--").rp(/&mdash;/g, "---").rp(/&amp;/g, "&")
    }

    function i(e) {
        return encodeURI(e.rp(/\s/g, "").toLowerCase())
    }

    function a() {
        for (var t = "", r = 1; 6 >= r; ++r) {
            t += "h" + r + "::before {\ncontent:";
            for (var n = 1; r >= n; ++n) t += "counter(h" + n + ') "' + (r > n ? "." : " ") + '" ';
            t += ";\ncounter-increment: h" + r + ";}"
        }
        return e("style", t)
    }

    function s(e, t) {
        var r = e.innerHTML;
        return r = r.rp(/(?:<style class="fallback">[\s\S]*?<\/style>[\s\S]*)<\/\S+@\S+\.\S+?>/gim, ""), r = r.rp(/<\/h?ttps?:.*>/gi, ""), r = r.rp(/<(https?): (.*?)>/gi, function(e, t, r) {
            var n = "<" + t + "://" + r.rp(/=""\s/g, "/");
            return '=""' === n.ss(n.length - 3) && (n = n.ss(0, n.length - 3)), n = n.rp(/"/g, ""), n + ">"
        }), r = r.rp(/<style class=["']fallback["']>.*?<\/style>/gim, ""), r = n(r)
    }

    function o(e) {
        function t() {
            l = e.indexOf("\n", a) + 1, u = u || /\S/.test(e.ss(a, a + s)), d = d || /\S/.test(e.ss(a + o + 1, l))
        }
        for (var r = {
                g: e,
                h: "",
                j: "",
                m: ""
            }, n = e.indexOf(C); n >= 0; n = e.indexOf(C, n + C.length)) {
            var i, a = S(0, e.lastIndexOf("\n", n)) + 1,
                s = n - a;
            for (i = n + C.length; e[i] === $; ++i);
            var o = i - a - 1,
                c = {
                    g: e.ss(0, a),
                    h: "",
                    j: "center",
                    m: e.ss(a, n).rp(/[ \t]*[ \t]$/, " ")
                },
                l = 0,
                u = !1,
                d = !1;
            t();
            for (var p = !0, h = i; p;) {
                if (a = l, t(), 0 === a) return r;
                if (u ? c.j = "floatright" : d && (c.j = "floatleft"), e[a + s] === $ && e[a + o] === $) {
                    for (var f = s; o > f && e[a + f] === $; ++f);
                    var b = a + s,
                        g = a + o;
                    if (c.m += e.ss(h, b).rp(/^[ \t]*[ \t]/, " ").rp(/[ \t][ \t]*$/, " "), f === o) return c.m += e.ss(a + o + 1), c;
                    c.h += e.ss(b + 1, g) + "\n", h = g + 1
                } else p = !1
            }
        }
        return r
    }

    function c(e, t, r, n) {
        var i = "[^ \\t\n" + t.source + "]",
            a = "(" + t.source + ")(" + i + "(?:.*?" + i + ")?)(" + t.source + ")(?![A-Za-z0-9])";
        return e.rp(RegExp(a, "g"), "<" + r + (n ? ' class="' + n + '"' : "") + ">$2</" + r + ">")
    }

    function l(e, t, r) {
        for (var n = r || /<pre(\s.*?)?>|<code(\s.*?)?>|<svg(\s.*?)?>|<script\s.*?>|<style\s.*?>|<protect>/i, i = ""; e.length > 0;) {
            var a = e.search(n);
            if (-1 === a) i += t(e), e = "";
            else {
                i += t(e.ss(0, a));
                var s = S(e.ss(a + 1, a + 15).search(/[\s>]/), 0),
                    o = e.ss(a + 1, a + s + 1),
                    c = RegExp("</" + o + ">", "i"),
                    l = e.search(c); - 1 === l ? l = e.length : l += o.length + 3, i += e.ss(a, l), e = e.ss(l)
            }
        }
        return i
    }

    function u(t) {
        function r(e) {
            return e.trim().rp(/^\||\|$/g, "")
        }
        var n = /(?:\n\|?[ \t\S]+?(?:\|[ \t\S]+?)+\|?(?=\n))/.source,
            i = /\n\|? *\:?-+\:?(?: *\| *\:?-+\:?)+ *\|?(?=\n)/.source,
            a = RegExp(n + i + n + "+", "g");
        return t = t.rp(a, function(t) {
            var n = t.split("\n"),
                i = "",
                a = "" === n[0] ? 1 : 0,
                s = [];
            r(n[a + 1]).rp(/:?-+:?/g, function(e) {
                var t = ":" === e[0],
                    r = ":" === e[e.length - 1];
                s.push(' style="text-align:' + (t && r ? "center" : r ? "right" : "left") + '"')
            });
            for (var o = "th", c = a; n.length > c; ++c) {
                var l = r(n[c].trim());
                i += "<tr>";
                var u = 0;
                i += "<" + o + s[0] + ">" + l.rp(/\|/g, function() {
                    return ++u, "</" + o + "><" + o + s[u] + ">"
                }) + "</" + o + ">", i += "</tr>\n", c == a && (++c, o = "td")
            }
            return e("table", i)
        })
    }

    function d(e) {
        var t = /(?:^|\n)\s*\n/.source,
            r = RegExp("(?:" + t + ")" + /([ \t]*(?:\d+\.|-|\+|\*)[ \t]+[\s\S]*?)/.source + "(?=" + t + ")", "g");
        return e = e.rp(r, function(e, t) {
            var r = "",
                n = [],
                i = {
                    o: -1
                };
            for (t.split("\n").forEach(function(e) {
                    var t = e.rp(/^\s*/, ""),
                        a = e.length - t.length,
                        s = "-" === t[0] || "+" === t[0] || "*" === t[0],
                        o = /^\d+\.[ \t]/.test(t);
                    if (o || s) {
                        if (a !== i.o)
                            if (-1 !== i.o && i.o > a)
                                for (; void 0 !== i && i.o > a;) n.pop(), r += "</li></" + i.tag + ">", i = n[n.length - 1];
                            else i = {
                                o: a,
                                tag: o ? "ol" : "ul",
                                p: e.ss(0, a)
                            }, n.push(i), r += "<" + i.tag + ">";
                        else -1 !== i.o && (r += "</li>");
                        void 0 !== i && (r += "\n" + i.p + "<li>" + t.rp(/^(\d+\.|-|\+|\*) /, ""))
                    } else r += "\n" + i.p + e
                }), i = n.pop(); void 0 !== i; i = n.pop()) r += "</li></" + i.tag + ">";
            return r
        })
    }

    function p(t) {
        var r = /(^[ \t]*\n)/.source,
            n = /^\w.*\n:/.source,
            i = "(([ 	].+\n)+" + r + "?)+";
        return t = t.rp(RegExp("(" + n + i + ")+", "gm"), function(t) {
            var r = "";
            return t.split("\n").forEach(function(e, t) {
                0 === e.trim().length ? r += "\n" : /\s/.test(e[0]) || ":" === e[0] ? (":" === e[0] && (e = e.ss(1)), r += e + "\n") : (t > 0 && (r += "</dd>\n"), r += "<dt>" + e + "</dt>\n<dd>")
            }), e("dl", r + "</dd>")
        })
    }

    function h(e) {
        var t = "",
            r = "",
            n = [0],
            i = 0,
            a = 0;
        e = e.rp(/<h([1-6])>(.*)<\/h\1>/g, function(e, s, o) {
            s = parseInt(s), o = o.trim();
            for (var c = i; s > c; ++c) n[c] = 0;
            n.splice(s, i - s), i = s, ++n[i - 1];
            var l = n.join("."),
                u = "toc" + l;
            return 3 >= s && (t += Array(s).join("&nbsp;&nbsp;") + '<a href="#' + u + '">' + l + "&nbsp; " + o + "</a><br/>\n", 1 === s ? r += ' &middot; <a href="#' + u + '">' + o + "</a>" : ++a), '<a name="' + u + '"></a>' + e
        }), r.length > 0 && (r = r.ss(10));
        var s = n[0],
            o = s + a,
            c = "";
        4 > o && 1 >= s || 2048 > e.length || (c = 7 > s && 2.5 > o / s ? '<div class="shortTOC">' + r + "</div>" : '<div class="longTOC"><center><b>Contents</b></center><p>' + t + "</p></div>");
        var l = !1;
        return e = e.rp(/<div class="afterTitles"><\/div>/, function(e) {
            return l = !0, e + c
        }), l || (e = c + e), e
    }

    function f(t, n) {
        function a(e) {
            var t = o(e);
            return t.h ? t.g + m(t.h, t.j) + a(t.m) : e
        }
        if (void 0 === n && (n = !0), void 0 !== t.innerHTML && (t = t.innerHTML), t = t.rp(/<script\s+type\s*=\s*['"]preformatted['"]\s*>([\s\S]*?)<\/script>/gi, "$1"), !n) {
            var s = /^\*\*([^ \t\*].*?[^ \t\*])\*\*[ \t]*\n/.source,
                f = /([ {4,}\t][ \t]*\S.*\n)*/.source;
            t = t.rp(RegExp(s + f, "g"), function(t, r) {
                r = r.trim();
                var n = t.ss(t.indexOf("\n"));
                return n = n ? n.rp(/[ \t]*(\S.*?)\n/g, '<div class="subtitle"> $1 </div>\n') : "", e("title", r) + '<div class="title"> ' + r + " </div>\n" + n + '<div class="afterTitles"></div>\n'
            })
        }
        return t = "\n" + t, t = a(t), [/\n~{3,}.*\n([\s\S]+?)\n~{3,}\n/gm, /\n`{3,}.*\n([\s\S]+?)\n`{3,}\n/gm].forEach(function(r) {
            t = t.rp(r, function(t, r) {
                return "\n" + e("pre", e("code", hljs.highlightAuto(r).value)) + "\n"
            })
        }), t = t.rp(/(\$\$[\s\S]+?\$\$)/gm, "<protect>$1</protect>"), t = l(t, function(t) {
            return t = l(t, function(t) {
                return t.rp(/(`)(.+?)(`)/g, e("code", "$2"))
            }), t = t.rp(/<code>(.*?)<\/code>/g, function(t, n) {
                return e("code", r(n))
            }), t = l(t, function(t) {
                function r(t) {
                    return function(r, n) {
                        return '\n<a name="' + i(n) + '"></a>' + e("h" + t, n) + "\n\n"
                    }
                }
                t = t.rp(/((?:[^\w\d]))\$([ \t][^\$]+[ \t])\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/((?:[^\w\d]))\$(\S(?:[^\$]*?\S(?!US))??)\$(?![\w\d])/g, "$1\\($2\\)"), t = t.rp(/(?:^|\n)(.+?)\n={5,}[ \t]*\n/g, r(1)), t = t.rp(/(?:^|\n)(.+?)\n-{5,}[ \t]*\n/g, r(2));
                for (var n = 6; n > 0; --n) t = t.rp(RegExp(/^[ \t]*/.source + "#{" + n + "," + n + "}[ 	]([^\n#]+)#*[ 	]*\n", "gm"), r(n));
                return t = t.rp(/\n((?:_[ \t]*){3,}|(?:-[ \t]*){3,}|(?:\*[ \t]*){3,})\s*?\n/g, "\n<hr/>\n"), t = t.rp(/(?:\n>.*){2,}/g, function(t) {
                    return e("blockquote", t.rp(/\n>/gm, "\n"))
                }), t = p(t), t = t.rp(/\n[\s\n]*?\n/g, "\n\n</p><p>\n\n"), t = c(t, /\*\*/, "strong", "asterisk"), t = c(t, /__/, "strong", "underscore"), t = t.rp(/<(\S+@(?:\S+\.)+?\S{3,}?)>/g, '<a href="mailto:$1">$1</a>'), t = t.rp(/(?=\b)<(\S+@(?:\S+\.)+?\S{3,}?)>(?=\b)/g, '<a href="mailto:$1">$1</a>'), t = t.rp(/(\s)(\w{3,6}:\/\/.+?)(\s|$)/g, '$1<a href="$2">$2</a>$3'), t = t.rp(/<(\w{3,6}:\/\/.+?)>/g, '<a href="$1">$1</a>'), t = c(t, /\*/, "em", "asterisk"), t = c(t, /_/, "em", "underscore"), t = t.rp(/\~\~([^~].*?)\~\~/g, e("del", "$1")), t = t.rp(/!\[([^\[]+)\]\(([^\t \)]+(.*))\)/g, '<img class="markdeep" src="$2" alt="$1"/>'), t = t.rp(/\[([^\[]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>'), t = t.rp(/(\s)==>(\s)/g, "$1&rarr;$2"), t = t.rp(/(\s)<==(\s)/g, "$1&larr;$2"), t = t.rp(/(\d+)x(\d+)/g, "$1&times;$2"), t = t.rp(/([^-!])---([^->])/g, "$1&mdash;$2"), t = t.rp(/([^-!])--([^->])/g, "$1&ndash;$2"), t = t.rp(/(\s)-(\d)/g, "$1&minus;$2"), t = t.rp(/(\d) - (\d)/g, "$1 &minus; $2")
            }), t = u(t), t = d(t)
        }), t = t.rp(/<protect>([\s\S]+?)<\/protect>/gm, "$1"), n || (t = h(t)), '<span class="md">' + e("p", t) + "</span>"
    }

    function b(e) {
        var t = e.split("\n"),
            r = 0;
        t.forEach(function(e) {
            r = S(r, e.length)
        });
        var n = Array(r + 1).join(" "),
            i = "";
        return t.forEach(function(e) {
            i += e + n.ss(e.length) + "\n"
        }), i
    }

    function g(e) {
        var t = e.split("\n"),
            r = 1 / 0;
        if (t.forEach(function(e) {
                if ("" !== e.trim()) {
                    var t = e.match(/^([ \t]*)/);
                    t && (r = q(r, t[0].length))
                }
            }), 0 === r) return e;
        var n = "";
        return t.forEach(function(e) {
            n += e.ss(r) + "\n"
        }), n
    }

    function m(e, t) {
        function n(e) {
            return Z.indexOf(e) + 1
        }

        function i(e) {
            return -1 !== F.indexOf(e)
        }

        function a(e) {
            return n(e) || "." === e
        }

        function s(e) {
            return n(e) || "'" === e
        }

        function o(e) {
            return i(e) || "<" === e || g(e)
        }

        function c(e) {
            return i(e) || ">" === e || g(e)
        }

        function l(e) {
            return "-" === e || n(e) || f(e)
        }

        function u(e) {
            return d(e) || f(e) || g(e)
        }

        function d(e) {
            return "|" === e || n(e)
        }

        function p(e) {
            return "/" === e || n(e)
        }

        function h(e) {
            return "\\" === e || n(e)
        }

        function f(e) {
            return U.indexOf(e) + 1
        }

        function g(e) {
            return O.indexOf(e) + 1
        }

        function m(e) {
            return H.indexOf(e) + 1
        }

        function v(e) {
            return " " === e
        }

        function y(e, t) {
            return this instanceof y ? (void 0 === t && (void 0 === e ? e = t = 0 : e instanceof y && (t = e.y, e = e.x)), this.x = e, this.y = t, void Object.seal(this)) : new y(e, t)
        }

        function x(e) {
            var t = function(r, n) {
                return void 0 === n && r instanceof y && (n = r.y, r = r.x), r >= 0 && t.width > r && n >= 0 && t.height > n ? e[n * (t.width + 1) + r] : " "
            };
            return t._used = [], t.width = e.indexOf("\n"), t.height = e.split("\n").length, "\n" === e[e.length - 1] && --t.height, t.q = function(e, r) {
                void 0 === r && e instanceof y && (r = e.y, e = e.x), e >= 0 && t.width > e && r >= 0 && t.height > r && (t._used[r * (t.width + 1) + e] = !0)
            }, t.s = function(e, t) {
                return void 0 === t && e instanceof y && (t = e.y, e = e.x), this._used[t * (this.width + 1) + e] === !0
            }, t.u = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r - 1),
                    i = t(e, r),
                    o = t(e, r + 1),
                    c = t(e + 1, r - 1),
                    l = t(e - 1, r - 1);
                return d(i) ? a(n) || "^" === n || d(n) || f(n) || s(o) || "v" === o || d(o) || f(o) || g(n) || g(o) || "_" === t(e, r - 1) || "_" === l || "_" === c || (a(l) || a(c)) && (s(t(e - 1, r + 1)) || s(t(e + 1, r + 1))) : a(i) || "^" === i ? d(o) || f(o) && "." !== i : s(i) || "v" === i ? d(n) || f(n) && "'" !== i : g(i) ? d(n) || d(o) : !1
            }, t.F = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e - 2, r),
                    a = t(e - 1, r),
                    s = t(e + 0, r),
                    u = t(e + 1, r),
                    d = t(e + 2, r);
                return l(s) || l(a) && f(s) ? l(a) ? l(u) || c(u) || l(n) || o(n) : o(a) ? l(u) : l(u) && (l(d) || c(d)) : "<" === s ? l(u) && l(d) : ">" === s ? l(a) && l(n) : i(s) ? l(a) && l(n) || l(u) && l(d) : !1
            }, t.G = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r - 1),
                    c = t(e + 1, r + 1);
                return "\\" === n ? h(c) || s(c) || g(c) || "v" === c || h(o) || a(o) || g(o) || "^" === o || "/" === t(e, r - 1) || "/" === t(e, r + 1) || "_" === c || "_" === o : "." === n ? "\\" === c : "'" === n ? "\\" === o : "^" === n ? "\\" === c : "v" === n ? "\\" === o : i(n) || g(n) || "|" === n ? h(o) || h(c) : void 0
            }, t.H = function(e, r) {
                void 0 === r && (r = e.x, e = e.x);
                var n = t(e, r),
                    o = t(e - 1, r + 1),
                    c = t(e + 1, r - 1);
                return "/" !== n || "\\" !== t(e, r - 1) && "\\" !== t(e, r + 1) ? p(n) ? p(c) || a(c) || g(c) || "^" === c || "_" === c || p(o) || s(o) || g(o) || "v" === o || "_" === o : "." === n ? "/" === o : "'" === n ? "/" === c : "^" === n ? "/" === o : "v" === n ? "/" === c : i(n) || g(n) || "|" === n ? p(o) || p(c) : !1 : !0
            }, t.toString = function() {
                return e
            }, Object.freeze(t)
        }

        function $(e, t, r, n) {
            this.A = e, this.B = t, r && (this.C = r, this.D = n ? n : r), Object.freeze(this)
        }

        function C() {
            this.Z = []
        }

        function M(e) {
            return function(t, r) {
                for (var n = 0; this.Z.length > n; ++n)
                    if (e.call(this.Z[n], t, r)) return !0;
                return !1
            }
        }

        function j() {
            this._ = []
        }

        function B(e, t) {
            for (var r = 0; e.width > r; ++r)
                for (var n = 0; e.height > n; ++n)
                    if (e.u(r, n)) {
                        var o = y(r, n);
                        do e.q(r, n), ++n; while (e.u(r, n));
                        var c = y(r, n - 1),
                            p = e(o),
                            h = e(o.x, o.y - 1);
                        (!i(p) && ("-" === h || "_" === h || "_" === e(o.x - 1, o.y - 1) || "_" === e(o.x + 1, o.y - 1) || s(h)) || f(h)) && (o.y -= .5);
                        var b = e(c),
                            m = e(c.x, c.y + 1);
                        (!i(b) && ("-" === m || a(m)) || f(m) || "_" === e(c.x - 1, c.y) || "_" === e(c.x + 1, c.y)) && (c.y += .5), (o.x !== c.x || o.y !== c.y) && t.$(new $(o, c))
                    } else "'" === e(r, n) && ("-" === e(r - 1, n) && "_" === e(r + 1, n - 1) && !u(e(r - 1, n - 1)) || "_" === e(r - 1, n - 1) && "-" === e(r + 1, n) && !u(e(r + 1, n - 1))) ? t.$(new $(y(r, n - .5), y(r, n))) : "." === e(r, n) && ("_" === e(r - 1, n) && "-" === e(r + 1, n) && !u(e(r + 1, n + 1)) || "-" === e(r - 1, n) && "_" === e(r + 1, n) && !u(e(r - 1, n + 1))) && t.$(new $(y(r, n), y(r, n + .5)));
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width > r; ++r)
                    if (e.F(r, n)) {
                        var o = y(r, n);
                        do e.q(r, n), ++r; while (e.F(r, n));
                        var c = y(r - 1, n);
                        !i(e(o.x - 1, o.y)) && (a(e(o)) && u(e(o.x - 1, o.y + 1)) || s(e(o)) && u(e(o.x - 1, o.y - 1))) && ++o.x, !i(e(c.x + 1, c.y)) && (a(e(c)) && u(e(c.x + 1, c.y + 1)) || s(e(c)) && u(e(c.x + 1, c.y - 1))) && --c.x, (o.x !== c.x || o.y !== c.y) && t.$(new $(o, c))
                    }
            for (var v = -e.height; e.width > v; ++v)
                for (var r = v, n = 0; e.height > n; ++n, ++r)
                    if (e.G(r, n)) {
                        var o = y(r, n);
                        do e.q(r, n), ++r, ++n; while (e.G(r, n));
                        var c = y(r - 1, n - 1),
                            p = e(o.x, o.y - 1),
                            x = e(o.x - 1, o.y - 1);
                        "/" !== p && "_" !== x && "_" !== p && (i(e(o)) || "\\" !== p && "^" !== p || !l(x) && !d(x)) ? g(x) && (o.x -= .25, o.y -= .25) : (o.x -= .5, o.y -= .5);
                        var w = e(c.x + 1, c.y + 1);
                        "/" === e(c.x, c.y + 1) || "_" === e(c.x + 1, c.y) || "_" === e(c.x - 1, c.y) || !i(e(c)) && (l(w) || d(w)) ? (c.x += .5, c.y += .5) : g(w) && (c.x += .25, c.y += .25), t.$(new $(o, c))
                    }
            for (var v = -e.height; e.width > v; ++v)
                for (var r = v, n = e.height - 1; n >= 0; --n, ++r)
                    if (e.H(r, n)) {
                        var o = y(r, n);
                        do e.q(r, n), ++r, --n; while (e.H(r, n));
                        var c = y(r - 1, n + 1),
                            p = e(c.x, c.y - 1),
                            N = e(c.x + 1, c.y - 1);
                        "\\" === p || "_" === p || "_" === N || !i(e(c)) && (l(N) || d(N)) ? (c.x += .5, c.y -= .5) : g(N) && (c.x += .25, c.y -= .25);
                        var _ = e(o.x - 1, o.y + 1);
                        "\\" === e(o.x, o.y + 1) || "_" === e(o.x - 1, o.y) || "_" === e(o.x + 1, o.y) || !i(e(o)) && (l(_) || d(_)) ? (o.x -= .5, o.y += .5) : g(_) && (o.x -= .25, o.y += .25), t.$(new $(o, c))
                    }
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width > r; ++r) {
                    var k = e(r, n);
                    a(k) && (l(e(r - 1, n)) && d(e(r + 1, n + 1)) && (e.q(r - 1, n), e.q(r, n), e.q(r + 1, n + 1), t.$(new $(y(r - 1, n), y(r + 1, n + 1), y(r + 1.1, n), y(r + 1, n + 1)))), l(e(r + 1, n)) && d(e(r - 1, n + 1)) && (e.q(r - 1, n + 1), e.q(r, n), e.q(r + 1, n), t.$(new $(y(r + 1, n), y(r - 1, n + 1), y(r - 1.1, n), y(r - 1, n + 1))))), ")" !== k && !g(k) || "." !== e(r - 1, n - 1) || "'" !== e(r - 1, n + 1) || (e.q(r, n), e.q(r - 1, n - 1), e.q(r - 1, n + 1), t.$(new $(y(r - 2, n - 1), y(r - 2, n + 1), y(r + .6, n - 1), y(r + .6, n + 1)))), "(" !== k && !g(k) || "." !== e(r + 1, n - 1) || "'" !== e(r + 1, n + 1) || (e.q(r, n), e.q(r + 1, n - 1), e.q(r + 1, n + 1), t.$(new $(y(r + 2, n - 1), y(r + 2, n + 1), y(r - .6, n - 1), y(r - .6, n + 1)))), s(k) && (l(e(r - 1, n)) && d(e(r + 1, n - 1)) && (e.q(r - 1, n), e.q(r, n), e.q(r + 1, n - 1), t.$(new $(y(r - 1, n), y(r + 1, n - 1), y(r + 1.1, n), y(r + 1, n - 1)))), l(e(r + 1, n)) && d(e(r - 1, n - 1)) && (e.q(r - 1, n - 1), e.q(r, n), e.q(r + 1, n), t.$(new $(y(r + 1, n), y(r - 1, n - 1), y(r - 1.1, n), y(r - 1, n - 1)))))
                }
            for (var n = 0; e.height > n; ++n)
                for (var r = 0; e.width - 2 > r; ++r)
                    if ("_" === e(r, n) && "_" === e(r + 1, n)) {
                        var o = y(r - .5, n + .5),
                            C = e(r - 1, n),
                            M = e(r - 2, n);
                        "|" === C || "|" === e(r - 1, n + 1) || "." === C || "'" === e(r - 1, n + 1) ? (o.x -= .5, "." !== C || "-" !== M && "." !== M || "(" !== e(r - 2, n + 1) || (o.x -= .5)) : "/" === C && (o.x -= 1), "(" === C && "(" === M && "'" === e(r, n + 1) && "." === e(r, n - 1) && (o.x += .5), C = M = void 0;
                        do e.q(r, n), ++r; while ("_" === e(r, n));
                        var c = y(r - .5, n + .5),
                            k = e(r, n),
                            j = e(r + 1, n),
                            b = e(r, n + 1);
                        "|" === k || "|" === b || "." === k || "'" === b ? (c.x += .5, "." !== k || "-" !== j && "." !== j || ")" !== e(r + 1, n + 1) || (c.x += .5)) : "\\" === k && (c.x += 1), ")" === k && ")" === j && "'" === e(r - 1, n + 1) && "." === e(r - 1, n - 1) && (c.x += -.5), t.$(new $(o, c))
                    }
        }

        function E(e, t, r) {
            function n(e, t) {
                return v(e) || i(e) || e == t
            }

            function a(e, t, r, i) {
                return n(t, "|") && n(e, "|") && n(i, "-") && n(r, "-")
            }
            for (var s = 0; e.width > s; ++s)
                for (var o = 0; e.height > o; ++o) {
                    var c = e(s, o),
                        l = o;
                    if (f(c)) t.U(s, l - .5) && t.O(s, l + .5) && (r.$(s, l, c), e.q(s, l));
                    else if (g(c)) {
                        var u = e(s, l - 1),
                            d = e(s, l + 1),
                            p = e(s - 1, l),
                            h = e(s + 1, l);
                        (t.W(s - 1, l) || t.V(s + 1, l) || t.U(s, l - 1) || t.O(s, l + 1) || a(u, d, p, h)) && (r.$(s, l, c), e.q(s, l))
                    } else {
                        var b = 0;
                        ">" === c && (t.W(s, l) || t.Y(s, l)) ? (g(e(s + 1, l)) && (b = -.5), r.$(s + b, l, ">", 0), e.q(s, l)) : "<" === c && (t.V(s, l) || t.Y(s, l)) ? (g(e(s - 1, l)) && (b = .5), r.$(s + b, l, ">", 180), e.q(s, l)) : "^" === c ? t.O(s, l - .5) ? (r.$(s, l - .5, ">", 270), e.q(s, l)) : t.O(s, l) ? (r.$(s, l, ">", 270), e.q(s, l)) : t.P(s + .5, l - .5) ? (r.$(s + .5, l - .5, ">", 270 + T), e.q(s, l)) : t.P(s + .25, l - .25) ? (r.$(s + .25, l - .25, ">", 270 + T), e.q(s, l)) : t.P(s, l) ? (r.$(s, l, ">", 270 + T), e.q(s, l)) : t.S(s, l) ? (r.$(s, l, c, 270 - T), e.q(s, l)) : t.S(s - .5, l - .5) ? (r.$(s - .5, l - .5, c, 270 - T), e.q(s, l)) : t.S(s - .25, l - .25) ? (r.$(s - .25, l - .25, c, 270 - T), e.q(s, l)) : t.X(s, l) && (r.$(s, l - .5, ">", 270), e.q(s, l)) : "v" === c && (t.U(s, l + .5) ? (r.$(s, l + .5, ">", 90), e.q(s, l)) : t.U(s, l) ? (r.$(s, l, ">", 90), e.q(s, l)) : t.R(s, l) ? (r.$(s, l, ">", 90 + T), e.q(s, l)) : t.R(s - .5, l + .5) ? (r.$(s - .5, l + .5, ">", 90 + T), e.q(s, l)) : t.R(s - .25, l + .25) ? (r.$(s - .25, l + .25, ">", 90 + T), e.q(s, l)) : t.T(s, l) ? (r.$(s, l, ">", 90 - T), e.q(s, l)) : t.T(s + .5, l + .5) ? (r.$(s + .5, l + .5, ">", 90 - T), e.q(s, l)) : t.T(s + .25, l + .25) ? (r.$(s + .25, l + .25, ">", 90 - T), e.q(s, l)) : t.X(s, l) && (r.$(s, l + .5, ">", 90), e.q(s, l)))
                    }
                }
        }
        e = b(e);
        var A = "\ue004";
        e = e.rp(/([a-z]|[A-Z])o([a-z]|[A-Z])/g, "$1" + A + "$2");
        var R = 8,
            L = 2,
            T = 180 * Math.atan(1 / L) / Math.PI,
            z = 1e-6,
            I = ">v<^",
            O = "o*",
            U = "()",
            H = I + O + U,
            Z = "+",
            F = Z + ".'";
        y.prototype.toString = y.prototype.toSVG = function() {
            return "" + this.x * R + "," + this.y * R * L + " "
        };
        var W = $.prototype;
        W.I = function() {
            return this.B.x === this.A.x
        }, W.J = function() {
            return this.B.y === this.A.y
        }, W.K = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t + e) < z
        }, W.L = function() {
            var e = this.B.x - this.A.x,
                t = this.B.y - this.A.y;
            return Math.abs(t - e) < z
        }, W.M = function() {
            return void 0 !== this.C
        }, W.N = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.A.x === e && this.A.y === t || this.B.x === e && this.B.y === t
        }, W.O = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && q(this.A.y, this.B.y) === t
        }, W.P = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, W.R = function(e, t) {
            return this.K() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, W.S = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.B.y > this.A.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, W.T = function(e, t) {
            return this.L() ? (void 0 === t && (t = e.y, e = e.x), this.A.y > this.B.y ? this.A.x === e && this.A.y === t : this.B.x === e && this.B.y === t) : !1
        }, W.U = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && S(this.A.y, this.B.y) === t
        }, W.V = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && q(this.A.x, this.B.x) === e
        }, W.W = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && S(this.A.x, this.B.x) === e
        }, W.X = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.I() && this.A.x === e && q(this.A.y, this.B.y) <= t && S(this.A.y, this.B.y) >= t
        }, W.Y = function(e, t) {
            return void 0 === t && (t = e.y, e = e.x), this.J() && this.A.y === t && q(this.A.x, this.B.x) <= e && S(this.A.x, this.B.x) >= e
        }, W.toSVG = function() {
            var e = '<path d="M ' + this.A;
            return e += this.M() ? "C " + this.C + this.D + this.B : "L " + this.B, e += '" style="fill:none;stroke:#000;"', e += "/>"
        };
        var K = C.prototype;
        K.$ = function(e) {
            this.Z.push(e)
        }, K.O = M(W.O), K.P = M(W.P), K.S = M(W.S), K.R = M(W.R), K.T = M(W.T), K.U = M(W.U), K.V = M(W.V), K.W = M(W.W), K.N = M(W.N), K.X = M(W.X), K.Y = M(W.Y), K.toSVG = function() {
            for (var e = "", t = 0; this.Z.length > t; ++t) e += this.Z[t].toSVG() + "\n";
            return e
        };
        var P = j.prototype;
        P.$ = function(e, t, r, n) {
            void 0 === r && (r = t, t = e.y, e = e.x), !m(r);
            var i = {
                C: y(e, t),
                type: r,
                angle: n || 0
            };
            g(r) ? this._.push(i) : this._.unshift(i)
        }, P.toSVG = function() {
            for (var e = "", t = 0; this._.length > t; ++t) {
                var r = this._[t],
                    n = r.C;
                if (f(r.type)) {
                    var i = ")" === r.type ? .75 : -.75,
                        a = y(n.x, n.y - .5),
                        s = y(n.x, n.y + .5),
                        o = y(n.x + i, n.y - .5),
                        c = y(n.x + i, n.y + .5);
                    e += '<path d="M ' + s + " C " + c + o + a + '" style="fill:none;stroke:#000;"/>'
                } else if (g(r.type)) e += '<circle cx="' + n.x * R + '" cy="' + n.y * R * L + '" r="' + (R - k) + '" style="fill:' + ("*" === r.type ? "#000" : "#FFF") + ';stroke:#000;"/>';
                else {
                    var l = y(n.x + 1, n.y),
                        a = y(n.x - .5, n.y - .35),
                        s = y(n.x - .5, n.y + .35);
                    e += '<polygon points="' + l + a + s + '" style="fill:#000" transform="rotate(' + r.angle + "," + n + ')"/>\n'
                }
            }
            return e
        };
        var Q = x(e),
            D = new C,
            V = new j;
        B(Q, D), E(Q, D, V);
        var G = '<svg class="diagram" xmlns="http://www.w3.org/2000/svg" version="1.1" height="' + (Q.height + 1) * R * L + '" width="' + (Q.width + 1) * R + '"';
        if ("floatleft" === t ? G += ' style="float:' + t + ';margin: 15px 30px 15px 0px;"' : "floatright" === t ? G += ' style="float:' + t + ';margin: 15px 0px 15px 30px;"' : "center" === t && (G += ' style="margin: 0px auto 0px auto;"'), G += '><g transform="translate(' + y(1, 1) + ')">\n', w) {
            G += '<g style="opacity:0.1">\n';
            for (var X = 0; Q.width > X; ++X)
                for (var J = 0; Q.height > J; ++J) G += '<rect x="' + ((X - .5) * R + 1) + '" + y="' + ((J - .5) * R * L + 2) + '" width="' + (R - 2) + '" height="' + (R * L - 2) + '" style="fill:', G += Q.s(X, J) ? "red;" : " " === Q(X, J) ? "gray; opacity:0.05" : "blue;", G += '"/>\n';
            G += "</g>\n"
        }
        if (G += D.toSVG(), G += V.toSVG(), !_) {
            G += '<g transform="translate(0,0)">';
            for (var X = 0; Q.width > X; ++X)
                for (var J = 0; Q.height > J; ++J) {
                    var Y = Q(X, J);
                    " " === Y || Q.s(X, J) || (G += '<text text-anchor="middle" x="' + X * R + '" y="' + (4 + J * R * L) + '" style="fill:#000;">' + r(Y) + "</text>")
                }
            G += "</g>"
        }
        if (N) {
            G += '<g transform="translate(2, 2)">\n';
            for (var X = 0; Q.width > X; ++X)
                for (var J = 0; Q.height > J; ++J) {
                    var Y = Q(X, J);
                    " " !== Y && (G += '<text text-anchor="middle" x="' + X * R + '" y="' + (4 + J * R * L) + '" style="fill:#F00;font-family:Menlo,monospace;font-size:12px;text-align:center">' + r(Y) + "</text>")
                }
            G += "</g>"
        }
        return G += "</g></svg>", G = G.rp(RegExp(A, "g"), "o")
    }

    function v(e) {
        return -1 !== e.search(/markdeep\S*?\.js$/i)
    }

    function y(e) {
        return Array.prototype.slice.call(e)
    }
    var x = String.prototype;
    x.rp = x.replace, x.ss = x.substring;
    var w = !1,
        N = w,
        _ = N,
        k = 2,
        $ = "*",
        C = Array(6).join($),
        M = e("style", 'body { max-width: 680px;margin:auto;padding:20px;text-align:justify;line-height:139%; color:#222;font-family: Palatino,Georgia,"Times New Roman",serif;}'),
        j = e("style", "body{counter-reset: h1 h2 h3 h4 h5 h6;}.md div.title{font-size:26px;font-weight:800;padding-bottom:0px;line-height:120%;text-align:center;}.md div.afterTitles{height:0px;}.md div.subtitle{text-align:center;}.md div.title, h1, h2, h3, h4, h5, h6, .md .shortTOC, .md .longTOC {font-family:Verdana,Helvetica,Arial,sans-serif;}.md svg.diagram{display:block;font-family:Menlo,'Lucida Console',monospace;font-size:12px;text-align:center;stroke-linecap:round;stroke-width:" + k + "px;}h1{padding-bottom:3px;padding-top:15px;border-bottom:3px solid;border-top:none;font-size:20px;counter-reset: h2 h3 h4 h5 h6;clear:both;}h2{counter-reset: h3 h4 h5 h6;font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-bottom:2px solid #999;border-top:none;color:#555;font-size:18px;clear:both;}h3, h4, h5, h6{font-family:Helvetica,Arial,sans-serif;padding-bottom:3px;padding-top:15px;border-top:none;color:#555;font-size:16px;clear:both;}h3{counter-reset: h4 h5 h6;}h4{counter-reset: h5 h6;}h5{counter-reset: h6;}.md table{margin:auto;border-collapse:collapse;}.md th{color:#FFF;background-color:#AAA;border:1px solid #888;padding:8px 15px 8px 15px;}.md td{padding:5px 15px 5px 15px;border:1px solid #888;}.md tr:nth-child(even){background:#EEE;}.md a:link, .md a:visited{color:#38A;text-decoration:none;}.md a:hover{text-decoration:underline}.md dt{font-weight:700;}.md dd{padding-bottom:18px;}.md code{white-space:pre;}.markdeepFooter{font-size:9px;text-align:right;padding-top:80px;color:#999;}.md .longTOC{float:right;font-size:12px;line-height:15px;border-left:1px solid #CCC;padding-left:15px;margin:15px 0px 15px 25px;}.md .shortTOC{text-align:center;font-weight:bold;margin-top:15px;font-size:14px;}"),
        B = '<!-- Markdeep: --><style class="fallback">body{white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js"></script>',
        E = '<div class="markdeepFooter"><i>formatted by <a href="http://casual-effects.com/markdeep" style="color:#999">Markdeep&nbsp;&nbsp;&nbsp;</a></i><div style="display:inline-block;font-size:13px;font-family:\'Times New Roman\',serif;vertical-align:middle;transform:translate(-3px,-1px)rotate(135deg);">&#x2712;</div></div>',
        A = {
            mode: "markdeep",
            detectMath: !0
        },
        S = Math.max,
        q = Math.min,
        R = "<style>.hljs{display:block;overflow-x:auto;padding:0.5em;background:#fff;color:#000;-webkit-text-size-adjust:none}.hljs-comment{color:#006a00}.hljs-keyword,.hljs-literal,.nginx .hljs-title{color:#aa0d91}.method,.hljs-list .hljs-title,.hljs-tag .hljs-title,.setting .hljs-value,.hljs-winutils,.tex .hljs-command,.http .hljs-title,.hljs-request,.hljs-status,.hljs-name{color:#008}.hljs-envvar,.tex .hljs-special{color:#660}.hljs-string{color:#c41a16}.hljs-tag .hljs-value,.hljs-cdata,.hljs-filter .hljs-argument,.hljs-attr_selector,.apache .hljs-cbracket,.hljs-date,.hljs-regexp{color:#080}.hljs-sub .hljs-identifier,.hljs-pi,.hljs-tag,.hljs-tag .hljs-keyword,.hljs-decorator,.ini .hljs-title,.hljs-shebang,.hljs-prompt,.hljs-hexcolor,.hljs-rule .hljs-value,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-number,.css .hljs-function,.hljs-function .hljs-title,.coffeescript .hljs-attribute{color:#1c00cf}.hljs-class .hljs-title,.smalltalk .hljs-class,.hljs-type,.hljs-typename,.hljs-tag .hljs-attribute,.hljs-doctype,.hljs-class .hljs-id,.hljs-built_in,.setting,.hljs-params,.clojure .hljs-attribute{color:#5c2699}.hljs-variable{color:#3f6e74}.css .hljs-tag,.hljs-rule .hljs-property,.hljs-pseudo,.hljs-subst{color:#000}.css .hljs-class,.css .hljs-id{color:#9b703f}.hljs-value .hljs-important{color:#ff7700;font-weight:bold}.hljs-rule .hljs-keyword{color:#c5af75}.hljs-annotation,.apache .hljs-sqbracket,.nginx .hljs-built_in{color:#9b859d}.hljs-preprocessor,.hljs-preprocessor *,.hljs-pragma{color:#643820}.tex .hljs-formula{background-color:#eee;font-style:italic}.diff .hljs-header,.hljs-chunk{color:#808080;font-weight:bold}.diff .hljs-change{background-color:#bccff9}.hljs-addition{background-color:#baeeba}.hljs-deletion{background-color:#ffc8bd}.hljs-comment .hljs-doctag{font-weight:bold}.method .hljs-id{color:#000}</style>";
    if (!window.alreadyProcessedMarkdeep) {
        window.alreadyProcessedMarkdeep = !0, window.markdeep = Object.freeze({
            format: f,
            formatDiagram: m,
            stylesheet: function() {
                return j + a() + R
            }
        });
        var L = t("mode");
        switch (L) {
            case "script":
                return;
            case "html":
            case "doxygen":
                return y(document.getElementsByClassName("diagram")).concat(y(document.getElementsByTagName("diagram"))).forEach(function(e) {
                    var t = n(e.innerHTML);
                    t = t.rp(/(:?^[ \t]*\n)|(:?\n[ \t]*)$/g, ""), "doxygen" === L && (t = t.rp(RegExp("\u2013", "g"), "--"), t = t.rp(RegExp("\u2014", "g"), "---"), t = t.rp(/<a class="el" .*>(.*)<\/a>/g, "$1")), e.outerHTML = '<center class="md">' + m(g(t), "") + "</center>"
                }), y(document.getElementsByClassName("markdeep")).concat(y(document.getElementsByTagName("markdeep"))).forEach(function(e) {
                    var t = document.createElement("div");
                    t.innerHTML = f(g(n(e.innerHTML)), !0), e.parentNode.replaceChild(t, e)
                }), void(document.head.innerHTML = window.markdeep.stylesheet() + document.head.innerHTML)
        }
        var T = -1 !== window.location.href.search(/\?.*noformat.*/i);
        T || y(document.getElementsByTagName("script")).forEach(function(e) {
            v(e.src) && e.parentNode.removeChild(e)
        });
        var z = s(document.body);
        if (T) return z = z.rp(/<!-- Markdeep:.+(-->|<script.+?<\/script>)/g, "") + B, z = z.rp(/</g, "&lt;").rp(/>/g, "&gt;"), void(document.body.innerHTML = e("pre", z));
        z = n(z), setTimeout(function() {
            var r = f(z, !1),
                n = t("detectMath") && (-1 !== r.search(/(?:\$\$[\s\S]+\$\$)|(?:\\begin{)/m) || -1 !== r.search(/\\\(.*\\\)/));
            if (n) {
                var i = "$$NC{\\n}{\\hat{n}}NC{\\w}{\\hat{\\omega}}NC{\\wi}{\\w_\\mathrm{i}}NC{\\wo}{\\w_\\mathrm{o}}NC{\\wh}{\\w_\\mathrm{h}}NC{\\Li}{L_\\mathrm{i}}NC{\\Lo}{L_\\mathrm{o}}NC{\\Le}{L_\\mathrm{e}}NC{\\Lr}{L_\\mathrm{r}}NC{\\Lt}{L_\\mathrm{t}}NC{\\O}{\\mathrm{O}}NC{\\degrees}{{^\\circ}}NC{\\T}{\\mathsf{T}}NC{\\mathset}[1]{\\mathbb{#1}}NC{\\Real}{\\mathset{R}}NC{\\Integer}{\\mathset{Z}}NC{\\Boolean}{\\mathset{B}}NC{\\Complex}{\\mathset{C}}$$\n".rp(/NC/g, "\\newcommand");
                r = '<script type="text/x-mathjax-config">MathJax.Hub.Config({ TeX: { equationNumbers: {autoNumber: "AMS"} } });</script><span style="display:none">' + i + "</span>\n" + r
            }
            r += E;
            var s = z.length > 1e3,
                o = M + j + a() + R;
            if (s && (o += e("style", "div.title { padding-top: 20px; } div.afterTitles { height: 15px; }")), document.head.innerHTML = '<meta charset="UTF-8"><meta http-equiv="content-type" content="text/html; charset=UTF-8">' + o + document.head.innerHTML, document.body.innerHTML = r, n) {
                var c = document.createElement("script");
                c.type = "text/javascript", c.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML", document.getElementsByTagName("head")[0].appendChild(c)
            }
        }, 0)
    }
}(), ! function(e) {
    "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define("hljs", [], function() {
        return window.hljs
    }))
}(function(e) {
    function t(e) {
        return e.rp(/&/gm, "&amp;").rp(/</gm, "&lt;").rp(/>/gm, "&gt;")
    }

    function r(e) {
        return e.nodeName.toLowerCase()
    }

    function n(e, t) {
        var r = e && e.exec(t);
        return r && 0 == r.index
    }

    function i(e) {
        return /^(no-?highlight|plain|text)$/i.test(e)
    }

    function a(e) {
        var t, r, n, a = e.className + " ";
        if (a += e.parentNode ? e.parentNode.className : "", r = /\blang(?:uage)?-([\w-]+)\b/i.exec(a)) return x(r[1]) ? r[1] : "no-highlight";
        for (a = a.split(/\s+/), t = 0, n = a.length; n > t; t++)
            if (x(a[t]) || i(a[t])) return a[t]
    }

    function s(e, t) {
        var r, n = {};
        for (r in e) n[r] = e[r];
        if (t)
            for (r in t) n[r] = t[r];
        return n
    }

    function o(e) {
        var t = [];
        return function n(e, i) {
            for (var a = e.firstChild; a; a = a.nextSibling) 3 == a.nodeType ? i += a.nodeValue.length : 1 == a.nodeType && (t.push({
                event: "start",
                offset: i,
                node: a
            }), i = n(a, i), r(a).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: i,
                node: a
            }));
            return i
        }(e, 0), t
    }

    function c(e, n, i) {
        function a() {
            return e.length && n.length ? e[0].offset != n[0].offset ? n[0].offset > e[0].offset ? e : n : "start" == n[0].event ? e : n : e.length ? e : n
        }

        function s(e) {
            function n(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + r(e) + Array.prototype.map.call(e.attributes, n).join("") + ">"
        }

        function o(e) {
            u += "</" + r(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? s : o)(e.node)
        }
        for (var l = 0, u = "", d = []; e.length || n.length;) {
            var p = a();
            if (u += t(i.substr(l, p[0].offset - l)), l = p[0].offset, p == e) {
                d.reverse().forEach(o);
                do c(p.splice(0, 1)[0]), p = a(); while (p == e && p.length && p[0].offset == l);
                d.reverse().forEach(s)
            } else "start" == p[0].event ? d.push(p[0].node) : d.pop(), c(p.splice(0, 1)[0])
        }
        return u + t(i.substr(l))
    }

    function l(e) {
        function t(e) {
            return e && e.source || e
        }

        function r(r, n) {
            return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
        }

        function n(i, a) {
            if (!i.compiled) {
                if (i.compiled = !0, i.k = i.k || i.bK) {
                    var o = {},
                        c = function(t, r) {
                            e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
                                var r = e.split("|");
                                o[r[0]] = [t, r[1] ? +r[1] : 1]
                            })
                        };
                    "string" == typeof i.k ? c("keyword", i.k) : Object.keys(i.k).forEach(function(e) {
                        c(e, i.k[e])
                    }), i.k = o
                }
                i.lR = r(i.l || /\b\w+\b/, !0), a && (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"), i.b || (i.b = /\B|\b/), i.bR = r(i.b), i.e || i.eW || (i.e = /\B|\b/), i.e && (i.eR = r(i.e)), i.tE = t(i.e) || "", i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)), i.i && (i.iR = r(i.i)), void 0 === i.r && (i.r = 1), i.c || (i.c = []);
                var l = [];
                i.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(s(e, t))
                    }) : l.push("self" == e ? i : e)
                }), i.c = l, i.c.forEach(function(e) {
                    n(e, i)
                }), i.starts && n(i.starts, a);
                var u = i.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([i.tE, i.i]).map(t).filter(Boolean);
                i.t = u.length ? r(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        n(e)
    }

    function u(e, r, i, a) {
        function s(e, t) {
            for (var r = 0; t.c.length > r; r++)
                if (n(t.c[r].bR, e)) return t.c[r]
        }

        function o(e, t) {
            if (n(e.eR, t)) {
                for (; e.endsParent && e.parent;) e = e.parent;
                return e
            }
            return e.eW ? o(e.parent, t) : void 0
        }

        function c(e, t) {
            return !i && n(t.iR, e)
        }

        function p(e, t) {
            var r = y.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(r) && e.k[r]
        }

        function h(e, t, r, n) {
            var i = n ? "" : w.classPrefix,
                a = '<span class="' + i,
                s = r ? "" : "</span>";
            return a += e + '">', a + t + s
        }

        function f() {
            if (!k.k) return t(M);
            var e = "",
                r = 0;
            k.lR.lastIndex = 0;
            for (var n = k.lR.exec(M); n;) {
                e += t(M.substr(r, n.index - r));
                var i = p(k, n);
                i ? (j += i[1], e += h(i[0], t(n[0]))) : e += t(n[0]), r = k.lR.lastIndex, n = k.lR.exec(M)
            }
            return e + t(M.substr(r))
        }

        function b() {
            var e = "string" == typeof k.sL;
            if (e && !N[k.sL]) return t(M);
            var r = e ? u(k.sL, M, !0, $[k.sL]) : d(M, k.sL.length ? k.sL : void 0);
            return k.r > 0 && (j += r.r), e && ($[k.sL] = r.top), h(r.language, r.value, !1, !0)
        }

        function g() {
            return void 0 !== k.sL ? b() : f()
        }

        function m(e, r) {
            var n = e.cN ? h(e.cN, "", !0) : "";
            e.rB ? (C += n, M = "") : e.eB ? (C += t(r) + n, M = "") : (C += n, M = r), k = Object.create(e, {
                parent: {
                    value: k
                }
            })
        }

        function v(e, r) {
            if (M += e, void 0 === r) return C += g(), 0;
            var n = s(r, k);
            if (n) return C += g(), m(n, r), n.rB ? 0 : r.length;
            var i = o(k, r);
            if (i) {
                var a = k;
                a.rE || a.eE || (M += r), C += g();
                do k.cN && (C += "</span>"), j += k.r, k = k.parent; while (k != i.parent);
                return a.eE && (C += t(r)), M = "", i.starts && m(i.starts, ""), a.rE ? 0 : r.length
            }
            if (c(r, k)) throw Error('Illegal lexeme "' + r + '" for mode "' + (k.cN || "<unnamed>") + '"');
            return M += r, r.length || 1
        }
        var y = x(e);
        if (!y) throw Error('Unknown language: "' + e + '"');
        l(y);
        var _, k = a || y,
            $ = {},
            C = "";
        for (_ = k; _ != y; _ = _.parent) _.cN && (C = h(_.cN, "", !0) + C);
        var M = "",
            j = 0;
        try {
            for (var B, E, A = 0; k.t.lastIndex = A, B = k.t.exec(r), B;) E = v(r.substr(A, B.index - A), B[0]), A = B.index + E;
            for (v(r.substr(A)), _ = k; _.parent; _ = _.parent) _.cN && (C += "</span>");
            return {
                r: j,
                value: C,
                language: e,
                top: k
            }
        } catch (S) {
            if (-1 != S.message.indexOf("Illegal")) return {
                r: 0,
                value: t(r)
            };
            throw S
        }
    }

    function d(e, r) {
        r = r || w.languages || Object.keys(N);
        var n = {
                r: 0,
                value: t(e)
            },
            i = n;
        return r.forEach(function(t) {
            if (x(t)) {
                var r = u(t, e, !1);
                r.language = t, r.r > i.r && (i = r), r.r > n.r && (i = n, n = r)
            }
        }), i.language && (n.second_best = i), n
    }

    function p(e) {
        return w.tabRp && (e = e.rp(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.rp(/\t/g, w.tabRp)
        })), w.useBR && (e = e.rp(/\n/g, "<br>")), e
    }

    function h(e, t, r) {
        var n = t ? _[t] : r,
            i = [e.trim()];
        return e.match(/\bhljs\b/) || i.push("hljs"), -1 === e.indexOf(n) && i.push(n), i.join(" ").trim()
    }

    function f(e) {
        var t = a(e);
        if (!i(t)) {
            var r;
            w.useBR ? (r = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), r.innerHTML = e.innerHTML.rp(/\n/g, "").rp(/<br[ \/]*>/g, "\n")) : r = e;
            var n = r.textContent,
                s = t ? u(t, n, !0) : d(n),
                l = o(r);
            if (l.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = s.value, s.value = c(l, o(f), n)
            }
            s.value = p(s.value), e.innerHTML = s.value, e.className = h(e.className, t, s.language), e.result = {
                language: s.language,
                re: s.r
            }, s.second_best && (e.second_best = {
                language: s.second_best.language,
                re: s.second_best.r
            })
        }
    }

    function b(e) {
        w = s(w, e)
    }

    function g() {
        if (!g.called) {
            g.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f)
        }
    }

    function m() {
        addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
    }

    function v(t, r) {
        var n = N[t] = r(e);
        n.aliases && n.aliases.forEach(function(e) {
            _[e] = t
        })
    }

    function y() {
        return Object.keys(N)
    }

    function x(e) {
        return e = e.toLowerCase(), N[e] || N[_[e]]
    }
    var w = {
            classPrefix: "hljs-",
            tabRp: null,
            useBR: !1,
            languages: void 0
        },
        N = {},
        _ = {};
    return e.highlight = u, e.highlightAuto = d, e.fixMarkup = p, e.highlightBlock = f, e.configure = b, e.initHighlighting = g, e.initHighlightingOnLoad = m, e.aa = v, e.ba = y, e.ca = x, e.inherit = s, e.IR = "[a-zA-Z]\\w*", e.UIR = "[a-zA-Z_]\\w*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, e.C = function(t, r, n) {
        var i = e.inherit({
            cN: "comment",
            b: t,
            e: r,
            c: []
        }, n || {});
        return i.c.push(e.PWM), i.c.push({
            cN: "doctag",
            b: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            r: 0
        }), i
    }, e.CLCM = e.C("//", "$"), e.CBCM = e.C("/\\*", "\\*/"), e.HCM = e.C("#", "$"), e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e.aa("apache", function(e) {
        var t = {
            cN: "number",
            b: "[\\$%]\\d+"
        };
        return {
            aliases: ["apacheconf"],
            cI: !0,
            c: [e.HCM, {
                cN: "tag",
                b: "</?",
                e: ">"
            }, {
                cN: "keyword",
                b: /\w+/,
                r: 0,
                k: {
                    common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    e: /$/,
                    r: 0,
                    k: {
                        literal: "on off all"
                    },
                    c: [{
                        cN: "sqbracket",
                        b: "\\s\\[",
                        e: "\\]$"
                    }, {
                        cN: "cbracket",
                        b: "[\\$%]\\{",
                        e: "\\}",
                        c: ["self", t]
                    }, t, e.QSM]
                }
            }],
            i: /\S/
        }
    }), e.aa("bash", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$[\w\d#@][\w\d_]*/
                }, {
                    b: /\$\{(.*?)}/
                }]
            },
            r = {
                cN: "string",
                b: /"/,
                e: /"/,
                c: [e.BE, t, {
                    cN: "variable",
                    b: /\$\(/,
                    e: /\)/,
                    c: [e.BE]
                }]
            },
            n = {
                cN: "string",
                b: /'/,
                e: /'/
            };
        return {
            aliases: ["sh", "zsh"],
            l: /-?[a-z\.]+/,
            k: {
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",
                operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
            },
            c: [{
                cN: "shebang",
                b: /^#![^\n]+sh\s*$/,
                r: 10
            }, {
                cN: "function",
                b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                rB: !0,
                c: [e.inherit(e.TM, {
                    b: /\w[\w\d_]*/
                })],
                r: 0
            }, e.HCM, e.NM, r, n, t]
        }
    }), e.aa("coffeescript", function(e) {
        var t = {
                keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
                literal: "true false null undefined yes no on off",
                built_in: "npm require console print module global window document"
            },
            r = "[A-Za-z$_][0-9A-Za-z$_]*",
            n = {
                cN: "subst",
                b: /#\{/,
                e: /}/,
                k: t
            },
            i = [e.BNM, e.inherit(e.CNM, {
                starts: {
                    e: "(\\s*/)?",
                    r: 0
                }
            }), {
                cN: "string",
                v: [{
                    b: /'''/,
                    e: /'''/,
                    c: [e.BE]
                }, {
                    b: /'/,
                    e: /'/,
                    c: [e.BE]
                }, {
                    b: /"""/,
                    e: /"""/,
                    c: [e.BE, n]
                }, {
                    b: /"/,
                    e: /"/,
                    c: [e.BE, n]
                }]
            }, {
                cN: "regexp",
                v: [{
                    b: "///",
                    e: "///",
                    c: [n, e.HCM]
                }, {
                    b: "//[gim]*",
                    r: 0
                }, {
                    b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
                }]
            }, {
                cN: "property",
                b: "@" + r
            }, {
                b: "`",
                e: "`",
                eB: !0,
                eE: !0,
                sL: "javascript"
            }];
        n.c = i;
        var a = e.inherit(e.TM, {
                b: r
            }),
            s = "(\\(.*\\))?\\s*\\B[-=]>",
            o = {
                cN: "params",
                b: "\\([^\\(]",
                rB: !0,
                c: [{
                    b: /\(/,
                    e: /\)/,
                    k: t,
                    c: ["self"].concat(i)
                }]
            };
        return {
            aliases: ["coffee", "cson", "iced"],
            k: t,
            i: /\/\*/,
            c: i.concat([e.C("###", "###"), e.HCM, {
                cN: "function",
                b: "^\\s*" + r + "\\s*=\\s*" + s,
                e: "[-=]>",
                rB: !0,
                c: [a, o]
            }, {
                b: /[:\(,=]\s*/,
                r: 0,
                c: [{
                    cN: "function",
                    b: s,
                    e: "[-=]>",
                    rB: !0,
                    c: [o]
                }]
            }, {
                cN: "class",
                bK: "class",
                e: "$",
                i: /[:="\[\]]/,
                c: [{
                    bK: "extends",
                    eW: !0,
                    i: /[:="\[\]]/,
                    c: [a]
                }, a]
            }, {
                cN: "attribute",
                b: r + ":",
                e: ":",
                rB: !0,
                rE: !0,
                r: 0
            }])
        }
    }), e.aa("cpp", function(e) {
        var t = {
                cN: "keyword",
                b: "\\b[a-z\\d_]*_t\\b"
            },
            r = {
                cN: "string",
                v: [e.inherit(e.QSM, {
                    b: '((u8?|U)|L)?"'
                }), {
                    b: '(u8?|U)?R"',
                    e: '"',
                    c: [e.BE]
                }, {
                    b: "'\\\\?.",
                    e: "'",
                    i: "."
                }]
            },
            n = {
                cN: "number",
                v: [{
                    b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
                }, {
                    b: e.CNR
                }]
            },
            i = {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line pragma ifdef ifndef",
                c: [{
                    b: /\\\n/,
                    r: 0
                }, {
                    bK: "include",
                    e: "$",
                    c: [r, {
                        cN: "string",
                        b: "<",
                        e: ">",
                        i: "\\n"
                    }]
                }, r, n, e.CLCM, e.CBCM]
            },
            a = e.IR + "\\s*\\(",
            s = {
                keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
                built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
                literal: "true false nullptr NULL"
            };
        return {
            aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
            k: s,
            i: "</",
            c: [t, e.CLCM, e.CBCM, n, r, i, {
                b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                e: ">",
                k: s,
                c: ["self", t]
            }, {
                b: e.IR + "::",
                k: s
            }, {
                bK: "new throw return else",
                r: 0
            }, {
                cN: "function",
                b: "(" + e.IR + "[\\*&\\s]+)+" + a,
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: s,
                i: /[^\w\s\*&]/,
                c: [{
                    b: a,
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: s,
                    r: 0,
                    c: [e.CLCM, e.CBCM, r, n]
                }, e.CLCM, e.CBCM, i]
            }]
        }
    }), e.aa("cs", function(e) {
        var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield",
            r = e.IR + "(<" + e.IR + ">)?";
        return {
            aliases: ["csharp"],
            k: t,
            i: /::/,
            c: [e.C("///", "$", {
                rB: !0,
                c: [{
                    cN: "xmlDocTag",
                    v: [{
                        b: "///",
                        r: 0
                    }, {
                        b: "<!--|-->"
                    }, {
                        b: "</?",
                        e: ">"
                    }]
                }]
            }), e.CLCM, e.CBCM, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                k: "if else elif endif define undef warning error line region endregion pragma checksum"
            }, {
                cN: "string",
                b: '@"',
                e: '"',
                c: [{
                    b: '""'
                }]
            }, e.ASM, e.QSM, e.CNM, {
                bK: "class interface",
                e: /[{;=]/,
                i: /[^\s:]/,
                c: [e.TM, e.CLCM, e.CBCM]
            }, {
                bK: "namespace",
                e: /[{;=]/,
                i: /[^\s:]/,
                c: [{
                    cN: "title",
                    b: "[a-zA-Z](\\.?\\w)*",
                    r: 0
                }, e.CLCM, e.CBCM]
            }, {
                bK: "new return throw await",
                r: 0
            }, {
                cN: "function",
                b: "(" + r + "\\s+)+" + e.IR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: t,
                c: [{
                    b: e.IR + "\\s*\\(",
                    rB: !0,
                    c: [e.TM],
                    r: 0
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    eB: !0,
                    eE: !0,
                    k: t,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }]
        }
    }), e.aa("css", function(e) {
        var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
            r = {
                cN: "function",
                b: t + "\\(",
                rB: !0,
                eE: !0,
                e: "\\("
            },
            n = {
                cN: "rule",
                b: /[A-Z\_\.\-]+\s*:/,
                rB: !0,
                e: ";",
                eW: !0,
                c: [{
                    cN: "attribute",
                    b: /\S/,
                    e: ":",
                    eE: !0,
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [r, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        }]
                    }
                }]
            };
        return {
            cI: !0,
            i: /[=\/|'\$]/,
            c: [e.CBCM, n, {
                cN: "id",
                b: /\#[A-Za-z0-9_-]+/
            }, {
                cN: "class",
                b: /\.[A-Za-z0-9_-]+/
            }, {
                cN: "attr_selector",
                b: /\[/,
                e: /\]/,
                i: "$"
            }, {
                cN: "pseudo",
                b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
            }, {
                cN: "at_rule",
                b: "@(font-face|page)",
                l: "[a-z-]+",
                k: "font-face page"
            }, {
                cN: "at_rule",
                b: "@",
                e: "[{;]",
                c: [{
                    cN: "keyword",
                    b: /\S+/
                }, {
                    b: /\s/,
                    eW: !0,
                    eE: !0,
                    r: 0,
                    c: [r, e.ASM, e.QSM, e.CSSNM]
                }]
            }, {
                cN: "tag",
                b: t,
                r: 0
            }, {
                cN: "rules",
                b: "{",
                e: "}",
                i: /\S/,
                c: [e.CBCM, n]
            }]
        }
    }), e.aa("diff", function(e) {
        return {
            aliases: ["patch"],
            c: [{
                cN: "chunk",
                r: 10,
                v: [{
                    b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/
                }, {
                    b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                }, {
                    b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
                }]
            }, {
                cN: "header",
                v: [{
                    b: /Index: /,
                    e: /$/
                }, {
                    b: /=====/,
                    e: /=====$/
                }, {
                    b: /^\-\-\-/,
                    e: /$/
                }, {
                    b: /^\*{3} /,
                    e: /$/
                }, {
                    b: /^\+\+\+/,
                    e: /$/
                }, {
                    b: /\*{5}/,
                    e: /\*{5}$/
                }]
            }, {
                cN: "addition",
                b: "^\\+",
                e: "$"
            }, {
                cN: "deletion",
                b: "^\\-",
                e: "$"
            }, {
                cN: "change",
                b: "^\\!",
                e: "$"
            }]
        }
    }), e.aa("http", function(e) {
        return {
            aliases: ["https"],
            i: "\\S",
            c: [{
                cN: "status",
                b: "^HTTP/[0-9\\.]+",
                e: "$",
                c: [{
                    cN: "number",
                    b: "\\b\\d{3}\\b"
                }]
            }, {
                cN: "request",
                b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                rB: !0,
                e: "$",
                c: [{
                    cN: "string",
                    b: " ",
                    e: " ",
                    eB: !0,
                    eE: !0
                }]
            }, {
                cN: "attribute",
                b: "^\\w",
                e: ": ",
                eE: !0,
                i: "\\n|\\s|=",
                starts: {
                    cN: "string",
                    e: "$"
                }
            }, {
                b: "\\n\\n",
                starts: {
                    sL: [],
                    eW: !0
                }
            }]
        }
    }), e.aa("ini", function(e) {
        var t = {
            cN: "string",
            c: [e.BE],
            v: [{
                b: "'''",
                e: "'''",
                r: 10
            }, {
                b: '"""',
                e: '"""',
                r: 10
            }, {
                b: '"',
                e: '"'
            }, {
                b: "'",
                e: "'"
            }]
        };
        return {
            aliases: ["toml"],
            cI: !0,
            i: /\S/,
            c: [e.C(";", "$"), e.HCM, {
                cN: "title",
                b: /^\s*\[+/,
                e: /\]+/
            }, {
                cN: "setting",
                b: /^[a-z0-9\[\]_-]+\s*=\s*/,
                e: "$",
                c: [{
                    cN: "value",
                    eW: !0,
                    k: "on off true false yes no",
                    c: [{
                        cN: "variable",
                        v: [{
                            b: /\$[\w\d"][\w\d_]*/
                        }, {
                            b: /\$\{(.*?)}/
                        }]
                    }, t, {
                        cN: "number",
                        b: /([\+\-]+)?[\d]+_[\d_]+/
                    }, e.NM],
                    r: 0
                }]
            }]
        }
    }), e.aa("java", function(e) {
        var t = e.UIR + "(<" + e.UIR + ">)?",
            r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private",
            n = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
            i = {
                cN: "number",
                b: n,
                r: 0
            };
        return {
            aliases: ["jsp"],
            k: r,
            i: /<\/|#/,
            c: [e.C("/\\*\\*", "\\*/", {
                r: 0,
                c: [{
                    cN: "doctag",
                    b: "@[A-Za-z]+"
                }]
            }), e.CLCM, e.CBCM, e.ASM, e.QSM, {
                cN: "class",
                bK: "class interface",
                e: /[{;=]/,
                eE: !0,
                k: "class interface",
                i: /[:"\[\]]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "new throw return else",
                r: 0
            }, {
                cN: "function",
                b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(",
                rB: !0,
                e: /[{;=]/,
                eE: !0,
                k: r,
                c: [{
                    b: e.UIR + "\\s*\\(",
                    rB: !0,
                    r: 0,
                    c: [e.UTM]
                }, {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    k: r,
                    r: 0,
                    c: [e.ASM, e.QSM, e.CNM, e.CBCM]
                }, e.CLCM, e.CBCM]
            }, i, {
                cN: "annotation",
                b: "@[A-Za-z]+"
            }]
        }
    }), e.aa("javascript", function(e) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
            },
            c: [{
                cN: "pi",
                r: 10,
                b: /^\s*['"]use (strict|asm)['"]/
            }, e.ASM, e.QSM, {
                cN: "string",
                b: "`",
                e: "`",
                c: [e.BE, {
                    cN: "subst",
                    b: "\\$\\{",
                    e: "\\}"
                }]
            }, e.CLCM, e.CBCM, {
                cN: "number",
                v: [{
                    b: "\\b(0[bB][01]+)"
                }, {
                    b: "\\b(0[oO][0-7]+)"
                }, {
                    b: e.CNR
                }],
                r: 0
            }, {
                b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [e.CLCM, e.CBCM, e.RM, {
                    b: /</,
                    e: />\s*[);\]]/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                eE: !0,
                c: [e.inherit(e.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    eB: !0,
                    eE: !0,
                    c: [e.CLCM, e.CBCM]
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + e.IR,
                r: 0
            }, {
                bK: "import",
                e: "[;$]",
                k: "import from as",
                c: [e.ASM, e.QSM]
            }, {
                cN: "class",
                bK: "class",
                e: /[{;=]/,
                eE: !0,
                i: /[:"\[\]]/,
                c: [{
                    bK: "extends"
                }, e.UTM]
            }],
            i: /#/
        }
    }), e.aa("json", function(e) {
        var t = {
                literal: "true false null"
            },
            r = [e.QSM, e.CNM],
            n = {
                cN: "value",
                e: ",",
                eW: !0,
                eE: !0,
                c: r,
                k: t
            },
            i = {
                b: "{",
                e: "}",
                c: [{
                    cN: "attribute",
                    b: '\\s*"',
                    e: '"\\s*:\\s*',
                    eB: !0,
                    eE: !0,
                    c: [e.BE],
                    i: "\\n",
                    starts: n
                }],
                i: "\\S"
            },
            a = {
                b: "\\[",
                e: "\\]",
                c: [e.inherit(n, {
                    cN: null
                })],
                i: "\\S"
            };
        return r.splice(r.length, 0, i, a), {
            c: r,
            k: t,
            i: "\\S"
        }
    }), e.aa("makefile", function(e) {
        var t = {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [e.BE]
        };
        return {
            aliases: ["mk", "mak"],
            c: [e.HCM, {
                b: /^\w+\s*\W*=/,
                rB: !0,
                r: 0,
                starts: {
                    cN: "constant",
                    e: /\s*\W*=/,
                    eE: !0,
                    starts: {
                        e: /$/,
                        r: 0,
                        c: [t]
                    }
                }
            }, {
                cN: "title",
                b: /^[\w]+:\s*$/
            }, {
                cN: "phony",
                b: /^\.PHONY:/,
                e: /$/,
                k: ".PHONY",
                l: /[\.\w]+/
            }, {
                b: /^\t+/,
                e: /$/,
                r: 0,
                c: [e.QSM, t]
            }]
        }
    }), e.aa("xml", function(e) {
        var t = "[A-Za-z0-9\\._:-]+",
            r = {
                b: /<\?(php)?(?!\w)/,
                e: /\?>/,
                sL: "php"
            },
            n = {
                eW: !0,
                i: /</,
                r: 0,
                c: [r, {
                    cN: "attribute",
                    b: t,
                    r: 0
                }, {
                    b: "=",
                    r: 0,
                    c: [{
                        cN: "value",
                        c: [r],
                        v: [{
                            b: /"/,
                            e: /"/
                        }, {
                            b: /'/,
                            e: /'/
                        }, {
                            b: /[^\s\/>]+/
                        }]
                    }]
                }]
            };
        return {
            aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
            cI: !0,
            c: [{
                cN: "doctype",
                b: "<!DOCTYPE",
                e: ">",
                r: 10,
                c: [{
                    b: "\\[",
                    e: "\\]"
                }]
            }, e.C("<!--", "-->", {
                r: 10
            }), {
                cN: "cdata",
                b: "<\\!\\[CDATA\\[",
                e: "\\]\\]>",
                r: 10
            }, {
                cN: "tag",
                b: "<style(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "style"
                },
                c: [n],
                starts: {
                    e: "</style>",
                    rE: !0,
                    sL: "css"
                }
            }, {
                cN: "tag",
                b: "<script(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "script"
                },
                c: [n],
                starts: {
                    e: "</script>",
                    rE: !0,
                    sL: ["actionscript", "javascript", "handlebars"]
                }
            }, r, {
                cN: "pi",
                b: /<\?\w+/,
                e: /\?>/,
                r: 10
            }, {
                cN: "tag",
                b: "</?",
                e: "/?>",
                c: [{
                    cN: "title",
                    b: /[^ \/><\n\t]+/,
                    r: 0
                }, n]
            }]
        }
    }), e.aa("markdown", function(e) {
        return {
            aliases: ["md", "mkdown", "mkd"],
            c: [{
                cN: "header",
                v: [{
                    b: "^#{1,6}",
                    e: "$"
                }, {
                    b: "^.+?\\n[=-]{2,}$"
                }]
            }, {
                b: "<",
                e: ">",
                sL: "xml",
                r: 0
            }, {
                cN: "bullet",
                b: "^([*+-]|(\\d+\\.))\\s+"
            }, {
                cN: "strong",
                b: "[*_]{2}.+?[*_]{2}"
            }, {
                cN: "emphasis",
                v: [{
                    b: "\\*.+?\\*"
                }, {
                    b: "_.+?_",
                    r: 0
                }]
            }, {
                cN: "blockquote",
                b: "^>\\s+",
                e: "$"
            }, {
                cN: "code",
                v: [{
                    b: "`.+?`"
                }, {
                    b: "^( {4}|	)",
                    e: "$",
                    r: 0
                }]
            }, {
                cN: "horizontal_rule",
                b: "^[-\\*]{3,}",
                e: "$"
            }, {
                b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                rB: !0,
                c: [{
                    cN: "link_label",
                    b: "\\[",
                    e: "\\]",
                    eB: !0,
                    rE: !0,
                    r: 0
                }, {
                    cN: "link_url",
                    b: "\\]\\(",
                    e: "\\)",
                    eB: !0,
                    eE: !0
                }, {
                    cN: "link_reference",
                    b: "\\]\\[",
                    e: "\\]",
                    eB: !0,
                    eE: !0
                }],
                r: 10
            }, {
                b: "^\\[.+\\]:",
                rB: !0,
                c: [{
                    cN: "link_reference",
                    b: "\\[",
                    e: "\\]:",
                    eB: !0,
                    eE: !0,
                    starts: {
                        cN: "link_url",
                        e: "$"
                    }
                }]
            }]
        }
    }), e.aa("nginx", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$\d+/
                }, {
                    b: /\$\{/,
                    e: /}/
                }, {
                    b: "[\\$\\@]" + e.UIR
                }]
            },
            r = {
                eW: !0,
                l: "[a-z/_]+",
                k: {
                    built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                },
                r: 0,
                i: "=>",
                c: [e.HCM, {
                    cN: "string",
                    c: [e.BE, t],
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }]
                }, {
                    cN: "url",
                    b: "([a-z]+):/",
                    e: "\\s",
                    eW: !0,
                    eE: !0,
                    c: [t]
                }, {
                    cN: "regexp",
                    c: [e.BE, t],
                    v: [{
                        b: "\\s\\^",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "~\\*?\\s+",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "\\*(\\.[a-z\\-]+)+"
                    }, {
                        b: "([a-z\\-]+\\.)+\\*"
                    }]
                }, {
                    cN: "number",
                    b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, {
                    cN: "number",
                    b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                    r: 0
                }, t]
            };
        return {
            aliases: ["nginxconf"],
            c: [e.HCM, {
                b: e.UIR + "\\s",
                e: ";|{",
                rB: !0,
                c: [{
                    cN: "title",
                    b: e.UIR,
                    starts: r
                }],
                r: 0
            }],
            i: "[^\\s\\}]"
        }
    }), e.aa("objectivec", function(e) {
        var t = {
                cN: "built_in",
                b: "(AV|CA|CF|CG|CI|MK|MP|NS|UI)\\w+"
            },
            r = {
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            n = /[a-zA-Z@][a-zA-Z0-9_]*/,
            i = "@interface @class @protocol @implementation";
        return {
            aliases: ["mm", "objc", "obj-c"],
            k: r,
            l: n,
            i: "</",
            c: [t, e.CLCM, e.CBCM, e.CNM, e.QSM, {
                cN: "string",
                v: [{
                    b: '@"',
                    e: '"',
                    i: "\\n",
                    c: [e.BE]
                }, {
                    b: "'",
                    e: "[^\\\\]'",
                    i: "[^\\\\][^']"
                }]
            }, {
                cN: "preprocessor",
                b: "#",
                e: "$",
                c: [{
                    cN: "title",
                    v: [{
                        b: '"',
                        e: '"'
                    }, {
                        b: "<",
                        e: ">"
                    }]
                }]
            }, {
                cN: "class",
                b: "(" + i.split(" ").join("|") + ")\\b",
                e: "({|$)",
                eE: !0,
                k: i,
                l: n,
                c: [e.UTM]
            }, {
                cN: "variable",
                b: "\\." + e.UIR,
                r: 0
            }]
        }
    }), e.aa("perl", function(e) {
        var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
            r = {
                cN: "subst",
                b: "[$@]\\{",
                e: "\\}",
                k: t
            },
            n = {
                b: "->{",
                e: "}"
            },
            i = {
                cN: "variable",
                v: [{
                    b: /\$\d/
                }, {
                    b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
                }, {
                    b: /[\$%@][^\s\w{]/,
                    r: 0
                }]
            },
            a = [e.BE, r, i],
            s = [i, e.HCM, e.C("^\\=\\w", "\\=cut", {
                eW: !0
            }), n, {
                cN: "string",
                c: a,
                v: [{
                    b: "q[qwxr]?\\s*\\(",
                    e: "\\)",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\[",
                    e: "\\]",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\{",
                    e: "\\}",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\|",
                    e: "\\|",
                    r: 5
                }, {
                    b: "q[qwxr]?\\s*\\<",
                    e: "\\>",
                    r: 5
                }, {
                    b: "qw\\s+q",
                    e: "q",
                    r: 5
                }, {
                    b: "'",
                    e: "'",
                    c: [e.BE]
                }, {
                    b: '"',
                    e: '"'
                }, {
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, {
                    b: "{\\w+}",
                    c: [],
                    r: 0
                }, {
                    b: "-?\\w+\\s*\\=\\>",
                    c: [],
                    r: 0
                }]
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
                k: "split return print reverse grep",
                r: 0,
                c: [e.HCM, {
                    cN: "regexp",
                    b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
                    r: 10
                }, {
                    cN: "regexp",
                    b: "(m|qr)?/",
                    e: "/[a-z]*",
                    c: [e.BE],
                    r: 0
                }]
            }, {
                cN: "sub",
                bK: "sub",
                e: "(\\s*\\(.*?\\))?[;{]",
                r: 5
            }, {
                cN: "operator",
                b: "-\\w\\b",
                r: 0
            }, {
                b: "^__DATA__$",
                e: "^__END__$",
                sL: "mojolicious",
                c: [{
                    b: "^@@.*",
                    e: "$",
                    cN: "comment"
                }]
            }];
        return r.c = s, n.c = s, {
            aliases: ["pl"],
            k: t,
            c: s
        }
    }), e.aa("php", function(e) {
        var t = {
                cN: "variable",
                b: "\\$+[a-zA-Z_-\xff][a-zA-Z0-9_-\xff]*"
            },
            r = {
                cN: "preprocessor",
                b: /<\?(php)?|\?>/
            },
            n = {
                cN: "string",
                c: [e.BE, r],
                v: [{
                    b: 'b"',
                    e: '"'
                }, {
                    b: "b'",
                    e: "'"
                }, e.inherit(e.ASM, {
                    i: null
                }), e.inherit(e.QSM, {
                    i: null
                })]
            },
            i = {
                v: [e.BNM, e.CNM]
            };
        return {
            aliases: ["php3", "php4", "php5", "php6"],
            cI: !0,
            k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
            c: [e.CLCM, e.HCM, e.C("/\\*", "\\*/", {
                c: [{
                    cN: "doctag",
                    b: "@[A-Za-z]+"
                }, r]
            }), e.C("__halt_compiler.+?;", !1, {
                eW: !0,
                k: "__halt_compiler",
                l: e.UIR
            }), {
                cN: "string",
                b: /<<<['"]?\w+['"]?$/,
                e: /^\w+;?$/,
                c: [e.BE, {
                    cN: "subst",
                    v: [{
                        b: /\$\w+/
                    }, {
                        b: /\{\$/,
                        e: /\}/
                    }]
                }]
            }, r, t, {
                b: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                cN: "function",
                bK: "function",
                e: /[;{]/,
                eE: !0,
                i: "\\$|\\[|%",
                c: [e.UTM, {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    c: ["self", t, e.CBCM, n, i]
                }]
            }, {
                cN: "class",
                bK: "class interface",
                e: "{",
                eE: !0,
                i: /[:\(\$"]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "namespace",
                e: ";",
                i: /[\.']/,
                c: [e.UTM]
            }, {
                bK: "use",
                e: ";",
                c: [e.UTM]
            }, {
                b: "=>"
            }, n, i]
        }
    }), e.aa("python", function(e) {
        var t = {
                cN: "prompt",
                b: /^(>>>|\.\.\.) /
            },
            r = {
                cN: "string",
                c: [e.BE],
                v: [{
                    b: /(u|b)?r?'''/,
                    e: /'''/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|b)?r?"""/,
                    e: /"""/,
                    c: [t],
                    r: 10
                }, {
                    b: /(u|r|ur)'/,
                    e: /'/,
                    r: 10
                }, {
                    b: /(u|r|ur)"/,
                    e: /"/,
                    r: 10
                }, {
                    b: /(b|br)'/,
                    e: /'/
                }, {
                    b: /(b|br)"/,
                    e: /"/
                }, e.ASM, e.QSM]
            },
            n = {
                cN: "number",
                r: 0,
                v: [{
                    b: e.BNR + "[lLjJ]?"
                }, {
                    b: "\\b(0o[0-7]+)[lLjJ]?"
                }, {
                    b: e.CNR + "[lLjJ]?"
                }]
            },
            i = {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: ["self", t, n, r]
            };
        return {
            aliases: ["py", "gyp"],
            k: {
                keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
                built_in: "Ellipsis NotImplemented"
            },
            i: /(<\/|->|\?)/,
            c: [t, n, r, e.HCM, {
                v: [{
                    cN: "function",
                    bK: "def",
                    r: 10
                }, {
                    cN: "class",
                    bK: "class"
                }],
                e: /:/,
                i: /[${=;\n,]/,
                c: [e.UTM, i]
            }, {
                cN: "decorator",
                b: /^[\t ]*@/,
                e: /$/
            }, {
                b: /\b(print|exec)\(/
            }]
        }
    }), e.aa("ruby", function(e) {
        var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
            r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
            n = {
                cN: "doctag",
                b: "@[A-Za-z]+"
            },
            i = {
                cN: "value",
                b: "#<",
                e: ">"
            },
            a = [e.C("#", "$", {
                c: [n]
            }), e.C("^\\=begin", "^\\=end", {
                c: [n],
                r: 10
            }), e.C("^__END__", "\\n$")],
            s = {
                cN: "subst",
                b: "#\\{",
                e: "}",
                k: r
            },
            o = {
                cN: "string",
                c: [e.BE, s],
                v: [{
                    b: /'/,
                    e: /'/
                }, {
                    b: /"/,
                    e: /"/
                }, {
                    b: /`/,
                    e: /`/
                }, {
                    b: "%[qQwWx]?\\(",
                    e: "\\)"
                }, {
                    b: "%[qQwWx]?\\[",
                    e: "\\]"
                }, {
                    b: "%[qQwWx]?{",
                    e: "}"
                }, {
                    b: "%[qQwWx]?<",
                    e: ">"
                }, {
                    b: "%[qQwWx]?/",
                    e: "/"
                }, {
                    b: "%[qQwWx]?%",
                    e: "%"
                }, {
                    b: "%[qQwWx]?-",
                    e: "-"
                }, {
                    b: "%[qQwWx]?\\|",
                    e: "\\|"
                }, {
                    b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
                }]
            },
            c = {
                cN: "params",
                b: "\\(",
                e: "\\)",
                k: r
            },
            l = [o, i, {
                cN: "class",
                bK: "class module",
                e: "$|;",
                i: /=/,
                c: [e.inherit(e.TM, {
                    b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
                }), {
                    cN: "inheritance",
                    b: "<\\s*",
                    c: [{
                        cN: "parent",
                        b: "(" + e.IR + "::)?" + e.IR
                    }]
                }].concat(a)
            }, {
                cN: "function",
                bK: "def",
                e: "$|;",
                c: [e.inherit(e.TM, {
                    b: t
                }), c].concat(a)
            }, {
                cN: "constant",
                b: "(::)?(\\b[A-Z]\\w*(::)?)+",
                r: 0
            }, {
                cN: "symbol",
                b: e.UIR + "(\\!|\\?)?:",
                r: 0
            }, {
                cN: "symbol",
                b: ":",
                c: [o, {
                    b: t
                }],
                r: 0
            }, {
                cN: "number",
                b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
                r: 0
            }, {
                cN: "variable",
                b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
            }, {
                b: "(" + e.RSR + ")\\s*",
                c: [i, {
                    cN: "regexp",
                    c: [e.BE, s],
                    i: /\n/,
                    v: [{
                        b: "/",
                        e: "/[a-z]*"
                    }, {
                        b: "%r{",
                        e: "}[a-z]*"
                    }, {
                        b: "%r\\(",
                        e: "\\)[a-z]*"
                    }, {
                        b: "%r!",
                        e: "![a-z]*"
                    }, {
                        b: "%r\\[",
                        e: "\\][a-z]*"
                    }]
                }].concat(a),
                r: 0
            }].concat(a);
        s.c = l, c.c = l;
        var u = "[>?]>",
            d = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
            p = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
            h = [{
                b: /^\s*=>/,
                cN: "status",
                starts: {
                    e: "$",
                    c: l
                }
            }, {
                cN: "prompt",
                b: "^(" + u + "|" + d + "|" + p + ")",
                starts: {
                    e: "$",
                    c: l
                }
            }];
        return {
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            k: r,
            c: a.concat(h).concat(l)
        }
    }), e.aa("sql", function(e) {
        var t = e.C("--", "$");
        return {
            cI: !0,
            i: /[<>{}*]/,
            c: [{
                cN: "operator",
                bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load rp select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke",
                e: /;/,
                eW: !0,
                k: {
                    keyword: "abort",
                    literal: "true false null",
                    built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"
                },
                c: [{
                    cN: "string",
                    b: "'",
                    e: "'",
                    c: [e.BE, {
                        b: "''"
                    }]
                }, {
                    cN: "string",
                    b: '"',
                    e: '"',
                    c: [e.BE, {
                        b: '""'
                    }]
                }, {
                    cN: "string",
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, e.CNM, e.CBCM, t]
            }, e.CBCM, t]
        }
    }), e
});
