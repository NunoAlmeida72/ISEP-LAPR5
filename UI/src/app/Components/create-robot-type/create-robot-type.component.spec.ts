import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRobotTypeComponent } from './create-robot-type.component';
import { RobotTypeService } from 'src/app/Services/robotType.service';
import { RobotType} from 'src/app/Interfaces/robotType';
import { of } from 'rxjs';

describe('CreateRobotTypeComponent', () => {
    let component: CreateRobotTypeComponent;
    let fixture: ComponentFixture<CreateRobotTypeComponent>;
    let robotTypeService: RobotTypeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateRobotTypeComponent],
            providers:[RobotTypeService]
        });
        fixture = TestBed.createComponent(CreateRobotTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).true;
    });

    it('should call createRobotType method with correct data', () => {
        const newRobotType: RobotType = {
            type: 'robot-A',
            brand: 'Continente',
            model: 'Voador-1',
            possibleTasks: ['voar']
        };
    
        spyOn(robotTypeService, 'createRobotType').and.returnValue(of(newRobotType));
    
        component.robotType = newRobotType;
    
        component.createRobotType();
    
        expect(robotTypeService.createRobotType).calledOnce;
      });

});