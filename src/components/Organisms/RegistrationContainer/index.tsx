import { Paper } from "@mui/material";

import LocalTime from "@/components/Atoms/LocalTime";
import RegistrationForm from "@/components/Molecules/RegistrationForm";

async function fetchLocalTime() {
  const response = await fetch(
    "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw",
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch local time.");
  }

  const localTime = await response.json();
  return `${localTime.dayOfWeek}, ${localTime.day}.${localTime.month}.${localTime.year}`;
}

export default async function RegistrationContainer() {
  const localTime = await fetchLocalTime();

  return (
    <Paper sx={{ padding: 4 }}>
      {<LocalTime localTime={localTime} />}
      <RegistrationForm />
    </Paper>
  );
}
