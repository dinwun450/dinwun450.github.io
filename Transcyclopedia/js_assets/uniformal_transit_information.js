function getWikipediaForAnAgency(agency_name) {
    var wikipedia_agency_caller = new XMLHttpRequest();
    wikipedia_agency_caller.open("GET", `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${agency_name}&origin=*`);
    wikipedia_agency_caller.onreadystatechange = function() {
        if (wikipedia_agency_caller.readyState === 4 && wikipedia_agency_caller.status === 200) {
            var wikipedia_agency_receiver = JSON.parse(wikipedia_agency_caller.responseText);
            var wikipedia_agency_info = wikipedia_agency_receiver.query.pages[Object.keys(wikipedia_agency_receiver.query.pages)[0]].extract;
            document.getElementById("desc").innerHTML = `${wikipedia_agency_info} <br> <a href="https://en.wikipedia.org/wiki/${agency_name}">Wikipedia</a>`;
        };
    };
    wikipedia_agency_caller.send();
}

function getContactsForAnAgency(agency_onestop_id) {
    var contact_agency_caller = new XMLHttpRequest();
    contact_agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${agency_onestop_id}&include_alerts=true`);
    contact_agency_caller.onreadystatechange = function() {
        if (contact_agency_caller.readyState === 4 && contact_agency_caller.status === 200) {
            var contact_agency_receiver = JSON.parse(contact_agency_caller.responseText);
            var contact_agency_email = contact_agency_receiver.agencies[0].agency_email;
            var contact_agency_phone = contact_agency_receiver.agencies[0].agency_phone;

            if (contact_agency_email == "") {
                contact_agency_email = "-";
            }

            if (contact_agency_phone == "") {
                contact_agency_phone = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${contact_agency_email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${contact_agency_phone}</b> (Phone)`;
        };
    };
    contact_agency_caller.send();
}

function getLinesFromAnAgency(agency_onestop_id, route_name_id, route_desc_id, routes_list_entity, all_routes_list, with_alerts) {
    var lines_agency_caller = new XMLHttpRequest();
    lines_agency_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operated_by=${agency_onestop_id}&limit=700&include_alerts=true`);
    lines_agency_caller.onreadystatechange = function() {
        if (lines_agency_caller.readyState === 4 && lines_agency_caller.status === 200) {
            var lines_agency_receiver = JSON.parse(lines_agency_caller.responseText);
            for (var i = 0; i < lines_agency_receiver.routes.length; i++) {
                var route_long_name = lines_agency_receiver.routes[i].route_long_name;
                var route_color = lines_agency_receiver.routes[i].route_color;
                var route_text_color = lines_agency_receiver.routes[i].route_text_color;
                var route_short_name = lines_agency_receiver.routes[i].route_short_name;

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_long_name === "") {
                    route_long_name = "";
                }

                if (route_color === "") {
                    route_color = "000000";
                }

                if (route_text_color === "") {
                    route_text_color = "FFFFFF";
                }

                document.getElementById(route_name_id).innerHTML = route_short_name;
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
            document.getElementById("noofroutes").innerHTML = `<b>${lines_agency_receiver.routes.length}</b>`;
        }
    };
    lines_agency_caller.send();
};