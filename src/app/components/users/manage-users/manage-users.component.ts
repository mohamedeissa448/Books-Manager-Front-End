import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ResetUserPasswordComponent } from '../reset-user-password/reset-user-password.component';
import { AuthService } from '../../../authentication/services/auth.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users;
  data;
  searchKey: string;
  displayedColumns: string[] = [
    "User_Name",
    "User_Mobile",
    "User_Email",
    "Actions"
  ];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    public authService :AuthService
  ) {}

  ngOnInit() {
    this.initialize();
  }
  initialize() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.users = new MatTableDataSource(response.users);
      this.users.sort = this.sort;
      this.users.paginator = this.paginator;
    });
  }
  onAdd() {
    this.userService.form.reset();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Add New User" };
    let dialogRef=this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }
  onEdit(element) {
    this.userService.popualteForm(element)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Edit User",id:element._id };

    let dialogRef=this.dialog.open(UserFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(()=>{
      this.initialize()
    })
  }

  resetPassword(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { id:element._id };

    let dialogRef=this.dialog.open(ResetUserPasswordComponent, dialogConfig);
   
  }

  onDelete(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Delete User",id:element._id };

    let dialogRef=this.dialog.open(DeleteUserComponent, dialogConfig);
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
      this.users.filter = this.searchKey.trim().toLowerCase();
  }



}
