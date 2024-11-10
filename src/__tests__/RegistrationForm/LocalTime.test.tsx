import { render, screen, waitFor } from "@testing-library/react";

import LocalTime from "@/components/Atoms/LocalTime/index";

const mockTime = "Wednesday, 30.10.2024";

describe("LocalTime Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<LocalTime localTime={mockTime} />);
    expect(screen.getByTestId("localTime")).toBeInTheDocument();
  });

  it("displays the passed local time", async () => {
    render(<LocalTime localTime={mockTime} />);

    await waitFor(() => {
      expect(screen.getByTestId("localTime")).toHaveTextContent(
        "Wednesday, 30.10.2024"
      );
    });
  });
});
