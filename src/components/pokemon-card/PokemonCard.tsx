import "./PokemonCard.css";

import { Badge, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { NewPokemon, Pokemon } from "../../types";

import { FC } from "react";
import { Link } from "react-router-dom";
import { determineBadgeColor } from "../../utils/determineBadgeColor";

interface PokemonCardProps {
  pokemon: Pokemon | NewPokemon;
  type?: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, type }) => {
  const tempImgUrl =
    "https://i.pinimg.com/550x/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.jpg";
  return (
    <Card
      className={
        type && (type === "new" || type === "edit")
          ? "pokemon-card-new"
          : "pokemon-card"
      }
    >
      <Card.Img
        variant="top"
        src={pokemon.img || tempImgUrl}
        alt={pokemon?.name}
      />
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Category: {pokemon.category}
        </Card.Subtitle>
        <ListGroup className="mb-3">
          <ListGroupItem>
            <strong>Type:</strong>{" "}
            {pokemon.type.map((item) => (
              <Badge
                bg={determineBadgeColor(item)}
                style={{ marginLeft: "2px" }}
                key={`${"id" in pokemon ? pokemon.id : "new"}-${item}`}
              >
                {item}
              </Badge>
            ))}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Abilities:</strong> {pokemon.abilities}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Height:</strong> {pokemon.height}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Weight:</strong> {pokemon.weight} lbs
          </ListGroupItem>
          <ListGroupItem>
            <strong>Weaknesses:</strong>
            {pokemon.weaknesses.map((item) => (
              <Badge
                bg={determineBadgeColor(item)}
                style={{ marginLeft: "2px" }}
                key={`${"id" in pokemon ? pokemon.id : "new"}-${item}`}
              >
                {item}
              </Badge>
            ))}
          </ListGroupItem>
        </ListGroup>
        <Link to={`/us/pokedex/${"id" in pokemon ? pokemon.id : ""}`}>
          {type !== "new" && type !== "edit" && (
            <Button variant="info" style={{ color: "white" }}>
              Learn More
            </Button>
          )}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
