function loadMTSWikipedia() {
    var mts_info_caller = new XMLHttpRequest();
    mts_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=San_Diego_Metropolitan_Transit_System&format=json&origin=*");
    mts_info_caller.onreadystatechange = function() {
        if (mts_info_caller.readyState === 4 && mts_info_caller.status === 200) {
            var mts_info_receiver = JSON.parse(mts_info_caller.responseText);
            var info_extracted = mts_info_receiver.query.pages[7670893].extract;
            document.getElementById("desc").innerHTML = `${info_extracted} <br> <a href="https://en.wikipedia.org/wiki/San_Diego_Metropolitan_Transit_System">Wikipedia</a>`;
        }
    }
    mts_info_caller.send();
}
loadMTSWikipedia();

function getMTSContacts() {
    var mts_contacts_caller = new XMLHttpRequest();
    mts_contacts_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-mts");
    mts_contacts_caller.onreadystatechange = function() {
        if (mts_contacts_caller.readyState === 4 && mts_contacts_caller.status === 200) {
            var mts_contacts_receiver = JSON.parse(mts_contacts_caller.responseText);
            var phone_no = mts_contacts_receiver.agencies[0].agency_phone;
            var email = mts_contacts_receiver.agencies[0].agency_email;

            if (email === "") {
                email = "-";
            }
            if (phone_no === "") {
                phone_no = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
        }
    }
    mts_contacts_caller.send();
}
getMTSContacts();

function loadMTSTrolley() {
    var route_trolley_caller = new XMLHttpRequest();
    route_trolley_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=0&include_alerts=true");
    route_trolley_caller.onreadystatechange = function() {
        if (route_trolley_caller.readyState === 4 && route_trolley_caller.status === 200) {
            var route_trolley_receiver = JSON.parse(route_trolley_caller.responseText);
            var all_trolley_routes = route_trolley_receiver.routes.length;

            for (var i=0; i<all_trolley_routes; i++) {
                var route_short_name = route_trolley_receiver.routes[i].route_short_name;
                var route_color = route_trolley_receiver.routes[i].route_color;
                var route_long_name = route_trolley_receiver.routes[i].route_long_name;
                var route_text_color = route_trolley_receiver.routes[i].route_text_color;

                if (route_short_name === "") {
                    document.getElementById("route_name_trolley").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                } else {
                    document.getElementById("route_name_trolley").innerHTML = route_short_name;
                }

                document.getElementById("route_name_trolley").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_trolley").style.color = `#${route_text_color}`;
                document.getElementById("route_name_trolley").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_trolley").innerHTML = route_long_name;

                if (route_trolley_receiver.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_trolley").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_trolley").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_trolley_receiver.routes[i].alerts.length})`;
                }

                var each_trolley_route = document.getElementById("route_item_trolley").cloneNode(true);
                document.querySelector(".mts_trolley").appendChild(each_trolley_route);
            }

            var all_routes = document.querySelector(".mts_trolley").children;
            document.querySelector(".mts_trolley").removeChild(all_routes[0]);
            document.getElementById("trolley_routes").innerHTML = `${all_trolley_routes} Trolley`;
        }
    }
    route_trolley_caller.send();
}
loadMTSTrolley();

function loadMTSBus() {
    var route_bus_caller = new XMLHttpRequest();
    route_bus_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=3&include_alerts=true");
    route_bus_caller.onreadystatechange = function() {
        if (route_bus_caller.readyState === 4 && route_bus_caller.status === 200) {
            var route_bus_receiver = JSON.parse(route_bus_caller.responseText);
            var all_bus_routes = route_bus_receiver.routes.length;

            for (var i=0; i<all_bus_routes; i++) {
                var route_short_name = route_bus_receiver.routes[i].route_short_name;
                var route_color = route_bus_receiver.routes[i].route_color;
                var route_long_name = route_bus_receiver.routes[i].route_long_name;
                var route_text_color = route_bus_receiver.routes[i].route_text_color;

                if (route_short_name === "") {
                    document.getElementById("route_name_bus").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                } else {
                    document.getElementById("route_name_bus").innerHTML = route_short_name;
                }

                document.getElementById("route_name_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_bus").innerHTML = route_long_name;

                if (route_bus_receiver.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_bus").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_bus_receiver.routes[i].alerts.length})`;
                }

                var each_bus_route = document.getElementById("route_item_bus").cloneNode(true);
                document.querySelector(".mts_bus").appendChild(each_bus_route);
            }

            var all_routes = document.querySelector(".mts_bus").children;
            document.querySelector(".mts_bus").removeChild(all_routes[0]);
            document.getElementById("bus_routes").innerHTML = `${all_bus_routes} Bus`;
        }
    }
    route_bus_caller.send();
}
loadMTSBus();

function loadMTSCoronado() {
    var coronado_caller = new XMLHttpRequest();
    coronado_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-mts&limit=700&route_type=4&include_alerts=true");
    coronado_caller.onreadystatechange = function() {
        if (coronado_caller.readyState === 4 && coronado_caller.status === 200) {
            var coronado_receiver = JSON.parse(coronado_caller.responseText);
            var route_short_name = coronado_receiver.routes[0].route_short_name;
            var route_color = coronado_receiver.routes[0].route_color;
            var route_long_name = coronado_receiver.routes[0].route_long_name;
            var route_text_color = coronado_receiver.routes[0].route_text_color;

            if (route_short_name === "") {
                document.getElementById("route_name_coronado").innerHTML = `&nbsp;&nbsp;&nbsp;`;
            } else {
                document.getElementById("route_name_coronado").innerHTML = route_short_name;
            }

            document.getElementById("route_name_coronado").style.backgroundColor = `#${route_color}40`;
            document.getElementById("route_name_coronado").style.color = `#${route_text_color}`;
            document.getElementById("route_name_coronado").style.border = `1px solid #${route_color}`;
            document.getElementById("route_desc_coronado").innerHTML = route_long_name;

            if (coronado_receiver.routes[0].alerts.length === 0) {
                document.getElementById("no_of_alerts_coronado").innerHTML = "";
            }
            else {
                document.getElementById("no_of_alerts_coronado").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${coronado_receiver.routes[0].alerts.length})`;
            }
        }
    }
    coronado_caller.send();
}
loadMTSCoronado();