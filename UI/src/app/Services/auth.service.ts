import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import  {Role} from '../Interfaces/role';
import  {User} from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged=new BehaviorSubject<boolean>(false);
  isAuthenticated$= this.isLogged.asObservable();  

  token: any|unknown;
  url="http://10.9.23.176";
  //url="http://localhost"

  constructor(private  http:HttpClient) {
    const local=localStorage.getItem("token");
    if(local){
      const {token,expiration}=JSON.parse(local);
      const now=new Date();
      if(now.getTime()>expiration){
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.isLogged=new BehaviorSubject<boolean>(false);
        this.isAuthenticated$=this.isLogged.asObservable();
      }else{
        this.isLogged=new BehaviorSubject<boolean>(true);
        this.isAuthenticated$=this.isLogged.asObservable();
      }
    }
  };

  getToken(): string | null {
    const local=localStorage.getItem("token");
    if(!local){
      return null;
    }

    const {token,expiration}=JSON.parse(local);

    return token;

  }

  login(token: any,role:string){
    const expiration=new Date().getTime() + (60*60*1000);//1 hour
    localStorage.setItem('token', JSON.stringify({token:token,expiration:expiration}));
    localStorage.setItem("role",role);
    this.isLogged.next(true);
  }

  logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem("role");
    this.isLogged.next(false);
  }

  async sign_in(user:User):Promise<any|undefined>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
      })
      };

      try{
        return await this.http.post<any>(
          this.url+":4001/api/auth/signin",
          user,
          httpOptions
        ).toPromise();
      }catch(e){
        return e;
      }
  }

  hasRole(role:string):boolean{
    if(localStorage.getItem("role")===role){
      return true;
    }
    return false;
  }
  
  async signUp(user:User): Promise<any|undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      })
    };
    try{
      return this.http.post<any>(
        this.url+":4001/api/auth/signup",
        user,
        httpOptions
      ).toPromise();
    }catch(e){
      return e;
    }
  }
}
