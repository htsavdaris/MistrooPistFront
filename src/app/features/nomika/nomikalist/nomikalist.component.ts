import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { NomikaService } from 'src/app/services/nomika.service';
import { Nomiko } from 'src/app/models/nomiko';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Observable } from "rxjs";
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

const NO_STATE: number = 0;
const DISPLAY: number = 1;
const EMPTY_NEW: number = 2;
const UPDATE: number = 3;

@Component({
  selector: 'app-nomikalist',
  templateUrl: './nomikalist.component.html',
  styleUrls: ['./nomikalist.component.scss'],
  providers: [ConfirmationService]
})

export class NomikalistComponent implements OnInit {
 
  nomika: Nomiko[] = [];
  nomiko: Nomiko = new Nomiko();
  isLoggedIn!: Observable<boolean>;
  submitted: boolean = false;    
  itemForm!: FormGroup;
  selectedItem: Nomiko = new Nomiko();
  errormsg: Message[] = []
  formstate: BehaviorSubject<number> = new BehaviorSubject(NO_STATE);

    
  constructor(private fb: FormBuilder,private nomikaService : NomikaService,public authService : AuthService,private confirmationService: ConfirmationService) {
    this.isLoggedIn = authService.isLoggedIn$();
   }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      fldam: ['', Validators.required],
      fldeponymia: ['', Validators.required],
      fldypefthinos: ['', Validators.required],
      flddiefthinsi: ['', Validators.required],
      fldnomos: ['', Validators.required],
      fldemail: ['', Validators.required],
      fldtilefono: ['', Validators.required],
      flda: [false],
      fldb: [false],
      fldc: [false],
      fldd: [false]
    });
    
    this.fetchtable();
  }

  fetchtable() {
    this.nomikaService.getAll().subscribe(
      (data) => {
        this.nomika = data;  
      }
    );
  }

  onRowSelect(event: any) {
    this.selectedItem = event.data;
    this.itemForm.patchValue({
      fldam: this.selectedItem.fldam,
      fldeponymia: this.selectedItem.fldeponymia,
      fldypefthinos: this.selectedItem.fldypefthinos,
      flddiefthinsi: this.selectedItem.flddiefthinsi,
      fldnomos: this.selectedItem.fldnomos,
      fldemail: this.selectedItem.fldemail,
      fldtilefono: this.selectedItem.fldtilefono,
      flda: this.selectedItem.flda,
      fldb: this.selectedItem.fldb,
      fldc: this.selectedItem.fldc,
      fldd: this.selectedItem.fldd

    });
    this.formstate.next(DISPLAY);
  }

  onRowUnselect(event: any) {
    
  }

  readytoupdate() {
    this.formstate.next(UPDATE);
    return 0;
  }
  
  update() {    
    this.nomiko = { ...this.selectedItem };
    this.nomiko.fldam = this.itemForm.get('fldam')?.value;
    this.nomiko.fldeponymia = this.itemForm.get('fldeponymia')?.value;
    this.nomiko.fldypefthinos = this.itemForm.get('fldypefthinos')?.value;
    this.nomiko.flddiefthinsi = this.itemForm.get('flddiefthinsi')?.value;
    this.nomiko.fldnomos = this.itemForm.get('fldnomos')?.value;
    this.nomiko.fldemail = this.itemForm.get('fldemail')?.value;
    this.nomiko.fldtilefono = this.itemForm.get('fldtilefono')?.value;
    this.nomiko.flda = this.itemForm.get('flda')?.value;
    this.nomiko.fldb = this.itemForm.get('fldb')?.value;
    this.nomiko.fldc = this.itemForm.get('fldc')?.value;
    this.nomiko.fldd = this.itemForm.get('fldd')?.value;
    
    this.nomikaService.update(this.nomiko.fldam, this.nomiko).subscribe(
      (data) => {        
        this.nomiko = data;        
        this.formstate.next(DISPLAY);
        this.fetchtable();
      });
    return 0;
  }

  clearform() {
    this.itemForm.patchValue({
      fldam: 0,
      fldeponymia: '',
      fldypefthinos: '',
      flddiefthinsi: '',
      fldnomos: '',
      fldemail: '',
      fldtilefono: '',
      fldcertification: '',
      fldeidikotita: '',
      flda: false,
      fldb: false,
      fldc: false,
      fldd: false,
    });
    return 0;
  }

  clearforadd() {
      this.clearform();
      this.formstate.next(EMPTY_NEW);
  }

  clearafterdelete(){
    this.clearform();
    this.formstate.next(NO_STATE);
  }

  savenew() {
    this.nomiko = new Nomiko();
    this.nomiko.fldam = this.itemForm.get('fldam')?.value;
    this.nomiko.fldeponymia = this.itemForm.get('fldeponymia')?.value;
    this.nomiko.fldypefthinos = this.itemForm.get('fldypefthinos')?.value;
    this.nomiko.flddiefthinsi = this.itemForm.get('flddiefthinsi')?.value;
    this.nomiko.fldnomos = this.itemForm.get('fldnomos')?.value;
    this.nomiko.fldemail = this.itemForm.get('fldemail')?.value;
    this.nomiko.fldtilefono = this.itemForm.get('fldtilefono')?.value;
    this.nomiko.flda = this.itemForm.get('flda')?.value;
    this.nomiko.fldb = this.itemForm.get('fldb')?.value;
    this.nomiko.fldc = this.itemForm.get('fldc')?.value;
    this.nomiko.fldd = this.itemForm.get('fldd')?.value;

    this.nomikaService.save(this.nomiko).subscribe(
      (data) => {
        this.nomiko = data;
        this.fetchtable();
        this.formstate.next(DISPLAY);
        return 0;    
      },
      (error) => {
        console.log(error);
      })
      ;

  }

  delete() {
    this.confirmationService.confirm({
      message: 'Επιθυμείτε να διαγράψετε την εγγραφή?',
      header: 'Επιβεβαίωση Διαγραφής',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.deleteaction();
      },
      reject: () => {
      }
  });
  }

  deleteaction (){
    var fldam = this.itemForm.get('fldam')?.value;
    this.nomikaService.delete(fldam).subscribe(
      (data) => {
        this.formstate.next(DISPLAY);
        this.fetchtable();
        this.clearafterdelete();
      },
      (error) => {
        console.log(error);
      });
    this.formstate.next(DISPLAY);
  }

  cancel() {
    this.formstate.next(DISPLAY);
  }

  filter(table: Table, inputtext :any) {
      table.filterGlobal(<HTMLInputElement>inputtext.value, 'contains');
  }

}
