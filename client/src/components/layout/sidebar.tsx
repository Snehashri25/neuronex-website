import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onAccessibilityOpen: () => void;
}

export default function Sidebar({ collapsed, onToggle, onAccessibilityOpen }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Auto collapse on mobile
        onToggle();
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onToggle]);
  
  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} hidden md:block`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">N</span>
          </div>
          {!collapsed && <h1 className="font-heading font-bold text-xl text-gray-800">NeuroNex</h1>}
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="material-icons">{collapsed ? 'chevron_right' : 'chevron_left'}</span>
        </button>
      </div>
      
      <nav className="p-4">
        <div className="mb-6">
          <h2 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'sr-only' : ''}`}>
            Main
          </h2>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/") ? "text-primary" : "text-gray-500"}`}>
                  dashboard
                </span>
                {!collapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/tasks" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/tasks") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/tasks") ? "text-primary" : "text-gray-500"}`}>
                  check_circle
                </span>
                {!collapsed && <span className="ml-3">Tasks</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/projects") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/projects") ? "text-primary" : "text-gray-500"}`}>
                  folder
                </span>
                {!collapsed && <span className="ml-3">Projects</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/calendar" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/calendar") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/calendar") ? "text-primary" : "text-gray-500"}`}>
                  calendar_today
                </span>
                {!collapsed && <span className="ml-3">Calendar</span>}
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'sr-only' : ''}`}>
            NeuroNex Features
          </h2>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/learn" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/learn") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/learn") ? "text-secondary" : "text-secondary-500"}`}>
                  school
                </span>
                {!collapsed && <span className="ml-3">NeuroNex Learn</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/connect" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/connect") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/connect") ? "text-secondary" : "text-secondary-500"}`}>
                  forum
                </span>
                {!collapsed && <span className="ml-3">NeuroNex Connect</span>}
              </Link>
            </li>
            <li>
              <Link 
                href="/community" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/community") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/community") ? "text-secondary" : "text-secondary-500"}`}>
                  people
                </span>
                {!collapsed && <span className="ml-3">NeuroNex Community</span>}
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ${collapsed ? 'sr-only' : ''}`}>
            Settings
          </h2>
          <ul className="space-y-1">
            <li>
              <Link 
                href="/profile" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isActive("/profile") 
                    ? "bg-primary-50 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className={`material-icons ${isActive("/profile") ? "text-primary" : "text-gray-500"}`}>
                  person
                </span>
                {!collapsed && <span className="ml-3">Profile</span>}
              </Link>
            </li>
            <li>
              <button 
                onClick={onAccessibilityOpen}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
              >
                <span className="material-icons text-gray-500">accessibility</span>
                {!collapsed && <span className="ml-3">Accessibility</span>}
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      {!collapsed && (
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="/avatar.jpg" alt="User avatar" />
              <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.username || "User"}</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
