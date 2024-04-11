<template>
  <g>
    <!-- 常规方式 -->
    <path
        :d="pathData.path"
        :class="['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : '']"
        :stroke="
        // checked
        //   ? options.checkedLineColor
        //   : relation.color
        //   ? relation.color
        //   : options.defaultLineColor
         '#1A77FF'
      "
        :style="{
        'opacity': relation.opacity,
        'stroke-width':
          (relation.lineWidth
            ? relation.lineWidth
            : options.defaultLineWidth) + 'px',
      }"
        :marker-start="showStartArrow"
        :marker-end="showEndArrow"
        fill="none"
        @click="onClick(relation, $event)"
    />
    <g
        v-if="
        options.defaultShowLineLabel &&
        options.canvasZoom > 40
      "
        :transform="pathData.textTransform"
    >
      <rect
          :key="'t-' + relation.seeks_id"
          rx="15" ry="15"
          :x="5 + (options.layouts[0].from === 'right' ? -100 : 0)"
          :y="-8"
          :style="{
          opacity: relation.opacity,
          // fill: checked
          //   ? options.checkedLineColor
          //   : relation.fontColor
          //   ? relation.fontColor
          //   : relation.color
          //   ? relation.color
          //   : undefined,
          fill: '#1A77FF',
        }"
          class="c-rg-line-text-bg"
          @click="onClick(relation, $event)"
      >
      </rect>
      <text
          :x="20 + (options.layouts[0].from === 'right' ? -100 : 0)"
          :y="10"
          :style="{
          // opacity: relation.opacity
          background: '#1A77FF',
          color: '#fff'
        }"
          class="c-rg-line-text"
          @click="onClick(relation, $event)"
      >
        {{ relation.text }}
      </text>
    </g>
  </g>
</template>

<script>
import {V} from "./a";

