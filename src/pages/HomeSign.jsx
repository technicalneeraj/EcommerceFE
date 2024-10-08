import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import "./HomeSign.css"
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
        <div className='flex justify-center mr-24 ml-24 outest bg-slate-200'>
            <div className='mr-24 ml-24 mt-4 mb-4 bg-white'>
                <div className='mb-4 mt-4 text-center'><b>The Souled Store</b></div>
                <div className='text-center buttons'>
                  <button 
                      className={`px-16 border p-2 border-green-500 ${loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`} 
                      onClick={loginhandle}
                  >
                      LOGIN
                  </button>
                  <button 
                      className={`px-16 border p-2 border-green-500 ${!loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`} 
                      onClick={registerhandle}
                  >
                      REGISTER
                  </button>
                </div>
                <div className='bg-slate-100 border border-black p-3 m-5'>
                <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default HomeSign;
