import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strategy } from 'src/app/Models/strategy.model';
import { Lap, Telemetry,tireTelemetry } from 'src/app/Models/tiretelemetry.model';
import { CalculatorService } from 'src/app/services/calculator.service';

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

  softLaps: Array<Lap> = [
    {
      lap: 1,
      time: 30.0
    },
    {
      lap: 2,
      time: 30.6
    },
    {
      lap: 3,
      time: 31.21
    },
    {
      lap: 4,
      time: 31.84
    },
    {
      lap: 5,
      time: 32.47
    },
    {
      lap: 6,
      time: 33.12
    },
    {
      lap: 7,
      time: 34.78
    },
    {
      lap: 8,
      time: 35.46
    },
    {
      lap: 9,
      time: 36.15
    },
    {
      lap: 10,
      time: 36.85
    }
  ];
  softTireData: tireTelemetry = {
    compound: "Soft",
    times: this.softLaps
  };
  mediumLaps: Array<Lap> = [
    {
      lap: 1,
      time: 31.0
    },
    {
      lap: 2,
      time: 32.6
    },
    {
      lap: 3,
      time: 32.8
    },
    {
      lap: 4,
      time: 33.84
    },
    {
      lap: 5,
      time: 33.12
    },
    {
      lap: 6,
      time: 34.78
    },
    {
      lap: 7,
      time: 35.46
    },
    {
      lap: 8,
      time: 35.15
    },
    {
      lap: 9,
      time: 36.85
    },
    {
      lap: 10,
      time: 36.85
    },
    {
      lap: 11,
      time: 36.46
    },
    {
      lap: 12,
      time: 37.15
    },
    {
      lap: 13,
      time: 38.85
    },
    {
      lap: 14,
      time: 39.85
    }
  ];
  mediumTireData: tireTelemetry = {
    compound: "Medium",
    times: this.mediumLaps
  };
  hardLaps: Array<Lap> = [
    {
      lap: 1,
      time: 32.0
    },
    {
      lap: 2,
      time: 32.6
    },
    {
      lap: 3,
      time: 32.8
    },
    {
      lap: 4,
      time: 33.84
    },
    {
      lap: 5,
      time: 33.12
    },
    {
      lap: 6,
      time: 33.78
    },
    {
      lap: 7,
      time: 33.46
    },
    {
      lap: 8,
      time: 33.15
    },
    {
      lap: 9,
      time: 34.85
    },
    {
      lap: 10,
      time: 34.85
    },
    {
      lap: 11,
      time: 35.46
    },
    {
      lap: 12,
      time: 35.15
    },
    {
      lap: 13,
      time: 36.85
    },
    {
      lap: 14,
      time: 36.85
    },
    {
      lap: 15,
      time: 36.46
    },
    {
      lap: 16,
      time: 36.15
    },
    {
      lap: 17,
      time: 37.85
    },
    {
      lap: 18,
      time: 37.85
    },
    {
      lap: 19,
      time: 37.46
    },
    {
      lap: 20,
      time: 37.15
    },
    {
      lap: 21,
      time: 38.85
    },
    {
      lap: 22,
      time: 38.85
    }
  ];
  hardTireData: tireTelemetry =
  {
    compound: "Hard",
    times: this.hardLaps
  };
  telemetryData: Telemetry = {
    data: [
      this.softTireData,
      this.mediumTireData,
      this.hardTireData
    ]
  };
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
    console.log(this.telemetryData);
    this.calculatorService.post(this.telemetryData);
    // .subscribe((data) =>{
    //   console.log(data);
    //   this.pits = data.pits;
    //   this.compounds = data.compounds;
    //   this.totalTime = data.totalTime;
    // });
    console.log(this.pits);
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
