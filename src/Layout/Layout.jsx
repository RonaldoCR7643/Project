import { useState, createContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filter from "../Pages/Filter";
import IntersectionExample from "../InfiniteScroll";
import { Route, Routes, useSearchParams, Navigate } from "react-router-dom";
import Country from "../Pages/Country";
export const Context = createContext(null);
import { generateArray } from '../utilts/Utilits';
function Layout() {
  const [allCountrys, setAllCountrys] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState([]);
  const [search, setSearch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dark, setDark] = useState(() => {
    try {
      const savedDark = localStorage.getItem("dark");
      return savedDark !== null ? JSON.parse(savedDark) : false;
    } catch (error) {
      return false;
    }
  });
  
  useEffect(() => {
    try {
      localStorage.setItem("dark", JSON.stringify(dark));
    } catch (error) {
      console.error(error);
    }
  }, [dark]);
  
  useEffect(() => {
    const page = +searchParams.get("page") || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setAllCountrys(data))
      .catch(error => console.error("Ma'lumot olishda xatolik:", error));
  }, []);

  useEffect(() => {
    let data = allCountrys;
    const region = searchParams.get("region");
    if (region && region !== "All") {
      data = data.filter(country => country.region === region);
    }
    if (search) {
      data = data.filter(country => country.cca3.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredTodos(data);
    const pages = generateArray(Math.ceil(data.length / 12));
    setTotalPages(pages);
  }, [search, allCountrys, searchParams]);

  const displayedTodos = filteredTodos.slice((currentPage - 1) * 12, currentPage * 12);

  const onFilter = (region) => {
    setSearchParams({ region, page: 1 });
  };

  const onPaginate = (value) => {
    setSearchParams({ page: value });
  };

  return (
    <Context.Provider value={{ displayedTodos, dark, setDark, search, setSearch, onFilter, }}>
        <div style={{ backgroundColor: dark ? "#050D21" : "white", minHeight: '90vh' }}>
          <header>
            <Navbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/countrys" replace />} />
              <Route path="/countrys" element={
                <>
                  <Filter />
                  <IntersectionExample />

                  <footer className="flex gap-2 justify-center pb-2 overflow-x-auto">
                    {totalPages.length > 5 ? (
                      <>
                        <h1 
                          onClick={() => onPaginate(1)} 
                          className={`cursor-pointer p-[3px] border rounded-md ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                          1
                        </h1>
                        {currentPage > 3 && <span>...</span>}
                        {totalPages.slice(
                          Math.max(1, currentPage - 2),
                          Math.min(totalPages.length, currentPage + 1)
                        ).map((page) => (
                          <h1
                            key={page}
                            onClick={() => onPaginate(page)}
                            className={`cursor-pointer p-[3px] border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                          >
                            {page}
                          </h1>
                        ))}
                        {currentPage < totalPages.length - 2 && <span>...</span>}
                        <h1 
                          onClick={() => onPaginate(totalPages.length)} 
                          className={`cursor-pointer p-[3px] border rounded-md ${currentPage === totalPages.length ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                          {totalPages.length}
                        </h1>
                      </>
                    ) : (
                      totalPages.map((page) => (
                        <h1
                          key={page}
                          onClick={() => onPaginate(page)}
                          className={`cursor-pointer p-[3px] border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                          {page}
                        </h1>
                      ))
                    )}
                  </footer>
                </>
              } />
              <Route path="/countrys/:id" element={<Country />} />
            </Routes>
          </main>
        </div>
    </Context.Provider>
  );
}

export default Layout;
