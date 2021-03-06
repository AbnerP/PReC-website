import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { eventCreationDTO, eventDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventIMG:File = null;
  imageSrc:string;

  id:string;

  form:FormGroup;
  platforms:string[] = ["PlayStation", "Xbox", "Steam"];
  minDate: Date;
  maxDate: Date;

  constructor(private fb:FormBuilder,
    private service:EventsService,
    private router:Router,
    private route:ActivatedRoute){
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
      contactInfo:[''],
      platform:['Platform'],
      registrationLimit:[''],
      host:['']
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.service.geteventByID(this.id).then(data => {
        this.form.patchValue(data);

        this.imageSrc = data.imageURL;
      });
    }

    this.minDate = new Date();
  }

  saveChanges(){
    let event:eventCreationDTO = {
      name: this.form.value.name,
      date:this.form.value.date,
      startTime: this.form.value.startTime,
      game:this.form.value.game,
      track:this.form.value.track,
      duration:this.form.value.duration,
      description: this.form.value.description,
      contactInfo:this.form.value.contactInfo,
      platform:this.form.value.platform,
      registrationLimit:this.form.value.registrationLimit,
      host:this.form.value.host,
    };

    if(this.id !== null){
      this.service.updateEvent(this.id,event,this.eventIMG).then(res =>{

        this.router.navigate(['/events']);
      });
    }else{
      this.service.createEvent(event,this.eventIMG).then(res =>{
        this.router.navigate(['/events']);
      });
    }

  }

  onImageUploaded(event){
    this.eventIMG = <File> event.target.files[0];
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;

        this.form.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

}
