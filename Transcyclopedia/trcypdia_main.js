window.onload = function() {
    alert("Welcome to Transcyclopedia! This site is under construction and may be subject to break or show other anomalies. Enjoy!");
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
        var getDayNumber = date.getDay() - 1;
        var getYearNumber = date.getFullYear();
        var getHour = date.getHours();
        var getMinute = date.getMinutes();
        var getSeconds = date.getSeconds();

        document.getElementById("top_info").innerHTML = `Welcome to Transcyclopedia! Today is ${getMonthNumber}/${getDayNumber}/${getYearNumber}, ${getHour}:${getMinute}:${getSeconds}.`
    }
    setInterval(getDateNTime, 1000);

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
                var fullGeoJson = []

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

    counter = 1
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
                    document.getElementById("stop" + counter).innerHTML = `<p id="scroll_stop${counter}">${stopSpecific}</p>`;

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
                        document.getElementById("scroll_stop" + counter).style.transform = "translateX(100%)";
                        document.getElementById("scroll_stop" + counter).style.animation = "my-animation 10s linear infinite";
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

                        document.getElementById("routeno").innerHTML = routeNo;
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
