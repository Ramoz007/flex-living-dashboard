"use client";

import Link from "next/link";
import { FC, Fragment, JSX } from "react";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LocalPath } from "@/utilities/types/enum";
import { MenuItem } from "@/utilities/types/utilities";
import { OVERVIEW_SIDEBAR_MENU_ITEMS } from "@/utilities/constants/general";

export const NavMain: FC = () => {
  const pathname = usePathname();
  const renderMenuItems = (menuItems: MenuItem[]): JSX.Element[] =>
    menuItems.map((item) => {
      const itemPath = item.pathname || LocalPath.HOME;
      const isActive = Boolean(item.pathname) && pathname.startsWith(itemPath);
      return (
        <Fragment key={item.title}>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={isActive ? "bg-sidebar-accent text-sidebar-primary" : ""}
            >
              <Link href={itemPath}>
                {item.icon && <item.icon size={20} />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Fragment>
      );
    });
  return (
    <>
      {OVERVIEW_SIDEBAR_MENU_ITEMS.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>{renderMenuItems(OVERVIEW_SIDEBAR_MENU_ITEMS)}</SidebarMenu>
        </SidebarGroup>
      )}
    </>
  );
};
