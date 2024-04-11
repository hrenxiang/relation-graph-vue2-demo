export const V = {
    getRectPoint(e, i, t, o, n, s, a, l, r = !1, c = 1, f = 1, u = 14) {
        const h = f - (c - 1) / 2, g = e + n / 2, p = i + s / 2, y = t + a / 2, v = o + l / 2;
        if (c > 1) {
            const M = u * h, O = Le(
                g,
                p,
                n,
                s,
                y,
                v,
                a,
                l,
                M
            );
            if (O)
                return O;
        }
        const x = g < y ? 1 : -1, z = p < v ? 1 : -1;
        if (v === p)
            return { x: g + x * n / 2, y: p };
        const S = Math.abs((y - g) / (v - p)), P = n / s;
        let B = 0, D = 0;
        S < P ? (B = x * s / 2 * S + z * P, D = z * s / 2) : (B = x * n / 2, D = z * n / 2 / S + x * P);
        const $ = g + B, C = p + D;
        return { x: $, y: C };
    },
    getRectPointBasic(e, i, t, o, n, s, a, l) {
        const r = e + n / 2, c = i + s / 2, f = t + a / 2, u = o + l / 2;
        let h = u === c ? 0 : (f - r) / (u - c);
        h === 0 && (h = (f - r) / (u - c + 1));
        const g = n / l;
        let p = 0, y = 0, v = "1";
        return -1 * g < h && h < g ? (v = "2", c < u ? (p = s / 2 * h, y = s / 2) : (p = -1 * s / 2 * h, y = -1 * s / 2)) : (r < f ? (p = 1 * n / 2, y = 1 * n / 2 / h) : (p = -1 * n / 2, y = -1 * n / 2 / h), v = "3"), { x: r + p, y: c + y, _case: v };
    },
    getRectJoinPoint(e, i, t, o, n, s, a, l) {
        const r = e + n / 2, c = i + s / 2, f = t + a / 2, u = o + l / 2, h = Math.round(Math.atan2(u - c, f - r) * 180 / 3.14) + 135;
        return h >= 0 && h < 90 ? { x: e + n / 2, y: i - 5 } : h >= 90 && h < 180 ? { x: e + n + 5, y: i + s / 2 } : h >= 180 && h < 270 ? { x: e + n / 2, y: i + s + 5 } : { x: e - 5, y: i + s / 2 };
    },
    getRectHJoinPoint(e, i, t, o, n, s, a) {
        const l = s / 2;
        return e + n < t ? { x: e + n + 5, y: i + l } : e + n < t + a ? { x: e - 5, y: i + l } : { x: e - 5, y: i + l };
    },
    getRectLeftJoinPoint(e, i, t, o, n, s, a) {
        const l = s / 2;
        return { x: e, y: i + l };
    },
    getRectRightJoinPoint(e, i, t, o, n, s, a) {
        const l = s / 2;
        return { x: e + n, y: i + l };
    },
    getRectTopJoinPoint(e, i, t, o, n, s, a) {
        return { x: e + n / 2, y: i };
    },
    getRectBottomJoinPoint(e, i, t, o, n, s, a, l, r, c, f, u, h = 14, g) {
        return g !== void 0 ? { x: e + g, y: i + s } : { x: e + n / 2, y: i + s };
    },
    getRectVJoinPoint(e, i, t, o, n, s, a, l) {
        const r = n / 2;
        return i + s < o ? { y: i + s + 5, x: e + r } : i + s < o + l ? { y: i - 5, x: e + r } : { y: i - 5, x: e + r };
    },
    getBorderPoint(e, i, t, o, n, s, a, l, r) {
        return r === 0 ? this.getCirclePoint(e, i, t, o, n, s, a, l) : this.getRectPoint(e, i, t, o, n, s, a, l);
    },
    getBorderPoint4MultiLine(e, i, t, o, n, s, a, l, r, c, f, u, h = 14) {
        return r === 0 ? this.getCirclePoint4MultiLine(e, i, t, o, n, s, a, l, c, f, u, h) : this.getRectPoint(e, i, t, o, n, s, a, l, c, f, u, h);
    },
    getCirclePoint(e, i, t, o, n, s, a, l) {
        const r = t + a / 2, c = o + l / 2, f = e + n / 2, u = i + s / 2, h = r - f;
        if (h === 0)
            return { x: f, y: u - s / 2 * (c < u ? 1 : -1) };
        const p = (c - u) / h, y = Math.sqrt(1 / (1 / (n / 2) ** 2 + p ** 2 / (s / 2) ** 2)) * (r < f ? 1 : -1), v = p * y;
        return { x: f - y, y: u - v };
    },
    getCirclePoint4MultiLine(e, i, t, o, n, s, a, l, r, c, f, u, h = 0) {
        let g = t + a / 2;
        const p = o + l / 2;
        let y = e + n / 2;
        const v = i + s / 2;
        let x = g - y;
        x > -1 && x < 1 && (g = g - 2, y = y + 2, x = -4);
        const P = (f - (c - 1) / 2) * u, B = p - v, D = Math.sqrt(x ** 2 + B ** 2) * P / x, $ = B / x, C = n / 2, M = s / 2, O = y < g ? -1 : 1, E = (-1 * C ** 2 * $ * D + C * M * Math.sqrt(Math.abs(M ** 2 + $ ** 2 * C ** 2 - D ** 2)) / O) / (M ** 2 + C ** 2 * $ ** 2), N = $ * E + D;
        return { x: y - E, y: v - N };
    },
    getCirclePointBasic(e, i, t, o, n, s, a, l, r) {
        const c = e + n / 2, f = i + s / 2, u = t + a / 2, h = o + l / 2, g = u - c, p = h - f, y = Math.sqrt(g * g + p * p), v = y - r, x = v * g / y * -1, z = v * p / y * -1;
        return { x: u + x, y: h + z };
    },
    getCirclePointPlus(e, i, t, o, n, s, a, l) {
        const r = e + n / 2, c = i + s / 2, f = t + a / 2, u = o + l / 2, h = f - r, g = u - c, p = Math.sqrt(h * h + g * g), y = (p - n / 2) * h / p * -1, v = (p - s / 2) * g / p * -1;
        return { x: f + y, y: u + v };
    },
    getOvalPoint(e, i, t, o, n, s = 180) {
        const a = o * (360 / n), l = (180 - s + a) * Math.PI / 180;
        return {
            x: e + t * Math.sin(l),
            y: i + t * Math.cos(l) * -1
        };
    },
    getAngleType(e, i) {
        if (e >= 0 && i >= 0)
            return 1;
        if (e < 0 && i >= 0)
            return 2;
        if (e < 0 && i < 0)
            return 3;
        if (e >= 0 && i < 0)
            return 4;
    },
    getTextAngle(e, i, t, o) {
        let n = Math.atan2(o - i, t - e) * 180 / Math.PI;
        return n < 0 && (n += 360), n > 90 && n <= 270 && (n += 180), n >= 360 && (n -= 360), Math.round(n);
    },
    getTreePointFromTop(e, i, t, o, n, s) {
        return e ? {
            x: e - 300 + Math.max(600 / ((n === 1 ? 2 : n) - 1), 80) * o,
            y: i + t
        } : {
            x: (s.canvas_width - s.node_width) / 2,
            y: (s.canvas_height - s.node_height) / 2 - 200
        };
    },
    getTreePointFromRight(e, i, t, o, n, s) {
        return e ? {
            x: e - t,
            y: i - 200 + Math.max(400 / ((n === 1 ? 2 : n) - 1), 80) * o
        } : {
            x: (s.canvas_width - s.node_width) / 2 + 300,
            y: (s.canvas_height - s.node_height) / 2
        };
    },
    getTreePointFromBottom(e, i, t, o, n, s) {
        return e ? {
            x: e - 300 + Math.max(600 / ((n === 1 ? 2 : n) - 1), 80) * o,
            y: i - t
        } : {
            x: (s.canvas_width - s.node_width) / 2,
            y: (s.canvas_height - s.node_height) / 2 + 200
        };
    },
    getTreePointFromLeft(e, i, t, o, n, s) {
        return e ? {
            x: e + t,
            y: i - 200 + Math.max(400 / ((n === 1 ? 2 : n) - 1), 80) * o
        } : {
            x: (s.canvas_width - s.node_width) / 2 - 300,
            y: (s.canvas_height - s.node_height) / 2
        };
    }
};