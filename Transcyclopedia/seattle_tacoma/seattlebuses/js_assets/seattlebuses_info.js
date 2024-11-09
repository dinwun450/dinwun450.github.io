var foundedin = "";
var onestop_id = "";
var wikipedia_link_api = "";
var wikipedia_page_id = "";
var wikipedia_info = "";

function changeSeattleBusesAgency(a) {
    var seattle_bus_agency = a;

    switch (seattle_bus_agency) {
        case "king_county_metro":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=King_County_Metro&origin=*";
            wikipedia_page_id = "1006344";
            foundedin = "January 1, 1973";
            onestop_id = "o-c23-metrotransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/King_County_Metro";
            break;
        case "pierce_transit":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Pierce_Transit&origin=*";
            wikipedia_page_id = "23447279";
            foundedin = "1979";
            onestop_id = "o-c22u-piercetransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Pierce_Transit";
            break;
        case "kitsap_transit":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Kitsap_Transit&origin=*";
            wikipedia_page_id = "2663256";
            foundedin = "1978";
            onestop_id = "o-c22y-kitsaptransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Kitsap_Transit";
            break;
        case "community_transit":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Community_Transit&origin=*";
            wikipedia_page_id = "848835";
            foundedin = "October 4, 1976";
            onestop_id = "o-c29-communitytransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Community_Transit";
            break;
        case "everett_transit":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Everett_Transit&origin=*";
            wikipedia_page_id = "864719";
            foundedin = "1893";
            onestop_id = "o-c290-everetttransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Everett_Transit";
            break;
        case "solid_ground":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Solid_Ground_(Seattle)&origin=*";
            wikipedia_page_id = "11761630";
            foundedin = "1974";
            onestop_id = "o-c23nb-solidground";
            wikipedia_info = "https://en.wikipedia.org/wiki/Solid_Ground_(Seattle)";
            break;
        default:
            wikipedia_link_api = "";
            wikipedia_page_id = "";
            foundedin = "";
            onestop_id = "";
            wikipedia_info = "";
            
            document.getElementById("desc").innerHTML = "Select a Bus Agency.";
            document.getElementById("foundingdate").innerHTML = "-";
            document.getElementById("nooflines").innerHTML = "-";
            document.getElementById("email_agency").innerHTML = "-";
            document.getElementById("phone_agency").innerHTML = "-";
            break;
    }

    if (a === "prompt") {
        console.log("End it...");
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
    route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOnestopID}&limit=700&route_type=3`);
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