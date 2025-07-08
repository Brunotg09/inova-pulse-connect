import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Landing pages
import Index from "./pages/Index";
import Pricing from "./components/Pricing";
import CompanyLanding from "./pages/CompanyLanding";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyRegister from "./pages/CompanyRegister";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard pages
import Analytics from "./pages/Analytics";
import Challenges from "./pages/Challenges";
import Dashboard from "./pages/Dashboard";
import Feedbacks from "./pages/Feedbacks";
import Suggestions from "./pages/Suggestions";
import Surveys from "./pages/Surveys";
import Trainings from "./pages/Trainings";

// Team pages
import TeamIndex from "./pages/team/Index";
import TeamChallenges from "./pages/team/Challenges";
import TeamFeedbacks from "./pages/team/Feedbacks";
import TeamSuggestions from "./pages/team/Suggestions";

// Admin pages
import AdminIndex from "./pages/admin/Index";
import AdminSettings from "./pages/admin/Settings";
import AdminTeams from "./pages/admin/Teams";

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

            {/* Company-specific routes */}
            <Route path="/:companySlug" element={<CompanyLanding />} />
            <Route path="/:companySlug/login" element={<CompanyLogin />} />
            <Route path="/:companySlug/register" element={<CompanyRegister />} />

            {/* Protected routes */}
            <Route
              path="/:companySlug/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/trainings"
              element={
                <ProtectedRoute>
                  <Trainings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/challenges"
              element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/feedbacks"
              element={
                <ProtectedRoute>
                  <Feedbacks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/suggestions"
              element={
                <ProtectedRoute>
                  <Suggestions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/surveys"
              element={
                <ProtectedRoute>
                  <Surveys />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Team routes */}
            <Route
              path="/:companySlug/team"
              element={
                <ProtectedRoute>
                  <TeamIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/team/challenges"
              element={
                <ProtectedRoute>
                  <TeamChallenges />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/team/feedbacks"
              element={
                <ProtectedRoute>
                  <TeamFeedbacks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/team/suggestions"
              element={
                <ProtectedRoute>
                  <TeamSuggestions />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/:companySlug/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminIndex />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/admin/teams"
              element={
                <ProtectedRoute adminOnly>
                  <AdminTeams />
                </ProtectedRoute>
              }
            />
            <Route
              path="/:companySlug/admin/settings"
              element={
                <ProtectedRoute adminOnly>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Legacy routes - redirect to main landing */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/trainings" element={<Navigate to="/" replace />} />
            <Route path="/challenges" element={<Navigate to="/" replace />} />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
