import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Learn() {
  // Sample module data - this would come from an API in a real implementation
  const modules = [
    {
      id: 1,
      title: "Project Management Essentials",
      description: "Learn the fundamentals of effective project management with techniques tailored for neurodivergent individuals.",
      lessons: 5,
      duration: "45 min",
      progress: 60,
      category: "management",
      featured: true
    },
    {
      id: 2,
      title: "Time Management Strategies",
      description: "Practical techniques for managing time, deadlines, and prioritization.",
      lessons: 3,
      duration: "30 min",
      progress: 33,
      category: "productivity",
      featured: false
    },
    {
      id: 3,
      title: "Visual Task Organization",
      description: "Methods for visually organizing tasks and information for better processing.",
      lessons: 4,
      duration: "35 min",
      progress: 0,
      category: "organization",
      featured: false
    },
    {
      id: 4,
      title: "Executive Functioning Skills",
      description: "Techniques to improve planning, working memory, and cognitive flexibility.",
      lessons: 6,
      duration: "50 min",
      progress: 0,
      category: "cognitive",
      featured: false
    }
  ];

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center">
            <span className="material-icons text-secondary mr-2">school</span>
            NeuroNex Learn
          </h1>
          <p className="text-gray-600">Personalized learning modules tailored to your needs</p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Modules</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div>
              <Button variant="outline" className="mr-2">
                <span className="material-icons text-sm mr-1">filter_list</span>
                Filter
              </Button>
              <Button variant="outline">
                <span className="material-icons text-sm mr-1">sort</span>
                Sort
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map(module => (
                <Card key={module.id} className={module.featured ? "border-secondary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between mb-1">
                      {module.featured ? (
                        <Badge className="bg-secondary">Recommended</Badge>
                      ) : (
                        <Badge variant="outline">{module.category}</Badge>
                      )}
                      <span className="text-xs text-gray-500">{module.lessons} lessons · {module.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {module.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                    <Button className="w-full" variant={module.featured ? "default" : "outline"}>
                      {module.progress > 0 ? "Continue Learning" : "Start Learning"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.filter(m => m.progress > 0 && m.progress < 100).map(module => (
                <Card key={module.id} className={module.featured ? "border-secondary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between mb-1">
                      {module.featured ? (
                        <Badge className="bg-secondary">Recommended</Badge>
                      ) : (
                        <Badge variant="outline">{module.category}</Badge>
                      )}
                      <span className="text-xs text-gray-500">{module.lessons} lessons · {module.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                    <Button className="w-full">
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.filter(m => m.progress === 100).length > 0 ? (
                modules.filter(m => m.progress === 100).map(module => (
                  <Card key={module.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between mb-1">
                        <Badge variant="outline">{module.category}</Badge>
                        <span className="text-xs text-gray-500">{module.lessons} lessons · {module.duration}</span>
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <Button variant="outline" className="w-full">
                        Review Module
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <span className="material-icons text-4xl text-gray-300 mb-2">school</span>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Completed Modules Yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-4">
                    Start learning to see your completed modules here
                  </p>
                  <Button>Start Learning</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </AppLayout>
  );
}
