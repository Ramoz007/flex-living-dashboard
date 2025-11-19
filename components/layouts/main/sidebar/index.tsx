"use client";

import React from "react";

import { NavMain } from "@/components/layouts/main/sidebar/main";
import { NavTop } from "@/components/layouts/main/sidebar/header";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>): React.JSX.Element => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavTop />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
