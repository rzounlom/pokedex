import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import PokemonList from "./components/PokemonList.tsx";
import PokemonPage from "./pages/PokedexPage.tsx";
import SinglePokemon from "./components/SinglePokemon.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const router = createBrowserRouter([
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />{" "}
  </StrictMode>
);
