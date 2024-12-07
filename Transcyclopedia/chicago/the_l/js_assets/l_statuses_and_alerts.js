function getLStatus() {
    var l_status_caller = new XMLHttpRequest();
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.transitchicago.com/api/1.0/routes.aspx?type=rail&outputType=JSON')}`;
    l_status_caller.open("GET", url, true);
    l_status_caller.onreadystatechange = function() {
        if (l_status_caller.readyState === 4 && l_status_caller.status === 200) {
            var l_status_data_p1 = JSON.parse(l_status_caller.responseText);
            var l_status_data = JSON.parse(l_status_data_p1.contents).CTARoutes.RouteInfo;
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

function getLAlertsRevised() {
    var l_alert_caller = new XMLHttpRequest();
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.transitchicago.com/api/1.0/alerts.aspx?routeid=Org,Red,Blue,Brn,G,P,Pexp,Pink,Y&outputType=JSON')}`;
    l_alert_caller.open("GET", url, true);
    l_alert_caller.onreadystatechange = function() {
        if (l_alert_caller.readyState === 4 && l_alert_caller.status === 200) {
            var all_l_alerts = JSON.parse(l_alert_caller.responseText).contents;
            var all_l_alerts_p2 = JSON.parse(all_l_alerts).CTAAlerts;
            console.log(all_l_alerts_p2);

            for (var i = 0; i < all_l_alerts_p2.Alert.length; i++) {
                var l_alert = all_l_alerts_p2.Alert[i].Headline;
                var l_alert_description = all_l_alerts_p2.Alert[i].ShortDescription;
                var l_alert_impact_color = all_l_alerts_p2.Alert[i].SeverityColor;
                var l_alert_impacted_service = all_l_alerts_p2.Alert[i].ImpactedService;
                var l_alert_impact = all_l_alerts_p2.Alert[i].Impact;
                console.log(all_l_alerts_p2.Alert[i].Headline, l_alert_impacted_service.Service.length);

                document.getElementById("l_alert_entity").innerHTML = `<span id="route_affected" class="styling_for_routes symbol_tagged"><img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;" class="filtered-inverted"></div></span> <b id="alert_impact">${l_alert}</b> <br> ${l_alert_description} <br> Impact: <span id="severity_rating"></span>`;
                document.getElementById("severity_rating").innerHTML = l_alert_impact;
                document.getElementById("severity_rating").style.color = `#${l_alert_impact_color}`;

                if (l_alert_impacted_service.Service.length === undefined) {
                    var service_type = l_alert_impacted_service.Service.ServiceType;
                    var route_text_color = l_alert_impacted_service.Service.ServiceTextColor;
                    var route_color = l_alert_impacted_service.Service.ServiceBackColor;
                    console.log(service_type, route_text_color, route_color);

                    if (service_type === "T") {
                        console.log("Nope...");
                    }
                    else {
                        document.getElementById("route_affected").style.backgroundColor = `#${route_color}40`;
                        document.getElementById("route_affected").style.border = `1px solid #${route_color}`;

                        if (route_text_color === "000000") {
                            document.getElementById("route_affected").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                        }
                    }
                }

                for (var j = 0; j < l_alert_impacted_service.Service.length; j++) {
                    var service_type = l_alert_impacted_service.Service[j].ServiceType;
                    console.log(service_type);

                    if (service_type === "T") {
                        console.log("Nope...");
                    }
                    else {
                        var route_text_color = l_alert_impacted_service.Service[j].ServiceTextColor;
                        var route_color = l_alert_impacted_service.Service[j].ServiceBackColor;
                    }

                    document.getElementById("route_affected").style.backgroundColor = `#${route_color}40`;
                    document.getElementById("route_affected").style.border = `1px solid #${route_color}`;

                    if (route_text_color === "000000") {
                        document.getElementById("route_affected").innerHTML = `<img src="img_assets/newly_updated_ltrain_icon.svg" style="width: 23px; height: 23px;">`;
                    }
                }

                var alert_cloner = document.getElementById("l_lines_alerts").cloneNode(true);
                document.getElementById("all_l_alerts").appendChild(alert_cloner);
            }

            var all_l_alerts = document.getElementById("all_l_alerts").children;
            document.getElementById("all_l_alerts").removeChild(all_l_alerts[0]);
        }
    }
    l_alert_caller.send();
}
setTimeout(getLAlertsRevised, 3000);