/**
 * ⚡ DEVICE CAPABILITY DETECTION
 * Smart animation gating based on device performance
 * 
 * @module DeviceCapability
 * @version 8.0.0
 * @description Detects device RAM, CPU, network to enable/disable heavy animations
 * 
 * PHILOSOPHY:
 * - Low-tier devices (2GB RAM, 4 cores) get beautiful CSS animations
 * - Mid-tier devices (3GB RAM, 6 cores) get Framer Motion + Lottie
 * - High-tier devices (4GB+ RAM, 8+ cores) get Rive + Three.js
 * - NEVER sacrifice core functionality forAnimation
 * - Progressive enhancement, not graceful degradation
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * DEVICE TIER TYPE
 */
export type DeviceTier = 'low' | 'mid' | 'high';

/**
 * NETWORK TYPE
 */
export type NetworkType = 'slow-2g' | '2g' | '3g' | '4g' | 'wifi' | 'unknown';

/**
 * DEVICE CAPABILITY TYPE
 */
export interface DeviceCapability {
  /** Device performance tier */
  tier: DeviceTier;
  
  /** RAM in GB (estimated) */
  ram: number;
  
  /** CPU cores */
  cores: number;
  
  /** Network connection type */
  network: NetworkType;
  
  /** Enable particle effects */
  enableParticles: boolean;
  
  /** Enable Rive character animations */
  enableRive: boolean;
  
  /** Enable Three.js 3D graphics */
  enableThreeJS: boolean;
  
  /** User prefers reduced motion */
  reducedMotion: boolean;
  
  /** Device is mobile */
  isMobile: boolean;
  
  /** Device is touch-enabled */
  isTouch: boolean;
  
  /** Battery saver mode (if available) */
  batterySaver: boolean;
}

/**
 * DETECT DEVICE TIER
 * Based on RAM and CPU cores
 */
function detectDeviceTier(ram: number, cores: number): DeviceTier {
  // High-tier: 4GB+ RAM, 8+ cores
  if (ram >= 4 && cores >= 8) return 'high';
  
  // Mid-tier: 3GB+ RAM, 6+ cores
  if (ram >= 3 || cores >= 6) return 'mid';
  
  // Low-tier: everything else (default for safety)
  return 'low';
}

/**
 * DETECT NETWORK TYPE
 */
function detectNetworkType(): NetworkType {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection || !connection.effectiveType) {
    return 'unknown';
  }

  return connection.effectiveType as NetworkType;
}

/**
 * DETECT MOBILE DEVICE
 */
