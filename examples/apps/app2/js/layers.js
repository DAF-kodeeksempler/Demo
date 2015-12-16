if (typeof VisStedet == 'undefined') {
	VisStedet = {};
}
if (typeof VisStedet.App == 'undefined') {
	VisStedet.App = {};
}

VisStedet.App.LAYERS = {
//		1. Flyfoto
		"ortofoto": {
	        title: "Ortofoto - for�r",
	        text: "Flyfotos optaget i forbindelse med FOT-kortl�gningen. Hvert �r d�kkes 1/3 � 2/3 af landet. Billederne bliver taget om for�ret fra midten af marts til starten af maj og er efterf�lgende geometrisk oprettede og sat sammen.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map1_small.png",
	        smallImg: "img/map1_small.png",
	        layers: [
	            {
	                type: "WMTS", name: "Ortofoto - for�r", url: "http://services.kortforsyningen.dk/orto_foraar",
	                params: {
	                    service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
	                    layer: 'orto_foraar', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
	                    matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp'
	                }
	            }
		    ]
	    },
//		2. Flyfoto og matrikelkort
	    "matrikler_ortofoto": {
	        title: "Matrikler p� Ortofoto - for�r",
	        text: "En kombination af Matrikelkortet og Flyfoto der viser hvordan ejendomskellene er placeret i forhold til hinanden i en topografisk sammenh�ng.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map2_small.png",
	        smallImg: "img/map2_small.png",
	        layers: [
			    {
	                type: "WMS", name: "Matrikler", url: "http://services.kortforsyningen.dk/mat",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'Jordstykke',
						styles: 'Gule_Jordstykker',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: false, 
	                    requestEncoding: 'kvp'
	                }
	            },
			    {
	                type: "WMTS", name: "Ortofoto - for�r", url: "http://services.kortforsyningen.dk/orto_foraar",
	                params: {
	                    service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
	                    layer: 'orto_foraar', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
	                    matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp'
	                  
	                    
	                }
	            }
	        ]
	    },
//		3. Sk�rmkort
	    "skaermkort": {
	        title: "Sk�rmkort",
	        text: "Topografisk kort over Danmark som er designet til visning p� sk�rm. Kortet har zoomfunktion som �s�ml�st� g�r p� tv�rs af m�lestoksforhold.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map3_small.png",
	        smallImg: "img/map3_small.png",
	        layers: [
			    {
			        type: "WMTS", name: "Sk�rmkort", url: "http://services.kortforsyningen.dk/topo_skaermkort",
			        params: {
			            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
			            layer: 'dtk_skaermkort', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
			            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
			            transparent: true, ticket: ""
			        },
			        options: {
			            isBaseLayer: true, requestEncoding: 'kvp'
			        }
			    }
	        ]
	    },
//		4. Sk�rmkort + matrikelkort
	    "matrikler": {
	        title: "Matrikler p� sk�rmkort",
	        text: "Kombination af Matrikelkortet og Sk�rmkort, der viser hvordan ejendomskellene er placeret i forhold til hinanden i en topografisk sammenh�ng.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map4_small.png",
	        smallImg: "img/map4_small.png",
	        layers: [
	            {
	                type: "WMS", name: "Matrikler", url: "http://services.kortforsyningen.dk/mat",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'Jordstykke',
						styles: 'Sorte_Jordstykker',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: false, requestEncoding: 'kvp'
	                }
	            },
			    {
			        type: "WMTS", name: "Sk�rmkort", url: "http://services.kortforsyningen.dk/topo_skaermkort",
			        params: {
			            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
			            layer: 'dtk_skaermkort', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
			            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12;L13', info_format: 'text/plain',
			            transparent: true, ticket: ""
			        },
			        options: {
			            isBaseLayer: true, requestEncoding: 'kvp'
			        }
			    }
		    ]
	    },
