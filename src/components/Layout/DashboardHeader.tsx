import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🚀</span>
            </div>
            <span className="font-bold text-xl bg-gradient-innovation bg-clip-text text-transparent">
              InovaPulse
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={logout}>
            <User className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Olá, {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}