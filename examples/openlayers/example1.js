(function() {
    // Set Kortforsyningen token, replace with your own token
    var kftoken = 'd12107f70a3ee93153f313c7c502169a';

    // Userinformation from your Datafordeler user
    var dafusername = 'ABCDEFGHIJ'
    var dafpassword = 'Your password here!'

    // Set projection as we are not using the default OpenLayers projections
    // You can define it yourself or you can use the proj4 library as done below
    proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);
    var myProjection = ol.proj.get('EPSG:25832');
    var extent = [120000, 5661139.2, 1378291.2, 6500000];
    myProjection.setExtent(extent);


    // Set the WMTS tile grid. We do this on an overall basis as all the
    // Kortforsyningen WMTS are based on the same tile grid
    var myTileGridKF = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        matrixIds: ['L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11','L12','L13'],
    });

    // Notice the change in matrix id's
    var myTileGridDAF = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        matrixIds: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],
    });

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionText = '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';


    // Initialize the map
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps', // This title of the group is shown in the layer switcher
                layers: [
                    // Ortofoto [WMTS:orto_foraar] Kortforsyningen
                    new ol.layer.Tile({
                        title:'Ortofoto - Kortforsyningen', // This is the layer title shown in the layer switcher
                        type:'base', // use 'base' for base layers, otherwise 'overlay'
                        visible: false, // by default this layer is not visible
                        opacity: 1.0, // no transparency
                        source: new ol.source.WMTS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/orto_foraar?token="+kftoken,
                            layer: "orto_foraar",
                            matrixSet: "View1",
                            format: "image/jpeg",
                            visible:'false',
                            tileGrid: myTileGridKF,
                            style: 'default',
                            size: [256, 256]
                        })
                    }),
                    // Ortofoto [WMTS:orto_foraar] Datafordeler
                    // Notice change in titlegrid, and matrtixSet
                    new ol.layer.Tile({
                        title:'Ortofoto - Datafordeler', // This is the layer title shown in the layer switcher
                        type:'base', // use 'base' for base layers, otherwise 'overlay'
                        visible: false, // by default this layer is not visible
                        opacity: 1.0, // no transparency
                        source: new ol.source.WMTS({
                            attributions: myAttributionText,
                            url: 'https://services.datafordeler.dk/GeoDanmarkOrto/orto_foraar_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword ,
                            layer: "orto_foraar_wmts",
                            matrixSet: "KortforsyningTilingDK",
                            format: "image/jpeg",
                            visible:'false',
                            tileGrid: myTileGridDAF,
                            style: 'default',
                            size: [256, 256]
                        })
                    }),
                    // Skærmkort [WMTS:topo_skaermkort] Kortforsyningen
                    new ol.layer.Tile({
                        opacity: 1.0,
                        title:'Skærmkort - Kortforsyningen',
                        type:'base',
                        visible: false, // by default this layer is visible
                        source: new ol.source.WMTS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/topo_skaermkort?token="+kftoken,
                            layer: "dtk_skaermkort",
                            matrixSet: "View1",
                            format: "image/jpeg",
                            tileGrid: myTileGridKF,
                            style: 'default',
                            size: [256, 256]
                        })
                    }),
                    // Skærmkort [WMTS:topo_skaermkort] Datafordeler
                    new ol.layer.Tile({
                        opacity: 1.0,
                        title:'Skærmkort - Datafordeler',
                        type:'base',
                        visible: true, // by default this layer is visible
                        source: new ol.source.WMTS({
                            attributions: myAttributionText,
                            url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword,
                            layer: "topo_skaermkort",
                            matrixSet: "View1",
                            format: "image/jpeg",
                            tileGrid: myTileGridDAF,
                            style: 'default',
                            size: [256, 256]
                        })
                    })
                ]
            }),
            new ol.layer.Group({
                'title': 'Overlays',
                layers: [
                    // Matrikelskel overlay [WMS:mat] Kortforsyningen
                    new ol.layer.Tile({
                        title:'Matrikel - Kortforsyningen',
                        type:'overlay',
                        visible: false,
                        opacity: 1.0,
                        zIndex:1000,
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/mat?token="+kftoken,
                            params:{
                                'LAYERS':'MatrikelSkel,Centroide',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'true',
                                'FORMAT': "image/png",
                                'STYLES':''
                            },
                        })
                    }),
                    // Matrikelskel overlay [WMS:mat] Datafordeler
                    // Notice 'TRANSPARENT':'TRUE' (Uppercase true), and changed layer names
                    new ol.layer.Tile({
                        title:'Matrikel - Datafordeler',
                        type:'overlay',
                        visible: true,
                        opacity: 1.0,
                        zIndex:1000,
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: 'https://services.datafordeler.dk/Matrikel/MatrikelGaeldendeOgForeloebigWMS/1.0.0/WMS?username='+ dafusername + '&password=' + dafpassword ,
                            params:{
                                'LAYERS':'MatrikelSkel_Gaeldende,Centroide_Gaeldende',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'TRUE',
                                'FORMAT': "image/png",
                                'STYLES':''
                            },
                        })
                    }),
                    // Hillshade overlay [WMS:dhm] Kortforsyningen
                    new ol.layer.Tile({
                        title:'Hillshade - Kortforsyningen',
                        type:'overlay',
                        visible: false,
                        opacity: 1.0,
                        zIndex:900,
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: "https://services.kortforsyningen.dk/dhm?token="+kftoken,
                            params:{
                                'LAYERS':'dhm_terraen_skyggekort_transparent_overdrevet',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'true',
                                'FORMAT': "image/png",
                                'STYLES':''
                            },
                        })
                    }),
                    // Hillshade overlay [WMS:dhm] Datafordeler
                    // We use the nontransparent layer, and apply transparency in openlayers (opacity: 0.6), Also notice the layer name change, and transparent: 'TRUE'
                    new ol.layer.Tile({
                        title:'Hillshade - Datafordeler',
                        type:'overlay',
                        visible: false,
                        opacity: 0.6,
                        zIndex:900,
                        source: new ol.source.TileWMS({
                            attributions: myAttributionText,
                            url: 'https://services.datafordeler.dk/DHMNedboer/dhm/1.0.0/WMS?username='+ dafusername + '&password=' + dafpassword,
                            params:{
                                'LAYERS':'dhm_terraen_skyggekort',
                                'VERSION':'1.1.1',
                                'TRANSPARENT':'TRUE',
                                'FORMAT': "image/png",
                                'STYLES':''
                            },
                        })
                    })

                ]
            })
        ],
        // turn off the default attribution control as we will create a new one later on
        controls: ol.control.defaults({ attribution: false }),
        // make the view
        view: new ol.View({
            center: [654500, 6176450], // start center position
            zoom: 9, // start zoom level
            resolutions: myTileGridKF.getResolutions(), // use the resolutions from the tile grid
            projection: myProjection // use our custom projection defined earlier
        })
    });

    // Add additional controls to map
    map.addControl(new ol.control.ScaleLine()); // add a scale line
    map.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
    map.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution
})();
