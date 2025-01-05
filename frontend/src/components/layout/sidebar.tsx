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
import {
  Sidebar as CatalystSidebar,
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
  PencilSquareIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
  ShoppingCartIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Subheading } from "@/components/heading";
import { useUserStore } from "@/store/user-store";
import { Footer } from "@/components/layout/footer";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { UserInterface } from "@/store/user-store";

interface SidebarProps {
  user: UserInterface;
}
const unAuthRoutes = [
  {
    path: "/login",
    icon: <ArrowLeftEndOnRectangleIcon />,
    label: "Login",
    airaLabel: "Login",
  },
  {
    path: "/register",
    icon: <PencilSquareIcon />,
    label: "Register",
    airaLabel: "Register",
  },
  {
    path: "/forgot-password",
    icon: <QuestionMarkCircleIcon />,
    label: "Forgot Password",
    ariaLabel: "Forgot Password",
  },
];

const authRoutes = [
  {
    path: "/about",
    icon: <QuestionMarkCircleIcon />,
    label: "About",
    airaLabel: "About",
  },
];

export function Sidebar({ user }: SidebarProps) {
  return (
    <CatalystSidebar>
      <SidebarHeader>
        <SidebarItem href='/'>
          <ShoppingCartIcon />
          <Subheading>Don't Forget</Subheading>
        </SidebarItem>
        <SidebarSpacer />

        {/* <SidebarSection className='max-lg:hidden'>
          <SidebarItem href='/search'>
            <MagnifyingGlassIcon />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          <SidebarItem href='/inbox'>
            <InboxIcon />
            <SidebarLabel>Inbox</SidebarLabel>
          </SidebarItem>
        </SidebarSection> */}
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href='/'>
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          {user?.accessToken === undefined
            ? unAuthRoutes.map((route, index) => (
                <SidebarItem
                  href={route.path}
                  key={index}
                >
                  {route.icon}
                  <SidebarLabel>{route.label}</SidebarLabel>
                </SidebarItem>
              ))
            : authRoutes.map((route, index) => (
                <SidebarItem
                  href={route.path}
                  key={index}
                >
                  {route.icon}
                  <SidebarLabel>{route.label}</SidebarLabel>
                </SidebarItem>
              ))}
        </SidebarSection>
        <SidebarSection className='max-lg:hidden'>
          <SidebarHeading>Upcoming Events</SidebarHeading>
          <SidebarItem href='/events/1'>Bear Hug: Live in Concert</SidebarItem>
          <SidebarItem href='/events/2'>Viking People</SidebarItem>
          <SidebarItem href='/events/3'>Six Fingers — DJ Set</SidebarItem>
          <SidebarItem href='/events/4'>We All Look The Same</SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem href='/support'>
            <QuestionMarkCircleIcon />
            <SidebarLabel>Support</SidebarLabel>
          </SidebarItem>

          <SidebarItem href='/changelog'>
            <SparklesIcon />
            <SidebarLabel>Changelog</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      {user?.accessToken !== undefined && <Footer />}
    </CatalystSidebar>
  );
}
