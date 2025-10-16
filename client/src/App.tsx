import { useState, useEffect, useRef } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from 'next-themes';
import AppSidebar from '@/components/AppSidebar';
import Navbar from '@/components/Navbar';
import Dashboard from '@/pages/Dashboard';
import Employees from '@/pages/Employees';
import SurveyBuilder from '@/pages/SurveyBuilder';
import SurveyDistribution from '@/pages/SurveyDistribution';
import SurveyPublic from '@/pages/SurveyPublic';
import SociometricGraph from '@/pages/SociometricGraph';
import TeamBuilder from '@/pages/TeamBuilder';
import Reports from '@/pages/Reports';
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { useCurrentUser } from "@/hooks/use-auth";

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pageTitles: Record<string, string> = {
    '/': t('nav.dashboard'),
    '/employees': t('nav.employees'),
    '/surveys/builder': t('nav.builder'),
    '/surveys/distribute': t('nav.distribute'),
    '/sociometry': t('nav.sociometry'),
    '/teams': t('nav.teams'),
    '/reports': t('nav.reports'),
  };

  const currentTitle = pageTitles[location] || 'SocioTeam';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar title={currentTitle} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { user, isLoading } = useCurrentUser();
  const [location, navigate] = useLocation();
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (!isLoading && !user && !redirectingRef.current) {
      redirectingRef.current = true;
      const params = new URLSearchParams();
      params.set("next", location);
      navigate(`/login?${params.toString()}`);
    }
  }, [isLoading, user, location, navigate]);

  if (isLoading || (!user && !redirectingRef.current)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <span className="text-sm text-muted-foreground">
          {t('common.loading')}
        </span>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Layout>{children}</Layout>;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/survey/:token" component={SurveyPublic} />
      
      <Route path="/">
        <ProtectedLayout><Dashboard /></ProtectedLayout>
      </Route>
      
      <Route path="/employees">
        <ProtectedLayout><Employees /></ProtectedLayout>
      </Route>
      
      <Route path="/surveys/builder">
        <ProtectedLayout><SurveyBuilder /></ProtectedLayout>
      </Route>
      
      <Route path="/surveys/distribute">
        <ProtectedLayout><SurveyDistribution /></ProtectedLayout>
      </Route>
      
      <Route path="/sociometry">
        <ProtectedLayout><SociometricGraph /></ProtectedLayout>
      </Route>
      
      <Route path="/teams">
        <ProtectedLayout><TeamBuilder /></ProtectedLayout>
      </Route>
      
      <Route path="/reports">
        <ProtectedLayout><Reports /></ProtectedLayout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    i18n.loadNamespaces('translation');
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
