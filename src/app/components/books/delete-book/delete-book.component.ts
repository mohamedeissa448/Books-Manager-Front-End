import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BooksService } from "../services/books.service";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  id;
  title;

  constructor(
    public BooksService: BooksService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    
  }
  
  onSubmit() {

      this.BooksService.deleteBook(
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
