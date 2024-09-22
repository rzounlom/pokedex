import "./PokemonCard.css";

import { Badge, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import { FC } from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../../types";
import { determineBadgeColor } from "../../utils/determineBadgeColor";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card className="pokemon-card">
      <Card.Img variant="top" src={pokemon.img} alt={pokemon.name} />
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
                key={`${pokemon.id}-${item}`}
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
                key={`${pokemon.id}-${item}`}
              >
                {item}
              </Badge>
            ))}
          </ListGroupItem>
        </ListGroup>
        <Link to={`/us/pokedex/${pokemon.id}`}>
          <Button variant="info" style={{ color: "white" }}>
            Learn More
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
