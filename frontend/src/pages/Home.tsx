import { Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";
export default function Home() {
  const { user, login } = useContext(AuthContext);
  return (
    <>
      <Typography variant='h4'>Home</Typography>
      {user?.token ? (
        <Typography variant='h4'>{user?.lastName}</Typography>
      ) : (
        <Typography variant='h4'>nope</Typography>
      )}
    </>
  );
}
