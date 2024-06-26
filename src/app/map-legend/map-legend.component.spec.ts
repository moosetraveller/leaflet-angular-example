import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLegendComponent } from './map-legend.component';
import { Layer } from 'leaflet';

describe('MapLegendComponent', () => {

  let component: MapLegendComponent;
  let fixture: ComponentFixture<MapLegendComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [MapLegendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('map is not null', () => {
    expect(component.map).toBeDefined();
  }); 

  it('map attribution has no flag', () => {
    
    const mapElement = component.mapElementRef.nativeElement;

    const flagElement = mapElement.querySelector('.leaflet-attribution-flag');

    expect(flagElement).toBeNull();

  });

  it('map has Swisstopo layer', () => {

    const map = component.map;
    const layers: Array<Layer> = [];
    map.eachLayer(layer => layers.push(layer));
    expect(layers.length).toBe(1);
    expect(layers[0]?.getAttribution?.()).toContain('swisstopo.admin.ch');

  });

});
