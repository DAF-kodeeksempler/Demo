# Fra Kortforsyningen til Datafordeleren

Dette repo er en kopi af https://github.com/Dataforsyningen/Demo , med ændrede eksempler, så de virker med datafordeleren.

AtomFeed er fjernet, da datafordeleren bruger filudtræk defineret via selvbetjeningsportalen.

okapi fra kortforsyningen virker også med Datafordeleren: https://github.com/dataforsyningen/okapi

## Eksempler
Alle eksempelfiler indeholder følgende i toppen.
```js
    // Userinformation from your Datafordeler user
    var dafusername = 'ABCDEFGHIJ'
    var dafpassword = 'Your password here!'
```
Udskift disse med dine oplysninger.

### Leaflet
* __Eksempel 1__:
  * Ændring på zoomlevel parsing ("L" behøves ikke mere)
  * ```true``` sat til ```'TRUE'``` når ```Transparent``` defineres
  * Der mangler et native transparent lag, så vi bruger leaflets opacity
  * Generel navngivning og endpoint ændringer

* __Eksempel 2__:
  * Samme som eksempel 1, når det kommer til wms services.

* __Eksempel 3__:
  * Samme som eksempel 2.
  * Datafordeleren supporter ikke et API der minder om GeoSearch fra kortforsyningen, så det er ikke implementeret.

* __Eksempel 4__:
kurt  * Import fra eksempel 1 datakilder.
  * Viser nu 2 kort, synkroniseret, så man kan se kortforsyningen i venstre side, og datafordeleren i højre.

### OpenLayers
* __Eksempel 1__:
  * Zoomlevel er ændret som i eksempel 1 for leaflet. De er hardcoded som ```0,1,2,3,...``` i ```myTileGridDAF```.
  * ```true``` sat til ```'TRUE'``` når ```TRANSPARENT``` defineres
  * Der mangler et native transparent lag, så vi bruger openlayers opacity
  * Generel navngivning og endpoint ændringer

* __Eksempel 2__:

  TODO
* __Eksempel 3__:

  TODO
* __Eksempel 4__:

  TODO
