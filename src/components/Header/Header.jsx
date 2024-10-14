import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import Logout from "../Logout";
import { authContext } from "../../utility/AuthContext";
import { useCategory } from "../../utility/CategoryContext";

const Header = () => {
  const { setCurrentCategory, currentCategory } = useCategory();
  const { isLog, userRole } = useContext(authContext);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isDownOpen, setIsDownOpen] = useState(false);
  const [profileOpen, setIsProfileOpen] = useState(false);
  const [adminTools, setAdminTools] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    navigate(`/${category}`);
  };

  return (
    <>
      <div className="w-full h-12 bg-red-600">
        <div className="flex text-white justify-center w-1/2">
          <div
            onClick={() => handleCategoryClick("women")}
            className={`border border-black h-12 px-5 pt-2 cursor-pointer text-center font-bold ${currentCategory === "women" ? "bg-white text-black" : ""}`}
          >
            Women
          </div>
          <div
            onClick={() => handleCategoryClick("men")}
            className={`border border-black h-12 px-5 pt-2 cursor-pointer text-center font-bold ${currentCategory === "men" ? "bg-white text-black" : ""}`}
          >
            Men
          </div>
          <div
            onClick={() => handleCategoryClick("kids")}
            className={`border border-black h-12 px-5 pt-2 cursor-pointer text-center font-bold ${currentCategory === "kids" ? "bg-white text-black" : ""}`}
          >
            Kids
          </div>
        </div>
      </div>
      <div className=" w-full justify-between flex p-6 items-center bg-white relative ">
        <div className="flex space-x-7 ml-4 h-full items-center">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            Shoper
          </div>
          <div>
            <div
              className="cursor-pointer hover:text-red-600 h-full hide-on-small"
              onMouseEnter={() => setIsTopOpen(true)}
              onMouseLeave={() => setIsTopOpen(false)}
            >
              Topwear{" "}
              <span>
                <KeyboardArrowDownIcon />
              </span>
            </div>
            {isTopOpen && (
              <div
                className="absolute z-50 bg-white border border-gray-300 shadow-md mt-1"
                onMouseEnter={() => setIsTopOpen(true)}
                onMouseLeave={() => setIsTopOpen(false)}
              >
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Shirts
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Tshirts
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Tops
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Jackets
                </div>
              </div>
            )}
          </div>

          <div>
            <div
              className="cursor-pointer hover:text-red-600 hide-on-small"
              onMouseEnter={() => setIsDownOpen(true)}
              onMouseLeave={() => setIsDownOpen(false)}
            >
              Downwear{" "}
              <span>
                <KeyboardArrowDownIcon />
              </span>
            </div>
            {isDownOpen && (
              <div
                className="absolute z-50 bg-white border border-gray-300 shadow-md mt-1"
                onMouseEnter={() => setIsDownOpen(true)}
                onMouseLeave={() => setIsDownOpen(false)}
              >
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Jeans
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Shorts
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Trousers
                </div>
                <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                  Skirts
                </div>
              </div>
            )}
          </div>
          {isLog && userRole == "admin" && (
            <div>
              <div
                className="cursor-pointer hover:text-red-600 hide-on-small"
                onMouseEnter={() => setAdminTools(true)}
                onMouseLeave={() => setAdminTools(false)}
              >
                Admin Tools{" "}
                <span>
                  <KeyboardArrowDownIcon />
                </span>
              </div>
              {adminTools && (
                <div
                  className="absolute z-50 bg-white border border-gray-300 shadow-md mt-1"
                  onMouseEnter={() => setAdminTools(true)}
                  onMouseLeave={() => setAdminTools(false)}
                >
                  <div onClick={()=>navigate("/add-product")} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    Add Product
                  </div>
                  <div onClick={()=>navigate("/add-category")} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    Add Category
                  </div>
                  <div onClick={()=>navigate("/add-banner")} className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    Add Banner
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 pr-4">
          <div className="cursor-pointer">
            <SearchIcon />
          </div>
          <div
            className="cursor-pointer hover:text-red-600 relative"
            onMouseEnter={() => setIsProfileOpen(true)}
          >
            <PersonIcon />
            {profileOpen && (
              <div
                className="absolute z-50 bg-white border border-gray-300 shadow-md mt-1"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                {isLog ? (
                  <></>
                ) : (
                  <div
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                )}
                {isLog && (
                  <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">
                    <Logout />
                  </div>
                )}
                {isLog && (
                  <div
                    onClick={() => navigate("/profile")}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/mywishlist")}
          >
            <FavoriteBorderIcon />
          </div>
          <div className="cursor-pointer" onClick={() => navigate("/cart")}>
            <LocalMallIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
