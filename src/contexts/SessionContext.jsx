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
      const data = await fetchData.json();
      if (data && data.username !== undefined) {
        setUserData(data);
        setToken(jwt);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        console.log(data);
        setIsLoading(false);
        console.log("userData not found");
      }
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem("authToken");
    }
  };
  console.log(userData);
  useEffect(() => {
    const localToken = window.localStorage.getItem("authToken");
    verifyToken(localToken);
  }, []);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("authToken", token);
      verifyToken(token);
    }
  }, [token]);

  return (
    <SessionContext.Provider
      value={{ setToken, isAuthenticated, isLoading, userData, setUserData }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
