var foundedin = "";
var nooflines = "";
var email = "";
var phoneno = "";
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
            nooflines = "131";
            phoneno = "510-891-4777";
            moreinfo = "https://en.wikipedia.org/wiki/AC_Transit"
            break;
        case "berkeleyshuttles":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Bear_Transit&origin=*";
            page_id = "8655097";
            foundedin = "1964";
            nooflines = "5 day, 5 night";
            phoneno = "510-643-5708";
            email = "beartransit_feedback@berkeley.edu"
            moreinfo = "https://en.wikipedia.org/wiki/Bear_Transit"
            break;
        case "commutedotorg":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Commute.org&origin=*";
            page_id = "38325221";
            foundedin = "2000";
            nooflines = "20";
            phoneno = "650-588-1600";
            email = "shuttles@commute.org";
            moreinfo = "https://en.wikipedia.org/wiki/Commute.org"
            break;
        case "countyconnection":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=County_Connection&origin=*";
            page_id = "819165";
            foundedin = "1980";
            nooflines = "62";
            phoneno = "925-676-7500";
            email = "help@countyconnection.com";
            moreinfo = "https://en.wikipedia.org/wiki/County_Connection"
            break;
        case "dumbartonexpress":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Dumbarton_Express&origin=*";
            page_id = "2588193";
            foundedin = "1984";
            nooflines = "2";
            phoneno = "510-891-4777";
            moreinfo = "https://en.wikipedia.org/wiki/Dumbarton_Express"
            break;
        case "fast":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Fairfield_and_Suisun_Transit&origin=*";
            page_id = "11656122";
            foundedin = "1980";
            nooflines = "8";
            phoneno = "707-422-2877";
            moreinfo = "https://en.wikipedia.org/wiki/Fairfield_and_Suisun_Transit"
            break;
        case "ggt":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Golden_Gate_Transit&origin=*";
            page_id = "1524075";
            foundedin = "1972";
            nooflines = "8";
            phoneno = "511/415-455-2000 [Outside the Bay]";
            email = "contact@goldengate.org";
            moreinfo = "https://en.wikipedia.org/wiki/Golden_Gate_Transit"
            break;
        case "marintransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Marin_Transit&origin=*";
            page_id = "12000758";
            foundedin = "1964";
            nooflines = "30";
            phoneno = "415-455-2000";
            email = "info@marintransit.org"
            moreinfo = "https://en.wikipedia.org/wiki/Marin_Transit"
            break;
        case "petalumatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Petaluma_Transit&origin=*";
            page_id = "9571149";
            foundedin = "2016";
            nooflines = "6";
            phoneno = "707-778-4460";
            email = "transit@cityofpetaluma.org";
            moreinfo = "https://en.wikipedia.org/wiki/Petaluma_Transit"
            break;
        case "sanmateotransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=SamTrans&origin=*";
            page_id = "1252336";
            foundedin = "July 1st, 1976";
            nooflines = "66";
            phoneno = "800-660-4287";
            moreinfo = "https://en.wikipedia.org/wiki/SamTrans"
            break;
        case "santarosacitybus":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Santa_Rosa_City_Bus&origin=*";
            page_id = "11983969";
            foundedin = "2017";
            nooflines = "18";
            phoneno = "707-543-3333";
            email = "support@availtec.com";
            moreinfo = "https://en.wikipedia.org/wiki/Santa_Rosa_CityBus"
            break;
        case "solanotransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=SolTrans&origin=*";
            page_id = "32628506";
            foundedin = "November 16th, 2010";
            nooflines = "16";
            phoneno = "707-648-4666"
            moreinfo = "https://en.wikipedia.org/wiki/SolTrans"
            break;
        case "sonomacountytransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Sonoma_County_Transit&origin=*";
            page_id = "8527173";
            foundedin = "1980";
            nooflines = "23";
            phoneno = "707-576-7433 or 800-345-4733"
            moreinfo = "https://en.wikipedia.org/wiki/Sonoma_County_Transit"
            break;
        case "stanfordshuttles":
            var text = "See";
            foundedin = "1976";
            nooflines = "15";
            email = "marguerite@stanford.edu";
            phoneno = "650-724-9939";

            document.getElementById("desc").innerHTML = `${text} <br> <a href="https://en.wikipedia.org/wiki/Stanford_University_student_housing#Shuttle_service">Stanford University Student Housing Article</a>.`;
            document.getElementById("foundingdate").innerHTML = foundedin;
            document.getElementById("nooflines").innerHTML = nooflines;
            document.getElementById("email_agency").innerHTML = email;
            document.getElementById("phone_agency").innerHTML = phoneno;
            break;
        case "trideltatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Tri_Delta_Transit&origin=*";
            page_id = "3258352";
            foundedin = "1977";
            nooflines = "106";
            phoneno = "925-754-4040";
            moreinfo = "https://en.wikipedia.org/wiki/Tri_Delta_Transit"
            break;
        case "uctransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Union_City_Transit&origin=*";
            page_id = "819042";
            foundedin = "1974";
            nooflines = "5";
            phoneno = "510-471-1411";
            email = "transit@unioncity.org";
            moreinfo = "https://en.wikipedia.org/wiki/Union_City_Transit";
            break;
        case "vacavillecitycoach":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Vacaville_City_Coach&origin=*";
            page_id = "11984183";
            foundedin = "1981";
            nooflines = "6";
            phoneno = "707-449-6000";
            moreinfo = "https://en.wikipedia.org/wiki/Vacaville_City_Coach";
            break;
        case "napatransit":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Vine_Transit&origin=*";
            page_id = "11922129";
            foundedin = "1998";
            nooflines = "11";
            phoneno = "707-251-2800 or 1-800-696-6443"
            email = "info@nvta.ca.gov"
            moreinfo = "https://en.wikipedia.org/wiki/Vine_Transit"
            break;
        case "westcat":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=WestCAT&origin=*";
            page_id = "790389";
            foundedin = "1977";
            nooflines = "14";
            phoneno = "510-724-7993";
            moreinfo = "https://en.wikipedia.org/wiki/WestCAT"
            break;
        case "trivalleywheels":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Wheels_(California)&origin=*";
            page_id = "987554";
            foundedin = "May 1985";
            nooflines = "27";
            phoneno = "925-455-7500"
            moreinfo = "https://en.wikipedia.org/wiki/Wheels_(California)"
            break;
        default:
            foundedin = "";
            nooflines = "";
            email = "";
            phoneno = "";
            link = "";
            page_id = "";
            moreinfo = "";

            document.getElementById("desc").innerHTML = `Select a Bus Agency.`;
            document.getElementById("foundingdate").innerHTML = "-";
            document.getElementById("nooflines").innerHTML = "-";
            document.getElementById("email_agency").innerHTML = "-";
            document.getElementById("phone_agency").innerHTML = "-";
            break;
    }

    if (a === "stanfordshuttles") {
        console.log("Stop.")
    }
    else if (a === "prompt") {
        console.log("End.")
    }
    else {
        getWikipediaArticle(link, page_id);
    }
}

function getWikipediaArticle(getArticleInfo, pageId) {
    var article_caller = new XMLHttpRequest();
    article_caller.open("GET", getArticleInfo);
    article_caller.onreadystatechange = function() {
        if (article_caller.readyState === 4 && article_caller.status === 200) {
            var article = JSON.parse(article_caller.responseText);
            var summary = article.query.pages[pageId].extract;

            document.getElementById("desc").innerHTML = `${summary} <br> <a href="https://en.wikipedia.org/wiki/AC_Transit">Wikipedia</a>`;
            document.getElementById("foundingdate").innerHTML = foundedin;
            document.getElementById("nooflines").innerHTML = nooflines;
            document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)</p>`;
            document.getElementById("phone_agency").innerHTML = `<b>${phoneno}</b> (Phone)</p>`;
        }
    }
    article_caller.send();
}