import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageUsersComponent } from './manage-users/manage-users.component';

const routes: Routes = [
  {
    path: "users",
    children: [
      
      {
        path: "manage-users",
        component: ManageUsersComponent ,
        canActivate: [AuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
