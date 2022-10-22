import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import  User  from './user';
import { Observable } from 'rxjs';
export const httpOption={
  headers: new HttpHeaders().append('Content-Type','application/json')
}
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = "http://localhost:5000";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient:HttpClient) { }
  addUser(userName:string,email:string,password:string,mobile:Number,profile:File):Observable<any>{
    console.log("Inside Student service add method");
    var formData = new FormData();
    // var temp = profile.type.toString().substring(6);
    // var fname = userName + '.' + temp;
    formData.append('userName',userName);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('mobile',mobile.toString());
    formData.append('profile',profile,profile.name);

    // return this.httpClient.post<HttpResponse<any>>(this.url+"/users/addUser/",JSON.stringify(user),httpOption);
    return this.httpClient.post<HttpResponse<any>>(this.url+'/users/addUser/', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
