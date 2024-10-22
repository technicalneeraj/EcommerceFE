import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../utility/Api";
import { authContext } from "../utility/AuthContext";
import ConfirmationModal from "./modals/ConfirmationModal";
import LogOutModal from "./modals/LogOutModal";

const ProfileLeft = ({ firstname, lastname }) => {

  const navigate = useNavigate();
  const { userData, setIsLog, setUserData, setUserRole } = useContext(authContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const logOutHandler = async () => {
    try {
      await apiRequest("POST", "/um/logout");
      setIsLog(false);
      setUserRole("");
      setUserData(null);
      toast.success("You logged out");
      navigate("/");
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      const response = await apiRequest(
        "DELETE",
        "/um/deleteAccount",
        userData
      );
      if (response.status == 200) {
        setIsLog(false);
        toast.success("Your Account Deleted Successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col mr-6 mt-2 space-y-3">
      <div className="border bg-gray-300 p-4">
        <div className="capitalize">{firstname + " " + lastname}</div>
        <div>{userData.email}</div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white"
      >
        DELETE MY ACCOUNT
      </button>
      <button
        onClick={() => setIsLogModalOpen(true)}
        className="border border-red-600 text-rose-700 p-3 hover:bg-red-600 hover:text-white"
      >
        LOGOUT
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          deleteAccountHandler();
          setIsModalOpen(false); // Close the modal after confirming
        }}
      />
      <LogOutModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onConfirm={() => {
          logOutHandler();
          setIsLogModalOpen(false);
        }}
        image={
          "https://www.thesouledstore.com/static/img/goodbye-image.c8453b4.jpg"
        }
        text1={"Confirm Logout"}
        text2={"Are you sure you want to logout?"}
      />
    </div>
  );
};

export default ProfileLeft;
