import { NgModule } from "@angular/core";
import { routing } from "./categories.routing";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, MatToolbarModule, MatSelectModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@NgModule({
  imports: [
BrowserModule,
    CommonModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    routing,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule, 
    MatSelectModule,
    MatChipsModule,
    MatSliderModule
  ],
  declarations: [
  ManageCategoriesComponent,
  CategoriesFormComponent,
  DeleteCategoryComponent
],
  entryComponents: [
    CategoriesFormComponent,
    DeleteCategoryComponent
  ]
})
export class CategoriesModule {}
