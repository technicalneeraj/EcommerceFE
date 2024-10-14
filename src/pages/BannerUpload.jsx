import React, { useState } from "react";
import { apiRequest } from "../utility/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const BannerUpload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("men");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("status", status);
    formData.append("category", category);

    try {
      const response = await apiRequest(
        "POST",
        "/api/categories/upload-banner",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto shadow-md rounded">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="font-extrabold text-2xl">Upload banner</div>
        <div className=" block p-2 w-full border border-gray-300 rounded-md  focus:ring focus:ring-green-200">
          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="border bg-red-500 p-3 font-bold text-white"
        >
          Upload Banner
        </button>
      </form>
    </div>
  );
};

export default BannerUpload;
