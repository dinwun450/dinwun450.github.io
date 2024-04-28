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