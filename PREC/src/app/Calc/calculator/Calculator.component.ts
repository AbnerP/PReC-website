import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strategy } from 'src/app/Models/strategy.model';
import { CalculatorService } from 'src/app/services/calculator.service';
import {fullTelemetry,tireTelemetry} from 'src/models/telemetry.model';

@Component({
  selector: 'app-Calculator',
  templateUrl: './Calculator.component.html',
  styleUrls: ['./Calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  // constructor(private formbuilder:FormBuilder) { }
  constructor(private calculatorService:CalculatorService) { }

  // numTires:FormGroup;

  // numberOfTires:number;
  // numberOfTiresArr:Array<number> = [];
  pits:Array<number>;
  compounds:Array<string>;
  totalTime:number;
  ngOnInit() {

    // this.numTires = this.formbuilder.group({
    //   tires:['',{validators:[Validators.required]}]
    // });
    // if(this.model !== undefined){
    //   this.form.patchValue(this.model);
    // }
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // this.calculatorService.get().subscribe((data) => {
    //   this.json = data;
    // });
    this.calculatorService.get().subscribe((data) =>{
      this.pits = data.pitLaps;
      this.compounds = data.compounds;
      this.totalTime = data.totalTime;
    });
  }
  // setNumTires(){
  //   this.numberOfTires = this.numTires.value.tires;
  //   for(let i = 0;i<this.numberOfTires;i++){
  //     this.numberOfTiresArr.push(i);
  //   }
  // }

  // saveChanges(){

  //   // const genresIds = this.selectedGenres.map(value => value.key);
  //   // this.form.get('genresIds').setValue(genresIds);

  //   // const movieTheatersIds = this.selectedMovieTheaters.map(value => value.key);
  //   // this.form.get('movieTheatersIds').setValue(movieTheatersIds);

  //   // const actors = this.selectedActors.map(val => {
  //   //   return {id:val.id, character:val.character}
  //   // });
  //   // this.form.get('actors').setValue(actors);
  //   // this.onSaveChanges.emit(this.form.value);
  // }

}
