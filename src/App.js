import './App.css';

import { Navbar } from './components/Navbar';

import { UsersList } from './components/UsersList';

import { Conversation } from './components/Conversation';

import AddContact from './components/AddContact';

import { createBrowserRouter,RouterProvider } from "react-router-dom"

// main app function component
function App() {

  // react router 
  const router = createBrowserRouter([

    {
      path:"/",

      element:<Navbar/>,

      children:[

        {

          index:true,

          element:[<UsersList/>,<Conversation/>]

        },
        {
          path:"friend/:name",
          element:[<UsersList/>,<Conversation/>]
        }

      ]

    },

    {

      path:"/addContact",

      element:<AddContact/>,

    },
    
  ])


  return (

    <>

      <div className='App'>
      
        <RouterProvider router={router}>

        </RouterProvider>

      </div>

    </>
    
  )

}

export default App;
