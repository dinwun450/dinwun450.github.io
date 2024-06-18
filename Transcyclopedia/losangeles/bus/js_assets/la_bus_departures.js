var onestop_id = "";

function changeLABusDepartures(c) {
    onestop_busstop_id = document.getElementById("stopgetter").value;
    var la_bus_agency = c;

    switch(la_bus_agency) {
        case "avta":
            onestop_id = "o-antelope~valley~transit~authority";
            break;
        case "baldinpark":
            onestop_id = "o-9qh1g-baldwinparktransit";
            break;
        case "beachcities":
            onestop_id = "o-9q5b-beachcitiestransit~cityofredondobeach";
            break;
        case "burbankbus":
            onestop_id = "o-9q5f7-burbankbus";
            break;
        case "carsoncirc":
            onestop_id = "o-9q5b-carsoncircuit";
            break;
        case "compton":
            onestop_id = "o-9q5bv-comptonrenaissancetransit";
            break;
        case "culver":
            onestop_id = "o-9q5c-culvercitybus";
            break;
        case "foothill":
            onestop_id = "o-9qh1-foothilltransit";
            break;
        case "gtrans":
            onestop_id = "o-9q5b-gtrans";
            break;
        case "glendale":
            onestop_id = "o-9q5f-glendalebeeline";
            break;
        case "glendora":
            onestop_id = "o-9qh4j-glendoratransportationdivision";
            break;
        case "huntington":
            onestop_id = "o-9q5cm-huntingtonparkexpress";
            break;
        case "lagobus":
            onestop_id = "o-9q5-lagobus";
            break;
        case "ladot":
            onestop_id = "o-9q5-ladot";
            break;
        case "lawndale":
            onestop_id = "o-9q5bf-lawndalebeat";
            break;
        case "laxflyaway":
            onestop_id = "o-9q5c-laxflyaway";
            break;
        case "longbeach":
            onestop_id = "o-9q5b-longbeachtransit";
            break;
        case "montebello":
            onestop_id = "o-9qh1-montebellobuslines";
            break;
        case "montereypark":
            onestop_id = "o-9q5cx-spiritbus";
            break;
        case "norwalk":
            onestop_id = "o-9qh1-norwalktransitsystem";
            break;
        case "palosverdes":
            onestop_id = "o-9q5b4-palosverdespeninsulatransitauthority";
            break;
        case "pasadena":
            onestop_id = "o-9q5f-pasadenatransit";
            break;
        case "santaclarita":
            onestop_id = "o-santa~clarita";
            break;
        case "bigbluebus":
            onestop_id = "o-9q5c-bigbluebus";
            break;
        case "torrance":
            onestop_id = "o-9q5b-torrancetransit";
            break;
        default:
            link = "";
            document.querySelector(".headerforbus").innerHTML = `Departures for &nbsp;<span id="stopname">---</span>`;
            document.getElementById("list_of_bus_departures").innerHTML = `<li id="busline_for_departure"><div id="lod_labus">-</div> <span id="aor_labus"></span> <span id="hod_labus">(None)</span> <span id="depart_time_labus">Enter a stop by their stop ID, then select a bus agency.</span></li>`;
            document.getElementById("each_busstop_alert").innerHTML = `<p>Once you typed down the stop by their ID, the advisories will display here.</p>`;
            break;
    }

    if (la_bus_agency === "prompt") {
        console.log("Pass.");
    }
    else {
        getLABusDeparturesPOne(onestop_id, onestop_busstop_id);
    }
}

function getLABusDeparturesPOne(insAgencyOnestopID, insBusstopOnestopID) {
    var la_busstop_call = new XMLHttpRequest();
    la_busstop_call.open("GET", `https://transit.land/api/v2/rest/stops?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&stop_id=${insBusstopOnestopID}&served_by_onestop_ids=${insAgencyOnestopID}`);
    la_busstop_call.onreadystatechange = function() {
        if (la_busstop_call.status === 200 && la_busstop_call.readyState === 4) {
            var la_busstop_receive = JSON.parse(la_busstop_call.responseText);
            var onestop_id_departures = la_busstop_receive.stops[0].onestop_id;
            var la_bus_stop_name = la_busstop_receive.stops[0].stop_name;

            document.getElementById("stopname").innerHTML = la_bus_stop_name;
            getLABusDeparturesPTwo(onestop_id_departures);
        }
    }
    la_busstop_call.send();
}

