import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRobotTypeComponent } from './task-robot-type.component';

describe('TaskbarComponent', () => {
  let component: TaskRobotTypeComponent;
  let fixture: ComponentFixture<TaskRobotTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskRobotTypeComponent]
    });
    fixture = TestBed.createComponent(TaskRobotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
