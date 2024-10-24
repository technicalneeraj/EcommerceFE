import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-red-600 text-white py-3 text-center">
        HOMEGROWN INDIAN BRAND
      </div>
      <div className="w-full bg-white text-black text-center py-3">
        Over <b>6 Million</b> Happy Customers
      </div>
      <div className="flex flex-wrap justify-center bg-slate-200 text-black py-5">
        <div className="flex flex-col items-center mb-4 w-1/2 sm:w-1/4">
          <div className="items-start">
            <div style={{ color: "red" }}>
              <b>NEED HELP</b>
            </div>
            <div className="hovering">Contact Us</div>
            <div className="hovering">Track Order</div>
            <div className="hovering">Returns</div>
            <div className="hovering">FAQs</div>
            <div className="hovering">My Account</div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4 w-1/2 sm:w-1/4">
          <div className="items-start">
            <div style={{ color: "red" }}>
              <b>COMPANY</b>
            </div>

            <div className="hovering">About Us</div>
            <div className="hovering">Careers</div>
            <div className="hovering">Gift Vouchers</div>
            <div className="hovering">Community Initiatives</div>
            <div className="hovering">Souled Army</div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4 w-1/2 sm:w-1/4">
          <div className="items-start">
            <div style={{ color: "red" }}>
              <b>MORE INFO</b>
            </div>
            <div className="hovering">T&C</div>
            <div className="hovering">Privacy Policy</div>
            <div className="hovering">Sitemap</div>
            <div className="hovering">Blogs</div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4 w-1/2 sm:w-1/4">
          <div className="items-start">
            <div style={{ color: "red" }}>
              <b>STORE NEAR ME</b>
            </div>
            <div className="hovering">Mumbai</div>
            <div className="hovering">Pune</div>
            <div className="hovering">Bengaluru</div>
            <div className="hovering">Indore</div>
            <div className="cursor-pointer text-blue-600 font-bold">
              View More
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white text-black text-center py-3 font-bold">
        &copy;Shoper 2024-25
      </div>
    </>
  );
};

export default Footer;
