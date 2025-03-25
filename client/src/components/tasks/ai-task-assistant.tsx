import { useState } from "react";
import { useAIAssistant } from "@/hooks/use-ai-assistant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, BrainCircuit } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface AITaskAssistantProps {
  tasks: Task[];
  onTasksUpdate?: (updatedTask: Task) => void;
  onSubtasksCreate?: (parentTaskId: number, subtasks: { title: string; description: string }[]) => void;
}

export default function AITaskAssistant({ tasks, onTasksUpdate, onSubtasksCreate }: AITaskAssistantProps) {
  const { toast } = useToast();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("clarity");
  const { 
    improveTaskClarity, 
    breakdownTask, 
    getTimeManagementSuggestions,
    isProcessing 
  } = useAIAssistant();
  
  const [clarityResult, setClarityResult] = useState<string>("");
  const [breakdownResult, setBreakdownResult] = useState<{ title: string; description: string }[]>([]);
  const [timeManagementResult, setTimeManagementResult] = useState<{
    suggestions: string[];
    techniques: string[];
  }>({ suggestions: [], techniques: [] });

  // Helper to get color for different task types
  const getTaskTypeColor = (type: string | null | undefined) => {
    if (!type) return 'bg-gray-100 border-gray-300 text-gray-700';
    
    const colorMap: Record<string, string> = {
      'Design': 'bg-blue-100 border-blue-300 text-blue-700',
      'Development': 'bg-purple-100 border-purple-300 text-purple-700',
      'Research': 'bg-indigo-100 border-indigo-300 text-indigo-700',
      'Accessibility': 'bg-green-100 border-green-300 text-green-700',
      'Wellbeing': 'bg-rose-100 border-rose-300 text-rose-700'
    };
    return colorMap[type] || 'bg-gray-100 border-gray-300 text-gray-700';
  };

  const selectedTask = selectedTaskId 
    ? tasks.find(task => task.id === selectedTaskId) 
    : null;

  const handleImproveClarity = async () => {
    if (!selectedTask || !selectedTask.description) return;
    
    try {
      const improvedDescription = await improveTaskClarity(selectedTask.description);
      setClarityResult(improvedDescription);
      
      toast({
        title: "Task clarity improved",
        description: "We've analyzed your task and suggested a clearer description.",
      });
    } catch (error) {
      console.error("Error improving task clarity:", error);
      toast({
        title: "Error",
        description: "Failed to improve task clarity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTaskBreakdown = async () => {
    if (!selectedTask || !selectedTask.title || !selectedTask.description) return;
    
    try {
      const subtasks = await breakdownTask(selectedTask.title, selectedTask.description);
      setBreakdownResult(subtasks);
      
      toast({
        title: "Task breakdown generated",
        description: "We've broken down your task into manageable subtasks.",
      });
    } catch (error) {
      console.error("Error breaking down task:", error);
      toast({
        title: "Error",
        description: "Failed to break down task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTimeManagement = async () => {
    if (tasks.length === 0) return;
    
    try {
      const result = await getTimeManagementSuggestions(tasks, {
        preferredWorkingHours: "9am-5pm",
        focusTimePreference: "morning",
        breakFrequency: "regular"
      });
      
      setTimeManagementResult(result);
      
      toast({
        title: "Time management suggestions generated",
        description: "We've analyzed your tasks and created personalized time management suggestions.",
      });
    } catch (error) {
      console.error("Error generating time management suggestions:", error);
      toast({
        title: "Error",
        description: "Failed to generate time management suggestions. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleApplyImprovedClarity = () => {
    if (!selectedTask || !clarityResult || !onTasksUpdate) return;
    
    onTasksUpdate({
      ...selectedTask,
      description: clarityResult
    });
    
    toast({
      title: "Task updated",
      description: "The improved description has been applied to your task.",
    });
  };

  const handleAddSubtasks = () => {
    if (!selectedTask || breakdownResult.length === 0 || !onSubtasksCreate) return;
    
    onSubtasksCreate(selectedTask.id, breakdownResult);
    
    toast({
      title: "Subtasks added",
      description: `${breakdownResult.length} subtasks have been created from your task.`,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
          NeuroNex AI Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered tools to help manage tasks in a neurodivergent-friendly way
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-2">Select a task:</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No tasks available</p>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTaskId === task.id 
                      ? 'border-primary shadow-md' 
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`px-2 py-1 text-xs rounded-md ${getTaskTypeColor(task.category || '')}`}>
                        {task.category}
                      </div>
                      
                      {task.completed ? (
                        <span className="flex items-center text-xs font-medium text-green-600">
                          <span className="material-icons text-xs mr-1">check_circle</span>
                          Done
                        </span>
                      ) : task.status === "in-progress" ? (
                        <span className="flex items-center text-xs font-medium text-amber-600">
                          <span className="material-icons text-xs mr-1">autorenew</span>
                          In Progress
                        </span>
                      ) : (
                        <span className="flex items-center text-xs font-medium text-blue-600">
                          <span className="material-icons text-xs mr-1">radio_button_unchecked</span>
                          To Do
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-sm font-medium mt-2 mb-1">{task.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="clarity" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="clarity" className="flex-1">Improve Clarity</TabsTrigger>
                <TabsTrigger value="breakdown" className="flex-1">Task Breakdown</TabsTrigger>
                <TabsTrigger value="time" className="flex-1">Time Management</TabsTrigger>
              </TabsList>
              
              <TabsContent value="clarity" className="mt-4">
                {selectedTask ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Original task description:</h3>
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        {selectedTask.description}
                      </div>
                    </div>
                    
                    {clarityResult ? (
                      <>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Improved task description:</h3>
                          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                            {clarityResult}
                          </div>
                        </div>
                        <Button onClick={handleApplyImprovedClarity}>
                          Apply Improved Description
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={handleImproveClarity} 
                        disabled={isProcessing}
                        className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        {isProcessing ? "Processing..." : "Improve Task Clarity"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Select a task to improve its clarity</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="breakdown" className="mt-4">
                {selectedTask ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Task to break down:</h3>
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="text-sm font-medium">{selectedTask.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{selectedTask.description}</p>
                      </div>
                    </div>
                    
                    {breakdownResult.length > 0 ? (
                      <>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Suggested subtasks:</h3>
                          <div className="space-y-2">
                            {breakdownResult.map((subtask, index) => (
                              <div key={index} className="p-3 border rounded-lg bg-blue-50 border-blue-200 hover:shadow-sm transition-all">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm text-blue-600 font-medium text-xs">
                                    {index + 1}
                                  </div>
                                  <h4 className="text-sm font-medium text-blue-800">{subtask.title}</h4>
                                </div>
                                <div className="pl-8">
                                  <p className="text-xs text-blue-700 bg-white p-2 rounded-md border border-blue-100">{subtask.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button onClick={handleAddSubtasks}>
                          Add These Subtasks
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={handleTaskBreakdown} 
                        disabled={isProcessing}
                        className="flex items-center"
                      >
                        {isProcessing ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        {isProcessing ? "Processing..." : "Break Down Task"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Select a task to break it down into subtasks</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="time" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm">
                    Get AI-powered time management suggestions based on your current tasks.
                  </p>
                  
                  {timeManagementResult.suggestions.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-800 flex items-center mb-3">
                            <span className="material-icons mr-2 text-blue-600">tips_and_updates</span>
                            Personal Time Management Suggestions
                          </h4>
                          <div className="space-y-3">
                            {timeManagementResult.suggestions.map((suggestion, idx) => (
                              <div key={idx} className="bg-white p-3 rounded-md border border-blue-100 flex gap-3 items-start">
                                <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                  {idx + 1}
                                </div>
                                <p className="text-sm text-blue-900">{suggestion}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-800 flex items-center mb-3">
                            <span className="material-icons mr-2 text-green-600">psychology</span>
                            Neurodivergent-Friendly Techniques
                          </h4>
                          <div className="space-y-3">
                            {timeManagementResult.techniques.map((technique, idx) => (
                              <div key={idx} className="bg-white p-3 rounded-md border border-green-100 flex gap-3 items-start">
                                <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="material-icons text-sm">check</span>
                                </div>
                                <p className="text-sm text-green-900">{technique}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={handleTimeManagement} 
                      disabled={isProcessing || tasks.length === 0}
                      className="flex items-center"
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {isProcessing ? "Analyzing..." : "Generate Time Management Suggestions"}
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}