import React, {useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { Context } from './Layout/Layout';
const IntersectionExample = () => {
  const {displayedTodos,dark}=useContext(Context)
  const navigate=useNavigate()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1140px] px-10 py-7 mx-auto  justify-between items-center gap-7' >
      {displayedTodos.map((ar, index) => {
        return (
          <div className='mb-3 shadow-lg p-3 border rounded-md'  key={index}>
            <img onClick={()=>navigate(`/countrys/${ar.cca3}`)} className='w-full h-40 object-cover rounded-sm mb-3 cursor-pointer' src={ar.flags.svg} alt="Flag" />
            <h1 className= {`ml-2 mt-1 text-xl font-sans font-bold ${dark ? 'text-white' : 'text-black'}`}>{ar.name.common}</h1>
            <h1 className={`ml-2 mt-1 ${dark ? 'text-white' : 'text-black'}`}>Population: {ar.population}</h1>
            <h1 className={`ml-2 mt-1 ${dark ? 'text-white' : 'text-black'}`} >Region: {ar.region}</h1>
          </div>
        )
      })}
    </div>
  );
};

export default IntersectionExample;




 








// const targetRef = useRef(null);
  // const [todos, setTodos] = useState([])
  // const [pages, setPages] = useState(0);
  // const fetchTodos = async () => {
  //   const response = await fetch("https://restcountries.com/v3.1/all");
  //   const data = await response.json();
  //   setTodos(data)
  //   // const splitted = data.slice(pages, pages + 16);
  //   // setTodos((prev) => ([...prev, ...splitted]));    
  // };
  // useEffect(() => {
  //   fetchTodos();
  // }, [])
  // console.log(todos);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         console.log('Moljal korinayabdi');
  //         fetchTodos();
  //         setPages((prev) => prev + 10)
  //       } else {
  //         console.log('Moljal korinmayabdi');
  //       }
  //     },
  //     {
  //       threshold: 0.1, 
  //     }
  //   );

  //   if (targetRef.current) {
  //     observer.observe(targetRef.current); 
  //   }
  //   return () => {
  //     if (targetRef.current) {
  //       observer.unobserve(targetRef.current); 
  //     }
  //   };
  // }, []);



  {/* <div className='flex gap-2 justify-center' ref={targetRef}>
        <span className='w-3 h-3 rounded-full border-2 border-blue-500'></span>
        <span className='w-3 h-3 rounded-full border-2 border-blue-500'></span>
        <span className='w-3 h-3 rounded-full border-2 border-blue-500'></span>
        </div> */}