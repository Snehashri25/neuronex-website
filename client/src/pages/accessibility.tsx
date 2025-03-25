import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import AccessibilitySettings from "@/components/accessibility/accessibility-settings";

export default function Accessibility() {
  const [theme, setTheme] = useState<string>("default");
  const [fontSize, setFontSize] = useState<number>(100);
  const [lineSpacing, setLineSpacing] = useState<number>(140);
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [density, setDensity] = useState<string>("comfortable");
  const [visualNotifications, setVisualNotifications] = useState<boolean>(true);
  const [audioNotifications, setAudioNotifications] = useState<boolean>(true);
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(false);
  
  // Apply theme and accessibility settings to the document
  useEffect(() => {
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
    
    // Clean up when component unmounts
    return () => {
      document.body.removeAttribute("data-theme");
      document.body.removeAttribute("data-reduced-motion");
      document.documentElement.style.fontSize = "";
      document.body.style.lineHeight = "";
      document.body.classList.remove("dyslexic-font");
      document.body.removeAttribute("data-density");
    };
  }, [theme, fontSize, lineSpacing, reduceMotion, dyslexicFont, density]);
  
  const handleSavePreferences = () => {
    // In a real implementation, this would save user preferences to a database
    // For now, we'll just show a toast message
    console.log("Preferences saved:", {
      theme,
      fontSize,
      lineSpacing,
      reduceMotion,
      dyslexicFont,
      density,
      visualNotifications,
      audioNotifications,
      hapticFeedback
    });
  };

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center">
            <span className="material-icons text-primary mr-2">accessibility</span>
            Accessibility Settings
          </h1>
          <p className="text-gray-600">Customize your experience to suit your needs</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
                  <div className="flex items-center">
                    <RadioGroupItem value="default" id="theme-default" />
                    <Label htmlFor="theme-default" className="ml-2">Default</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark" className="ml-2">Dark Mode</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="high-contrast" id="theme-high-contrast" />
                    <Label htmlFor="theme-high-contrast" className="ml-2">High Contrast</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="reduced-blue" id="theme-reduced-blue" />
                    <Label htmlFor="theme-reduced-blue" className="ml-2">Reduced Blue Light</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="focus" id="theme-focus" />
                    <Label htmlFor="theme-focus" className="ml-2">Focus Mode</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Text Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <span className="text-sm text-gray-500">{fontSize}%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2">text_fields</span>
                    <Slider
                      id="font-size"
                      min={80}
                      max={150}
                      step={5}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="line-spacing">Line Spacing</Label>
                    <span className="text-sm text-gray-500">{lineSpacing}%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-gray-400 mr-2">format_line_spacing</span>
                    <Slider
                      id="line-spacing"
                      min={100}
                      max={200}
                      step={10}
                      value={[lineSpacing]}
                      onValueChange={(value) => setLineSpacing(value[0])}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="dyslexic-font">Dyslexia-Friendly Font</Label>
                  <Switch
                    id="dyslexic-font"
                    checked={dyslexicFont}
                    onCheckedChange={setDyslexicFont}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Motion and Animation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-motion">Reduce Motion</Label>
                  <Switch
                    id="reduce-motion"
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                  />
                </div>
                
                <div className="pt-4 text-sm text-gray-600">
                  <p>Reducing motion minimizes animations and transitions throughout the interface, which can help with motion sensitivity and reduce distractions.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visual-notifications">Visual Notifications</Label>
                  <Switch
                    id="visual-notifications"
                    checked={visualNotifications}
                    onCheckedChange={setVisualNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="audio-notifications">Audio Notifications</Label>
                  <Switch
                    id="audio-notifications"
                    checked={audioNotifications}
                    onCheckedChange={setAudioNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="haptic-feedback">Haptic Feedback</Label>
                  <Switch
                    id="haptic-feedback"
                    checked={hapticFeedback}
                    onCheckedChange={setHapticFeedback}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interface Density</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={density} onValueChange={setDensity} className="space-y-3">
                  <div className="flex items-center">
                    <RadioGroupItem value="compact" id="density-compact" />
                    <Label htmlFor="density-compact" className="ml-2">Compact</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="comfortable" id="density-comfortable" />
                    <Label htmlFor="density-comfortable" className="ml-2">Comfortable</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem value="spacious" id="density-spacious" />
                    <Label htmlFor="density-spacious" className="ml-2">Spacious</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button onClick={handleSavePreferences} className="w-full">
                Save Preferences
              </Button>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Did you know?</h3>
              <p className="text-sm text-blue-700">
                You can quickly access accessibility settings at any time by clicking the accessibility icon in the sidebar.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* This component is used to show the accessibility panel that can be opened from the sidebar */}
      <AccessibilitySettings />
    </AppLayout>
  );
}
