import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LanguageSelector from './LanguageSelector';
import { Network, User, LogOut, Menu } from 'lucide-react';

interface NavbarProps {
  title: string;
  onMenuClick?: () => void;
}

export default function Navbar({ title, onMenuClick }: NavbarProps) {
  const { t } = useTranslation();

  return (
    <header className="h-16 border-b bg-card px-4 flex items-center justify-between gap-4 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            data-testid="button-menu-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Network className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg hidden sm:inline">SocioTeam</span>
        </div>
      </div>

      <h1 className="text-lg font-medium hidden md:block">{title}</h1>

      <div className="flex items-center gap-2">
        <LanguageSelector />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2" data-testid="button-user-menu">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem data-testid="menu-item-profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="menu-item-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
