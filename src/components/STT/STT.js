import React, { useState, useEffect, useRef } from "react";
import { Button, Container, FormControl, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGrp, joinGrp } from "../../actions/useData";

let STT = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => state.state);
  let [change, setChange] = useState(0);
  let [buttonOn, setIsButtonOn] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [recordMessage, _setRecordMessage] = React.useState(false);
  const [gCommand, _setgCommand] = React.useState("terminate");
  const [texts, _setTexts] = React.useState("");
  const [texts2, _setTexts2] = React.useState(props.message);

  const recordMessageRef = React.useRef(recordMessage);
  const setRecordMessage = (data) => {
    recordMessageRef.current = data;
    _setRecordMessage(data);
  };
  const gCommandRef = React.useRef(gCommand);
  const setgCommand = (data) => {
    gCommandRef.current = data;
    _setgCommand(data);
  };
  const textsRef = React.useRef(texts);
  const setTexts = (data) => {
    textsRef.current = data;
    _setTexts(data);
  };
  const texts2Ref = React.useRef(texts2);
  const setTexts2 = (data) => {
    texts2Ref.current = data;
    _setTexts2(data);
  };

  const functions = ['portal message']

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition;

  const plzWork = () => {
    recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
      let text = Array.from(e.results).map((result) => result[0]).map((result) => result.transcript).join("");
      if (textsRef.current.includes("portal message")) {
        setRecordMessage(true)
      } 
      if (gCommandRef.current !== "terminate" && text){
        setTexts(text);
      }
    });

    recognition.addEventListener("end", () => {
      textsRef.current.includes('portal message') && setTexts(textsRef.current.split('portal message')[1])
      if (recordMessageRef.current) {
          setTexts2(texts2Ref.current +' ' + textsRef.current)
          props.setMessage(texts2Ref.current)
          console.log('set to :' + texts2Ref.current)
      }
      if (texts2Ref.current.includes('portal send')) {
        setTexts2(texts2Ref.current.split('portal send')[0])
        props.setMessage(texts2Ref.current)
        setRecordMessage(false)
        console.log('send message: '+ texts2Ref.current)
        props.setNow(Math.random())
        setTexts2('')
        props.setMessage('')
      }

      setTexts('')
      if (gCommandRef.current !== "terminate") {
        console.log("portal listening");
        recognition.start();
      } else {
        console.log("portal no longer listening");
      }
    });

    recognition.start();
  };

  // this should be done in the restart button.

  const handleButtonClick = () => {
    if (gCommandRef.current === "terminate") {
      setgCommand("run");
      plzWork();
    } else {
      setRecordMessage(false)
      setgCommand("terminate");
    }
  };

  return (
      <ToggleButton
        id="toggle-check2"
        type="checkbox"
        variant="outline-primary"
        checked={gCommand!=='terminate'}
        onClick={()=>handleButtonClick()}
      >STT</ToggleButton>
  );
};
export default STT;
