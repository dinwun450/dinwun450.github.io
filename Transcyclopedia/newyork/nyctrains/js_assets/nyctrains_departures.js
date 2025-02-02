var onestop_id = "";
var icon_or_not = null;
var img_icon = "";

function changeNYCTrainDepartures(d) {
    var onestop_stop_id = document.getElementById("stationgetter").value;
    var onestop_id_departures = d;

    switch (onestop_id_departures) {
        case "mtasir":
            onestop_id = "o-dr5r-nyct";
            img_icon = `<img src="img_assets/mta_sir.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "mtallrr":
            onestop_id = "o-dr5-longislandrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "mtametronorth":
            onestop_id = "o-dr7-metro~northrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "path":
            onestop_id = "o-dr5r-path";
            img_icon = `<img src="img_assets/path.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "njtransitrail":
            onestop_id = "o-dr5-nj~transit";
            img_icon = "";
            icon_or_not = false;
            break;
        default:
            onestop_id = "";
            img_icon = "";
            icon_or_not = null;
            document.querySelector("#stationname").innerHTML = `---`;
            document.getElementById("list_of_train_departures").innerHTML = `
                <li id="line_for_departure_train" class="lod_styling"><div id="lod_train" class="styling_for_routes symbol_tagged">-</div> <span id="hod_train" class="route_headsigns">(None)</span> <span id="depart_time_train" class="departure_times">Enter a station by their station ID, then select a train agency.</span></li>
            `;
    }

    if (d === "prompt") {
        console.log("Pass");
    }
    else {
        getNYCTrainDeparturesPOne(onestop_id, onestop_stop_id);
    }
}

function getNYCTrainDeparturesPOne(getOneStopID, insStopOnestopID) {
    document.querySelector("#stationname").innerHTML = `---`;
    document.getElementById("list_of_train_departures").innerHTML = `
        <li id="line_for_departure_train" class="lod_styling"><div id="lod_train" class="styling_for_routes symbol_tagged">-</div> <span id="hod_train" class="route_headsigns">Loading...</span> <span id="depart_time_train" class="departure_times">Please wait...</span></li>
    `;

    var nyc_train_caller = new XMLHttpRequest();
    nyc_train_caller.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insStopOnestopID}&served_by_onestop_ids=${getOneStopID}&served_by_route_type=2`);
    nyc_train_caller.onreadystatechange = function() {
        if (nyc_train_caller.readyState === 4 && nyc_train_caller.status === 200) {
            var nyc_train_receiver = JSON.parse(nyc_train_caller.responseText);
            var onestop_id_departures = nyc_train_receiver.stops[0].onestop_id;
            var stop_name = nyc_train_receiver.stops[0].stop_name;
            
            document.querySelector("#stationname").innerHTML = stop_name;
            getNYCTrainDeparturesPTwo(onestop_id_departures, icon_or_not, img_icon);
        }
    }
    nyc_train_caller.send();
}

function getNYCTrainDeparturesPTwo(getOneStopID, determineIcon, iconImage) {
    var nyc_train_caller = new XMLHttpRequest();
    nyc_train_caller.open("GET", `https://transit.land/api/v2/rest/stops/${getOneStopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    nyc_train_caller.onreadystatechange = function() {
        if (nyc_train_caller.readyState === 4 && nyc_train_caller.status === 200) {
            var nyc_train_receiver = JSON.parse(nyc_train_caller.responseText).stops[0].departures;

            for (var i = 0; i < nyc_train_receiver.length; i++) {
                var route_color = nyc_train_receiver[i].trip.route.route_color;
                var route_text_color = nyc_train_receiver[i].trip.route.route_text_color;
                var route_short_name = nyc_train_receiver[i].trip.route.route_short_name;
                var departure_headsign = nyc_train_receiver[i].trip.trip_headsign;

                // Departure Variables
                var arrival_est = nyc_train_receiver[i].arrival.estimated;
                var delayed_time = nyc_train_receiver[i].arrival.delay / 60;

                switch (arrival_est) {
                    case null:
                        var arrival_est = nyc_train_receiver[i].arrival.scheduled;
                        document.getElementById("depart_time_train").innerHTML = `${arrival_est} <span id="delay_train"></span>`;
                        document.getElementById("depart_time_train").style.color = "black";
                        document.getElementById("delay_train").innerHTML = "(scheduled)";
                        document.getElementById("delay_train").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_train").innerHTML = `${arrival_est} <span id="delay_train"></span>`;
                        document.getElementById("depart_time_train").style.color = "rgb(10, 161, 45)";
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

                if (determineIcon === true) {
                    document.getElementById("lod_train").innerHTML = iconImage;
                }
                else if (route_short_name === null) {
                    document.getElementById("lod_train").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("lod_train").innerHTML = `${route_short_name}`;
                }

                if (route_text_color === "000000") {
                    document.getElementById("lod_train").style.filter = "invert(1)";
                }
                else {
                    document.getElementById("lod_train").style.filter = "invert(0)";
                }

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
    nyc_train_caller.send();
}