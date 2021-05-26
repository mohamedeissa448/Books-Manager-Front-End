import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from './../services/categories.service';
@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  id;
  title;
  constructor(
    public CategoriesService: CategoriesService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<CategoriesFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  onClear() {
    this.CategoriesService.form.reset();
  }

  onSubmit() {
    if (this.CategoriesService.form.valid) {
      //on adding category
      if (this.title === "Add New Category") {
        this.CategoriesService.addCategory(
          this.CategoriesService.form.value
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Added Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        },(err)=>{
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      } else if (this.title === "Edit Category") {
        //update category
        this.CategoriesService.editCategory(this.CategoriesService.form.value,this.id).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        },(err)=>{
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
      }
      this.CategoriesService.form.reset();
      this.onClose();
    }
  }
  onClose() {
    this.CategoriesService.form.reset();
    this.dialogRef.close();
  }


}
