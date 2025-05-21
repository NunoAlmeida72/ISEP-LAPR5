import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRobotsTaskDesignationComponent } from './list-robots-task-designation.component';
import { RobotService } from 'src/app/Services/robot.service';
import { Robot } from 'src/app/Interfaces/robot';
import { of } from 'rxjs';

describe('ListRobotsTaskDesignationComponent', () => {
    let component: ListRobotsTaskDesignationComponent;
    let fixture: ComponentFixture<ListRobotsTaskDesignationComponent>;
    let robotService: RobotService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListRobotsTaskDesignationComponent],
            providers: [RobotService]
        });
        fixture = TestBed.createComponent(ListRobotsTaskDesignationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });
    
    it('should call getRobotsByTaskOrDesignation method and populate robots array', () => {
        const robotsList: Robot[] = [
          { /* Robot 1 data */ },
          { /* Robot 2 data */ },
          // ... more robots
        ];
    
        spyOn(robotService, 'getRobotsByTaskOrDesignation').and.returnValue(of(robotsList));
    
        component.getRobots();
    
        expect(robotService.getRobotsByTaskOrDesignation).calledOnce;
        expect(component.robots).equal(robotsList);
      });
});