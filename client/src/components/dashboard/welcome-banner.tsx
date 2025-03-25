import { Button } from "@/components/ui/button";

interface WelcomeBannerProps {
  userName: string;
  onDismiss: () => void;
}

export default function WelcomeBanner({ userName, onDismiss }: WelcomeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl shadow-sm mb-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-center">
            <span className="material-icons text-blue-500 text-2xl mr-3">emoji_people</span>
            <h2 className="text-xl font-bold text-gray-800">
              Welcome back, {userName}!
            </h2>
          </div>
          
          <div className="flex items-center mt-3">
            <span className="material-icons text-green-500 mr-2">check_circle</span>
            <p className="text-md text-gray-700">
              Focus environment is ready
            </p>
          </div>
          
          <div className="flex items-start mt-3 bg-white p-3 rounded-lg border border-blue-100">
            <span className="material-icons text-amber-500 mr-2 mt-0.5">tips_and_updates</span>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Today's executive functioning tip:
              </p>
              <p className="text-sm text-gray-600">
                Break tasks into smaller, achievable steps to reduce overwhelm.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex flex-col space-y-2">
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center w-full"
            onClick={onDismiss}
          >
            <span className="material-icons mr-2">task_alt</span>
            View Today's Tasks
          </Button>
          <div className="text-center text-sm text-gray-500">3 tasks scheduled</div>
        </div>
      </div>
    </div>
  );
}
