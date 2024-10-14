import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { authContext } from "../utility/AuthContext";
import YesOrNoModal from "../components/YesOrNoModal";

const ProductData = () => {
  const {userRole}=useContext(authContext)
  const { id } = useParams();
  const navigate=useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const [descriptionClick, setDescriptionClick] = useState(false);
  const [isSizeSelected, setIsSizeSelected] = useState(true);
  const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const response = await apiRequest("GET", `/product/${id}`);
        setData(response.data.product);
        if (response.data.product.category) {
          const catResponse = await apiRequest(
            "GET",
            `/product/category/${response.data.product.category}`
          );
          setCategory(catResponse.data.category.type);
        }
        const tagsArray = response.data.product.tags[0].split(",");
        setTags(tagsArray);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error("Error fetching product data");
      }
    };

    fetchdata();
  }, [id]);

  const addToCartHandler = async () => {
    if (selectedSize == null) {
      setIsSizeSelected(false);
      return;
    }
    const data = {
      size: selectedSize,
      quantity,
    };
    const response = await apiRequest("POST", `/user/add-to-cart/${id}`, data);
    setIsAlreadyInCart(true);
    toast.success(response.data.message);
  };

  const productDelete=async()=>{
    const response=await apiRequest("DELETE",`/product/${id}`);
    toast.success(response.data.message);
    navigate("/");
  }
  const sizeClickHandler = (size) => {
    setSelectedSize(size);
    setIsSizeSelected(true);
  };

  return loading ? (
    <>Loading...</>
  ) : (
    <div className="container mx-auto flex justify-center">
      <div className="left1 p-4">
        <div className="flex flex-wrap justify-start">
          {data.images &&
            data.images.map((image) => (
              <div className="w-1/2 p-2" key={image.url}>
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
        {
          userRole==='admin' && 
          <div className="font-bold text-white">
            <button className="border p-2 bg-red-500 mr-2" onClick={()=>navigate(`/edit-product/${id}`)}>EDIT</button>
            <button className="border p-2 bg-red-500" onClick={() => setIsModalOpen(true)}>DELETE</button>
          </div>
        }
        <hr />
        <div>
          <div className="font-extrabold text-2xl">
            &#8377; &nbsp;{data.price}
          </div>
          <div className="text-gray-500">MRP incl. of all taxes</div>
        </div>
        <div className="font-bold">Please select a size.</div>
        <div className="flex space-x-3">
          {sizes.map((size) => (
            <div
              key={size}
              className={`border-2 rounded-3xl pr-3 pl-3 pt-2 pb-2 cursor-pointer 
                ${selectedSize === size ? "border-black" : "border-gray-400"}`}
              onClick={() => sizeClickHandler(size)}
            >
              {size}
            </div>
          ))}
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
        <div className="mt-5 flex flex-wrap">
          {!isAlreadyInCart ? (
            <button
              className={"bg-red-700 text-white py-2 px-12 mr-2"}
              onClick={addToCartHandler}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              className={"bg-green-700 text-white py-2 px-12 mr-2"}
              onClick={()=>navigate("/cart")}
            >
              GO TO CART
            </button>
          )}
          <button className="border border-red-500 py-2 px-7">
            <FavoriteBorderIcon /> Add to wishlist
          </button>
        </div>
        <div className="mt-3 flex space-x-2">
          <div>Share</div>
          <WhatsAppIcon className="cursor-pointer" />
          <FacebookIcon className="cursor-pointer" />
          <XIcon className="cursor-pointer" />
          <InstagramIcon className="cursor-pointer" />
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
                image={data.images[0].url}
                text1={data.name}
                text2={"Are u sure you want to delete this product"}
            />
    </div>
  );
};

export default ProductData;
