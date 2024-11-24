var onestop_id = "";

function changeChicagoBusLines(b) {
    var chicago_bus_agency = b;

    switch (chicago_bus_agency) {
        case "cta":
            onestop_id = "o-dp3-chicagotransitauthority";
            break;
        case "pace":
            onestop_id = "o-dp3-pace";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_bus_lines").innerHTML = `
                <li id="bus_route_entity"><span id="route_name_bus" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_bus" class="all_desc_routes">Select a Bus Agency.</span></li>
            `;
    }

    if (b === "prompt") {
        console.log("Pass");
    }
    else {
        getChicagoBusLines(onestop_id);
    }
}

function getChicagoBusLines(getOneStopID) {
    document.getElementById("list_of_bus_lines").innerHTML = `
        <li id="bus_route_entity"><span id="route_name_bus" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_bus" class="all_desc_routes">Loading...</span></li>
    `;

    var chicago_bus_caller = new XMLHttpRequest();
    chicago_bus_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&route_type=3`);
    chicago_bus_caller.onreadystatechange = function() {
        if (chicago_bus_caller.readyState === 4 && chicago_bus_caller.readyState === 4) {
            var chicago_bus_receiver = JSON.parse(chicago_bus_caller.responseText);

            for (var i = 0; i < chicago_bus_receiver.routes.length; i++) {
                var base_route = chicago_bus_receiver.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                if (route_short_name === null) {
                    document.getElementById("route_name_bus").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("route_name_bus").innerHTML = route_short_name;
                }

                document.getElementById("route_desc_bus").innerHTML = route_long_name;
                document.getElementById("route_name_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_bus").style.border = `1px solid #${route_color}`;

                var bus_route_toclone = document.getElementById("bus_route_entity").cloneNode(true);
                document.getElementById("list_of_bus_lines").appendChild(bus_route_toclone);
            }

            var all_bus_routes = document.getElementById("list_of_bus_lines").children;
            document.getElementById("list_of_bus_lines").removeChild(all_bus_routes[0]);
        }
    }
    chicago_bus_caller.send();
}