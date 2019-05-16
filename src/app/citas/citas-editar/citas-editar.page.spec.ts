import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasEditarPage } from './citas-editar.page';

describe('CitasEditarPage', () => {
  let component: CitasEditarPage;
  let fixture: ComponentFixture<CitasEditarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasEditarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
