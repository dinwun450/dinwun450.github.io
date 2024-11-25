var no_route_alerts_chicagobuses = [];
var onestop_id = "";

function changeChicagoBusAlerts(c) {
    var chicago_bus_alerts = c;

    switch (chicago_bus_alerts) {
        case "cta":
            onestop_id = "o-dp3-chicagotransitauthority";
            break;
        case "pace":
            onestop_id = "o-dp3-pace";
            break;
        default:
            onestop_id = "";
            no_route_alerts_chicagobuses = [];
            document.getElementById("bus_agency_alerts").innerHTML = `
                <li id="alert_agency_entity"><p>Select a Bus agency.</p></li>
            `;
            document.getElementById("bus_lines_alerts").innerHTML = `
                <li id="alert_routes_entity"><p>Once you selected the bus agency and typed down the specific routes, it'll show here.</p></li>
            `;
            break;
    }

    if (c === "prompt") {
        console.log("reset!");
    }
    else {
        getChicagoBusAgencyAlerts(onestop_id);
        getChicagoBusRouteAlerts(onestop_id);
    }
}

function getChicagoBusAgencyAlerts(onestop_id) {
    document.getElementById("bus_agency_alerts").innerHTML = `
        <li id="alert_agency_entity"><p>Loading...</p></li>
    `;

    var chicagobuses_agency_alert_caller = new XMLHttpRequest();
    chicagobuses_agency_alert_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    chicagobuses_agency_alert_caller.onreadystatechange = function() {
        if (chicagobuses_agency_alert_caller.readyState === 4 && chicagobuses_agency_alert_caller.status === 200) {
            var chicagobuses_agency_alert_receiver = JSON.parse(chicagobuses_agency_alert_caller.responseText);

            if (chicagobuses_agency_alert_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_agency_entity").innerHTML = "<p>There's no alerts in this agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < chicagobuses_agency_alert_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = chicagobuses_agency_alert_receiver.agencies[0].alerts[i].description_text;
                    if (alert_agency_desc.length == 0) {
                        console.log("nothing!");
                        var desc_of_alert_in_agency = "";
                    }
                    else {
                        var desc_of_alert_in_agency = alert_agency_desc[0].text
                    }
                    var alert_agency_header = chicagobuses_agency_alert_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_agency_entity").innerHTML = `<b>${alert_agency_header}</b> <br> ${desc_of_alert_in_agency}`;
                }
            }
        }
    }
    chicagobuses_agency_alert_caller.send();
}

function getChicagoBusRouteAlerts(onestop_id) {
    no_route_alerts_chicagobuses = [];
    document.getElementById("bus_lines_alerts").innerHTML = `
        <li id="alert_routes_entity"><p>Loading...</p></li>
    `;

    var chicagobuses_route_alert_caller = new XMLHttpRequest();
    chicagobuses_route_alert_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&include_alerts=true`);
    chicagobuses_route_alert_caller.onreadystatechange = function() {
        if (chicagobuses_route_alert_caller.readyState === 4 && chicagobuses_route_alert_caller.status === 200) {
            var chicagobuses_route_alert_receiver = JSON.parse(chicagobuses_route_alert_caller.responseText);

            for (var i = 0; i < chicagobuses_route_alert_receiver.routes.length; i++) {
                var affected_route_color = chicagobuses_route_alert_receiver.routes[i].route_color;
                var affected_route_text_color = chicagobuses_route_alert_receiver.routes[i].route_text_color;
                var affected_route_name = chicagobuses_route_alert_receiver.routes[i].route_short_name;
                var alerts_for_chicagobuses = chicagobuses_route_alert_receiver.routes[i].alerts;

                switch (alerts_for_chicagobuses.length) {
                    case 0:
                        no_route_alerts_chicagobuses.push(affected_route_name);
                        break;
                    default:
                        for (var j = 0; j < alerts_for_chicagobuses.length; j++) {
                            var alert_header = alerts_for_chicagobuses[j].header_text[0].text;
                            var alert_desc = alerts_for_chicagobuses[j].description_text[0].text;

                            document.getElementById("alert_routes_entity").innerHTML = `<p><span id="affectedroutes" class="styling_for_routes"></span> <br> <b>${alert_header}</b> <br> ${alert_desc}</p>`;
                            document.getElementById("affectedroutes").innerHTML = affected_route_name;
                            document.getElementById("affectedroutes").style.backgroundColor = `#${affected_route_color}`;
                            document.getElementById("affectedroutes").style.color = `#${affected_route_text_color}`;
                            document.getElementById("affectedroutes").style.border = `1px solid #${affected_route_color}`;

                            var route_alert_cloner = document.getElementById("alert_routes_entity").cloneNode(true);
                            document.getElementById("bus_lines_alerts").appendChild(route_alert_cloner);
                        }
                        break;
                };
            };

            if (no_route_alerts_chicagobuses.length === chicagobuses_route_alert_receiver.routes.length) {
                document.getElementById("alert_routes_entity").innerHTML = "<p>There are no alerts in all routes under this agency.</p>";
            }
            else {
                var all_route_alerts = document.getElementById("bus_lines_alerts").children;
                document.getElementById("bus_lines_alerts").removeChild(all_route_alerts[0]);
            }
        }
    }
    chicagobuses_route_alert_caller.send();
}