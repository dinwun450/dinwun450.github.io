let routeId = [];
let hoverIdBus = [];
let hoveredPolygonLine = null;

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false  
});

function busGeoJsonCreation() {
    var bus_route_call = new XMLHttpRequest();
    bus_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-actransit&limit=700&include_geometry=true")
    bus_route_call.onreadystatechange = function() {
        if (bus_route_call.readyState === 4 && bus_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(bus_route_call.responseText);
            var agency_bus = bus_route_outputs.routes[0].agency.agency_name;

            for (var b=0; b<bus_route_outputs.routes.length; b++) {
                var all_bus_lines_name_short = bus_route_outputs.routes[b].route_short_name;
                var all_bus_lines_name_long = bus_route_outputs.routes[b].route_long_name;
                var all_bus_lines_color = bus_route_outputs.routes[b].route_color; 
                var all_bus_lines_text_color = bus_route_outputs.routes[b].route_text_color;
                var geometry_bus = bus_route_outputs.routes[b].geometry;

                if (geometry_bus === null) {
                    console.log("nope.")
                }
                else {
                    geojson_routes.push({
                        'type': 'Feature',
                        'geometry': geometry_bus,
                        'properties': {
                            'color': `#${all_bus_lines_color}`,
                            'text_color': `#${all_bus_lines_text_color}`,
                            'route_short_name': all_bus_lines_name_short,
                            'route_long_name': all_bus_lines_name_long,
                            'label': agency_bus
                        }
                    })
                }
            }

            map.addSource('bus_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_routes
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'routes_bus',
                'type': 'line',
                'source': 'bus_routes',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 2,
                    'line-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        ['get', 'color'],
                        '#c0e7fc',
                    ], //['get', 'color']
                },
            });

            map.on('mouseenter', 'routes_bus', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['routes_bus']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'bus_routes', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'bus_routes', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'routes_bus', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'bus_routes', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    bus_route_call.send();
}
busGeoJsonCreation();

var bear_transit_routes = [];
function bearTransitMap() {
    var bear_transit_route_call = new XMLHttpRequest();
    bear_transit_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p3-beartransit&limit=700&include_geometry=true");
    bear_transit_route_call.onreadystatechange = function() {
        if (bear_transit_route_call.readyState === 4 && bear_transit_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(bear_transit_route_call.responseText);
            var agency_bus = bus_route_outputs.routes[0].agency.agency_name;

            for (var b=0; b<bus_route_outputs.routes.length; b++) {
                var all_bus_lines_name_short = bus_route_outputs.routes[b].route_short_name;
                var all_bus_lines_name_long = bus_route_outputs.routes[b].route_long_name;
                var all_bus_lines_color = bus_route_outputs.routes[b].route_color; 
                var all_bus_lines_text_color = bus_route_outputs.routes[b].route_text_color;
                var geometry_bus = bus_route_outputs.routes[b].geometry;

                if (geometry_bus === null) {
                    console.log("nope.")
                }
                else {
                    bear_transit_routes.push({
                        'type': 'Feature',
                        'geometry': geometry_bus,
                        'properties': {
                            'color': `#${all_bus_lines_color}`,
                            'text_color': `#${all_bus_lines_text_color}`,
                            'route_short_name': all_bus_lines_name_short,
                            'route_long_name': all_bus_lines_name_long,
                            'label': agency_bus
                        }
                    })
                }
            }

            map.addSource('bear_transit', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': bear_transit_routes
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'routes_bear_transit',
                'type': 'line',
                'source': 'bear_transit',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 2,
                    'line-color': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        ['get', 'color'],
                        '#c0e7fc',
                    ], //['get', 'color']
                },
            });

            map.on('mouseenter', 'routes_bear_transit', function(e) {
                var fs_2 = map.queryRenderedFeatures(e.point, { layers: ['routes_bear_transit']});
                console.log(fs_2)

                if (fs_2.length > 0) {
                    for (var f = 0; f < fs_2.length; f ++) {
                        var name_of_route = fs_2[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs_2[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'bear_transit', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'bear_transit', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'routes_bear_transit', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'bear_transit', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
}