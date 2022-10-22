import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student-service.service';
import User from '../user';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  preview:String='';
  user: User = new User();
  registerationForm = new FormGroup({
    userName: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    mobile: new FormControl(null,[Validators.required]),
    profile: new FormControl()
  });
  status: string="";
  constructor(private studentService: StudentService,public router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("Inside onSubmit method:");
    // this.user.mobile = Number(this.mon);
    
    this.studentService.addUser(
      this.registerationForm.value.userName,
      this.registerationForm.value.email,
      this.registerationForm.value.password,this.registerationForm.value.mobile,
      this.registerationForm.value.profile
      ).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              // this.percentDone = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded!`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              // this.percentDone = false;
              this.router.navigate(['users-list'])
          }
        }
    );
    
    this.user.email='';
    this.user.mobile=undefined;
    this.user.password="";
    this.user.email='';
    this.user.profile=''
  }

  get userName(){
    return this.registerationForm.get('userName');
  }

  get password(){
    return this.registerationForm.get('password');
  }

  get email(){
    return this.registerationForm.get('password');
  }

  get mobile(){
    return this.registerationForm.get('mobile');
  }

  get profile(){
    return this.registerationForm.get('profile');
  }

  uploadFile(event:Event){
    /*console.log(event);
    const file = (event.target as HTMLInputElement).files;
    if(file!=null){
      this.registerationForm.patchValue({profile:file[0]});
      this.registerationForm.get('profile')?.updateValueAndValidity();
        const reader = new FileReader();
        reader.onload=()=>{
          this.preview = reader.result as string;
          // this.user.profile = reader.result as string;
        }
        reader.readAsDataURL(file[0]);
      }
      */
      const file = (event.target as HTMLInputElement).files[0];
      this.registerationForm.patchValue({
        profile: file
      });
      this.registerationForm.get('profile').updateValueAndValidity()
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
}
