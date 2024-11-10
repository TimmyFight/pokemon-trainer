import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";

import RegistrationForm from "@/components/Molecules/RegistrationForm";

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

describe("RegistrationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields and buttons", () => {
    render(<WrapperComponent />);

    expect(screen.getByTestId("trainerName")).toBeInTheDocument();
    expect(screen.getByTestId("trainerAge")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon")).toBeInTheDocument();
    expect(screen.getByText("Your pokemon")).toBeInTheDocument();
    expect(screen.getByText("RESET")).toBeInTheDocument();
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
  });

  it("displays error messages for invalid inputs on form submission", async () => {
    render(<WrapperComponent />);
    const user = userEvent.setup();

    const nameInput = screen.getByTestId("trainerName");
    const ageInput = screen.getByTestId("trainerAge");
    const submitButton = screen.getByTestId("submitRegistrationForm");

    await user.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText("Trainer`s name is required")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Minimum age is 16")).toBeInTheDocument();
    });
  });
});
