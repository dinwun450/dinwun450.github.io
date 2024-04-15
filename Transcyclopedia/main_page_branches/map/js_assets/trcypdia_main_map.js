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
            navigator.geolocation.getCurrentPosition(routeMapper);
            navigator.geolocation.getCurrentPosition(stopsLocator);
        } else {
            alert("Transcyclopedia wanted the location! Please enable it next time!")
        }
    }
    getLocation();

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
                            'text_color': `#${output_routes.routes[r].text_color}`,
                            'route_short_name': output_routes.routes[r].route_short_name,
                            'route_long_name': output_routes.routes[r].route_long_name,
                        }
                    })
                }
                console.log(fullGeoJsonRoutes)
            }
        }
        routes_nearby.send();
    }

    function stopsLocator(position) {
        var transitland_stops = new XMLHttpRequest();
        transitland_stops.open("GET", `https://transit.land/api/v2/rest/stops/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=450&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
        transitland_stops.onreadystatechange = function() {
            if (transitland_stops.readyState === 4 && transitland_stops.status === 200) {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZGlud3VuNDUwIiwiYSI6ImNsaTR4c253bTAzNnIzcnF1aTh0eTN2a3kifQ.fjcqiGi68hyGpUAKAo9Tcw';
                map = new mapboxgl.Map({
                    container: 'map', // container ID
                    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                    style: 'mapbox://styles/mapbox/streets-v12', // style URL
                    center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
                    zoom: 16 // starting zoom
                });

                map.addControl(new mapboxgl.NavigationControl());
                map.scrollZoom.disable();

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

                            map.addSource('route', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': fullGeoJsonRoutes
                                }
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
}