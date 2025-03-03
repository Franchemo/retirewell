
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check 
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away
    handleResize();
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// Enhanced Safari detection hook with caching
export function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false);
  
  useEffect(() => {
    try {
      // Use a cached value if available to minimize UA string parsing
      const cachedIsSafari = sessionStorage.getItem('is_safari');
      
      if (cachedIsSafari !== null) {
        setIsSafari(cachedIsSafari === 'true');
      } else {
        const ua = navigator.userAgent.toLowerCase();
        const detected = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
        setIsSafari(detected);
        
        // Cache the result
        try {
          sessionStorage.setItem('is_safari', detected.toString());
        } catch (e) {
          console.warn('SessionStorage not available for caching browser detection');
        }
      }
    } catch (error) {
      console.error('Error in Safari detection:', error);
      // Fallback detection without using storage
      const ua = navigator.userAgent.toLowerCase();
      setIsSafari(ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1);
    }
  }, []);
  
  return isSafari;
}

// Enhanced iOS detection hook
export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    try {
      const ua = navigator.userAgent.toLowerCase();
      const isIOSDevice = /iphone|ipad|ipod/.test(ua) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIOS(isIOSDevice);
    } catch (error) {
      console.error('Error in iOS detection:', error);
      setIsIOS(false);
    }
  }, []);
  
  return isIOS;
}

// Network status hook for offline detection
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}

// Storage availability hook
export function useStorageAvailability() {
  const [availability, setAvailability] = useState({
    localStorage: false,
    sessionStorage: false
  });
  
  useEffect(() => {
    function checkStorage(type: 'localStorage' | 'sessionStorage') {
      try {
        // Fixed: properly access storage through window object
        const storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return false;
      }
    }
    
    setAvailability({
      localStorage: checkStorage('localStorage'),
      sessionStorage: checkStorage('sessionStorage')
    });
  }, []);
  
  return availability;
}
