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
import { apiRequest } from "../../utility/Api";

const Header = () => {
  const { setCurrentCategory, currentCategory } = useCategory();
  const { isLog, userRole } = useContext(authContext);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isDownOpen, setIsDownOpen] = useState(false);
  const [profileOpen, setIsProfileOpen] = useState(false);
  const [adminTools, setAdminTools] = useState(false);
  const [topCategory, setTopCategory] = useState([]);
  const [downCategory, setDownCategory] = useState([]);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    navigate(`/${category}`);
  };

  useEffect(() => {
    fetchTopwear();
    fetchDownwear();
  }, [currentCategory]);

  const fetchTopwear = async () => {
    const response = await apiRequest(
      "GET",
      `/api/categories?p1category=${currentCategory}&p2category=upper`
    );
    const responseArray = response.data.map((single) => single.type);
    setTopCategory(responseArray);
  };

  const fetchDownwear = async () => {
    const response = await apiRequest(
      "GET",
      `/api/categories?p1category=${currentCategory}&p2category=lower`
    );
    const responseArray = response.data.map((single) => single.type);
    setDownCategory(responseArray);
  };

  const searchHandler=()=>{
    if(searchValue==="" || searchValue.trim()===""){
      return;
    }
    navigate(`/search?q=${searchValue}`);
  }

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
      <div className=" w-full justify-between flex p-6 items-center bg-white sticky top-0 z-50">
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
                {topCategory.map((value) => {
                  return (
                    <div
                      onClick={() => navigate(`/${currentCategory}/${value}`)}
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      key={value}
                    >
                      {value.charAt(0).toUpperCase() +
                        value.slice(1).toLowerCase()}
                    </div>
                  );
                })}
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
                {downCategory.map((value) => {
                  return (
                    <div
                      onClick={() => navigate(`/${currentCategory}/${value}`)}
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      key={value}
                    >
                      {value.charAt(0).toUpperCase() +
                        value.slice(1).toLowerCase()}
                    </div>
                  );
                })}
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
                  <div
                    onClick={() => navigate("/add-product")}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Add Product
                  </div>
                  <div
                    onClick={() => navigate("/add-category")}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Add Category
                  </div>
                  <div
                    onClick={() => navigate("/add-banner")}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Add Banner
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 pr-4">
          <div
            className={`flex p-2 ${searchHovered ? "bg-gray-200" : ""}`}
            onMouseLeave={() => setSearchHovered(false)}
          >
            {searchHovered && (
              <div>
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="What are you looking for?"
                  className="bg-gray-200 focus:outline-none"
                />
              </div>
            )}
            <div
              className="cursor-pointer"
              onMouseEnter={() => setSearchHovered(true)}
              onClick={searchHandler}
            >
              <SearchIcon />
            </div>
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
