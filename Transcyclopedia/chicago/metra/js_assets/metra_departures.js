function getDeparturesFromAnAgencyMetra(e, list_of_departures_name, departure_entities, stopname_name, agency_onestop_id, inssearchbar_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, alerts, aor_id) {
    e = e || window.event;
    if (e.keyCode === 13) {
        document.getElementById(list_of_departures_name).innerHTML = departure_entities;
        document.getElementById(stopname_name).innerHTML = "---";
        getStopForDeparturesFromAnAgencyMetra(inssearchbar_id, stopname_name, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts);
    };
};

function getStopForDeparturesFromAnAgencyMetra(searchbar_id, stopname_id, agency_onestop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts) {
    var stopvalue_agency = document.getElementById(searchbar_id).value;
    var stopid_agency_caller = new XMLHttpRequest();
    stopid_agency_caller.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=${agency_onestop_id}&stop_id=${stopvalue_agency}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    stopid_agency_caller.onreadystatechange = function() {
        if (stopid_agency_caller.readyState === 4 && stopid_agency_caller.status === 200) {
            var stopid_agency_receiver = JSON.parse(stopid_agency_caller.responseText);
            var stopname_agency = stopid_agency_receiver.stops[0].stop_name;
            var stopid_agency = stopid_agency_receiver.stops[0].stop_id;

            document.getElementById(stopname_id).innerHTML = stopname_agency;
            getDeparturesForStopFromAnAgencyMetra(stopid_agency, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts);
        };
    };
    stopid_agency_caller.send();
};

function getDeparturesForStopFromAnAgencyMetra(stop_id, depart_time_ids, lod_ids, hod_ids, list_item_of_departures, list_of_departures_name, alerts, aor_id) {
    var departures_caller_agency = new XMLHttpRequest();
    departures_caller_agency.open("GET", `https://transit.land/api/v2/rest/stops/f-dp3-metra:${stop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
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