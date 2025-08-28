import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { animationConfig, performanceMonitor, AnimationTheme } from '../lib/animation-config';

export interface UseGSAPAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
  immediateRender?: boolean;
  paused?: boolean;
}

export interface UseGSAPAnimationReturn {
  animate: (target: gsap.DOMTarget, vars: gsap.TweenVars) => gsap.core.Tween;
  timeline: (vars?: gsap.TimelineVars) => gsap.core.Timeline;
  set: (target: gsap.DOMTarget, vars: gsap.TweenVars) => void;
  kill: (target?: gsap.DOMTarget) => void;
  pause: (target?: gsap.DOMTarget) => void;
  resume: (target?: gsap.DOMTarget) => void;
  progress: (value?: number) => number;
  invalidate: () => void;
}

// Main GSAP animation hook
export function useGSAPAnimation(options: UseGSAPAnimationOptions = {}): UseGSAPAnimationReturn {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const animationId = useRef<string>('');

  useEffect(() => {
    animationId.current = `animation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    performanceMonitor.startTracking(animationId.current);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  const animate = useCallback((target: gsap.DOMTarget, vars: gsap.TweenVars): gsap.core.Tween => {
    const startTime = performance.now();

    const tween = gsap.to(target, {
      ...vars,
      duration: vars.duration ?? options.duration ?? animationConfig.getTheme().timing.duration,
      delay: vars.delay ?? options.delay ?? 0,
      ease: vars.ease ?? options.ease ?? animationConfig.getEase('cubic'),
      onComplete: () => {
        const endTime = performance.now();
        performanceMonitor.recordFrameTime(animationId.current, endTime - startTime);
        options.onComplete?.();
      },
      onStart: options.onStart,
      onUpdate: options.onUpdate,
      immediateRender: vars.immediateRender ?? options.immediateRender ?? true,
      paused: vars.paused ?? options.paused ?? false,
    });

    return tween;
  }, [options]);

  const timeline = useCallback((vars?: gsap.core.TimelineVars): gsap.core.Timeline => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      ...vars,
      onComplete: () => {
        options.onComplete?.();
        timelineRef.current = null;
      },
      onStart: options.onStart,
    });

    return timelineRef.current;
  }, [options]);

  const set = useCallback((target: gsap.DOMTarget, vars: gsap.TweenVars): void => {
    gsap.set(target, vars);
  }, []);

  const kill = useCallback((target?: gsap.DOMTarget): void => {
    if (target) {
      gsap.killTweensOf(target);
    } else {
      gsap.killTweensOf('*');
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    }
  }, []);

  const pause = useCallback((target?: gsap.DOMTarget): void => {
    if (target) {
      gsap.getTweensOf(target).forEach(tween => tween.pause());
    } else {
      gsap.globalTimeline.pause();
    }
  }, []);

  const resume = useCallback((target?: gsap.DOMTarget): void => {
    if (target) {
      gsap.getTweensOf(target).forEach(tween => tween.resume());
    } else {
      gsap.globalTimeline.resume();
    }
  }, []);

  const getProgress = useCallback((value?: number): number => {
    if (value !== undefined && timelineRef.current) {
      timelineRef.current.progress(value);
    }
    return timelineRef.current?.progress() ?? 0;
  }, []);

  const invalidate = useCallback((): void => {
    gsap.globalTimeline.invalidate();
  }, []);

  return {
    animate,
    timeline,
    set,
    kill,
    pause,
    resume,
    progress: getProgress,
    invalidate,
  };
}

// Hook for physics-based animations
export function usePhysicsAnimation() {
  const { animate } = useGSAPAnimation();
  const physics = animationConfig.getPhysicsConfig();

  const spring = useCallback((
    target: gsap.DOMTarget,
    vars: gsap.TweenVars & { stiffness?: number; damping?: number; mass?: number }
  ) => {
    return animate(target, {
      ...vars,
      ease: 'elastic.out(1, 0.3)',
      duration: vars.duration ?? physics.mass * 0.1,
      onUpdate: function() {
        // Apply physics-based easing
        const progress = this.progress();
        const stiffness = vars.stiffness ?? physics.stiffness;
        const damping = vars.damping ?? physics.damping;

        // Custom physics calculation
        const displacement = 1 - progress;
        const springForce = -stiffness * displacement;
        const dampingForce = -damping * (this.velocity || 0);
        const totalForce = springForce + dampingForce;

        this.velocity = (this.velocity || 0) + totalForce * 0.016; // 16ms frame
      },
    });
  }, [animate, physics]);

  const bounce = useCallback((target: gsap.DOMTarget, vars: gsap.TweenVars) => {
    return animate(target, {
      ...vars,
      ease: 'bounce.out',
      duration: vars.duration ?? physics.mass * 0.15,
    });
  }, [animate, physics]);

  const inertia = useCallback((target: gsap.DOMTarget, vars: gsap.TweenVars) => {
    return animate(target, {
      ...vars,
      ease: 'power1.out',
      duration: vars.duration ?? physics.mass * 0.2,
    });
  }, [animate, physics]);

  return { spring, bounce, inertia };
}

// Hook for staggered animations
export function useStaggerAnimation() {
  const { animate } = useGSAPAnimation();
  const staggerConfig = animationConfig.getStaggerConfig();

  const staggerFrom = useCallback((
    target: gsap.DOMTarget,
    vars: gsap.TweenVars & { stagger?: gsap.StaggerVars }
  ) => {
    return animate(target, {
      ...vars,
      stagger: vars.stagger ?? staggerConfig,
    });
  }, [animate, staggerConfig]);

  const staggerTo = useCallback((
    target: gsap.DOMTarget,
    vars: gsap.TweenVars & { stagger?: gsap.StaggerVars }
  ) => {
    return gsap.to(target, {
      ...vars,
      stagger: vars.stagger ?? staggerConfig,
    });
  }, [staggerConfig]);

  const wave = useCallback((
    target: gsap.DOMTarget,
    vars: gsap.TweenVars & { waveIntensity?: number }
  ) => {
    const intensity = vars.waveIntensity ?? 1;

    return gsap.to(target, {
      ...vars,
      stagger: {
        amount: staggerConfig.amount,
        from: 'start',
        ease: 'sine.inOut',
      },
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      onUpdate: function() {
        // Apply wave transformation
        const progress = this.progress();
        const waveOffset = Math.sin(progress * Math.PI * 2 * intensity) * 10;
        gsap.set(target, { y: waveOffset });
      },
    });
  }, [staggerConfig]);

  return { staggerFrom, staggerTo, wave };
}

// Hook for morphing animations
export function useMorphAnimation() {
  const { animate } = useGSAPAnimation();

  const morphPath = useCallback((
    target: gsap.DOMTarget,
    fromPath: string,
    toPath: string,
    vars: gsap.TweenVars = {}
  ) => {
    return animate(target, {
      ...vars,
      attr: {
        d: toPath,
      },
      ease: 'power2.inOut',
      onStart: () => {
        gsap.set(target, { attr: { d: fromPath } });
      },
    });
  }, [animate]);

  const morphShape = useCallback((
    target: gsap.DOMTarget,
    fromProps: gsap.TweenVars,
    toProps: gsap.TweenVars,
    vars: gsap.TweenVars = {}
  ) => {
    return gsap.fromTo(target, fromProps, {
      ...toProps,
      ...vars,
      ease: 'power3.inOut',
    });
  }, []);

  const liquidMorph = useCallback((
    target: gsap.DOMTarget,
    paths: string[],
    vars: gsap.TweenVars & { morphSpeed?: number } = {}
  ) => {
    const speed = vars.morphSpeed ?? 1;
    let currentIndex = 0;

    const morphToNext = () => {
      const nextIndex = (currentIndex + 1) % paths.length;
      animate(target, {
        ...vars,
        duration: vars.duration ?? 2 / speed,
        attr: { d: paths[nextIndex] },
        ease: 'power2.inOut',
        onComplete: morphToNext,
      });
      currentIndex = nextIndex;
    };

    morphToNext();

    return () => gsap.killTweensOf(target);
  }, [animate]);

  return { morphPath, morphShape, liquidMorph };
}

// Hook for particle systems
export function useParticleSystem() {
  const { animate, set } = useGSAPAnimation();
  const particleCount = animationConfig.getTheme().particleCount;

  const createParticles = useCallback((
    container: gsap.DOMTarget,
    count: number = particleCount,
    options: {
      size?: [number, number];
      colors?: string[];
      speed?: [number, number];
      lifetime?: [number, number];
    } = {}
  ) => {
    const {
      size = [2, 6],
      colors = ['#6366f1', '#a855f7', '#0ea5e9'],
      speed = [1, 3],
      lifetime = [2000, 4000],
    } = options;

    const particles: gsap.core.Tween[] = [];

    for (let i = 0; i < count; i++) {
      const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particleSize = size[0] + Math.random() * (size[1] - size[0]);
      const particleSpeed = speed[0] + Math.random() * (speed[1] - speed[0]);
      const particleLifetime = lifetime[0] + Math.random() * (lifetime[1] - lifetime[0]);

      particle.setAttribute('r', particleSize.toString());
      particle.setAttribute('fill', color);
      particle.setAttribute('opacity', '0.7');

      // Position randomly within container
      const containerRect = (container as Element).getBoundingClientRect();
      const x = Math.random() * containerRect.width;
      const y = Math.random() * containerRect.height;

      particle.setAttribute('cx', x.toString());
      particle.setAttribute('cy', y.toString());

      (container as Element).appendChild(particle);

      // Animate particle
      const tween = animate(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: 0,
        duration: particleLifetime / 1000,
        ease: 'power2.out',
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        },
      });

      particles.push(tween);
    }

    return particles;
  }, [animate, set, particleCount]);

  const floatingParticles = useCallback((
    container: gsap.DOMTarget,
    count: number = particleCount,
    vars: gsap.TweenVars = {}
  ) => {
    return createParticles(container, count, {
      size: [1, 3],
      colors: ['rgba(99, 102, 241, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(14, 165, 233, 0.3)'],
      speed: [0.5, 1.5],
      lifetime: [3000, 6000],
      ...vars,
    });
  }, [createParticles, particleCount]);

  return { createParticles, floatingParticles };
}

// Hook for accessibility and reduced motion
export function useAccessibleAnimation() {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const safeAnimate = useCallback((
    target: gsap.DOMTarget,
    vars: gsap.TweenVars,
    fallback?: gsap.TweenVars
  ) => {
    if (prefersReducedMotion) {
      return gsap.set(target, fallback ?? { opacity: 1 });
    }

    return gsap.to(target, vars);
  }, [prefersReducedMotion]);

  const getSafeDuration = useCallback((duration: number): number => {
    return prefersReducedMotion ? Math.min(duration, 0.1) : duration;
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    safeAnimate,
    getSafeDuration,
    shouldAnimate: !prefersReducedMotion,
  };
}

// Hook for performance monitoring
export function useAnimationPerformance() {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  const measureFPS = useCallback(() => {
    frameCount.current++;
    const currentTime = performance.now();

    if (currentTime - lastTime.current >= 1000) {
      const fps = frameCount.current;
      frameCount.current = 0;
      lastTime.current = currentTime;
      return fps;
    }

    return null;
  }, []);

  const logPerformance = useCallback((animationId: string, fps: number) => {
    console.log(`Animation ${animationId}: ${fps} FPS`);
  }, []);

  return { measureFPS, logPerformance };
}

// Main hook that combines all animation capabilities
export function useProfessionalAnimation(options: UseGSAPAnimationOptions = {}) {
  const gsap = useGSAPAnimation(options);
  const physics = usePhysicsAnimation();
  const stagger = useStaggerAnimation();
  const morph = useMorphAnimation();
  const particles = useParticleSystem();
  const accessibility = useAccessibleAnimation();
  const performance = useAnimationPerformance();

  return {
    ...gsap,
    physics,
    stagger,
    morph,
    particles,
    accessibility,
    performance,
  };
}

export default useProfessionalAnimation;