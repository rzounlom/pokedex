export interface Pokemon {
  id: string;
  name: string;
  type: string[];
  description: string;
  weaknesses: string[];
  height: string;
  weight: string;
  category: string;
  abilities: string;
  img: string;
}

export type NewPokemon = Omit<Pokemon, "id">;
