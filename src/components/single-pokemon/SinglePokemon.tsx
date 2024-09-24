import "./SinglePokemon.css";

import { Badge, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { FC } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { determineBadgeColor } from "../../utils/determineBadgeColor";
import { pokemon } from "../../../db/db.json";

const SinglePokemon: FC = () => {
  const { id } = useParams<{ id: string }>();

  //find the pokemon with the id
  const foundPokemon = pokemon.find((p) => p.id === id);

  return (
    <Container className="single-pokemon page">
      <div className="heading">
        <Link to="/us/pokedex">
          <IoArrowBackCircleOutline />
        </Link>

        <h1>{foundPokemon?.name}</h1>
      </div>
      <div className="img-container">
        <img src={foundPokemon?.img} alt={foundPokemon?.name} />
      </div>
      <div className="info-container">
        <div className="description info">{foundPokemon?.description}</div>
        <div className="stats info">
          <div className="stats-item">
            <label>Height</label>
            <h4>{foundPokemon?.height}</h4>
          </div>
          <div className="stats-item">
            <label>Category</label>
            <h4>{foundPokemon?.category}</h4>
          </div>
          <div className="stats-item">
            <label>Weight</label>
            <h4>
              {foundPokemon?.weight}
              <span>lbs</span>
            </h4>
          </div>
          <div className="stats-item">
            <label>Abilities</label>
            <h4>{foundPokemon?.abilities}</h4>
          </div>
        </div>
        <div className="type info">
          <label>Type</label>
          <div className="pills">
            {foundPokemon?.type.map((type) => (
              <Badge
                pill
                bg={determineBadgeColor(type)}
                as="div"
                key={`type-${type}`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <div className="weaknesses info">
          <label>Weaknesses</label>
          <div className="pills">
            {foundPokemon?.weaknesses.map((weakness) => (
              <Badge
                pill
                bg={determineBadgeColor(weakness)}
                as="div"
                key={`weakness-${weakness}`}
              >
                {weakness}
              </Badge>
            ))}
          </div>
        </div>
        <div className="action-btn info">
          <Link to={`/us/pokedex/edit/${foundPokemon?.id}`}>
            <Button variant="outline-primary">Edit</Button>
          </Link>
          <Link to="/us/pokedex">
            <Button variant="outline-danger">Delete</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SinglePokemon;
