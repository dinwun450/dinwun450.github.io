var geojson_of_mts_routes = []

function loadMTSWikipedia() {
    var mts_info_caller = new XMLHttpRequest();
    mts_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=San_Diego_Metropolitan_Transit_System&format=json&origin=*");
    mts_info_caller.onreadystatechange = function() {
        if (mts_info_caller.readyState === 4 && mts_info_caller.status === 200) {
            var mts_info_receiver = JSON.parse(mts_info_caller.responseText);
            var info_extracted = mts_info_receiver.query.pages[7670893].extract;
            document.getElementById("desc").innerHTML = `${info_extracted} <br> <a href="https://en.wikipedia.org/wiki/San_Diego_Metropolitan_Transit_System">Wikipedia</a>`;
        }
    }
    mts_info_caller.send();
}
loadMTSWikipedia();

function getMTSContacts() {
    var mts_contacts_caller = new XMLHttpRequest();
    mts_contacts_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-mts");
    mts_contacts_caller.onreadystatechange = function() {
        if (mts_contacts_caller.readyState === 4 && mts_contacts_caller.status === 200) {
            var mts_contacts_receiver = JSON.parse(mts_contacts_caller.responseText);
            var phone_no = mts_contacts_receiver.agencies[0].agency_phone;
            var email = mts_contacts_receiver.agencies[0].agency_email;

            if (email === "") {
                email = "-";
            }
            if (phone_no === "") {
                phone_no = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
        }
    }
    mts_contacts_caller.send();
}
getMTSContacts();

function loadMTSTrolley() {
    var route_trolley_caller = new XMLHttpRequest();
    route_trolley_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=0&include_alerts=true");
    route_trolley_caller.onreadystatechange = function() {
        if (route_trolley_caller.readyState === 4 && route_trolley_caller.status === 200) {
            var route_trolley_receiver = JSON.parse(route_trolley_caller.responseText);
            var all_trolley_routes = route_trolley_receiver.routes.length;

            for (var i=0; i<all_trolley_routes; i++) {
                var route_short_name = route_trolley_receiver.routes[i].route_short_name;
                var route_color = route_trolley_receiver.routes[i].route_color;
                var route_long_name = route_trolley_receiver.routes[i].route_long_name;
                var route_text_color = route_trolley_receiver.routes[i].route_text_color;

                if (route_short_name === "") {
                    document.getElementById("route_name_trolley").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                } else {
                    document.getElementById("route_name_trolley").innerHTML = route_short_name;
                }

                document.getElementById("route_name_trolley").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_trolley").style.color = `#${route_text_color}`;
                document.getElementById("route_name_trolley").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_trolley").innerHTML = route_long_name;

                if (route_trolley_receiver.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_trolley").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_trolley").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_trolley_receiver.routes[i].alerts.length})`;
                }

                var each_trolley_route = document.getElementById("route_item_trolley").cloneNode(true);
                document.querySelector(".mts_trolley").appendChild(each_trolley_route);
            }

            var all_routes = document.querySelector(".mts_trolley").children;
            document.querySelector(".mts_trolley").removeChild(all_routes[0]);
            document.getElementById("trolley_routes").innerHTML = `${all_trolley_routes} Trolley`;
        }
    }
    route_trolley_caller.send();
}
loadMTSTrolley();

function loadMTSBus() {
    var route_bus_caller = new XMLHttpRequest();
    route_bus_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=3&include_alerts=true");
    route_bus_caller.onreadystatechange = function() {
        if (route_bus_caller.readyState === 4 && route_bus_caller.status === 200) {
            var route_bus_receiver = JSON.parse(route_bus_caller.responseText);
            var all_bus_routes = route_bus_receiver.routes.length;

            for (var i=0; i<all_bus_routes; i++) {
                var route_short_name = route_bus_receiver.routes[i].route_short_name;
                var route_color = route_bus_receiver.routes[i].route_color;
                var route_long_name = route_bus_receiver.routes[i].route_long_name;
                var route_text_color = route_bus_receiver.routes[i].route_text_color;

                if (route_short_name === "") {
                    document.getElementById("route_name_bus").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                } else {
                    document.getElementById("route_name_bus").innerHTML = route_short_name;
                }

                document.getElementById("route_name_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_bus").innerHTML = route_long_name;

                if (route_bus_receiver.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_bus").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_bus_receiver.routes[i].alerts.length})`;
                }

                var each_bus_route = document.getElementById("route_item_bus").cloneNode(true);
                document.querySelector(".mts_bus").appendChild(each_bus_route);
            }

            var all_routes = document.querySelector(".mts_bus").children;
            document.querySelector(".mts_bus").removeChild(all_routes[0]);
            document.getElementById("bus_routes").innerHTML = `${all_bus_routes} Bus`;
        }
    }
    route_bus_caller.send();
}
loadMTSBus();

