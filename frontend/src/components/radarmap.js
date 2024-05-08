import React, { useState, useEffect } from "react";
import MapContext from "./MapContext";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const RadarMap = ({ startingAddress, endingAddress, setMap }) => {
    const [map, setLocalMap] = useState(null); 

    // Create the map
    useEffect(() => {
        if (!map) {
            const newMap = new L.map("map").setView([42.3601, -71.0589], 11);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
    
            setLocalMap(newMap);
            setMap(newMap);
        }
    }, [map, setMap]);

    return (
        <MapContext.Provider value={map}>
            <div id="map" style={{ position: "absolute", zIndex: -99, top: "154px", width: "100%", height: "100%" }} />
        </MapContext.Provider>
        
    )
}

export default RadarMap;