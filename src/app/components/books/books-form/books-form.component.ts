import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from "../services/books.service"
import { CategoriesService } from './../../categories/services/categories.service';
@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit {

  id;
  title;
  categories = [];

  constructor(
    public BooksService: BooksService,
    public CategoriesService: CategoriesService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<BooksFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.CategoriesService.getCategories().subscribe((response:any) => {
      this.categories = response.categories;
    });
  }
  onClear() {
    this.BooksService.form.reset();
  }

  onSubmit() {
    if (this.BooksService.form.valid) {
      //on adding book
      if (this.title === "Add New Book") {
        this.BooksService.addBook(
          this.BooksService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        },(err)=>{
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Book") {
        //update Book
        this.BooksService.editBook(this.BooksService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        },(err)=>{
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.BooksService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.BooksService.form.reset();
    this.dialogRef.close();
  }


}
