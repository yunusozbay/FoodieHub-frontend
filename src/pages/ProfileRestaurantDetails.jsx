import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';

function ProfileRestaurantDetails() {
    const [restaurant, setRestaurant]=useState();
    const [isLoading, setIsLoading] =useState(true);
    const {id} = useParams();

    async function fetchRestaurant() {
    const response = await axios.get(`http://localhost:5005/restaurants/profile/${id}`)
    console.log(response.data.restaurant)
    setRestaurant(response.data.restaurant)
    setIsLoading(false);
    }
    useEffect(() => {
     fetchRestaurant()
     if(!isLoading) {
        console.log(restaurant)}
    }, [])
    
    
  return (
    <div>
    {isLoading ? <p>Loading...</p> : (
        <h1>hello</h1>
    )}
    
    </div>
  )
}

export default ProfileRestaurantDetails