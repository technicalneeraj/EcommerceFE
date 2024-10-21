import React, { useState } from "react";
import { apiRequest } from "../utility/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { authContext } from "../utility/AuthContext";
import ProfileLeft from "../components/ProfileLeft";

const Profile = () => {
  const navigate = useNavigate();
  const { userData } = useContext(authContext);
  const [firstname, setfirstname] = useState(userData.firstname);
  const [lastname, setlastname] = useState(userData.lastname);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(() => {
    const defaultAddress = userData.address.find(
      (addr) => addr.isDefault === true
    );
    return defaultAddress || null;
  });
  console.log(address);
  const savehandler = async (e) => {
    e.preventDefault();
    const data = {
      email: userData.email,
      firstname,
      lastname,
      phone,
    };
    try {
      const response = await apiRequest(
        "POST",
        "/um/user/update-profile",
        data
      );
      if (response.status == 200) {
        toast.success("Your Account Successfully Updated");
      }
    } catch (error) {
      toast.error("Something went wrong :( Please try again later");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <ProfileLeft firstname={firstname} lastname={lastname} />
        <div className="flex flex-col mb-3">
          <div>
            <div className="mb-2 text-gray-400">EDIT PROFILE</div>
            <div className="border p-6">
              <div>Email Id</div>
              <input
                type="text"
                className="bg-slate-300 p-3 rounded-xl"
                disabled
                value={`${userData.email}`}
              ></input>
            </div>
          </div>
          <div className="flex">
            <div className="border p-6 space-y-3">
              <div>General Information</div>
              <div>First Name*</div>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                className=" border p-2 rounded-xl capitalize"
              ></input>

              <div>Last Name</div>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className=" border p-2 rounded-xl capitalize"
              ></input>
            </div>

            <div className="border p-6 space-y-3">
              <div className="space-y-3">
                <div>Mobile Number*</div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className=" border p-2 rounded-xl capitalize"
                ></input>
              </div>
              <div>
                <div className="flex justify-between">
                  <div>Default Address</div>
                  <div
                    className="cursor-pointer hover:text-blue-500"
                    onClick={() => navigate("/profile-address")}
                  >
                    Change/Edit
                  </div>
                </div>
                <div className="border p-2 rounded-xl capitalize">
                  {address ? (
                    <div>
                      <div className="font-bold capitalize">
                        {address.firstName + " " + address.lastName}
                      </div>
                      <div>{address.buildingName}</div>
                      <div>{address.street}</div>
                      {address.landmark && <div>{address.landmark}</div>}
                      <div className="capitalize">
                        {address.city} - {address.postalCode}
                      </div>
                      <div>
                        Mobile{" "}
                        <span className="font-bold">{address.phone}</span>
                      </div>
                    </div>
                  ) : (
                    "No default address"
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={savehandler}
              className="bg-green-900 text-white pl-9 pr-9 mt-2 pt-2 pb-2 hover:bg-green-800"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
