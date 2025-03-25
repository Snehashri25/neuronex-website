import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Priority {
  id: number;
  task: string;
  details: string;
  isCompleted: boolean;
  priority: "High" | "Medium" | "Low";
}

export default function PrioritiesSection() {
  const [priorities, setPriorities] = useState<Priority[]>([
    {
      id: 1,
      task: "Configure sensory-friendly notification settings",
      details: "High Priority · Due Today",
      isCompleted: false,
      priority: "High"
    },
    {
      id: 2,
      task: "Test color contrast adjustment tools for visual processing needs",
      details: "Medium Priority · Due Today",
      isCompleted: false,
      priority: "Medium"
    },
    {
      id: 3,
      task: "Structured team meeting: NeuroNex project phase review",
      details: "High Priority · 2:00 PM",
      isCompleted: false,
      priority: "High"
    }
  ]);

  const togglePriorityCompletion = (id: number) => {
    setPriorities(priorities.map(priority => 
      priority.id === id ? { ...priority, isCompleted: !priority.isCompleted } : priority
    ));
  };

  const addPriorityTask = () => {
    // In a real implementation, this would open a modal or form to add a new priority task
    console.log("Add priority task");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <span className="material-icons text-amber-500 mr-2">star</span>
            Today's Priorities
          </CardTitle>
          <Button 
            size="sm" 
            className="bg-amber-100 text-amber-700 hover:bg-amber-200"
          >
            <span className="material-icons text-sm mr-1">filter_center_focus</span>
            Focus Mode
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {priorities.map((priority) => (
            <li key={priority.id} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={priority.isCompleted}
                  onCheckedChange={() => togglePriorityCompletion(priority.id)}
                  className="text-primary"
                />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${priority.isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                  {priority.task}
                </p>
                <p className="text-xs text-gray-500">{priority.details}</p>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
            onClick={addPriorityTask}
          >
            <span className="material-icons text-sm mr-1">add</span>
            Add Priority Task
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
