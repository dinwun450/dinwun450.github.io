function getLStatus() {
    var l_status_caller = new XMLHttpRequest();
    const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.transitchicago.com/api/1.0/routes.aspx?type=rail&outputType=JSON');
    l_status_caller.open("GET", url, true);
    l_status_caller.onreadystatechange = function() {
        if (l_status_caller.readyState === 4 && l_status_caller.status === 200) {
            var l_status_data = JSON.parse(l_status_caller.responseText).CTARoutes.RouteInfo;
            for (var i = 0; i < l_status_data.length; i++) {
                var l_status = l_status_data[i].RouteStatus;
                var l_status_color = l_status_data[i].RouteStatusColor;
                var l_name = l_status_data[i].Route;
                var l_color = l_status_data[i].RouteColorCode;
                var l_text_color = l_status_data[i].RouteTextColor;

                document.getElementById("route_status_of_l").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted">`;
                document.getElementById("route_status_of_l").style.backgroundColor = `#${l_color}40`;
                document.getElementById("route_status_of_l").style.border = `1px solid #${l_color}`;
                document.getElementById("route_status_desc").innerHTML = l_name;

                if (l_text_color === "000000") {
                    document.getElementById("route_status_of_l").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                }

                document.getElementById("route_status").innerHTML = l_status;
                document.getElementById("route_status").style.color = `#${l_status_color}`;

                var table_row_to_clone = document.getElementById("each_l_line_status").cloneNode(true);
                document.getElementById("body_of_l_line_statuses").appendChild(table_row_to_clone);
            }

            var all_l_line_statuses = document.getElementById("body_of_l_line_statuses").children;
            document.getElementById("body_of_l_line_statuses").removeChild(all_l_line_statuses[0]);
        }
    }
    l_status_caller.send();
}

getLStatus();