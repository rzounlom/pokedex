import "./Navbar.css";

import { FC } from "react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { MdCatchingPokemon } from "react-icons/md";
import { SiPokemon } from "react-icons/si";

const Navbar: FC = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        <SiPokemon />{" "}
      </Link>
      <ul>
        <li>
          <Link to="/us/pokedex">
            <MdCatchingPokemon />
          </Link>
        </li>
        <li>
          <Link to="/us/pokedex/add">
            <MdAddCircleOutline />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
