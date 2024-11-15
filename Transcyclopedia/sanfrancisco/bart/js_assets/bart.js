window.onload = function() {
    var bartColors = {
        "Orange": '#faa61a',
        "Red": '#ed1c24',
        "Yellow": '#ffe800',
        "Green": "#4db848",
        "Blue": "#00aeef",
        "Beige": "#aba682",
        "BridgeA": "#000000",
        "BridgeB": "#000000"
    }
    
    function getCopyrightYear() {
        var date = new Date();
        var getYearNo = date.getFullYear();
        document.querySelector(".copyright").innerHTML = `&copy; ${getYearNo} Transcyclopedia. Created by Dino Wun.`;
    }
    getCopyrightYear();

    function getBartContacts() {
        var bart_agency_caller = new XMLHttpRequest();
        bart_agency_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9q9-bart&include_alerts=true");
        bart_agency_caller.onreadystatechange = function() {
            if (bart_agency_caller.readyState === 4 && bart_agency_caller.status === 200) {
                var bart_agency_receiver = JSON.parse(bart_agency_caller.responseText);
                var phone_no = bart_agency_receiver.agencies[0].agency_phone;
                var email = bart_agency_receiver.agencies[0].agency_email;

                if (email === null) {
                    email = "-";
                }
                if (phone_no === null) {
                    phone_no = "-";
                }

                document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
            }
        }
        bart_agency_caller.send();
    }
    getBartContacts();
    
    function loadBartRoutes() {
        var routeCall = new XMLHttpRequest();
        routeCall.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-bart")
        routeCall.onreadystatechange = function() {
            if (routeCall.readyState === 4 && routeCall.status === 200) {
                var routeResult = JSON.parse(routeCall.responseText);
                console.log(routeResult);
                
                for (var i=0; i<routeResult.routes.length; i++) {
                    document.getElementById("route").innerHTML = `<img src="img_assets/noun-bart-14232.svg" id="icon_of_train" class="transit_icons">&nbsp;<span id="direction"></span>`;
                    
                    var routeShort = routeResult.routes[i].route_short_name;
                    var routeLong = routeResult.routes[i].route_long_name;
                    var routeColorText = routeResult.routes[i].route_text_color;
                    var color_from_name = routeShort.split("-")[0];
                    var direction = routeShort.split("-")[1];
                    console.log(direction);

                    document.getElementById("description").innerHTML = `${routeLong} (${color_from_name})`;
                    document.getElementById("route").style.backgroundColor = `${bartColors[color_from_name]}40`;
                    document.getElementById("route").style.border = `1px solid ${bartColors[color_from_name]}`;

                    if (routeColorText === "000000") {
                        document.getElementById("icon_of_train").style.filter = "brightness(0%)";
                    }
                    else {
                        document.getElementById("icon_of_train").style.filter = "invert(1)";
                    }

                    if (routeShort === "BridgeA" || routeShort === "BridgeB") {
                        document.getElementById("route").innerHTML = `<i class="fa-solid fa-bus"></i> <span id="direction_of_bus_bridge"></span>`;
                        document.getElementById("route").style.color = "white";

                        if (routeShort === "BridgeA") {
                            document.getElementById("direction_of_bus_bridge").innerHTML = "(A)";
                        }
                        else {
                            document.getElementById("direction_of_bus_bridge").innerHTML = "(B)";
                        }
                    }
                    else {
                        document.getElementById("direction").innerHTML = `(${direction})`;
                        document.getElementById("direction").style.color = `#${routeColorText}`;
                    }

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

                        var cloneTheList = document.querySelector(".alert_entity");
                        var listTBC = cloneTheList.cloneNode(true);
                        document.querySelector("#alerts").appendChild(listTBC);
                    }

                    var alertsAll = document.querySelector("#alerts").children;
                    document.querySelector("#alerts").removeChild(alertsAll[1]);
                }
            }
        }
        alertCall.send();
    }
    BartAlerts();
}