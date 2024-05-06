import React, { useState, useContext } from 'react';
import Sidebar from "../sidebar";
import RadarMap from "../radarmap";
import MapContext from "../MapContext";

const Landingpage = ({ onAddressSelection }) => {
  const [startingAddress, setStartingAddress] = useState(null);
  const [endingAddress, setEndingAddress] = useState(null);
  const [map, setMap] = useState(null); 

  // Handle receiving of selected addresses from the sidebar component
  const handleAddressSelection = (addressA, addressB) => {
    // TODO
  }

  return (
    <>
      <RadarMap
        startingAddress={startingAddress}
        endingAddress={endingAddress}
        setMap={setMap}
      />
      {map && (
        <MapContext.Provider value={map}>
          <Sidebar onAddressSelection={handleAddressSelection} />
        </MapContext.Provider>
      )}
    </>
  )
}

export default Landingpage