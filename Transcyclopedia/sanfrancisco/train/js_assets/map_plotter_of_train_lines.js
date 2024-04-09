var geojson_routes = [];

function plotACELines() {
    var ace_line_call = new XMLHttpRequest();
    ace_line_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-acealtamontcorridorexpress&include_geometry=true");
    ace_line_call.onreadystatechange = function() {
        if (ace_line_call.readyState === 4 && ace_line_call.status === 200) {
            var ace_outputs = JSON.parse(ace_line_call.responseText).routes;

            for (var i=0; i<ace_outputs.length; i++) {
                var all_ace_lines_name_short = ace_outputs[i].route_short_name;
                var all_ace_lines_name_long = ace_outputs[i].route_long_name;
                var all_ace_lines_color = ace_outputs[i].route_color; 
                var all_ace_lines_text_color = ace_outputs[i].route_text_color;
                var geometry_ace = ace_outputs[i].geometry;

                geojson_routes.push({
                    'type': 'Feature',
                    'geometry': geometry_ace,
                    'properties': {
                        'color': `#${all_ace_lines_color}`,
                        'text_color': `#${all_ace_lines_text_color}`,
                        'route_short_name': all_ace_lines_name_short,
                        'route_long_name': all_ace_lines_name_long,
                        'label': "Altamont Corridor Express"
                    }
                });
            }
        }
    }
    ace_line_call.send();
}
plotACELines();

function plotCaltrainLines() {
    var caltrain_line_call = new XMLHttpRequest();
    caltrain_line_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9q9-caltrain&include_geometry=true");
    caltrain_line_call.onreadystatechange = function() {
        if (caltrain_line_call.readyState === 4 && caltrain_line_call.status === 200) {
            var caltrain_outputs = JSON.parse(caltrain_line_call.responseText).routes;

            for (var i=0; i<caltrain_outputs.length; i++) {
                var all_caltrain_lines_name_short = caltrain_outputs[i].route_short_name;
                var all_caltrain_lines_name_long = caltrain_outputs[i].route_long_name;
                var all_caltrain_lines_color = caltrain_outputs[i].route_color; 
                var all_caltrain_lines_text_color = caltrain_outputs[i].route_text_color;
                var geometry_caltrain = caltrain_outputs[i].geometry;

                geojson_routes.push({
                    'type': 'Feature',
                    'geometry': geometry_caltrain,
                    'properties': {
                        'color': `#${all_caltrain_lines_color}`,
                        'text_color': `#${all_caltrain_lines_text_color}`,
                        'route_short_name': all_caltrain_lines_name_short,
                        'route_long_name': all_caltrain_lines_name_long,
                        'label': "Caltrain"
                    }
                });
            }
        }
    }
    caltrain_line_call.send();
}
plotCaltrainLines();

function plotCapitolCorridorLines() {
    var cc_line_call = new XMLHttpRequest();
    cc_line_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-capitolcorridor&include_geometry=true");
    cc_line_call.onreadystatechange = function() {
        if (cc_line_call.readyState === 4 && cc_line_call.status === 200) {
            var cc_outputs = JSON.parse(cc_line_call.responseText).routes;

            for (var i=0; i<cc_outputs.length; i++) {
                var all_cc_lines_name_short = cc_outputs[i].route_short_name;
                var all_cc_lines_name_long = cc_outputs[i].route_long_name;
                var all_cc_lines_color = cc_outputs[i].route_color; 
                var all_cc_lines_text_color = cc_outputs[i].route_text_color;
                var geometry_cc = cc_outputs[i].geometry;

                geojson_routes.push({
                    'type': 'Feature',
                    'geometry': geometry_cc,
                    'properties': {
                        'color': `#${all_cc_lines_color}`,
                        'text_color': `#${all_cc_lines_text_color}`,
                        'route_short_name': all_cc_lines_name_short,
                        'route_long_name': all_cc_lines_name_long,
                        'label': "Capitol Corridor"
                    }
                });
            }
        }
    }
    cc_line_call.send();
}
plotCapitolCorridorLines();

function plotSmartLines() {
    var smart_line_call = new XMLHttpRequest();
    smart_line_call.open("GET", "https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=o-9qc-capitolcorridor&include_geometry=true");
    smart_line_call.onreadystatechange = function() {
        if (smart_line_call.readyState === 4 && smart_line_call.status === 200) {
            var smart_outputs = JSON.parse(smart_line_call.responseText).routes;

            for (var i=0; i<smart_outputs.length; i++) {
                var all_smart_lines_name_short = smart_outputs[i].route_short_name;
                var all_smart_lines_name_long = smart_outputs[i].route_long_name;
                var all_smart_lines_color = smart_outputs[i].route_color; 
                var all_smart_lines_text_color = smart_outputs[i].route_text_color;
                var geometry_smart = smart_outputs[i].geometry;

                geojson_routes.push({
                    'type': 'Feature',
                    'geometry': geometry_smart,
                    'properties': {
                        'color': `#${all_smart_lines_color}`,
                        'text_color': `#${all_smart_lines_text_color}`,
                        'route_short_name': all_smart_lines_name_short,
                        'route_long_name': all_smart_lines_name_long,
                        'label': "Sonoma-Marin Area Rail Transit"
                    }
                });
            }
        }
    }
    smart_line_call.send();
}
plotSmartLines();

console.log(geojson_routes);