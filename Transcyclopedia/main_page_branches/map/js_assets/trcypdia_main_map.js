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
            navigator.geolocation.getCurrentPosition(stopsLocator);
            navigator.geolocation.getCurrentPosition(routePlotter);
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
            style: 'mapbox://styles/mapbox/light-v11', // style URL
            center: centerPos, // starting position [lng, lat]
            zoom: 16 // starting zoom
        });

        map.addControl(new mapboxgl.NavigationControl());
        map.scrollZoom.disable();

        map.on('style.load', () => {
            // Insert the layer beneath any symbol layer.
            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout['text-field']
            ).id;
            
            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.addLayer({
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                        'fill-extrusion-color': '#aaa',
                        
                        // Use an 'interpolate' expression to
                        // add a smooth transition effect to
                        // the buildings as the user zooms in.
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        });
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
                setTimeout(plotStops, 4000);
            }
        }
        transitland_stops.send();
    }

    function plotStops() {
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
                    },
                    'filter': ['==', '$type', 'Point']
                });

                console.log("Loaded for the stops!")
            }
        )
    };

    function getUniqueFeatures(features, comparatorProperty) {
        const unique_ids = new Set();
        const unique_features = [];
    
        for (const feature of features) {
            const id = feature.properties[comparatorProperty];
            
            if (!unique_ids.has(id)) {
                unique_ids.add(id);
                unique_features.push(feature);
            }
        }
    
        return unique_features;
    }

    function routePlotter(position) {
        var transitland_routes = new XMLHttpRequest();
        transitland_routes.open("GET", `https://transit.land/api/v2/rest/routes/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=450&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_geometry=true`);
        transitland_routes.onreadystatechange = function() {
            if (transitland_routes.readyState === 4 && transitland_routes.status === 200) {
                var compiledRoutes = JSON.parse(transitland_routes.responseText);
                for (var i = 0; i < compiledRoutes.routes.length; i++) {
                    var route_short_name = compiledRoutes.routes[i].route_short_name;
                    var route_long_name = compiledRoutes.routes[i].route_long_name;
                    var route_color = compiledRoutes.routes[i].route_color;
                    var route_text_color = compiledRoutes.routes[i].route_text_color;
                    var route_geometry = compiledRoutes.routes[i].geometry;
                    var route_id = compiledRoutes.routes[i].route_id;
                    var route_type = compiledRoutes.routes[i].route_type;

                    fullGeoJsonRoutes.push({
                        'type': 'Feature',
                        'geometry': route_geometry,
                        'properties': {
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_id': route_id,
                            'route_type': route_type
                        }
                    });
                }
                setTimeout(plotRoutes, 2000);
            }
        }
        transitland_routes.send();
    }

    function plotRoutes() {
        map.addSource('routes_source', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': fullGeoJsonRoutes
            },
            'generateId': true
        });

        map.addLayer({
            'id': 'routes',
            'type': 'line',
            'source': 'routes_source',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': ['get', 'route_color'],
                'line-width': 3
            }
        });

        map.moveLayer('routes');

        map.on('movestart', () => {
            map.setFilter('routes', ['has', 'route_id']);

            document.getElementById('range_of_routes').innerHTML = `
                <li class="route_radius"><span id="route_short">-</span>&nbsp;&nbsp;<span id="detailed_route">Loading...</span></li>
            `;
        });

        map.on('moveend', () => {
            const features = map.queryRenderedFeatures({layers: ['routes']});

            if (features) {
                const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                for (var f = 0; f < uniqueFeatures.length; f++) {
                    var name_of_route = uniqueFeatures[f].properties.route_short_name;
                    var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                    var color_of_route = uniqueFeatures[f].properties.route_color;
                    var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                    if (name_of_route === null) {
                        document.getElementById("route_short").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                    } else {
                        document.getElementById("route_short").innerHTML = name_of_route;
                    }

                    document.getElementById("route_short").style.backgroundColor = `${color_of_route}40`;
                    document.getElementById("route_short").style.color = `${text_color_of_route}`;
                    document.getElementById("route_short").style.border = `1px solid ${color_of_route}`;
                    document.getElementById("detailed_route").innerHTML = desc_of_route;

                    var each_route_entity = document.querySelector(".route_radius").cloneNode(true);
                    document.getElementById("range_of_routes").appendChild(each_route_entity);
                };

                var all_routes = document.getElementById("range_of_routes").children;
                document.getElementById("range_of_routes").removeChild(all_routes[0]);
            }
        });

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'routes', (e) => {
            var fs = map.queryRenderedFeatures(e.point, {layers: ['routes']});

            if (fs.length > 0) {
                for (var f = 0; f < fs.length; f++) {
                    var name_of_route = fs[f].properties.route_short_name;
                    if (name_of_route === null) {
                        name_of_route = "&nbsp;&nbsp;&nbsp;";
                    }
                    routeId.push(name_of_route);
                }
                popup.setLngLat(e.lngLat).setHTML(routeId).addTo(map);
            }
        });

        map.on('mouseleave', 'routes', () => {
            if (routeId.length > 0) {
                routeId = [];
            }
            popup.remove();
        });
    }
}