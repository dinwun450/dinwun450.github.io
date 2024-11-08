var onestop_id = "";

function changeSeattleFerryAlerts(a) {
    var seattle_ferry_agency = a;

    switch(seattle_ferry_agency) {
        case "wsf":
            onestop_id = "o-c28-washingtonstateferries";
            break;
        case "pierce":
            onestop_id = "o-c22u3-piercecountyferries";
            break;
        case "king":
            onestop_id = "o-c23-metrotransit";
            break;
        case "kitsap":
            onestop_id = "o-c22y-kitsaptransit";
            break;
        case "vicclip":
            onestop_id = "o-c28-thevictoriaclipper";
            break;
        default:
            onestop_id = "";
            document.getElementById("ferry_lines_alerts").innerHTML = `
                <p id="ferry_alert_entity">Select a ferry agency on the top.</p>
            `;
            break;
    }

    if (seattle_ferry_agency === "prompt") {
        console.log("Pass it.");
    }
    else {
        getSeattleFerryAlerts(onestop_id);
    }
}

function getSeattleFerryAlerts(onestop_id) {
    var seattle_ferry_alerts_caller = new XMLHttpRequest();
    seattle_ferry_alerts_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    seattle_ferry_alerts_caller.onreadystatechange = function() {
        if (seattle_ferry_alerts_caller.readyState === 4 && seattle_ferry_alerts_caller.status === 200) {
            var seattle_ferry_alerts_receiver = JSON.parse(seattle_ferry_alerts_caller.responseText);

            if (seattle_ferry_alerts_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("ferry_alert_entity").innerHTML = "<p>There's no alerts in this ferry agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < seattle_ferry_alerts_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = seattle_ferry_alerts_receiver.agencies[0].alerts[i].description_text[0].text;
                    var alert_agency_header = seattle_ferry_alerts_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("ferry_alert_entity").innerHTML = `<b>${alert_agency_header}</b> <br> ${alert_agency_desc}`;
                };
            }
        }
    }

    seattle_ferry_alerts_caller.send();
}