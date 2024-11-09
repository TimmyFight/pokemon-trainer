type ErrorResponse = { error: string };

interface FetchPokemonDetailsQuery {
  pokemonId: number;
}

export async function fetchPokemonDetails({
  pokemonId,
}: FetchPokemonDetailsQuery): Promise<PokemonDetails | ErrorResponse> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch pokemon details.");
    }
    const data = await response.json();

    return data;
  } catch (error: any) {
    return error;
  }
}
