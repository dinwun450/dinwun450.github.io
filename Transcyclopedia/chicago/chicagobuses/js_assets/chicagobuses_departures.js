var onestop_id = "";

function changeChicagoBusDepartures(d) {
    var onestop_stop_id = document.getElementById("stopgetter").value;
    var onestop_id_departures = d;

    switch (onestop_id_departures) {
        case "cta":
            onestop_id = "o-dp3-chicagotransitauthority";
            break;
        case "pace":
            onestop_id = "o-dp3-pace";
            break;
        default:
            onestop_id = "";
            document.querySelector("#stopname").innerHTML = `---`;
            document.getElementById("list_of_bus_departures").innerHTML = `
                <li id="line_for_departure_bus" class="lod_styling"><div id="lod_bus" class="styling_for_routes">-</div> <span id="hod_bus" class="route_headsigns">(None)</span> <span id="depart_time_bus" class="departure_times">Enter a stop by their stop ID, then select a bus agency.</span></li>
            `;
    }

    if (d === "prompt") {
        console.log("Pass");
    }
    else {
        document.getElementById("list_of_bus_departures").innerHTML = `
            <li id="line_for_departure_bus" class="lod_styling"><div id="lod_bus" class="styling_for_routes">-</div> <span id="hod_bus" class="route_headsigns">Loading...</span> <span id="depart_time_bus" class="departure_times">Please wait...</span></li>
        `;
        getChicagoBusDeparturesPOne(onestop_id, onestop_stop_id);
    }
}

function getChicagoBusDeparturesPOne(getOneStopID, insStopOnestopID) {
    var chicago_bus_caller = new XMLHttpRequest();
    chicago_bus_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insStopOnestopID}&served_by_onestop_ids=${getOneStopID}&served_by_route_type=3`);
    chicago_bus_caller.onreadystatechange = function() {
        if (chicago_bus_caller.readyState === 4 && chicago_bus_caller.status === 200) {
            var chicago_bus_receiver = JSON.parse(chicago_bus_caller.responseText);
            var onestop_id_departures = chicago_bus_receiver.stops[0].onestop_id;
            var stop_name = chicago_bus_receiver.stops[0].stop_name;
            
            document.querySelector("#stopname").innerHTML = stop_name;
            getChicagoBusDeparturesPTwo(onestop_id_departures);
        }
    }
    chicago_bus_caller.send();
}

function getChicagoBusDeparturesPTwo(getOneStopID) {
    var chicago_bus_caller = new XMLHttpRequest();
    chicago_bus_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    chicago_bus_caller.onreadystatechange = function() {
        if (chicago_bus_caller.readyState === 4 && chicago_bus_caller.status === 200) {
            var chicago_bus_receiver = JSON.parse(chicago_bus_caller.responseText).stops[0].departures;
            
            for (var i = 0; i < chicago_bus_receiver.length; i++) {
                var route_color = chicago_bus_receiver[i].trip.route.route_color;
                var route_text_color = chicago_bus_receiver[i].trip.route.route_text_color;
                var route_short_name = chicago_bus_receiver[i].trip.route.route_short_name;
                var departure_headsign = chicago_bus_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = chicago_bus_receiver[i].arrival.estimated;
                var delayed_time = chicago_bus_receiver[i].arrival.delay / 60;

                switch (arrival_est) {
                    case null:
                        var arrival_est = chicago_bus_receiver[i].arrival.scheduled;
                        document.getElementById("depart_time_bus").innerHTML = `${arrival_est} <span id="delay_bus"></span>`;
                        document.getElementById("depart_time_bus").style.color = "black";
                        document.getElementById("delay_bus").innerHTML = "(scheduled)";
                        document.getElementById("delay_bus").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_bus").innerHTML = `${arrival_est} <span id="delay_bus"></span>`;
                        document.getElementById("depart_time_bus").style.color = "rgb(10, 161, 45)";
                        var delayed_minutes = Math.round(delayed_time);

                        switch (delayed_minutes) {
                            case null:
                                document.getElementById("delay_bus").innerHTML = "(no data)";
                                document.getElementById("delay_bus").style.color = "black";
                                break;
                            case (delayed_minutes > 60):
                                document.getElementById("delay_bus").innerHTML = `(${delayed_minutes} min late)`;
                                document.getElementById("delay_bus").style.color = "#db4242";
                                break;
                            case (delayed_minutes < 0):
                                document.getElementById("delay_bus").innerHTML = `(${delayed_minutes} min early)`;
                                document.getElementById("delay_bus").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_bus").innerHTML = "(on time)";
                                document.getElementById("delay_bus").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                document.getElementById("lod_bus").innerHTML = route_short_name;
                document.getElementById("lod_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_bus").style.color = `#${route_text_color}`;
                document.getElementById("lod_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_bus").innerHTML = departure_headsign;

                var bus_departure_toclone = document.getElementById("line_for_departure_bus").cloneNode(true);
                document.getElementById("list_of_bus_departures").appendChild(bus_departure_toclone);
            }

            var all_bus_departures = document.getElementById("list_of_bus_departures").children;
            document.getElementById("list_of_bus_departures").removeChild(all_bus_departures[0]);
        }
    }

    chicago_bus_caller.send();
}