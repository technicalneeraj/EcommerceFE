import React, { useState } from 'react';
import { apiRequest } from "../utility/Api";
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpclicked, setOtpclicked] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpverifymsg, setOtpVerifyMsg] = useState("");
    const [verified, setVerified] = useState(false);
    const [newpassword,setNewPassword]=useState("");

    const forgothandler = async (e) => {
        e.preventDefault();
        try {
            const response = await apiRequest('POST', '/forgototpsender', { email });
            setOtpclicked(true);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const otpverifyhandler = async (e) => {
        e.preventDefault();
        try {
            const response = await apiRequest('POST', '/forgototpverify', { email, otp });
            if (response.status === 200) {
                setVerified(true);
                setOtpVerifyMsg(response.data.message);
            }
        } catch (error) {
            if (error.response.status === 403) {
                navigate("/login");
            }
            setOtpVerifyMsg(error.response.data.message);
        }
    }

    const Otpclicked = (e) => {
        e.preventDefault(); 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email !== "" && emailPattern.test(email)) {
            forgothandler(e);
        } else {
            alert("Please enter a valid email address.");
        }
    }

    const newpasswordchange=async(e)=>{
        e.preventDefault();
        try{
            const response = await apiRequest('PATCH', '/changepassword', { email, newpassword });
            if(response.status==200){
                navigate("/login");
            }
        }
        catch(error){
            console.log(error);
            navigate("/login");
        }
    }

    return (
        <div className='text-center'>
            <form>
                <label htmlFor="user">Enter your registered email</label>&nbsp;
                <input
                    type='email'
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    id='user'
                    className='bg-slate-300 mb-4 mt-4'
                    disabled={otpclicked}
                />
                <br />
                {
                    !otpclicked && 
                    <button type='submit' onClick={Otpclicked} className='bg-blue-400 text-orange-50 mb-3 p-3'>
                        Send OTP
                    </button>
                }
            </form>
            {
                otpclicked && !verified &&
                <form className='mb-4' onSubmit={otpverifyhandler}>
                    <label htmlFor="otp">Enter the OTP you received on your entered email</label>
                    <input
                        type='text'
                        id='otp'
                        className='ml-2 bg-slate-300'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type='submit' className='bg-blue-400 text-orange-50 ml-4 p-2'>Verify</button>
                </form>
            }
            {
                otpverifymsg && <div className='mb-3'>{otpverifymsg}</div>
            }
            {
                verified && <div>
                    <form onSubmit={newpasswordchange} className='mb-3'>
                    <label htmlFor="newpassword">Enter your new Password</label>
                    <input
                        type='text'
                        id='newpassword'
                        className='ml-2 bg-slate-300'
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type='submit' className='ml-2 bg-blue-400 text-orange-50 p-2'>Save</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Forgotpassword;
