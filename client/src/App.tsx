import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import { SidebarProvider } from '@/components/ui/sidebar';
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

function Router() {
  return (
    <Switch>
      <Route path="/survey/:token" component={SurveyPublic} />
      
      <Route path="/">
        <Layout><Dashboard /></Layout>
      </Route>
      
      <Route path="/employees">
        <Layout><Employees /></Layout>
      </Route>
      
      <Route path="/surveys/builder">
        <Layout><SurveyBuilder /></Layout>
      </Route>
      
      <Route path="/surveys/distribute">
        <Layout><SurveyDistribution /></Layout>
      </Route>
      
      <Route path="/sociometry">
        <Layout><SociometricGraph /></Layout>
      </Route>
      
      <Route path="/teams">
        <Layout><TeamBuilder /></Layout>
      </Route>
      
      <Route path="/reports">
        <Layout><Reports /></Layout>
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
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
