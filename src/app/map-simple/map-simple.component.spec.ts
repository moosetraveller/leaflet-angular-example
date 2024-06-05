import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSimpleComponent } from './map-simple.component';
import { Layer } from 'leaflet';

describe('MapSimpleComponent', () => {

  let component: MapSimpleComponent;
  let fixture: ComponentFixture<MapSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSimpleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapSimpleComponent);
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

  it('map has OSM layer', () => {

    const map = component.map;
    const layers: Array<Layer> = [];
    map.eachLayer(layer => layers.push(layer));
    expect(layers.length).toBe(1);
    expect(layers[0]?.getAttribution?.()).toContain('openstreetmap.org');

  });

});
