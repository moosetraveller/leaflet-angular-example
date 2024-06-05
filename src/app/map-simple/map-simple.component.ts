import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map-basic',
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
export class MapSimpleComponent implements AfterViewInit {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  map: Map = null!;

  ngAfterViewInit(): void {

    this.map = map(this.mapElementRef.nativeElement)
      .setView([46.801111, 8.226667], 8);

    this.map.attributionControl
      .setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

  }

}