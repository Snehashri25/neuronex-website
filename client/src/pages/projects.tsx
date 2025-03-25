import AppLayout from "@/components/layout/app-layout";
import VisualTrackSection from "@/components/dashboard/visual-track-section";

export default function Projects() {
  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800">Projects</h1>
          <p className="text-gray-600">Manage and track all your projects</p>
        </div>
        
        <VisualTrackSection />
      </main>
    </AppLayout>
  );
}
