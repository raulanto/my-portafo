"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Plane, Color, Vec2 } from "ogl";

export interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  detail?: "low" | "medium" | "high";
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uHorizonColor;
  uniform vec3 uWaveColor;
  uniform vec3 uCrestColor;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uWaveScale;
  uniform float uWaveRatio;
  uniform float uSwell;
  uniform float uTurbulence;
  uniform float uTilt;
  uniform float uZoom;
  uniform float uHeight;
  uniform float uFogDepth;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uParallax;
  uniform float uGrain;
  uniform float uGrainIntensity;
  varying vec2 vUv;

  // Pseudo-random & noise helpers
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st = rot * st * 2.0 + shift;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
    
    // Mouse Parallax offset
    vec2 mouseOffset = (uMouse - 0.5) * uParallax * 0.2;
    st += mouseOffset;

    // Tilt & zoom
    st *= uZoom;
    st.y += uTilt * 0.2;

    float t = uTime * uSpeed * 0.5;

    // Wave calculation
    vec2 waveSt = st * uWaveScale;
    waveSt.x *= uWaveRatio;

    float wave1 = sin(waveSt.x * 3.0 + t + uMouse.x * uParallax) * cos(waveSt.y * 2.0 + t);
    float wave2 = cos(waveSt.x * 5.0 - t * 1.5) * sin(waveSt.y * 4.0 + t * 0.8);
    float fbmVal = fbm(waveSt * (uTurbulence * 0.1) + vec2(t * 0.2, t * 0.1));

    float waveCombined = (wave1 + wave2 * 0.5 + fbmVal * (uSwell * 0.05)) * uAmplitude * 0.2;

    // Height gradient & fog
    float yPos = st.y + waveCombined * 0.3 + (uHeight * 0.05);
    float horizonFactor = smoothstep(-0.8, 0.6, yPos);
    float crestFactor = pow(clamp(waveCombined + 0.5, 0.0, 1.0), 3.0);

    // Color interpolation
    vec3 color = mix(uWaveColor, uHorizonColor, horizonFactor);
    color = mix(color, uCrestColor, crestFactor * 0.6);
    color *= uBrightness;

    // Grain
    if (uGrain > 0.5) {
      float grainVal = (random(st * uTime) - 0.5) * uGrainIntensity;
      color += grainVal;
    }

    // Vignette / Fog blend at edges
    float alpha = uOpacity * smoothstep(-1.0, -0.2, yPos);
    
    gl_FragColor = vec4(color, clamp(alpha, 0.0, uOpacity));
  }
`;

export default function GradientWaves({
  horizonColor = "#5227FF",
  waveColor = "#FF9FFC",
  crestColor = "#FFFFFF",
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = "medium",
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = true,
  grainIntensity = 0.05,
  className = "",
  style = {},
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();

    const subs = detail === "high" ? 64 : detail === "medium" ? 32 : 16;
    const geometry = new Plane(gl, { width: 2, height: 2, widthSegments: subs, heightSegments: subs });

    const parseColor = (hex: string) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(container.clientWidth, container.clientHeight) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uHorizonColor: { value: parseColor(horizonColor) },
        uWaveColor: { value: parseColor(waveColor) },
        uCrestColor: { value: parseColor(crestColor) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaveScale: { value: waveScale },
        uWaveRatio: { value: waveRatio },
        uSwell: { value: swell },
        uTurbulence: { value: turbulence },
        uTilt: { value: tilt },
        uZoom: { value: zoom },
        uHeight: { value: height },
        uFogDepth: { value: fogDepth },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uParallax: { value: parallaxStrength },
        uGrain: { value: grain ? 1.0 : 0.0 },
        uGrainIntensity: { value: grainIntensity },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const heightVal = container.clientHeight;
      renderer.setSize(width, heightVal);
      program.uniforms.uResolution.value.set(width, heightVal);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction || !container) return;
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };

    if (mouseInteraction) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      program.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render({ scene, camera });
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (mouseInteraction) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (gl.canvas && gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
    };
  }, [
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity,
  ]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, ...style }}
    />
  );
}
