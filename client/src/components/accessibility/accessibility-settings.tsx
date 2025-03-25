import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AccessibilitySettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AccessibilitySettings({ isOpen = false, onClose }: AccessibilitySettingsProps) {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [theme, setTheme] = useState<string>("default");
  const [fontSize, setFontSize] = useState<number>(100);
  const [lineSpacing, setLineSpacing] = useState<number>(140);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [density, setDensity] = useState<string>("comfortable");
  const [visualNotifications, setVisualNotifications] = useState<boolean>(true);
  const [audioNotifications, setAudioNotifications] = useState<boolean>(false);
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    // First animate out
    setIsVisible(false);
    
    // Then after animation completes, call onClose
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 300);
    
    return () => clearTimeout(timer);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSavePreferences = () => {
    // In a real implementation, this would save user preferences to a database
    // Apply the settings to the document
    document.body.setAttribute("data-theme", theme);
    
    if (reduceMotion) {
      document.body.setAttribute("data-reduced-motion", "true");
    } else {
      document.body.removeAttribute("data-reduced-motion");
    }
    
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.body.style.lineHeight = `${lineSpacing}%`;
    
    if (dyslexicFont) {
      document.body.classList.add("dyslexic-font");
    } else {
      document.body.classList.remove("dyslexic-font");
    }
    
    document.body.setAttribute("data-density", density);
    
    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'flex' : 'hidden'}`}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={handleOverlayClick}
      ></div>
      <div 
        className={`absolute top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-heading font-bold">Accessibility Settings</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <span className="material-icons">close</span>
          </Button>
        </div>
        
        <div className="p-4 overflow-y-auto h-full pb-32">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Theme Preferences</h3>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
              <div className="flex items-center">
                <RadioGroupItem value="default" id="theme-default-panel" />
                <Label htmlFor="theme-default-panel" className="ml-2">Default</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="dark" id="theme-dark-panel" />
                <Label htmlFor="theme-dark-panel" className="ml-2">Dark Mode</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="high-contrast" id="theme-high-contrast-panel" />
                <Label htmlFor="theme-high-contrast-panel" className="ml-2">High Contrast</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="reduced-blue" id="theme-reduced-blue-panel" />
                <Label htmlFor="theme-reduced-blue-panel" className="ml-2">Reduced Blue Light</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="focus" id="theme-focus-panel" />
                <Label htmlFor="theme-focus-panel" className="ml-2">Focus Mode</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Text Preferences</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="font-size-panel">Font Size</Label>
                  <span className="text-sm text-gray-700">{fontSize}%</span>
                </div>
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-2">text_fields</span>
                  <Slider
                    id="font-size-panel"
                    min={80}
                    max={150}
                    step={5}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="line-spacing-panel">Line Spacing</Label>
                  <span className="text-sm text-gray-700">{lineSpacing}%</span>
                </div>
                <div className="flex items-center">
                  <span className="material-icons text-gray-400 mr-2">format_line_spacing</span>
                  <Slider
                    id="line-spacing-panel"
                    min={100}
                    max={200}
                    step={10}
                    value={[lineSpacing]}
                    onValueChange={(value) => setLineSpacing(value[0])}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="dyslexic-font-panel">Dyslexia-Friendly Font</Label>
                <Switch
                  id="dyslexic-font-panel"
                  checked={dyslexicFont}
                  onCheckedChange={setDyslexicFont}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Motion and Animation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion-panel">Reduce Motion</Label>
                <Switch
                  id="reduce-motion-panel"
                  checked={reduceMotion}
                  onCheckedChange={setReduceMotion}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="visual-notifications-panel">Visual Notifications</Label>
                <Switch
                  id="visual-notifications-panel"
                  checked={visualNotifications}
                  onCheckedChange={setVisualNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="audio-notifications-panel">Audio Notifications</Label>
                <Switch
                  id="audio-notifications-panel"
                  checked={audioNotifications}
                  onCheckedChange={setAudioNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="haptic-feedback-panel">Haptic Feedback</Label>
                <Switch
                  id="haptic-feedback-panel"
                  checked={hapticFeedback}
                  onCheckedChange={setHapticFeedback}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Interface Density</h3>
            <RadioGroup value={density} onValueChange={setDensity} className="space-y-3">
              <div className="flex items-center">
                <RadioGroupItem value="compact" id="density-compact-panel" />
                <Label htmlFor="density-compact-panel" className="ml-2">Compact</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="comfortable" id="density-comfortable-panel" />
                <Label htmlFor="density-comfortable-panel" className="ml-2">Comfortable</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="spacious" id="density-spacious-panel" />
                <Label htmlFor="density-spacious-panel" className="ml-2">Spacious</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="pt-4 pb-6 border-t border-gray-200">
            <Button 
              className="w-full"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
