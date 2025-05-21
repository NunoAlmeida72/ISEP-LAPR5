import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Interfaces/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  createTask(task: Task):Observable<Task>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Task>(
      this.url+":4000/api/robot-type-tasks",
      task,
      httpOptions
      );
  }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(
      this.url+":4000/api/robot-type-tasks",
      {observe: 'body', responseType: 'json'}
      );
  }

  getTask(id:string):Observable<Task>{
    return this.http.get<Task>(
      this.url+":4000/api/robot-type-tasks/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

}
