function loadWikipediaArticle() {
    var info_fetcher = new XMLHttpRequest();
    info_fetcher.open("GET", "https://en.wikipedia.org/w/api.php?action=query&exintro=&explaintext=&origin=%2A&prop=extracts&redirects=1&titles=Los_Angeles_County_Metropolitan_Transportation_Authority&format=json&origin=*");
    info_fetcher.onreadystatechange = function() {
        if (info_fetcher.readyState === 4 && info_fetcher.status === 200) {
            var info_receiver = JSON.parse(info_fetcher.responseText);
            var info_of_lametro = info_receiver.query.pages[359028].extract;
            document.getElementById("desc").innerHTML = `${info_of_lametro} <a href="https://en.wikipedia.org/wiki/Los_Angeles_County_Metropolitan_Transportation_Authority">Wikipedia</a>`
        }
    }
    info_fetcher.send();
}
loadWikipediaArticle();