export default {
  name: 'Demo4AdvLineSlot2LineSlot',
  props: {
    link: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relation: {
      mustUseProp: true,
      default: () => {
        return {};
      },
      type: Object,
    },
    relationIndex: {
      mustUseProp: true,
      default: () => {
        return 0;
      },
      type: Number,
    },
  },
  data() {
    return {
      is_flashing: false,
      j: {
        border: "border",
        ltrb: "ltrb",
        tb: "tb",
        lr: "lr",
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom"
      }
    };
  },
  inject: ['graph', 'graphInstance'],
  computed: {
    checked() {
      return this.relation.id === this.options.checkedLineId;
    },
    showStartArrow() {
      return this.relation.showStartArrow && this.relationGraph.getArrow(this.relation, this.link, true);
    },
    showEndArrow() {
      return this.relation.showEndArrow && this.relationGraph.getArrow(this.relation, this.link, false);
    },
    pathData() {
      try {
        const {path, textPosition} = this.createLinePath(
            this.link,
            this.relation,
            this.relationIndex
        );
        let textTransform = {}
        try {
          textTransform = this.getTextTransform(
              this.relation,
              textPosition.x - 45,
              textPosition.y + 80,
              textPosition.rotate
          )
        } catch (e) {
        }
        return {
          path,
          textTransform
        };
      } catch (e) {
        console.log(e, "========e")
      }
      return {path: null, textTransform: null};
    },
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    }
  },
  show() {
    this.isShow = true;
  },
  watch: {},
  methods: {
    getTextTransform(i, t, o, n) {
      if (Number.isNaN(t) || Number.isNaN(o))
        return "translate(0,0)";
      const s = i.lineShape === void 0 ? this.options.defaultLineShape : i.lineShape;
      return s === 1 || s === 4 ? `translate(${t},${o})rotate(${n || 0})` : `translate(${t},${o})`;
    },
    onClick(line, e) {
      // RGStore.commit('setCurrentLineId', this.lineProps.id)
      this.relationGraph.onLineClick(line, this.link, e);
    },
    createReturnValue(i, t) {
      return { path: i, textPosition: t };
    },
    createLinePath(i, t, o) {
      let n = i.fromNode;
      n || (n = {
        x: 0,
        y: 0,
        el: {
          offsetWidth: 10,
          offsetHeight: 10
        }
      });
      const s = i.toNode, a = i.relations.length;
      return o || (o = 0), this.createLinePathByTwoNode(n, s, t, o, a);
    },
    createLinePathByTwoNode(i, t, o, n = 0, s = 1) {
      const d = (...e) => {
        typeof window != "undefined" && window.relationGraphDebug && console.log("[relation-graph:debug]", ...e);
      }
      const a = o.lineShape || this.options.defaultLineShape || 1,
          l = o.lineDirection || this.options.layoutDirection || "h";
      let r = i, c = t, f = r.x, u = r.y, h = c.x, g = c.y;
      const p = {x: 0, y: 0, rotate: 0};
      if (Number.isNaN(f) || Number.isNaN(u))
        return d("error start node:", r.text, r.x, r.y), p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L -10 -10", p);
      if (Number.isNaN(h) || Number.isNaN(g))
        return d("error end point:", c.text, c.x, c.y), p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L 10 -10", p);
      let y = r.el.offsetWidth || r.width || 60, v = r.el.offsetHeight || r.height || 60;
      if (Number.isNaN(y) || Number.isNaN(v))
        return p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L -10 10", p);
      let x = c.el.offsetWidth || c.width || 60, z = c.el.offsetHeight || c.height || 60;
      if (Number.isNaN(x) || Number.isNaN(z))
        return p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L 10 10", p);
      const S = r.nodeShape !== void 0 && r.nodeShape !== null ? r.nodeShape : this.options.defaultNodeShape;
      const P = [
        f,
        u,
        h,
        g,
        y,
        v,
        x,
        z,
        S,
        !1,
        s,
        n,
        this.options.multiLineDistance || 14
      ]
      const B = c.nodeShape !== void 0 && c.nodeShape !== null ? c.nodeShape : this.options.defaultNodeShape, D = [
        h,
        g,
        f,
        u,
        x,
        z,
        y,
        v,
        B,
        !1,
        s,
        s - n - 1,
        this.options.multiLineDistance || 14
      ]

      const $ = this.options.defaultJunctionPoint || j.border, C = o.fromJunctionPoint || r.junctionPoint || $

      const M = o.toJunctionPoint || c.junctionPoint || $

      const O = this._getJunctionPoint(C, P)

      const E = this._getJunctionPoint(M, D);

      if (!O || !E)
        return this.createReturnValue(
            "Unable to calculate the starting point and ending point of the line.",
            p
        );
      const N = O.x, G = O.y, k = E.x, L = E.y;
      if (r === c) {
        const W = f + y / 2, H = u + v / 2, wt = Math.atan2(G - H, N - W), J = Math.sin(wt + Math.PI) * 5,
            q = Math.cos(wt + Math.PI) * 5, Ct = {x: N - J, y: G - q}, bt = {x: J, y: q}, ae = -q * 5, re = -J * 5,
            le = -q * 5, ce = -J * 5, he = `M ${Ct.x},${Ct.y} c ${ae},${re} ${le},${ce} ${bt.x},${bt.y}`;
        return p.x = N - q / (q + J) * 20, p.y = G + J / (q + J) * 20, p.rotate = 0, this.createReturnValue(he, p);
      }
      if (Number.isNaN(N) || Number.isNaN(G))
        return d("error start point:", r.text), p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L -10 0", p);
      if (Number.isNaN(k) || Number.isNaN(L))
        return d("error end point:", c.text), p.x = 50, p.y = 50, p.rotate = 0, this.createReturnValue("M 0 0 L 10 0", p);
      const ot = f + y / 2, X = u + v / 2, b = h + x / 2, F = g + z / 2, T = this.createLinePathData(
          o,
          p,
          s,
          n,
          l,
          a,
          N,
          G,
          ot,
          X,
          y,
          v,
          k,
          L,
          b,
          F,
          x,
          z
      );
      return this.relationGraph.createReturnValue(T, p);
    },
    createLinePathData(i, t, o, n, s, a, l, r, c, f, u, h, g, p, y, v, x, z) {


      let S = g - l, P = p - r, B = g > l ? 1 : -1, D = p > r ? 1 : -1, $ = s === "v" ? D : B, C = "";
      if (a === 4) {
        const M = l - c, O = r - f, E = g - y, N = p - v;
        let G = this.options.defaultPolyLineRadius || 0;
        const k = Math.min(G, Math.abs(S)) * (l < g ? 1 : -1), L = Math.min(G, Math.abs(P)) * (r < p ? 1 : -1),
            ot = Math.abs(M) >= u / 2 ? "h" : "v", X = Math.abs(E) >= x / 2 ? "h" : "v", b = [];
        if (ot === "v") {
          const F = i.polyLineStartDistance || Math.max(Math.min(30, Math.abs(p - r) / 2), 15), T = O > 0 ? F : -F;
          if (i.placeText === "start" ? (t.x = l, t.y = r + T - (O > 0 ? 20 : -5)) : i.placeText === "middle" ? (t.x = l + (g - l) / 2, t.y = r + T) : (t.x = g, t.y = r + T + (O > 0 ? 20 : -5)), b.push(`M ${l} ${r}`), b.push(`v ${T - L}`), X === "v")
            b.push(`c ${0},${L},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`h ${g - l - k * 2}`), b.push(`c ${k},${0},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`v ${p - r - T - L}`), console.log(b, "===== 1")
          else {
            b.push(`c ${0},${L},`), b.push(`${k},${L},`), b.push(`${k},${L}`);
            const W = Math.min(30, Math.abs(g - l) / 2), H = E > 0 ? -W : W;
            b.push(`h ${g - l + H - k}`), b.push(`c ${k},${0},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`v ${p - r - T - L}`), b.push(`h ${H - k}`);
          }
        } else {
          const F = i.polyLineStartDistance || Math.max(Math.min(30, Math.abs(g - l) / 2), 15), T = M > 0 ? F : -F;
          if (i.placeText === "start" ? (t.x = l + (M > 0 ? 10 : -50), t.y = r - 5) : i.placeText === "middle" ? (t.x = l + T, t.y = r + (p - r) / 2) : (t.x = l + T + (M > 0 ? 20 : -50), t.y = p - 5), b.push(`M ${l} ${r}`), b.push(`h ${T - k}`), X === "v") {
            const W = Math.min(30, Math.abs(p - r) / 2), H = N > 0 ? -W : W;
            b.push(`c ${k},${0},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`v ${p - r + H - L}`), b.push(`h ${g - l - T - k}`), b.push(`c ${0},${L},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`v ${H - L}`);
          } else
            b.push(`c ${k},${0},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`v ${p - r - L * 2}`), b.push(`c ${0},${L},`), b.push(`${k},${L},`), b.push(`${k},${L}`), b.push(`h ${g - l - T - k}`);
        }
        C = b.join(" ");
      } else if (a === 41) {
        const M = r - f;
        let O = this.options.defaultPolyLineRadius || 0;
        const E = Math.min(O, Math.abs(S)) * (l < g ? 1 : -1), N = Math.min(O, Math.abs(P)) * (r < p ? 1 : -1), G = [],
            k = i.polyLineStartDistance || Math.max(Math.min(30, Math.abs(p - r) / 2), 15), L = M > 0 ? k : -k;
        i.placeText === "start" ? (t.x = l, t.y = r + L - (M > 0 ? 20 : -5)) : i.placeText === "middle" ? (t.x = l + (g - l) / 2, t.y = r + L) : (t.x = g, t.y = r + L + (M > 0 ? 20 : -5)), G.push(`M ${l} ${r}`), G.push(`h ${g - l - E}`), G.push(`c ${N},${0},`), G.push(`${E},${N},`), G.push(`${E},${N}`), G.push(`v ${p - r - N}`), C = G.join(" ");
      } else if (a === 42) {
        const M = r - f;
        let O = this.options.defaultPolyLineRadius || 0;
        const E = Math.min(O, Math.abs(S)) * (l < g ? 1 : -1), N = Math.min(O, Math.abs(P)) * (r < p ? 1 : -1), G = [],
            k = i.polyLineStartDistance || Math.max(Math.min(30, Math.abs(p - r) / 2), 15), L = M > 0 ? k : -k;
        i.placeText === "start" ? (t.x = l, t.y = r + L - (M > 0 ? 20 : -5)) : i.placeText === "middle" ? (t.x = l + (g - l) / 2, t.y = r + L) : (t.x = g, t.y = r + L + (M > 0 ? 20 : -5)), G.push(`M ${l} ${r}`), G.push(`v ${(p - r - N) / 2}`), G.push(`c ${0},${N},`), G.push(`${E},${N},`), G.push(`${E},${N}`), G.push(`h ${g - l - E}`), G.push(`v ${(p - r - N) / 2}`), C = G.join(" ");
      } else if (a === 43) {
        const M = r - f;
        let O = this.options.defaultPolyLineRadius || 0;
        const E = Math.min(O, Math.abs(S)) * (l < g ? 1 : -1), N = Math.min(O, Math.abs(P)) * (r < p ? 1 : -1), G = [],
            k = i.polyLineStartDistance || Math.max(Math.min(30, Math.abs(p - r) / 2), 15), L = M > 0 ? k : -k;
        i.placeText === "start" ? (t.x = l, t.y = r + L - (M > 0 ? 20 : -5)) : i.placeText === "middle" ? (t.x = l + (g - l) / 2, t.y = r + L) : (t.x = g, t.y = r + L + (M > 0 ? 20 : -5)), G.push(`M ${l} ${r}`), G.push(`h ${g - l - E}`), G.push(`c ${0},${0},`), G.push(`${E},${N},`), G.push(`${E},${N}`), G.push(`v ${p - r - N}`), C = G.join(" ");
      } else if (a === 2 || a === 3 || a === 5 || a === 6 || a === 7 || a === 8) {
        const M = l - c, O = r - f, E = g - y, N = p - v, G = 1 / (o + 1) * (n + 1);
        let k, L;
        if (a === 2)
          k = s === "v" ? {x: 0, y: $ * 30} : {x: $ * 30, y: 0}, L = s === "v" ? {x: S * G, y: $ * -10} : {
            x: $ * -10,
            y: P * G
          };
        else if (a === 3)
          k = s === "v" ? {x: 0, y: P * G} : {x: $ * 30, y: 0}, L = s === "v" ? {x: 0, y: 0} : {x: $ * -10, y: P * G};
        else if (a === 5)
          k = s === "v" ? {x: 0, y: 0} : {x: 0, y: 0}, L = s === "v" ? {x: 0, y: P * G} : {x: S * G, y: 0};
        else if (a === 6) {
          const X = Math.min(200, Math.max(100, Math.abs(S / 2))), b = Math.min(200, Math.max(100, Math.abs(P / 2))),
              F = M / (Math.abs(M) + Math.abs(O)) * X, T = O / (Math.abs(M) + Math.abs(O)) * b;
          k = {x: F, y: T};
          const W = E / (Math.abs(E) + Math.abs(N)) * X + S, H = N / (Math.abs(E) + Math.abs(N)) * b + P;
          L = {x: W, y: H};
        } else if (a === 7) {
          const F = M / (Math.abs(M) + Math.abs(O)) * 30, T = O / (Math.abs(M) + Math.abs(O)) * 30;
          k = {x: F, y: T};
          const W = E / (Math.abs(E) + Math.abs(N)) * 30 + S, H = N / (Math.abs(E) + Math.abs(N)) * 30 + P;
          L = {x: W, y: H};
        } else if (a === 8) {
          const F = M / (Math.abs(M) + Math.abs(O)) * 30, T = O / (Math.abs(M) + Math.abs(O)) * 30;
          k = {x: F, y: T};
          const W = E / (Math.abs(E) + Math.abs(N)) * 30 + S, H = N / (Math.abs(E) + Math.abs(N)) * 30 + P;
          L = {x: W, y: H};
        }
        const ot = this.calcCurveCenter(
            {x: l, y: r},
            {x: l + k.x, y: r + k.y},
            {x: l + L.x, y: r + L.y},
            {x: l + S, y: r + P},
            a < 6 ? 0.8 : 0.5
        );
        t.x = ot.x, t.y = ot.y, C = `M ${l},${r} c ${k.x},${k.y} ${L.x},${L.y} ${S},${P}`, a === 8 && (C = C + " Z");
      } else
        t.rotate = V.getTextAngle(l, r, g, p), t.x = Math.round(l + (g - l) / 2), t.y = Math.round(r + (p - r) / 2), Number.isNaN(t.rotate) && (t.rotate = 0), C = `M ${l} ${r} L ${g} ${p}`;
      return C;
    },
    _getJunctionPoint(i, t) {
      return i === this.j.border ? V.getBorderPoint4MultiLine(...t) : i === this.j.ltrb ? V.getRectJoinPoint(...t) : i === this.j.tb ? V.getRectVJoinPoint(...t) : i === this.j.lr ? V.getRectHJoinPoint(...t) : i === this.j.left ? V.getRectLeftJoinPoint(...t) : i === this.j.right ? V.getRectRightJoinPoint(...t) : i === this.j.top ? V.getRectTopJoinPoint(...t) : i === this.j.bottom ? V.getRectBottomJoinPoint(...t, this.options.defaultBottomJuctionPoint_X) : V.getBorderPoint4MultiLine(...t);
    },

  },
};
</script>

