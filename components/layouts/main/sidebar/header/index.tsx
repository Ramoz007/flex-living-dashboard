"use client";

import { FC } from "react";

import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export const NavTop: FC = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        >
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={"/static/icons/flex-icon.png"} alt="The Flex Living Icon" />
          </Avatar>
          <Label className="truncate">The Flex Living</Label>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
