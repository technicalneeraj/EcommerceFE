import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './SignUp';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const HomeSign = () => {
  const navigate=useNavigate();
    const location = useLocation();
    const { alreadyhave } = location.state || {};
    const [loginpage, setLoginPage] = useState(true);
    useEffect(()=>{
      if(alreadyhave!==undefined){
        setLoginPage(alreadyhave);
      }
    },[alreadyhave])
    const loginhandle=()=>{
      setLoginPage(true);
      navigate("/login")
    }
    const registerhandle=()=>{
      setLoginPage(false);
      navigate("/register");
    }
    return (
        <div>
            <div>
                <div className='mb-4 mt-4 text-center'>The Souled Store</div>
                <div className='text-center'>
                  <button 
                      className={`px-16 border border-green-500 ${loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`} 
                      onClick={loginhandle}
                  >
                      LOGIN
                  </button>
                  <button 
                      className={`px-16 border border-green-500 ${!loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`} 
                      onClick={registerhandle}
                  >
                      REGISTER
                  </button>
                </div>
                <Outlet/>
            </div>
        </div>
    );
}

export default HomeSign;
