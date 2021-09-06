import react, { useState, useContext } from "react";

import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";


const CustomMarker = ({ longitude, latitude, key }) => {
    const context = useContext(MapContext);

    const [x, y] = context.viewport.project([longitude, latitude]);

    console.log("LATITUDE!: ", latitude);
    console.log("LONGITUD!: ", longitude);

    const markerStyle = {
        position: 'absolute',
        background: '#fff',
        left: x,
        top: y
    };

    return (
        <div style={markerStyle} key={key}>
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



                return (
                    <CustomMarker
                        key={crash.id}
                        latitude={crash.LATITUDE}
                        longitude={crash.LONGITUD}
                    />
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;