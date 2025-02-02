var foundedin = "";
var onestop_id = "";
var wikipedia_link_api = "";
var wikipedia_page_id = "";
var wikipedia_info = "";

function changeNYCTrainsInfo(a) {
    var nyc_train_agency = a;

    switch(nyc_train_agency) {
        case "mtasir":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Staten_Island_Railway&origin=*"
            wikipedia_page_id = "317138";
            foundedin = "February 1, 1860";
            onestop_id = "o-dr5r-nyct";
            wikipedia_info = "https://en.wikipedia.org/wiki/Staten_Island_Railway";
            break;
        case "mtallrr":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Long_Island_Rail_Road&origin=*"
            wikipedia_page_id = "37139";
            foundedin = "April 24, 1834";
            onestop_id = "o-dr5-longislandrailroad";
            wikipedia_info = "https://en.wikipedia.org/wiki/Long_Island_Rail_Road";
            break;
        case "mtametronorth":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Metro-North_Railroad&origin=*"
            wikipedia_page_id = "301410";
            foundedin = "January 1, 1983";
            onestop_id = "o-dr7-metro~northrailroad";
            wikipedia_info = "https://en.wikipedia.org/wiki/Metro-North_Railroad";
            break;
        case "path":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=PATH_(rail_system)&origin=*"
            wikipedia_page_id = "301401";
            foundedin = "September 1, 1962";
            onestop_id = "o-dr5r-path";
            wikipedia_info = "https://en.wikipedia.org/wiki/PATH_(rail_system)";
            break;
        case "njtransitrail":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=NJ_Transit_Rail_Operations&origin=*"
            wikipedia_page_id = "1018276";
            foundedin = "1983";
            onestop_id = "o-dr5-nj~transit";
            wikipedia_info = "https://en.wikipedia.org/wiki/NJ_Transit_Rail_Operations";
            break;
        default:
            wikipedia_link_api = "";
            wikipedia_page_id = "";
            foundedin = "";
            onestop_id = "";
            wikipedia_info = "";
            
            document.getElementById("desc").innerHTML = "Select a Train Agency.";
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
    route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOnestopID}&limit=700&route_type=2`);
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