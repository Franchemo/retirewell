
/**
 * Browser compatibility utility functions
 * These functions help ensure cross-browser compatibility by detecting features
 * and providing fallbacks for unsupported browsers.
 */

// Feature detection function - checks if a feature is available in the browser
export function supportsFeature(feature: string): boolean {
  try {
    switch (feature) {
      case 'localStorage':
        return !!window.localStorage;
      case 'sessionStorage':
        return !!window.sessionStorage;
      case 'fetch':
        return 'fetch' in window;
      case 'promise':
        return 'Promise' in window;
      case 'intersection-observer':
        return 'IntersectionObserver' in window;
      case 'resize-observer':
        return 'ResizeObserver' in window;
      case 'pointer-events':
        return window.matchMedia('(pointer: fine)').matches;
      case 'touch':
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      default:
        return false;
    }
  } catch (error) {
    console.error(`Error checking support for feature: ${feature}`, error);
    return false;
  }
}

// Safe local storage implementation that won't crash if storage is unavailable
export const safeStorage = {
  getItem: (key: string, storageType: 'local' | 'session' = 'local'): string | null => {
    try {
      const storage = storageType === 'local' ? localStorage : sessionStorage;
      return storage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get item ${key} from ${storageType} storage`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string, storageType: 'local' | 'session' = 'local'): boolean => {
    try {
      const storage = storageType === 'local' ? localStorage : sessionStorage;
      storage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set item ${key} in ${storageType} storage`, error);
      return false;
    }
  },
  
  removeItem: (key: string, storageType: 'local' | 'session' = 'local'): boolean => {
    try {
      const storage = storageType === 'local' ? localStorage : sessionStorage;
      storage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item ${key} from ${storageType} storage`, error);
      return false;
    }
  }
};

// CSS prefixer utility for browser-specific styles
export function applyCSSPrefix(property: string, value: string): Record<string, string> {
  const prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
  return prefixes.reduce((styles, prefix) => {
    styles[`${prefix}${property}`] = value;
    return styles;
  }, {} as Record<string, string>);
}

// Safe JSON parse that won't throw errors
export function safeJSONParse(str: string | null, fallback: any = null): any {
  if (!str) return fallback;
  
  try {
    return JSON.parse(str);
  } catch (error) {
    console.warn('Failed to parse JSON string', error);
    return fallback;
  }
}

// Load polyfills dynamically based on feature detection
export async function loadPolyfills(): Promise<void> {
  const polyfillsToLoad = [];
  
  if (!supportsFeature('promise')) {
    polyfillsToLoad.push(import('promise-polyfill').then(module => {
      window.Promise = module.default;
      console.log('Promise polyfill loaded');
    }));
  }
  
  if (!supportsFeature('fetch')) {
    polyfillsToLoad.push(import('whatwg-fetch').then(() => {
      console.log('Fetch polyfill loaded');
    }));
  }
  
  // Wait for all polyfills to load
  if (polyfillsToLoad.length > 0) {
    try {
      await Promise.all(polyfillsToLoad);
      console.log('All required polyfills loaded successfully');
    } catch (error) {
      console.error('Failed to load some polyfills', error);
    }
  }
}

// Add safe touch event handlers for mobile compatibility
export function addSafeTouchHandlers(element: HTMLElement, handlers: {
  onTap?: (e: TouchEvent | MouseEvent) => void;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', e: TouchEvent) => void;
}): () => void {
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  const SWIPE_THRESHOLD = 50;
  const TAP_THRESHOLD = 200; // ms
  
  const touchStartHandler = (e: TouchEvent) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
  };
  
  const touchEndHandler = (e: TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;
    const elapsedTime = Date.now() - startTime;
    
    // Detect tap
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && elapsedTime < TAP_THRESHOLD) {
      if (handlers.onTap) {
        handlers.onTap(e);
      }
      return;
    }
    
    // Detect swipe
    if (handlers.onSwipe) {
      if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        const direction = deltaX > 0 ? 'right' : 'left';
        handlers.onSwipe(direction, e);
      } else if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        const direction = deltaY > 0 ? 'down' : 'up';
        handlers.onSwipe(direction, e);
      }
    }
  };
  
  const clickHandler = (e: MouseEvent) => {
    if (handlers.onTap) {
      handlers.onTap(e);
    }
  };
  
  element.addEventListener('touchstart', touchStartHandler as EventListener);
  element.addEventListener('touchend', touchEndHandler as EventListener);
  element.addEventListener('click', clickHandler as EventListener);
  
  // Return a cleanup function
  return () => {
    element.removeEventListener('touchstart', touchStartHandler as EventListener);
    element.removeEventListener('touchend', touchEndHandler as EventListener);
    element.removeEventListener('click', clickHandler as EventListener);
  };
}
