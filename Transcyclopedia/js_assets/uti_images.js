function getLinesFromAnAgencyImages(agency_onestop_id, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts, json_things) {
    var lines_agency_caller = new XMLHttpRequest();
    lines_agency_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${agency_onestop_id}&limit=700&include_alerts=true`);
    lines_agency_caller.onreadystatechange = function() {
        if (lines_agency_caller.readyState === 4 && lines_agency_caller.status === 200) {
            var lines_agency_receiver = JSON.parse(lines_agency_caller.responseText);
            for (var i = 0; i < lines_agency_receiver.routes.length; i++) {
                var route_long_name = lines_agency_receiver.routes[i].route_long_name;
                var route_color = lines_agency_receiver.routes[i].route_color;
                var route_text_color = lines_agency_receiver.routes[i].route_text_color;
                var route_short_name = lines_agency_receiver.routes[i].route_short_name;

                if (route_short_name === null) {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_long_name === null) {
                    route_long_name = "";
                }

                if (route_color === null) {
                    route_color = "000000";
                }

                if (route_text_color === null) {
                    route_text_color = "FFFFFF";
                }

                document.getElementById(route_name_id).innerHTML = `<img src="${json_things[route_short_name]}" style="width: 20px; height: 20px;">`;
                document.getElementById(route_name_id).style.backgroundColor = `#${route_color}40`;
                document.getElementById(route_name_id).style.color = `#${route_text_color}`;
                document.getElementById(route_name_id).style.border = `1px solid #${route_color}`;
                document.getElementById(route_desc_id).innerHTML = route_long_name;

                if (with_alerts) {
                    var all_alerts = lines_agency_receiver.routes[i].alerts.length;
                    if (all_alerts > 0) {
                        document.getElementById("no_of_alerts").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${all_alerts})`;
                    }
                    else {
                        document.getElementById("no_of_alerts").innerHTML = "";
                    }
                }

                var route_entity = document.getElementById(routes_list_entity).cloneNode(true);
                document.getElementById(all_routes_list).appendChild(route_entity);
            };

            var all_routes = document.getElementById(all_routes_list).children;
            document.getElementById(all_routes_list).removeChild(all_routes[0]);
            document.getElementById("nooflines").innerHTML = `<b>${lines_agency_receiver.routes.length}</b>`;
        }
    };
    lines_agency_caller.send();
}