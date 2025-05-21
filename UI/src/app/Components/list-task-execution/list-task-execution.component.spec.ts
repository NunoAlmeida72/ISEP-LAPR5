import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTaskExecutionComponent } from './list-task-execution.component';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { RobotType } from 'src/app/Interfaces/robotType';
import { of } from 'rxjs';

describe('ListTaskExecutionComponent', () => {
    let component: ListTaskExecutionComponent;
    let fixture: ComponentFixture<ListTaskExecutionComponent>;
    let robotTypeService: RobotTypeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListTaskExecutionComponent],
            providers: [RobotTypeService]
        });
        fixture = TestBed.createComponent(ListTaskExecutionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });
    
    
});