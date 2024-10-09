import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";

const WishlistCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const deleteitemhandler=async(id)=>{
    try{
    const response=await apiRequest("PATCH",`/user/updating-user-wishlist/${id}`);
    if(response.status==200){
    toast.success(response.data.message);
    }
  }catch(error){
    toast.error(error.response.data.message)
  }
  }

  return (
    <div
      className="cursor-pointer flex flex-col bg-white shadow-lg rounded-lg mx-3 w-[23rem] h-[36rem]"
    >
      <div className="relative overflow-hidden">
        <div className="h-[36rem] w-[23rem]" onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} >
          <img
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            src={isHovered && item.images[1] ? item.images[1].url : item.images[0].url}
            alt={item.name} 
          />
        </div>
        <button
          onClick={()=>deleteitemhandler(item._id)}
          className='absolute top-2 rounded-full p-1 right-2 text-red-500 bg-white  cursor-pointer border-none'
        >
          <CloseIcon/>
        </button>
      </div>
      <div className="p-2 font-extrabold">{item.name}</div>
      <hr />
      <div className="p-3 font-bold">&#8377; {item.price}</div>
      <hr />
      <div className="text-center p-2">MOVE TO CART</div>
    </div>
  );
};

export default WishlistCard;