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

const ModalUpdateUser = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { show, setShow, dataView, resetDataView } = props;

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setUsername(dataView.username);
      setPassword("*********");
      setRole(dataView.role);
      if (dataView.image) {
        setImagePreview(`data:image/jpeg;base64,${dataView.image}`);
        //   setImage(`data;:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataView]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setImagePreview("");
    resetDataView();
  };

  //   const handleSubmit = async () => {
  //     let data = await postUpdateUser(dataUpdate.id, username, role, image);
  //     console.log(data);
  //     if (data && data.EC === 0) {
  //       handleClose();
  //       console.log(">>>>>", data);
  //       toast.success("Update user success!");
  //       props.fetchData();
  //     }
  //     if (data && data.EC !== 0) {
  //       toast.error(data.EM);
  //     }
  //   };
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
          <Modal.Title>View user</Modal.Title>
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
                  disabled
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Role</Form.Label>
                <Form.Select
                  disabled
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
                Image
              </label>
              <input type="file" hidden disabled id="upload-image" />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
