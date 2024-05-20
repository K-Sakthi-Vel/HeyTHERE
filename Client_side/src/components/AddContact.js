import Styles from "./addContact.module.css";

import profile from "../data/profile/profile.png";

import {useState} from "react";

import {useDispatch} from "react-redux";

import { addContact } from "../features/contact/usersReducer";

import { useNavigate } from "react-router-dom";


const AddContact = () => {

  // state for setting contact name with onChange event
  const [contactName,setContactName]=useState("");

  // state for setting contact number with onChange event
  const [contactNumber,setContactNumber]=useState("");

  // initializing navigate
  const navigate=useNavigate();
  
  // declaring for useDispatch function
  const dispatch = useDispatch()

  // function for handle form submit
  function handleSubmit(e){

    // preventing default behaviour of form submission
    e.preventDefault();

    // dispatchin contact details to reducer action
    dispatch(addContact({

      contactName,
      contactNumber

    }))

    // once contact added navigate to home page
    navigate("/")

  }

  return (

    <div className={Styles.body}>

        <div className={Styles.innerDiv}>

            <img src={profile} className={Styles.profile} alt="profile"/>

            <div className={Styles.formDiv}>

                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder="Name" onChange={(e)=>setContactName(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <input type="text" placeholder="Mobile number" onChange={(e)=>setContactNumber(e.target.value)}/>
                    <br></br>
                    <br></br>
                    <button>Add Contact</button>

                </form>

            </div>

        </div>

    </div>

  )
};

export default AddContact;
