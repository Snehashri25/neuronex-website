import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Discussion {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  content: string;
  author: string;
  replies: number;
  timeAgo: string;
}

interface Resource {
  id: number;
  type: string;
  typeColor: string;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  action: string;
}

export default function CommunityPreview() {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      category: "ADHD Strategies",
      categoryColor: "blue",
      title: "Body-doubling techniques for remote work focus",
      content: "What virtual body-doubling strategies have helped you maintain focus during remote work sessions?",
      author: "Jamie",
      replies: 12,
      timeAgo: "3 hours ago"
    },
    {
      id: 2,
      category: "Sensory Design",
      categoryColor: "purple",
      title: "UI customization for sensory processing differences",
      content: "Sharing interface adjustments that reduce visual overwhelm while maintaining usability.",
      author: "Alex",
      replies: 8,
      timeAgo: "Yesterday"
    },
    {
      id: 3,
      category: "Autism & Work",
      categoryColor: "green",
      title: "Managing communication preferences in collaborative projects",
      content: "How to communicate your communication style needs to teammates without masking.",
      author: "Taylor",
      replies: 15,
      timeAgo: "2 days ago"
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      type: "Event",
      typeColor: "green",
      title: "Workshop: Rejection Sensitive Dysphoria Management",
      description: "Practical strategies for managing RSD in professional settings with cognitive behavioral techniques.",
      date: "Oct 5, 2023",
      action: "Register Now"
    },
    {
      id: 2,
      type: "Guide",
      typeColor: "yellow",
      title: "Accommodations Repository for Neurodivergent Workers",
      description: "A comprehensive collection of workplace accommodations with implementation guidance for various neurodivergent needs.",
      updated: "2 weeks ago",
      action: "View Resources"
    },
    {
      id: 3,
      type: "Webinar",
      typeColor: "blue",
      title: "Disclosure Strategies: Discussing Neurodivergence at Work",
      description: "How to navigate disclosure conversations with managers and teammates for better accommodation support.",
      date: "Oct 12, 2023",
      action: "Save Your Spot"
    }
  ]);

  const getCategoryColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      green: "bg-green-100 text-green-800",
      indigo: "bg-indigo-100 text-indigo-800",
      red: "bg-red-100 text-red-800",
      yellow: "bg-yellow-100 text-yellow-800"
    };
    
    return colorMap[color] || "bg-gray-100 text-gray-800";
  };

  const handleJoinDiscussion = () => {
    // In a real implementation, this would navigate to the community page
    console.log("Join discussion");
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className="material-icons text-primary mr-2">people</span>
              NeuroNex Community
            </CardTitle>
            <p className="mt-1 text-sm text-gray-600">Connect with peers, mentors, and resources</p>
          </div>
          <Button onClick={handleJoinDiscussion}>
            Join Discussion
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest Discussions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Latest Discussions</h4>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div 
                  key={discussion.id}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(discussion.categoryColor)}>
                      {discussion.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-1">{discussion.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{discussion.content}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center mr-3">
                      <span className="material-icons text-xs mr-1">forum</span>
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center">
                      <span className="material-icons text-xs mr-1">person</span>
                      Started by {discussion.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <Button variant="link" className="text-primary font-medium">
                Browse All Discussions
              </Button>
            </div>
          </div>
          
          {/* Resources and Events */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Community Resources</h4>
            <div className="space-y-4">
              {resources.map(resource => (
                <div 
                  key={resource.id}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(resource.typeColor)}>
                      {resource.type}
                    </Badge>
                    {resource.date ? (
                      <span className="text-xs font-medium text-red-600">{resource.date}</span>
                    ) : (
                      <span className="text-xs text-gray-500">Updated {resource.updated}</span>
                    )}
                  </div>
                  <h5 className="font-medium text-gray-800 mb-1">{resource.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <Button variant="link" className="p-0 h-auto text-primary">
                    {resource.action}
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <Button variant="link" className="text-primary font-medium">
                Explore All Resources
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
