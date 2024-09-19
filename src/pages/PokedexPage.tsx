import { FC } from "react";
import { Outlet } from "react-router-dom";

const PokedexPage: FC = () => {
  return (
    <div>
      <h1>Pokemon Page: Navbar</h1>
      <Outlet />
    </div>
  );
};

export default PokedexPage;
