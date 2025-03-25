import AppLayout from "@/components/layout/app-layout";
import TaskManagement from "@/components/tasks/task-management";

export default function Tasks() {
  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600">Manage and organize all your tasks with AI-powered assistance</p>
        </div>
        
        <TaskManagement />
      </main>
    </AppLayout>
  );
}
