import React, { useState } from 'react'
import { apiRequest } from '../utility/Api';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';

const Profile = () => {
    const { userData } = useContext(authContext);
    const [firstname, setfirstname] = useState(userData.firstname);
    const [lastname, setlastname] = useState(userData.lastname);
    const [phone, setPhone] = useState(userData.phone);
    const [address, setAddress] = useState(userData.address.length > 0 ? userData.address[0] : null)

    const savehandler = async(e) => {
        e.preventDefault();
        const data={
            email:userData.email,
            firstname,
            lastname,
            phone,
            // address,
        }
        const response=await apiRequest("POST","/um/user/update-profile",data);
        console.log(response);

    }
    return (
        <>
            <div className='flex justify-center'>
                <div className='flex flex-col mr-6 mt-2 space-y-3'>
                    <div className='border bg-gray-300 p-4'>
                        <div className='capitalize'>{firstname + " " + lastname}</div>
                        <div>{userData.email}</div>
                    </div>
                    <button className='border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white'>DELETE MY ACCOUNT</button>
                    <button className='border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white'>LOGOUT</button>
                </div>
                <div className='flex flex-col mb-3'>
                    <div>
                        <div className='mb-2 text-gray-400'>EDIT PROFILE</div>
                        <div className='border p-6'>
                            <div>Email Id</div>
                            <input type='text' className='bg-slate-300 p-3 rounded-xl' disabled value={`${userData.email}`}></input>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='border p-6 space-y-3'>
                            <div>General Information</div>
                            <div>First Name*</div>
                            <input type='text' value={firstname} onChange={(e) => setfirstname(e.target.value)} className=" border p-2 rounded-xl capitalize"></input>

                            <div>Last Name</div>
                            <input type='text' value={lastname} onChange={(e) => setlastname(e.target.value)} className=" border p-2 rounded-xl capitalize"></input>

                        </div>

                        <div className='border p-6 space-y-3'>
                            <div className='space-y-3'>
                                <div>Mobile Number*</div>
                                <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} className=" border p-2 rounded-xl capitalize"></input>
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <div>Default Address</div>
                                    <div className='cursor-pointer hover:text-blue-500'>Edit</div>
                                </div>
                                <input type='text' value={address? address : "No default address"} disabled onChange={(e) => setAddress(e.target.value)} className=" border p-2 rounded-xl capitalize"></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={savehandler} className='bg-green-900 text-white pl-9 pr-9 mt-2 pt-2 pb-2 hover:bg-green-800'>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile