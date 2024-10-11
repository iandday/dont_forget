import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useColorScheme } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function Settings() {
  const { mode, setMode } = useColorScheme();

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
          minHeight: "56px",
        }}
      >
        <FormControl>
          <FormLabel id='demo-theme-toggle'>Theme</FormLabel>
          <RadioGroup
            aria-labelledby='demo-theme-toggle'
            name='theme-toggle'
            row
            value={mode}
            onChange={(event) => setMode(event.target.value as "system" | "light" | "dark")}
          >
            <FormControlLabel
              value='system'
              control={<Radio />}
              label='System'
            />
            <FormControlLabel
              value='light'
              control={<Radio />}
              label='Light'
            />
            <FormControlLabel
              value='dark'
              control={<Radio />}
              label='Dark'
            />
          </RadioGroup>
        </FormControl>
        <Typography
          variant='h4'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Hello
        </Typography>
      </Box>
    </Container>
  );
}
