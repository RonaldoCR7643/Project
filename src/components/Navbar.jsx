import { useState, useContext } from "react";
import { Context } from "../Layout/Layout";
import { CiLight, CiDark } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Context1 } from "../App";
function Navbar() {
  const { dark, setDark, } = useContext(Context);
  const { userCredentials,setIsAuthenticated,isAuthenticated } = useContext(Context1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegister, setRegister] = useState(true); 
  const toggleDarkMode = () => {
    setDark((prev) => !prev);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={`w-[100%] px-8 ${dark ? "bg-slate-900" : "bg-slate-50"} border-b-2 fixed top-0 left-0 right-0 z-10`}>
      <div className="max-w-[1140px] px-5 py-6 mx-auto flex justify-between items-center">
        <p className={`text-md md:text-2xl font-sans font-bold ${dark ? "text-white" : "text-black"}`}>
          Where in the World?
        </p>
        <div className="flex md:gap-2 gap-1 items-center md:mt-1">
          {dark ? (
            <CiLight onClick={toggleDarkMode} className={`text-[28px] md:text-3xl ${dark ? "text-white" : "text-black"}`} />
          ) : (
            <CiDark onClick={toggleDarkMode} className={`text-[24px] md:text-3xl ${dark ? "text-white" : "text-black"}`} />
          )}
            <div>
            
            </div>
          {isRegister && (
            <div className="relative">
              <p onClick={toggleDropdown} className={`font-sans font-semibold text-sm md:text-[18px] flex cursor-pointer ${dark ? "text-white" : "text-black"}`}>
                <MdOutlineKeyboardArrowDown />
              </p>
              {isDropdownOpen && (
                <div className={`absolute p-3 px-5 right-1 top-8 bg-gray-200 rounded-md shadow-md ${dark ? "bg-slate-800" : "bg-white"}`}>
                  <p onClick={()=>setIsAuthenticated(false)} className="text-sm font-medium flex gap-1 items-center cursor-pointer text-red-800 mb-2">
                    Logout <IoIosLogOut className="font-bold text-md mt-1" />
                  </p>
                  <p className={`text-sm ${dark ? "text-white" : "text-black"}`}>{userCredentials.email}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
