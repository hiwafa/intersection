import react, { useState, useContext, useEffect } from "react";

import ReactMapGL, { MapContext, WebMercatorViewport, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import d3 from 'd3-ease';

const CustomMarker = ({ crashId, inventory, onPress }) => {

    const context = useContext(MapContext);
    const lent = inventory.crash_intersections ?
        inventory.crash_intersections.length : 0;

    const crashes = lent > 0 ? inventory.crash_intersections :
        [{ LATITUDE: 39.048198, LONGITUD: -94.604604 }];

    const [x, y] = context.viewport.project([parseFloat(crashes[0].LONGITUD), parseFloat(crashes[0].LATITUDE)]);

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
        <div style={markerStyle} key={crashId} onClick={() => onPress(inventory)}>
            { lent > 4 ? `${(4 + (lent-5))}+` : lent > 2 ? `${(2 + (lent-3))}+` : lent }
        </div>
    );
}

const MapView = ({ onPress, inventories }) => {

    const [viewport, setViewport] = useState({
        latitude: 39.048198,
        longitude: -94.604604,
        zoom: 11
    });

    useEffect(() => {
        (() => {
            try {
                if (inventories && Array.isArray(inventories) && inventories.length > 0) {

                    let allArr = [];
                    inventories.forEach(i => {

                        // if (i.crash_intersections) {
                        //     allArr = [...allArr, ...i.crash_intersections.map(c => [
                        //         parseFloat(c.LONGITUD), parseFloat(c.LATITUDE)
                        //     ])];
                        // }

                        const lent = i.crash_intersections ?
                            i.crash_intersections.length : 0;

                        if (lent > 0) {
                            allArr = [
                                ...allArr,
                                [
                                    parseFloat(i.crash_intersections[0].LONGITUD),
                                    parseFloat(i.crash_intersections[0].LATITUDE)
                                ]
                            ];
                        }

                    });

                    const { longitude, latitude, zoom } =
                        new WebMercatorViewport(viewport).fitBounds(allArr, {
                            padding: 50,
                            offset: [0, -100]
                        });

                    setViewport({
                        ...viewport,
                        longitude,
                        latitude,
                        zoom,
                        transitionDuration: 2000,
                        transitionInterpolator: new FlyToInterpolator(),
                        // transitionEasing: d3.easeCubicIn
                    });

                }
            } catch (err) {

            }
        })();
    }, [inventories]);

    const goToSF = inventory => {
        try {
            onPress(inventory);
            if (inventory && inventory.crash_intersections) {

                const arr = inventory.crash_intersections.map(c => [
                    parseFloat(c.LONGITUD), parseFloat(c.LATITUDE)
                ]);

                const { longitude, latitude, zoom } =
                    new WebMercatorViewport(viewport).fitBounds(arr, {
                        padding: 20,
                        offset: [0, -100]
                    });

                setViewport({
                    ...viewport,
                    longitude,
                    latitude,
                    zoom,
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator(),
                    // transitionEasing: d3.easeCubicIn
                });

            }
        } catch (err) {

        }
    };

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
                        onPress={goToSF}
                    />
                )
            })}

        </ReactMapGL>
    );
}


export default MapView;