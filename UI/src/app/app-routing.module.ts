import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { ListBuildingConnectionsComponent } from './Components/list-building-connections/list-building-connections.component';
import { EditBuildingConnectionsComponent } from './Components/edit-building-connections/edit-building-connections.component';
import { LoginComponent } from './Components/login/login.component';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { LoadFloorMapComponent } from './Components/load-floor-map/load-floor-map.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './Components/list-buildings-by-min-max-number-of-floors/list-buildings-by-min-max-number-of-floors.component';
import { CreateRobotTypeComponent } from './Components/create-robot-type/create-robot-type.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { DisableRobotComponent } from './Components/disable-robot/disable-robot.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';
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
import { AuthGuard } from './auth-guard';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { ListTaskRequestsComponent } from './Components/list-task-requests/list-task-requests.component';
import { CreateRoleComponent } from './Components/create-role/create-role.component';
import { UserComponent } from './Components/user/user.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { PrivacyPolicyComponent } from './Components/privacy-policy/privacy-policy.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { AcceptOrRefuseUserRegistrationComponent } from './Components/accept-or-refuse-user-registration/accept-or-refuse-user-registration.component';
import { UserGetDataComponent } from './Components/user-get-data/user-get-data.component';

const routes: Routes = [
  {path:"me",component:UserComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager','Task Manager','User','Fleet Manager']}},
  {path:"system", component:SystemInfoComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin']}},
  {path:"accept-refuser-user-registration",component:AcceptOrRefuseUserRegistrationComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin']}},
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent}, 
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'create-building', component: CreateBuildingComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'edit-building', component: EditBuildingComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-buildings', component: ListBuildingsComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-buildings-by-min-max-number-of-floors', component: ListBuildingsByMinMaxNumberOfFloorsComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-floors', component: ListFloorsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-floors-with-connections', component: ListFloorsWithConnectionsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-floors-with-elevator', component: ListFloorsWithElevatorComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'edit-floor', component: EditFloorsComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'load-floor-map', component: LoadFloorMapComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'create-elevator', component: CreateElevatorComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-elevator', component: ListElevatorComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']} },
  { path: 'edit-elevator', component: EditElevatorComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'create-floor', component: CreateFloorComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'create-building-connection', component: CreateBuildingConnectionComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'list-building-connections', component: ListBuildingConnectionsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'edit-building-connections', component: EditBuildingConnectionsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'create-room', component: CreateRoomComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager']}},
  { path: 'create-robot-type', component: CreateRobotTypeComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  { path: 'create-robot', component: CreateRobotComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  { path: 'disable-robot', component: DisableRobotComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  { path: 'list-robots', component: ListRobotsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  { path: 'list-robots-task-designation', component: ListRobotsTaskDesignationComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  {path:"path-campus",component:PathBetweenBuildingsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager','Fleet Manager']}},
  {path:"view-floor",component:ViewFloorComponent,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager','Fleet Manager']}},
  {path:"create-task-robot-type",component:TaskRobotTypeComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Fleet Manager']}},
  {path: 'list-accept-or-refuse-requests', component: ListAcceptOrRefuseRequestsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin']}},
  {path: 'list-task-execution', component: ListTaskExecutionComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin', 'Task Manager']}},
  {path: 'create-task-request', component: CreateTaskRequestComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Campus Manager','Task Manager','User','Fleet Manager']}},
  {path: 'create-user', component: CreateUserComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin']}},
  {path: 'list-task-requests', component: ListTaskRequestsComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','Task Manager']}},
  {path: 'create-role', component: CreateRoleComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin']}},
  {path: 'edit-user', component: EditUserComponent ,canActivate:[AuthGuard],data:{expectedRoles: ['Admin','User']}},
  {path: 'user-get-data', component: UserGetDataComponent, canActivate:[AuthGuard],data:{expectedRoles: ['Admin', 'User']}},
  { path: '',component:HomeComponent },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
