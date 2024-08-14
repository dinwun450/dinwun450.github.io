function loadMTSWikipedia() {
    var mts_info_caller = new XMLHttpRequest();
    mts_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=San_Diego_Metropolitan_Transit_System&format=json&origin=*");
    mts_info_caller.onreadystatechange = function() {
        if (mts_info_caller.readyState === 4 && mts_info_caller.status === 200) {
            var mts_info_receiver = JSON.parse(mts_info_caller.responseText);
            var info_extracted = mts_info_receiver.query.pages[7670893].extract;
            document.getElementById("desc").innerHTML = `${info_extracted} <br> <a href="https://en.wikipedia.org/wiki/San_Diego_Metropolitan_Transit_System">Wikipedia</a>`;
        }
    }
    mts_info_caller.send();
}
loadMTSWikipedia();

function getMTSContacts() {
    var mts_contacts_caller = new XMLHttpRequest();
    mts_contacts_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-mts");
    mts_contacts_caller.onreadystatechange = function() {
        if (mts_contacts_caller.readyState === 4 && mts_contacts_caller.status === 200) {
            var mts_contacts_receiver = JSON.parse(mts_contacts_caller.responseText);
            var phone_no = mts_contacts_receiver.agencies[0].agency_phone;
            var email = mts_contacts_receiver.agencies[0].agency_email;

            if (email === "") {
                email = "-";
            }
            if (phone_no === "") {
                phone_no = "-";
            }

            document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
        }
    }
    mts_contacts_caller.send();
}
getMTSContacts();