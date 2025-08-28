import { gsap } from 'gsap';

export interface AnimationTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  glowIntensity: number;
  particleCount: number;
  physics: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  timing: {
    duration: number;
    stagger: number;
    delay: number;
  };
  effects: {
    morphingEnabled: boolean;
    particlesEnabled: boolean;
    lightingEnabled: boolean;
  };
}

export const DEFAULT_ANIMATION_THEME: AnimationTheme = {
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#0ea5e9',
  background: '#ffffff',
  glowIntensity: 0.8,
  particleCount: 12,
  physics: {
    stiffness: 100,
    damping: 10,
    mass: 1,
  },
  timing: {
    duration: 2,
    stagger: 0.1,
    delay: 0,
  },
  effects: {
    morphingEnabled: true,
    particlesEnabled: true,
    lightingEnabled: true,
  },
};

export class AnimationConfig {
  private static instance: AnimationConfig;
  private theme: AnimationTheme = { ...DEFAULT_ANIMATION_THEME };
  private cssVariables: Record<string, string> = {};

  private constructor() {
    this.updateCSSVariables();
  }

  static getInstance(): AnimationConfig {
    if (!AnimationConfig.instance) {
      AnimationConfig.instance = new AnimationConfig();
    }
    return AnimationConfig.instance;
  }

  setTheme(theme: Partial<AnimationTheme>): void {
    this.theme = { ...this.theme, ...theme };
    this.updateCSSVariables();
  }

  getTheme(): AnimationTheme {
    return { ...this.theme };
  }

  private updateCSSVariables(): void {
    this.cssVariables = {
      '--animation-primary': this.theme.primary,
      '--animation-secondary': this.theme.secondary,
      '--animation-accent': this.theme.accent,
      '--animation-background': this.theme.background,
      '--animation-glow-intensity': this.theme.glowIntensity.toString(),
    };

    // Apply to document root
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      Object.entries(this.cssVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }

  getCSSVariables(): Record<string, string> {
    return { ...this.cssVariables };
  }

  // Utility methods for common animation patterns
  getEase(type: 'bounce' | 'elastic' | 'back' | 'circ' | 'expo' | 'sine' | 'quad' | 'cubic' | 'quart' | 'quint' = 'cubic'): string {
    const eases = {
      bounce: 'bounce.out',
      elastic: 'elastic.out(1, 0.3)',
      back: 'back.out(1.7)',
      circ: 'circ.out',
      expo: 'expo.out',
      sine: 'sine.out',
      quad: 'power2.out',
      cubic: 'power3.out',
      quart: 'power4.out',
      quint: 'power5.out',
    };
    return eases[type] || 'power3.out';
  }

  getStaggerConfig(): gsap.StaggerVars {
    return {
      amount: this.theme.timing.stagger * this.theme.particleCount,
      from: 'random',
    };
  }

  getPhysicsConfig(): { stiffness: number; damping: number; mass: number } {
    return { ...this.theme.physics };
  }
}

// Export singleton instance
export const animationConfig = AnimationConfig.getInstance();

// Helper function to create color harmonies
export function generateColorHarmony(baseColor: string): { primary: string; secondary: string; accent: string } {
  // Simple color harmony generation - in a real app you might use a color library
  const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
    '#6366f1': { primary: '#6366f1', secondary: '#a855f7', accent: '#0ea5e9' }, // Indigo
    '#a855f7': { primary: '#a855f7', secondary: '#ec4899', accent: '#f97316' }, // Purple
    '#0ea5e9': { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#10b981' }, // Sky
    '#10b981': { primary: '#10b981', secondary: '#84cc16', accent: '#eab308' }, // Emerald
    '#f97316': { primary: '#f97316', secondary: '#ec4899', accent: '#a855f7' }, // Orange
  };

  return colorMap[baseColor] || { primary: baseColor, secondary: baseColor, accent: baseColor };
}

// Performance monitoring utility
export class AnimationPerformanceMonitor {
  private static instance: AnimationPerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {}

  static getInstance(): AnimationPerformanceMonitor {
    if (!AnimationPerformanceMonitor.instance) {
      AnimationPerformanceMonitor.instance = new AnimationPerformanceMonitor();
    }
    return AnimationPerformanceMonitor.instance;
  }

  startTracking(animationId: string): void {
    if (!this.metrics.has(animationId)) {
      this.metrics.set(animationId, []);
    }
  }

  recordFrameTime(animationId: string, frameTime: number): void {
    const metrics = this.metrics.get(animationId);
    if (metrics) {
      metrics.push(frameTime);
      // Keep only last 60 frames for performance
      if (metrics.length > 60) {
        metrics.shift();
      }
    }
  }

  getAverageFrameTime(animationId: string): number {
    const metrics = this.metrics.get(animationId);
    if (!metrics || metrics.length === 0) return 0;

    return metrics.reduce((sum, time) => sum + time, 0) / metrics.length;
  }

  getFPS(animationId: string): number {
    const avgFrameTime = this.getAverageFrameTime(animationId);
    return avgFrameTime > 0 ? 1000 / avgFrameTime : 0;
  }

  reset(animationId: string): void {
    this.metrics.delete(animationId);
  }
}

export const performanceMonitor = AnimationPerformanceMonitor.getInstance();