/* ------------------------------------------------------------------------ */
/*  glUtils — tiny shared helpers for the two WebGL effect components       */
/*  (AuroraBackground, RawFinestImage). Kept dependency-free (no Three.js)  */
/*  since each effect only ever draws a single full-screen quad — pulling   */
/*  in a whole 3D engine for that would cost far more than it buys here.    */
/* ------------------------------------------------------------------------ */

export function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

export function createProgram(gl, vertexSrc, fragmentSrc) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  // Shaders are flagged for delete-on-detach; we don't need the standalone
  // objects once they're linked into the program.
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${log}`);
  }
  return program;
}

export function getGLContext(canvas, options) {
  return (
    canvas.getContext("webgl", options) ||
    canvas.getContext("experimental-webgl", options)
  );
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

/* Standard "cover" fit: scale + offset so a texture of size (imgW, imgH)
   fills a (canvasW, canvasH) rect without stretching, cropping the excess —
   the WebGL equivalent of CSS `object-fit: cover`. */
export function coverFit(canvasW, canvasH, imgW, imgH) {
  const canvasAspect = canvasW / canvasH || 1;
  const imgAspect = imgW / imgH || 1;
  let scaleX = 1;
  let scaleY = 1;

  if (canvasAspect > imgAspect) {
    scaleY = imgAspect / canvasAspect;
  } else {
    scaleX = canvasAspect / imgAspect;
  }

  return {
    scale: [scaleX, scaleY],
    offset: [(1 - scaleX) / 2, (1 - scaleY) / 2],
  };
}
