import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPacientComponent } from './add-pacient.component';

describe('AddPacientComponent', () => {
  let component: AddPacientComponent;
  let fixture: ComponentFixture<AddPacientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPacientComponent]
    });
    fixture = TestBed.createComponent(AddPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
