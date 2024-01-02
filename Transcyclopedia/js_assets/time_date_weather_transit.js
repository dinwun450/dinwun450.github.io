window.onload = function() {
    var detail_clicker_list = []
    var stop_id_classification = []
    var onestop_id_classification = []
    var stop_coordinates = [];
    var viewport = null;
    
    function updateSize() {
        viewport = window.innerWidth;
    }
    updateSize();
    window.addEventListener("resize", updateSize);

    function getLocationWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(weatherForecaster);
            navigator.geolocation.getCurrentPosition(routesNearby);
            navigator.geolocation.getCurrentPosition(stopsNearby);
        } else {
            alert("Transcyclopedia wanted the location! Please enable it next time!")
        }
    }
    getLocationWeather();

    function weatherForecaster(position) {
        var weather_call = new XMLHttpRequest();
        weather_call.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=0e677ad9097d32458226a1c86a7a9c5e`);
        weather_call.onreadystatechange = function() {
            if (weather_call.readyState === 4 && weather_call.status === 200) {
                var weather_output = JSON.parse(weather_call.responseText);
                console.log(weather_output);

                var temperature_to_f = Math.round((weather_output.main.temp - 273.15) * (9/5) + 32);
                var sunset = weather_output.sys.sunset;
                var id = weather_output.weather[0].id;
                var date = new Date();
                var currently = Math.round(date / 1000);
                console.log(currently+ "<" + sunset +" = "+(currently < sunset))
                daylight = (currently < sunset) ? "day" : "night";
                console.log(daylight);

                document.getElementById("weather").innerHTML = `<i class="wi wi-owm-${daylight}-${id}"></i> | ${temperature_to_f}&deg;F`
            }
        }
        weather_call.send();
    }

    function getDateNTime() {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var date = new Date();

        var getMonth = months[date.getMonth()];
        var getDayNumber = date.getDate();
        var getDayName = days[date.getDay()];
        var getYearNumber = date.getFullYear();
        document.querySelector(".copyright").innerHTML = `&copy; ${getYearNumber} Transcyclopedia. Created by Dino Wun.`

        var getHour = date.getHours();
        var getMinute = date.getMinutes();
        var getSeconds = date.getSeconds();
        var am_or_pm = "AM";

        if (getHour >= 12) {
            if (getHour > 12) getHour -= 12;
            am_or_pm = "PM";
        }
        else if (getHour == 0) {
            getHour = 12;
            am_or_pm = "AM";
        }

        getHour = getHour < 10 ? "0" + getHour : getHour;
        getMinute = getMinute < 10 ? "0" + getMinute : getMinute;
        getSeconds = getSeconds < 10 ? "0" + getSeconds : getSeconds;
        currentTime = getHour + ":" + getMinute + ":" + getSeconds + am_or_pm;

        if (viewport < 1000) {
            document.getElementById("date").innerHTML = `${date.getMonth() + 1}/${getDayNumber}/${getYearNumber}, <br> ${currentTime}`;
        }
        else {
            document.getElementById("date").innerHTML = `${getDayName}, ${getMonth} ${getDayNumber}, <br> ${getYearNumber}, ${currentTime}`;
        }
    }
    setInterval(getDateNTime, 1000);

    function routesNearby(position) {
        var transit_router = new XMLHttpRequest();
        transit_router.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=500`);
        transit_router.onreadystatechange = function() {
            if (transit_router.readyState === 4 && transit_router.status === 200) {
                var transit_outputs = JSON.parse(transit_router.responseText);
                console.log(transit_outputs);

                if (transit_outputs.routes.length === 0) {
                    document.getElementById("route_entity").innerHTML = "No routes nearby."
                }
                else {
                    for (var i=0; i<transit_outputs.routes.length; i++) {
                        var route_short_name = transit_outputs.routes[i].route_short_name;
                        var route_long_name = transit_outputs.routes[i].route_long_name;
                        var route_color = transit_outputs.routes[i].route_color;
                        var route_text_color = transit_outputs.routes[i].route_text_color;
                        var agency = transit_outputs.routes[i].agency.agency_name;

                        if (route_short_name === "") {
                            route_short_name = "&nbsp;&nbsp;&nbsp;";
                        }

                        if (route_color === "") {
                            route_color = "333333";
                        }

                        document.getElementById("route").innerHTML = route_short_name;
                        document.getElementById("route").removeAttribute("title");
                        document.getElementById("route").style.color = `#${route_text_color}`;
                        document.getElementById("route").style.border = `1px solid #${route_color}40`;
                        document.getElementById("route").style.backgroundColor = `#${route_color}40`;
                        document.getElementById("description").innerHTML = `${route_long_name} (${agency})`;
                        document.getElementById("description").removeAttribute("title");

                        var routeNode = document.querySelector("#route_entity");
                        var cloneNode = routeNode.cloneNode(true);
                        document.querySelector(".routes_near_you").appendChild(cloneNode);
                    }

                    var linesAll = document.querySelector(".routes_near_you").children;
                    console.log(linesAll);
                    document.querySelector(".routes_near_you").removeChild(linesAll[0]);
                }
            }
        }
        transit_router.send();
    }

    function stopsNearby(position) {
        var stop_caller = new XMLHttpRequest();
        stop_caller.open("GET", `https://transit.land/api/v2/rest/stops/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=450&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
        stop_caller.onreadystatechange = function() {
            if (stop_caller.readyState === 4 && stop_caller.status === 200) {
                var list_of_stops = JSON.parse(stop_caller.responseText);
                console.log(list_of_stops);
                if (list_of_stops.stops.length === 0) {
                    document.querySelector(".stop_info").innerHTML = `<p style="text-align: center; margin-top: 5px; margin-bottom: 5px;">No Stops Nearby</p>`
                }
                else {
                    for (var k=0; k<list_of_stops.stops.length; k++) {
                        var stop_name = list_of_stops.stops[k].stop_name;
                        var stop_id = list_of_stops.stops[k].stop_code;
                        var onestop = list_of_stops.stops[k].onestop_id;
                        var coordinates = list_of_stops.stops[k].geometry.coordinates;

                        document.querySelector(".stop_info").innerHTML = `
                            <p id="stop_name${k}" class="stop_header">${stop_name}</p>
                            <p id="distance${k}" class="distance_sub">Click once for distance, thrice for departures.</p>
                            <button id="detail${k}" class="chev_detail"><i class="fa-solid fa-chevron-down"></i></button>
                            <div id="stop_description${k}" class="show_and_hide_info">
                                <p id="stop_id${k}" style="padding-left: 10px; padding-top: 10px;">Stop ID: </p>
                                <p style="margin-left: 10px;"><b>Departures</b></p>
                                <ul id="overall_departures${k}">
                                    <li id="each_departure${k}" style="list-style-type: none; margin-left: 10px; margin-bottom: 5px;">
                                        <div id="routeandname${k}"><span id="colorofroute${k}" style="display: inline-block; width: fit-content; padding-left: 5px; padding-right: 5px; height: 23px; background: #33333340; border-radius: 5px; border: 1px solid black; font-size: 1em; color: white; text-align: center;">-</span> <span id="destination${k}">(insertterminushere)</span> <span id="departureForEachRoute${k}" style="float: right; margin-right: 10px;">(departurehere)</span></div> 
                                    </li>
                                </ul>
                            </div>
                        `
                        detail_clicker_list.push("detail" + k);
                        stop_id_classification.push(stop_id);
                        onestop_id_classification.push(onestop);
                        stop_coordinates.push(coordinates);
                        console.log(stop_coordinates);

                        var stopNode = document.querySelector(".stop_info");
                        var cloneNode = stopNode.cloneNode(true);
                        document.querySelector(".stops_nearby").appendChild(cloneNode);
                    }

                    var stopsAll = document.querySelector(".stops_nearby").children;
                    document.querySelector(".stops_nearby").removeChild(stopsAll[1]);
                    console.log(detail_clicker_list);
                    console.log(stop_id_classification);

                    for (var l=0; l<detail_clicker_list.length; l++) {
                        (function(index){
                            document.getElementById(detail_clicker_list[l]).onclick = function(){
                                clicker_out(index);
                                departures(index);
                                distanceStop(position, index);
                            }    
                        })(l);
                    }
                }
            }
        }
        stop_caller.send();

        function clicker_out(i) {
            document.getElementById("detail" + i).onclick = function() {
                var x = document.getElementById("stop_description" + i);
                if (x.style.display === "none") {
                    x.style.display = "block";
                    document.getElementById("detail" + i).innerHTML = "<i class='fa-solid fa-chevron-up'></i>";
                }
                else {
                    x.style.display = "none";
                    document.getElementById("detail" + i).innerHTML = "<i class='fa-solid fa-chevron-down'></i>";
                }
            }
        }

        function departures(i) {
            document.getElementById("stop_id" + i).innerHTML = `Stop ID: ${stop_id_classification[i]}`;
            var specified_stop_id = onestop_id_classification[i];

            var departures_caller = new XMLHttpRequest();
            departures_caller.open("GET", `https://transit.land/api/v2/rest/stops/${specified_stop_id}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
            departures_caller.onreadystatechange = function() {
                if (departures_caller.readyState === 4 && departures_caller.status === 200) {
                    var departures_list = JSON.parse(departures_caller.responseText);
                    console.log(departures_list);

                    var list_of_departures = departures_list.stops[0].departures;
                    if (list_of_departures.length === 0) {
                        console.log("There's no departures at this moment.")
                        document.getElementById("routeandname" + i).innerHTML = "There's no departures at this moment. Please check again sometime."
                    }
                    else {
                        for (var n=0; n<list_of_departures.length; n++) {
                            var route_color = list_of_departures[n].trip.route.route_color;
                            var route_text_color = list_of_departures[n].trip.route.route_text_color;
                            var route_short_name = list_of_departures[n].trip.route.route_short_name;
                            var terminus = list_of_departures[n].trip.trip_headsign;
                            var arrival_time = list_of_departures[n].arrival.estimated;
                            var scheduled_time = list_of_departures[n].arrival.scheduled;

                            if (route_short_name === "") {
                                route_short_name = "&nbsp;&nbsp;&nbsp;";
                            }
    
                            if (route_color === "") {
                                route_color = "333333";
                            }

                            if (arrival_time === null) {
                                document.getElementById("departureForEachRoute" + i).innerHTML = scheduled_time
                            }
                            else {
                                document.getElementById("departureForEachRoute" + i).innerHTML = arrival_time;
                                document.getElementById("departureForEachRoute" + i).style.color = "green";
                            }

                            document.getElementById("colorofroute" + i).style.backgroundColor = `#${route_color}40`;
                            document.getElementById("colorofroute" + i).style.border = `1px solid #${route_color}40`;
                            document.getElementById("colorofroute" + i).style.color = `#${route_text_color}`;
                            document.getElementById("colorofroute" + i).innerHTML = route_short_name;
                            document.getElementById("destination" + i).innerHTML = terminus;

                            var departureNode = document.querySelector("#each_departure" + i);
                            var cloneNode = departureNode.cloneNode(true);
                            document.querySelector("#overall_departures" + i).appendChild(cloneNode);
                        }
                        var departuresAll = document.querySelector("#overall_departures" + i).children;
                        console.log(departuresAll);
                        document.querySelector("#overall_departures" + i).removeChild(departuresAll[0]);
                    }
                }
            }
            departures_caller.send();
        }

        function distanceStop(position, i) {
            let lat1 = position.coords.latitude;
            let lat2 = stop_coordinates[i][1];
            let lon1 = position.coords.longitude; 
            let lon2 = stop_coordinates[i][0];
            let unit = "K";

            if ((lat1 == lat2) && (lon1 == lon2)) {
                document.getElementById("distance" + i).innerHTML = `0 km away`;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                document.getElementById("distance" + i).innerHTML = `${Math.round(dist * 1000)} m away`;
            }
        }
    }
}