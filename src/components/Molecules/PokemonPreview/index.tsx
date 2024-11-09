import { Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { fetchPokemonDetails } from "@/app/api/actions";
import PokemonTypes from "@/components/Atoms/PokemonTypes";

interface Properties {
  pokemonId: number;
}

const PokemonPreview = ({ pokemonId }: Properties) => {
  const {
    data: choosenPokemon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => fetchPokemonDetails({ pokemonId }),
  });

  if (isLoading) {
    return <Typography variant="body2">Loading...</Typography>;
  }

  if (isError || !choosenPokemon) {
    return (
      <Typography color="error" variant="body2">
        Pokemon loading failed
      </Typography>
    );
  }

  if ("name" in choosenPokemon) {
    return (
      <Stack
        spacing={4}
        direction="row"
        sx={{
          alignItems: "center",
        }}
        data-testid="pokemonPreview">
        <Stack>
          <Image
            width={100}
            height={100}
            alt={"Pokemon image"}
            title={"Pokemon image"}
            src={choosenPokemon.sprites.front_default}
          />
        </Stack>
        <Stack>
          <Typography>Name: {choosenPokemon.name}</Typography>
          <PokemonTypes pokemonTypes={choosenPokemon.types} />
          <Typography>
            Base experience: {choosenPokemon?.base_experience}
          </Typography>
          <Typography>Id: {choosenPokemon.id}</Typography>
        </Stack>
      </Stack>
    );
  }
};

export default PokemonPreview;
