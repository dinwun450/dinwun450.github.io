var link = "";

function changeLines(b) {
    var bus_agency = b;

    switch (bus_agency) {
        case "actransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-actransit&limit=700";
            break;
        case "berkeleyshuttles":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p3-beartransit&limit=700";
            break;
        case "commutedotorg":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-commuteorgshuttles&limit=700";
            break;
        case "countyconnection":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-countyconnection&limit=700";
            break;
        case "dumbartonexpress":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9j-dumbartonexpress&limit=700";
            break;
        case "fast":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-fairfieldandsuisuntransit&limit=700";
            break;
        case "ggt":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-goldengatetransit&limit=700";
            break;
        case "marintransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbb-marintransit&limit=700";
            break;
        case "petalumatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbc9-petalumatransit&limit=700";
            break;
        case "sanmateotransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8-samtrans&limit=700";
            break;
        case "santarosacitybus":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qbdx-santarosacitybus&limit=700";
            break;
        case "solanotransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc0-soltrans&limit=700";
            break;
        case "sonomacountytransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qb-sonomacountytransit&limit=700";
            break;
        case "stanfordshuttles":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9h-stanford~marguerite&limit=700";
            break;
        case "trideltatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc2-trideltatransit&limit=700";
            break;
        case "uctransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9jy-unioncitytransit&limit=700";
            break; 
        case "vacavillecitycoach":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc60-vacavillecitycoach&limit=700";
            break;
        case "napatransit":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-vinenapacounty&limit=700";
            break;
        case "westcat":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-westcatwesterncontracosta&limit=700";
            break;
        case "trivalleywheels":
            link = "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9q-wheelsbus&limit=700";
            break;
        default:
            link = "";
            document.querySelector(".bus_lines").innerHTML = `
                <li id="route_entity"><span id="route">-</span> &nbsp; <span id="desc">Select a Bus Agency.</span></li>
            `;
            break;
    }

    if (b === "prompt") {
        console.log("Pass.");
    }
    else {
        getBusRoutes(link);
    }
}

function getBusRoutes(transitLink) {
    document.querySelector(".bus_lines").innerHTML = `
        <li id="route_entity"><span id="route">-</span> &nbsp; <span id="desc_2">Loading...</span></li>
    `;

    var route_caller = new XMLHttpRequest();
    route_caller.open("GET", transitLink);
    route_caller.onreadystatechange = function() {
        if (route_caller.readyState === 4 && route_caller.status === 200) {
            var routes_compiled = JSON.parse(route_caller.responseText);

            for (var i = 0; i < routes_compiled.routes.length; i++) {
                var base_route = routes_compiled.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                document.getElementById("route").innerHTML = route_short_name;
                document.getElementById("route").style.color = `#${route_text_color}`;
                document.getElementById("route").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route").style.border = `1px solid #${route_color}`;
                document.getElementById("desc_2").innerHTML = route_long_name;

                var bus_line = document.getElementById("route_entity");
                var cloned_bus_line = bus_line.cloneNode(true);
                document.querySelector(".bus_lines").append(cloned_bus_line);
            }

            var all_bus_lines = document.querySelector(".bus_lines").children;
            console.log(all_bus_lines)
            document.querySelector(".bus_lines").removeChild(all_bus_lines[0])
        }
    }
    route_caller.send();
}