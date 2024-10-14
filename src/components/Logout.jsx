import React,{useState} from 'react';
import { apiRequest } from '../utility/Api';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LogOutModal from './LogOutModal';
const Logout = () => {
    const navigate=useNavigate();
    const { setIsLog ,setUserRole} =  useContext(authContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await apiRequest('POST', '/um/logout');
            if (response.status === 200) {
                toast.success("You Successfully LogOut");
                setIsLog(false);
                setUserRole("");
                navigate("/");
                // window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <>
        <button onClick={() => setIsModalOpen(true)}>
            Logout
        </button>
        <LogOutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    handleLogout();
                    setIsModalOpen(false); 
                }}
                image={"https://www.thesouledstore.com/static/img/goodbye-image.c8453b4.jpg"}
                text1={"Confirm Logout"}
                text2={"Are you sure you want to logout?"}
            />
        </>
    );
};

export default Logout;
