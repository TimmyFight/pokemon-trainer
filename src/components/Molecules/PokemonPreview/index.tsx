import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const PokemonPreview = () => {
  return (
    <Box
      sx={{
        height: 300,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#e4e4e4",
        borderRadius: 1,
      }}>
      <Stack
        spacing={2}
        sx={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography>Your pokemon</Typography>
      </Stack>
    </Box>
  );
};

export default PokemonPreview;
