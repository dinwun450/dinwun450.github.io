let routeId = [];
let hoverIdBus = [];
var seattlebuses_geojson_routes = [];
var hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeSeattleBusMap(e) {
    var seattle_bus_agency = e;

    switch (seattle_bus_agency) {
        case "king_county_metro":
            onestop_id = "o-c23-metrotransit";
            break;
        case "pierce_transit":
            onestop_id = "o-c22u-piercetransit";
            break;
        case "kitsap_transit":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "community_transit":
            onestop_id = "o-c29-communitytransit";
            break;
        case "everett_transit":
            onestop_id = "o-c290-everetttransit";
            break;
        case "solid_ground":
            onestop_id = "o-c23nb-solidground";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("seattlebuses_routes")) {
                map.removeLayer("seattlebuses_routes");
            }
            if (map.getSource("seattlebuses_route_source")) {
                map.removeSource("seattlebuses_route_source");
            }
            seattlebuses_geojson_routes = [];
            routeId = [];
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
        SeattleBusGeoJsonCreation(onestop_id);
    }
}

function SeattleBusGeoJsonCreation(insOneStopID) {
    if (map.getLayer("seattlebuses_routes")) {
        map.removeLayer("seattlebuses_routes");
    }
    if (map.getSource("seattlebuses_route_source")) {
        map.removeSource("seattlebuses_route_source");
    }
    seattlebuses_geojson_routes = [];
    routeId = [];
    hoverIdBus = [];
    hoveredPolygonLine = null;

    var seattlebuses_route_caller = new XMLHttpRequest();
    seattlebuses_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&route_type=3&include_geometry=true`);
    seattlebuses_route_caller.onreadystatechange = function() {
        if (seattlebuses_route_caller.readyState === 4 && seattlebuses_route_caller.status === 200) {
            var seattlebuses_route_receiver = JSON.parse(seattlebuses_route_caller.responseText);
            var name_of_seattlebuses_agency = seattlebuses_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < seattlebuses_route_receiver.routes.length; i++) {
                var route_short_name = seattlebuses_route_receiver.routes[i].route_short_name;
                var route_long_name = seattlebuses_route_receiver.routes[i].route_long_name;
                var route_color = seattlebuses_route_receiver.routes[i].route_color;
                var route_text_color = seattlebuses_route_receiver.routes[i].route_text_color;
                var route_id = seattlebuses_route_receiver.routes[i].route_id;
                var seattlebuses_route_geometry = seattlebuses_route_receiver.routes[i].geometry;

                if (seattlebuses_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    seattlebuses_geojson_routes.push({
                        'type': 'Feature',
                        'geometry': seattlebuses_route_geometry,
                        'properties': {
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_id': route_id,
                            'agency_name': name_of_seattlebuses_agency
                        }
                    });
                }
            }

            map.addSource("seattlebuses_route_source", {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': seattlebuses_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'seattlebuses_routes',
                'type': 'line',
                'source': 'seattlebuses_route_source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 2,
                    'line-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        ['get', 'route_color'],
                        '#c0e7fc',
                    ],
                },
            });

            map.on('mouseenter', 'seattlebuses_routes', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['seattlebuses_routes']});

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
                            map.setFeatureState(
                                {source: 'seattlebuses_route_source', id: hoveredPolygonLine},
                                {hover: false}
                            );
                        }

                        map.setFeatureState(
                            {source: 'seattlebuses_route_source', id: hoveredPolygonLine},
                            {hover: true}
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'seattlebuses_routes', function() {
                if (routeId.length > 0) {routeId = []}
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverIdBus.length; i++) {
                        map.setFeatureState(
                            {source: 'seattlebuses_route_source', id: hoverIdBus[i]},
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    seattlebuses_route_caller.send();
}