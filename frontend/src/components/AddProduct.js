import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [alert, setAlert] = useState(false);

  const AddProductHandler = async () => {
    if (!name || !price || !category || !company) {
      setAlert(true);
      return;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    await result.json();
    setAlert(false);
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
  };

  return (
    <div className="mx-9 ">
      <h1 className=" text-2xl my-5 font-semibold">Add Product</h1>
      <div className="flex flex-col space-y-3">
        <div>
          <input
            type="text"
            placeholder="Enter Product Name"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          {alert && !name && (
            <div className="text-red-500 font-medium">Enter Valid Name</div>
          )}
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
          {alert && !price && (
            <div className="text-red-500 font-medium">Enter Valid Price</div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Category"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          />
          {alert && !category && (
            <div className="text-red-500 font-medium">Enter Valid Category</div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Product Company"
            className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
            onChange={(event) => setCompany(event.target.value)}
            value={company}
          />
          {alert && !company && (
            <div className="text-red-500 font-medium">Enter Valid Company</div>
          )}
        </div>
        <button
          className="capitalize text-lg font-semibold border-2 px-6 py-2 rounded-md border-[#2874F0] bg-[#2874f0] text-white w-40 hover:bg-white hover:text-[#2874f0]"
          onClick={AddProductHandler}
        >
          Add product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
