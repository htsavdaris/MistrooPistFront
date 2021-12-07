import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FysikalistComponent } from './fysikalist.component';

describe('FysikalistComponent', () => {
  let component: FysikalistComponent;
  let fixture: ComponentFixture<FysikalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FysikalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FysikalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
