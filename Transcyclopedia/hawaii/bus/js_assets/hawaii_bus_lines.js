var onestop_id = "";

function getBusLines(l) {
    var hi_bus_agency = l;

    switch (hi_bus_agency) {
        case "thebus":
            onestop_id = "o-87z-thebus";
            break;
        case "hele_on":
            onestop_id = "o-hele~on~hi";
            break;
        case "maui_bus":
            onestop_id = "o-maui~county~transit";
            break;
        case "kauai_bus":
            onestop_id = "o-87yt-countyofkauai~transportationagency";
            break;
        default:
            onestop_id = "";
            document.getElementById("hi_bus_lines_list").innerHTML = `
                <li id="route_entity_hi_bus"><span id="route_name_hi_bus">-</span>&nbsp;<span id="route_desc_hi_bus">Select a Bus Agency.</span> <span id="no_of_alerts_hi_bus"></span></li>
            `;
            break;
    }

    if (l === "prompt") {
        console.log("Stop.");
    }
    else {
        loadHIBusLines(onestop_id);
    }
}

function loadHIBusLines(OneStop) {
    document.getElementById("hi_bus_lines_list").innerHTML = `
        <li id="route_entity_hi_bus"><span id="route_name_hi_bus">-</span>&nbsp;<span id="route_desc_hi_bus">Loading...</span> <span id="no_of_alerts_hi_bus"></span></li>
    `;

    var hi_bus_caller = new XMLHttpRequest();
    hi_bus_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${OneStop}&limit=700&include_alerts=true`);
    hi_bus_caller.onreadystatechange = function() {
        if (hi_bus_caller.readyState === 4 && hi_bus_caller.status === 200) {
            var hi_bus_receiver = JSON.parse(hi_bus_caller.responseText);

            for (var i = 0; i < hi_bus_receiver.routes.length; i++) {
                var route_short_name = hi_bus_receiver.routes[i].route_short_name;
                var route_long_name = hi_bus_receiver.routes[i].route_long_name;
                var route_color = hi_bus_receiver.routes[i].route_color;
                var route_text_color = hi_bus_receiver.routes[i].route_text_color;

                document.getElementById("route_name_hi_bus").innerHTML = route_short_name;
                document.getElementById("route_name_hi_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_hi_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_hi_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_hi_bus").innerHTML = route_long_name;

                if (hi_bus_receiver.routes[i].alerts.length > 0) {
                    var route_alerts = hi_bus_receiver.routes[i].alerts.length;
                    document.getElementById("no_of_alerts_hi_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_alerts})`;
                }
                else {
                    document.getElementById("no_of_alerts_hi_bus").innerHTML = "";
                }

                var hi_bus_route_entity = document.getElementById("route_entity_hi_bus").cloneNode(true);
                document.getElementById("hi_bus_lines_list").appendChild(hi_bus_route_entity);
            }

            var all_bus_lines_hi = document.getElementById("hi_bus_lines_list").children;
            document.getElementById("hi_bus_lines_list").removeChild(all_bus_lines_hi[0]);
        }
    }
    hi_bus_caller.send();
}