var no_route_alerts_labus = [];
var onestop_id = "";

function changeLABusAlerts(d) {
    var la_bus_agency = d;

    switch (la_bus_agency) {
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
            no_route_alerts_labus = [];
            document.getElementById("bus_routes_alerts").innerHTML = `
            <li id="alert_desc_routes">
                <p>
                    <span id="alert_for_specific_route">Enter a specific route by their route name.</span>
                </p>
            </li>
            `;
            document.getElementById("bus_agency_alerts").innerHTML = `
            <li id="alert_desc_agency">Select a bus agency on the top.</li>
            `;
    }

    if (d === "prompt") {
        console.log("reset!")
    }
    else {
        getLABusAgencyAlerts(onestop_id);
        getLABusRouteAlerts(onestop_id);
    }
}

function getLABusAgencyAlerts(insOneStopID) {
    var labus_agency_alert_caller = new XMLHttpRequest();
    labus_agency_alert_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${insOneStopID}&include_alerts=true`);
    labus_agency_alert_caller.onreadystatechange = function() {
        if (labus_agency_alert_caller.readyState === 4 && labus_agency_alert_caller.status === 200) {
            var labus_agency_alert_receiver = JSON.parse(labus_agency_alert_caller.responseText);

            if (labus_agency_alert_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("alert_desc_agency").innerHTML = "<p>There's no alerts in this agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < labus_agency_alert_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = labus_agency_alert_receiver.agencies[0].alerts[i].description_text;
                    if (alert_agency_desc.length == 0) {
                        console.log("nothing!");
                        var desc_of_alert_in_agency = "";
                    }
                    else {
                        var desc_of_alert_in_agency = alert_agency_desc[0].text
                    }
                    var alert_agency_header = labus_agency_alert_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("alert_desc_agency").innerHTML = `<b>${alert_agency_header}</b> <br> ${desc_of_alert_in_agency}`;
                }
            }
        }
    }
    labus_agency_alert_caller.send();
}

function getLABusRouteAlerts(insOneStopIDinRoutes) {
    no_route_alerts_labus = [];
    document.getElementById("bus_routes_alerts").innerHTML = `
        <li id="alert_desc_routes">
            <p>
                Loading...
            </p>
        </li>
    `;

    var labus_agency_route_caller = new XMLHttpRequest();
    labus_agency_route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOneStopIDinRoutes}&limit=700&include_alerts=true`);
    labus_agency_route_caller.onreadystatechange = function() {
        if (labus_agency_route_caller.readyState === 4 && labus_agency_route_caller.status === 200) {
            var labus_agency_route_receiver = JSON.parse(labus_agency_route_caller.responseText);

            for (var i = 0; i < labus_agency_route_receiver.routes.length; i++) {
                var affected_route_color = labus_agency_route_receiver.routes[i].route_color;
                var affected_route_text_color = labus_agency_route_receiver.routes[i].route_text_color;
                var affected_route_short_name = labus_agency_route_receiver.routes[i].route_short_name;
                var alerts_for_labus = labus_agency_route_receiver.routes[i].alerts;
                
                switch (alerts_for_labus.length) {
                    case 0:
                        console.log("Nope.");
                        no_route_alerts_labus.push(affected_route_short_name);
                        break;
                    default:
                        for (var j = 0; j < alerts_for_labus.length; j++) {
                            var labus_alert_route_desc = alerts_for_labus[j].description_text;
                            var labus_alert_route_header = alerts_for_labus[j].header_text[0].text;

                            if (labus_alert_route_desc.length == 0) {
                                console.log("nothing!");
                                var desc_of_alert_in_routes = "";
                            }
                            else {
                                var desc_of_alert_in_routes = labus_alert_route_desc[0].text;
                            }

                            document.getElementById("alert_desc_routes").innerHTML = `<p><span id="affectedroutes"></span> <br> <b>${labus_alert_route_header}</b> <br> ${desc_of_alert_in_routes}`;

                            document.getElementById("affectedroutes").innerHTML = affected_route_short_name;
                            document.getElementById("affectedroutes").style.color = `#${affected_route_text_color}`;
                            document.getElementById("affectedroutes").style.backgroundColor = `#${affected_route_color}40`;
                            document.getElementById("affectedroutes").style.border = `1px solid #${affected_route_color}`;

                            var route_alert_cloner = document.getElementById("alert_desc_routes").cloneNode(true);
                            document.getElementById("bus_routes_alerts").appendChild(route_alert_cloner);
                        }
                        break;
                };
            };

            if (no_route_alerts_labus.length === labus_agency_route_receiver.routes.length) {
                document.getElementById("alert_desc_routes").innerHTML = "There are no alerts in all routes under this agency.";
            }
            else {
                var all_route_alerts = document.getElementById("bus_routes_alerts").children;
                document.getElementById("bus_routes_alerts").removeChild(all_route_alerts[0]);
            }
        }
    }
    labus_agency_route_caller.send();
}