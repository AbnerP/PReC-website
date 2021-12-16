import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { driverInfo } from '../models/driverInterfaces/drivers.model';
import { DriversService } from '../services/drivers.service';

@Component({
  selector: 'app-Drivers',
  templateUrl: './Drivers.component.html',
  styleUrls: ['./Drivers.component.scss']
})
export class DriversComponent implements OnInit {

  // drivers:Array<driverInfo> = [
  //   {
  //     imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
  //     name:"Abner Peña",
  //     teamRole:["Driver","Web Page Maintance"],
  //     gamertag:"PReC_APena",
  //     kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
  //   },
  //   {
  //     imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
  //     name:"Pedro Marzan",
  //     teamRole:["Driver","Founder"],
  //     gamertag:"PReC_APena",
  //     kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
  //   },
  //   {
  //     imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
  //     name:"Kem",
  //     teamRole:["Driver","Team Leader"],
  //     gamertag:"PReC_APena",
  //     kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
  //   },
  //   {
  //     imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
  //     name:"Armandor",
  //     teamRole:["Driver","Web Page Maintance"],
  //     gamertag:"PReC_APena",
  //     kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
  //   },
  //   {
  //     imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
  //     name:"Cruz",
  //     teamRole:["Driver","Web Page Maintance"],
  //     gamertag:"PReC_APena",
  //     kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
  //   }
  // ];

  drivers:Array<driverInfo> = [];

  constructor(private service:DriversService){}

  ngOnInit(): void {
    // this.service.getDriverByID('61b937944a9e8465df20746e');
    this.service.getDrivers().then(data =>{
      this.drivers = data.drivers;
    });
    // this.service.updateDriverImage('61b9ea0b5e4f220f980886dd','imageURL');
    // this.service.deleteDriver('61b937944a9e8465df20746e');
    // this.service.createDriver(this.drivers[0]);
  }

  /*
  {
    // constructor(private fb:FormBuilder) { }
    // form:FormGroup;

    // ngOnInit(){
    //   this.form = this.fb.group({
    //       lessons: this.fb.array([])
    //     });

    // }

    // get lessons(){
    //   return this.form.controls["lessons"] as FormArray;
    // }
    // addLesson(){
    //   const lessonForm = this.fb.group({
    //     title: ['',Validators.required],
    //     level:['beginner',Validators.required]
    //   });

    //   this.lessons.push(lessonForm);
    // }

    // deleteLesson(lessonIndex:number){
    //   this.lessons.removeAt(lessonIndex);
    // }



    // user:FormGroup;

    // // addSkill(){
    // //   this.skills.push(new FormControl(''));
    // // }
    // ngOnInit() {
    //   this.user = this.fb.group({
    //     name: new FormControl(''),
    //     skills: new FormArray([
    //       new FormGroup({
    //         name: new FormControl(''),
    //         level: new FormControl('')
    //       })
    //     ])
    //   })
    // }
    // get skills(){
    //   return this.user.get('skills') as FormArray;
    // }

  }*/

}
