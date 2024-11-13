let routeId = [];
let hoverId = [];
var seattleferries_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeSeattleFerryMap(e) {
    var seattle_ferry_agency = e;

    switch(seattle_ferry_agency) {
        case "wsf":
            onestop_id = "o-c28-washingtonstateferries";
            break;
        case "pierce":
            onestop_id = "o-c22u3-piercecountyferries";
            break;
        case "king":
            onestop_id = "o-c23-metrotransit";
            break;
        case "kitsap":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "vicclip":
            onestop_id = "o-c28-thevictoriaclipper";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("seattleferries_route_layer")) {
                map.removeLayer("seattleferries_route_layer");
            }
            if (map.getSource("seattleferries_route_source")) {
                map.removeSource("seattleferries_route_source");
            }
            seattleferries_geojson_routes = [];
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
        SeattleFerryGeoJsonCreation(onestop_id);
    }
}

function SeattleFerryGeoJsonCreation(insOneStopID) {
    if (map.getLayer("seattleferries_route_layer")) {
        map.removeLayer("seattleferries_route_layer");
    }
    if (map.getSource("seattleferries_route_source")) {
        map.removeSource("seattleferries_route_source");
    }
    seattleferries_geojson_routes = [];
    routeId = [];
    hoverId = [];
    hoveredPolygonLine = null;

    var seattle_ferry_route_caller = new XMLHttpRequest();
    seattle_ferry_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&route_type=4&include_geometry=true`);
    seattle_ferry_route_caller.onreadystatechange = function() {
        if (seattle_ferry_route_caller.readyState === 4 && seattle_ferry_route_caller.status === 200) {
            var seattle_ferry_route_receiver = JSON.parse(seattle_ferry_route_caller.responseText);
            var name_of_seattle_ferry_agency = seattle_ferry_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < seattle_ferry_route_receiver.routes.length; i++) {
                var route_short_name = seattle_ferry_route_receiver.routes[i].route_short_name;
                var route_long_name = seattle_ferry_route_receiver.routes[i].route_long_name;
                var route_color = seattle_ferry_route_receiver.routes[i].route_color;
                var route_text_color = seattle_ferry_route_receiver.routes[i].route_text_color;
                var route_id = seattle_ferry_route_receiver.routes[i].route_id;
                var seattle_ferry_route_geometry = seattle_ferry_route_receiver.routes[i].geometry;

                if (seattle_ferry_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    seattleferries_geojson_routes.push({
                        'type': 'Feature',
                        'geometry': seattle_ferry_route_geometry,
                        'properties': {
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_id': route_id,
                            'agency_name': name_of_seattle_ferry_agency
                        }
                    });
                }
            }
            console.log(seattleferries_geojson_routes);

            map.addSource("seattleferries_route_source", {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': seattleferries_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'seattleferries_route_layer',
                'type': 'line',
                'source': 'seattleferries_route_source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 3
                }
            });

            map.on('mouseenter', 'seattleferries_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['seattleferries_route_layer']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        console.log(name_of_route);
                        if (name_of_route === undefined) {
                            name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);

                        hoveredPolygonLine = fs[f].id;
                        hoverId.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'seattleferries_route_source', id: hoveredPolygonLine}, 
                                {hover: true}
                            );
                        }
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'seattleferries_route_layer', function() {
                if (routeId.length > 0) {routeId = []};
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i = 0; i < hoverId.length; i++) {
                        map.setFeatureState(
                            {source: 'seattleferries_route_source', id: hoverId[i]}, 
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }

    seattle_ferry_route_caller.send();
}