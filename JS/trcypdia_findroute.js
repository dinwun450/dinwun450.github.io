function routeFetchColor(agency, route) {
    var routeColorCall = new XMLHttpRequest();
    if (agency === "AC TRANSIT") {
        routeColorCall.open("GET", "https://dinwun450.github.io/TransitAssets/SFBayArea/ac_routes.json");
        routeColorCall.onreadystatechange = function() {
            if (routeColorCall.status === 200 && routeColorCall.readyState === 4) {
                var lineStat = JSON.parse(routeColorCall.responseText);
                var colorStat = "#" + lineStat[route].route_color;
                console.log(colorStat);
                
                document.getElementById("para").innerHTML = colorStat;
                document.getElementById("para").style.color = colorStat;
            }
        }
        routeColorCall.send();
    }
    else if (agency === "Union City Transit") {
        routeColorCall.open("GET", "https://dinwun450.github.io/TransitAssets/SFBayArea/uc_routes.json");
        routeColorCall.onreadystatechange = function() {
            if (routeColorCall.status === 200 && routeColorCall.readyState === 4) {
                var lineStat = JSON.parse(routeColorCall.responseText);
                var colorStat = "#" + lineStat[route].route_color;
                console.log(colorStat);
                
                document.getElementById("para").innerHTML = colorStat;
                document.getElementById("para").style.color = colorStat;
            }
        }
        routeColorCall.send();
    }
    else {
        alert("That agency probably wasn't the best fit of one of the routes...");
    }
}

export {routeFetchColor};
