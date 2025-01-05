import { ProtectedRoute } from "@/components/protected-route";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useUserStore } from "@/store/user-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserStore();
  return (
    <ProtectedRoute>
      <>
        <ModeToggle />
        <div>
          Hello {user?.firstName} {user?.lastName} {user?.accessToken}!
        </div>
      </>
    </ProtectedRoute>
  );
}
