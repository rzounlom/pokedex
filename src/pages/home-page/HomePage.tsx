import "./HomePage.css";

import { FC } from "react";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  return (
    <div className="homepage">
      <div className="bg-container">
        <div className="heading">
          <h1>Welcome to Official Pokémon Fan Page</h1>
          <Link to="/us/pokedex">
            <button>View Pokédemon</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
