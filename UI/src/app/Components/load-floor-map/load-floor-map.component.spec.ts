import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFloorMapComponent } from './load-floor-map.component';

describe('LoadFloorMapComponent', () => {
  let component: LoadFloorMapComponent;
  let fixture: ComponentFixture<LoadFloorMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadFloorMapComponent]
    });
    fixture = TestBed.createComponent(LoadFloorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
