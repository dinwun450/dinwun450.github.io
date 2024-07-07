function loadNCTDWikipedia() {
    var nctd_info_caller = new XMLHttpRequest();
    nctd_info_caller.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=North_County_Transit_District&format=json&origin=*");
    nctd_info_caller.onreadystatechange = function() {
        if (nctd_info_caller.readyState === 4 && nctd_info_caller.status === 200) {
            var nctd_info_receiver = JSON.parse(nctd_info_caller.responseText);
            var info_of_nctd = nctd_info_receiver.query.pages[5134242].extract;
            document.getElementById("desc").innerHTML = `${info_of_nctd} <br> <a href="https://en.wikipedia.org/wiki/North_County_Transit_District">Wikipedia</a>`
        }
    }
    nctd_info_caller.send();
}
loadNCTDWikipedia();

function getNCTDContactInfo() {
    var nctd_contact_caller = new XMLHttpRequest();
    nctd_contact_caller.open("GET", "https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=o-9mu-northcountytransitdistrict&include_alerts=true")
    nctd_contact_caller.onreadystatechange = function() {
        if (nctd_contact_caller.readyState === 4 && nctd_contact_caller.status === 200) {
            var nctd_contact_receiver = JSON.parse(nctd_contact_caller.responseText);
            var phone_no = nctd_contact_receiver.agencies[0].agency_phone;
            var email = nctd_contact_receiver.agencies[0].agency_email;

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
    nctd_contact_caller.send();
}
getNCTDContactInfo();