// About Metrolink
function getWikipediaInfo() {
    var wikipedia_info_caller = new XMLHttpRequest();
    wikipedia_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=Metrolink_(California)&format=json&origin=*");
    wikipedia_info_caller.onreadystatechange = function() {
        if (wikipedia_info_caller.readyState === 4 && wikipedia_info_caller.status === 200) {
            var wikipedia_info_receiver = JSON.parse(wikipedia_info_caller.responseText);
            var info_of_page = wikipedia_info_receiver.query.pages[591619].extract;
            document.getElementById("desc").innerHTML = `${info_of_page} <br> <a href="https://en.wikipedia.org/wiki/Metrolink_(California)">Wikipedia</a>`
        }
    }
    wikipedia_info_caller.send();
}
getWikipediaInfo();

function getMetrolinkContactInfo() {
    var metrolink_contact_caller = new XMLHttpRequest();
    metrolink_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qh-metrolinktrains");
    metrolink_contact_caller.onreadystatechange = function() {
        if (metrolink_contact_caller.status === 200 && metrolink_contact_caller.readyState === 4) {
            var metrolink_contact_receiver = JSON.parse(metrolink_contact_caller.responseText);
            var phone_no = metrolink_contact_receiver.agencies[0].agency_phone;
            var email = metrolink_contact_receiver.agencies[0].agency_email;

            switch (phone_no) {
                case null:
                    phone_no = "-";
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
            };

            switch (email) {
                case null:
                    email = "-";
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
                default:
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
            };
        }
    }
    metrolink_contact_caller.send();
}
getMetrolinkContactInfo();


// Lines
function loadMetrolinkLines() {
    var metrolink_line_caller = new XMLHttpRequest();
    metrolink_line_caller.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qh-metrolinktrains&limit=700&include_alerts=true");
    metrolink_line_caller.onreadystatechange = function() {
        if (metrolink_line_caller.readyState === 4 && metrolink_line_caller.status === 200) {
            var metrolink_line_receiver = JSON.parse(metrolink_line_caller.responseText);
            var counter_for_all_metrolink_lines = 0;

            for (var i=0; i<metrolink_line_receiver.routes.length; i++) {
                var route_long_name = metrolink_line_receiver.routes[i].route_long_name;
                var route_color = metrolink_line_receiver.routes[i].route_color;
                var route_text_color = metrolink_line_receiver.routes[i].route_text_color;

                document.getElementById("route").innerHTML = "<img src='img_assets/metrolink_icon.svg' id='metrolink_icon_lines' style='width: 20px; height: 20px;'>";
                document.getElementById("route").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route").style.border = `1px solid #${route_color}`;
                document.getElementById("desc_of_route").innerHTML = route_long_name;

                switch (route_text_color) {
                    case "FFFFFF":
                        document.getElementById("metrolink_icon_lines").style.filter = "invert(1)";
                        break;
                    default:
                        document.getElementById("metrolink_icon_lines").style.filter = "brightness(0%)";
                }

                var line_to_clone_metrolink = document.getElementById("route_entity").cloneNode(true);
                document.querySelector(".all_routes_metrolink").appendChild(line_to_clone_metrolink);
                counter_for_all_metrolink_lines += 1;
            }

            var all_lines_metrolink = document.querySelector(".all_routes_metrolink").children;
            document.querySelector(".all_routes_metrolink").removeChild(all_lines_metrolink[0]);
            document.getElementById("total_number_of_lines").innerHTML = counter_for_all_metrolink_lines;
        }
    }
    metrolink_line_caller.send();
}
loadMetrolinkLines();


// Alerts
function loadMetrolinkAlerts() {
    var metrolink_alert_caller = new XMLHttpRequest();
    metrolink_alert_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9qh-metrolinktrains&include_alerts=true");
    metrolink_alert_caller.onreadystatechange = function() {
        if (metrolink_alert_caller.readyState === 4 && metrolink_alert_caller.status === 200) {
            var metrolink_alert_receiver = JSON.parse(metrolink_alert_caller.responseText);
            switch (metrolink_alert_receiver.agencies[0].alerts.length) {
                case 0:
                    document.getElementById("alert_desc_metrolink").innerHTML = "There are no alerts posted from Metrolink.";
                    break;
                default:
                    for (var i=0; i<metrolink_alert_receiver.agencies[0].alerts.length; i++) {
                        var desc_for_metrolink_alert = metrolink_alert_receiver.agencies[0].alerts[i].description_text[0].text;
                        var header_for_metrolink_alert = metrolink_alert_receiver.agencies[0].alerts[i].header_text[0].text;
                        document.getElementById("alert_desc_metrolink").innerHTML = `<b>${header_for_metrolink_alert}</b> <br> ${desc_for_metrolink_alert}`;

                        var alert_cloned = document.querySelector(".list_of_alerts_metrolink").cloneNode(true);
                        document.getElementById("alerts").appendChild(alert_cloned);
                    }

                    var all_alerts = document.getElementById("alerts").children;
                    document.getElementById("alerts").removeChild(all_alerts[1]);
                    break;
            }
        }
    }
    metrolink_alert_caller.send();
}
loadMetrolinkAlerts();