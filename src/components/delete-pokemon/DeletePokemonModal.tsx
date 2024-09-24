import { Button, Modal } from "react-bootstrap";

import { FC } from "react";

interface DeletePokemonModalProps {
  deletePokemon: () => void;
  show: boolean;
  onClose: () => void;
}

const DeletePokemonModal: FC<DeletePokemonModalProps> = ({
  deletePokemon,
  show,
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Pokémon</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Pokémon?!?!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deletePokemon}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePokemonModal;
