"use client";

import { Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import standardTheme from "@/app/standardTheme";
import RegistrationForm from "@/components/Organisms/RegistrationForm";

export default function Home() {
  return (
    <div>
      <main>
        <ThemeProvider theme={standardTheme}>
          <CssBaseline />
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
            <RegistrationForm />
          </Stack>
        </ThemeProvider>
      </main>
    </div>
  );
}
