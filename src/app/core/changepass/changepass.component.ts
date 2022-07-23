import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Changepass } from 'src/app/models/changepass';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { Message } from 'primeng/api';
import { } from 'primeng/api';


@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})

export class ChangepassComponent implements OnInit {
  changePassForm!: FormGroup ;  
  errormsg: Message[] = [];
  curuser?: string ="";

  constructor(private authService:AuthService,
    private router :Router) { }

  ngOnInit(): void {
      this.changePassForm =  new FormGroup({
      login :new FormControl<string>('', Validators.required),
      oldpass :new FormControl<string>('', Validators.required),
      newpass:new FormControl<string>('', [Validators.required, Validators.minLength(5)] ),
      newpass2:new FormControl<string>('', [Validators.required, Validators.minLength(5)] )
    }, { validators: passwordsDoNotMatchValidator } );
    if (localStorage.getItem("username") !== null) {
        this.curuser = localStorage.getItem('currentUser')!;
        this.changePassForm.get('login')?.setValue(this.curuser);
    } 
  }

  
  changepass(): void {
    let changepass = new Changepass();
    changepass.login = this.changePassForm.get('login')?.value;
    changepass.oldpassword = this.changePassForm.get('oldpass')?.value;
    changepass.newpassword = this.changePassForm.get('newpass')?.value;
    if (this.changePassForm.valid) {
      this.authService.changepassword(changepass).subscribe(
        (response) => { 
            this.router.navigate(['/home']);
        },
        (error) => { 
          this.errormsg = [              
            {severity:'error', summary:'Error', detail:'Error occured'}  
          ];       
        }
      )
    }
  }

}

export const passwordsDoNotMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newpass = control.get('newpass');
  const newpass2 = control.get('newpass2');
  return newpass && newpass2 && newpass.value !== newpass2.value ? {     
    passwordsDoNotMatchValidator: true
   } : null;
};