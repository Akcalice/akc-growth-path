import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";
import VisualEditorToolbar from "@/components/visual-editor/VisualEditorToolbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CmsContentProvider } from "./context/CmsContentContext";
import { VisualEditorProvider } from "./context/VisualEditorContext";
import Index from "./pages/Index";
import APropos from "./pages/APropos";
import Services from "./pages/Services";
import Accompagnement from "./pages/Accompagnement";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Prix from "./pages/Prix";
import RendezVous from "./pages/RendezVous";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminCms from "./pages/AdminCms";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CmsContentProvider>
        <BrowserRouter>
          <VisualEditorProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/services" element={<Services />} />
              <Route path="/accompagnement" element={<Accompagnement />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/prix" element={<Prix />} />
              <Route path="/rendez-vous" element={<RendezVous />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-cms" element={<AdminCms />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <VisualEditorToolbar />
          </VisualEditorProvider>
        </BrowserRouter>
      </CmsContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
