import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NewPokemon from "./components/NewPokemon.tsx";
import PokedexPage from "./pages/PokedexPage.tsx";
import PokemonList from "./components/PokemonList.tsx";
import SinglePokemon from "./components/SinglePokemon.tsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/us",
    element: <PokedexPage />,
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
      {
        path: "pokedex/add",
        element: <NewPokemon />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
