import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import "./AuthPage.css";

const AuthPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [loginpage, setLoginPage] = useState(location.pathname === "/login");

  useEffect(() => {
    setLoginPage(location.pathname === "/login");
  }, [loginpage, location]);

  const loginhandle = () => {
    setLoginPage(true);
    navigate("/login");
  };

  const registerhandle = () => {
    setLoginPage(false);
    navigate("/register");
  };

  return (
    
    <div className="flex justify-center outest bg-slate-200 overflow-hidden">
      <div className="mt-4 mb-4">
        <div className="mb-4 mt-4 text-center">
          <b>Shoper</b>
        </div>
        <div className="text-center buttons overflow-hidden">
          <button
            className={`px-16 border p-2 border-green-500 ${loginpage ? "bg-green-800 text-white" : "bg-white text-black"}`}
            onClick={loginhandle}
          >
            LOGIN
          </button>
          <button
            className={`px-16 border mt-2 sm:mt-2 p-2 border-green-500 ${!loginpage ? "bg-green-800 text-white" : "bg-white text-black"}`}
            onClick={registerhandle}
          >
            REGISTER
          </button>
        </div>
        <div className="bg-slate-100 border border-black p-3 m-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
