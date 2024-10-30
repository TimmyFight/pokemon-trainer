"use client";

import { Autocomplete, Stack, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import ErrorMessage from "@/components/Atoms/ErrorMessage";

interface PokemonOption {
  name: string;
}

function FuzzyAutocomplete() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState<PokemonOption[]>([]);
  const [loading, setLoading] = useState(false);

  const pokemonWatcher = watch("pokemon");
  useEffect(() => {
    if (pokemonWatcher === null || pokemonWatcher.name === "") {
      setOptions([]);
    }
  }, [pokemonWatcher?.name]);

  const fetchSuggestions = async (pokemonName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`./api/search?name=${pokemonName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      const preparedSuggestions = data.map(
        (suggestion: FuseFilterResult) => suggestion.item
      );
      setOptions(preparedSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  return (
    <Stack spacing={1}>
      <label htmlFor="pokemon">Pokemon name</label>
      <Controller
        name="pokemon"
        control={control}
        rules={{
          validate: (value) => value.name.trim() !== "",
        }}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="pokemon"
            options={options}
            getOptionLabel={(option) => option?.name ?? ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Pokemon"
                variant="outlined"
                data-testid="pokemon"
              />
            )}
            value={value || null}
            onChange={(_, newValue) => {
              onChange(newValue);
            }}
            onInputChange={(_, newInputValue) => {
              if (newInputValue) {
                debouncedFetchSuggestions(newInputValue);
              }
            }}
            loading={loading}
            filterOptions={(x) => x}
            renderOption={(props, option) => {
              const safeProps = { ...props };
              delete safeProps.key;
              return (
                <li {...safeProps} key={option.name}>
                  {option.name}
                </li>
              );
            }}
          />
        )}
      />
      {errors.pokemon && <ErrorMessage message="Choose something" />}
    </Stack>
  );
}

export default FuzzyAutocomplete;
