import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/login'
import Register from './Components/Register/Register'
import Deanlist from './Components/Deanlist/Deanlist'

import {
  createBrowserRouter,
  RouterProvider
}from 'react-router-dom'
import Probationlist from './Components/Probation/Probationlist'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/deanlist',
    element: <div><Deanlist/></div>
  },
  {
    path: '/probationlist',
    element: <div><Probationlist/></div>
  },


])


function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
