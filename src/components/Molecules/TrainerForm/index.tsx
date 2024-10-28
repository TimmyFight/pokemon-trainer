import { Input, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

const TrainerForm = () => {
  const { register } = useFormContext();

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        sx={{
          justifyContent: "flex-end",
        }}>
        <Input {...register("trainerName")} placeholder="Trainer`s name" />
        <Input
          {...register("trainerAge")}
          placeholder="Trainer`s age"
          type="number"
        />
      </Stack>
      <Input {...register("pokemonName")} placeholder="Pokemon name" />
    </>
  );
};

export default TrainerForm;
