import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../assets/logos/logo192.png";
import useFirebase from "../hooks/useFirebase";
import DropdownProfile from "./ui/DropdownProfile";

const Navigation = ({ children }) => {
  const { pathname } = useLocation();
  const {handleLogout} = useFirebase();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <Link to="/">
        <img src={logoImage} className="h-10 w-10 cursor-pointer" alt="" />
      </Link>

      <div className="flex ml-10">
        <Link to="/">
          <p
            className={`mx-2 text-sm font-semibold hover:text-indigo-700 ${
              pathname === "/" ? "text-indigo-700" : "text-gray-600"
            }`}
          >
            Dashboard
          </p>
        </Link>
      </div>
      {children}
      <div className="flex items-center justify-center ml-auto">
        <DropdownProfile
          user={user} handleLogout={handleLogout}
          align="right"
        />
      </div>
    </div>
  );
};

export default Navigation;
