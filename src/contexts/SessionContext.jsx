import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  const verifyToken = async (jwt) => {
    try {
      const fetchData = await fetch("http://localhost:5005/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await fetchData.json()
      setUserData(data)
      setToken(jwt);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("authToken");
    }
  };
  console.log(userData)
  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    verifyToken(localToken);
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token)
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ setToken, isAuthenticated, isLoading, userData}}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;