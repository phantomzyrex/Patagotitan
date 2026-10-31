import React, { useEffect, useRef } from 'react';

interface FloodplainAtmosphereProps {
  mouseOffset: { x: number; y: number };
  reducedMotion: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  layer: 1 | 2 | 3; // 1 = far, 2 = mid, 3 = near
  type: 'pollen' | 'dust' | 'ash';
  alpha: number;
  phase: number;
}

interface FoliageSprig {
  x: number;
  y: number;
  vy: number;
  vx: number;
  rotation: number;
  vRot: number;
  scale: number;
  kind: 'cypress' | 'pinnule' | 'cone';
  alpha: number;
}

export const FloodplainAtmosphere: React.FC<FloodplainAtmosphereProps> = ({
  mouseOffset,
  reducedMotion,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef(mouseOffset);
  mouseRef.current = mouseOffset;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cap particle count on smaller viewports
    const isLowPower = width < 768;
    const particleCount = isLowPower ? 48 : 84;
    const foliageCount = isLowPower ? 5 : 8;

    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const layer: 1 | 2 | 3 = i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1;
      const rand = (i * 9301 + 49297) % 233280 / 233280;
      const type: 'pollen' | 'dust' | 'ash' =
        i % 6 === 0 ? 'ash' : i % 2 === 0 ? 'pollen' : 'dust';
      return {
        x: ((i * 37) % 100) * (width / 100),
        y: ((i * 53) % 100) * (height / 100),
        radius: type === 'ash' ? 1.6 + (layer * 0.4) : 1.0 + layer * 0.55,
        vx: type === 'ash' ? -0.12 : (rand - 0.5) * 0.22 * layer,
        vy: type === 'ash' ? 0.25 + layer * 0.08 : -0.08 + (rand - 0.45) * 0.18,
        layer,
        type,
        alpha: 0.22 + (layer * 0.14),
        phase: i * 0.7,
      };
    });

    const sprigs: FoliageSprig[] = Array.from({ length: foliageCount }, (_, i) => {
      const isLeftEdge = i % 2 === 0;
      const edgeBand = width * 0.18;
      const xPos = isLeftEdge
        ? (i * 29) % Math.max(80, edgeBand)
        : width - ((i * 31) % Math.max(80, edgeBand));
      const kinds: Array<'cypress' | 'pinnule' | 'cone'> = ['cypress', 'pinnule', 'cone'];
      return {
        x: xPos,
        y: ((i * 130) % height),
        vy: 0.28 + (i % 3) * 0.1,
        vx: isLeftEdge ? 0.08 : -0.08,
        rotation: (i * 45) * (Math.PI / 180),
        vRot: (i % 2 === 0 ? 1 : -1) * 0.004,
        scale: 0.75 + (i % 3) * 0.2,
        kind: kinds[i % 3],
        alpha: 0.42,
      };
    });

    let tick = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw Pollen, Spores, Dust & Volcanic Ash
      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx + Math.sin(tick + p.phase) * 0.12;
          p.y += p.vy;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        const parallaxFactor = p.layer * 20; // up to +-60px on layer 3
        const drawX = p.x + mx * parallaxFactor;
        const drawY = p.y + my * parallaxFactor;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        if (p.type === 'pollen') {
          ctx.fillStyle = '#DDEBDD';
        } else if (p.type === 'dust') {
          ctx.fillStyle = '#F6B27A';
        } else {
          ctx.fillStyle = '#CFC6BA';
        }

        ctx.beginPath();
        if (p.type === 'ash') {
          // Slightly irregular volcanic ash fleck
          ctx.ellipse(drawX, drawY, p.radius * 1.3, p.radius * 0.75, p.phase, 0, Math.PI * 2);
        } else {
          ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      }

      // Draw Falling Conifer Sprigs, Fern Pinnules & Cones near edges
      for (const s of sprigs) {
        if (!reducedMotion) {
          s.y += s.vy;
          s.x += s.vx + Math.sin(tick * 0.8 + s.scale) * 0.18;
          s.rotation += s.vRot;
          if (s.y > height + 30) {
            s.y = -30;
          }
        }

        const drawX = s.x + mx * 45;
        const drawY = s.y + my * 45;

        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.rotate(s.rotation);
        ctx.scale(s.scale, s.scale);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#2E6B55';
        ctx.strokeStyle = '#123D33';
        ctx.lineWidth = 1;

        if (s.kind === 'cypress') {
          // Scale-leaf cypress sprig
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(3, -4);
          ctx.lineTo(1, -3);
          ctx.lineTo(4, 3);
          ctx.lineTo(0, 10);
          ctx.lineTo(-4, 3);
          ctx.lineTo(-1, -3);
          ctx.lineTo(-3, -4);
          ctx.closePath();
          ctx.fill();
        } else if (s.kind === 'pinnule') {
          // Fern pinnule leaflet
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.2, 8.5, 0.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Small conifer cone
          ctx.fillStyle = '#3A2A1C';
          ctx.beginPath();
          ctx.ellipse(0, 0, 4, 6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (!reducedMotion && window.scrollY < window.innerHeight * 1.1) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    const handleScrollResume = () => {
      if (!reducedMotion && window.scrollY < window.innerHeight * 1.1) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };
    window.addEventListener('scroll', handleScrollResume, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScrollResume);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Shared SVG Filters: Creature Duotone Grading & Horizon Heat Shimmer */}
      <svg className="sr-only" width="0" height="0" aria-hidden="true">
        <defs>
          {/* Duotone & Floodplain Light Grading Filter for Patagotitan Cutout */}
          <filter id="patagotitan-floodplain-grade" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="
                1.12 0.08 0.02 0 -0.02
                0.04 1.04 0.05 0 -0.02
                0.01 0.06 0.86 0 -0.03
                0    0    0    1  0
              "
            />
          </filter>

          {/* Horizon Heat Shimmer Filter (static feTurbulence + feDisplacementMap, 2.5px amplitude) */}
          <filter id="horizon-heat-shimmer" x="-5%" y="-10%" width="110%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.08"
              numOctaves="1"
              seed="4"
              result="heatNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="heatNoise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Canvas for Pollen, Spores, Ash & Falling Conifer Foliage */}
      <canvas
        ref={canvasRef}
        data-testid="atmosphere-canvas"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-25"
      />
    </>
  );
};
