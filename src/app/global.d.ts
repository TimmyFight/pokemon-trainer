interface Pokemon {
  name: string;
  id: number;
}

interface TrainerDetails {
  trainerName: string;
  trainerAge: number | null;
  pokemon: Pokemon;
}

interface FuseFilterResult {
  item: Pokemon;
  refIndex: number;
}

interface LocalTimeResponse {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  types: PokemonType[];
  sprites: { front_default: string };
}
