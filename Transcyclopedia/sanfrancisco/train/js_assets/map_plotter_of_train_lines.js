let routeId = [];
let hoverId = [];
var train_geojson_routes = [];
var hoveredPolygonLine = null;
var onestopId = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeTrainLinesInMap(id) {
    var train_agency = id;

    switch (train_agency) {
        case "ace":
            onestopId = "o-9q9-acealtamontcorridorexpress";
            break;
        case "caltrain":
            onestopId = "o-9q9-caltrain";
            break;
        case "capitol_corridor":
            onestopId = "o-9qc-capitolcorridor";
            break;
        case "smart":
            onestopId = "o-9qb-sonomamarinarearailtransit";
            break;
        default:
            routeId = [];
            hoverId = [];
            train_geojson_routes = [];
            hoveredPolygonLine = null;
            onestopId = "";

            if (map.getLayer("train_route_layer")) {
                map.removeLayer("train_route_layer");
            }
            if (map.getSource("train_route")) {
                map.removeSource("train_route");
            }
            document.getElementById("range_of_routes").innerHTML = `
                <li class="route_radius"><span id="route_short">-</span>&nbsp;&nbsp;<span id="detailed_route">Drag the map to filter nearby routes</span></li>
            `;
            break;
    }

    if (id !== "prompt") {
        TrainGeoJSONCreation(onestopId);
    }
}

function TrainGeoJSONCreation(insId) {
    if (map.getLayer("train_route_layer")) {
        map.removeLayer("train_route_layer");
    }
    if (map.getSource("train_route")) {
        map.removeSource("train_route");
    }
    train_geojson_routes = [];
    routeId = [];
    hoverId = [];
    hoveredPolygonLine = null;

    var train_route_caller = new XMLHttpRequest();
    train_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insId}&route_type=2&include_geometry=true`);
    train_route_caller.onreadystatechange = function() {
        if (train_route_caller.readyState === 4 && train_route_caller.status === 200) {
            var train_route_reciever = JSON.parse(train_route_caller.responseText);

            for (var i=0; i<train_route_reciever.routes.length; i++) {
                var route_short_name = train_route_reciever.routes[i].route_short_name;
                var route_long_name = train_route_reciever.routes[i].route_long_name;
                var route_color = train_route_reciever.routes[i].route_color;
                var route_text_color = train_route_reciever.routes[i].route_text_color;
                var route_geometry = train_route_reciever.routes[i].geometry;

                train_geojson_routes.push({
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

            map.addSource("train_route", {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': train_geojson_routes
                },
                "generateId": true
            });

            map.addLayer({
                'id': 'train_route_layer',
                'type': 'line',
                'source': 'train_route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 3,
                    'line-color': ['get', 'route_color']
                },
            });

            map.on('mouseenter', 'train_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['train_route_layer']});

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index); 
                        hoveredPolygonLine = fs[f].id;
                        hoverId.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'train_route', id: hoveredPolygonLine}, 
                                {hover: false}
                            );
                        }

                        map.setFeatureState(
                            {source: 'train_route', id: hoveredPolygonLine}, 
                            {hover: true}
                        );
                    }

                    popup.setLngLat(e.lngLat).setHTML(name_of_route).addTo(map);
                }
            });

            map.on('mouseleave', 'train_route_layer', function() {
                if (routeId.length > 0) {routeId = []};
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverId.length; i++) {
                        map.setFeatureState(
                            {source: 'train_route', id: hoverId[i]}, 
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    train_route_caller.send();
}