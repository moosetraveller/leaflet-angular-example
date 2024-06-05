import { Injectable } from "@angular/core";
import { LatLngBounds, latLngBounds } from "leaflet";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MapStateService {

    private readonly _mapBounds = new BehaviorSubject<LatLngBounds>(
        // initial bounds covering Switzerland
        latLngBounds([45.398181, 5.140242], [48.230651, 11.47757])
    );

    readonly mapBounds$ = this._mapBounds.asObservable();

    changeMapBounds(bounds: LatLngBounds): void {
        this._mapBounds.next(bounds);
    }

}