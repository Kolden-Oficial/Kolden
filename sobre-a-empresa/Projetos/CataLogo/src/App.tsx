import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LinkBuilder from "./pages/LinkBuilder";
import JourneyViewer from "./pages/JourneyViewer";
import Logs from "./pages/Logs";
import IntegrationSettings from "./pages/IntegrationSettings";
import TaxonomyManager from "./pages/TaxonomyManager";
import CampaignNaming from "./pages/CampaignNaming";
import NotFound from "./pages/NotFound";
import GoRedirect from "./pages/GoRedirect";
import Auth from "./pages/Auth";
import CronStatus from "./pages/CronStatus";
import Identities from "./pages/Identities";
import LandingCata from "./pages/LandingCata";
import ThankYou from "./pages/ThankYou";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/go/:slug" element={<GoRedirect />} />
          <Route path="/lp/a" element={<LandingCata variant="a" />} />
          <Route path="/lp/b" element={<LandingCata variant="b" />} />

          <Route path="/lp/obrigado" element={<ThankYou />} />
          <Route path="/legal/privacidade" element={<Privacidade />} />
          <Route path="/legal/termos" element={<Termos />} />
          <Route path="/legal/cookies" element={<Cookies />} />
          <Route path="/" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
          <Route path="/links" element={<ProtectedRoute><AppLayout><LinkBuilder /></AppLayout></ProtectedRoute>} />
          <Route path="/journey" element={<ProtectedRoute><AppLayout><JourneyViewer /></AppLayout></ProtectedRoute>} />
          <Route path="/logs" element={<ProtectedRoute><AppLayout><Logs /></AppLayout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><AppLayout><IntegrationSettings /></AppLayout></ProtectedRoute>} />
          <Route path="/taxonomy" element={<ProtectedRoute><AppLayout><TaxonomyManager /></AppLayout></ProtectedRoute>} />
          <Route path="/naming" element={<ProtectedRoute><AppLayout><CampaignNaming /></AppLayout></ProtectedRoute>} />
          <Route path="/cron-status" element={<ProtectedRoute><AppLayout><CronStatus /></AppLayout></ProtectedRoute>} />
          <Route path="/identities" element={<ProtectedRoute><AppLayout><Identities /></AppLayout></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
