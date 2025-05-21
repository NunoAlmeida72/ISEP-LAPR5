import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Path } from '../Interfaces/path';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  getPathBetween2Buildings(id1:string|undefined,id2:string|undefined):Observable<Path>{
    
    return this.http.get<Path>(
      this.url+":5100/api/pathBuildings?id1="+id1+"&id2="+id2,
      {observe: 'body', responseType: 'json'}
      );
  }

  getPathBetween2Rooms(id1:string|undefined,id2:string|undefined):Observable<Path>{

    return this.http.get<Path>(
      this.url+":5100/api/pathRooms?id1="+id1+"&id2="+id2,
      {observe: 'body', responseType: 'json'}
      );
  }

  pathRooms(id1:string|undefined,id2:string|undefined):Observable<Path>{

    return this.http.get<Path>(
      this.url+":5100/api/path/rooms?id1="+id1+"&id2="+id2,
      {observe: 'body', responseType: 'json'}
      );
  }

}
