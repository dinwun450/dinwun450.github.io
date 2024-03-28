function changeAgencyInAlerts(c) {
    var agency = c;

    switch (agency) {
        case "actransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9-actransit&limit=700&include_alerts=true`;
            break;
        case "berkeleyshuttles":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9p3-beartransit&limit=700&include_alerts=true`;
            break;
        case "commutedotorg":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9j-commuteorgshuttles&limit=700&include_alerts=true`;
            break;
        case "countyconnection":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9p-countyconnection&limit=700&include_alerts=true`;
            break;
        case "dumbartonexpress":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9j-dumbartonexpress&limit=700&include_alerts=true`;
            break;
        case "fast":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-fairfieldandsuisuntransit&limit=700&include_alerts=true`;
            break;
        case "ggt":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qb-goldengatetransit&limit=700&include_alerts=true`;
            break;
        case "marintransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbb-marintransit&limit=700&include_alerts=true`;
            break;
        case "petalumatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbc9-petalumatransit&limit=700&include_alerts=true`;
            break;
        case "sanmateotransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q8-samtrans&limit=700&include_alerts=true`;
            break;
        case "santarosacitybus":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qbdx-santarosacitybus&limit=700&include_alerts=true`;
            break;
        case "solanotransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc0-soltrans&limit=700&include_alerts=true`;
            break;
        case "sonomacountytransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qb-sonomacountytransit&limit=700&include_alerts=true`;
            break;
        case "stanfordshuttles":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9h-stanford~marguerite&limit=700&include_alerts=true`;
            break;
        case "trideltatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc2-trideltatransit&limit=700&include_alerts=true`;
            break;
        case "uctransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9jy-unioncitytransit&limit=700&include_alerts=true`;
            break; 
        case "vacavillecitycoach":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc60-vacavillecitycoach&limit=700&include_alerts=true`;
            break;
        case "napatransit":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-vinenapacounty&limit=700&include_alerts=true`;
            break;
        case "westcat":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9qc-westcatwesterncontracosta&limit=700&include_alerts=true`;
            break;
        case "trivalleywheels":
            link = `https://transit.land/api/v2/rest/routes?api_key=x5unflDSbpKEWnThyfmteM8MHxIsg3eL&search=${route_searcher}&operator_onestop_id=o-9q9q-wheelsbus&limit=700&include_alerts=true`;
            break;
    }
}