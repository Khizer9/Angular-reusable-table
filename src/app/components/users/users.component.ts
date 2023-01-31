import { Component } from '@angular/core';
import { Column } from '../table/column';
import { User } from './user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
constructor(){}
tableColumn2: Array<Column>  = [
  { columnDef: 'id', header: 'ID', cell: (element: Record<string, any>) => `${element['id']}` },
  { columnDef: 'firstName', header: 'First Name', cell: (element: Record<string, any>) => `${element['firstName']}` },
  { columnDef: 'lastName', header: 'Last Name', cell: (element: Record<string, any>) => `${element['lastName']}` },
  { columnDef: 'email', header: 'Email', cell: (element: Record<string, any>) => `${element['email']}` },
  { columnDef: 'password', header: 'Password', cell: (element: Record<string, any>) => `${element['password']}` },
]

 tableData2: Array<User> = [
  {id: 1, firstName: "Khizer", lastName: "Ali", email: "khizer358@gmail.com", password: "12345"},
  {id: 2, firstName: "Muzzamil", lastName: "Shaikh", email: "muzzamil@gmail.com", password: "12345"},
  {id: 3, firstName: "Ahmed", lastName: "Ali", email: "ahmed@gmail.com", password: "12345"},
  {id: 4, firstName: "Afnannnnnnnn", lastName: "bhai", email: "afnan@gmail.com", password: "123"},
 ]
}
