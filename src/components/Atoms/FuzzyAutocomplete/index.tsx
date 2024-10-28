import { Autocomplete, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import ErrorMessage from "../ErrorMessage";

const FuzzyAutocomplete = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const values = [
    { name: "bulbasaur", id: 1 },
    { name: "charmander", id: 4 },
  ];

  return (
    <Stack spacing={1}>
      <label htmlFor="pokemonName">Trainer`s name</label>
      <Controller
        name="pokemonName"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { value } }) => (
          <Autocomplete
            id="pokemonName"
            value={value}
            options={values}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Choose" variant="outlined" />
            )}
          />
        )}
      />
      {errors.pokemonName && <ErrorMessage message="Choose something" />}
    </Stack>
  );
};

export default FuzzyAutocomplete;
