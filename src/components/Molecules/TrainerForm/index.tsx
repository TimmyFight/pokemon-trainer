import { Box, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import FuzzyAutocomplete from "@/components/Atoms/FuzzyAutocomplete";
import PokemonPreview from "@/components/Molecules/PokemonPreview";

const TrainerForm = () => {
  const { control, watch } = useFormContext();

  const pokemonWatcher = watch("pokemon");

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        sx={{
          justifyContent: "flex-end",
        }}
        data-testid="trainerForm">
        <Stack spacing={1}>
          <label htmlFor="trainerName">Trainer`s name</label>
          <Controller
            name="trainerName"
            control={control}
            rules={{
              required: "Trainer`s name is required",
              minLength: { value: 2, message: "Minimum length is 2" },
              maxLength: { value: 20, message: "Maximum length is 20" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="text"
                name="trainerName"
                placeholder="Trainer`s name"
                data-testid="trainerName"
                error={!!error}
                helperText={error?.message || " "}
              />
            )}
          />
        </Stack>
        <Stack spacing={1}>
          <label htmlFor="trainerAge">Trainer`s age</label>
          <Controller
            name="trainerAge"
            control={control}
            rules={{
              required: "Trainer`s age is required",
              min: { value: 16, message: "Minimum age is 16" },
              max: { value: 99, message: "Maximum age is 99" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                name="trainerAge"
                placeholder="Trainer`s age"
                data-testid="trainerAge"
                error={!!error}
                helperText={error?.message || " "}
              />
            )}
          />
        </Stack>
      </Stack>
      <FuzzyAutocomplete />
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
          {pokemonWatcher?.id ? (
            <PokemonPreview pokemonId={pokemonWatcher.id} />
          ) : (
            <Typography>Your pokemon</Typography>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default TrainerForm;
