import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { settingsSharp, homeSharp } from "ionicons/icons";

interface Route {
  path: string;
  exact: boolean;
  title: string;
  icon: any;
  component: React.ComponentType;
}

const routes: Route[] = [
  {
    path: "/",
    title: "Home",
    icon: homeSharp,
    exact: true,
    component: Home,
  },
  {
    path: "/settings",
    title: "Settings",
    icon: settingsSharp,
    exact: true,
    component: Settings,
  },
];

export default routes;
