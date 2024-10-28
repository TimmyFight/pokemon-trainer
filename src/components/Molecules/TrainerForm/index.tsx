import { Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import ErrorMessage from "@/components/Atoms/ErrorMessage";
import FuzzyAutocomplete from "@/components/Atoms/FuzzyAutocomplete";

const TrainerForm = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        sx={{
          justifyContent: "flex-end",
        }}>
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
              />
            )}
          />
          {errors.trainerAge && (
            <ErrorMessage message="Required range from 16-99" />
          )}
        </Stack>
      </Stack>
      <FuzzyAutocomplete />
    </>
  );
};

export default TrainerForm;
