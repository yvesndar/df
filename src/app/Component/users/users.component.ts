import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  // For user data
  users: any;
  updateUser = false;
  newAccountForm = false;

  //For table
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any;
  dtTrigger: Subject<any> = new Subject<any>();

  //Form validators
  NewAccountForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    username: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(8),
      Validators.max(18),
    ]),
    confirm: new FormControl(null, [Validators.required]),
  });

  UpdateUserForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    role: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UsersService, private route: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        'colvis',
        'copy',
        'print',
        'excel',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e: any, dt: any, node: any, config: any) {
        //     alert('Button activated');
        //   },
        // },
      ],
      responsive: true,
    };
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.allUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      this.dtTrigger.next(null);
    });
  }

  removeUpdateForm() {
    this.updateUser = false;
  }

  getUpdateForm(data: any) {
    console.log(data);
    this.updateUser = true;
    this.UpdateUserForm.setValue({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      username: data.username,
      phone: data.phone,
      address: data.address,
      role: data.role,
      status: data.status,
    });
  }

  submitUpdateForm(data: any) {
    console.log(data);
    this.userService.updatedUser(data).subscribe((res) => {
      console.log(res);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        Swal.fire({
          icon: 'success',
          title: 'Account Updated',
          showConfirmButton: false,
          timer: 2000,
          width: 400,
          padding: '3em',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          background: '#fff',
          backdrop: `rgba(0, 0, 0, 0.377)`,
        });
        this.getAllUsers();
      });
    });
    this.removeUpdateForm();
  }

  ResetFormValues() {
    this.NewAccountForm.setValue({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      password: null,
      role: null,
      confirm: null,
    });
  }
  removeNewAccountForm() {
    this.ResetFormValues();
    this.newAccountForm = false;
  }

  showNewAcountForm() {
    this.newAccountForm = true;
  }

  onSubmit(data: any) {
    if (this.NewAccountForm.valid) {
      console.log(data);
      if (data.password === data.confirm) {
        this.userService.createAccount(data).subscribe(
          (res) => {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              Swal.fire({
                icon: 'success',
                title: 'Account Created',
                showConfirmButton: false,
                timer: 2000,
                width: 400,
                padding: '3em',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown',
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp',
                },
                background: '#fff',
                backdrop: `rgba(0, 0, 0, 0.377)`,
              });
              this.getAllUsers();
              this.removeNewAccountForm();
            });
          },
          (error) => {
            Swal.fire({
              icon: 'warning',
              title: `${error.error.message}`,
              showConfirmButton: false,
              timer: 2000,
              width: 400,
              padding: '3em',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
              background: '#fff',
              backdrop: `rgba(0, 0, 0, 0.377)`,
            });
          }
        );
      } else {
        alert('passowrd must match');
      }
    }
  }
}
