import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxGalleryModule } from "ngx-gallery";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";
import { DashboardModule } from "./components/dashboard/dashboard.module";
import { BooksModule } from './components/books/books.module';
import { CategoriesModule } from './components/categories/categories.module';
import { ManageUsersModule } from './components/users/manage-users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,

    DashboardModule,
    BooksModule,
    CategoriesModule,
    ManageUsersModule,
    
    routing,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    NgxGalleryModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
