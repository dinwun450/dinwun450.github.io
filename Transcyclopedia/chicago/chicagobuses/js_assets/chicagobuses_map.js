let hoverId = [];
let hoverIdBus = [];
var chicagobuses_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeChicagoBusMap(e) {
    var chicago_bus_agency = e;

    switch (chicago_bus_agency) {
        case "cta":
            onestop_id = "o-dp3-chicagotransitauthority";
            break;
        case "pace":
            onestop_id = "o-dp3-pace";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("chicagobuses_routes")) {
                map.removeLayer("chicagobuses_routes");
            }
            if (map.getSource("chicagobuses_route_source")) {
                map.removeSource("chicagobuses_route_source");
            }
            chicagobuses_geojson_routes = [];
            hoverId = [];
            hoverIdBus = [];
            hoveredPolygonLine = null;
            document.getElementById("range_of_routes").innerHTML = `
                <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Select a bus agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (e === "prompt") {
        console.log("Reset!");
    }
    else {
        ChicagoBusGeoJsonCreation(onestop_id);
    }
}

function ChicagoBusGeoJsonCreation(insOneStopID) {
    if (map.getLayer("chicagobuses_routes")) {
        map.removeLayer("chicagobuses_routes");
    }
    if (map.getSource("chicagobuses_route_source")) {
        map.removeSource("chicagobuses_route_source");
    }
    chicagobuses_geojson_routes = [];
    routeId = [];
    hoverIdBus = [];
    hoveredPolygonLine = null;

    var chicagobuses_route_caller = new XMLHttpRequest();
    chicagobuses_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&route_type=3&include_geometry=true`);
    chicagobuses_route_caller.onreadystatechange = function() {
        if (chicagobuses_route_caller.readyState === 4 && chicagobuses_route_caller.status === 200) {
            var chicagobuses_route_receiver = JSON.parse(chicagobuses_route_caller.responseText);
            var name_of_chicagobuses_agency = chicagobuses_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < chicagobuses_route_receiver.routes.length; i++) {
                var route_short_name = chicagobuses_route_receiver.routes[i].route_short_name;
                var route_long_name = chicagobuses_route_receiver.routes[i].route_long_name;
                var route_color = chicagobuses_route_receiver.routes[i].route_color;
                var route_text_color = chicagobuses_route_receiver.routes[i].route_text_color;
                var route_id = chicagobuses_route_receiver.routes[i].route_id;
                var chicagobuses_route_geometry = chicagobuses_route_receiver.routes[i].geometry;

                if (chicagobuses_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    chicagobuses_geojson_routes.push({
                        "type": "Feature",
                        "properties": {
                            "route_short_name": route_short_name,
                            "route_long_name": route_long_name,
                            "route_color": `#${route_color}`,
                            "route_text_color": `#${route_text_color}`,
                            "route_id": route_id,
                            "agency_name": name_of_chicagobuses_agency
                        },
                        "geometry": chicagobuses_route_geometry
                    });
                }
            }

            map.addSource("chicagobuses_route_source", {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": chicagobuses_geojson_routes
                },
                "generateId": true
            });

            map.addLayer({
                "id": "chicagobuses_routes",
                "type": "line",
                "source": "chicagobuses_route_source",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    'line-width': 2,
                    'line-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        ['get', 'route_color'],
                        '#c0e7fc',
                    ],
                },
            });

            map.on("mousemove", "chicagobuses_routes", function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ["chicagobuses_routes"]});

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === undefined) {
                            name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);

                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState({source: "chicagobuses_route_source", id: hoveredPolygonLine}, {hover: false});
                        }

                        map.setFeatureState({source: "chicagobuses_route_source", id: hoveredPolygonLine}, {hover: true});
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on("mouseleave", "chicagobuses_routes", function() {
                if (routeId.length > 0) {routeId = [];}
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverIdBus.length; i++) {
                        map.setFeatureState({source: "chicagobuses_route_source", id: hoverIdBus[i]}, {hover: false});
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    chicagobuses_route_caller.send();
}