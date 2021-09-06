import react, { useState, useContext } from "react";

import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";


const CustomMarker = ({ longitude, latitude }) => {
    const context = useContext(MapContext);

    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
        position: 'absolute',
        background: '#fff',
        left: x,
        top: y
    };

    return (
        <div style={markerStyle} >
            ({longitude}, {latitude})
        </div>
    );
}

const MapView = () => {

    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    const intersections = useGetIntersectionsQuery("crash-intersections");

    console.log("intersections", intersections.data)


    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWR3YWZhIiwiYSI6ImNrdDd6dXYyMDB4bHgydm45am1iaTM2OWsifQ.hhGRZWzTy2nRqW-gbloMOw"
            onViewportChange={(viewport) => setViewport(viewport)}
        >

            {intersections.data.map(crash => {

                console.log("LATITUDE: ", crash.LATITUDE);
                console.log("LONGITUD: ", crash.LONGITUD);

                return (
                    <Marker
                        key={crash.id}
                        latitude={crash.LATITUDE}
                        longitude={crash.LONGITUD}
                    >
                        <span role="img" aria-label="push-pin">📌</span>
                    </Marker>
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;