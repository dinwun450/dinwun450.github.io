var onestop_id = "";
var icon_or_not = null;
var img_icon = "";

function changeNYCTrainLines(t) {
    var nyc_train_agency = t;

    switch (nyc_train_agency) {
        case "mtasir":
            onestop_id = "o-dr5r-nyct";
            img_icon = `<img src="img_assets/mta_sir.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "mtallrr":
            onestop_id = "o-dr5-longislandrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "mtametronorth":
            onestop_id = "o-dr7-metro~northrailroad";
            img_icon = "";
            icon_or_not = false;
            break;
        case "path":
            onestop_id = "o-dr5r-path";
            img_icon = `<img src="img_assets/path.svg" style="width: 20px; height: 20px;">`;
            icon_or_not = true;
            break;
        case "njtransitrail":
            onestop_id = "o-dr5-nj~transit";
            img_icon = "";
            icon_or_not = false;
            break;
        default:
            onestop_id = "";
            img_icon = "";
            var icon_or_not = null;
            document.getElementById("list_of_train_lines").innerHTML = `
                <li id="train_route_entity" class="flexer"><span id="route_name_train" class="styling_for_routes symbol_tagged">-</span>&nbsp;<span id="route_desc_train" class="all_desc_routes">Select a Train Agency.</span></li>
            `;
    }

    if (t === "prompt") {
        console.log("Pass");
    }
    else {
        getNYCTrainLines(onestop_id, icon_or_not, img_icon);
    }
}

function getNYCTrainLines(getOneStopID, determineIcon, iconImage) {
    document.getElementById("list_of_train_lines").innerHTML = `
        <li id="train_route_entity" class="flexer"><span id="route_name_train" class="styling_for_routes symbol_tagged">-</span>&nbsp;<span id="route_desc_train" class="all_desc_routes">Loading...</span></li>
    `;

    var nyc_train_caller = new XMLHttpRequest();
    nyc_train_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${getOneStopID}&limit=700&route_type=2`);
    nyc_train_caller.onreadystatechange = function() {
        if (nyc_train_caller.readyState === 4 && nyc_train_caller.status === 200) {
            var nyc_train_receiver = JSON.parse(nyc_train_caller.responseText);
            console.log(nyc_train_receiver);

            for (var i = 0; i < nyc_train_receiver.routes.length; i++) {
                var route_short_name = nyc_train_receiver.routes[i].route_short_name;
                var route_long_name = nyc_train_receiver.routes[i].route_long_name;
                var route_text_color = nyc_train_receiver.routes[i].route_text_color;
                var route_color = nyc_train_receiver.routes[i].route_color;

                if (determineIcon === true) {
                    document.getElementById("route_name_train").innerHTML = iconImage;
                }
                else if (route_short_name === null) {
                    document.getElementById("route_name_train").innerHTML = "&nbsp;&nbsp;&nbsp;";
                }
                else {
                    document.getElementById("route_name_train").innerHTML = `${route_short_name}`;
                }

                if (route_text_color === "000000") {
                    document.getElementById("route_name_train").style.filter = "invert(1)";
                }
                else {
                    document.getElementById("route_name_train").style.filter = "invert(0)";
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

    nyc_train_caller.send();
}