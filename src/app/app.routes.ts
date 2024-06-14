import { Routes } from '@angular/router';
import { MapSimpleComponent } from './map-simple/map-simple.component';
import { MapLegendComponent } from './map-legend/map-legend.component';
import { MapPopupLinkComponent } from './map-popup-link/map-popup-link.component';

export const routes: Routes = [
    { path: 'map-simple', component: MapSimpleComponent },
    { path: 'map-legend', component: MapLegendComponent },
    { path: 'map-popup-link', component: MapPopupLinkComponent },
    { path: '**', redirectTo: '/map-simple', pathMatch: 'full' },
];