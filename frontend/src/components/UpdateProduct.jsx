import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    await result.json();
    navigate("/");
  };

  return (
    <div className="mx-9 ">
      <h1 className=" text-2xl my-5 font-semibold">Update Product</h1>
      <div className="flex flex-col space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Product Name"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Price"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg 
          drop-shadow-lg"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Category"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Company"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setCompany(event.target.value)}
            value={company}
          />
        </div>
        <button
          className="capitalize text-lg font-semibold border-2 px-6 py-2 rounded-md border-[#2874F0] bg-[#2874f0] text-white w-40 hover:bg-white hover:text-[#2874f0]"
          onClick={updateProduct}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
