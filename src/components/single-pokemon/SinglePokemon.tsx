import "./SinglePokemon.css";

import { Badge, Button, Container, Spinner } from "react-bootstrap";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DeletePokemonModal from "../delete-pokemon/DeletePokemonModal";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { determineBadgeColor } from "../../utils/determineBadgeColor";
import { toast } from "react-toastify";

const SinglePokemon: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const [foundPokemon, setfoundPokemon] = useState({
    id,
    name: "",
    img: "",
    description: "",
    height: "",
    category: "",
    weight: "",
    abilities: "",
    type: [],
    weaknesses: [],
  });

  //find the pokemon with the id
  // const foundPokemon = pokemon.find((p) => p.id === id);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(`http://localhost:4000/pokemon/${id}`);
      const data = await response.json();
      setfoundPokemon(data);
    };
    try {
      setLoading(true);
      fetchPokemon();
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Pokemon");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const deletePokemon = async () => {
    //delete the pokemon
    try {
      setLoading(true);
      // send a delete request to the server
      await fetch(`http://localhost:4000/pokemon/${id}`, {
        method: "DELETE",
      });
      //send toast message
      setLoading(false);
      toast.success("Pokemon deleted successfully");
      // cloase the modal
      onClose();
      //reroute to the pokedex page
      navigate("/us/pokedex");
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to delete Pokemon");
    }
  };

  return (
    <Container className="single-pokemon page">
      <DeletePokemonModal
        onClose={onClose}
        show={show}
        deletePokemon={deletePokemon}
      />
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <>
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
              <Button variant="outline-danger" onClick={() => setShow(true)}>
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default SinglePokemon;
