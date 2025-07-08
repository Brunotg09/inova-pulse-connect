import { useLocation, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
  Home,
  Users,
  MessageSquare,
  Trophy,
  Lightbulb,
  GraduationCap,
  BarChart3,
  Settings,
  UserCheck
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

const mainItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Treinamentos', url: '/trainings', icon: GraduationCap },
  { title: 'Desafios', url: '/challenges', icon: Trophy },
  { title: 'Feedbacks', url: '/feedbacks', icon: MessageSquare },
  { title: 'Sugestões', url: '/suggestions', icon: Lightbulb },
  { title: 'Pesquisas', url: '/surveys', icon: UserCheck },
];

const teamItems = [
  { title: 'Minha Equipe', url: '/team', icon: Users },
  { title: 'Desafios da Equipe', url: '/team/challenges', icon: Trophy },
  { title: 'Feedbacks da Equipe', url: '/team/feedbacks', icon: MessageSquare },
];

const adminItems = [
  { title: 'Administração', url: '/admin', icon: Settings },
  { title: 'Equipes', url: '/admin/teams', icon: Users },
  { title: 'Configurações', url: '/admin/settings', icon: Settings },
];

const analyticsItems = [
  { title: 'Relatórios', url: '/analytics', icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { companySlug } = useParams<{ companySlug: string }>();
  const { user } = useAuth();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;
  
  // Função para criar URLs com o slug da empresa
  const createCompanyUrl = (path: string) => `/${companySlug}${path}`;

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'} collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={createCompanyUrl(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Equipe</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teamItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={createCompanyUrl(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Análises</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={createCompanyUrl(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user?.role === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administração</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link to={createCompanyUrl(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}