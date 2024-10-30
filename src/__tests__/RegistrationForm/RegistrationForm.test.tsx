import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

import RegistrationForm from "@/components/Organisms/RegistrationForm/index";

const WrapperComponent = ({ validValues = false }) => {
  const initialFormValues = {
    trainerName: "",
    trainerAge: 0,
    pokemon: { name: "", id: 0 },
  };

  const validFormValues = {
    trainerName: "Name",
    trainerAge: 40,
    pokemon: { name: "pikachu", id: 25 },
  };

  const methods = useForm({
    defaultValues: validValues ? validFormValues : initialFormValues,
  });
  return (
    <FormProvider {...methods}>
      <RegistrationForm />
    </FormProvider>
  );
};

describe("TrainerForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields", () => {
    render(<WrapperComponent />);

    expect(screen.getByTestId("trainerName")).toBeInTheDocument();
    expect(screen.getByTestId("trainerAge")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon")).toBeInTheDocument();
    expect(screen.getByText("Your pokemon")).toBeInTheDocument();
  });
});
