function mapConfiguration() {
    document.getElementById("map").style.width = "100%";
    document.getElementById("map").style.height = "500px";

    const mapDiv = document.getElementById("map");
    if (mapDiv.style.visibility === false) {
        map.resize();
    };

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlud3VuNDUwIiwiYSI6ImNsaTR4c253bTAzNnIzcnF1aTh0eTN2a3kifQ.fjcqiGi68hyGpUAKAo9Tcw';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-157.858093, 21.315603],
        zoom: 5
    });

    map.on('load', function() {
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
    });
};

var hoveredPolygonLine = null;
var onestop_id = "";
var hibus_geojson_routes = [];
let routeId = [];
let hoverIdBus = [];

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeLinesInMap(m) {
    var hi_bus_agency = m;

    switch (hi_bus_agency) {
        case "thebus":
            onestop_id = "o-87z-thebus";
            break;
        case "hele_on":
            onestop_id = "o-hele~on~hi";
            break;
        case "maui_bus":
            onestop_id = "o-maui~county~transit";
            break;
        case "kauai_bus":
            onestop_id = "o-87yt-countyofkauai~transportationagency";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("hi_bus_route_layer")) {
                map.removeLayer("hi_bus_route_layer");
            }
            if (map.getSource("hi_bus_route_source")) {
                map.removeSource("hi_bus_route_source");
            }

            hibus_geojson_routes = [];
            routeId = [];
            hoverIdBus = [];
            hoveredPolygonLine = null;
            document.getElementById("range_of_routes").innerHTML = `
                <li id="rir"><span id="route_name_rad">-</span> <span id="route_detail_rad">Select a transit agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (hi_bus_agency === "prompt") {
        console.log("Reset!");
    }
    else {
        HIBusGeojsonCreation(onestop_id);
    }
}

function HIBusGeojsonCreation(onestop_id) {
    if (map.getLayer("hi_bus_route_layer")) {
        map.removeLayer("hi_bus_route_layer");
    }
    if (map.getSource("hi_bus_route_source")) {
        map.removeSource("hi_bus_route_source");
    }

    hibus_geojson_routes = [];
    routeId = [];
    hoverIdBus = [];
    hoveredPolygonLine = null;

    var hibus_route_caller = new XMLHttpRequest();
    hibus_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&include_geometry=true`, true);
    hibus_route_caller.onreadystatechange = function() {
        if (hibus_route_caller.readyState === 4 && hibus_route_caller.status === 200) {
            var hibus_route_receiver = JSON.parse(hibus_route_caller.responseText);
            var name_of_hibus_agency = hibus_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < hibus_route_receiver.routes.length; i++) {
                var route_short_name = hibus_route_receiver.routes[i].route_short_name;
                var route_long_name = hibus_route_receiver.routes[i].route_long_name;
                var route_color = hibus_route_receiver.routes[i].route_color;
                var route_text_color = hibus_route_receiver.routes[i].route_text_color;
                var route_id = hibus_route_receiver.routes[i].route_id;
                var hibus_route_geometry = hibus_route_receiver.routes[i].geometry;

                if (hibus_route_geometry === null) {
                    console.log("No geometry for this route.");
                }
                else {
                    hibus_geojson_routes.push({
                        'type': 'Feature',
                        'geometry': hibus_route_geometry,
                        'properties': {
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_color': route_color,
                            'route_text_color': route_text_color,
                            'route_id': route_id,
                            'hibus_agency': name_of_hibus_agency
                        }
                    })
                }
            }

            map.addSource("hi_bus_route_source", {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': hibus_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'hi_bus_route_layer',
                'source': 'hi_bus_route_source',
                'type': 'line',
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

            map.on('mouseenter', 'hi_bus_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['hi_bus_route_layer'] });

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);
                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                { source: 'hi_bus_route_source', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }

                        map.setFeatureState(
                            { source: 'hi_bus_route_source', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    };

                    popup.setLngLat(e.lngLat).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'hi_bus_route_layer', function() {
                if (routeId.length > 0) {
                    routeId = [];
                }
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i = 0; i < hoverIdBus.length; i++) {
                        map.setFeatureState(
                            { source: 'hi_bus_route_source', id: hoverIdBus[i] },
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    };
    hibus_route_caller.send();
};