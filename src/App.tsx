import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Landing pages
import Index from "./pages/Index";
import Pricing from "./components/Pricing";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Trainings from "./pages/Trainings";
import Challenges from "./pages/Challenges";
import Feedbacks from "./pages/Feedbacks";
import Suggestions from "./pages/Suggestions";
import Surveys from "./pages/Surveys";
import Analytics from "./pages/Analytics";

// Team pages
import TeamIndex from "./pages/team/Index";
import TeamChallenges from "./pages/team/Challenges";
import TeamFeedbacks from "./pages/team/Feedbacks";
import TeamSuggestions from "./pages/team/Suggestions";

// Admin pages
import AdminIndex from "./pages/admin/Index";
import AdminTeams from "./pages/admin/Teams";
import AdminSettings from "./pages/admin/Settings";

// Other pages
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/trainings" element={
              <ProtectedRoute>
                <Trainings />
              </ProtectedRoute>
            } />
            <Route path="/challenges" element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            } />
            <Route path="/feedbacks" element={
              <ProtectedRoute>
                <Feedbacks />
              </ProtectedRoute>
            } />
            <Route path="/suggestions" element={
              <ProtectedRoute>
                <Suggestions />
              </ProtectedRoute>
            } />
            <Route path="/surveys" element={
              <ProtectedRoute>
                <Surveys />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Team routes */}
            <Route path="/team" element={
              <ProtectedRoute>
                <TeamIndex />
              </ProtectedRoute>
            } />
            <Route path="/team/challenges" element={
              <ProtectedRoute>
                <TeamChallenges />
              </ProtectedRoute>
            } />
            <Route path="/team/feedbacks" element={
              <ProtectedRoute>
                <TeamFeedbacks />
              </ProtectedRoute>
            } />
            <Route path="/team/suggestions" element={
              <ProtectedRoute>
                <TeamSuggestions />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminIndex />
              </ProtectedRoute>
            } />
            <Route path="/admin/teams" element={
              <ProtectedRoute adminOnly>
                <AdminTeams />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute adminOnly>
                <AdminSettings />
              </ProtectedRoute>
            } />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
