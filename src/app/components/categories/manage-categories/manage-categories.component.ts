import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { AuthService } from '../../../authentication/services/auth.service';
import { CategoriesFormComponent } from '../categories-form/categories-form.component';
import { CategoriesService } from './../services/categories.service';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  books;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "Category_Name",
    "Category_Description",
    "Actions"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.categoriesService.getCategories().subscribe((response: any) => {
      this.books = new MatTableDataSource(response.categories);
      this.books.sort = this.sort;
      this.books.paginator = this.paginator;
    });
  }
  onAdd() {
    this.categoriesService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New Category" };
    let dialogRef=this.dialog.open(CategoriesFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }

  onEdit(element) {
    this.categoriesService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit Category",id:element._id };

    let dialogRef=this.dialog.open(CategoriesFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }

  onDelete(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Delete Category",id:element._id };

    let dialogRef=this.dialog.open(DeleteCategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((dta)=>{
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
