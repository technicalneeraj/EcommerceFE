import React, { useState,useEffect } from 'react';
import { apiRequest } from '../utility/Api';
import { useNavigate ,useLocation} from 'react-router-dom';

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(""); 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const { firstname, lastname, email, phone ,password} = location.state || {};
        if (firstname) setFirstname(firstname);
        if (lastname) setLastname(lastname);
        if (email) setEmail(email);
        if (phone) setPhone(phone);
        if(password) setPassword(password);
    }, [location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstname,
            lastname,
            email,
            password,
            phone,
        };

        try {
            const response =await apiRequest('POST', '/um/user-request',data);
            if (response.status === 200) {
                navigate("/otpverification", { state: { email,firstname,lastname,phone,password} });
            } else if (response.status === 201) {
                alert("User with entered email already exists.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-white mx-20 my-4 flex justify-center">
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="firstname">Firstname</label>
                <input 
                    type='text' 
                    value={firstname} 
                    onChange={(e) => setFirstname(e.target.value)} 
                    id='firstname' 
                    className='bg-slate-300 mb-4' 
                />

                <label htmlFor="lastname">Lastname</label>
                <input 
                    type='text' 
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    id='lastname' 
                    className='bg-slate-300 mb-4' 
                />

                <label htmlFor="phone">Phone</label>
                <input 
                    type='text' 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    id='phone' 
                    className='bg-slate-300 mb-4' 
                />

                <label htmlFor="password">Enter a password</label>
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    id='password' 
                    className='bg-slate-300 mb-4 mt-4' 
                />

                <label htmlFor="email">Enter an email</label>
                <input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    id='email' 
                    className='bg-slate-300 mb-4 mt-4' 
                />

                <button type='submit' className='bg-blue-400 text-orange-50'>Signup</button>
            </form>
        </div>
    );
}

export default Signup;
