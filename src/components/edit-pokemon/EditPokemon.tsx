import "./EditPokemon.css";

import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import PokemonCard from "../pokemon-card/PokemonCard";
import { pokemonTypes } from "../../data";
import { toast } from "react-toastify";

const EditPokemon: FC = () => {
  const naviagate = useNavigate();
  //find the pokemon by id
  const { id } = useParams<{ id: string }>();

  // loading state
  const [loading, setLoading] = useState(false);

  // State to manage the form data
  const [updatedPokemon, setupdatedPokemon] = useState({
    name: "",
    img: "",
    description: "",
    heightFt: "00",
    heightIn: "00",
    weight: "",
    category: "",
    abilities: "",
    type: [] as string[],
    weaknesses: [] as string[],
  });

  useEffect(() => {
    try {
      setLoading(true);
      const findPokemon = async () => {
        //fetch the pokemon by id
        const response = await fetch(`http://localhost:4000/pokemon/${id}`);
        const data = await response.json();

        setupdatedPokemon({
          //set the state with the fetched pokemon data
          name: data.name,
          img: data.img,
          description: data.description,
          heightFt: data.height.split("'")[0],
          heightIn: data.height.split(" ")[1].replace('"', ""),
          weight: data.weight,
          category: data.category,
          abilities: data.abilities,
          type: [...data.type],
          weaknesses: [...data.weaknesses],
        });
      };

      findPokemon(); //call the function
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Pokemon"); // show error message
    } finally {
      setLoading(false);
    }
  }, [id]);

  // console.log({ id, pokemon, foundPokemon });

  // onChange handler to update the state as the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setupdatedPokemon({
      ...updatedPokemon,
      [name]: value,
    });
  };

  const handleWeaknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isWithinArray = updatedPokemon.weaknesses.includes(value);
    if (checked && !isWithinArray) {
      setupdatedPokemon({
        ...updatedPokemon,
        weaknesses: [...updatedPokemon.weaknesses, value],
      });
    } else {
      setupdatedPokemon({
        ...updatedPokemon,
        weaknesses: updatedPokemon.weaknesses.filter((item) => item !== value),
      });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const isWithinArray = updatedPokemon.type.includes(value);
    if (checked && !isWithinArray) {
      setupdatedPokemon({
        ...updatedPokemon,
        type: [...updatedPokemon.type, value],
      });
    } else {
      setupdatedPokemon({
        ...updatedPokemon,
        type: updatedPokemon.type.filter((item) => item !== value),
      });
    }
  };

  // combine the two functions above into one
  // const handleArrayChange =
  //   (field: "type" | "weaknesses") =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value, checked } = e.target;
  //     const isWithinArray = updatedPokemon[field].includes(value);

  //     if (checked && !isWithinArray) {
  //       setupdatedPokemon({
  //         ...updatedPokemon,
  //         [field]: [...updatedPokemon[field], value],
  //       });
  //     } else {
  //       setupdatedPokemon({
  //         ...updatedPokemon,
  //         [field]: updatedPokemon[field].filter((item) => item !== value),
  //       });
  //     }
  //   };

  //to use the function above, you can call it like this: handleArrayChange("type") or handleArrayChange("weaknesses")

  // onSubmit handler to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // update the pokemon in the database
    try {
      setLoading(true);
      await fetch(`http://localhost:4000/pokemon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedPokemon,
          height: `${updatedPokemon.heightFt}' ${updatedPokemon.heightIn}"`,
        }),
      });

      toast.success("Pokémon Updated Successfully"); // show success message
      // redirect to the pokemon details page
      naviagate(`/us/pokedex/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update Pokémon"); // show error message
    }
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
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
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
                    value={updatedPokemon.name}
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
                    value={updatedPokemon.img}
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
                value={updatedPokemon.description}
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
                    value={updatedPokemon.heightFt}
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
                    value={updatedPokemon.heightIn}
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
                value={updatedPokemon.weight}
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
                value={updatedPokemon.category}
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
                value={updatedPokemon.abilities}
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
                    checked={updatedPokemon.type.includes(type)}
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
                    checked={updatedPokemon.weaknesses.includes(type)}
                    onChange={handleWeaknessChange}
                  />
                ))}
              </div>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && <Spinner as="span" animation="grow" size="sm" />}
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
          <Container fluid className="preview-container">
            <Row>
              <Col md={12} className="mb-4">
                <h2 className="mt-4">Edit Pokémon Preview </h2> <br />
                <PokemonCard
                  type="edit"
                  pokemon={{
                    ...updatedPokemon,
                    height: `${updatedPokemon.heightFt}' ${updatedPokemon.heightIn}"`,
                  }}
                />
              </Col>
            </Row>
          </Container>
        </main>
      )}
    </Container>
  );
};

export default EditPokemon;
