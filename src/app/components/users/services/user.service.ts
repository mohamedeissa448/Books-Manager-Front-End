import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      User_Name: new FormControl("",[Validators.required]),
      User_Password: new FormControl("",[Validators.required]),
      User_Mobile: new FormControl("",[Validators.required]),
      User_Email: new FormControl("",[Validators.required]),

    });
  }
  getAllUsers() {
    return this.http.get('http://localhost:3000/users')
  }
  addUser(newUser) {
    console.log("added", newUser);
    return this.http
      .post('http://localhost:3000/users/signup', {
        User_Name: newUser.User_Name,
        User_Password: newUser.User_Password,
        User_Mobile: newUser.User_Mobile,
        User_Email: newUser.User_Email,

      })
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }

  editUser(updatedUser,id) {
    console.log("updated", updatedUser);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .put('http://localhost:3000/users/' + id, {
        User_Name: updatedUser.User_Name,
        User_Mobile: updatedUser.User_Mobile,
        User_Email: updatedUser.User_Email,

      },{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  } 

  deleteUser(id) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .delete('http://localhost:3000/users/' + id,{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  } 
  
  changePassword(dataToSend){
    return this.http
      .put('http://localhost:3000/users/'+dataToSend._id+'/changePassword',dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );    
  }

  popualteForm(user) {
    console.log("user", user);
    this.form.setValue({
      User_Name: user.User_Name,
      User_Password: user.User_Password || "", 
      User_Mobile: user.User_Mobile || "", 
      User_Email: user.User_Email || "", 

    });
  }

}
