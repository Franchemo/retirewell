
/**
 * Browser compatibility utility
 * Provides detection and polyfill loading for cross-browser support
 */

import PromisePolyfill from 'promise-polyfill';

// Browser capability types
export interface BrowserCapabilities {
  isSafari: boolean;
  isIOS: boolean;
  isOldBrowser: boolean;
  hasLocalStorage: boolean;
  hasSessionStorage: boolean;
  supportsPromises: boolean;
  hasServiceWorker: boolean;
  supportsTouch: boolean;
}

/**
 * Detects browser capabilities safely
 * Falls back to conservative values if detection fails
 */
export function detectBrowserCapabilities(): BrowserCapabilities {
  const capabilities: BrowserCapabilities = {
    isSafari: false,
    isIOS: false,
    isOldBrowser: false,
    hasLocalStorage: false,
    hasSessionStorage: false,
    supportsPromises: true,
    hasServiceWorker: false,
    supportsTouch: false
  };
  
  try {
    // Detect Safari
    const ua = navigator.userAgent.toLowerCase();
    capabilities.isSafari = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    
    // Detect iOS
    capabilities.isIOS = /iphone|ipad|ipod/.test(ua) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Check if browser is old (lacks modern features)
    capabilities.isOldBrowser = !window.Promise || !window.fetch;
    
    // Check storage availability
    capabilities.hasLocalStorage = storageAvailable('localStorage');
    capabilities.hasSessionStorage = storageAvailable('sessionStorage');
    
    // Check Promise support
    capabilities.supportsPromises = typeof Promise !== 'undefined';
    
    // Check Service Worker support
    capabilities.hasServiceWorker = 'serviceWorker' in navigator;
    
    // Check touch support
    capabilities.supportsTouch = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0;
    
  } catch (error) {
    console.error('Error detecting browser capabilities:', error);
    // Capabilities remain at conservative defaults
  }
  
  return capabilities;
}

/**
 * Safely checks if a storage type is available
 */
function storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Loads polyfills based on browser capabilities
 */
export function loadPolyfills(): Promise<void> {
  const capabilities = detectBrowserCapabilities();
  const polyfillsToLoad: Promise<any>[] = [];
  
  // Add Promise polyfill if needed
  if (!capabilities.supportsPromises) {
    console.log('Loading Promise polyfill');
    window.Promise = PromisePolyfill;
  }
  
  // Wait for all polyfills to load
  return Promise.all(polyfillsToLoad).then(() => {
    console.log('All polyfills loaded successfully');
  }).catch(error => {
    console.error('Error loading polyfills:', error);
  });
}

/**
 * Safely accesses local storage with fallback
 */
export class SafeStorage {
  private hasStorage: boolean;
  private storageType: 'localStorage' | 'sessionStorage';
  private memoryFallback: Record<string, string> = {};
  
  constructor(type: 'localStorage' | 'sessionStorage' = 'localStorage') {
    this.storageType = type;
    this.hasStorage = storageAvailable(type);
  }
  
  getItem(key: string): string | null {
    try {
      if (this.hasStorage) {
        return window[this.storageType].getItem(key);
      }
      return this.memoryFallback[key] || null;
    } catch (e) {
      console.warn(`Error getting ${key} from ${this.storageType}:`, e);
      return null;
    }
  }
  
  setItem(key: string, value: string): void {
    try {
      if (this.hasStorage) {
        window[this.storageType].setItem(key, value);
      } else {
        this.memoryFallback[key] = value;
      }
    } catch (e) {
      console.warn(`Error setting ${key} in ${this.storageType}:`, e);
    }
  }
  
  removeItem(key: string): void {
    try {
      if (this.hasStorage) {
        window[this.storageType].removeItem(key);
      } else {
        delete this.memoryFallback[key];
      }
    } catch (e) {
      console.warn(`Error removing ${key} from ${this.storageType}:`, e);
    }
  }
  
  clear(): void {
    try {
      if (this.hasStorage) {
        window[this.storageType].clear();
      } else {
        this.memoryFallback = {};
      }
    } catch (e) {
      console.warn(`Error clearing ${this.storageType}:`, e);
    }
  }
}
