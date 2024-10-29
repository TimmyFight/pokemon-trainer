import { promises as fs } from "fs";
import Fuse from "fuse.js";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const dataDirectory = path.join(process.cwd(), "src/data");
  const fileContents = await fs.readFile(
    dataDirectory + "/pokemon.json",
    "utf8"
  );
  const pokemons = JSON.parse(fileContents).data;

  if (!name) {
    return NextResponse.json(pokemons);
  }

  const fuse = new Fuse(pokemons, {
    keys: ["name"],
  });

  const filteredPokemons = fuse.search(name);

  return NextResponse.json(filteredPokemons);
}
