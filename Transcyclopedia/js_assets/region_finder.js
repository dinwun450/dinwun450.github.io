function changeSwitch(c) {
    var cityId = c;
    console.log(cityId);

    switch (cityId) {
        case "sfbayarea":
            console.log("Golden State!");
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/bart/bart.html" id="bart"><img src="img_assets/bart_logo.svg" style="width: 50px; height: auto;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/muni/muni.html" id="muni"><img src="img_assets/muni_logo.svg" style="width: 50px; height: auto;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/vta/vta.html" id="vta"><img src="img_assets/vta_logo.png" style="width: 50px; height: auto;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/ferry/sf_ferry.html" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/bus/sf_buses.html" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sanfrancisco/train/sf_trains.html" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "losangeles":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/losangeles/lametro/lametro.html"><img src="img_assets/la_metro.svg.png" style="width: 50px; height: auto; position: relative; bottom: 7px;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/losangeles/metrolink/metrolink.html"><img src="img_assets/metrolink_logo.svg" style="width: 90px; height: auto; position: relative; top: 5px;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/losangeles/bus/la_buses.html" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "sand":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sandiego/nctd/nctd.html"><img src="img_assets/nctd.svg" style="width: 90px; height: auto; position: relative; top: 5px;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/sandiego/mts/mts.html"><img src="img_assets/sdmts_logo.png" style="width: 70px; height: auto; position: relative;"></a></li>
            `
            break;
        case "yosenmerced":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/yosemite_and_merced/yarts/yarts.html"><img src="img_assets/yarts_logo.png" style="width: 90px; height: auto; position: relative; top: 5px;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/yosemite_and_merced/merced_thebus/merced_thebus.html"><img src="img_assets/merced_bus.png" style="width: 90px; height: auto; position: relative; bottom: 7px;"></a></li>
            `
            break;
        case "hawaii":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/hawaii/bus/hawaii_buses.html" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/hawaii/skyline/skyline.html" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "port":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/portland/trimet/trimet.html"><img src="img_assets/trimet_logo.svg.png" style="width: 90px; height: auto; position: relative; top: 5px;"></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/portland/portlandstreetcar/portlandstreetcar.html"><i class="fa-solid fa-train-tram" style="font-size: 35px;"></i></a></li>
            <li><a href="https://dinwun450.github.io/Transcyclopedia/portland/portlandaerialtram/portlandaerialtram.html"><i class="fa-solid fa-cable-car" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "vegas":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="https://dinwun450.github.io/Transcyclopedia/lasvegas/rtc/vegas_rtc.html"><img src="img_assets/rtc_logo.png" style="width: 50px; height: auto; position: relative; bottom: 12px;"></a></li>
            <li><a href="#"><img src="img_assets/lv_monorail.png" style="width: 90px; height: auto; position: relative;"></a></li>
            `
            break;
        case "denver":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/rtd_logo.svg.png" style="width: 50px; height: auto; position: relative; bottom: 5px;"></a></li>
            `
            break;
        case "seattletacoma":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/sound_transit_logo.svg.png" style="width: 90px; height: auto; position: relative; top: 2px;"></a></li>
            <li><a href="#" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "chicago":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/chicago_l.png" style="width: 70px; height: auto; position: relative; bottom: 25px;"></a></li>
            <li><a href="#"><img src="img_assets/metra_logo.svg.png" style="width: 70px; height: auto; position: relative; top: 3px;"></a></li>
            <li><a href="#" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "ny":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/nymta.png" style="width: 50px; height: auto; position: relative; bottom: 10px;"></a></li>
            <li><a href="#" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "miami":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/miami_dade.png" style="width: 70px; height: auto; position: relative; bottom: 5px;"></a></li>
            <li><a href="#" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "orland":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "indianapolis":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "atlanta":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/MARTA Signature.png" style="width: 120px; height: auto; position: relative; bottom: 5px; right: 15px;"></a></li>
            <li><a href="#" id="train"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "dallasworth":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/trinity_metro.png" style="width: 70px; height: auto; position: relative; bottom: 5px;"></a></li>
            <li><a href="#"><img src="img_assets/dart_logo.png" style="width: 70px; height: auto; position: relative; bottom: 15px;"></a></li>
            `
            break;
        case "aus":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/capmetro.png" style="width: 70px; height: auto; position: relative; top: 6px;"></a></li>
            `
            break;
        case "sanant":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "dcbalti":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/wmata.png" style="width: 50px; height: auto; position: relative; bottom: 15px;"></a></li>
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="train"><i class="fa-solid fa-train" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "raleigh":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "boston":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/mbta.png" style="width: 50px; height: auto; position: relative; bottom: 10px;"></a></li>
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            <li><a href="#" id="ferry"><i class="fa-solid fa-ferry" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "charle":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#" id="bus"><i class="fa-solid fa-bus" style="font-size: 35px;"></i></a></li>
            `
            break;
        case "phoenix":
            document.querySelector(".optionsfortransit").innerHTML = `
            <li><a href="#"><img src="img_assets/valley_metro.png" style="width: 90px; height: auto; position: relative; top: 5px;"></a></li>
            `
            break;
        default:
            document.querySelector(".optionsfortransit").innerHTML = "";
            document.getElementById("top_info").innerHTML = `Welcome to Transcyclopedia! Today is ${getMonthNumber}/${getDayNumber}/${getYearNumber}, ${currentTime}.`
    }
}
