import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FC, useEffect, useState } from "react";

import { Pokemon } from "../../types";
import PokemonCard from "../pokemon-card/PokemonCard";
import { toast } from "react-toastify";

// import { pokemon } from "../../../db/db.json";

const PokemonList: FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);

  //fake dalay to test loading spinner
  // const timeOut = async () => {
  //   return new Promise<void>((resolve) => {
  //     setTimeout(() => {
  //       resolve();
  //     }, 5000);
  //   });
  // };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        // await timeOut(); //fake dalay to test loading spinner
        const response = await fetch("http://localhost:4000/pokemon");
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch Pokemon"); // show error message
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []); // empty array means this effect will run only once

  const renderPokemon = () => {
    // renderPokemon function to loop through the pokemon array and render PokemonCard component
    return pokemon.map((pokemon: Pokemon) => (
      <Col key={pokemon.id} sm={12} md={6} lg={3} className="mb-4">
        <PokemonCard pokemon={pokemon} />
      </Col>
    ));
  };

  return (
    <Container className="page">
      <Row>
        {loading ? ( // show loading spinner if loading is true
          <Spinner animation="border" role="status" />
        ) : (
          renderPokemon() // render PokemonCard components if loading is false
        )}
      </Row>
    </Container>
  );
};

export default PokemonList;
