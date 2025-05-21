import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit{
  campus=false;
  frota=false;
  admin=false;
  authed=false;
  task=false;

  constructor(private authService:AuthService){}
  
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.authed = isAuthenticated;
      if(this.authed===true){
        if(this.authService.hasRole("Admin")){
          this.campus=true;
          this.frota=true;
          this.admin=true;
          this.task=true;
        }else if(this.authService.hasRole("Campus Manager")){
          this.campus=true;
          this.frota=false;
          this.admin=false;
          this.task=false;
        }else if(this.authService.hasRole("Fleet Manager")){
          this.campus=false;
          this.frota=true;
          this.admin=false;
          this.task=false;
        }else if(this.authService.hasRole("Task Manager")){
          this.campus=false;
          this.frota=false;
          this.admin=false;
          this.task=true;
        }else{
          this.campus=false;
          this.frota=false;
          this.admin=false;
          this.task=false;
        }
      }else{
        this.campus=false;
          this.frota=false;
          this.admin=false;
          this.task=false;
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
