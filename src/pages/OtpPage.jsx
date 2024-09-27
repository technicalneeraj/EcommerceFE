import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, useLocation,Link } from 'react-router-dom';

const OtpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, firstname, lastname, phone,password } = location.state || {};  
    const [otp,setOtp]=useState("");
    const [respmsg,setRespmsg]=useState("");

    const submithandler=async(e)=>{
        e.preventDefault();
        const data={
            otpf:otp,
            email
        }
        try{
            const response=await axios.post("http://localhost:8080/um/user-request/verifyOTP",data);
            setRespmsg(response.data.message);
            if(response.status==200){
                navigate("/login");
            }
        }
        catch (error) {
            setRespmsg(error.response.data.message);
            if(error.response.status==403){
                navigate("/homesign")
            }
            if(error.response.status==404){
                navigate("/homesign")
            }
        }
    }

    const handleEditClick=()=>{
        navigate("/signup",{state:{email, firstname, lastname, phone,password}});
    }
  return (
   <div className='mt-5 mb-5'>
   <form onSubmit={submithandler}>
    <label htmlFor="otp">Enter the otp you recieved on <span className='text-sky-400'><b>{email}</b></span></label>
    <span onClick={handleEditClick} className='bg-blue-400 text-orange-50 ml-3 p-1 cursor-pointer'>Edit</span>
    <br/>
    <input type='text' id='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} className='py-3 px-3 mt-5' placeholder="Enter otp..."></input>
    <button type='submit' className='bg-blue-400 text-white py-3 px-3'>Verify</button>
   </form>
   {
        respmsg? <div>{respmsg}</div>:<div></div>
   }
   
   </div>
  )
}

export default OtpPage