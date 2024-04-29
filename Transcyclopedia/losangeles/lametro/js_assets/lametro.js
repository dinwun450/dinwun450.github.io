function loadWikipediaArticle() {
    var info_fetcher = new XMLHttpRequest();
    info_fetcher.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=Los_Angeles_County_Metropolitan_Transportation_Authority&format=json&origin=*");
    info_fetcher.onreadystatechange = function() {
        if (info_fetcher.readyState === 4 && info_fetcher.status === 200) {
            var info_receiver = JSON.parse(info_fetcher.responseText);
            var info_of_lametro = info_receiver.query.pages[359028].extract;
            document.getElementById("desc").innerHTML = `${info_of_lametro} <a href="https://en.wikipedia.org/wiki/Los_Angeles_County_Metropolitan_Transportation_Authority">Wikipedia</a>`
        }
    }
    info_fetcher.send();
}
loadWikipediaArticle();

function loadLAMetroLinesSubway() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=1&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_sub").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_sub").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length}`;
                }

                document.getElementById("route_name_sub").innerHTML = route_short_name;
                document.getElementById("route_name_sub").style.color = `#${route_text_color}`;
                document.getElementById("route_name_sub").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_sub").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_sub").innerHTML = route_long_name;

                var route_entity = document.getElementById("route_item_sub");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_subway").appendChild(clone_entity);
            }

            var all_subway_lines = document.querySelector(".lametro_subway").children;
            document.querySelector(".lametro_subway").removeChild(all_subway_lines[0]);
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesSubway();

function loadLAMetroLinesLR() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=0&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_lr").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_lr").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                document.getElementById("route_name_lr").innerHTML = route_short_name;
                document.getElementById("route_name_lr").style.color = `#${route_text_color}`;
                document.getElementById("route_name_lr").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_lr").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_lr").innerHTML = route_long_name;

                var route_entity = document.getElementById("route_item_lr");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_lightrail").appendChild(clone_entity);
            }

            var all_lr_lines = document.querySelector(".lametro_lightrail").children;
            document.querySelector(".lametro_lightrail").removeChild(all_lr_lines[0]);
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesLR();

function loadLAMetroLinesBus() {
    var route_fetcher = new XMLHttpRequest();
    route_fetcher.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q5-metro~losangeles&limit=700&route_type=3&include_alerts=true");
    route_fetcher.onreadystatechange = function() {
        if (route_fetcher.readyState === 4 && route_fetcher.status === 200) {
            var route_info = JSON.parse(route_fetcher.responseText);
            
            for (var i=0; i<route_info.routes.length; i++) {
                var route_short_name = route_info.routes[i].route_short_name;
                var route_long_name = route_info.routes[i].route_long_name;
                var route_color = route_info.routes[i].route_color;
                var route_text_color = route_info.routes[i].route_text_color;

                if (route_short_name === "") {
                    route_short_name = "&nbsp;&nbsp;&nbsp;";
                }

                if (route_info.routes[i].alerts.length === 0) {
                    document.getElementById("no_of_alerts_bus").innerHTML = "";
                }
                else {
                    document.getElementById("no_of_alerts_bus").innerHTML = `(<i class="fa-solid fa-triangle-exclamation"></i> ${route_info.routes[i].alerts.length})`;
                }

                document.getElementById("route_name_bus").innerHTML = route_short_name;
                document.getElementById("route_name_bus").style.color = `#${route_text_color}`;
                document.getElementById("route_name_bus").style.backgroundColor = `#${route_color}40`;
                document.getElementById("route_name_bus").style.border = `1px solid #${route_color}`;
                document.getElementById("route_desc_bus").innerHTML = route_long_name;

                var route_entity = document.getElementById("route_item_bus");
                var clone_entity = route_entity.cloneNode(true);
                document.querySelector(".lametro_bus").appendChild(clone_entity);
            }

            var all_bus_lines = document.querySelector(".lametro_bus").children;
            document.querySelector(".lametro_bus").removeChild(all_bus_lines[0]);
        }
    }
    route_fetcher.send();
}
loadLAMetroLinesBus();