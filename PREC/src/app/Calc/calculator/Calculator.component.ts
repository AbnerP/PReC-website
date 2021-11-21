import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strategy } from 'src/app/Models/strategy.model';
import { Lap, Telemetry,tireTelemetry } from 'src/app/Models/tiretelemetry.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import * as mockData from "./telemetry.json";
import * as mockResults from "./strategy.json";

@Component({
  selector: 'app-Calculator',
  templateUrl: './Calculator.component.html',
  styleUrls: ['./Calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  pits:Array<number>;
  totalTime:number;
  res:any;

  telemetryData:Telemetry = mockData;

  form = this.fb.group({
    raceLength: ['', Validators.required],
    pitLoss: ['', Validators.required],
    numTires: ['', Validators.required],
    tires: this.fb.array([])
  });

  numberOfTiresArr:Array<number> = [];

  constructor(private calculatorService:CalculatorService, private fb:FormBuilder) { }



  ngOnInit() {
  }

  showTelemetryInputs(){
    console.log(this.form.value["numTires"]);
    this.numberOfTiresArr = [];
    for(let i = 1;i<=this.form.value["numTires"];i++){
      this.numberOfTiresArr.push(i);
    }
  }
  addTire(){
    const lessonForm = this.fb.group({
      time: ['', Validators.required],
    });
    this.laps.push(lessonForm);
  }

  get tires() {
    const arr:FormArray = this.form['controls']['tires'] as FormArray;
    return arr;
  }

  addLap(){
    const lessonForm = this.fb.group({
      time: ['', Validators.required],
    });
    this.laps.push(lessonForm);
  }

  deleteLap(LapIndex:number){
    this.laps.removeAt(LapIndex);
  }

  get laps() {
    const arr:FormArray = this.form['controls']['laps'] as FormArray;
    return arr;
  }

  calculate(){
    this.calculatorService.post(this.telemetryData,30,30)
    .then((res)=>{
      console.log(res);
      this.pits = res.pits;
      this.totalTime = res.totalTime;
      this.res = res;
    });
  }
}
