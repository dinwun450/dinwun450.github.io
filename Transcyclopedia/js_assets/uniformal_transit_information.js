function getWikipediaForAnAgency(agency_name) {
    var wikipedia_agency_caller = new XMLHttpRequest();
    wikipedia_agency_caller.open("GET", `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${agency_name}&origin=*`);
    wikipedia_agency_caller.onreadystatechange = function() {
        if (wikipedia_agency_caller.readyState === 4 && wikipedia_agency_caller.status === 200) {
            var wikipedia_agency_receiver = JSON.parse(wikipedia_agency_caller.responseText);
            var wikipedia_agency_info = wikipedia_agency_receiver.query.pages[Object.keys(wikipedia_agency_receiver.query.pages)[0]].extract;
            document.getElementById("desc").innerHTML = `${wikipedia_agency_info} <br> <a href="https://en.wikipedia.org/wiki/${agency_name}">Wikipedia</a>`;
        };
    };
    wikipedia_agency_caller.send();
}

function getContactsForAnAgency(agency_onestop_id) {
    var contact_agency_caller = new XMLHttpRequest();
    contact_agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${agency_onestop_id}&include_alerts=true`);
    contact_agency_caller.onreadystatechange = function() {
        if (contact_agency_caller.readyState === 4 && contact_agency_caller.status === 200) {
            var contact_agency_receiver = JSON.parse(contact_agency_caller.responseText);
            var contact_agency_email = contact_agency_receiver.agencies[0].agency_email;
            var contact_agency_phone = contact_agency_receiver.agencies[0].agency_phone;

            if (contact_agency_email == null) {
                contact_agency_email = "-";
            }

            if (contact_agency_phone == null) {
                contact_agency_phone = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${contact_agency_email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${contact_agency_phone}</b> (Phone)`;
        };
    };
    contact_agency_caller.send();
}

