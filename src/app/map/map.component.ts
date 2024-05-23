import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  public map: Map = null!;

  ngAfterViewInit(): void {

    this.map = map(this.mapElementRef.nativeElement)
        .setView([46.801111, 8.226667], 8);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // add a link to OpenStreetMap (omitted here for shorter line width)
        attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

  }

}