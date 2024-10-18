import React, { useEffect, useState } from "react";
import ProfileLeft from "../components/ProfileLeft";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../utility/AuthContext";
import AddressCard from "../components/AddressCard";
import NewAddressModal from "../components/NewAddressModal";
import { apiRequest } from "../utility/Api";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const { userData } = useContext(authContext);
  useEffect(() => {
    const fetchAddress=async()=>{
      const response=await apiRequest("GET","/address/all");
      setAddresses(response.data.address);
    }
    fetchAddress();
  }, [userData,addresses]);

  return (
    <>
      <div className="flex flex-wrap justify-center pb-8">
        <ProfileLeft
          firstname={userData.firstname}
          lastname={userData.lastname}
        />
          {addresses.length > 0 && (
            addresses.map((address) => (
              <div className="flex flex-wrap mb-3 pt-2" key={address._id}>
                <AddressCard address={address} />
              </div>
            ))
          )}
          <AddressCard/>
        </div>
    </>
  );
};

export default Address;
