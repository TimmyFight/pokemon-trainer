import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchPokemonDetails } from "@/app/api/actions";
import ErrorMessage from "@/components/Atoms/ErrorMessage";
import PokemonTypes from "@/components/Atoms/PokemonTypes";

interface Properties {
  pokemonId: number;
}

const PokemonPreview = ({ pokemonId }: Properties) => {
  const [choosenPokemon, setChoosenPokemon] = useState<
    PokemonDetails | undefined
  >();

  const fetchPokemonDetailsHandler = async () => {
    try {
      const data = await fetchPokemonDetails({ pokemonId });

      if (typeof data === "object" && "error" in data) {
        throw new Error(data.error);
      } else {
        setChoosenPokemon(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonDetailsHandler();
  }, [pokemonId]);

  if (!choosenPokemon) return <ErrorMessage message="Fetch error" />;

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
};

export default PokemonPreview;
