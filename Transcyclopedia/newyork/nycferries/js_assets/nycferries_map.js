let routeId = [];
let hoverId = [];
var nycferries_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeNYCFerryMap(e) {
    var nyc_ferry_agency = e;

    switch(nyc_ferry_agency) {
        case "nycferry":
            onestop_id = "o-dr5r-nycferry";
            break;
        case "statenislandferry":
            onestop_id = "o-dr5r7-nycdot";
            break;
        case "nywaterway":
            onestop_id = "o-dr7-nywaterway";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("nycferries_route_layer")) {
                map.removeLayer("nycferries_route_layer");
            }
            if (map.getSource("nycferries_route_source")) {
                map.removeSource("nycferries_route_source");
            }
            nycferries_geojson_routes = [];
            routeId = [];
            hoverId = [];
            hoveredPolygonLine = null;
            document.getElementById("range_of_routes").innerHTML = `
                <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Select a ferry agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (e === "prompt") {
        console.log("Reset!");
    }
    else {
        NYCFerryGeoJsonCreation(onestop_id);
    }
}

function NYCFerryGeoJsonCreation(insOneStopID) {
    if (map.getLayer("nycferries_route_layer")) {
        map.removeLayer("nycferries_route_layer");
    }
    if (map.getSource("nycferries_route_source")) {
        map.removeSource("nycferries_route_source");
    }
    nycferries_geojson_routes = [];
    routeId = [];
    hoverId = [];
    hoveredPolygonLine = null;

    var nyc_ferry_route_caller = new XMLHttpRequest();
    nyc_ferry_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&include_geometry=true`);
    nyc_ferry_route_caller.onreadystatechange = function() {
        if (nyc_ferry_route_caller.readyState === 4 && nyc_ferry_route_caller.status === 200) {
            var nyc_ferry_route_receiver = JSON.parse(nyc_ferry_route_caller.responseText);

            for (var i = 0; i < nyc_ferry_route_receiver.routes.length; i++) {
                var route_short_name = nyc_ferry_route_receiver.routes[i].route_short_name;
                var route_long_name = nyc_ferry_route_receiver.routes[i].route_long_name;
                var route_color = nyc_ferry_route_receiver.routes[i].route_color;
                var route_text_color = nyc_ferry_route_receiver.routes[i].route_text_color;
                var route_id = nyc_ferry_route_receiver.routes[i].route_id;
                var nyc_ferry_route_geometry = nyc_ferry_route_receiver.routes[i].geometry;

                if (nyc_ferry_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    nycferries_geojson_routes.push({
                        "type": "Feature",
                        "properties": {
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_id': route_id,
                        },
                        "geometry": nyc_ferry_route_geometry
                    });
                }
            }

            map.addSource("nycferries_route_source", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": nycferries_geojson_routes
                },
                "generateId": true
            });

            map.addLayer({
                "id": "nycferries_route_layer",
                "type": "line",
                "source": "nycferries_route_source",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": ["get", "route_color"],
                    "line-width": 3
                }
            });

            map.on("mouseenter", 'nycferries_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['nycferries_route_layer']});

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === undefined) {
                            name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);

                        hoveredPolygonLine = fs[f].id;
                        hoverId.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'nycferries_route_source', id: hoveredPolygonLine},
                                {hover: true}
                            );
                        }
                    }

                    popup.setLngLat(e.lngLat).setHTML(routeId).addTo(map);
                }
            });

            map.on("mouseleave", 'nycferries_route_layer', function() {
                if (routeId.length > 0) {
                    routeId = [];
                }
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverId.length; i++) {
                        map.setFeatureState(
                            {source: 'nycferries_route_source', id: hoverId[i]},
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }

    nyc_ferry_route_caller.send();
}