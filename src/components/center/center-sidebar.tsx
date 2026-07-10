'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Building, Users, Brain, FileText, TrendingUp, Settings, LogOut, BarChart3, Zap, MessageSquare } from 'lucide-react';
import { Logo } from '../common/logo';

const menuItems = [
  { href: '/center', label: 'Tổng quan', icon: BarChart3 },
  { href: '/center/patients', label: 'Bệnh nhân', icon: Users },
  { href: '/center/ai-flows', label: 'AI Flows', icon: Brain },
  { href: '/center/reports', label: 'Báo cáo', icon: FileText },
  { href: '/center/analytics', label: 'Thống kê', icon: TrendingUp },
  { href: '/center/ai-agent', label: 'AI Agent', icon: MessageSquare },
  { href: '/center/integrations', label: 'Tích hợp', icon: Zap },
  { href: '/center/settings', label: 'Cài đặt', icon: Settings },
];

export function CenterSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r bg-card hidden md:block">
      <SidebarHeader className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden lg:block">
            <p className="font-bold text-sm">MSG AI</p>
            <p className="text-xs text-muted-foreground">Center</p>
          </div>
        </div>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href || pathname.startsWith(item.href)}
                  tooltip={item.label}
                  asChild
                >
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 h-12 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-left overflow-hidden">
                <p className="font-medium text-sm truncate">Admin</p>
                <p className="text-muted-foreground text-xs truncate">msg@medicalsaigon.vn</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin</p>
                <p className="text-xs leading-none text-muted-foreground">msg@medicalsaigon.vn</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Cài đặt tài khoản</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
