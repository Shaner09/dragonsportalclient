import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  FormControl,
  ToggleButton,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCommand, toggleGhost } from "../../actions/useData";
import { useNavigate, useLocation } from "react-router-dom";
import STT from "../STT/STT";

const Navbar1 = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state);
  const openGrp = () => {
    navigate("/groups");
  };

  useEffect(()=>{
    state.command==="state" && console.log(state)
    dispatch(setCommand(''))
  },[state.command])

  return (
    location.pathname !== "/" && (
      <Container className="NavContain" style={{ border: "2px solid red" }}>
        <h2>
          {location.pathname === "/thoughts" ? state.group.title : state.interfaceStrings.welcome + " " + state.user.nickname}
        </h2>
        <div className="NavButtonsArea">
          <div className="NavUserBtnArea">
            <STT></STT>
          </div>
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
    )
  );
};
export default Navbar1;
