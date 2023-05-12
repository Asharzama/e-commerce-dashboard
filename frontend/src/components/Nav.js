import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="bg-[#2874F0]">
      <div className="ml-9 text-7xl text-white float-left">
        <FaOpencart />
      </div>
      {auth ? (
        <ul className=" flex mx-9 space-x-7 py-6 text-xl font-semibold text-white justify-end">
          <li className="hover:text-black">
            <Link to="/">Products</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/add">Add Product</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/profile">Profile</Link>
          </li>

          <li className="hover:text-black">
            <Link to="/signup" onClick={logout}>
              Log out
            </Link>
          </li>
          <li className="flex space-x-2 items-center cursor-pointer">
            <AiOutlineUser className="rounded-full border-white border-2 text-3xl" />
            <p className="capitalize">{JSON.parse(auth).name}</p>
          </li>
        </ul>
      ) : (
        <ul className=" flex mx-9 space-x-7 py-6 text-xl font-semibold text-white justify-end">
          <li className="hover:text-black">
            <Link to="/signup">SignUp/Register</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
