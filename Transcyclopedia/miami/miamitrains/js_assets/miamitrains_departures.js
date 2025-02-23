var onestop_id = "";

function changeMiamiTrainDepartures(d) {
    var onestop_stop_id = document.getElementById("stationgetter").value;
    var onestop_id_departures = d;

    switch (onestop_id_departures) {
        case "trirail":
            onestop_id = "o-dhx-tri~rail";
            break;
        case "brightline":
            onestop_id = "o-dh-brightline";
            break;
        default:
            onestop_id = "";
            document.querySelector("#stationname").innerHTML = `---`;
            document.getElementById("list_of_train_departures").innerHTML = `
                <li id="line_for_departure_train" class="lod_styling"><div id="lod_train" class="styling_for_routes">-</div> <span id="hod_train" class="route_headsigns">(None)</span> <span id="depart_time_train" class="departure_times">Select a Train Agency.</span></li>
            `;
    }

    if (d === "prompt") {
        console.log("Pass");
    }
    else {
        getMiamiTrainDeparturesPOne(onestop_id, onestop_stop_id);
    }
}

function getMiamiTrainDeparturesPOne(getOneStopID, insStopOnestopID) {
    var miami_train_caller = new XMLHttpRequest();
    miami_train_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insStopOnestopID}&served_by_onestop_ids=${getOneStopID}&served_by_route_type=2`);
    miami_train_caller.onreadystatechange = function() {
        if (miami_train_caller.readyState === 4 && miami_train_caller.status === 200) {
            var miami_train_receiver = JSON.parse(miami_train_caller.responseText);
            var onestop_id_departures = miami_train_receiver.stops[0].onestop_id;
            var stop_name = miami_train_receiver.stops[0].stop_name;
            
            document.querySelector("#stationname").innerHTML = stop_name;
            getMiamiTrainDeparturesPTwo(onestop_id_departures);
        }
    }
    miami_train_caller.send();
}

function getMiamiTrainDeparturesPTwo(getOneStopID) {
    var miami_train_caller = new XMLHttpRequest();
    miami_train_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    miami_train_caller.onreadystatechange = function() {
        if (miami_train_caller.readyState === 4 && miami_train_caller.status === 200) {
            var miami_train_receiver = JSON.parse(miami_train_caller.responseText).stops[0].departures;

            for (var i = 0; i < miami_train_receiver.length; i++) {
                var route_color = miami_train_receiver[i].trip.route.route_color;
                var route_text_color = miami_train_receiver[i].trip.route.route_text_color;
                var route_short_name = miami_train_receiver[i].trip.route.route_short_name;
                var departure_headsign = miami_train_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = miami_train_receiver[i].arrival.estimated;
                var delayed_time = miami_train_receiver[i].arrival.delay / 60;

                switch (arrival_est) {
                    case null:
                        var arrival_est = miami_train_receiver[i].arrival.scheduled;
                        document.getElementById("depart_time_train").innerHTML = `${arrival_est} <span id="delay_train"></span>`;
                        document.getElementById("depart_time_train").style.color = "black";
                        document.getElementById("delay_train").innerHTML = "(scheduled)";
                        document.getElementById("delay_train").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_train").innerHTML = `${arrival_est} <span id="delay_train"></span>`;
                        document.getElementById("depart_time_train").style.color = "black";
                        var delayed_minutes = Math.round(delayed_time);

                        switch (delayed_minutes) {
                            case null:
                                document.getElementById("delay_train").innerHTML = "(no data)";
                                document.getElementById("delay_train").style.color = "black";
                                break;
                            case (delayed_minutes > 60):
                                document.getElementById("delay_train").innerHTML = `(${delayed_minutes} min late)`;
                                document.getElementById("delay_train").style.color = "#db4242";
                                break;
                            case (delayed_minutes < 0):
                                document.getElementById("delay_train").innerHTML = `(${delayed_minutes} min early)`;
                                document.getElementById("delay_train").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_train").innerHTML = "(on time)";
                                document.getElementById("delay_train").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                document.getElementById("lod_train").innerHTML = route_short_name;
                document.getElementById("lod_train").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_train").style.color = `#${route_text_color}`;
                document.getElementById("lod_train").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_train").innerHTML = departure_headsign;

                var train_departure_toclone = document.getElementById("line_for_departure_train").cloneNode(true);
                document.getElementById("list_of_train_departures").appendChild(train_departure_toclone);
            }

            var all_train_departures = document.getElementById("list_of_train_departures").children;
            document.getElementById("list_of_train_departures").removeChild(all_train_departures[0]);
        }
    }

    miami_train_caller.send();
}