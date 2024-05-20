import { createSlice } from '@reduxjs/toolkit';

import { userData } from '../../data/users';

// initiallize type of datas
const initialState = {
  // all the user contact details
  users:userData,

  // array of current conversation 
  showConversation:[userData[0]],

  // array of search result contacts
  searchResults:[]

};

// slice function
export const usersSlice = createSlice({

  name: 'users',

  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // action for add a message
    addMessage: (state,action) => {
      // map through the user contacts array to find the specific person
      state.users.map((friend)=>{

        // we already setted the current conversation array so lets use that persons mobile number to match with
        if(friend.mobileNumber===state.showConversation[0].mobileNumber){

          // if mobile number matches then push a message in object form
          friend.convo.push({
            you:action.payload
          })

          // push the mesaage to current conversation array
          state.showConversation[0].convo.push({
            you:action.payload
          })

        }

        return friend

      })

    },
    
    // action fot set current coversation array
    setCurrentConversation:(state,action)=>{

      // receiving current contact person object
      const current_contact = action.payload;

      // setting the array of single object to showConversation
      state.showConversation = current_contact;

    },

    // action for add a contact
    addContact:(state,action)=>{

      // adding a new contact as object in the last of the current user contact array
      state.users.push({

        name:action.payload.contactName,

        mobileNumber:action.payload.contactNumber,

        status:"Available",

        convo:[],

        lastSeen:"12:00AM"

      })

    },

    // action for generate search results
    searchContact:(state,action)=>{

      // setting search results arra to empty array to prevent from unnecessary array of users that being return
      if(action.payload.length===0){

        state.searchResults=[]

      }

      // invoke when length of search content string in greater than zero
      if(action.payload.length > 0){

        // finding the length of the string
        let lengthOfString = action.payload.length

        // filtering the contacts upon search content
        const filteredResults = state.users.filter((user)=>(

          // matching search content string and user contact name string
          user.name.toLowerCase().slice(0,lengthOfString)===action.payload.toLowerCase().slice(0,lengthOfString)

        ))

        // setting search results
        state.searchResults = filteredResults

      }

    },
    
    // action for clear search results
    clearSearchResults:(state,action)=>{

      state.searchResults=[]

    }

  }
  
});

// exporting reducer actions
export const { addMessage,
               setInitialState,
               setCurrentConversation,
               addContact,
               searchContact,
               clearSearchResults
              } = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userSelector = (state) => state.usersReducer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export default usersSlice.reducer;