//	    5. Kort50 ----------------------------------------- RET LINK OG LAYERS ---------------------------------------------
	    "kort50": {
	        title: "Kort 50",
	        text: "Topografisk kort over Danmark i m�lestoksforholdet 1:50.000.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map5_small.png",
	        smallImg: "img/map5_small.png",
	        layers: [
	            {
	                type: "WMS", name: "Kort 50", url: "http://services.kortforsyningen.dk/topo50",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'dtk_2cm',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp',
	                    resolutions: [3.2, 6.4, 12.8, 25.6, 51.2, 102.4, 204.8, 409.6, 819.2, 1638.4],
	                    numZoomLevels: 10
	                }
	            }
		    ]
	    },
//	    6. Kort100 ----------------------------------------- RET LINK OG LAYERS ---------------------------------------------
	    "kort100": {
	        title: "Kort 100",
	        text: "Topografisk kort over Danmark i m�lestoksforholdet 1:100.000.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map6_small.png",
	        smallImg: "img/map6_small.png",
	        layers: [
	            {
	                type: "WMS", name: "Kort 100", url: "http://services.kortforsyningen.dk/topo100",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'dtk_1cm',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp',
	                    resolutions: [6.4, 12.8, 25.6, 51.2, 102.4, 204.8, 409.6, 819.2, 1638.4],
	                    numZoomLevels: 9
	                }
	            }
		    ]
	    },
//	    7. Kort25 + DHM/Skyggekort
	    "skyggekort_dtk_kort25": {
	        title: "Skyggekort p� DTK/Kort25",
	        text: "Kombination af et topografisk kort over Danmark i m�lestoksforholdet 1:25.000 med et skyggekort, der fremh�ver landskabets h�jdeforskelle. Skyggekortet er baseret p� Danmarks H�jdemodel.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map7_small.png",
	        smallImg: "img/map7_small.png",
	        layers: [
				{
			        type: "WMTS", name: "Hill shade", url: "http://services.kortforsyningen.dk/dhm",
			        params: {
			            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
			            layer: 'hillshade_1_6m', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
			            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11', info_format: 'text/plain',
			            transparent: true, ticket: ""
			        },
			        options: {
			            isBaseLayer: false, opacity: 0.3, requestEncoding: 'kvp'
			        }
			    },
				{
	                type: "WMS", name: "DTK/Kort25", url: "http://services.kortforsyningen.dk/topo25",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'topo25_klassisk', 
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp'
	                }
	            }
		    ]
	    }, 
//	    8. H�je m�lebordsblade
	    "hoeje_maalebord": {
	        title: "H�je m�lebordsblade (opm�lt 1862-1899)",
	        text: "Topografiske kort i m�lestoksforholdet 1:20.000 udgivet i anden halvdel af 1800-tallet d�kkende Danmark minus Slesvig. De enkelte kortblade �st�r p� h�jkant�, deraf navnet.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map8_small.png",
	        smallImg: "img/map8_small.png",
	        layers: [
	            {
	                type: "WMS", name: "H�je m�lebordsblade", url: "http://services.kortforsyningen.dk/topo20_hoeje_maalebordsblade",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'dtk_hoeje_maalebordsblade',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp'
	                }
	            }
		    ]
	    }, 
//	    9. DTK/Lave m�lebordsblade
	    "lave_maalebord": {
	        title: "Lave m�lebordsblade (opm�lt 1928-1945)",
	        text: "Topografiske kort i m�lestoksforholdet 1:20.000 udgivet i perioden 1901-1971 d�kkende Danmark. De enkelte kortblade �ligger ned�, deraf navnet.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map9_small.png",
	        smallImg: "img/map9_small.png",
	        layers: [
	            {
	                type: "WMS", name: "Lave m�lebordsblade", url: "http://services.kortforsyningen.dk/topo20_lave_maalebordsblade",
	                params: {
	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	                    layers: 'dtk_lave_maalebordsblade',
	                    transparent: true, ticket: ""
	                },
	                options: {
	                    isBaseLayer: true, requestEncoding: 'kvp'
	                }
	            }
		    ]
	    },
	    
