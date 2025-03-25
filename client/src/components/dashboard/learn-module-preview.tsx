import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Module {
  id: number;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  progress?: number;
  category: string;
  icon: string;
  featured?: boolean;
}

export default function LearnModulePreview() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "ADHD-Friendly Project Management",
      description: "Learn project management techniques designed for activation, focus, and time perception challenges.",
      lessons: 5,
      duration: "45 min",
      progress: 60,
      category: "management",
      icon: "schedule",
      featured: true
    },
    {
      id: 2,
      title: "Sensory-Friendly Work Environment",
      description: "Create optimal work environments that accommodate sensory processing differences and reduce overload.",
      lessons: 3,
      duration: "30 min",
      progress: 33,
      category: "productivity",
      icon: "schedule"
    },
    {
      id: 3,
      title: "Visual Thinking & Organization",
      description: "Leverage visual thinking strengths for task organization and information processing.",
      lessons: 4,
      duration: "35 min",
      category: "organization",
      icon: "pie_chart"
    },
    {
      id: 4,
      title: "Executive Functioning Support Systems",
      description: "Build external systems to support planning, working memory, and task initiation challenges.",
      lessons: 6,
      duration: "50 min",
      category: "cognitive",
      icon: "psychology"
    }
  ]);

  const viewAllModules = () => {
    // In a real implementation, this would navigate to the learning page
    console.log("View all learning modules");
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      management: "bg-primary-100 text-primary-700",
      productivity: "bg-primary-100 text-primary-700",
      organization: "bg-amber-100 text-amber-700",
      cognitive: "bg-purple-100 text-purple-700"
    };
    
    return colorMap[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <span className="material-icons text-secondary mr-2">school</span>
            NeuroNex Learn
          </CardTitle>
          <Button 
            variant="link" 
            className="text-primary"
            onClick={viewAllModules}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {modules.filter(m => m.featured).map(module => (
          <div key={module.id} className="bg-secondary-50 rounded-lg border border-secondary-200 p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-secondary-100 text-secondary-700">Recommended</Badge>
              <span className="text-xs text-gray-500">{module.lessons} lessons · {module.duration}</span>
            </div>
            <h4 className="font-medium text-gray-800 mb-1">{module.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            {module.progress !== undefined && (
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-1.5" />
              </div>
            )}
            <Button className="w-full bg-secondary hover:bg-secondary/80 text-white text-sm">
              {module.progress !== undefined && module.progress > 0 ? "Continue Learning" : "Start Learning"}
            </Button>
          </div>
        ))}
        
        <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Modules</h4>
        <ul className="space-y-3">
          {modules.filter(m => !m.featured).map(module => (
            <li 
              key={module.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 ${getCategoryColor(module.category)} rounded-lg flex items-center justify-center`}>
                  <span className="material-icons text-sm">{module.icon}</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{module.title}</span>
              </div>
              <span className="text-xs text-gray-500">{module.lessons} lessons</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
