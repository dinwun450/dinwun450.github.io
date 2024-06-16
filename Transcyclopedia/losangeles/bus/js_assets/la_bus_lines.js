var onestop_id = "";

function changeLABusLines(b) {
    var bus_agency = b;

    switch (bus_agency) {
        case "avta":
            onestop_id = "o-antelope~valley~transit~authority";
            break;
        case "baldinpark":
            onestop_id = "o-9qh1g-baldwinparktransit";
            break;
        case "beachcities":
            onestop_id = "o-9q5b-beachcitiestransit~cityofredondobeach";
            break;
        case "burbankbus":
            onestop_id = "o-9q5f7-burbankbus";
            break;
        case "carsoncirc":
            onestop_id = "o-9q5b-carsoncircuit";
            break;
        case "compton":
            onestop_id = "o-9q5bv-comptonrenaissancetransit";
            break;
        case "culver":
            onestop_id = "o-9q5c-culvercitybus";
            break;
        case "foothill":
            onestop_id = "o-9qh1-foothilltransit";
            break;
        case "gtrans":
            onestop_id = "o-9q5b-gtrans";
            break;
        case "glendale":
            onestop_id = "o-9q5f-glendalebeeline";
            break;
        case "glendora":
            onestop_id = "o-9qh4j-glendoratransportationdivision";
            break;
        case "huntington":
            onestop_id = "o-9q5cm-huntingtonparkexpress";
            break;
        case "lagobus":
            onestop_id = "o-9q5-lagobus";
            break;
        case "ladot":
            onestop_id = "o-9q5-ladot";
            break;
        case "lawndale":
            onestop_id = "o-9q5bf-lawndalebeat";
            break;
        case "laxflyaway":
            onestop_id = "o-9q5c-laxflyaway";
            break;
        case "longbeach":
            onestop_id = "o-9q5b-longbeachtransit";
            break;
        case "montebello":
            onestop_id = "o-9qh1-montebellobuslines";
            break;
        case "montereypark":
            onestop_id = "o-9q5cx-spiritbus";
            break;
        case "norwalk":
            onestop_id = "o-9qh1-norwalktransitsystem";
            break;
        case "palosverdes":
            onestop_id = "o-9q5b4-palosverdespeninsulatransitauthority";
            break;
        case "pasadena":
            onestop_id = "o-9q5f-pasadenatransit";
            break;
        case "santaclarita":
            onestop_id = "o-santa~clarita";
            break;
        case "bigbluebus":
            onestop_id = "o-9q5c-bigbluebus";
            break;
        case "torrance":
            onestop_id = "o-9q5b-torrancetransit";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_bus_lines").innerHTML = `
                <li id="bus_route_entity"><span id="route_bus">-</span> &nbsp; <span id="desc_of_each_bus_route">Select a Bus Agency.</span> <span id="no_of_alerts"></span></li>
            `;
    }

    if (b === "prompt") {
        console.log("Pass");
    }
    else {
        getLABusRoutes(onestop_id);
    }
}

function getLABusRoutes(getOneStopID) {
    document.getElementById("list_of_bus_lines").innerHTML = `
        <li id="bus_route_entity"><span id="route_bus">-</span> &nbsp; <span id="desc_of_each_bus_route">Loading...</span> <span id="no_of_alerts"></span></li>
    `;

    var la_bus_caller = new XMLHttpRequest();
    la_bus_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&include_alerts=true`);
    la_bus_caller.onreadystatechange = function() {
        if (la_bus_caller.readyState === 4 && la_bus_caller.status === 200) {
            var la_bus_receiver = JSON.parse(la_bus_caller.responseText);

            for (var i = 0; i < la_bus_receiver.routes.length; i++) {
                var base_route = la_bus_receiver.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                if (route_short_name === "") {
                    document.getElementById("route_bus").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("route_bus").innerHTML = route_short_name;
                }

                document.getElementById("route_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("desc_of_each_bus_route").innerHTML = route_long_name;

                if (base_route.alerts.length === 0) {
                    document.getElementById("no_of_alerts").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${base_route.alerts.length})`;
                    document.getElementById("no_of_alerts").setAttribute("title", "See alerts page for details.")
                }

                var bus_line = document.getElementById("bus_route_entity");
                var cloned_bus_line = bus_line.cloneNode(true);
                document.getElementById("list_of_bus_lines").append(cloned_bus_line);
            }

            var all_bus_lines = document.getElementById("list_of_bus_lines").children;
            document.getElementById("list_of_bus_lines").removeChild(all_bus_lines[0])
        }
    }
    la_bus_caller.send();
}