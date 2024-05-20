import { useDispatch, useSelector } from "react-redux"

import { addMessage, 
         userSelector,
         setGroupChat,
         setCurrentUsername,
         addLikesToMessage } from "../features/contact/usersReducer";

import Styles from "./conversation.module.css";

import profile from "../data/profile/profile.png";

import group_chat from "../data/profile/group_chat.png";

import call from "../images/call.png";

import videoCall from "../images/video-call.png";

import attachement from "../images/attachement.png";

import camera from "../images/camera.png";

import smile from "../images/smile.png";

import Like from "../images/like.png";

import send_message from "../images/send_message.png"

import { useEffect, useRef, useState } from "react";

// importing socket.io-client
import io from "socket.io-client";
// connecting to the server side for emit and receive events
const socket = io.connect("https://heythere-1xgo.onrender.com/");
// emoji picker
import Picker from "@emoji-mart/react";
// importing data from emoji mart
import data from "@emoji-mart/data";


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
    let { showConversation,groupChat,currentUser } = useValue();

    // state for setting message using onChange event
    const [message,setMessage] = useState(null);

    // storing room id to join
    const [room,setRoom]=useState("");

    // useRef for picking a div to show last message on a every conversation
    const messageEnd = useRef (null);
    
    // useRef for picking a input element to set value to empty string
    const messageField = useRef();
    
    // true false state for show and hide the emoji picker
    const [isPickerVisible,setPickerVisible ]=useState(false);
    
    // storing picked emoji
    const [currentEmoji, setCurretnEmoji]=useState(null);

    // including emoji to the message
    const addEmojiInMessageField = (emoji) =>{

        if (currentEmoji === null){

            if(message !== null){

                messageField.current.value = message + emoji;

                setMessage(message + emoji);
                
            }
            else{

                messageField.current.value = emoji

                setMessage(emoji)
            }
            

        }

    }
    
    // function to emit message and set groupchat message
    function sendMessage(e) {
        // preventing page from reload
        e.preventDefault();
        // if current user is already set or null
        let temp = currentUser || null;
        // if current user field is null then set one
        if(currentUser === null){

            const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin","Stone", "Jack", "Sakthi", "Vel", "Vijay"]; 
            // randomly setting user name
            const index = Math.floor(Math.random() * 9);
            // dispatching to reducer to update in appstore 
            dispatch(setCurrentUsername(user_list[index]));

            temp = user_list[index];
        }
        let currentTime = new Date().toLocaleTimeString()
        // dispatching the message made by current user
        dispatch(setGroupChat({
            from:"you",
            username:temp || currentUser,
            message:message,
            likes:0,
            time:currentTime
        }))

        currentUser = temp
        // emiting message to server and it will publish to the subscriber
        socket.emit("send_message", { message, currentUser, room});
        // clearing message field rigth after message sent
        messageField.current.value="";

        setCurretnEmoji(null)

        setMessage(null)

    }
    // taking the room id and emit that to the server
    const joinRoom = () =>{

        if(room !== ""){

            socket.emit("join_room",room);
        }
    };

    // receive message from server that is sent by other user
    useEffect(() => {

        socket.on("receive_message", (data) => {
    
            alert(data.message)

            let currentTime = new Date().toLocaleTimeString()

            // collect the message and set groupchat
            dispatch(setGroupChat({
                from:"groupmate",
                username:data.currentUser,
                message:data.message,
                likes:0,
                time:currentTime
            }))

        });

        messageField.current.value="";

        setCurretnEmoji(null);

        setMessage(null);

    }, [socket]);
    
    // useEffect to scroll down and show last message
    useEffect(()=>{
        
        messageEnd.current?.scrollIntoView();

    },[showConversation,groupChat])

    return(

        <>

            <div className={Styles.coversationDiv}>

                <div className={Styles.header}>

                    {
                        showConversation[0].chat_type==="Group"?
                            <>
                        
                                <img src={group_chat} alt="profile" className={Styles.profile}/>

                                <div className={Styles.shortdetails}>
            
                                    <p className={Styles.chat_type_name}>{showConversation[0].name}</p>
            
                                    <p>{"Online"}</p>
            
                                </div>

                                <div className={Styles.join_room}>

                                    <input onChange={(e)=>setRoom(e.target.value)} placeholder="Room id"/>

                                    <button onClick={joinRoom}>Join room</button>

                                </div>
                            </>
                            :
                            <>
                                <img src={profile} alt="profile" className={Styles.profile}/>

                                <div className={Styles.shortdetails}>
            
                                    <p className={Styles.chat_type_name}>{showConversation[0].name}</p>
            
                                    <p>{"Online"}</p>
            
                                </div>
                                <div className={Styles.calls}>

                                    <img src={call} alt="call"/>

                                    <img src={videoCall} alt="video_call"/>

                                </div>
                            </>
                            }

                </div>

                <div className={Styles.coversationBody}> 

                    {
                        showConversation[0].chat_type==="Group"?
                        groupChat.map((item)=>(

                            <>
                            {
                                
                                item.from==="groupmate"?
                                <>
                                    <div className={Styles.friendmessage}>

                                        <div className={Styles.likes_count_div_for_friend_msg}>

                                            <img src={Like} alt="Like" onClick={()=>dispatch(addLikesToMessage(item))}/>

                                            <p>{item.likes}</p>


                                        </div>

                                        <p className={Styles.message}><p>{item.time}</p>{item.message}</p>

                                        <div className={Styles.friend_username}>
                                            {item.username}
                                        </div>

                                        
                                    </div>

                                    <br></br>

                                </>
                                :
                                <>
                                <div className={Styles.yourmessage}>

                                    

                                    <div className={Styles.your_username}>
                                        {item.username}
                                    </div>

                                    <p className={Styles.message}><p>{item.time}</p>{item.message}</p>

                                    <div className={Styles.likes_count_div_for_your_msg}>

                                        <img src={Like} alt="Like" onClick={()=>dispatch(addLikesToMessage(item))}/>

                                        <p>{item.likes}</p>

                                    </div>

                                </div>

                                <br></br>
                                </>
                            }

                            </>
                        ))
                        :
                        showConversation[0].convo.map((item)=>(

                        <>
                            {item.you?
                                <div className={Styles.friendmessage}>
                                    
                                    <p className={Styles.message}>{item.you}</p>

                                    <div className={Styles.friend_username}>{item.username}</div>

                                </div>
                                :
                                null
                            }

                            {item.friend?
                                <div className={Styles.yourmessage}>

                                    <div className={Styles.your_username}>{item.username}</div>

                                    <p className={Styles.message}>{item.friend}</p>
                                    
                                </div>
                                :
                                null
                            }

                            <br></br>

                        </>

                        ))

                    }

                    <div ref={messageEnd}/>

                </div>

                <div className={Styles.footer}>

                    <div className={Styles.send_message_div}>

                        <img src={smile}
                            className={Styles.smile} 
                            alt="smile"
                            onClick={()=>setPickerVisible(!isPickerVisible)}
                        />          

                        <div style={isPickerVisible?{display:"block"}:{display:"none"}}>

                            <Picker data={data} previewPosition="none" onEmojiSelect={(e)=>{
                                setCurretnEmoji(e.native);
                                setPickerVisible(!isPickerVisible)
                                addEmojiInMessageField(e.native)
                                setCurretnEmoji(null)
                            }}/>

                        </div>

                        <input class={Styles.messagebox}
                            onChange={(e)=>setMessage(e.target.value)}
                            type="mixed"
                            ref={messageField}
                            placeholder="Type message..."
                            aria-label="Search"
                        />

                        <button class={Styles.messagebtn}
                                type="submit"
                                onClick={sendMessage}
                                onKeyDown={(e)=> e.key == "Enter"?sendMessage: ''}
                        >
                            <img src={send_message} className={Styles.send_message_icon} alt="send"/>
                        </button>

                    </div>

                    <div className={Styles.attachements}>

                        <img src={attachement} alt="attchement"/>

                        <img src={camera} alt="camera"/>

                    </div>

                </div>

            </div>

        </>

    )

};
