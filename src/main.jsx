import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import OtpPage from './components/OtpPage.jsx'
import Home from './components/Home.jsx'
import Layout from './Layout.jsx'
import Login from './components/Login.jsx'
import HomeSign from './HomeSign.jsx'
import Forgotpassword from "./components/Forgotpassword.jsx"

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
       <Route path='' element={<Home />} />
       <Route path="/homesign" element={<HomeSign/>} />
       <Route path='/signup' element={< Signup/>} />
       <Route path='/otpverification' element={<OtpPage/>}/>
       <Route path='/login' element={< Login/>}/>
       <Route path='/login/forgotpassword' element={<Forgotpassword/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
