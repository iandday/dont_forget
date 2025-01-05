import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SidebarLayout } from "@/components/sidebar-layout";
import { useUserStore } from "@/store/user-store";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserStore();
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <SidebarLayout
        navbar={<Navbar />}
        sidebar={<Sidebar user={user} />}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      >
        <Outlet />
        {/* <TanStackRouterDevtools position='bottom-right' /> */}
      </SidebarLayout>
    </>
  );
}
