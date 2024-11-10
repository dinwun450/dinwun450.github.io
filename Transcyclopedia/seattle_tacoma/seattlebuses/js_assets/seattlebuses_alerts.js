var no_route_alerts_seattlebuses = [];
var onestop_id = "";

function changeSeattleBusAlerts(s) {
    var seattle_bus_agency = s;

    switch (seattle_bus_agency) {
        case "king_county_metro":
            onestop_id = "o-c23-metrotransit";
            break;
        case "pierce_transit":
            onestop_id = "o-c22u-piercetransit";
            break;
        case "kitsap_transit":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "community_transit":
            onestop_id = "o-c29-communitytransit";
            break;
        case "everett_transit":
            onestop_id = "o-c290-everetttransit";
            break;
        case "solid_ground":
            onestop_id = "o-c23nb-solidground";
            break;
        default:
            onestop_id = "";
            no_route_alerts_seattlebuses = [];
            document.getElementById("bus_agency_alerts").innerHTML = `
                <li id="alert_agency_entity"><p>Select a Bus agency.</p></li>
            `;
            document.getElementById("bus_lines_alerts").innerHTML = `
                <li id="alert_routes_entity"><p>Once you selected the bus agency and typed down the specific routes, it'll show here.</p></li>
            `;
    }

    if (s === "prompt") {
        console.log("reset!");
    }
    else {
        getSeattleBusAgencyAlerts(onestop_id);
        getSeattleBusRouteAlerts(onestop_id);
    }
}

function getSeattleBusAgencyAlerts(onestop_id) {
    document.getElementById("bus_agency_alerts").innerHTML = `
        <li id="alert_agency_entity"><p>Loading...</p></li>
    `;
    var seattlebuses_agency_alert_caller = new XMLHttpRequest();
    seattlebuses_agency_alert_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    seattlebuses_agency_alert_caller.onreadystatechange = function() {
        if (seattlebuses_agency_alert_caller.readyState === 4 && seattlebuses_agency_alert_caller.status === 200) {
            var seattlebuses_agency_alert_receiver = JSON.parse(seattlebuses_agency_alert_caller.responseText);

            if (seattlebuses_agency_alert_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_agency_entity").innerHTML = "<p>There's no alerts in this agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < seattlebuses_agency_alert_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = seattlebuses_agency_alert_receiver.agencies[0].alerts[i].description_text;
                    if (alert_agency_desc.length == 0) {
                        console.log("nothing!");
                        var desc_of_alert_in_agency = "";
                    }
                    else {
                        var desc_of_alert_in_agency = alert_agency_desc[0].text
                    }
                    var alert_agency_header = seattlebuses_agency_alert_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_agency_entity").innerHTML = `<b>${alert_agency_header}</b> <br> ${desc_of_alert_in_agency}`;
                }
            }
        }
    }
    seattlebuses_agency_alert_caller.send();
}

function getSeattleBusRouteAlerts(onestop_id) {
    no_route_alerts_seattlebuses = [];
    document.getElementById("bus_lines_alerts").innerHTML = `
        <li id="alert_routes_entity"><p>Loading...</p></li>
    `;
    var seattlebuses_route_alert_caller = new XMLHttpRequest();
    seattlebuses_route_alert_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=3&include_alerts=true`);
    seattlebuses_route_alert_caller.onreadystatechange = function() {
        if (seattlebuses_route_alert_caller.readyState === 4 && seattlebuses_route_alert_caller.status === 200) {
            var seattlebuses_route_alert_receiver = JSON.parse(seattlebuses_route_alert_caller.responseText);

            for (var i = 0; i < seattlebuses_route_alert_receiver.routes.length; i++) {
                var affected_route_color = seattlebuses_route_alert_receiver.routes[i].route_color;
                var affected_route_text_color = seattlebuses_route_alert_receiver.routes[i].route_text_color;
                var affected_route_name = seattlebuses_route_alert_receiver.routes[i].route_short_name;
                var alerts_for_seattlebuses = seattlebuses_route_alert_receiver.routes[i].alerts;

                switch(alerts_for_seattlebuses.length) {
                    case 0:
                        no_route_alerts_seattlebuses.push(affected_route_name);
                        break;
                    default:
                        for (var j = 0; j < alerts_for_seattlebuses.length; j++) {
                            var seattlebuses_alert_route_desc = alerts_for_seattlebuses[j].description_text[0].text;
                            var seattlebuses_alert_route_header = alerts_for_seattlebuses[j].header_text[0].text;

                            if (affected_route_name === null) {
                                affected_route_name = "&nbsp;&nbsp;&nbsp;";
                            }

                            document.getElementById("alert_routes_entity").innerHTML = `<p><span id="affectedroutes" class="styling_for_routes"></span> <br> <b>${seattlebuses_alert_route_header}</b> <br> ${seattlebuses_alert_route_desc}</p>`;
                            document.getElementById("affectedroutes").innerHTML = affected_route_name;
                            document.getElementById("affectedroutes").style.backgroundColor = `#${affected_route_color}40`;
                            document.getElementById("affectedroutes").style.color = `#${affected_route_text_color}`;
                            document.getElementById("affectedroutes").style.border = `1px solid #${affected_route_color}`;

                            var route_alert_cloner = document.getElementById("alert_routes_entity").cloneNode(true);
                            document.getElementById("bus_lines_alerts").appendChild(route_alert_cloner);
                        }
                        break;
                };
            };

            if (no_route_alerts_seattlebuses.length === seattlebuses_route_alert_receiver.routes.length) {
                document.getElementById("alert_routes_entity").innerHTML = "<p>There are no alerts in all routes under this agency.</p>";
            }
            else {
                var all_route_alerts = document.getElementById("bus_lines_alerts").children;
                document.getElementById("bus_lines_alerts").removeChild(all_route_alerts[0]);
            }
        }
    }
    seattlebuses_route_alert_caller.send();
}