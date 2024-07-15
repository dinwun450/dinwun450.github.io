window.onload = function() {
    counter = 0;
    var counter_lines = 0;

    var muniLineSVGs = {
        'F': 'muni_metro_icons/the_f_marketwharves.svg',
        'J': 'muni_metro_icons/the_j_church.svg',
        'K': 'muni_metro_icons/the_k_ingleside.svg',
        'M': 'muni_metro_icons/the_m_oceanview.svg',
        'N': 'muni_metro_icons/the_n_judah.svg',
        'S': 'muni_metro_icons/the_s_shuttle.svg',
        'T': 'muni_metro_icons/the_t_third.svg'
    }

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
                    var route_image = muniLineSVGs[route_short_name];

                    document.getElementById("route_metro").innerHTML = `<img src="${route_image}" style="width: 20px; height: 20px;"> <span id="no_of_alerts_metro"></span>`;
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

                    document.getElementById("route_cablestreetcar").innerHTML = `<img src="icon_assets/noun-cable-car-4173.svg" id="color_of_cables">&nbsp;${route_short_name}`;
                    document.getElementById("route_cablestreetcar").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_cablestreetcar").style.color = `#${route_text_color}`;
                    document.getElementById("route_cablestreetcar").style.border = `1px solid #${route_color}`;
                    document.getElementById("desc_cablestreetcar").innerHTML = route_long_name;
                    document.getElementById("desc_cablestreetcar").setAttribute("title", cable_routes.routes[c].route_desc);

                    if (route_text_color === "000000") {
                        document.getElementById("color_of_cables").style.filter = "brightness(0%)";
                    }
                    else {
                        document.getElementById("color_of_cables").style.filter = "invert(1)";
                    }

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

                        var alert_agency_to_clone = document.getElementById("alert_desc_agency").cloneNode(true);
                        document.getElementById("muni_agency_alerts").appendChild(alert_agency_to_clone);
                    }

                    var all_agency_alerts_overall = document.getElementById("muni_agency_alerts").children;
                    document.getElementById("muni_agency_alerts").removeChild(all_agency_alerts_overall[0]);
                }
            }
        }
        alert_caller.send();
    }
    showMuniAgencyAlerts();

    function showMuniRouteAlerts() {
        var muni_alert_route_caller = new XMLHttpRequest();
        muni_alert_route_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&include_alerts=true");
        muni_alert_route_caller.onreadystatechange = function() {
            if (muni_alert_route_caller.readyState === 4 && muni_alert_route_caller.status === 200) {
                var muni_alert_route_receiver = JSON.parse(muni_alert_route_caller.responseText);

                for (var i = 0; i < muni_alert_route_receiver.routes.length; i++) {
                    var route_color_affected = muni_alert_route_receiver.routes[i].route_color;
                    var route_type_affected = muni_alert_route_receiver.routes[i].route_type;
                    var route_text_color_affected = muni_alert_route_receiver.routes[i].route_text_color;
                    var route_short_name_affected = muni_alert_route_receiver.routes[i].route_short_name;
                    var corr_image_route_affected = muniLineSVGs[route_short_name_affected];

                    if (muni_alert_route_receiver.routes[i].alerts.length === 0) {
                        // document.getElementById("alert_desc_routes").innerHTML = "There are no alerts posted in any of Muni Routes.";
                        console.log("No.")
                    }
                    else {
                        for (var a = 0; a < muni_alert_route_receiver.routes[i].alerts.length; a++) {
                            var desc_for_route_alert = muni_alert_route_receiver.routes[i].alerts[a].description_text[0].text;
                            var header_for_route_alert = muni_alert_route_receiver.routes[i].alerts[a].header_text[0].text;
                            document.getElementById("alert_desc_routes").innerHTML = `<span id="route_affected"></span> <b>${header_for_route_alert}</b> <br> ${desc_for_route_alert}`;

                            document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;
                            document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                            document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;

                            if (route_type_affected === 0) {
                                document.getElementById("route_affected").innerHTML = `<img src="${corr_image_route_affected}" style="width: 20px; height: 20px;">`;
                                document.getElementById("route_affected").style.paddingLeft = "3px";
                                document.getElementById("route_affected").style.paddingRight = "3px";
                            }
                            else if (route_type_affected === 5) {
                                document.getElementById("route_affected").innerHTML = `<img src="icon_assets/noun-cable-car-4173.svg" id="color_of_cables">&nbsp;${route_short_name_affected}`;
                                document.getElementById("route_affected").style.paddingLeft = "5px";
                                document.getElementById("route_affected").style.paddingRight = "5px";
                            }
                            else {
                                document.getElementById("route_affected").innerHTML = route_short_name_affected;
                                document.getElementById("route_affected").style.paddingLeft = "5px";
                                document.getElementById("route_affected").style.paddingRight = "5px";
                            }

                            var alert_route_node = document.getElementById("alert_desc_routes").cloneNode(true);
                            document.getElementById("muni_routes_alerts").appendChild(alert_route_node);
                        }
                    }
                }

                var all_alerts_summed = document.getElementById("muni_routes_alerts").children;
                document.getElementById("muni_routes_alerts").removeChild(all_alerts_summed[0]);
            }
        }
        muni_alert_route_caller.send();
    }
    showMuniRouteAlerts();

    function countNumberOfMuniLines() {
        var all_routes_caller = new XMLHttpRequest();
        all_routes_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700");
        all_routes_caller.onreadystatechange = function() {
            if (all_routes_caller.readyState === 4 && all_routes_caller.status === 200) {
                var all_routes_receiver = JSON.parse(all_routes_caller.responseText);
                counter_lines = all_routes_receiver.routes.length;
                document.getElementById("how_many_lines_muni").innerHTML = `<b>${counter_lines}</b>`;
            }
        }
        all_routes_caller.send();
    }
    countNumberOfMuniLines();
}