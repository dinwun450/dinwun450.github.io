var geojson_of_routes = [];

// Lines
function getLinesFromAnAgencyWithinARouteTypeL(agency_onestop_id, route_type, route_category_num, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts, no_of_alerts_id) {
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

                document.getElementById(route_name_id).innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted">`;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;

                if (route_text_color === "000000") {
                    document.getElementById(route_name_id).innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                }

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
            document.getElementById(route_category_num).innerHTML = `<b>${lines_agency_receiver.routes.length}</b>`;
        }
    };
    lines_agency_caller.send();
};


// Departures
function getDeparturesFromAnAgencyWithTheL(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, route_type, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromAnAgencyWithTheL(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id);
    };
}

function getStopForDeparturesFromAnAgencyWithTheL(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&served_by_route_type=${route_type}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].stop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromTheL(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id);
        };
    };
    stopid_agency_caller.send();
}

function getDeparturesForStopFromTheL(stop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id) {
    var departures_caller_agency = new XMLHttpRequest();
    departures_caller_agency.open("GET", `https://transit.land/api/v2/rest/stops/f-dp3-cta:${stop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    departures_caller_agency.onreadystatechange = function() {
        if (departures_caller_agency.readyState === 4 && departures_caller_agency.status === 200) {
            var departures_receiver_agency = JSON.parse(departures_caller_agency.responseText).stops[0].departures;
            console.log(departures_receiver_agency);
            for (var i = 0; i < departures_receiver_agency.length; i++) {
                var route_color = departures_receiver_agency[i].trip.route.route_color;
                var route_text_color = departures_receiver_agency[i].trip.route.route_text_color;
                var route_headsign = departures_receiver_agency[i].stop_headsign;
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

                if (route_headsign === null) {
                    var route_long_name = departures_receiver_agency[i].trip.route.route_long_name;
                    route_headsign = route_long_name;
                }

                document.getElementById(lod_ids).innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted">`;
                document.getElementById(lod_ids).style.backgroundColor = `#${route_color}40`;
                
                if (route_text_color === "000000") {
                    document.getElementById(lod_ids).innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                }

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


// Alerts
var no_alerts = 0;
function loadRouteAlertsWithinTheL(onestop_id, alert_desc_id, list_of_alerts_id) {
    var l_route_alerts_caller = new XMLHttpRequest();
    l_route_alerts_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=1&include_alerts=true`);
    l_route_alerts_caller.onreadystatechange = function() {
        if (l_route_alerts_caller.readyState === 4 && l_route_alerts_caller.status === 200) {
            var l_route_alerts_receiver = JSON.parse(l_route_alerts_caller.responseText).routes;
            for (var i = 0; i < l_route_alerts_receiver.length; i++) {
                var route_color_affected = l_route_alerts_receiver[i].route_color;
                var route_text_color_affected = l_route_alerts_receiver[i].route_text_color;
                var route_alerts = l_route_alerts_receiver[i].alerts;

                if (route_alerts.length === 0) {
                    no_alerts += 1;
                }
                else {
                    for (var j = 0; j < route_alerts.length; j++) {
                        var alert_description = route_alerts[j].description_text[0].text;
                        var alert_header = route_alerts[j].header_text[0].text;
                        
                        document.getElementById(alert_desc_id).innerHTML = `<p><span id="route_affected" class="styling_for_routes"></span> <b>${alert_header}</b> <br> ${alert_description}<p>`;
                        document.getElementById("route_affected").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted">`;
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;
                        
                        if (route_text_color_affected === "000000") {
                            document.getElementById("route_affected").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                        }

                        var alert_entity = document.getElementById(alert_desc_id).cloneNode(true);
                        document.getElementById(list_of_alerts_id).appendChild(alert_entity);
                    }
                }
            }

            if (no_alerts === l_route_alerts_receiver.length) {
                document.getElementById(alert_desc_id).innerHTML = "<p>No alerts at the moment.</p>";
            }
            else {
                var all_alerts = document.getElementById(list_of_alerts_id).children;
                document.getElementById(list_of_alerts_id).removeChild(all_alerts[0]);
            }
        }
    };

    l_route_alerts_caller.send();
}


// Map
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

function plotLinesWithMultipleModesFromTheL(onestop_id) {
    var l_route_map_caller = new XMLHttpRequest();
    l_route_map_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=1&include_geometry=true`);
    l_route_map_caller.onreadystatechange = function() {
        if (l_route_map_caller.readyState === 4 && l_route_map_caller.status === 200) {
            var l_route_map_receiver = JSON.parse(l_route_map_caller.responseText);
            for (var i = 0; i < l_route_map_receiver.routes.length; i++) {
                var route_geometry = l_route_map_receiver.routes[i].geometry;
                var route_color = l_route_map_receiver.routes[i].route_color;
                var route_text_color = l_route_map_receiver.routes[i].route_text_color;
                var route_long_name = l_route_map_receiver.routes[i].route_long_name;
                var route_id = l_route_map_receiver.routes[i].route_id;

                geojson_of_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_color": `#${route_color}`,
                        "route_text_color": `#${route_text_color}`,
                        "route_long_name": route_long_name,
                        "route_id": route_id
                    },
                    "geometry": route_geometry
                });
            }

            map.addSource('source_of_l_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'layer_of_l_routes',
                'type': 'line',
                'source': 'source_of_l_routes',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 4
                }
            });

            map.moveLayer('layer_of_l_routes');

            map.on('movestart', () => {
                map.setFilter('layer_of_l_routes', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes symbol_tagged"><img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted"></span> <span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({
                    layers: ['layer_of_l_routes']
                });

                if (features) {
                    const unique_features = getUniqueFeatures(features, 'route_id');

                    for (var f = 0; f < unique_features.length; f++) {
                        var desc_of_route = unique_features[f].properties.route_long_name;
                        var color_of_route = unique_features[f].properties.route_color;
                        var text_color_of_route = unique_features[f].properties.route_text_color;

                        document.getElementById("route_name_rad").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted">`;
                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
                        if (text_color_of_route === "#000000") {
                            document.getElementById("route_name_rad").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                        }
                        document.getElementById("route_detail_rad").innerHTML = desc_of_route;

                        var route_entity = document.getElementById("rir").cloneNode(true);
                        document.getElementById("range_of_routes").appendChild(route_entity);
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

            map.on('mouseenter', 'layer_of_l_routes', (e) => {
                var fs = map.queryRenderedFeatures(e.point, {
                    layers: ['layer_of_l_routes']
                });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_long_name;
                        routeID_for_agency.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_agency).addTo(map);
                }
            });

            map.on('mouseleave', 'layer_of_l_routes', () => {
                if (routeID_for_agency.length > 0) {
                    routeID_for_agency = [];
                };
                popup.remove();
            });
        }
    }
    l_route_map_caller.send();
}