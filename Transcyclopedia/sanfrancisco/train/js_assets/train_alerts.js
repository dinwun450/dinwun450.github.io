var agency_onestop_id = "";

function changeAgencyInAlerts(d) {
    var agency = d;

    switch(agency) {
        case "ace":
            agency_onestop_id = "o-9q9-acealtamontcorridorexpress";
            break;
        case "caltrain":
            agency_onestop_id = "o-9q9-caltrain";
            break;
        case "capitol_corridor":
            agency_onestop_id = "o-9qc-capitolcorridor";
            break;
        case "smart":
            agency_onestop_id = "o-9qb-sonomamarinarearailtransit";
            break;
        default:
            agency_onestop_id = "";
            break;
    }

    if (agency === "prompt") {
        document.querySelector(".alert_entity").innerHTML = `
        <p id="alert_desc">Select a train agency on the top.</p>
        `;
    }
    else {
        compileAlerts(agency_onestop_id);
    }
}

function compileAlerts(oneStopAgency) {
    document.querySelector(".alert_entity").innerHTML = `
        <p id="alert_desc">Loading...</p>
    `;

    var alert_call = new XMLHttpRequest();
    alert_call.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${oneStopAgency}&include_alerts=true`);
    alert_call.onreadystatechange = function() {
        if (alert_call.readyState === 4 && alert_call.status === 200) {
            var alert_outputs = JSON.parse(alert_call.responseText)
            var alert_base = alert_outputs.agencies[0].alerts;
            
            if (alert_base.length === 0) {
                document.getElementById("alert_desc").innerHTML = `There are no alerts for ${alert_outputs.agencies[0].agency_name}`;
            }
            else {
                for (var i=0; i<alert_base.length; i++) {
                    var header_text = alert_base[i].header_text[0].text;
                    var desc_text = alert_base[i].description_text[0].text;

                    document.getElementById("alert_desc").innerHTML = `<b>${header_text}</b><br>${desc_text}`;
                    var alertNode = document.getElementById("alert_desc");
                    var cloneAlert = alertNode.cloneNode(true);
                    document.querySelector(".alert_entity").appendChild(cloneAlert);
                }
            }

            var all_alerts = document.querySelector(".alert_entity").children;
            document.querySelector(".alert_entity").removeChild(all_alerts[0]);
        }
    }
    alert_call.send();
}