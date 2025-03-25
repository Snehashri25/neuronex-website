import { Button } from "@/components/ui/button";

interface WelcomeBannerProps {
  userName: string;
  onDismiss: () => void;
}

export default function WelcomeBanner({ userName, onDismiss }: WelcomeBannerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 p-4 flex items-center justify-between">
      <div className="flex-1">
        <h2 className="text-lg font-heading font-bold text-gray-800">
          Welcome back, {userName}!
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          You have <span className="font-medium text-primary">5 tasks</span> due today. Let's get started.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button variant="link" className="text-primary" onClick={onDismiss}>
          View All Tasks
        </Button>
      </div>
    </div>
  );
}
