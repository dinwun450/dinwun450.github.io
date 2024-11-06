var onestop_id = "";

function changeSeattleFerryLines(f) {
    var seattle_ferry_agency = f;

    switch(seattle_ferry_agency) {
        case "wsf":
            onestop_id = "o-c28-washingtonstateferries";
            break;
        case "pierce":
            onestop_id = "o-c22u3-piercecountyferries";
            break;
        case "king":
            onestop_id = "o-c23-metrotransit";
            break;
        case "kitsap":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "vicclip":
            onestop_id = "o-c28-thevictoriaclipper";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_ferry_lines").innerHTML = `
                <li id="ferry_route_entity"><span id="route_name_ferry" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_ferry" class="all_desc_routes">Select a Ferry Agency.</span></li>
            `;
    }

    if (f === "prompt") {
        console.log("Pass");
    }
    else {
        getSeattleFerryLines(onestop_id);
    }
}

function getSeattleFerryLines(getOneStopID) {
    document.getElementById("list_of_ferry_lines").innerHTML = `
        <li id="ferry_route_entity"><span id="route_name_ferry" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_ferry" class="all_desc_routes">Loading...</span></li>
    `;

    var seattle_ferrry_caller = new XMLHttpRequest();
    seattle_ferrry_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&route_type=4`);
    seattle_ferrry_caller.onreadystatechange = function() {
        if (seattle_ferrry_caller.readyState === 4 && seattle_ferrry_caller.status === 200) {
            var seattle_ferry_receiver = JSON.parse(seattle_ferrry_caller.responseText);

            for (var i = 0; i < seattle_ferry_receiver.routes.length; i++) {
                var base_route = seattle_ferry_receiver.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                if (route_short_name === null) {
                    document.getElementById("route_name_ferry").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("route_name_ferry").innerHTML = route_short_name;
                }

                document.getElementById("route_name_ferry").style.color = `#${route_text_color}`;
                document.getElementById("route_name_ferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_ferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_ferry").innerHTML = route_long_name;

                var ferry_route_toclone = document.getElementById("ferry_route_entity").cloneNode(true);
                document.getElementById("list_of_ferry_lines").appendChild(ferry_route_toclone);
            }

            var all_ferry_routes = document.getElementById("list_of_ferry_lines").children;
            document.getElementById("list_of_ferry_lines").removeChild(all_ferry_routes[0]);
        }
    }
    seattle_ferrry_caller.send();
}