import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { FysikaService } from 'src/app/services/fysika.service';
import { Fysiko } from 'src/app/models/fysiko';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, Observable } from "rxjs";
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';

const NO_STATE: number = 0;
const DISPLAY: number = 1;
const EMPTY_NEW: number = 2;
const UPDATE: number = 3;

@Component({
  selector: 'app-fysikalist2',
  templateUrl: './fysikalist2.component.html',
  styleUrls: ['./fysikalist2.component.scss'],
  providers: [ConfirmationService]
})

export class Fysikalist2Component implements OnInit {

  fysika: Fysiko[] = [];
  fysiko: Fysiko = new Fysiko();
  isLoggedIn!: Observable<boolean>;  
  submitted: boolean = false;    
  itemForm!: FormGroup;
  selectedItem: Fysiko = new Fysiko();
  errormsg: Message[] = []
  formstate: BehaviorSubject<number> = new BehaviorSubject(NO_STATE);


  constructor(private fysikaService: FysikaService, public authService: AuthService,private confirmationService: ConfirmationService) {
    this.isLoggedIn = authService.isLoggedIn$();
  }

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      fldam: new FormControl<number>(0, Validators.required),
      fldeponymo: new FormControl<string>('', Validators.required),
      fldonoma: new FormControl<string>('', Validators.required),
      fldpatronymo: new FormControl<string>('', Validators.required),
      flddiefthinsi: new FormControl<string>('', Validators.required),
      fldnomos: new FormControl<string>('', Validators.required),
      fldemail: new FormControl<string>('', Validators.required),
      fldtilefono: new FormControl<string>('', Validators.required),
      fldcertification: new FormControl<string>('', Validators.required),
      fldeidikotita: new FormControl<string>('', Validators.required),
      flda: new FormControl<boolean>(false),
      fldb: new FormControl<boolean>(false),
      fldc: new FormControl<boolean>(false),
      fldd: new FormControl<boolean>(false)
    });
    
    this.fetchtable();
  }

  fetchtable() {
    this.fysikaService.getAll().subscribe(
      (data) => {
        this.fysika = data;        
      }
    );
  }

  onRowSelect(event: any) {
    this.selectedItem = event.data;
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
    this.fysiko = { ...this.selectedItem };
    this.fysiko.fldam = this.itemForm.get('fldam')?.value;
    this.fysiko.fldonoma = this.itemForm.get('fldonoma')?.value;
    this.fysiko.fldeponymo = this.itemForm.get('fldeponymo')?.value;
    this.fysiko.fldpatronymo = this.itemForm.get('fldpatronymo')?.value;
    this.fysiko.flddiefthinsi = this.itemForm.get('flddiefthinsi')?.value;
    this.fysiko.fldnomos = this.itemForm.get('fldnomos')?.value;
    this.fysiko.fldemail = this.itemForm.get('fldemail')?.value;
    this.fysiko.fldtilefono = this.itemForm.get('fldtilefono')?.value;
    this.fysiko.fldcertification = this.itemForm.get('fldcertification')?.value;
    this.fysiko.flda = this.itemForm.get('flda')?.value;
    this.fysiko.fldb = this.itemForm.get('fldb')?.value;
    this.fysiko.fldc = this.itemForm.get('fldc')?.value;
    this.fysiko.fldd = this.itemForm.get('fldd')?.value;
    
    this.fysikaService.update(this.fysiko.fldam, this.fysiko).subscribe(
      (data) => {        
        this.fysiko = data;        
        this.formstate.next(DISPLAY);
        this.fetchtable();
      });
    return 0;
  }

  clearform() {
    this.itemForm.patchValue({
      fldam: '',
      fldeponymo: '',
      fldonoma: '',
      fldpatronymo: '',
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
    
    this.fysiko.fldam = this.itemForm.get('fldam')?.value;
    this.fysiko.fldonoma = this.itemForm.get('fldonoma')?.value;
    this.fysiko.fldeponymo = this.itemForm.get('fldeponymo')?.value;
    this.fysiko.fldpatronymo = this.itemForm.get('fldpatronymo')?.value;
    this.fysiko.flddiefthinsi = this.itemForm.get('flddiefthinsi')?.value;
    this.fysiko.fldnomos = this.itemForm.get('fldnomos')?.value;
    this.fysiko.fldemail = this.itemForm.get('fldemail')?.value;
    this.fysiko.fldtilefono = this.itemForm.get('fldtilefono')?.value;
    this.fysiko.fldcertification = this.itemForm.get('fldcertification')?.value;
    this.fysiko.flda = this.itemForm.get('flda')?.value;
    this.fysiko.fldb = this.itemForm.get('fldb')?.value;
    this.fysiko.fldc = this.itemForm.get('fldc')?.value;
    this.fysiko.fldd = this.itemForm.get('fldd')?.value;
    this.fysikaService.save(this.fysiko).subscribe(
      (data) => {
        this.fysiko = data;
        this.formstate.next(DISPLAY);
        this.fetchtable();
      },
      (error) => {
        console.log(error);
      });
    return 0;
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
    this.fysiko.fldam = this.itemForm.get('fldam')?.value;
    this.fysikaService.delete(this.fysiko.fldam).subscribe(
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
