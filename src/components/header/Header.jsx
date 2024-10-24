import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoaderModal from "../modals/LoaderModal";

import { authContext } from "../../utility/AuthContext";
import { useCategory } from "../../utility/CategoryContext";
import { apiRequest } from "../../utility/Api";
import { useCartWishlist } from "../../utility/CartWishlistContext";

import Logout from "../Logout";
import "./Header.css";

const Header = () => {
  const { setCurrentCategory, currentCategory } = useCategory();
  const { isLog, userRole } = useContext(authContext);
  const { totalItemInCart, totalItemInWishlist, isLoading } = useCartWishlist();
  const navigate = useNavigate();

  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isDownOpen, setIsDownOpen] = useState(false);
  const [profileOpen, setIsProfileOpen] = useState(false);
  const [adminTools, setAdminTools] = useState(false);
  const [topCategory, setTopCategory] = useState([]);
  const [downCategory, setDownCategory] = useState([]);
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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

  const searchHandler = () => {
    if (searchValue === "" || searchValue.trim() === "") {
      return;
    }
    navigate(`/search?q=${searchValue}`);
  };

  return (
    <>
      <LoaderModal isOpen={isLoading} text={"Wait for a while"} />
      <div className="w-full h-12 bg-red-600">
        <div className="flex text-white justify-center md:w-1/2 w-full">
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
          <div
            className="p-1 flex flex-col hide-on-small"
            onMouseEnter={() => setIsTopOpen(true)}
            onMouseLeave={() => setIsTopOpen(false)}
          >
            <div className="cursor-pointer hover:text-red-600 h-full hide-on-small">
              Topwear{" "}
              <span>
                <KeyboardArrowDownIcon />
              </span>
            </div>
            <div>
              {isTopOpen && (
                <div
                  className="absolute z-50 bg-white border border-gray-300 shadow-md mt-1 w-24 text-center"
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
          </div>

          <div className="p-1 flex flex-col hide-on-small">
            <div
              className="cursor-pointer hover:text-red-600 h-full hide-on-small"
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
                className="absolute z-50 bg-white border border-gray-300 shadow-md mt-6 w-24 text-center"
                onMouseEnter={() => setIsDownOpen(true)}
                onMouseLeave={() => setIsDownOpen(false)}
              >
                {downCategory.map((value) => (
                  <div
                    onClick={() => navigate(`/${currentCategory}/${value}`)}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                    key={value}
                  >
                    {value.charAt(0).toUpperCase() +
                      value.slice(1).toLowerCase()}
                  </div>
                ))}
              </div>
            )}
          </div>
          {isLog && userRole == "admin" && (
            <div className="p-1">
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

        <div className="flex items-center space-x-4">
          <div
            className={`flex p-2 ${searchHovered ? "bg-gray-200" : ""}`}
            onMouseLeave={() => setSearchHovered(false)}
          >
            {searchHovered && (
              <div className="hide-on-small">
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
              className="cursor-pointer hide-on-small"
              onMouseEnter={() => setSearchHovered(true)}
              onClick={searchHandler}
            >
              <SearchIcon />
            </div>
          </div>
          <div
            className="cursor-pointer hover:text-red-600 flex flex-col relative"
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <PersonIcon />
            {profileOpen && (
              <div
                className="absolute z-50 bg-white border border-gray-300 shadow-md mt-6 w-24 text-center"
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
                {isLog && (
                  <div
                    onClick={() => navigate("/myOrders")}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="cursor-pointer relative"
            onClick={() => navigate("/mywishlist")}
          >
            <FavoriteBorderIcon />
            {isLog && totalItemInWishlist > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600  text-white tex-xs flex items-center justify-center w-5 h-5 rounded-full">
                {totalItemInWishlist}
              </div>
            )}
          </div>

          <div
            className="cursor-pointer relative"
            onClick={() => navigate("/cart")}
          >
            <LocalMallIcon />
            {isLog && totalItemInCart > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs flex items-center justify-center w-5 h-5 rounded-full">
                {totalItemInCart}
              </div>
            )}
          </div>

          <div
            className="md:hidden"
            onClick={()=>setIsMoreOpen(!{isMoreOpen})}
            onMouseEnter={() => setIsMoreOpen(true)}
            onMouseLeave={() => setIsMoreOpen(false)}
          >
            <div className="relative">
              <MoreVertIcon />
              {isMoreOpen && (
                <div
                  className="bg-white z-50 cursor-pointer absolute -left-24 w-28 top-12 text-center flex items-center space-y-1 justify-center flex-col"
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  {userRole === "admin" && (
                    <div
                      className="hover:text-red-600"
                      onClick={() => navigate("/add-product")}
                    >
                      Add Product
                    </div>
                  )}
                  {userRole === "admin" && (
                    <div
                      className="hover:text-red-600"
                      onClick={() => navigate("/add-banner")}
                    >
                      Add Banner
                    </div>
                  )}
                  {userRole === "admin" && (
                    <div
                      className="hover:text-red-600"
                      onClick={() => navigate("/add-category")}
                    >
                      Add Category
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
