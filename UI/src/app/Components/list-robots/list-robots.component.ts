import { Component, OnInit } from '@angular/core';
import { Observable,of ,tap,catchError} from 'rxjs';
import { Robot } from 'src/app/Interfaces/robot';
import { RobotService } from 'src/app/Services/robot.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-robots',
  templateUrl: './list-robots.component.html',
  styleUrls: ['./list-robots.component.css']
})
export class ListRobotsComponent implements OnInit {
  isLinear=true;

  robots?:Robot[];

  constructor(private robotService:RobotService,private _snackBar:MatSnackBar,private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.getRobots();
  }

  getRobots() {
    this.robotService.getRobots().subscribe(robots => this.robots=robots);
  }

  
}
