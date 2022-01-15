import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Container, InputGroup, FormControl } from "react-bootstrap"
//import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'
import { login, test, setBrowserLanguage } from "../../actions/useData";
// import {getUser} from '../../actions/useData';
 
 
 
const LogInForm =({setToken})=>{

    let navigate = useNavigate()
    const state = useSelector((state) => state.state)
    const [isLogging, setIsLogging] = useState(false);
    const [data, setData] = useState({nickname:'englishguy',password:'shanep'})
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLogging(true)
        dispatch(login(data))
        console.log('oioioioii')
        console.log(state)
        setShowModal(!showModal)
    }

    useEffect(()=>{
      if (state.user._id!=='') {
        dispatch(setBrowserLanguage({languageCode:state.user.language}))
      }
      if (state.user._id!=='' && state.user.groups.length>0 && isLogging) { 
        navigate('/groups')
      } else { 
        if (state.user._id!=='' && isLogging) { 
          navigate('/user')
        }
      }
      setIsLogging(false)
    },[state.user._id])
   
    // async function loginUser(credentials) {
    //     return fetch('http://localhost:8080/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(credentials)
    //     })
    //       .then(data => data.json())
    //    }
       
    //   const handleSubmit=(async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //       userId,
    //       userPassword
    //     });
    //     setToken(token);
    //   })
 
    return (
    <Container style={{textAlign:"center"}}>  
    <Button onClick={()=>dispatch(test())}>test</Button>
    <Button onClick={()=>console.log(state)}>log state</Button>
    <Button className="log-in" variant="primary" onClick={() => {
            setShowModal(!showModal)}}>
        {state.interfaceStrings.login}
    </Button>
    <InputGroup.Text
      style={{ cursor: "pointer" }}
      onClick={() => {
        setShowModal(!showModal)}}
    />
    <Modal
        show={showModal}
        onHide={()=>{
            setShowModal(!showModal)
        }}
        backdrop="static"
        keyboard={false}
    >
    <Modal.Header closeButton>
        <Modal.Title>
        {state.interfaceStrings.login}
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* <LogInForm/> */}
        <Form onSubmit={(e)=>handleSubmit(e)}>
        <Form.Label className="userID" value="">
        {state.interfaceStrings.nickname}
        </Form.Label>
        <FormControl  
            required
            placeholder={'nickname'}
            value={data.nickname}
            onChange={(e) =>
                setData({...data,nickname:e.target.value})
            }/>
        <Form.Label className="userPassword" >
        {state.interfaceStrings.password}
        </Form.Label>
        <FormControl  
            required
            placeholder={'password'}
            value={data.password}
            onChange={(e) =>
                setData({...data,password:e.target.value})
            }/>
    <Button type="submit">{state.interfaceStrings.login}</Button>
    {/* ternary statement alert invalid credentials */}
    {/* clear input soon as submitted */}
</Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={()=>{setShowModal(!showModal)}}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  </Container>
   )
}
 
export default LogInForm;
 
