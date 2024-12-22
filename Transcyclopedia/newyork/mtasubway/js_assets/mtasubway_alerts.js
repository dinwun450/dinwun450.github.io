var mtasubway_route_onestop_id = "";
var list_of_mta_subway_lines_to_match_per_alerts = {
    "[1]": "img_assets/mta_1.svg",
    "[2]": "img_assets/mta_2.svg",
    "[3]": "img_assets/mta_3.svg",
    "[4]": "img_assets/mta_4.svg",
    "[5]": "img_assets/mta_5.svg",
    "[5X]": "img_assets/mta_5x.svg",
    "[6]": "img_assets/mta_6.svg",
    "[6X]": "img_assets/mta_6x.svg",
    "[7]": "img_assets/mta_7.svg",
    "[7X]": "img_assets/mta_7x.svg",
    "[A]": "img_assets/mta_a.svg",
    "[B]": "img_assets/mta_b.svg",
    "[C]": "img_assets/mta_c.svg",
    "[D]": "img_assets/mta_d.svg",
    "[E]": "img_assets/mta_e.svg",
    "[F]": "img_assets/mta_f.svg",
    "[FX]": "img_assets/mta_fx.svg",
    "[G]": "img_assets/mta_g.svg",
    "[J]": "img_assets/mta_j.svg",
    "[L]": "img_assets/mta_l.svg",
    "[M]": "img_assets/mta_m.svg",
    "[N]": "img_assets/mta_n.svg",
    "[Q]": "img_assets/mta_q.svg",
    "[R]": "img_assets/mta_r.svg",
    "[S]": "img_assets/mta_s.svg",
    "[FS]": "img_assets/mta_sf.svg",
    "[H]": "img_assets/mta_sr.svg",
    "[W]": "img_assets/mta_w.svg",
    "[Z]": "img_assets/mta_z.svg"
};

function string_and_image_concatenator(string_text) {
    var splitted_text = string_text.replace(/(\r\n|\n|\r)/gm, " ").split(" ");
    var new_text = "";

    for (const word of splitted_text) {
        console.log("Word: " + word);

        if (list_of_mta_subway_lines_to_match_per_alerts[word]) {
            console.log("Match found: " + word);
            splitted_text[splitted_text.indexOf(word)] = "<img src='" + list_of_mta_subway_lines_to_match_per_alerts[word] + "' style='width: 20px; height: 20px; margin-left: 2px; margin-right: 2px;'>";
        }
        else {
            const matches = word.match(/\[|\]/g);

            if (matches) {
                const result = word.split(/\]\[/);
                var list_in = "";
                for (var c=0; c<result.length; c++) {
                    is_nqrw = result[c].replace(/[^a-zA-Z0-9 ]/g, "");
                    console.log(is_nqrw === "N" || is_nqrw === "Q" || is_nqrw === "R" || is_nqrw === "W");

                    if (is_nqrw === "N" || is_nqrw === "Q" || is_nqrw === "R" || is_nqrw === "W") {
                        new_one = "<img src='" + list_of_mta_subway_lines_to_match_per_alerts["[" + result[c].replace(/[^a-zA-Z0-9 ]/g, "") + "]"] + "' style='width: 20px; height: 20px;' class='filtered-inverted'>";
                        console.log("NQRW found.");
                    }
                    else {
                        new_one = "<img src='" + list_of_mta_subway_lines_to_match_per_alerts["[" + result[c].replace(/[^a-zA-Z0-9 ]/g, "") + "]"] + "' style='width: 20px; height: 20px;'>";
                    }
                    // new_one = "<img src='" + list_of_mta_subway_lines_to_match["[" + result[c].replace(/[^a-zA-Z0-9 ]/g, "") + "]"] + "' style='width: 20px; height: 20px;'>";
                    list_in += new_one;
                }

                splitted_text[splitted_text.indexOf(word)] = `<span id="spacer_of_lines">${list_in}</span>`;
                list_in = "";
            } else {
                console.log("Square brackets not found.");
            }
        }
    }

    for (const word of splitted_text) {
        new_text += word + " ";
    }

    console.log(new_text.replace(/,/g, ", "))
    return new_text;
}

