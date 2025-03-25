import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import Tasks from "@/pages/tasks";
import Projects from "@/pages/projects";
import Calendar from "@/pages/calendar";
import Learn from "@/pages/learn";
import Connect from "@/pages/connect";
import Community from "@/pages/community";
import Profile from "@/pages/profile";
import Accessibility from "@/pages/accessibility";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/tasks" component={Tasks} />
      <ProtectedRoute path="/projects" component={Projects} />
      <ProtectedRoute path="/calendar" component={Calendar} />
      <ProtectedRoute path="/learn" component={Learn} />
      <ProtectedRoute path="/connect" component={Connect} />
      <ProtectedRoute path="/community" component={Community} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/accessibility" component={Accessibility} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
