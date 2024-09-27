import './App.css'
import Signup from './pages/SignUp.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import OtpPage from './pages/OtpPage.jsx'
import Home from './pages/Home.jsx'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import HomeSign from './pages/HomeSign.jsx'
import Forgotpassword from "./pages/ForgotPassword.jsx"

function App() {
  
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
         <Route path='' element={<Home />} />
         <Route path="/homesign" element={<HomeSign/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/otpverification' element={<OtpPage/>}/>
         <Route path='/login' element={< Login/>}/>
         <Route path='/login/forgotpassword' element={<Forgotpassword/>}/>
      </Route>
    )
  )

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
