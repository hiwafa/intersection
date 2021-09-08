import react, { useState, useContext } from "react";

import ReactMapGL, { Marker, MapContext } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useGetIntersectionsQuery } from "../store/query";


const CustomMarker = ({ crashId, inventory, onPress }) => {

    const context = useContext(MapContext);

    const lent = inventory.crash_intersections ?
    inventory.crash_intersections.length : 0;

    const crashes = lent > 0 ? inventory.crash_intersections :
    [{LATITUDE: 35.1, LONGITUD: -90.1}];

    const [x, y] = context.viewport.project([crashes[0].LONGITUD, crashes[0].LATITUDE]);

    const markerStyle = {
        position: 'absolute',
        background: lent > 4 ? 'red' : lent > 2 ? 'blue' : 'green',
        left: x,
        top: y,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    };

    return (
        <div style={markerStyle} key={crashId} onClick={()=> onPress(inventory)}>
           {lent}+
        </div>
    );
}

const MapView = ({onPress, inventories}) => {

    const [viewport, setViewport] = useState({
        latitude: 35.75,
        longitude: -96.43,
        zoom: 4
    });

    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken="pk.eyJ1IjoibXVoYW1tYWR3YWZhIiwiYSI6ImNrdDd6dXYyMDB4bHgydm45am1iaTM2OWsifQ.hhGRZWzTy2nRqW-gbloMOw"
            onViewportChange={(viewport) => setViewport(viewport)}
        >

            {inventories && inventories.map(invnt => {



                return (
                    <CustomMarker
                        key={invnt.id}
                        crashId={invnt.id}
                        inventory={invnt}
                        onPress={onPress}
                    />
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;