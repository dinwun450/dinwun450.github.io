function changeAgency(a) {
    var agency = a;
    console.log(agency);

    switch (agency) {
        case "sfbayferry":
            document.querySelector(".about_agency").innerHTML = `
                <h3>About SF Bay Ferry</h3>
                <p id="about_content">San Francisco Bay Ferry is a public transit passenger ferry service in the San Francisco Bay, administered by the San Francisco Bay Area Water Emergency Transportation Authority (WETA) and operated under contract by the privately owned, Blue and Gold Fleet. In 2022, the system had a ridership of 1,787,400, or about 9,400 per weekday as of the second quarter of 2023. <a href="https://en.wikipedia.org/wiki/San_Francisco_Bay_Ferry" style="outline: none; color: #1d75bc;">Wikipedia</a></p>
            `
            break;
        case "ggf":
            document.querySelector(".about_agency").innerHTML = `
                <h3>About Golden Gate Ferry</h3>
                <p id="about_content">Golden Gate Ferry is a commuter ferry service operated by the Golden Gate Bridge, Highway and Transportation District in San Francisco Bay, part of the Bay Area of Northern California, United States. Regular service is run to the Ferry Building in San Francisco from Larkspur, Sausalito, Tiburon, and Angel Island in Marin County, with additional service from Larkspur to Oracle Park and Chase Center. The ferry service is funded primarily by passenger fares and Golden Gate Bridge tolls. In 2022, Golden Gate Ferry had a ridership of 1,022,800, or about 4,200 per weekday as of the second quarter of 2023. <a href="https://en.wikipedia.org/wiki/Golden_Gate_Ferry" style="outline: none; color: #446ba4;">Wikipedia</a></p>
            `
            break;
        default:
            document.querySelector(".about_agency").innerHTML = "<p style='text-align: center; color: white; margin-top: 10px;'>Select an Agency from the dropdown menu above.</p>";
    }
}

function changeRouteByAgency(r) {
    var agency_by_route = r;
    console.log(agency_by_route);

    switch (agency_by_route) {
        case "sfbayferry":
            document.querySelector(".lines").innerHTML = `
                <li id="each_line">
                    <div id="line">-</div>
                    <div id="route_desc">Select a Ferry Agency</div>
                </li>
            `
            function showRoutes() {
                var routeCall = new XMLHttpRequest();
                routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9p-sanfranciscobayferry&limit=700");
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
                            document.querySelector(".lines").append(listCloned);
                        }

                        var allLines = document.querySelector(".lines").children;
                        document.querySelector(".lines").removeChild(allLines[0]);
                    }
                }
                routeCall.send();
            }
            showRoutes();
            break;
        case "ggf":
            document.querySelector(".lines").innerHTML = `
                <li id="each_line">
                    <div id="line">-</div>
                    <div id="route_desc">Select a Ferry Agency</div>
                </li>
            `
            function showRoutesGGF() {
                var routeCall = new XMLHttpRequest();
                routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q8z-goldengateferry&limit=700");
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
                            document.querySelector(".lines").append(listCloned);
                        }

                        var allLines = document.querySelector(".lines").children;
                        document.querySelector(".lines").removeChild(allLines[0]);
                    }
                }
                routeCall.send();
            }
            showRoutesGGF();
            break;
        default:
            document.querySelector(".lines").innerHTML = `
            <li id="each_line">
                <div id="line">-</div>
                <div id="route_desc">Select a Ferry Agency</div>
            </li>
            `
    }
}