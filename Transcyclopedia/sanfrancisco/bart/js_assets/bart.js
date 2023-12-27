window.onload = function() {
    function loadBartRoutes() {
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

                    document.getElementById("route").innerHTML = routeShort;
                    document.getElementById("description").innerHTML = routeLong;
                    document.getElementById("route").style.backgroundColor = `#${routeColor}40`;
                    document.getElementById("route").style.border = `1px solid #${routeColor}`;
                    document.getElementById("route").style.color = `#${routeColorText}`;

                    var cloneTheList = document.getElementById("route_entity");
                    var listTBC = cloneTheList.cloneNode(true);
                    document.querySelector(".bart_lines").appendChild(listTBC);
                }

                var linesAll = document.querySelector(".bart_lines").children;
                document.querySelector(".bart_lines").removeChild(linesAll[0]);
            }
        }
        routeCall.send();
    }
    loadBartRoutes();

    function elevatorBartStatus() {
        var elevatorCall = new XMLHttpRequest();
        elevatorCall.open("GET", "https://api.bart.gov/api/bsa.aspx?cmd=elev&key=MW9S-E7SL-26DU-VV8V&json=y");
        elevatorCall.onreadystatechange = function() {
            if (elevatorCall.status === 200 && elevatorCall.readyState === 4) {
                var elevatorStats = JSON.parse(elevatorCall.responseText);
                var elevator_calls = elevatorStats.root.bsa[0].station;
                var elevator_desc = elevatorStats.root.bsa[0].description['#cdata-section'];
                
                console.log(elevatorStats)
                document.getElementById("alert_desc_elev").innerHTML = `${elevator_desc}`;
            }
        }
        elevatorCall.send();
    }
    elevatorBartStatus();

    function BartAlerts() {
        var alertCall = new XMLHttpRequest();
        alertCall.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9-bart&include_alerts=true")
        alertCall.onreadystatechange = function() {
            if (alertCall.status === 200 && alertCall.readyState === 4) {
                var alertActivation = JSON.parse(alertCall.responseText);
                var alerts_today = alertActivation.agencies[0].alerts;

                if (alerts_today.length === 0) {
                    document.getElementById("alert_desc").innerHTML = "There are no alerts at this time. Please check again shortly."
                }
                else {
                    console.log(alerts_today);
                    for (var a=0; a<alerts_today.length; a++) {
                        var desc_text = alerts_today[a].description_text[0].text;
                        console.log(desc_text);
                        document.getElementById("alert_desc").innerHTML = desc_text;
                    }
                }
            }
        }
        alertCall.send();
    }
    BartAlerts();
}