let routeId = [];
let hoverIdTrain = [];
var nyctrains_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";
var icon_or_not = null;
var img_icon = "";
var counter = 0;

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeNYCTrainMap(e) {
    var nyc_train_agency = e;
    nyctrains_geojson_routes = [];
    counter = 0;

    switch (nyc_train_agency) {
        case "mtasir":
            onestop_id = "o-dr5r-nyct";
            img_icon = `<img src="img_assets/mta_sir.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "mtallrr":
            onestop_id = "o-dr5-longislandrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "mtametronorth":
            onestop_id = "o-dr7-metro~northrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "path":
            onestop_id = "o-dr5r-path";
            img_icon = `<img src="img_assets/path.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "njtransitrail":
            onestop_id = "o-dr5-nj~transit";
            img_icon = "";
            icon_or_not = false;
            break;
        default:
            onestop_id = "";
            img_icon = "";
            var icon_or_not = null;
            nyctrains_geojson_routes = [];
            routeId = [];
            hoverIdTrain = [];
            hoveredPolygonLine = null;

            if (map.getLayer("nyctrains_routes")) {
                map.removeLayer("nyctrains_routes");
            }
            if (map.getSource("nyctrains_route_source")) {
                map.removeSource("nyctrains_route_source");
            }

            document.getElementById("range_of_routes").innerHTML = `
                <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Select a train agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (e === "prompt") {
        console.log("Reset!");
    }
    else {
        NYCTrainGeoJsonCreation(onestop_id);
    }

    console.log(img_icon, icon_or_not);
    return [img_icon, icon_or_not];
}

function getUniqueFeatures(features, comparatorProperty) {
    const uniqueIds = new Set();
    const uniqueFeatures = [];
    for (const feature of features) {
        const id = feature.properties[comparatorProperty];
        if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
        }
    }
    return uniqueFeatures;
}

function NYCTrainGeoJsonCreation(insOneStopID) {
    if (map.getLayer("nyctrains_routes")) {
        map.removeLayer("nyctrains_routes");
    }
    if (map.getSource("nyctrains_route_source")) {
        map.removeSource("nyctrains_route_source");
    }

    let routeId = [];
    let hoverIdTrain = [];
    var nyctrains_geojson_routes = [];
    var hoveredPolygonLine = null;

    var nyc_train_caller = new XMLHttpRequest();
    nyc_train_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&route_type=2&include_geometry=true`);
    nyc_train_caller.onreadystatechange = function() {
        if (nyc_train_caller.readyState === 4 && nyc_train_caller.status === 200) {
            var nyc_train_receiver = JSON.parse(nyc_train_caller.responseText);

            for (var i = 0; i < nyc_train_receiver.routes.length; i++) {
                var route_short_name = nyc_train_receiver.routes[i].route_short_name;
                var route_long_name = nyc_train_receiver.routes[i].route_long_name;
                var route_color = nyc_train_receiver.routes[i].route_color;
                var route_text_color = nyc_train_receiver.routes[i].route_text_color;
                var route_id = nyc_train_receiver.routes[i].route_id;
                var nyc_train_route_geometry = nyc_train_receiver.routes[i].geometry;

                if (nyc_train_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    nyctrains_geojson_routes.push({
                        "type": "Feature",
                        "properties": {
                            "route_id": route_id,
                            "route_short_name": route_short_name,
                            "route_long_name": route_long_name,
                            "route_color": `#${route_color}`,
                            "route_text_color": `#${route_text_color}`
                        },
                        "geometry": nyc_train_route_geometry
                    });
                }
            }

            map.addSource("nyctrains_route_source", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": nyctrains_geojson_routes
                },
                "generateId": true
            });

            map.addLayer({
                'id': 'nyctrains_routes',
                'type': 'line',
                'source': 'nyctrains_route_source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 3
                }
            });

            map.on('mouseenter', 'nyctrains_routes', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {
                    layers: ['nyctrains_routes']
                });

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === undefined) {
                            name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        hoverIdTrain.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                { source: 'nyctrains_route_source', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }

                        map.setFeatureState(
                            { source: 'nyctrains_route_source', id: fs[f].id },
                            { hover: true }
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'nyctrains_routes', function() {
                if (routeId.length > 0) {routeId = []};
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i = 0; i < hoverIdTrain.length; i++) {
                        map.setFeatureState(
                            {source: 'nyctrains_route_source', id: hoverIdTrain[i]},
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    nyc_train_caller.send();
}
