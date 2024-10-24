import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

import { useCartWishlist } from "../utility/CartWishlistContext";
import { authContext } from "../utility/AuthContext";
import { apiRequest } from "../utility/Api";
import YesOrNoModal from "../components/modals/YesOrNoModal";
import LoaderModal from "../components/modals/LoaderModal";

const Cart = () => {
  const navigate = useNavigate();
  const { getCount } = useCartWishlist();
  const { isLog, userData } = useContext(authContext);
  const [cart, setCart] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [removeOrWishlist, setRemoveOrWishlist] = useState(null);
  const shirtSize = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const jeansSize = ["28", "30", "32", "34", "36"];

  const [defaultAddress, setDefaultAddress] = useState({});
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLog) {
      setIsLoading(true);
      const fetchingCart = async () => {
        const response = await apiRequest("GET", "/user/cart");
        setCart(response.data.cart);
        setItems(response.data.cart.cartItems);
      };
      fetchingCart();
      setDefaultAddress(
        userData.address.find((addr) => addr.isDefault === true)
      );
      setIsLoading(false);
    }
  }, [isLog, cart, items, userData]);

  const removeItemHandler = async (id) => {
    try {
      setIsLoading(true);
      const response = await apiRequest("PATCH", `/user/update-cart/${id}`);
      toast.success(response.data.message);
      await getCount();
      const updatedResponse = await apiRequest("GET", "/user/cart");
      setCart(updatedResponse.data.cart);
      setItems(updatedResponse.data.cart.cartItems);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addToWishlistHandler = async (id) => {
    try {
      setIsLoading(true);
      const response = await apiRequest(
        "PATCH",
        `/user/remove-from-cart-add-to-wishlist/${id}`
      );
      await getCount();
      setIsLoading(false);
      toast.success("Product added to your wishlist");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const sizeSetHandler = async (item, currSize) => {
    try {
      setIsLoading(true);
      await apiRequest("PATCH", `/user/update-cartItem-size/${item._id}`, {
        currSize,
      });
      setIsLoading(false);
      toast.success("Size updated Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const quantityHandler = async (item, currQuantity, initialQuantity) => {
    try {
      setIsLoading(true);
      await apiRequest("PATCH", `/user/update-cartItem-quantity/${item._id}`, {
        currQuantity,
        initialQuantity,
      });
      setIsLoading(false);
      toast.success("Quantity updated Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const makePayment = async () => {
    setIsLoading(true);
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    try {
      const response = await apiRequest(
        "POST",
        "/user/create-checkout-session",
        {
          cart,
        }
      );
      const result = stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        setIsLoading(false);
        toast.error(result.error);
        return;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <LoaderModal isOpen={isLoading} text={"Wait for a second"} />
      <div className="text-center text-gray-700 font-bold">
        MY BAG -------- ADDRESS -------- PAYMENT
      </div>
      {cart !== "" && cart.totalItem !== 0 && isLog ? (
        <div className="flex flex-wrap justify-center p-5">
          <div>
            <div>
              {defaultAddress ? (
                <div className="border pt-2 pl-2 pb-2 flex justify-between items-center">
                  <div>
                    <div className="font-bold">
                      Deliver To: {defaultAddress.firstName}{" "}
                      {defaultAddress.lastName}, {defaultAddress.postalCode}
                    </div>
                    <div>
                      {defaultAddress.buildingName}, {defaultAddress.street}
                    </div>
                    <div>
                      {defaultAddress.city} ,{defaultAddress.state}
                    </div>
                  </div>
                  <div className="mr-2 font-bold text-green-900">
                    <button onClick={() => navigate("/profile-address")}>
                      CHANGE
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {items.map((item) => (
              <div
                key={item._id}
                className="border pb-2 flex flex-wrap flex-col"
              >
                <div className="flex">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="object-contain cursor-pointer w-full h-full p-2"
                      onClick={() => navigate(`/product/${item.product._id}`)}
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex flex-wrap justify-between p-3">
                      <div>
                        <div className="font-bold">{item.product.name}</div>
                        <div className="text-gray-400">
                          {item.product.category.type}
                        </div>
                        <div className="flex flex-wrap font-bold mt-4">
                          {item.product.stock > 0 ? (
                            <>
                              <div className="border border-black mr-2 rounded p-2 pr-5">
                                Size:
                                <select
                                  defaultValue={item.size}
                                  className="ml-1 bg-white border-0 focus:outline-none"
                                  onChange={(e) =>
                                    sizeSetHandler(item, e.target.value)
                                  }
                                >
                                  {item.product.category.parent.includes(
                                    "upper"
                                  )
                                    ? shirtSize.map((size) => (
                                        <option key={size} value={size}>
                                          {size}
                                        </option>
                                      ))
                                    : jeansSize.map((size) => (
                                        <option key={size} value={size}>
                                          {size}
                                        </option>
                                      ))}
                                </select>
                              </div>
                              <div className="border border-black rounded p-2 md:pr-5 sm:mt-0 mt-2">
                                Qty:{" "}
                                <select
                                  defaultValue={item.quantity}
                                  className="ml-1 bg-white border-0 focus:outline-none"
                                  onChange={(e) =>
                                    quantityHandler(
                                      item,
                                      e.target.value,
                                      item.quantity
                                    )
                                  }
                                >
                                  {quantity.map((quan) => (
                                    <option key={quan} value={quan}>
                                      {quan}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          ) : (
                            <div className="text-red-700">
                              Currently out of stock!!
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex md:flex-col lg:flex-nowrap flex-wrap flex-row font-bold md:mt-0 mt-2">
                        <div className="md:mr-0 mr-2">
                          {item.product.discountPrice > 0 ? (
                            <div className="flex space-x-2 justify-end">
                              <div className="font-extrabold ">
                                &#8377;
                                {item.product.price -
                                  item.product.discountPrice}
                              </div>
                              <div className="line-through text-gray-400">
                                &#8377; {item.product.price}
                              </div>
                            </div>
                          ) : (
                            <div className="font-extrabold text-end">
                              &#8377; &nbsp;{item.product.price}{" "}
                            </div>
                          )}
                        </div>
                        <div className="text-gray-700">
                          MRP incl. of all taxes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end border p-2">
                  <button
                    className="border p-3 mr-2 border-black rounded-xl"
                    onClick={() => {
                      setRemoveOrWishlist("remove");
                      setItemToRemove(item);
                      setIsModalOpen(true);
                    }}
                  >
                    REMOVE
                  </button>
                  <button
                    className="border p-3 border-black rounded-xl"
                    onClick={() => {
                      setRemoveOrWishlist("wishlist");
                      setItemToRemove(item);
                      setIsModalOpen(true);
                    }}
                  >
                    MOVE TO WISHLIST
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="ml-4 w-96">
            <div className="w-full">
              <div className="p-2">BILLING DETAILS</div>
              <div>
                <div className="flex justify-between border p-3">
                  <div>Cart Total (Excl. of all taxes)</div>
                  <div>&#8377; {cart.totalPrice}</div>
                </div>
                <div className="flex justify-between border p-3">
                  <div>Discounted Price</div>
                  <div> - &#8377; {cart.totalDiscountPrice}</div>
                </div>
                <div className="flex justify-between border p-3">
                  <div>GST</div>
                  <div>
                    &#8377;{" "}
                    {Math.round(
                      (cart.totalPrice - cart.totalDiscountPrice) * (18 / 100)
                    )}
                  </div>
                </div>

                <div className="flex justify-between border p-3">
                  <div>Total Amount</div>
                  <div>
                    &#8377;{" "}
                    {Math.round(
                      cart.totalPrice -
                        cart.totalDiscountPrice +
                        (cart.totalPrice - cart.totalDiscountPrice) * (18 / 100)
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              onClick={makePayment}
              className="hover:bg-green-700 cursor-pointer border mt-3 p-2 text-center font-bold text-white bg-green-800"
            >
              PLACE ORDER
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 border m-2 pt-2 pb-5">
          <img
            src="https://tss-static-images.gumlet.io/emptyCart.png"
            alt="Empty Cart"
          />
          <div className="font-bold text-xl">Your shopping cart is empty.</div>
          <div className="text-gray-500 text-center">
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

      <YesOrNoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setItemToRemove(null);
        }}
        onConfirm={() => {
          removeOrWishlist === "remove"
            ? removeItemHandler(itemToRemove._id)
            : addToWishlistHandler(itemToRemove._id);
          setIsModalOpen(false);
          setItemToRemove(null);
        }}
        image={itemToRemove ? itemToRemove.product.images[0].url : ""}
        text1={
          removeOrWishlist === "remove"
            ? "Remove Item From Cart"
            : "Move Item To Wishlist"
        }
        text2={
          removeOrWishlist === "remove"
            ? "Are you sure you want to remove this product from your cart?"
            : "Are you sure you want to remove the product from the cart and add to wishlist?"
        }
      />
    </div>
  );
};

export default Cart;
