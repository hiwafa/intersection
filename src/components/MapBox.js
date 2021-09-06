import react, { useState, useContext } from "react";

import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";


const CustomMarker = ({ crashId, inventories }) => {

    const context = useContext(MapContext);

    const lent = inventories.crash_intersections ?
    inventories.crash_intersections.length : 0;

    const crashes = lent > 0 ? inventories.crash_intersections :
    [{LATITUDE: 35.1, LONGITUD: -90.1}];

    console.log("crashes::: ", inventories.crash_intersections);

    const [x, y] = context.viewport.project([crashes[0].LONGITUD, crashes[0].LATITUDE]);

    const markerStyle = {
        position: 'absolute',
        background: lent > 4 ? 'red' : lent > 2 ? 'blue' : 'green',
        left: x,
        top: y,
        width: 30,
        height: 30,
        borderRadius: 15,
    };

    return (
        <div style={markerStyle} key={crashId} onClick={()=> alert(crashId)}>
           {lent}+
        </div>
    );
}

const MapView = () => {

    const [viewport, setViewport] = useState({
        latitude: 35.75,
        longitude: -96.43,
        zoom: 4
    });

    const inventories = useGetIntersectionsQuery("intersection-inventories");

    console.log("inventories", inventories.data);

    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWR3YWZhIiwiYSI6ImNrdDd6dXYyMDB4bHgydm45am1iaTM2OWsifQ.hhGRZWzTy2nRqW-gbloMOw"
            onViewportChange={(viewport) => setViewport(viewport)}
        >

            {inventories.data && inventories.data.map(invnt => {



                return (
                    <CustomMarker
                        crashId={invnt.id}
                        inventories={invnt}
                    />
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;