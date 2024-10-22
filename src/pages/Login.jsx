import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { apiRequest } from "../utility/Api";
import { authContext } from "../utility/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLog, setUserData, setUserRole } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const response = await apiRequest("POST", "/um/user/login", {
        email,
        password: password,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setUserData(response.data.user);
        setUserRole(response.data.user.role);
        setIsLog(true);
        const from = location.state?.from || "/";
        navigate(from);
      }
    } catch (error) {
      console.log(error);
      setIsLog(false);
      toast.error(error.response.data.message);
    }
  };

  const createaccounthandler = () => {
    navigate("/register");
  };
  
  return (
    <>
      <div className="flex mx-10 my-4 justify-center">
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="user"
            className=" mb-4 mt-4 rounded-xl p-2 focus:ring border border-gray-300"
            placeholder="Enter Registered Email"
          ></input>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            className="mb-4 mt-4 border border-gray-300 rounded-xl p-2 focus:ring"
          ></input>
          <Link
            to="/login/forgotpassword"
            className="text-red-600 underline mb-3 text-center"
          >
            forgotpassword?
          </Link>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-orange-50 rounded-xl p-2"
          >
            Proceed
          </button>
          <div className="mt-3 text-center">
            New user?{" "}
            <span
              className="text-red-600 underline cursor-pointer"
              onClick={createaccounthandler}
            >
              Create Account
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
