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
    color?: string;
}

export interface PinIcon extends L.DivIcon {
    options: PinIconOptions;
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

        options = options || {};
        options.color = options.color || '#424874';
        options.html = createPinIconHtml(options.color);

        (L.DivIcon as any).prototype.initialize.call(this, options);
        
    },

    getColor(): string {
        return this.options.color;
    },

});

export function pinIcon(options?: PinIconOptions): PinIcon {
    return new (PinIcon as any)(options) as PinIcon;
}

export interface PinIconMarkerOptions extends L.MarkerOptions {
    color?: string;
}

export interface PinIconMarker extends L.Marker {
    options: PinIconMarkerOptions;
    getColor(): string;
    setColor(color: string): void;
    setRandomColor(): void;
}

const PinIconMarker = L.Marker.extend({ 

    initialize: function(latlng: L.LatLngExpression, options?: PinIconMarkerOptions) {

        options = options || {};
        options.icon = pinIcon({ color: options.color });

        (L.Marker as any).prototype.initialize.call(this, latlng, options);

    },

    setRandomColor() {
        this.setColor(`#${Math.random().toString(16).slice(-6)}`);
    },

    setColor(color: string) {

        this.options.color = color;

        const icon = this.getIcon() as PinIcon;
        icon.options.color = color;
        icon.options.html = createPinIconHtml(color);
        
        const iconElement = this.getElement();
        iconElement!.innerHTML = icon.options.html;

    },

    getColor(): string {
        return (this.getIcon() as PinIcon).getColor();
    },

});

export function pinIconMarker(latlng: L.LatLngExpression, options?: PinIconMarkerOptions): PinIconMarker {
    return new (PinIconMarker as any)(latlng, options) as PinIconMarker;
}

