import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

const OtpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email; 
    const [otp,setOtp]=useState("");
    const [respmsg,setRespmsg]=useState("");

    const submithandler=async(e)=>{
        e.preventDefault();
        const data={
            otpf:otp,
            email
        }
        try{
            const response=await axios.post("http://localhost:8080/otpvalidate",data);
            setRespmsg(response.data.message);
            if(response.status==200){
                navigate("/login");
            }
            if(response.message==403){
                navigate("/homesign")
            }
        }
        catch (error) {
            setRespmsg(error.response.data.message);
        }
    }
  return (
   <div className='mt-5 mb-5'>
   <form onSubmit={submithandler}>
    <label htmlFor="otp">Enter the otp you recieved on <span className='text-sky-400'><b>{email}</b></span></label>
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