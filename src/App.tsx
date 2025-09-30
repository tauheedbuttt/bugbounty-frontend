import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./stores/auth";
import { AppRouter } from "./router/AppRouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ThemeProvider>
              <LanguageProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <AppRouter />
                </BrowserRouter>
              </LanguageProvider>
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
