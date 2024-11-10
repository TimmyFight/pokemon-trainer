import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { fetchPokemonDetails } from "@/app/api/actions";
import PokemonPreview from "@/components/Molecules/PokemonPreview/index";

const WrapperComponent = ({ pokemonId = 25 }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonPreview pokemonId={pokemonId} />
    </QueryClientProvider>
  );
};

jest.mock("../../app/api/actions", () => ({
  fetchPokemonDetails: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("PokemonPreview Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    render(<WrapperComponent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders pokemon details after successful fetch", async () => {
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
        front_default: "https://example.com/pikachu.png",
      },
    };
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockData);

    render(<WrapperComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("pokemonPreview")).toBeInTheDocument();
    });

    expect(screen.getByText("Name: pikachu")).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
    expect(screen.getByText("Base experience: 112")).toBeInTheDocument();
    expect(screen.getByText("Id: 25")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png"
    );
  });

  it("renders error message when fetch fails", async () => {
    (fetchPokemonDetails as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    render(<WrapperComponent />);

    await waitFor(() => {
      expect(screen.getByText("Pokemon loading failed")).toBeInTheDocument();
    });
  });
});
