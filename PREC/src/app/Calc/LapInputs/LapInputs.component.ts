import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-LapInputs',
  templateUrl: './LapInputs.component.html',
  styleUrls: ['./LapInputs.component.css']
})
export class LapInputsComponent implements OnInit {

  constructor(private formbuilder:FormBuilder) { }

  timeForm:FormGroup;

  @Input()
  lap:number;

  time:string;

  ngOnInit() {
    this.timeForm = this.formbuilder.group({
      time:['',{validators:[Validators.required]}]
    });
  }
  saveChanges(){

  }

}
