import React, { useState, useEffect, useLayoutEffect } from 'react'
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import "../sidebar.css";
import "./locModal.css";
import Modal from 'react-bootstrap/Modal';
import getUserInfo from "../utilities/decodeJwt";

// Radar public key
Radar.initialize("prj_live_pk_b4d3412f3d0dd3a0954d78d19f342d06f0bbddff");
const url = "localhost:8096/";
const Sidebar = () => {
    let addressA = null;
    let addressB = null;
    const [user, setUser] = useState();

    useEffect(() => {
      setUser(getUserInfo());
    }, []);
  

    // Modal initialization
    const [showPopup, setPopupShow] = useState(false);

    useLayoutEffect(() => {
        // save location buttons
        const saveB = document.getElementById("save_b");
        let selectedAddress = null; 

        // Function to handle starting location autocomplete
        function handleStartingLocation(event) {
            const input = event.target;
            if (input.id === 'starting_location') {
                // Call Radar autocomplete with starting_location container ID
                    Radar.ui.autocomplete({
                        container: 'starting_location',
                        width: '252px',
                        response: true,
                        limit: 5,
                        minCharacters: 3,
                        onSelection: (address) => {
                            addressA = address;
                            selectedAddress = address;
                        }
                    });
            }
        }

        // Function to handle ending location autocomplete
        function handleEndingLocation(event) {
            const input = event.target;
            if (input.id === 'ending_location') {
                // Call Radar autocomplete with ending_location container ID
                Radar.ui.autocomplete({
                    container: 'ending_location',
                    width: '252px',
                    response: true,
                    limit: 5,
                    minCharacters: 3,
                    showMarkers: true,
                    markerColor: '#acbdc8',
                    onSelection: (address) => {
                        addressB = address;
                        selectedAddress = address;
                    }
                });
            }
        }

        // Attach event listeners to both input elements
        document.getElementById('starting_location').addEventListener('keyup', handleStartingLocation);
        document.getElementById('ending_location').addEventListener('keyup', handleEndingLocation);
        
        document.getElementById("save_a").addEventListener("click", () => {
            verifyAddress(selectedAddress);
        })

        saveB.addEventListener("click", () => {
            verifyAddress(selectedAddress);
        })

        // When a save button is clicked, show popup and attach confirmation listener
        // if address is provided
        function verifyAddress(address) {
            if(address) {
                setPopupShow(true);
                attachConfirmation();
            }
        }

        // Attach listener to confirmation button when it's visible in the modal
        function attachConfirmation() {
            console.log("Confirmation attached.");
            const locConfirm = document.getElementById("locConfirm");
            if (locConfirm) {
                locConfirm.addEventListener("click", function() {
                    setPopupShow(false);
                    parseLocation(selectedAddress);
                });
            }
        }

        // Parsing address into pieces to be saved
        function parseLocation(address) {
            if (!user) {
                console.log("User information not available.");
                alert("You must be logged in to save a location.");
                return;
            }

            // Get user-defined label for this location when they click confirm
            const labelInputBox = document.getElementById("label_input");
            const labelInput = labelInputBox.value;

            console.log(`Label: ${labelInput}`);

            if(!labelInput) {
                alert("Invalid location!");
            } else {
                console.log("Saving location...");

                // Get user information
                const { userId, email, username, password } = user

                // Split Radar address into parts
                const streetAddress = address.addressLabel;
                const city = address.city;
                const postalCode = address.postalCode;
                const state = address.state;
                const label = labelInput;
                console.log(`userId: ${userId}`);

                // Prepare the data payload for the POST request
                const data = {
                    streetAddress: streetAddress,
                    city: city,
                    state: state,
                    zipCode: postalCode,
                    userId: userId,
                    label: label
                };

                saveLocation(data);
            }
        }

        // Function to send a POST request to MongoDB for saving a location
        async function saveLocation(data) {
            try {
                const response = await fetch(`${url}/location/addLocation`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                // Check if the request was successful
                if(response.ok) {
                    const responseData = await response.json();
                    console.log(`Success! ${responseData}`);
                } else {
                    const errorMessage = await response.text();
                    console.log(`Failure: ${errorMessage}`);
                }
            } catch (error) {
                console.error("Error saving location:", error);
            }
        }
    })

    return (
        <>
            {/* Top sidebar */ }
            <div className="sidebar" id="top_sidebar">
                <div className="letter_circle" id="a_circle"></div>
                <div className="location_letter" id="a_letter">A</div>
                <div id="location_inputs">
                    <div id="starting_location_div">
                        <input type="text" id="starting_location" className="location_box" placeholder="Search for a location..." defaultValue="" style={{ outlineStyle: 'none' }}/>
                    </div>
                    <div id="ending_location_div">
                        <input type="text" id="ending_location" className="location_box" placeholder="Search for a location..." defaultValue="" style={{ outlineStyle: 'none' }}/>
                    </div>
                </div>
                <button className="save_location" id="save_a" onClick={() => setPopupShow(true)}>Save Location</button>
                <button className="save_location" id="save_b" onClick={() => setPopupShow(true)}>Save Location</button>

                <Modal className="locPopup" show={showPopup} onHide={() => setPopupShow(false)}>
                    <Modal.Body>
                        <div className="modalHeader" style={{ height: "110px" }}>
                            <span className="locPopupTitle">Enter a name for your saved location.</span>
                            <button variant="link" className="close" onClick={() => setPopupShow(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <button className="y_button" id="locConfirm">Confirm</button>
                        </div>
                        <input type="text" placeholder="Home" className="labelInput" id="label_input"/>
                    </Modal.Body>
                </Modal>

                <div className="dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="location_letter" id="b_letter">B</div>
                <div className="letter_circle" id="b_circle"></div>
                {/* Bottom sidebar */ }
                <div className="sidebar" id="bottom_sidebar">
                    <span style={{ position: "absolute", top: "50px", padding: "0 25px 0 25px", textAlign: "center", fontFamily: "Asap", color: "#858484" }}>
                        Enter a starting location and destination to get route recommendations.
                    </span>
                </div>
                <button id="go_button" className="y_button">GO</button>
                <div className="sidebar_arrow"></div>
            </div>
        </>
    )
}

export default Sidebar;