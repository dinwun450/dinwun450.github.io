window.onload = function() {
    counter = 0;

    function getCopyrightYear() {
        var date = new Date();
        var getYearNo = date.getFullYear();
        document.querySelector(".copyright").innerHTML = `&copy; ${getYearNo} Transcyclopedia. Created by Dino Wun.`;
    }
    getCopyrightYear();

    function loadMuniMetroLines() {
        var caller_metro = new XMLHttpRequest();
        caller_metro.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=0&include_alerts=true");
        caller_metro.onreadystatechange = function() {
            if (caller_metro.readyState === 4 && caller_metro.status === 200) {
                var muni_metro_routes = JSON.parse(caller_metro.responseText);

                for (var m=0; m<muni_metro_routes.routes.length; m++) {
                    var route_short_name = muni_metro_routes.routes[m].route_short_name;
                    var route_long_name = muni_metro_routes.routes[m].route_long_name;
                    var route_color = muni_metro_routes.routes[m].route_color;
                    var route_text_color = muni_metro_routes.routes[m].route_text_color;

                    document.getElementById("route_metro").innerHTML = route_short_name;
                    document.getElementById("route_metro").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_metro").style.color = `#${route_text_color}`;
                    document.getElementById("route_metro").style.border = `1px solid #${route_color}`;
                    document.getElementById("desc_metro").innerHTML = route_long_name;
                    document.getElementById("desc_metro").setAttribute("title", muni_metro_routes.routes[m].route_desc)

                    if (muni_metro_routes.routes[m].alerts.length === 0) {
                        document.getElementById("no_of_alerts_metro").innerHTML = "";
                    }
                    else {
                        document.getElementById("no_of_alerts_metro").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${muni_metro_routes.routes[m].alerts.length})`;
                        document.getElementById("no_of_alerts_metro").setAttribute("title", "See alerts page for details.")
                    }

                    var cloneTheList = document.getElementById("route_entity_metro");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.querySelector(".muni_metro_lines").appendChild(listTBC);
                }

                var linesAll = document.querySelector(".muni_metro_lines").children;
                document.querySelector(".muni_metro_lines").removeChild(linesAll[0]);
            }
        }
        caller_metro.send();
    }
    loadMuniMetroLines();

    function loadCableCarRoutes() {
        var caller_cable = new XMLHttpRequest();
        caller_cable.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=5&include_alerts=true");
        caller_cable.onreadystatechange = function() {
            if (caller_cable.readyState === 4 && caller_cable.status === 200) {
                var cable_routes = JSON.parse(caller_cable.responseText);

                for (var c=0; c<cable_routes.routes.length; c++) {
                    var route_short_name = cable_routes.routes[c].route_short_name;
                    var route_long_name = cable_routes.routes[c].route_long_name;
                    var route_color = cable_routes.routes[c].route_color;
                    var route_text_color = cable_routes.routes[c].route_text_color;

                    document.getElementById("route_cablestreetcar").innerHTML = route_short_name;
                    document.getElementById("route_cablestreetcar").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_cablestreetcar").style.color = `#${route_text_color}`;
                    document.getElementById("route_cablestreetcar").style.border = `1px solid #${route_color}`;
                    document.getElementById("desc_cablestreetcar").innerHTML = route_long_name;
                    document.getElementById("desc_cablestreetcar").setAttribute("title", cable_routes.routes[c].route_desc)

                    if (cable_routes.routes[c].alerts.length === 0) {
                        document.getElementById("no_of_alerts_cable").innerHTML = "";
                    }
                    else {
                        document.getElementById("no_of_alerts_cable").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${cable_routes.routes[c].alerts.length})`;
                        document.getElementById("no_of_alerts_cable").setAttribute("title", "See alerts page for details.")
                    }

                    var cloneTheList = document.getElementById("route_entity_cable");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.querySelector(".muni_cablestreetcar_lines").appendChild(listTBC);
                }

                var linesAll = document.querySelector(".muni_cablestreetcar_lines").children;
                document.querySelector(".muni_cablestreetcar_lines").removeChild(linesAll[0]);
            }
        }
        caller_cable.send();
    }
    loadCableCarRoutes();

    function loadBusRoutes() {
        var caller_bus = new XMLHttpRequest();
        caller_bus.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=3&include_alerts=true");
        caller_bus.onreadystatechange = function() {
            if (caller_bus.readyState === 4 && caller_bus.status === 200) {
                var bus_routes = JSON.parse(caller_bus.responseText);
                console.log(bus_routes)

                for (var b=0; b<bus_routes.routes.length; b++) {
                    var route_short_name = bus_routes.routes[b].route_short_name;
                    var route_long_name = bus_routes.routes[b].route_long_name;
                    var route_color = bus_routes.routes[b].route_color;
                    var route_text_color = bus_routes.routes[b].route_text_color;

                    document.getElementById("route_bus").innerHTML = route_short_name;
                    document.getElementById("route_bus").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_bus").style.color = `#${route_text_color}`;
                    document.getElementById("route_bus").style.border = `1px solid #${route_color}`;
                    document.getElementById("desc_bus").innerHTML = route_long_name;
                    document.getElementById("desc_bus").setAttribute("title", bus_routes.routes[b].route_desc)

                    if (bus_routes.routes[b].alerts.length === 0) {
                        document.getElementById("no_of_alerts_bus").innerHTML = "";
                    }
                    else {
                        document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${bus_routes.routes[i].alerts.length})`;
                        document.getElementById("no_of_alerts_bus").setAttribute("title", "See alerts page for details.")
                    }

                    var cloneTheList = document.getElementById("route_entity_bus");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.querySelector(".muni_bus_lines").appendChild(listTBC);
                    counter = 0;
                }

                var linesAll = document.querySelector(".muni_bus_lines").children;
                document.querySelector(".muni_bus_lines").removeChild(linesAll[0]);
            }
        }
        caller_bus.send();
    }
    loadBusRoutes();

    function showMuniAgencyAlerts() {
        var alert_caller = new XMLHttpRequest();
        alert_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q8y-sfmta&include_alerts=true");
        alert_caller.onreadystatechange = function() {
            if (alert_caller.readyState === 4 && alert_caller.status === 200) {
                var agency_output = JSON.parse(alert_caller.responseText);
                console.log(agency_output);

                if (agency_output.agencies[0].alerts.length === 0) {
                    console.log("Nothing to see here...");
                    document.getElementById("alert_desc_agency").innerHTML = `<p>There's no alerts at this moment. Please check again.</p>`;
                }
                else {
                    for (var a=0; a<agency_output.agencies[0].alerts.length; a++) {
                        var desc_text = agency_output.agencies[0].alerts[a].description_text[0].text;
                        document.getElementById("alert_desc_agency").innerHTML = desc_text;
                    }
                }
            }
        }
        alert_caller.send();
    }
    showMuniAgencyAlerts();
}