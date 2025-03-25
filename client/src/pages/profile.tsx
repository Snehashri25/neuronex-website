import { useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";

export default function Profile() {
  const { user, logoutMutation } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // This would be initialized with actual user data in a real implementation
  const [formData, setFormData] = useState({
    fullName: "Alexandra Smith",
    username: user?.username || "",
    email: "alex@example.com",
    bio: "Project manager with a passion for inclusive design and accessible technology.",
    jobTitle: "Senior Project Manager",
    organization: "Design Innovations"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    // In a real implementation, this would call an API to update the user profile
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/avatars/profile.jpg" alt="Profile picture" />
                  <AvatarFallback>{formData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-medium">{formData.fullName}</h2>
                <p className="text-gray-500 mb-1">{formData.jobTitle}</p>
                <p className="text-gray-500 text-sm mb-4">{formData.organization}</p>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <span className="material-icons text-sm mr-2">settings</span>
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="material-icons text-sm mr-2">notifications</span>
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="material-icons text-sm mr-2">access_time</span>
                    Activity Log
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <span className="material-icons text-sm mr-2">logout</span>
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="w-full grid grid-cols-3 max-w-md mb-4">
                <TabsTrigger value="profile">Profile Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details and public profile</CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)}>
                          <span className="material-icons text-sm mr-1">edit</span>
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          {isEditing ? (
                            <Input 
                              id="fullName" 
                              name="fullName" 
                              value={formData.fullName} 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div className="p-2 border rounded-md mt-1">{formData.fullName}</div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="username">Username</Label>
                          {isEditing ? (
                            <Input 
                              id="username" 
                              name="username" 
                              value={formData.username} 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div className="p-2 border rounded-md mt-1">{formData.username}</div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md mt-1">{formData.email}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        {isEditing ? (
                          <Textarea 
                            id="bio" 
                            name="bio" 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            rows={3} 
                          />
                        ) : (
                          <div className="p-2 border rounded-md mt-1 min-h-[5rem]">{formData.bio}</div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="jobTitle">Job Title</Label>
                          {isEditing ? (
                            <Input 
                              id="jobTitle" 
                              name="jobTitle" 
                              value={formData.jobTitle} 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div className="p-2 border rounded-md mt-1">{formData.jobTitle}</div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="organization">Organization</Label>
                          {isEditing ? (
                            <Input 
                              id="organization" 
                              name="organization" 
                              value={formData.organization} 
                              onChange={handleInputChange} 
                            />
                          ) : (
                            <div className="p-2 border rounded-md mt-1">{formData.organization}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>User Preferences</CardTitle>
                    <CardDescription>Customize your experience and workflow preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center py-6">
                      Preferences settings will be implemented here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your password and account security</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center py-6">
                      Security settings will be implemented here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
