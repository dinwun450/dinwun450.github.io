import { routeFetchColor } from "https://dinwun450.github.io/JS/trcypdia_findroute.js";

window.onload = function() {
    var counter_a = 0;
    var nearby_stops_counter = 1;
    var route_color_counter = 1;
    var counter_ab = 0;

    function getcountry() {
        var country_loc_get = new XMLHttpRequest();
        country_loc_get.open("GET", "https://ipinfo.io/?token=9d7b10f946e6fa");
        country_loc_get.onreadystatechange = function() {
            if (country_loc_get.readyState === 4 && country_loc_get.status === 200) {
                var parse_loc = JSON.parse(country_loc_get.responseText);
                console.log(parse_loc);
            }
        }
        country_loc_get.send();
    }
    getcountry();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showNearbyStops);
            navigator.geolocation.getCurrentPosition(getRouteColor);
        } else {
            alert("Transcyclopedia wanted the location! Please enable it next time!")
        }
    }
    getLocation();

    function showNearbyStops(position) {
        var here_get = new XMLHttpRequest();
        here_get.open("GET", `https://transit.hereapi.com/v8/departures?apikey=YiFSWQU08S1mIS5DnEw6gOOSO4Fy_z3lNhT9kEFZ6Vo&in=${position.coords.latitude},${position.coords.longitude};r=500`)

        here_get.onreadystatechange = function() {
            if (here_get.readyState == 4 && here_get.status == 200) {
                var here_response = JSON.parse(here_get.responseText);
                var boards = here_response.boards;

                while (counter_a < boards.length) {
                    var stop = boards[counter_a].place.name;
                    console.log(stop);
                    document.getElementById("stop" + nearby_stops_counter).innerHTML = stop;

                    var departures = boards[counter_a].departures;
                    var counter_b = 0;

                    while (counter_b < 3) {
                        var route = departures[counter_b].transport.name;
                        var til_arrival = Math.round((new Date(departures[counter_b].time).getTime() - new Date().getTime()) / 1000);
                        til_arrival = Math.round(til_arrival / 60);
                        document.getElementById("route" + nearby_stops_counter).innerHTML = route;
                        document.getElementById("departure" + nearby_stops_counter).innerHTML = ` ${til_arrival} min`;

                        var routeNode = document.getElementById("route" + nearby_stops_counter);
                        var routeClone = routeNode.cloneNode(true);
                        var arrivalNode = document.getElementById("departure" + nearby_stops_counter);
                        var arrivalClone = arrivalNode.cloneNode(true);
                        
                        document.getElementById("departures" + nearby_stops_counter).appendChild(routeClone);
                        document.getElementById("departures" + nearby_stops_counter).appendChild(arrivalClone);
                        document.getElementById("departures" + nearby_stops_counter).insertAdjacentHTML("beforeend", `<br>`);
                        counter_b += 1;
                    } 
                    var departuresOverall = document.getElementById("departures" + nearby_stops_counter).children;
                    document.getElementById("departures" + nearby_stops_counter).removeChild(departuresOverall[0]);
                    document.getElementById("departures" + nearby_stops_counter).removeChild(departuresOverall[0]);
                    document.getElementById("departures" + nearby_stops_counter).removeChild(departuresOverall[0]);
                    console.log(departuresOverall.length);

                    counter_a += 1;
                    nearby_stops_counter += 1;

                    if (nearby_stops_counter === 4) {
                        break;
                    }
                }
            }
        }
        here_get.send();
    }

    function getRouteColor(position) {
        var here_get = new XMLHttpRequest();
        var departuresOverall = document.getElementById("departures" + nearby_stops_counter).children;

        here_get.open("GET", `https://transit.hereapi.com/v8/departures?apikey=YiFSWQU08S1mIS5DnEw6gOOSO4Fy_z3lNhT9kEFZ6Vo&in=${position.coords.latitude},${position.coords.longitude};r=500`);
        here_get.onreadystatechange = function() {
            if (here_get.readyState === 4 && here_get.status === 200) {
                var here_response = JSON.parse(here_get.responseText);
                var boards = here_response.boards;

                while (counter_ab < 3) {
                    var departures = boards[counter_ab].departures;
                    var counter_bb = 0;

                    while (counter_bb < 3) {
                        var route = departures[counter_bb].transport.name;
                        var agency = departures[counter_bb].agency.name;
                        console.log(route);
                        routeFetchColor(agency, route);

                        var enough = document.getElementById("route" + route_color_counter);
                        console.log(enough);
                        // console.log(colorStat);

                        counter_bb += 1;
                    }
                    counter_ab += 1;
                    route_color_counter += 1;
                }
            }
        }
        here_get.send();
    }
}
