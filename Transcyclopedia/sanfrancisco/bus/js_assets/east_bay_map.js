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
    bear_transit_route_call.send();
}
setTimeout(bearTransitMap, 5000);

var county_connection = []
function CountyConnectionMap() {
    var cc_route_call = new XMLHttpRequest();
    cc_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-countyconnection&limit=700&include_geometry=true");
    cc_route_call.onreadystatechange = function() {
        if (cc_route_call.readyState === 4 && cc_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(cc_route_call.responseText);
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
                    county_connection.push({
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

            map.addSource('county_connection', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': county_connection
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'routes_cccta',
                'type': 'line',
                'source': 'county_connection',
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

            map.on('mouseenter', 'routes_cccta', function(e) {
                var fs_3 = map.queryRenderedFeatures(e.point, { layers: ['routes_cccta']});
                console.log(fs_3)

                if (fs_3.length > 0) {
                    for (var f = 0; f < fs_3.length; f ++) {
                        var name_of_route = fs_3[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs_3[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'county_connection', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'county_connection', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'routes_cccta', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'county_connection', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    cc_route_call.send();
}
CountyConnectionMap();

var db = []
function DBMap() {
    var db_route_call = new XMLHttpRequest();
    db_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-dumbartonexpress&limit=700&include_geometry=true");
    db_route_call.onreadystatechange = function() {
        if (db_route_call.readyState === 4 && db_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(db_route_call.responseText);
            var agency_bus = bus_route_outputs.routes[0].agency.agency_name;

            for (var b=0; b<bus_route_outputs.routes.length; b++) {
                var all_bus_lines_name_short = bus_route_outputs.routes[b].route_short_name;
                var all_bus_lines_name_long = bus_route_outputs.routes[b].route_long_name;
                var all_bus_lines_color = bus_route_outputs.routes[b].route_color; 
                var all_bus_lines_text_color = bus_route_outputs.routes[b].route_text_color;
                var geometry_bus = bus_route_outputs.routes[b].geometry;

                if (all_bus_lines_color === "") {
                    all_bus_lines_color = "000000";
                }

                if (geometry_bus === null) {
                    console.log("nope.")
                }
                else {
                    db.push({
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

            map.addSource('dumbarton_express', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': db
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'db_routes',
                'type': 'line',
                'source': 'dumbarton_express',
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

            map.on('mouseenter', 'db_routes', function(e) {
                var fs_4 = map.queryRenderedFeatures(e.point, { layers: ['db_routes']});
                console.log(fs_4)

                if (fs_4.length > 0) {
                    for (var f = 0; f < fs_4.length; f ++) {
                        var name_of_route = fs_4[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs_4[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'dumbarton_express', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'dumbarton_express', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'db_routes', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'dumbarton_express', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    db_route_call.send();
}
setTimeout(DBMap, 2000);

var tri_delta_transit = []
function TriDeltaMap() {
    var delta_route_call = new XMLHttpRequest();
    delta_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc2-trideltatransit&limit=700&include_geometry=true");
    delta_route_call.onreadystatechange = function() {
        if (delta_route_call.readyState === 4 && delta_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(delta_route_call.responseText);
            var agency_bus = bus_route_outputs.routes[0].agency.agency_name;

            for (var b=0; b<bus_route_outputs.routes.length; b++) {
                var all_bus_lines_name_short = bus_route_outputs.routes[b].route_short_name;
                var all_bus_lines_name_long = bus_route_outputs.routes[b].route_long_name;
                var all_bus_lines_color = bus_route_outputs.routes[b].route_color; 
                var all_bus_lines_text_color = bus_route_outputs.routes[b].route_text_color;
                var geometry_bus = bus_route_outputs.routes[b].geometry;

                if (all_bus_lines_color === "") {
                    all_bus_lines_color = "000000";
                }

                if (geometry_bus === null) {
                    console.log("nope.")
                }
                else {
                    tri_delta_transit.push({
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

            map.addSource('tri_delta', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': tri_delta_transit
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'delta_routes',
                'type': 'line',
                'source': 'tri_delta',
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

            map.on('mouseenter', 'delta_routes', function(e) {
                var fs_5 = map.queryRenderedFeatures(e.point, { layers: ['delta_routes']});
                console.log(fs_5)

                if (fs_5.length > 0) {
                    for (var f = 0; f < fs_5.length; f ++) {
                        var name_of_route = fs_5[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs_5[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'tri_delta', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'tri_delta', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'delta_routes', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'tri_delta', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    delta_route_call.send();
}
setTimeout(TriDeltaMap, 7000);

var uc_transit = [];
function UCMap() {
    var uc_route_call = new XMLHttpRequest();
    uc_route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9jy-unioncitytransit&limit=700&include_geometry=true");
    uc_route_call.onreadystatechange = function() {
        if (uc_route_call.readyState === 4 && uc_route_call.status === 200) {
            var bus_route_outputs = JSON.parse(uc_route_call.responseText);
            var agency_bus = bus_route_outputs.routes[0].agency.agency_name;

            for (var b=0; b<bus_route_outputs.routes.length; b++) {
                var all_bus_lines_name_short = bus_route_outputs.routes[b].route_short_name;
                var all_bus_lines_name_long = bus_route_outputs.routes[b].route_long_name;
                var all_bus_lines_color = bus_route_outputs.routes[b].route_color; 
                var all_bus_lines_text_color = bus_route_outputs.routes[b].route_text_color;
                var geometry_bus = bus_route_outputs.routes[b].geometry;

                if (all_bus_lines_color === "") {
                    all_bus_lines_color = "000000";
                }

                if (geometry_bus === null) {
                    console.log("nope.")
                }
                else {
                    uc_transit.push({
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

            map.addSource('union_city', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': uc_transit
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'union_city_routes',
                'type': 'line',
                'source': 'union_city',
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

            map.on('mouseenter', 'union_city_routes', function(e) {
                var fs_6 = map.queryRenderedFeatures(e.point, { layers: ['union_city_routes']});
                console.log(fs_6)

                if (fs_6.length > 0) {
                    for (var f = 0; f < fs_6.length; f ++) {
                        var name_of_route = fs_6[f].properties.route_short_name;
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs_6[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'union_city', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'union_city', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'union_city_routes', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'union_city', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    uc_route_call.send();
}
setTimeout(UCMap, 10000);