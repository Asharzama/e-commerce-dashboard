import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const DeleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const SearchHandler = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let productsList = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    productsList = await productsList.json();
    setProducts(productsList);
  };

  return (
    <div className="mx-9">
      <h1 className=" text-2xl mt-5 font-semibold">Products List</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border-gray-500 border-2 w-1/3 px-2 py-1 rounded-md text-lg drop-shadow-lg my-2"
        onChange={(event) => SearchHandler(event)}
      />
      <ul>
        <li className="inline-block border-b-2 border-t-2 border-l-2 border-[#2874F0] w-48 text-center bg-[#2874f0] text-white">
          Sr. No
        </li>
        <li className="inline-block border-b-2 border-t-2 border-[#2874F0] w-48 text-center bg-[#2874f0] text-white">
          Name
        </li>
        <li className="inline-block border-b-2 border-t-2 border-[#2874F0] w-48 text-center bg-[#2874f0] text-white">
          Price
        </li>
        <li className="inline-block border-b-2 border-t-2 border-[#2874F0] w-48 text-center bg-[#2874f0] text-white">
          Category
        </li>
        <li className="inline-block border-b-2 border-t-2 border-[#2874F0] w-48 text-center border-r-2 bg-[#2874f0] text-white">
          Company
        </li>
        <li className="inline-block border-b-2 border-t-2 border-[#2874F0] w-20 text-center border-r-2 bg-[#2874f0] text-white">
          Operation
        </li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={index}>
            <li className="inline-block border-b-2 border-l-2 border-[#2874F0] w-48 text-center">
              {index + 1}
            </li>
            <li className="inline-block border-b-2 border-[#2874F0] w-48 text-center">
              {product.name}
            </li>
            <li className="inline-block border-b-2 border-[#2874F0] w-48 text-center">
              {product.price}
            </li>
            <li className="inline-block border-b-2 border-[#2874F0] w-48 text-center">
              {product.category}
            </li>
            <li className="inline-block border-b-2 border-[#2874F0] w-48 text-center">
              {product.company}
            </li>
            <li className="inline-block border-b-2 border-[#2874F0] border-r-2 w-20 text-center space-x-3">
              <AiFillDelete
                className="inline-block cursor-pointer"
                onClick={() => DeleteProduct(product._id)}
              />
              <Link to={`/update/${product._id}`}>
                <AiFillEdit className="inline-block cursor-pointer" />
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1 className="text-center text-lg font-semibold">No Result found</h1>
      )}
    </div>
  );
};

export default Products;
