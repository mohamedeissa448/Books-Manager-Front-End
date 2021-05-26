import { AuthGuardService } from "../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageBooksComponent } from './manage-books/manage-books.component';

const routes: Routes = [
  {
    path: "books",
    children: [
      
      {
        path: "manage-books",
        component: ManageBooksComponent ,
        canActivate: [AuthGuardService]
      },
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
