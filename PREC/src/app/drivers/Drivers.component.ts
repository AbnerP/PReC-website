import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { driverInfo } from '../Models/drivers.model';

@Component({
  selector: 'app-Drivers',
  templateUrl: './Drivers.component.html',
  styleUrls: ['./Drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers:Array<driverInfo> = [
    {
      imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
      name:"Abner Peña",
      teamRole:["Driver","Web Page Maintance"],
      gamertag:"PReC_APena",
      kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
    },
    {
      imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
      name:"Pedro Marzan",
      teamRole:["Driver","Founder"],
      gamertag:"PReC_APena",
      kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
    },
    {
      imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
      name:"Kem",
      teamRole:["Driver","Team Leader"],
      gamertag:"PReC_APena",
      kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
    },
    {
      imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
      name:"Armandor",
      teamRole:["Driver","Web Page Maintance"],
      gamertag:"PReC_APena",
      kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
    },
    {
      imageURL: "assets/imgs/Abner_Pena_Portrait.jpg",
      name:"Cruz",
      teamRole:["Driver","Web Page Maintance"],
      gamertag:"PReC_APena",
      kudosPrimeLink:"https://www.kudosprime.com/gts/stats.php?profile=10733830"
    },
  ];

  constructor(){}
  ngOnInit(): void {
  }

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

}
