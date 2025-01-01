var onestop_id = "";

function changeNYCFerryAlerts(a) {
    var nyc_ferry_agency = a;

    switch(nyc_ferry_agency) {
        case "nycferry":
            onestop_id = "o-dr5r-nycferry";
            break;
        case "statenislandferry":
            onestop_id = "o-dr5r7-nycdot";
            break;
        case "nywaterway":
            onestop_id = "o-dr7-nywaterway";
            break;
        default:
            onestop_id = "";
            document.getElementById("nycferry_lines_alerts").innerHTML = `
                <p id="nycferry_alert_entity">Select a NYC ferry agency on the top.</p>
            `;
            break;
    }

    if (nyc_ferry_agency === "prompt") {
        console.log("Pass it.");
    }
    else {
        getNYCFerryAlerts(onestop_id);
    }
}

function getNYCFerryAlerts(onestop_id) {
    var nyc_ferry_alerts_caller = new XMLHttpRequest();
    nyc_ferry_alerts_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${onestop_id}&include_alerts=true`);
    nyc_ferry_alerts_caller.onreadystatechange = function() {
        if (nyc_ferry_alerts_caller.readyState === 4 && nyc_ferry_alerts_caller.status === 200) {
            var nyc_ferry_alerts_receiver = JSON.parse(nyc_ferry_alerts_caller.responseText);

            if (nyc_ferry_alerts_receiver.agencies[0].alerts.length === 0) {
                document.getElementById("nycferry_alert_entity").innerHTML = "<p>There's no alerts in this ferry agency at this moment. Please check again.</p>";
            }
            else {
                for (var i = 0; i < nyc_ferry_alerts_receiver.agencies[0].alerts.length; i++) {
                    var alert_agency_desc = nyc_ferry_alerts_receiver.agencies[0].alerts[i].description_text[0].text;
                    var alert_agency_header = nyc_ferry_alerts_receiver.agencies[0].alerts[i].header_text[0].text;
                    document.getElementById("nycferry_alert_entity").innerHTML = `<b>${alert_agency_header}</b> <br> ${alert_agency_desc}`;
                };
            }
        }
    }

    nyc_ferry_alerts_caller.send();
}