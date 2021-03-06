/*
 Name:    Highcharts
 Version: 1.1.0 (2009-12-18)
 Author:  Vevstein Web
 Support: www.highcharts.com/support
 License: www.highcharts.com/license
 */

(function() {	
	var count;
	function Ib(a) {
		return a && a.constructor == Array
	}
	function hb(a, b, c) {
		var d, e = "", f = c ? "print" : "", g = function(i) {
			return X("style", {
				type : "text/css",
				media : i ? "print" : ""
			}, null, oa.getElementsByTagName("HEAD")[0])
		};
		zb || (zb = g());
		for (d in b)
			e += kb(d) + ":" + b[d] + ";";
		if (ya) {
			b = oa.styleSheets;
			c && g(true);
			for (c = b.length - 1; c >= 0 && b[c].media != f;)
				c--;
			f = b[c];
			f.addRule(a, e)
		} else
			zb.appendChild(oa.createTextNode(a + " {" + e + "}\n"))
	}
	function J(a, b) {
		a || (a = {});
		for ( var c in b)
			a[c] = b[c];
		return a
	}
	function Yb(a) {
		return La = T(La, a)
	}
	function Wa(a, b) {
		var c = function() {
		};
		c.prototype = new a;
		J(c.prototype, b);
		return c
	}
	function Ab(a) {
		for ( var b = [], c = a.length - 1; c >= 0; c--)
			b.push(a[c]);
		return b
	}
	function Jb(a, b) {
		if (typeof a == "string")
			return a;
		else if (a.linearGradient) {
			var c = b.createLinearGradient.apply(b, a.linearGradient);
			t(a.stops, function(d) {
				c.addColorStop(d[0], d[1])
			});
			return c
		}
	}
	function X(a, b, c, d, e) {
		a = oa.createElement(a);
		b && J(a, b);
		e && va(a, {
			padding : 0,
			border : "none",
			margin : 0
		});
		c && va(a, c);
		d && d.appendChild(a);
		return a
	}
	function va(a, b) {
		if (ya)
			if (b.opacity !== fa)
				/**
				 * @author Administrator
				 *
				 */
				b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
		J(a.style, b)
	}
	function Zb(a, b, c, d) {
		a = a;
		var e = isNaN(b = Ba(b)) ? 2 : b;
		b = c === fa ? "." : c;
		d = d === fa ? "," : d;
		c = a < 0 ? "-" : "";
		var f = parseInt(a = Ba(+a || 0).toFixed(e)) + "", g = (g = f.length) > 3 ? g % 3
				: 0;
		return c + (g ? f.substr(0, g) + d : "")
		+ f.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d)
		+ (e ? b + Ba(a - f).toFixed(e).slice(2) : "")
	}
	function Kb(a, b, c) {
		function d(z) {
			return z.toString().replace(/^([0-9])$/, "0$1")
		}
		b = new Date(b * za);
		var e = b.getUTCHours(), f = b.getUTCDay(), g = b.getUTCDate(), i = b
		.getUTCMonth(), j = b.getUTCFullYear();
		lang = La.lang;
		var n = lang.weekdays, q = lang.months;
		b = {
				a : n[f].substr(0, 3),
				A : n[f],
				d : d(g),
				e : g,
				b : q[i].substr(0, 3),
				B : q[i],
				m : d(i + 1),
				y : j.toString().substr(2, 2),
				Y : j,
				H : d(e),
				I : d(e % 12 || 12),
				l : e % 12 || 12,
				M : d(b.getUTCMinutes()),
				p : e < 12 ? "AM" : "PM",
						P : e < 12 ? "am" : "pm",
								S : d(b.getUTCSeconds())
		};
		for ( var m in b)
			a = a.replace("%" + m, b[m]);
		return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
	}
	function Lb(a) {
		for ( var b = {
				x : a.offsetLeft,
				y : a.offsetTop
		}; a.offsetParent;) {
			a = a.offsetParent;
			b.x += a.offsetLeft;
			b.y += a.offsetTop;
			if (a != oa.body && a != oa.documentElement) {
				b.x -= a.scrollLeft;
				b.y -= a.scrollTop
			}
		}
		return b
	}
	function $b(a) {
		function b() {
			var r = {
					line : Ca,
					spline : Mb,
					area : ac,
					areaspline : bc,
					column : Bb,
					bar : cc,
					pie : dc,
					scatter : ec
			}, k, v;
			t(a.series, function(O) {
				k = r[O.type || o.defaultSeriesType];
				v = new k;
				v.init(w, O);
				if (v.inverted)
					Qa = true;
				Xa.push(v)
			})
		}
		function c() {
			var r = a.xAxis || {}, k = a.yAxis || {};
			Ib(r) || (r = [ r ]);
			t(r, function(v, O) {
				v.index = O;
				v.isX = true
			});
			Ib(k) || (k = [ k ]);
			t(k, function(v, O) {
				v.index = O
			});
			Ma = r.concat(k);
			Ma = Ra(Ma, function(v) {
				return new j(w, v)
			});
			t(Ma, function(v) {
				v.adjustTickAmount()
			})
		}
		function d() {
			var r = true;
			for ( var k in w.resources)
				w.resources[k] || (r = false);
			r && g()
		}
		function e(r) {
			w.toolbar.add("zoom", "Reset zoom", "Reset zoom level 1:1",
					function() {
				Ga(w, "selection", {
					resetSelection : true
				}, e);
				w.toolbar.remove("zoom")
			});
			db = null;
			if (r.resetSelection)
				t(Ma, function(k) {
					k.reset()
				});
			else {
				w.tracker.zoomX && t(r.xAxis, function(k) {
					k.axis.setExtremes(k.min, k.max) //X�᷶Χ����
				});
				w.tracker.zoomY && t(r.yAxis, function(k) {
					k.axis.setExtremes(k.min, k.max)
				})
			}
			t(Ma, function(k) {
				k.adjustTickAmount()
			});
			ib.hide();
			t(w.series, function(k) {
				t(k.areas, function(v) {
					v.parentNode.removeChild(v)
				});
				k.translate();
				k.createArea();
				k.clear();
				k.type == "spline" && k.getSplineData()
			});
			lb && t(Ma, function(k) {
				k.render()
			});
			t(Xa, function(k) {
				k.render()
			})
		}
		function f() {
			if (!w.titleLayer) {
				var r = w.titleLayer = new ja("title-layer", ga, null, {
					zIndex : 5
				});
				a.title && X("h2", {
					className : "highcharts-title",
					innerHTML : a.title.text
				}, a.title.style, r.div);
				a.subtitle && X("h3", {
					className : "highcharts-subtitle",
					innerHTML : a.subtitle.text
				}, a.subtitle.style, r.div)
			}
		}
		function g() {
			c();
			t(Xa, function(r) {
				r.translate();
				a.tooltip.enabled && r.options.enableMouseTracking !== false  //������
				&& r.createArea()

			});
			w.render = i;
			setTimeout(function() {
				i();
				Ga(w, "load")
			}, 0)
		}
		function i() {
			var r, k = a.labels, v = a.credits;
			r = 2 * (o.borderWidth || 0) + (o.shadow ? 8 : 0);
			Nb.drawRect(r / 2, r / 2, Y - r, K - r, o.borderColor,
					o.borderWidth, o.borderRadius, o.backgroundColor, o.shadow);
			Nb.drawRect(L, F, pa, ha, o.plotBorderColor, o.plotBorderWidth,
					null, o.plotBackgroundColor, o.plotShadow, mb);
			ya && hb(".highcharts-image-map", {
				display : "none"
			}, "print");
			lb && t(Ma, function(O) {
				O.render()
			});
			f();
			k.items && t(k.items, function() {
				var O = J( {
					className : "highcharts-label"
				}, this.attributes);
				Cb.drawHtml(this.html, O, J(k.style, this.style))
			});
			for (r = 0; r < Xa.length; r++)
				Xa[r].render();
			w.legend = new z(w);
			if (!w.toolbar)
				w.toolbar = n(w);
			if (v.enabled && !w.credits)
				w.credits = X("a", {
					href : v.href,
					innerHTML : v.text
				}, J(v.style, {
					zIndex : 8
				}), ga)
		}
		function j(r, k) {
			function v() {
				k = T(la ? nb : Db, W ? ra ? fc : Ob : ra ? gc : hc, k)
			}
			function O() {
				var p = [], u;
				t(
						Xa,
						function(A) {
							u = false;
							t(
									[ "xAxis", "yAxis" ],
									function(C) {
										if ((C == "xAxis" && la || C == "yAxis"
											&& !la)
											&& (A.options[C] == k.index || A.options[C] === fa
													&& k.index == 0)) {
											A[C] = eb;
											u = true
										}
									});
							if (u) {
								var x;
								if (!la) {
									x = A.options.stacking;
									ob = x == "percent";
									if (x)
										var E = p[A.type] = p[A.type] || [];
									if (ob) {
										Ha = 0;
										Ya = 99
									}
								}
								if (A.isCartesian) {
									lb = true;
									t(A.data, function(C, P) {
										if (Ha === fa) {
											Ha = Ya = C[pb];
											if (!la
													&& /(area|column|bar)/
													.test(A.type)) {
												Ha = 0;
												Pb = true
											}
										}
										if (la)
											if (C.x > Ya)
												Ya = C.x;
											else {
												if (C.x < Ha)
													Ha = C.x
											}
										else {
											if (x)
												E[P] = E[P] ? E[P] + C.y : C.y;
												P = E ? E[P] : C.y;
												if (!ob)
													if (P > Ya)
														Ya = P;
													else if (P < Ha)
														Ha = P;
												if (x)
													Sa[A.type][C.x] = {
														total : P,
														cum : P
												}
										}
									})
								}
							}
						})
			}
			function ba(p, u, A) {
				var x = 1, E = 0;
				if (A) {
					x *= -1;
					E = qb
				}
				if (fb) {
					x *= -1;
					E -= x * qb
				}
				if (u)
					return (p - 0) / Za + ca;
				return x * (p - ca) * Za + E
			}
			function D(p, u, A) {
				if (A) {
					var x, E, C;
					x = ba(p);
					p = E = x + rb;
					x = C = K - x - rb;
					if (W) {
						x = F;
						C = K - ia
					} else {
						p = L;
						E = Y - ka
					}
					Qb.drawLine(p, x, E, C, u, A)
				}
			}
			function Q(p, u, A) {
				var x = (u - p) * Za;
				D(p + (u - p) / 2, A, x)
			}
			function R(p, u, A, x, E, C) {
				var P, B, sa, N = k.labels;
				if (u == "inside")
					E = -E;
				if (ra)
					E = -E;
				u = B = ba(p + $a) + rb;
				P = sa = K - ba(p + $a) - rb;
				if (W) {
					P = K - ia - (ra ? ha : 0) + Ta;
					sa = P + E
				} else {
					u = L + (ra ? pa : 0) + Ta;
					B = u - E
				}
				x && gb.drawLine(u, P, B, sa, A, x);
				if (C && N.enabled)
					if ((p = sb.call( {
						value : wa && wa[p] ? wa[p] : p
					})) || p === 0)
						gb.addText(p, u + N.x
								- ($a && W ? $a * Za * (fb ? -1 : 1) : 0), P
								+ N.y
								- ($a && !W ? $a * Za * (fb ? 1 : -1) : 0),
								N.style, N.rotation, N.align)
			}
			function S(p, u) {
				var A;
				jb = u ? 1 : ma.pow(10, Da(ma.log(p) / ma.LN10));
				A = p / jb;
				u || (u = [ 1, 2, 2.5, 5, 10 ]);
				for ( var x = 0; x < u.length; x++) {
					p = u[x];
					if (A <= (u[x] + (u[x + 1] || u[x])) / 2)
						break
				}
				p *= jb;
				return p
			}
			function H() {
				na = [];
				for ( var p = 1E3 / za, u = 6E4 / za, A = 36E5 / za, x = 864E5 / za, E = 6048E5 / za, C = 2592E6 / za, P = 31556952E3 / za, B = [
				                                                                                                                                 [ "second", p, [ 1, 2, 5, 10, 15, 30 ] ],
				                                                                                                                                 [ "minute", u, [ 1, 2, 5, 10, 15, 30 ] ],
				                                                                                                                                 [ "hour", A, [ 1, 2, 3, 4, 6, 8, 12 ] ],
				                                                                                                                                 [ "day", x, [ 1, 2 ] ], [ "week", E, [ 1, 2 ] ],
				                                                                                                                                 [ "month", C, [ 1, 2, 3, 4, 6 ] ], [ "year", P, null ] ], sa = B[6], N = sa[1], U = sa[2], Ia = 0; Ia < B.length; Ia++) {
					sa = B[Ia];
					N = sa[1];
					U = sa[2];
					if (B[Ia + 1]) {
						var ic = (N * U[U.length - 1] + B[Ia + 1][1]) / 2;
						if (qa <= ic)
							break
					}
				}
				if (N == P && qa < 5 * N)
					U = [ 1, 2, 5 ];
				B = S(qa / N, U);
				var ab;
				U = new Date(ca * za);
				U.setUTCMilliseconds(0);
				if (N >= p)
					U.setUTCSeconds(N >= u ? 0 : B * Da(U.getUTCSeconds() / B));
				if (N >= u)
					U.setUTCMinutes(N >= A ? 0 : B * Da(U.getUTCMinutes() / B));
				if (N >= A)
					U.setUTCHours(N >= x ? 0 : B * Da(U.getUTCHours() / B));
				if (N >= x)
					U.setUTCDate(N >= C ? 1 : B * Da(U.getUTCDate() / B));
				if (N >= C) {
					U.setUTCMonth(N >= P ? 0 : B * Da(U.getUTCMonth() / B));
					ab = U.getUTCFullYear()
				}
				if (N >= P) {
					ab -= ab % B;
					U.setUTCFullYear(ab)
				}
				N == E
				&& U.setUTCDate(U.getUTCDate() - U.getUTCDay()
						+ k.startOfWeek);
				Ia = 1;
				p = ca = U.getTime() / za;
				ab = U.getUTCFullYear();
				for (u = U.getUTCMonth(); p < da && Ia < 100;) {
					na.push(p);
					if (N == P)
						p = Date.UTC(ab + Ia * B, 0) / za;
					else if (N == C)
						p = Date.UTC(ab, u + Ia * B) / za;
					else
						p += N * B;
					Ia++
				}
				da = p;
				k.labels.formatter || (sb = function() {
					return Kb(k.dateTimeLabelFormats[sa[0]], this.value, 1)
				})
			}
			function s() {
				na = [];
				ca = Da(ca / qa) * qa;
				da = ma.ceil(da / qa) * qa;
				for ( var p = (jb < 1 ? 1 / jb : 1) * 10, u = ca; u <= da; u += qa)
					na.push(I(u * p) / p);
				if (wa) {
					ca -= 0.5;
					da += 0.5
				}
				sb || (sb = function() {
					return this.value
				})
			}
			function M() {
				if (!bb && !wa) {
					var p = na.length, u = db[pb];
					if (p < u) {
						for (; na.length < u;)
							na.push(na[na.length - 1] + qa);
						Za *= (p - 1) / (u - 1)
					}
				}
			}
			function l() {
				var p, u = k.min === null, A = k.max === null;
				if (ca === null)
					ca = u ? Ha : k.min;
				if (da === null)
					da = A ? Ya : k.max;
				if (!wa && !ob) {
					p = da - ca || 1;
					if (u && Rb && (Ha < 0 || !Pb))
						ca -= p * Rb;
					if (A && Sb)
						da += p * Sb
				}
				qa = wa || ca == da ? 1 : k.tickInterval == "auto" ? (da - ca)
						* k.tickPixelInterval / qb : k.tickInterval;
				bb || (qa = S(qa));
				tb = k.minorTickInterval == "auto" && qa ? qa / 5
						: k.minorTickInterval;
				bb ? H() : s();
				Za = qb / (da - ca || 1);
				db || (db = {
						x : 0,
						y : 0
				});
				if (!bb && na.length > db[pb])
					db[pb] = na.length;
				if (!la)
					for ( var x in Sa)
						t(Sa[x], function(E, C) {
							E = E.total;
							Sa[x][C] = {
									total : E,
									cum : E
							}
						})
			}
			function V(p, u) {
				var A;
				if (wa) {
					if (p < 0)
						p = 0;
					if (u > wa.length - 1)
						u = wa.length - 1
				}
				if (u - p > k.maxZoom) {
					ca = p;
					da = u
				} else {
					A = (k.maxZoom - u + p) / 2;
					ca = p - A;
					da = u + A
				}
				l()
			}
			function ea() {
				ca = da = qa = tb = na = null;
				l()
			}
			function Aa() {
				var p = k.title, u = k.alternateGridColor, A = k.plotBands, x = k.plotLines, E = k.minorTickWidth, C = k.lineWidth, P;
				gb.clear();
				Qb.clear();
				u && t(na, function(B, sa) {
					if (sa % 2 == 0 && B < da)
						Q(B, na[sa + 1] !== fa ? na[sa + 1] : da, u)
				});
				A && t(A, function(B) {
					Q(B.from, B.to, B.color)
				});
				if (tb && !wa)
					for (A = ca; A <= da; A += tb) {
						D(A, k.minorGridLineColor, k.minorGridLineWidth);
						E
						&& R(A, k.minorTickPosition, k.minorTickColor,
								E, k.minorTickLength)
					}
				t(na, function(B) {
					P = B + $a;
					D(P, k.gridLineColor, k.gridLineWidth);
					R(B, k.tickPosition, k.tickColor, k.tickWidth,
							k.tickLength,
							!(B == ca && !k.showFirstLabel || B == da
									&& !k.showLastLabel))
				});
				x && t(x, function(B) {
					D(B.value, B.color, B.width)
				});
				if (C) {
					x = L + (ra ? pa : 0) + Ta;
					E = K - ia - (ra ? ha : 0) + Ta;
					gb.drawLine(W ? L : x, W ? E : F, W ? Y - ka : x, W ? E : K
							- ia, k.lineColor, C)
				}
				if (p && p.enabled && p.text) {
					C = W ? L : F;
					x = W ? pa : ha;
					C = {
							low : C + (W ? 0 : x),
							middle : C + x / 2,
							high : C + (W ? x : 0)
					}[p.align];
					x = (W ? F + ha : L)
					+ (W ? 1 : -1)
					* (ra ? -1 : 1)
					* p.margin
					- (ya ? parseInt(p.style.fontSize
							|| p.style.font.replace(/^[a-z ]+/, "")) / 3
							: 0);
					gb.addText(p.text, W ? C : x + (ra ? pa : 0) + Ta, W ? x
							- (ra ? ha : 0) + Ta : C, p.style, p.rotation || 0,
							{
								low : "left",
								middle : "center",
								high : "right"
							}[p.align])
				}
				gb.strokeText()
			}
			var la = k.isX, ra = k.opposite, W = Qa ? !la : la, Sa = {
					column : [],
					area : [],
					areaspline : []
			};
			v();
			var eb = this, bb = k.type == "datetime", Ta = k.offset || 0, pb = la ? "x"
					: "y", qb = W ? pa : ha, Za, rb = W ? L : ia, gb = new ja(
							"axis-layer", ga, null, {
								zIndex : 7
							}), Qb = new ja("grid-layer", ga, null, {
								zIndex : 1
							}), Ha, Ya, da = null, ca = null, Rb = k.minPadding, Pb, ob, Sb = k.maxPadding, qa, tb, jb, na, sb = k.labels.formatter, wa = k.categories
							|| la && r.columnCount, fb = k.reversed, $a = wa
							&& k.tickmarkPlacement == "between" ? 0.5 : 0;
			if (Qa && la && fb === fa)
				fb = true;
			ra || (Ta *= -1);
			if (W)
				Ta *= -1;
			J(eb, {
				addPlotLine : D,
				adjustTickAmount : M,
				categories : wa,
				isXAxis : la,
				render : Aa,
				translate : ba,
				setExtremes : V,
				reset : ea,
				reversed : fb,
				stacks : Sa
			});
			O();
			l()
		}
		function n() {
			function r(ba, D, Q, R) {
				if (!O[ba]) {
					D = X(Na, {
						innerHTML : D,
						title : Q,
						onclick : R
					}, J(a.toolbar.itemStyle, {
						zIndex : 1003
					}), v.div);
					O[ba] = D
				}
			}
			function k(ba) {
				O[ba].parentNode.removeChild(O[ba]);
				O[ba] = null
			}
			var v, O = {};
			v = new ja("toolbar", ga, null, {
				zIndex : 1004,
				width : "auto",
				height : "auto"
			});
			return {
				add : r,
				remove : k
			}
		}
		function q(r, k) {                 //��ȡ��ǰ����¼�����
			function v(l) {
				l = l || Ja.event;
				if (!l.target)
					l.target = l.srcElement;
				if (!l.pageX)
					l.pageX = l.clientX
					+ (oa.documentElement.scrollLeft || oa.body.scrollLeft);
				if (!l.pageY)
					l.pageY = l.clientY
					+ (oa.documentElement.scrollTop || oa.body.scrollTop);
				return l
			}
			function O() {
				ta.onmousemove = function(l) {
					l = v(l);   //V������ȡ��ǰ���
					l.returnValue = false;
					if (ub) {            //������down��״̬
						if (s) {
							var V = l.pageX - R - Oa.x - L;
							va(H, {
								width : Ba(V) + G,
								left : (V > 0 ? R : R + V) + G
							})
						}
						if (M) {
							l = l.pageY - S - Oa.y - F;
							va(H, {
								height : Ba(l) + G,
								top : (l > 0 ? S : S + l) + G
							})
						}
					} else    //���upʱ��������H��ֵΪFALSE
						ba(l); 
					return false;
				};

				/*ta.onmousedown = function(l) {
					l = v(l);//V������ȡ��ǰ���
					if (lb && (s || M)) {
						l.preventDefault && l.preventDefault();
						ub = true;
						R = l.pageX - Oa.x - L;
						S = l.pageY - Oa.y - F;
						H || (H = X(Na, null, {
							position : ua,
							border : "none",
							background : "#4572A7",
							opacity : 0.25,
							width : s ? 0 : pa + G,
									height : M ? 0 : ha + G
						}));
						Cb.div.appendChild(H)
					}					

				};
				ta.onmouseup = function() {
					var l;
					if (H) {
						var V = {
								xAxis : [],
								yAxis : []
						}, ea = H.offsetLeft, Aa = H.offsetTop, la = H.offsetWidth, ra = H.offsetHeight;
						ub = false;
						if (la > 10 && ra > 10) {
							t(
									Ma,
									function(W) {
										var Sa = W.translate, eb = W.isXAxis, bb = Qa ? !eb
												: eb;
										V[eb ? "xAxis" : "yAxis"].push( {
											axis : W,
											min : Sa(bb ? ea : ha - Aa - ra,
													true),
													max : Sa(bb ? ea + la : ha - Aa,
															true)
										})
									});
							Ga(r, "selection", V, e);
							l = true
						}
						H.parentNode.removeChild(H);
						H = null
					}					
				};*/
				/*ta.onmouseout = function(l) {
					l = l || Ja.event;
					if ((l = l.relatedTarget || l.toElement) && l != xa
							&& l.tagName != "AREA") {
						ib.hide();
						if (r.hoverSeries) {
							r.hoverSeries.setState();
							Q = r.hoverSeries = null
						}
					}
				};*/
				////////////////////////////////////////////////////////////////////////
				ta.onclick = function(l) {
					//alert("this is first");
					if(count)
						{//alert("this is first");
						l = v(l);//V������ȡ��ǰ���
						if (lb && (s || M)) {
							l.preventDefault && l.preventDefault();
							ub = true;
							R = l.pageX - Oa.x - L;
							S = l.pageY - Oa.y - F;
							H || (H = X(Na, null, {
								position : ua,
								border : "none",
								background : "#4572A7",
								opacity : 0.25,
								width : s ? 0 : pa + G,
										height : M ? 0 : ha + G
							}));
							Cb.div.appendChild(H)
						}	
						}
					else
						{//alert("this is sec");
						var l;
						if (H) {
							var V = {
									xAxis : [],
									yAxis : []
							}, ea = H.offsetLeft, Aa = H.offsetTop, la = H.offsetWidth, ra = H.offsetHeight;
							ub = false;
							if (la > 10 && ra > 10) {
								t(
										Ma,
										function(W) {
											var Sa = W.translate, eb = W.isXAxis, bb = Qa ? !eb
													: eb;
											V[eb ? "xAxis" : "yAxis"].push( {
												axis : W,
												min : Sa(bb ? ea : ha - Aa - ra,
														true),
														max : Sa(bb ? ea + la : ha - Aa,
																true)
											})
										});
								Ga(r, "selection", V, e);
								l = true
							}
							H.parentNode.removeChild(H);
							H = null
						}		
						}
					count=!count;
					
			};
				////////////////////////////////////////////////////////////////////////
				ta.ondblclick = function(l) {
					l = v(l);
					l.cancelBubble = true;
					if (Q && l.target.tagName == "AREA") {
						var V = Q.plotX, ea = Q.plotY;
						J(Q, {
							pageX : Oa.x + L + (Qa ? pa - ea : V),
							pageY : Oa.y + F + (Qa ? ha - V : ea)
						});
						Ga(r.hoverSeries, "click", J(l, {
							point : Q
						}));
						Q.firePointEvent("click", l)
					}
				}
			}
			function ba(l) {
				var V = r.hoverPoint, ea = r.hoverSeries;
				if (ea) {
					V
					|| (V = ea.tooltipPoints[Qa ? l.pageY - Oa.y - F
							: l.pageX - Oa.x - L]);
					if (V != Q) {
						Q && Q.firePointEvent("mouseOut");
						V.firePointEvent("mouseOver");
						ib.refresh(V, ea);
						Q = V
					}
				}
			}
			function D() {
				var l = "highchartsMap" + jc++;
				r.imagemap = ta = X("map", {
					name : l,
					id : l,
					className : "highcharts-image-map"
				}, null, ga);
				xa = X("img", {
					useMap : "#" + l
				}, {
					width : pa + G,
					height : ha + G,
					left : L + G,
					top : F + G,
					opacity : 0,
					border : "none",
					position : ua,
					clip : "rect(1px," + pa + "px," + ha + "px,1px)",
					zIndex : 9
				}, ta);
				if (!ya)
					xa.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
			}
			if (k.enabled) {
				var Q, R, S, H, s = /x/.test(r.options.chart.zoomType), M = /y/
					.test(r.options.chart.zoomType);
				D();
				r.tooltip = ib = m(k);
				this.zoomX = s;
				this.zoomY = M;
				O();
				setInterval(function() {
					Eb && Eb()
				}, 32)
			}
		}
		function m(r) {
			function k(S, H) {
				var s = S.tooltipPos, M = r.borderColor || S.color || H.color
				|| "#606060", l = w.inverted, V, ea, Aa;
				Aa = S.tooltipText;
				ba = H;
				V = s ? s[0] : l ? pa - S.plotY : S.plotX;
				s = s ? s[1] : l ? ha - S.plotX : S.plotY;
				if (V >= 0 && V <= pa && s >= 0 && s <= ha)
					ea = true;
				if (Aa === false || !ea)
					O();
				else {
					D.innerHTML = Aa;
					ea = D.offsetWidth - Q;
					Aa = D.offsetHeight - Q;
					if (ea > (R.w || 0) + 20 || ea < (R.w || 0) - 20
							|| Aa > R.h || R.c != M) {
						R.clear();
						R.drawRect(Q / 2, Q / 2, ea + 20, Aa, M, Q,
								r.borderRadius, r.backgroundColor, r.shadow);
						J(R, {
							w : ea,
							h : Aa,
							c : M
						})
					}
					M = V - R.w + L - 35;
					if ((l || M < 5) && V + L + R.w < Y - 100)
						M = V + L + 15;
					l = s - R.h + 10 + F;
					if (l < 5)
						l = 5;
					else if (l + R.h > K)
						l = K - R.h - 5;
					v(I(M), I(l));
					H.drawPointState(S, "hover");
					Ka.style.visibility = Fb
				}
			}
			function v(S, H) {
				var s = Ka.style.visibility == Ea, M = s ? S
						: (Ka.offsetLeft + S) / 2;
				s = s ? H : (Ka.offsetTop + H) / 2;
				va(Ka, {
					left : M + G,
					top : s + G
				});
				Eb = Ba(S - M) > 1 || Ba(H - s) > 1 ? function() {
					v(S, H)
				} : null
			}
			function O() {
				if (Ka)
					Ka.style.visibility = Ea;
				ba && ba.drawPointState()
			}
			var ba, D, Q = r.borderWidth, R;
			Ka = X(Na, null, {
				position : ua,
				visibility : Ea,
				overflow : Ea,
				padding : "0 50px 5px 0",
				zIndex : 8
			}, ga);
			R = new ja("tooltip-box", Ka, null, {
				width : pa + G,
				height : ha + G
			});
			D = X(Na, {
				className : "highcharts-tooltip"
			}, J(r.style, {
				position : Tb,
				zIndex : 2
			}), Ka);
			return {
				refresh : k,
				hide : O
			}
		}
		var z = function(r) {
			if (!r.legend) {
				var k, v = r.options.legend, O = v.layout, ba = v.symbolWidth, D, Q = ".highcharts-legend li", R = [], S = new ja(
						"legend", ga, null, {
							zIndex : 7
						});
				if (v.enabled) {
					this.dom = D = X(Na, {
						className : "highcharts-legend highcharts-legend-" + O,
						innerHTML : '<ul style="margin:0;padding:0"></ul>'
					}, J( {
						position : ua,
						zIndex : 7
					}, v.style), ga);
					hb(Q, J(v.itemStyle, {
						paddingLeft : ba + v.symbolPadding + G,
						cssFloat : O == "horizontal" ? "left" : "none"
					}));
					hb(Q + ":hover", v.itemHoverStyle);
					hb(Q + ".hidden", v.itemHiddenStyle);
					hb(".highcharts-legend-horizontal li", {
						"float" : "left"
					});
					t(r.series, function(s) {
						if (s.options.showInLegend) {
							var M = s.options.legendType == "point" ? s.data
									: [ s ];
							t(M, function(l) {
								l.simpleSymbol = /(bar|pie|area|column)/
									.test(s.type);
								l.legendItem = k = X("li", {
									innerHTML : v.labelFormatter.call(l),
									className : l.visible ? "" : Ea
								}, null, D.firstChild);
								Pa(k, "mouseover", function() {
									l.setState("hover")
								});
								Pa(k, "mouseout", function() {
									l.setState()
								});
								Pa(k, "click", function() {
									Ga(l, "legendItemClick", null, function() {
										l.setVisible()
									})
								});
								R.push(l)
							})
						}
					});
					if (v.borderWidth || v.backgroundColor)
						S.drawRect(D.offsetLeft, D.offsetTop, D.offsetWidth,
								D.offsetHeight, v.borderColor, v.borderWidth,
								v.borderRadius, v.backgroundColor, v.shadow);
					t(R, function(s) {
						var M = s.legendItem, l = D.offsetLeft + M.offsetLeft;
						M = D.offsetTop + M.offsetTop + M.offsetHeight / 2;
						!s.simpleSymbol
						&& s.options
						&& s.options.lineWidth
						&& S.drawLine(l, M, l + ba, M, s.color,
								s.options.lineWidth);
						if (s.simpleSymbol)
							S.drawRect(l, M - 6, 16, 12, null, 0, 2, s.color);
						else
							s.options
							&& s.options.marker
							&& s.options.marker.enabled
							&& s.drawMarker(S, l + ba / 2, M,
									s.options.marker)
					});
					if (ta) {
						var H = X("area", {
							shape : "rect",
							coords : [ D.offsetLeft - L, D.offsetTop - F,
							           D.offsetLeft + D.offsetWidth - L,
							           D.offsetTop + D.offsetHeight - F ]
						.join(",")
						}, null, ta);
						ta.insertBefore(H, ta.childNodes[0]);
						H.onmouseover = function(s) {
							s = s || Ja.event;
							s = s.relatedTarget || s.fromElement;
							if (s != D && !ub) {
								ib.hide();
								va(D, {
									zIndex : 10
								})
							}
						};
						D.onmouseout = H.onmouseout = function(s) {
							s = s || Ja.event;
							s = s.relatedTarget || s.toElement;
							if (s == xa || s.tagName == "AREA" && s != H)
								va(D, {
									zIndex : 7
								})
						}
					}
				}
			}
		};
		nb = T(nb, La.xAxis);
		Db = T(Db, La.yAxis);
		La.xAxis = La.yAxis = null;
		a = T(La, a);
		var o = a.chart, y = o.margin;
		if (typeof y == "number")
			y = [ y, y, y, y ];
		var aa = o.renderTo;
		if (typeof aa == "string")
			aa = oa.getElementById(o.renderTo);
		aa.innerHTML = "";
		var Y = o.width || aa.offsetWidth || 400, K = o.height
		|| aa.offsetHeight || 300, ga = X(Na, {
			className : "highcharts-container"
		}, J( {
			position : Tb,
			overflow : Ea,
			width : Y + G,
			height : K + G,
			textAlign : "left"
		}, o.style), aa);
		if (o.className)
			ga.className += " " + o.className;
		var w = this, xa;
		aa = o.events;
		var Fa, F = y[0], ka = y[1], ia = y[2], L = y[3], ta, ib, ub, Nb = new ja(
				"chart-background", ga), Cb, ha, pa, Oa = Lb(ga), lb, Ma = [], db, Xa = [], mb, Qa, Eb, Ka;
		vb = cb = 0;
		Pa(Ja, "resize", function() {
			Oa = Lb(ga)
		});
		if (aa)
			for (Fa in aa)
				Pa(w, Fa, aa[Fa]);
		w.addLoading = function(r) {
			w.resources[r] = false
		};
		w.clearLoading = function(r) {
			w.resources[r] = true;
			d()
		};
		w.options = a;
		w.series = Xa;
		w.resources = {};
		w.inverted = Qa = a.chart.inverted;
		w.chartWidth = Y;
		w.chartHeight = K;
		w.plotWidth = pa = Y - L - ka;
		w.plotHeight = ha = K - F - ia;
		w.plotLeft = L;
		w.plotTop = F;
		w.plotLayer = Cb = new ja("plot", ga, null, {
			position : ua,
			width : pa + G,
			height : ha + G,
			left : L + G,
			top : F + G,
			overflow : Ea,
			zIndex : 6
		});
		this.tracker = new q(w, a.tooltip);//this��tracker�д���������
		if (o.plotBackgroundImage) {
			w.addLoading("plotBack");
			mb = X("img");
			mb.onload = function() {
				w.clearLoading("plotBack")
			};
			mb.src = o.plotBackgroundImage
		}
		b();
		d()
	}
	function Ub(a) {
		for ( var b = [], c = [], d = 0; d < a.length; d++) {
			b[d] = a[d].plotX;
			c[d] = a[d].plotY
		}
		this.xdata = b;
		this.ydata = c;
		a = [];
		this.y2 = [];
		var e = c.length;
		this.n = e;
		this.y2[0] = 0;
		this.y2[e - 1] = 0;
		a[0] = 0;
		for (d = 1; d < e - 1; d++) {
			var f = b[d + 1] - b[d - 1];
			f = (b[d] - b[d - 1]) / f;
			var g = f * this.y2[d - 1] + 2;
			this.y2[d] = (f - 1) / g;
			a[d] = (c[d + 1] - c[d]) / (b[d + 1] - b[d]) - (c[d] - c[d - 1])
			/ (b[d] - b[d - 1]);
			a[d] = (6 * a[d] / (b[d + 1] - b[d - 1]) - f * a[d - 1]) / g
		}
		for (b = e - 2; b >= 0; b--)
			this.y2[b] = this.y2[b] * this.y2[b + 1] + a[b]
	}
	var fa, oa = document, Ja = window, ma = Math, I = ma.round, Da = ma.floor, Ba = ma.abs, wb = ma.cos, xb = ma.sin, Z = navigator.userAgent, ya = /msie/i
		.test(Z)
		&& !Ja.opera, kc = /AppleWebKit/.test(Z), zb, jc = 0, cb, vb, Vb = {}, Wb = 0, za = 1, Na = "div", ua = "absolute", Tb = "relative", Ea = "hidden", Fb = "visible", G = "px", t, Ra, T, kb, Pa, Ga, yb, Gb;
	if (Ja.jQuery) {
		var Ua = jQuery;
		t = function(a, b) {
			for ( var c = 0, d = a.length; c < d; c++)
				if (b.call(a[c], a[c], c, a) === false)
					return c
		};
		Ra = function(a, b) {
			for ( var c = [], d = 0, e = a.length; d < e; d++)
				c[d] = b.call(a[d], a[d], d, a);
			return c
		};
		T = function() {
			var a = arguments;
			return Ua.extend(true, null, a[0], a[1], a[2], a[3])
		};
		kb = function(a) {
			return a.replace(/([A-Z])/g, function(b, c) {
				return "-" + c.toLowerCase()
			})
		};
		Pa = function(a, b, c) {
			Ua(a).bind(b, c)
		};
		Ga = function(a, b, c, d) {
			b = Ua.Event(b);
			J(b, c);
			Ua(a).trigger(b);
			d && !b.isDefaultPrevented() && d(b)
		};
		yb = function(a, b, c) {
			Ua(a).animate(b, c)
		};
		Gb = function(a, b) {
			Ua.get(a, null, b)
		};
		Ua.extend(Ua.easing, {
			easeOutQuad : function(a, b, c, d, e) {
			return -d * (b /= e) * (b - 2) + c
		}
		})
	} else if (Ja.MooTools) {
		t = function(a, b) {
			a.each(b)
		};
		Ra = function(a, b) {
			return a.map(b)
		};
		T = function() {
			if (Ja.$merge)
				return $merge.apply(this, arguments)
		};
		kb = function(a) {
			return a.hyphenate()
		};
		Pa = function(a, b, c) {
			if (!a.addEvent)
				if (a.nodeName)
					a = $(a);
				else
					J(a, new Events);
			a.addEvent(b, c)
		};
		Ga = function(a, b, c, d) {
			b = new Event( {
				type : b,
				target : a
			});
			b = J(b, c);
			b.preventDefault = function() {
				d = null
			};
			a.fireEvent && a.fireEvent(b.type, b);
			d && d(b)
		};
		yb = function(a, b, c) {
			a = new Fx.Morph($(a), J(c, {
				transition : Fx.Transitions.Quad.easeInOut
			}));
			a.start(b)
		};
		Gb = function(a, b) {
			(new Request( {
				url : a,
				method : "get",
				onSuccess : b
			})).send()
		}
	}
	Z = 'normal 12px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif';
	var Va = {
			enabled : true,
			align : "center",
			x : 0,
			y : 15,
			style : {
		color : "#666",
		font : Z.replace("12px", "11px")
	}
	}, La = {
			colors : [ "#4572A7", "#AA4643", "#89A54E", "#80699B", "#3D96AE",
			           "#DB843D", "#92A8CD", "#A47D7C", "#B5CA92" ],
			           symbols : [ "circle", "diamond", "square", "triangle", "triangle-down" ],
			           lang : {
		months : [ "January", "February", "March", "April", "May", "June",
		           "July", "August", "September", "October", "November",
		           "December" ],
		           weekdays : [ "Sunday", "Monday", "Tuesday", "Wednesday",
		                        "Thursday", "Friday", "Saturday" ]
	},
	chart : {
		margin : [ 50, 50, 60, 80 ],
		borderColor : "#4572A7",
		borderRadius : 5,
		defaultSeriesType : "line",
		plotBorderColor : "#C0C0C0"
	},
	title : {
		text : "Chart title",
		style : {
		textAlign : "center",
		color : "#3E576F",
		font : Z.replace("12px", "16px"),
		margin : "10px 0 0 0"
	}
	},
	subtitle : {
		text : "",
		style : {
		textAlign : "center",
		color : "#6D869F",
		font : Z,
		margin : 0
	}
	},
	plotOptions : {
		line : {
		animation : true,
		events : {},
		lineWidth : 2,
		shadow : true,
		marker : {
			enabled : true,
			symbol : "auto",
			lineWidth : 0,
			radius : 4,
			lineColor : "#FFFFFF",
			fillColor : "auto",
			states : {
			hover : {}
		}
		},
		point : {
			events : {}
		},
		dataLabels : T(Va, {
			enabled : false,
			y : -6,
			formatter : function() {
			return this.y
		}
		}),
		showInLegend : true,
		states : {
			hover : {
			lineWidth : 3,
			marker : {}
		}
		}
	}
	},
	labels : {
		style : {
		position : ua,
		color : "#3E576F",
		font : Z
	}
	},
	legend : {
		enabled : true,
		layout : "horizontal",
		labelFormatter : function() {
		return this.name
	},
	borderColor : "#909090",
	borderRadius : 5,
	shadow : true,
	style : {
		bottom : "10px",
		left : "80px",
		padding : "5px"
	},
	itemStyle : {
		listStyle : "none",
		margin : "0 1em 0 0",
		padding : 0,
		font : Z,
		cursor : "pointer",
		color : "#3E576F"
	},
	itemHoverStyle : {
		color : "#000"
	},
	itemHiddenStyle : {
		color : "#CCC"
	},
	symbolWidth : 16,
	symbolPadding : 5
	},
	tooltip : {
		enabled : true,
		formatter : function() {
		return "<b>" + (this.point.name || this.series.name)
		+ "</b><br/>X value: " + this.x + "<br/>Y value: "
		+ this.y
	},
	backgroundColor : "rgba(255, 255, 255, .85)",
	borderWidth : 2,
	borderRadius : 5,
	shadow : true,
	style : {
		color : "#333333",
		fontSize : "9pt",
		padding : "5px",
		font : Z
	}
	},
	toolbar : {
		itemStyle : {
		color : "#4572A7",
		cursor : "pointer",
		margin : "20px",
		font : Z
	}
	},
	credits : {
		enabled : true,
		text : "  ",
		href : " ",
		style : {
		position : ua,
		right : "50px",
		bottom : "5px",
		color : "#999",
		textDecoration : "none",
		font : Z.replace("12px", "10px")
	}
	}
	}, nb = {
			dateTimeLabelFormats : {
		second : "%H:%M:%S",
		minute : "%H:%M",
		hour : "%H:%M",
		day : "%e. %b",
		week : "%e. %b",
		month : "%b '%y",
		year : "%Y"
	},
	gridLineColor : "#C0C0C0",
	labels : Va,
	lineColor : "#C0D0E0",
	lineWidth : 1,
	max : null,
	min : null,
	maxZoom : 1,
	minorGridLineColor : "#E0E0E0",
	minorGridLineWidth : 1,
	minorTickColor : "#A0A0A0",
	minorTickLength : 2,
	minorTickPosition : "outside",
	minorTickWidth : 1,
	showFirstLabel : true,
	showLastLabel : false,
	startOfWeek : 1,
	tickColor : "#C0D0E0",
	tickInterval : "auto",
	tickLength : 5,
	tickmarkPlacement : "between",
	tickPixelInterval : 100,
	tickPosition : "outside",
	tickWidth : 1,
	title : {
		enabled : false,
		text : "X-values",
		align : "middle",
		margin : 35,
		style : {
		color : "#6D869F",
		font : Z.replace("normal", "bold")
	}
	},
	type : "linear"
	}, Db = T(nb, {
		gridLineWidth : 1,
		tickPixelInterval : 72,
		showLastLabel : true,
		labels : {
		align : "right",
		x : -8,
		y : 3
	},
	lineWidth : 0,
	maxPadding : 0.05,
	minPadding : 0.05,
	tickWidth : 0,
	title : {
		enabled : true,
		margin : 40,
		rotation : 270,
		text : "Y-values"
	}
	}), hc = {
		labels : {
		align : "right",
		x : -8,
		y : 3
	},
	title : {
		rotation : 270
	}
	}, gc = {
		labels : {
		align : "left",
		x : 8,
		y : 3
	},
	title : {
		rotation : 90
	}
	}, Ob = {
		labels : {
		align : "center",
		x : 0,
		y : 14
	},
	title : {
		rotation : 0
	}
	}, fc = T(Ob, {
		labels : {
		y : -5
	}
	});
	Z = La.plotOptions;
	Va = Z.line;
	Z.spline = T(Va);
	Z.scatter = T(Va, {
		lineWidth : 0,
		states : {
		hover : {
		lineWidth : 0
	}
	}
	});
	Z.area = T(Va, {
		fillColor : "auto"
	});
	Z.areaspline = T(Z.area);
	Z.column = T(Va, {
		borderColor : "#FFFFFF",
		borderWidth : 1,
		borderRadius : 0,
		groupPadding : 0.2,
		pointPadding : 0.1,
		states : {
		hover : {
		brightness : 0.1,
		shadow : false
	}
	}
	});
	Z.bar = T(Z.column, {
		dataLabels : {
		align : "left",
		x : 5,
		y : 0
	}
	});
	Z.pie = T(Va, {
		center : [ "50%", "50%" ],
		legendType : "point",
		size : "90%",
		slicedOffset : 10,
		states : {
		hover : {
		brightness : 0.1,
		shadow : false
	}
	}
	});
	var Hb = function(a) {
		function b(i) {
			if (g = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/
				.exec(i))
				f = [ parseInt(g[1]), parseInt(g[2]), parseInt(g[3]),
				      parseFloat(g[4]) ];
			else if (g = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/
				.exec(i))
				f = [ parseInt(g[1], 16), parseInt(g[2], 16),
				      parseInt(g[3], 16), 1 ]
		}
		function c() {
			return f ? "rgba(" + f.join(",") + ")" : a
		}
		function d(i) {
			if (typeof i == "number" && i != 0)
				for ( var j = 0; j < 3; j++) {
					f[j] += parseInt(i * 255);
					if (f[j] < 0)
						f[j] = 0;
					if (f[j] > 255)
						f[j] = 255
				}
			return this
		}
		function e(i) {
			f[3] = i;
			return this
		}
		var f = [], g;
		b(a);
		return {
			get : c,
			brighten : d,
			setOpacity : e
		}
	}, ja = function(a, b, c, d) {
		var e = this, f = b.style;
		c = J( {
			className : "highcharts-" + a
		}, c);
		d = J( {
			width : f.width,
			height : f.height,
			position : ua,
			top : 0,
			left : 0,
			margin : 0,
			padding : 0,
			border : "none"
		}, d);
		a = X(Na, c, d, b);
		J(e, {
			div : a,
			width : parseInt(d.width),
			height : parseInt(d.height)
		});
		e.svg = ya ? ""
				: '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'
					+ e.width + 'px" height="' + e.height + '">'
	};
	ja.prototype = {
			getCtx : function() {
		if (!this.ctx) {
			var a = X("canvas", {
				id : "highcharts-canvas-" + Wb++,
				width : this.width,
				height : this.height
			}, {
				position : ua
			}, this.div);
			if (ya) {
				G_vmlCanvasManager.initElement(a);
				a = oa.getElementById(a.id)
			}
			this.ctx = a.getContext("2d")
		}
		return this.ctx
	},
	getSvg : function() {
		if (!this.svgObject) {
			var a = this, b = a.div, c = a.width;
			a = a.height;
			if (ya) {
				if (!oa.namespaces.g_vml_) {
					oa.namespaces.add("g_vml_",
					"urn:schemas-microsoft-com:vml");
					oa.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}"
				}
				this.svgObject = X(Na, null, {
					width : c + G,
					height : a + G,
					position : ua
				}, b)
			} else
				this.svgObject = X("object", {
					width : c,
					height : a,
					type : "image/svg+xml"
				}, {
					position : ua,
					left : 0,
					top : 0
				}, b)
		}
		return this.svgObject
	},
	drawLine : function(a, b, c, d, e, f) {
		var g = this.getCtx();
		if (a == c)
			a = c = I(a) + f % 2 / 2;
		if (b == d)
			b = d = I(b) + f % 2 / 2;
		g.lineWidth = f;
		g.lineCap = "round";
		g.beginPath();
		g.moveTo(a, b);
		g.strokeStyle = e;
		g.lineTo(c, d);
		g.closePath();
		g.stroke()
	},
	drawPolyLine : function(a, b, c, d, e) {
		var f = this.getCtx(), g = [];
		if (d && c) {
			t(a, function(i) {
				g.push(i === fa ? i : i + 1)
			});
			for (d = 1; d <= 3; d++)
				this.drawPolyLine(g, "rgba(0, 0, 0, " + 0.05 * d + ")",
						6 - 2 * d)
		}
		f.beginPath();
		for (d = 0; d < a.length; d += 2)
			f[d == 0 ? "moveTo" : "lineTo"](a[d], a[d + 1]);
		J(f, {
			lineWidth : c,
			lineJoin : "round"
		});
		if (b && c) {
			f.strokeStyle = b;
			f.stroke()
		}
		if (e) {
			f.fillStyle = Jb(e, f);
			f.fill()
		}
	},
	drawRect : function(a, b, c, d, e, f, g, i, j, n) {
		function q() {
			m.beginPath();
			if (g) {
				m.moveTo(a, b + g);
				m.lineTo(a, b + d - g);
				m.quadraticCurveTo(a, b + d, a + g, b + d);
				m.lineTo(a + c - g, b + d);
				m.quadraticCurveTo(a + c, b + d, a + c, b + d - g);
				m.lineTo(a + c, b + g);
				m.quadraticCurveTo(a + c, b, a + c - g, b);
				m.lineTo(a + g, b);
				m.quadraticCurveTo(a, b, a, b + g)
			} else
				m.rect(a, b, c, d);
			m.closePath()
		}
		var m = this.getCtx(), z = (f || 0) % 2 / 2;
		a = I(a) + z;
		b = I(b) + z;
		c = I(c);
		d = I(d);
		if (j)
			for (j = 1; j <= 3; j++)
				this.drawRect(a + 1, b + 1, c, d, "rgba(0, 0, 0, " + 0.05
						* j + ")", 6 - 2 * j, g);
		n && m.drawImage(n, a, b, c, d);
		q();
		if (i) {
			m.fillStyle = Jb(i, m);
			m.fill();
			Ja.G_vmlCanvasManager && q()
		}
		if (f) {
			m.strokeStyle = e;
			m.lineWidth = f;
			m.stroke()
		}
	},
	drawSymbol : function(a, b, c, d, e, f, g) {
		var i = this.getCtx(), j = /^url\((.*?)\)$/;
		i.beginPath();
		if (a == "square") {
			a = 0.707 * d;
			i.moveTo(b - a, c - a);
			i.lineTo(b + a, c - a);
			i.lineTo(b + a, c + a);
			i.lineTo(b - a, c + a);
			i.lineTo(b - a, c - a)
		} else if (a == "triangle") {
			c++;
			i.moveTo(b, c - 1.33 * d);
			i.lineTo(b + d, c + 0.67 * d);
			i.lineTo(b - d, c + 0.67 * d);
			i.lineTo(b, c - 1.33 * d)
		} else if (a == "triangle-down") {
			c--;
			i.moveTo(b, c + 1.33 * d);
			i.lineTo(b - d, c - 0.67 * d);
			i.lineTo(b + d, c - 0.67 * d);
			i.lineTo(b, c + 1.33 * d)
		} else if (a == "diamond") {
			i.moveTo(b, c - d);
			i.lineTo(b + d, c);
			i.lineTo(b, c + d);
			i.lineTo(b - d, c);
			i.lineTo(b, c - d)
		} else
			j.test(a) ? X("img", {
				onload : function() {
				var n = this, q = Vb[n.src] || [ n.width, n.height ];
				va(n, {
					left : I(b - q[0] / 2) + G,
					top : I(c - q[1] / 2) + G,
					visibility : Fb
				});
				Vb[n.src] = q
			},
			src : a.match(j)[1]
			}, {
				position : ua,
				visibility : ya ? Fb : Ea
			}, this.div) : i.arc(b, c, d, 0, 2 * ma.PI, true);
			if (g) {
				i.fillStyle = g;
				i.fill()
			}
			if (f && e) {
				i.strokeStyle = f || "rgb(100, 100, 255)";
				i.lineWidth = e || 2;
				i.stroke()
			}
	},
	drawHtml : function(a, b, c) {
		X(Na, J(b, {
			innerHTML : a
		}), J(c, {
			position : ua
		}), this.div)
	},
	drawText : function() {
		this.addText.apply(this, arguments);
		this.strokeText()
	},
	addText : function(a, b, c, d, e, f) {
		if (a || a === 0) {
			var g = this, i, j = g.div, n, q = "";
			d = d || {};
			var m = d.color || "#000000";
			f = f || "left";
			var z = parseInt(d.fontSize || d.font.replace(/^[a-z ]+/, ""));
			for ( var o in d)
				q += kb(o) + ":" + d[o] + ";";
			t( [ "MozTransform", "WebkitTransform", "transform" ],
					function(K) {
				if (K in j.style)
					n = K
			});
			if (!e || n) {
				a = X("span", {
					innerHTML : a
				}, J(d, {
					position : ua,
					left : b + G,
					whiteSpace : "nowrap",
					bottom : I(g.height - c - z * 0.25) + G,
					color : m
				}), j);
				q = a.offsetWidth;
				if (f == "right")
					va(a, {
						left : b - q + G
					});
				else
					f == "center" && va(a, {
						left : I(b - q / 2) + G
					});
				if (e) {
					f = {
							left : 0,
							center : 50,
							right : 100
					}[f];
					a.style[n] = "rotate(" + e + "deg)";
					a.style[n + "Origin"] = f + "% 100%"
				}
			} else if (ya) {
				i = true;
				d = (e || 0) * ma.PI * 2 / 360;
				e = wb(d);
				d = xb(d);
				o = g.width;
				z = z / 3 || 3;
				var y = f == "left", aa = f == "right", Y = y ? b : b - o
						* e;
				b = aa ? b : b + o * e;
				y = y ? c : c - o * d;
				c = aa ? c : c + o * d;
				Y += z * d;
				b += z * d;
				y -= z * e;
				c -= z * e;
				if (Ba(Y - b) < 0.1)
					Y += 0.1;
				if (Ba(y - c) < 0.1)
					y += 0.1;
				g.svg += '<g_vml_:line from="'
					+ Y
					+ ", "
					+ y
					+ '" to="'
					+ b
					+ ", "
					+ c
					+ '" stroked="false"><g_vml_:fill on="true" color="'
					+ m
					+ '"/><g_vml_:path textpathok="true"/><g_vml_:textpath on="true" string="'
					+ a + '" style="v-text-align:' + f + ";" + q
					+ '"/></g_vml_:line>'
			} else {
				i = true;
				g.svg += '<g><text transform="translate(' + b + "," + c
				+ ") rotate(" + (e || 0) + ')" style="fill:' + m
				+ ";text-anchor:" + {
					left : "start",
					center : "middle",
					right : "end"
				}[f] + ";" + q.replace(/"/g, "'") + '">' + a
				+ "</text></g>"
			}
			g.hasObject = i
		}
	},
	strokeText : function() {
		if (this.hasObject) {
			var a = this.getSvg(), b = this.svg;
			if (ya)
				a.innerHTML = b;
			else {
				a.data = "data:image/svg+xml," + b + "</svg>";
				kc && this.div.appendChild(a)
			}
		}
	},
	clear : function() {
		var a = this, b = this.div, c = b.childNodes;
		a.ctx && a.ctx.clearRect(0, 0, a.width, a.height);
		if (a.svgObject) {
			b.removeChild(a.svgObject);
			a.svgObject = null
		}
		for ( var d = c.length - 1; d >= 0; d--) {
			a = c[d];
			a.tagName == "SPAN" && b.removeChild(a)
		}
	},
	hide : function() {
		va(this.div, {
			display : "none"
		})
	},
	show : function() {
		va(this.div, {
			display : ""
		})
	}
	};
	var Xb = function(a, b, c) {
		this.series = a;
		var d;
		if (typeof b == "number" || b === null) {
			this.x = c;
			this.y = b
		} else if (typeof b == "object" && typeof b.length != "number") {
			for (d in b)
				this[d] = b[d];
			this.x = b.x === fa ? c : b.x;
			this.y = b.y
		} else if (typeof b[0] == "string") {
			this.name = b[0];
			this.x = c;
			this.y = b[1]
		} else if (typeof b[0] == "number") {
			this.x = b[0];
			this.y = b[1]
		}
		return this
	};
	Xb.prototype = {
			firePointEvent : function(a, b) {
		var c = this;
		if (c.series.options.point.events[a] || c.options
				&& c.options.events && c.options.events[a])
			this.importEvents();
		Ga(this, a, b)
	},
	importEvents : function() {
		if (!this.hasImportedEvents) {
			var a = this, b = T(a.series.options.point, a.options);
			b = a.events = b.events;
			var c;
			for (c in b)
				Pa(a, c, b[c]);
			this.hasImportedEvents = true
		}
	}
	};
	var Ca = function() {
		this.isCartesian = true;
		this.type = "line"
	};
	Ca.prototype = {
			init : function(a, b) {
		var c = this, d, e = a.series.length;
		c.chart = a;
		b = c.setOptions(b);
		J(c, {
			index : e,
			options : b,
			name : b.name || "Series " + (e + 1),
			state : "",
			visible : b.visible !== false
		});
		a = b.events;
		for (d in a)
			Pa(c, d, a[d]);
		c.getColor();
		c.getSymbol();
		c.getData(b)
	},
	getData : function(a) {
		var b = this, c = b.chart, d = "series" + Wb++;
		if (!a.data && a.dataURL) {
			c.addLoading(d);
			Gb(a.dataURL, function(e) {
				b.dataLoaded(e);
				c.clearLoading(d)
			})
		} else
			b.dataLoaded(a.data)
	},
	dataLoaded : function(a) {
		var b = this, c = b.chart, d = b.options, e = d.dataParser, f = {}, g, i;
		if (d.dataURL && !e)
			e = function(q) {
			return eval(q)
		};
		if (e)
			a = e.call(b, a);
		this.layerGroup = g = new ja("series-group", c.plotLayer.div, null,
				{
			zIndex : 2
				});
		t( [ "", "hover" ], function(q) {
			f[q] = new ja("state-" + q, g.div)
		});
		this.stateLayers = f;
		i = d.pointStart || 0;
		a = Ra(a, function(q) {
			q = new Xb(b, q, i);
			i += d.pointInterval || 1;
			return q
		});
		b.data = a;
		var j = -1, n = [];
		t(a, function(q, m) {
			if (q.y === null) {
				m > j + 1 && n.push(a.slice(j + 1, m));
				j = m
			} else
				m == a.length - 1 && n.push(a.slice(j + 1, m + 1))
		});
		this.segments = n
	},
	setOptions : function(a) {
		return T(this.chart.options.plotOptions[this.type], a)
	},
	getColor : function() {
		var a = this.chart.options.colors;
		this.color = this.options.color || a[cb++] || "#0000ff";
		if (cb >= a.length)
			cb = 0
	},
	getSymbol : function() {
		var a = this.chart.options.symbols, b = this.options.marker.symbol
		|| "auto";
		if (b == "auto")
			b = a[vb++];
		this.symbol = b;
		if (vb >= a.length)
			vb = 0
	},
	translate : function() {
		var a = this.chart, b = this, c = b.options.stacking, d = b.xAxis.categories, e = b.yAxis, f = e.stacks[b.type];
		t(this.data, function(g) {
			var i = g.x, j = g.y, n;
			g.plotX = b.xAxis.translate(g.x);
			if (c) {
				n = f[i];
				i = n.total;
				n = n.cum -= j;
				j = n + j;
				if (c == "percent") {
					n = i ? n * 100 / i : 0;
					j = i ? j * 100 / i : 0;
					g.percentage = i ? g.y * 100 / i : 0
				}
				g.yBottom = e.translate(n, 0, 1)
			}
			if (j !== null)
				g.plotY = e.translate(j, 0, 1);
			g.clientX = a.inverted ? a.plotHeight - g.plotX + a.plotTop
					: g.plotX + a.plotLeft;
			g.category = d && d[g.x] !== fa ? d[g.x] : g.x
		});
		this.setTooltipPoints()
	},
	setTooltipPoints : function() {
		var a = this, b = a.chart, c = b.inverted, d = [], e = c ? b.plotHeight
				: b.plotWidth, f, g, i = [];
		t(a.segments, function(j) {
			d = d.concat(j)
		});
		if (a.xAxis.reversed)
			d = Ab(d);
		t(
				d,
				function(j, n) {
					if (!a.tooltipPoints)
						j.tooltipText = b.options.tooltip.formatter.call( {
							series : a,
							point : j,
							x : j.category,
							y : j.y,
							percentage : j.percentage
						});
					f = d[n - 1] ? d[n - 1].high + 1 : 0;
					for (g = j.high = d[n + 1] ? Da((j.plotX + (d[n + 1] ? d[n + 1].plotX
							: e)) / 2)
							: e; f <= g;)
						i[c ? e - f++ : f++] = j
				});
		a.tooltipPoints = i
	},
	drawLine : function(a) {
		var b = this, c = b.options, d = b.chart, e = c.animation
		&& b.animate, f = b.stateLayers[a], g = c.lineColor
		|| b.color, i = c.fillColor == "auto" ? Hb(b.color)
				.setOpacity(c.fillOpacity || 0.75).get() : c.fillColor, j = d.inverted, n = (j ? 0
						: d.chartHeight)
						- b.yAxis.translate(0);
				if (a)
					c = T(c, c.states[a]);
				e && b.animate(true);
				t(b.segments, function(q) {
					var m = [], z = [];
					t(q, function(y) {
						m.push(j ? d.plotWidth - y.plotY : y.plotX,
								j ? d.plotHeight - y.plotX : y.plotY)
					});
					if (/area/.test(b.type)) {
						for ( var o = 0; o < m.length; o++)
							z.push(m[o]);
						if (c.stacking && b.type != "areaspline")
							for (o = q.length - 1; o >= 0; o--)
								z.push(q[o].plotX, q[o].yBottom);
						else
							z.push(j ? n : q[q.length - 1].plotX, j ? q[0].plotX
									: n, j ? n : q[0].plotX,
											j ? q[q.length - 1].plotX : n);
						f.drawPolyLine(z, null, null, c.shadow, i)
					}
					c.lineWidth && f.drawPolyLine(m, g, c.lineWidth, c.shadow)
				});
				e && b.animate()
	},
	animate : function(a) {
		var b = this, c = b.chart, d = c.inverted, e = b.layerGroup.div;
		if (b.visible)
			if (a)
				va(e, J( {
					overflow : Ea
				}, d ? {
					height : 0
				} : {
					width : 0
				}));
			else {
				yb(e, d ? {
					height : c.plotHeight + G
				} : {
					width : c.plotWidth + G
				}, {
					duration : 1E3
				});
				this.animate = null
			}
	},
	drawPoints : function(a) {
		var b = this, c = b.stateLayers[a], d = b.options, e = d.marker, f = b.data, g = b.chart, i = g.inverted;
		if (a) {
			a = d.states[a].marker;
			if (a.lineWidth === fa)
				a.lineWidth = e.lineWidth + 1;
			if (a.radius === fa)
				a.radius = e.radius + 1;
			e = T(e, a)
		}
		e.enabled
		&& t(f, function(j) {
			if (j.plotY !== fa)
				b.drawMarker(c,
						i ? g.plotWidth - j.plotY : j.plotX,
								i ? g.plotHeight - j.plotX : j.plotY, T(e,
										j.marker))
		})
	},
	drawMarker : function(a, b, c, d) {
		if (d.lineColor == "auto")
			d.lineColor = this.color;
		if (d.fillColor == "auto")
			d.fillColor = this.color;
		if (d.symbol == "auto")
			d.symbol = this.symbol;
		a.drawSymbol(d.symbol, b, c, d.radius, d.lineWidth, d.lineColor,
				d.fillColor)
	},
	drawDataLabels : function() {
		if (this.options.dataLabels.enabled && !this.hasDrawnDataLabels) {
			var a = this, b, c, d = a.data, e = a.options.dataLabels, f, g, i = a.chart, j = i.inverted, n = a.type == "pie";
			a.dataLabelsLayer = g = new ja("data-labels", a.layerGroup.div,
					null, {
				zIndex : 1
			});
			e.style.color = e.color == "auto" ? a.color : e.color;
			t(d, function(q) {
				f = e.formatter.call( {
					x : q.x,
					y : q.y,
					series : a,
					point : q
				});
				b = (j ? i.plotWidth - q.plotY : q.plotX) + e.x;
				c = (j ? i.plotHeight - q.plotX : q.plotY) + e.y;
				if (q.tooltipPos) {
					b = q.tooltipPos[0] + e.x;
					c = q.tooltipPos[1] + e.y
				}
				if (n)
					g = new ja("data-labels", q.layer.div, null, {
						zIndex : 3
					});
				if (f)
					g[n ? "drawText" : "addText"](f, b, c, e.style,
							e.rotation, e.align)
			});
			n || g.strokeText();
			a.hasDrawnDataLabels = true
		}
	},
	drawPointState : function(a, b) {
		var c = this.chart, d = c.inverted, e = c.singlePointLayer, f = this.options;
		if (!e)
			e = c.singlePointLayer = new ja("single-point",
					c.plotLayer.div, null, {
				zIndex : 3
			});
		e.clear();
		if (b) {
			var g = f.states[b].marker;
			b = f.marker.states[b];
			if (b.radius === fa)
				b.radius = g.radius + 2;
			if ((f = T(f.marker, a.marker, g, b)) && f.enabled)
				this.drawMarker(e, d ? c.plotWidth - a.plotY : a.plotX,
						d ? c.plotHeight - a.plotX : a.plotY, f)
		}
	},
	render : function() {
		var a = this;
		a.drawDataLabels();
		for ( var b in a.stateLayers) {
			a.drawLine(b);
			a.drawPoints(b);
			b && a.stateLayers[b].hide()
		}
		a.visible || a.setVisible(false)
	},
	clear : function() {
		var a = this.stateLayers;
		for ( var b in a) {
			a[b].clear();
			a[b].cleared = true
		}
		if (this.dataLabelsLayer) {
			this.dataLabelsLayer.clear();
			this.hasDrawnDataLabels = false
		}
	},
	setState : function(a) {
		a = a || "";
		if (this.state != a) {
			var b = this, c = b.stateLayers, d = c[a];
			c = c[b.state];
			var e = b.singlePointLayer || b.chart.singlePointLayer;
			if (b.state = a)
				d.show();
			else {
				c.hide();
				e && e.clear()
			}
		}
	},
	setVisible : function(a) {
		var b = this, c = b.chart.imagemap, d = b.layerGroup, e = b.legendItem, f = b.areas;
		(b.visible = a = a === fa ? !b.visible : a) ? d.show() : d.hide();
		if (e)
			e.className = a ? "" : Ea;
		f && t(f, function(g) {
			a ? c.insertBefore(g, c.childNodes[1]) : c.removeChild(g)
		})
	},
	getAreaCoords : function() {
		var a = this, b = this.chart, c = b.inverted, d = b.plotWidth, e = b.plotHeight, f = 10, g = [];
		t(
				a.splinedata || a.segments,
				function(i, j) {
					if (a.xAxis.reversed)
						i = Ab(i);
					var n = [], q = [], m = [];
					t(
							[ q, m ],
							function(z) {
								for ( var o = 0, y = 0, aa, Y, K = [ i[0] ], ga = z == q ? 1
										: -1, w, xa, Fa, F, ka, ia, L; i[y];) {
									if (i[y].plotX > i[o].plotX + f
											|| y == i.length - 1) {
										aa = i[y];
										Y = i.slice(o, y - 1);
										t(Y, function(ta) {
											if (ga * ta.plotY < ga
													* aa.plotY)
												aa = ta
										});
										if (I(i[o].plotX) < I(aa.plotX)
												|| i[y].plotX > i[o].plotX
												+ f)
											K.push(aa);
										o = y
									}
									y++
								}
								K[K.length - 1] != i[i.length - 1]
								&& K.push(i[i.length - 1]);
								for (y = 0; y < K.length; y++)
									if (y > 0) {
										xa = K[y].plotX;
										w = K[y].plotY;
										o = K[y - 1].plotX;
										Y = K[y - 1].plotY;
										F = xa - K[y - 1].plotX;
										ia = ka = w - K[y - 1].plotY;
										Fa = -F;
										L = ma.sqrt(ma.pow(ia, 2)
												+ ma.pow(Fa, 2));
										if (y == 1) {
											o -= f / L * F;
											Y -= f / L * ka
										} else if (y == K.length - 1) {
											xa += f / L * F;
											w += f / L * ka
										}
										F = ga * f / L;
										o = I(o + F * ia);
										Y = I(Y + F * Fa);
										xa = I(xa + F * ia);
										Fa = I(w + F * Fa);
										if (z[z.length - 1]
										&& z[z.length - 1][0] > o)
											for (w = false; !w;) {
												ka = z.pop();
												ia = z[z.length - 1];
												if (!ia)
													break;
												F = (Y - Fa) / (o - xa);
												ka = (ia[1] - ka[1])
												/ (ia[0] - ka[0]);
												ka = (-ka * ia[0] + ia[1]
												+ F * o - Y)
												/ (F - ka);
												F = F * (ka - o) + Y;
												if (ka > ia[0]) {
													z.push( [ I(ka), I(F),
													          1 ]);
													w = true
												}
											}
										else
											isNaN(o) || z.push( [ o, Y ]);
										z[z.length - 1]
										&& z[z.length - 1][0] < xa
										&& z.push( [ xa, Fa ])
									}
							});
					for (j = 0; j < q.length; j++)
						n.push(c ? d - q[j][1] : q[j][0], c ? e - q[j][0]
						: q[j][1]);
					for (j = m.length - 1; j >= 0; j--)
						n.push(c ? d - m[j][1] : m[j][0], c ? e - m[j][0]
						: m[j][1]);
					n.length || n.push(I(i[0].plotX), I(i[0].plotY));
					g.push( [ n.join(",") ])
				});
		return g
	},
	createArea : function() {   //���컭��
		var a, b = this, c = b.chart, d = b.getAreaCoords(), e = c.imagemap, f = e.firstChild, g = [], i;
		t(d, function(j) {
			i = /^[0-9]+,[0-9]+$/.test(j[0]);
			a = X("area", {
				shape : i ? "circle" : "poly",
						chart : c,
						coords : j[0] + (i ? ",10" : ""),
						onmouseover : function() {  //onmouseover������ƶ���ĳ����Χ���Ϸ�ʱ�������¼�
				if (b.visible) {
					var n = c.hoverSeries;
					c.hoverPoint = j[1];
					b.options.events.mouseOver && Ga(b, "mouseOver", {
						point : c.hoverPoint
					});
					n && n != b && n.setState();
					!/(column|bar|pie)/.test(b.type) && e.childNodes[1]
					&& e.insertBefore(this, e.childNodes[1]);
					b.setState("hover");
					c.hoverSeries = b
				}
			},
			onmouseout : function() {   //������뿪ĳ����Χʱ�������¼�
				var n = c.hoverSeries;
				n && n.options.events.mouseOut && Ga(n, "mouseOut")
			}
			});
			if (b.options.cursor == "pointer")
				a.href = "javascript:;";
			f ? e.insertBefore(a, f) : e.appendChild(a);
			g.push(a)
		});
		b.areas = g
	}
	};
	var ac = Wa(Ca, {
		type : "area"
	}), Mb = Wa(Ca, {
		type : "spline",
		translate : function() {
		var a = this;
		Ca.prototype.translate.apply(a, arguments);
		a.splinedata = a.getSplineData()
	},
	drawLine : function() {
		var a = this, b = a.segments;
		a.segments = a.splinedata;
		Ca.prototype.drawLine.apply(a, arguments);
		a.segments = b
	},
	getSplineData : function() {
		var a = this, b = a.chart, c = [], d;
		t(a.segments, function(e) {
			if (a.xAxis.reversed)
				e = Ab(e);
			var f = [], g, i;
			t(e, function(j, n) {
				g = e[n + 2] || e[n + 1] || j;
				i = e[n - 2] || e[n - 1] || j;
				g.plotX > 0 && i.plotY < b.plotWidth && f.push(j)
			});
			if (f.length > 1)
				d = I(ma.max(b.plotWidth, f[f.length - 1].clientX
						- f[0].clientX) / 3);
			c.push(d ? (new Ub(f)).get(d) : [])
		});
		return a.splinedata = c
	}
	});
	Ub.prototype = {
			get : function(a) {
		a || (a = 50);
		var b = this.n;
		b = (this.xdata[b - 1] - this.xdata[0]) / (a - 1);
		var c = [], d = [];
		c[0] = this.xdata[0];
		d[0] = this.ydata[0];
		for ( var e = [ {
			plotX : c[0],
			plotY : d[0]
		} ], f = 1; f < a; f++) {
			c[f] = c[0] + f * b;
			d[f] = this.interpolate(c[f]);
			e[f] = {
					plotX : c[f],
					plotY : d[f]
			}
		}
		return e
	},
	interpolate : function(a) {
		for ( var b = this.n - 1, c = 0; b - c > 1;) {
			var d = (b + c) / 2;
			if (this.xdata[Da(d)] > a)
				b = d;
			else
				c = d
		}
		b = Da(b);
		c = Da(c);
		d = this.xdata[b] - this.xdata[c];
		var e = (this.xdata[b] - a) / d;
		a = (a - this.xdata[c]) / d;
		return e
		* this.ydata[c]
		+ a
		* this.ydata[b]
		+ ((e * e * e - e) * this.y2[c] + (a * a * a - a)
				* this.y2[b]) * d * d / 6
	}
	};
	var bc = Wa(Mb, {
		type : "areaspline"
	}), Bb = Wa(
			Ca,
			{
				type : "column",
				init : function() {
				Ca.prototype.init.apply(this, arguments);
				var a = this.chart;
				if (a.columnCount && !this.options.stacking)
					a.columnCount++;
				else
					a.columnCount = 1;
				this.columnNumber = a.columnCount
			},
			translate : function() {
				Ca.prototype.translate.apply(this);
				var a = this, b = a.options, c = a.data, d = a.chart, e = d.inverted, f = d.plotWidth, g = d.plotHeight, i = Ba(c[1] ? c[1].plotX
						- c[0].plotX
						: e ? g : f), j = i * b.groupPadding, n = i - 2 * j;
				n = n / d.columnCount;
				b = n * b.pointPadding;
				var q = n - 2 * b;
				d = d.options.xAxis.reversed ? d.columnCount
						- a.columnNumber : a.columnNumber - 1;
				var m = -(i / 2) + j + d * n + b, z = a.yAxis.translate(0);
				t(c, function(o) {
					o.plotX += m;
					o.w = q;
					o.y0 = (e ? f : g) - z;
					o.h = (o.yBottom || o.y0) - o.plotY
				})
			},
			drawLine : function() {
			},
			getSymbol : function() {
			},
			drawPoints : function(a) {
				var b = this, c = b.options, d = b.chart, e = c.animation
				&& b.animate, f = d.inverted, g = b.data, i = b.stateLayers[a];
				e && this.animate(true);
				t(g, function(j) {
					h = j.h;
					if (j.plotY !== fa)
						i.drawRect(f ? d.plotWidth - j.y0 : j.plotX,
								f ? d.plotHeight - j.plotX - j.w
										: j.h >= 0 ? j.plotY : j.plotY
												+ j.h, f ? j.h : j.w,
														f ? j.w : Ba(j.h), c.borderColor,
																c.borderWidth, c.borderRadius, b.color,
																c.shadow)
				});
				e && b.animate()
			},
			drawPointState : function(a, b) {
				var c = this, d = c.chart, e = d.inverted, f = c.singlePointLayer;
				if (!f)
					f = c.singlePointLayer = new ja("single-point-layer",
							c.layerGroup.div);
				f.clear();
				if (b && this.options.states[b]) {
					b = T(this.options, this.options.states[b]);
					f.drawRect(e ? d.plotWidth - a.y0 : a.plotX,
							e ? d.plotHeight - a.plotX - a.w : a.plotY,
									e ? a.h : a.w, e ? a.w : a.h, b.borderColor,
											b.borderWidth, b.borderRadius, Hb(
													b.color || this.color).brighten(
															b.brightness).get(), b.shadow)
				}
			},
			getAreaCoords : function() {
				var a = [], b = this.chart, c = b.inverted;
				t(
						this.data,
						function(d) {
							var e = c ? b.plotWidth - d.y0 : d.plotX, f = c ? b.plotHeight
									- d.plotX - d.w
									: d.plotY, g = f + (c ? d.w : d.h), i = e
									+ (c ? d.h : d.w);
							a.push( [
							         Ra( [ e, g, e, f, i, f, i, g ], I)
							         .join(","), d ])
						});
				return a
			},
			animate : function(a) {
				var b = this, c = b.chart, d = c.inverted, e = b.layerGroup.div;
				if (a)
					e.style[d ? "left" : "top"] = (d ? -c.plotWidth
							: c.plotHeight)
							+ G;
				else {
					yb(e, c.inverted ? {
						left : 0
					} : {
						top : 0
					});
					b.animate = null
				}
			}
			}), cc = Wa(Bb, {
				type : "bar",
				init : function(a) {
				a.inverted = this.inverted = true;
				Bb.prototype.init.apply(this, arguments)
			}
			}), ec = Wa(Ca, {
				type : "scatter",
				getAreaCoords : function() {
				var a = this.data, b = [];
				t(a, function(c) {
					b.push( [ [ I(c.plotX), I(c.plotY) ].join(","), c ])
				});
				return b
			}
			}), dc = Wa(
					Ca,
					{
						type : "pie",
						isCartesian : false,
						getColor : function() {
					},
					translate : function() {
						var a = 0, b = this, c = -0.25, d = b.options, e = d.slicedOffset, f = d.center, g = b.chart, i = b.data, j = 2 * ma.PI, n, q = g.options.colors;
						f.push(d.size);
						f = Ra(f, function(m, z) {
							return /%$/.test(m) ? g["plot"
							                        + (z ? "Height" : "Width")]
							* parseInt(m) / 100 : m
						});
						t(i, function(m) {
							a += m.y
						});
						t(
								i,
								function(m) {
									n = a ? m.y / a : 0;
									m.start = c * j;
									c += n;
									m.end = c * j;
									m.percentage = n * 100;
									m.center = [ f[0], f[1] ];
									m.size = f[2];
									var z = (m.end + m.start) / 2;
									m.centerSliced = Ra( [ wb(z) * e + f[0],
									                       xb(z) * e + f[1] ], I);
									if (!m.color)
										m.color = q[cb++];
									if (cb >= q.length)
										cb = 0;
									if (m.visible === fa)
										m.visible = 1;
									if (!m.layer)
										m.layer = new ja("pie", b.layerGroup.div);
									m.setState = function(o) {
										b.drawPointState(m, o)
									};
									m.setVisible = function(o) {
										var y = (m.visible = o = o === fa ? !m.visible
												: o) ? "show" : "hide", aa = m.legendItem;
										m.layer[y]();
										if (aa)
											aa.className = o ? "" : Ea
									}
								});
						this.setTooltipPoints()
					},
					render : function() {
						this.pointsDrawn || this.drawPoints();
						this.drawDataLabels()
					},
					drawPoints : function() {
						var a = this;
						t(this.data, function(b) {
							a.drawPoint(b, b.layer.getCtx(), b.color)
						});
						a.pointsDrawn = true
					},
					getSymbol : function() {
					},
					drawPointState : function(a, b) {
						var c = this, d = c.options, e;
						if (a) {
							e = a.stateLayer;
							if (!e)
								e = a.stateLayer = new ja("state-layer",
										a.layer.div);
							e.clear();
							if (b && c.options.states[b]) {
								b = T(d, d.states[b]);
								this.drawPoint(a, e.getCtx(), b.color || a.color,
										b.brightness)
							}
						}
						c.hoverPoint && c.hoverPoint.stateLayer.clear();
						c.hoverPoint = a
					},
					drawPoint : function(a, b, c, d) {
						var e = a.sliced ? a.centerSliced : a.center, f = e[0];
						e = e[1];
						var g = a.size, i = ya && a.percentage == 100 ? a.start
								: a.end;
						if (a.y > 0) {
							b.fillStyle = Hb(c).brighten(d).get(b);
							b.beginPath();
							b.moveTo(f, e);
							b.arc(f, e, g / 2, a.start, i, false);
							b.lineTo(f, e);
							b.closePath();
							b.fill()
						}
					},
					getAreaCoords : function() {
						var a = [];
						t(
								this.data,
								function(b) {
									for ( var c = b.center[0], d = b.center[1], e = b.size / 2, f = b.start, g = b.end, i = [], j = f; j; j += 0.25) {
										if (j >= g)
											j = g;
										i = i.concat( [ c + wb(j) * e,
										                d + xb(j) * e ]);
										if (j >= g)
											break
									}
									i = i.concat( [ c, d ]);
									b.tooltipPos = [
									                c + 2 * wb((f + g) / 2) * e / 3,
									                d + 2 * xb((f + g) / 2) * e / 3 ];
									a.push( [ Ra(i, I).join(","), b ])
								});
						return a
					}
					});
	Highcharts = {
			numberFormat : Zb,
			dateFormat : Kb,
			setOptions : Yb,
			Chart : $b
	}
})();
