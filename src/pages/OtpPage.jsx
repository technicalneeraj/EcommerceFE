import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiRequest } from '../utility/Api';

const OtpPage = ({ email, firstname, lastname, phone, password }) => {
    
    const navigate = useNavigate();
    const [otp,setOtp]=useState("");
    const [respmsg,setRespmsg]=useState("");

    const submithandler=async(e)=>{
        e.preventDefault();
        const data={
            otpf:otp,
            email
        }
        try{
            const response=await apiRequest("POST","/um/user-request/verify-OTP",data);
            setRespmsg(response.data.message);
            if(response.status==200){
                toast.success("Your Account Successfully Created");
                navigate("/login");
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
            setRespmsg(error.response.data.message);
            if(error.response.status==410){
                navigate("/login")
            }
            if(error.response.status==404){
                navigate("/login")
            }
            if(error.response.status==423){
                navigate("/login")
            }
        }
    }

    const handleEditClick = async () => {
        console.log(email);
        try {
            const response = await apiRequest("DELETE","/delete-data-for-edit", {
                data: { email }
            });
            
            if (response.status === 200) {
                navigate("/register", { state: { email, firstname, lastname, phone, password } });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
            navigate("/login");
        }
    };
    
  return (
   <div className='mt-5 mb-5 text-center'>
   <form onSubmit={submithandler} className='text-center'>
    <label htmlFor="otp">Enter the otp you recieved on <span className='text-sky-400'><b>{email}</b></span></label>
    {/* <span onClick={handleEditClick} className='bg-blue-400 text-orange-50 ml-3 p-1 cursor-pointer'>Edit</span> */}
    <br/>
    <input type='text' id='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} className='py-3 px-3 mt-5' placeholder="Enter otp..."></input>
    <button type='submit' className='bg-blue-400 text-white py-3 ml-2 px-3'>Verify</button>
   </form>
   {
        respmsg? <div className='text-center'>{respmsg}</div>:<div></div>
   }
   
   </div>
  )
}

export default OtpPage