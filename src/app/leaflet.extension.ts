import * as L from 'leaflet';

export function initLeaflet() {
    updateLeafletDefaultMarkerIcons();
}

function updateLeafletDefaultMarkerIcons() {

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
        iconUrl: 'assets/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    });

}

export interface PinIconOptions extends L.DivIconOptions {
    color: string;
}

export interface PinIcon extends L.DivIcon {
    getColor(): string;
}

export function createPinIconHtml(color: string): string {
    return `<span class="map-marker" 
                  style="--map-marker-color: ${color};" />`;
}

const PinIcon = L.DivIcon.extend({ 

    options: {
        className: "marker-container",
        iconAnchor: [0, 24],
        popupAnchor: [0, -36],
    },

    initialize: function(options?: PinIconOptions) {
        (L.DivIcon as any).prototype.initialize.call(this, options);
        this._setColor(options?.color || '#424874');
    },

    _setColor(color: string) {
        this._color = color;
        this.options.html = createPinIconHtml(color);
    },

    getColor(): string {
        return this._color;
    },

});

export function pinIcon(options?: PinIconOptions): PinIcon {
    return new (PinIcon as any)(options) as PinIcon;
}

