import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import graphlib from "@dagrejs/graphlib";
import * as L from "leaflet";
import {antPath} from 'leaflet-ant-path';
import MapContext from "./MapContext";
import "../sidebar.css";
import "./locModal.css";
import MBTA_JSON from "../utilities/mbta_graph.json";
import Modal from 'react-bootstrap/Modal';
import getUserInfo from "../utilities/decodeJwt";
import axios from 'axios';

// Radar public key
Radar.initialize("prj_live_pk_b4d3412f3d0dd3a0954d78d19f342d06f0bbddff");

// Create markers A and B
const markerAPath = "/markerA.png";
const markerA = L.icon({
    iconUrl: markerAPath,
    iconSize: [32, 43],
    iconAnchor: [16,43],
    popupAnchor: [0, -43]
})

const markerBPath = "/markerB.png";
const markerB = L.icon({
    iconUrl: markerBPath,
    iconSize: [32, 43],
    iconAnchor: [16,43],
    popupAnchor: [0, -43]
})

const stationMarkerPath = "/T.png";
const stationMarker = L.icon({
    iconUrl: stationMarkerPath,
    iconSize: [32, 32],
    iconAnchor: [16,32],
    popupAnchor: [0, -43]
})

const Sidebar = ({ onAddressSelection }) => {
    // Create graph of MBTA stations from graphlib-formatted JSON

    const graph = graphlib.json.read(MBTA_JSON);
    console.log("Successfully created graph:", graph);
    const edges = MBTA_JSON.edges;

    const [addressA, setAddressA] = useState(null);
    const [addressB, setAddressB] = useState(null);
    const [user, setUser] = useState();
    const [showRouteInfo, setShowRouteInfo] = useState(false);
    const [routeTime, setRouteTime] = useState(null);
    const [routeStops, setRouteStops] = useState([]);
    const [names, setNames] = useState([]);
    const [lines, setLines] = useState([]);
    const map = useContext(MapContext);

    window.polylines = [];
    var markers = [];
    window.stationMarkers = [];

    // Map cleanup function
    function clearLayers(group) {
        group.forEach(function (item) {
            map.removeLayer(item)
        });
    }

    function clearMarker(id) {
        var new_markers = [];
        markers.forEach(function(marker) {
            if (marker._id === id) map.removeLayer(marker);
            else new_markers.push(marker);
        });
        markers = new_markers;
    }

    useEffect(() => {
        setUser(getUserInfo());
    }, []); 

    /* Handle route generation requests */
    const getNearestStation = async (latitude, longitude) => {
        return new Promise((resolve, reject) => {
            try {
                axios.get(
                    `https://api-v3.mbta.com/stops?filter[latitude]=${latitude}&filter[longitude]=${longitude}&filter[radius]=0.01&filter[location_type]=1`,
                    {
                        headers: {
                            accept: "application/vnd.api+json"
                        }
                    }
                ).then(response => {
                    // Find nearest station matching a node in graph
                    for (const station of response.data.data) {
                        const { id } = station;
                        const hasNode = graph.hasNode(id);

                        if (hasNode) {
                            return resolve(station); // Resolve with the first matching station
                        }
                    }
                    reject(new Error("No matching station found."));
                })
                .catch(error => {
                    reject(error); // Reject on network or parsing errors
                }); 
            } catch (error) {
                reject(error); // Reject on unexpected errors
            }
        })
    }

    function weight(e) {
        var v = e.v;
        var w = e.w;

        var matchingEdge = edges.find(jsonEdge => jsonEdge.v === v && jsonEdge.w === w);
        return matchingEdge.value.travel_time;
    }

    async function handleGoButton() {
        try {
            // Find optimal path between stations closest to A and B
            var firstStation = await getNearestStation(addressA.latitude, addressA.longitude);
            var lastStation = await getNearestStation(addressB.latitude, addressB.longitude);

            const pathData = findShortestPath(graph, firstStation.id, lastStation.id);
            const traceback = tracePath(pathData[0], firstStation.id, pathData[3].predecessor);
            const latLons = await getTraceCoords(traceback);
            drawRoute(latLons, map);
            setRouteStops(traceback);
            setRouteTime(pathData[3].distance);
            setNames(await getNames(traceback));
            setLines(await getLines(traceback));
            setShowRouteInfo(true);
        } catch (error) {
            console.error("Error fetching nearest stations:", error);
            alert("No direct paths were found.");
        }
    }

    // Use Dijkstra's algorithm to find the optimal route between two stations
    function findShortestPath(graph, source, destination) {
        const dijkstra = graphlib.alg.dijkstraAll(graph, weight);
        const optimalPath = dijkstra[source][destination];
        console.log("Paths:", JSON.stringify(optimalPath, null, 2));
        return ([dijkstra, source, destination, optimalPath]);
    }

    // Trace the path backwards from the destination
    function tracePath(dijkstra, source, destination) {
        let current = destination;
        let trace = [];
        while(dijkstra[source][current].predecessor != source) {
            trace.unshift(current);
            current = dijkstra[source][current].predecessor;
        }
        trace.unshift(source);
        return trace;
    }

    // Call MBTA API to get coordinates for a particular stop
    const getCoordPair = async (stationId) => {
        return new Promise((resolve, reject) => {
            try {
                axios.get(
                    `https://api-v3.mbta.com/stops/${stationId}`,
                    {
                        headers: {
                            accept: "application/vnd.api+json"
                        }
                    }
                ).then(response => {
                    // Find nearest station matching a node in graph
                    var coords = new L.LatLng(response.data.data.attributes.latitude, response.data.data.attributes.longitude);
                    return resolve(coords);
                })
                .catch(error => {
                    reject(error); // Reject on network or parsing errors
                }); 
            } catch (error) {
                reject(error); // Reject on unexpected errors
            }
        })
    }

    // Get coordinates for each station in the optimal path
    async function getTraceCoords(trace) {
        let coords = [];
        for (const station of trace) {
            coords.push(await getCoordPair(station));
        }
        return coords;
    }

    function drawRoute(pointList, map) {
        clearLayers(window.polylines);
        clearLayers(window.stationMarkers);
        console.log(`Drawing routes: ${pointList}`);
        const routePolyline = L.polyline(pointList, {
            "weight": 5,
            "color": "#000",
            "smoothFactor": 10,
        });
        map.addLayer(routePolyline);
        
        map.setView(pointList[0], 12, {
            "animate": true,
            "pan": {
                "duration": 10
            }
        });

        for (const pair of pointList) {
            const marker = L.marker(pair, { icon: stationMarker }).addTo(map);
            (window.stationMarkers).push(marker);
        }

        (window.polylines).push(routePolyline);
    }

    const getStopName = async (stationId) => {
        // Get stop name
        return new Promise((resolve, reject) => {
            try {
                axios.get(
                    `https://api-v3.mbta.com/stops/${stationId}`,
                    {
                        headers: {
                            accept: "application/vnd.api+json"
                        }
                    }
                ).then(response => {
                    // Find nearest station matching a node in graph
                    var name = response.data.data.attributes.name;
                    return resolve(name);
                })
                .catch(error => {
                    reject(error); // Reject on network or parsing errors
                }); 
            } catch (error) {
                reject(error); // Reject on unexpected errors
            }
        })
    }

    const getStopLine = async (stationId) => {
        // Get stop line
        return new Promise((resolve, reject) => {
            try {
                axios.get(
                    `https://api-v3.mbta.com/routes?filter[stop]=${stationId}`,
                    {
                        headers: {
                            accept: "application/vnd.api+json"
                        }
                    }
                ).then(response => {
                    // Find nearest station matching a node in graph
                    var lineInfo = [response.data.data[0].id, response.data.data[0].attributes.color];
                    return resolve(lineInfo);
                })
                .catch(error => {
                    reject(error); // Reject on network or parsing errors
                }); 
            } catch (error) {
                reject(error); // Reject on unexpected errors
            }
        })
    }

    const getNames = async (path) => {
        let nameInfo = [];
        for (const station of path) {
            var name = await getStopName(station);
            nameInfo.push(name);
        }
        return nameInfo;
    }

    const getLines = async (path) => {
        let lineInfo = [];
        for (const station of path) {
            var line = await getStopLine(station);
            console.log(line);
            lineInfo = [...lineInfo, line];
        }
        return lineInfo;
    }

    // Modal initialization
    const [showPopup, setPopupShow] = useState(false);

    useLayoutEffect(() => {

        function createMarker(address, chosenMarker, map) {
            var id;
            if(chosenMarker === markerA) {
                clearMarker("A");
                id = "A";
            } else {
                clearMarker("B");
                id = "B";
            }
            const marker = L.marker([address.latitude, address.longitude], { icon: chosenMarker }).addTo(map);
            marker._id = id;
            markers.push(marker);
        }

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
                    showMarkers: true,
                    onSelection: (address) => {
                        setAddressA(address);
                        createMarker(address, markerA, map);
                        clearLayers(window.polylines);
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
                    markerColor: '#2596be',
                    onSelection: (address) => {
                        setAddressB(address);
                        createMarker(address, markerB, map);
                        clearLayers(window.polylines);
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
                console.log(`username: ${username}`);

                // Prepare the data payload for the POST request
                const data = {
                    streetAddress: streetAddress,
                    city: city,
                    state: state,
                    zipCode: postalCode,
                    username: username,
                    label: label
                };
                
                console.log(data);
                console.log(JSON.stringify(data));
                saveLocation(data);
            }
        }

        // Function to send a POST request to MongoDB for saving a location
        async function saveLocation(data) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/locations/addLocation`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                console.log(JSON.stringify(data));

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
    }, [map])

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
                {showRouteInfo ? (
                <div className="route_info" id="main_route" style={{ position: "absolute", paddingTop: "40px", fontSize: "26px", fontWeight: "bold" }}>
                    <div id="route_title" style={{ position: "absolute", left: "67px", textAlign: "center", width: "200px"}}>Your Route</div>
                    <div id="route_time" style={{ position: "absolute", left: "45px", top: "80px", textAlign: "center", fontSize: "18px", paddingBottom: "10px", color: "#757575", width: "250px"}}><i>Estimated time: {routeTime} minutes</i></div>
                    <div>
                        {names.map((stop, index) => (
                            <div id="routeStops" style={{ position: "relative", textAlign: "left", paddingRight: "20px", fontSize: "17px", top: "75px", left: "20px" }}>
                                <div key={index} className="stop_card_left" style={{ position: "relative", padding: "5px" }}>
                                    {stop}
                                </div>
                            </div>
                        ))}
                        {lines.map((line, index) => (
                            <div id="routeLines" style={{ position: "relative", textAlign: "right", paddingRight: "20px", fontSize: "17px", top: "-101px", left: "185px" }}>
                                <div key={index} className="stop_card_right" style={{ padding: "5px", color: `#${line[1]}` }}>
                                    {line[0]}
                                </div>  
                            </div>

                        ))}
                    </div>
                </div>
                ) : (
                    <span id="blurb" style={{ position: "absolute", top: "50px", padding: "0 25px 0 25px", textAlign: "center", fontFamily: "Asap", color: "#858484" }}>
                        Enter a starting location and destination to get route recommendations.
                    </span>
                )}
                </div>
                <button id="go_button" className="y_button" onClick={handleGoButton}>GO</button>
                <div className="sidebar_arrow"></div>
            </div>
        </>
    )
}

export default Sidebar;