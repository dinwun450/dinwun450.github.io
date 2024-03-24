var link = "";

function changeAgencyInDepartures(c) {
    onestop_id = document.getElementById("stopgetter").value;
    var agency = c;

    switch (agency) {
        case "actransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9-actransit`;
            break;
        case "berkeleyshuttles":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9p3-beartransit`;
            break;
        case "commutedotorg":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9j-commuteorgshuttles`;
            break;
        case "countyconnection":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9p-countyconnection`;
            break;
        case "dumbartonexpress":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9j-dumbartonexpress`;
            break;
        case "fast":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc-fairfieldandsuisuntransit`;
            break;
        case "ggt":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qb-goldengatetransit`;
            break;
        case "marintransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qbb-marintransit`;
            break;
        case "petalumatransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qbc9-petalumatransit`;
            break;
        case "sanmateotransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q8-samtrans`;
            break;
        case "santarosacitybus":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qbdx-santarosacitybus`;
            break;
        case "solanotransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc0-soltrans`;
            break;
        case "sonomacountytransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qb-sonomacountytransit`;
            break;
        case "stanfordshuttles":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9h-stanford~marguerite`;
            break;
        case "trideltatransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc2-trideltatransit`;
            break;
        case "uctransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9jy-unioncitytransit`;
            break; 
        case "vacavillecitycoach":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc60-vacavillecitycoach`;
            break;
        case "napatransit":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc-vinenapacounty`;
            break;
        case "westcat":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9qc-westcatwesterncontracosta`;
            break;
        case "trivalleywheels":
            link = `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${onestop_id}&served_by_onestop_ids=o-9q9q-wheelsbus`;
            break;
        default:
            link = "";
            document.querySelector(".headerforbus").innerHTML = `Departures for &nbsp;<span id="stopname">---</span>`;
            document.getElementById("list_of_departures_bus").innerHTML = `<li id="line_for_departure_bus"><div class="wrapper_for_departure_bus"><div id="line_for_each_departure_bus">-</div> <span id="alerts_bus"></span> <span id="route_headsign_bus">(None)</span><span id="route_depart_bus">Enter a specific stop by their stop ID, then select a bus agency.</span></div></li>`
            break;
    }

    if (agency === "prompt") {
        console.log("Pass.");
    }
    else {
        busDeparturesPOne(link);
    }
}

function busDeparturesPOne(departureLink) {
    var stop_call = new XMLHttpRequest();
    stop_call.open("GET", departureLink);
    stop_call.onreadystatechange = function() {
        if (stop_call.readyState === 4 && stop_call.status === 200) {
            var stop_info = JSON.parse(stop_call.responseText);
            var stop_id_one = stop_info.stops[0].onestop_id;
            var stop_name = stop_info.stops[0].stop_name;

            document.getElementById("stopname").innerHTML = stop_name;
            busDeparturesPTwo(stop_id_one);
        }
    }
    stop_call.send();
}

function busDeparturesPTwo(onestop_id) {
    var departure_call = new XMLHttpRequest();
    departure_call.open("GET", `https://transit.land/api/v2/rest/stops/${onestop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    departure_call.onreadystatechange = function() {
        if (departure_call.readyState === 4 && departure_call.status === 200) {
            var departures_for_bus = JSON.parse(departure_call.responseText).stops[0];

            for (var i=0; i<departures_for_bus.departures.length; i++) {
                var route_color = departures_for_bus.departures[i].trip.route.route_color;
                var route_text_color = departures_for_bus.departures[i].trip.route.route_text_color;
                var route_short_name = departures_for_bus.departures[i].trip.route.route_short_name;
                var route_headsign = departures_for_bus.departures[i].trip.trip_headsign;

                var arrival_time = departures_for_bus.departures[i].arrival.estimated;
                var delay_time = departures_for_bus.departures[i].arrival.delay / 60;

                switch (arrival_time) {
                    case (null):
                        var scheduled_arrival = departures_for_bus.departures[i].arrival.scheduled;
                        document.getElementById("route_depart_bus").innerHTML = `${scheduled_arrival} <span id="delay"></span>`;
                        document.getElementById("delay_bus").innerHTML = "(scheduled)";

                        document.getElementById("route_depart_bus").style.color = "black";
                        document.getElementById("delay_bus").style.color = "black";
                        break;
                    default:
                        document.getElementById("route_depart_bus").innerHTML = `${arrival_time} <span id="delay"></span>`;
                        document.getElementById("route_depart_bus").style.color = "green";
                        var delay_in_minutes = Math.round(delay_time);

                        switch (delay_time) {
                            case (null):
                                document.getElementById("delay_bus").innerHTML = "(no data)";
                                document.getElementById("delay_bus").style.color = "black";
                                break;
                            case (delay_time > 60):
                                document.getElementById("delay_bus").innerHTML = `(${delay_in_minutes} min late)`;
                                document.getElementById("delay_bus").style.color = "orange";
                                break;
                            case (delay_time < 0):
                                document.getElementById("delay_bus").innerHTML = `(${delay_in_minutes} min early)`;
                                document.getElementById("delay_bus").style.color = "skyblue";
                                break;
                            default:
                                document.getElementById("delay_bus").innerHTML = "(on time)";
                                document.getElementById("delay_bus").style.color = "green";
                                break;
                        }
                        break;
                }

                document.getElementById("line_for_each_departure_bus").innerHTML = route_short_name;
                document.getElementById("line_for_each_departure_bus").style.color = route_text_color;
                document.getElementById("line_for_each_departure_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("line_for_each_departure_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_headsign_bus").innerHTML = route_headsign;

                var departure_entity = document.getElementById("line_for_departure_bus");
                var cloned_departure = departure_entity.cloneNode(true);
                document.getElementById("list_of_departures_bus").appendChild(cloned_departure);
            }

            var total_departures = document.getElementById("list_of_departures_bus");
            document.getElementById("list_of_departures_bus").removeChild(total_departures[0]);
        }
    }
    departure_call.send();
}