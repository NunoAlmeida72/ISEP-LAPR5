import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Floor } from '../Interfaces/floor';
import { Map } from '../Interfaces/map';


@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'
   

  createFloor(floor: Floor):Observable<Floor>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Floor>(
      this.url+":4000/api/floors",
      floor,
      httpOptions
      );
  }

  getFloors(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      this.url+":4000/api/floors/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  getFloorsWithConnections(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      this.url+":4000/api/floors/withConnections/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  getFloorsWithElevator(id:string|undefined):Observable<Floor[]>{
    return this.http.get<Floor[]>(
      this.url+":4000/api/floors/buildings/elevator/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  updateAllFloor(floor:Floor){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.put<Floor>(
      this.url+":4000/api/floors",
      floor,
      httpOptions
      );
  }

  updateFloor(floor:Floor){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<Floor>(
      this.url+":4000/api/floors",
      floor,
      httpOptions
      );
  }

  loadMap(json:any){
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<Floor>(
      this.url+":4000/api/floors/load-maps",
      json,
      httpOptions
      );
  }

  /*getMaps():Observable<Map[]>{
    return this.http.get<Map[]>(
      this.url+":4000/api/floors/maps/get-all",
      {observe: 'body', responseType: 'json'}
      );
  }*/

  async getMaps():Promise<Map[]|undefined>{
      return this.http.get<Map[]>(
        this.url+":4000/api/floors/maps/get-all",
        {observe: 'body', responseType: 'json'}
        ).toPromise();
  }
}
