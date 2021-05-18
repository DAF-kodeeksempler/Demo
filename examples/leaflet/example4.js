(function() {

    // Set Kortforsyningen token, replace with your own token
    var kftoken = 'd12107f70a3ee93153f313c7c502169a';

    // Userinformation from your Datafordeler user
    var dafusername = 'ABCDEFGHIJ'
    var dafpassword = 'Your password here!'

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionTextKF = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering - Kortforsyningen</a>';
    var myAttributionTextDAF = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering - Datafordeler</a>';


    // Make the map object using the custom projection
    //proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    var crs = new L.Proj.CRS('EPSG:25832',
	'+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', {
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1],
        origin: [120000,6500000],
        bounds: L.bounds([120000, 5661139.2],[1378291.2, 6500000])
    });


    // Make the map object using the custom projection
    var mapKF = new L.Map('mapKF', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 14
    });

    var mapDAF = new L.Map('mapDAF', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 14
    });

    // Skærmkort [WMTS:topo_skaermkort] Kortforsyningen
    var wmtsKF = L.tileLayer('https://services.kortforsyningen.dk/topo_skaermkort?token=' + kftoken + '&request=GetTile&version=1.0.0&service=WMTS&Layer=dtk_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
        attribution: myAttributionTextKF,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            if (zoomlevel < 10)
                return 'L0' + zoomlevel;
            else
                return 'L' + zoomlevel;
        }
    }).addTo(mapKF);

    // Skærmkort [WMTS:topo_skaermkort] Datafordeleren
    // Notice the url now takes the username and password, and the zoom level is the number, without "Lxx" added. The layer name has also changed.
    var wmtsDAF = L.tileLayer('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword + '&request=GetTile&version=1.0.0&service=WMTS&Layer=topo_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    attribution: myAttributionTextDAF,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            return zoomlevel
        }
    }).addTo(mapDAF);

    // Skærmkort [WMT:topo_skaermkort] Kortforsyningen
    var wmsKF = L.tileLayer.wms('https://services.kortforsyningen.dk/topo_skaermkort', {
        layers: 'dtk_skaermkort',
        token: kftoken,
        format: 'image/png',
        attribution: myAttributionTextKF
    });

    // Skærmkort [WMS:topo_skaermkort] Datafordeleren
    var wmsDAF = L.tileLayer.wms('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms?username='+ dafusername + '&password=' + dafpassword , {
        layers: 'dtk_skaermkort',
        transparent: 'FALSE',
        format: 'image/png',
        attribution: myAttributionTextDAF
    });

    // Define layer groups for layer control
    var baseLayersKF = {
        "Skærmkort - Kortforsyningen": wmtsKF
    };

    var baseLayersDAF = {
        "Skærmkort - Datafordeleren": wmtsDAF
    };

    // Switch to WMS in zoomlevel > 13
    mapKF.on('zoomend', function () {
        if (mapKF.getZoom() > 13) {
            if (mapKF.hasLayer(wmtsKF)) {
                mapKF.removeLayer(wmtsKF);
            }
            if (!mapKF.hasLayer(wmsKF)) {
                mapKF.addLayer(wmsKF);
            }
        } else {
            if (!mapKF.hasLayer(wmtsKF)) {
                mapKF.addLayer(wmtsKF);
            }
            if (mapKF.hasLayer(wmsKF)) {
                mapKF.removeLayer(wmsKF);
            }
        }
    });

    mapDAF.on('zoomend', function () {
        if (mapDAF.getZoom() > 13) {
            if (mapDAF.hasLayer(wmtsDAF)) {
                mapDAF.removeLayer(wmtsDAF);
            }
            if (!mapDAF.hasLayer(wmsDAF)) {
                mapDAF.addLayer(wmsDAF);
            }
        } else {
            if (!mapDAF.hasLayer(wmtsDAF)) {
                mapDAF.addLayer(wmtsDAF);
            }
            if (mapDAF.hasLayer(wmsDAF)) {
                mapDAF.removeLayer(wmsDAF);
            }
        }
    });

    // Add layer control to map
    L.control.layers(baseLayersKF).addTo(mapKF);
    L.control.layers(baseLayersDAF).addTo(mapDAF);

    // Add scale line to map
    L.control.scale({imperial: false}).addTo(mapKF); // disable feet units
    L.control.scale({imperial: false}).addTo(mapDAF); // disable feet units

    // Sync the maps
    mapKF.sync(mapDAF);
    mapDAF.sync(mapKF)


})();
