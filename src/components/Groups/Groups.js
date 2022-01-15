import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Container,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactScrollableFeed from "react-scrollable-feed";
import { FaTrash } from "react-icons/fa";
import { getGrps, createTestGrp, setGrp } from "../../actions/useData";
import NewGrpModal from "./NewGrpModal";
const Groups = () => {
  let navigate = useNavigate()
  const [groupSearchText, setGroupSearchText] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  
  let levi = true;
  const handleDelete = (id) => {
    console.log(`delete group ${id}`);
  };
  useEffect(() => {
    state.user._id==='' && navigate('/')
    //setInterval(updateThoughts, 10000);
  }, []);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0px",
        height: "500px",
      }}
    >
      <div className="styles_scrollable-div__prSCv">
        <div>
          {state.groups
            .filter((group) =>
              group.title
                .toLowerCase()
                .includes(groupSearchText.toLowerCase())
            )
            .map((group, i) => (
              <Container
                style={{
                  borderRadius: "10px",
                  padding: "5px",
                  margin: "10px 0px",
                  background: "#D8D8D8",
                }}
                key={i}
                onClick={(e) => {
                  e.preventDefault()
                  if (levi) {
                    dispatch(setGrp(group))
                    navigate('/thoughts')
                  } else {
                    levi = true;
                  }
                }}
              >
                <h3>{group.title}</h3>
                <FaTrash
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(group._id);
                    levi = false;
                  }}
                ></FaTrash>
              </Container>
            ))}
        </div>
      </div>
      <Container style={{ display: "flex", padding: "0px" }}>
        <FormControl
          placeholder="Search for Group"
          value={groupSearchText}
          onChange={(e) => setGroupSearchText(e.target.value)}
        />
        <NewGrpModal></NewGrpModal>
      </Container>
    </Container>
  );
};
export default Groups;