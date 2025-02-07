import { useState, createContext } from "react";
import Register from "./components/Register";
import { users } from "./constants/User";
export const CurrentUser = createContext();
const Authentication = ({ children }) => {
  const [user, setUser] = useState(null);
  const loggedInUser = users.find(
    (item) =>
      user?.email === item.email &&
      user?.password === item.password
  );
  if (loggedInUser) {
    return (
      <CurrentUser.Provider value={{ setUser, user: loggedInUser }}>
        {children}
      </CurrentUser.Provider>
    );
  }

  return <Register setUser={setUser} />;
};

export default Authentication;
