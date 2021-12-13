import { Component, OnInit } from '@angular/core';
import {FysikaService } from 'src/app/services/fysika.service';
import {Fysiko } from 'src/app/models/fysiko';
import { Toolbar } from 'primeng/toolbar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";

enum recordState  {
  undefined,
  new,
  edit,
  delete
};

@Component({
  selector: 'app-fysikalist',
  templateUrl: './fysikalist.component.html',
  styleUrls: ['./fysikalist.component.scss']
})
export class FysikalistComponent implements OnInit {
  
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

  createItem() {  
    this.AMdisabled = false;
    this.fysiko = new Fysiko();
    this.submitted = false;
    this.itemDialogShow = true; 
    this.rState = recordState.new;
  }

  editItem(item: Fysiko) {
    this.AMdisabled = true;
    this.fysiko = {...item};
    this.submitted = false;
    this.itemDialogShow = true;
    this.rState = recordState.edit;
  }

  deleteItem(){
    this.AMdisabled = true;
  }

  hideDialog() {  
    this.itemDialogShow = false;
    this.submitted = false;  
  }

  saveItem() {
    console.log(this.fysiko);
    if (this.rState == recordState.new) {
      console.log('Call save');
      this.fysikaService.createFysiko(this.fysiko).subscribe(
        (data) => {
          this.fysiko = data;
          console.log(data);
        });
    }
    else {
      console.log('Call Update');
      this.fysikaService.updateFysiko(this.fysiko.fldam, this.fysiko).subscribe(
        (data) => {
          console.log('Call Update Subscribe');
          this.fysiko = data;
          console.log(data);
        });
    }
    this.rState = recordState.undefined;
  }

}
