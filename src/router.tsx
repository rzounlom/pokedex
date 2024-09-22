import EditPokemon from "./components/edit-pokemon/EditPokemon.tsx";
import ErrorPage from "./pages/error-page/ErrorPage.tsx";
import HomePage from "./pages/home-page/HomePage.tsx";
import NewPokemon from "./components/new-pokemon/NewPokemon.tsx";
import PokedexPage from "./pages/pokedex-page/PokedexPage.tsx";
import PokemonList from "./components/pokemon-list/PokemonList.tsx";
import SinglePokemon from "./components/single-pokemon/SinglePokemon.tsx";
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
        path: "pokedex/new",
        element: <NewPokemon />,
        errorElement: <ErrorPage />,
      },
      {
        path: "pokedex/edit/:id",
        element: <EditPokemon />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
