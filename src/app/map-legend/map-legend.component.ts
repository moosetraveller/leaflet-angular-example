import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Bounds, LatLngBounds, Map, control, map, tileLayer } from 'leaflet';
import { MapStateService } from '../map-state.service';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: '<div id="map" #map></div>',
  styles: `
    #map {
      height: calc(100vh - var(--header-height));
      width: 100vw;
    }
  `,
})
export class MapLegendComponent implements AfterViewInit {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  map: Map = null!;

  private _mapStateService = inject(MapStateService);

  ngAfterViewInit(): void {

    this.map = map(this.mapElementRef.nativeElement)
      .setView([46.801111, 8.226667], 8);

    this.map.attributionControl
      .setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');

    const osm = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const swisstopo = tileLayer('https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg', {
        attribution: '&copy; <a href="https://www.swisstopo.admin.ch/">swisstopo</a>',
        minZoom: 2,
        maxZoom: 18,
        bounds: [[45.398181, 5.140242], [48.230651, 11.47757]]
    }).addTo(this.map);

    control.layers({'OpenStreetMap': osm, 'Swisstopo': swisstopo}).addTo(this.map);

  }

}