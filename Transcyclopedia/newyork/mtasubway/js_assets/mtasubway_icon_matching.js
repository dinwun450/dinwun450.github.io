var geojson_of_routes = [];
var list_of_mta_subway_lines_to_match = {
    "1": "img_assets/mta_1.svg",
    "2": "img_assets/mta_2.svg",
    "3": "img_assets/mta_3.svg",
    "4": "img_assets/mta_4.svg",
    "5": "img_assets/mta_5.svg",
    "5X": "img_assets/mta_5x.svg",
    "6": "img_assets/mta_6.svg",
    "6X": "img_assets/mta_6x.svg",
    "7": "img_assets/mta_7.svg",
    "7X": "img_assets/mta_7x.svg",
    "A": "img_assets/mta_a.svg",
    "B": "img_assets/mta_b.svg",
    "C": "img_assets/mta_c.svg",
    "D": "img_assets/mta_d.svg",
    "E": "img_assets/mta_e.svg",
    "F": "img_assets/mta_f.svg",
    "FX": "img_assets/mta_fx.svg",
    "G": "img_assets/mta_g.svg",
    "J": "img_assets/mta_j.svg",
    "L": "img_assets/mta_l.svg",
    "M": "img_assets/mta_m.svg",
    "N": "img_assets/mta_n.svg",
    "Q": "img_assets/mta_q.svg",
    "R": "img_assets/mta_r.svg",
    "GS": "img_assets/mta_s.svg",
    "FS": "img_assets/mta_sf.svg",
    "H": "img_assets/mta_sr.svg",
    "W": "img_assets/mta_w.svg",
    "Z": "img_assets/mta_z.svg"
}

// Lines
function getLinesFromMTASubway(agency_onestop_id, route_type, route_category_num, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts, no_of_alerts_id) {
    var lines_agency_caller = new XMLHttpRequest();
    lines_agency_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${agency_onestop_id}&limit=700&route_type=${route_type}&include_alerts=true`);
    lines_agency_caller.onreadystatechange = function () {
        if (lines_agency_caller.readyState === 4 && lines_agency_caller.status === 200) {
            var lines_agency_receiver = JSON.parse(lines_agency_caller.responseText);
            console.log(lines_agency_receiver);

            for (var i = 0; i < lines_agency_receiver.routes.length; i++) {
                var route_short_name = lines_agency_receiver.routes[i].route_id;
                var route_long_name = lines_agency_receiver.routes[i].route_long_name;
                var route_color = lines_agency_receiver.routes[i].route_color;

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_long_name === null) {
                    route_long_name = "";
                }

                if (route_color === null) {
                    route_color = "000000";
                }

                document.getElementById(route_name_id).innerHTML = `<img src="${list_of_mta_subway_lines_to_match[route_short_name]}" style="width: 20px; height: 20px;">`;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;
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
function getDeparturesFromMTASubway(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, route_type, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromMTASubway(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id);
    };
}

function getStopForDeparturesFromMTASubway(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&served_by_route_type=${route_type}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].stop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromMTASubway(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id);
        };
    };
    stopid_agency_caller.send();
}

function getDeparturesForStopFromMTASubway(stop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id) {
    var departures_caller_agency = new XMLHttpRequest();
    departures_caller_agency.open("GET", `https://transit.land/api/v2/rest/stops/f-dr5r-nyctsubway:${stop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    departures_caller_agency.onreadystatechange = function() {
        if (departures_caller_agency.readyState === 4 && departures_caller_agency.status === 200) {
            var departures_receiver_agency = JSON.parse(departures_caller_agency.responseText).stops[0].departures;
            console.log(departures_receiver_agency);
            for (var i = 0; i < departures_receiver_agency.length; i++) {
                var route_color = departures_receiver_agency[i].trip.route.route_color;
                var route_short_name = departures_receiver_agency[i].trip.route.route_short_name;
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

                document.getElementById(lod_ids).innerHTML = `<img src="${list_of_mta_subway_lines_to_match[route_short_name]}" style="width: 20px; height: 20px;">`;
                document.getElementById(lod_ids).style.backgroundColor = `#${route_color}40`;
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

function plotLinesFromMTASubway(onestop_id) {
    var mtasubway_map_caller = new XMLHttpRequest();
    mtasubway_map_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=1&include_geometry=true`);
    mtasubway_map_caller.onreadystatechange = function() {
        if (mtasubway_map_caller.readyState === 4 && mtasubway_map_caller.status === 200) {
            var mtasubway_map_receiver = JSON.parse(mtasubway_map_caller.responseText);
            for (var i=0; i<mtasubway_map_receiver.routes.length; i++) {
                var route_geometry = mtasubway_map_receiver.routes[i].geometry;
                var route_color = mtasubway_map_receiver.routes[i].route_color;
                var route_short_name = mtasubway_map_receiver.routes[i].route_short_name;
                var route_long_name = mtasubway_map_receiver.routes[i].route_long_name;
                var route_id = mtasubway_map_receiver.routes[i].route_id;

                geojson_of_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_color": `#${route_color}`,
                        "route_short_name": route_short_name,
                        "route_long_name": route_long_name,
                        "route_id": route_id
                    },
                    "geometry": route_geometry
                });
            }

            map.addSource('source_mtasubway', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_routes
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'layer_mtasubway',
                'type': 'line',
                'source': 'source_mtasubway',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 4
                }
            });

            map.moveLayer('layer_mtasubway');

            map.on('movestart', () => {
                map.setFilter('layer_mtasubway', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes symbol_tagged">-</span> <span id="route_detail_rad">Drag the map to filter nearby routes.</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({ 
                    layers: ['layer_mtasubway'],
                });

                if (features) {
                    const unique_features = getUniqueFeatures(features, 'route_id');

                    for (var f = 0; f < unique_features.length; f++) {
                        var name_of_route = unique_features[f].properties.route_id;
                        var desc_of_route = unique_features[f].properties.route_long_name;
                        var color_of_route = unique_features[f].properties.route_color;

                        if (color_of_route === "#null") {
                            color_of_route = "#000000";
                        }
    
                        document.getElementById("route_name_rad").innerHTML = `<img src="${list_of_mta_subway_lines_to_match[name_of_route]}" style="width: 20px; height: 20px;">`;
                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
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

            map.on('mouseenter', 'layer_mtasubway', (e) => {
                var fs = map.queryRenderedFeatures(e.point, {
                    layers: ['layer_mtasubway']
                });

                if (fs.length > 0) {
                    for (var f = 0; f < fs.length; f++) {
                        var name_of_route = fs[f].properties.route_id;
                        routeID_for_agency.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_agency).addTo(map);
                }
            });

            map.on('mouseleave', 'layer_mtasubway', () => {
                if (routeID_for_agency.length > 0) {
                    routeID_for_agency = [];
                }

                popup.remove();
            });
        }
    }
    mtasubway_map_caller.send();
}