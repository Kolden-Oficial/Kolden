import {
  LayoutDashboard,
  Link2,
  Route,
  ScrollText,
  Settings,
  Zap,
  LogOut,
  Tags,
  Wand2,
  Activity,
  Users,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navSections = [
  {
    label: "ANALÍTICO",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Journey Viewer", url: "/journey", icon: Route },
    ],
  },
  {
    label: "FERRAMENTAS",
    items: [
      { title: "Link Builder", url: "/links", icon: Link2 },
      { title: "Nomenclaturas", url: "/naming", icon: Wand2 },
    ],
  },
  {
    label: "SISTEMA",
    items: [
      { title: "Catálogo & Taxonomia", url: "/taxonomy", icon: Tags },
      { title: "Identidades (CRM)", url: "/identities", icon: Users },
      { title: "Logs & Webhooks", url: "/logs", icon: ScrollText },
      { title: "Cron & Retries", url: "/cron-status", icon: Activity },
      { title: "Integrações", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-6">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-semibold text-base text-foreground tracking-tight">
                  Tracker Flow
                </span>
              </div>
            )}
            {collapsed && <Zap className="h-5 w-5 text-primary mx-auto" />}
          </SidebarGroupLabel>
        </SidebarGroup>

        {navSections.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className="hover:bg-sidebar-accent/50 transition-colors"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "Sair"}
        </Button>
        {!collapsed && (
          <div className="text-[10px] font-mono text-muted-foreground text-center">
            v1.0.0 • CDP Engine
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
