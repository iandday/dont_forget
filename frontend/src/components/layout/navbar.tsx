import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { Avatar } from "@/components/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import { Navbar as CatalystNavbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "@/components/sidebar";
import { SidebarLayout } from "@/components/sidebar-layout";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { Subheading } from "@/components/heading";
import { useUserStore } from "@/store/user-store";

import { useState } from "react";

export function Navbar() {
  return (
    <CatalystNavbar>
      <NavbarSpacer />
      <NavbarItem>
        <ShoppingCartIcon />
        <Subheading>Don't Forget</Subheading>
      </NavbarItem>
      <NavbarSpacer />
      <NavbarSection>
        <NavbarItem
          href='/search'
          aria-label='Search'
        >
          <MagnifyingGlassIcon />
        </NavbarItem>
        <NavbarItem
          href='/inbox'
          aria-label='Inbox'
        >
          <InboxIcon />
        </NavbarItem>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar
              src='/vite.svg'
              square
            />
          </DropdownButton>
          <DropdownMenu
            className='min-w-64'
            anchor='bottom end'
          >
            <DropdownItem href='/my-profile'>
              <UserIcon />
              <DropdownLabel>My profile</DropdownLabel>
            </DropdownItem>
            <DropdownItem href='/settings'>
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href='/privacy-policy'>
              <ShieldCheckIcon />
              <DropdownLabel>Privacy policy</DropdownLabel>
            </DropdownItem>
            <DropdownItem href='/share-feedback'>
              <LightBulbIcon />
              <DropdownLabel>Share feedback</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href='/logout'>
              <ArrowRightStartOnRectangleIcon />
              <DropdownLabel>Sign out</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarSection>
    </CatalystNavbar>
  );
}
