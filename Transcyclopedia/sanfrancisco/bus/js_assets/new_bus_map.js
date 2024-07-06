let routeId = [];
let hoverIdBus = [];
var sfbus_geojson_routes = [];
var hoveredPolygonLine = null;
var link = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeLinesInMap(n) {
    var bus_agency = n;

    switch (bus_agency) {
        case "actransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-actransit&limit=700&include_geometry=true";
            break;
        case "berkeleyshuttles":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p3-beartransit&limit=700&include_geometry=true";
            break;
        case "commutedotorg":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-commuteorgshuttles&limit=700&include_geometry=true";
            break;
        case "countyconnection":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-countyconnection&limit=700&include_geometry=true";
            break;
        case "dumbartonexpress":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-dumbartonexpress&limit=700&include_geometry=true";
            break;
        case "emeryvilleshuttles":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p3-emerygo~round&limit=700&include_geometry=true";
            break;
        case "fast":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-fairfieldandsuisuntransit&limit=700&include_geometry=true";
            break;
        case "ggt":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-goldengatetransit&limit=700&include_geometry=true";
            break;
        case "marintransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbb-marintransit&limit=700&include_geometry=true";
            break;
        case "missionbaytma":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8yy-missionbaytma&limit=700&include_geometry=true";
            break;
        case "petalumatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbc9-petalumatransit&limit=700&include_geometry=true";
            break;
        case "sanmateotransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8-samtrans&limit=700&include_geometry=true";
            break;
        case "santarosacitybus":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbdx-santarosacitybus&limit=700&include_geometry=true";
            break;
        case "solanotransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc0-soltrans&limit=700&include_geometry=true";
            break;
        case "sonomacountytransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-sonomacountytransit&limit=700&include_geometry=true";
            break;
        case "stanfordshuttles":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9h-stanford~marguerite&limit=700&include_geometry=true";
            break;
        case "trideltatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc2-trideltatransit&limit=700&include_geometry=true";
            break;
        case "uctransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9jy-unioncitytransit&limit=700&include_geometry=true";
            break; 
        case "vacavillecitycoach":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc60-vacavillecitycoach&limit=700&include_geometry=true";
            break;
        case "napatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-vinenapacounty&limit=700&include_geometry=true";
            break;
        case "westcat":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-westcatwesterncontracosta&limit=700&include_geometry=true";
            break;
        case "trivalleywheels":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9q-wheelsbus&limit=700&include_geometry=true";
            break;
        default:
            link = "";
            if (map.getLayer("sf_bus_route_layer")) {
                map.removeLayer("sf_bus_route_layer");
            }
            if (map.getSource("sf_bus_route_source")) {
                map.removeSource("sf_bus_route_source");
            }
            sfbus_geojson_routes = [];
            routeId = [];
            hoverIdBus = [];
            hoveredPolygonLine = null;
            document.getElementById("range_of_routes").innerHTML = `
                <li class="route_radius"><span id="route_short">-</span>&nbsp;&nbsp;<span id="detailed_route">Select a transit agency above, then drag the map to filter nearby routes.</span></li>
            `;
            break;
    }

    if (n === "prompt") {
        console.log("Reset.");
    }
    else {
        SFBusGeoJsonCreation(link);
    }
}

function SFBusGeoJsonCreation(insLink) {
    if (map.getLayer("sf_bus_route_layer")) {
        map.removeLayer("sf_bus_route_layer");
    }
    if (map.getSource("sf_bus_route_source")) {
        map.removeSource("sf_bus_route_source");
    }
    sfbus_geojson_routes = [];
    routeId = [];
    hoverIdBus = [];
    hoveredPolygonLine = null;

    var sfbus_route_caller = new XMLHttpRequest();
    sfbus_route_caller.open("GET", insLink);
    sfbus_route_caller.onreadystatechange = function() {
        if (sfbus_route_caller.readyState === 4 && sfbus_route_caller.status === 200) {
            var sfbus_route_receiver = JSON.parse(sfbus_route_caller.responseText);
            var name_of_sfbus_agency = sfbus_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < sfbus_route_receiver.routes.length; i++) {
                var route_short_name = sfbus_route_receiver.routes[i].route_short_name;
                var route_long_name = sfbus_route_receiver.routes[i].route_long_name;
                var route_color = sfbus_route_receiver.routes[i].route_color;
                var route_text_color = sfbus_route_receiver.routes[i].route_text_color;
                var route_id = sfbus_route_receiver.routes[i].route_id;
                var sfbus_route_geometry = sfbus_route_receiver.routes[i].geometry;

                if (sfbus_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    sfbus_geojson_routes.push({
                        'type': 'Feature',
                        'geometry': sfbus_route_geometry,
                        'properties': {
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_id': route_id,
                            'labus_agency': name_of_sfbus_agency
                        }
                    })
                }
            }

            map.addSource('sf_bus_route_source', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': sfbus_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'sf_bus_route_layer',
                'type': 'line',
                'source': 'sf_bus_route_source',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
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

            map.on('mouseenter', 'sf_bus_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['sf_bus_route_layer']});

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === "") {
                            name_of_route = fs[f].properties.route_long_name;
                        }

                        routeId.push(name_of_route);
                        routeId = routeId.filter((item, index) => routeId.indexOf(item) === index);

                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'sf_bus_route_source', id: hoveredPolygonLine},
                                {hover: false}
                            );
                        }

                        map.setFeatureState(
                            {source: 'sf_bus_route_source', id: hoveredPolygonLine},
                            {hover: true}
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'sf_bus_route_layer', function(e) {
                if (routeId.length > 0) {routeId = []}
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverIdBus.length; i++) {
                        map.setFeatureState(
                            {source: 'sf_bus_route_source', id: hoverIdBus[i]},
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    sfbus_route_caller.send();
}