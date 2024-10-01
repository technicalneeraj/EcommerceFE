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
                navigate("/login")
            }
            if(error.response.status==404){
                navigate("/login")
            }
        }
    }

    const handleEditClick = async () => {
        try {
            const response = await axios.delete("http://localhost:8080/deletedataforedit", {
                data: { email }
            });
            
            if (response.status === 200) {
                navigate("/register", { state: { email, firstname, lastname, phone, password } });
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again.");
            }
            navigate("/login");
        }
    };
    
  return (
   <div className='mt-5 mb-5 text-center'>
   <form onSubmit={submithandler} className='text-center'>
    <label htmlFor="otp">Enter the otp you recieved on <span className='text-sky-400'><b>{email}</b></span></label>
    <span onClick={handleEditClick} className='bg-blue-400 text-orange-50 ml-3 p-1 cursor-pointer'>Edit</span>
    <br/>
    <input type='text' id='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} className='py-3 px-3 mt-5' placeholder="Enter otp..."></input>
    <button type='submit' className='bg-blue-400 text-white py-3 px-3'>Verify</button>
   </form>
   {
        respmsg? <div className='text-center'>{respmsg}</div>:<div></div>
   }
   
   </div>
  )
}

export default OtpPage