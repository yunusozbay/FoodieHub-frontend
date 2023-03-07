import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  const verifyToken = async (jwt) => {
    try {
      const fetchData = await fetch("http://localhost:5005/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await fetchData.json();
      if (data?.username) {
        setUserData(data);
        setToken(jwt);
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        console.log(data);
        setIsLoading(false);
        setUserData(null);
        setIsAuthenticated(false);
        setToken(null);
        navigate("/");
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

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    setIsLoading(false);
    setUserData(null);
    setIsAuthenticated(false);
    setToken(null);
    navigate("/");
  };

  const refreshData = async () => {
    const data = await fetch("http://localhost:5005/auth/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const refreshedUserData = await data.json();
    setUserData(refreshedUserData);
    return refreshedUserData;
  };

  return (
    <SessionContext.Provider
      value={{
        setToken,
        token,
        isAuthenticated,
        isLoading,
        userData,
        setUserData,
        verifyToken,
        handleLogout,
        refreshData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
