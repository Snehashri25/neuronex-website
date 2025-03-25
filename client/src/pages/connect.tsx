import { useState } from "react";
import AppLayout from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Connect() {
  const [activeContact, setActiveContact] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  
  // Sample contact data - this would come from an API in a real implementation
  const contacts = [
    { id: 1, name: "Michael Johnson", status: "online", avatar: "/avatars/michael.jpg", lastMessage: "Can we discuss the visual tracking feature?", time: "10m" },
    { id: 2, name: "Sarah Williams", status: "offline", avatar: "/avatars/sarah.jpg", lastMessage: "I've sent you the design assets for review", time: "1h" },
    { id: 3, name: "Web Team", status: "online", avatar: "", initials: "WT", lastMessage: "Weekly standup meeting notes", time: "2d" },
  ];
  
  // Sample message data - this would come from an API in a real implementation
  const messages = [
    { id: 1, senderId: 1, text: "Hey Alexandra, I'm working on the visual tracking component for the project. Can we discuss some ideas?", time: "10:42 AM" },
    { id: 2, senderId: 0, text: "Hi Michael! Sure, I've been looking at some visual progress tracking options. What kind of visualization did you have in mind?", time: "10:45 AM" },
    { id: 3, senderId: 1, text: "I'm thinking about color-coded progress indicators with clear icons. Something that works well for different processing styles.", time: "10:48 AM" },
    { id: 4, senderId: 1, text: "Can we discuss the visual tracking feature? I have some examples I'd like to show you.", time: "10:51 AM" },
  ];
  
  const activeContactData = contacts.find(contact => contact.id === activeContact);
  
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    // In a real implementation, this would call an API to send the message
    setMessageText("");
  };

  return (
    <AppLayout>
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-gray-800 flex items-center">
            <span className="material-icons text-primary mr-2">forum</span>
            NeuroNex Connect
          </h1>
          <p className="text-gray-600">Multiple communication options for effective collaboration</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Communication Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" className="flex items-center">
                <span className="material-icons text-sm mr-1">format_align_left</span>
                Text
              </Button>
              <Button variant="outline" className="flex items-center">
                <span className="material-icons text-sm mr-1">mic</span>
                Voice
              </Button>
              <Button variant="outline" className="flex items-center">
                <span className="material-icons text-sm mr-1">image</span>
                Visual
              </Button>
              <Button variant="outline" className="flex items-center">
                <span className="material-icons text-sm mr-1">videocam</span>
                Video
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Contacts List */}
          <div className="md:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <Button size="sm">
                    <span className="material-icons text-sm mr-1">add</span>
                    New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                  <div className="px-4 py-2">
                    {contacts.map(contact => (
                      <div 
                        key={contact.id}
                        onClick={() => setActiveContact(contact.id)}
                        className={`flex items-center p-2 rounded-lg mb-2 cursor-pointer ${activeContact === contact.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      >
                        <div className="relative flex-shrink-0">
                          {contact.avatar ? (
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>{contact.initials || contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <Avatar>
                              <AvatarFallback className="bg-primary/10 text-primary">{contact.initials}</AvatarFallback>
                            </Avatar>
                          )}
                          <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-800 truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.time}</p>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {activeContactData ? (
                <>
                  <CardHeader className="pb-2 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {activeContactData.avatar ? (
                          <Avatar>
                            <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                            <AvatarFallback>{activeContactData.initials || activeContactData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">{activeContactData.initials}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">{activeContactData.name}</p>
                          <p className={`text-xs ${activeContactData.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                            {activeContactData.status === 'online' ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="ghost">
                          <span className="material-icons">phone</span>
                        </Button>
                        <Button size="icon" variant="ghost">
                          <span className="material-icons">videocam</span>
                        </Button>
                        <Button size="icon" variant="ghost">
                          <span className="material-icons">more_vert</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {messages.map(message => (
                      <div key={message.id} className={`flex items-start mb-4 ${message.senderId === 0 ? 'justify-end' : ''}`}>
                        {message.senderId !== 0 && (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                            <AvatarFallback>{activeContactData.initials || activeContactData.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`p-3 rounded-lg shadow-sm max-w-[75%] ${message.senderId === 0 ? 'bg-primary/10 mr-2' : 'bg-white'}`}>
                          <p className="text-sm text-gray-800">{message.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                        </div>
                        {message.senderId === 0 && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/you.jpg" alt="You" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t">
                    <div className="flex items-center">
                      <Button size="icon" variant="ghost">
                        <span className="material-icons">add</span>
                      </Button>
                      <Button size="icon" variant="ghost">
                        <span className="material-icons">mic</span>
                      </Button>
                      <div className="flex-1 mx-2">
                        <Input 
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="rounded-full"
                          placeholder="Type a message..."
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                      </div>
                      <Button size="icon" variant="ghost">
                        <span className="material-icons">mood</span>
                      </Button>
                      <Button size="icon" variant="default" onClick={handleSendMessage}>
                        <span className="material-icons">send</span>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="material-icons text-4xl text-gray-300 mb-3">forum</span>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Conversation Selected</h3>
                  <p className="text-gray-500 text-center max-w-xs mb-4">
                    Select a conversation from the list or start a new one
                  </p>
                  <Button>
                    <span className="material-icons text-sm mr-1">add</span>
                    New Message
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
