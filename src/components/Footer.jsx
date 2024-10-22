import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-red-600 text-white py-3 text-center">
        HOMEGROWN INDIAN BRAND
      </div>
      <div className="w-full bg-white text-black text-center py-3">
        Over <b>6 Million</b> Happy Customers
      </div>
      <div className="flex flex-wrap justify-evenly bg-slate-200 text-black py-5">
        <div className="flex flex-col flex-wrap items-start mb-4">
          <div style={{ color: "red" }}>
            <b>NEED HELP</b>
          </div>
          <div>Contact Us</div>
          <div>Track Order</div>
          <div>Returns</div>
          <div>FAQs</div>
          <div>My Account</div>
        </div>
        <div className="flex flex-col items-start mb-4">
          <div style={{ color: "red" }}>
            <b>COMPANY</b>
          </div>
          <div>About Us</div>
          <div>Careers</div>
          <div>Gift Vouchers</div>
          <div>Community Initiatives</div>
          <div>Souled Army</div>
        </div>
        <div className="flex flex-col items-start mb-4">
          <div style={{ color: "red" }}>
            <b>MORE INFO</b>
          </div>
          <div>T&C</div>
          <div>Privacy Policy</div>
          <div>Sitemap</div>
          <div>Blogs</div>
        </div>
        <div className="flex flex-col items-start mb-4">
          <div style={{ color: "red" }}>
            <b>STORE NEAR ME</b>
          </div>
          <div>Mumbai</div>
          <div>Pune</div>
          <div>Bengaluru</div>
          <div>Indore</div>
          <div>View More</div>
        </div>
      </div>
      <div className="w-full bg-white text-black text-center py-3">
        &copy;Shoper 2024-25
      </div>
    </>
  );
};

export default Footer;
