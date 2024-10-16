import React,{useState,useEffect} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utility/Api';
import { useContext } from 'react';
import { authContext } from '../utility/AuthContext';

const Card = ({ imageUrl,ID ,isFavoriteInDb}) => {
  const { userData } = useContext(authContext);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate=useNavigate();
  
  const handleHeartClicked = async(ID) => {
    if(!userData){
      toast.error("Please Login First");
      navigate("/login");
      return;
    }
    setIsFavorited(!isFavorited);
   
    try{
    const response=await apiRequest("PATCH",`/user/updating-user-wishlist/${ID}`);
    toast.success(response.data.message);
    }catch(error){
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className='relative cursor-pointer flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden mx-3 w-[23rem] h-[36rem] mb-4 mt-4'>
        <div className='h-[36rem] w-[23rem]'>
          <img onClick={() => navigate(`/product/${ID}`)} className="w-full h-full object-cover object-top" src={imageUrl} />
        </div>
        <button
          onClick={()=>handleHeartClicked(ID)}
          className='absolute top-2 rounded-full p-1 right-2 text-red-500 bg-white  cursor-pointer border-none'
        >
          {isFavoriteInDb ||isFavorited ?<FavoriteIcon/>:<FavoriteBorderIcon/>}
        </button>
      </div>
    </>
  )
}

export default Card