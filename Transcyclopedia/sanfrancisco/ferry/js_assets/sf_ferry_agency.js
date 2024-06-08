/* Open the sidenav */
function openNav() {
    document.querySelector(".left_navbar").style.display = "block";
}

/* Close/hide the sidenav */
function closeNav() {
    document.querySelector(".left_navbar").style.display = "none";
    console.log(document.querySelector(".left_navbar").getAttribute("style"));
}

function changeAgency(a) {
    var agency = a;

    switch(agency) {
        case "sfbayferry":
            aboutSFBayFerry();
            countSFBayFerryLines();
            getSFBFContactInfo();
            break;
        case "ggf":
            aboutGGF();
            countGGFLines();
            getGGFContactInfo();
            break;
        default:
            clearInfo();
            break;
    }
} 

function aboutSFBayFerry() {
    console.log("HEY SFBF!")
    var info_caller = new XMLHttpRequest();
    info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=San+Francisco+Bay+Ferry&format=json&origin=*");
    info_caller.onreadystatechange = function() {
        if (info_caller.readyState === 4 && info_caller.status === 200) {
            var article_summary = JSON.parse(info_caller.responseText);
            var desc_of_sfbf = article_summary.query.pages[12625374].extract;

            document.getElementById("desc").innerHTML = `${desc_of_sfbf} <br> <a href="https://en.wikipedia.org/wiki/San_Francisco_Bay_Ferry">Wikipedia</a>`
            document.getElementById("foundingdate").innerHTML = "<b>Around 2011</b>";
        }
    }
    info_caller.send();
}

function countSFBayFerryLines() {
    var route_counter_sfbf = new XMLHttpRequest();
    route_counter_sfbf.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-sanfranciscobayferry&limit=700");
    route_counter_sfbf.onreadystatechange = function() {
        if (route_counter_sfbf.readyState === 4 && route_counter_sfbf.status === 200) {
            var route_outputs_counter_sfbf = JSON.parse(route_counter_sfbf.responseText);
            var counter = 0;
            
            for (var i = 0; i < route_outputs_counter_sfbf.routes.length; i++) {
                counter += 1;
            }

            document.getElementById("nooflines").innerHTML = `<b>${counter}</b>`;
        }
    }
    route_counter_sfbf.send();
}

function getSFBFContactInfo() {
    var sfbf_contact_caller = new XMLHttpRequest();
    sfbf_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9p-sanfranciscobayferry");
    sfbf_contact_caller.onreadystatechange = function() {
        if (sfbf_contact_caller.readyState === 4 && sfbf_contact_caller.status === 200) {
            var sfbf_contact_receiver = JSON.parse(sfbf_contact_caller.responseText);
            var phone_no = sfbf_contact_receiver.agencies[0].agency_phone;
            var email = sfbf_contact_receiver.agencies[0].agency_email;

            switch (phone_no) {
                case "":
                    phone_no = "-";
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
            };

            switch (email) {
                case "":
                    email = "-";
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
                default:
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
            };
        }
    }
    sfbf_contact_caller.send();
}

function aboutGGF() {
    var info_caller = new XMLHttpRequest();
    info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=Golden+Gate+Ferry&format=json&origin=*")
    info_caller.onreadystatechange = function() {
        if (info_caller.readyState === 4 && info_caller.status === 200) {
            var article_summary = JSON.parse(info_caller.responseText);
            var desc_of_ggf = article_summary.query.pages[12061444].extract;

            document.getElementById("desc").innerHTML = `${desc_of_ggf} <br> <a href="https://en.wikipedia.org/wiki/Golden_Gate_Ferry">Wikipedia</a>`
            document.getElementById("foundingdate").innerHTML = "<b>August 15, 1970</b>";
        }
    }
    info_caller.send();
}

