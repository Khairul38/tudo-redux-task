import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import SideMenu from "../components/SideMenu";
import { setSlidingWindow } from "../features/auth/authSlice";

const Dashboard = () => {
  const { slidingWindow, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSlidingWindow());
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Navigation />
      <div className="flex justify-center items-center h-screen">
        {!slidingWindow && (
          <button
            onClick={handleClick}
            className="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
          >
            Open Sidebar
          </button>
        )}
      </div>

      <SideMenu
        user={user}
        slidingWindow={slidingWindow}
        handleClick={handleClick}
        width={320}
      />
    </div>
  );
};

export default Dashboard;
