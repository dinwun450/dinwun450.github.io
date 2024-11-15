var foundedin = "";
var onestop_id = "";
var link = "";
var page_id = "";
var moreinfo = "";

function changeAgency(a) {
    var agency = a;

    switch (agency) {
        case "actransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=AC_Transit&origin=*";
            page_id = "575044";
            foundedin = "1960";
            onestop_id = "o-9q9-actransit";
            moreinfo = "https://en.wikipedia.org/wiki/AC_Transit";
            break;
        case "berkeleyshuttles":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Bear_Transit&origin=*";
            page_id = "8655097";
            foundedin = "1964";
            onestop_id = "o-9q9p3-beartransit";
            moreinfo = "https://en.wikipedia.org/wiki/Bear_Transit";
            break;
        case "commutedotorg":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Commute.org&origin=*";
            page_id = "38325221";
            foundedin = "2000";
            onestop_id = "o-9q9j-commuteorgshuttles";
            moreinfo = "https://en.wikipedia.org/wiki/Commute.org"
            break;
        case "countyconnection":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=County_Connection&origin=*";
            page_id = "819165";
            foundedin = "1980";
            onestop_id = "o-9q9p-countyconnection";
            moreinfo = "https://en.wikipedia.org/wiki/County_Connection"
            break;
        case "dumbartonexpress":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Dumbarton_Express&origin=*";
            page_id = "2588193";
            foundedin = "1984";
            onestop_id = "o-9q9j-dumbartonexpress";
            moreinfo = "https://en.wikipedia.org/wiki/Dumbarton_Express"
            break;
        case "emeryvilleshuttles":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Emery_Go-Round&origin=*";
            page_id = "790412";
            foundedin = "1996";
            onestop_id = "o-9q9p3-emerygo~round";
            moreinfo = "https://en.wikipedia.org/wiki/Emery_Go-Round";
            break;
        case "fast":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Fairfield_and_Suisun_Transit&origin=*";
            page_id = "11656122";
            foundedin = "1980";
            onestop_id = "o-9qc-fairfieldandsuisuntransit";
            moreinfo = "https://en.wikipedia.org/wiki/Fairfield_and_Suisun_Transit"
            break;
        case "ggt":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Golden_Gate_Transit&origin=*";
            page_id = "1524075";
            foundedin = "1972";
            onestop_id = "o-9qb-goldengatetransit";
            moreinfo = "https://en.wikipedia.org/wiki/Golden_Gate_Transit"
            break;
        case "marintransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Marin_Transit&origin=*";
            page_id = "12000758";
            foundedin = "1964";
            onestop_id = "o-9qbb-marintransit";
            moreinfo = "https://en.wikipedia.org/wiki/Marin_Transit"
            break;
        case "missionbaytma":
            var text = "See";
            foundedin = "Around 2017";
            onestop_id = "o-9q8yy-missionbaytma";
            moreinfo = "https://www.missionbaytma.org/about/";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">Mission Bay TMA About Page</a>.`;
            document.getElementById("foundingdate").innerHTML = `<b>${foundedin}</b>`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "petalumatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Petaluma_Transit&origin=*";
            page_id = "9571149";
            foundedin = "2016";
            onestop_id = "o-9qbc9-petalumatransit";
            moreinfo = "https://en.wikipedia.org/wiki/Petaluma_Transit"
            break;
        case "sanmateotransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=SamTrans&origin=*";
            page_id = "1252336";
            foundedin = "July 1st, 1976";
            onestop_id = "o-9q8-samtrans";
            moreinfo = "https://en.wikipedia.org/wiki/SamTrans"
            break;
        case "santarosacitybus":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Santa_Rosa_City_Bus&origin=*";
            page_id = "11983969";
            foundedin = "2017";
            onestop_id = "o-9qbdx-santarosacitybus";
            moreinfo = "https://en.wikipedia.org/wiki/Santa_Rosa_CityBus"
            break;
        case "solanotransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=SolTrans&origin=*";
            page_id = "32628506";
            foundedin = "November 16th, 2010";
            onestop_id = "o-9qc0-soltrans";
            moreinfo = "https://en.wikipedia.org/wiki/SolTrans"
            break;
        case "sonomacountytransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Sonoma_County_Transit&origin=*";
            page_id = "8527173";
            foundedin = "1980";
            onestop_id = "o-9qb-sonomacountytransit";
            moreinfo = "https://en.wikipedia.org/wiki/Sonoma_County_Transit"
            break;
        case "stanfordshuttles":
            var text = "See";
            foundedin = "1976";
            onestop_id = "o-9q9h-stanford~marguerite";

            document.getElementById("desc").innerHTML = `${text} <a href="https://en.wikipedia.org/wiki/Stanford_University_student_housing#Shuttle_service">Stanford University Student Housing Article</a>.`;
            document.getElementById("foundingdate").innerHTML = `<b>${foundedin}</b>`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "trideltatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Tri_Delta_Transit&origin=*";
            page_id = "3258352";
            foundedin = "1977";
            onestop_id = "o-9qc2-trideltatransit";
            moreinfo = "https://en.wikipedia.org/wiki/Tri_Delta_Transit"
            break;
        case "uctransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Union_City_Transit&origin=*";
            page_id = "819042";
            foundedin = "1974";
            onestop_id = "o-9q9jy-unioncitytransit";
            moreinfo = "https://en.wikipedia.org/wiki/Union_City_Transit";
            break;
        case "vacavillecitycoach":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Vacaville_City_Coach&origin=*";
            page_id = "11984183";
            foundedin = "1981";
            onestop_id = "o-9qc60-vacavillecitycoach";
            moreinfo = "https://en.wikipedia.org/wiki/Vacaville_City_Coach";
            break;
        case "napatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Vine_Transit&origin=*";
            page_id = "11922129";
            foundedin = "1998";
            onestop_id = "o-9qc-vinenapacounty";
            moreinfo = "https://en.wikipedia.org/wiki/Vine_Transit"
            break;
        case "westcat":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=WestCAT&origin=*";
            page_id = "790389";
            foundedin = "1977";
            onestop_id = "o-9qc-westcatwesterncontracosta";
            moreinfo = "https://en.wikipedia.org/wiki/WestCAT"
            break;
        case "trivalleywheels":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Wheels_(California)&origin=*";
            page_id = "987554";
            foundedin = "May 1985";
            onestop_id = "o-9q9q-wheelsbus";
            moreinfo = "https://en.wikipedia.org/wiki/Wheels_(California)"
            break;
        default:
            foundedin = "";
            onestop_id = "";
            link = "";
            page_id = "";
            moreinfo = "";

            document.getElementById("desc").innerHTML = `Select a Bus Agency.`;
            document.getElementById("foundingdate").innerHTML = "<b>-</b>";
            document.getElementById("nooflines").innerHTML = "<b>-</b>";
            document.getElementById("email_agency").innerHTML = "<b>-</b> (Email)";
            document.getElementById("phone_agency").innerHTML = "<b>-</b> (Phone)";
            break;
    }

    if (a === "stanfordshuttles" || a === "missionbaytma") {
        console.log("Stop.")
    }
    else if (a === "prompt") {
        console.log("End.")
    }
    else {
        getWikipediaArticle(link, page_id);
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