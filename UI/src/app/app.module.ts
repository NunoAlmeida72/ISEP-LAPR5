import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { ListBuildingConnectionsComponent } from './Components/list-building-connections/list-building-connections.component';
import { EditBuildingConnectionsComponent } from './Components/edit-building-connections/edit-building-connections.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { LoadFloorMapComponent } from './Components/load-floor-map/load-floor-map.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { TaskbarComponent } from './Components/taskbar/taskbar.component';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { CreateRobotTypeComponent } from './Components/create-robot-type/create-robot-type.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './Components/list-buildings-by-min-max-number-of-floors/list-buildings-by-min-max-number-of-floors.component';
import { DisableRobotComponent } from './Components/disable-robot/disable-robot.component';
import { ListRobotsTaskDesignationComponent } from './Components/list-robots-task-designation/list-robots-task-designation.component';
import { EditBuildingComponent } from './Components/edit-building/edit-building.component';
import { HomeComponent } from './Components/home/home.component';
import { SystemInfoComponent } from './Components/system-info/system-info.component';
import { PathBetweenBuildingsComponent } from './Components/path-between-buildings/path-between-buildings.component';
import { ViewFloorComponent } from './Components/view-floor/view-floor.component';
import { TaskRobotTypeComponent } from './Components/task-robot-type/task-robot-type.component';
import { ListAcceptOrRefuseRequestsComponent } from './Components/list-accept-or-refuse-requests/list-accept-or-refuse-requests.component';
import { ListTaskExecutionComponent } from './Components/list-task-execution/list-task-execution.component';
import { CreateTaskRequestComponent } from './Components/create-task-request/create-task-request.component';
import { AuthInterceptor } from './auth-interceptor';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { ListTaskRequestsComponent } from './Components/list-task-requests/list-task-requests.component';
import { CreateRoleComponent } from './Components/create-role/create-role.component';
import { UserComponent } from './Components/user/user.component';
import { PrivacyPolicyComponent } from './Components/privacy-policy/privacy-policy.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { AcceptOrRefuseUserRegistrationComponent } from './Components/accept-or-refuse-user-registration/accept-or-refuse-user-registration.component';
import { UserGetDataComponent } from './Components/user-get-data/user-get-data.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBuildingComponent,
    ListBuildingsComponent,
    EditBuildingComponent,
    CreateFloorComponent,
    LoginComponent,
    ListFloorsComponent,
    ListFloorsWithConnectionsComponent,
    EditFloorsComponent,
    CreateBuildingConnectionComponent,
    ListBuildingConnectionsComponent,
    EditBuildingConnectionsComponent,
    CreateRoomComponent,
    CreateElevatorComponent,
    ListElevatorComponent,
    LoadFloorMapComponent,
    EditElevatorComponent,
    ListFloorsWithElevatorComponent,
    CreateRobotTypeComponent,
    CreateRobotComponent,
    DisableRobotComponent,
    ListRobotsComponent,
    ListRobotsTaskDesignationComponent,
    TaskbarComponent,
    ListBuildingsByMinMaxNumberOfFloorsComponent,
    HomeComponent,
    SystemInfoComponent,
    PathBetweenBuildingsComponent,
    ViewFloorComponent,
    TaskRobotTypeComponent,
    ListAcceptOrRefuseRequestsComponent,
    ListTaskExecutionComponent,
    CreateTaskRequestComponent,
    CreateUserComponent,
    RegisterUserComponent,
    ListTaskRequestsComponent,
    CreateRoleComponent,
    UserComponent,
    PrivacyPolicyComponent,
    EditUserComponent,
    AcceptOrRefuseUserRegistrationComponent,
    UserGetDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
