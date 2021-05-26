import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Category_Name: new FormControl("",[Validators.required]),
      Category_Description: new FormControl("",[Validators.required]),
      
    });
  }

  getCategories() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http.get('http://localhost:3000/categories',{headers: headers})
  }

  addCategory(category) {
    console.log("added", category);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .post('http://localhost:3000/categories', {
        Category_Name: category.Category_Name,
        Category_Description: category.Category_Description,

      },{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }


  editCategory(updatedCategory,id) {
    console.log("updated", updatedCategory);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .put('http://localhost:3000/categories/' + id, {
        Category_Name: updatedCategory.Category_Name,
        Category_Description: updatedCategory.Category_Description,

      },{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }

  deleteCategory(id) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .delete('http://localhost:3000/categories/' + id,{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }

  popualteForm(category) {
    console.log("category", category);
    this.form.setValue({
      Category_Name  : category.Category_Name ,
      Category_Description    : category.Category_Description ,
    });
  }
}
