window.onload = function() {
    document.getElementById("popup_departure").style.display = "none";

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
            navigator.geolocation.getCurrentPosition(stopSearch);
            navigator.geolocation.getCurrentPosition(routeSearch);
        } else {
            alert("Transcyclopedia wanted the location! Please enable it next time!")
        }
    }
    getLocation();

    function getDateNTime() {
        var date = new Date();
        var getMonthNumber = date.getMonth() + 1;
        var getDayNumber = date.getDate();
        var getYearNumber = date.getFullYear();

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

        //`Welcome to Transcyclopedia! Today is ${getMonthNumber}/${getDayNumber}/${getYearNumber}, ${currentTime}.`
        document.getElementById("top_info").innerHTML = `Welcome to Transcyclopedia! Today is ${getMonthNumber}/${getDayNumber}/${getYearNumber}, ${currentTime}.`
    }
    setInterval(getDateNTime, 1000);

    var emp_id_stop = [];
    function stopSearch(position) {
        var transitland_stops = new XMLHttpRequest();
        console.log(position.coords.latitude, position.coords.longitude)

        transitland_stops.open("GET", `https://transit.land/api/v2/rest/stops/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=450&api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL`);
        transitland_stops.onreadystatechange = function() {
            if (transitland_stops.readyState === 4 && transitland_stops.status === 200) {
                mapboxgl.accessToken = 'pk.eyJ1IjoiZGlud3VuNDUwIiwiYSI6ImNsaTR4c253bTAzNnIzcnF1aTh0eTN2a3kifQ.fjcqiGi68hyGpUAKAo9Tcw';
                map = new mapboxgl.Map({
                    container: 'map', // container ID
                    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                    style: 'mapbox://styles/mapbox/streets-v12', // style URL
                    center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
                    zoom: 16 // starting zoom
                });

                map.addControl(new mapboxgl.NavigationControl());
                map.scrollZoom.disable();
                
                var compiledStops = JSON.parse(transitland_stops.responseText);
                console.log(compiledStops);
                var fullGeoJson = [];

                for (var j=0; j<5; j++) {
                    try {
                        console.log(compiledStops.stops[j].geometry);
                        fullGeoJson.push({'type': 'Feature', 'geometry': compiledStops.stops[j].geometry, 'properties': {'title': compiledStops.stops[j].stop_name}})
                    }
                    catch (TypeError) {
                        console.log(TypeError);
                        break;
                    }
                }

                console.log(fullGeoJson);
                map.on('load', () => {
                    map.loadImage(
                        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                        (error, image) => {
                            if (error) throw error;
                            map.addImage('custom-marker', image);
                            map.addSource('points', {
                                'type': 'geojson',
                                'data': {
                                    'type': 'FeatureCollection',
                                    'features': fullGeoJson
                                }
                            });

                            map.addLayer({
                                'id': 'points',
                                'type': 'symbol',
                                'source': 'points',
                                'layout': {
                                    'icon-image': 'custom-marker',
                                    // get the title name from the source's "title" property
                                    'text-field': ['get', 'title'],
                                    'text-font': [
                                        'Open Sans Semibold',
                                        'Arial Unicode MS Bold'
                                    ],
                                    'text-offset': [0, 1.25],
                                    'text-anchor': 'top'
                                }
                            });
                        }
                    )
                })

                for (var i=0; i < 5; i++) {
                    // stopId = compiledStops.stops[i].onestop_id;
                    // console.log(stopId)
                    try {
                        stopId = compiledStops.stops[i].onestop_id;
                        showNearbyStops(stopId);
                    }
                    catch (TypeError) {
                        console.log(TypeError);
                        break;
                    }
                    if (compiledStops.stops.length === 0) {
                        document.querySelector(".stopsnearby").innerHTML = `
                        <li>
                            <p style="text-align: center; font-size: 20px; margin-top: 25px;">There are no stops nearby.</p>
                        </li>
                        `
                        break;
                    }
                }
            }
            else if (transitland_stops.status === 504) {
                document.getElementById("top_info").innerHTML = `It seems that there are no stops and departures given because of Error ${transitland_stops.status}. Please try again.`
            }
        }
        transitland_stops.send();
    }

    counter = 1;
    function showNearbyStops(stopId) {
        var transitland_departures = new XMLHttpRequest();
        transitland_departures.open("GET", `https://transit.land/api/v2/rest/stops/${stopId}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
        transitland_departures.onreadystatechange = function() {
            if (transitland_departures.readyState === 4 && transitland_departures.status === 200) {
                try {
                    var compiledDepartures = JSON.parse(transitland_departures.responseText);
                    var while_counter = 0;
                    console.log(compiledDepartures);
                    var stopSpecific = compiledDepartures.stops[0].stop_name;
                    console.log(stopSpecific, stopSpecific.length);
                    document.getElementById("stop" + counter).innerHTML = `<p id="scroll_stop${counter}"><a onclick="disableScrolling()" href="#popup_departure" class="nothing">${stopSpecific}</a></p>`;
                    emp_id_stop.push(compiledDepartures.stops[0].onestop_id);

                    if (compiledDepartures.stops[0].alerts.length === 0) {
                        console.log("There are no alerts at this time...");
                        document.getElementById("detail").innerHTML = "There are no alerts at this time.";
                    }

                    while (while_counter < compiledDepartures.stops[0].departures.length) {
                        var departuredTime = compiledDepartures.stops[0].departures[while_counter].arrival.estimated;
                        var scheduledTime = compiledDepartures.stops[0].departures[while_counter].arrival.scheduled;
                        var departureRoute = compiledDepartures.stops[0].departures[while_counter].trip.route.route_short_name;
                        var departureColor = compiledDepartures.stops[0].departures[while_counter].trip.route.route_color;
                        var departureColorInText = compiledDepartures.stops[0].departures[while_counter].trip.route.route_text_color;
                        console.log(departureRoute);
                        console.log(compiledDepartures.stops[0].stop_name)

                        document.getElementById("route" + counter).innerHTML = departureRoute;
                        document.getElementById("route" + counter).style.backgroundColor = `#${departureColor}40`;
                        document.getElementById("route" + counter).style.color = `#${departureColorInText}`;
                        document.getElementById("route" + counter).style.border = `1px solid #${departureColor}`;
                        document.getElementById("route" + counter).setAttribute("title", compiledDepartures.stops[0].departures[while_counter].trip.trip_headsign);
                        
                        if (departuredTime === null) {
                            document.getElementById("departure" + counter).innerHTML = ` ${scheduledTime}`;
                        }
                        else if (scheduledTime === null) {
                            continue
                        }
                        else {
                            document.getElementById("departure" + counter).innerHTML = ` ${departuredTime}`;
                            document.getElementById("departure" + counter).style.color = "green";
                        }

                        var routeNode = document.getElementById("route" + counter);
                        var routeClone = routeNode.cloneNode(true);
                        var departureNode = document.getElementById("departure" + counter);
                        var departureClone = departureNode.cloneNode(true);

                        document.getElementById("departures" + counter).appendChild(routeClone);
                        document.getElementById("departures" + counter).appendChild(departureClone);
                        document.getElementById("departures" + counter).insertAdjacentHTML("beforeend", `<br>`);

                        console.log("alerts: ", compiledDepartures.stops[0].alerts.length)

                        if (compiledDepartures.stops[0].departures[while_counter].trip.alerts.length === 0) {
                            document.getElementById("detail").innerHTML = "There are no alerts at this time."
                            console.log("There are no alerts at this time...");
                        }

                        while_counter += 1

                        if (while_counter === 3) {
                            break;
                        }
                    }

                    var departuresOverall = document.getElementById("departures" + counter).children;
                    document.getElementById("departures" + counter).removeChild(departuresOverall[0]);
                    document.getElementById("departures" + counter).removeChild(departuresOverall[0]);
                    document.getElementById("departures" + counter).removeChild(departuresOverall[0]);
                    console.log(departuresOverall.length);

                    if (compiledDepartures.stops[0].departures.length === 0) {
                        for (var k = 0; k < compiledDepartures.stops.length; k++) {
                            if (compiledDepartures.stops[k].departures.length === 0) {
                                // document.getElementById("listofroutes" + counter).innerHTML = `<li><i class="fa-solid fa-ban"></i></li>`;
                                console.log("No!")
                                document.getElementById("departures" + counter).innerHTML = "<i class='fa-solid fa-ban' style='position: relative; top: 13px; font-size: 40px;' title='There are no departures at this moment. Either there is a problem on the real-time or scheduled departures, or a specific route is inactive.'></i>"
                            } 
                            else {
                                console.log('here it is!');
                            }
                        }
                    }

                    if (stopSpecific.length > 10) {
                        document.getElementById("scroll_stop" + counter).style.transform = "translateX(100vw)";
                        document.getElementById("scroll_stop" + counter).style.animation = "my-animation-2 15s linear infinite";
                    }

                    console.log(counter)
                    counter += 1
                }
                catch (TypeError) {
                    console.log(TypeError);
                }
            }
        }
        transitland_departures.send();
    }
    stopFinder(emp_id_stop)

    function routeSearch(position) {
        var routeApiToCall = new XMLHttpRequest();
        routeApiToCall.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&lat=${position.coords.latitude}&lon=${position.coords.longitude}&radius=500`);
        routeApiToCall.onreadystatechange = function() {
            if (routeApiToCall.status === 200 && routeApiToCall.readyState === 4) {
                var outputCall = JSON.parse(routeApiToCall.responseText);
                console.log(outputCall);

                if (outputCall.routes.length === 0) {
                    document.getElementById("fullroute").innerHTML = `<span style="display: flex; justify-content: center;">No Routes Nearby</span>`
                }
                else {
                    for (var r=0; r<outputCall.routes.length; r++) {
                        console.log(r);
                        var routeNo = outputCall.routes[r].route_short_name;
                        var routeFullName = outputCall.routes[r].route_long_name;
                        var routeTextColor = outputCall.routes[r].route_text_color;
                        var routeColor = outputCall.routes[r].route_color;

                        
                        console.log(routeNo, routeNo.length);

                        if (routeNo.length > 9) {
                            document.getElementById("routefull").innerHTML = routeNo;
                            document.getElementById("routefull").style.transform = "translateX(100%)";
                            document.getElementById("routefull").style.animation = "my-animation 10s linear infinite";
                        }
                        else {
                            document.getElementById("routefull").innerHTML = routeNo;
                            document.getElementById("routefull").style.transform = "none";
                            document.getElementById("routefull").style.animation = "none";
                        }

                        document.getElementById("fullnameofroute").innerHTML = routeFullName;
                        document.getElementById("routeno").style.backgroundColor = `#${routeColor}40`;
                        document.getElementById("routeno").style.color = `#${routeTextColor}`;

                        var routeNode = document.querySelector(".routelist");
                        var cloneNode = routeNode.cloneNode(true);
                        document.querySelector(".lines").appendChild(cloneNode);
                    }
                    var linesAll = document.querySelector(".lines").children;
                    console.log(linesAll);
                    document.querySelector(".lines").removeChild(linesAll[1]);
                }
            }
        }
        routeApiToCall.send();
    }
}

