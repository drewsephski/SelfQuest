import { AnimationTheme } from './animation-config';

export interface AnimationPreset {
  name: string;
  description: string;
  theme: Partial<AnimationTheme>;
  features: {
    morphingEnabled: boolean;
    particlesEnabled: boolean;
    lightingEnabled: boolean;
    physicsEnabled: boolean;
  };
  customProperties?: Record<string, string>;
}

export const ANIMATION_PRESETS: Record<string, AnimationPreset> = {
  // Existing presets with enhanced configuration
  elegant: {
    name: 'Elegant',
    description: 'Smooth, sophisticated animations with gentle curves and soft lighting',
    theme: {
      timing: { duration: 3, stagger: 0.15, delay: 0.5 },
      physics: { stiffness: 80, damping: 12, mass: 1.2 },
      particleCount: 8,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
  },

  dynamic: {
    name: 'Dynamic',
    description: 'Fast-paced, energetic animations with bold movements and vibrant effects',
    theme: {
      timing: { duration: 1.5, stagger: 0.08, delay: 0.2 },
      physics: { stiffness: 120, damping: 8, mass: 0.8 },
      particleCount: 15,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
  },

  minimal: {
    name: 'Minimal',
    description: 'Clean, understated animations focusing on essential movements',
    theme: {
      timing: { duration: 4, stagger: 0.2, delay: 1 },
      physics: { stiffness: 60, damping: 15, mass: 1.5 },
      particleCount: 5,
    },
    features: {
      morphingEnabled: false,
      particlesEnabled: false,
      lightingEnabled: true,
      physicsEnabled: true,
    },
  },

  vibrant: {
    name: 'Vibrant',
    description: 'Colorful, lively animations with multiple effects and dynamic particles',
    theme: {
      timing: { duration: 2, stagger: 0.1, delay: 0.3 },
      physics: { stiffness: 100, damping: 10, mass: 1 },
      particleCount: 12,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
  },

  // New advanced presets
  cosmic: {
    name: 'Cosmic',
    description: 'Space-themed animations with swirling galaxies and stellar effects',
    theme: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      background: '#0f172a',
      timing: { duration: 4, stagger: 0.25, delay: 0.8 },
      physics: { stiffness: 50, damping: 20, mass: 2 },
      particleCount: 20,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--cosmic-glow': 'radial-gradient(circle, #8b5cf6 0%, #06b6d4 50%, transparent 100%)',
      '--star-colors': '#f59e0b, #8b5cf6, #06b6d4, #f97316',
    },
  },

  organic: {
    name: 'Organic',
    description: 'Nature-inspired animations with flowing, plant-like movements',
    theme: {
      primary: '#10b981',
      secondary: '#84cc16',
      accent: '#f59e0b',
      background: '#f0fdf4',
      timing: { duration: 3.5, stagger: 0.18, delay: 0.6 },
      physics: { stiffness: 70, damping: 14, mass: 1.4 },
      particleCount: 10,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: false,
      physicsEnabled: true,
    },
    customProperties: {
      '--leaf-shadow': 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.3))',
      '--growth-gradient': 'linear-gradient(135deg, #10b981 0%, #84cc16 100%)',
    },
  },

  cyberpunk: {
    name: 'Cyberpunk',
    description: 'Futuristic neon animations with glitch effects and digital aesthetics',
    theme: {
      primary: '#ff0080',
      secondary: '#00ffff',
      accent: '#ffff00',
      background: '#0a0a0a',
      timing: { duration: 1.8, stagger: 0.05, delay: 0.1 },
      physics: { stiffness: 150, damping: 6, mass: 0.6 },
      particleCount: 25,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--neon-glow': 'drop-shadow(0 0 10px currentColor) drop-shadow(0 0 20px currentColor)',
      '--glitch-colors': '#ff0080, #00ffff, #ffff00, #ff4500',
      '--scan-line': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
    },
  },

  watercolor: {
    name: 'Watercolor',
    description: 'Soft, painterly animations with blended colors and organic flows',
    theme: {
      primary: '#7c3aed',
      secondary: '#ec4899',
      accent: '#f97316',
      background: '#fefefe',
      timing: { duration: 5, stagger: 0.3, delay: 1.2 },
      physics: { stiffness: 40, damping: 18, mass: 1.8 },
      particleCount: 6,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: false,
      lightingEnabled: false,
      physicsEnabled: true,
    },
    customProperties: {
      '--watercolor-blend': 'multiply',
      '--ink-spread': 'blur(8px)',
      '--paper-texture': 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    },
  },

  crystalline: {
    name: 'Crystalline',
    description: 'Geometric animations with crystal formations and reflective surfaces',
    theme: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#f8fafc',
      timing: { duration: 3.2, stagger: 0.12, delay: 0.7 },
      physics: { stiffness: 90, damping: 11, mass: 1.1 },
      particleCount: 14,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--crystal-reflect': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 50%, rgba(255,255,255,0.4) 100%)',
      '--facet-shadow': 'drop-shadow(2px 4px 8px rgba(59, 130, 246, 0.3))',
      '--ice-gradient': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
    },
  },

  aurora: {
    name: 'Aurora',
    description: 'Northern lights-inspired animations with flowing color waves',
    theme: {
      primary: '#10b981',
      secondary: '#3b82f6',
      accent: '#8b5cf6',
      background: '#0f172a',
      timing: { duration: 6, stagger: 0.4, delay: 1.5 },
      physics: { stiffness: 30, damping: 25, mass: 2.5 },
      particleCount: 18,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--aurora-colors': 'linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
      '--wave-opacity': '0.7',
      '--glow-intensity': '1.5',
    },
  },

  steampunk: {
    name: 'Steampunk',
    description: 'Victorian-era inspired animations with gears, steam, and mechanical movements',
    theme: {
      primary: '#b45309',
      secondary: '#92400e',
      accent: '#fbbf24',
      background: '#fef3c7',
      timing: { duration: 4.5, stagger: 0.22, delay: 0.9 },
      physics: { stiffness: 85, damping: 13, mass: 1.3 },
      particleCount: 9,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--brass-gradient': 'linear-gradient(135deg, #b45309 0%, #92400e 50%, #fbbf24 100%)',
      '--steam-cloud': 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
      '--gear-shadow': 'drop-shadow(4px 6px 12px rgba(180, 83, 9, 0.4))',
    },
  },

  nebula: {
    name: 'Nebula',
    description: 'Deep space animations with colorful gas clouds and stellar formations',
    theme: {
      primary: '#7c3aed',
      secondary: '#dc2626',
      accent: '#059669',
      background: '#1e1b4b',
      timing: { duration: 7, stagger: 0.35, delay: 2 },
      physics: { stiffness: 25, damping: 30, mass: 3 },
      particleCount: 22,
    },
    features: {
      morphingEnabled: true,
      particlesEnabled: true,
      lightingEnabled: true,
      physicsEnabled: true,
    },
    customProperties: {
      '--nebula-clouds': 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124, 58, 237, 0.6) 0%, rgba(220, 38, 38, 0.4) 50%, rgba(5, 150, 105, 0.3) 100%)',
      '--star-field': 'radial-gradient(2px 2px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 40% 70%, #fff, transparent), radial-gradient(1px 1px at 90% 40%, #fff, transparent)',
      '--gas-flow': 'conic-gradient(from 0deg at 50% 50%, rgba(124, 58, 237, 0.8), rgba(220, 38, 38, 0.6), rgba(5, 150, 105, 0.7), rgba(124, 58, 237, 0.8))',
    },
  },
};

