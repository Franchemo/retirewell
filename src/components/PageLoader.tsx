
import React from 'react';

interface PageLoaderProps {
  message?: string;
  isFullScreen?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ 
  message = "Loading your content...",
  isFullScreen = true 
}) => {
  return (
    <div className={`${isFullScreen ? 'min-h-screen w-full' : 'h-full w-full'} flex items-center justify-center bg-background safari-height-fix`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
        <p className="text-foreground/70 animate-pulse">{message}</p>
      </div>
    </div>
  );
};

// Fallback loader that doesn't rely on complex CSS animations
// Will be used as a fallback for browsers with limited CSS support
export const SimpleFallbackLoader: React.FC<{ message?: string }> = ({ 
  message = "Loading..." 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
