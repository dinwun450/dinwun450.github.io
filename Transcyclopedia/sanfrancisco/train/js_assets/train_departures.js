var departure_onestop_id = "";

function changeTrainDepartures(c) {
    var get_stop = document.getElementById("stationgetter").value;
    var agency = c;

    switch(agency) {
        case "ace":
            departure_onestop_id = "o-9q9-acealtamontcorridorexpress";
            break;
        case "caltrain":
            departure_onestop_id = "o-9q9-caltrain";
            break;
        case "capitol_corridor":
            departure_onestop_id = "o-9qc-capitolcorridor";
            break;
        case "smart":
            departure_onestop_id = "o-9qb-sonomamarinarearailtransit";
            break;
        default:
            departure_onestop_id = "";
            break;
    }

    if (agency === "prompt") {
        document.getElementById("list_of_train_departures").innerHTML = `
        <li id="line_for_departure_train"><div class="wrapper_for_train_departure"><div id="line_for_train_departure">-</div> <span id="train_headsign">(None)</span><span id="train_departure_entity">Enter a specific station by the station ID, then select a train agency.</span></div></li>
        `;
        document.getElementById("stationname").innerHTML = "---";
    }
    else {
        compileStopDepartures(departure_onestop_id, get_stop);   
    }
}

function compileStopDepartures(InsertOneStopID, InsertStopID) {
    var stop_call = new XMLHttpRequest();
    stop_call.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&served_by_onestop_ids=${InsertOneStopID}&stop_id=${InsertStopID}`);
    stop_call.onreadystatechange = function() {
        if (stop_call.readyState === 4 && stop_call.readyState === 4) {
            var stop_outputs = JSON.parse(stop_call.responseText);

            var onestop_stop_id = stop_outputs.stops[0].onestop_id;
            var stop_name = stop_outputs.stops[0].stop_name;

            document.getElementById("stationname").innerHTML = stop_name;
            compileDepartures(onestop_stop_id);
        }
    }
    stop_call.send();
}

function compileDepartures(insertOneStopStop) {
    document.getElementById("list_of_train_departures").innerHTML = `
        <li id="line_for_departure_train"><div class="wrapper_for_train_departure"><div id="line_for_train_departure">-</div> <span id="train_headsign">(None)</span><span id="train_departure_entity">Loading...</span></div></li>
    `;

    var departure_call = new XMLHttpRequest();
    departure_call.open("GET", `https://transit.land/api/v2/rest/stops/${insertOneStopStop}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    departure_call.onreadystatechange = function() {
        if (departure_call.readyState === 4 && departure_call.status === 200) {
            var departure_outputs = JSON.parse(departure_call.responseText).stops[0].departures;

            for (var i=0; i<departure_outputs.length; i++) {
                var route_short_name = departure_outputs[i].trip.route.route_short_name;
                var route_headsign = departure_outputs[i].trip.trip_headsign;
                var route_color = departure_outputs[i].trip.route.route_color;
                var route_text_color = departure_outputs[i].trip.route.route_text_color;
                var arrival = departure_outputs[i].arrival.estimated;
                var delay = Math.round(departure_outputs[i].arrival.delay / 60);

                switch (arrival) {
                    case (null):
                        arrival = departure_outputs[i].arrival.scheduled;
                        document.getElementById("train_departure_entity").innerHTML = `${arrival} <span id="delay"></span>`;
                        document.getElementById("delay").style.color = "black";
                        break;
                    default:
                        document.getElementById("train_departure_entity").innerHTML = `${arrival} <span id="delay"></span>`;
                        document.getElementById("delay").style.color = "black";

                        switch (delay) {
                            case (null):
                                document.getElementById("delay").innerHTML = "(no data)";
                                document.getElementById("delay").style.color = "black";
                                break;
                            case (delay > 60):
                                document.getElementById("delay").innerHTML = `(${delay} min late)`;
                                document.getElementById("delay").style.color = "orange";
                                break;
                            case (delay < 0):
                                document.getElementById("delay").innerHTML = `(${delay} min early)`;
                                document.getElementById("delay").style.color = "skyblue";
                                break;
                            default:
                                document.getElementById("delay").innerHTML = "(on time)";
                                document.getElementById("delay").style.color = "green";
                                break;
                        }
                        break;
                }

                document.getElementById("line_for_train_departure").innerHTML = route_short_name;
                document.getElementById("line_for_train_departure").style.color = `#${route_text_color}`;
                document.getElementById("line_for_train_departure").style.backgroundColor = `#${route_color}40`;
                document.getElementById("line_for_train_departure").style.border = `1px solid #${route_color}`;
                document.getElementById("train_headsign").innerHTML = route_headsign;

                var departure_entity = document.getElementById("line_for_departure_train");
                var cloned_departure = departure_entity.cloneNode(true);
                document.getElementById("list_of_train_departures").appendChild(cloned_departure);
            }

            var all_departures = document.getElementById("list_of_train_departures").children;
            document.getElementById("list_of_train_departures").removeChild(all_departures[0]);
        }
    }
    departure_call.send();
}