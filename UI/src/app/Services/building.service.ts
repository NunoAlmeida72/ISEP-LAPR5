import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Building} from '../Interfaces/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url="http://localhost"
  

  createBuilding(building: Building):Observable<Building>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<Building>(
      this.url+":4000/api/buildings",
      building,
      httpOptions
    );
  }

  updateAllBuilding(building: Building):Observable<Building>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.put<Building>(
      this.url+":4000/api/buildings",
      building,
      httpOptions
    );
  }


  updateBuilding(building: Building):Observable<Building>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.patch<Building>(
      this.url+":4000/api/buildings",
      building,
      httpOptions
    );
  }

  getBuildings():Observable<Building[]>{
    return this.http.get<Building[]>(
      this.url+":4000/api/buildings",
      {observe: 'body', responseType: 'json'}
      );
  }

  getBuildingByMinMaxFloors(min: number, max: number):Observable<Building[]>{
    return this.http.get<Building[]>(
      this.url+":4000/api/buildings/inFloorLimit/" + min + "/" + max,
      {observe: 'body', responseType: 'json'}
      );
  }
}
