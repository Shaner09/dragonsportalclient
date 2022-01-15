import React, { useEffect, useState } from "react";
import { Container, Button, Modal, FormControl, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getThoughts, get10Thoughts, invite, resetThoughts, deleteThought, editThought, setGhosting } from "../../actions/useData";
import ReactScrollableFeed from "react-scrollable-feed";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import LanguageSelector from "../LanguageSelector/LanguageSelect"

const ThoughtList = () => {
  let navigate = useNavigate()
  const [counter, setCounter]=useState(0)
  const dispatch = useDispatch();
  const state = useSelector((state) => state.state)
  const [checked, setChecked] = useState(false)
  const [showDeleteModal,setShowDeleteModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)
  const [thought, setThought] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [showLS, setShowLS] = useState(false)

  const handleDelete1 = (id) => {
    setThought(id)
    setShowDeleteModal(!showDeleteModal)
  };

  const handleDelete2 = () => {
    console.log('delete thought ' + thought)
    dispatch(deleteThought({t_id:thought, u_id: state.user._id, g_id: state.group._id}))
    setShowDeleteModal(!showDeleteModal)
  };

  const handleEdit1 = (id, message) => {
    setThought(id)
    setNewMessage(message)
    setShowEditModal(!showEditModal)
  };

  const handleEdit2 = () => {
    console.log('Edit thought ' + thought)
    dispatch(editThought({t_id:thought, newTranslation:{language: state.user.language, message:newMessage}, u_id: state.user._id}))
    setShowEditModal(!showEditModal)
  };

  const loadMore = (count) => {
    let thoughtArray = state.group.thoughts
    let newCount = count+2
    newCount = newCount>thoughtArray.length ? thoughtArray.length : newCount
    setCounter(newCount)
    let newThoughts = thoughtArray.slice(thoughtArray.length-newCount,thoughtArray.length-count)
    dispatch(get10Thoughts(newThoughts))
  }

  const generateInvite = () => {
    dispatch(invite({ u_id: state.user._id, g_id: state.group._id}))
  }

  const toggleGhosting = (e) => {
    e.target.checked ? setShowLS(true) : dispatch(setGhosting(''))
  }

  useEffect(() => {
    state.user._id==='' && navigate('/')
    dispatch(resetThoughts())
    //loadMore(counter)
    console.log(state.group._id)
    let getObject = {g_id: state.group._id, languages: [state.user.language]}
    if (state.ghosting) {
      getObject.languages.push(state.ghosting)
    }
    dispatch(getThoughts(getObject))
  }, []);

  return (
    <Container>
      <Button onClick={()=>{console.log(state)}}>Log state</Button>
      {/*<Button onClick={()=>{loadMore(counter)}}>Load 2 more</Button>*/}
      <Button onClick={generateInvite}>{state.interfaceStrings.getInviteCode}</Button>
      <ToggleButton
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={state.ghosting!==''}
        onChange={(e) => toggleGhosting(e)}
      >
        {state.interfaceStrings.ghosting}
      </ToggleButton>
      <LanguageSelector page={"thoughts"} showLS={showLS} setShowLS={setShowLS}></LanguageSelector>
    <Container style={{ display: "flex", flexDirection: "column", padding: "0px", height: "400px"}}>
      <ReactScrollableFeed>
        {state.thoughts.length===0 && 'please generate an invite code and share it with your friend'}
        {state.thoughts.map((thought, i) => (
          <Container style={{ borderRadius: "10px", padding: "5px", margin: "10px 0px", background: "#D8D8D8",}} key={i}>
            <h3>{thought.creatorNickName}</h3>
            {thought.messages.map((message,i)=><div key={i}>{message}</div>)}
            <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete1(thought._id)}></FaTrash>
            <FaPencilAlt style={{ cursor: "pointer" }} onClick={() => handleEdit1(thought._id, thought.message)}></FaPencilAlt>
          </Container>
        ))}
      </ReactScrollableFeed>
      <Modal
          show={showDeleteModal}
          onHide={()=>setShowDeleteModal(!showDeleteModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
          {state.interfaceStrings.deleteThought}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleDelete2}
            >
              {state.interfaceStrings.yes}
            </Button>
            <Button variant="primary" onClick={()=>setShowDeleteModal(!showDeleteModal)}>{state.interfaceStrings.no}</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEditModal}
          onHide={()=>setShowEditModal(!showEditModal)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body>
          {state.interfaceStrings.reviseMessage}:
            <FormControl  
            required
            value={newMessage}
            onChange={(e) =>
                setNewMessage(e.target.value)
            }/>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleEdit2}
            >
              {state.interfaceStrings.send}
            </Button>
            <Button variant="primary" onClick={()=>setShowEditModal(!showEditModal)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
    </Container>
    </Container>
  );
};
export default ThoughtList;
