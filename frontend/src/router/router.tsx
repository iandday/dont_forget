import * as React from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";

//import { AuthenticationGuard } from "../components/AuthenticationGuard";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import { AuthContext } from "../context/AuthContext";
import { Layout } from "../layouts/Layout";

type Props = {};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = React.useContext(AuthContext);
  return user?.token ? <>{children}</> : <Navigate to='/login' />;
};

const Routes = (props: Props) => {
  return (
    <Router>
      <Route element={<Layout />}>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='settings'
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Router>
  );
};

export default Routes;
