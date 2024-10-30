import { Box, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import ErrorMessage from "@/components/Atoms/ErrorMessage";
import FuzzyAutocomplete from "@/components/Atoms/FuzzyAutocomplete";
import PokemonPreview from "@/components/Molecules/PokemonPreview";

const TrainerForm = () => {
  const {
    formState: { errors },
    control,
    watch,
  } = useFormContext();

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
              required: true,
              minLength: 2,
              maxLength: 20,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                name="trainerName"
                placeholder="Trainer`s name"
                data-testid="trainerName"
              />
            )}
          />
          {errors.trainerName && (
            <ErrorMessage message="Required from 2 to 20 symbols" />
          )}
        </Stack>
        <Stack spacing={1}>
          <label htmlFor="trainerAge">Trainer`s age</label>
          <Controller
            name="trainerAge"
            control={control}
            rules={{
              required: true,
              min: 16,
              max: 99,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                name="trainerAge"
                placeholder="Trainer`s age"
                data-testid="trainerAge"
              />
            )}
          />
          {errors.trainerAge && (
            <ErrorMessage message="Required range from 16-99" />
          )}
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
