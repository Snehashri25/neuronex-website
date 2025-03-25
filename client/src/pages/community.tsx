import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Community() {
  // Sample discussions data - this would come from an API in a real implementation
  const discussions = [
    {
      id: 1,
      category: "Productivity",
      title: "What productivity techniques work best for ADHD?",
      content: "Sharing strategies that help maintain focus and organization throughout the workday.",
      author: "Jamie",
      replies: 12,
      timeAgo: "3 hours ago",
      categoryColor: "blue"
    },
    {
      id: 2,
      category: "Design",
      title: "Color schemes for sensory-friendly interfaces",
      content: "Discussing color combinations that work well for users with sensory sensitivities.",
      author: "Alex",
      replies: 8,
      timeAgo: "Yesterday",
      categoryColor: "purple"
    },
    {
      id: 3,
      category: "Workplace",
      title: "Advocating for accommodations at work",
      content: "How to effectively communicate your needs to employers and colleagues.",
      author: "Taylor",
      replies: 15,
      timeAgo: "2 days ago",
      categoryColor: "green"
    },
    {
      id: 4,
      category: "Technology",
      title: "Best apps for executive functioning support",
      content: "Reviewing tools that help with planning, organization, and time management.",
      author: "Jordan",
      replies: 7,
      timeAgo: "3 days ago",
      categoryColor: "indigo"
    }
  ];
  
  // Sample resources data - this would come from an API in a real implementation
  const resources = [
    {
      id: 1,
      type: "Event",
      title: "Virtual Workshop: Project Management for Neurodiverse Teams",
      description: "Learn strategies for inclusive project management that accommodates diverse thinking styles.",
      date: "Oct 5, 2023",
      action: "Register Now",
      typeColor: "green"
    },
    {
      id: 2,
      type: "Guide",
      title: "Accessibility Resources for Digital Workspaces",
      description: "A curated collection of tools, plugins, and settings to make digital work environments more accessible.",
      updated: "2 weeks ago",
      action: "View Resources",
      typeColor: "yellow"
    },
    {
      id: 3,
      type: "Webinar",
      title: "Neurodiversity in Tech: Building Inclusive Teams",
      description: "Industry experts discuss strategies for creating inclusive workplaces for neurodiverse professionals.",
      date: "Oct 12, 2023",
      action: "Save Your Spot",
      typeColor: "red"
    },
    {
      id: 4,
      type: "Resource",
      title: "Communication Strategies for Mixed Neurotype Teams",
      description: "Practical advice for improving communication between neurodiverse and neurotypical team members.",
      updated: "1 month ago",
      action: "Download PDF",
      typeColor: "blue"
    }
  ];

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center">
            <span className="material-icons text-primary mr-2">people</span>
            NeuroNex Community
          </h1>
          <p className="text-gray-600">Connect with peers, mentors, and resources</p>
        </div>
        
        <div className="mb-6 flex justify-between items-center">
          <div className="space-x-2">
            <Button>
              <span className="material-icons text-sm mr-1">add</span>
              Start Discussion
            </Button>
            <Button variant="outline">
              <span className="material-icons text-sm mr-1">person_add</span>
              Invite Members
            </Button>
          </div>
          <div>
            <Button variant="outline">
              <span className="material-icons text-sm mr-1">search</span>
              Search Community
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="w-full grid grid-cols-3 max-w-md mb-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discussions" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Latest Discussions</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <span className="material-icons text-sm mr-1">filter_list</span>
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="material-icons text-sm mr-1">sort</span>
                      Sort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussions.map(discussion => (
                    <div key={discussion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`bg-${discussion.categoryColor}-100 text-${discussion.categoryColor}-800 hover:bg-${discussion.categoryColor}-100`}>
                          {discussion.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">{discussion.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{discussion.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-500">Started by {discussion.author}</span>
                        </div>
                        <span className="text-xs text-gray-500 flex items-center">
                          <span className="material-icons text-xs mr-1">forum</span>
                          {discussion.replies} replies
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">
                    Load More Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Community Resources</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <span className="material-icons text-sm mr-1">filter_list</span>
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map(resource => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm cursor-pointer transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`bg-${resource.typeColor}-100 text-${resource.typeColor}-800 hover:bg-${resource.typeColor}-100`}>
                          {resource.type}
                        </Badge>
                        {resource.date ? (
                          <span className="text-xs font-medium text-red-600">{resource.date}</span>
                        ) : (
                          <span className="text-xs text-gray-500">Updated {resource.updated}</span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-800 mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        {resource.action}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">
                    Explore All Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Community Members</CardTitle>
                  <Button variant="outline" size="sm">
                    <span className="material-icons text-sm mr-1">search</span>
                    Find Members
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex items-center hover:shadow-sm">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarFallback>{["M", "S", "A", "J", "T", "C"][i % 6]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-800">{["Michael", "Sarah", "Alex", "Jamie", "Taylor", "Casey"][i % 6]}</h4>
                        <p className="text-xs text-gray-500">{["Developer", "Designer", "Project Manager", "UX Researcher", "Content Creator", "Community Manager"][i % 6]}</p>
                        <div className="mt-1 flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <span className="material-icons text-xs">mail</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <span className="material-icons text-xs">person_add</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">
                    View All Members
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </AppLayout>
  );
}
