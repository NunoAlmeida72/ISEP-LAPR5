import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Room } from '../Interfaces/room';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  createRoom(room: Room):Observable<Room>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<Room>(
      this.url+":4000/api/rooms",
      room,
      httpOptions
      );
  }

  listRoomsByFloorId(floorId:string | undefined):Observable<Room[]>{
    return this.http.get<Room[]>(
      this.url+":4000/api/rooms/"+floorId,
      {observe: 'body', responseType: 'json'}
      );
  }

  listRooms():Observable<Room[]>{ 
    return this.http.get<Room[]>(
      this.url+":4000/api/rooms",
      {observe: 'body', responseType: 'json'}
      );
  }

}