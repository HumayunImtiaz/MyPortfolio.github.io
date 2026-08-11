import React, { useEffect, useRef, useState } from "react";
import { FaCloud, FaPalette, FaPowerOff, FaChevronUp, FaChevronDown } from "react-icons/fa";

interface SmokePreset {
  id: string;
  name: string;
  primaryRGB: [number, number, number]; // [r, g, b]
  secondaryRGB: [number, number, number];
  accentGlow: string;
}

const PRESETS: SmokePreset[] = [
  {
    id: "emerald",
    name: "Neon Emerald",
    primaryRGB: [0, 255, 128],
    secondaryRGB: [0, 255, 212],
    accentGlow: "#00FF00",
  },
  {
    id: "cyan",
    name: "Cyber Cyan",
    primaryRGB: [0, 229, 255],
    secondaryRGB: [0, 136, 255],
    accentGlow: "#00e5ff",
  },
  {
    id: "violet",
    name: "Mystic Violet",
    primaryRGB: [191, 0, 255],
    secondaryRGB: [255, 0, 128],
    accentGlow: "#bf00ff",
  },
  {
    id: "mist",
    name: "Ethereal Mist",
    primaryRGB: [226, 232, 240],
    secondaryRGB: [148, 163, 184],
    accentGlow: "#ffffff",
  },
  {
    id: "amber",
    name: "Solar Flame",
    primaryRGB: [255, 170, 0],
    secondaryRGB: [255, 68, 0],
    accentGlow: "#ffaa00",
  },
];

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  growth: number;
  life: number;
  maxLife: number;
  angle: number;
  spin: number;
  colorRgb: [number, number, number];
  alpha: number;
  maxAlpha: number;
  isHovering: boolean;
}

const SmokeCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<SmokePreset>(PRESETS[0]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [densityMultiplier, setDensityMultiplier] = useState<number>(1);

  // References for animation state
  const particlesRef = useRef<SmokeParticle[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; prevX: number; prevY: number }>({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
  });
  const isHoveringRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-render soft smoke cloud texture offscreen for max performance
  const createSmokeTexture = (preset: SmokePreset) => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const center = size / 2;
      const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
      const [r1, g1, b1] = preset.primaryRGB;
      const [r2, g2, b2] = preset.secondaryRGB;

      grad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.8)`);
      grad.addColorStop(0.3, `rgba(${r1}, ${g1}, ${b1}, 0.35)`);
      grad.addColorStop(0.6, `rgba(${r2}, ${g2}, ${b2}, 0.12)`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(center, center, center, 0, Math.PI * 2);
      ctx.fill();
    }
    return canvas;
  };

  // Update texture when preset changes
  useEffect(() => {
    textureCanvasRef.current = createSmokeTexture(activePreset);
  }, [activePreset]);

  useEffect(() => {
    if (!isEnabled) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas resize handler
    const handleResize = () => {
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse & hover state
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const mouse = mousePosRef.current;
      mouse.prevX = mouse.x === -1000 ? x : mouse.x;
      mouse.prevY = mouse.y === -1000 ? y : mouse.y;
      mouse.x = x;
      mouse.y = y;

      // Check if target is interactive (button, a, input, etc)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, textarea, select, .bannerIcon, .resumeLi, [role='button']")
        );
        isHoveringRef.current = isInteractive;
      }

      // Calculate speed/velocity
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles based on movement
      const count = Math.min(8, Math.max(1, Math.floor(dist / 4))) * densityMultiplier;
      const hovering = isHoveringRef.current;

      for (let i = 0; i < count; i++) {
        const jitterX = (Math.random() - 0.5) * (hovering ? 18 : 10);
        const jitterY = (Math.random() - 0.5) * (hovering ? 18 : 10);
        const angle = Math.random() * Math.PI * 2;

        // Base velocity opposite to movement + upward buoyance
        const vx = -dx * 0.08 + (Math.random() - 0.5) * 0.8;
        const vy = -dy * 0.08 - (0.4 + Math.random() * 0.6);

        const initialSize = hovering ? 20 + Math.random() * 15 : 12 + Math.random() * 10;
        const maxSize = hovering ? 90 + Math.random() * 40 : 60 + Math.random() * 30;
        const maxLife = hovering ? 60 + Math.random() * 40 : 40 + Math.random() * 35;
        const maxAlpha = hovering ? 0.45 + Math.random() * 0.25 : 0.3 + Math.random() * 0.2;

        // Blend slightly with secondary color
        const useSecondary = Math.random() > 0.6;
        const colorRgb = useSecondary ? activePreset.secondaryRGB : activePreset.primaryRGB;

        particlesRef.current.push({
          x: x + jitterX,
          y: y + jitterY,
          vx,
          vy,
          size: initialSize,
          maxSize,
          growth: (maxSize - initialSize) / maxLife,
          life: 0,
          maxLife,
          angle,
          spin: (Math.random() - 0.5) * 0.03,
          colorRgb,
          alpha: 0,
          maxAlpha,
          isHovering: hovering,
        });
      }

      // Limit particle array size for peak performance
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200);
      }
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({
          clientX: touch.clientX,
          clientY: touch.clientY,
          target: document.elementFromPoint(touch.clientX, touch.clientY),
        } as unknown as MouseEvent);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Idle ambient particle generator (gently emits subtle smoke when stationary)
    let lastIdleTime = Date.now();
    const idleInterval = setInterval(() => {
      const now = Date.now();
      const mouse = mousePosRef.current;
      if (mouse.x > 0 && now - lastIdleTime > 150 && isEnabled) {
        lastIdleTime = now;
        particlesRef.current.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.5 - Math.random() * 0.5,
          size: 14,
          maxSize: 50,
          growth: 0.6,
          life: 0,
          maxLife: 45,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          colorRgb: activePreset.primaryRGB,
          alpha: 0,
          maxAlpha: isHoveringRef.current ? 0.35 : 0.2,
          isHovering: isHoveringRef.current,
        });
      }
    }, 180);

    // Main animation render loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      const particles = particlesRef.current;
      const texture = textureCanvasRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97; // Drag factor
        p.vy *= 0.97; // Drag factor
        p.size = Math.min(p.maxSize, p.size + p.growth);
        p.angle += p.spin;

        // Smooth fade-in & fade-out curve
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        // Render smoke particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (texture) {
          ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
          ctx.drawImage(
            texture,
            -p.size / 2,
            -p.size / 2,
            p.size,
            p.size
          );
        } else {
          // Fallback radial gradient
          const rad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size / 2);
          const [r, g, b] = p.colorRgb;
          rad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha})`);
          rad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.4})`);
          rad.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = rad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      clearInterval(idleInterval);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isEnabled, activePreset, densityMultiplier]);

  return (
    <>
      {/* Fullscreen Canvas Overlay for Smoke particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-500"
        style={{ opacity: isEnabled ? 1 : 0 }}
      />

      {/* Floating Control Pill for Customizing Smoky Hover Animation */}
      <div className="fixed bottom-6 left-6 z-[999999] select-none font-bodyFont">
        <div className="relative">
          {/* Main Toggle Button */}
          <div className="flex items-center gap-2 bg-[#0B1120]/90 backdrop-blur-md border border-gray-700/60 p-2 px-3 rounded-full shadow-2xl hover:border-gray-500 transition-all duration-300">
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              title={isEnabled ? "Disable Smoke Cursor" : "Enable Smoke Cursor"}
              className={`p-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                isEnabled
                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20 scale-105"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <FaPowerOff className="text-sm" />
              <span>{isEnabled ? "Smoke ON" : "Smoke OFF"}</span>
            </button>

            {isEnabled && (
              <>
                <div className="h-4 w-[1px] bg-gray-700 mx-0.5" />
                <button
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-gray-800/80 transition-colors flex items-center gap-1 text-xs px-2"
                  title="Customize Smoke Style"
                >
                  <span
                    className="w-3 h-3 rounded-full inline-block shadow-sm"
                    style={{ backgroundColor: activePreset.accentGlow }}
                  />
                  <FaPalette className="text-xs" />
                  {isOpenMenu ? <FaChevronDown className="text-[10px]" /> : <FaChevronUp className="text-[10px]" />}
                </button>
              </>
            )}
          </div>

          {/* Expanded Menu Panel */}
          {isEnabled && isOpenMenu && (
            <div className="absolute bottom-14 left-0 w-64 bg-[#0B1120]/95 backdrop-blur-xl border border-gray-700/80 rounded-2xl p-4 shadow-2xl text-lightText animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <FaCloud className="text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
                    Smoke Style
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                  Hover FX
                </span>
              </div>

              {/* Color Presets */}
              <div className="space-y-1.5 mb-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                      activePreset.id === preset.id
                        ? "bg-gray-800/90 text-white font-medium border border-gray-600"
                        : "hover:bg-gray-800/40 text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: preset.accentGlow }}
                      />
                      <span>{preset.name}</span>
                    </div>
                    {activePreset.id === preset.id && (
                      <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Density Multiplier Slider */}
              <div className="border-t border-gray-800 pt-2.5">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>Smoke Intensity</span>
                  <span className="font-semibold text-emerald-400">
                    {densityMultiplier === 0.5 ? "Light" : densityMultiplier === 1 ? "Normal" : "Dense"}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[
                    { label: "Low", val: 0.5 },
                    { label: "Med", val: 1 },
                    { label: "High", val: 1.5 },
                  ].map((level) => (
                    <button
                      key={level.label}
                      onClick={() => setDensityMultiplier(level.val)}
                      className={`flex-1 py-1 rounded text-[10px] font-medium transition-all ${
                        densityMultiplier === level.val
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-gray-800/50 text-gray-400 hover:bg-gray-800"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SmokeCursor;
