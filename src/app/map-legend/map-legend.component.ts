import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, control, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map-legend.component.html',
  styleUrl: './map-legend.component.scss'
})
export class MapLegendComponent implements AfterViewInit {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  public map: Map = null!;

  ngAfterViewInit(): void {

    this.map = map(this.mapElementRef.nativeElement)
        .setView([46.801111, 8.226667], 9);

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