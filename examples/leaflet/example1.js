(function() {

    // Set Kortforsyningen token, replace with your own token
    var kftoken = 'd12107f70a3ee93153f313c7c502169a';

    // Userinformation from your Datafordeler user
    var dafusername = 'ABCDEFGHIJ'
    var dafpassword = 'Your password here!'

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';


    // Make the map object using the custom projection
    //proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    var crs = new L.Proj.CRS('EPSG:25832',
	'+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', {
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        origin: [120000,6500000],
        bounds: L.bounds([120000, 5661139.2],[1378291.2, 6500000])
    });


    // Make the map object using the custom projection
    var map = new L.Map('map', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 13
    });

    // Define layers
    // Ortofoto [WMTS:orto_foraar] Kortforsyningen
    var ortofotowmtsKF = L.tileLayer('https://services.kortforsyningen.dk/orto_foraar?token=' + kftoken + '&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function () {
            var zoomlevel = map._animateToZoom ? map._animateToZoom : map.getZoom();
            if (zoomlevel < 10)
                return 'L0' + zoomlevel;
            else
                return 'L' + zoomlevel;
        }
    }).addTo(map);

    // Ortofoto [WMTS:orto_foraar] Datafordeleren
    // Notice the url now takes the username and password, and the zoom level is the number, without "Lxx" added. The layer name has also changed.
    // TileMatrixSet has also changed.
    var ortofotowmtsDAF = L.tileLayer('https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword + '&request=GetTile&version=1.0.0&service=WMTS&Layer=orto_foraar_wmts&style=default&format=image/jpeg&TileMatrixSet=KortforsyningTilingDK&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function () {
            var zoomlevel = map._animateToZoom ? map._animateToZoom : map.getZoom();
            return zoomlevel
        }
    }).addTo(map);


    // Skærmkort [WMTS:topo_skaermkort] Kortforsyningen
    var toposkaermkortwmtsKF = L.tileLayer('https://services.kortforsyningen.dk/topo_skaermkort?token=' + kftoken + '&request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            if (zoomlevel < 10)
                return 'L0' + zoomlevel;
            else
                return 'L' + zoomlevel;
        }
    }).addTo(map);

    // Skærmkort [WMTS:topo_skaermkort] Datafordeleren
    // Notice the url now takes the username and password, and the zoom level is the number, without "Lxx" added. The layer name has also changed.
    var toposkaermkortwmtsDAF = L.tileLayer('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword + '&request=GetTile&version=1.0.0&service=WMTS&Layer=topo_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    minZoom: 0,
        maxZoom: 13,
        attribution: myAttributionText,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            return zoomlevel
        }
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
        token: kftoken,
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
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionText,
        continuousWorld: true,
        opacity: 0.5
    });

    // Define layer groups for layer control
    var baseLayers = {
        "Ortofoto WMTS - Kortforsyningen": ortofotowmtsKF,
        "Ortofoto WMTS - Datafordeleren": ortofotowmtsDAF,
        "Skærmkort WMTS - Kortforsyningen": toposkaermkortwmtsKF,
        "Skærmkort WMTS - Datafordeleren": toposkaermkortwmtsDAF
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
