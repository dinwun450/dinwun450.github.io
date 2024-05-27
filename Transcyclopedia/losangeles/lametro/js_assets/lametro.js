var la_metro_img_icons = {
    "Metro A Line": "img_assets/metro_a.svg",
    "Metro B Line": "img_assets/metro_b.svg",
    "Metro C Line": "img_assets/metro_c.svg",
    "Metro D Line": "img_assets/metro_d.svg",
    "Metro E Line": "img_assets/metro_e.svg",
    "Metro K Line": "img_assets/metro_k.svg",
    "Metro J Line 910/950": "img_assets/metro_j.svg",
    "Metro G Line 901": "img_assets/metro_g.svg"
}

function loadWikipediaArticle() {
    var info_fetcher = new XMLHttpRequest();
    info_fetcher.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=Los_Angeles_County_Metropolitan_Transportation_Authority&format=json&origin=*");
    info_fetcher.onreadystatechange = function() {
        if (info_fetcher.readyState === 4 && info_fetcher.status === 200) {
            var info_receiver = JSON.parse(info_fetcher.responseText);
            var info_of_lametro = info_receiver.query.pages[359028].extract;
            document.getElementById("desc").innerHTML = `${info_of_lametro} <a href="https://en.wikipedia.org/wiki/Los_Angeles_County_Metropolitan_Transportation_Authority">Wikipedia</a>`
        }
    }
    info_fetcher.send();
}
loadWikipediaArticle();

function loadLAMetroLinesSubway() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=1&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            var counter_sub = 0;
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;
                var corr_image = la_metro_img_icons[route_long_name];

                if (route_short_name === "") {
                    document.getElementById("route_name_sub").innerHTML = `<img src="${corr_image}" style="width: 20px; height: 20px">`;
                }

                document.getElementById("route_name_sub").style.color = `#${route_text_color}`;
                document.getElementById("route_name_sub").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_sub").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_sub").innerHTML = `${route_long_name} <span id="no_of_alerts_sub"></span>`;

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_sub").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_sub").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                var route_entity = document.getElementById("route_item_sub");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_subway").appendChild(clone_entity);

                counter_sub += 1;
            }

            var all_subway_lines = document.querySelector(".lametro_subway").children;
            document.querySelector(".lametro_subway").removeChild(all_subway_lines[0]);
            document.getElementById("sub_routes").innerHTML = `${counter_sub} (Subway)`;
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesSubway();

function loadLAMetroLinesLR() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=0&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            var counter_lr = 0;
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;
                var corr_image = la_metro_img_icons[route_long_name];

                if (route_short_name === "") {
                    document.getElementById("route_name_lr").innerHTML = `<img src="${corr_image}" id="la_metro_lr_img" style="width: 20px; height: 20px">`;
                }

                document.getElementById("route_name_lr").style.color = `#${route_text_color}`;
                document.getElementById("route_name_lr").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_lr").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_lr").innerHTML = `${route_long_name} <span id="no_of_alerts_lr"></span>`;

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_lr").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_lr").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                var route_entity = document.getElementById("route_item_lr");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_lightrail").appendChild(clone_entity);

                counter_lr += 1;
            }

            var all_lr_lines = document.querySelector(".lametro_lightrail").children;
            document.querySelector(".lametro_lightrail").removeChild(all_lr_lines[0]);
            document.getElementById("lr_routes").innerHTML = `${counter_lr} (Light Rail)`;
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesLR();

function loadLAMetroLinesBus() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=3&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            var counter_bus = 0;
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;
                var route_desc = route_info.routes[i].route_desc;
                var corr_image = la_metro_img_icons[route_long_name];

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_bus").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                if (route_color === "") {
                    route_color = "000000";
                }

                if (route_text_color === "") {
                    route_text_color = "ffffff"
                }

                if (route_short_name === "") {
                    document.getElementById("route_name_bus").innerHTML = `<img src="${corr_image}" id="la_metro_bus_img" style="width: 20px; height: 20px;">`;
                }
                else {
                    document.getElementById("route_name_bus").innerHTML = route_short_name;
                }

                document.getElementById("route_name_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_bus").innerHTML = `${route_long_name} ${route_desc}`;

                var route_entity = document.getElementById("route_item_bus");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_bus").appendChild(clone_entity);

                counter_bus += 1;
            }

            var all_bus_lines = document.querySelector(".lametro_bus").children;
            document.querySelector(".lametro_bus").removeChild(all_bus_lines[0]);
            document.getElementById("bus_routes").innerHTML = `${counter_bus} (Bus)`;
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesBus();

