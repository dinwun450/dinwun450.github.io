let routeId = [];
let hoverIdBus = [];
var labus_geojson_routes = [];
let hoveredPolygonLine = null;
var onestop_id = "";

const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

function changeLABusMap(e) {
    var la_bus_agency = e;

    switch (la_bus_agency) {
        case "avta":
            onestop_id = "o-antelope~valley~transit~authority";
            break;
        case "baldinpark":
            onestop_id = "o-9qh1g-baldwinparktransit";
            break;
        case "beachcities":
            onestop_id = "o-9q5b-beachcitiestransit~cityofredondobeach";
            break;
        case "burbankbus":
            onestop_id = "o-9q5f7-burbankbus";
            break;
        case "carsoncirc":
            onestop_id = "o-9q5b-carsoncircuit";
            break;
        case "compton":
            onestop_id = "o-9q5bv-comptonrenaissancetransit";
            break;
        case "culver":
            onestop_id = "o-9q5c-culvercitybus";
            break;
        case "foothill":
            onestop_id = "o-9qh1-foothilltransit";
            break;
        case "gtrans":
            onestop_id = "o-9q5b-gtrans";
            break;
        case "glendale":
            onestop_id = "o-9q5f-glendalebeeline";
            break;
        case "glendora":
            onestop_id = "o-9qh4j-glendoratransportationdivision";
            break;
        case "huntington":
            onestop_id = "o-9q5cm-huntingtonparkexpress";
            break;
        case "lagobus":
            onestop_id = "o-9q5-lagobus";
            break;
        case "ladot":
            onestop_id = "o-9q5-ladot";
            break;
        case "lawndale":
            onestop_id = "o-9q5bf-lawndalebeat";
            break;
        case "laxflyaway":
            onestop_id = "o-9q5c-laxflyaway";
            break;
        case "longbeach":
            onestop_id = "o-9q5b-longbeachtransit";
            break;
        case "montebello":
            onestop_id = "o-9qh1-montebellobuslines";
            break;
        case "montereypark":
            onestop_id = "o-9q5cx-spiritbus";
            break;
        case "norwalk":
            onestop_id = "o-9qh1-norwalktransitsystem";
            break;
        case "palosverdes":
            onestop_id = "o-9q5b4-palosverdespeninsulatransitauthority";
            break;
        case "pasadena":
            onestop_id = "o-9q5f-pasadenatransit";
            break;
        case "santaclarita":
            onestop_id = "o-santa~clarita";
            break;
        case "bigbluebus":
            onestop_id = "o-9q5c-bigbluebus";
            break;
        case "torrance":
            onestop_id = "o-9q5b-torrancetransit";
            break;
        default:
            onestop_id = "";
            if (map.getLayer("la_bus_route_layer")) {
                map.removeLayer("la_bus_route_layer");
            }
            if (map.getSource("la_bus_route_source")) {
                map.removeSource("la_bus_route_source");
            }
            break;
    }

    if (e === "prompt") {
        console.log("Reset!");
    }
    else {
        LABusGeoJsonCreation(onestop_id);
    }
}

function LABusGeoJsonCreation(insOneStopID) {
    if (map.getLayer("la_bus_route_layer")) {
        map.removeLayer("la_bus_route_layer");
    }
    if (map.getSource("la_bus_route_source")) {
        map.removeSource("la_bus_route_source");
    }

    var labus_route_caller = new XMLHttpRequest();
    labus_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopID}&limit=700&include_geometry=true`);
    labus_route_caller.onreadystatechange = function() {
        if (labus_route_caller.readyState === 4 && labus_route_caller.status === 200) {
            var labus_route_receiver = JSON.parse(labus_route_caller.responseText);
            var name_of_labus_agency = labus_route_receiver.routes[0].agency.agency_name;

            for (var i = 0; i < labus_route_receiver.routes.length; i++) {
                var route_short_name = labus_route_receiver.routes[i].route_short_name;
                var route_long_name = labus_route_receiver.routes[i].route_long_name;
                var route_color = labus_route_receiver.routes[i].route_color;
                var route_text_color = labus_route_receiver.routes[i].route_text_color;
                var route_id = labus_route_receiver.routes[i].route_id;
                var labus_route_geometry = labus_route_receiver.routes[i].geometry;

                if (labus_route_geometry === null) {
                    console.log("No GeoJson routes here.");
                }
                else {
                    labus_geojson_routes.push({
                        'type': 'Feature',
                        'geometry': labus_route_geometry,
                        'properties': {
                            'route_color': `#${route_color}`,
                            'route_text_color': `#${route_text_color}`,
                            'route_short_name': route_short_name,
                            'route_long_name': route_long_name,
                            'route_id': route_id,
                            'labus_agency': name_of_labus_agency
                        }
                    })
                }
            }

            map.addSource('la_bus_route_source', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': labus_geojson_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'la_bus_route_layer',
                'type': 'line',
                'source': 'la_bus_route_source',
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
                    ],
                },
            });

            map.on('mouseenter', 'la_bus_route_layer', function(e) {
                var fs = map.queryRenderedFeatures(e.point, {layers: ['la_bus_route_layer']});

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeId.push(name_of_route);

                        hoveredPolygonLine = fs[f].id;
                        hoverIdBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                {source: 'la_bus_route_source', id: hoveredPolygonLine},
                                {hover: false}
                            );
                        }

                        map.setFeatureState(
                            {source: 'la_bus_route_source', id: hoveredPolygonLine},
                            {hover: true}
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                }
            });

            map.on('mouseleave', 'la_bus_route_layer', function(e) {
                if (routeId.length > 0) {routeId = []}
                popup.remove();

                if (hoveredPolygonLine !== null) {
                    for (var i=0; i<hoverIdBus.length; i++) {
                        map.setFeatureState(
                            {source: 'la_bus_route_source', id: hoverIdBus[i]},
                            {hover: false}
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    labus_route_caller.send();
}