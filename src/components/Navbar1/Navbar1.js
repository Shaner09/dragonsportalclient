import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  FormControl,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleGhost } from "../../actions/useData";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const openGrp = () => {
    navigate("/groups");
  };
  return (
    <Container className="NavContain" style={{ border: "2px solid red" }}>
      {state.interfaceStrings.welcome} {state.user.nickname}
      <div className="NavButtonsArea">
        <div className="NavUserBtnArea">
          <Button className="navButton" onClick={() => navigate("/user")}>
            {state.interfaceStrings.userPage}
          </Button>
        </div>
        <div className="NavMyGroupsBtn">
          <Button onClick={openGrp}>{state.interfaceStrings.myGroups}</Button>
        </div>
      </div>
    </Container>
  );
};
export default Navbar1;
