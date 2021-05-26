import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from "../services/user.service"

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  id;
  title;

  constructor(
    public UserService: UserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    
  }
  
  onSubmit() {

      this.UserService.deleteUser(
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
