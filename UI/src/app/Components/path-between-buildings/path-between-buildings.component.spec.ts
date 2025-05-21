import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathBetweenBuildingsComponent } from './path-between-buildings.component';

describe('PathBetweenBuildingsComponent', () => {
  let component: PathBetweenBuildingsComponent;
  let fixture: ComponentFixture<PathBetweenBuildingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathBetweenBuildingsComponent]
    });
    fixture = TestBed.createComponent(PathBetweenBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
