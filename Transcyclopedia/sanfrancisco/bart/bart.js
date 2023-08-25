window.onload = function() {
    function showBartRoutes() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-bart")
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                console.log(routeResult);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    var routeShort = routeResult.routes[i].route_short_name;
                    var routeLong = routeResult.routes[i].route_long_name;
                    var routeColor = routeResult.routes[i].route_color;
                    var routeColorText = routeResult.routes[i].route_text_color;

                    document.getElementById("line").innerHTML = routeShort;
                    document.getElementById("route_desc").innerHTML = routeLong;
                    document.getElementById("line").style.backgroundColor = `#${routeColor}40`;
                    document.getElementById("line").style.border = `1px solid #${routeColor}`;
                    document.getElementById("line").style.color = `#${routeColorText}`;

                    var cloneTheList = document.getElementById("each_line");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.getElementById("bart_lines").appendChild(listTBC);
                }

                var linesAll = document.getElementById("bart_lines").children;
                document.querySelector("#bart_lines").removeChild(linesAll[0]);
            }
        }
        routeCall.send();
    }
    showBartRoutes();
}