export type PresetName = keyof typeof ANIMATION_PRESETS;

/**
 * Get a preset by name with fallback to default
 */
export function getPreset(name: PresetName): AnimationPreset {
  return ANIMATION_PRESETS[name] || ANIMATION_PRESETS.elegant;
}

/**
 * Get all available preset names
 */
export function getPresetNames(): PresetName[] {
  return Object.keys(ANIMATION_PRESETS) as PresetName[];
}

/**
 * Create a custom preset based on an existing one
 */
export function createCustomPreset(
  basePreset: PresetName,
  overrides: Partial<AnimationPreset>
): AnimationPreset {
  const base = getPreset(basePreset);
  return {
    ...base,
    ...overrides,
    theme: { ...base.theme, ...overrides.theme },
    features: { ...base.features, ...overrides.features },
    customProperties: { ...base.customProperties, ...overrides.customProperties },
  };
}

/**
 * Generate a random preset for dynamic experiences
 */
export function getRandomPreset(): AnimationPreset {
  const names = getPresetNames();
  const randomName = names[Math.floor(Math.random() * names.length)];
  return getPreset(randomName);
}

/**
 * Get presets suitable for different contexts
 */
export const PRESET_COLLECTIONS = {
  calm: ['elegant', 'minimal', 'watercolor', 'organic'] as PresetName[],
  energetic: ['dynamic', 'vibrant', 'cyberpunk', 'crystalline'] as PresetName[],
  nature: ['organic', 'watercolor', 'aurora', 'nebula'] as PresetName[],
  tech: ['cyberpunk', 'crystalline', 'cosmic', 'dynamic'] as PresetName[],
  fantasy: ['cosmic', 'aurora', 'nebula', 'steampunk'] as PresetName[],
  business: ['elegant', 'minimal', 'crystalline', 'watercolor'] as PresetName[],
};

/**
 * Get presets for a specific context
 */
export function getContextualPresets(context: keyof typeof PRESET_COLLECTIONS): AnimationPreset[] {
  return PRESET_COLLECTIONS[context].map(name => getPreset(name));
}