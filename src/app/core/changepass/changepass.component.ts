import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Userauth } from 'src/app/models/userauth';
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


  constructor(private fb:FormBuilder, private authService:AuthService,
    private router :Router) { }

  ngOnInit(): void {
      this.changePassForm =  this.fb.group({
      oldpass :['', Validators.required ],
      newpass:['', [Validators.required, Validators.minLength(5)] ],
      newpass2:['', [Validators.required, Validators.minLength(5)] ]
    });

  }


  changepass() {

  }

}
