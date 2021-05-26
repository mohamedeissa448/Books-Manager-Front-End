import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  logIn(userData) {
    console.log(userData);
    return this.http
      .post('http://localhost:3000/users/login', userData)
      .pipe(
        map((response: any) => {
          console.log("response from server ", response);
          if (response && response.token) {
            localStorage.setItem("token", response.token);
            return true;
          }
          return false;
        })
      );
  }
  logOut() {
    this.router.navigate(["/authentication/page-login"]);
    localStorage.removeItem("token");
  }
  isLogedIn() {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return true
  }
  get currentUser():any {
    let token = localStorage.getItem("token");
    if (!token) return null;
    const help = new JwtHelperService();
    const user = help.decodeToken(token);
    //console.log("user",user)
    return user;  
  }
}
