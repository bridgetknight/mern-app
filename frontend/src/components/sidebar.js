import React, { useState } from "react";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import "../sidebar.css";

Radar.initialize("prj_live_pk_b4d3412f3d0dd3a0954d78d19f342d06f0bbddff");

window.onload = function() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    for (const input of textInputs) {
        input.value = '';
    }
};

const Sidebar = () => {
    //const [addressA, setAddressA] = useState(null);
    //const [addressB, setAddressB] = useState(null);

    return (
        <>
            {/* Top sidebar */ }
            <div className="sidebar" id="top_sidebar">
                <div className="letter_circle" id="a_circle"></div>
                <div className="location_letter" id="a_letter">A</div>
                <div id="location_inputs">
                    <div id="starting_location_div">
                        <input type="text" id="starting_location" className="location_box" placeholder="Search for a location..." value=""/>
                    </div>
                    <div id="ending_location_div">
                        <input type="text" id="ending_location" className="location_box" placeholder="Search for a location..." value=""/>
                    </div>
                </div>
                <button className="save_location" id="save_a">Save Location</button>
                <button className="save_location" id="save_b">Save Location</button>
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