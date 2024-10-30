import { render, screen, waitFor } from "@testing-library/react";

import { fetchLocalTime } from "@/app/api/actions";
import LocalTime from "@/components/Atoms/LocalTime/index";

jest.mock("../../app/api/actions", () => ({
  fetchLocalTime: jest.fn(),
}));

describe("LocalTime Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<LocalTime />);
    expect(screen.getByTestId("localTime")).toBeInTheDocument();
  });

  it("initially renders an empty string", () => {
    render(<LocalTime />);
    const localTimeElement = screen.getByTestId("localTime");
    expect(localTimeElement).toHaveTextContent("");
  });

  it("calls fetchLocalTime on mount", () => {
    render(<LocalTime />);
    expect(fetchLocalTime).toHaveBeenCalledTimes(1);
  });

  it("displays the fetched local time", async () => {
    const mockData = {
      dayOfWeek: "Wednesday",
      day: "30",
      month: "10",
      year: "2024",
    };
    (fetchLocalTime as jest.Mock).mockResolvedValue(mockData);

    render(<LocalTime />);

    await waitFor(() => {
      expect(screen.getByTestId("localTime")).toHaveTextContent(
        "Wednesday, 30.10.2024"
      );
    });
  });

  it("handles API error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (fetchLocalTime as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<LocalTime />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("API Error"));
    });

    expect(screen.getByTestId("localTime")).toHaveTextContent("");

    consoleErrorSpy.mockRestore();
  });

  it("handles error response from API", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (fetchLocalTime as jest.Mock).mockResolvedValue({ error: "API Error" });

    render(<LocalTime />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("API Error"));
    });

    expect(screen.getByTestId("localTime")).toHaveTextContent("");

    consoleErrorSpy.mockRestore();
  });
});
