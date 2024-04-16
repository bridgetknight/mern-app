import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import getUserInfo from '../../utilities/decodeJwt'

const SavedLocation = ({ userId }) => {
    const [locations, setLocations] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchLocations = async () => {
            const userInfo = getUserInfo();
            try {
                const response = await axios.get(`http://localhost:8081/locations/getAll/${userInfo.id}`);
                setLocations(response.data);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();

    }, []);

    const sortedLocations = [...locations].sort((a, b) => a.label.localeCompare(b.label));

    const labelIcons = {
        'Home': '🏠',
        'Work': '🏢',
        'Park': '🌳',
        'School': '🎓',
        'Gelato': '🍨',
        'Brunch': '🥞',
        'Hair Salon': '💇🏾‍♀️',
        'Yoga Studio': '🧘🏾‍♀️'
    };

    return (
        <div>
            {sortedLocations.map(location => (
                <Card
                    key={location._id}
                    className="m-2"
                    style={{
                        backgroundColor: 'lightblue', // Adjust the background color
                        border: '2px solid red',
                        position: 'relative', // Set position to relative for containing the absolutely positioned icon
                    }}
                >
                    <Card.Body>
                        <Card.Title>
                            <span role="img" aria-label="location icon">{labelIcons[location.label]}</span> {location.label}
                        </Card.Title>
                        <Card.Text>
                            <strong><span role="img" aria-label="location pin icon">📍 </span></strong>
                            {location.streetAddress} . {location.city}
                        </Card.Text>
                        {/* Link to the details page */}
                        <Link
                            to={`/locationDetailsPage/${location._id}`} // Redirect to LocationDetails page with locationId as parameter
                            style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            <span role="img" aria-label="info icon">ℹ</span>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default SavedLocation;