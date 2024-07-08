import { useState } from "react";
import { BsChatRightDots } from "react-icons/bs";
// import { FaUsers } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import { Conversations } from "./ConverSations";
import { AllUsers } from "./AllUsers";
import { useSelector } from "react-redux";

export const SideBar = () => {
  const [path, setPath] = useState("user");
  const user = useSelector((state: any) => state?.auth?.user);
  console.log(user);

  return (
    <div className="flex">
      <div className="h-full w-[70px] bg-[#202c32] flex items-center flex-col max-sm:hidden ">
        <div className="w-[40px] h-full flex items-center flex-col p-4 text-[27px] text-white gap-5">
          <div
            onClick={() => {
              setPath("user");
            }}
            className={path === "user" ? "text-green-500" : "text-[white]"}
          >
            <PiUsersThreeBold />
          </div>
          <div
            onClick={() => {
              setPath("chat");
            }}
            className={path === "chat" ? "text-green-500" : "text-[white]"}
          >
            <BsChatRightDots />
          </div>
        </div>
        <div className="w-[45px] h-[45px] rounded-[50%] border mb-3 border-[#b7bbbe46]] ">
          <img
            src={`${user?.data?.avatar}`}
            className="w-full h-full bg-center  "
          />
        </div>
      </div>

      {/* {path === "user" && <AllUsers />} */}
      {path !== "user" ? <Conversations /> : <AllUsers />}
    </div>
  );
};
