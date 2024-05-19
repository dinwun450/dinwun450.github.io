window.onload = function() {
    var all_vta_icons = {
        'Blue': 'img_assets/vta_blue.svg',
        'Green': 'img_assets/vta_green.svg',
        'Orange': 'img_assets/vta_orange.svg'
    }

    function loadVTALRRoutes() {
        var route_fetcher = new XMLHttpRequest();
        route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-vta&limit=700&route_type=0&include_alerts=true");
        route_fetcher.onreadystatechange = function() {
            if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
                var lr_routes = JSON.parse(route_fetcher.responseText);

                for (var i = 0; i < lr_routes.routes.length; i++) {
                    var route_short_name = lr_routes.routes[i].route_short_name;
                    var route_long_name = lr_routes.routes[i].route_long_name;
                    var route_color = lr_routes.routes[i].route_color;
                    var route_text_color = lr_routes.routes[i].route_text_color;
                    console.log(route_image);

                    switch (route_short_name) {
                        case "GreenS":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "BlueN":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "BlueS":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "Event-Blue":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "Event-Orange":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "Event-Green":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        case "Event-Special":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        default:
                            var route_image = all_vta_icons[route_short_name.split(" ")[0]];
                            document.getElementById("route_lr").innerHTML = `<i class="fa-solid fa-train-tram" id="lr_icon_vta"></i> <img src="${route_image}" style="width: 20px; height: 20px;> | <span id="no_of_alerts_lr"></span>`;
                            break;
                    }

                    document.getElementById("route_lr").setAttribute("title", "");
                    document.getElementById("route_lr").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_lr").style.border = `1px solid #${route_color}`;
                    document.getElementById("route_lr").style.color = `#${route_text_color}`;
                    document.getElementById("desc_lr").innerHTML = `${route_long_name} <span id="no_of_alerts_lr"></span>`;
                    document.getElementById("desc_lr").setAttribute("title", "")

                    if (lr_routes.routes[i].alerts.length === 0) {
                        document.getElementById("no_of_alerts_lr").innerHTML = "";
                    }
                    else {
                        document.getElementById("no_of_alerts_lr").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${lr_routes.routes[i].alerts.length})`;
                        document.getElementById("no_of_alerts_lr").setAttribute("title", "See alerts page for details.")
                    }

                    var route_entity = document.getElementById("route_entity_lr");
                    var route_clone = route_entity.cloneNode(true);
                    document.querySelector(".vta_lr_lines").appendChild(route_clone);
                }

                var all_lr_lines = document.querySelector(".vta_lr_lines").children;
                document.querySelector(".vta_lr_lines").removeChild(all_lr_lines[0]);
            }
        }
        route_fetcher.send();
    }
    loadVTALRRoutes();

    function loadVTABusRoutes() {
        var route_fetcher = new XMLHttpRequest();
        route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-vta&limit=700&route_type=3&include_alerts=true");
        route_fetcher.onreadystatechange = function() {
            if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
                var bus_routes = JSON.parse(route_fetcher.responseText);

                for (var i = 0; i < bus_routes.routes.length; i++) {
                    var route_short_name = bus_routes.routes[i].route_short_name;
                    var prefix_of_route = route_short_name.split(" ")[0];
                    var route_long_name = bus_routes.routes[i].route_long_name;
                    var route_color = bus_routes.routes[i].route_color;
                    var route_text_color = bus_routes.routes[i].route_text_color;

                    switch (prefix_of_route) {
                        case "School":
                            document.getElementById("route_bus").innerHTML = `${route_short_name.split(" ")[1]} (<i class="fa-solid fa-school"></i>)`;
                            break;
                        case "Rapid":
                            document.getElementById("route_bus").innerHTML = `${route_short_name.split(" ")[1]} (<i class="fa-solid fa-gauge"></i>)`;
                            break;
                        case "Express":
                            document.getElementById("route_bus").innerHTML = `${route_short_name.split(" ")[1]} (<i class="fa-solid fa-bolt"></i>)`;
                            break;
                        case "BB":
                            document.getElementById("route_bus").innerHTML = `<i class="fa-solid fa-bus"></i><i class="fa-solid fa-bridge"></i> ${route_short_name.split(" ")[1]}`;
                            break;
                        default:
                            document.getElementById("route_bus").innerHTML = route_short_name;
                            prefix_of_route = "";
                            break;
                    }

                    document.getElementById("route_bus").setAttribute("title", "");
                    document.getElementById("route_bus").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_bus").style.border = `1px solid #${route_color}`;
                    document.getElementById("route_bus").style.color = `#${route_text_color}`;
                    document.getElementById("desc_bus").innerHTML = `${route_long_name} (${prefix_of_route})`;
                    document.getElementById("desc_bus").setAttribute("title", "")

                    if (bus_routes.routes[i].alerts.length === 0) {
                        document.getElementById("no_of_alerts_bus").innerHTML = "";
                    }
                    else {
                        document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${bus_routes.routes[i].alerts.length})`;
                        document.getElementById("no_of_alerts_bus").setAttribute("title", "See alerts page for details.")
                    }

                    var route_entity = document.getElementById("route_entity_bus");
                    var route_clone = route_entity.cloneNode(true);
                    document.querySelector(".vta_bus_lines").appendChild(route_clone);
                }

                var all_bus_lines = document.querySelector(".vta_bus_lines").children;
                document.querySelector(".vta_bus_lines").removeChild(all_bus_lines[0]);
            }
        }
        route_fetcher.send();
    }
    loadVTABusRoutes();

    function loadVTAAlertsByAgency() {
        var agency_call = new XMLHttpRequest();
        agency_call.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9-vta&include_alerts=true");
        agency_call.onreadystatechange = function() {
            if (agency_call.readyState === 4 && agency_call.status === 200) {
                var agency_outputs = JSON.parse(agency_call.responseText);
                
                if (agency_outputs.agencies[0].alerts.length === 0) {
                    document.getElementById("alert_desc_agency").innerHTML = "<p>There are no alerts at this time. Please check again soon.</p> "
                }
                else {
                    for (var i=0; i<agency_outputs.agencies[0].alerts.length; i++) {
                        var alert_description = agency_outputs.agencies[0].alerts[i].description_text[0].text;
                        var alert_header = agency_outputs.agencies[0].alerts[i].header_text[0].text;

                        document.getElementById("alert_desc_agency").innerHTML = `<p><b>${alert_header}</b> <br> ${alert_description}</p>`
                    }
                }
            }
        }
        agency_call.send();
    }
    loadVTAAlertsByAgency();
}