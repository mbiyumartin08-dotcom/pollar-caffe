import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [topCategory, setTopCategory] = useState("");
  const [description, setDescription] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a product name");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      topCategory,
      description,
      costPrice: Number(costPrice),
      sellPrice: Number(sellPrice),
      discount,
      minOrder: Number(minOrder),
      category,
      image: imagePreview,
    };

    addProduct(newProduct);

    setName("");
    setTopCategory("");
    setDescription("");
    setCostPrice("");
    setSellPrice("");
    setDiscount("");
    setMinOrder("");
    setCategory("");
    setImagePreview("");
    navigate("/menu");
  }

  return (
    <div>
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Add a new product to your store
          </p>
        </div>

        <Link
          to="/menu"
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm"
        >
          ← Back to Menu
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name & Description */}
        <div className="mb-6">
          <h3 className="text-green-600 font-bold text-xs mb-3">
            Name & Description
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full md:w-72 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Product Category
              </label>
              <input
                type="text"
                value={topCategory}
                onChange={(e) => setTopCategory(e.target.value)}
                className="w-full md:w-72 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-800 focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5">
              Product Description
            </label>
            <textarea
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg p-3.5 text-xs text-gray-700 leading-relaxed focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Pricing & Category Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Product Pricing Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h3 className="text-green-600 font-bold text-xs mb-4">
              Product Pricing
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Cost Price
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-400 text-xs mr-1.5">Ksh</span>
                  <input
                    type="number"
                    step="0.01"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="w-full text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sell Price
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <span className="text-gray-400 text-xs mr-1.5">Ksh</span>
                  <input
                    type="number"
                    step="0.01"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className="w-full text-xs text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Discount
                </label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Minimum Order
                </label>
                <input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Category Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h3 className="text-green-600 font-bold text-xs mb-4">Category</h3>

            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Product Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Upload Image & Preview Boxes */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <label className="w-72 h-52 border-2 border-dashed border-green-400 bg-green-50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-green-100 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <span className="text-2xl mb-2">🖼️</span>
            <span className="text-green-600 font-semibold text-xs">
              Upload Image
            </span>
          </label>

          <div className="w-52 h-52 border border-gray-400 bg-gray-200 rounded-xl flex flex-col items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-400">
                <span className="text-2xl block mb-1">🏷️</span>
                <span className="text-xs">Preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-xs font-semibold"
            >
              Add Product +
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;