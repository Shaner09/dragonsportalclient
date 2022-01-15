import React, { useState, useEffect } from "react";
import { Button, Container, FormControl } from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import LanguageSelector from "../LanguageSelector/LanguageSelect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGrp, joinGrp } from "../../actions/useData";

const User = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [ranCommand, setRanCommand] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.state);

  const openGrp = () => {
    setRanCommand(false)
    navigate("/groups");
  };
  const handleCreateGrp = () => {
    dispatch(createGrp({ u_id: state.user._id, title: title }));
    setRanCommand(true)
  };

  const handleJoinGrp = () => {
    dispatch(joinGrp({ u_id: state.user._id, fullCode: code }));
    setRanCommand(true)
  };

  useEffect(() => {
    state.user._id === "" && navigate("/");
  }, []);
  useEffect(() => {
    (ranCommand && state.group._id !== "") && navigate("/thoughts");
    setRanCommand(false)
  }, [state.group]);

  return (
    <Container>
      <Button onClick={() => console.log(state)}>Log State</Button>
      <div className="profileArea">
        <h2>Profile Info:</h2>
        <div className="fullname">
          {state.interfaceStrings.fullName}: {state.user.fullName}
        </div>
        <div className="nickname">
          {state.interfaceStrings.nickname}: {state.user.nickname}
        </div>
      </div>
      <div className="languageSelector">
        Chosen Language :
        <LanguageSelector page={"user"} showLS={false}></LanguageSelector>
      </div>
      <div className="ChgPswd">
        <ChangePasswordModal></ChangePasswordModal>
      </div>
      <div className="myGroups">
        <Button onClick={openGrp}>{state.interfaceStrings.myGroups}</Button>
      </div>
      <div className="createArea">
        <FormControl
          required
          placeholder={state.interfaceStrings.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleCreateGrp}>
          {state.interfaceStrings.createGroup}
        </Button>
      </div>
      <div className="joinArea">
        <FormControl
          required
          placeholder={state.interfaceStrings.inviteCode}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={handleJoinGrp}>
          {state.interfaceStrings.joinGroup}
        </Button>
      </div>
    </Container>
  );
};
export default User;