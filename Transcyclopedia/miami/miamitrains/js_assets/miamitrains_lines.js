var onestop_id = "";

function changeMiamiTrainLines(t) {
    var miami_train_agency = t;

    switch (miami_train_agency) {
        case "trirail":
            onestop_id = "o-dhx-tri~rail";
            break;
        case "brightline":
            onestop_id = "o-dh-brightline";
            break;
        default:
            onestop_id = "";
            document.getElementById("list_of_train_lines").innerHTML = `
                <li id="train_route_entity"><span id="route_name_train" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_train" class="all_desc_routes">Select a Train Agency.</span></li>
            `;
    }

    if (t === "prompt") {
        console.log("Pass");
    }
    else {
        getMiamiTrainLines(onestop_id);
    }
}

function getMiamiTrainLines(getOneStopID) {
    document.getElementById("list_of_train_lines").innerHTML = `
        <li id="train_route_entity"><span id="route_name_train" class="styling_for_routes">-</span>&nbsp;<span id="route_desc_train" class="all_desc_routes">Loading...</span></li>
    `;

    var miami_train_caller = new XMLHttpRequest();
    miami_train_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&route_type=2`);
    miami_train_caller.onreadystatechange = function() {
        if (miami_train_caller.readyState === 4 && miami_train_caller.status === 200) {
            var miami_train_receiver = JSON.parse(miami_train_caller.responseText);

            for (var i = 0; i < miami_train_receiver.routes.length; i++) {
                var base_route = miami_train_receiver.routes[i];
                var route_short_name = base_route.route_short_name;
                var route_long_name =  base_route.route_long_name;
                var route_text_color = base_route.route_text_color;
                var route_color = base_route.route_color;

                if (route_short_name === null) {
                    document.getElementById("route_name_train").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("route_name_train").innerHTML = route_short_name;
                }

                document.getElementById("route_desc_train").innerHTML = route_long_name;
                document.getElementById("route_name_train").style.color = `#${route_text_color}`;
                document.getElementById("route_name_train").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_train").style.border = `1px solid #${route_color}`;

                var train_route_toclone = document.getElementById("train_route_entity").cloneNode(true);
                document.getElementById("list_of_train_lines").appendChild(train_route_toclone);
            }

            var all_train_routes = document.getElementById("list_of_train_lines").children;
            document.getElementById("list_of_train_lines").removeChild(all_train_routes[0]);
        }
    }

    miami_train_caller.send();
}