import react, { useState, useContext, useEffect } from "react";

import ReactMapGL, {
    MapContext, WebMercatorViewport,
    FlyToInterpolator, NavigationControl
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function getCursor({ isHovering, isDragging }) {
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
}

const CustomMarker = ({ crashId, inventory, onPress }) => {

    const context = useContext(MapContext);
    const lent = inventory.crash_intersections ?
        inventory.crash_intersections.length : 0;

    const crashes = lent > 0 ? inventory.crash_intersections :
        [{ LATITUDE: 39.048198, LONGITUD: -94.604604 }];

    const [x, y] = context.viewport.project([parseFloat(crashes[0]
        .LONGITUD), parseFloat(crashes[0].LATITUDE)]);

    const markerStyle = {
        position: 'absolute',
        background: lent > 4 ? 'red' : lent > 2 ? 'blue' : 'green',
        left: x, top: y,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        cursor: "pointer"
    };

    return (
        <div style={markerStyle} key={crashId} onClick={() => onPress(inventory)}>
            {/* { lent > 4 ? `${(4 + (lent-5))}+` : lent > 2 ? `${(2 + (lent-3))}+` : lent } */}
            {lent > 20 ? `20+` : lent}
        </div>
    );
}

const MapView = ({ onPress, inventories }) => {

    const [viewport, setViewport] = useState({
        latitude: 39.048198,
        longitude: -94.604604,
        zoom: 5
    });

    useEffect(() => {
        setTimeout(() => {
            try {

                if (inventories && Array.isArray(inventories) && inventories.length > 0) {

                    let allArr = [];
                    inventories.forEach(i => {

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

                    if (allArr.length > 1) {
                        const obj = new WebMercatorViewport(viewport);
                        const { longitude, latitude, zoom } =
                            obj.fitBounds(allArr, {
                                padding: 100, maxZoom: 10
                            });

                        setViewport({
                            ...viewport,
                            longitude,
                            latitude,
                            zoom,
                            transitionDuration: 2000,
                            transitionInterpolator: new FlyToInterpolator()
                        });
                    } else if (allArr.length === 1) {
                        setViewport({
                            ...viewport, zoom: 10,
                            longitude: allArr[0][0],
                            latitude: allArr[0][1],
                            transitionDuration: 2000,
                            transitionInterpolator: new FlyToInterpolator()
                        });
                    }

                }
            } catch (err) {
            }
        }, 1500);
    }, [inventories]);

    const goToSF = inventory => {
        try {
            onPress(inventory);
            if (inventory && inventory.crash_intersections &&
                Array.isArray(inventory.crash_intersections) &&
                inventory.crash_intersections.length > 0) {

                setViewport({
                    ...viewport, zoom: 10,
                    longitude: parseFloat(inventory.crash_intersections[0].LONGITUD),
                    latitude: parseFloat(inventory.crash_intersections[0].LATITUDE),
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator()
                });

            }
        } catch (err) {
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                getCursor={getCursor}
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

                <NavigationControl style={{
                    right: 10,
                    top: 10
                }} />
            </ReactMapGL>
        </div>
    );
}

export default MapView;