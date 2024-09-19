import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import PokemonList from "./components/PokemonList.tsx";
import PokemonPage from "./pages/PokedexPage.tsx";
import SinglePokemon from "./components/SinglePokemon.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pokemon",
    element: <PokemonPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "pokedex",
        element: <PokemonList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "pokedex/:id",
        element: <SinglePokemon />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
