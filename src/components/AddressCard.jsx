import React, { useContext, useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewAddressModal from "./NewAddressModal";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditAddressModal from "./EditAddressModal";

const AddressCard = ({ address }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const removeAddressHandler = async () => {
    try {
      const response = await apiRequest("DELETE", `/address/${address._id}`);
      toast.success(response.data.message);
      navigate("/profile-address");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div>
        {address ? (
          <div className="border bg-gray-200 flex flex-wrap flex-col  h-52 w-72  pl-2 space-y-1 justify-center items-start mr-2">
            <div className="font-bold capitalize">
              {address.firstName + " " + address.lastName}
            </div>
            <div>{address.buildingName}</div>
            <div>{address.street}</div>
            {address.landmark !== "" && <div>{address.landmark}</div>}
            <div className="capitalize">
              {address.city} - {address.postalCode}
            </div>
            <div>
              Mobile <span className="font-bold">{address.phone}</span>
            </div>
            <div className="flex">
              <div
                className="font-bold text-sm  cursor-pointer border bg-white p-1 rounded-xl mr-2"
                onClick={() => setIsEditModalOpen(true)}
              >
                EDIT
              </div>
              <div
                className="font-bold text-sm cursor-pointer border bg-white p-1 rounded-xl"
                onClick={removeAddressHandler}
              >
                REMOVE
              </div>
            </div>
          </div>
        ) : (
          <div className="border bg-gray-200 flex flex-wrap flex-col  h-52 w-72 mt-2  items-center justify-center">
            <div
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <AddCircleIcon />
            </div>
            <div
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="cursor-pointer"
            >
              Add new address
            </div>
          </div>
        )}
      </div>
      <NewAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
        }}
        text={"Add New Address"}
      />
      <EditAddressModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={() => {
          setIsEditModalOpen(false);
        }}
        text={"Edit Address"}
        address={address}
      />
    </>
  );
};

export default AddressCard;
