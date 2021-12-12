import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { strategy } from 'src/app/Models/strategy.model';
import { Lap, Telemetry,tireFormTelemetry,tireTelemetry } from 'src/app/Models/tiretelemetry.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import * as mockData from "./telemetry.json";
import * as mockResults from "./strategy.json";
import {secondsAndMilisecondsRE,integerRE, compoundRE, lapTimeRE} from "../../utilities/utils";

@Component({
  selector: 'app-Calculator',
  templateUrl: './Calculator.component.html',
  styleUrls: ['./Calculator.component.scss']
})
export class CalculatorComponent {

  pits:Array<number>;
  totalTime:number;
  res:any;

  telemetryData:Telemetry = mockData;
  formData:Telemetry;

  form = this.fb.group({
    raceLength: ['', [Validators.required,Validators.pattern(integerRE)]],
    pitLoss: ['', [Validators.required,Validators.pattern(secondsAndMilisecondsRE)]],
    tires: this.fb.array([])
  });

  

  numberOfTiresArr:Array<number> = [];

  constructor(private calculatorService:CalculatorService, private fb:FormBuilder) { }

  ngOnInit(): void {
    // this.formTestValues();
    this.initializeWSomeVals();
  }

  get raceLength(){
    return this.form.controls['raceLength'];
  }

  get pitLoss(){
    return this.form.controls['pitLoss'];
  }

  compound(num:number){
    return this.form['controls']['tires']["controls"][num]["controls"]["compound"];
  }

  lap(tire,num){
    return this.form.controls["tires"]["controls"][tire]["controls"]["times"]["controls"][num]["controls"]["lap"];
  }


  //Form Array Manipulation
  addTire(){
    let arr: FormArray=this.form.controls["tires"] as FormArray;
    arr.push(this.fb.group({
      compound:['', [Validators.required,Validators.pattern(compoundRE)]],
      times:this.fb.array([
      ]),
    }));
  }

  removeTire(i){
    let arr: FormArray=this.form.controls["tires"] as FormArray;
    arr.removeAt(i);
  }

  addLap(i){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.push(this.fb.group({
      lap:new FormControl('', Validators.required),
    }));
  }

  removeLap(i,l){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.removeAt(l);
  }

  //Template Iteration Functions
  getTimesFormsArray(i) {
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    return arr;
  }

  get tires() {
    const arr:FormArray = this.form['controls']['tires'] as FormArray;
    return arr;
  }

  //Calculation Service Call
  calculateAPI(laps,loss){
    this.calculatorService.post(this.formData,laps,loss)
    .then((res)=>{
      this.pits = res.pits;
      this.totalTime = res.totalTime;
      this.res = res;
    });
  }

  //For Submit Method
  saveChanges(){
    let tires:Array<tireTelemetry> = this.form.value.tires;
    let arr: FormArray=this.form.controls["tires"]["controls"][0]["controls"]["times"] as FormArray;
    this.formData = {data:[]};
    for(let tire of tires){
      let tel = {
        compound:tire["compound"],
        times:[]
      };
      for(let time of tire["times"]){
        tel.times.push(time["lap"]);
      }
      this.formData.data.push(tel);
    }
    this.calculateAPI(this.form.value["raceLength"],this.form.value["pitLoss"]);

  }

  //Testing Purposes
  formTestValues(){
    let raceLengthField = this.form.controls["raceLength"] as FormControl;
    let pitLossField = this.form.controls["pitLoss"] as FormControl;
    raceLengthField.setValue(14);
    pitLossField.setValue(30);
    this.addTire();
    this.addTire();
    this.addTire();
    let compound1 = this.form.controls["tires"]["controls"][0]["controls"]["compound"] as FormControl;
    let compound2 = this.form.controls["tires"]["controls"][1]["controls"]["compound"] as FormControl;
    let compound3 = this.form.controls["tires"]["controls"][2]["controls"]["compound"] as FormControl;
    compound1.setValue("Soft");
    compound2.setValue("Medium");
    compound3.setValue("Hard");
    for(let time of this.telemetryData.data[0].times){
      this.addLapVal(0,time);
    }
    for(let time of this.telemetryData.data[1].times){
      this.addLapVal(1,time);
    }
    for(let time of this.telemetryData.data[2].times){
      this.addLapVal(2,time);
    }
  }

  addLapVal(i,val){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.push(this.fb.group({
      lap:[val]
    }));
  }

  initializeWSomeVals(){
    this.addTire();
    this.addTire();
    this.addTire();
    let compound1 = this.form.controls["tires"]["controls"][0]["controls"]["compound"] as FormControl;
    let compound2 = this.form.controls["tires"]["controls"][1]["controls"]["compound"] as FormControl;
    let compound3 = this.form.controls["tires"]["controls"][2]["controls"]["compound"] as FormControl;
    compound1.setValue("Soft");
    compound2.setValue("Medium");
    compound3.setValue("Hard");
    this.addLap(0);
    this.addLap(1);
    this.addLap(2);
  }
}
