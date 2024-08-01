import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <img src={logo} alt="calendar" className="mr-6 w-32 h-12" />
      <h1 className="py-3 pt-10 text-xl text-black font-extrabold">
        Please login to your account{" "}
      </h1>
      {isAuthenticated ? (
        <Navigate to="/calender"></Navigate>
      ) : (
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => loginWithRedirect()}
        >
          <span className="px-32">Log In</span>
        </button>
      )}
    </div>
  );
};

export default LoginButton;
