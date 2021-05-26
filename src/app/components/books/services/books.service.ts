import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      Book_Serial_Number: new FormControl("",[Validators.required]),
      Book_Name: new FormControl("",[Validators.required]),
      Book_Author: new FormControl("",[Validators.required]),
      Book_Category: new FormControl(""),
      Book_Publishing_House: new FormControl(""),
      
    });
  }

  getBooks() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http.get('http://localhost:3000/books',{headers: headers})
  }

  addBook(book) {
    console.log("added", book);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .post('http://localhost:3000/books', {
        Book_Serial_Number: book.Book_Serial_Number,
        Book_Name: book.Book_Name,
        Book_Author: book.Book_Author,
        Book_Category: book.Book_Category,
        Book_Publishing_House: book.Book_Publishing_House,
      },{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }


  editBook(updatedBook,id) {
    console.log("updated", updatedBook);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .put('http://localhost:3000/books/' + id, {
        Book_Serial_Number: updatedBook.Book_Serial_Number,
        Book_Name: updatedBook.Book_Name,
        Book_Author: updatedBook.Book_Author,
        Book_Category   : updatedBook.Book_Category,
        Book_Publishing_House   : updatedBook.Book_Publishing_House

      },{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }

  deleteBook(id) {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token")
    headers = headers.append('Authorization','Bearer ' + token );

    return this.http
      .delete('http://localhost:3000/books/' + id,{headers: headers})
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }

  popualteForm(book) {
    console.log("book", book);
    this.form.setValue({
      Book_Serial_Number  : book.Book_Serial_Number ,
      Book_Name    : book.Book_Name ,
      Book_Author : book.Book_Author , 
      Book_Category    : book.Book_Category._id || "",
      Book_Publishing_House : book.Book_Publishing_House || "",
    });
  }
}
