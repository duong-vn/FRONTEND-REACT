import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { postUpdateUser } from "../../../services/apiService";
import _, { update } from "lodash";
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

const ModalUpdateUser = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { show, setShow, dataUpdate } = props;

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setImagePreview(`data:image/jpeg;base64,${dataUpdate.image}`);
        //   setImage(`data;:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleChangeImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      //   setImagePreview("");
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setImagePreview("");
    props.resetUpdateData();
  };

  const handleSubmit = async () => {
    let data = await postUpdateUser(dataUpdate.id, username, role, image);
    console.log(data);
    if (data && data.EC === 0) {
      handleClose();
      console.log(">>>>>", data);
      toast.success("Update user success!");
      props.fetchDataPaginate(props.currentPage);
      console.log(">>>>>>", props.currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  //   console.log(">>>> dataupdate", props.dataUpdate);

  return (
    <>
      <Modal
        className="modal-add-user"
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  disabled
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  disabled
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">ADMIN</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <div className="col-md-12">
              <label
                className=" form-label label-upload"
                htmlFor="upload-image"
              >
                <LuImagePlus />
                Add image
              </label>
              <input
                type="file"
                hidden
                id="upload-image"
                onChange={(event) => handleChangeImage(event)}
              />
            </div>

            <div className="col-md-12 img-preview">
              {imagePreview ? (
                <img src={imagePreview} />
              ) : (
                <div>Image preview</div>
              )}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
