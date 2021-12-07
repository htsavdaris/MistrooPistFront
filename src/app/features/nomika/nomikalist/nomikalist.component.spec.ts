import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomikalistComponent } from './nomikalist.component';

describe('NomikalistComponent', () => {
  let component: NomikalistComponent;
  let fixture: ComponentFixture<NomikalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomikalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomikalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
