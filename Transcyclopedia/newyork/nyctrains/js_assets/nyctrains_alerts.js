var no_route_alerts_nyctrains = 0;
var onestop_id = "";

function changeNYCTrainsAlerts(s) {
    var nyc_train_agency = s;

    switch (nyc_train_agency) {
        case "mtasir":
            onestop_id = "o-dr5r-nyct";
            break;
        case "mtallrr":
            onestop_id = "o-dr5-longislandrailroad";
            break;
        case "mtametronorth":
            onestop_id = "o-dr7-metro~northrailroad";
            break;
        case "path":
            onestop_id = "o-dr5r-path";
            break;
        case "njtransitrail":
            onestop_id = "o-dr5-nj~transit";
            break;
        default:
            onestop_id = "";
            no_route_alerts_nyctrains = 0;
            document.getElementById("nyctrains_alerts").innerHTML = `
                <div class="alert_entity_single" id="nyctrain_alert_entity">Select a Train Agency.</div>
            `;
            break;
    }

    if (s === "prompt") {
        console.log("reset!");
    }
    else if (s === "mtallrr") {
        getNYCTrainAlertsForLIRR();
    }
    else if (s === "mtametronorth") {
        getNYCTrainAlertsForMN();
    }
    else {
        getNYCTrainAlerts();
    }
}

function getNYCTrainAlerts(onestop_id) {
    no_route_alerts_nyctrains = 0;
    document.getElementById("nyctrains_alerts").innerHTML = `
        <div class="alert_entity_single" id="nyctrain_alert_entity">Loading...</div>
    `;

    var nyctrains_alert_caller = new XMLHttpRequest();
    nyctrains_alert_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&limit=700&route_type=2&include_alerts=true`);
    nyctrains_alert_caller.onreadystatechange = function() {
        if (nyctrains_alert_caller.readyState === 4 && nyctrains_alert_caller.status === 200) {
            var nyctrains_alert_receiver = JSON.parse(nyctrains_alert_caller.responseText);

            for (var i = 0; i < nyctrains_alert_receiver.routes.length; i++) {
                var alerts_for_nyctrains = nyctrains_alert_receiver.routes[i].alerts;

                switch (alerts_for_nyctrains.length) {
                    case 0:
                        no_route_alerts_nyctrains += 1;
                        break;
                    default:
                        for (var j = 0; j < alerts_for_nyctrains.length; j++) {
                            var alert_nyctrain_desc = alerts_for_nyctrains[j].description_text;
                            if (alert_nyctrain_desc.length == 0) {
                                console.log("nothing!");
                                var desc_of_alert_in_nyctrain = "";
                            }
                            else {
                                var desc_of_alert_in_nyctrain = alert_nyctrain_desc[0].text
                            }
                            var alert_nyctrain_header = alerts_for_nyctrains[j].header_text[0].text;
                            document.getElementById("nyctrain_alert_entity").innerHTML = `<b>${alert_nyctrain_header}</b> <br> ${desc_of_alert_in_nyctrain}`;

                            var alert_cloner = document.getElementById("nyctrain_alert_entity").cloneNode(true);
                            document.getElementById("nyctrains_alerts").appendChild(alert_cloner);
                        }
                        break;
                };
            };

            if (no_route_alerts_nyctrains === nyctrains_alert_receiver.routes.length) {
                document.getElementById("nyctrains_alerts").innerHTML = `
                    <div class="alert_entity_single" id="nyctrain_alert_entity">There's no alerts in this agency at this moment. Please check again.</div>
                `;
            }
            else {
                var all_alerts = document.getElementById("nyctrains_alerts").children;
                document.getElementById("nyctrains_alerts").removeChild(all_alerts[0]);
            }
        }
    }
    
    nyctrains_alert_caller.send();
}

function getNYCTrainAlertsForLIRR() {
    no_route_alerts_nyctrains = 0;
    document.getElementById("nyctrains_alerts").innerHTML = `
        <div class="alert_entity_single" id="nyctrain_alert_entity">Loading...</div>
    `;

    var mta_llrr_caller = new XMLHttpRequest();
    mta_llrr_caller.open("GET", "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Flirr-alerts.json");
    mta_llrr_caller.onreadystatechange = function() {
        if (mta_llrr_caller.readyState === 4 && mta_llrr_caller.status === 200) {
            var mta_llrr_receiver = JSON.parse(mta_llrr_caller.responseText);
            console.log(mta_llrr_receiver);

            for (var i = 0; i < mta_llrr_receiver.entity.length; i++) {
                console.log(mta_llrr_receiver.entity[i].alert.header_text.translation[0].text);
                var header_text = mta_llrr_receiver.entity[i].alert.header_text.translation[0].text;
                var description_text = mta_llrr_receiver.entity[i].alert.description_text.translation[1].text;
                document.getElementById("nyctrain_alert_entity").innerHTML = `<b>${header_text}</b> <br> ${description_text}`;

                var alert_cloner = document.getElementById("nyctrain_alert_entity").cloneNode(true);
                document.getElementById("nyctrains_alerts").appendChild(alert_cloner);
            }

            var all_alerts = document.getElementById("nyctrains_alerts").children;
            document.getElementById("nyctrains_alerts").removeChild(all_alerts[0]);
        }
    }

    mta_llrr_caller.send();
}

function getNYCTrainAlertsForMN() {
    no_route_alerts_nyctrains = 0;
    document.getElementById("nyctrains_alerts").innerHTML = `
        <div class="alert_entity_single" id="nyctrain_alert_entity">Loading...</div>
    `;

    var mta_mn_caller = new XMLHttpRequest();
    mta_mn_caller.open("GET", "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fmnr-alerts.json");
    mta_mn_caller.onreadystatechange = function() {
        if (mta_mn_caller.readyState === 4 && mta_mn_caller.status === 200) {
            var mta_mn_receiver = JSON.parse(mta_mn_caller.responseText);
            console.log(mta_mn_receiver);

            for (var i = 0; i < mta_mn_receiver.entity.length; i++) {
                console.log(mta_mn_receiver.entity[i].alert.header_text.translation[0].text);
                var header_text = mta_mn_receiver.entity[i].alert.header_text.translation[0].text;
                var description_text = mta_mn_receiver.entity[i].alert.description_text.translation[1].text;
                document.getElementById("nyctrain_alert_entity").innerHTML = `<b>${header_text}</b> <br> ${description_text}`;

                var alert_cloner = document.getElementById("nyctrain_alert_entity").cloneNode(true);
                document.getElementById("nyctrains_alerts").appendChild(alert_cloner);
            }

            var all_alerts = document.getElementById("nyctrains_alerts").children;
            document.getElementById("nyctrains_alerts").removeChild(all_alerts[0]);
        }
    }

    mta_mn_caller.send();
}