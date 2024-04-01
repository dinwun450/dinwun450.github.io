let routeId2 = [];
let hoverIdBus2 = [];
let hoveredPolygonLine2 = null;

const popup2 = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false  
});

commute_routes = [];
function CommuteOrgCreation() {
    var commute_call = new XMLHttpRequest();
    commute_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-commuteorgshuttles&limit=700&include_geometry=true");
    commute_call.onreadystatechange = function() {
        if (commute_call.readyState === 4 && commute_call.status === 200) {
            var bus_route_outputs = JSON.parse(commute_call.responseText);
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
                    commute_routes.push({
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

            map.addSource('commute_org_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': commute_routes
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'commute_org',
                'type': 'line',
                'source': 'commute_org_routes',
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

            map.on('mouseenter', 'commute_org', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['commute_org']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId2.push(name_of_route)
                        
                        hoveredPolygonLine2 = fs[f].id;
                        hoverIdBus2.push(hoveredPolygonLine2);

                        if (hoveredPolygonLine2 !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'commute_org_routes', id: hoveredPolygonLine2 },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'commute_org_routes', id: hoveredPolygonLine2 },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId2).addTo(map);
                }
            });

            map.on('mouseleave', 'commute_org', (e) => {
                if (routeId2.length > 0) {routeId2 = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine2 !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus2.length; i++) {
                        map.setFeatureState(
                            { source: 'commute_org_routes', id: hoverIdBus2[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine2 = null;
            });
        }
    }
    commute_call.send();
}
setTimeout(CommuteOrgCreation, 13000);

samroutes = [];
function SamTransCreation() {
    var sam_call = new XMLHttpRequest();
    sam_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8-samtrans&limit=700&include_geometry=true");
    sam_call.onreadystatechange = function() {
        if (sam_call.readyState === 4 && sam_call.status === 200) {
            var bus_route_outputs = JSON.parse(sam_call.responseText);
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
                    samroutes.push({
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

            map.addSource('samtrans_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': samroutes
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'samtrans',
                'type': 'line',
                'source': 'samtrans_routes',
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

            map.on('mouseenter', 'samtrans', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['samtrans']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId2.push(name_of_route)
                        
                        hoveredPolygonLine2 = fs[f].id;
                        hoverIdBus2.push(hoveredPolygonLine2);

                        if (hoveredPolygonLine2 !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'samtrans_routes', id: hoveredPolygonLine2 },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'samtrans_routes', id: hoveredPolygonLine2 },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId2).addTo(map);
                }
            });

            map.on('mouseleave', 'samtrans', (e) => {
                if (routeId2.length > 0) {routeId2 = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine2 !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus2.length; i++) {
                        map.setFeatureState(
                            { source: 'samtrans_routes', id: hoverIdBus2[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine2 = null;
            });
        }
    }
    sam_call.send();
}
setTimeout(SamTransCreation, 14000);