function getLinesFromAnAgency(agency_onestop_id, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts) {
    var lines_agency_caller = new XMLHttpRequest();
    lines_agency_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${agency_onestop_id}&limit=700&include_alerts=true`);
    lines_agency_caller.onreadystatechange = function() {
        if (lines_agency_caller.readyState === 4 && lines_agency_caller.status === 200) {
            var lines_agency_receiver = JSON.parse(lines_agency_caller.responseText);
            for (var i = 0; i < lines_agency_receiver.routes.length; i++) {
                var route_long_name = lines_agency_receiver.routes[i].route_long_name;
                var route_color = lines_agency_receiver.routes[i].route_color;
                var route_text_color = lines_agency_receiver.routes[i].route_text_color;
                var route_short_name = lines_agency_receiver.routes[i].route_short_name;

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_long_name === null) {
                    route_long_name = "";
                }

                if (route_color === null) {
                    route_color = "000000";
                }

                if (route_text_color === null) {
                    route_text_color = "FFFFFF";
                }

                document.getElementById(route_name_id).innerHTML = route_short_name;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;
                document.getElementById(route_name_id).style.color = `#${route_text_color}`;
                document.getElementById(route_name_id).style.border = `1px solid #${route_color}`;
                document.getElementById(route_desc_id).innerHTML = route_long_name;

                if (with_alerts) {
                    var all_alerts = lines_agency_receiver.routes[i].alerts.length;
                    if (all_alerts > 0) {
                        document.getElementById("no_of_alerts").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${all_alerts})`;
                    }
                    else {
                        document.getElementById("no_of_alerts").innerHTML = "";
                    }
                }

                var route_entity = document.getElementById(routes_list_entity).cloneNode(true);
                document.getElementById(all_routes_list).appendChild(route_entity);
            };

            var all_routes = document.getElementById(all_routes_list).children;
            document.getElementById(all_routes_list).removeChild(all_routes[0]);
            document.getElementById("nooflines").innerHTML = `<b>${lines_agency_receiver.routes.length}</b>`;
        }
    };
    lines_agency_caller.send();
};

function getLinesFromAnAgencyWithinARouteType(agency_onestop_id, route_type, route_category_num, route_category_num_name, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts, no_of_alerts_id) {
    var lines_agency_caller = new XMLHttpRequest();
    lines_agency_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${agency_onestop_id}&limit=700&route_type=${route_type}&include_alerts=true`);
    lines_agency_caller.onreadystatechange = function() {
        if (lines_agency_caller.readyState === 4 && lines_agency_caller.status === 200) {
            var lines_agency_receiver = JSON.parse(lines_agency_caller.responseText);
            for (var i = 0; i < lines_agency_receiver.routes.length; i++) {
                var route_long_name = lines_agency_receiver.routes[i].route_long_name;
                var route_color = lines_agency_receiver.routes[i].route_color;
                var route_text_color = lines_agency_receiver.routes[i].route_text_color;
                var route_short_name = lines_agency_receiver.routes[i].route_short_name;

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_long_name === null) {
                    route_long_name = "";
                }

                if (route_color === null) {
                    route_color = "000000";
                }

                if (route_text_color === null) {
                    route_text_color = "FFFFFF";
                }

                document.getElementById(route_name_id).innerHTML = route_short_name;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;
                document.getElementById(route_name_id).style.color = `#${route_text_color}`;
                document.getElementById(route_name_id).style.border = `1px solid #${route_color}`;
                document.getElementById(route_desc_id).innerHTML = route_long_name;

                if (with_alerts) {
                    var all_alerts = lines_agency_receiver.routes[i].alerts.length;
                    if (all_alerts > 0) {
                        document.getElementById(no_of_alerts_id).innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${all_alerts})`;
                    }
                    else {
                        document.getElementById(no_of_alerts_id).innerHTML = "";
                    }
                }

                var route_entity = document.getElementById(routes_list_entity).cloneNode(true);
                document.getElementById(all_routes_list).appendChild(route_entity);
            };

            var all_routes = document.getElementById(all_routes_list).children;
            document.getElementById(all_routes_list).removeChild(all_routes[0]);
            document.getElementById(route_category_num).innerHTML = `${lines_agency_receiver.routes.length} (${route_category_num_name})`;
        }
    };
    lines_agency_caller.send();
};

function getDeparturesFromAnAgency(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromAnAgency(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts);
    };
};

function getDeparturesFromAnAgencyWithAMode(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, route_type, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromAnAgencyWithAMode(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id);
    };
}

function getStopForDeparturesFromAnAgency(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].onestop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromAnAgency(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts);
        };
    };
    stopid_agency_caller.send();
};

function getStopForDeparturesFromAnAgencyWithAMode(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&served_by_route_type=${route_type}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].onestop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromAnAgency(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id);
        };
    };
    stopid_agency_caller.send();
}

function getDeparturesForStopFromAnAgency(stop_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id) {
    var departures_caller_agency = new XMLHttpRequest();
    departures_caller_agency.open("GET", `https://transit.land/api/v2/rest/stops/${stop_onestop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    departures_caller_agency.onreadystatechange = function() {
        if (departures_caller_agency.readyState === 4 && departures_caller_agency.status === 200) {
            var departures_receiver_agency = JSON.parse(departures_caller_agency.responseText).stops[0].departures;
            for (var i = 0; i < departures_receiver_agency.length; i++) {
                var route_color = departures_receiver_agency[i].trip.route.route_color;
                var route_text_color = departures_receiver_agency[i].trip.route.route_text_color;
                var route_short_name = departures_receiver_agency[i].trip.route.route_short_name;
                var route_headsign = departures_receiver_agency[i].trip.trip_headsign;
                var departure_time = departures_receiver_agency[i].arrival.estimated;
                var scheduled_time = departures_receiver_agency[i].arrival.scheduled;
                var delayed = departures_receiver_agency[i].arrival.delay / 60;

                switch (departure_time) {
                    case null:
                        document.getElementById(depart_time_ids).innerHTML = `${scheduled_time} (scheduled)`;
                        document.getElementById(depart_time_ids).style.color = "black";
                        break;
                    default:
                        document.getElementById(depart_time_ids).innerHTML = `${departure_time} <span id="delay">()</span>`;
                        document.getElementById(depart_time_ids).style.color = "rgb(10, 161, 45)";

                        switch (delayed) {
                            case null:
                                document.getElementById("delay").innerHTML = "(no data)";
                                document.getElementById("delay").style.color = "black";
                                break;
                            case (delayed > 60):
                                document.getElementById("delay").innerHTML = `(${delayed} min late)`;
                                document.getElementById("delay").style.color = "#db4242";
                                break;
                            case (delayed < 0):
                                document.getElementById("delay").innerHTML = `(${delayed} min early)`;
                                document.getElementById("delay").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay").innerHTML = "(on time)";
                                document.getElementById("delay").style.color = "rgb(10, 161, 45)";
                                break;
                        };
                        break;
                }

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_headsign === null) {
                    var route_long_name = departures_receiver_agency[i].trip.route.route_long_name;
                    route_headsign = route_long_name;
                }

                document.getElementById(lod_ids).innerHTML = route_short_name;
                document.getElementById(lod_ids).style.backgroundColor = `#${route_color}40`;
                document.getElementById(lod_ids).style.color = `#${route_text_color}`;
                document.getElementById(lod_ids).style.border = `1px solid #${route_color}`;
                document.getElementById(hod_ids).innerHTML = route_headsign;

                if (alerts === true) {
                    var all_alerts = departures_receiver_agency[i].trip.route.alerts.length;
                    if (all_alerts > 0) {
                        document.getElementById(aor_id).innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${all_alerts})`;
                    }
                    else {
                        document.getElementById(aor_id).innerHTML = "";
                    }
                }

                var departure_entity = document.getElementById(list_item_of_departures).cloneNode(true);
                document.getElementById(list_of_departures_name).appendChild(departure_entity);
            };

            var all_departures = document.getElementById(list_of_departures_name).children;
            document.getElementById(list_of_departures_name).removeChild(all_departures[0]);
        };
    };

    departures_caller_agency.send();
};

function uniformalClearAlls(list_of_departures_name, original_entities, stopname_name) {
    document.getElementById(list_of_departures_name).innerHTML = original_entities;
    document.getElementById(stopname_name).innerHTML = "---";
}

function loadAlertsWithinAnAgency(onestop_id, alert_desc_id, list_of_alerts_id) {
    var alerts_agency_caller = new XMLHttpRequest();
    alerts_agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    alerts_agency_caller.onreadystatechange = function() {
        if (alerts_agency_caller.readyState === 4 && alerts_agency_caller.status === 200) {
            var alerts_agency_receiver = JSON.parse(alerts_agency_caller.responseText);

            if (alerts_agency_receiver.agencies[0].alerts.length === 0) {
                document.getElementById(alert_desc_id).innerHTML = "No alerts at the moment.";
            }
            else {
                for (var i = 0; i < alerts_agency_receiver.agencies[0].alerts.length; i++) {
                    var desc_for_alert = alerts_agency_receiver.agencies[0].alerts[i].description_text[0].text;
                    var header_for_alert = alerts_agency_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById(alert_desc_id).innerHTML = `<b>${header_for_alert}</b> <br> ${desc_for_alert}`;

                    var alert_entity = document.getElementById(alert_desc_id).cloneNode(true);
                    document.getElementById(list_of_alerts_id).appendChild(alert_entity);
                }

                var all_alerts = document.getElementById(list_of_alerts_id).children;
                document.getElementById(list_of_alerts_id).removeChild(all_alerts[0]);
            }
        }
    }
    alerts_agency_caller.send();
}

var no_route_alerts = 0;
function loadRouteAlertsWithinAnAgency(onestop_id, alert_desc_id, list_of_alerts_id) {
    var route_alerts_agent_caller = new XMLHttpRequest();
    route_alerts_agent_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&include_alerts=true`);
    route_alerts_agent_caller.onreadystatechange = function() {
        if (route_alerts_agent_caller.status === 200 && route_alerts_agent_caller.readyState === 4) {
            var route_alerts_agent_receiver = JSON.parse(route_alerts_agent_caller.responseText);
            for (var i = 0; i < route_alerts_agent_receiver.routes.length; i++) {
                var route_color_affected = route_alerts_agent_receiver.routes[i].route_color;
                var route_text_color_affected = route_alerts_agent_receiver.routes[i].route_text_color;
                var route_short_name_affected = route_alerts_agent_receiver.routes[i].route_short_name;
                
                if (route_alerts_agent_receiver.routes[i].alerts.length === 0) {
                    no_route_alerts += 1;
                }
                else {
                    for (var a = 0; a < route_alerts_agent_receiver.routes[i].alerts.length; a++) {
                        var desc_for_alert = route_alerts_agent_receiver.routes[i].alerts[a].description_text[0].text;
                        var header_for_alert = route_alerts_agent_receiver.routes[i].alerts[a].header_text[0].text;

                        document.getElementById(alert_desc_id).innerHTML = `<p><span id="route_affected" class="styling_for_routes"></span> <br> <b>${header_for_alert}</b> <br> ${desc_for_alert}<p>`;

                        if (route_short_name_affected === null) {
                            route_long_name = route_alerts_agent_receiver.routes[i].route_long_name;
                            route_short_name_affected = route_long_name;
                        }
                        
                        document.getElementById("route_affected").innerHTML = route_short_name_affected;
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                        document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;

                        var alert_entity = document.getElementById(alert_desc_id).cloneNode(true);
                        document.getElementById(list_of_alerts_id).appendChild(alert_entity);
                    }
                }
            }

            if (no_route_alerts === route_alerts_agent_receiver.routes.length) {
                document.getElementById(alert_desc_id).innerHTML = "No alerts at the moment.";
            }
            else {
                var all_alerts = document.getElementById(list_of_alerts_id).children;
                document.getElementById(list_of_alerts_id).removeChild(all_alerts[0]);
            }
        };
    };
    route_alerts_agent_caller.send();
}

function mapConfiguration(lon, lat, zoomin) {
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
        center: [lon, lat],
        zoom: zoomin
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

var geojson_of_routes = [];
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

function plotLinesFromAnAgency(onestop_id, ins_singular_route_type) {
    var plot_lines_caller = new XMLHttpRequest();
    plot_lines_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&include_geometry=true`);
    plot_lines_caller.onreadystatechange = function() {
        if (plot_lines_caller.readyState === 4 && plot_lines_caller.status === 200) {
            var plot_lines_receiver = JSON.parse(plot_lines_caller.responseText);
            for (var i = 0; i < plot_lines_receiver.routes.length; i++) {
                var route_geometry = plot_lines_receiver.routes[i].geometry;
                var route_color = plot_lines_receiver.routes[i].route_color;
                var route_text_color = plot_lines_receiver.routes[i].route_text_color;
                var route_short_name = plot_lines_receiver.routes[i].route_short_name;
                var route_long_name = plot_lines_receiver.routes[i].route_long_name;
                var route_id = plot_lines_receiver.routes[i].route_id;
                var route_type = plot_lines_receiver.routes[i].route_type;

                geojson_of_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_id": route_id,
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

            map.addSource('source_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_routes
                },
                'generateId': true
            });

            if (ins_singular_route_type !== 3) {
                map.addLayer({
                    'id': 'line_routes',
                    'type': 'line',
                    'source': 'source_routes',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 4,
                        'line-color': ['get', 'route_color']
                    }
                });
            }
            else {
                map.addLayer({
                    'id': 'line_routes',
                    'type': 'line',
                    'source': 'source_routes',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 2,
                        'line-color': ['get', 'route_color'],
                    }
                });
            }

            map.moveLayer('line_routes');

            map.on('movestart', () => {
                map.setFilter('line_routes', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir" class="route_radius"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({
                    layers: ['line_routes']
                });

                if (features) {
                    const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                    for (var f=0; f<uniqueFeatures.length; f++) {
                        var name_of_route = uniqueFeatures[f].properties.route_short_name;
                        var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                        var color_of_route = uniqueFeatures[f].properties.route_color;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === undefined) {
                            document.getElementById("route_name_rad").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                        } else {
                            document.getElementById("route_name_rad").innerHTML = name_of_route;
                        }

                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.color = `${text_color_of_route}`;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
                        document.getElementById("route_detail_rad").innerHTML = desc_of_route;

                        var each_route_entity = document.getElementById("rir").cloneNode(true);
                        document.getElementById("range_of_routes").appendChild(each_route_entity);
                    };

                    var all_routes = document.getElementById("range_of_routes").children;
                    document.getElementById("range_of_routes").removeChild(all_routes[0]);
                }
            });

            let routeID_for_agency = [];
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'line_routes', (e) => {
                var fs = map.queryRenderedFeatures(e.point, {
                    layers: ['line_routes']
                });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === null) {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeID_for_agency.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_agency).addTo(map);
                }
            });

            map.on('mouseleave', 'line_routes', () => {
                if (routeID_for_agency.length > 0) {
                    routeID_for_agency = [];
                };
                popup.remove();
            });
        }
    }
    plot_lines_caller.send();
}

function plotLinesWithMultipleModesFromAnAgency(onestop_id, ins_type_one, ins_type_two, ins_type_three) {
    var plot_lines_caller = new XMLHttpRequest();
    plot_lines_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&include_geometry=true`);
    plot_lines_caller.onreadystatechange = function() {
        if (plot_lines_caller.readyState === 4 && plot_lines_caller.status === 200) {
            var plot_lines_receiver = JSON.parse(plot_lines_caller.responseText);
            for (var i = 0; i < plot_lines_receiver.routes.length; i++) {
                var route_geometry = plot_lines_receiver.routes[i].geometry;
                var route_color = plot_lines_receiver.routes[i].route_color;
                var route_text_color = plot_lines_receiver.routes[i].route_text_color;
                var route_short_name = plot_lines_receiver.routes[i].route_short_name;
                var route_long_name = plot_lines_receiver.routes[i].route_long_name;
                var route_id = plot_lines_receiver.routes[i].route_id;
                var route_type = plot_lines_receiver.routes[i].route_type;

                geojson_of_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_id": route_id,
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

            var filtered_one_route = geojson_of_routes.filter((route) => route.properties.route_type === ins_type_one);
            map.addSource('first_source_route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': filtered_one_route
                },
                'generateId': true
            });
            if (ins_type_one === 3) {
                map.addLayer({
                    'id': 'first_line_routes',
                    'type': 'line',
                    'source': 'first_source_route',
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
                            '#c0e7fc'
                        ],
                    }
                });
            }
            else {
                map.addLayer({
                    'id': 'first_line_routes',
                    'type': 'line',
                    'source': 'first_source_route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 4,
                        'line-color': ['get', 'route_color']
                    }
                });
            }
            var filtered_two_route = geojson_of_routes.filter((route) => route.properties.route_type === ins_type_two);
            map.addSource('second_source_route', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': filtered_two_route
                },
                'generateId': true
            });
            if (ins_type_two === 3) {
                map.addLayer({
                    'id': 'second_line_routes',
                    'type': 'line',
                    'source': 'second_source_route',
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
                            '#c0e7fc'
                        ],
                    }
                });
            }
            else {
                map.addLayer({
                    'id': 'second_line_routes',
                    'type': 'line',
                    'source': 'second_source_route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 4,
                        'line-color': ['get', 'route_color']
                    }
                });
            }

            if (ins_type_three !== null) {
                var filtered_three_route = geojson_of_routes.filter((route) => route.properties.route_type === ins_type_three);
                map.addSource('third_source_route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': filtered_three_route
                    },
                    'generateId': true
                });
                if (ins_type_three === 3) {
                    map.addLayer({
                        'id': 'third_line_routes',
                        'type': 'line',
                        'source': 'third_source_route',
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
                                '#c0e7fc'
                            ],
                        }
                    });
                }
                else {
                    map.addLayer({
                        'id': 'third_line_routes',
                        'type': 'line',
                        'source': 'third_source_route',
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-width': 4,
                            'line-color': ['get', 'route_color']
                        }
                    });
                }
            }
            else {
                var filtered_three_route = null;
            }

            map.moveLayer('first_line_routes', 'second_line_routes', 'third_line_routes');

            map.on('movestart', () => {
                map.setFilter('first_line_routes', ['has', 'route_id']);
                map.setFilter('second_line_routes', ['has', 'route_id']);
                map.setFilter('third_line_routes', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir" class="route_radius"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({
                    layers: ['first_line_routes', 'second_line_routes', 'third_line_routes']
                });

                if (features) {
                    const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                    for (var f=0; f<uniqueFeatures.length; f++) {
                        var name_of_route = uniqueFeatures[f].properties.route_short_name;
                        var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                        var color_of_route = uniqueFeatures[f].properties.route_color;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === undefined) {
                            document.getElementById("route_name_rad").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                        } else {
                            document.getElementById("route_name_rad").innerHTML = name_of_route;
                        }

                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.color = `${text_color_of_route}`;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
                        document.getElementById("route_detail_rad").innerHTML = desc_of_route;

                        var each_route_entity = document.getElementById("rir").cloneNode(true);
                        document.getElementById("range_of_routes").appendChild(each_route_entity);
                    };

                    var all_routes = document.getElementById("range_of_routes").children;
                    document.getElementById("range_of_routes").removeChild(all_routes[0]);
                }
            });

            let routeId = [];
            let routeId_bus_only = [];
            let hoverId_for_bus = [];
            let hoveredPolygonLine = null;

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            if (ins_type_one === 3) {
                map.on('mouseenter', 'first_line_routes', (e) => {
                    var fs = map.queryRenderedFeatures(e.point, {
                        layers: ['first_line_routes']
                    });

                    if (fs.length > 0) {
                        for (var f=0; f<fs.length; f++) {
                            var name_of_route = fs[f].properties.route_short_name;
                            routeId_bus_only.push(name_of_route);

                            hoveredPolygonLine = fs[f].id;
                            hoverId_for_bus.push(hoveredPolygonLine);

                            if (hoveredPolygonLine !== null) {
                                map.setFeatureState(
                                    { source: 'first_source_route', id: hoveredPolygonLine },
                                    { hover: false }
                                );
                            }
                            map.setFeatureState(
                                { source: 'first_source_route', id: hoveredPolygonLine },
                                { hover: true }
                            );
                        }

                        popup.setLngLat(e.lngLat.wrap()).setHTML(routeId_bus_only).addTo(map);
                    }
                });

                map.on('mouseleave', 'first_line_routes', () => {
                    if (routeId_bus_only.length > 0) {
                        routeId_bus_only = [];
                    }
                    popup.remove();

                    if (hoveredPolygonLine !== null) {
                        for (var i = 0; i < hoverId_for_bus.length; i++) {
                            map.setFeatureState(
                                { source: 'first_source_route', id: hoverId_for_bus[i] },
                                { hover: false }
                            );
                        }
                    }
                    hoveredPolygonLine = null;
                });
            }
            else {
                map.on('mouseenter', 'first_line_routes', (e) => {
                    var fs = map.queryRenderedFeatures(e.point, {
                        layers: ['first_line_routes']
                    });

                    if (fs.length > 0) {
                        for (var f=0; f<fs.length; f++) {
                            var name_of_route = fs[f].properties.route_short_name;
                            if (name_of_route === null) {
                                name_of_route = fs[f].properties.route_long_name;
                            }
                            routeId.push(name_of_route);
                        }

                        popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                    }
                });

                map.on('mouseleave', 'first_line_routes', () => {
                    if (routeId.length > 0) {
                        routeId = [];
                    }
                    popup.remove();
                });
            }

            if (ins_type_two === 3) {
                map.on('mouseenter', 'second_line_routes', (e) => {
                    var fs2 = map.queryRenderedFeatures(e.point, {
                        layers: ['second_line_routes']
                    });

                    if (fs2.length > 0) {
                        for (var f2=0; f2<fs2.length; f2++) {
                            var name_of_route = fs2[f2].properties.route_short_name;
                            routeId_bus_only.push(name_of_route);

                            hoveredPolygonLine = fs2[f2].id;
                            hoverId_for_bus.push(hoveredPolygonLine);

                            if (hoveredPolygonLine !== null) {
                                map.setFeatureState(
                                    { source: 'second_source_route', id: hoveredPolygonLine },
                                    { hover: false }
                                );
                            }
                            map.setFeatureState(
                                { source: 'second_source_route', id: hoveredPolygonLine },
                                { hover: true }
                            );
                        }

                        popup.setLngLat(e.lngLat.wrap()).setHTML(routeId_bus_only).addTo(map);
                    }
                });

                map.on('mouseleave', 'second_line_routes', () => {
                    if (routeId_bus_only.length > 0) {
                        routeId_bus_only = [];
                    }
                    popup.remove();

                    if (hoveredPolygonLine !== null) {
                        for (var i2 = 0; i2 < hoverId_for_bus.length; i2++) {
                            map.setFeatureState(
                                { source: 'second_source_route', id: hoverId_for_bus[i2] },
                                { hover: false }
                            );
                        }
                    }
                    hoveredPolygonLine = null;
                });
            }
            else {
                map.on('mouseenter', 'second_line_routes', (e) => {
                    var fs2 = map.queryRenderedFeatures(e.point, {
                        layers: ['second_line_routes']
                    });

                    if (fs2.length > 0) {
                        for (var f2=0; f2<fs2.length; f2++) {
                            var name_of_route = fs2[f2].properties.route_short_name;
                            if (name_of_route === null) {
                                name_of_route = fs2[f2].properties.route_long_name;
                            }
                            routeId.push(name_of_route);
                        }

                        popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                    }
                });

                map.on('mouseleave', 'second_line_routes', () => {
                    if (routeId.length > 0) {
                        routeId = [];
                    }
                    popup.remove();
                });
            }

            if (ins_type_three !== null) {
                if (ins_type_three === 3) {
                    map.on('mouseenter', 'third_line_routes', function(e) {
                        var fs3 = map.queryRenderedFeatures(e.point, {
                            layers: ['third_line_routes']
                        });

                        if (fs3.length > 0) {
                            for (var f3=0; f3<fs3.length; f3++) {
                                var name_of_route = fs3[f3].properties.route_short_name;
                                routeId_bus_only.push(name_of_route);

                                hoveredPolygonLine = fs3[f3].id;
                                hoverId_for_bus.push(hoveredPolygonLine);

                                if (hoveredPolygonLine !== null) {
                                    map.setFeatureState(
                                        { source: 'third_source_route', id: hoveredPolygonLine },
                                        { hover: false }
                                    );
                                }
                                map.setFeatureState(
                                    { source: 'third_source_route', id: hoveredPolygonLine },
                                    { hover: true }
                                );
                            }

                            popup.setLngLat(e.lngLat.wrap()).setHTML(routeId_bus_only).addTo(map);
                        }
                    });

                    map.on('mouseleave', 'third_line_routes', () => {
                        if (routeId_bus_only.length > 0) {
                            routeId_bus_only = [];
                        }
                        popup.remove();

                        if (hoveredPolygonLine !== null) {
                            for (var i3 = 0; i3 < hoverId_for_bus.length; i3++) {
                                map.setFeatureState(
                                    { source: 'third_source_route', id: hoverId_for_bus[i3] },
                                    { hover: false }
                                );
                            }
                        }
                        hoveredPolygonLine = null;
                    });
                }
                else {
                    map.on('mouseenter', 'third_line_routes', (e) => {
                        var fs3 = map.queryRenderedFeatures(e.point, {
                            layers: ['third_line_routes']
                        });

                        if (fs3.length > 0) {
                            for (var f3=0; f3<fs3.length; f3++) {
                                var name_of_route = fs3[f3].properties.route_short_name;
                                if (name_of_route === null) {
                                    name_of_route = fs3[f3].properties.route_long_name;
                                }
                                routeId.push(name_of_route);
                            }

                            popup.setLngLat(e.lngLat.wrap()).setHTML(routeId).addTo(map);
                        }
                    });

                    map.on('mouseleave', 'third_line_routes', () => {
                        if (routeId.length > 0) {
                            routeId = [];
                        }
                        popup.remove();
                    }
                )};
            }
        }
    }
    plot_lines_caller.send();
}