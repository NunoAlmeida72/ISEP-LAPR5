import { Injectable } from '@angular/core';
import { Role } from '../Interfaces/role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  

  constructor(private  http:HttpClient) { }

  url="http://10.9.23.176";
  //url='http://localhost'

  createRole(role: Role):Observable<Role>{
    const httpOptions = {
      headers : new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
    return this.http.post<Role>(
      this.url+":4001/api/roles",
      role,
      httpOptions
    );
  }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(
      this.url+":4001/api/roles/",
      {observe: 'body', responseType: 'json'}
      );
  }

  getNonUserRoles():Observable<Role[]>{
    return this.http.get<Role[]>(
      this.url+":4001/api/roles/get/non-user",
      {observe: 'body', responseType: 'json'}
      );
  }
}
