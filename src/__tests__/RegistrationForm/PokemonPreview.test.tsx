import { render, screen, waitFor } from "@testing-library/react";

import { fetchPokemonDetails } from "@/app/api/actions";
import PokemonPreview from "@/components/Molecules/PokemonPreview/index";

jest.mock("../../app/api/actions", () => ({
  fetchPokemonDetails: jest.fn(),
}));

describe("PokemonPreview Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    const mockData = {
      id: 25,
      name: "pikachu",
      base_experience: 112,
      types: [
        {
          type: {
            name: "electric",
            url: "https://pokeapi.co/api/v2/type/13/",
          },
        },
      ],
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
      },
    };
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockData);

    render(<PokemonPreview pokemonId={25} />);

    await waitFor(() => {
      expect(screen.getByTestId("pokemonPreview")).toBeInTheDocument();
    });
  });

  it("calls fetchPokemonDetails on mount", () => {
    render(<PokemonPreview pokemonId={25} />);
    expect(fetchPokemonDetails).toHaveBeenCalledTimes(1);
  });

  it("displays the fetched pokemon", async () => {
    const mockData = {
      id: 25,
      name: "pikachu",
      base_experience: 112,
      types: [
        {
          type: {
            name: "electric",
            url: "https://pokeapi.co/api/v2/type/13/",
          },
        },
      ],
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
      },
    };
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockData);

    render(<PokemonPreview pokemonId={25} />);

    await waitFor(() => {
      const pokemonPreview = screen.getByTestId("pokemonPreview");
      expect(pokemonPreview.querySelector("img")).toHaveAttribute(
        "src",
        "/_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2FPokeAPI%2Fsprites%2Fmaster%2Fsprites%2Fpokemon%2Fback%2F25.png&w=256&q=75"
      );

      expect(screen.getByText("Name: pikachu")).toBeTruthy();

      expect(screen.getByText("electric")).toBeTruthy();

      expect(screen.getByText("Base experience: 112")).toBeTruthy();

      expect(screen.getByText("Id: 25")).toBeTruthy();
    });
  });

  it("handles API error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (fetchPokemonDetails as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    render(<PokemonPreview pokemonId={25} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("API Error"));
    });

    expect(screen.getByText("Fetch error")).toBeTruthy();

    consoleErrorSpy.mockRestore();
  });

  it("handles error response from API", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (fetchPokemonDetails as jest.Mock).mockResolvedValue({
      error: "API Error",
    });

    render(<PokemonPreview pokemonId={25} />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("API Error"));
    });

    expect(screen.getByText("Fetch error")).toBeTruthy();

    consoleErrorSpy.mockRestore();
  });
});
