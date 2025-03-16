let routeId = [];
let hoverIdTrain = [];
var miamitrains_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeMiamiTrainMap(e) {
    var miami_train_agency = e;

    switch (miami_train_agency) {
        case "trirail":
            onestop_id = "o-dhx-tri~rail";
            break;
        case "brightline":
            onestop_id = "o-dh-brightline";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("miamitrains_routes")) {
                map.removeLayer("miamitrains_routes");
            }
            if (map.getSource("miamitrains_route_source")) {
                map.removeSource("miamitrains_route_source");
            }
            miamitrains_geojson_routes = [];
            routeId = [];
            hoverIdTrain = [];
            hoveredPolygonLine = null;
            document.getElementById("range_of_routes").innerHTML = `
                <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Select a train agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (e === "prompt") {
        console.log("Reset!");
    }
    else {
        MiamiTrainGeoJsonCreation(onestop_id);
    }
}

function MiamiTrainGeoJsonCreation(insOneStopID) {
    if (map.getLayer("miamitrains_routes")) {
        map.removeLayer("miamitrains_routes");
    }
    if (map.getSource("miamitrains_route_source")) {
        map.removeSource("miamitrains_route_source");
    }
    miamitrains_geojson_routes = [];
    routeId = [];
    hoverIdTrain = [];
    hoveredPolygonLine = null;

    var miamitrains_route_caller = new XMLHttpRequest();
    miamitrains_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&route_type=2&limit=700&include_geometry=true`);
    miamitrains_route_caller.onreadystatechange = function() {
        if (miamitrains_route_caller.readyState === 4 && miamitrains_route_caller.status === 200) {
            var miamitrains_route_receiver = JSON.parse(miamitrains_route_caller.responseText);

            for (var i = 0; i < miamitrains_route_receiver.routes.length; i++) {
                var route_short_name = miamitrains_route_receiver.routes[i].route_short_name;
                var route_long_name = miamitrains_route_receiver.routes[i].route_long_name;
                var route_color = miamitrains_route_receiver.routes[i].route_color;
                var route_text_color = miamitrains_route_receiver.routes[i].route_text_color;
                var route_id = miamitrains_route_receiver.routes[i].route_id;
                var miamitrains_route_geometry = miamitrains_route_receiver.routes[i].geometry;

                if (miamitrains_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    miamitrains_geojson_routes.push({
                        "type": "Feature",
                        "properties": {
                            "route_short_name": route_short_name,
                            "route_long_name": route_long_name,
                            "route_color": `#${route_color}`,
                            "route_text_color": `#${route_text_color}`,
                            "route_id": route_id
                        },
                        "geometry": miamitrains_route_geometry
                    });
                }
            }

            map.addSource("miamitrains_route_source", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": miamitrains_geojson_routes
                },
                "generateId": true
            });

            map.addLayer({
                "id": "miamitrains_routes",
                "type": "line",
                "source": "miamitrains_route_source",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": ["get", "route_color"],
                    "line-width": 4
                }
            });

            map.on("mouseenter", "miamitrains_routes", function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['miamitrains_routes']});

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === undefined) {
                            var name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);

                        hoveredPolygonLine = fs[f].id;
                        hoverIdTrain.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState({source: 'miamitrains_route_source', id: hoveredPolygonLine}, {hover: true});
                        }
                    }

                    popup.setLngLat(e.lngLat).setHTML(routeId).addTo(map);
                }
            });

            map.on("mouseleave", "miamitrains_routes", function() {
                if (routeId.length > 0) {
                    routeId = [];
                }
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverIdTrain.length; i++) {
                        map.setFeatureState({source: 'miamitrains_route_source', id: hoverId[i]}, {hover: false});
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }

    miamitrains_route_caller.send();
}