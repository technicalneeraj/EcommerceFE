import React, { useEffect } from 'react'
import { apiRequest } from '../utility/Api'

const MyOrders  = () => {
  
  useEffect(()=>{
    fetchOrders();
  })

  const fetchOrders=async()=>{
    const response=await apiRequest("GET","/user/orders");
    console.log(response);
  }
  
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders