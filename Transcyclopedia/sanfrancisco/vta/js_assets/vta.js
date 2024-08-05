window.onload = function() {
    var all_vta_icons = {
        'Blue': 'img_assets/vta_blue.svg',
        'Green': 'img_assets/vta_green.svg',
        'Orange': 'img_assets/vta_orange.svg'
    }

    function loadVTAContacts() {
        var vta_contact_caller = new XMLHttpRequest();
        vta_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9-vta&include_alerts=true");
        vta_contact_caller.onreadystatechange = function() {
            if (vta_contact_caller.readyState === 4 && vta_contact_caller.status === 200) {
                var vta_contact_receiver = JSON.parse(vta_contact_caller.responseText).agencies[0];
                var vta_email = vta_contact_receiver.agency_email;
                var vta_phone = vta_contact_receiver.agency_phone;

                switch(vta_phone) {
                    case "":
                        vta_phone = "-";
                        document.getElementById("phone_agency").innerHTML = `<b>${vta_phone}</b>`;
                        break;
                    default:
                        document.getElementById("phone_agency").innerHTML = `<b>${vta_phone}</b>`;
                        break;
                };

                switch(vta_email) {
                    case "":
                        vta_email = "-";
                        document.getElementById("email_agency").innerHTML = `<b>${vta_email}</b>`;
                        break;
                    default:
                        document.getElementById("email_agency").innerHTML = `<b>${vta_email}</b>`;
                        break;
                };
            }
        }
        vta_contact_caller.send();
    }
    loadVTAContacts();

    function loadVTALRRoutes() {
        var route_fetcher = new XMLHttpRequest();
        var total_no_vta_lr_lines = 0;
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
                        case "GreenN":
                        case "BlueN":
                        case "BlueS":
                        case "OrangeE":
                        case "OrangeW":
                        case "Event-Blue":
                        case "Event-Orange":
                        case "Event-Green":
                        case "Event-Special":
                            document.getElementById("route_lr").innerHTML = `${route_short_name}`;
                            document.getElementById("route_lr").style.paddingLeft = "5px";
                            document.getElementById("route_lr").style.paddingRight = "5px";
                            break;
                        default:
                            var route_image = all_vta_icons[route_short_name.split(" ")[0]];
                            document.getElementById("route_lr").innerHTML = `<i class="fa-solid fa-train-tram" id="lr_icon_vta"></i> <img src="${route_image}" style="width: 20px; height: 20px;">`;
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
                    total_no_vta_lr_lines += 1;
                }

                var all_lr_lines = document.querySelector(".vta_lr_lines").children;
                document.querySelector(".vta_lr_lines").removeChild(all_lr_lines[0]);
                document.getElementById("curr_no_vta_lr").innerHTML = `${total_no_vta_lr_lines} (Light Rail)`;
            }
        }
        route_fetcher.send();
    }
    loadVTALRRoutes();

    function loadVTABusRoutes() {
        var route_fetcher = new XMLHttpRequest();
        var total_no_vta_bus_lines = 0;
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
                    document.getElementById("desc_bus").innerHTML = `${route_long_name} <span id="special_type_of_route">(${prefix_of_route})</span>`;
                    document.getElementById("desc_bus").setAttribute("title", "")

                    if (prefix_of_route === "") {
                        document.getElementById("special_type_of_route").innerHTML = "";
                    }

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
                    total_no_vta_bus_lines += 1;
                }

                var all_bus_lines = document.querySelector(".vta_bus_lines").children;
                document.querySelector(".vta_bus_lines").removeChild(all_bus_lines[0]);
                document.getElementById("curr_no_vta_bus").innerHTML = `${total_no_vta_bus_lines} (Bus)`;
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

                        document.getElementById("alert_desc_agency").innerHTML = `<p><b>${alert_header}</b> <br> ${alert_description}</p>`;
                        var agency_alert_cloner = document.getElementById("alert_desc_agency").cloneNode(true);
                        document.getElementById("vta_agency_alerts").appendChild(agency_alert_cloner);
                    }

                    var all_alerts_in_vta_agency = document.getElementById("vta_agency_alerts").children;
                    document.getElementById("vta_agency_alerts").removeChild(all_alerts_in_vta_agency[0]);
                }
            }
        }
        agency_call.send();
    }
    loadVTAAlertsByAgency();

    function loadVTAAlertsbyRoutes() {
        var route_call = new XMLHttpRequest();
        route_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-vta&limit=700&include_alerts=true");
        route_call.onreadystatechange = function() {
            if (route_call.status === 200 && route_call.readyState === 4) {
                var route_outputs = JSON.parse(route_call.responseText);

                for (var i = 0; i < route_outputs.routes.length; i++) {
                    var route_color_affected = route_outputs.routes[i].route_color;
                    var route_type_affected = route_outputs.routes[i].route_type;
                    var route_text_color_affected = route_outputs.routes[i].route_text_color;
                    var route_short_name_affected = route_outputs.routes[i].route_short_name;

                    if (route_outputs.routes[i].alerts.length === 0) {
                        // document.getElementById("alert_desc_routes").innerHTML = "<p>There are no alerts posted in any of VTA routes.</p>";
                        console.log("Nope.");
                    }
                    else {
                        for (var a = 0; a < route_outputs.routes[i].alerts.length; a++) {
                            var vta_alert_route_desc = route_outputs.routes[i].alerts[a].description_text[0].text;
                            var vta_alert_route_header = route_outputs.routes[i].alerts[a].header_text[0].text;

                            console.log(vta_alert_route_header)
                            console.log(vta_alert_route_desc)

                            document.getElementById("alert_desc_routes").innerHTML = `<p><span id="route_affected"></span> <b>${vta_alert_route_header}</b> <br> ${vta_alert_route_desc}</p>`;

                            document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;
                            document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                            document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;

                            switch (route_type_affected) {
                                case 0:
                                    switch (route_short_name_affected) {
                                        case "GreenS":
                                        case "GreenN":
                                        case "BlueN":
                                        case "BlueS":
                                        case "Event-Blue":
                                        case "Event-Orange":
                                        case "Event-Green":
                                        case "Event-Special":
                                            document.getElementById("route_affected").innerHTML = `${route_short_name_affected}`;
                                            document.getElementById("route_affected").style.paddingLeft = "5px";
                                            document.getElementById("route_affected").style.paddingRight = "5px";
                                            break;
                                        default:
                                            var corr_image_route_affected = all_vta_icons[route_short_name_affected.split(" ")[0]];
                                            document.getElementById("route_affected").innerHTML = `<i class="fa-solid fa-train-tram" id="lr_icon_vta"></i> <img src="${corr_image_route_affected}" style="width: 20px; height: 20px;">`;
                                            break;
                                    }
                                    break;
                                default:
                                    var prefix_of_route_affected = route_short_name_affected.split(" ")[0];
                                    switch (prefix_of_route_affected) {
                                        case "School":
                                            document.getElementById("route_affected").innerHTML = `${route_short_name_affected.split(" ")[1]} (<i class="fa-solid fa-school"></i>)`;
                                            break;
                                        case "Rapid":
                                            document.getElementById("route_affected").innerHTML = `${route_short_name_affected.split(" ")[1]} (<i class="fa-solid fa-gauge"></i>)`;
                                            break;
                                        case "Express":
                                            document.getElementById("route_affected").innerHTML = `${route_short_name_affected.split(" ")[1]} (<i class="fa-solid fa-bolt"></i>)`;
                                            break;
                                        case "BB":
                                            document.getElementById("route_affected").innerHTML = `<i class="fa-solid fa-bus"></i><i class="fa-solid fa-bridge"></i> ${route_short_name_affected.split(" ")[1]}`;
                                            break;
                                        default:
                                            document.getElementById("route_affected").innerHTML = route_short_name_affected;
                                            prefix_of_route_affected = "";
                                            break;
                                    }
                                    
                                    document.getElementById("route_affected").style.paddingLeft = "5px";
                                    document.getElementById("route_affected").style.paddingRight = "5px";
                                    break;
                            }

                            var alert_to_clone = document.getElementById("alert_desc_routes").cloneNode(true);
                            document.getElementById("vta_routes_alerts").appendChild(alert_to_clone);
                        }
                    }
                }

                var all_route_alerts = document.getElementById("vta_routes_alerts").children;
                document.getElementById("vta_routes_alerts").removeChild(all_route_alerts[0]);
            }
        }
        route_call.send();
    }
    loadVTAAlertsbyRoutes();
}