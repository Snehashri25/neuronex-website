import { 
  useMutation, 
  UseMutationResult, 
  useQueryClient 
} from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TaskPriority {
  taskId: number;
  priorityScore: number;
  reasoning: string;
}

interface TimeManagementSuggestions {
  suggestions: string[];
  techniques: string[];
}

interface SubTask {
  title: string;
  description: string;
}

interface UseAIAssistanceReturn {
  prioritizeTasks: UseMutationResult<
    { priorities: TaskPriority[] }, 
    Error, 
    { tasks: Task[]; userContext?: string }
  >;
  getTimeManagementSuggestions: UseMutationResult<
    TimeManagementSuggestions, 
    Error, 
    { tasks: Task[]; userPreferences?: any }
  >;
  improveTaskClarity: UseMutationResult<
    { improvedDescription: string }, 
    Error, 
    { taskDescription: string }
  >;
  breakdownTask: UseMutationResult<
    { subtasks: SubTask[] }, 
    Error, 
    { taskTitle: string; taskDescription: string }
  >;
}

export function useAIAssistance(): UseAIAssistanceReturn {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Prioritize tasks using AI
  const prioritizeTasks = useMutation({
    mutationFn: async ({ tasks, userContext }: { tasks: Task[]; userContext?: string }) => {
      const res = await apiRequest("POST", "/api/ai/task-priorities", { tasks, userContext });
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error prioritizing tasks",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Get time management suggestions based on tasks
  const getTimeManagementSuggestions = useMutation({
    mutationFn: async ({ tasks, userPreferences }: { tasks: Task[]; userPreferences?: any }) => {
      const res = await apiRequest("POST", "/api/ai/time-management", { 
        tasks, 
        userPreferences 
      });
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error generating time management suggestions",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Improve task clarity
  const improveTaskClarity = useMutation({
    mutationFn: async ({ taskDescription }: { taskDescription: string }) => {
      const res = await apiRequest("POST", "/api/ai/improve-task", { taskDescription });
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error improving task clarity",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Break down a complex task into subtasks
  const breakdownTask = useMutation({
    mutationFn: async ({ taskTitle, taskDescription }: { taskTitle: string; taskDescription: string }) => {
      const res = await apiRequest("POST", "/api/ai/task-breakdown", { 
        taskTitle, 
        taskDescription 
      });
      return await res.json();
    },
    onError: (error: Error) => {
      toast({
        title: "Error breaking down task",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    prioritizeTasks,
    getTimeManagementSuggestions,
    improveTaskClarity,
    breakdownTask,
  };
}