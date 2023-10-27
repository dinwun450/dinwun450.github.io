function changeAgency(a) {
    var agency = a;
    console.log(agency);

    switch (agency) {
        case "sfbayferry":
            document.querySelector(".about_agency").innerHTML = `
                <h3>About SF Bay Ferry</h3>
                <p id="about_content">San Francisco Bay Ferry is a public transit passenger ferry service in the San Francisco Bay, administered by the San Francisco Bay Area Water Emergency Transportation Authority (WETA) and operated under contract by the privately owned, Blue and Gold Fleet. In 2022, the system had a ridership of 1,787,400, or about 9,400 per weekday as of the second quarter of 2023. <a href="https://en.wikipedia.org/wiki/San_Francisco_Bay_Ferry" style="outline: none; color: #1d75bc;">Wikipedia</a></p>
            `
            break;
        case "ggf":
            document.querySelector(".about_agency").innerHTML = `
                <h3>About Golden Gate Ferry</h3>
                <p id="about_content">Golden Gate Ferry is a commuter ferry service operated by the Golden Gate Bridge, Highway and Transportation District in San Francisco Bay, part of the Bay Area of Northern California, United States. Regular service is run to the Ferry Building in San Francisco from Larkspur, Sausalito, Tiburon, and Angel Island in Marin County, with additional service from Larkspur to Oracle Park and Chase Center. The ferry service is funded primarily by passenger fares and Golden Gate Bridge tolls. In 2022, Golden Gate Ferry had a ridership of 1,022,800, or about 4,200 per weekday as of the second quarter of 2023. <a href="https://en.wikipedia.org/wiki/Golden_Gate_Ferry" style="outline: none; color: #446ba4;">Wikipedia</a></p>
            `
            break;
        default:
            document.querySelector(".about_agency").innerHTML = "";
    }
}