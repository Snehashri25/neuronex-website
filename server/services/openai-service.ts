import OpenAI from "openai";
import { Task } from "@shared/schema";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyzes a list of tasks and returns smart priority suggestions based on context.
 */
export async function generateTaskPriorities(
  tasks: Task[],
  userContext?: string
): Promise<{ taskId: number; priorityScore: number; reasoning: string }[]> {
  try {
    // Skip the API call if there are no tasks
    if (tasks.length === 0) {
      return [];
    }

    const tasksData = tasks.map((task) => ({
      id: task.id,
      title: task.title || "",
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate || "",
      category: task.category || "",
    }));

    const contextInfo = userContext || "The user has neurodivergent traits and benefits from clear organization and prioritization.";

    const prompt = `
      As an AI assistant for neurodivergent individuals, analyze the following tasks and suggest a prioritization order.
      Consider task urgency, importance, due dates, current status, and the user's context.
      
      User context: ${contextInfo}
      
      Tasks: ${JSON.stringify(tasksData)}
      
      Provide a JSON response with the following structure:
      {
        "prioritizedTasks": [
          {
            "taskId": number,
            "priorityScore": number (1-100, higher means higher priority),
            "reasoning": "Brief explanation of why this priority was assigned"
          }
        ]
      }
      
      Focus on factors that would help a neurodivergent person manage their executive function load effectively.
      Consider both urgency (due date) and importance, but also cognitive load and task complexity.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a specialized AI assistant for a neurodivergent-friendly project management platform." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return [];
    }
    
    const result = JSON.parse(content);
    return result.prioritizedTasks || [];
  } catch (error) {
    console.error("Error generating task priorities:", error);
    throw new Error("Failed to generate task priorities");
  }
}

/**
 * Generates time management suggestions based on tasks and user preferences.
 */
export async function generateTimeManagementSuggestions(
  tasks: Task[],
  userPreferences?: any
): Promise<{ suggestions: string[], techniques: string[] }> {
  try {
    // Format the tasks data
    const tasksData = tasks.map((task) => ({
      title: task.title || "",
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate || "",
      category: task.category || "",
    }));

    const preferences = userPreferences || {
      workStyle: "flexible",
      focusPreference: "pomodoro",
      energyLevel: "varies throughout day"
    };

    const prompt = `
      As an AI assistant for neurodivergent individuals, provide time management suggestions based on the following tasks and user preferences.
      
      Tasks: ${JSON.stringify(tasksData)}
      User preferences: ${JSON.stringify(preferences)}
      
      Generate JSON with two arrays:
      1. 'suggestions': List of 3-5 specific, actionable time management suggestions based on the tasks
      2. 'techniques': List of 2-3 neurodivergent-friendly time management techniques that could work well for these tasks
      
      Format your response as:
      {
        "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
        "techniques": ["technique 1", "technique 2"]
      }
      
      Focus on approaches that reduce executive function load and accommodate variable focus and energy levels.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a specialized AI assistant for a neurodivergent-friendly project management platform." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return { suggestions: [], techniques: [] };
    }
    
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating time management suggestions:", error);
    throw new Error("Failed to generate time management suggestions");
  }
}

/**
 * Analyzes a task description and suggests a more accessible format with clearer instructions.
 */
export async function improveTaskClarity(taskDescription: string): Promise<string> {
  try {
    const prompt = `
      As an AI assistant for neurodivergent individuals, improve the clarity of the following task description.
      Break down vague instructions, highlight key steps, and make the task more concrete and actionable.
      
      Original task description: "${taskDescription}"
      
      Return only the improved task description, without any explanation or meta-commentary.
      Focus on clarity, specificity, and creating a structure that reduces cognitive load.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a specialized AI assistant for a neurodivergent-friendly project management platform." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    return content ? content.trim() : taskDescription;
  } catch (error) {
    console.error("Error improving task clarity:", error);
    throw new Error("Failed to improve task clarity");
  }
}

/**
 * Generates a breakdown of a complex task into smaller, more manageable subtasks.
 */
export async function generateTaskBreakdown(
  taskTitle: string,
  taskDescription: string
): Promise<{ title: string; description: string }[]> {
  try {
    const prompt = `
      As an AI assistant for neurodivergent individuals, break down the following complex task into smaller, more manageable subtasks.
      
      Task title: "${taskTitle}"
      Task description: "${taskDescription}"
      
      Create 3-5 subtasks that:
      1. Have clear, concrete objectives
      2. Can be completed in a single focused session
      3. Have a logical sequence
      4. Reduce cognitive load by having clear starting and ending points
      
      Return a JSON object with the following structure:
      {
        "subtasks": [
          {
            "title": "Subtask title",
            "description": "Detailed but concise subtask description"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a specialized AI assistant for a neurodivergent-friendly project management platform." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return [];
    }
    
    const result = JSON.parse(content);
    return result.subtasks || [];
  } catch (error) {
    console.error("Error generating task breakdown:", error);
    throw new Error("Failed to generate task breakdown");
  }
}