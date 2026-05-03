"use client";

import { useEffect, useRef } from "react";

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl = canvas.getContext("webgl2") as WebGLRenderingContext | null;
    const isGL2 = !!gl;
    if (!gl) gl = canvas.getContext("webgl");
    if (!gl) return;

    const glCtx = gl;

    function resize() {
      if (!canvas) return;
      canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
      glCtx.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    function compileShader(type: number, src: string) {
      const s = glCtx.createShader(type)!;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS))
        console.error("Shader error:", glCtx.getShaderInfoLog(s));
      return s;
    }

    const vertSrc = isGL2
      ? `#version 300 es\nin vec2 a_pos;\nvoid main(){ gl_Position=vec4(a_pos,0,1); }`
      : `attribute vec2 a_pos;\nvoid main(){ gl_Position=vec4(a_pos,0,1); }`;

    const fragCore = `uniform vec2  u_res;
uniform float u_time;

float hash1(float n){ return fract(sin(n)*43758.5453); }
float hash21(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

float noise1D(float x){
  float i=floor(x), f=fract(x);
  return mix(hash1(i), hash1(i+1.0), f*f*(3.0-2.0*f));
}

float n2(vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),           hash21(i+vec2(1,0)),u.x),
             mix(hash21(i+vec2(0,1)), hash21(i+vec2(1,1)),u.x), u.y);
}

float curtain(vec2 uv, float y0, float spd, float freq, float phase, float t){
  float x    = uv.x;
  float edge = y0
    + 0.06*sin(x*freq        + t*spd + phase)
    + 0.04*sin(x*freq*1.73   + t*spd*0.7 + phase*2.1)
    + 0.03*n2(vec2(x*3.0, t*0.4+phase)) - 0.015;
  float dist  = uv.y - edge;
  float curtH = 0.18 + 0.06*sin(x*freq*0.5 + t*spd*0.4);
  float a     = smoothstep(0.0,-curtH,dist)*smoothstep(-curtH*2.0,-curtH*0.3,dist);
  float flick = 0.7 + 0.3*noise1D(t*2.0 + phase*10.0);
  return a*flick;
}

vec3 apal(float band, float intensity){
  vec3 c0 = vec3(0.00, 0.55, 0.62);
  vec3 c1 = vec3(0.18, 0.20, 0.90);
  vec3 c2 = vec3(0.55, 0.05, 0.80);
  vec3 c  = (band<0.5) ? mix(c0,c1,band*2.0) : mix(c1,c2,(band-0.5)*2.0);
  return c * intensity;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float t  = u_time * 0.5;

  vec3 col = vec3(0.03, 0.03, 0.08);

  float a0 = curtain(uv, 0.72, 0.8, 3.5, 0.0, t);
  float a1 = curtain(uv, 0.62, 1.1, 4.2, 2.1, t);
  float a2 = curtain(uv, 0.55, 0.6, 2.8, 4.7, t);
  float a3 = curtain(uv, 0.48, 1.3, 5.1, 1.3, t);

  col = mix(col, apal(0.0,0.9), a0*0.7);
  col = mix(col, apal(0.4,1.0), a1*0.8);
  col = mix(col, apal(0.7,0.8), a2*0.6);
  col = mix(col, apal(1.0,0.7), a3*0.5);

  float horizon = smoothstep(0.45, 0.0, uv.y)*0.15;
  col += vec3(0.05,0.10,0.35)*horizon;

  vec2 vp = uv - 0.5;
  col *= 1.0 - dot(vp,vp)*1.8;
  col  = pow(max(col, vec3(0.0)), vec3(0.85));
  gl_FragColor = vec4(col, 1.0);
}`;

    const fragSrc = isGL2
      ? `#version 300 es\nprecision highp float;\nout vec4 fragColor;\n` +
        fragCore.replace(/gl_FragColor/g, "fragColor")
      : `precision highp float;\n` + fragCore;

    const prog = glCtx.createProgram()!;
    glCtx.attachShader(prog, compileShader(glCtx.VERTEX_SHADER, vertSrc));
    glCtx.attachShader(prog, compileShader(glCtx.FRAGMENT_SHADER, fragSrc));
    glCtx.linkProgram(prog);
    if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS))
      console.error(glCtx.getProgramInfoLog(prog));

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      glCtx.STATIC_DRAW,
    );

    const aPos = glCtx.getAttribLocation(prog, "a_pos");
    const uRes = glCtx.getUniformLocation(prog, "u_res");
    const uTime = glCtx.getUniformLocation(prog, "u_time");

    let rafId: number;

    function draw(ts: number) {
      rafId = requestAnimationFrame(draw);
      glCtx.useProgram(prog);
      glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
      glCtx.enableVertexAttribArray(aPos);
      glCtx.vertexAttribPointer(aPos, 2, glCtx.FLOAT, false, 0, 0);
      glCtx.uniform2f(uRes, canvas!.width, canvas!.height);
      glCtx.uniform1f(uTime, ts * 0.001);
      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
