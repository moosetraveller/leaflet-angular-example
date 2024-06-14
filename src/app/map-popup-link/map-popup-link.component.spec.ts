import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopupLinkComponent } from './map-popup-link.component';

describe('MapPopupLinkComponent', () => {
  let component: MapPopupLinkComponent;
  let fixture: ComponentFixture<MapPopupLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPopupLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapPopupLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
