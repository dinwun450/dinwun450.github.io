var no_route_alerts_miamitrains = [];
var onestop_id = "";

function changeMiamiTrainAlerts(s) {
    var miami_train_alerts = s;

    switch (miami_train_alerts) {
        case "trirail":
            onestop_id = "o-dhx-tri~rail";
            break;
        case "brightline":
            onestop_id = "o-dh-brightline";
            break;
        default:
            onestop_id = "";
            no_route_alerts_miamitrains = [];
            document.getElementById("train_agency_alerts").innerHTML = `
                <li id="alert_agency_entity"><p>Select a Train agency.</p></li>
            `;
            document.getElementById("train_lines_alerts").innerHTML = `
                <li id="alert_routes_entity"><p>Once you selected the train agency and typed down the specific routes, it'll show here.</p></li>
            `;
            break;
    }

    if (s === "prompt") {
        console.log("reset!");
    }
    else {
        getMiamiTrainAgencyAlerts(onestop_id);
        getMiamiTrainRouteAlerts(onestop_id);
    }
}

function getMiamiTrainAgencyAlerts(onestop_id) {
    document.getElementById("train_agency_alerts").innerHTML = `
        <li id="alert_agency_entity"><p>Loading...</p></li>
    `;
    var miamitrains_agency_alert_caller = new XMLHttpRequest();
    miamitrains_agency_alert_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    miamitrains_agency_alert_caller.onreadystatechange = function() {
        if (miamitrains_agency_alert_caller.readyState === 4 && miamitrains_agency_alert_caller.status === 200) {
            var miamitrains_agency_alert_receiver = JSON.parse(miamitrains_agency_alert_caller.responseText);

            if (miamitrains_agency_alert_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_agency_entity").innerHTML = "<p>There's no alerts in this agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < miamitrains_agency_alert_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = miamitrains_agency_alert_receiver.agencies[0].alerts[i].description_text;
                    if (alert_agency_desc.length == 0) {
                        console.log("nothing!");
                        var desc_of_alert_in_agency = "";
                    }
                    else {
                        var desc_of_alert_in_agency = alert_agency_desc[0].text
                    }
                    var alert_agency_header = miamitrains_agency_alert_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_agency_entity").innerHTML = `<b>${alert_agency_header}</b> <br> ${desc_of_alert_in_agency}`;
                }
            }
        }
    }

    miamitrains_agency_alert_caller.send();
}

function getMiamiTrainRouteAlerts(onestop_id) {
    no_route_alerts_miamitrains = [];
    document.getElementById("train_lines_alerts").innerHTML = `
        <li id="alert_routes_entity"><p>Loading...</p></li>
    `;
    var miamitrains_route_alert_caller = new XMLHttpRequest();
    miamitrains_route_alert_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operated_by=${onestop_id}&limit=700&route_type=2&include_alerts=true`);
    miamitrains_route_alert_caller.onreadystatechange = function() {
        if (miamitrains_route_alert_caller.readyState === 4 && miamitrains_route_alert_caller.status === 200) {
            var miamitrains_route_alert_receiver = JSON.parse(miamitrains_route_alert_caller.responseText);

            for (var i = 0; i < miamitrains_route_alert_receiver.routes.length; i++) {
                var affected_route_color = miamitrains_route_alert_receiver.routes[i].route_color;
                var affected_route_text_color = miamitrains_route_alert_receiver.routes[i].route_text_color;
                var affected_route_name = miamitrains_route_alert_receiver.routes[i].route_short_name;
                var alerts_for_miamitrains = miamitrains_route_alert_receiver.routes[i].alerts;

                switch (alerts_for_miamitrains.length) {
                    case 0:
                        no_route_alerts_miamitrains.push(affected_route_name);
                        break;
                    default:
                        for (var j = 0; j < alerts_for_miamitrains.length; j++) {
                            var alert_header = alerts_for_miamitrains[j].header_text[0].text;
                            var alert_description = alerts_for_miamitrains[j].description_text[0].text;

                            if (affected_route_name === null) {
                                affected_route_name = "&nbsp;&nbsp;&nbsp;";
                            }

                            document.getElementById("alert_routes_entity").innerHTML = `<p><span id="affectedroutes" class="styling_for_routes"></span> <br> <b>${alert_header}</b> <br> ${alert_description}</p>`;
                            document.getElementById("affectedroutes").innerHTML = affected_route_name;
                            document.getElementById("affectedroutes").style.backgroundColor = `#${affected_route_color}40`;
                            document.getElementById("affectedroutes").style.color = `#${affected_route_text_color}`;
                            document.getElementById("affectedroutes").style.border = `1px solid #${affected_route_color}`;

                            var route_alert_cloner = document.getElementById("alert_routes_entity").cloneNode(true);
                            document.getElementById("alert_routes_entity").appendChild(route_alert_cloner);
                        }
                        break;
                };
            };

            if (no_route_alerts_miamitrains.length === miamitrains_route_alert_receiver.routes.length) {
                document.getElementById("alert_routes_entity").innerHTML = "<p>There are no alerts in all routes under this agency.</p>";
            }
            else {
                var all_route_alerts = document.getElementById("alert_routes_entity").cloneNode(true);
                document.getElementById("train_lines_alerts").appendChild(all_route_alerts);
            }
        }
    }

    miamitrains_route_alert_caller.send();
}