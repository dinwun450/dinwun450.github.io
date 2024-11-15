var geojson_of_thebus_routes = [];

function getWikipediaForTheBus() {
    var wikipedia_thebus_caller = new XMLHttpRequest();
    wikipedia_thebus_caller.open("GET", "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Merced_County_Transit&origin=*", true);
    wikipedia_thebus_caller.onreadystatechange = function() {
        if (wikipedia_thebus_caller.readyState === 4 && wikipedia_thebus_caller.status === 200) {
            var wikipedia_thebus_receiver = JSON.parse(wikipedia_thebus_caller.responseText);
            var wikipedia_thebus_info = wikipedia_thebus_receiver.query.pages["25083617"].extract;
            document.getElementById("desc").innerHTML = `${wikipedia_thebus_info} <br> <a href="https://en.wikipedia.org/wiki/Merced_County_Transit">Wikipedia</a>`;
        }
    };
    wikipedia_thebus_caller.send();
};
getWikipediaForTheBus();

function getContactForTheBus() {
    var contact_thebus_caller = new XMLHttpRequest();
    contact_thebus_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qd-thebus&include_alerts=true");
    contact_thebus_caller.onreadystatechange = function() {
        if (contact_thebus_caller.readyState === 4 && contact_thebus_caller.status === 200) {
            var contact_thebus_receiver = JSON.parse(contact_thebus_caller.responseText);
            var contact_thebus_email = contact_thebus_receiver.agencies[0].agency_email;
            var contact_thebus_phone = contact_thebus_receiver.agencies[0].agency_phone;

            if (contact_thebus_email === null) {
                contact_thebus_email = "-";
            }
            if (contact_thebus_phone === null) {
                contact_thebus_phone = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${contact_thebus_email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${contact_thebus_phone}</b> (Phone)`;
        }
    };
    contact_thebus_caller.send();
}
getContactForTheBus();

function getLinesTheBus() {
    var lines_thebus_caller = new XMLHttpRequest();
    lines_thebus_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qd-thebus&limit=700&include_alerts=true");
    lines_thebus_caller.onreadystatechange = function() {
        if (lines_thebus_caller.readyState === 4 && lines_thebus_caller.status === 200) {
            var lines_thebus_receiver = JSON.parse(lines_thebus_caller.responseText);
            for (var i = 0; i < lines_thebus_receiver.routes.length; i++) {
                var route_short_name = lines_thebus_receiver.routes[i].route_short_name;
                var route_long_name = lines_thebus_receiver.routes[i].route_long_name;
                var route_color = lines_thebus_receiver.routes[i].route_color;
                var route_text_color = lines_thebus_receiver.routes[i].route_text_color;

                document.getElementById("route_name_thebus").innerHTML = route_short_name;
                document.getElementById("route_name_thebus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_thebus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_thebus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_thebus").innerHTML = route_long_name;

                var route_cloner = document.getElementById("route_entity_thebus").cloneNode(true);
                document.getElementById("thebus_lines").appendChild(route_cloner);
            }

            var all_thebus_lines = document.getElementById("thebus_lines").children;
            document.getElementById("thebus_lines").removeChild(all_thebus_lines[0]);
            document.getElementById("thebus_routes").innerHTML = lines_thebus_receiver.routes.length;
        }
    };
    lines_thebus_caller.send();
}
getLinesTheBus();

function keyDownTheBus(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById("list_of_departures_thebus").innerHTML = `
            <li id="line_for_departure_thebus" class="lod_styling"><div id="lod_thebus">-</div> <span id="aor_thebus"></span> <span id="hod_thebus">(None)</span> <span id="depart_time_thebus">Enter a stop by their stop ID</span></li>
        `;
        document.getElementById("stopname_thebus").innerHTML = "---";
        getStopForDeparturesTheBus();
    }
}

function getStopForDeparturesTheBus() {
    var stopvalue_thebus = document.getElementById("stopgetter").value;
    var stop_id_thebus_caller = new XMLHttpRequest();
    stop_id_thebus_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9qd-thebus&stop_id=${stopvalue_thebus}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stop_id_thebus_caller.onreadystatechange = function() {
        if (stop_id_thebus_caller.readyState === 4 && stop_id_thebus_caller.status === 200) {
            var stop_id_thebus_receiver = JSON.parse(stop_id_thebus_caller.responseText);
            var stop_name_thebus = stop_id_thebus_receiver.stops[0].stop_name;
            var stop_id_thebus = stop_id_thebus_receiver.stops[0].onestop_id;
            document.getElementById("stopname_thebus").innerHTML = stop_name_thebus;
            getDeparturesForTheBus(stop_id_thebus);
        }
    };
    stop_id_thebus_caller.send();
}

function getDeparturesForTheBus(stop_id_thebus) {
    var departures_thebus_caller = new XMLHttpRequest();
    departures_thebus_caller.open("GET", `https://transit.land/api/v2/rest/stops/${stop_id_thebus}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    departures_thebus_caller.onreadystatechange = function() {
        if (departures_thebus_caller.readyState === 4 && departures_thebus_caller.status === 200) {
            var departures_thebus_receiver = JSON.parse(departures_thebus_caller.responseText).stops[0].departures;
            for (var i = 0; i < departures_thebus_receiver.length; i++) {
                var route_short_name = departures_thebus_receiver[i].trip.route.route_short_name;
                var route_color = departures_thebus_receiver[i].trip.route.route_color;
                var route_text_color = departures_thebus_receiver[i].trip.route.route_text_color;
                var route_headsign = departures_thebus_receiver[i].trip.trip_headsign;
                var departure_time = departures_thebus_receiver[i].arrival.estimated;
                var scheduled_time = departures_thebus_receiver[i].arrival.scheduled;
                var delayed = departures_thebus_receiver[i].arrival.delay / 60;

                switch (departure_time) {
                    case null:
                        document.getElementById("depart_time_thebus").innerHTML = `${scheduled_time} (scheduled)`;
                        document.getElementById("depart_time_thebus").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_thebus").innerHTML = `${departure_time} <span id="delay_thebus">()</span>`;
                        document.getElementById("depart_time_thebus").style.color = "rgb(10, 161, 45)";

                        switch (delayed) {
                            case null:
                                document.getElementById("delay_thebus").innerHTML = "(no data)";
                                document.getElementById("delay_thebus").style.color = "black";
                                break;
                            case (delayed > 60):
                                document.getElementById("delay_thebus").innerHTML = `(${delayed} min late)`;
                                document.getElementById("delay_thebus").style.color = "#db4242";
                                break;
                            case (delayed < 0):
                                document.getElementById("delay_thebus").innerHTML = `(${delayed} min early)`;
                                document.getElementById("delay_thebus").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_thebus").innerHTML = "(on time)";
                                document.getElementById("delay_thebus").style.color = "rgb(10, 161, 45)";
                                break;
                        };
                        break;
                }

                document.getElementById("lod_thebus").innerHTML = route_short_name;
                document.getElementById("lod_thebus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_thebus").style.color = `#${route_text_color}`;
                document.getElementById("lod_thebus").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_thebus").innerHTML = route_headsign;

                var departure_cloner = document.getElementById("line_for_departure_thebus").cloneNode(true);
                document.getElementById("list_of_departures_thebus").appendChild(departure_cloner);
            }

            var all_departures_thebus = document.getElementById("list_of_departures_thebus").children;
            document.getElementById("list_of_departures_thebus").removeChild(all_departures_thebus[0]);
        }
    };
    departures_thebus_caller.send();
}

function clearAllTheBus() {
    document.getElementById("list_of_departures_thebus").innerHTML = `
        <li id="line_for_departure_thebus" class="lod_styling"><div id="lod_thebus">-</div> <span id="aor_thebus"></span> <span id="hod_thebus">(None)</span> <span id="depart_time_thebus">Enter a stop by their stop ID</span></li>
    `;
    document.getElementById("stopname_thebus").innerHTML = "---";
}

function loadTheBusAlerts() {
    var alerts_thebus_caller = new XMLHttpRequest();
    alerts_thebus_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qd-thebus&include_alerts=true");
    alerts_thebus_caller.onreadystatechange = function() {
        if (alerts_thebus_caller.readyState === 4 && alerts_thebus_caller.status === 200) {
            var alerts_thebus_receiver = JSON.parse(alerts_thebus_caller.responseText);

            if (alerts_thebus_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_desc_thebus").innerHTML = "There are no alerts at the moment involving the Merced County Transit agency.";
            }
            else {
                for (var i = 0; i < alerts_thebus_receiver.agencies[0].alerts.length; i++) {
                    var desc_for_thebus_alert = alerts_thebus_receiver.agencies[0].alerts[i].description_text[0].text;
                    var header_for_thebus_alert = alerts_thebus_receiver.agencies[0].alerts[i].header_text[0].text;

                    document.getElementById("alert_desc_thebus").innerHTML = `<b>${desc_for_thebus_alert}</b> <br> ${desc_for_thebus_alert}`;

                    var alert_cloner = document.getElementById("alert_desc_thebus").cloneNode(true);
                    document.getElementById("list_of_alerts_thebus").appendChild(alert_cloner);
                }

                var all_thebus_alerts = document.getElementById("list_of_alerts_thebus").children;
                document.getElementById("list_of_alerts_thebus").removeChild(all_thebus_alerts[0]);
            }
        };
    };
    alerts_thebus_caller.send();
}
loadTheBusAlerts();

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
        center: [-120.499992, 37.325954],
        zoom: 9
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

function plotTheBusLines() {
    var thebus_map_caller = new XMLHttpRequest();
    thebus_map_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qd-thebus&limit=700&include_geometry=true");
    thebus_map_caller.onreadystatechange = function() {
        if (thebus_map_caller.readyState === 4 && thebus_map_caller.status === 200) {
            var thebus_map_receiver = JSON.parse(thebus_map_caller.responseText);

            for (var i = 0; i < thebus_map_receiver.routes.length; i++) {
                var route_short_name = thebus_map_receiver.routes[i].route_short_name;
                var route_long_name = thebus_map_receiver.routes[i].route_long_name;
                var route_color = thebus_map_receiver.routes[i].route_color;
                var route_text_color = thebus_map_receiver.routes[i].route_text_color;
                var route_id = thebus_map_receiver.routes[i].route_id;
                var route_type = thebus_map_receiver.routes[i].route_type;
                var route_geometry = thebus_map_receiver.routes[i].geometry;

                geojson_of_thebus_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_short_name": route_short_name,
                        "route_long_name": route_long_name,
                        "route_color": `#${route_color}`,
                        "route_text_color": `#${route_text_color}`,
                        "route_id": route_id,
                        "route_type": route_type
                    },
                    "geometry": route_geometry
                });
            }

            map.addSource('source_from_thebus', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_thebus_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'thebus_lines',
                'type': 'line',
                'source': 'source_from_thebus',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 2,
                    'line-color': ['get', 'route_color'],
                }
            });

            map.moveLayer('thebus_lines');

            map.on('movestart', () => {
                map.setFilter('thebus_lines', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir"><span id="route_name_rad">-</span>&nbsp;&nbsp;<span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({ 
                    layers: ['thebus_lines'] 
                });

                if (features) {
                    const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                    for (var f=0; f<uniqueFeatures.length; f++) {
                        var name_of_route = uniqueFeatures[f].properties.route_short_name;
                        var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                        var color_of_route = uniqueFeatures[f].properties.route_color;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === null) {
                            document.getElementById("route_name_rad").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                        } else {
                            document.getElementById("route_name_rad").innerHTML = name_of_route;
                        }

                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.color = text_color_of_route;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
                        document.getElementById("route_detail_rad").innerHTML = desc_of_route;

                        var each_route = document.getElementById("rir").cloneNode(true);
                        document.getElementById("range_of_routes").appendChild(each_route);
                    }

                    var all_routes = document.getElementById("range_of_routes").children;
                    document.getElementById("range_of_routes").removeChild(all_routes[0]);
                }
            });

            let routeID_for_TheBus = [];
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'thebus_lines', (e) => {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['thebus_lines'] });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeID_for_TheBus.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_TheBus).addTo(map);
                }
            });

            map.on('mouseleave', ['thebus_lines'], () => {
                if (routeID_for_TheBus.length > 0) {
                    routeID_for_TheBus = [];
                }
                popup.remove();
            });
        }
    }
    thebus_map_caller.send();
}
plotTheBusLines();