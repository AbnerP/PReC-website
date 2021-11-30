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
export class CalculatorComponent {

  pits:Array<number>;
  totalTime:number;
  res:any;

  telemetryData:Telemetry = mockData;

  form = this.fb.group({
    raceLength: ['', Validators.required],
    pitLoss: ['', Validators.required],
    numTires: [3, Validators.required],
    tires: this.fb.array([])
  });

  numberOfTiresArr:Array<number> = [];

  constructor(private calculatorService:CalculatorService, private fb:FormBuilder) { }

  ngOnInit(): void {
    // // console.log(this.form);
    // for(let i = 0;i<3;i++){
    //   this.form.addControl("tire"+i,this.fb.group({
    //     compound:[''],
    //     times: this.fb.array([
    //       this.fb.control({
    //         lap:['1']
    //       })
    //     ])
    //   }));
    // }
    // let arr:FormArray = this.form.controls["tire1"]["controls"]["times"] as FormArray;
    // arr.push(this.fb.control({
    //   lap:['2']
    // }));
    // console.log(this.form);
    
  }

  addTire(){
    let arr: FormArray=this.form.controls["tires"] as FormArray;
    arr.push(this.fb.group({
      compound:[''],
      times:this.fb.array([]),
    }))
    console.log(this.form)
    // this.form.addControl()
    // this.tires.push(
    //   this.fb.control({
    //     time:['']
    //     //hello: ['']
    //   })
    // );
  }

  addLap(i){
    let arr: FormArray=this.form.controls["tires"]["controls"][i]["controls"]["times"] as FormArray;
    arr.push(this.fb.control({
      lap:['2']
    }));
    console.log(this.form)
    // const lessonForm = this.fb.group({
    //   time: ['', Validators.required],
    // });
    // this.laps.push(lessonForm);
  }
  get tires() {
    const arr:FormArray = this.form['controls']['tires'] as FormArray;
    return arr;
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

}
