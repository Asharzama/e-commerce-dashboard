import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const clickHandler = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    if (result) {
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl my-5">Register Here</h1>
      <div className="flex flex-col items-center justify-center space-y-5 ">
        <input
          type="text"
          placeholder="Enter Your Name"
          className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="capitalize text-lg font-semibold border-2 px-6 py-2 rounded-md border-[#2874F0] hover:bg-[#2874f0] hover:text-white"
          onClick={clickHandler}
        >
          sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;
