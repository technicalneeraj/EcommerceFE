import React, { useEffect, useState, useContext } from "react";

import { apiRequest } from "../utility/Api";
import { authContext } from "../utility/AuthContext";
import ProfileLeft from "../components/ProfileLeft";
import AddressCard from "../components/AddressCard";


const Address = () => {

  const { userData } = useContext(authContext);
  const [addresses, setAddresses] = useState([]);
 
  useEffect(() => {
    const fetchAddress = async () => {
      const response = await apiRequest("GET", "/address/all");
      setAddresses(response.data.address);
    };
    fetchAddress();
  }, [userData, addresses]);

  return (
    <>
      <div className="flex flex-wrap justify-center pb-8">
        <ProfileLeft
          firstname={userData.firstname}
          lastname={userData.lastname}
        />
        {addresses.length > 0 &&
          addresses.map((address) => (
            <div className="flex flex-wrap mb-3 pt-2" key={address._id}>
              <AddressCard address={address} />
            </div>
          ))}
        <AddressCard />
      </div>
    </>
  );
};

export default Address;
