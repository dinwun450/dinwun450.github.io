window.onload = function() {
    function showVTARoutes_Bus() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-vta&limit=700&route_type=3");
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    var route_short_name = routeResult.routes[i].route_short_name;
                    var route_long_name = routeResult.routes[i].route_long_name;
                    var route_color = routeResult.routes[i].route_color;
                    var route_color_text = routeResult.routes[i].route_text_color;

                    document.getElementById("line").innerHTML = route_short_name;
                    document.getElementById("route_desc").innerHTML = route_long_name;
                    document.getElementById("line").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("line").style.border = `1px solid #${route_color}`;
                    document.getElementById("line").style.color = `#${route_color_text}`;

                    var listToClone = document.getElementById("each_line");
                    var listCloned = listToClone.cloneNode(true);
                    document.getElementById("vta_lines").append(listCloned);
                }

                var allBusLines = document.getElementById("vta_lines").children;
                document.querySelector("#vta_lines").removeChild(allBusLines[0]);
            }
        }
        routeCall.send();
    }
    showVTARoutes_Bus();

    function showVTARoutes_LR() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-vta&limit=700&route_type=0");
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    var route_short_name = routeResult.routes[i].route_short_name;
                    var route_long_name = routeResult.routes[i].route_long_name;
                    var route_color = routeResult.routes[i].route_color;
                    var route_color_text = routeResult.routes[i].route_text_color;

                    document.getElementById("line_lr").innerHTML = route_short_name;
                    document.getElementById("route_desc_lr").innerHTML = route_long_name;
                    document.getElementById("line_lr").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("line_lr").style.border = `1px solid #${route_color}`;
                    document.getElementById("line_lr").style.color = `#${route_color_text}`;

                    var listToClone = document.getElementById("each_line_lr");
                    var listCloned = listToClone.cloneNode(true);
                    document.getElementById("vta_lr_lines").append(listCloned);
                }

                var allBusLines = document.getElementById("vta_lr_lines").children;
                document.querySelector("#vta_lr_lines").removeChild(allBusLines[0]);
            }
        }
        routeCall.send();
    }
    showVTARoutes_LR();
}