import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ViewType = "list" | "board" | "calendar";

type TaskStatus = "todo" | "in-progress" | "completed";

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  dueDate: string;
  dueText: string;
  status: TaskStatus;
  assignee?: {
    name: string;
    avatar?: string;
    initials?: string;
  }[];
  isUrgent?: boolean;
  completed?: boolean;
}

export default function SmartTasksSection() {
  const [view, setView] = useState<ViewType>("board");
  
  // Sample tasks data - this would come from an API in a real implementation
  const tasks: Task[] = [
    {
      id: 1,
      title: "Research sensory-friendly design patterns",
      description: "Collect examples of sensory-friendly design patterns for implementation in our UI.",
      category: "Research",
      categoryColor: "blue",
      dueDate: "2023-10-15",
      dueText: "Due in 3 days",
      status: "todo",
      assignee: [{ name: "Alex", avatar: "/avatars/alex.jpg" }]
    },
    {
      id: 2,
      title: "Draft user journey for learning module",
      description: "Create detailed user flow for the personalized learning experience.",
      category: "Planning",
      categoryColor: "purple",
      dueDate: "2023-10-10",
      dueText: "Due tomorrow",
      status: "todo",
      assignee: [{ name: "Alex", avatar: "/avatars/alex.jpg" }]
    },
    {
      id: 3,
      title: "Implement customizable notification system",
      description: "Create a notification system that can be customized for different sensory needs.",
      category: "Development",
      categoryColor: "green",
      dueDate: "2023-10-09",
      dueText: "Due today",
      status: "in-progress",
      isUrgent: true,
      assignee: [
        { name: "Michael", avatar: "/avatars/michael.jpg" },
        { name: "Alex", avatar: "/avatars/alex.jpg" }
      ]
    },
    {
      id: 4,
      title: "Create visual task tracking components",
      description: "Design visual components for tracking task progress that are accessible and intuitive.",
      category: "Design",
      categoryColor: "indigo",
      dueDate: "2023-10-11",
      dueText: "Due in 2 days",
      status: "in-progress",
      assignee: [{ name: "Michael", avatar: "/avatars/michael.jpg" }]
    },
    {
      id: 5,
      title: "Set up project repository",
      description: "Create GitHub repository with proper documentation and structure.",
      category: "Development",
      categoryColor: "green",
      dueDate: "2023-10-05",
      dueText: "Completed",
      status: "completed",
      completed: true,
      assignee: [{ name: "Michael", avatar: "/avatars/michael.jpg" }]
    }
  ];
  
  // Filter tasks by status
  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const completedTasks = tasks.filter(task => task.status === "completed");
  
  const getCategoryBgColor = (color: string) => {
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
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className="material-icons text-primary mr-2">psychology</span>
              NeuroNex SmartTasks
            </CardTitle>
            <p className="text-sm text-gray-600">AI-powered task management and prioritization</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <span className="material-icons">more_vert</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <Button 
            variant={view === "list" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setView("list")}
            className="flex items-center"
          >
            <span className="material-icons text-sm mr-1">view_list</span>
            List
          </Button>
          <Button 
            variant={view === "board" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setView("board")}
            className="flex items-center"
          >
            <span className="material-icons text-sm mr-1">dashboard</span>
            Board
          </Button>
          <Button 
            variant={view === "calendar" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setView("calendar")}
            className="flex items-center"
          >
            <span className="material-icons text-sm mr-1">calendar_today</span>
            Calendar
          </Button>
          
          <span className="mx-2 text-gray-300">|</span>
          
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <span className="material-icons text-sm mr-1">filter_list</span>
            All Tasks
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        {view === "board" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* To Do Column */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">To Do</h4>
                <Badge variant="outline">{todoTasks.length}</Badge>
              </div>
              
              {todoTasks.map(task => (
                <div key={task.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryBgColor(task.categoryColor)} variant="outline">
                      {task.category}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <span className="material-icons text-gray-400 text-sm">more_horiz</span>
                    </Button>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2">{task.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-amber-500 text-sm mr-1">schedule</span>
                      <span className="text-xs text-gray-500">{task.dueText}</span>
                    </div>
                    {task.assignee && (
                      <div className="flex -space-x-2">
                        {task.assignee.map((person, index) => (
                          <Avatar key={index} className="h-6 w-6 border border-white">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.initials || person.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full flex items-center justify-center text-sm text-gray-500 p-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="material-icons text-sm mr-1">add</span>
                Add Task
              </Button>
            </div>
            
            {/* In Progress Column */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">In Progress</h4>
                <Badge variant="outline">{inProgressTasks.length}</Badge>
              </div>
              
              {inProgressTasks.map(task => (
                <div key={task.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryBgColor(task.categoryColor)} variant="outline">
                      {task.category}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <span className="material-icons text-gray-400 text-sm">more_horiz</span>
                    </Button>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2">{task.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.isUrgent ? (
                        <>
                          <span className="material-icons text-red-500 text-sm mr-1">schedule</span>
                          <span className="text-xs text-red-500 font-medium">{task.dueText}</span>
                        </>
                      ) : (
                        <>
                          <span className="material-icons text-amber-500 text-sm mr-1">schedule</span>
                          <span className="text-xs text-gray-500">{task.dueText}</span>
                        </>
                      )}
                    </div>
                    {task.assignee && (
                      <div className="flex -space-x-2">
                        {task.assignee.map((person, index) => (
                          <Avatar key={index} className="h-6 w-6 border border-white">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.initials || person.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full flex items-center justify-center text-sm text-gray-500 p-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="material-icons text-sm mr-1">add</span>
                Add Task
              </Button>
            </div>
            
            {/* Completed Column */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Completed</h4>
                <Badge variant="outline">{completedTasks.length}</Badge>
              </div>
              
              {completedTasks.map(task => (
                <div key={task.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryBgColor(task.categoryColor)} variant="outline">
                      {task.category}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <span className="material-icons text-gray-400 text-sm">more_horiz</span>
                    </Button>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-2 line-through text-gray-500">{task.title}</h5>
                  <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-green-500 text-sm mr-1">check_circle</span>
                      <span className="text-xs text-green-500">{task.dueText}</span>
                    </div>
                    {task.assignee && (
                      <div className="flex -space-x-2">
                        {task.assignee.map((person, index) => (
                          <Avatar key={index} className="h-6 w-6 border border-white">
                            <AvatarImage src={person.avatar} alt={person.name} />
                            <AvatarFallback>{person.initials || person.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full flex items-center justify-center text-sm text-gray-500 p-2 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="material-icons text-sm mr-1">add</span>
                Add Task
              </Button>
            </div>
          </div>
        )}
        
        {view === "list" && (
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-lg grid grid-cols-12 text-sm font-medium text-gray-500">
              <div className="col-span-6 md:col-span-5">Task</div>
              <div className="col-span-2 hidden md:block">Category</div>
              <div className="col-span-3 md:col-span-2">Due Date</div>
              <div className="col-span-2 hidden md:block">Assignee</div>
              <div className="col-span-3 md:col-span-1">Status</div>
            </div>
            
            {[...todoTasks, ...inProgressTasks, ...completedTasks].map(task => (
              <div key={task.id} className="p-3 rounded-lg border border-gray-200 grid grid-cols-12 items-center hover:bg-gray-50 cursor-pointer">
                <div className="col-span-6 md:col-span-5">
                  <h5 className={`font-medium text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.title}</h5>
                  <p className="text-xs text-gray-500 truncate">{task.description}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <Badge className={getCategoryBgColor(task.categoryColor)} variant="outline">
                    {task.category}
                  </Badge>
                </div>
                <div className="col-span-3 md:col-span-2">
                  {task.completed ? (
                    <span className="text-xs text-green-500 flex items-center">
                      <span className="material-icons text-sm mr-1">check_circle</span>
                      Completed
                    </span>
                  ) : task.isUrgent ? (
                    <span className="text-xs text-red-500 font-medium">{task.dueText}</span>
                  ) : (
                    <span className="text-xs text-gray-500">{task.dueText}</span>
                  )}
                </div>
                <div className="col-span-2 hidden md:block">
                  {task.assignee && (
                    <div className="flex -space-x-2">
                      {task.assignee.map((person, index) => (
                        <Avatar key={index} className="h-6 w-6 border border-white">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>{person.initials || person.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-3 md:col-span-1">
                  <Badge variant={
                    task.status === "completed" ? "success" :
                    task.status === "in-progress" ? "warning" : "outline"
                  }>
                    {task.status === "todo" ? "To Do" :
                     task.status === "in-progress" ? "In Progress" : "Completed"}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button className="w-full mt-4">
              <span className="material-icons text-sm mr-1">add</span>
              Add New Task
            </Button>
          </div>
        )}
        
        {view === "calendar" && (
          <div className="text-center py-10">
            <span className="material-icons text-5xl text-gray-300 mb-3">calendar_month</span>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Calendar View</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Calendar view allows you to organize your tasks by date and see your schedule at a glance
            </p>
            <Button>
              Switch to Calendar View
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
