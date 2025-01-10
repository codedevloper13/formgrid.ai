"use client";

import * as React from "react";
import {
  BookOpen,
  ChartNoAxesCombined,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  MonitorSmartphone,
  ShieldPlus,
  House,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";

import { useUser } from "@clerk/nextjs";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Progress } from "./ui/progress";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "My Forms",
      url: "/forms",
      icon: BookOpen,
    },
    {
      title: "Responses",
      url: "/responses",
      icon: MonitorSmartphone,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Entries",
          url: "form-entries",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Upgradge",
      url: "/upgradges",
      icon: ShieldPlus,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const userData = {
    user: {
      name: user?.fullName || "Shadcn",
      email: user?.emailAddresses[0]?.emailAddress || "m@example.com",
      avatar: user?.imageUrl || "/avatars/shadcn.jpg",
    },
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 3L17 8L12 13L7 8L12 3Z" />
                    <path d="M17 8L21 12L17 16L13 12L17 8Z" />
                    <path d="M7 8L3 12L7 16L11 12L7 8Z" />
                    <path d="M12 13L17 18L12 21L7 18L12 13Z" />
                    <circle cx="12" cy="3" r="0.5" fill="white" />
                    <circle cx="17" cy="8" r="0.5" fill="white" />
                    <circle cx="7" cy="8" r="0.5" fill="white" />
                    <circle cx="12" cy="13" r="0.5" fill="white" />
                    <circle cx="12" cy="21" r="0.5" fill="white" />
                    <path d="M12 3v18" strokeDasharray="1 2" strokeWidth="1" />
                  </svg>
                </div>
                <span className="ml-3 text-xl font-semibold text-primary">
                  Formgrid.ai
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />

        <SidebarSeparator />
      </SidebarContent>

      <div className="p-2 w-70 mt-5">
        <Progress value={33} />
        <h2 className="text-sm text-muted-foreground mt-2">
          2 of of 3 forms created
        </h2>
        <p className="text-xs text-muted-foreground mt-2">
          Upgrade plan to create unlimited forms
        </p>
      </div>

      <SidebarFooter>
        <NavUser user={userData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
