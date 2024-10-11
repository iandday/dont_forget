import * as React from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";

//import { AuthenticationGuard } from "../components/AuthenticationGuard";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Home from "../pages/Home";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = React.useContext(AuthContext);
  const { authenticated, login } = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  return authenticated ? <>{children}</> : <Navigate to='/login' />;
};

const Routes = (props: Props) => {
  const authContext = React.useContext(AuthContext);
  const { authenticated, login } = React.useContext(AuthContext);
  return (
    <Router>
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
    </Router>
  );
};

export default Routes;
