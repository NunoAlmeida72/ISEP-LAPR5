import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  getById(id:string):Observable<User>{
    return this.http.get<User>(
      this.url+":4001/api/auth/get/user/"+id,
      {observe: 'body', responseType: 'json'}
      );
  }

  getUserRequests():Observable<User[]>{
    return this.http.get<User[]>(
      this.url+":4001/api/auth/get/waiting/decision/users/",
      {observe: 'body', responseType: 'json'}
      );
  }

  acceptUser(id:string):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<User>(
      this.url+":4001/api/auth/users/accept-registration/"+id,
      httpOptions
      );
  }

  rejectUser(id:string):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.patch<User>(
      this.url+":4001/api/auth/users/reject-registration/"+id,
      httpOptions
      );
  }

  createUser(user:User):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
      };
    return this.http.post<User>(
      this.url+":4001/api/auth/users/create",
      user,
      httpOptions
      );
  }

  getUsersWithRole(role:String):Observable<User[]>{
    return this.http.get<User[]>(
      this.url+":4001/api/auth/users/roles/"+role,
      {observe: 'body', responseType: 'json'}
      );
}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(
      this.url+":4001/api/auth/all/users/",
      {observe: 'body', responseType: 'json'}
      );
  }
  signUp(user:User):Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.post<User>(
      this.url+":4001/api/auth/signup",
      user,
      httpOptions
    );
    }
    

  getMe():Observable<User>{
    return this.http.get<User>(
      this.url+":4001/api/auth/me",
      {observe: 'body', responseType: 'json'}
      );
  }

  deleteUser():Observable<any>{
    return this.http.delete<any>(
      this.url+":4001/api/auth/delete/account/me",
      {observe: 'body', responseType: 'json'}
      );
  }

  editUserAll(user:User):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.put<User>(
      this.url+":4001/api/auth/updateUser",
      user,
      httpOptions
    );
  }

  editUser(user:User):Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    return this.http.patch<User>(
      this.url+":4001/api/auth/updateUser",
      user,
      httpOptions
    );
  }
}