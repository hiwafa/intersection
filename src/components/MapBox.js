import react, { useState } from "react";

import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";

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
                    <div key={crash.id}>
                        <Marker
                            latitude={crash.LATITUDE}
                            longitude={crash.LONGITUD}
                            offsetLeft={-20}
                            offsetTop={-10}>
                            <span role="img" aria-label="push-pin">📌</span>
                        </Marker>
                    </div>
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;