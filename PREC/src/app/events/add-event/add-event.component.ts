import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { eventCreationDTO, eventDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventIMG:File = null;
  form:FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private fb:FormBuilder,
    private service:EventsService,
    private router:Router){
    }


  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      date:'',
      startTime: [''],
      game:[''],
      track:[''],
      duration:[''],
      description: [''],
      contactInfo:['']
    });
    this.minDate = new Date();
  }

  saveChanges(){
    // console.log(this.form.value.date.toJson());
    let event:eventCreationDTO = {
      name: this.form.value.name,
      date:this.form.value.date,
      startTime: this.form.value.startTime,
      game:this.form.value.game,
      track:this.form.value.track,
      duration:this.form.value.duration,
      description: this.form.value.description,
      contactInfo:this.form.value.contactInfo
    };

    this.service.createEvent(event,this.eventIMG).then(res =>{
      this.router.navigate(['/events'])
    });

  }

  onImageUploaded(event){
    this.eventIMG = <File> event.target.files[0];
  }

}
