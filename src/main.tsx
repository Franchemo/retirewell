
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadPolyfills, supportsFeature } from './utils/browser-compatibility';

// Browser capability detection before rendering
const startApp = async () => {
  try {
    // Check for basic requirements
    if (!document.getElementById('root')) {
      console.error('Root element not found');
      document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Unable to load application</h1><p>The application could not initialize properly. Please try a different browser.</p></div>';
      return;
    }

    // Load polyfills for older browsers if needed
    if (!supportsFeature('promise') || !supportsFeature('fetch')) {
      console.log('Loading polyfills for older browsers...');
      await loadPolyfills();
    }

    // Add specific error handlers
    window.addEventListener('error', (event) => {
      console.error('Global error caught:', event.message);
      // Avoid logging certain types of errors that we know are not critical
      if (event.message.includes('ResizeObserver') || 
          event.message.includes('Non-Error promise rejection')) {
        event.preventDefault();
      }
    });

    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });

    // Render the app when everything is ready
    const rootElement = document.getElementById('root');
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    }
  } catch (error) {
    console.error('Fatal error during application startup:', error);
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h1>Application Error</h1><p>We encountered a problem starting the application. Please try again or use a different browser.</p></div>';
  }
};

startApp();