function LAMetroAlerts() {
    var alert_agency_caller = new XMLHttpRequest();
    alert_agency_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q5-metro~losangeles&include_alerts=true");
    alert_agency_caller.onreadystatechange = function() {
        if (alert_agency_caller.readyState === 4 && alert_agency_caller.status === 200) {
            var alert_agency_receiver = JSON.parse(alert_agency_caller.responseText).agencies[0];
            var alerts_in_agency = alert_agency_receiver.alerts;

            if (alerts_in_agency.length === 0) {
                document.getElementById("alert_agency_entity").innerHTML = "There are no alerts posted in the Los Angeles Metro Agency."
            }
            else {
                for (var i=0; i<alerts_in_agency.length; i++) {
                    var desc_in_alerts = alerts_in_agency[i].description_text[0].text;
                    document.getElementById("alert_agency_entity").innerHTML = `${desc_in_alerts}`;

                    var alert_node = document.getElementById("alert_agency_entity");
                    var clone_alert = alert_node.cloneNode(true);
                    document.getElementById("list_of_agency_alerts").appendChild(clone_alert);
                }

                var all_alerts_in_agency = document.getElementById("list_of_agency_alerts").children;
                document.getElementById("list_of_agency_alerts").removeChild(all_alerts_in_agency[0]);
            }
        }
    }
    alert_agency_caller.send();
}
LAMetroAlerts();

function LAMetroAlertsRoutes() {
    var alert_route_caller = new XMLHttpRequest();
    alert_route_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&include_alerts=true");
    alert_route_caller.onreadystatechange = function() {
        if (alert_route_caller.readyState === 4 && alert_route_caller.status === 200) {
            var alert_route_receiver = JSON.parse(alert_route_caller.responseText);

            for (var i=0; i<alert_route_receiver.routes.length; i++) {
                var route_color_affected = alert_route_receiver.routes[i].route_color;
                var route_type_affected = alert_route_receiver.routes[i].route_type;
                var route_text_color_affected = alert_route_receiver.routes[i].route_text_color;
                var route_short_name_affected = alert_route_receiver.routes[i].route_short_name;
                var route_long_name_affected = alert_route_receiver.routes[i].route_long_name;
                var corr_image_route_affected = la_metro_img_icons[route_long_name_affected];
                    
                if (alert_route_receiver.routes[i].alerts.length === 0) {
                    console.log("Nothing.");
                }
                else {
                    for (var a=0; a<alert_route_receiver.routes[i].alerts.length; a++) {
                        var desc_for_route_alert = alert_route_receiver.routes[i].alerts[a].description_text[0].text;
                        var header_for_route_alert = alert_route_receiver.routes[i].alerts[a].header_text[0].text;

                        document.getElementById("alert_routes_entity").innerHTML = `<span id="route_affected"></span> <b>${header_for_route_alert}</b> <br> ${desc_for_route_alert}`;

                        if (route_short_name_affected === "") {
                            document.getElementById("route_affected").innerHTML = `<img src="${corr_image_route_affected}" id="la_metro_lr_img" style="width: 20px; height: 20px">`;
                        }
                        else {
                            document.getElementById("route_affected").innerHTML = route_short_name_affected;
                        }

                        document.getElementById("route_affected").style.color = `#${route_text_color_affected}`;
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color_affected}40`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color_affected}`;

                        if (route_type_affected === 0) {
                            document.getElementById("route_affected").style.paddingLeft = "3px";
                            document.getElementById("route_affected").style.paddingRight = "3px";
                        }
                        else if (route_type_affected === 1) {
                            document.getElementById("route_affected").style.paddingLeft = "3px";
                            document.getElementById("route_affected").style.paddingRight = "3px";
                        }
                        else {
                            document.getElementById("route_affected").style.paddingLeft = "5px";
                            document.getElementById("route_affected").style.paddingRight = "5px";
                        }

                        var alert_route_node = document.getElementById("alert_routes_entity");
                        var clone_alert_node = alert_route_node.cloneNode(true);
                        document.getElementById("list_of_line_alerts").appendChild(clone_alert_node);
                    }
                }
            }

            var all_alerts_summed = document.getElementById("list_of_line_alerts").children;
            document.getElementById("list_of_line_alerts").removeChild(all_alerts_summed[0]);
        }
    }
    alert_route_caller.send();
}
LAMetroAlertsRoutes();