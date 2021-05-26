import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../authentication/services/auth.service';
import { BooksService } from '../services/books.service';
import {   BooksFormComponent } from '../books-form/books-form.component';
import { DeleteBookComponent } from './../delete-book/delete-book.component';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  books;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Book_Serial_Number",
    "Book_Name",
    "Book_Author",
    "Book_Category",
    "Book_Publishing_House",
    "Actions"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private BooksService: BooksService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.BooksService.getBooks().subscribe((response: any) => {
      this.books = new MatTableDataSource(response.books);
      this.books.sort = this.sort;
      this.books.paginator = this.paginator;
    });
  }
  onAdd() {
    this.BooksService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Book" };
    let dialogRef=this.dialog.open(BooksFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.BooksService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Book",id:element._id };

    let dialogRef=this.dialog.open(BooksFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }

  onDelete(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Delete Book",id:element._id };

    let dialogRef=this.dialog.open(DeleteBookComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    if (this.searchKey)
      this.books.filter = this.searchKey.trim().toLowerCase();
  }


}