function detectMobile(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * DETECT TOUCH SUPPORT
 */
function detectTouch(): boolean {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * DETECT BATTERY SAVER MODE
 * Only works in Chrome with battery API
 */
async function detectBatterySaver(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('getBattery' in navigator)) {
    return false;
  }

  try {
    const battery = await (navigator as any).getBattery();
    // Battery saver typically kicks in below 20%
    return battery.level < 0.2 && !battery.charging;
  } catch {
    return false;
  }
}

/**
 * USE DEVICE CAPABILITY HOOK
 * 
 * @example
 * const device = useDeviceCapability();
 * if (device.enableRive) {
 *   return <RiveCharacter />;
 * } else {
 *   return <StaticCharacterFallback />;
 * }
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    // SSR-safe defaults (conservative for safety)
    return {
      tier: 'mid',
      ram: 4,
      cores: 4,
      network: 'unknown',
      enableParticles: true,
      enableRive: true,
      enableThreeJS: false, // Three.js opt-in only
      reducedMotion: false,
      isMobile: false,
      isTouch: false,
      batterySaver: false,
    };
  });

  useEffect(() => {
    // Client-side detection only
    if (typeof window === 'undefined') return;

    // Detect RAM (only available in Chrome/Edge with Memory API)
    const ram = (navigator as any).deviceMemory || 4; // default to 4GB if unknown
    
    // Detect CPU cores
    const cores = navigator.hardwareConcurrency || 4;
    
    // Detect network
    const network = detectNetworkType();
    
    // Detect device tier
    const tier = detectDeviceTier(ram, cores);
    
    // Detect reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Detect mobile
    const isMobile = detectMobile();
    
    // Detect touch
    const isTouch = detectTouch();
    
    // Animation capability flags
    const enableParticles = tier !== 'low' && !reducedMotion;
    const enableRive = ram >= 3 && !reducedMotion && !isMobile; // Rive is heavy, desktop-first
    const enableThreeJS = ram >= 4 && cores >= 8 && !reducedMotion && !isMobile; // Three.js is premium
    
    // Initial state (synchronous)
    setCapability({
      tier,
      ram,
      cores,
      network,
      enableParticles,
      enableRive,
      enableThreeJS,
      reducedMotion,
      isMobile,
      isTouch,
      batterySaver: false, // will update async
    });

    // Async battery detection
    detectBatterySaver().then((batterySaver) => {
      setCapability((prev) => ({
        ...prev,
        batterySaver,
        // Disable heavy animations if battery saver is on
        enableRive: prev.enableRive && !batterySaver,
        enableThreeJS: prev.enableThreeJS && !batterySaver,
        enableParticles: prev.enableParticles && !batterySaver,
      }));
    });

    // Listen for network changes
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const handleNetworkChange = () => {
        setCapability((prev) => ({
          ...prev,
          network: detectNetworkType(),
        }));
      };
      
      connection.addEventListener('change', handleNetworkChange);
      
      return () => {
        connection.removeEventListener('change', handleNetworkChange);
      };
    }
  }, []);

  return capability;
}

/**
 * GET DEVICE CAPABILITY (Sync utility for Server Components)
 * 
 * WARNING: This returns conservative defaults.
 * Always prefer useDeviceCapability() hook in Client Components.
 */
export function getDeviceCapabilitySync(): DeviceCapability {
  if (typeof window === 'undefined') {
    // Server-side: return safe defaults
    return {
      tier: 'mid',
      ram: 4,
      cores: 4,
      network: 'unknown',
      enableParticles: false, // Conservative for SSR
      enableRive: false,      // Conservative for SSR
      enableThreeJS: false,   // Conservative for SSR
      reducedMotion: false,
      isMobile: false,
      isTouch: false,
      batterySaver: false,
    };
  }

  // Client-side: immediate detection (may not be accurate on first render)
  const ram = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const tier = detectDeviceTier(ram, cores);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = detectMobile();
  const isTouch = detectTouch();

  return {
    tier,
    ram,
    cores,
    network: detectNetworkType(),
    enableParticles: tier !== 'low' && !reducedMotion,
    enableRive: ram >= 3 && !reducedMotion && !isMobile,
    enableThreeJS: ram >= 4 && cores >= 8 && !reducedMotion && !isMobile,
    reducedMotion,
    isMobile,
    isTouch,
    batterySaver: false, // Can't detect synchronously
  };
}

/**
 * DEVICE CAPABILITY PROVIDER COMPONENT
 * Optional: use React Context to share capability across components
 * 
 * @example
 * // In layout.tsx
 * <DeviceCapabilityProvider>
 *   {children}
 * </DeviceCapabilityProvider>
 */
import { createContext, useContext, ReactNode } from 'react';

const DeviceCapabilityContext = createContext<DeviceCapability | null>(null);

export function DeviceCapabilityProvider({ children }: { children: ReactNode }) {
  const capability = useDeviceCapability();
  
  return (
    <DeviceCapabilityContext.Provider value={capability}>
      {children}
    </DeviceCapabilityContext.Provider>
  );
}

/**
 * USE DEVICE CAPABILITY CONTEXT HOOK
 * 
 * @example
 * const device = useDeviceCapabilityContext();
 * if (!device.enableRive) return <Fallback />;
 */
export function useDeviceCapabilityContext(): DeviceCapability {
  const context = useContext(DeviceCapabilityContext);
  
  if (!context) {
    throw new Error('useDeviceCapabilityContext must be used within DeviceCapabilityProvider');
  }
  
  return context;
}
