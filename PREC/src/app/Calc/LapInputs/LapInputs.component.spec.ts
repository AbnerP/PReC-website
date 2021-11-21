/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LapInputsComponent } from './LapInputs.component';

describe('LapInputsComponent', () => {
  let component: LapInputsComponent;
  let fixture: ComponentFixture<LapInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
