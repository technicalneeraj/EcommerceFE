import React, { useState } from 'react'
import { apiRequest } from '../utility/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';

const Profile = () => {
    const navigate = useNavigate();
    const { userData, setIsLog } = useContext(authContext);
    const [firstname, setfirstname] = useState(userData.firstname);
    const [lastname, setlastname] = useState(userData.lastname);
    const [phone, setPhone] = useState(userData.phone);
    const [address, setAddress] = useState(userData.address.length > 0 ? userData.address[0] : null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const savehandler = async (e) => {
        e.preventDefault();
        const data = {
            email: userData.email,
            firstname,
            lastname,
            phone,
        }
        try{
        const response = await apiRequest("POST", "/um/user/update-profile", data);
        if(response.status==200){
        toast.success("Your Account Successfully Updated")
        }
        }
        catch(error){
            toast.error("Something went wrong :( Please try again later")
        }

    }

    const logOutHandler = async () => {
        try {
            await apiRequest("POST", "/um/logout");
            setIsLog(false);
            toast.success("You logged out");
            navigate("/");
        }
        catch (error) {
            toast.error(error.response.message);
        }
    }
    const deleteAccountHandler = async () => {
        try {
            const response = await apiRequest("DELETE", "/um/deleteAccount", userData);
            if (response.status == 200) {
                setIsLog(false);
                toast.success("Your Account Deleted Successfully");
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    return (
        <>
            <div className='flex justify-center'>
                <div className='flex flex-col mr-6 mt-2 space-y-3'>
                    <div className='border bg-gray-300 p-4'>
                        <div className='capitalize'>{firstname + " " + lastname}</div>
                        <div>{userData.email}</div>
                    </div>
                    <button  onClick={() => setIsModalOpen(true)} className='border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white'>DELETE MY ACCOUNT</button>
                    <button onClick={logOutHandler} className='border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white'>LOGOUT</button>
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
                                <input type='text' value={address ? address : "No default address"} disabled onChange={(e) => setAddress(e.target.value)} className=" border p-2 rounded-xl capitalize"></input>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={savehandler} className='bg-green-900 text-white pl-9 pr-9 mt-2 pt-2 pb-2 hover:bg-green-800'>SAVE</button>
                    </div>
                </div>
            </div>
            <ConfirmationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    deleteAccountHandler();
                    setIsModalOpen(false); // Close the modal after confirming
                }}
            />
        </>
    )
}

export default Profile