import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Robot} from '../Interfaces/robot';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  createRobot(robot: Robot):Observable<Robot>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<Robot>(
      this.url+":4000/api/robots",
      robot,
      httpOptions
    );
  }

  disableRobot(robot:Robot):Observable<Robot>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.patch<Robot>(
      this.url+":4000/api/robots/disable",
      robot,
      httpOptions
    );
  }

  getRobots():Observable<Robot[]>{
    return this.http.get<Robot[]>(
      this.url+":4000/api/robots",
      {observe: 'body', responseType: 'json'}
      );
  }

  getNames():Observable<string[]>{
    return this.http.get<string[]>(
      this.url+":4000/api/robots/designation/",
      {observe: 'body', responseType: 'json'}
      );
  }

  getRobotsByTaskOrDesignation(taskOrDesignation:String):Observable<Robot[]>{
    return this.http.get<Robot[]>(
      this.url+":4000/api/robots/taskOrDesignation/"+taskOrDesignation,
      {observe: 'body', responseType: 'json'}
      );
  }
}
