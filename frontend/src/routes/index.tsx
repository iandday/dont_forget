import { useUserStore } from "@/store/user-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUserStore();

  return <div>Hello {user?.firstName} from "/"!</div>;
}
