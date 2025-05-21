import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFloorComponent } from './view-floor.component';

describe('BuildingViewerComponent', () => {
  let component: ViewFloorComponent;
  let fixture: ComponentFixture<ViewFloorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFloorComponent]
    });
    fixture = TestBed.createComponent(ViewFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