function loadMTSCoronado() {
    var coronado_caller = new XMLHttpRequest();
    coronado_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=4&include_alerts=true");
    coronado_caller.onreadystatechange = function() {
        if (coronado_caller.readyState === 4 && coronado_caller.status === 200) {
            var coronado_receiver = JSON.parse(coronado_caller.responseText);
            var route_short_name = coronado_receiver.routes[0].route_short_name;
            var route_color = coronado_receiver.routes[0].route_color;
            var route_long_name = coronado_receiver.routes[0].route_long_name;
            var route_text_color = coronado_receiver.routes[0].route_text_color;

            if (route_short_name === "") {
                document.getElementById("route_name_coronado").innerHTML = `&nbsp;&nbsp;&nbsp;`;
            } else {
                document.getElementById("route_name_coronado").innerHTML = route_short_name;
            }

            document.getElementById("route_name_coronado").style.backgroundColor = `#${route_color}40`;
            document.getElementById("route_name_coronado").style.color = `#${route_text_color}`;
            document.getElementById("route_name_coronado").style.border = `1px solid #${route_color}`;
            document.getElementById("route_desc_coronado").innerHTML = route_long_name;

            if (coronado_receiver.routes[0].alerts.length === 0) {
                document.getElementById("no_of_alerts_coronado").innerHTML = "";
            }
            else {
                document.getElementById("no_of_alerts_coronado").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${coronado_receiver.routes[0].alerts.length})`;
            }
        }
    }
    coronado_caller.send();
}
loadMTSCoronado();

function keyDownBus(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById("list_of_departures_bus").innerHTML = `
            <li id="line_for_departure_bus"><div id="lod_bus">-</div> <span id="aor_bus"></span> <span id="hod_bus">(None)</span> <span id="depart_time_bus">Loading...</span></li>
        `;
        document.getElementById("stopname").innerHTML = "---";
        getBusStop();
    }
}

function getBusStop() {
    var stop_id_bus = document.getElementById("stopgetter").value;
    var bus_stop_caller = new XMLHttpRequest();
    bus_stop_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9mu-mts&served_by_route_type=3&stop_id=${stop_id_bus}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    bus_stop_caller.onreadystatechange = function() {
        if (bus_stop_caller.readyState === 4 && bus_stop_caller.status === 200) {
            var bus_stop_receiver = JSON.parse(bus_stop_caller.responseText);
            var stop_name = bus_stop_receiver.stops[0].stop_name;
            var stop_onestop_id = bus_stop_receiver.stops[0].onestop_id;

            document.getElementById("stopname").innerHTML = stop_name;
            getBusDepartures(stop_onestop_id);
        }
    }
    bus_stop_caller.send();
}

function getBusDepartures(stop_id) {
    var bus_departure_caller = new XMLHttpRequest();
    bus_departure_caller.open("GET", `https://transit.land/api/v2/rest/stops/${stop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    bus_departure_caller.onreadystatechange = function() {
        if (bus_departure_caller.readyState === 4 && bus_departure_caller.status === 200) {
            var bus_departure_receiver = JSON.parse(bus_departure_caller.responseText);

            for (var i=0; i<bus_departure_receiver.stops[0].departures.length; i++) {
                var route_color = bus_departure_receiver.stops[0].departures[i].trip.route.route_color;
                var route_short_name = bus_departure_receiver.stops[0].departures[i].trip.route.route_short_name;
                var route_text_color = bus_departure_receiver.stops[0].departures[i].trip.route.route_text_color;
                var route_headsign = bus_departure_receiver.stops[0].departures[i].trip.trip_headsign;
                var departure_time = bus_departure_receiver.stops[0].departures[i].arrival.estimated;
                var scheduled_time = bus_departure_receiver.stops[0].departures[i].arrival.scheduled;
                var delayed = bus_departure_receiver.stops[0].departures[i].arrival.delay / 60;
                var alerts_bus = bus_departure_receiver.stops[0].departures[i].trip.alerts.length;

                switch (departure_time) {
                    case null:
                        document.getElementById("depart_time_bus").innerHTML = `${scheduled_time} (scheduled)`;
                        document.getElementById("depart_time_bus").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_bus").innerHTML = `${departure_time} <span id="delay_bus">()</span>`;
                        document.getElementById("depart_time_bus").style.color = "rgb(10, 161, 45)";

                        switch (delayed) {
                            case null:
                                document.getElementById("delay_bus").innerHTML = "(no data)";
                                document.getElementById("delay_bus").style.color = "black";
                                break;
                            case (delayed > 60):
                                document.getElementById("delay_bus").innerHTML = `(${delayed} min late)`;
                                document.getElementById("delay_bus").style.color = "#db4242";
                                break;
                            case (delayed < 0):
                                document.getElementById("delay_bus").innerHTML = `(${delayed} min early)`;
                                document.getElementById("delay_bus").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_bus").innerHTML = `(on time)`;
                                document.getElementById("delay_bus").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (alerts_bus === 0) {
                    document.getElementById("aor_bus").innerHTML = "";
                } else {
                    document.getElementById("aor_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${alerts_bus})`;
                }

                document.getElementById("lod_bus").innerHTML = route_short_name;
                document.getElementById("lod_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_bus").style.color = `#${route_text_color}`;
                document.getElementById("lod_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_bus").innerHTML = route_headsign;

                var departure_bus_entity = document.getElementById("line_for_departure_bus").cloneNode(true);
                document.getElementById("list_of_departures_bus").appendChild(departure_bus_entity);
            }

            var all_bus_departures = document.getElementById("list_of_departures_bus").children;
            document.getElementById("list_of_departures_bus").removeChild(all_bus_departures[0]);
        }
    }
    bus_departure_caller.send();
}

function clearAllBus() {
    document.getElementById("list_of_departures_bus").innerHTML = `
        <li id="line_for_departure_bus"><div id="lod_bus">-</div> <span id="aor_bus"></span> <span id="hod_bus">(None)</span> <span id="depart_time_bus">Enter a station by their station ID</span></li>
    `;
    document.getElementById("stopname").innerHTML = "---";
}

function keyDownCoronado(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById("list_of_departures_coronado").innerHTML = `
            <li id="line_for_departure_coronado"><div id="lod_coronado">-</div> <span id="aor_coronado"></span> <span id="hod_coronado">(None)</span> <span id="depart_time_coronado">Loading...</span></li>
        `;
        document.getElementById("terminalname").innerHTML = "---";
        getCoronadoTerminal();
    }
}

function getCoronadoTerminal() {
    var terminal_id_coronado = document.getElementById("terminalgetter").value;
    var coronado_terminal_caller = new XMLHttpRequest();
    coronado_terminal_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9mu-mts&served_by_route_type=4&stop_id=${terminal_id_coronado}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    coronado_terminal_caller.onreadystatechange = function() {
        if (coronado_terminal_caller.readyState === 4 && coronado_terminal_caller.status === 200) {
            var coronado_terminal_receiver = JSON.parse(coronado_terminal_caller.responseText);
            var terminal_name = coronado_terminal_receiver.stops[0].stop_name;
            var terminal_onestop_id = coronado_terminal_receiver.stops[0].onestop_id;

            document.getElementById("terminalname").innerHTML = terminal_name;
            getCoronadoDepartures(terminal_onestop_id);
        }
    }
    coronado_terminal_caller.send();
}

function getCoronadoDepartures(terminal_id) {
    var coronado_departure_caller = new XMLHttpRequest();
    coronado_departure_caller.open("GET", `https://transit.land/api/v2/rest/stops/${terminal_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    coronado_departure_caller.onreadystatechange = function() {
        if (coronado_departure_caller.readyState === 4 && coronado_departure_caller.status === 200) {
            var coronado_departure_receiver = JSON.parse(coronado_departure_caller.responseText);

            for (var i=0; i<coronado_departure_receiver.stops[0].departures.length; i++) {
                var route_color = coronado_departure_receiver.stops[0].departures[i].trip.route.route_color;
                var route_text_color = coronado_departure_receiver.stops[0].departures[i].trip.route.route_text_color;
                var route_headsign = coronado_departure_receiver.stops[0].departures[i].trip.trip_headsign;
                var departure_time = coronado_departure_receiver.stops[0].departures[i].arrival.estimated;
                var scheduled_time = coronado_departure_receiver.stops[0].departures[i].arrival.scheduled;
                var delayed = coronado_departure_receiver.stops[0].departures[i].arrival.delay / 60;
                var alerts_coronado = coronado_departure_receiver.stops[0].departures[i].trip.alerts.length;

                switch (departure_time) {
                    case null:
                        document.getElementById("depart_time_coronado").innerHTML = `${scheduled_time} (scheduled)`;
                        document.getElementById("depart_time_coronado").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_coronado").innerHTML = `${departure_time} <span id="delay_coronado">()</span>`;
                        document.getElementById("depart_time_coronado").style.color = "rgb(10, 161, 45)";

                        switch (delayed) {
                            case null:
                                document.getElementById("delay_coronado").innerHTML = "(no data)";
                                document.getElementById("delay_coronado").style.color = "black";
                                break;
                            case (delayed > 60):
                                document.getElementById("delay_coronado").innerHTML = `(${delayed} min late)`;
                                document.getElementById("delay_coronado").style.color = "#db4242";
                                break;
                            case (delayed < 0):
                                document.getElementById("delay_coronado").innerHTML = `(${delayed} min early)`;
                                document.getElementById("delay_coronado").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_coronado").innerHTML = `(on time)`;
                                document.getElementById("delay_coronado").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (alerts_coronado === 0) {
                    document.getElementById("aor_coronado").innerHTML = "";
                }
                else {
                    document.getElementById("aor_coronado").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${alerts_coronado})`;
                }

                document.getElementById("lod_coronado").innerHTML = "&nbsp;&nbsp;&nbsp;";
                document.getElementById("lod_coronado").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_coronado").style.color = `#${route_text_color}`;
                document.getElementById("lod_coronado").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_coronado").innerHTML = route_headsign;
                
                var departure_coronado_entity = document.getElementById("line_for_departure_coronado").cloneNode(true);
                document.getElementById("list_of_departures_coronado").appendChild(departure_coronado_entity);
            }

            var all_coronado_departures = document.getElementById("list_of_departures_coronado").children;
            document.getElementById("list_of_departures_coronado").removeChild(all_coronado_departures[0]);
        }
    }
    coronado_departure_caller.send();
}

