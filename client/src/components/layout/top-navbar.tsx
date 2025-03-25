import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

interface TopNavBarProps {
  onMenuToggle: () => void;
  onSettingsOpen: () => void;
}

export default function TopNavBar({ onMenuToggle, onSettingsOpen }: TopNavBarProps) {
  const { user, logoutMutation } = useAuth();
  const [_, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would perform a search
    console.log("Searching for:", searchQuery);
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button 
            className="text-gray-500 focus:outline-none hover:text-gray-700 md:hidden" 
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <span className="material-icons">menu</span>
          </button>
          
          <form onSubmit={handleSearch} className="relative ml-4 md:ml-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-icons text-gray-400">search</span>
            </span>
            <Input
              type="text"
              className="py-2 pl-10 pr-4 w-full md:w-64 lg:w-96 rounded-lg text-sm"
              placeholder="Search tasks, projects, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change theme">
                <span className="material-icons text-gray-500">palette</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => document.body.setAttribute("data-theme", "default")}>
                Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => document.body.setAttribute("data-theme", "dark")}>
                Dark Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => document.body.setAttribute("data-theme", "high-contrast")}>
                High Contrast
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="View notifications" className="relative">
                <span className="material-icons text-gray-500">notifications</span>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-72 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start py-2">
                  <div className="flex w-full">
                    <span className="material-icons text-primary mr-2 flex-shrink-0">notifications</span>
                    <div>
                      <p className="text-sm">Task deadline approaching: "Implement notification system" due today</p>
                      <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-2">
                  <div className="flex w-full">
                    <span className="material-icons text-green-500 mr-2 flex-shrink-0">chat</span>
                    <div>
                      <p className="text-sm">New message from Jordan: "Can we discuss the color palette?"</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-primary">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Help */}
          <Button variant="ghost" size="icon" aria-label="Get help">
            <span className="material-icons text-gray-500">help_outline</span>
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" alt="User avatar" />
                  <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation("/profile")}>
                <span className="material-icons text-sm mr-2">person</span>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsOpen}>
                <span className="material-icons text-sm mr-2">accessibility</span>
                Accessibility
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("/settings")}>
                <span className="material-icons text-sm mr-2">settings</span>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <span className="material-icons text-sm mr-2">logout</span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