function countGGFLines() {
    var route_counter_ggf = new XMLHttpRequest();
    route_counter_ggf.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8z-goldengateferry&limit=700");
    route_counter_ggf.onreadystatechange = function() {
        if (route_counter_ggf.readyState === 4 && route_counter_ggf.status === 200) {
            var route_outputs_counter_ggf = JSON.parse(route_counter_ggf.responseText);
            var counter = 0;
            
            for (var i = 0; i < route_outputs_counter_ggf.routes.length; i++) {
                counter += 1;
            }

            document.getElementById("nooflines").innerHTML = `<b>${counter}</b>`;
        }
    }
    route_counter_ggf.send();
}

function getGGFContactInfo() {
    var ggf_contact_caller = new XMLHttpRequest();
    ggf_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9p-sanfranciscobayferry");
    ggf_contact_caller.onreadystatechange = function() {
        if (ggf_contact_caller.readyState === 4 && ggf_contact_caller.status === 200) {
            var ggf_contact_receiver = JSON.parse(ggf_contact_caller.responseText);
            var phone_no = ggf_contact_receiver.agencies[0].agency_phone;
            var email = ggf_contact_receiver.agencies[0].agency_email;

            switch (phone_no) {
                case "":
                    phone_no = "-";
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
            };

            switch (email) {
                case "":
                    email = "-";
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
                default:
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
            };
        }
    }
    ggf_contact_caller.send();
}

function clearInfo() {
    document.getElementById("desc").innerHTML = "Select a Ferry Agency.";
    document.getElementById("foundingdate").innerHTML = "<b>-</b>";
    document.getElementById("nooflines").innerHTML = "<b>-</b>";
    document.getElementById("email_agency").innerHTML = "<b>-</b> (Email)";
    document.getElementById("phone_agency").innerHTML = "<b>-</b> (Phone)";
}

function changeRouteByAgency(a) {
    var agency = a;

    switch(agency) {
        case "sfbayferry":
            SFBayFerryLines();
            break;
        case "ggf":
            GGFLines();
            break;
        default:
            clearLines();
            break;
    }
}

