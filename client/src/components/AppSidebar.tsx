import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  FileText,
  Send,
  Network,
  UsersRound,
  FileBarChart,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', href: '/' },
  { icon: Users, labelKey: 'nav.employees', href: '/employees' },
  { icon: FileText, labelKey: 'nav.builder', href: '/surveys/builder' },
  { icon: Send, labelKey: 'nav.distribute', href: '/surveys/distribute' },
  { icon: Network, labelKey: 'nav.sociometry', href: '/sociometry' },
  { icon: UsersRound, labelKey: 'nav.teams', href: '/teams' },
  { icon: FileBarChart, labelKey: 'nav.reports', href: '/reports' },
];

export default function AppSidebar() {
  const { t } = useTranslation();
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pt-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.href}
                    data-testid={`link-${item.labelKey.split('.')[1]}`}
                  >
                    <a href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{t(item.labelKey)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
