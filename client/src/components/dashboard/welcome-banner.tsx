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
          You have <span className="font-medium text-primary">3 sensory-friendly tasks</span> scheduled today. Your focus environment is ready.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Today's executive functioning tip: Break tasks into smaller, achievable steps to reduce overwhelm.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Button variant="link" className="text-primary" onClick={onDismiss}>
          View Tasks
        </Button>
      </div>
    </div>
  );
}
