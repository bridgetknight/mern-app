import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for getting URL parameters
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Import Button from react-bootstrap

const LocationDetails = () => {
    const { locationId } = useParams(); // Get locationId from URL parameters
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/locations/getLocationById/${locationId}`);
                setLocation(response.data);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchLocation();
    }, [locationId]);

    const handleRemoveLocation = async () => {
        try {
            await axios.delete(`http://localhost:8081/locations/deleteLocationById/${locationId}`);
            // Redirect to the user locations page after deleting location
            window.location.href = '/userLocationsPage'; // Alternatively, use navigate to handle routing
        } catch (error) {
            console.error('Error removing location:', error);
        }
    };

    return (
        <div>
            {location && (
                <div>
                    <Card className="m-2">
                        <Card.Body>
                            <Card.Title>Label</Card.Title>
                            <Card.Text>{location.label}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="m-2">
                        <Card.Body>
                            <Card.Title>Address</Card.Title>
                            <Card.Text>
                                <strong>Street Address:</strong> {location.streetAddress} <br />
                                <strong>City:</strong> {location.city} <br />
                                <strong>State:</strong> {location.state} <br />
                                <strong>Postal Code:</strong> {location.zipCode}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Button onClick={handleRemoveLocation} variant="danger" className="m-2">Remove location</Button>
                </div>
            )}
        </div>
    );
};

export default LocationDetails;