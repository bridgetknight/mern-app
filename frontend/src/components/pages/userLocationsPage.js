import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const ParentComponent = () => {

    const userId = '65b2a17230573843d897d0a3';

    return(
        <div>
            <SavedLocation userId={userId} /> 
        </div>
    );
};

const SavedLocation = ({userId}) => {
    const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/locations/getAll/${userId}`);
          setLocations(response.data);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };
  
      fetchLocations();
    }, [userId]);

    const sortedLocations = [...locations].sort((a, b) => a.label.localeCompare(b.label));
    
    const labelIcons = {
        'Home': '🏠',
        'Work': '🏢',
        'Park': '🌳',
        'School': '🎓',
        'Gelato':'🍨',
        'Brunch': '🥞',
        'Hair Salon':'💇🏾‍♀️',
        'Yoga Studio': '🧘🏾‍♀️'
    };

    return (
        <div>
        {sortedLocations.map((location, index) => (
          <Card
            key={location._id}
            className="m-2"
            style={{
                backgroundColor: `rgba(30, 144, 255, ${1 - index * 0.1})`, // Different shades of blue
                border: '2px solid red' // Red border }} // Light blue color with increasing darkness
            }}
          >
            <Card.Body>
              <Card.Title>
              <span role="img" aria-label="location icon">{labelIcons[location.label]}</span> {location.label} {/* Icon before the label */}
              </Card.Title>
              <Card.Text>
              <strong><span role="img" aria-label="location pin icon">📍</span> Address:</strong><br />
              &nbsp;&nbsp;{location.streetAddress}<br />
              &nbsp;&nbsp;{location.city}, {location.state} {location.zipCode}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };
  
  export default ParentComponent;