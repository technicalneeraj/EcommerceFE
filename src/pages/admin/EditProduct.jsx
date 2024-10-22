import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../../utility/Api";
import { toast } from "react-toastify";

import LoaderModal from "../../components/modals/LoaderModal";
import CategoryDropdowns from "../../components/CatgeoryDropdown";

const EditProduct = () => {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [sku,setSku]=useState("");
  const [discountPrice,setDiscountPrice]=useState("");
  const [mainImage, setMainImage] = useState(null);
  const [existingMainImage, setExistingMainImage] = useState(""); // Store the existing main image URL
  const [otherImages, setOtherImages] = useState([]);
  const [existingOtherImages, setExistingOtherImages] = useState([]); // Store existing other images URLs
  const [isFeatured, setIsFeatured] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [subParentCategory, setSubParentCategory] = useState("");
  const [status, setStatus] = useState("active");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([{ name: "", value: "" }]);
  const navigate = useNavigate();
  const { id } = useParams();

  const addAttribute = () => {
    setAttributes([...attributes, { name: "", value: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes]; //copy maded so change being deteced and re-renders
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await apiRequest("GET", `/product/${id}`);
        const product = response.data.product;
        const cat = await apiRequest(
          "GET",
          `/product/category/${product.category}`
        );
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(cat.data.category.type);
        setStock(product.stock);
        setSku(product.sku);
        setIsFeatured(product.isFeatured);
        setParentCategory(cat.data.category.parent[0]);
        setSubParentCategory(cat.data.category.parent[1]);
        setStatus(product.status);
        setTags(product.tags.join(", "));
        setDiscountPrice(product.discountPrice);
        setExistingMainImage(product.mainImage);
        setAttributes(product.attributes);
        setExistingOtherImages(product.otherImages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchProductData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("P1category", parentCategory);
    formData.append("P2category", subParentCategory);
    formData.append("stock", stock);
    formData.append("isFeatured", isFeatured);
    formData.append("status", status);
    formData.append("discountPrice",discountPrice);
    formData.append("sku",sku);
    formData.append(
      "tags",
      tags
        .split(",")
        .map((tag) => tag.trim())
        .join(",")
    );

    if (mainImage) {
      formData.append("mainImage", mainImage);
    } else if (existingMainImage) {
      formData.append("mainImage", existingMainImage);
    }

    if (otherImages.length > 0) {
      otherImages.forEach((image) => {
        formData.append("otherImages", image);
      });
    }
    //  else {
    //   existingOtherImages.forEach((image) => {
    //     formData.append("otherImages", image);
    //   });
    // }

    attributes.forEach((attr) => {
      formData.append("attributes", JSON.stringify(attr));
    });

    try {
      setLoading(true);
      const response = await apiRequest("PATCH", `/product/${id}`, formData);
      if (response.status === 200) {
        setTimeout(() => {
          toast.success(response.data.message);
          setLoading(false);
          navigate(`/product/${id}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-2xl shadow-red-800">
      <h1 className="text-2xl font-semibold text-center mb-4">Edit Product</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name of product*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description of product*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded h-24"
        />
        <div className="flex">
        <input
          type="number"
          placeholder="Price*"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border mr-2 border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Discount Price*"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
          required
          className="w-full p-2 mr-2 border border-gray-300 rounded"
        />
          <input
            type="text"
            placeholder="Sku*"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            className="w-full mr-2 p-2 border border-gray-300 rounded"
          />

        </div>
        
        <div className="flex">
          <input
            type="text"
            placeholder="Brand of product*"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Stock quantity*"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <CategoryDropdowns
          setCategory={setCategory}
          setParentCategory={setParentCategory}
          setSubParentCategory={setSubParentCategory}
          category={category}
        />

        <div>
          <h2 className="text-lg mb-2">Attributes</h2>

          {attributes.map((attr, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Attribute Name"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(index, "name", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Attribute Value"
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, "value", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addAttribute}
            className="text-blue-600 hover:underline"
          >
            Add Another Attribute
          </button>
        </div>
        <div>
          <label className="block mb-2">Main Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Other Images (optional):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setOtherImages([...e.target.files])}
            className="w-full border border-gray-300 rounded"
          />
        </div>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={() => setIsFeatured(!isFeatured)}
            className="mr-2"
          />
          Featured Product
        </label>
        <div className="flex">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mr-2 p-2 border border-gray-300 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
      <LoaderModal isOpen={loading} text={"Updating product, please wait..."} />
    </div>
  );
};

export default EditProduct;
