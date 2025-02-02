import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { apiRequest } from "../utility/Api";
import LoaderModal from "../components/modals/LoaderModal";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpclicked, setOtpclicked] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpverifymsg, setOtpVerifyMsg] = useState("");
  const [verified, setVerified] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgothandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/forgot-password-otp", {
        email,
      });
      toast.success(response.data.message);
      setOtpclicked(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast(error.response.data.message);
    }
  };

  const otpverifyhandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/forgot-OTP-verify", {
        email,
        otp,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setVerified(true);
        setOtpVerifyMsg(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 403) {
        toast.error(error.response.data.message);
        navigate("/login");
      }
      setOtpVerifyMsg(error.response.data.message);
    }
  };

  const Otpclicked = (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter an email");
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email !== "" && emailPattern.test(email)) {
        forgothandler(e);
      } else {
        toast.error("Please enter an valid email");
      }
    }
  };

  const newpasswordchange = async (e) => {
    e.preventDefault();
    if (newpassword.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }
    try {
      setIsLoading(true);
      const response = await apiRequest("PATCH", "/change-password", {
        email,
        newpassword,
      });
      if (response.status == 200) {
        setIsLoading(false);
        toast.success("Your password successfully changed");
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
      navigate("/login");
    }
  };

  return (
    <>
      <LoaderModal isOpen={isLoading} text={"Please wait for a while"} />
      <div className="text-center flex flex-col bg-gray-200 ml-10 mr-10 lg:ml-20 lg:mr-20 lg:p-40 pt-3">
        <div className="font-extrabold lg:text-xl text-sm">
          Forgot Password? Dont worry !! Fill your details below
        </div>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="user"
            className=" mb-4 mt-4 p-3 rounded-xl border border-gray-200"
            placeholder="Enter your registered email"
            disabled={otpclicked}
          />
          <br />
          {!otpclicked && (
            <button
              type="submit"
              onClick={Otpclicked}
              className="bg-blue-400 text-orange-50 mb-3 p-3"
            >
              Send OTP
            </button>
          )}
        </form>
        {otpclicked && !verified && (
          <form className="mb-4" onSubmit={otpverifyhandler}>
            <label htmlFor="otp">
              Enter the OTP you received on your entered email
            </label>
            <input
              type="text"
              id="otp"
              className="ml-2  p-2 rounded-xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-400 text-orange-50 ml-4 p-2 mt-2 lg:mt-0 rounded-xl"
            >
              Verify
            </button>
          </form>
        )}
        {otpverifymsg && <div className="mb-3">{otpverifymsg}</div>}
        {verified && (
          <div>
            <form onSubmit={newpasswordchange} className="mb-3">
              <label htmlFor="newpassword">Enter your new Password</label>
              <input
                type="text"
                id="newpassword"
                className="ml-2 bg-slate-300 rounded-xl p-2"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 bg-blue-400 text-orange-50 p-3 rounded-xl mt-2 lg:mt-0"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Forgotpassword;
