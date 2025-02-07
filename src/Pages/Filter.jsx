import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "../Layout/Layout";
function Filter() {
  const { setSearch, onFilter,dark } = useContext(Context);
  return (
    <div className="max-w-[1140px] px-10 py-4 mx-auto block md:flex justify-between items-center mt-20 pt-16 ">
      <div className="w-[100%]">
        <FaSearch className={`${dark?'text-white':'text-gray-700'} absolute mt-[18px] mx-3`}/>
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className= {`${dark?'bg-slate-900':'bg-white'} ${dark?'text-white':'text-gray-950'} lg:w-[40%] md:w-[70%] w-[90%] shadow-md border rounded-md px-4 py-[10px] pl-10 mb-4 md:mb-0 text-xl`}
          type="text"
          placeholder="Search for a country..."
        />
      </div>
      <select
        onChange={(e) => onFilter(e.target.value)}
        className={`${dark?'bg-slate-900':'bg-white'} ${!dark?'text-gray-700':'text-white'} shadow-md px-6 py-2 rounded-md border text-[18px]`}
      >
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Africa">Africa</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
