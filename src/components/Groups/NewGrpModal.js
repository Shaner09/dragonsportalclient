import React, { useState, useEffect } from "react";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
//import { createTestGrp } from "../../actions/useData";
import { useDispatch, useSelector } from "react-redux";
const NewGrpModal = () => {
    const createTestGrp = () => {
        console.log('hi')
    }
  const [showModal, setShowModal] = useState(false);
  const [grpData, setGrpData] = useState({
    thoughts: "",
    participants: "",
    title: "",
    creator: "",
  });
  const dispatch = useDispatch();
    const state = useSelector((state) => state.state);
    
 
  return (
    <span>
      <InputGroup.Text
        style={{ cursor: "pointer" }}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        <FaPlus></FaPlus>
      </InputGroup.Text>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(!showModal);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h3>Modal title</h3>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="title"
            required
            value={grpData.title}
            onChange={(e) =>
              setGrpData({ ...grpData, title: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              let newGrpData = {
                ...grpData,
                creator: state.user._id,
                thoughts: [],
                participants: [state.user._id],
              };
              dispatch(createTestGrp(newGrpData));
              setShowModal(!showModal);
            }}
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
};
export default NewGrpModal;