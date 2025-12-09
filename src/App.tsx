import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Personnel from "./pages/Personnel";
import Departments from "./pages/Departments";
import Grades from "./pages/Grades";
import Promotions from "./pages/Promotions";
import Certificates from "./pages/Certificates";
import Archives from "./pages/Archives";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
