import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisableRobotComponent } from './disable-robot.component';
import { RobotService } from 'src/app/Services/robot.service';
import { Robot } from 'src/app/Interfaces/robot';
import { of } from 'rxjs';

describe('DisableRobotComponent', () => {
    let component: DisableRobotComponent;
    let fixture: ComponentFixture<DisableRobotComponent>;
    let robotService: RobotService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DisableRobotComponent],
            providers:[RobotService]
        });
        fixture = TestBed.createComponent(DisableRobotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call disableRobot method with correct data', () => {
        const disabledRobot: Robot = {
            code: '1213',
            name: 'robot-A',
            robotTypeId: '123',
            number: '5',
            description: 'A flying robot'
        };
    
        spyOn(robotService, 'disableRobot').and.returnValue(of(disabledRobot));
    
        component.robot = disabledRobot;
    
        component.disableRobot();
    
        expect(robotService.disableRobot).calledOnce;
      });

});