function SFBayFerryLines() {
    document.querySelector(".ferry_lines").innerHTML = `
        <li id="route_entity_ferry"><span id="route_ferry" title="Loading...">-</span> &nbsp; <span id="desc_ferry" title="Please wait...">Loading...</span><br></li>
    `;

    var route_caller = new XMLHttpRequest();
    route_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-sanfranciscobayferry&limit=700");
    route_caller.onreadystatechange = function() {
        if (route_caller.readyState === 4 && route_caller.status === 200) {
            var route_compiler = JSON.parse(route_caller.responseText);
            
            for (var i=0; i<route_compiler.routes.length; i++) {
                var base_route = route_compiler.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name = base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                document.getElementById("route_ferry").innerHTML = route_short_name;
                document.getElementById("route_ferry").style.color = `#${route_text_color}`;
                document.getElementById("route_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("desc_ferry").innerHTML = route_long_name;

                document.getElementById("route_ferry").removeAttribute("title");
                document.getElementById("desc_ferry").removeAttribute("title");

                var ferry_line = document.getElementById("route_entity_ferry");
                var clone_ferry_line = ferry_line.cloneNode(true);
                document.querySelector(".ferry_lines").append(clone_ferry_line);
            }

            var all_ferry_lines = document.querySelector(".ferry_lines").children;
            document.querySelector(".ferry_lines").removeChild(all_ferry_lines[0]);
        }
    }
    route_caller.send();
}

function GGFLines() {
    document.querySelector(".ferry_lines").innerHTML = `
        <li id="route_entity_ferry"><span id="route_ferry" title="Loading...">-</span> &nbsp; <span id="desc_ferry" title="Please wait...">Loading...</span><br></li>
    `;
    
    var route_caller = new XMLHttpRequest();
    route_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8z-goldengateferry&limit=700");
    route_caller.onreadystatechange = function() {
        if (route_caller.readyState === 4 && route_caller.status === 200) {
            var route_compiler = JSON.parse(route_caller.responseText);
            
            for (var i=0; i<route_compiler.routes.length; i++) {
                var base_route = route_compiler.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name = base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                document.getElementById("route_ferry").innerHTML = route_short_name;
                document.getElementById("route_ferry").style.color = `#${route_text_color}`;
                document.getElementById("route_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("desc_ferry").innerHTML = route_long_name;

                document.getElementById("route_ferry").removeAttribute("title");
                document.getElementById("desc_ferry").removeAttribute("title");

                var ferry_line = document.getElementById("route_entity_ferry");
                var clone_ferry_line = ferry_line.cloneNode(true);
                document.querySelector(".ferry_lines").append(clone_ferry_line);
            }

            var all_ferry_lines = document.querySelector(".ferry_lines").children;
            document.querySelector(".ferry_lines").removeChild(all_ferry_lines[0]);
        }
    }
    route_caller.send();
}

function clearLines() {
    document.querySelector(".ferry_lines").innerHTML = `
        <li id="route_entity_ferry"><span id="route_ferry" title="No route given. Please select a ferry agency on the top dropdown box.">-</span> &nbsp; <span id="desc_ferry" title="Please select a ferry agency on the top.">Select a Ferry Agency.</span><br></li>
    `;
}

function callOverFerry(a) {
    getValue = document.getElementById("terminalgetter").value;
    console.log(getValue);

    var agency = a;
    console.log(a)
    switch(agency) {
        case "sfbayferry":
            SFBayFerryDeparturesPOne(getValue);
            break;
        case "ggf":
            GGFDeparturesPOne(getValue);
            break;
        default:
            clearInfo();
            break;
    }
}

function SFBayFerryDeparturesPOne(onestop_id) {
    var sfbf_stop_call = new XMLHttpRequest();
    sfbf_stop_call.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9q9p-sanfranciscobayferry&stop_id=${onestop_id}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    sfbf_stop_call.onreadystatechange = function() {
        if (sfbf_stop_call.status === 200 && sfbf_stop_call.readyState === 4) {
            var stop_info = JSON.parse(sfbf_stop_call.responseText);
            var stop_id = stop_info.stops[0].onestop_id;
            var stop_name = stop_info.stops[0].stop_name;

            document.getElementById("terminalname").innerHTML = stop_name;
            SFBayFerryDeparturesPTwo(stop_id);
        }
    }
    sfbf_stop_call.send();
}

function SFBayFerryDeparturesPTwo(departures_onestop) {
    var sfbf_departure_call = new XMLHttpRequest();
    sfbf_departure_call.open("GET", `https://transit.land/api/v2/rest/stops/${departures_onestop}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    sfbf_departure_call.onreadystatechange = function() {
        if (sfbf_departure_call.status === 200 && sfbf_departure_call.readyState === 4) {
            var departures_sfbf = JSON.parse(sfbf_departure_call.responseText).stops[0];
            
            for (var i=0; i<departures_sfbf.departures.length; i++) {
                var route_color = departures_sfbf.departures[i].trip.route.route_color;
                var route_text_color = departures_sfbf.departures[i].trip.route.route_text_color;
                var route_short_name = departures_sfbf.departures[i].trip.route.route_short_name;
                var route_headsign = departures_sfbf.departures[i].trip.trip_headsign;

                var arrival_time = departures_sfbf.departures[i].arrival.estimated;
                var delay_time = departures_sfbf.departures[i].arrival.delay / 60;

                switch(arrival_time) {
                    case (null):
                        var scheduled_arrival = departures_sfbf.departures[i].arrival.scheduled;
                        document.getElementById("route_depart_ferry").innerHTML = `${scheduled_arrival} <span id="delay_ferry"></span>`;
                        document.getElementById("delay_ferry").innerHTML = "(scheduled)";

                        document.getElementById("route_depart_ferry").style.color = "black";
                        document.getElementById("delay_ferry").style.color = "black";
                        break;
                    default:
                        document.getElementById("route_depart_ferry").innerHTML = `${arrival_time} <span id="delay_ferry"></span>`;
                        document.getElementById("route_depart_ferry").style.color = "rgb(10, 161, 45)";
                        var delay_min = Math.round(departures_sfbf.departures[i].arrival.delay / 60);

                        switch(delay_time) {
                            case (null):
                                document.getElementById("delay_ferry").innerHTML = "(no data)";
                                document.getElementById("delay_ferry").style.color = "black";
                                break;
                            case (delay_time > 60):
                                document.getElementById("delay_ferry").innerHTML = `(${delay_min} min late)`;
                                document.getElementById("delay_ferry").style.color = "#db4242";
                                break;
                            case (delay_time < 0):
                                document.getElementById("delay_ferry").innerHTML = `(${delay_min} min early)`;
                                document.getElementById("delay_ferry").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_ferry").innerHTML = "(on time)";
                                document.getElementById("delay_ferry").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                document.getElementById("line_for_each_departure_ferry").innerHTML = route_short_name;
                document.getElementById("line_for_each_departure_ferry").style.color = route_text_color;
                document.getElementById("line_for_each_departure_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("line_for_each_departure_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_headsign_ferry").innerHTML = route_headsign;

                var departure_entity = document.getElementById("line_for_departure_ferry");
                var cloned_departure = departure_entity.cloneNode(true);
                document.getElementById("list_of_departures_ferry").appendChild(cloned_departure);
            }

            var total_departures = document.getElementById("list_of_departures_ferry").children;
            document.getElementById("list_of_departures_ferry").removeChild(total_departures[0]);
        }
    }
    sfbf_departure_call.send();
}

function GGFDeparturesPOne(onestop_id) {
    var ggf_stop_call = new XMLHttpRequest();
    ggf_stop_call.open("GET", `https://transit.land/api/v2/rest/stops?served_by_onestop_ids=o-9q8z-goldengateferry&stop_id=${onestop_id}&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
    ggf_stop_call.onreadystatechange = function() {
        if (ggf_stop_call.status === 200 && ggf_stop_call.readyState === 4) {
            var stop_info = JSON.parse(ggf_stop_call.responseText);
            var stop_id = stop_info.stops[0].onestop_id;
            var stop_name = stop_info.stops[0].stop_name;

            document.getElementById("terminalname").innerHTML = stop_name;
            GGFDeparturesPTwo(stop_id);
        }
    }
    ggf_stop_call.send();
}

function GGFDeparturesPTwo(departures_onestop) {
    var ggf_departure_call = new XMLHttpRequest();
    ggf_departure_call.open("GET", `https://transit.land/api/v2/rest/stops/${departures_onestop}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
    ggf_departure_call.onreadystatechange = function() {
        if (ggf_departure_call.status === 200 && ggf_departure_call.readyState === 4) {
            var departures_ggf = JSON.parse(ggf_departure_call.responseText).stops[0];
            
            for (var i=0; i<departures_ggf.departures.length; i++) {
                var route_color = departures_ggf.departures[i].trip.route.route_color;
                var route_text_color = departures_ggf.departures[i].trip.route.route_text_color;
                var route_short_name = departures_ggf.departures[i].trip.route.route_short_name;
                var route_headsign = departures_ggf.departures[i].trip.trip_headsign;

                var arrival_time = departures_ggf.departures[i].arrival.estimated;
                var delay_time = departures_ggf.departures[i].arrival.delay / 60;

                switch(arrival_time) {
                    case (null):
                        var scheduled_arrival = departures_ggf.departures[i].arrival.scheduled;
                        document.getElementById("route_depart_ferry").innerHTML = `${scheduled_arrival} <span id="delay_ferry"></span>`;
                        document.getElementById("delay_ferry").innerHTML = "(scheduled)";

                        document.getElementById("route_depart_ferry").style.color = "black";
                        document.getElementById("delay_ferry").style.color = "black";
                        break;
                    default:
                        document.getElementById("route_depart_ferry").innerHTML = `${arrival_time} <span id="delay_ferry"></span>`;
                        document.getElementById("route_depart_ferry").style.color = "rgb(10, 161, 45)";
                        var delay_min = Math.round(departures_ggf.departures[i].arrival.delay / 60);

                        switch(delay_time) {
                            case (null):
                                document.getElementById("delay_ferry").innerHTML = "(no data)";
                                document.getElementById("delay_ferry").style.color = "black";
                                break;
                            case (delay_time > 60):
                                document.getElementById("delay_ferry").innerHTML = `(${delay_min} min late)`;
                                document.getElementById("delay_ferry").style.color = "#db4242";
                                break;
                            case (delay_time < 0):
                                document.getElementById("delay_ferry").innerHTML = `(${delay_min} min early)`;
                                document.getElementById("delay_ferry").style.color = "#0398fc";
                                break;
                            default:
                                document.getElementById("delay_ferry").innerHTML = "(on time)";
                                document.getElementById("delay_ferry").style.color = "rgb(10, 161, 45)";
                                break;
                        }
                        break;
                }

                document.getElementById("line_for_each_departure_ferry").innerHTML = route_short_name;
                document.getElementById("line_for_each_departure_ferry").style.color = route_text_color;
                document.getElementById("line_for_each_departure_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("line_for_each_departure_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_headsign_ferry").innerHTML = route_headsign;

                var departure_entity = document.getElementById("line_for_departure_ferry");
                var cloned_departure = departure_entity.cloneNode(true);
                document.getElementById("list_of_departures_ferry").appendChild(cloned_departure);
            }

            var total_departures = document.getElementById("list_of_departures_ferry").children;
            document.getElementById("list_of_departures_ferry").removeChild(total_departures[0]);
        }
    }
    ggf_departure_call.send();
}

function clearInfo() {
    document.querySelector(".headerforferry").innerHTML = `Departures for &nbsp;<span id="terminalname">---</span>`;
    document.getElementById("list_of_departures_ferry").innerHTML = `<li id="line_for_departure_ferry"><div class="wrapper_for_departure_ferry"><div id="line_for_each_departure_ferry">-</div> <span id="alerts_ferry"></span> <span id="route_headsign_ferry">(None)</span><span id="route_depart_ferry">Enter a specific station by their station ID, then select a ferry agency. <br> For GGF Departures, key in the GF: prefix, then their terminal id.</span></div></li>`
}

function changeAgencyInAlerts(a) {
    var agency = a;

    switch(agency) {
        case "sfbayferry":
            compileAlertsSFBF();
            break;
        case "ggf":
            compileAlertsGGF();
            break;
        default:
            clearAllAlerts();
    }
}

function compileAlertsSFBF() {
    var alert_caller = new XMLHttpRequest();
    alert_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9p-sanfranciscobayferry&include_alerts=true");
    alert_caller.onreadystatechange = function() {
        if (alert_caller.readyState === 4 && alert_caller.status === 200) {
            var alert_lists = JSON.parse(alert_caller.responseText).agencies[0].alerts;

            if (alert_lists.length === 0) {
                document.getElementById("alert_desc").innerHTML = "There are no alerts for San Francisco Bay Ferry.";
            }
            else {
                for (var i=0; i<alert_lists.length; i++) {
                    var alert_desc = alert_lists[i].description_text[0].text;
                    var alert_header = alert_lists[i].header_text[0].text;

                    document.getElementById("alert_desc").innerHTML = `<p><b>${alert_header}</b></p><br><p>${alert_desc}`;
                }
            }
        }
    }
    alert_caller.send();
}

function compileAlertsGGF() {
    var alert_caller = new XMLHttpRequest();
    alert_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q8z-goldengateferry&include_alerts=true");
    alert_caller.onreadystatechange = function() {
        if (alert_caller.readyState === 4 && alert_caller.status === 200) {
            var alert_lists = JSON.parse(alert_caller.responseText).agencies[0].alerts;

            if (alert_lists.length === 0) {
                document.getElementById("alert_desc").innerHTML = "There are no alerts for Golden Gate Ferry.";
            }
            else {
                for (var i=0; i<alert_lists.length; i++) {
                    var alert_desc = alert_lists[i].description_text[0].text;
                    var alert_header = alert_lists[i].header_text[0].text;

                    document.getElementById("alert_desc").innerHTML = `<p><b>${alert_header}</b></p><br><p>${alert_desc}`;
                }
            }
        }
    }
    alert_caller.send();
}

function clearAllAlerts() {
    document.querySelector(".alert_entity").innerHTML = `<p id="alert_desc">Select a ferry agency on the top.</p>`
}