import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fysikalist2Component } from './fysikalist2.component';

describe('Fysikalist2Component', () => {
  let component: Fysikalist2Component;
  let fixture: ComponentFixture<Fysikalist2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fysikalist2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fysikalist2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
