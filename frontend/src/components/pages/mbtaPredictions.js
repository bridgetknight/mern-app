import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Routes() {
  const [routes, setRoutes] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/routes',
      );
      setRoutes(result.data.data);
    }
    fetchData();
  }, []);

 // var color = "#"+route.attribute.color;
  
  return (
    <div>
      {routes.map(route => (
        
        <Card
        body
        outline="true"
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem", borderColor: `#${route.attributes.color }`}}
        border
        >
        <Card.Body>
        <Card.Title>Route</Card.Title>
        <Card.Text>{route.attributes.header}
        {route.attributes.description} {route.attributes.long_name}
        <br></br><span id="destination">Direction: {route.attributes.direction_destinations[0]}</span>
        </Card.Text>
        </Card.Body>
      </Card>
      ))}

      <h1>Loading Routes...</h1>
      {routes.map(route => (
        <div key={route.id}>
          <h3>{route.attributes.header}</h3>
          <p>{route.attributes.description}</p>
          <p>{route.attributes.direction_destinations[0]}</p>
        </div>
      ))}
    </div>
  );
}


export default Routes;