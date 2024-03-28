var no_route_alerts = [];

function changeAgencyInAlerts(c) {
    route_searcher = document.getElementById("routegetter").value;
    var agency = c;

    switch (agency) {
        case "actransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9-actransit&limit=700&include_alerts=true`;
            break;
        case "berkeleyshuttles":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9p3-beartransit&limit=700&include_alerts=true`;
            break;
        case "commutedotorg":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9j-commuteorgshuttles&limit=700&include_alerts=true`;
            break;
        case "countyconnection":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9p-countyconnection&limit=700&include_alerts=true`;
            break;
        case "dumbartonexpress":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9j-dumbartonexpress&limit=700&include_alerts=true`;
            break;
        case "fast":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-fairfieldandsuisuntransit&limit=700&include_alerts=true`;
            break;
        case "ggt":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qb-goldengatetransit&limit=700&include_alerts=true`;
            break;
        case "marintransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbb-marintransit&limit=700&include_alerts=true`;
            break;
        case "petalumatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbc9-petalumatransit&limit=700&include_alerts=true`;
            break;
        case "sanmateotransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q8-samtrans&limit=700&include_alerts=true`;
            break;
        case "santarosacitybus":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbdx-santarosacitybus&limit=700&include_alerts=true`;
            break;
        case "solanotransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc0-soltrans&limit=700&include_alerts=true`;
            break;
        case "sonomacountytransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qb-sonomacountytransit&limit=700&include_alerts=true`;
            break;
        case "stanfordshuttles":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9h-stanford~marguerite&limit=700&include_alerts=true`;
            break;
        case "trideltatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc2-trideltatransit&limit=700&include_alerts=true`;
            break;
        case "uctransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9jy-unioncitytransit&limit=700&include_alerts=true`;
            break; 
        case "vacavillecitycoach":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc60-vacavillecitycoach&limit=700&include_alerts=true`;
            break;
        case "napatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-vinenapacounty&limit=700&include_alerts=true`;
            break;
        case "westcat":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-westcatwesterncontracosta&limit=700&include_alerts=true`;
            break;
        case "trivalleywheels":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9q-wheelsbus&limit=700&include_alerts=true`;
            break;
        default:
            document.querySelector(".headerforbusalerts").innerHTML = `Alerts for &nbsp; <span id="affectedroutes">-</span>`;
            document.getElementById("affectedroutes").style.backgroundColor = "#33333340";
            document.getElementById("affectedroutes").style.color = "white";
            document.getElementById("affectedroutes").style.border = "1px solid black";
    }

    if (c === "prompt") {
        console.log(" ");
    }
    else {
        getRouteAlerts(link);
    }
}

function getRouteAlerts(routeAlertLink) {
    var alert_call = new XMLHttpRequest();
    alert_call.open("GET", routeAlertLink);
    alert_call.onreadystatechange = function() {
        if (alert_call.readyState === 4 && alert_call.status === 200) {
            var route_alerts = JSON.parse(alert_call.responseText);

            for (var r=0; r<route_alerts.routes.length; r++) {
                var route_short_name = route_alerts.routes[r].route_short_name;
                var route_color = route_alerts.routes[r].route_color;
                var route_text_color = route_alerts.routes[r].route_text_color;

                document.getElementById("affectedroutes").innerHTML = route_short_name;
                document.getElementById("affectedroutes").style.backgroundColor = `#${route_color}40`;
                document.getElementById("affectedroutes").style.border = `1px solid #${route_color}`;
                document.getElementById("affectedroutes").style.color = `#${route_text_color}`;

                var routeNode = document.getElementById("affectedroutes");
                var cloneNode = routeNode.cloneNode(true);
                document.querySelector(".headerforbusalerts").appendChild(cloneNode).insertAdjacentHTML( 'afterend', ",&nbsp;");

                if (route_alerts.routes[r].alerts.length === 0) {
                    no_route_alerts.push(` ${route_short_name}`);
                }

                for (var a = 0; a < route_alerts.routes[r].alerts.length; a++) {
                    var header_text = route_alerts.routes[r].alerts[a].header_text[0].text;
                    var description_text = route_alerts.routes[r].alerts[a].description_text[0].text;
                    document.getElementById("alert_for_specific_route").innerHTML = `<b>${header_text}</b> <br> ${description_text}`;

                    var alertNode = document.getElementById("alert_desc_routes");
                    var cloneNode = alertNode.cloneNode(true);
                    document.getElementById("bus_routes_alerts").appendChild(cloneNode);
                }
            }

            var total_routes = document.querySelector(".headerforbusalerts").children;
            var last_child_routes = document.querySelector(".headerforbusalerts").lastChild;

            document.querySelector(".headerforbusalerts").removeChild(total_routes[0]);
            document.querySelector(".headerforbusalerts").removeChild(last_child_routes);

            var one_last_alert = document.getElementById("bus_routes_alerts").children[0];
            one_last_alert.innerHTML = `There are no alerts for:${no_route_alerts}`;
        }
    }
    alert_call.send();
}