function keyDownMTABusesAlerts(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById("mtabuses_lines_alerts").innerHTML = `
            <div id="mtabuses_alert_entity" class="alert_entity_single">Loading...</div>
        `;
        getAlertsFromMTABuses();
    }
}

function getAlertsFromMTABuses() {
    var routeresult = document.getElementById("routegetter_mtabuses").value;
    var no_route_alerts = 0;

    var mtabuses_alerts_caller = new XMLHttpRequest();
    mtabuses_alerts_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-dr5r-nyct&limit=700&route_type=3&search=${routeresult}&include_alerts=true`);
    mtabuses_alerts_caller.onreadystatechange = function() {
        if (mtabuses_alerts_caller.readyState === 4 && mtabuses_alerts_caller.status === 200) {
            var mtabuses_alerts_reciever = JSON.parse(mtabuses_alerts_caller.responseText);
            for (var i = 0; i < mtabuses_alerts_reciever.routes.length; i++) {
                var route_color_affected = mtabuses_alerts_reciever.routes[i].route_color;
                var route_text_color_affected = mtabuses_alerts_reciever.routes[i].route_text_color;
                var route_short_name_affected = mtabuses_alerts_reciever.routes[i].route_short_name;

                if (mtabuses_alerts_reciever.routes[i].alerts.length === 0) {
                    no_route_alerts += 1;
                }
                else {
                    for (var a = 0; a < mtabuses_alerts_reciever.routes[i].alerts.length; a++) {
                        var desc_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].description_text;
                        if (desc_for_alert.length === 1) {
                            desc_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].description_text[0].text;
                        }
                        else {
                            desc_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].description_text[1].text;
                            if (desc_for_alert === undefined) {
                                desc_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].description_text[0].text;
                            }
                        }

                        var header_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].header_text;
                        if (header_for_alert.length === 1) {
                            header_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].header_text[0].text;
                        }
                        else {
                            header_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].header_text[1].text;
                            if (header_for_alert === undefined) {
                                header_for_alert = mtabuses_alerts_reciever.routes[i].alerts[a].header_text[0].text;
                            }
                        }

                        document.getElementById("mtabuses_alert_entity").innerHTML = `<span id="route_affected" class="styling_for_routes"></span> <br> ${header_for_alert} <br> ${desc_for_alert}`;

                        document.getElementById("route_affected").innerHTML = `${route_short_name_affected}`;
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                        document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;

                        var alert_entity = document.getElementById("mtabuses_alert_entity").cloneNode(true);
                        document.getElementById("mtabuses_lines_alerts").appendChild(alert_entity);
                    }
                }
            }

            if (no_route_alerts === mtabuses_alerts_reciever.routes.length) {
                document.getElementById("mtabuses_alert_entity").innerHTML = "No alerts for this route.";
            }
            else {
                var all_alerts = document.getElementById("mtabuses_lines_alerts").children;
                document.getElementById("mtabuses_lines_alerts").removeChild(all_alerts[0]);
            }
        }
    };
    mtabuses_alerts_caller.send();
}

function clearAllMTAAlerts() {
    document.getElementById("mtabuses_lines_alerts").innerHTML = `
        <div id="mtabuses_alert_entity" class="alert_entity_single">Enter a bus route name to see alerts.</div>
    `;
}