function stopFinder(array_of_stops) {
    console.log(document.querySelector(".stopsnearby").children, array_of_stops);
    document.getElementById("locstop1").onclick = function() {
        document.getElementById("overall_departures").innerHTML = `
        <li id="each_departure">
            <div id="routeandname"><span id="colorofroute">-</span> <span id="destination">(insertterminushere)</span> <span id="departureForEachRoute">(departurehere)</span></div> 
        </li>
        `
        var index = array_of_stops[0];
        var indexOneCall = new XMLHttpRequest();
        indexOneCall.open("GET", `https://transit.land/api/v2/rest/stops/${index}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
        indexOneCall.onreadystatechange = function() {
            if (indexOneCall.readyState === 4 && indexOneCall.status === 200) {
                var IndexOneStop = JSON.parse(indexOneCall.responseText);
                var stopName = IndexOneStop.stops[0].stop_name;
                var stopCode = IndexOneStop.stops[0].stop_code;

                document.getElementById("stop_id").innerHTML = `Stop ID: ${stopCode}`;
                document.getElementById("stop_name").innerHTML = stopName;

                if (stopName.length > 22) {
                    document.getElementById("stop_name").style.transform = "translateX(100%)";
                    document.getElementById("stop_name").style.animation = "my-animation 15s linear infinite";
                } 

                for (var i = 0; i < IndexOneStop.stops[0].departures.length; i++) {
                    var departuredTime = IndexOneStop.stops[0].departures[i].arrival.estimated;
                    var scheduledTime = IndexOneStop.stops[0].departures[i].arrival.scheduled;
                    var departureRoute = IndexOneStop.stops[0].departures[i].trip.route.route_short_name;
                    var departureColor = IndexOneStop.stops[0].departures[i].trip.route.route_color;
                    var departureColorInText = IndexOneStop.stops[0].departures[i].trip.route.route_text_color;
                    var routeTerminus = IndexOneStop.stops[0].departures[i].trip.trip_headsign;

                    document.getElementById("colorofroute").innerHTML = departureRoute;
                    document.getElementById("colorofroute").style.backgroundColor = `#${departureColor}40`;
                    document.getElementById("colorofroute").style.color = `#${departureColorInText}`;
                    document.getElementById("colorofroute").style.border = `1px solid #${departureColor}`;
                    document.getElementById("destination").innerHTML = routeTerminus;
                    
                    if (departuredTime === null) {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${scheduledTime}`;
                    }
                    else if (scheduledTime === null) {
                        continue
                    }
                    else {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${departuredTime}`;
                        document.getElementById("departureForEachRoute").style.color = "green";
                    }

                    var overallDepartures = document.getElementById("each_departure");
                    var cloneDepartures = overallDepartures.cloneNode(true);
                    document.getElementById("overall_departures").appendChild(cloneDepartures);
                }
                var Alldepartures = document.querySelector("#overall_departures").children;
                console.log(Alldepartures);
                document.querySelector("#overall_departures").removeChild(Alldepartures[0]);
            }
        }
        indexOneCall.send();
    }
    document.getElementById("locstop2").onclick = function() {
        document.getElementById("overall_departures").innerHTML = `
        <li id="each_departure">
            <div id="routeandname"><span id="colorofroute">-</span> <span id="destination">(insertterminushere)</span> <span id="departureForEachRoute">(departurehere)</span></div> 
        </li>
        `
        var index = array_of_stops[1];
        var indexTwoCall = new XMLHttpRequest();
        indexTwoCall.open("GET", `https://transit.land/api/v2/rest/stops/${index}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
        indexTwoCall.onreadystatechange = function() {
            if (indexTwoCall.readyState === 4 && indexTwoCall.status === 200) {
                var IndexOneStop = JSON.parse(indexTwoCall.responseText);
                var stopName = IndexOneStop.stops[0].stop_name;
                var stopCode = IndexOneStop.stops[0].stop_code;

                document.getElementById("stop_id").innerHTML = `Stop ID: ${stopCode}`;
                document.getElementById("stop_name").innerHTML = stopName;

                if (stopName.length > 22) {
                    document.getElementById("stop_name").style.transform = "translateX(100%)";
                    document.getElementById("stop_name").style.animation = "my-animation 15s linear infinite";
                } 

                for (var i = 0; i < IndexOneStop.stops[0].departures.length; i++) {
                    var departuredTime = IndexOneStop.stops[0].departures[i].arrival.estimated;
                    var scheduledTime = IndexOneStop.stops[0].departures[i].arrival.scheduled;
                    var departureRoute = IndexOneStop.stops[0].departures[i].trip.route.route_short_name;
                    var departureColor = IndexOneStop.stops[0].departures[i].trip.route.route_color;
                    var departureColorInText = IndexOneStop.stops[0].departures[i].trip.route.route_text_color;
                    var routeTerminus = IndexOneStop.stops[0].departures[i].trip.trip_headsign;

                    document.getElementById("colorofroute").innerHTML = departureRoute;
                    document.getElementById("colorofroute").style.backgroundColor = `#${departureColor}40`;
                    document.getElementById("colorofroute").style.color = `#${departureColorInText}`;
                    document.getElementById("colorofroute").style.border = `1px solid #${departureColor}`;
                    document.getElementById("destination").innerHTML = routeTerminus;
                    
                    if (departuredTime === null) {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${scheduledTime}`;
                    }
                    else if (scheduledTime === null) {
                        continue
                    }
                    else {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${departuredTime}`;
                        document.getElementById("departureForEachRoute").style.color = "green";
                    }

                    var overallDepartures = document.getElementById("each_departure");
                    var cloneDepartures = overallDepartures.cloneNode(true);
                    document.getElementById("overall_departures").appendChild(cloneDepartures);
                }
                var Alldepartures = document.querySelector("#overall_departures").children;
                console.log(Alldepartures);
                document.querySelector("#overall_departures").removeChild(Alldepartures[0]);
            }
        }
        indexTwoCall.send();
    }
    document.getElementById("locstop3").onclick = function() {
        document.getElementById("overall_departures").innerHTML = `
        <li id="each_departure">
            <div id="routeandname"><span id="colorofroute">-</span> <span id="destination">(insertterminushere)</span> <span id="departureForEachRoute">(departurehere)</span></div> 
        </li>
        `
        var index = array_of_stops[2];
        var indexThreeCall = new XMLHttpRequest();
        indexThreeCall.open("GET", `https://transit.land/api/v2/rest/stops/${index}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
        indexThreeCall.onreadystatechange = function() {
            if (indexThreeCall.readyState === 4 && indexThreeCall.status === 200) {
                var IndexOneStop = JSON.parse(indexThreeCall.responseText);
                var stopName = IndexOneStop.stops[0].stop_name;
                var stopCode = IndexOneStop.stops[0].stop_code;

                document.getElementById("stop_id").innerHTML = `Stop ID: ${stopCode}`;
                document.getElementById("stop_name").innerHTML = stopName;

                if (stopName.length > 22) {
                    document.getElementById("stop_name").style.transform = "translateX(100%)";
                    document.getElementById("stop_name").style.animation = "my-animation 15s linear infinite";
                } 

                for (var i = 0; i < IndexOneStop.stops[0].departures.length; i++) {
                    var departuredTime = IndexOneStop.stops[0].departures[i].arrival.estimated;
                    var scheduledTime = IndexOneStop.stops[0].departures[i].arrival.scheduled;
                    var departureRoute = IndexOneStop.stops[0].departures[i].trip.route.route_short_name;
                    var departureColor = IndexOneStop.stops[0].departures[i].trip.route.route_color;
                    var departureColorInText = IndexOneStop.stops[0].departures[i].trip.route.route_text_color;
                    var routeTerminus = IndexOneStop.stops[0].departures[i].trip.trip_headsign;

                    document.getElementById("colorofroute").innerHTML = departureRoute;
                    document.getElementById("colorofroute").style.backgroundColor = `#${departureColor}40`;
                    document.getElementById("colorofroute").style.color = `#${departureColorInText}`;
                    document.getElementById("colorofroute").style.border = `1px solid #${departureColor}`;
                    document.getElementById("destination").innerHTML = routeTerminus;
                    
                    if (departuredTime === null) {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${scheduledTime}`;
                    }
                    else if (scheduledTime === null) {
                        continue
                    }
                    else {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${departuredTime}`;
                        document.getElementById("departureForEachRoute").style.color = "green";
                    }

                    var overallDepartures = document.getElementById("each_departure");
                    var cloneDepartures = overallDepartures.cloneNode(true);
                    document.getElementById("overall_departures").appendChild(cloneDepartures);
                }
                var Alldepartures = document.querySelector("#overall_departures").children;
                console.log(Alldepartures);
                document.querySelector("#overall_departures").removeChild(Alldepartures[0]);
            }
        }
        indexThreeCall.send();
    }
    document.getElementById("locstop4").onclick = function() {
        document.getElementById("overall_departures").innerHTML = `
        <li id="each_departure">
            <div id="routeandname"><span id="colorofroute">-</span> <span id="destination">(insertterminushere)</span> <span id="departureForEachRoute">(departurehere)</span></div> 
        </li>
        `
        var index = array_of_stops[3];
        var indexFourCall = new XMLHttpRequest();
        indexFourCall.open("GET", `https://transit.land/api/v2/rest/stops/${index}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
        indexFourCall.onreadystatechange = function() {
            if (indexFourCall.readyState === 4 && indexFourCall.status === 200) {
                var IndexOneStop = JSON.parse(indexFourCall.responseText);
                var stopName = IndexOneStop.stops[0].stop_name;
                var stopCode = IndexOneStop.stops[0].stop_code;

                document.getElementById("stop_id").innerHTML = `Stop ID: ${stopCode}`;
                document.getElementById("stop_name").innerHTML = stopName;

                if (stopName.length > 22) {
                    document.getElementById("stop_name").style.transform = "translateX(100%)";
                    document.getElementById("stop_name").style.animation = "my-animation 15s linear infinite";
                } 

                for (var i = 0; i < IndexOneStop.stops[0].departures.length; i++) {
                    var departuredTime = IndexOneStop.stops[0].departures[i].arrival.estimated;
                    var scheduledTime = IndexOneStop.stops[0].departures[i].arrival.scheduled;
                    var departureRoute = IndexOneStop.stops[0].departures[i].trip.route.route_short_name;
                    var departureColor = IndexOneStop.stops[0].departures[i].trip.route.route_color;
                    var departureColorInText = IndexOneStop.stops[0].departures[i].trip.route.route_text_color;
                    var routeTerminus = IndexOneStop.stops[0].departures[i].trip.trip_headsign;

                    document.getElementById("colorofroute").innerHTML = departureRoute;
                    document.getElementById("colorofroute").style.backgroundColor = `#${departureColor}40`;
                    document.getElementById("colorofroute").style.color = `#${departureColorInText}`;
                    document.getElementById("colorofroute").style.border = `1px solid #${departureColor}`;
                    document.getElementById("destination").innerHTML = routeTerminus;
                    
                    if (departuredTime === null) {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${scheduledTime}`;
                    }
                    else if (scheduledTime === null) {
                        continue
                    }
                    else {
                        document.getElementById("departureForEachRoute").innerHTML = ` ${departuredTime}`;
                        document.getElementById("departureForEachRoute").style.color = "green";
                    }

                    var overallDepartures = document.getElementById("each_departure");
                    var cloneDepartures = overallDepartures.cloneNode(true);
                    document.getElementById("overall_departures").appendChild(cloneDepartures);
                }
                var Alldepartures = document.querySelector("#overall_departures").children;
                console.log(Alldepartures);
                document.querySelector("#overall_departures").removeChild(Alldepartures[0]);
            }
        }
        indexFourCall.send();
    }
    document.getElementById("locstop5").onclick = function() {
        try {
            document.getElementById("overall_departures").innerHTML = `
            <li id="each_departure">
                <div id="routeandname"><span id="colorofroute">-</span> <span id="destination">(insertterminushere)</span> <span id="departureForEachRoute">(departurehere)</span></div> 
            </li>
            `
            var index = array_of_stops[4];
            var indexFiveCall = new XMLHttpRequest();
            indexFiveCall.open("GET", `https://transit.land/api/v2/rest/stops/${index}/departures?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&include_alerts=true`);
            indexFiveCall.onreadystatechange = function() {
                if (indexFiveCall.readyState === 4 && indexFiveCall.status === 200) {
                    var IndexOneStop = JSON.parse(indexFiveCall.responseText);
                    var stopName = IndexOneStop.stops[0].stop_name;
                    var stopCode = IndexOneStop.stops[0].stop_code;

                    document.getElementById("stop_id").innerHTML = `Stop ID: ${stopCode}`;
                    document.getElementById("stop_name").innerHTML = stopName;

                    if (stopName.length > 22) {
                        document.getElementById("stop_name").style.transform = "translateX(100%)";
                        document.getElementById("stop_name").style.animation = "my-animation 15s linear infinite";
                    } 

                    for (var i = 0; i < IndexOneStop.stops[0].departures.length; i++) {
                        var departuredTime = IndexOneStop.stops[0].departures[i].arrival.estimated;
                        var scheduledTime = IndexOneStop.stops[0].departures[i].arrival.scheduled;
                        var departureRoute = IndexOneStop.stops[0].departures[i].trip.route.route_short_name;
                        var departureColor = IndexOneStop.stops[0].departures[i].trip.route.route_color;
                        var departureColorInText = IndexOneStop.stops[0].departures[i].trip.route.route_text_color;
                        var routeTerminus = IndexOneStop.stops[0].departures[i].trip.trip_headsign;

                        document.getElementById("colorofroute").innerHTML = departureRoute;
                        document.getElementById("colorofroute").style.backgroundColor = `#${departureColor}40`;
                        document.getElementById("colorofroute").style.color = `#${departureColorInText}`;
                        document.getElementById("colorofroute").style.border = `1px solid #${departureColor}`;
                        document.getElementById("destination").innerHTML = routeTerminus;
                        
                        if (departuredTime === null) {
                            document.getElementById("departureForEachRoute").innerHTML = ` ${scheduledTime}`;
                        }
                        else if (scheduledTime === null) {
                            continue
                        }
                        else {
                            document.getElementById("departureForEachRoute").innerHTML = ` ${departuredTime}`;
                            document.getElementById("departureForEachRoute").style.color = "green";
                        }

                        var overallDepartures = document.getElementById("each_departure");
                        var cloneDepartures = overallDepartures.cloneNode(true);
                        document.getElementById("overall_departures").appendChild(cloneDepartures);
                    }
                    var Alldepartures = document.querySelector("#overall_departures").children;
                    console.log(Alldepartures);
                    document.querySelector("#overall_departures").removeChild(Alldepartures[0]);
                }
            }
            indexFiveCall.send();
        }
        catch (TypeError) {
            console.log("You're not that guy, pal.")
        }
    }
}
