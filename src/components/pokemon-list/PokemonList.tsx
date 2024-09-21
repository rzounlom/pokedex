import { Col, Container, Row } from "react-bootstrap";

import { FC } from "react";
import { Pokemon } from "../../types";
import PokemonCard from "../pokemon-card/PokemonCard";
import { pokemon } from "../../../db/db.json";

const PokemonList: FC = () => {
  return (
    <Container className="page">
      <Row>
        {pokemon.map((pokemon: Pokemon) => (
          <Col key={pokemon.id} sm={12} md={6} lg={3} className="mb-4">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PokemonList;
