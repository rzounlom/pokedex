import { FC } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const PokedexPage: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PokedexPage;
