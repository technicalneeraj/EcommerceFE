import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../utility/Api";
import LoaderModal from "../components/modals/LoaderModal";

const VerifyOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const [isLoading, setIsLoading] = useState(false);

  const verifyPayment = async () => {
    try {
      setIsLoading(true);
      console.log(success);
      await apiRequest("POST","/user/verify-order", { success, orderId });
      toast.success("Your order is maded");
      navigate("/myOrders");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.success("Your payment is not done");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <LoaderModal isOpen={isLoading} text={"Please wait for a while"} />;
};

export default VerifyOrder;
