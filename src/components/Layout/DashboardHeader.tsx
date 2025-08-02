import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, User, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function DashboardHeader() {
  const { user, signOut, company } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">{company?.logo || '🚀'}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-innovation bg-clip-text text-transparent">
                {company?.name || 'InovaPulse'}
              </span>
              <span className="text-xs text-muted-foreground">
                {company?.slug}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {company && (
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{company.employees_count} colaboradores</span>
            </div>
          )}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={signOut}>
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