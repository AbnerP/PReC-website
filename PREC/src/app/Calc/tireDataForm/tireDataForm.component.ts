import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tireDataForm',
  templateUrl: './tireDataForm.component.html',
  styleUrls: ['./tireDataForm.component.css']
})
export class TireDataFormComponent implements OnInit {

  constructor(private formbuilder:FormBuilder) { }

  Tire:string;
  laps:number;
  lapsArr:Array<number>=[];

  dataForm:FormGroup;

  ngOnInit() {
    this.dataForm = this.formbuilder.group({
      tire:['',{validators:[Validators.required]}],
      lapsAr: this.formbuilder.array([this.formbuilder.group({lap:''})])
    });
  }
  saveChanges(){
    this.Tire = this.dataForm.value.tire;
    this.laps = this.dataForm.value.laps;
    for(let i = 0;i<this.laps;i++){
      this.lapsArr.push(i);
    }
  }

  get Laps(){
    return this.dataForm.get('laps') as FormArray;
  }

}
