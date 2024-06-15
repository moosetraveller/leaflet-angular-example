import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import * as L from 'leaflet';

import { GeoJSON } from 'geojson';
import { PinIcon, createPinIconHtml, pinIcon } from '../leaflet.extension';

const AIRPORTS: GeoJSON =  
{
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    6.108900000000062,
                    46.238060000000075
                ]
            },
            properties: {
                nameshort: "Geneva Cointrin",
                namelong: "Geneva International",
                city: "Geneva",
                iata: "GVA"
            }
        },
        {
          type: "Feature",
          geometry: {
              type: "Point",
              coordinates: [
                    8.548114299000076,
                    47.45814221400008
                ]
            },
            properties: {
                nameshort: "Zurich",
                namelong: "Zurich Airport",
                city: "Zurich",
                iata: "ZRH"
            }
        }
    ]
};

@Component({
  selector: 'app-map-popup-link',
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
export class MapPopupLinkComponent {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  map: L.Map = null!;

  private _ngZone = inject(NgZone);
  private _router = inject(Router);

  ngAfterViewInit(): void {

    this.map = L.map(this.mapElementRef.nativeElement)
      .setView([47.374444, 8.541111], 10);

    this.map.attributionControl
      .setPrefix('<a href="https://leafletjs.com/">Leaflet</a>');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    // simple marker
    
    let marker = L.marker([47.374444, 8.541111]).addTo(this.map);

    const popupTemplate = document.createElement('template')
    popupTemplate.innerHTML = `
      <div>Welcome to Zurich</div>
      <!-- class map-popup-link needs to be defined in styles.scss ! -->
      <div><a data-route="/map-simple" class="map-popup-link">Go to Simple Map Example</a></div>
      <div><a data-log-message="Hi" class="map-popup-link">Say Hi on the Console</a></div>
    `;
    
    // how to navigate and use component functions within a Leaflet popup
    this._ngZone.runOutsideAngular(() => {

      marker.bindPopup(() => {
    
        const popupElement = popupTemplate.content.cloneNode(true) as HTMLElement;
    
        popupElement.querySelector('a[data-route]')
          ?.addEventListener('click', (event) => {
            this._ngZone.run(() => {
              const route = (event.target as HTMLElement).dataset['route'] as string;
              this._router.navigateByUrl(route);
            });
          });
    
        popupElement.querySelector('a[data-log-message]')
          ?.addEventListener('click', (event) => {
            this._ngZone.run(() => {
              const message = (event.target as HTMLElement).dataset['logMessage'] as string;
              this._print(message);
            });
          });

        return popupElement;

      });

    });

    // multiple marker with state

    L.geoJSON(AIRPORTS, {
      pointToLayer: (_, point) => {
        const marker = L.marker(point, {
          icon: pinIcon({
            color: '#cd5b45',
          })
        });
        marker.on('click', () => {
          const icon = marker.getIcon() as PinIcon;
          const randomColor = `#${Math.random().toString(16).slice(-6)}`;
          const iconElement = marker.getElement();
          iconElement!.innerHTML = createPinIconHtml(randomColor);
        });
        return marker;
      }
    }).addTo(this.map);
    

  }

  private _print(message: string) {
    console.log(message);
  }

}
