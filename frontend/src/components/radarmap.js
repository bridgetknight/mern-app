import React from "react";
import Radar from "radar-sdk-js";

import "radar-sdk-js/dist/radar.css";

class RadarMap extends React.Component {
    componentDidMount() {
        Radar.initialize('prj_live_pk_b4d3412f3d0dd3a0954d78d19f342d06f0bbddff');

        // Create the map
        const map = Radar.ui.map({
			container: document.getElementById("map"),
			center: [-71.1589, 42.3601],
			style: "radar-default-v1",
			zoom: 11
		})	

		setTimeout(function() {
			map.resize();
		}, 100);
    }

    render() {
        return (
            <div id="map" style={{ position: "absolute", zIndex: -99, top: "154px", width: "100%", height: "100%" }} />
        )
    }
}

export default RadarMap;