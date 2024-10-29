import { Button, Paper, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import LocalTime from "@/components/Atoms/LocalTime";
import TrainerForm from "@/components/Molecules/TrainerForm";

const RegistrationForm = () => {
  const initialFormValues = {
    trainerName: "",
    trainerAge: 0,
    pokemon: { name: "", id: 0 },
  };

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { handleSubmit, reset } = methods;

  const handleSave = (data: TrainerDetails) => {
    console.log(data);
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <LocalTime />
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
                onClick={() => reset(initialFormValues)}
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
