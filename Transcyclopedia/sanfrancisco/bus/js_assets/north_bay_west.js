ggt = [];
function GoldenGateCreation() {
    var ggt_call = new XMLHttpRequest();
    ggt_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-goldengatetransit&limit=700&include_geometry=true");
    ggt_call.onreadystatechange = function() {
        if (ggt_call.readyState === 4 && ggt_call.status === 200) {
            var bus_route_outputs = JSON.parse(ggt_call.responseText);
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
                    ggt.push({
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

            map.addSource('ggt_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': ggt
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'golden_gate_transit',
                'type': 'line',
                'source': 'ggt_routes',
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

            map.on('mouseenter', 'golden_gate_transit', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['golden_gate_transit']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === "") {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'ggt_routes', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'ggt_routes', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'golden_gate_transit', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'ggt_routes', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    ggt_call.send();
}
setTimeout(GoldenGateCreation, 16000);

marin = [];
function MarinTransitCreation() {
    var marin_call = new XMLHttpRequest();
    marin_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbb-marintransit&limit=700&include_geometry=true");
    marin_call.onreadystatechange = function() {
        if (marin_call.readyState === 4 && marin_call.status === 200) {
            var bus_route_outputs = JSON.parse(marin_call.responseText);
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
                    marin.push({
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

            map.addSource('marin_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': marin
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'marin_transit',
                'type': 'line',
                'source': 'marin_routes',
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

            map.on('mouseenter', 'marin_transit', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['marin_transit']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === "") {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'marin_routes', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'marin_routes', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'marin_transit', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'marin_routes', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    marin_call.send();
}
setTimeout(MarinTransitCreation, 17000);

sct = [];
function SonomaTransitCreation() {
    var sonoma_call = new XMLHttpRequest();
    sonoma_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-sonomacountytransit&limit=700&include_geometry=true");
    sonoma_call.onreadystatechange = function() {
        if (sonoma_call.readyState === 4 && sonoma_call.status === 200) {
            var bus_route_outputs = JSON.parse(sonoma_call.responseText);
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
                    sct.push({
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

            map.addSource('sonoma_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': sct
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'sonoma_county_transit',
                'type': 'line',
                'source': 'sonoma_routes',
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

            map.on('mouseenter', 'sonoma_county_transit', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['sonoma_county_transit']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === "") {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'sonoma_routes', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'sonoma_routes', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'sonoma_county_transit', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'sonoma_routes', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    sonoma_call.send();
}
setTimeout(SonomaTransitCreation, 18000);

petaluma = [];
function PetalumaTransitCreation() {
    var petaluma_call = new XMLHttpRequest();
    petaluma_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbc9-petalumatransit&limit=700&include_geometry=true");
    petaluma_call.onreadystatechange = function() {
        if (petaluma_call.readyState === 4 && petaluma_call.status === 200) {
            var bus_route_outputs = JSON.parse(petaluma_call.responseText);
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
                    petaluma.push({
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

            map.addSource('petaluma_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': petaluma
                },
                'generateId': true
            });
            console.log("loaded!")

            map.addLayer({
                'id': 'petaluma_transit',
                'type': 'line',
                'source': 'petaluma_routes',
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

            map.on('mouseenter', 'petaluma_transit', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['petaluma_transit']});
                console.log(fs)

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f ++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === "") {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeId.push(name_of_route)
                        
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            console.log("hello!")
                            map.setFeatureState(
                                { source: 'petaluma_routes', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }
                        map.setFeatureState(
                            { source: 'petaluma_routes', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }
                    
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup2.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'petaluma_transit', (e) => {
                if (routeId.length > 0) {routeId = []}
                popup2.remove();
                // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;

                if (hoveredPolygonLine !== null) {
                    console.log("Fix!")
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'petaluma_routes', id: hoverIdBus[i]},
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    petaluma_call.send();
}
setTimeout(PetalumaTransitCreation, 19000);