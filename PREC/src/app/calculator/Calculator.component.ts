import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { laptimes } from 'src/models/telemetry.model';

@Component({
  selector: 'app-Calculator',
  templateUrl: './Calculator.component.html',
  styleUrls: ['./Calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private formbuilder:FormBuilder) { }

  form:FormGroup;
  model: laptimes;

  ngOnInit() {
    this.form = this.formbuilder.group({
      tire:['',{validators:[Validators.required]}],
      laptimes:''
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){

    // const genresIds = this.selectedGenres.map(value => value.key);
    // this.form.get('genresIds').setValue(genresIds);

    // const movieTheatersIds = this.selectedMovieTheaters.map(value => value.key);
    // this.form.get('movieTheatersIds').setValue(movieTheatersIds);

    // const actors = this.selectedActors.map(val => {
    //   return {id:val.id, character:val.character}
    // });
    // this.form.get('actors').setValue(actors);
    // this.onSaveChanges.emit(this.form.value);
  }

}
