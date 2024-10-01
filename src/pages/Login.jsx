import React from 'react';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {apiRequest} from "../utility/Api";
import { useAuth } from '../utility/AuthContext';


const Login = () => {
    const { setIsLog } = useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();


    const handleLogin=async(e)=>{
        e.preventDefault();
        const response = await apiRequest('POST', '/um/user/login', { email:email,password:password});
        if(response.status===201){
            alert(response.data.message);
        }
        if(response.status===200){
          setIsLog(true);
          navigate("/");
        }
        console.log(response.data.message);
    }
    const createaccounthandler=()=>{
        navigate("/register",{ state: { alreadyhave: false } });
    }
  return (
    <>
        <div className='flex mx-20 my-4 justify-center'>
        <form onSubmit={handleLogin} className='flex flex-col'>
            <label htmlFor="user">Enter your registered email</label>
            <input type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}} id='user' className='bg-slate-300 mb-4 mt-4'></input>
            <label htmlFor="password">Enter a password</label>
            <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} id='password' className='bg-slate-300 mb-4 mt-4'></input>
            <Link to="/login/forgotpassword" className='text-red-600 underline mb-3 text-center'>forgotpassword?</Link>
            <button type='submit' className='bg-green-800 text-orange-50'>Proceed</button>
            <div className='mt-3 text-center'>New user? <span className='text-red-600 underline cursor-pointer' onClick={createaccounthandler}>Create Account</span></div>
        </form>
        </div>
    </>
  )
}

export default Login