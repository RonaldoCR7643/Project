import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Layout/Layout";
import { IoMdArrowRoundBack } from "react-icons/io";

function Country() {
  const { dark } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((response) => response.json())
      .then((data) => setCountry(data[0]))
      .catch((error) => console.error("Xatolik yuz berdi:", error));
  }, [id]);

  if (!country) {
    return <div className={`text-center ${dark ? 'text-white' : 'text-black'}`}>Yuklanmoqda...</div>;
  }

  return (
    <div className="pt-32 max-w-[1140px] h-auto pb-10 md:h-[100vh] mx-auto px-10">
      <button 
        className={`py-1 px-6 border flex gap-1 items-center rounded-md shadow-lg my-5 ${dark ? 'text-white' : 'text-black'}`} 
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack /> Back
      </button>
      
      <div className="w-full block md:flex gap-40">
        <img 
          className="max-w-[300px] md:max-w-[350px] mb-8 lg:mb-0 h-52 md:h-60 cursor-pointer" 
          src={country.flags.svg} 
          alt={country.name.common} 
        />

        <div className="block md:flex justify-between">
          <div>
            <h1 className={`text-xl font-bold mb-3 ${dark ? 'text-white' : 'text-black'}`}>
              {country.name.common}
            </h1>
            <h2 className={`text-lg mb-2 ${dark ? 'text-white' : 'text-black'}`}>
              <span className="font-medium">Population:</span> {country.population}
            </h2>
            <h2 className={`text-lg mb-2 ${dark ? 'text-white' : 'text-black'}`}>
              <span className="font-medium">Region:</span> {country.region}
            </h2>
            <h2 className={`text-lg mb-2 ${dark ? 'text-white' : 'text-black'}`}>
              <span className="font-medium">SubRegion:</span> {country.subregion}
            </h2>
            <h2 className={`text-lg mb-2 ${dark ? 'text-white' : 'text-black'}`}>
              <span className="font-medium">Capital:</span> {country.capital ? country.capital[0] : "No Capital"}
            </h2>
          </div>

          <div className="w-[55%]">
            <h2 className={`text-md mb-2 font-medium ${dark ? 'text-white' : 'text-black'}`}>
              <span className="font-semibold">Top Level Domain:</span> {country.tld && country.tld.length > 0 ? country.tld.join(", ") : "No TLD"}
            </h2>
          </div>
        </div>
      </div>

      {country.borders && (
        <div className="w-[90%] md:w-[50%]">
          <h2 className={`font-medium text-md md:text-xl mt-5 ${dark ? 'text-white' : 'text-black'}`}>Border Countries:</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-1 mt-2">
            {country.borders.map((border) => (
              <h1 
                key={border}
                onClick={() => navigate(`/countrys/${border}`)}
                className={`border py-1 px-3 max-w-20 text-center rounded-md shadow cursor-pointer ${dark ? 'text-white' : 'text-black'}`}
              >
                {border}
              </h1>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Country;
