var foundedin = "";
var nooflines = "";
var email = "";
var phoneno = "";
var link = "";
var page_id = "";
var moreinfo = "";

function changeAgencyInfo(a) {
    var agency = a;

    switch (agency) {
        case "ace":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Altamont_Corridor_Express&origin=*";
            page_id = "870179";
            foundedin = "October 19, 1998";
            nooflines = "1";
            email = "customerservice@acerail.com";
            phoneno = "1-800-411-RAIL (7245)";
            moreinfo = "https://en.wikipedia.org/wiki/Altamont_Corridor_Express";
            break;
        case "caltrain":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Caltrain&origin=*";
            page_id = "268224";
            foundedin = "1863 as Peninsula Commute <br> 1985 as Caltrain";
            nooflines = "1 (with 5 service types)";
            phoneno = "(800) 660-4287";
            email = "-";
            moreinfo = "https://en.wikipedia.org/wiki/Caltrain";
            break;
        case "capitol_corridor":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Capitol_Corridor&origin=*";
            page_id = "683748";
            foundedin = "December 12, 1991";
            nooflines = "1";
            email = "-";
            phoneno = "1-877-9-RIDECC or 1-877-974-3322";
            moreinfo = "https://en.wikipedia.org/wiki/Capitol_Corridor";
            break;
        case "smart":
            link = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Sonoma_Marin_Area_Rail_Transit&origin=*";
            page_id = "1981955";
            foundedin = "2002 as SMART District";
            nooflines = "1";
            email = "info@sonomamarintrain.org";
            phoneno = "-";
            moreinfo = "https://en.wikipedia.org/wiki/Sonoma%E2%80%93Marin_Area_Rail_Transit";
            break;
        default:
            foundedin = "";
            nooflines = "";
            email = "";
            phoneno = "";
            link = "";
            page_id = "";
            moreinfo = "";

            document.getElementById("desc").innerHTML = `Select a Train Agency.`;
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
        getWikipediaArticleTrain(link, page_id);
    }
}

function getWikipediaArticleTrain(getArticleInfo, pageId) {
    var article_caller = new XMLHttpRequest();
    article_caller.open("GET", getArticleInfo);
    article_caller.onreadystatechange = function() {
        if (article_caller.readyState === 4 && article_caller.status === 200) {
            var article = JSON.parse(article_caller.responseText);
            var summary = article.query.pages[pageId].extract;

            document.getElementById("desc").innerHTML = `${summary} <br> <a href="${moreinfo}">Wikipedia</a>`;
            document.getElementById("foundingdate").innerHTML = `<b>${foundedin}</b>`;
            document.getElementById("nooflines").innerHTML = `<b>${nooflines}</b>`;
            document.getElementById("email_agency").innerHTML = `<b>${email}</b> (Email)`;
            document.getElementById("phone_agency").innerHTML = `<b>${phoneno}</b> (Phone)`;
        }
    }
    article_caller.send();
}