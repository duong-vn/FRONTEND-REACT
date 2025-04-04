import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postDeleteUser } from "../../../services/apiService";
const ModalDeleteUser = (props) => {
  const { show, setShow, user } = props;

  const handleClose = () => setShow(false);
  const handleOnDelete = async () => {
    let data = await postDeleteUser(user.id);
    if (data && data.EC === 0) {
      toast.success("Delete user success!");
      handleClose();
      props.fetchData();
    } else {
      toast.error(data.EM);
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You're about to delete this user: <b>{props.user.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleOnDelete(props.user.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