<style scoped>
/*.RGLine-enter-active {*/
/*transition: all .3s ease;*/
/*}*/
/*.RGLine-leave-active {*/
/*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
/*}*/
.c-rg-line-text-bg {
  fill: rgba(255, 255, 255);
  width: 80px;
  height: 30px;
  font-size: 12px;
  border-radius: 10px;
}

.c-rg-line-text {
  fill: #FFFFFF;
  font-size: 12px;
}

.c-rg-line {
  z-index: 1000;
  fill-rule: nonzero;
  /*marker-end: url('#arrow');*/
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  /*animation-timing-function:linear;*/
  /*animation: ACTRGLineInit 1s;*/
}

.c-rg-line-tool {
  stroke-dasharray: 5, 5, 5;
}

.c-rg-line-flash {
  /* firefox bug fix - won't rotate at 90deg angles */
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}

@keyframes ACTRGLineInit {
  from {
    stroke-dashoffset: 10px;
    stroke-dasharray: 20, 20, 20;
  }

  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 0, 0, 0;
  }
}

@keyframes ACTRGLineChecked {
  from {
    stroke-dashoffset: 352px;
  }

  to {
    stroke-dashoffset: 0;
  }
}

.c-rg-line-checked {
  /*stroke: var(--stroke);*/
  /*marker-end: var(--markerEndChecked) !important;*/
  stroke-width: 2px;
  stroke-dasharray: 5, 5, 5;
  stroke-dashoffset: 3px;
  stroke-linecap: butt;
  /*stroke: #FD8B37;*/
  stroke-linejoin: bevel;
  /* firefox bug fix - won't rotate at 90deg angles */
  /*-moz-transform: rotate(-89deg) translateX(-190px);*/
  animation-timing-function: linear;
  animation: ACTRGLineChecked 10s;
}
</style>
