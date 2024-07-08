import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { SearchUser } from "./SearchUser";
import { logout } from "../hooks/authSlice";
import { TbLogout2 } from "react-icons/tb";
import { selectUser, setClicked } from "../hooks/conversationSlice";
import { getAllMessages, getAllUsers } from "../hooks/Fetcher";

export const AllUsers = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const selected = useSelector((state: any) => state.user.user);
  const { filtered } = SearchUser(search);

  const onLogout = () => {
    dispatch(logout());
  };

  const handleClicked = (click: any) => {
    dispatch(selectUser(click));
  };

  // const formattedTime = extractTime(message.createdAt);

  return (
    <div>
      <div className="bg-[#111b21] w-[360px]  h-screen flex flex-col border-r-[1px] border-r-[#7d8c97] ">
        <div className="w-[100%] h-[100%] overflow-y-auto">
          <div className="w-full h-[120px] sticky p-4 mb-[8px] top-0 bg-[#111b21] ">
            <div className="flex justify-between">
              <h1 className="text-[23px] font-bold text-white ">Amebooo</h1>
              <div
                className="  flex text-white justify-end items-center pr-4 cursor-pointer"
                onClick={onLogout}
              >
                <TbLogout2 />
              </div>
            </div>
            <div className="mt-2 flex bg-[#202c32] rounded-[5px] justify-center items-center pl-4 gap-3 text-[#7d8c97]">
              <div>
                <IoSearchSharp />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 bg-transparent outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className=" h-full  ">
            {filtered?.map((user: any) => (
              <div
                className={`w-full h-[70px] flex items-center gap-4 cursor-pointer  transition-all 
                ${
                  selected && selected._id === user._id
                    ? "bg-slate-600"
                    : "hover:bg-slate-600"
                } `}
                key={user._id}
                onClick={() => {
                  handleClicked(user);
                  dispatch(setClicked(true));
                }}
              >
                <div className="w-[45px] h-[45px] rounded-[50%] border ml-4 border-[#b7bbbe46]] ">
                  <img
                    src={`${user.avatar}`}
                    className="w-full h-full bg-center  "
                  />
                </div>
                <div className="border-t border-[#b7bbbe46] text-white w-[calc(95%-50px)] h-full transition-all flex flex-col justify-center hover:border-[transparent]">
                  <div className="flex justify-between pr-4">
                    <h3 className="font-bold text-[16px]">{user.userName}</h3>
                    {/* <p className="text-[13px] font-semibold text-green-500">
                      11:00
                    </p> */}
                  </div>
                  <div className="flex justify-between pt-1 pr-4">
                    {/* <h3 className="text-[13px] font-medium">Message</h3> */}
                    {/* <p className="text-[13px] w-[19px] h-[19px] bg-green-500 flex justify-center items-center rounded-[50%]">
                      1
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
