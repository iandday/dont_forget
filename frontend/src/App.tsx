import type { LoaderFunctionArgs } from "react-router-dom";
import {
  BrowserRouter,
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";

import Routes from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import SideMenu from "./components/SideMenu";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}
