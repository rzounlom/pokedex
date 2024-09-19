import "./HomePage.css";

import { FC } from "react";

const HomePage: FC = () => {
  return (
    <div className="homepage">
      <div className="bg-container">
        <div className="heading">
          <h1>Welcome to Official Pokédemon Fan Page</h1>
          <button>View Pokédemon</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
