function loadNCTDWikipedia() {
    var nctd_info_caller = new XMLHttpRequest();
    nctd_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=North_County_Transit_District&format=json&origin=*");
    nctd_info_caller.onreadystatechange = function() {
        if (nctd_info_caller.readyState === 4 && nctd_info_caller.status === 200) {
            var nctd_info_receiver = JSON.parse(nctd_info_caller.responseText);
            var info_of_nctd = nctd_info_receiver.query.pages[5134242].extract;
            document.getElementById("desc").innerHTML = `${info_of_nctd} <br> <a href="https://en.wikipedia.org/wiki/North_County_Transit_District">Wikipedia</a>`
        }
    }
    nctd_info_caller.send();
}
loadNCTDWikipedia();

function getNCTDContactInfo() {
    var nctd_contact_caller = new XMLHttpRequest();
    nctd_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-northcountytransitdistrict&include_alerts=true")
    nctd_contact_caller.onreadystatechange = function() {
        if (nctd_contact_caller.readyState === 4 && nctd_contact_caller.status === 200) {
            var nctd_contact_receiver = JSON.parse(nctd_contact_caller.responseText);
            var phone_no = nctd_contact_receiver.agencies[0].agency_phone;
            var email = nctd_contact_receiver.agencies[0].agency_email;

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
    nctd_contact_caller.send();
}
getNCTDContactInfo();

function loadNCTDCoaster() {
    var route_coaster_fetcher = new XMLHttpRequest();
    route_coaster_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9mu-northcountytransitdistrict&limit=700&route_type=2&include_alerts=true");
    route_coaster_fetcher.onreadystatechange = function() {
        if (route_coaster_fetcher.readyState === 4 && route_coaster_fetcher.status === 200) {
            var route_coaster_receiver = JSON.parse(route_coaster_fetcher.responseText);
            var counter_coaster = 0;

            for (var i=0; i<route_coaster_receiver.routes.length; i++) {
                var route_short_name = route_coaster_receiver.routes[i].route_short_name;
                var route_long_name = route_coaster_receiver.routes[i].route_long_name;
                var route_color = route_coaster_receiver.routes[i].route_color;
                var route_text_color = route_coaster_receiver.routes[i].route_text_color;

                if (route_short_name === "") {
                    document.getElementById("route_name_coaster").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                }

                document.getElementById("route_name_coaster").style.color = `#${route_text_color}`;
                document.getElementById("route_name_coaster").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_coaster").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_coaster").innerHTML = `${route_long_name} <span id="no_of_alerts_sub"></span>`;

                if (route_coaster_receiver.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_coaster").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_coaster").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                var route_entity = document.getElementById("route_item_coaster").cloneNode(true);
                document.querySelector(".nctd_coaster").appendChild(route_entity);

                counter_coaster += 1;
            }

            var all_coaster_lines = document.querySelector(".nctd_coaster").children;
            document.querySelector(".nctd_coaster").removeChild(all_coaster_lines[0]);
            document.getElementById("coaster_routes").innerHTML = `${counter_coaster} (Coaster)`;
        }
    }
    route_coaster_fetcher.send();
}
loadNCTDCoaster();