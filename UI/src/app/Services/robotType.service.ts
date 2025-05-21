import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RobotType } from '../Interfaces/robotType';
import { RobotTypeTask } from '../Interfaces/robot-type-task';

@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  createRobotType(robotType: RobotType):Observable<RobotType>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<RobotType>(
      this.url+":4000/api/robotTypes",
      robotType,
      httpOptions
    );
  }

  getRobotTypes():Observable<RobotType[]>{
    return this.http.get<RobotType[]>(
      this.url+":4000/api/robotTypes",
      {observe: 'body', responseType: 'json'}
      );
  }

  createTask(task:RobotTypeTask):Observable<RobotTypeTask>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<RobotTypeTask>(
      this.url+":4000/api/robot-type-tasks",
      task,
      httpOptions
    );
  }
}
