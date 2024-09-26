import React from 'react';

const Footer = () => {
  return (
    <>
      <div className='w-full bg-red-600 text-white py-3'>HOMEGROWN INDIAN BRAND</div>
      <div className='w-full bg-white text-black  py-3'>Over <b>6 Million</b> Happy Customers</div>
      <div className='flex justify-between px-60 py-6 bg-slate-200 text-black'>
        <div className='flex flex-col items-start mb-4'>
          <div style={{color:"red"}}><b>NEED HELP</b></div>
          <div>Contact Us</div>
          <div>Track Order</div>
          <div>Returns & Refunds</div>
          <div>FAQs</div>
          <div>My Account</div>
        </div>
        <div className='flex flex-col items-start mb-4'>
          <div style={{color:"red"}}><b>COMPANY</b></div>
          <div>About Us</div>
          <div>Careers</div>
          <div>Gift Vouchers</div>
          <div>Community Initiatives</div>
          <div>Souled Army</div>
        </div>
        <div className='flex flex-col items-start mb-4'>
          <div style={{color:"red"}}><b>MORE INFO</b></div>
          <div>T&C</div>
          <div>Privacy Policy</div>
          <div>Sitemap</div>
          <div>Blogs</div>
        </div>
        <div className='flex flex-col items-start mb-4'>
          <div style={{color:"red"}}><b>STORE NEAR ME</b></div>
          <div>Mumbai</div>
          <div>Pune</div>
          <div>Bengaluru</div>
          <div>Indore</div>
          <div>View More</div>
        </div>
      </div>
    </>

  )
}

export default Footer