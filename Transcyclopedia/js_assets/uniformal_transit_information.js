function getWikipediaForAnAgency(agency_name) {
    var wikipedia_agency_caller = new XMLHttpRequest();
    wikipedia_agency_caller.open("GET", `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${agency_name}&origin=*`);
    wikipedia_agency_caller.onreadystatechange = function() {
        if (wikipedia_agency_caller.readyState === 4 && wikipedia_agency_caller.status === 200) {
            var wikipedia_agency_receiver = JSON.parse(wikipedia_agency_caller.responseText);
            var wikipedia_agency_info = wikipedia_agency_receiver.query.pages[Object.keys(wikipedia_agency_receiver.query.pages)[0]].extract;
            document.getElementById("desc").innerHTML = `${wikipedia_agency_info} <br> <a href="https://en.wikipedia.org/wiki/${agency_name}">Wikipedia</a>`;
        };
    };
    wikipedia_agency_caller.send();
}

function getContactsForAnAgency(agency_onestop_id) {
    var contact_agency_caller = new XMLHttpRequest();
    contact_agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${agency_onestop_id}&include_alerts=true`);
    contact_agency_caller.onreadystatechange = function() {
        if (contact_agency_caller.readyState === 4 && contact_agency_caller.status === 200) {
            var contact_agency_receiver = JSON.parse(contact_agency_caller.responseText);
            var contact_agency_email = contact_agency_receiver.agencies[0].agency_email;
            var contact_agency_phone = contact_agency_receiver.agencies[0].agency_phone;

            if (contact_agency_email == "") {
                contact_agency_email = "-";
            }

            if (contact_agency_phone == "") {
                contact_agency_phone = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${contact_agency_email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${contact_agency_phone}</b> (Phone)`;
        };
    };
    contact_agency_caller.send();
}