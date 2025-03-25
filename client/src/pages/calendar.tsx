import { useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample event data - this would come from an API in a real implementation
  const events = [
    { id: 1, title: "Team Meeting", date: new Date(), time: "10:00 AM", type: "meeting" },
    { id: 2, title: "Project Deadline", date: new Date(new Date().setDate(new Date().getDate() + 3)), time: "5:00 PM", type: "deadline" },
    { id: 3, title: "Design Review", date: new Date(new Date().setDate(new Date().getDate() + 1)), time: "2:00 PM", type: "meeting" },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );
  
  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800">Calendar</h1>
          <p className="text-gray-600">Visualize your schedule and deadlines</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="material-icons text-primary mr-2">calendar_today</span>
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="material-icons text-primary mr-2">event</span>
                  {date ? date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "Events"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={event.type === "meeting" ? "default" : "destructive"}>
                            {event.type === "meeting" ? "Meeting" : "Deadline"}
                          </Badge>
                          <span className="text-sm text-gray-500">{event.time}</span>
                        </div>
                        <h3 className="font-medium">{event.title}</h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <span className="material-icons text-3xl mb-2">event_busy</span>
                    <p>No events scheduled for this day</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
