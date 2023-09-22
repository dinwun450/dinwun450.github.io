window.onload = function() {
    function showMuniRoutes() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=3")
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
                    document.getElementById("muni_lines").appendChild(listTBC);
                }

                var linesAll = document.getElementById("muni_lines").children;
                document.querySelector("#muni_lines").removeChild(linesAll[0]);
            }
        }
        routeCall.send();
    }
    showMuniRoutes();

    function showMuniMetroRoutes() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=0")
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                console.log(routeResult);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    var routeShort = routeResult.routes[i].route_short_name;
                    var routeLong = routeResult.routes[i].route_long_name;
                    var routeColor = routeResult.routes[i].route_color;
                    var routeColorText = routeResult.routes[i].route_text_color;

                    document.getElementById("line_metro").innerHTML = routeShort;
                    document.getElementById("route_desc_metro").innerHTML = routeLong;
                    document.getElementById("line_metro").style.backgroundColor = `#${routeColor}40`;
                    document.getElementById("line_metro").style.border = `1px solid #${routeColor}`;
                    document.getElementById("line_metro").style.color = `#${routeColorText}`;

                    var cloneTheList = document.getElementById("each_line_metro");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.getElementById("munimetrolines").appendChild(listTBC);
                }

                var linesAll = document.getElementById("munimetrolines").children;
                document.querySelector("#munimetrolines").removeChild(linesAll[0]);
            }
        }
        routeCall.send();
    }
    showMuniMetroRoutes();

    function showMuniCableRoutes() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8y-sfmta&limit=700&route_type=5")
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                console.log(routeResult);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    var routeShort = routeResult.routes[i].route_short_name;
                    var routeLong = routeResult.routes[i].route_long_name;
                    var routeColor = routeResult.routes[i].route_color;
                    var routeColorText = routeResult.routes[i].route_text_color;

                    document.getElementById("line_cable").innerHTML = routeShort;
                    document.getElementById("route_desc_cable").innerHTML = routeLong;
                    document.getElementById("line_cable").style.backgroundColor = `#${routeColor}40`;
                    document.getElementById("line_cable").style.border = `1px solid #${routeColor}`;
                    document.getElementById("line_cable").style.color = `#${routeColorText}`;

                    var cloneTheList = document.getElementById("each_line_cable");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.getElementById("municablelines").appendChild(listTBC);
                }

                var linesAll = document.getElementById("municablelines").children;
                document.querySelector("#municablelines").removeChild(linesAll[0]);
            }
        }
        routeCall.send();
    }
    showMuniCableRoutes();
}