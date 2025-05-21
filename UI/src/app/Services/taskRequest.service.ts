import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskRequest } from '../Interfaces/taskRequest';
import { TaskRequestsSequence } from '../Interfaces/task-requests-sequence';
import { Path } from '../Interfaces/path';


@Injectable({
  providedIn: 'root'
})
export class TaskRequestService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

    createTaskRequest(taskRequest: TaskRequest): Observable<TaskRequest> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.post<TaskRequest>(
            this.url+":5000/api/taskRequest",
            taskRequest,
            httpOptions
        );
    }

    approveOrRefuseRequest(requestId: string, status: boolean,robotId:string){
        const httpOptions = {
                headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        if(robotId===""){
            return this.http.patch<TaskRequest>(
                this.url+":5000/api/taskRequest/"+requestId+"/"+status+"/"+"",
                {},
                httpOptions
            );
        }else{
            return this.http.patch<TaskRequest>(
                this.url+":5000/api/taskRequest/"+requestId+"/"+status+"/"+robotId,
                {},
                httpOptions
            );
        }
    }

    getTaskRequests():Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest",
            {observe: 'body', responseType: 'json'}
        );
    }

    getTaskRequestsByRobotId(id:string):Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest/robotType/"+id,
            {observe: 'body', responseType: 'json'}
        );
    }

    getTaskRequestsByStatus(status:boolean):Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest/status/"+status,
            {observe: 'body', responseType: 'json'}
        );
    }

    getTaskRequestByUser(id:string):Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest/user/"+id,
            {observe: 'body', responseType: 'json'}
        );
    }

    listUnapprovedTaskRequests(): Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest/unapproved",
            {observe: 'body', responseType: 'json'}
        );
    }

    getApprovedTaskRequestsByRobot(robotId: string): Observable<TaskRequest[]>{
        return this.http.get<TaskRequest[]>(
            this.url+":5000/api/taskRequest/by-robot/"+ robotId,
            {observe: 'body', responseType: 'json'}
        );
    }

    getSequenceOfTaskRequests(id1:string|undefined):Observable<TaskRequestsSequence>{

        return this.http.get<TaskRequestsSequence>(
          this.url+":5100/api/taskRequest/sequence?id1="+id1,
          {observe: 'body', responseType: 'json'}
          );
    }

    getSequenceGenetic(id1:string|undefined):Observable<TaskRequestsSequence>{

        return this.http.get<TaskRequestsSequence>(
          this.url+":5100/api/taskRequest/genetic?id1="+id1,
          {observe: 'body', responseType: 'json'}
          );
    }

    getDFSPath(cel1:string|undefined,cel2:string|undefined,floorId:string|undefined):Observable<Path>{

        return this.http.get<Path>(
          this.url+":5100/api/dfs/path?cel1="+cel1+"&cel2="+cel2+"&floorId="+floorId,
          {observe: 'body', responseType: 'json'}
          );
    }

    deleteByUser():Observable<TaskRequest>{
        return this.http.delete<TaskRequest>(
            this.url+":5000/api/taskRequest/delete/user/tasks",
            {observe: 'body', responseType: 'json'}
            );
    }
}
