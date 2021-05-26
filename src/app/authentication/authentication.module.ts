import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageLoginComponent } from "./page-login/page-login.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { routing } from "./authentication.routing";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PageLoginComponent,
    AuthenticationComponent,
  ],
  imports: [CommonModule, routing, RouterModule, FormsModule, HttpClientModule]
})
export class AuthenticationModule {}
