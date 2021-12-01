import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { strategy } from 'src/app/Models/strategy.model';
import { Lap, Telemetry,tireFormTelemetry,tireTelemetry } from 'src/app/Models/tiretelemetry.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import * as mockData from "./telemetry.json";
import * as mockResults from "./strategy.json";

@Component({
  selector: 'app-Calculator',
  templateUrl: './Calculator.component.html',
  styleUrls: ['./Calculator.component.css']
})
export class CalculatorComponent {

  pits:Array<number>;
  totalTime:number;
  res:any;

  telemetryData:Telemetry = mockData;
  formData:Telemetry;

  form = this.fb.group({
    raceLength: ['', Validators.required],
    pitLoss: ['', Validators.required],
    // numTires: [3, Validators.required],
    tires: this.fb.array([])
  });

  numberOfTiresArr:Array<number> = [];

  constructor(private calculatorService:CalculatorService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formTestValues();
  }

  addTire(){
    let arr: FormArray=this.form.controls["tires"] as FormArray;
    arr.push(this.fb.group({
      compound:[''],
      times:this.fb.array([
      ]),
    }));
    console.log(this.form)
  }
  addLapVal(i,val){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.push(this.fb.group({
      lap:[val]
    }));
  }

  addLap(i){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.push(this.fb.group({
      lap:['']
    }));
  }

  get tires() {
    const arr:FormArray = this.form['controls']['tires'] as FormArray;
    return arr;
  }

  getTimesFormsArray(i) {
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    return arr;
  }

  // deleteLap(LapIndex:number){
  //   this.laps.removeAt(LapIndex);
  // }


  calculate(laps,loss){
    this.calculatorService.post(this.telemetryData,laps,loss)
    .then((res)=>{
      console.log(res);
      this.pits = res.pits;
      this.totalTime = res.totalTime;
      this.res = res;
    });
  }

  showTelemetryInputs(){
    console.log(this.form.value["numTires"]);
    this.numberOfTiresArr = [];
    for(let i = 1;i<=this.form.value["numTires"];i++){
      this.numberOfTiresArr.push(i);
    }
  }

  callAddTireNTimes(){
    for(let j=0;j<this.form.value["numTires"];j++){
      this.addTire()
    }
  }

  saveChanges(){
    let tires:Array<tireTelemetry> = this.form.value.tires;
    let arr: FormArray=this.form.controls["tires"]["controls"][0]["controls"]["times"] as FormArray;
    console.log(arr.at(0).value["lap"]);
    console.log(tires[0].times);
    this.formData = {data:[]};
    /*for(let tire of tires){
      let tel = {
        compound:tire["compound"],
        times:[]
      };
      for(let time of tire["times"]){
        tel.times.push(time);
      }
      this.formData.data.push(tel);
    }
    this.calculate(this.form.value["raceLength"],this.form.value["pitLoss"]);
    */
  }

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
}
