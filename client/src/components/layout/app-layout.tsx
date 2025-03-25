import { useState } from "react";
import Sidebar from "./sidebar";
import TopNavBar from "./top-navbar";
import AccessibilitySettings from "@/components/accessibility/accessibility-settings";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const toggleAccessibilityPanel = () => {
    setShowAccessibilityPanel(!showAccessibilityPanel);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        onAccessibilityOpen={toggleAccessibilityPanel}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavBar 
          onMenuToggle={toggleSidebar} 
          onSettingsOpen={toggleAccessibilityPanel}
        />
        
        {children}
      </div>
      
      <AccessibilitySettings 
        isOpen={showAccessibilityPanel} 
        onClose={() => setShowAccessibilityPanel(false)} 
      />
    </div>
  );
}
