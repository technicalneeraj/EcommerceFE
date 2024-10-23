import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";
import { useCartWishlist } from "../utility/CartWishlistContext";

import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import { useNavigate } from "react-router-dom";
import { authContext } from "../utility/AuthContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import YesOrNoModal from "../components/modals/YesOrNoModal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoaderModal from "../components/modals/LoaderModal";

const ProductData = () => {
  const { getCount } = useCartWishlist();
  const { userRole, userData } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const productUrl = `http://localhost:5173/product/${id}`;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const shirtSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const jeansSizes=["28","30","32","34","36"];
  const [descriptionClick, setDescriptionClick] = useState(false);
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isUpper,setIsUpper]=useState(true);
  const [inStock,setInStock]=useState(true);
  const [stock,setStock]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiRequest("GET", `/product/${id}`);
        setData(response.data.product);
        setCategory(response.data.product.category.type);
        setIsUpper(response.data.product.category.parent.includes("upper"));
        setInStock(response.data.product.stock>0);
        setStock(response.data.product.stock);

        if (
          response.data.product.tags &&
          response.data.product.tags.length > 0
        ) {
          const tagsArray = response.data.product.tags[0].split(",");
          setTags(tagsArray);
        } else {
          setTags([]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching product data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    checkInWishlist();
  }, [id]);
  const checkInWishlist = async () => {
    setLoading(true);
    if (userData) {
      const response = await apiRequest(
        "GET",
        `/product/check-is-in-wishlist?user=${userData.id}&product=${id}`
      );
      if (response.data.data === "yes") {
        setLoading(false);
        setIsWishlisted(true);
      } else {
        setLoading(false);
        setIsWishlisted(false);
      }
    } else {
      setLoading(false);
      setIsWishlisted(false);
    }
  };

  const wishlistHandler = async () => {
    if (!userData) {
      toast.error("Please login to add in wishlist");
      return;
    }
    setIsWishlisted(!isWishlisted);
    try {
      setLoading(true);
      const response = await apiRequest(
        "PATCH",
        `/user/updating-user-wishlist/${id}`
      );
      await getCount();
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  const addToCartHandler = async () => {
    if (!userData) {
      toast.error("Please login to add in cart");
      return;
    }
    if (selectedSize == null) {
      setIsSizeSelected(false);
      return;
    }
    const data = {
      size: selectedSize,
      quantity,
    };
    try {
      setLoading(true);
      const response = await apiRequest(
        "POST",
        `/user/add-to-cart/${id}`,
        data
      );
      await getCount();
      setIsAlreadyInCart(true);
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const productDelete = async () => {
    setLoading(true);
    const response = await apiRequest("DELETE", `/product/${id}`);
    setLoading(false);
    toast.success(response.data.message);
    navigate("/");
  };
  const sizeClickHandler = (size) => {
    setLoading(true);
    setSelectedSize(size);
    setIsSizeSelected(true);
    setLoading(false);
  };

  return loading ? (
    <>
      <LoaderModal isOpen={loading} text={"Wait for a while..."} />
    </>
  ) : (
    <div className="container pl-16 md:pl-0 mx-auto flex md:flex-row flex-col-reverse justify-center">
      <div className="left1 p-4">
        <div className="flex flex-wrap items-center justify-center">
          {data.images &&
            data.images.map((image) => (
              <div className="p-2" key={image.url}>
                <img src={image.url} alt="Product" className="w-full" />
              </div>
            ))}
        </div>
      </div>
      <div className="right1 flex flex-col pt-4 space-y-4">
        <div>
          <div className="text-3xl font-extrabold">{data.name}</div>
          <div className="text-gray-400 pb-3">{category}</div>
        </div>
        {userRole === "admin" && (
          <div className="font-bold text-white">
            <button
              className="border p-2 bg-red-500 mr-2"
              onClick={() => navigate(`/edit-product/${id}`)}
            >
              EDIT
            </button>
            <button
              className="border p-2 bg-red-500"
              onClick={() => setIsModalOpen(true)}
            >
              DELETE
            </button>
          </div>
        )}
        <hr />
        <div>
          <div>
            {data.discountPrice > 0 ? (
              <div className="flex space-x-2">
                <div className="font-extrabold text-2xl">
                  &#8377;{data.price - data.discountPrice}
                </div>
                <div className="line-through mt-1 text-gray-400">
                  &#8377; {data.price}
                </div>
              </div>
            ) : (
              <div className="font-extrabold text-2xl">
                &#8377; &nbsp;{data.price}{" "}
              </div>
            )}
          </div>
          <div className="text-gray-500">MRP incl. of all taxes</div>
        </div>
        <div className="font-bold">Please select a size.</div>
        <div className="flex space-x-3 flex-wrap md:flex-nowrap">
          {
            isUpper ?(shirtSizes.map((size) => (
              <div
                key={size}
                className={`border-2 rounded-3xl pr-3 pl-3 pt-2 pb-2 cursor-pointer 
                  ${selectedSize === size ? "border-black" : "border-gray-400"}`}
                onClick={() => sizeClickHandler(size)}
              >
                {size}
              </div>
            ))):(
              jeansSizes.map((size) => (
                <div
                  key={size}
                  className={`border-2 rounded-3xl pr-3 pl-3 pt-2 pb-2 cursor-pointer 
                    ${selectedSize === size ? "border-black" : "border-gray-400"}`}
                  onClick={() => sizeClickHandler(size)}
                >
                  {size}
                </div>
              ))
            )
          }
         
        </div>
        {!isSizeSelected && (
          <div className="border bg-red-400 p-3">Please select a size.</div>
        )}
        <div>
          Quantity
          <select
            className="ml-2 bg-white p-1 border border-gray-300 rounded-l"
            onChange={(e) => setQuantity(Number(e.target.value))}
            value={quantity}
          >
            <option value="" disabled>
              Select quantity
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {String(num).padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 flex">
          {!isAlreadyInCart ? (
            <button
            className={`py-2 px-5 mr-2 ${inStock ? 'bg-red-700 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed font-bold'}`}
              onClick={addToCartHandler}
              disabled={!inStock}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              className={"bg-green-700 text-white py-2 px-5 mr-2"}
              onClick={() => navigate("/cart")}
            >
              GO TO CART
            </button>
          )}
          {!isWishlisted ? (
            <button
              className={"border border-red-500 py-2 px-5 mt-2 lg:mt-0"}
              onClick={wishlistHandler}
            >
              <FavoriteBorderIcon /> ADD TO WISHLIST
            </button>
          ) : (
            <button
              className={"border border-red-500 py-2 px-5 mt-2 lg:mt-0"}
              onClick={wishlistHandler}
            >
              <FavoriteIcon /> ADDED TO WISHLIST
            </button>
          )}
        </div>
        {
          !inStock && <div className="text-red-700">Currently Out of Stock!!</div>
        }
        <div className="mt-3 flex space-x-2">
          <div>Share</div>
          <FacebookShareButton url={productUrl} quote={data.description}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={productUrl} title={data.name}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton
            url={productUrl}
            title={data.name}
            hashtags={["bro"]}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="pt-5">
          <div
            className="border w-96 p-2 border-gray-300 cursor-pointer"
            onClick={() => setDescriptionClick(!descriptionClick)}
          >
            <div className="flex justify-between">
              <div className="font-semibold">Product Description</div>
              <div>
                <KeyboardArrowDownIcon />
              </div>
            </div>
            {descriptionClick && <div className="mt-2">{data.description}</div>}
          </div>
        </div>
      </div>
      <YesOrNoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          productDelete();
          setIsModalOpen(false);
        }}
        image={data?.images && data.images.length > 0 ? data.images[0].url : ''}
        text1={data.name}
        text2={"Are u sure you want to delete this product"}
      />
    </div>
  );
};

export default ProductData;
