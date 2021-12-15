import { Component, OnInit } from '@angular/core';
import {FysikaService } from 'src/app/services/fysika.service';
import {Fysiko } from 'src/app/models/fysiko';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";

enum recordState  {
  undefined,
  new,
  edit,
  delete
};

@Component({
  selector: 'app-fysikalist2',
  templateUrl: './fysikalist2.component.html',
  styleUrls: ['./fysikalist2.component.scss']
})
export class Fysikalist2Component implements OnInit {

  fysika: Fysiko[] = [];
  fysiko: Fysiko = new Fysiko();
  isLoggedIn!: Observable<boolean>;
  itemDialogShow: boolean = false;
  submitted: boolean = false;
  rState : recordState = recordState.undefined;
  AMdisabled: boolean = true;
  valueA: boolean = false;
  valueB: boolean = false;
  valueC: boolean = false;
  valueD: boolean = false;


  constructor(private fysikaService : FysikaService, public authService : AuthService) {
    this.isLoggedIn = authService.isLoggedIn$();
  }

  ngOnInit(): void {
    this.fysikaService.getFysika().subscribe(
      (data) => {
        this.fysika = data;  
        //console.log(data);
      }

    );
  }

}
