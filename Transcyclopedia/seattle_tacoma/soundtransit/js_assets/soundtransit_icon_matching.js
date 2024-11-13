var icon_correlations = {
    "1 Line": 'img_assets/st_one_line.svg',
    "2 Line": 'img_assets/st_two_line.svg',
    "3 Line": 'img_assets/st_three_line.svg',
    "4 Line": 'img_assets/st_four_line.svg',
    'N Line': 'img_assets/st_n_line.svg',
    'S Line': 'img_assets/st_s_line.svg',
    'T Line': 'img_assets/st_t_line.svg',
}

function loadSTRoutesByImage(onestop_id, route_type, route_category_num, route_category_num_name, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts, no_of_alerts_id) {
    var st_route_caller = new XMLHttpRequest();
    st_route_caller.open('GET', `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=${route_type}&include_alerts=true`);
    st_route_caller.onreadystatechange = function() {
        if (st_route_caller.readyState === 4 && st_route_caller.status === 200) {
            var st_route_receiver = JSON.parse(st_route_caller.responseText).routes;
            for (var i = 0; i < st_route_receiver.length; i++) {
                var route_short_name = st_route_receiver[i].route_short_name;
                var route_long_name = st_route_receiver[i].route_long_name;
                var route_color = st_route_receiver[i].route_color;
                var route_text_color = st_route_receiver[i].route_text_color;

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

                document.getElementById(route_name_id).innerHTML = `<img src="${icon_correlations[route_short_name]}" style="width: 20px; height: 20px;">`;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;
                document.getElementById(route_name_id).style.color = `#${route_text_color}`;
                document.getElementById(route_name_id).style.border = `1px solid #${route_color}`;
                document.getElementById(route_desc_id).innerHTML = route_long_name;

                if (with_alerts) {
                    var all_alerts = st_route_receiver[i].alerts.length;
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
            document.getElementById(route_category_num).innerHTML = `${st_route_receiver.length} (${route_category_num_name})`;
        }
    };

    st_route_caller.send();
}

function getDeparturesFromAnAgencyWithAModeST(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, route_type, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromAnAgencyWithAModeST(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id);
    };
}

function getStopForDeparturesFromAnAgencyWithAModeST(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&served_by_route_type=${route_type}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].onestop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromAnAgencyWithAModeST(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id);
        };
    };
    stopid_agency_caller.send();
}

function getStopForDeparturesFromAnAgencyWithAModeST(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, route_type, alerts, aor_id) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&served_by_route_type=${route_type}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].onestop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromAnAgencyST(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id);
        };
    };
    stopid_agency_caller.send();
}

function getDeparturesForStopFromAnAgencyST(stop_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id) {
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

                document.getElementById(lod_ids).innerHTML = `<img src="${icon_correlations[route_short_name]}" style="width: 20px; height: 20px;">`;
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

var no_of_alerts = 0;
function loadRouteAlertsWithinAnAgencyST(onestop_id, alert_desc_id, list_of_alerts_id) {
    var st_route_alerts_caller = new XMLHttpRequest();
    st_route_alerts_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&include_alerts=true`);
    st_route_alerts_caller.onreadystatechange = function() {
        if (st_route_alerts_caller.readyState === 4 && st_route_alerts_caller.status === 200) {
            var st_route_alerts_receiver = JSON.parse(st_route_alerts_caller.responseText).routes;
            for (var i = 0; i < st_route_alerts_receiver.length; i++) {
                var route_color_affected = st_route_alerts_receiver[i].route_color;
                var route_text_color_affected = st_route_alerts_receiver[i].route_text_color;
                var route_short_name_affected = st_route_alerts_receiver[i].route_short_name;
                var route_type = st_route_alerts_receiver[i].route_type;

                if (route_short_name_affected === null) {
                    route_short_name_affected = st_route_alerts_receiver[i].route_long_name;
                }

                var route_alerts = st_route_alerts_receiver[i].alerts;
                if (route_alerts.length === 0) {
                    no_of_alerts += 1;
                }
                else {
                    for (var j = 0; j < route_alerts.length; j++) {
                        var alert_description = route_alerts[j].description_text[0].text;
                        var alert_header = route_alerts[j].header_text[0].text;
                        
                        document.getElementById(alert_desc_id).innerHTML = `<p><span id="route_affected" class="styling_for_routes"></span> <b>${alert_header}</b> <br> ${alert_description}<p>`;
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;
                        document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;

                        if (route_type === 0 || route_type === 2) {
                            document.getElementById("route_affected").classList.add("symbol_tagged");
                            document.getElementById("route_affected").innerHTML = `<img src="${icon_correlations[route_short_name_affected]}" style="width: 20px; height: 20px;">`;
                        }
                        else {
                            document.getElementById("route_affected").classList.remove("symbol_tagged");
                            document.getElementById("route_affected").innerHTML = route_short_name_affected;
                        }

                        var alert_entity = document.getElementById(alert_desc_id).cloneNode(true);
                        document.getElementById(list_of_alerts_id).appendChild(alert_entity);
                    }
                }
            }

            if (no_of_alerts === st_route_alerts_receiver.length) {
                document.getElementById(alert_desc_id).innerHTML = "<p>No alerts at the moment.</p>";
            }
            else {
                var all_alerts = document.getElementById(list_of_alerts_id).children;
                document.getElementById(list_of_alerts_id).removeChild(all_alerts[0]);
            }
        }
    };
    st_route_alerts_caller.send();
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

function plotLinesWithMultipleModesFromAnAgencyST(onestop_id, ins_type_one, ins_type_two, ins_type_three) {
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
                    <li id="rir" class="route_radius flexer"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Loading...</span></li>
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
                        var type_of_route = uniqueFeatures[f].properties.route_type;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === null) {
                            document.getElementById("route_name_rad").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                        } else {
                            if (type_of_route !== 3) {
                                document.getElementById("route_name_rad").classList.add("symbol_tagged");
                                document.getElementById("route_name_rad").innerHTML = `<img src="${icon_correlations[name_of_route]}" style="width: 20px; height: 20px;">`;
                            }
                            else {
                                document.getElementById("route_name_rad").classList.remove("symbol_tagged");
                                document.getElementById("route_name_rad").innerHTML = name_of_route;
                            }
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