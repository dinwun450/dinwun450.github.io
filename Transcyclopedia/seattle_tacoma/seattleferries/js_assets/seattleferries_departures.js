var onestop_id = "";

function changeSeattleFerryDepartures(f) {
    onestop_terminal_id = document.getElementById("terminalgetter").value;
    var seattle_ferry_agency = f;

    switch(seattle_ferry_agency) {
        case "wsf":
            onestop_id = "o-c28-washingtonstateferries";
            break;
        case "pierce":
            onestop_id = "o-c22u3-piercecountyferries";
            break;
        case "king":
            onestop_id = "o-c23-metrotransit";
            break;
        case "kitsap":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "vicclip":
            onestop_id = "o-c28-thevictoriaclipper";
            break;
        default:
            onestop_id = "";
            document.querySelector("#terminalname").innerHTML = `---`;
            document.getElementById("list_of_ferry_departures").innerHTML = `
                <li id="line_for_departure_ferry" class="lod_styling"><div id="lod_ferry" class="styling_for_routes">-</div> <span id="hod_ferry" class="route_headsigns">(None)</span> <span id="depart_time_ferry" class="departure_times">Enter a terminal by their terminal ID, then select a ferry agency.</span></li>
            `;
    }

    if (f === "prompt") {
        console.log("Pass");
    }
    else {
        getSeattleFerryDeparturesPOne(onestop_id, onestop_terminal_id);
    }
}

function getSeattleFerryDeparturesPOne(getOneStopID, insTerminalOnestopID) {
    var seattle_terminal_caller = new XMLHttpRequest();
    seattle_terminal_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insTerminalOnestopID}&served_by_onestop_ids=${getOneStopID}&route_type=4`);
    seattle_terminal_caller.onreadystatechange = function() {
        if (seattle_terminal_caller.readyState === 4 && seattle_terminal_caller.status === 200) {
            var seattle_terminal_receiver = JSON.parse(seattle_terminal_caller.responseText);
            var onestop_id_departures = seattle_terminal_receiver.stops[0].onestop_id;
            var terminal_name = seattle_terminal_receiver.stops[0].stop_name;
            
            document.querySelector("#terminalname").innerHTML = terminal_name;
            getSeattleFerryDeparturesPTwo(onestop_id_departures);
        }
    }
    seattle_terminal_caller.send();
}

function getSeattleFerryDeparturesPTwo(getOneStopID) {
    var seattle_ferry_caller = new XMLHttpRequest();
    seattle_ferry_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    seattle_ferry_caller.onreadystatechange = function() {
        if (seattle_ferry_caller.readyState === 4 && seattle_ferry_caller.status === 200) {
            var seattle_ferry_receiver = JSON.parse(seattle_ferry_caller.responseText).stops[0].departures;

            for (var i = 0; i < seattle_ferry_receiver.length; i++) {
                var route_color = seattle_ferry_receiver[i].trip.route.route_color;
                var route_text_color = seattle_ferry_receiver[i].trip.route.route_text_color;
                var route_short_name = seattle_ferry_receiver[i].trip.route.route_short_name;
                var departure_headsign = seattle_ferry_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = seattle_ferry_receiver[i].arrival.estimated;
                var delayed_time = seattle_ferry_receiver[i].arrival.delay / 60;
                
                switch (arrival_est) {
                    case null:
                        var arrival_est = seattle_ferry_receiver[i].arrival.scheduled;
                        document.getElementById("depart_time_ferry").innerHTML = `${arrival_est} <span id="delay_ferry"></span>`;
                        document.getElementById("depart_time_ferry").style.color = "black";
                        document.getElementById("delay_ferry").innerHTML = "(scheduled)";
                        document.getElementById("delay_ferry").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_ferry").innerHTML = `${arrival_est} <span id="delay_ferry"></span>`;
                        document.getElementById("depart_time_ferry").style.color = "rgb(10, 161, 45)";
                        var delayed_minutes = Math.round(delayed_time);

                        switch (delayed_minutes) {
                            case null:
                                document.getElementById("delay_ferry").innerHTML = "(no data)";
                                document.getElementById("delay_ferry").style.color = "black";
                                break;
                            case (delayed_minutes > 60):
                                document.getElementById("delay_ferry").innerHTML = `(${delayed_minutes} min late)`;
                                document.getElementById("delay_ferry").style.color = "#db4242";
                                break;
                            case (delayed_minutes < 0):
                                document.getElementById("delay_ferry").innerHTML = `(${delayed_minutes} min early)`;
                                document.getElementById("delay_ferry").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_ferry").innerHTML = "(on time)";
                                document.getElementById("delay_ferry").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                document.getElementById("lod_ferry").innerHTML = route_short_name;
                document.getElementById("lod_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_ferry").style.color = `#${route_text_color}`;
                document.getElementById("lod_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_ferry").innerHTML = departure_headsign;

                var ferry_departure_cloner = document.getElementById("line_for_departure_ferry").cloneNode(true);
                document.getElementById("list_of_ferry_departures").appendChild(ferry_departure_cloner);
            }

            var all_ferry_departures = document.getElementById("list_of_ferry_departures").children;
            document.getElementById("list_of_ferry_departures").removeChild(all_ferry_departures[0]);
        }
    }

    seattle_ferry_caller.send();
}