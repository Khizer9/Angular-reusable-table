import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocaluserService {
  data: any;
  localData: any = [] = []
  localDataCopy: any = [] = []
  constructor(private http: HttpClient) { }

  // getLocalUser(){
  //    this.http.get("http://localhost:5000/users").subscribe((data) =>{
  //     this.localData = data;
  //     console.log(this.localData);
  //   })
  // }
}
