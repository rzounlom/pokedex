import { FC } from "react";
import Navbar from "../components/nav/Navbar";
import { Outlet } from "react-router-dom";

const PokedexPage: FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PokedexPage;
