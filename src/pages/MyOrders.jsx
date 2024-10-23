import React, { useEffect, useState } from "react";
import { apiRequest } from "../utility/Api";
import "./MyOrders.css"; // Import the CSS file

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await apiRequest("GET", "/user/orders");
    setOrders(response.data.orders);
    // console.log(response);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {
        orders.length<=0 ? <div className="text-center text-3xl">No Orders Found</div> : (
            <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <h3 className="order-id">Order ID: {order._id}</h3>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                {/* <p><strong>Discounted Price:</strong> ₹{order.totaldiscountedprice}</p> */}
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Payment Status:</strong> {order.paymentDetails.paymentStatus}</p>
                <div className="order-items">
                  {order.orderItems.map((item) => (
                    <div className="order-item" key={item._id}>
                      <img 
                        src={item.product.images[0].url} 
                        alt={`Product ${item.product}`} 
                        className="item-image" 
                      />
                      <div className="item-details">
                        <p><strong>Product ID:</strong> {item.product.name}</p>
                        <p><strong>Price:</strong> ₹{item.price}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Size:</strong> {item.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      }
     
    </div>
  );
};

export default MyOrders;
