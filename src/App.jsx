import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import RestaurantSearch from "./pages/RestaurantSearch";

function App() {
  const [rest, setRest] = useState([]);
  const [randomRest, setRandomRest] = useState({});
  const [isShowingRandom, setIsShowingRandom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const YELP_TOKEN = import.meta.env.VITE_YELP_TOKEN;

  const BASE_URL =
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses";

  const fetchRandom = async (result) => {
    const random = Math.floor(Math.random() * result.length);
    const randomId = result[random].id;
    const response = await axios.get(`${BASE_URL}/${randomId}`, {
      headers: {
        Authorization: `Bearer ${YELP_TOKEN}`,
        withCredentials: true,
      },
    });
    setRandomRest(response.data);
    setIsShowingRandom(true);
  };

  const handleSubmit = async (city, food) => {
    const allRest = await axios.get(
      `${BASE_URL}/search?location=${city}&term=${food}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${YELP_TOKEN}`,
          accept: "application/json",
        },
      }
    );
    setRest(allRest.data.businesses);
    const result = allRest.data.businesses;
    fetchRandom(result);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              randomRest={randomRest}
              handleSubmit={handleSubmit}
              isShowingRandom={isShowingRandom}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/restaurants"
          element={<RestaurantSearch restaurants={rest} />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
