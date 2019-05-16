import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDetallesPage } from './citas-detalles.page';

describe('CitasDetallesPage', () => {
  let component: CitasDetallesPage;
  let fixture: ComponentFixture<CitasDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasDetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
