import { Button, Paper, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import TrainerForm from "@/components/Molecules/TrainerForm";

const RegistrationForm = () => {
  const methods = useForm({
    defaultValues: {
      trainerName: "",
      trainerAge: 0,
      pokemonName: { name: "", id: 0 },
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSave = (data: TrainerDetails) => {
    console.log(data);
  };

  return (
    <Paper sx={{ padding: "20px" }}>
      <Typography>RegistrationForm</Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)}>
          <Stack spacing={4}>
            <TrainerForm />
            <Stack
              spacing={4}
              direction="row"
              sx={{
                justifyContent: "flex-end",
              }}>
              <Button
                onClick={() => reset()}
                variant="contained"
                color="secondary">
                RESET
              </Button>
              <Button type="submit" variant="contained">
                SUBMIT
              </Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default RegistrationForm;
