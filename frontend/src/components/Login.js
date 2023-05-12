import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const LoginHandler = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.users));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      if (result.result === "no user found") {
        alert("please enter correct details");
      } else {
        alert("something went wrong");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center  space-y-5">
      <h1 className="text-center text-2xl my-5">Login</h1>
      <input
        type="email"
        placeholder="Enter Your Email"
        className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter Password"
        className="border-gray-500 border-2 w-1/3 px-4 py-2 rounded-md text-lg drop-shadow-lg"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <button
        className="capitalize text-lg font-semibold border-2 px-6 py-2 rounded-md border-[#2874F0] hover:bg-[#2874f0] hover:text-white"
        onClick={LoginHandler}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
