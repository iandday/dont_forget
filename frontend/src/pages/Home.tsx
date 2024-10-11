import { Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { authenticated } = useContext(AuthContext);
  return (
    <>
      {authenticated ? <Typography variant='h1'>Home</Typography> : <Typography variant='h1'>nope</Typography>}
    </>
  );
}
