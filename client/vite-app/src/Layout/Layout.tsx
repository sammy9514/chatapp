import { Outlet } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Login } from "../auth/Login";

export const Layout = () => {
  const clicked = useSelector((state: any) => state.user.clicked);
  // console.log(clicked);

  return (
    <div>
      {clicked ? (
        <div className="sm:flex sm:text-left ">
          <div className="sm:flex hidden sm:text-left ">
            <SideBar />
          </div>
          <div className="w-full sm:w-[calc(100%-360px)] h-screen overflow-hidden  sm:block">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="sm:flex sm:text-left">
          <div className="sm:flex sm:text-left">
            <SideBar />
          </div>
          <div className="w-full sm:w-[calc(100%-360px)] h-screen overflow-hidden hidden sm:block">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};
