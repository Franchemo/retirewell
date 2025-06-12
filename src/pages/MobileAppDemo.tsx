import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MobileAppDemo = () => {
  const [showMockup, setShowMockup] = useState(false);
  
  const handleShowMockup = () => {
    window.location.href = "/?mockup=true";
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-5 h-5 text-foreground/70" />
          </Link>
          <h1 className="text-2xl font-semibold text-gradient">Mobile App Demo</h1>
        </div>
        
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-medium mb-4">iPhone 14 Pro Mockup</h2>
          <p className="text-muted-foreground mb-6">
            View the AugMend Health app as it would appear on an iPhone 14 Pro. This mockup demonstrates the mobile user interface and experience.
          </p>
          
          <Button 
            onClick={handleShowMockup}
            className="button-primary"
          >
            View iPhone 14 Pro Mockup
          </Button>
          
          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <h3 className="font-medium mb-2">About This Demo</h3>
            <p className="text-sm text-muted-foreground">
              This mockup showcases how the AugMend Health application would look and feel on an iPhone 14 Pro. It includes the core navigation and UI elements optimized for mobile viewing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDemo;