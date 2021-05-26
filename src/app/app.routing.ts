import { AuthGuardService } from "./authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/components/dashboard/dashboard.module").then(
        module => module.DashboardModule
      )
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        module => module.AuthenticationModule
      )
  },
  {
    path: "books",
    loadChildren: () =>
      import("../app/components/books/books.module").then(
        module => module.BooksModule
      )
  },
  {
    path: "categories",
    loadChildren: () =>
      import("../app/components/categories/categories.module").then(
        module => module.CategoriesModule
      )
  },{
    path: "users",
    loadChildren: () =>
      import("../app/components/users/manage-users.module").then(
        module => module.ManageUsersModule
      )
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
