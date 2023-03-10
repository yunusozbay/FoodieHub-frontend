import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';


function Map({latitude, longitude, oneRestaurant}) {

 

  return (
    <MapContainer center={[latitude, longitude]} zoom={20} scrollWheelZoom={false} style={{ height: '400px', width: '50%', marginTop: "50px"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>
             
            {oneRestaurant.name}<br/>
            {oneRestaurant.location.display_address}
            
          </Popup>

        </Marker>
      
    </MapContainer>
    
  );
}


export default Map;
