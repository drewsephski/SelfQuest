import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';

import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// For this demo, we'll simulate GSAP functionality
const gsap = {
  timeline: (config?: any) => ({
    to: (target: any, vars: any, position?: any) => ({
      stagger: (staggerVars: any) => ({}),
      delay: (delay: number) => ({})
    }),
    set: (target: any, vars: any) => ({}),
    add: (callback: any, position?: any) => ({}),
    eventCallback: (type: string, callback: () => void) => ({})
  }),
  set: (target: any, vars: any) => ({}),
  to: (target: any, vars: any) => ({}),
  killTweensOf: (target: any) => ({}),
  registerPlugin: (plugin: any) => ({})
};

interface AnimationPreset {
  name: string;
  timing: {
    duration: number;
    stagger: number;
    delay: number;
  };
  physics: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  particleCount: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    gradient1: string;
    gradient2: string;
    gradient3: string;
  };
}

interface TechSVGAnimationProps {
  width?: number;
  height?: number;
  enableMouseTracking?: boolean;
  enableParticles?: boolean;
  enableMorphing?: boolean;
  reducedMotion?: boolean;
  className?: string;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

const TechSVGAnimation: React.FC<TechSVGAnimationProps> = ({
  width = 600,
  height = 800,
  enableMouseTracking = true,
  enableParticles = true,
  enableMorphing = true,
  reducedMotion = false,
  className = '',
  onAnimationStart,
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'idle' | 'interact'>('intro');

  // Tech-focused blue gradient preset
  const preset: AnimationPreset = {
    name: 'tech',
    timing: { duration: 2.5, stagger: 0.12, delay: 0.3 },
    physics: { stiffness: 90, damping: 10, mass: 1 },
    particleCount: 16,
    colors: {
      primary: '#3b82f6',     // Blue 500
      secondary: '#1e40af',   // Blue 800
      accent: '#06b6d4',      // Cyan 500
      gradient1: '#1e3a8a',   // Blue 900
      gradient2: '#3b82f6',   // Blue 500
      gradient3: '#06b6d4'    // Cyan 500
    }
  };

  // Smooth mouse tracking with interpolation
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!containerRef.current || !enableMouseTracking) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    
    // Smooth interpolation
    mousePos.current = {
      x: mousePos.current.x + (x - mousePos.current.x) * 0.1,
      y: mousePos.current.y + (y - mousePos.current.y) * 0.1
    };
  }, [enableMouseTracking]);

  // Enhanced mouse interaction effects with symmetry
  const updateMouseEffects = useCallback(() => {
    if (!svgRef.current || !enableMouseTracking || reducedMotion) return;

    const { x, y } = mousePos.current;
    const intensity = Math.sqrt(x * x + y * y) * 0.5;
    
    // Symmetric floating elements
    const floatingElements = svgRef.current.querySelectorAll('[data-float]');
    floatingElements.forEach((element, index) => {
      const el = element as SVGElement;
      const isLeftSide = index % 2 === 0;
      const offsetMultiplier = isLeftSide ? 1 : -1;
      const offsetX = x * offsetMultiplier * (8 + index * 2);
      const offsetY = y * (6 + index * 2);
      
      el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.15})`;
    });

    // Symmetric glow intensity
    const glowElements = svgRef.current.querySelectorAll('[data-glow]');
    glowElements.forEach((element, index) => {
      const el = element as SVGElement;
      const glowIntensity = Math.max(0.4, 1 - intensity * 0.3);
      const brightness = 1 + intensity * 0.4;
      el.style.filter = `drop-shadow(0 0 ${25 * glowIntensity}px currentColor) brightness(${brightness})`;
    });

    // Symmetric morphing shapes
    if (enableMorphing) {
      const morphElements = svgRef.current.querySelectorAll('[data-morph]');
      morphElements.forEach((element, index) => {
        const el = element as SVGElement;
        const isLeftSide = index % 2 === 0;
        const rotationMultiplier = isLeftSide ? 1 : -1;
        const rotation = x * rotationMultiplier * 8 + y * 4;
        const scale = 1 + intensity * 0.2;
        el.style.transform = `rotate(${rotation}deg) scale(${scale})`;
      });
    }

    animationFrame.current = requestAnimationFrame(updateMouseEffects);
  }, [enableMouseTracking, enableMorphing, reducedMotion]);

  // Continuous idle animations with symmetry
  const runIdleAnimations = useCallback(() => {
    if (!svgRef.current || reducedMotion) return;

    // Symmetric floating animation
    gsap.to('[data-float]', {
      y: (i: number) => (i % 2 === 0 ? -15 : 15),
      x: (i: number) => Math.sin(i) * 10,
      duration: preset.timing.duration * 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.4,
        repeat: -1
      }
    });

    // Symmetric pulsing glow
    gsap.to('[data-glow]', {
      scale: (i: number) => 1 + (i % 2) * 0.1 + 0.05,
      duration: preset.timing.duration * 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.3
    });

    // Symmetric morphing rotation
    if (enableMorphing) {
      gsap.to('[data-morph]', {
        rotation: (i: number) => (i % 2 === 0 ? 360 : -360),
        duration: preset.timing.duration * 4,
        ease: 'none',
        repeat: -1
      });
    }
  }, [preset, enableMorphing, reducedMotion]);

  // Initialize intro animation
  const runIntroAnimation = useCallback(() => {
    if (!svgRef.current || reducedMotion) return;

    setAnimationPhase('intro');
    onAnimationStart?.();

    const svg = svgRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationPhase('idle');
        onAnimationComplete?.();
        runIdleAnimations();
      }
    });

    // Set initial states with symmetry
    gsap.set(svg, { opacity: 0, scale: 0.95 });
    gsap.set('[data-animate]', { 
      opacity: 0, 
      scale: 0, 
      rotation: (i: number) => i % 2 === 0 ? -30 : 30,
      transformOrigin: 'center center'
    });

    // Symmetrical entrance sequence
    tl.to(svg, {
      opacity: 1,
      scale: 1,
      duration: preset.timing.duration * 0.4,
      ease: 'back.out(1.5)'
    })
    tl.to('[data-animate]', {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: preset.timing.duration * 0.7,
      stagger: {
        each: preset.timing.stagger,
        from: 'center',
        ease: 'power2.out'
      },
      ease: 'elastic.out(1, 0.4)'
    }, '-=0.3');

  }, [reducedMotion, onAnimationStart, preset.timing.duration, preset.timing.stagger, onAnimationComplete, runIdleAnimations]);

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (enableMouseTracking && !reducedMotion) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', () => {
        setIsHovered(true);
        setAnimationPhase('interact');
      });
      container.addEventListener('mouseleave', () => {
        setIsHovered(false);
        setAnimationPhase('idle');
      });

      updateMouseEffects();
    }

    const timer = setTimeout(runIntroAnimation, 100);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [handleMouseMove, updateMouseEffects, runIntroAnimation, enableMouseTracking, reducedMotion]);

  // Symmetric particle positions
  const particlePositions = useMemo(() => {
    const particles = [];
    const centerX = width / 2;
    const centerY = height / 2;
    
    for (let i = 0; i < preset.particleCount; i++) {
      const angle = (i / preset.particleCount) * Math.PI * 2;
      const radius = 80 + (i % 3) * 60;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      particles.push({
        x,
        y,
        size: 2 + (i % 4),
        delay: i * 0.1,
        angle
      });
    }
    
    return particles;
  }, [width, height, preset.particleCount]);

  // Accessibility props
  const accessibilityProps = {
    role: 'img' as const,
    'aria-label': 'Interactive tech-themed animation for personality quiz application',
    'aria-hidden': true
  };

  if (reducedMotion) {
    return (
      <div 
        ref={containerRef}
        className={`flex items-center justify-center w-full h-full relative ${className}`}
        {...accessibilityProps}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`-50 -50 ${width + 100} ${height + 100}`}
          className=""
        >
          <defs>
            <linearGradient id="staticGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={preset.colors.gradient1} />
              <stop offset="50%" stopColor={preset.colors.gradient2} />
              <stop offset="100%" stopColor={preset.colors.gradient3} />
            </linearGradient>
          </defs>
          <circle
            cx={width/2}
            cy={height/2}
            r={120}
            fill="url(#staticGradient)"
            opacity={0.8}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center w-full h-full relative ${className}`}
      {...accessibilityProps}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`-50 -50 ${width + 100} ${height + 100}`}
        className=""
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <defs>
          {/* Blue gradient definitions for tech theme */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={preset.colors.gradient1} stopOpacity="1" />
            <stop offset="50%" stopColor={preset.colors.gradient2} stopOpacity="0.9" />
            <stop offset="100%" stopColor={preset.colors.gradient3} stopOpacity="0.8" />
          </linearGradient>

          <radialGradient id="radialGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={preset.colors.accent} stopOpacity="0.9" />
            <stop offset="50%" stopColor={preset.colors.primary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={preset.colors.secondary} stopOpacity="0.4" />
          </radialGradient>

          <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={preset.colors.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={preset.colors.secondary} stopOpacity="0.6" />
          </linearGradient>

          {/* Enhanced filter effects */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMorphology operator="dilate" radius="2"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="neonGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 0"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central symmetrical core */}
        <g data-animate data-glow data-float>
          {/* Main central circle */}
          <circle
            cx={width/2}
            cy={height/2}
            r="80"
            fill="url(#radialGradient)"
            filter="url(#neonGlow)"
            data-morph
          />
          
          {/* Inner tech ring */}
          <circle
            cx={width/2}
            cy={height/2}
            r="60"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="3"
            strokeDasharray="20,10"
            filter="url(#softGlow)"
            style={{
              strokeDashoffset: isHovered ? 0 : 30,
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </g>

        {/* Symmetrical orbital rings */}
        <g data-animate data-float>
          <circle
            cx={width/2}
            cy={height/2}
            r="140"
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="2"
            strokeDasharray="15,25"
            filter="url(#softGlow)"
            opacity="0.7"
            data-glow
            style={{
              strokeDashoffset: isHovered ? -40 : 0,
              transition: 'stroke-dashoffset 1.5s ease-in-out'
            }}
          />
          
          <circle
            cx={width/2}
            cy={height/2}
            r="200"
            fill="none"
            stroke="url(#verticalGradient)"
            strokeWidth="1.5"
            strokeDasharray="10,30"
            filter="url(#softGlow)"
            opacity="0.5"
            data-glow
            style={{
              strokeDashoffset: isHovered ? 40 : 0,
              transition: 'stroke-dashoffset 2s ease-in-out'
            }}
          />
        </g>

        {/* Symmetrical flowing curves */}
        <g data-animate data-float data-glow>
          {/* Left curved flow */}
          <path
            d={`M ${width * 0.1} ${height * 0.3} Q ${width * 0.3} ${height * 0.1} ${width * 0.45} ${height * 0.4} T ${width * 0.4} ${height * 0.8}`}
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.8"
          />
          
          {/* Right curved flow (mirrored) */}
          <path
            d={`M ${width * 0.9} ${height * 0.3} Q ${width * 0.7} ${height * 0.1} ${width * 0.55} ${height * 0.4} T ${width * 0.6} ${height * 0.8}`}
            fill="none"
            stroke="url(#primaryGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.8"
          />
        </g>

        {/* Symmetrical geometric shapes */}
        <g data-animate data-float data-glow>
          {/* Left side elements */}
          <polygon
            points={`${width * 0.2},${height * 0.25} ${width * 0.25},${height * 0.2} ${width * 0.3},${height * 0.25} ${width * 0.25},${height * 0.3}`}
            fill="url(#radialGradient)"
            filter="url(#softGlow)"
            data-morph
          />
          
          <circle
            cx={width * 0.15}
            cy={height * 0.6}
            r="20"
            fill="url(#verticalGradient)"
            filter="url(#glow)"
          />
          
          {/* Right side elements (mirrored) */}
          <polygon
            points={`${width * 0.8},${height * 0.25} ${width * 0.75},${height * 0.2} ${width * 0.7},${height * 0.25} ${width * 0.75},${height * 0.3}`}
            fill="url(#radialGradient)"
            filter="url(#softGlow)"
            data-morph
          />
          
          <circle
            cx={width * 0.85}
            cy={height * 0.6}
            r="20"
            fill="url(#verticalGradient)"
            filter="url(#glow)"
          />
        </g>

        {/* Enhanced particle system with perfect symmetry */}
        {enableParticles && particlePositions.map((particle, index) => (
          <circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={index % 3 === 0 ? preset.colors.primary : 
                  index % 3 === 1 ? preset.colors.secondary : 
                  preset.colors.accent}
            filter="url(#softGlow)"
            data-animate
            data-float
            data-glow
            opacity="0.8"
            style={{ 
              animationDelay: `${particle.delay}s`,
              transformOrigin: `${particle.x}px ${particle.y}px`
            }}
          />
        ))}

        {/* Connecting energy lines with symmetry */}
        <g data-animate data-glow>
          <line
            x1={width * 0.2}
            y1={height * 0.25}
            x2={width * 0.5}
            y2={height * 0.5}
            stroke={preset.colors.primary}
            strokeWidth="2"
            strokeDasharray="6,6"
            filter="url(#softGlow)"
            opacity="0.6"
            style={{
              strokeDashoffset: isHovered ? 0 : 12,
              transition: 'stroke-dashoffset 0.5s ease-in-out'
            }}
          />
          
          <line
            x1={width * 0.8}
            y1={height * 0.25}
            x2={width * 0.5}
            y2={height * 0.5}
            stroke={preset.colors.primary}
            strokeWidth="2"
            strokeDasharray="6,6"
            filter="url(#softGlow)"
            opacity="0.6"
            style={{
              strokeDashoffset: isHovered ? 0 : 12,
              transition: 'stroke-dashoffset 0.5s ease-in-out'
            }}
          />
        </g>

        {/* Mouse cursor interaction indicator */}
        {enableMouseTracking && isHovered && (
          <circle
            cx={width/2 + mousePos.current.x * width * 0.2}
            cy={height/2 + mousePos.current.y * height * 0.2}
            r="6"
            fill={preset.colors.accent}
            filter="url(#neonGlow)"
            opacity="0.8"
            style={{
              transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              mixBlendMode: 'screen'
            }}
          />
        )}

        {/* Tech-themed decorative elements */}
        <g data-animate data-float>
          {/* Corner tech patterns */}
          <rect
            x={width * 0.05}
            y={height * 0.05}
            width="30"
            height="3"
            fill="url(#primaryGradient)"
            filter="url(#softGlow)"
            opacity="0.7"
          />
          <rect
            x={width * 0.05}
            y={height * 0.07}
            width="20"
            height="3"
            fill="url(#primaryGradient)"
            filter="url(#softGlow)"
            opacity="0.5"
          />
          
          <rect
            x={width * 0.88}
            y={height * 0.05}
            width="30"
            height="3"
            fill="url(#primaryGradient)"
            filter="url(#softGlow)"
            opacity="0.7"
          />
          <rect
            x={width * 0.9}
            y={height * 0.07}
            width="20"
            height="3"
            fill="url(#primaryGradient)"
            filter="url(#softGlow)"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
};

export default TechSVGAnimation;