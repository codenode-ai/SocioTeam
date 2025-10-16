import AppSidebar from '../AppSidebar';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Router } from 'wouter';

export default function AppSidebarExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
          </div>
        </SidebarProvider>
      </Router>
    </I18nextProvider>
  );
}
