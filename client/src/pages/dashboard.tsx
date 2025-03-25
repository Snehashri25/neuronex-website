import React, { useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import WelcomeBanner from "@/components/dashboard/welcome-banner";
import SmartTasksSection from "@/components/dashboard/smart-tasks-section";
import VisualTrackSection from "@/components/dashboard/visual-track-section";
import PrioritiesSection from "@/components/dashboard/priorities-section";
import AlertsSection from "@/components/dashboard/alerts-section";
import LearnModulePreview from "@/components/dashboard/learn-module-preview";
import ConnectPreview from "@/components/dashboard/connect-preview";
import CommunityPreview from "@/components/dashboard/community-preview";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleDismissBanner = () => {
    setShowWelcomeBanner(false);
  };

  // Main dashboard menu items
  const dashboardItems = [
    { id: "tasks", icon: "psychology", label: "Tasks", color: "bg-blue-100 text-blue-600", component: SmartTasksSection },
    { id: "projects", icon: "analytics", label: "Projects", color: "bg-purple-100 text-purple-600", component: VisualTrackSection },
    { id: "priorities", icon: "star", label: "Priorities", color: "bg-amber-100 text-amber-600", component: PrioritiesSection },
    { id: "learn", icon: "school", label: "Learn", color: "bg-green-100 text-green-600", component: LearnModulePreview },
    { id: "connect", icon: "forum", label: "Connect", color: "bg-indigo-100 text-indigo-600", component: ConnectPreview },
    { id: "community", icon: "people", label: "Community", color: "bg-pink-100 text-pink-600", component: CommunityPreview },
    { id: "alerts", icon: "notifications", label: "Alerts", color: "bg-red-100 text-red-600", component: AlertsSection }
  ];

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {showWelcomeBanner && (
          <WelcomeBanner 
            userName={user?.username || ""} 
            onDismiss={handleDismissBanner} 
          />
        )}
        
        {/* Icon-based simplified menu grid */}
        {!selectedSection && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
            {dashboardItems.map(item => (
              <div 
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`${item.color} p-5 rounded-xl flex flex-col items-center justify-center cursor-pointer h-32 shadow-sm hover:shadow-md transition-all border border-gray-100`}
              >
                <span className="material-icons text-3xl mb-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                <span className="text-xs mt-1 opacity-75">Click to view</span>
              </div>
            ))}
          </div>
        )}
        
        {/* Show selected section when clicked */}
        {selectedSection && (
          <div className="mt-4">
            <button 
              className="flex items-center text-sm text-gray-600 mb-4 hover:text-primary"
              onClick={() => setSelectedSection(null)}
            >
              <span className="material-icons text-sm mr-1">arrow_back</span>
              Back to dashboard
            </button>
            
            <div className="transition-all duration-300 ease-in-out">
              {dashboardItems.find(item => item.id === selectedSection)?.component && 
                React.createElement(dashboardItems.find(item => item.id === selectedSection)?.component as React.FC)}
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
