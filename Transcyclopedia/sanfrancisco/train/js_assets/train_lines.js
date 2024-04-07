var operator_onestop_id = "";

function changeTrainLines(b) {
    var agency = b;

    switch (agency) {
        case "ace":
            operator_onestop_id = "o-9q9-acealtamontcorridorexpress";
            break;
        case "caltrain":
            operator_onestop_id = "o-9q9-caltrain";
            break;
        case "capitol_corridor":
            operator_onestop_id = "o-9qc-capitolcorridor";
            break;
        case "smart":
            operator_onestop_id = "o-9qb-sonomamarinarearailtransit";
            break;
        default:
            operator_onestop_id = "";
            break;
    }

    if (agency === "prompt") {
        console.log("End.");
    }
    else {
        compileTrainLines(operator_onestop_id);
    }
}

function compileTrainLines(InsertOneStopID) {
    var new_line_request = new XMLHttpRequest();
    new_line_request.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${InsertOneStopID}&limit=700&include_alerts=true`);
    new_line_request.onreadystatechange = function() {
        if (new_line_request.readyState === 4 && new_line_request.status === 200) {
            var list_of_lines = JSON.parse(new_line_request.responseText).routes;

            for (var i=0; i<list_of_lines.length; i++) {
                var route_short_name = list_of_lines[i].route_short_name;
                var route_long_name = list_of_lines[i].route_long_name;
                var route_color = list_of_lines[i].route_color;
                var route_text_color = list_of_lines[i].route_text_color;
            
                document.getElementById("route").innerHTML = route_short_name;
                document.getElementById("route").style.color = `#${route_text_color}`;
                document.getElementById("route").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route").style.border = `1px solid #${route_color}`;
                document.getElementById("desc_train").innerHTML = route_long_name;

                var routetoClone = document.getElementById("route_entity");
                var routeCloned = routetoClone.cloneNode(true);
                document.getElementById("train_lines").appendChild(routeCloned);
            }

            var childrenRoutes = document.getElementById("train_lines").children;
            document.getElementById("train_lines").removeChild(childrenRoutes[0]);
        }
    }
    new_line_request.send();
}