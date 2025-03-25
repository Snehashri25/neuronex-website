import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Project {
  id: number;
  name: string;
  progress: number;
  status: "On Track" | "At Risk" | "Delayed";
  statusColor: "green" | "yellow" | "red";
  dueDate: string;
  totalTasks: number;
  completedTasks: number;
  members: {
    name: string;
    avatar?: string;
    initials?: string;
  }[];
}

export default function VisualTrackSection() {
  // Sample projects data - this would come from an API in a real implementation
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Website Redesign",
      progress: 65,
      status: "On Track",
      statusColor: "green",
      dueDate: "Oct 15, 2023",
      totalTasks: 20,
      completedTasks: 12,
      members: [
        { name: "Alexandra", avatar: "/avatars/alexandra.jpg" },
        { name: "Michael", avatar: "/avatars/michael.jpg" },
        { name: "Sarah", avatar: "/avatars/sarah.jpg" }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 40,
      status: "At Risk",
      statusColor: "yellow",
      dueDate: "Sep 30, 2023",
      totalTasks: 18,
      completedTasks: 8,
      members: [
        { name: "Alexandra", avatar: "/avatars/alexandra.jpg" },
        { name: "Jordan", avatar: "/avatars/jordan.jpg" }
      ]
    },
    {
      id: 3,
      name: "User Research Study",
      progress: 90,
      status: "On Track",
      statusColor: "green",
      dueDate: "Oct 05, 2023",
      totalTasks: 15,
      completedTasks: 14,
      members: [
        { name: "Sarah", avatar: "/avatars/sarah.jpg" },
        { name: "Taylor", initials: "TL" }
      ]
    },
    {
      id: 4,
      name: "Content Migration",
      progress: 15,
      status: "Delayed",
      statusColor: "red",
      dueDate: "Sep 25, 2023",
      totalTasks: 12,
      completedTasks: 2,
      members: [
        { name: "Michael", avatar: "/avatars/michael.jpg" },
        { name: "Casey", initials: "CY" }
      ]
    }
  ]);

  const getStatusColor = (status: Project["statusColor"]) => {
    const colorMap: Record<Project["statusColor"], string> = {
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      red: "bg-red-100 text-red-800"
    };
    
    return colorMap[status];
  };

  const handleProjectSelect = (id: number) => {
    // In a real implementation, this would navigate to a project detail page
    console.log(`Selected project ${id}`);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className="material-icons text-primary mr-2">analytics</span>
              NeuroNex VisualTrack
            </CardTitle>
            <p className="text-sm text-gray-600">Visual project tracking and progress visualization</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <span className="material-icons">more_vert</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{project.name}</h4>
                <Badge className={getStatusColor(project.statusColor)}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-primary font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2.5" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <span className="text-xs text-gray-500">Due Date</span>
                  <p className={`text-sm font-medium ${project.statusColor === 'red' ? 'text-red-600' : 'text-gray-800'}`}>
                    {project.dueDate}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Tasks</span>
                  <p className="text-sm font-medium">{project.completedTasks}/{project.totalTasks} completed</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.members.map((member, index) => (
                    <Avatar key={index} className="h-6 w-6 border border-white">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : null}
                      <AvatarFallback>{member.initials || member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Button 
                  variant="link" 
                  className="text-primary font-medium"
                  onClick={() => handleProjectSelect(project.id)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="link" className="text-primary font-medium">
            <span className="material-icons text-sm mr-1">add</span>
            Create New Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
