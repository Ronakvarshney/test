import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tab,setTab]=useState("Profile");
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [globaluser, setglobalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableClass , setAvailableClass] = useState([]);


    useEffect(() => {
      const state = localStorage.getItem('isLoggedIn');
      const bool = state === "true";
      setIsLoggedIn(bool);
      console.log(isLoggedIn)
      const newState=localStorage.getItem("user");
      setglobalUser(JSON.parse(newState));
      console.log(typeof newState)
    }, []);




  const states = {
    globaluser,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    setglobalUser,
    tab,
    setTab,
    availableClass,
    setAvailableClass
  };

  return <AppContext.Provider value={states}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
