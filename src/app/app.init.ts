import * as L from 'leaflet';

export function updateLeafletDefaultMarkerIcons() {

    // fixing default paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
        iconUrl: 'assets/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    });

}