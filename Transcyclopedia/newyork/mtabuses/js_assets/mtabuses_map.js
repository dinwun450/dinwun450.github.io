function plotLinesFromAnAgencyInNYC(onestop_id, ins_singular_route_type) {
    var plot_lines_caller = new XMLHttpRequest();
    plot_lines_caller.open("GET", `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&operator_onestop_id=${onestop_id}&route_type=${ins_singular_route_type}&limit=700&include_geometry=true`);
    plot_lines_caller.onreadystatechange = function() {
        if (plot_lines_caller.readyState === 4 && plot_lines_caller.status === 200) {
            var plot_lines_receiver = JSON.parse(plot_lines_caller.responseText);
            for (var i = 0; i < plot_lines_receiver.routes.length; i++) {
                var route_geometry = plot_lines_receiver.routes[i].geometry;
                var route_color = plot_lines_receiver.routes[i].route_color;
                var route_text_color = plot_lines_receiver.routes[i].route_text_color;
                var route_short_name = plot_lines_receiver.routes[i].route_short_name;
                var route_long_name = plot_lines_receiver.routes[i].route_long_name;
                var route_id = plot_lines_receiver.routes[i].route_id;
                var route_type = plot_lines_receiver.routes[i].route_type;

                geojson_of_routes.push({
                    "type": "Feature",
                    "properties": {
                        "route_id": route_id,
                        "route_short_name": route_short_name,
                        "route_long_name": route_long_name,
                        "route_color": `#${route_color}`,
                        "route_text_color": `#${route_text_color}`,
                        "route_id": route_id,
                        "route_type": route_type
                    },
                    "geometry": route_geometry
                });
            }

            map.addSource('source_routes', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': geojson_of_routes
                },
                'generateId': true
            });

            if (ins_singular_route_type !== 3) {
                map.addLayer({
                    'id': 'line_routes',
                    'type': 'line',
                    'source': 'source_routes',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 4,
                        'line-color': ['get', 'route_color']
                    }
                });
            }
            else {
                map.addLayer({
                    'id': 'line_routes',
                    'type': 'line',
                    'source': 'source_routes',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-width': 2,
                        'line-color': ['get', 'route_color'],
                    }
                });
            }

            map.moveLayer('line_routes');

            map.on('movestart', () => {
                map.setFilter('line_routes', ['has', 'route_id']);

                document.getElementById("range_of_routes").innerHTML = `
                    <li id="rir" class="route_radius"><span id="route_name_rad" class="styling_for_routes">-</span> <span id="route_detail_rad">Loading...</span></li>
                `;
            });

            map.on('moveend', () => {
                const features = map.queryRenderedFeatures({
                    layers: ['line_routes']
                });

                if (features) {
                    const uniqueFeatures = getUniqueFeatures(features, 'route_id');

                    for (var f=0; f<uniqueFeatures.length; f++) {
                        var name_of_route = uniqueFeatures[f].properties.route_short_name;
                        var desc_of_route = uniqueFeatures[f].properties.route_long_name;
                        var color_of_route = uniqueFeatures[f].properties.route_color;
                        var text_color_of_route = uniqueFeatures[f].properties.route_text_color;

                        if (name_of_route === undefined) {
                            document.getElementById("route_name_rad").innerHTML = `&nbsp;&nbsp;&nbsp;`;
                        } else {
                            document.getElementById("route_name_rad").innerHTML = name_of_route;
                        }

                        document.getElementById("route_name_rad").style.backgroundColor = `${color_of_route}40`;
                        document.getElementById("route_name_rad").style.color = `${text_color_of_route}`;
                        document.getElementById("route_name_rad").style.border = `1px solid ${color_of_route}`;
                        document.getElementById("route_detail_rad").innerHTML = desc_of_route;

                        var each_route_entity = document.getElementById("rir").cloneNode(true);
                        document.getElementById("range_of_routes").appendChild(each_route_entity);
                    };

                    var all_routes = document.getElementById("range_of_routes").children;
                    document.getElementById("range_of_routes").removeChild(all_routes[0]);
                }
            });

            let routeID_for_agency = [];
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });

            map.on('mouseenter', 'line_routes', (e) => {
                var fs = map.queryRenderedFeatures(e.point, {
                    layers: ['line_routes']
                });

                if (fs.length > 0) {
                    for (var f=0; f<fs.length; f++) {
                        var name_of_route = fs[f].properties.route_short_name;
                        if (name_of_route === null) {
                            name_of_route = fs[f].properties.route_long_name;
                        }
                        routeID_for_agency.push(name_of_route);
                    }

                    popup.setLngLat(e.lngLat.wrap()).setHTML(routeID_for_agency).addTo(map);
                }
            });

            map.on('mouseleave', 'line_routes', () => {
                if (routeID_for_agency.length > 0) {
                    routeID_for_agency = [];
                };
                popup.remove();
            });
        }
    }
    plot_lines_caller.send();
}