import { Chip, Stack, Typography } from "@mui/material";

interface Properties {
  pokemonTypes: PokemonType[];
}

const PokemonTypes = ({ pokemonTypes }: Properties) => {
  return (
    <Stack direction={"row"} spacing={2}>
      <Typography>Type:</Typography>
      {pokemonTypes.map((pokemonType) => (
        <Chip key={pokemonType.type.name} label={pokemonType.type.name} color="primary" />
      ))}
    </Stack>
  );
};

export default PokemonTypes;
