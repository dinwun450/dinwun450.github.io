var foundedin = "";
var onestop_id = "";
var link = "";
var pageid = "";
var moreinfo = "";

function changeHawaiiBusAgency(a) {
    var busagency = a;

    switch (busagency) {
        case "thebus":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=TheBus_(Honolulu)&origin=*";
            pageid = "764093";
            foundedin = "1971";
            onestop_id = "o-87z-thebus";
            moreinfo = "https://en.wikipedia.org/wiki/TheBus_(Honolulu)";
            break;
        case "hele_on":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Hele-On_Bus&origin=*";
            pageid = "59209358";
            foundedin = "1973";
            onestop_id = "o-hele~on~hi";
            moreinfo = "https://en.wikipedia.org/wiki/Hele-On_Bus";
            break;
        case "maui_bus":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Maui_Bus&origin=*";
            pageid = "24084212";
            foundedin = "1992";
            onestop_id = "o-maui~county~transit";
            moreinfo = "https://en.wikipedia.org/wiki/Maui_Bus";
            break;
        case "kauai_bus":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=The_Kauai_Bus&origin=*";
            pageid = "33817677";
            foundedin = "1990";
            onestop_id = "o-87yt-countyofkauai~transportationagency";
            moreinfo = "https://en.wikipedia.org/wiki/The_Kauai_Bus";
            break;
        default:
            foundedin = "";
            onestop_id = "";
            link = "";
            pageid = "";
            moreinfo = "";

            document.getElementById("desc").innerHTML = `Select a Bus Agency.`;
            document.getElementById("foundingdate").innerHTML = "<b>-</b>";
            document.getElementById("nooflines").innerHTML = "<b>-</b>";
            document.getElementById("email_agency").innerHTML = "<b>-</b> (Email)";
            document.getElementById("phone_agency").innerHTML = "<b>-</b> (Phone)";
            break;
    }

    if (a === "prompt") {
        console.log("Stop.");
    }
    else {
        getWikipediaArticle(link, pageid);
        countNoOfLines(onestop_id);
        getBusContactInfo(onestop_id);
    }
}

function getWikipediaArticle(getArticleInfo, pageId) {
    var article_caller = new XMLHttpRequest();
    article_caller.open("GET", getArticleInfo);
    article_caller.onreadystatechange = function() {
        if (article_caller.readyState === 4 && article_caller.status === 200) {
            var article = JSON.parse(article_caller.responseText);
            var summary = article.query.pages[pageId].extract;

            document.getElementById("desc").innerHTML = `${summary} <br> <a href="${moreinfo}">Wikipedia</a>`;
            document.getElementById("foundingdate").innerHTML = `<b>${foundedin}</b>`;
        }
    }
    article_caller.send();
}

function countNoOfLines(insOnestopID) {
    var route_caller = new XMLHttpRequest();
    route_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${insOnestopID}&limit=700`);
    route_caller.onreadystatechange = function() {
        if (route_caller.readyState === 4 && route_caller.status === 200) {
            var route_outputs = JSON.parse(route_caller.responseText);
            var counter = 0;

            for (var i = 0; i < route_outputs.routes.length; i++) {
                counter += 1;
            }

            document.getElementById("nooflines").innerHTML = `<b>${counter}</b>`;
        }
    }
    route_caller.send();
}

function getBusContactInfo(addOneStopID) {
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
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `<b>${phone_no}</b> (Phone)`;
                    break;
            };

            switch (email) {
                case null:
                    email = "-";
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
                default:
                    document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
                    break;
            };
        }
    }
    agency_caller.send();
}