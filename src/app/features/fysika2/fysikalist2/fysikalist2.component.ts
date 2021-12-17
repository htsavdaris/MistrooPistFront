import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { FysikaService } from 'src/app/services/fysika.service';
import { Fysiko } from 'src/app/models/fysiko';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from "rxjs";

enum recordState {
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
  rState: recordState = recordState.undefined;
  AMdisabled: boolean = true;
  valueA: boolean = false;
  valueB: boolean = false;
  valueC: boolean = false;
  valueD: boolean = false;
  itemForm!: FormGroup;
  selectedItem: Fysiko = new Fysiko();
  errormsg: Message[] = [];

  constructor(private fb: FormBuilder, private fysikaService: FysikaService, public authService: AuthService) {
    this.isLoggedIn = authService.isLoggedIn$();
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      fldam: ['', Validators.required],
      fldeponymo: ['', Validators.required],
      fldonoma: ['', Validators.required],
      fldpatronymo: [''],
      flddiefthinsi: [''],
      fldnomos: [''],
      fldemail: [''],
      fldtilefono: [''],
      fldcertification: [''],
      fldeidikotita: [''],
      flda: ['']
    });

    this.fysikaService.getFysika().subscribe(
      (data) => {
        this.fysika = data;
        //console.log(data);
      }

    );
  }
  onRowSelect(event: any) {
    this.selectedItem = event.data;
    //console.log (event.data.fldam);
    //console.log (this.selectedItem);
    this.itemForm.patchValue({
      fldam: this.selectedItem.fldam,
      fldeponymo: this.selectedItem.fldeponymo,
      fldonoma: this.selectedItem.fldonoma,
      fldpatronymo: this.selectedItem.fldpatronymo,
      flddiefthinsi: this.selectedItem.flddiefthinsi,
      fldnomos: this.selectedItem.fldnomos,
      fldemail: this.selectedItem.fldemail,
      fldtilefono: this.selectedItem.fldtilefono,
      fldcertification: this.selectedItem.fldcertification,
      fldeidikotita: this.selectedItem.fldeidikotita,
      flda: this.selectedItem.flda

    });
  }

  onRowUnselect(event: any) {
    console.log(event.data.fldam);

    //this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
  }

  save() {
    return 0;
  }

}
