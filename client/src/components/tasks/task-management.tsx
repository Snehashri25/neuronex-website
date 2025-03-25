import { useState, useEffect } from "react";
import SmartTasksSection from "@/components/dashboard/smart-tasks-section";
import AITaskAssistant from "@/components/tasks/ai-task-assistant";
import { Task } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function TaskManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // In a real implementation, these would be fetched from the API
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Research sensory-friendly design patterns",
      description: "Collect examples of sensory-friendly design patterns for implementation in our UI.",
      status: "todo",
      priority: "medium",
      category: "Research",
      dueDate: "2023-10-15",
      userId: 1,
      completed: false,
      createdAt: "2023-10-01",
      projectId: null,
      assignees: null
    },
    {
      id: 2,
      title: "Draft user journey for learning module",
      description: "Create detailed user flow for the personalized learning experience.",
      status: "todo",
      priority: "medium",
      category: "Planning",
      dueDate: "2023-10-10",
      userId: 1,
      completed: false,
      createdAt: "2023-10-01",
      projectId: null,
      assignees: null
    },
    {
      id: 3,
      title: "Implement customizable notification system",
      description: "Create a notification system that can be customized for different sensory needs.",
      status: "in-progress",
      priority: "high",
      category: "Development",
      dueDate: "2023-10-09", 
      userId: 1,
      completed: false,
      createdAt: "2023-10-01",
      projectId: null,
      assignees: null
    },
    {
      id: 4,
      title: "Create visual task tracking components",
      description: "Design visual components for tracking task progress that are accessible and intuitive.",
      status: "in-progress",
      priority: "medium",
      category: "Design",
      dueDate: "2023-10-11",
      userId: 1,
      completed: false,
      createdAt: "2023-10-01",
      projectId: null,
      assignees: null
    },
    {
      id: 5,
      title: "Set up project repository",
      description: "Create GitHub repository with proper documentation and structure.",
      status: "completed",
      priority: "low",
      category: "Development",
      dueDate: "2023-10-05",
      userId: 1,
      completed: true,
      createdAt: "2023-09-28",
      projectId: null,
      assignees: null
    }
  ]);

  // In a real implementation, this would be a query to fetch tasks
  /*
  const {
    data: tasks = [],
    isLoading,
    error
  } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
    staleTime: 60 * 1000, // 1 minute
  });
  */

  // Task update mutation
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask: Task) => {
      // In a real implementation, this would be an API call
      // const res = await apiRequest("PATCH", `/api/tasks/${updatedTask.id}`, updatedTask);
      // return await res.json();
      
      // For now, we'll just return the updated task
      return updatedTask;
    },
    onSuccess: (updatedTask) => {
      // Update local state
      setTasks(current => 
        current.map(task => task.id === updatedTask.id ? updatedTask : task)
      );
      
      // In a real implementation, invalidate queries
      // queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      
      toast({
        title: "Task updated",
        description: "The task has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id">) => {
      // In a real implementation, this would be an API call
      // const res = await apiRequest("POST", "/api/tasks", newTask);
      // return await res.json();
      
      // For now, we'll just return a new task with a generated ID
      const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
      return { ...newTask, id: newId } as Task;
    },
    onSuccess: (newTask) => {
      // Update local state
      setTasks(current => [...current, newTask]);
      
      // In a real implementation, invalidate queries
      // queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      
      toast({
        title: "Task created",
        description: "The task has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Creation failed",
        description: error.message || "Failed to create task. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      // In a real implementation, this would be an API call
      // await apiRequest("DELETE", `/api/tasks/${taskId}`);
      
      // For now, we'll just return the taskId
      return taskId;
    },
    onSuccess: (taskId) => {
      // Update local state
      setTasks(current => current.filter(task => task.id !== taskId));
      
      // In a real implementation, invalidate queries
      // queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      
      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleTaskUpdate = (updatedTask: Task) => {
    updateTaskMutation.mutate(updatedTask);
  };

  const handleCreateSubtasks = (parentTaskId: number, subtasks: { title: string; description: string }[]) => {
    // Get the parent task to copy some of its properties
    const parentTask = tasks.find(task => task.id === parentTaskId);
    if (!parentTask) return;
    
    // Create subtasks
    subtasks.forEach(subtask => {
      createTaskMutation.mutate({
        title: subtask.title,
        description: subtask.description,
        status: "todo",
        priority: "medium",
        category: parentTask.category,
        dueDate: parentTask.dueDate, // Inherit due date from parent
        userId: 1, // This would be the current user's ID
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
        projectId: parentTask.projectId,
        assignees: parentTask.assignees
      });
    });
  };

  return (
    <div className="space-y-6">
      <SmartTasksSection />
      
      <AITaskAssistant 
        tasks={tasks}
        onTasksUpdate={handleTaskUpdate}
        onSubtasksCreate={handleCreateSubtasks}
      />
    </div>
  );
}