function changeMTASubwayRoutes(r) {
    var mta_subway_route = r;

    switch (mta_subway_route) {
        case "1":
            mtasubway_route_onestop_id = "r-dr72-1";
            break;
        case "2":
            mtasubway_route_onestop_id = "r-dr5r-2";
            break;
        case "3":
            mtasubway_route_onestop_id = "r-dr5r-3";
            break;
        case "4":
            mtasubway_route_onestop_id = "r-dr5r-4";
            break;
        case "5":
            mtasubway_route_onestop_id = "r-dr5r-5";
            break;
        case "6":
            mtasubway_route_onestop_id = "r-dr72-6";
            break;
        case "6X":
            mtasubway_route_onestop_id = "r-dr72-6x";
            break;
        case "7":
            mtasubway_route_onestop_id = "r-dr5r-7";
            break;
        case "7X":
            mtasubway_route_onestop_id = "r-dr5r-7x";
            break;
        case "A":
            mtasubway_route_onestop_id = "r-dr5r-a";
            break;
        case "B":
            mtasubway_route_onestop_id = "r-dr5r-b";
            break;
        case "C":
            mtasubway_route_onestop_id = "r-dr5r-c";
            break;
        case "D":
            mtasubway_route_onestop_id = "r-dr5r-d";
            break;
        case "E":
            mtasubway_route_onestop_id = "r-dr5r-e";
            break;
        case "F":
            mtasubway_route_onestop_id = "r-dr5r-f";
            break;
        case "FX":
            mtasubway_route_onestop_id = "r-dr5r-fx";
            break;
        case "G":
            mtasubway_route_onestop_id = "r-dr5r-g";
            break;
        case "J":
            mtasubway_route_onestop_id = "r-dr5r-j";
            break;
        case "L":
            mtasubway_route_onestop_id = "r-dr5r-l";
            break;
        case "M":
            mtasubway_route_onestop_id = "r-dr5r-m";
            break;
        case "N":
            mtasubway_route_onestop_id = "r-dr5r-n";
            break;
        case "Q":
            mtasubway_route_onestop_id = "r-dr5r-q";
            break;
        case "R":
            mtasubway_route_onestop_id = "r-dr5r-r";
            break;
        case "GS":
            mtasubway_route_onestop_id = "r-dr5ru7-s";
            break;
        case "FS":
            mtasubway_route_onestop_id = "r-dr5rm-s";
            break;
        case "H":
            mtasubway_route_onestop_id = "r-dr5wb-s";
            break;
        case "W":
            mtasubway_route_onestop_id = "r-dr5r-w";
            break;
        case "Z":
            mtasubway_route_onestop_id = "r-dr5r-z";
            break;
        default:
            mtasubway_route_onestop_id = "";
            document.getElementById("nycsubway_lines_alerts").innerHTML = `
                <div id="nycsubway_alert_entity" class="alert_entity_single">Select a NYC Subway Line to see alerts.</div>
            `;
    }

    if (r === "prompt") {
        console.log("End it...");
    }
    else {
        getMTASubwayAlertsWithALine(mtasubway_route_onestop_id);
    }
}

function getMTASubwayAlertsWithALine(insRouteOnestopID) {
    document.getElementById("nycsubway_lines_alerts").innerHTML = `
        <div id="nycsubway_alert_entity" class="alert_entity_single">Loading...</div>
    `;

    var mtasubway_alert_caller = new XMLHttpRequest();
    mtasubway_alert_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-dr5r-nyct&limit=700&route_type=1&onestop_id=${insRouteOnestopID}&include_alerts=true`);
    mtasubway_alert_caller.onreadystatechange = function() {
        if (mtasubway_alert_caller.readyState === 4 && mtasubway_alert_caller.status === 200) {
            var mtasubway_alerts = JSON.parse(mtasubway_alert_caller.responseText);
            var mtasubway_alerts_output = mtasubway_alerts.routes[0].alerts;

            if (mtasubway_alerts_output.length !== 0) {
                for (var i=0; i<mtasubway_alerts_output.length; i++) {
                    var mtasubway_alert_header = string_and_image_concatenator(mtasubway_alerts_output[i].header_text[0].text);
                    var description_text = mtasubway_alerts_output[i].description_text;
                    if (description_text.length !== 0) {
                        console.log(description_text[0].text);
                        description_text = string_and_image_concatenator(description_text[0].text);
                    }
                    document.getElementById("nycsubway_alert_entity").innerHTML = `<b>${mtasubway_alert_header}</b> <br> ${description_text}`;

                    var mtasubway_alert_cloner = document.getElementById("nycsubway_alert_entity").cloneNode(true);
                    document.getElementById("nycsubway_lines_alerts").appendChild(mtasubway_alert_cloner);
                }

                var all_subway_alerts = document.getElementById("nycsubway_lines_alerts").children;
                document.getElementById("nycsubway_lines_alerts").removeChild(all_subway_alerts[0]);
            }
            else {
                document.getElementById("nycsubway_lines_alerts").innerHTML = `
                    <div id="nycsubway_alert_entity" class="alert_entity_single">No alerts for this line.</div>
                `;
            }
        }
    }
    mtasubway_alert_caller.send();
}