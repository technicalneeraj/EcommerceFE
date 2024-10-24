import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { apiRequest } from "../utility/Api";
import OtpPage from "./OtpPage";
import LoaderModal from "../components/modals/LoaderModal";

const Register = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isOtpPage, setIsOtpPage] = useState(false);
  const [isLoding, setIsLoading] = useState(false);

  useEffect(() => {
    const { firstname, lastname, email, phone, password } =
      location.state || {};
    if (firstname) setFirstname(firstname);
    if (lastname) setLastname(lastname);
    if (email) setEmail(email);
    if (phone) setPhone(phone);
    if (password) setPassword(password);
  }, [location.state]);

  const alreadyaccount = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password || !phone) {
      return toast.error("Please enter all the details.");
    }
    if (password !== confirmpassword) {
      return toast.error("Password didn't match");
    }
    const data = {
      firstname,
      lastname,
      email,
      password,
      phone,
    };

    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/um/user-request", data);
      if (response.status === 200) {
        setIsLoading(false);
        setIsOtpPage(true);
      } else if (response.status === 201) {
        toast.error("User with entered email already exists.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <LoaderModal isOpen={isLoding} text={"Wait for few seconds..."} />
      {isOtpPage ? (
        <OtpPage
          email={email}
          firstname={firstname}
          lastname={lastname}
          phone={phone}
          password={password}
        />
      ) : (
        <div className="flex justify-center ">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="p-2 rounded-xl w-full sm:w-1/2 border border-gray-300 focus:ring"
                placeholder=" First Name*"
              />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="lastname border w-full sm:w-1/2 border-gray-300 p-2 mt-3 sm:mt-0 rounded-xl focus:ring"
                placeholder=" Last Name*"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="mt-4 p-2  border border-gray-300 rounded-xl focus:ring"
              placeholder=" Email Id*"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-4 p-2 rounded-xl  border border-gray-300  focus:ring"
              placeholder=" Choose New Password*"
            />
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 mt-4 p-2 rounded-xl focus:ring"
              placeholder=" Confirm Password*"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" Mobile Number(For order status update)*"
              className="  border border-gray-300 mb-4 mt-4 p-2 rounded-xl focus:ring"
            />

            <button
              type="submit"
              className="bg-green-800 text-orange-50 p-2 rounded-xl"
            >
              Register
            </button>
            <div className="mt-4 text-center">
              Already a Customer?&nbsp;
              <span
                onClick={alreadyaccount}
                className="underline text-red-500 cursor-pointer"
              >
                Login
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
