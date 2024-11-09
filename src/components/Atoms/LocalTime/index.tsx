"use client";

import { Stack } from "@mui/material";

interface Properties {
  localTime: string;
}

export default function LocalTime({ localTime }: Properties) {
  return (
    <Stack
      mb={4}
      direction="row"
      sx={{
        justifyContent: "flex-end",
      }}
      data-testid="localTime">
      {localTime}
    </Stack>
  );
}
