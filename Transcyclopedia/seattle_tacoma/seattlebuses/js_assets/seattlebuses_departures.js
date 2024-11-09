var onestop_id = "";

function changeSeattleBusDepartures(d) {
    var onestop_id_departures = d;

    switch (onestop_id_departures) {
        case "king_county_metro":
            onestop_id = "o-c2y3-kingcountymetro";
            break;
        case "sound_transit":
            onestop_id = "o-c2y-soundtransit";
            break;
        case "community_transit":
            onestop_id = "o-c2y-communitytransit";
            break;
        case "pierce_transit":
            onestop_id = "o-c2y-piercetransit";
            break;
        case "everett_transit":
            onestop_id = "o-c290-everetttransit";
            break;
        case "solid_ground":
            onestop_id = "o-c23nb-solidground";
            break;
        default:
            onestop_id = "";
            document.querySelector("#stopname").innerHTML = `---`;
            document.getElementById("list_of_bus_departures").innerHTML = `
                <li id="line_for_departure_bus" class="lod_styling"><div id="lod_bus" class="styling_for_routes">-</div> <span id="hod_bus" class="route_headsigns">(None)</span> <span id="depart_time_bus" class="departure_times">Select a Bus Agency.</span></li>
            `;
    }

    if (d === "prompt") {
        console.log("Pass");
    }
    else {
        getSeattleBusDeparturesPOne(onestop_id, onestop_stop_id);
    }
}

function getSeattleBusDeparturesPOne(getOneStopID, insStopOnestopID) {
    var seattle_bus_caller = new XMLHttpRequest();
    seattle_bus_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insStopOnestopID}&served_by_onestop_ids=${getOneStopID}&served_by_route_type=3`);
    seattle_bus_caller.onreadystatechange = function() {
        if (seattle_bus_caller.readyState === 4 && seattle_bus_caller.status === 200) {
            var seattle_bus_receiver = JSON.parse(seattle_bus_caller.responseText);
            var onestop_id_departures = seattle_bus_receiver.stops[0].onestop_id;
            var stop_name = seattle_bus_receiver.stops[0].stop_name;
            
            document.querySelector("#stopname").innerHTML = stop_name;
            getSeattleBusDeparturesPTwo(onestop_id_departures);
        }
    }
    seattle_bus_caller.send();
}

function getSeattleBusDeparturesPTwo(getOneStopID) {
    var seattle_bus_caller = new XMLHttpRequest();
    seattle_bus_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    seattle_bus_caller.onreadystatechange = function() {
        if (seattle_bus_caller.readyState === 4 && seattle_bus_caller.status === 200) {
            var seattle_bus_receiver = JSON.parse(seattle_bus_caller.responseText).stops[0].departures;

            for (var i = 0; i < seattle_bus_receiver.length; i++) {
                var route_color = seattle_bus_receiver[i].trip.route.route_color;
                var route_text_color = seattle_bus_receiver[i].trip.route.route_text_color;
                var route_short_name = seattle_bus_receiver[i].trip.route.route_short_name;
                var departure_headsign = seattle_bus_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = seattle_bus_receiver[i].arrival.estimated;
                var delayed_time = seattle_bus_receiver[i].arrival.delay / 60;

                switch (arrival_est) {
                    case null:
                        var arrival_est = seattle_bus_receiver[i].arrival.scheduled;
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

    seattle_bus_caller.send();
}