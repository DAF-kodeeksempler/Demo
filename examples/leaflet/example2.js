(function() {
    // Set Kortforsyningen token, replace with your own token
    var kftoken = 'd12107f70a3ee93153f313c7c502169a';

    // Userinformation from your Datafordeler user
    var dafusername = 'ABCDEFGHIJ'
    var dafpassword = 'Your password here!'

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';
 
 
    // Make custom projection using proj4 and proj4leaflet
    var crs = new L.Proj.CRS('EPSG:25832',
	'+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', {
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1]
    });

    // Make the map object using the custom projection
    var map = new L.Map('map', {
        crs: crs,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level,
    });

    // Define layers
    // Skærmkort [WMS:topo_skaermkort] Kortforsyningen
    var ortofotoKF = L.tileLayer.wms('https://services.kortforsyningen.dk/orto_foraar', {
        layers: 'orto_foraar',
        token: kftoken,
        format: 'image/jpeg',
        attribution: myAttributionText
    });

    // Skærmkort [WMS:topo_skaermkort] Datafordeleren
    // Notice the addition of transparent: 'FALSE'
    var ortofotoDAF = L.tileLayer.wms('https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar/1.0.0/WMS?username='+ dafusername + '&password=' + dafpassword , {
        layers: 'orto_foraar',
        transparent: 'FALSE',
        format: 'image/jpeg',
        attribution: myAttributionText
    });
    
    // Skærmkort [WMS:topo_skaermkort] Kortforsyningen
    var topoKF = L.tileLayer.wms('https://services.kortforsyningen.dk/topo_skaermkort', {
        layers: 'dtk_skaermkort',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText
    }).addTo(map);
    
    // Skærmkort [WMS:topo_skaermkort] Datafordeleren
    var topoDAF = L.tileLayer.wms('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms?username='+ dafusername + '&password=' + dafpassword , {
        layers: 'dtk_skaermkort',
        transparent: 'FALSE',
        format: 'image/png',
        attribution: myAttributionText
    }).addTo(map);

    // Matrikelskel overlay [WMS:mat] Kortforsyningen
    var matrikelKF = L.tileLayer.wms('https://services.kortforsyningen.dk/mat', {
        transparent: true,
        layers: 'MatrikelSkel,Centroide',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
        minZoom: 9
    }).addTo(map); // addTo means that the layer is visible by default

    // Matrikelskel overlay [WMS:mat] Datafordeleren
    // Notice username/password instead of token, and the chaned layers.
    // transparent is not set as a string whith capital letters spelling out true
    var matrikelDAF = L.tileLayer.wms('https://services.datafordeler.dk/Matrikel/MatrikelGaeldendeOgForeloebigWMS/1.0.0/WMS?username='+ dafusername + '&password=' + dafpassword , {
        transparent: 'TRUE',
        layers: 'MatrikelSkel_Gaeldende,Centroide_Gaeldende',
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
        minZoom: 9
    });

    // Hillshade overlay [WMS:dhm] Kortforsyningen
    var hillshadeKF = L.tileLayer.wms('https://services.kortforsyningen.dk/dhm', {
        transparent: true,
        layers: 'dhm_terraen_skyggekort_transparent_overdrevet',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
    });

    // Hillshade overlay [WMS:dhm] Datafordeleren
    // We use the nontransparent layer, and apply transparency in leaflet (opacity: 0.5), Also notice the layer name change, and transparent: 'TRUE'
    var hillshadeDAF = L.tileLayer.wms('https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username='+ dafusername + '&password=' + dafpassword , {
        transparent: 'TRUE',
        layers: 'dhm_terraen_skyggekort',
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
        opacity: 0.5
    });


    // Define layer groups for layer control
    var baseLayers = {
        "Ortofoto - Kortforsyningen": ortofotoKF,
        "Ortofoto - Datafordeleren": ortofotoDAF,
        "Skærmkort - Kortforsyningen": topoKF,
        "Skærmkort - Datafordeleren": topoDAF
    };
    var overlays = {
        "Matrikel - Kortforsyningen": matrikelKF,
        "Matrikel - Datafordeleren": matrikelDAF,
        "Hillshade - Kortforsyningen": hillshadeKF,
        "Hillshade - Datafordeleren": hillshadeDAF,
    };

    // Add layer control to map
    L.control.layers(baseLayers, overlays).addTo(map);    

    // Add scale line to map
    L.control.scale({imperial: false}).addTo(map); // disable feet units

})();    
