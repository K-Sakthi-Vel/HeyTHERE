import { useDispatch, useSelector } from "react-redux"

import { addMessage, userSelector } from "../features/counter/usersReducer";

import Styles from "./conversation.module.css";

import profile from "../data/profile/profile.png";

import call from "../images/call.png";

import videoCall from "../images/video-call.png";

import attachement from "../images/attachement.png";

import camera from "../images/camera.png";

import smile from "../images/smile.png";

import { useEffect, useRef, useState } from "react";

// function to get datas from selector
function useValue(){

    const value = useSelector(userSelector);

    return value;
}

// functional component
export function Conversation(){

    // initiallizing dispatch function
    const dispatch = useDispatch();

    // retrieving conversation array from store  
    const { showConversation } = useValue();

    // state for setting message using onChange event
    const [message,setMessage] = useState();

    // useRef for picking a div to show last message on a every conversation
    const messageEnd = useRef (null);
    
    // useRef for picking a input element to set value to empty string
    const messageField = useRef();

    // function to handle form submission
    const handleSubmit = (e) => {

        // preventing default behaviour of form
        e.preventDefault()

        // dispatch to reducers 
        dispatch(addMessage(message))
        
        // clear the message input box 
        messageField.current.value=""

    }

    // useEffect to scroll down and show last message
    useEffect(()=>{

        messageEnd.current?.scrollIntoView();

    },[showConversation])

    return(

        <>

            <div className={Styles.coversationDiv}>

                <div className={Styles.header}>

                    <img src={profile} alt="profile" className={Styles.profile}/>

                    <div className={Styles.shortdetails}>

                        <h3>{showConversation[0].name}</h3>

                        <p>{"Online"}</p>

                    </div>

                    <div className={Styles.calls}>

                        <img src={call} alt="call"/>

                        <img src={videoCall} alt="video_call"/>

                    </div>
                </div>

                <div className={Styles.coversationBody}> 

                    {showConversation[0].convo.map((s)=>(

                        <>

                            {s.you?<div className={Styles.friendmessage}><h6>{s.you}</h6></div>:null}

                            {s.friend?<div className={Styles.yourmessage}><h6>{s.friend}</h6></div>:null}

                            <br></br>
                        </>
                    ))}

                    <div ref={messageEnd}/>

                </div>

                <div className={Styles.footer}>

                    <img src={smile} className={Styles.smile} alt="smile"/>

                    <form onSubmit={handleSubmit}>

                        <input class={Styles.messagebox}
                               onChange={(e)=>setMessage(e.target.value)}
                               type="text"
                               ref={messageField}
                               placeholder="Type message..."
                               aria-label="Search"
                        />
                        <button class={Styles.messagebtn}
                                type="submit"
                        > Send </button>

                    </form>

                    <div className={Styles.attachements}>

                        <img src={attachement} alt="attchement"/>

                        <img src={camera} alt="camera"/>

                    </div>

                </div>

            </div>

        </>

    )

}