import { Component, OnInit } from '@angular/core';
import { NomikaService } from 'src/app/services/nomika.service';
import { Nomiko } from 'src/app/models/nomiko';
import { Toolbar } from 'primeng/toolbar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-nomikalist',
  templateUrl: './nomikalist.component.html',
  styleUrls: ['./nomikalist.component.scss']
})
export class NomikalistComponent implements OnInit {
 
  nomika: Nomiko[] = [];
  nomiko: Nomiko = new Nomiko();
  isLoggedIn!: Observable<boolean>;
  itemDialogShow: boolean = false;
  submitted: boolean = false;

  constructor(private nomikaService : NomikaService,public authService : AuthService) {
    this.isLoggedIn = authService.isLoggedIn$();

   }

  ngOnInit(): void {
    this.nomikaService.getNomika().subscribe(
      (data) => {
        this.nomika = data;
      }
    )
  }

  createItem() {  
    this.nomiko = new Nomiko();
    this.submitted = false;
    this.itemDialogShow = true; 
  }

  editItem(item: Nomiko) {
    this.nomiko = {...item};
    this.submitted = false;
    this.itemDialogShow = true;
  }

  deleteItem(){
  }

  hideDialog() {    
  }

  saveItem() {

  }


}
