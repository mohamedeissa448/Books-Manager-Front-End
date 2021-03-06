import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-page-login",
  templateUrl: "./page-login.component.html",
  styleUrls: ["./page-login.component.css"]
})
export class PageLoginComponent {
  invalidLogIn = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit(userData) {
    console.log("userData", userData);
    this.authService.logIn(userData).subscribe(result => {
      if (result) {
        this.router.navigate([
          this.activatedRoute.snapshot.queryParams["returnUrl"] ||
            "/dashboard/index"
        ]);
      } else {
        this.invalidLogIn = true;
      }
    });
  }
}
