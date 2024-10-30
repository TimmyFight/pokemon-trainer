import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import { fetchLocalTime } from "@/app/api/actions";

const LocalTime = () => {
  const [localTime, setLocalTime] = useState("");
  const fetchLocalTimeHandler = async () => {
    try {
      const data = await fetchLocalTime();

      if (typeof data === "object" && "error" in data) {
        throw new Error(data.error);
      } else {
        const localTimeString = `${data?.dayOfWeek}, ${data?.day}.${data?.month}.${data?.year}`;
        setLocalTime(localTimeString);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLocalTimeHandler();
  }, []);

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
};

export default LocalTime;
