import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriesService } from './../services/categories.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  id;
  title;

  constructor(
    public CategoryService: CategoriesService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    
  }
  
  onSubmit() {

      this.CategoryService.deleteCategory(
          this.id
        ).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Deleted Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        },(err)=>{
          this.notificationService.failed(":: Something went wrong,Please try again later!");
        });
        
      this.onClose();
    
  }

  onClose() {
    this.dialogRef.close();
  }


}
