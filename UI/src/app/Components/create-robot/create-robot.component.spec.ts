import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRobotComponent } from './create-robot.component';
import { RobotService } from 'src/app/Services/robot.service';
import { Robot} from 'src/app/Interfaces/robot';
import { of } from 'rxjs';


describe('CreateRobotComponent', () => {
    let component: CreateRobotComponent;
    let fixture: ComponentFixture<CreateRobotComponent>;
    let robotService: RobotService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateRobotComponent],
            providers:[RobotService]
        });
        fixture = TestBed.createComponent(CreateRobotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call createRobot method with correct data', () => {
        const newRobot: Robot = {
            code: '1213',
            name: 'robot-A',
            robotTypeId: '123',
            number: '5',
            description: 'A flying robot'
        };
    
        spyOn(robotService, 'createRobot').and.returnValue(of(newRobot));
    
        component.robot = newRobot; 
    
        component.createRobot();
    
        expect(robotService.createRobot).calledOnce;
      });

});