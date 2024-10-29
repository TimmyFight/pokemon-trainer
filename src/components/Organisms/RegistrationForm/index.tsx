import { Button, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import LocalTime from "@/components/Atoms/LocalTime";
import SuccessDialog from "@/components/Atoms/SuccessDialog";
import TrainerForm from "@/components/Molecules/TrainerForm";

const RegistrationForm = () => {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
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
    setOpenSuccessDialog(true);
  };

  const handleClose = () => {
    reset(initialFormValues);
    setOpenSuccessDialog(false);
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
          <SuccessDialog
            openSuccessDialog={openSuccessDialog}
            handleClose={handleClose}
          />
        </form>
      </FormProvider>
    </Paper>
  );
};

export default RegistrationForm;
