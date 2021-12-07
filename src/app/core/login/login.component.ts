import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Userauth } from 'src/app/models/userauth';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { Message } from 'primeng/api';
import { } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup ;  
  errormsg: Message[] = [];

  constructor(private fb:FormBuilder, private authService:AuthService,
    private router :Router) { }


  ngOnInit(): void {
    this.loginForm =  this.fb.group({
      login :['', Validators.required ],
      password:['', [Validators.required, Validators.minLength(5)] ]
    });
  }


  login() {
    let tuser = new Userauth();
    tuser.login = this.loginForm.get('login')?.value;
    tuser.password = this.loginForm.get('password')?.value;
    if (this.loginForm.valid) {
      this.authService.authenticate(tuser).subscribe(
        (response) => {
         console.log(response);
          if (response.toString() == "Authenticated")
          {             
            this.router.navigate(['/fysika']);
          }},
         (error) => {
           this.errormsg = [              
             {severity:'error', summary:'Error', detail:'Wrong login or password'}              
         ];
           //this.errormsg.push({severity:'error', summary:'Error Message', detail:'Wrong login or password'});
           //this.errormsg.push({severity:'info', summary:'Error Message', detail:'Wrong login or password'});
           console.log('Error in login: '+ error);
         }
        
      );
    }  
 }

}
