import React, { useEffect, useState } from "react";
import ProfileLeft from "../components/ProfileLeft";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../utility/AuthContext";
import AddressCard from "../components/AddressCard";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const { userData } = useContext(authContext);
  useEffect(() => {
    if (userData && userData.Address) {
      setAddresses(userData.Address);
    }
  }, [userData]);

  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <ProfileLeft
        firstname={userData.firstname}
        lastname={userData.lastname}
      />
      <div className="flex flex-col mb-3">
        {addresses.length > 0 &&
          addresses.map((address) => {
            <AddressCard address={address} />;
          })}
        
        <AddressCard/>
      </div>
    </div>
  );
};

export default Address;
