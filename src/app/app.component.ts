import { Component } from '@angular/core';
import { LocaluserService } from './services/localuser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from './employee';
import { Element } from './elements';
import { Column } from './components/table/column';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Hellooo';
  isEdit: boolean = false;
  submitted: boolean = false;
  constructor(
    public api: LocaluserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
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
      this.title = "Hello Peoples";
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

  delUser(index: number)  {
    // let index = this.api.localData.findIndex(
    //   (x: any) => x.id == this.userPorfile.controls.id.value
    // );
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

  viewProf(data: any, index: number) {
    // this.dialog.open(, {
    //   width: '400px',
    //   height: '400px',
    //   data: {
    //     data: data,
    //     index: index
    //   }
    // })
  }

  tableColumns: Array<Column> = [
    { columnDef: 'position', header: 'Position', cell: (element: Record<string, any>) => `${element['position']}` },
    { columnDef: 'name', header: 'Name', cell: (element: Record<string, any>) => `${element['name']}`, isLink: true, url: 'abc'},
    { columnDef: 'weight', header: 'Weight', cell: (element: Record<string, any>) => `${element['weight']}` },
    { columnDef: 'symbol', header: 'Symbol', cell: (element: Record<string, any>) => `${element['symbol']}` },
    ];
    tableData: Array<Element> = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ];

    anotherTableColumns: Array<Column> = [
      { columnDef: 'name', header: 'Name', cell: (element: Record<string, any>) => `${element['name']}` },
      { columnDef: 'role', header: 'Role', cell: (element: Record<string, any>) => `${element['role']}` },
      { columnDef: 'skills', header: 'Skills', cell: (element: Record<string, any>) => `${element['skills']}` },
      ];
      anotherTableData: Array<Employee> = [
      { name: 'John', role: 'Fullstack Developer', skills: 'Angular, Typescript, React' },
      { name: 'Mile', role: 'Java Developer', skills: 'Java' },
      { name: 'Peter', role: 'DevOps', skills: 'AWS, GCP' }
      ]
}