//	    10. Matrikelkort 
	    "matrikelkort": {
	        title: "Matrikelkort",
	        text: "Kort der viser ejendomsforholdene i Danmark. Kortet viser hvordan ejendomsskellene er placeret i forhold til hinanden og ajourf�res l�bende p� baggrund af oplysninger fra privatpraktiserende landinspekt�rer.",
			link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
	        largeImg: "img/map10_small.png",
	        smallImg: "img/map10_small.png",
	        layers: [
	                 {
	 	                type: "WMS", name: "Matrikler", url: "http://services.kortforsyningen.dk/mat",
	 	                params: {
	 	                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
	 	                    layers: 'Jordstykke',
	 						styles: 'Sorte_Jordstykker',
	 	                    transparent: true, ticket: ""
	 	                },
	 	                options: {
	 	                    isBaseLayer: true, requestEncoding: 'kvp'
	 	                }
	 	            }
		    ]
	    }
	
	//Disse tre skal ikke bruges eller???? ------------------------------------------------------
//	"hoejdekort_skaermkort": {
//        title: "Skyggekort p� Sk�rmkort",
//        text: "En beskrivelse af dette kort",
//		link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
//        largeImg: "img/map5.png",
//        smallImg: "img/map5.png",
//        layers: [
//		    {
//		        type: "WMTS", name: "Hill shade", url: "http://services.kortforsyningen.dk/dhm",
//		        params: {
//		            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
//		            layer: 'hillshade_1_6m', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
//		            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
//		            transparent: true, ticket: ""
//		        },
//		        options: {
//		            isBaseLayer: false, opacity: 0.3, requestEncoding: 'kvp'
//		        }
//		    },
//		    {
//		        type: "WMTS", name: "Sk�rmkort", url: "http://services.kortforsyningen.dk/topo_skaermkort",
//		        params: {
//		            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
//		            layer: 'dtk_skaermkort', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
//		            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11', info_format: 'text/plain',
//		            transparent: true, ticket: ""
//		        },
//		        options: {
//		            isBaseLayer: true, requestEncoding: 'kvp'
//		        }
//		    }
//        ]
//    },
//	"hoejdekort_ortofoto": {
//        title: "Skyggekort p� Ortofoto - for�r",
//        text: "En beskrivelse af dette kort",
//		link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
//        largeImg: "img/map6.png",
//        smallImg: "img/map6.png",
//        layers: [
//		    {
//		        type: "WMTS", name: "Hill shade", url: "http://services.kortforsyningen.dk/dhm",
//		        params: {
//		            service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
//		            layer: 'hillshade_1_6m', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
//		            matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
//		            transparent: true, ticket: ""
//		        },
//		        options: {
//		            isBaseLayer: false, opacity: 0.3, requestEncoding: 'kvp'
//		        }
//		    },
//		    {
//                type: "WMTS", name: "Ortofoto - for�r", url: "http://services.kortforsyningen.dk/orto_foraar",
//                params: {
//                    service: 'WMTS', version: '1.0.0', request: 'GetTile', format: 'image/jpeg',
//                    layer: 'orto_foraar', style: 'default', BGCOLOR: '0xDCF0F9', matrixSet: 'View1',
//                    matrixIds: 'L00,L01,L02,L03,L04,L05,L06,L07,L08,L09,L10,L11,L12,L13', info_format: 'text/plain',
//                    transparent: true, ticket: ""
//                },
//                options: {
//                    isBaseLayer: true, requestEncoding: 'kvp'
//                }
//            }
//        ]
//    },
//    "dtk_kort25": {
//        title: "DTK/Kort25",
//        text: "En beskrivelse af dette kort",
//		link: "http://www.geodata-info.dk/Portal/ShowMetadata.aspx?id=127149f7-978c-4971-a4cb-85dd963ce559",
//        largeImg: "img/map7.png",
//        smallImg: "img/map7.png",
//        layers: [
//            {
//                type: "WMS", name: "DTK/Kort25", url: "http://services.kortforsyningen.dk/topo25",
//                params: {
//                    service: 'WMS', version: '1.1.1', request: 'GetMap', format: 'image/jpeg',
//                    layers: 'topo25_klassisk', 
//                    transparent: true, ticket: ""
//                },
//                options: {
//                    isBaseLayer: true, requestEncoding: 'kvp'
//                }
//            }
//	    ]
//    }
    
    
}