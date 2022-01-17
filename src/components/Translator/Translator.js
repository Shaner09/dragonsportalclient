import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import languageInfo from "../../languageInfo";
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

// Your credentials
const CREDENTIALS = {}
  

const Translator = () => {
  const [translatedText, setTranslatedText] = useState("");
  const [userInputText, setUserInputText] = useState("");
  const [userInputLanguage, setUserInputLanguage] = useState("es");

  const langArray = ["es", "en", "fr", "it"];

  const newthings = ["update", "Language", 'please generate an invite code and share it with your friend'
,"please create a group", "User not found", 'Passwords do not match', "User", "created!", 'Register unsuccessful'
,"One stop real time communicator for the diversed multi-lingual environment.", "We will be your voice.", "portal"]
const newTrans = {
    update: "Update",
    language: "Language",
    noThoughts: "Please generate an invite code and share it with your friend",
    noGroups: "Please create a group",
    noUser: "User not found",
    passError1: "Passwords do not match",
    user: "User",
    created: "created!",
    registerUnsuccessful: "Register unsuccessful",
    welcome1: "One stop real time communicator for the diversed multi-lingual environment.",
    welcome2: "We will be your voice.",
    portal: "portal",
}

  const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id,
  });

  const translateText = async (text, targetLanguage) => {
    try {
      let [response] = await translate.translate(text, targetLanguage);
      return response;
    } catch (error) {
      console.log(`Error at translateText --> ${error}`);
      return 0;
    }
  };

  const handleClick = (text, code) => {
    translateText(text, code)
      .then((res) => {
        setTranslatedText(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const interfaceObject = {
    login: "Login",
    register: "Register",
    firstname: "First Name",
    lastname: "Last Name",
    nickname: "Nickname",
    password: "Password",
    verifyPassword: "Verify Password",
    searchForGroup: "Search for Group",
    welcome: "Welcome",
    userPage: "User Page",
    ghosting: "Ghosting",
    fullName: "Full Name",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    myGroups: "My Groups",
    title: "Title",
    createGroup: "Create Group",
    inviteCode: "Invite Code",
    joinGroup: "Join Group",
    enter: "Enter",
    delete: "Delete",
    getInviteCode: "Get Invite Code",
    reviseMessage: "Revise Message",
    send: "Send",
    deleteThought: "Delete this thought?",
    yes: "Yes",
    no: "No",
  };

  const crazy = async () => {
    await languageInfo.forEach(async (languageGroup) => {
      for (let property in newTrans) {
        languageGroup[3][property] = await translateText(newTrans[property], languageGroup[1]);
       // languageGroup[3][property] = languageGroup[1] +  '-' + newTrans[property]
      }
    });
    console.log(languageInfo)
  };

  return (
    <div>
      <Button onClick={()=>console.log(languageInfo)}>log array again</Button>
      <Button onClick={() => crazy()}>Make Array</Button>
      {/*<Container>
        <Form>Translate text: 
        <Form.Control
              name="creator"
              required
              value={userInputText}
              onChange={(e) =>
                setUserInputText(e.target.value)
              }
            />
            To: {langArray.map((lang,i)=><Button key={i} onClick={()=>setUserInputLanguage(lang)}>{lang}</Button>)}
            </Form>
        <Button
          onClick={()=>{
            handleClick(userInputText, userInputLanguage)
          }}
        >
          translate
        </Button>
        <h4>{translatedText}</h4>
      </Container>*/}
    </div>
  );
};
export default Translator;
