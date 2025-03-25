import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Contact {
  id: number;
  name: string;
  status: "online" | "offline";
  avatar?: string;
  initials?: string;
  lastMessage: string;
  time: string;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
}

export default function ConnectPreview() {
  const [activeContact, setActiveContact] = useState<number>(1);
  const [messageText, setMessageText] = useState("");
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Michael Johnson",
      status: "online",
      avatar: "/avatars/michael.jpg",
      lastMessage: "Can we discuss the visual tracking feature?",
      time: "10m"
    },
    {
      id: 2,
      name: "Sarah Williams",
      status: "offline",
      avatar: "/avatars/sarah.jpg",
      lastMessage: "I've sent you the design assets for review",
      time: "1h"
    },
    {
      id: 3,
      name: "Web Team",
      status: "online",
      initials: "WT",
      lastMessage: "Weekly standup meeting notes",
      time: "2d"
    }
  ]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      text: "Hey Alexandra, I'm working on the visual tracking component for the project. Can we discuss some ideas?",
      time: "10:42 AM"
    },
    {
      id: 2,
      senderId: 0,
      text: "Hi Michael! Sure, I've been looking at some visual progress tracking options. What kind of visualization did you have in mind?",
      time: "10:45 AM"
    },
    {
      id: 3,
      senderId: 1,
      text: "I'm thinking about color-coded progress indicators with clear icons. Something that works well for different processing styles.",
      time: "10:48 AM"
    },
    {
      id: 4,
      senderId: 1,
      text: "Can we discuss the visual tracking feature? I have some examples I'd like to show you.",
      time: "10:51 AM"
    }
  ]);
  
  const activeContactData = contacts.find(contact => contact.id === activeContact);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    // In a real implementation, this would send the message to an API
    const newMessage: Message = {
      id: messages.length + 1,
      senderId: 0, // Current user
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleNewMessage = () => {
    // In a real implementation, this would open a new message dialog
    console.log("New message");
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <span className="material-icons text-primary mr-2">forum</span>
              NeuroNex Connect
            </CardTitle>
            <p className="mt-1 text-sm text-gray-600">Multiple communication options for effective collaboration</p>
          </div>
          <Button onClick={handleNewMessage}>
            New Message
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3 mb-4">
          <Button variant="secondary" className="flex items-center bg-primary-50 border border-primary-200 text-primary-700 hover:bg-primary-100">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Recent Conversations */}
          <div className="md:col-span-1 border-r border-gray-200 pr-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Conversations</h4>
            <ul className="space-y-3">
              {contacts.map(contact => (
                <li 
                  key={contact.id}
                  onClick={() => setActiveContact(contact.id)}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    activeContact === contact.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      {contact.avatar ? (
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                      ) : null}
                      <AvatarFallback>{contact.initials || contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800 truncate">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.time}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-3 text-center">
              <Button variant="link" className="text-primary font-medium">
                View All Messages
              </Button>
            </div>
          </div>
          
          {/* Current Conversation */}
          <div className="md:col-span-2">
            {activeContactData ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar>
                      {activeContactData.avatar ? (
                        <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                      ) : null}
                      <AvatarFallback>{activeContactData.initials || activeContactData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{activeContactData.name}</p>
                      <p className={`text-xs ${activeContactData.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                        {activeContactData.status === 'online' ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <span className="material-icons">phone</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="material-icons">videocam</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="material-icons">more_vert</span>
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="bg-gray-50 rounded-lg p-3 h-64 mb-3">
                  {messages.map(message => (
                    <div key={message.id} className={`flex items-start mb-3 ${message.senderId === 0 ? 'justify-end' : ''}`}>
                      {message.senderId !== 0 && (
                        <Avatar className="h-8 w-8 mr-2">
                          {activeContactData.avatar ? (
                            <AvatarImage src={activeContactData.avatar} alt={activeContactData.name} />
                          ) : null}
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
                </ScrollArea>
                
                <div className="flex items-center">
                  <Button variant="ghost" size="icon">
                    <span className="material-icons">add</span>
                  </Button>
                  <Button variant="ghost" size="icon">
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
                  <Button variant="ghost" size="icon">
                    <span className="material-icons">mood</span>
                  </Button>
                  <Button variant="default" size="icon" onClick={handleSendMessage}>
                    <span className="material-icons">send</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <span className="material-icons text-4xl text-gray-300 mb-2">forum</span>
                <h3 className="text-xl font-medium text-gray-600 mb-2">No Conversation Selected</h3>
                <p className="text-gray-500 text-center max-w-xs mb-4">
                  Select a conversation from the list or start a new one
                </p>
                <Button onClick={handleNewMessage}>
                  <span className="material-icons text-sm mr-1">add</span>
                  New Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
