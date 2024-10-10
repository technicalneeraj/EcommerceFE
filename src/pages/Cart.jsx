import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../utility/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { isLog } = useContext(authContext);
  const [cart, setCart] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchingCart = async () => {
      const response = await apiRequest("GET", "/user/cart");
      setCart(response.data.cart);
      setItems(response.data.cart.cartItems);
    };
    fetchingCart();
  }, [cart]);

  const removeItemHandler=async(id)=>{
    const response=await apiRequest("PATCH",`/user/update-cart/${id}`);
    toast.success(response.data.message);
  }

  return (
    <div>
      <div className="text-center text-gray-700 font-bold">
        MY BAG -------- ADDRESS -------- PAYMENT
      </div>
      {cart.totalItem != 0 ? (
        <div className="flex justify-center p-5">
          <div>
            {items.length > 0 &&
              items.map((item) => (
                <div key={item._id} className="border pb-2 flex flex-col">
                  <div className="flex">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="object-contain cursor-pointer w-full h-full p-2"
                        onClick={()=>navigate(`/product/${item.product._id}`)}
                      />
                    </div>
                    <div className=" w-full">
                      <div className="flex justify-between p-3">
                        <div>
                          <div className="font-bold">{item.product.name}</div>
                          <div className="text-gray-400">{item.product.category.type}</div>
                          <div className="flex font-bold mt-4">
                            <div className="border border-black mr-2 rounded p-2 pr-5">
                              Size: {item.size}
                            </div>
                            <div className="border border-black rounded p-2 pr-5">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div className="font-bold">
                          <div className="text-end">
                            &#8377; {item.product.price}
                          </div>
                          <div className="text-gray-700">MRP incl. of all taxes</div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="flex justify-end border p-2">
                    <button className="border p-3 mr-2 border-black rounded-xl" onClick={()=>removeItemHandler(item._id)}>
                      REMOVE
                    </button>
                    <button className="border p-3 border-black rounded-xl">
                      MOVE TO WISHLIST
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="ml-4 w-1/5">
            <div className=" w-full">
              <div className="p-2">BILLING DETAILS</div>
              <div>
                <div className="flex justify-between border p-3">
                  <div>Cart Total (Excl. of all taxes)</div>
                  <div>&#8377; {cart.totalPrice}</div>
                </div>
                <div className="flex justify-between border p-3">
                  <div>GST</div>
                  <div>&#8377; {cart.totalPrice * (18 / 100)}</div>
                </div>
                <div className="flex justify-between border p-3">
                  <div>Shipping Charges</div>
                  <div>&#8377; 0</div>
                </div>
                <div className="flex justify-between border p-3">
                  <div>Total Amount</div>
                  <div>
                    &#8377; {cart.totalPrice + cart.totalPrice * (18 / 100)}
                  </div>
                </div>
              </div>
            </div>
            <div className="hover:bg-green-700 cursor-pointer border mt-3 p-2 text-center font-bold text-white bg-green-800">PLACE ORDER</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 border m-2 pt-2 pb-5">
          <img src="https://tss-static-images.gumlet.io/emptyCart.png"></img>
          <div className="font-bold text-xl">Your shopping cart is empty.</div>
          <div className="text-gray-500">
            Please add something soon, carts have feelings too.
          </div>
          <div>
            <button
              className="text-gray-700 border border-gray-700 p-3 rounded-xl mr-5"
              onClick={() => navigate("/")}
            >
              CONTINUE SHOPPING
            </button>
            {!isLog && (
              <button
                className="bg-gray-700 p-3 rounded-xl text-white"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
