var geojson_of_yarts_routes = [];

function getWikipediaForYARTS() {
    var wikipedia_yarts_caller = new XMLHttpRequest();
    wikipedia_yarts_caller.open("GET", "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=YARTS&origin=*");
    wikipedia_yarts_caller.onreadystatechange = function() {
        if (wikipedia_yarts_caller.readyState === 4 && wikipedia_yarts_caller.status === 200) {
            var wikipedia_yarts_receiver = JSON.parse(wikipedia_yarts_caller.responseText);
            var wikipedia_yarts_info = wikipedia_yarts_receiver.query.pages["25064852"].extract;
            document.getElementById("desc").innerHTML = `${wikipedia_yarts_info} <br> <a href="https://en.wikipedia.org/wiki/Yosemite_Area_Regional_Transportation_System">Wikipedia</a>`;
        };
    };
    wikipedia_yarts_caller.send();
}
getWikipediaForYARTS();

function getContactForYARTS() {
    var contact_yarts_caller = new XMLHttpRequest();
    contact_yarts_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qd-yosemitearearegionaltransportationsystem&include_alerts=true");
    contact_yarts_caller.onreadystatechange = function() {
        if (contact_yarts_caller.readyState === 4 && contact_yarts_caller.status === 200) {
            var contact_yarts_receiver = JSON.parse(contact_yarts_caller.responseText);
            var contact_yarts_email = contact_yarts_receiver.agencies[0].agency_email;
            var contact_yarts_phone = contact_yarts_receiver.agencies[0].agency_phone;

            if (contact_yarts_email == "") {
                contact_yarts_email = "-";
            }

            if (contact_yarts_phone == "") {
                contact_yarts_phone = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${contact_yarts_email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${contact_yarts_phone}</b> (Phone)`;
        };
    };
    contact_yarts_caller.send();
}
getContactForYARTS();

function getLinesYARTS() {
    var lines_yarts_caller = new XMLHttpRequest();
    lines_yarts_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qd-yosemitearearegionaltransportationsystem&limit=700&include_alerts=true");
    lines_yarts_caller.onreadystatechange = function() {
        if (lines_yarts_caller.readyState === 4 && lines_yarts_caller.status === 200) {
            var lines_yarts_receiver = JSON.parse(lines_yarts_caller.responseText);
            for (var i = 0; i < lines_yarts_receiver.routes.length; i++) {
                var route_long_name = lines_yarts_receiver.routes[i].route_long_name;
                var route_color = lines_yarts_receiver.routes[i].route_color;

                document.getElementById("route_name_yarts").innerHTML = "&nbsp;&nbsp;&nbsp;";
                document.getElementById("route_name_yarts").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_yarts").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_yarts").innerHTML = route_long_name;

                var route_cloner = document.getElementById("route_entity_yarts").cloneNode(true);
                document.getElementById("yarts_lines").appendChild(route_cloner);
            }

            var all_yarts_lines = document.getElementById("yarts_lines").children;
            document.getElementById("yarts_lines").removeChild(all_yarts_lines[0]);
            document.getElementById("yarts_routes").innerHTML = lines_yarts_receiver.routes.length;
        }
    };
    lines_yarts_caller.send();
}
getLinesYARTS();

function keyDownYarts(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById("list_of_departures_yarts").innerHTML = `
            <li id="line_for_departure_yarts" class="lod_styling"><div id="lod_yarts">-</div> <span id="aor_yarts"></span> <span id="hod_yarts">Loading...</span> <span id="depart_time_yarts">Please wait...</span></li>
        `;
        document.getElementById("stopname_yarts").innerHTML = "---";
        getStopForDeparturesYARTS();
    }
}

function getStopForDeparturesYARTS() {
    var stopvalue_yarts = document.getElementById("stopgetter").value;
    var stop_id_yarts_caller = new XMLHttpRequest();
    stop_id_yarts_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9qd-yosemitearearegionaltransportationsystem&stop_id=${stopvalue_yarts}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stop_id_yarts_caller.onreadystatechange = function() {
        if (stop_id_yarts_caller.readyState === 4 && stop_id_yarts_caller.status === 200) {
            var stop_id_yarts_receiver = JSON.parse(stop_id_yarts_caller.responseText);
            var stop_name_yarts = stop_id_yarts_receiver.stops[0].stop_name;
            var stop_id_yarts = stop_id_yarts_receiver.stops[0].onestop_id;

            document.getElementById("stopname_yarts").innerHTML = stop_name_yarts;
            getDeparturesForYARTS(stop_id_yarts);
        };
    };
    stop_id_yarts_caller.send();
}

function getDeparturesForYARTS(stop_id_yarts) {
    var departures_yarts_caller = new XMLHttpRequest();
    departures_yarts_caller.open("GET", `https://transit.land/api/v2/rest/stops/${stop_id_yarts}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    departures_yarts_caller.onreadystatechange = function() {
        if (departures_yarts_caller.readyState === 4 && departures_yarts_caller.status === 200) {
            var departures_yarts_receiver = JSON.parse(departures_yarts_caller.responseText).stops[0].departures;
            for (var i = 0; i < departures_yarts_receiver.length; i++) {
                var route_color = departures_yarts_receiver[i].trip.route.route_color;
                var route_headsign = departures_yarts_receiver[i].trip.trip_headsign;
                var departure_time = departures_yarts_receiver[i].arrival.estimated;
                var scheduled_time = departures_yarts_receiver[i].arrival.scheduled;
                var delayed = departures_yarts_receiver[i].arrival.delay / 60;
                
                switch (departure_time) {
                    case null:
                        document.getElementById("depart_time_yarts").innerHTML = `${scheduled_time} (scheduled)`;
                        document.getElementById("depart_time_yarts").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_yarts").innerHTML = `${departure_time} <span id="delay_yarts">()</span>`;
                        document.getElementById("depart_time_yarts").style.color = "rgb(10, 161, 45)";
                    
                        switch (delayed) {
                            case null:
                                document.getElementById("delay_yarts").innerHTML = "(no data)";
                                document.getElementById("delay_yarts").style.color = "black";
                                break;
                            case (delayed > 60):
                                document.getElementById("delay_yarts").innerHTML = `(${delayed} min late)`;
                                document.getElementById("delay_yarts").style.color = "#db4242";
                                break;
                            case (delayed < 0):
                                document.getElementById("delay_yarts").innerHTML = `(${delayed} min early)`;
                                document.getElementById("delay_yarts").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_yarts").innerHTML = "(on time)";
                                document.getElementById("delay_yarts").style.color = "rgb(10, 161, 45)";
                                break;
                        };
                        break;
                }

                document.getElementById("lod_yarts").innerHTML = "&nbsp;&nbsp;&nbsp;";
                document.getElementById("lod_yarts").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_yarts").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_yarts").innerHTML = route_headsign;

                var departure_cloner = document.getElementById("line_for_departure_yarts").cloneNode(true);
                document.getElementById("list_of_departures_yarts").appendChild(departure_cloner);
            };

            var all_departures_yarts = document.getElementById("list_of_departures_yarts").children;
            document.getElementById("list_of_departures_yarts").removeChild(all_departures_yarts[0]);
        };
    };
    departures_yarts_caller.send();
}

function clearAllYarts() {
    document.getElementById("list_of_departures_yarts").innerHTML = `
        <li id="line_for_departure_yarts" class="lod_styling"><div id="lod_yarts">-</div> <span id="aor_yarts"></span> <span id="hod_yarts">(None)</span> <span id="depart_time_yarts">Enter a stop by their stop ID</span></li>
    `;
    document.getElementById("stopname_yarts").innerHTML = "---";
}

function loadYARTSAlerts() {
    var alerts_yarts_caller = new XMLHttpRequest();
    alerts_yarts_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qd-yosemitearearegionaltransportationsystem&include_alerts=true");
    alerts_yarts_caller.onreadystatechange = function() {
        if (alerts_yarts_caller.readyState === 4 && alerts_yarts_caller.status === 200) {
            var alerts_yarts_receiver = JSON.parse(alerts_yarts_caller.responseText);

            if (alerts_yarts_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_desc_yarts").innerHTML = "There are no alerts at the moment involving the YARTS agency.";
            }
            else {
                for (var i = 0; i < alerts_yarts_receiver.agencies[0].alerts.length; i++) {
                    var desc_for_yarts_alert = alerts_yarts_receiver.agencies[0].alerts[i].description_text[0].text;
                    var header_for_yarts_alert = alerts_yarts_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_desc_yarts").innerHTML = `<b>${header_for_yarts_alert}</b>: ${desc_for_yarts_alert}`;

                    var alert_cloner = document.getElementById("alert_desc_yarts").cloneNode(true);
                    document.getElementById("list_of_alerts_yarts").appendChild(alert_cloner);
                };

                var all_yarts_alerts = document.getElementById("list_of_alerts_yarts").children;
                document.getElementById("list_of_alerts_yarts").removeChild(all_yarts_alerts[0]);
            }
        };
    };
    alerts_yarts_caller.send();
}
loadYARTSAlerts();

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
        center: [-119.538330, 37.865101],
        zoom: 8
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

function plotYARTSLines() {
    var yarts_map_caller = new XMLHttpRequest();
    yarts_map_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qd-yosemitearearegionaltransportationsystem&limit=700&include_geometry=true");
    yarts_map_caller.onreadystatechange = function() {
        if (yarts_map_caller.readyState === 4 && yarts_map_caller.status === 200) {
            var yarts_map_receiver = JSON.parse(yarts_map_caller.responseText);

            for (var i = 0; i < yarts_map_receiver.routes.length; i++) {
                var route_short_name = yarts_map_receiver.routes[i].route_short_name;
                var route_long_name = yarts_map_receiver.routes[i].route_long_name;
                var route_color = yarts_map_receiver.routes[i].route_color;
                var route_text_color = yarts_map_receiver.routes[i].route_text_color;
                var route_id = yarts_map_receiver.routes[i].route_id;
                var route_type = yarts_map_receiver.routes[i].route_type;
                var route_geometry = yarts_map_receiver.routes[i].geometry;

                geojson_of_yarts_routes.push({
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

            map.addSource('source_from_yarts_bus', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_yarts_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'yarts_lines',
                'type': 'line',
                'source': 'source_from_yarts_bus',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-width': 2,
                    'line-color': ['get', 'route_color'],
                }
            });

            map.moveLayer('yarts_lines');

            map.on('movestart', () => {
                map.setFilter('yarts_lines', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir"><span id="route_name_rad">-</span>&nbsp;&nbsp;<span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({ 
                    layers: ['yarts_lines'] 
                });

                if (features) {
                    const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                    for (var f=0; f<uniqueFeatures.length; f++) {
                        var name_of_route = uniqueFeatures[f].properties.route_short_name;
                        var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                        var color_of_route = uniqueFeatures[f].properties.route_color;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === "") {
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

            let routeID_for_YARTS = [];
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'yarts_lines', (e) => {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['yarts_lines'] });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_long_name;
                        routeID_for_YARTS.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_YARTS).addTo(map);
                }
            });

            map.on('mouseleave', ['yarts_lines'], () => {
                if (routeID_for_YARTS.length > 0) {
                    routeID_for_YARTS = [];
                }
                popup.remove();
            });
        }
    }
    yarts_map_caller.send();
}
plotYARTSLines();