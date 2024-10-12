import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
//import { useAuth } from "../providers/auth";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});
//https://github.com/mui/material-ui/blob/v6.1.2/docs/data/material/getting-started/templates/dashboard/Dashboard.tsx
export default function SideMenu() {
  const { user, login, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: "none", md: "block" },
          [`& .${drawerClasses.paper}`]: {
            backgroundColor: "background.paper",
          },
        }}
      >
        <Stack
          direction='column'
          sx={{
            p: 2,
            gap: 1,
            alignItems: "center",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Link to='/'>
            <Typography variant='h5'>Dont Forget</Typography>
          </Link>

          <Box sx={{ mr: "auto" }}>
            <Stack>
              {user?.token ? (
                <>
                  <Avatar
                    sizes='small'
                    alt={user.firstName}
                    src='/static/images/avatar/7.jpg'
                    sx={{ width: 36, height: 36 }}
                  />
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 500, lineHeight: "16px" }}
                  >
                    {user ? user.firstName : null}
                  </Typography>
                  <Typography
                    variant='caption'
                    sx={{ color: "text.secondary" }}
                  >
                    {user.email}
                  </Typography>
                  <Link to='/'>Home</Link>

                  <Link to='/settings'>Settings</Link>

                  <Button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}
