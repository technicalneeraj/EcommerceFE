import React, { useState, useEffect } from 'react';
import { apiRequest } from '../utility/Api';
import { useNavigate, useLocation } from 'react-router-dom';
import "./signup.css";
import { toast } from 'react-toastify';

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { firstname, lastname, email, phone, password } = location.state || {};
        if (firstname) setFirstname(firstname);
        if (lastname) setLastname(lastname);
        if (email) setEmail(email);
        if (phone) setPhone(phone);
        if (password) setPassword(password);
    }, [location.state]);

    const alreadyaccount = () => {
        navigate("/login", { state: { alreadyhave: true } });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            return alert("Password didn't match");
        }
        const data = {
            firstname,
            lastname,
            email,
            password,
            phone,
        };

        try {
            const response = await apiRequest('POST', '/um/user-request', data);
            if (response.status === 200) {
                navigate("/otpverification", { state: { email, firstname, lastname, phone, password } });
            } else if (response.status === 201) {
               toast.error("User with entered email already exists.");
            }
        } catch (error) {
           toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex mx-20 my-4 justify-center ">
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <span className='names'>
                    <input
                        type='text'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        className='bg-slate-300 mb-4'
                        placeholder=' First Name*'
                    />
                    <input
                        type='text'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        className='bg-slate-300 mb-4 ml-4 lastname'
                        placeholder=' Last Name*'
                    />
                </span>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    className='bg-slate-300 mb-4 mt-4'
                    placeholder=' Email Id*'
                />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-slate-300 mb-4 mt-4'
                    placeholder=' Choose New Password*'
                />
                <input
                    type='password'
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='bg-slate-300 mb-4 mt-4'
                    placeholder=' Confirm Password*'
                />
                <input
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=' Mobile Number(For order status update)*'
                    className='bg-slate-300 mb-4 mt-4'
                />


                <button type='submit' className='bg-green-800 text-orange-50'>Register</button>
                <div className='mt-4 text-center'>
                    Already a Customer?
                    <span
                        onClick={alreadyaccount}
                        className='underline text-red-500 cursor-pointer'>
                        Login
                    </span>
                </div>            
            </form>
        </div>
    );
}

export default Signup;
