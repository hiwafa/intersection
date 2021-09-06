import react, { useState, useContext } from "react";

import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";


const CustomMarker = ({ longitude, latitude, crashId }) => {
    const context = useContext(MapContext);

    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
        position: 'absolute',
        background: 'red',
        left: x,
        top: y,
        width: 30,
        height: 30,
        borderRadius: 15,
    };

    return (
        <div style={markerStyle} key={crashId} onClick={()=> alert(crashId)}>
           
        </div>
    );
}

const MapView = () => {

    const [viewport, setViewport] = useState({
        latitude: 35.75,
        longitude: -96.43,
        zoom: 4
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
                        crashId={crash.id}
                        latitude={crash.LATITUDE}
                        longitude={crash.LONGITUD}
                    />
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;