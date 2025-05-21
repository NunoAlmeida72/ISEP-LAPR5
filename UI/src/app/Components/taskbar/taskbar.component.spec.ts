import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbarComponent } from './taskbar.component';

describe('TaskbarComponent', () => {
  let component: TaskbarComponent;
  let fixture: ComponentFixture<TaskbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskbarComponent]
    });
    fixture = TestBed.createComponent(TaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
