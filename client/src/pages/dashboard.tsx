import { useState } from "react";
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

  const handleDismissBanner = () => {
    setShowWelcomeBanner(false);
  };

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {showWelcomeBanner && (
          <WelcomeBanner 
            userName={user?.username || ""} 
            onDismiss={handleDismissBanner} 
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-8 space-y-6">
            <SmartTasksSection />
            <VisualTrackSection />
          </div>
          
          <div className="md:col-span-4 space-y-6">
            <PrioritiesSection />
            <AlertsSection />
            <LearnModulePreview />
          </div>
        </div>
        
        <ConnectPreview />
        <div className="mt-6">
          <CommunityPreview />
        </div>
      </main>
    </AppLayout>
  );
}
