import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import EventCard from "./components/EventCard";
import RestaurantSearch from "./pages/RestaurantSearch";
import RestaurantDetails from "./pages/RestaurantDetails";
import NavBarComp from "./components/NavBarComp";
import UserDetails from "./pages/UserDetails";
import ProfileRestaurantDetails from "./pages/ProfileRestaurantDetails";
import Footer from "./components/Footer";

function App() {
  const [rest, setRest] = useState([]);
  const [randomRest, setRandomRest] = useState({});
  const [isShowingRandom, setIsShowingRandom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchRandom = async (result) => {
    setIsLoading(true);
    const random = Math.floor(Math.random() * result.length);
    const randomId = result[random].id;
    const response = await axios.post(`${BASE_URL}/search/restaurant`,  {
      id: randomId
    });
    setRandomRest(response.data);
    setIsLoading(false);
    setIsShowingRandom(true);
  };

  const handleSubmit = async (city, food) => {
    const response = await axios.post(`${BASE_URL}/search/restaurants`, {
      city, food
    });
    console.log(response.data)
    setRest(response.data.businesses);
    const result = response.data.businesses;
    fetchRandom(result);
  };

  return (
    <div>
      <NavBarComp />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              randomRest={randomRest}
              handleSubmit={handleSubmit}
              isShowingRandom={isShowingRandom}
              setIsShowingRandom={setIsShowingRandom}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/restaurants"
          element={
            <RestaurantSearch
              restaurants={rest}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/restaurants/:alias"
          element={<RestaurantDetails restaurants={rest} />}
        />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/events/:id" element={<EventCard />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurants/profile/:id"
          element={
            <PrivateRoute>
              <ProfileRestaurantDetails />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
