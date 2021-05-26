import { AuthGuardService } from "../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';

const routes: Routes = [
  {
    path: "categories",
    children: [
      {
        path: "manage-categories",
        component: ManageCategoriesComponent ,
        canActivate: [AuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
