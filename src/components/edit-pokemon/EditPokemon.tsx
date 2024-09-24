import "./EditPokemon.css";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import React, { FC, useState } from "react";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import PokemonCard from "../pokemon-card/PokemonCard";
import { pokemon } from "../../../db/db.json";
import { pokemonTypes } from "../../data";

const EditPokemon: FC = () => {
  //find the pokemon by id
  const { id } = useParams<{ id: string }>();

  const foundPokemon = pokemon.find((poke) => poke.id === id);

  console.log({ id, pokemon, foundPokemon });
  // State to manage the form data
  const [newPokemon, setNewPokemon] = useState({
    name: foundPokemon?.name || "",
    img: foundPokemon?.img || "",
    description: foundPokemon?.description || "",
    heightFt: foundPokemon?.height.split("'")[0] || "0",
    heightIn: foundPokemon?.height.split(" ")[1].replace('"', "") || "00",
    weight: foundPokemon?.weight || "",
    category: foundPokemon?.category || "",
    abilities: foundPokemon?.abilities || "",
    type: foundPokemon?.type ? [...foundPokemon.type] : [],
    weaknesses: foundPokemon?.weaknesses ? [...foundPokemon.weaknesses] : [],
  });

  // onChange handler to update the state as the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPokemon({
      ...newPokemon,
      [name]: value,
    });
  };

  const handleWeaknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isWithinArray = newPokemon.weaknesses.includes(value);
    if (checked && !isWithinArray) {
      setNewPokemon({
        ...newPokemon,
        weaknesses: [...newPokemon.weaknesses, value],
      });
    } else {
      setNewPokemon({
        ...newPokemon,
        weaknesses: newPokemon.weaknesses.filter((item) => item !== value),
      });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isWithinArray = newPokemon.type.includes(value);
    if (checked && !isWithinArray) {
      setNewPokemon({
        ...newPokemon,
        type: [...newPokemon.type, value],
      });
    } else {
      setNewPokemon({
        ...newPokemon,
        type: newPokemon.type.filter((item) => item !== value),
      });
    }
  };

  // combine the two functions above into one
  // const handleArrayChange =
  //   (field: "type" | "weaknesses") =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value, checked } = e.target;
  //     const isWithinArray = newPokemon[field].includes(value);

  //     if (checked && !isWithinArray) {
  //       setNewPokemon({
  //         ...newPokemon,
  //         [field]: [...newPokemon[field], value],
  //       });
  //     } else {
  //       setNewPokemon({
  //         ...newPokemon,
  //         [field]: newPokemon[field].filter((item) => item !== value),
  //       });
  //     }
  //   };

  //to use the function above, you can call it like this: handleArrayChange("type") or handleArrayChange("weaknesses")

  // onSubmit handler to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updating Pokemon Submitted: ", newPokemon);

    // update the pokemon in the database
    //send toast message
    // redirect to the pokemon details page
  };

  return (
    <Container className="edit-pokemon page">
      <div className="heading">
        <Link to={`/us/pokedex/${id}`}>
          <IoArrowBackCircleOutline />
        </Link>
        <h2>Edit Pokémon</h2>
      </div>
      {/* Bootstrap Form */}
      <main>
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Name */}
            <Col md={6}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pokémon Name"
                  name="name"
                  value={newPokemon.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            {/* Image */}
            <Col md={6}>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image URL"
                  name="img"
                  value={newPokemon.img}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Description */}
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter a short description"
              name="description"
              value={newPokemon.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            {/* Height */}
            <Col md={6}>
              <Form.Group controlId="formHeightFt" className="mb-3">
                <Form.Label>Height (ft)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Height in Feet"
                  name="heightFt"
                  value={newPokemon.heightFt}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formHeightIn" className="mb-3">
                <Form.Label>Height (in)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Height in Inches"
                  name="heightIn"
                  value={newPokemon.heightIn}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Weight */}
          <Form.Group controlId="formWeight" className="mb-3">
            <Form.Label>Weight (lbs)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Weight"
              name="weight"
              value={newPokemon.weight}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Category */}
          <Form.Group controlId="formCategory" className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Pokémon Category"
              name="category"
              value={newPokemon.category}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Abilities */}
          <Form.Group controlId="formAbilities" className="mb-3">
            <Form.Label>Abilities</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Abilities"
              name="abilities"
              value={newPokemon.abilities}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Type */}
          <Form.Group controlId="formType" className="mb-3">
            <Form.Label>Select Pokémon Type(s)</Form.Label>
            <div>
              {pokemonTypes.map((type) => (
                <Form.Check
                  key={type}
                  inline
                  label={type}
                  type="checkbox"
                  id={type.toLowerCase()}
                  name="types"
                  value={type}
                  checked={newPokemon.type.includes(type)}
                  onChange={handleTypeChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Weaknesses */}
          <Form.Group controlId="formWeaknesses" className="mb-3">
            <Form.Label>Select Pokémon Weaknesse(s)</Form.Label>

            <div>
              {pokemonTypes.map((type) => (
                <Form.Check
                  key={type}
                  inline
                  label={type}
                  type="checkbox"
                  id={type.toLowerCase()}
                  name="weaknesses"
                  value={type}
                  checked={newPokemon.weaknesses.includes(type)}
                  onChange={handleWeaknessChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Container fluid className="preview-container">
          <Row>
            <Col md={12} className="mb-4">
              <h2 className="mt-4">Edit Pokémon Preview </h2> <br />
              <PokemonCard
                type="edit"
                pokemon={{
                  ...newPokemon,
                  height: `${newPokemon.heightFt}' ${newPokemon.heightIn}"`,
                }}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Container>
  );
};

export default EditPokemon;
