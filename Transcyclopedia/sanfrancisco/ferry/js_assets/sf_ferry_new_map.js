let routeId = [];
let hoverId = [];
var ferry_geojson_routes = [];
var hoveredPolygonLine = null;
var onestopId = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeFerryLinesInMap(id) {
    var ferry_agency = id;

    switch (ferry_agency) {
        case "sfbayferry":
            onestopId = "o-9q9p-sanfranciscobayferry";
            break;
        case "ggf":
            onestopId = "o-9q8z-goldengateferry";
            break;
        default:
            routeId = [];
            hoverId = [];
            ferry_geojson_routes = [];
            hoveredPolygonLine = null;
            onestopId = "";

            if (map.getLayer("sf_ferry_route_layer")) {
                map.removeLayer("sf_ferry_route_layer");
            }
            if (map.getSource("sf_ferry_route")) {
                map.removeSource("sf_ferry_route");
            }
            document.getElementById("range_of_routes").innerHTML = `
                <li class="route_radius"><span id="route_short">-</span>&nbsp;&nbsp;<span id="detailed_route">Drag the map to filter nearby routes</span></li>
            `;
            break;
    }

    if (id !== "prompt") {
        SFFerryGeoJSONCreation(onestopId);
    }
}

function SFFerryGeoJSONCreation(insId) {
    if (map.getLayer("sf_ferry_route_layer")) {
        map.removeLayer("sf_ferry_route_layer");
    }
    if (map.getSource("sf_ferry_route")) {
        map.removeSource("sf_ferry_route");
    }
    ferry_geojson_routes = [];
    routeId = [];
    hoverId = [];
    hoveredPolygonLine = null;

    var sfferry_route_caller = new XMLHttpRequest();
    sfferry_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insId}&include_geometry=true`);
    sfferry_route_caller.onreadystatechange = function() {
        if (sfferry_route_caller.readyState === 4 && sfferry_route_caller.status === 200) {
            var sfferry_route_receiver = JSON.parse(sfferry_route_caller.responseText);

            for (var i=0; i<sfferry_route_receiver.routes.length; i++) {
                var route_short_name = sfferry_route_receiver.routes[i].route_short_name;
                var route_long_name = sfferry_route_receiver.routes[i].route_long_name;
                var route_color = sfferry_route_receiver.routes[i].route_color;
                var route_text_color = sfferry_route_receiver.routes[i].route_text_color;
                var route_geometry = sfferry_route_receiver.routes[i].geometry;

                ferry_geojson_routes.push({
                    'type': 'Feature',
                    'geometry': route_geometry,
                    'properties': {
                        'route_short_name': route_short_name,
                        'route_long_name': route_long_name,
                        'route_color': `#${route_color}`,
                        'route_text_color': `#${route_text_color}`
                    }
                });
            }

            map.addSource("sf_ferry_route", {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': ferry_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'sf_ferry_route_layer',
                'type': 'line',
                'source': 'sf_ferry_route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 3,
                    'line-color': ['get', 'route_color']
                },
            });

            map.on('mouseenter', 'sf_ferry_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['sf_ferry_route_layer']});

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);
                        hoveredPolygonLine = fs[f].id;
                        hoverId.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'sf_ferry_route', id: hoveredPolygonLine}, 
                                {hover: false}
                            );
                        }

                        map.setFeatureState(
                            {source: 'sf_ferry_route', id: hoveredPolygonLine}, 
                            {hover: true}
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'sf_ferry_route_layer', function() {
                if (routeId.length > 0) {routeId = []};
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverId.length; i++) {
                        map.setFeatureState(
                            {source: 'sf_ferry_route', id: hoverId[i]}, 
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    sfferry_route_caller.send();
}