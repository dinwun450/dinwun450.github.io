window.onload = function() {
    var fullGeoJson = [];
    var fullGeoJsonRoutes = [];
    let routeId = [];
    let hoverId = [];
    let hoveredPolygonLine = null;

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false  
    });

    function getCopyrightYear() {
        var date = new Date();
        var getYearNo = date.getFullYear();
        document.querySelector(".copyright").innerHTML = `&copy; ${getYearNo} Transcyclopedia. Created by Dino Wun.`;
    }
    getCopyrightYear();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(mapConfig);
            navigator.geolocation.getCurrentPosition(routeMapper);
            navigator.geolocation.getCurrentPosition(stopsLocator);
        } else {
            alert("Transcyclopedia wanted the location! Please enable it next time!")
        }
    }
    setTimeout(getLocation, 2000);

    function mapConfig(position) {
        var centerPos = [position.coords.longitude, position.coords.latitude];
        console.log(centerPos);
        
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGlud3VuNDUwIiwiYSI6ImNsaTR4c253bTAzNnIzcnF1aTh0eTN2a3kifQ.fjcqiGi68hyGpUAKAo9Tcw';
        map = new mapboxgl.Map({
            container: 'map', // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: centerPos, // starting position [lng, lat]
            zoom: 16 // starting zoom
        });

        map.addControl(new mapboxgl.NavigationControl());
        map.scrollZoom.disable();
    }

    function routeMapper(position) {
        var routes_nearby = new XMLHttpRequest();
        routes_nearby.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=500&include_geometry=true`);
        routes_nearby.onreadystatechange = function() {
            if (routes_nearby.readyState === 4 && routes_nearby.status === 200) {
                var output_routes = JSON.parse(routes_nearby.responseText);
                console.log(output_routes);

                for (var r=0; r<output_routes.routes.length; r++) {
                    fullGeoJsonRoutes.push({
                        'type': 'Feature', 
                        'geometry': output_routes.routes[r].geometry, 
                        'properties': {
                            "color": `#${output_routes.routes[r].route_color}`,
                            'text_color': `#${output_routes.routes[r].route_text_color}`,
                            'route_short_name': output_routes.routes[r].route_short_name,
                            'route_long_name': output_routes.routes[r].route_long_name,
                        }
                    })
                }
                console.log(fullGeoJsonRoutes);
            }

            if (fullGeoJsonRoutes.length === output_routes.routes.length) {
                map.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': fullGeoJsonRoutes
                    },
                    'generateId': true
                });
        
                map.addLayer({
                    'id': 'routes_nearby',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 4,
                        'line-color': ['get', 'color']
                    }
                });
        
                map.on('mouseenter', 'routes_nearby', function(e) {
                    var fs = map.queryRenderedFeatures(e.point, { layers: ['routes_nearby']});
                    console.log(fs)
        
                    if (fs.length > 0) {
                        for (var f = 0; f < fs.length; f ++) {
                            var name_of_route = fs[f].properties.route_short_name;
                            routeId.push(name_of_route)
                            
                            hoveredPolygonLine = fs[f].id;
                            hoverId.push(hoveredPolygonLine);
        
                            if (hoveredPolygonLine !== null) {
                                console.log("hello!")
                                map.setFeatureState(
                                    { source: 'route', id: hoveredPolygonLine },
                                    { hover: false }
                                );
                            }
                            map.setFeatureState(
                                { source: 'route', id: hoveredPolygonLine },
                                { hover: true }
                            );
                        }
                        
                        // Populate the popup and set its coordinates
                        // based on the feature found.
                        popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                    }
                });
        
                map.on('mouseleave', 'routes_nearby', (e) => {
                    if (routeId.length > 0) {routeId = []}
                    popup.remove();
                    // document.getElementById("range_of_routes").innerHTML = `<li class="route_radius"><span id="route_short">-</span> <span id="detailed_route">Loading...</span></li>`;
        
                    if (hoveredPolygonLine !== null) {
                        console.log("Fix!")
                        for (var i = 0; i < hoverId.length; i++) {
                            map.setFeatureState(
                                { source: 'route', id: hoverId[i]},
                                { hover: false }
                            );
                        }
                    }
                    hoveredPolygonLine = null;
                });
            }
        }
        routes_nearby.send();
    }

    function stopsLocator(position) {
        var transitland_stops = new XMLHttpRequest();
        transitland_stops.open("GET", `https://transit.land/api/v2/rest/stops/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=450&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
        transitland_stops.onreadystatechange = function() {
            if (transitland_stops.readyState === 4 && transitland_stops.status === 200) {
                const marker1 = new mapboxgl.Marker()
                    .setLngLat([position.coords.longitude, position.coords.latitude])
                    .addTo(map);

                var compiledStops = JSON.parse(transitland_stops.responseText);
                console.log(compiledStops);

                for (var j=0; j<compiledStops.stops.length; j++) {
                    console.log(compiledStops.stops[j].geometry);
                    fullGeoJson.push({'type': 'Feature', 'geometry': compiledStops.stops[j].geometry, 'properties': {'title': compiledStops.stops[j].stop_name}})
                }

                console.log(fullGeoJson);
                map.on('load', () => {
                    map.loadImage(
                        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                        (error, image) => {
                            if (error) throw error;
                            map.addImage('custom-marker', image);
                            map.addSource('points', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': fullGeoJson
                                }
                            });

                            map.addLayer({
                                'id': 'points',
                                'type': 'symbol',
                                'source': 'points',
                                'layout': {
                                    'icon-image': 'custom-marker',
                                    // get the title name from the source's "title" property
                                    'text-field': ['get', 'title'],
                                    'text-font': [
                                        'Open Sans Semibold',
                                        'Arial Unicode MS Bold'
                                    ],
                                    'text-offset': [0, 1.25],
                                    'text-anchor': 'top'
                                }
                            });
                        }
                    )
                })
            }
        }
        transitland_stops.send();
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

    // function moveMap() {
    //     map.moveLayer('routes_nearby');
    //     map.on('movestart', () => {
    //         map.setFilter('routes_nearby', ['has', 'route_short_name']);
    //         const features = map.queryRenderedFeatures({
    //             layers: ['routes_nearby']
    //         });

    //         if (features) {
    //             const uniqueFeatures = getUniqueFeatures(features, 'route_short_name');
    //             for (var f = 0; f < uniqueFeatures.length; f ++) {
    //                 var name_of_route = uniqueFeatures[f].properties.route_short_name;
    //                 var color_of_route = uniqueFeatures[f].properties.color;
    //                 var text_color_of_route = uniqueFeatures[f].properties.text_color;
    //                 var desc_of_route = uniqueFeatures[f].properties.route_long_name;

    //                 if (name_of_route === "") {
    //                     name_of_route = "&nbsp;&nbsp;&nbsp;"
    //                 }

    //                 if (color_of_route === "#") {
    //                     color_of_route = "#000000";
    //                 }

    //                 if (text_color_of_route === "#") {
    //                     text_color_of_route = "#ffffff";
    //                 }

    //                 document.getElementById("route_short").innerHTML = `${name_of_route}`;
    //                 document.getElementById("route_short").style.color = `${text_color_of_route}`;
    //                 document.getElementById("route_short").style.backgroundColor = `${color_of_route}40`;
    //                 document.getElementById("route_short").style.border = `1px solid ${color_of_route}40`;
    //                 document.getElementById("detailed_route").innerHTML = `${desc_of_route}`;

    //                 var routeClone = document.querySelector(".route_radius");
    //                 var listToInsertClone = routeClone.cloneNode(true);
    //                 document.getElementById("range_of_routes").appendChild(listToInsertClone);
    //             }

    //             var all_routes_nearby = document.getElementById("range_of_routes").children;
    //             document.getElementById("range_of_routes").removeChild(all_routes_nearby[0])
    //         }
    //     })
    // }
    // setTimeout(moveMap, 10000);
}