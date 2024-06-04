import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { MapLegendComponent } from './map-legend/map-legend.component';

export const routes: Routes = [
    { path: 'map', component: MapComponent },
    { path: 'map-legend', component: MapLegendComponent },
    { path: '', redirectTo: '/map', pathMatch: 'full' },
];