import { Component } from '@angular/core';
import { LocaluserService } from './services/localuser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  isEdit: boolean = false;
  submitted: boolean = false;
  constructor(
    public api: LocaluserService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  userPorfile = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    phone: [''],
    filter: [''],
  });

  ngOnInit() {
    this.api.localDataCopy = JSON.parse(
      localStorage.getItem('localData') as any
    );

    this.api.localData = this.api.localDataCopy;
    setTimeout(() => {
      this.title = 'Users Data';
    }, 2000);
  }

  initForm() {
    this.userPorfile = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: [''],
      filter: [''],
    });
  }

  onSubmit() {
    debugger;
    // this.submitted = true;
    if (this.userPorfile.invalid) {
      return;
    } else {
      if (!this.isEdit) {
        this.isEdit = false;
        this.api.localData.push({
          id: this.api.localData.length + 1,
          firstName: this.userPorfile.controls.firstName.value,
          lastName: this.userPorfile.controls.lastName.value,
          email: this.userPorfile.controls.email.value,
          password: this.userPorfile.controls.password.value,
          confirmPassword: this.userPorfile.controls.confirmPassword.value,
          phone: this.userPorfile.controls.phone.value,
        });
      } else {
        this.isEdit = true;
        let index = this.api.localData.findIndex(
          (x: any) => x.id == this.userPorfile.controls.id.value
        );
        this.api.localData[index] = {
          id: this.userPorfile.controls.id.value,
          firstName: this.userPorfile.controls.firstName.value,
          lastName: this.userPorfile.controls.lastName.value,
          email: this.userPorfile.controls.email.value,
          password: this.userPorfile.controls.password.value,
          confirmPassword: this.userPorfile.controls.confirmPassword.value,
          phone: this.userPorfile.controls.phone.value,
        };
      }
      this.initForm();
      console.log(this.api.localData);
      localStorage.setItem('localData', JSON.stringify(this.api.localData));
    }
  }

  editUser(id: number) {
    this.isEdit = true;
    var userData = this.api.localData.find((x: any) => x.id == id);
    this.userPorfile.patchValue(userData);
    console.log(userData);
  }

  delUser() {
    let index = this.api.localData.findIndex(
      (x: any) => x.id == this.userPorfile.controls.id.value
    );
    this.api.localData.splice(index, 1);
    localStorage.setItem('localData', JSON.stringify(this.api.localData));
  }

  filterUser() {
    debugger;
    var searchText = this.userPorfile.controls.filter.value || '';

    this.api.localData = this.api.localDataCopy.filter(
      (x: any) =>
        (x.lastName !== null &&
          x.lastName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) ||
        (x.firstName !== null &&
          x.firstName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
    );
  }
}