function clearAllCoronado() {
    document.getElementById("list_of_departures_coronado").innerHTML = `
        <li id="line_for_departure_coronado"><div id="lod_coronado">-</div> <span id="aor_coronado"></span> <span id="hod_coronado">(None)</span> <span id="depart_time_coronado">Enter a station by their station ID</span></li>
    `;
    document.getElementById("terminalname").innerHTML = "---";
}

function loadMTSAlertsByAgency() {
    var alert_caller = new XMLHttpRequest();
    alert_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-mts&include_alerts=true");
    alert_caller.onreadystatechange = function() {
        if (alert_caller.readyState === 4 && alert_caller.status === 200) {
            var alert_receiver = JSON.parse(alert_caller.responseText);

            if (alert_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_agency_entity").innerHTML = "There are no alerts at the moment involving the MTS agency.";
            }
            else {
                for (var i=0; i<alert_receiver.agencies[0].alerts.length; i++) {
                    var desc_for_mts_alert = alert_receiver.agencies[0].alerts[i].description_text[0].text;
                    var header_for_mts_alert = alert_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_agency_entity").innerHTML = `<b>${header_for_mts_alert}</b> <br> ${desc_for_mts_alert}`;

                    var each_alert = document.getElementById("alert_agency_entity").cloneNode(true);
                    document.getElementById("list_of_agency_alerts").appendChild(each_alert);
                }

                var all_alerts = document.getElementById("list_of_agency_alerts").children;
                document.getElementById("list_of_agency_alerts").removeChild(all_alerts[0]);
            }
        }
    }
    alert_caller.send();
}
loadMTSAlertsByAgency();

