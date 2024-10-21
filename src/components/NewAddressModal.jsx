import React, { useEffect, useState } from "react";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";

const NewAddressModal = ({ isOpen, onClose, onConfirm, text }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    houseNumber: "",
    street: "",
    landmark: "",
    postalCode: "",
    city: "",
    country: "",
    state: "",
    phone: "",
    isDefault: false,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", "/user/address", formData);
      toast.success(response.data.message);
      onConfirm();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center z-50 fixed inset-0 bg-black bg-opacity-50">
      <div className="bg-white relative rounded shadow-md p-6 space-y-3">
        <h2 className="text-lg font-semibold">{text}</h2>
        <hr />
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex">
            <div className="mr-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="houseNumber"
              placeholder="House no., Building name*"
              value={formData.houseNumber}
              onChange={handleChange}
              required
              className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
            />
          </div>
          <div>
            <input
              type="text"
              name="street"
              placeholder="Street Name, Area*"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
            />
          </div>
          <div>
            <input
              type="text"
              name="landmark"
              placeholder="LandMark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
            />
          </div>
          <div className="flex">
            <div className="mr-2">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code*"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City/District*"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-2">
              <input
                type="text"
                name="country"
                placeholder="Country*"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                placeholder="State*"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone no.*"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border p-2 border-gray-300 rounded mr-2 bg-white"
            />
          </div>
          <div className="w-full p-2 flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <div className="ml-2">Make this my default address</div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 p-2 border border-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-red-500 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAddressModal;
