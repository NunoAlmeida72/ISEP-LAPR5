import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRobotsComponent } from './list-robots.component';
import { RobotService } from 'src/app/Services/robot.service';
import { Robot } from 'src/app/Interfaces/robot';
import { of } from 'rxjs';

describe('ListRobotsComponent', () => {
    let component: ListRobotsComponent;
    let fixture: ComponentFixture<ListRobotsComponent>;
    let robotService: RobotService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListRobotsComponent],
            providers: [RobotService]
        });
        fixture = TestBed.createComponent(ListRobotsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call getRobots method and populate robots array', () => {
        const robotsList: Robot[] = [
          { /* Robot 1 data */ },
          { /* Robot 2 data */ },
          // ... more robots
        ];
    
        spyOn(robotService, 'getRobots').and.returnValue(of(robotsList));
    
        component.getRobots();
    
        expect(robotService.getRobots).calledOnce;
        expect(component.robots).equal(robotsList);
      });

});