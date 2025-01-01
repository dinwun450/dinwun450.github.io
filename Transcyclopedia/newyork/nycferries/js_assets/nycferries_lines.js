var onestop_id = "";

function changeNYCFerryLines(f) {
    var nycferry_agency = f;

    switch(nycferry_agency) {
        case "nycferry":
            onestop_id = "o-dr5r-nycferry";
            break;
        case "statenislandferry":
            onestop_id = "o-dr5r7-nycdot";
            break;
        case "nywaterway":
            onestop_id = "o-dr7-nywaterway";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_nyc_ferry_lines").innerHTML = `
                <li id="nycferry_route_entity"><span id="route_name_nycferry" class="styling_for_routes"><i class="fa-solid fa-ferry"></i></span>&nbsp;<span id="route_desc_nycferry" class="all_desc_routes">Select a NYC ferry Agency.</span></li>;
            `;
    }

    if (f === "prompt") {
        console.log("End.");
    }
    else {
        getNYCFerryLines(onestop_id);
    }
}

function getNYCFerryLines(getOneStopID) {
    document.getElementById("list_of_nyc_ferry_lines").innerHTML = `
        <li id="nycferry_route_entity"><span id="route_name_nycferry" class="styling_for_routes"><i class="fa-solid fa-ferry"></i></span>&nbsp;<span id="route_desc_nycferry" class="all_desc_routes">Loading...</span></li>
    `;

    var nycferry_caller = new XMLHttpRequest();
    nycferry_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&route_type=4`);
    nycferry_caller.onreadystatechange = function() {
        if (nycferry_caller.readyState === 4 && nycferry_caller.status === 200) {
            var nycferry_receiver = JSON.parse(nycferry_caller.responseText);

            for (var i = 0; i < nycferry_receiver.routes.length; i++) {
                var base_route = nycferry_receiver.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                if (route_short_name === null) {
                    document.getElementById("route_name_nycferry").innerHTML = `<i class="fa-solid fa-ferry"></i>`;
                }
                else {
                    document.getElementById("route_name_nycferry").innerHTML = `<i class="fa-solid fa-ferry"></i>&nbsp;${route_short_name}`;
                }

                document.getElementById("route_name_nycferry").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_nycferry").style.border = `1px solid #${route_color}`;
                document.getElementById("route_name_nycferry").style.color = `#${route_text_color}`;
                document.getElementById("route_desc_nycferry").innerHTML = route_long_name;

                var nycferry_route_toclone = document.getElementById("nycferry_route_entity").cloneNode(true);
                document.getElementById("list_of_nyc_ferry_lines").appendChild(nycferry_route_toclone);
            }

            var all_nycferry_routes = document.getElementById("list_of_nyc_ferry_lines").children;
            document.getElementById("list_of_nyc_ferry_lines").removeChild(all_nycferry_routes[0]);
        }
    }
    nycferry_caller.send();
}