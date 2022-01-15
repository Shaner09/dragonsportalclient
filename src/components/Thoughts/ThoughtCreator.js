import React, {useEffect, useState} from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createThought } from '../../actions/useData'
import { FaPaperPlane } from "react-icons/fa";
import STT from "../STT/STT";


const ThoughtCreator = () => {
  //change me when you want to run a function.
  const [now, setNow] = useState(0)

  const state = useSelector((state) => state.state)

  const dispatch = useDispatch()

    const [message,setMessage] = useState('')

  const handleSubmit = () => {
      //e.preventDefault()
      const thoughtCreatorObject = {g_id: state.group._id, languages: [state.user.language], thought: {translations: [{ language: state.user.language, message: message}], creator: state.user._id, creatorNickName: state.user.nickname}}
      if (state.ghosting) {
        thoughtCreatorObject.languages.push(state.ghosting)
      }
      dispatch(createThought(thoughtCreatorObject))
      console.log(`make thought: (${message})  by: ${state.user._id}`)
  }

  useEffect(()=>{
    now!==0 && handleSubmit()
  },[now])

    return (
      <Container style={{display:'flex', padding:"0px"}}>
        <STT message={message} setMessage={setMessage} setNow={setNow}></STT>
        <FormControl  
        name="message"
        required
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }/>
        <InputGroup.Text onClick={handleSubmit} style={{cursor:"pointer"}}>
          <FaPaperPlane></FaPaperPlane>
        </InputGroup.Text>
      </Container>
    );
}
export default ThoughtCreator