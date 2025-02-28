
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return isMobile;
}

// Safari detection hook
export function useIsSafari() {
  const [isSafari, setIsSafari] = useState(false);
  
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSafariBrowser = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    setIsSafari(isSafariBrowser);
  }, []);
  
  return isSafari;
}

// iOS detection hook
export function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isIOSDevice);
  }, []);
  
  return isIOS;
}
