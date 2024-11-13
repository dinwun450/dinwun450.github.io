var foundedin = "";
var onestop_id = "";
var wikipedia_link_api = "";
var wikipedia_page_id = "";
var wikipedia_info = "";

function changeSeattleFerryAgency(a) {
    var seattle_ferry_agency = a;

    switch(seattle_ferry_agency) {
        case "wsf":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Washington_State_Ferries&origin=*";
            wikipedia_page_id = "364911";
            foundedin = "1951";
            onestop_id = "o-c28-washingtonstateferries";
            wikipedia_info = "https://en.wikipedia.org/wiki/Washington_State_Ferries";
            break;
        case "pierce":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Steilacoom–Anderson_Island_ferry&origin=*";
            wikipedia_page_id = "31879336";
            foundedin = "1922";
            onestop_id = "o-c22u3-piercecountyferries";
            wikipedia_info = "https://en.wikipedia.org/wiki/Steilacoom–Anderson_Island_ferry";
            break;
        case "king":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=King_County_Water_Taxi&origin=*";
            wikipedia_page_id = "6202948";
            foundedin = "1997";
            onestop_id = "o-c23-metrotransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/King_County_Water_Taxi";
            break;
        case "kitsap":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Kitsap_Fast_Ferries&origin=*";
            wikipedia_page_id = "54311781";
            foundedin = "2017";
            onestop_id = "o-c22y-kitsaptransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Kitsap_Fast_Ferries";
            break;
        case "vicclip":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Clipper_Navigation&origin=*";
            wikipedia_page_id = "13087991";
            foundedin = "1986";
            onestop_id = "o-c28-thevictoriaclipper";
            wikipedia_info = "https://en.wikipedia.org/wiki/Clipper_Navigation";
            break;
        default:
            wikipedia_link_api = "";
            wikipedia_page_id = "";
            foundedin = "";
            onestop_id = "";
            wikipedia_info = "";
            
            document.getElementById("desc").innerHTML = "Select a Ferry Agency.";
            document.getElementById("foundingdate").innerHTML = "-";
            document.getElementById("nooflines").innerHTML = "-";
            document.getElementById("email_agency").innerHTML = "-";
            document.getElementById("phone_agency").innerHTML = "-";
            break;
    }

    if (a == "prompt") {
        console.log("End.");
    }
    else {
        getWikipediaArticle(wikipedia_link_api, wikipedia_page_id);
        countNoOfLines(onestop_id);
        getContactInfo(onestop_id);
    }
}

function getWikipediaArticle(getArticleInfo, pageId) {
    var article_caller = new XMLHttpRequest();
    article_caller.open("GET", getArticleInfo);
    article_caller.onreadystatechange = function() {
        if (article_caller.readyState === 4 && article_caller.status === 200) {
            var article = JSON.parse(article_caller.responseText);
            var summary = article.query.pages[pageId].extract;

            document.getElementById("desc").innerHTML = `${summary} <br> <a href="${wikipedia_info}">Wikipedia</a>`;
            document.getElementById("foundingdate").innerHTML = `<b>${foundedin}</b>`;
        }
    }
    article_caller.send();
}

function countNoOfLines(insOnestopID) {
    var route_caller = new XMLHttpRequest();
    route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOnestopID}&limit=700&route_type=4`);
    route_caller.onreadystatechange = function() {
        if (route_caller.readyState === 4 && route_caller.status === 200) {
            var route_outputs = JSON.parse(route_caller.responseText);
            var counter = 0;

            for (var i = 0; i < route_outputs.routes.length; i++) {
                counter += 1;
            }

            document.getElementById("nooflines").innerHTML = `${counter}`;
        }
    }
    route_caller.send();
}

function getContactInfo(addOneStopID) {
    var agency_caller = new XMLHttpRequest();
    agency_caller.open("GET", `https://transit.land/api/v2/rest/agencies?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&onestop_id=${addOneStopID}`);
    agency_caller.onreadystatechange = function() {
        if (agency_caller.readyState === 4 && agency_caller.status === 200) {
            var agency_receiver = JSON.parse(agency_caller.responseText);
            var phone_no = agency_receiver.agencies[0].agency_phone;
            var email = agency_receiver.agencies[0].agency_email;

            switch (phone_no) {
                case null:
                    phone_no = "-";
                    document.getElementById("phone_agency").innerHTML = `${phone_no}`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `${phone_no}`;
                    break;
            };

            switch (email) {
                case null:
                    email = "-";
                    document.getElementById("email_agency").innerHTML = `${email}`;
                    break;
                default:
                    document.getElementById("email_agency").innerHTML = `${email}`;
                    break;
            };
        }
    }
    agency_caller.send();
}