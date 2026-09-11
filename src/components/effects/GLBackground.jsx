import { useEffect, useRef } from "react";
import { createProgram, getGLContext, prefersReducedMotion } from "./glUtils";

/* ------------------------------------------------------------------------ */
/*  AURORA BACKGROUND — a slow-drifting, domain-warped noise field rendered */
/*  in a single WebGL fragment shader and colour-mapped across the brand    */
/*  palette (ink → plum → violet → orchid → champagne). Sits behind every   */
/*  hero as a soft moving gradient/aurora, alpha-blended over the existing  */
/*  .hero-section CSS gradient and orbs rather than replacing them.         */
/*                                                                          */
/*  Usage: <AuroraBackground className="..." intensity={0.85} style={...} />*/
/* ------------------------------------------------------------------------ */

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    // 3 octaves instead of 5 — with 4 fbm() calls per pixel already (warp
    // x/y, the base field, and the second layered pass below), that's the
    // dominant per-pixel cost in this shader. This background reads as a
    // soft, blurred aurora glow, so the missing high-frequency detail from
    // the extra 2 octaves is not visible; the GPU savings are.
    for (int i = 0; i < 3; i++) {
      value += amp * noise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return value;
  }

  vec3 palette(float t) {
    vec3 ink       = vec3(0.039, 0.027, 0.070); /* #0A0712 */
    vec3 plum      = vec3(0.090, 0.043, 0.149); /* #170B26 */
    vec3 violet    = vec3(0.486, 0.216, 0.933); /* #7C3AED */
    vec3 orchid    = vec3(0.725, 0.549, 1.000); /* #B98CFF */
    vec3 champagne = vec3(0.851, 0.702, 0.424); /* #D9B36C */

    vec3 col = mix(ink, plum, smoothstep(0.0, 0.35, t));
    col = mix(col, violet, smoothstep(0.30, 0.62, t));
    col = mix(col, orchid, smoothstep(0.55, 0.82, t));
    col = mix(col, champagne, smoothstep(0.80, 1.0, t) * 0.65);
    return col;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0) + 0.5;

    float t = uTime * 0.045;

    vec2 warp = vec2(
      fbm(aspectUv * 2.1 + vec2(0.0, t)),
      fbm(aspectUv * 2.1 + vec2(5.2, -t))
    );
    vec2 p = aspectUv * 2.35 + warp * 0.85 + vec2(t * 0.3, -t * 0.2);

    float n = fbm(p);
    n += 0.25 * fbm(p * 2.4 + 4.0);

    float band = smoothstep(0.15, 0.95, n) * uIntensity;
    vec3 color = palette(clamp(n, 0.0, 1.0));

    /* Vignette keeps the edges settling toward transparent so this reads as
       a drifting glow rather than a hard-edged panel. */
    float vig = smoothstep(1.05, 0.2, distance(uv, vec2(0.5, 0.42)));

    float alpha = band * vig;
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function AuroraBackground({ className = "", intensity = 0.75, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = getGLContext(canvas, {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return undefined; // No WebGL: the CSS hero gradient still carries the section.

    let program;
    let buffer;
    try {
      program = createProgram(gl, VERTEX_SRC, FRAGMENT_SRC);
      buffer = gl.createBuffer();
    } catch (err) {
      console.warn("AuroraBackground: falling back, shader failed to build.", err);
      return undefined;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    // The fragment shader outputs premultiplied colour (`color * alpha`, to
    // match the context's premultipliedAlpha:true), so the blend factors
    // must be (ONE, ONE_MINUS_SRC_ALPHA) rather than the more common
    // (SRC_ALPHA, ONE_MINUS_SRC_ALPHA) — otherwise alpha gets applied twice
    // and the aurora renders visibly dimmer than uIntensity suggests.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Every pixel here runs the full noise field above, so resolution is
      // the other big lever on GPU cost (on top of the octave count). The
      // canvas's CSS size still fills its container — this only shrinks the
      // buffer the shader actually has to fill, and the browser upscales it.
      // A soft, feathered aurora shows no visible difference at ~0.6x, so
      // this is pure savings, most noticeable on the hero where it runs
      // continuously for as long as it's in view.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const drawFrame = (time) => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uIntensity, intensity);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let rafId;
    const start = performance.now();

    if (prefersReducedMotion()) {
      // A single settled frame instead of a perpetual loop.
      drawFrame(3.2);
    } else {
      const loop = (now) => {
        if (isVisible && document.visibilityState === "visible") {
          drawFrame((now - start) / 1000);
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
}
