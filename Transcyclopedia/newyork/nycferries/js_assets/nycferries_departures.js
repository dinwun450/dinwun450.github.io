var onestop_id = "";

function changeNYCFerryDepartures(f) {
    onestop_terminal_id = document.getElementById("terminalgetter_nycferry").value;
    var nycferry_agency = f;

    switch (nycferry_agency) {
        case "nycferry":
            onestop_id = "o-dr5r-nycferry";
            break;
        case "statenislandferry":
            onestop_id = "o-dr5r7-nycdot";
            break;
        case "nywaterway":
            onestop_id = "o-dr7-nywaterway";
            break;
        default:
            onestop_id = "";
            document.querySelector("#terminalname_nycferry").innerHTML = `---`;
            document.getElementById("list_of_nycferry_departures").innerHTML = `
                <li id="line_for_departure_nycferry" class="lod_styling"><div id="lod_nycferry" class="styling_for_routes"><i class="fa-solid fa-ferry"></i></div> <span id="hod_nycferry" class="route_headsigns">(None)</span> <span id="depart_time_nycferry" class="departure_times">Enter a terminal by their terminal ID, then select a NYC ferry agency</span></li>
            `;
    }

    if (f === "prompt") {
        console.log("Pass");
    }
    else {
        getNYCFerryDeparturesPOne(onestop_id, onestop_terminal_id);
    }
}

function getNYCFerryDeparturesPOne(getOneStopID, insTerminalOnestopID) {
    document.querySelector("#terminalname_nycferry").innerHTML = `---`;
    document.getElementById("list_of_nycferry_departures").innerHTML = `
        <li id="line_for_departure_nycferry" class="lod_styling"><div id="lod_nycferry" class="styling_for_routes"><i class="fa-solid fa-ferry"></i></div> <span id="hod_nycferry" class="route_headsigns">Loading...</span> <span id="depart_time_nycferry" class="departure_times">Please wait...</span></li>
    `;

    var nycferry_terminal_caller = new XMLHttpRequest();
    nycferry_terminal_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insTerminalOnestopID}&served_by_onestop_ids=${getOneStopID}&served_by_route_type=4`);
    nycferry_terminal_caller.onreadystatechange = function() {
        if (nycferry_terminal_caller.readyState === 4 && nycferry_terminal_caller.status === 200) {
            var nycferry_terminal_receiver = JSON.parse(nycferry_terminal_caller.responseText);
            var onestop_id_departures = nycferry_terminal_receiver.stops[0].onestop_id;
            var terminal_name = nycferry_terminal_receiver.stops[0].stop_name;
            
            document.querySelector("#terminalname_nycferry").innerHTML = terminal_name;
            getNYCFerryDeparturesPTwo(onestop_id_departures);
        }
    }
    nycferry_terminal_caller.send();
}

function getNYCFerryDeparturesPTwo(getOneStopID) {
    var nycferry_caller = new XMLHttpRequest();
    nycferry_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    nycferry_caller.onreadystatechange = function() {
        if (nycferry_caller.readyState === 4 && nycferry_caller.status === 200) {
            var nycferry_receiver = JSON.parse(nycferry_caller.responseText).stops[0].departures;

            for (var i = 0; i < nycferry_receiver.length; i++) {
                var route_color = nycferry_receiver[i].trip.route.route_color;
                var route_text_color = nycferry_receiver[i].trip.route.route_text_color;
                var route_short_name = nycferry_receiver[i].trip.route.route_short_name;
                var departure_headsign = nycferry_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = nycferry_receiver[i].arrival.estimated;
                var delayed_time = nycferry_receiver[i].arrival.delay / 60;

                switch (arrival_est) {
                    case null:
                        var arrival_est = nycferry_receiver[i].arrival.scheduled;
                        document.getElementById("depart_time_nycferry").innerHTML = `${arrival_est} <span id="delay_nycferry"></span>`;
                        document.getElementById("depart_time_nycferry").style.color = "black";
                        document.getElementById("delay_nycferry").innerHTML = "(scheduled)";
                        document.getElementById("delay_nycferry").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_nycferry").innerHTML = `${arrival_est} <span id="delay_nycferry"></span>`;
                        document.getElementById("depart_time_nycferry").style.color = "rgb(10, 161, 45)";
                        var delayed_minutes = Math.round(delayed_time);

                        switch (delayed_minutes) {
                            case null:
                                document.getElementById("delay_nycferry").innerHTML = "(no data)";
                                document.getElementById("delay_nycferry").style.color = "black";
                                break;
                            case (delayed_minutes > 60):
                                document.getElementById("delay_nycferry").innerHTML = `(${delayed_minutes} min late)`;
                                document.getElementById("delay_nycferry").style.color = "#db4242";
                                break;
                            case (delayed_minutes < 0):
                                document.getElementById("delay_nycferry").innerHTML = `(${delayed_minutes} min early)`;
                                document.getElementById("delay_nycferry").style.color = `#0398fc`;
                                break;
                            default:
                                document.getElementById("delay_nycferry").innerHTML = "(on time)";
                                document.getElementById("delay_nycferry").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                if (route_short_name === null) {
                    route_short_name = "<i class='fa-solid fa-ferry'></i>";
                }
                else {
                    route_short_name = `<i class='fa-solid fa-ferry'></i>&nbsp;${route_short_name}`;
                }
                
                document.getElementById("lod_nycferry").innerHTML = route_short_name;
                document.getElementById("lod_nycferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_nycferry").style.color = `#${route_text_color}`;
                document.getElementById("lod_nycferry").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_nycferry").innerHTML = departure_headsign;

                var nycferry_departure_toclone = document.getElementById("line_for_departure_nycferry").cloneNode(true);
                document.getElementById("list_of_nycferry_departures").appendChild(nycferry_departure_toclone);
            }

            var all_nycferry_departures = document.getElementById("list_of_nycferry_departures").children;
            document.getElementById("list_of_nycferry_departures").removeChild(all_nycferry_departures[0]);
        }
    }

    nycferry_caller.send();
}