/*
 Highmaps JS v9.0.1 (2021-02-15)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) {
  "object" === typeof module && module.exports
    ? ((a["default"] = a), (module.exports = a))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/heatmap", ["highcharts"], function (q) {
        a(q);
        a.Highcharts = q;
        return a;
      })
    : a("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (a) {
  function q(a, l, n, y) {
    a.hasOwnProperty(l) || (a[l] = y.apply(null, n));
  }
  a = a ? a._modules : {};
  q(a, "Mixins/ColorSeries.js", [], function () {
    return {
      colorPointMixin: {
        setVisible: function (a) {
          var l = this,
            r = a ? "show" : "hide";
          l.visible = l.options.visible = !!a;
          ["graphic", "dataLabel"].forEach(function (a) {
            if (l[a]) l[a][r]();
          });
          this.series.buildKDTree();
        },
      },
      colorSeriesMixin: {
        optionalAxis: "colorAxis",
        colorAxis: 0,
        translateColors: function () {
          var a = this,
            l = this.options.nullColor,
            n = this.colorAxis,
            y = this.colorKey;
          (this.data.length ? this.data : this.points).forEach(function (p) {
            var r = p.getNestedProperty(y);
            (r =
              p.options.color ||
              (p.isNull || null === p.value
                ? l
                : n && "undefined" !== typeof r
                ? n.toColor(r, p)
                : p.color || a.color)) &&
              p.color !== r &&
              ((p.color = r),
              "point" === a.options.legendType &&
                p.legendItem &&
                a.chart.legend.colorizeItem(p, p.visible));
          });
        },
      },
    };
  });
  q(
    a,
    "Core/Axis/ColorAxis.js",
    [
      a["Core/Axis/Axis.js"],
      a["Core/Chart/Chart.js"],
      a["Core/Color/Color.js"],
      a["Mixins/ColorSeries.js"],
      a["Core/Animation/Fx.js"],
      a["Core/Globals.js"],
      a["Core/Legend.js"],
      a["Mixins/LegendSymbol.js"],
      a["Core/Color/Palette.js"],
      a["Core/Series/Point.js"],
      a["Core/Series/Series.js"],
      a["Core/Utilities.js"],
    ],
    function (a, l, n, y, p, C, w, A, G, c, m, z) {
      var r =
          (this && this.__extends) ||
          (function () {
            var e = function (d, b) {
              e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, g) {
                    b.__proto__ = g;
                  }) ||
                function (b, g) {
                  for (var f in g) g.hasOwnProperty(f) && (b[f] = g[f]);
                };
              return e(d, b);
            };
            return function (d, b) {
              function h() {
                this.constructor = d;
              }
              e(d, b);
              d.prototype =
                null === b
                  ? Object.create(b)
                  : ((h.prototype = b.prototype), new h());
            };
          })(),
        u = n.parse;
      n = y.colorPointMixin;
      y = y.colorSeriesMixin;
      var B = C.noop,
        v = z.addEvent,
        q = z.erase,
        t = z.extend,
        E = z.isNumber,
        F = z.merge,
        D = z.pick,
        x = z.splat;
      ("");
      t(m.prototype, y);
      t(c.prototype, n);
      l.prototype.collectionsWithUpdate.push("colorAxis");
      l.prototype.collectionsWithInit.colorAxis = [l.prototype.addColorAxis];
      var k = (function (e) {
        function d(b, h) {
          var g = e.call(this, b, h) || this;
          g.beforePadding = !1;
          g.chart = void 0;
          g.coll = "colorAxis";
          g.dataClasses = void 0;
          g.legendItem = void 0;
          g.legendItems = void 0;
          g.name = "";
          g.options = void 0;
          g.stops = void 0;
          g.visible = !0;
          g.init(b, h);
          return g;
        }
        r(d, e);
        d.prototype.init = function (b, h) {
          var g = b.options.legend || {},
            f = h.layout ? "vertical" !== h.layout : "vertical" !== g.layout;
          g = F(d.defaultOptions, h, {
            showEmpty: !1,
            title: null,
            visible: g.enabled && (h ? !1 !== h.visible : !0),
          });
          this.coll = "colorAxis";
          this.side = h.side || f ? 2 : 1;
          this.reversed = h.reversed || !f;
          this.opposite = !f;
          b.options[this.coll] = g;
          e.prototype.init.call(this, b, g);
          h.dataClasses && this.initDataClasses(h);
          this.initStops();
          this.horiz = f;
          this.zoomEnabled = !1;
        };
        d.prototype.initDataClasses = function (b) {
          var h = this.chart,
            g,
            f = 0,
            e = h.options.chart.colorCount,
            d = this.options,
            k = b.dataClasses.length;
          this.dataClasses = g = [];
          this.legendItems = [];
          b.dataClasses.forEach(function (b, a) {
            b = F(b);
            g.push(b);
            if (h.styledMode || !b.color)
              "category" === d.dataClassColor
                ? (h.styledMode ||
                    ((a = h.options.colors), (e = a.length), (b.color = a[f])),
                  (b.colorIndex = f),
                  f++,
                  f === e && (f = 0))
                : (b.color = u(d.minColor).tweenTo(
                    u(d.maxColor),
                    2 > k ? 0.5 : a / (k - 1)
                  ));
          });
        };
        d.prototype.hasData = function () {
          return !!(this.tickPositions || []).length;
        };
        d.prototype.setTickPositions = function () {
          if (!this.dataClasses) return e.prototype.setTickPositions.call(this);
        };
        d.prototype.initStops = function () {
          this.stops = this.options.stops || [
            [0, this.options.minColor],
            [1, this.options.maxColor],
          ];
          this.stops.forEach(function (b) {
            b.color = u(b[1]);
          });
        };
        d.prototype.setOptions = function (b) {
          e.prototype.setOptions.call(this, b);
          this.options.crosshair = this.options.marker;
        };
        d.prototype.setAxisSize = function () {
          var b = this.legendSymbol,
            h = this.chart,
            g = h.options.legend || {},
            f,
            e;
          b
            ? ((this.left = g = b.attr("x")),
              (this.top = f = b.attr("y")),
              (this.width = e = b.attr("width")),
              (this.height = b = b.attr("height")),
              (this.right = h.chartWidth - g - e),
              (this.bottom = h.chartHeight - f - b),
              (this.len = this.horiz ? e : b),
              (this.pos = this.horiz ? g : f))
            : (this.len =
                (this.horiz ? g.symbolWidth : g.symbolHeight) ||
                d.defaultLegendLength);
        };
        d.prototype.normalizedValue = function (b) {
          this.logarithmic && (b = this.logarithmic.log2lin(b));
          return 1 - (this.max - b) / (this.max - this.min || 1);
        };
        d.prototype.toColor = function (b, h) {
          var g = this.dataClasses,
            f = this.stops,
            e;
          if (g)
            for (e = g.length; e--; ) {
              var d = g[e];
              var k = d.from;
              f = d.to;
              if (
                ("undefined" === typeof k || b >= k) &&
                ("undefined" === typeof f || b <= f)
              ) {
                var a = d.color;
                h && ((h.dataClass = e), (h.colorIndex = d.colorIndex));
                break;
              }
            }
          else {
            b = this.normalizedValue(b);
            for (e = f.length; e-- && !(b > f[e][0]); );
            k = f[e] || f[e + 1];
            f = f[e + 1] || k;
            b = 1 - (f[0] - b) / (f[0] - k[0] || 1);
            a = k.color.tweenTo(f.color, b);
          }
          return a;
        };
        d.prototype.getOffset = function () {
          var b = this.legendGroup,
            h = this.chart.axisOffset[this.side];
          b &&
            ((this.axisParent = b),
            e.prototype.getOffset.call(this),
            this.added ||
              ((this.added = !0),
              (this.labelLeft = 0),
              (this.labelRight = this.width)),
            (this.chart.axisOffset[this.side] = h));
        };
        d.prototype.setLegendColor = function () {
          var b = this.reversed,
            h = b ? 1 : 0;
          b = b ? 0 : 1;
          h = this.horiz ? [h, 0, b, 0] : [0, b, 0, h];
          this.legendColor = {
            linearGradient: { x1: h[0], y1: h[1], x2: h[2], y2: h[3] },
            stops: this.stops,
          };
        };
        d.prototype.drawLegendSymbol = function (b, h) {
          var g = b.padding,
            f = b.options,
            e = this.horiz,
            k = D(f.symbolWidth, e ? d.defaultLegendLength : 12),
            a = D(f.symbolHeight, e ? 12 : d.defaultLegendLength),
            c = D(f.labelPadding, e ? 16 : 30);
          f = D(f.itemDistance, 10);
          this.setLegendColor();
          h.legendSymbol = this.chart.renderer
            .rect(0, b.baseline - 11, k, a)
            .attr({ zIndex: 1 })
            .add(h.legendGroup);
          this.legendItemWidth = k + g + (e ? f : c);
          this.legendItemHeight = a + g + (e ? c : 0);
        };
        d.prototype.setState = function (b) {
          this.series.forEach(function (e) {
            e.setState(b);
          });
        };
        d.prototype.setVisible = function () {};
        d.prototype.getSeriesExtremes = function () {
          var b = this.series,
            e = b.length,
            g;
          this.dataMin = Infinity;
          for (this.dataMax = -Infinity; e--; ) {
            var f = b[e];
            var d = (f.colorKey = D(
              f.options.colorKey,
              f.colorKey,
              f.pointValKey,
              f.zoneAxis,
              "y"
            ));
            var k = f.pointArrayMap;
            var a = f[d + "Min"] && f[d + "Max"];
            if (f[d + "Data"]) var c = f[d + "Data"];
            else if (k) {
              c = [];
              k = k.indexOf(d);
              var x = f.yData;
              if (0 <= k && x)
                for (g = 0; g < x.length; g++) c.push(D(x[g][k], x[g]));
            } else c = f.yData;
            a
              ? ((f.minColorValue = f[d + "Min"]),
                (f.maxColorValue = f[d + "Max"]))
              : ((c = m.prototype.getExtremes.call(f, c)),
                (f.minColorValue = c.dataMin),
                (f.maxColorValue = c.dataMax));
            "undefined" !== typeof f.minColorValue &&
              ((this.dataMin = Math.min(this.dataMin, f.minColorValue)),
              (this.dataMax = Math.max(this.dataMax, f.maxColorValue)));
            a || m.prototype.applyExtremes.call(f);
          }
        };
        d.prototype.drawCrosshair = function (b, h) {
          var g = h && h.plotX,
            f = h && h.plotY,
            d = this.pos,
            k = this.len;
          if (h) {
            var a = this.toPixels(h.getNestedProperty(h.series.colorKey));
            a < d ? (a = d - 2) : a > d + k && (a = d + k + 2);
            h.plotX = a;
            h.plotY = this.len - a;
            e.prototype.drawCrosshair.call(this, b, h);
            h.plotX = g;
            h.plotY = f;
            this.cross &&
              !this.cross.addedToColorAxis &&
              this.legendGroup &&
              (this.cross
                .addClass("highcharts-coloraxis-marker")
                .add(this.legendGroup),
              (this.cross.addedToColorAxis = !0),
              !this.chart.styledMode &&
                this.crosshair &&
                this.cross.attr({ fill: this.crosshair.color }));
          }
        };
        d.prototype.getPlotLinePath = function (b) {
          var d = this.left,
            g = b.translatedValue,
            f = this.top;
          return E(g)
            ? this.horiz
              ? [["M", g - 4, f - 6], ["L", g + 4, f - 6], ["L", g, f], ["Z"]]
              : [["M", d, g], ["L", d - 6, g + 6], ["L", d - 6, g - 6], ["Z"]]
            : e.prototype.getPlotLinePath.call(this, b);
        };
        d.prototype.update = function (b, d) {
          var g = this.chart.legend;
          this.series.forEach(function (b) {
            b.isDirtyData = !0;
          });
          ((b.dataClasses && g.allItems) || this.dataClasses) &&
            this.destroyItems();
          e.prototype.update.call(this, b, d);
          this.legendItem && (this.setLegendColor(), g.colorizeItem(this, !0));
        };
        d.prototype.destroyItems = function () {
          var b = this.chart;
          this.legendItem
            ? b.legend.destroyItem(this)
            : this.legendItems &&
              this.legendItems.forEach(function (e) {
                b.legend.destroyItem(e);
              });
          b.isDirtyLegend = !0;
        };
        d.prototype.destroy = function () {
          this.chart.isDirtyLegend = !0;
          this.destroyItems();
          e.prototype.destroy.apply(this, [].slice.call(arguments));
        };
        d.prototype.remove = function (b) {
          this.destroyItems();
          e.prototype.remove.call(this, b);
        };
        d.prototype.getDataClassLegendSymbols = function () {
          var b = this,
            e = b.chart,
            d = b.legendItems,
            f = e.options.legend,
            k = f.valueDecimals,
            a = f.valueSuffix || "",
            c;
          d.length ||
            b.dataClasses.forEach(function (f, g) {
              var h = !0,
                m = f.from,
                x = f.to,
                p = e.numberFormatter;
              c = "";
              "undefined" === typeof m
                ? (c = "< ")
                : "undefined" === typeof x && (c = "> ");
              "undefined" !== typeof m && (c += p(m, k) + a);
              "undefined" !== typeof m &&
                "undefined" !== typeof x &&
                (c += " - ");
              "undefined" !== typeof x && (c += p(x, k) + a);
              d.push(
                t(
                  {
                    chart: e,
                    name: c,
                    options: {},
                    drawLegendSymbol: A.drawRectangle,
                    visible: !0,
                    setState: B,
                    isDataClass: !0,
                    setVisible: function () {
                      h = b.visible = !h;
                      b.series.forEach(function (b) {
                        b.points.forEach(function (b) {
                          b.dataClass === g && b.setVisible(h);
                        });
                      });
                      e.legend.colorizeItem(this, h);
                    },
                  },
                  f
                )
              );
            });
          return d;
        };
        d.defaultLegendLength = 200;
        d.defaultOptions = {
          lineWidth: 0,
          minPadding: 0,
          maxPadding: 0,
          gridLineWidth: 1,
          tickPixelInterval: 72,
          startOnTick: !0,
          endOnTick: !0,
          offset: 0,
          marker: {
            animation: { duration: 50 },
            width: 0.01,
            color: G.neutralColor40,
          },
          labels: { overflow: "justify", rotation: 0 },
          minColor: G.highlightColor10,
          maxColor: G.highlightColor100,
          tickLength: 5,
          showInLegend: !0,
        };
        d.keepProps = [
          "legendGroup",
          "legendItemHeight",
          "legendItemWidth",
          "legendItem",
          "legendSymbol",
        ];
        return d;
      })(a);
      Array.prototype.push.apply(a.keepProps, k.keepProps);
      C.ColorAxis = k;
      ["fill", "stroke"].forEach(function (e) {
        p.prototype[e + "Setter"] = function () {
          this.elem.attr(
            e,
            u(this.start).tweenTo(u(this.end), this.pos),
            null,
            !0
          );
        };
      });
      v(l, "afterGetAxes", function () {
        var e = this,
          d = e.options;
        this.colorAxis = [];
        d.colorAxis &&
          ((d.colorAxis = x(d.colorAxis)),
          d.colorAxis.forEach(function (b, d) {
            b.index = d;
            new k(e, b);
          }));
      });
      v(m, "bindAxes", function () {
        var e = this.axisTypes;
        e
          ? -1 === e.indexOf("colorAxis") && e.push("colorAxis")
          : (this.axisTypes = ["colorAxis"]);
      });
      v(w, "afterGetAllItems", function (e) {
        var d = [],
          b,
          k;
        (this.chart.colorAxis || []).forEach(function (g) {
          (b = g.options) &&
            b.showInLegend &&
            (b.dataClasses && b.visible
              ? (d = d.concat(g.getDataClassLegendSymbols()))
              : b.visible && d.push(g),
            g.series.forEach(function (d) {
              if (!d.options.showInLegend || b.dataClasses)
                "point" === d.options.legendType
                  ? d.points.forEach(function (b) {
                      q(e.allItems, b);
                    })
                  : q(e.allItems, d);
            }));
        });
        for (k = d.length; k--; ) e.allItems.unshift(d[k]);
      });
      v(w, "afterColorizeItem", function (e) {
        e.visible &&
          e.item.legendColor &&
          e.item.legendSymbol.attr({ fill: e.item.legendColor });
      });
      v(w, "afterUpdate", function () {
        var e = this.chart.colorAxis;
        e &&
          e.forEach(function (e, b, k) {
            e.update({}, k);
          });
      });
      v(m, "afterTranslate", function () {
        ((this.chart.colorAxis && this.chart.colorAxis.length) ||
          this.colorAttribs) &&
          this.translateColors();
      });
      return k;
    }
  );
  q(
    a,
    "Mixins/ColorMapSeries.js",
    [a["Core/Globals.js"], a["Core/Series/Point.js"], a["Core/Utilities.js"]],
    function (a, l, n) {
      var r = n.defined;
      return {
        colorMapPointMixin: {
          dataLabelOnNull: !0,
          isValid: function () {
            return (
              null !== this.value &&
              Infinity !== this.value &&
              -Infinity !== this.value
            );
          },
          setState: function (a) {
            l.prototype.setState.call(this, a);
            this.graphic &&
              this.graphic.attr({ zIndex: "hover" === a ? 1 : 0 });
          },
        },
        colorMapSeriesMixin: {
          pointArrayMap: ["value"],
          axisTypes: ["xAxis", "yAxis", "colorAxis"],
          trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
          getSymbol: a.noop,
          parallelArrays: ["x", "y", "value"],
          colorKey: "value",
          pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
          colorAttribs: function (a) {
            var l = {};
            r(a.color) && (l[this.colorProp || "fill"] = a.color);
            return l;
          },
        },
      };
    }
  );
  q(
    a,
    "Series/Heatmap/HeatmapPoint.js",
    [
      a["Mixins/ColorMapSeries.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Utilities.js"],
    ],
    function (a, l, n) {
      var r =
        (this && this.__extends) ||
        (function () {
          var a = function (l, c) {
            a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, c) {
                  a.__proto__ = c;
                }) ||
              function (a, c) {
                for (var m in c) c.hasOwnProperty(m) && (a[m] = c[m]);
              };
            return a(l, c);
          };
          return function (l, c) {
            function m() {
              this.constructor = l;
            }
            a(l, c);
            l.prototype =
              null === c
                ? Object.create(c)
                : ((m.prototype = c.prototype), new m());
          };
        })();
      a = a.colorMapPointMixin;
      var p = n.clamp,
        q = n.extend,
        w = n.pick;
      l = (function (a) {
        function l() {
          var c = (null !== a && a.apply(this, arguments)) || this;
          c.options = void 0;
          c.series = void 0;
          c.value = void 0;
          c.x = void 0;
          c.y = void 0;
          return c;
        }
        r(l, a);
        l.prototype.applyOptions = function (c, m) {
          c = a.prototype.applyOptions.call(this, c, m);
          c.formatPrefix = c.isNull || null === c.value ? "null" : "point";
          return c;
        };
        l.prototype.getCellAttributes = function () {
          var a = this.series,
            m = a.options,
            l = (m.colsize || 1) / 2,
            r = (m.rowsize || 1) / 2,
            u = a.xAxis,
            n = a.yAxis,
            v = this.options.marker || a.options.marker;
          a = a.pointPlacementToXValue();
          var q = w(this.pointPadding, m.pointPadding, 0),
            t = {
              x1: p(
                Math.round(
                  u.len - (u.translate(this.x - l, !1, !0, !1, !0, -a) || 0)
                ),
                -u.len,
                2 * u.len
              ),
              x2: p(
                Math.round(
                  u.len - (u.translate(this.x + l, !1, !0, !1, !0, -a) || 0)
                ),
                -u.len,
                2 * u.len
              ),
              y1: p(
                Math.round(n.translate(this.y - r, !1, !0, !1, !0) || 0),
                -n.len,
                2 * n.len
              ),
              y2: p(
                Math.round(n.translate(this.y + r, !1, !0, !1, !0) || 0),
                -n.len,
                2 * n.len
              ),
            };
          [
            ["width", "x"],
            ["height", "y"],
          ].forEach(function (a) {
            var c = a[0];
            a = a[1];
            var m = a + "1",
              l = a + "2",
              k = Math.abs(t[m] - t[l]),
              e = (v && v.lineWidth) || 0,
              d = Math.abs(t[m] + t[l]) / 2;
            v[c] &&
              v[c] < k &&
              ((t[m] = d - v[c] / 2 - e / 2), (t[l] = d + v[c] / 2 + e / 2));
            q &&
              ("y" === a && ((m = l), (l = a + "1")), (t[m] += q), (t[l] -= q));
          });
          return t;
        };
        l.prototype.haloPath = function (a) {
          if (!a) return [];
          var c = this.shapeArgs;
          return [
            "M",
            c.x - a,
            c.y - a,
            "L",
            c.x - a,
            c.y + c.height + a,
            c.x + c.width + a,
            c.y + c.height + a,
            c.x + c.width + a,
            c.y - a,
            "Z",
          ];
        };
        l.prototype.isValid = function () {
          return Infinity !== this.value && -Infinity !== this.value;
        };
        return l;
      })(l.seriesTypes.scatter.prototype.pointClass);
      q(l.prototype, {
        dataLabelOnNull: a.dataLabelOnNull,
        setState: a.setState,
      });
      return l;
    }
  );
  q(
    a,
    "Series/Heatmap/HeatmapSeries.js",
    [
      a["Mixins/ColorMapSeries.js"],
      a["Core/Globals.js"],
      a["Series/Heatmap/HeatmapPoint.js"],
      a["Mixins/LegendSymbol.js"],
      a["Core/Color/Palette.js"],
      a["Core/Series/SeriesRegistry.js"],
      a["Core/Renderer/SVG/SVGRenderer.js"],
      a["Core/Utilities.js"],
    ],
    function (a, l, n, q, p, C, w, A) {
      var r =
        (this && this.__extends) ||
        (function () {
          var a = function (c, k) {
            a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, d) {
                  a.__proto__ = d;
                }) ||
              function (a, d) {
                for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
              };
            return a(c, k);
          };
          return function (c, k) {
            function e() {
              this.constructor = c;
            }
            a(c, k);
            c.prototype =
              null === k
                ? Object.create(k)
                : ((e.prototype = k.prototype), new e());
          };
        })();
      a = a.colorMapSeriesMixin;
      var c = l.noop,
        m = C.series,
        z = C.seriesTypes,
        y = z.column,
        u = z.scatter,
        B = w.prototype.symbols,
        v = A.extend,
        H = A.fireEvent,
        t = A.isNumber,
        E = A.merge,
        F = A.pick;
      w = (function (a) {
        function c() {
          var k = (null !== a && a.apply(this, arguments)) || this;
          k.colorAxis = void 0;
          k.data = void 0;
          k.options = void 0;
          k.points = void 0;
          k.valueMax = NaN;
          k.valueMin = NaN;
          return k;
        }
        r(c, a);
        c.prototype.drawPoints = function () {
          var a = this;
          if ((this.options.marker || {}).enabled || this._hasPointMarkers)
            m.prototype.drawPoints.call(this),
              this.points.forEach(function (e) {
                e.graphic &&
                  e.graphic[a.chart.styledMode ? "css" : "animate"](
                    a.colorAttribs(e)
                  );
              });
        };
        c.prototype.getExtremes = function () {
          var a = m.prototype.getExtremes.call(this, this.valueData),
            e = a.dataMin;
          a = a.dataMax;
          t(e) && (this.valueMin = e);
          t(a) && (this.valueMax = a);
          return m.prototype.getExtremes.call(this);
        };
        c.prototype.getValidPoints = function (a, e) {
          return m.prototype.getValidPoints.call(this, a, e, !0);
        };
        c.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        c.prototype.init = function () {
          m.prototype.init.apply(this, arguments);
          var a = this.options;
          a.pointRange = F(a.pointRange, a.colsize || 1);
          this.yAxis.axisPointRange = a.rowsize || 1;
          v(B, { ellipse: B.circle, rect: B.square });
        };
        c.prototype.markerAttribs = function (a, e) {
          var d = a.marker || {},
            b = this.options.marker || {},
            c = a.shapeArgs || {},
            g = {};
          if (a.hasImage) return { x: a.plotX, y: a.plotY };
          if (e) {
            var f = b.states[e] || {};
            var k = (d.states && d.states[e]) || {};
            [
              ["width", "x"],
              ["height", "y"],
            ].forEach(function (a) {
              g[a[0]] =
                (k[a[0]] || f[a[0]] || c[a[0]]) +
                (k[a[0] + "Plus"] || f[a[0] + "Plus"] || 0);
              g[a[1]] = c[a[1]] + (c[a[0]] - g[a[0]]) / 2;
            });
          }
          return e ? g : c;
        };
        c.prototype.pointAttribs = function (a, e) {
          var d = m.prototype.pointAttribs.call(this, a, e),
            b = this.options || {},
            c = this.chart.options.plotOptions || {},
            g = c.series || {},
            f = c.heatmap || {};
          c = b.borderColor || f.borderColor || g.borderColor;
          g =
            b.borderWidth ||
            f.borderWidth ||
            g.borderWidth ||
            d["stroke-width"];
          d.stroke =
            (a && a.marker && a.marker.lineColor) ||
            (b.marker && b.marker.lineColor) ||
            c ||
            this.color;
          d["stroke-width"] = g;
          e &&
            ((a = E(
              b.states[e],
              b.marker && b.marker.states[e],
              (a && a.options.states && a.options.states[e]) || {}
            )),
            (e = a.brightness),
            (d.fill =
              a.color ||
              l
                .color(d.fill)
                .brighten(e || 0)
                .get()),
            (d.stroke = a.lineColor));
          return d;
        };
        c.prototype.setClip = function (a) {
          var e = this.chart;
          m.prototype.setClip.apply(this, arguments);
          (!1 !== this.options.clip || a) &&
            this.markerGroup.clip(
              (a || this.clipBox) && this.sharedClipKey
                ? e[this.sharedClipKey]
                : e.clipRect
            );
        };
        c.prototype.translate = function () {
          var a = this.options,
            e = (a.marker && a.marker.symbol) || "",
            d = B[e] ? e : "rect";
          a = this.options;
          var b = -1 !== ["circle", "square"].indexOf(d);
          this.generatePoints();
          this.points.forEach(function (a) {
            var c = a.getCellAttributes(),
              f = {
                x: Math.min(c.x1, c.x2),
                y: Math.min(c.y1, c.y2),
                width: Math.max(Math.abs(c.x2 - c.x1), 0),
                height: Math.max(Math.abs(c.y2 - c.y1), 0),
              };
            var h = (a.hasImage =
              0 === ((a.marker && a.marker.symbol) || e || "").indexOf("url"));
            if (b) {
              var k = Math.abs(f.width - f.height);
              f.x = Math.min(c.x1, c.x2) + (f.width < f.height ? 0 : k / 2);
              f.y = Math.min(c.y1, c.y2) + (f.width < f.height ? k / 2 : 0);
              f.width = f.height = Math.min(f.width, f.height);
            }
            k = {
              plotX: (c.x1 + c.x2) / 2,
              plotY: (c.y1 + c.y2) / 2,
              clientX: (c.x1 + c.x2) / 2,
              shapeType: "path",
              shapeArgs: E(!0, f, { d: B[d](f.x, f.y, f.width, f.height) }),
            };
            h && (a.marker = { width: f.width, height: f.height });
            v(a, k);
          });
          H(this, "afterTranslate");
        };
        c.defaultOptions = E(u.defaultOptions, {
          animation: !1,
          borderWidth: 0,
          nullColor: p.neutralColor3,
          dataLabels: {
            formatter: function () {
              return this.point.value;
            },
            inside: !0,
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            padding: 0,
          },
          marker: {
            symbol: "rect",
            radius: 0,
            lineColor: void 0,
            states: { hover: { lineWidthPlus: 0 }, select: {} },
          },
          clip: !0,
          pointRange: null,
          tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" },
          states: { hover: { halo: !1, brightness: 0.2 } },
        });
        return c;
      })(u);
      v(w.prototype, {
        alignDataLabel: y.prototype.alignDataLabel,
        axisTypes: a.axisTypes,
        colorAttribs: a.colorAttribs,
        colorKey: a.colorKey,
        directTouch: !0,
        drawLegendSymbol: q.drawRectangle,
        getBox: c,
        getExtremesFromAll: !0,
        getSymbol: m.prototype.getSymbol,
        hasPointSpecificOptions: !0,
        parallelArrays: a.parallelArrays,
        pointArrayMap: ["y", "value"],
        pointClass: n,
        trackerGroups: a.trackerGroups,
      });
      C.registerSeriesType("heatmap", w);
      ("");
      ("");
      return w;
    }
  );
  q(a, "masters/modules/heatmap.src.js", [], function () {});
});
//# sourceMappingURL=heatmap.js.map