function loadMTSAlertsByRoutes() {
    var mts_route_alert_caller = new XMLHttpRequest();
    mts_route_alert_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&include_alerts=true");
    mts_route_alert_caller.onreadystatechange = function() {
        if (mts_route_alert_caller.readyState === 4 && mts_route_alert_caller.status === 200) {
            var mts_route_alert_receiver = JSON.parse(mts_route_alert_caller.responseText);
            var no_of_alerts_mts = [];

            for (var i=0; i<mts_route_alert_receiver.routes.length; i++) {
                var affected_route_color = mts_route_alert_receiver.routes[i].route_color;
                var affected_route_text_color = mts_route_alert_receiver.routes[i].route_text_color;
                var affected_route_short_name = mts_route_alert_receiver.routes[i].route_short_name;
                var alerts_for_mts = mts_route_alert_receiver.routes[i].alerts;

                if (alerts_for_mts.length === 0) {
                    no_of_alerts_mts.push(affected_route_short_name);
                }
                else {
                    for (var j=0; j<alerts_for_mts.length; j++) {
                        var header_for_mts_route_alert = alerts_for_mts[j].header_text[0].text;
                        var desc_for_mts_route_alert = alerts_for_mts[j].description_text[0].text;

                        document.getElementById("alert_routes_entity").innerHTML = `<p><span id="affectedroutes"></span> <br> <b>${header_for_mts_route_alert}</b> <br> ${desc_for_mts_route_alert}</p>`;
                        document.getElementById("affectedroutes").innerHTML = affected_route_short_name;
                        document.getElementById("affectedroutes").style.color = `#${affected_route_text_color}`;
                        document.getElementById("affectedroutes").style.backgroundColor = `#${affected_route_color}40`;
                        document.getElementById("affectedroutes").style.border = `1px solid #${affected_route_color}`;

                        var each_route_alert = document.getElementById("alert_routes_entity").cloneNode(true);
                        document.getElementById("list_of_line_alerts").appendChild(each_route_alert);
                    }
                }
            }

            if (no_of_alerts_mts.length === mts_route_alert_receiver.routes.length) {
                document.getElementById("alert_routes_entity").innerHTML = "There are no alerts in all routes under MTS.";
            }
            else {
                var all_route_alerts = document.getElementById("list_of_line_alerts").children;
                document.getElementById("list_of_line_alerts").removeChild(all_route_alerts[0]);
            }
        }
    }
    mts_route_alert_caller.send();
}
loadMTSAlertsByRoutes();

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
        center: [-117.15726, 32.71533],
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

