import * as React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
//import { useAuth } from "../providers/auth";
import { Box } from "@mui/material";
import SideMenu from "../components/SideMenu";
import { AuthContext } from "../context/AuthContext";

export const Layout = () => {
  const { user, login } = React.useContext(AuthContext);

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <Outlet />
    </Box>
  );
};
