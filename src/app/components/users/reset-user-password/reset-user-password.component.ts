import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.css']
})
export class ResetUserPasswordComponent implements OnInit {
  id;
  isMatched=true;
  constructor(private userService:UserService,
    private notificationService:NotificationService, 
    public dialogRef: MatDialogRef<ResetUserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.id= data.id;
     }

  ngOnInit() {
  }
  onSubmit(formValue){
    if(formValue.confirm_password != formValue.new_password){
      this.isMatched=false
    }else{
      let dataToSend:any = {};
      dataToSend._id =  this.id;
      dataToSend.User_Password = formValue.new_password;
      this.userService.changePassword(dataToSend).subscribe((status)=>{
        if(status){
          this.notificationService.success("Password updated successfully")
        }else{
          this.notificationService.failed("Something went wrong,Please try again later!")
        }
        this.dialogRef.close()
      },(err)=>{
        this.notificationService.failed(":: Something went wrong,Please try again later!");
      })
    }
  }

}
