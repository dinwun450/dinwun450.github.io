var onestop_id = "";

function changeHIBusDepartures(c) {
    var onestop_busstop_id = document.getElementById("stopgetter").value;
    var hi_bus_agency = c;

    switch (hi_bus_agency) {
        case "thebus":
            onestop_id = "o-87z-thebus";
            break;
        case "hele_on":
            onestop_id = "o-hele~on~hi";
            break;
        case "maui_bus":
            onestop_id = "o-maui~county~transit";
            break;
        case "kauai_bus":
            onestop_id = "o-87yt-countyofkauai~transportationagency";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_departures_hi_bus").innerHTML = `
                <li id="line_for_departure_hi_bus" class="lod_styling"><div id="lod_hi_bus">-</div> <span id="aor_hi_bus"></span> <span id="hod_hi_bus">(None)</span> <span id="depart_time_hi_bus">Enter a stop by their stop ID, then select a bus agency. For some TheBus departures, add "_merge" at the end of the stop id.</span></li>
            `;
            document.getElementById("stopname_hi_bus").innerHTML = "---";
            document.getElementById("alert_for_stop_hi_bus").innerHTML = "Once you typed down the stop by their ID, the alerts will display here.";
    };

    if (c === "prompt") {
        console.log("Stop.");
    }
    else {
        loadHIBusDeparturesPOne(onestop_id, onestop_busstop_id);
    }
}

function loadHIBusDeparturesPOne(insAgencyOnestopID, insBusstopOnestopID) {
    var hi_busstop_call = new XMLHttpRequest();
    hi_busstop_call.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insBusstopOnestopID}&served_by_onestop_ids=${insAgencyOnestopID}`);
    hi_busstop_call.onreadystatechange = function() {
        if (hi_busstop_call.readyState === 4 && hi_busstop_call.status === 200) {
            var hi_busstop_receiver = JSON.parse(hi_busstop_call.responseText);
            var stop_name = hi_busstop_receiver.stops[0].stop_name;
            var onestop_id_departures = hi_busstop_receiver.stops[0].onestop_id;

            document.getElementById("stopname_hi_bus").innerHTML = stop_name;
            loadHIBusDeparturesPTwo(onestop_id_departures);
        }
    };
    hi_busstop_call.send();
}

function loadHIBusDeparturesPTwo(insOneBusstopID) {
    var hi_bus_departure_caller = new XMLHttpRequest();
    hi_bus_departure_caller.open("GET", `https://transit.land/api/v2/rest/stops/${insOneBusstopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    hi_bus_departure_caller.onreadystatechange = function() {
        if (hi_bus_departure_caller.status === 200 && hi_bus_departure_caller.readyState === 4) {
            var hi_bus_departure_receiver = JSON.parse(hi_bus_departure_caller.responseText).stops[0];

            for (var i = 0; i < hi_bus_departure_receiver.departures.length; i++) {
                var route_color = hi_bus_departure_receiver.departures[i].trip.route.route_color;
                var route_text_color = hi_bus_departure_receiver.departures[i].trip.route.route_text_color;
                var route_short_name = hi_bus_departure_receiver.departures[i].trip.route.route_short_name;
                var departure_headsign = hi_bus_departure_receiver.departures[i].trip.trip_headsign;
                var no_of_alerts = hi_bus_departure_receiver.departures[i].trip.route.alerts.length;

                // Departure Variables
                var arrival_time = hi_bus_departure_receiver.departures[i].arrival.estimated;
                var delay_time = hi_bus_departure_receiver.departures[i].arrival.delay / 60;

                switch (arrival_time) {
                    case null:
                        var scheduled_arrival = hi_bus_departure_receiver.departures[i].arrival.scheduled;
                        document.getElementById("depart_time_hi_bus").innerHTML = `${scheduled_arrival} <span id="delay_hi_bus"></span>`;
                        document.getElementById("depart_time_hi_bus").style.color = "black";

                        document.getElementById("delay_hi_bus").innerHTML = "scheduled";
                        document.getElementById("delay_hi_bus").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_hi_bus").innerHTML = `${arrival_time} <span id="delay_hi_bus"></span>`;
                        document.getElementById("depart_time_hi_bus").style.color = "rgb(10, 161, 45)";
                        var delay_min = Math.round(delay_time);

                        switch (delay_time) {
                        case null:
                            document.getElementById("delay_hi_bus").innerHTML = "(no data)";
                            document.getElementById("delay_hi_bus").style.color = "black";
                            break;
                        case (delay_time > 60):
                            document.getElementById("delay_hi_bus").innerHTML = `(${delay_min} min late)`;
                            document.getElementById("delay_hi_bus").style.color = "#db4242";
                            break;
                        case (delay_time < 0):
                            document.getElementById("delay_hi_bus").innerHTML = `(${delay_min} min early)`;
                            document.getElementById("delay_hi_bus").style.color = "#0398fc";
                            break;
                        default:
                            document.getElementById("delay_hi_bus").innerHTML = "(on time)";
                            document.getElementById("delay_hi_bus").style.color = "rgb(10, 161, 45)";
                            break;
                        }
                        break;
                }

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                document.getElementById("lod_hi_bus").innerHTML = route_short_name;
                document.getElementById("lod_hi_bus").style.color = `#${route_text_color}`;
                document.getElementById("lod_hi_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_hi_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_hi_bus").innerHTML = departure_headsign;

                if (no_of_alerts === 0) {
                    document.getElementById("aor_hi_bus").innerHTML = "";
                }
                else {
                    document.getElementById("aor_hi_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation alert_triangle"></i> ${no_of_alerts})`;
                }

                var hi_bus_stop_alerts = hi_bus_departure_receiver.alerts;
                switch (hi_bus_stop_alerts.length) {
                    case 0:
                        document.getElementById("alert_for_stop_hi_bus").innerHTML = "<p>There are no alerts for this stop.</p>";
                        break;
                    default:
                        for (var j=0; j<hi_bus_stop_alerts.length; j++) {
                            var desc_for_stop_alert = hi_bus_stop_alerts[j].description_text[0].text;
                            document.getElementById("alert_for_stop_hi_bus").innerHTML = `<p>${desc_for_stop_alert}</p>`;
                        }
                        break;
                }

                var hi_bus_departure_entity = document.getElementById("line_for_departure_hi_bus").cloneNode(true);
                document.getElementById("list_of_departures_hi_bus").appendChild(hi_bus_departure_entity);
            }

            var all_hi_bus_departures = document.getElementById("list_of_departures_hi_bus").children;
            document.getElementById("list_of_departures_hi_bus").removeChild(all_hi_bus_departures[0]);
        }
    }
    hi_bus_departure_caller.send();
}