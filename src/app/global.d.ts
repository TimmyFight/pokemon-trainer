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
