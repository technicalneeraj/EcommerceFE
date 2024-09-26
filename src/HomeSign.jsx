import React, { useState } from 'react'
import Login from './components/Login';
import Signup from './components/Signup';

const HomeSign = () => {
    const [loginpage,setloginpage]=useState(true);
  return (
    <div className='mx-20 bg-slate-200'>
        <div className="bg-white mx-20">
            <div className='mb-4 mt-4'>The Souled Store</div>
            <button className={`px-16 ${loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`} onClick={() => setloginpage(true)}>LOGIN</button>
            <button className={`px-16 ${!loginpage ? 'bg-green-800 text-white' : 'bg-white text-black'}`}
 onClick={()=>setloginpage(false)}>REGISTER</button>
            <div className='flex justify-center'>
            </div>
            <div>
            {
                loginpage ? <Login/> : <Signup/>
            }
            </div>
        </div>
    </div>
  )
}

export default HomeSign;