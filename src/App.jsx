import './App.css'
import Signup from './pages/SignUp.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements ,Navigate} from 'react-router-dom'
import OtpPage from './pages/OtpPage.jsx'
import Home from './pages/Home.jsx'
import Layout from './Layout.jsx'
import Login from './pages/Login.jsx'
import HomeSign from './pages/HomeSign.jsx'
import Forgotpassword from "./pages/ForgotPassword.jsx"
import UserData from './pages/UserData.jsx'
import { AuthProvider } from './utility/AuthContext'
import { useAuth } from './utility/AuthContext'
import AddProduct from './pages/AddProduct.jsx'
import ProductData from './pages/ProductData.jsx'

function App() {
  const isLog=useAuth();
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
         <Route path='' element={<Home />} />
         <Route path="/" element={<HomeSign/>} >
          <Route path='/register' element={<Signup/>} />
          <Route path='/otpverification' element={<OtpPage/>}/>
          <Route path='/login' element={< Login/>}/>
         </Route>
         <Route path='/product/:id' element={<ProductData/>}/>
         <Route path='/userdata' element={<UserData/>}/>
         <Route path='/login/forgotpassword' element={<Forgotpassword/>}/>
         <Route path='/add-product' element=<AddProduct /> />
      </Route>
    )
  )

  return (
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
