import Styles from "./userslist.module.css";

import { userSelector,setCurrentConversation } from "../features/contact/usersReducer";

import { useDispatch, useSelector } from "react-redux";

import profile from "../data/profile/profile.png";

import group_chat from "../data/profile/group_chat.png";

import addContact from "../images/add_contact.png";

import search from "../images/search_contact.png";

import { clearSearchResults } from "../features/contact/usersReducer";

import { searchContact } from "../features/contact/usersReducer";

import { useRef } from "react";

import { Link } from "react-router-dom";

// function to get datas from selector
function useValue(){

    const value = useSelector(userSelector);

    return value;

}

// functional component
export function UsersList(){

    // declaring dispatch function
    const dispatch = useDispatch();

    // useRef for picking contact search input 
    const clearSearchInput = useRef();

    // retrieving and destructuring datas from store using selector
    const {users,searchResults,groupChat} = useValue();

    // function to clear input box
    function clearSearch(){

        // dispatch function to invoke the reducer action
        dispatch(clearSearchResults())

        // clearing the input box
        clearSearchInput.current.value = ""

    }

    return(


        <div className={Styles.userslist}>

            <div  class={Styles.formdiv}>
                
                <img src={search} className={Styles.searchcontact} alt="seach_contact"/>

                <input class={Styles.searchbox}
                    onChange={(e)=>dispatch(searchContact(e.target.value))}
                    ref={clearSearchInput}
                    type="text"
                    placeholder="Search contact..."
                />

                <button class={Styles.searchbtn}
                        onClick={clearSearch}
                > Clear </button>

                <Link to={"/addContact"}>
                    <img src={addContact}
                        className={Styles.addcontact}
                        alt="add_contact"
                    />
                </Link>

            </div>

            {
                searchResults.length>0?

                    searchResults.map((person,index)=>(

                        <Link to={`/friend/${person.name}`} style={{ color: 'inherit', textDecoration: 'inherit'}} >

                            <div className={Styles.user}
                                onClick={()=>(dispatch(setCurrentConversation([person])))}
                                key={index}
                            >

                                <img src={person.chat_type==="Group"?group_chat:profile} alt="profile"/>

                                <div className={Styles.searchshortdetails}>
                                    <h3>{person.name}</h3>
                                </div>

                            </div>

                        </Link>

                    ))
                    :
                    users.map((person,index)=>(

                        <Link to={`/friend/${person.name}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>

                            <div className={Styles.user}
                                    onClick={()=>(dispatch(setCurrentConversation([person])))}
                                    key={index}
                            >

                                <img src={person.chat_type==="Group"?group_chat:profile} alt="profile"/>

                                <div className={Styles.shortdetails}>

                                    <h3>{person.name}</h3>

                                        {
                                            
                                        person.chat_type==="Group"?
                                        <p>
                                            {
                                                groupChat.length>0?
                                                    groupChat[groupChat.length-1].username + ": " + groupChat[groupChat.length-1].message
                                                :
                                                    "No message yet!!!"
                                            }

                                        </p>
                                        :
                                        <p>

                                            {
                                                person.convo.length>1?
                                                    Object.values(person.convo[person.convo.length-1])[1]
                                                :
                                                    "No message yet!!!"
                                            }

                                        </p>
                                    }

                                    

                                </div>

                                <h6 className={Styles.lastseen}>{person.lastSeen}</h6>

                            </div>

                        </Link>

                    ))
            }
        </div>

    )
} 
