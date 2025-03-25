import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "./use-toast";

interface TaskPriority {
  taskId: number;
  priorityScore: number;
  reasoning: string;
}

interface TimeManagementSuggestion {
  suggestions: string[];
  techniques: string[];
}

interface Subtask {
  title: string;
  description: string;
}

export function useAIAssistant() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const prioritizeTasksMutation = useMutation({
    mutationFn: async (tasks: Task[]) => {
      setIsProcessing(true);
      const res = await apiRequest("POST", "/api/ai/task-priorities", { tasks });
      return await res.json();
    },
    onSuccess: () => {
      setIsProcessing(false);
    },
    onError: (error) => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to prioritize tasks. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to prioritize tasks:", error);
    },
  });

  const getTimeManagementSuggestionsMutation = useMutation({
    mutationFn: async (params: { tasks: Task[]; userPreferences?: any }) => {
      setIsProcessing(true);
      const res = await apiRequest("POST", "/api/ai/time-management", params);
      return await res.json();
    },
    onSuccess: () => {
      setIsProcessing(false);
    },
    onError: (error) => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to get time management suggestions. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to get time management suggestions:", error);
    },
  });

  const improveTaskClarityMutation = useMutation({
    mutationFn: async (taskDescription: string) => {
      setIsProcessing(true);
      const res = await apiRequest("POST", "/api/ai/improve-task", { taskDescription });
      return await res.json();
    },
    onSuccess: () => {
      setIsProcessing(false);
    },
    onError: (error) => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to improve task clarity. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to improve task clarity:", error);
    },
  });

  const breakdownTaskMutation = useMutation({
    mutationFn: async (params: { taskTitle: string; taskDescription: string }) => {
      setIsProcessing(true);
      const res = await apiRequest("POST", "/api/ai/task-breakdown", params);
      return await res.json();
    },
    onSuccess: () => {
      setIsProcessing(false);
    },
    onError: (error) => {
      setIsProcessing(false);
      toast({
        title: "Error",
        description: "Failed to break down task. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to break down task:", error);
    },
  });

  // Function to prioritize tasks
  const prioritizeTasks = async (tasks: Task[]): Promise<TaskPriority[]> => {
    try {
      const result = await prioritizeTasksMutation.mutateAsync(tasks);
      return result.priorities || [];
    } catch (error) {
      console.error("Error prioritizing tasks:", error);
      return [];
    }
  };

  // Function to get time management suggestions
  const getTimeManagementSuggestions = async (
    tasks: Task[],
    userPreferences?: any
  ): Promise<TimeManagementSuggestion> => {
    try {
      const result = await getTimeManagementSuggestionsMutation.mutateAsync({
        tasks,
        userPreferences,
      });
      return {
        suggestions: result.suggestions || [],
        techniques: result.techniques || [],
      };
    } catch (error) {
      console.error("Error getting time management suggestions:", error);
      return { suggestions: [], techniques: [] };
    }
  };

  // Function to improve task clarity
  const improveTaskClarity = async (taskDescription: string): Promise<string> => {
    try {
      const result = await improveTaskClarityMutation.mutateAsync(taskDescription);
      return result.improvedDescription || taskDescription;
    } catch (error) {
      console.error("Error improving task clarity:", error);
      return taskDescription;
    }
  };

  // Function to break down a task into subtasks
  const breakdownTask = async (
    taskTitle: string,
    taskDescription: string
  ): Promise<Subtask[]> => {
    try {
      const result = await breakdownTaskMutation.mutateAsync({
        taskTitle,
        taskDescription,
      });
      return result.subtasks || [];
    } catch (error) {
      console.error("Error breaking down task:", error);
      return [];
    }
  };

  return {
    prioritizeTasks,
    getTimeManagementSuggestions,
    improveTaskClarity,
    breakdownTask,
    isProcessing,
  };
}