function plotMTSLines() {
    var mts_map_caller = new XMLHttpRequest();
    mts_map_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&include_geometry=true");
    mts_map_caller.onreadystatechange = function() {
        if (mts_map_caller.readyState === 4 && mts_map_caller.status === 200) {
            var mts_map_receiver = JSON.parse(mts_map_caller.responseText);

            for (var i = 0; i < mts_map_receiver.routes.length; i++) {
                var route_short_name = mts_map_receiver.routes[i].route_short_name;
                var route_long_name = mts_map_receiver.routes[i].route_long_name;
                var route_color = mts_map_receiver.routes[i].route_color;
                var route_text_color = mts_map_receiver.routes[i].route_text_color;
                var route_id = mts_map_receiver.routes[i].route_id;
                var route_type = mts_map_receiver.routes[i].route_type;
                var route_geometry = mts_map_receiver.routes[i].geometry;

                geojson_of_mts_routes.push({
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

            var trolley_mts_geojson = geojson_of_mts_routes.filter(function(t) {return t.properties.route_type === 0});
            var bus_mts_geojson = geojson_of_mts_routes.filter(function(b) {return b.properties.route_type === 3});
            var coronado_mts_geojson = geojson_of_mts_routes.filter(function(c) {return c.properties.route_type === 4});

            map.addSource('source_from_mts_trolley', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': trolley_mts_geojson
                },
                'generateId': true
            });

            map.addSource('source_from_mts_bus', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': bus_mts_geojson
                },
                'generateId': true
            });

            map.addSource('source_from_mts_coronado', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': coronado_mts_geojson
                },
                'generateId': true
            });

            map.addLayer({
                'id': 'mts_bus',
                'type': 'line',
                'source': 'source_from_mts_bus',
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
                }
            });

            map.addLayer({
                'id': 'mts_trolley',
                'type': 'line',
                'source': 'source_from_mts_trolley',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 4
                }
            });

            map.addLayer({
                'id': 'mts_coronado',
                'type': 'line',
                'source': 'source_from_mts_coronado',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': ['get', 'route_color'],
                    'line-width': 4
                }
            });

            map.moveLayer('mts_bus', 'mts_trolley', 'mts_coronado');

            map.on('movestart', () => {
                map.setFilter('mts_bus', ['has', 'route_id']);
                map.setFilter('mts_trolley', ['has', 'route_id']);
                map.setFilter('mts_coronado', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir"><span id="route_name_rad">-</span>&nbsp;&nbsp;<span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({ 
                    layers: ['mts_trolley', 'mts_bus', 'mts_coronado'] 
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

            let routeID_for_Trolley = [];
            let routeID_for_Coronado = [];
            let routeID_for_Bus = [];
            let hoverIDBus = [];
            let hoveredPolygonLine = null;

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'mts_trolley', (e) => {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['mts_trolley'] });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        routeID_for_Trolley.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_Trolley).addTo(map);
                }
            });

            map.on('mouseenter', 'mts_coronado', (e) => {
                var fs = map.queryRenderedFeatures(e.point, { layers: ['mts_coronado'] });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_long_name;
                        routeID_for_Coronado.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_Coronado).addTo(map);
                }
            });

            map.on('mouseleave', ['mts_trolley'], () => {
                if (routeID_for_Trolley.length > 0) {
                    routeID_for_Trolley = [];
                }
                popup.remove();
            });

            map.on('mouseleave', ['mts_coronado'], () => {
                if (routeID_for_Coronado.length > 0) {
                    routeID_for_Coronado = [];
                }
                popup.remove();
            });

            map.on('mouseenter', 'mts_bus', function(e) {
                var fs2 = map.queryRenderedFeatures(e.point, { layers: ['mts_bus'] });

                if (fs2.length > 0) {
                    for (var f=0; f<fs2.length; f++) {
                        var name_of_route = fs2[f].properties.route_short_name;
                        routeID_for_Bus.push(name_of_route);

                        hoveredPolygonLine = fs2[f].id;
                        hoverIDBus.push(hoveredPolygonLine);

                        if (hoveredPolygonLine !== null) {
                            map.setFeatureState(
                                { source: 'source_from_mts_bus', id: hoveredPolygonLine },
                                { hover: false }
                            );
                        }

                        map.setFeatureState(
                            { source: 'source_from_mts_bus', id: hoveredPolygonLine },
                            { hover: true }
                        );
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_Bus).addTo(map);
                }
            });

            map.on('mouseleave', 'mts_bus', function() {
                if (routeID_for_Bus.length > 0) {
                    routeID_for_Bus = [];
                }
                popup.remove();

                if (hoverIDBus.length > 0) {
                    for (var h=0; h<hoverIDBus.length; h++) {
                        map.setFeatureState(
                            { source: 'source_from_mts_bus', id: hoverIDBus[h] },
                            { hover: false }
                        );
                    }
                }
                hoveredPolygonLine = null;
            });
        }
    }
    mts_map_caller.send();
}
plotMTSLines();