function getLABusDeparturesPTwo(insOneBusstopID) {
    var la_bus_departure_caller = new XMLHttpRequest();
    la_bus_departure_caller.open("GET", `https://transit.land/api/v2/rest/stops/${insOneBusstopID}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    la_bus_departure_caller.onreadystatechange = function() {
        if (la_bus_departure_caller.status === 200 && la_bus_departure_caller.readyState === 4) {
            var la_bus_departure_receiver = JSON.parse(la_bus_departure_caller.responseText).stops[0];

            for (var i = 0; i < la_bus_departure_receiver.departures.length; i++) {
                var route_color = la_bus_departure_receiver.departures[i].trip.route.route_color;
                var route_text_color = la_bus_departure_receiver.departures[i].trip.route.route_text_color;
                var route_short_name = la_bus_departure_receiver.departures[i].trip.route.route_short_name;
                var departure_headsign = la_bus_departure_receiver.departures[i].trip.trip_headsign;
                var no_of_alerts = la_bus_departure_receiver.departures[i].trip.route.alerts.length;

                // Departure Variables
                var arrival_time = la_bus_departure_receiver.departures[i].arrival.estimated;
                var delay_time = la_bus_departure_receiver.departures[i].arrival.delay / 60;

                switch (arrival_time) {
                    case null:
                        var scheduled_arrival = la_bus_departure_receiver.departures[i].arrival.scheduled;
                        document.getElementById("depart_time_labus").innerHTML = `${scheduled_arrival} <span id="delay_bus"></span>`;
                        document.getElementById("depart_time_labus").style.color = "black";

                        document.getElementById("delay_bus").innerHTML = "scheduled";
                        document.getElementById("delay_bus").style.color = "black";
                        break;
                    default:
                        document.getElementById("depart_time_labus").innerHTML = `${arrival_time} <span id="delay_bus"></span>`;
                        document.getElementById("depart_time_labus").style.color = "rgb(10, 161, 45)";
                        var delay_min = Math.round(delay_time);

                        switch (delay_time) {
                        case null:
                            document.getElementById("delay_bus").innerHTML = "(no data)";
                            document.getElementById("delay_bus").style.color = "black";
                            break;
                        case (delay_time > 60):
                            document.getElementById("delay_bus").innerHTML = `(${delay_min} min late)`;
                            document.getElementById("delay_bus").style.color = "#db4242";
                            break;
                        case (delay_time < 0):
                            document.getElementById("delay_bus").innerHTML = `(${delay_min} min early)`;
                            document.getElementById("delay_bus").style.color = "#0398fc";
                            break;
                        default:
                            document.getElementById("delay_bus").innerHTML = "(on time)";
                            document.getElementById("delay_bus").style.color = "rgb(10, 161, 45)";
                            break;
                        }
                        break;
                }

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                document.getElementById("lod_labus").innerHTML = route_short_name;
                document.getElementById("lod_labus").style.color = `#${route_text_color}`;
                document.getElementById("lod_labus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("lod_labus").style.border = `1px solid #${route_color}`;
                document.getElementById("hod_labus").innerHTML = departure_headsign;

                if (no_of_alerts === 0) {
                    document.getElementById("aor_labus").innerHTML = "";
                }
                else {
                    document.getElementById("aor_labus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation alert_triangle"></i> ${no_of_alerts})`;
                }

                var la_bus_stop_alerts = la_bus_departure_receiver.alerts;
                switch (la_bus_stop_alerts.length) {
                    case 0:
                        document.getElementById("each_busstop_alert").innerHTML = "<p>There are no alerts for this stop.</p>";
                        break;
                    default:
                        for (var j=0; j<la_bus_stop_alerts.length; j++) {
                            var desc_for_stop_alert = la_bus_stop_alerts[j].description_text[0].text;
                            document.getElementById("each_busstop_alert").innerHTML = `<p>${desc_for_stop_alert}</p>`;
                        }
                        break;
                }

                var labus_departure_entity = document.getElementById("busline_for_departure").cloneNode(true);
                document.getElementById("list_of_bus_departures").appendChild(labus_departure_entity);
            }

            var all_labus_departures = document.getElementById("list_of_bus_departures").children;
            document.getElementById("list_of_bus_departures").removeChild(all_labus_departures[0]);
        }
    }
    la_bus_departure_caller.send();
}