import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationPreference {
  id: string;
  name: string;
  enabled: boolean;
}

interface Notification {
  id: number;
  type: "notification" | "message" | "update";
  iconColor: string;
  content: string;
  time: string;
}

export default function AlertsSection() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    { id: "visual-alerts", name: "Visual Sensory Alerts", enabled: true },
    { id: "auditory-alerts", name: "Auditory Sensory Alerts", enabled: false },
    { id: "gentle-transitions", name: "Gentle Transition Reminders", enabled: true },
    { id: "distraction-filters", name: "Distraction Filters", enabled: true }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "notification",
      iconColor: "text-primary",
      content: "Task transition reminder: \"Sensory break\" in 15 minutes before your next meeting",
      time: "10 minutes ago"
    },
    {
      id: 2,
      type: "message",
      iconColor: "text-green-500",
      content: "New message from Jordan: \"I've prepared visual aids for tomorrow's presentation\"",
      time: "1 hour ago"
    },
    {
      id: 3,
      type: "update",
      iconColor: "text-amber-500",
      content: "Executive function reminder: Review \"Accessibility Settings\" task breakdown",
      time: "2 hours ago"
    }
  ]);

  const togglePreference = (id: string) => {
    setPreferences(preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    ));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch(type) {
      case "notification": return "notifications";
      case "message": return "chat";
      case "update": return "update";
      default: return "notifications";
    }
  };

  const openSettings = () => {
    // In a real implementation, this would navigate to the notification settings page
    console.log("Open notification settings");
  };

  const viewAllNotifications = () => {
    // In a real implementation, this would navigate to the notifications page
    console.log("View all notifications");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <span className="material-icons text-primary mr-2">notifications</span>
            NeuroNex Alert
          </CardTitle>
          <Button 
            variant="link" 
            className="text-primary"
            onClick={openSettings}
          >
            Settings
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Notification Preferences</h4>
          <div className="space-y-2">
            {preferences.map(pref => (
              <div key={pref.id} className="flex items-center justify-between">
                <Label htmlFor={pref.id} className="text-sm text-gray-600">
                  {pref.name}
                </Label>
                <Switch
                  id={pref.id}
                  checked={pref.enabled}
                  onCheckedChange={() => togglePreference(pref.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Notifications</h4>
        <ul className="space-y-3">
          {notifications.map(notification => (
            <li key={notification.id} className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <span className={`material-icons ${notification.iconColor}`}>
                  {getNotificationIcon(notification.type)}
                </span>
              </div>
              <div className="ml-2">
                <p className="text-sm text-gray-800">{notification.content}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="mt-3 text-center">
          <Button 
            variant="link" 
            className="text-primary font-medium"
            onClick={viewAllNotifications}
          >
            View All Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
