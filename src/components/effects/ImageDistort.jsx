import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  createProgram,
  getGLContext,
  coverFit,
  prefersReducedMotion,
  isCoarsePointer,
} from "./glUtils";

/* ------------------------------------------------------------------------ */
/*  RAW → FINEST IMAGE — the site's signature image treatment. Idle state   */
/*  reads desaturated, contrast-pushed and slightly channel-split ("raw");  */
/*  hovering (or, on touch, scrolling into view) resolves it to full colour */
/*  through a noisy liquid dissolve ("finest") — the same raw→finest        */
/*  language as the homepage's pinned intro and the .media-raw CSS motif,   */
/*  just rendered per-pixel instead of with a CSS filter.                   */
/*                                                                          */
/*  Falls back to a plain <img> (with an equivalent CSS filter transition)  */
/*  whenever WebGL, the texture load, or reduced-motion rules it out — the  */
/*  image is never blocked on the effect.                                  */
/*                                                                          */
/*  Usage: <RawFinestImage src="..." alt="..." className="h-full w-full" />*/
/* ------------------------------------------------------------------------ */

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  uniform vec2 uCoverScale;
  uniform vec2 uCoverOffset;
  void main() {
    vec2 uv = aPosition * 0.5 + 0.5;
    vUv = uv * uCoverScale + uCoverOffset;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uReveal;
  uniform vec2 uMouse;
  uniform float uTime;

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

  void main() {
    vec2 uv = clamp(vUv, 0.001, 0.999);

    /* Subtle mouse-follow parallax warp, strongest once revealed. */
    vec2 warp = uMouse * 0.03 * uReveal;
    vec2 duv = uv + warp * (0.4 + 0.6 * sin(uv.y * 3.14159));

    /* Liquid dissolve: each pixel resolves to "finest" at its own noisy
       threshold, so the reveal sweeps across the image organically rather
       than as a flat cross-fade. */
    float cell = noise(uv * 6.5 + uTime * 0.015);
    float local = smoothstep(cell - 0.16, cell + 0.16, uReveal);

    /* Chromatic split fades out as each pixel resolves. */
    float split = (1.0 - local) * 0.01;
    float r = texture2D(uTexture, duv + vec2(split, 0.0)).r;
    float g = texture2D(uTexture, duv).g;
    float b = texture2D(uTexture, duv - vec2(split, 0.0)).b;
    vec3 finest = vec3(r, g, b);

    float gray = dot(finest, vec3(0.299, 0.587, 0.114));
    vec3 raw = mix(vec3(gray), finest, 0.18);
    raw = (raw - 0.5) * 1.12 + 0.5;
    raw *= vec3(0.9, 0.94, 1.03);

    vec3 color = mix(raw, finest, local);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function RawFinestImage({ src, alt = "", className = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [glFailed, setGlFailed] = useState(false);
  const [revealedFallback, setRevealedFallback] = useState(false);

  // WebGL path
  useEffect(() => {
    if (glFailed) return undefined;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !src) return undefined;

    // antialias:false — this quad has no jagged geometry edges to smooth
    // (it's clipped to a rectangle by the wrapper's overflow-hidden
    // anyway), so MSAA here is pure GPU cost with no visible benefit —
    // and with several of these possibly mounted at once, that cost adds
    // up fast.
    const gl = getGLContext(canvas, { alpha: false, antialias: false });
    if (!gl) {
      setGlFailed(true);
      return undefined;
    }

    let program;
    let buffer;
    let texture;
    try {
      program = createProgram(gl, VERTEX_SRC, FRAGMENT_SRC);
      buffer = gl.createBuffer();
      texture = gl.createTexture();
    } catch (err) {
      console.warn("RawFinestImage: falling back to <img>, shader failed to build.", err);
      setGlFailed(true);
      return undefined;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const uTexture = gl.getUniformLocation(program, "uTexture");
    const uReveal = gl.getUniformLocation(program, "uReveal");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uCoverScale = gl.getUniformLocation(program, "uCoverScale");
    const uCoverOffset = gl.getUniformLocation(program, "uCoverOffset");

    gl.useProgram(program);
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // Browsers upload image rows top-first, which (with the standard v=0-
    // at-bottom texture convention) renders upside down unless flipped —
    // this is the canonical fix, applied once so every subsequent upload
    // on this texture (placeholder, then the real image) is oriented right.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // 1x1 placeholder so the quad has something to sample while the real
    // image is still loading over the network.
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([23, 16, 32, 255])
    );

    let destroyed = false;
    let imgW = 1;
    let imgH = 1;
    let textureReady = false;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      if (destroyed) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      } catch (err) {
        // Cross-origin source without permissive CORS headers: bail to <img>.
        console.warn("RawFinestImage: falling back to <img>, texture upload blocked.", err);
        setGlFailed(true);
        return;
      }
      imgW = image.naturalWidth || 1;
      imgH = image.naturalHeight || 1;
      textureReady = true;
    };
    image.onerror = () => {
      if (!destroyed) setGlFailed(true);
    };
    image.src = src;

    // Reveal state driven by a plain tween target so the render loop just
    // reads .value each frame — no React re-renders on every animation tick.
    const reveal = { value: 0 };
    const mouse = { x: 0, y: 0 };
    let tween;

    const revealTo = (target, duration) => {
      tween?.kill();
      tween = gsap.to(reveal, {
        value: target,
        duration,
        ease: target ? "power3.out" : "power2.inOut",
      });
    };

    const onPointerMove = (event) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const reduceMotion = prefersReducedMotion();
    const coarse = isCoarsePointer();
    let touchObserver;

    if (reduceMotion) {
      reveal.value = 1;
    } else if (coarse) {
      // Touch: resolve once as it enters view, then hold.
      touchObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            revealTo(1, 1.1);
            touchObserver.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      touchObserver.observe(wrap);
    } else {
      wrap.addEventListener("pointermove", onPointerMove);
      wrap.addEventListener("pointerenter", () => revealTo(1, 0.9));
      wrap.addEventListener("pointerleave", () => {
        revealTo(0, 0.7);
        mouse.x = 0;
        mouse.y = 0;
      });
    }

    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pages like Portfolio mount several of these at once, most of them
    // below the fold. Without this, every single one draws its shader on
    // every frame forever, whether it's on screen or not — with 5-6
    // instances plus the hero's AuroraBackground all doing that at once,
    // this was the main cause of the site becoming unscrollable: the GPU
    // (and main thread feeding it) never gets a break. Only draw while
    // actually in the viewport, same as AuroraBackground already does.
    let isVisible = false;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(wrap);

    const start = performance.now();
    let rafId;
    const loop = (now) => {
      if (textureReady && isVisible && document.visibilityState === "visible") {
        const fit = coverFit(width, height, imgW, imgH);
        gl.useProgram(program);
        gl.uniform1i(uTexture, 0);
        gl.uniform1f(uReveal, reveal.value);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uTime, (now - start) / 1000);
        gl.uniform2f(uCoverScale, fit.scale[0], fit.scale[1]);
        gl.uniform2f(uCoverOffset, fit.offset[0], fit.offset[1]);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      tween?.kill();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      touchObserver?.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
    };
  }, [src, glFailed]);

  // <img> fallback path: reveal driven by a class toggle + CSS transition,
  // mirroring the .media-raw motif used elsewhere on the site.
  useEffect(() => {
    if (!glFailed) return undefined;
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    if (prefersReducedMotion()) {
      setRevealedFallback(true);
      return undefined;
    }
    if (isCoarsePointer()) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealedFallback(true);
            io.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      io.observe(wrap);
      return () => io.disconnect();
    }
    const onEnter = () => setRevealedFallback(true);
    const onLeave = () => setRevealedFallback(false);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [glFailed]);

  return (
    // No hardcoded `relative` here: some callers pass their own `absolute`
    // (e.g. the hero image, positioned inset-0 within an already-relative
    // shell) via `className`, and mixing a fixed `relative` into the same
    // class string would fight it — Tailwind's cascade order, not the
    // order classes appear in markup, decides the winner. Positioning is
    // left entirely to the caller; `overflow-hidden` alone never conflicts.
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      {!glFailed && <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />}
      {/* Always in the DOM: the accessible/SEO copy of the image, and the
          only visible copy once the WebGL path has bailed out. */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-[filter,transform] duration-[1100ms] ease-[cubic-bezier(.16,1,.3,1)]"
        style={{
          position: glFailed ? "static" : "absolute",
          inset: 0,
          opacity: glFailed ? 1 : 0,
          pointerEvents: glFailed ? "auto" : "none",
          filter:
            glFailed && !revealedFallback
              ? "grayscale(0.85) contrast(1.06) saturate(0.9)"
              : "grayscale(0) contrast(1.02) saturate(1.08)",
          transform: glFailed && revealedFallback ? "scale(1.06)" : "scale(1)",
        }}
      />
    </div>
  );
}
