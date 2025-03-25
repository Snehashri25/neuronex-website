import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, loginMutation, registerMutation } = useAuth();
  const [_, setLocation] = useLocation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      setLocation("/");
    }
  }, [user, setLocation]);

  // Login form schema
  const loginSchema = z.object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters long",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  });

  // Registration form schema
  const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle login submission
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  // Handle registration submission
  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    const { confirmPassword, ...registrationData } = values;
    registerMutation.mutate(registrationData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">N</span>
              </div>
              <h1 className="font-heading font-bold text-2xl text-gray-800 ml-2">NeuroNex</h1>
            </div>
            <CardTitle className="text-xl font-heading">
              Welcome to NeuroNex
            </CardTitle>
            <CardDescription>
              A project management platform designed for neurodiverse individuals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Choose a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Create a password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Confirm your password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {activeTab === "login" 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")} 
                className="text-primary hover:underline font-medium"
              >
                {activeTab === "login" ? "Register" : "Login"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <div className="hidden md:flex flex-1 bg-primary p-12 text-white justify-center items-center">
        <div className="max-w-md">
          <h2 className="text-3xl font-heading font-bold mb-6">Empowering neurodiverse individuals</h2>
          <p className="mb-8 text-primary-foreground">
            NeuroNex is a project management platform designed specifically for neurodiverse individuals. 
            Our platform includes features like AI-powered task management, visual project tracking, 
            customizable notifications, and more to support your unique working style.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="material-icons text-primary-foreground mr-2">psychology</span>
              <div>
                <h3 className="font-medium text-lg">NeuroNex SmartTasks</h3>
                <p className="text-primary-foreground/80">AI-powered task management and prioritization</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary-foreground mr-2">analytics</span>
              <div>
                <h3 className="font-medium text-lg">NeuroNex VisualTrack</h3>
                <p className="text-primary-foreground/80">Visual project tracking with color-coding</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="material-icons text-primary-foreground mr-2">notifications</span>
              <div>
                <h3 className="font-medium text-lg">NeuroNex Alert</h3>
                <p className="text-primary-foreground/80">Customizable notification system</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
