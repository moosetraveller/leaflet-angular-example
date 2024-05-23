# Map Example

1. Create Angular app with `ng new leaflet-angular-example`
2. Install Leaflet with `npm install leaflet`
3. Install typings for Leaflet with `npm install --save-dev @types/leaflet`
4. Create a component with `ng g component map`
5. Update `app.component.html`

```html
<main>
  <router-outlet></router-outlet>  
</main>
```

6. Update `app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    { path: 'map', component: MapComponent },
    { path: '', redirectTo: '/map', pathMatch: 'full' },
];
```

7. Update `styles.scss`

```scss
body {
    height: 100vh;
    width: 100wh;
    margin: 0;
}
```

8. Update `angular.json` by adding `node_modules/leaflet/dist/leaflet.css` to `styles`

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "leaflet-angular-example": {
      // ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            // ...
            "styles": [
              "src/styles.scss",
              "node_modules/leaflet/dist/leaflet.css"  // <-- add this line
            ],
            // ...
```

9. Update `map.component.html`

```html
<div id="map" #map>
</div>
```

10. Update `map.component.scss`

```scss
#map {
    height: 100vh;
    width: 100vw;
}
```

11. Update `map.component.ts`

```typescript
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
```