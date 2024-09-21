var onestop_id = "";

function changeHIBusAlerts(a) {
    var hi_bus_agency = a;

    switch(hi_bus_agency) {
        case "thebus":
            onestop_id = "o-87z-thebus";
            break;
        case "hele_on":
            onestop_id = "o-hele~on~hi";
            break;
        case "maui_bus":
            onestop_id = "o-maui~county~transit";
            break;
        case "kauai_bus":
            onestop_id = "o-87yt-countyofkauai~transportationagency";
            break;
        default:
            onestop_id = "";
            document.getElementById("bus_alerts_agency").innerHTML = `<li id="alert_desc_agency">Select a bus agency on the top.</li>`;
            document.getElementById("bus_alerts_routes").innerHTML = `
                <li id="alert_desc_routes">
                    <p>
                        <span id="alert_for_specific_route">Once you selected the bus agency and typed down the specific routes, it'll show here.</span>
                    </p>
                </li>
            `;
    }

    if (hi_bus_agency === "prompt") {
        console.log("Reset!");
    }
    else {
        getHIBusAlerts(onestop_id);
        getHIBusRouteAlerts(onestop_id);
    }
}

function getHIBusAlerts(onestop_id) {
    document.getElementById("bus_alerts_agency").innerHTML = `<li id="alert_desc_agency">Loading...</li>`;
    document.getElementById("bus_alerts_routes").innerHTML = `
        <li id="alert_desc_routes">
            <p>
                <span id="alert_for_specific_route">Loading...</span>
            </p>
        </li>
    `;

    var hi_agency_caller = new XMLHttpRequest();
    hi_agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    hi_agency_caller.onreadystatechange = function() {
        if (hi_agency_caller.readyState === 4 && hi_agency_caller.status === 200) {
            var hi_agency_receiver = JSON.parse(hi_agency_caller.responseText);
            var hi_agency_alerts = hi_agency_receiver.agencies[0].alerts;

            if (hi_agency_alerts.length === 0) {
                document.getElementById("alert_desc_agency").innerHTML = "There are no alerts for this bus agency.";
            }
            else {
                for (var i = 0; i < hi_agency_alerts.length; i++) {
                    var header_for_alert = hi_agency_alerts[i].header_text[0].text;
                    var desc_for_alert = hi_agency_alerts[i].description_text[0].text;
                    document.getElementById("alert_desc_agency").innerHTML = `<b>${header_for_alert}</b> <br> ${desc_for_alert}`;

                    var alert_cloner_agency = document.getElementById("alert_desc_agency").cloneNode(true);
                    document.getElementById("bus_alerts_agency").appendChild(alert_cloner_agency);   
                };

                var all_alerts_in_agency = document.getElementById("bus_alerts_agency").children;
                document.getElementById("bus_alerts_agency").removeChild(all_alerts_in_agency[0]);
            }
        }
    };
    hi_agency_caller.send();
};

function getHIBusRouteAlerts(onestop_id) {
    var hi_route_caller = new XMLHttpRequest();
    hi_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&include_alerts=true`);
    hi_route_caller.onreadystatechange = function() {
        if (hi_route_caller.readyState === 4 && hi_route_caller.status === 200) {
            var hi_route_receiver = JSON.parse(hi_route_caller.responseText);
            var hi_bus_all_routes = hi_route_receiver.routes;
            var no_route_alerts_hi_bus = 0;

            for (var i = 0; i < hi_bus_all_routes.length; i++) {
                var affected_route_color = hi_bus_all_routes[i].route_color;
                var affected_route_text_color = hi_bus_all_routes[i].route_text_color;
                var affected_route_short_name = hi_bus_all_routes[i].route_short_name;
                var all_alerts = hi_bus_all_routes[i].alerts;

                if (all_alerts.length === 0) {
                    no_route_alerts_hi_bus += 1;
                }
                else {
                    for (var j = 0; j < all_alerts.length; j++) {
                        var hi_bus_alert_route_desc = all_alerts[j].description_text[0].text;
                        var hi_bus_alert_route_header = all_alerts[j].header_text[0].text;

                        document.getElementById("alert_for_specific_route").innerHTML = `<span id="route_affected"></span> <br> <b>${hi_bus_alert_route_header}</b> <br> ${hi_bus_alert_route_desc}`;
                        document.getElementById("route_affected").innerHTML = affected_route_short_name;
                        document.getElementById("route_affected").style.color = `#${affected_route_text_color}`;
                        document.getElementById("route_affected").style.backgroundColor = `#${affected_route_color}40`;
                        document.getElementById("route_affected").style.border = `1px solid #${affected_route_color}`;

                        var route_alert_cloner = document.getElementById("alert_desc_routes").cloneNode(true);
                        document.getElementById("bus_alerts_routes").appendChild(route_alert_cloner);
                    };

                    var all_route_alerts = document.getElementById("bus_alerts_routes").children;
                    document.getElementById("bus_alerts_routes").removeChild(all_route_alerts[0]);
                }
            };

            if (no_route_alerts_hi_bus === hi_bus_all_routes.length) {
                document.getElementById("alert_for_specific_route").innerHTML = "There are no alerts in all routes under this agency.";
            }
            else {
                var all_route_alerts = document.getElementById("bus_alerts_routes").children;
                document.getElementById("bus_alerts_routes").removeChild(all_route_alerts[0]);
            };
        }
    };
    hi_route_caller.send();
}