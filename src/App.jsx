import { useState, createContext } from 'react';
import Register from './components/Register'
export const Context1 = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setCreds] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="overflow-x-hidden">
      <Context1.Provider value={{userCredentials,setCreds,isAuthenticated,setIsAuthenticated}}>
        <Register/>
      </Context1.Provider>
    </div>
  );
}

export default App;
