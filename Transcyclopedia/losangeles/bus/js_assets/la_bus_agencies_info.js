var foundedin = "";
var onestop_id = "";
var wikipedia_link_api = "";
var wikipedia_page_id = "";
var wikipedia_info = "";

function changeLABusAgency(a) {
    var la_bus_agency = a;

    switch (la_bus_agency) {
        case "avta":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Antelope_Valley_Transit_Authority&origin=*";
            wikipedia_page_id = "9207307";
            foundedin = "1992";
            onestop_id = "o-antelope~valley~transit~authority";
            wikipedia_info = "https://en.wikipedia.org/wiki/Antelope_Valley_Transit_Authority";
            break;
        case "baldinpark":
            var text = "See";
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Baldwin_Park_Transit";
            foundedin = "Around 1994";
            onestop_id = "o-9qh1g-baldwinparktransit";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, Baldin Park Transit Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "beachcities":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Beach_Cities_Transit&origin=*";
            wikipedia_page_id = "25097884";
            foundedin = "2005";
            onestop_id = "o-9q5b-beachcitiestransit~cityofredondobeach";
            wikipedia_info = "https://en.wikipedia.org/wiki/Beach_Cities_Transit";
            break;
        case "burbankbus":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Burbank_Bus&origin=*";
            wikipedia_page_id = "24229127";
            foundedin = "2011";
            onestop_id = "o-9q5f7-burbankbus";
            wikipedia_info = "https://en.wikipedia.org/wiki/Burbank_Bus";
            break;
        case "carsoncirc":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Carson_Circuit&origin=*";
            wikipedia_page_id = "26030227";
            foundedin = "1984";
            onestop_id = "o-9q5b-carsoncircuit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Carson_Circuit_Transit_System";
            break;
        case "compton": 
            var text = "See";
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Compton_Renaissance_Transit";
            foundedin = "1970s-1990s";
            onestop_id = "o-9q5bv-comptonrenaissancetransit";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, Compton Renaissance Transit Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "culver":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Culver_CityBus&origin=*";
            wikipedia_page_id = "7212915";
            foundedin = "March 3rd, 1928";
            onestop_id = "o-9q5c-culvercitybus";
            wikipedia_info = "https://en.wikipedia.org/wiki/Culver_CityBus";
            break;
        case "foothill":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Foothill_Transit&origin=*";
            wikipedia_page_id = "491101";
            foundedin = "1988";
            onestop_id = "o-9qh1-foothilltransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Foothill_Transit";
            break;
        case "gtrans":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=GTrans&origin=*";
            wikipedia_page_id = "24232911";
            foundedin = "January 15, 1940";
            onestop_id = "o-9q5b-gtrans";
            wikipedia_info = "https://en.wikipedia.org/wiki/GTrans";
            break;
        case "glendale":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Glendale_Beeline&origin=*";
            wikipedia_page_id = "24232993";
            foundedin = "1984";
            onestop_id = "o-9q5f-glendalebeeline";
            wikipedia_info = "https://en.wikipedia.org/wiki/Glendale_Beeline";
            break;
        case "glendora":
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Glendora_Transportation_Division";
            foundedin = "Around 1911";
            onestop_id = "o-9qh4j-glendoratransportationdivision";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, Glendora Transportation Division Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "huntington":
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Huntington_Park_Express";
            foundedin = "Around 1970s";
            onestop_id = "o-9q5cm-huntingtonparkexpress";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, Huntington Park Express Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "lagobus":
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Los_Angeles_County_Public_Works";
            foundedin = "Around 1985";
            onestop_id = "o-9q5-lagobus";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, LA Go Bus Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "ladot":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Los_Angeles_Department_of_Transportation&origin=*";
            wikipedia_page_id = "2402342";
            foundedin = "February 25th, 1979";
            onestop_id = "o-9q5-ladot";
            wikipedia_info = "https://en.wikipedia.org/wiki/Los_Angeles_Department_of_Transportation";
            break;
        case "lawndale":
            wikipedia_info = "https://en.wikipedia.org/wiki/List_of_Southern_California_transit_agencies#Lawndale_Beat";
            foundedin = "Around 1959";
            onestop_id = "o-9q5bf-lawndalebeat";

            document.getElementById("desc").innerHTML = `${text} <a href="${moreinfo}">SoCal Transit Agencies Wikipedia Page, Lawndale Beat Section</a>.`;
            document.getElementById("foundingdate").innerHTML = `${foundedin}`;
            countNoOfLines(onestop_id);
            getBusContactInfo(onestop_id);
            break;
        case "laxflyaway":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=FlyAway_(bus)&origin=*";
            wikipedia_page_id = "5764095";
            foundedin = "1975";
            onestop_id = "o-9q5c-laxflyaway";
            wikipedia_info = "https://en.wikipedia.org/wiki/FlyAway_(bus)";
            break;
        case "longbeach":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Long_Beach_Transit&origin=*";
            wikipedia_page_id = "7138225";
            foundedin = "March 31st, 1963";
            onestop_id = "o-9q5b-longbeachtransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Long_Beach_Transit";
            break;
        case "montebello":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Montebello_Bus_Lines&origin=*";
            wikipedia_page_id = "2456392";
            foundedin = "July 28th, 1931";
            onestop_id = "o-9qh1-montebellobuslines";
            wikipedia_info = "https://en.wikipedia.org/wiki/Montebello_Bus_Lines";
            break;
        case "montereypark":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Monterey_Park_Spirit_Bus&origin=*";
            wikipedia_page_id = "24233170";
            foundedin = "1991";
            onestop_id = "o-9q5cx-spiritbus";
            wikipedia_info = "https://en.wikipedia.org/wiki/Monterey_Park_Spirit_Bus";
            break;
        case "norwalk":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Norwalk_Transit_(California)&origin=*";
            wikipedia_page_id = "9170904";
            foundedin = "1974";
            onestop_id = "o-9qh1-norwalktransitsystem";
            wikipedia_info = "https://en.wikipedia.org/wiki/Norwalk_Transit_(California)";
            break;
        case "palosverdes":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Palos_Verdes_Peninsula_Transit_Authority&origin=*";
            wikipedia_page_id = "25101971";
            foundedin = "1991";
            onestop_id = "o-9q5b4-palosverdespeninsulatransitauthority";
            wikipedia_info = "https://en.wikipedia.org/wiki/Palos_Verdes_Peninsula_Transit_Authority";
            break;
        case "pasadena":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Pasadena_Transit&origin=*";
            wikipedia_page_id = "19079967";
            foundedin = "1994";
            onestop_id = "o-9q5f-pasadenatransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Pasadena_Transit";
            break;
        case "santaclarita":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=City_of_Santa_Clarita_Transit&origin=*";
            wikipedia_page_id = "6692181";
            foundedin = "August 5th, 1991";
            onestop_id = "o-santa~clarita";
            wikipedia_info = "https://en.wikipedia.org/wiki/City_of_Santa_Clarita_Transit";
            break;
        case "bigbluebus":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Big_Blue_Bus&origin=*";
            wikipedia_page_id = "2003936";
            foundedin = "1928";
            onestop_id = "o-9q5c-bigbluebus";
            wikipedia_info = "https://en.wikipedia.org/wiki/Big_Blue_Bus";
            break;
        case "torrance":
            wikipedia_link_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Torrance_Transit&origin=*";
            wikipedia_page_id = "10007452";
            foundedin = "1940";
            onestop_id = "o-9q5b-torrancetransit";
            wikipedia_info = "https://en.wikipedia.org/wiki/Torrance_Transit";
            break;
        default:
            foundedin = "";
            onestop_id = "";
            wikipedia_link_api = "";
            wikipedia_page_id = "";
            wikipedia_info = "";

            document.getElementById("desc").innerHTML = `Select a Bus Agency.`;
            document.getElementById("foundingdate").innerHTML = "-";
            document.getElementById("nooflines").innerHTML = "-";
            document.getElementById("email_agency").innerHTML = "-";
            document.getElementById("phone_agency").innerHTML = "-";
            break;
    }

    if (a === "baldinpark" || a === "compton" || a === "glendora" || a === "huntington" || a === "lagobus" || a === "lawndale") {
        console.log("Stop.");
    }
    else if (a === "prompt") {
        console.log("End.");
    }
    else {
        getWikipediaArticle(wikipedia_link_api, wikipedia_page_id);
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

            document.getElementById("desc").innerHTML = `${summary} <br> <a href="${wikipedia_info}">Wikipedia</a>`;
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

            document.getElementById("nooflines").innerHTML = `${counter}`;
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
                case "":
                    phone_no = "-";
                    document.getElementById("phone_agency").innerHTML = `${phone_no}`;
                    break;
                default:
                    document.getElementById("phone_agency").innerHTML = `${phone_no}`;
                    break;
            };

            switch (email) {
                case "":
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