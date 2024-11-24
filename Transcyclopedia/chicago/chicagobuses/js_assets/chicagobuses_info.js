var founded_in = "";
var onestop_id = "";
var wikipedia_link_api = "";
var wikipedia_page_id = "";
var wikipedia_info = "";

function changeChicagoBusAgency(a) {
    var chicago_bus_agency = a;

    switch (chicago_bus_agency) {
        case "cta":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Chicago_Transit_Authority&origin=*";
            wikipedia_page_id = "416981";
            founded_in = "October 1, 1947";
            onestop_id = "o-dp3-chicagotransitauthority";
            wikipedia_info = "https://en.wikipedia.org/wiki/Chicago_Transit_Authority";
            break;
        case "pace":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Pace_(transit)&origin=*";
            wikipedia_page_id = "1160038";
            founded_in = "1983";
            onestop_id = "o-dp3-pace";
            wikipedia_info = "https://en.wikipedia.org/wiki/Pace_(transit)";
            break;
        default:
            wikipedia_link_api = "";
            wikipedia_page_id = "";
            founded_in = "";
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