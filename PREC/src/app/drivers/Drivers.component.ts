import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Drivers',
  templateUrl: './Drivers.component.html',
  styleUrls: ['./Drivers.component.css']
})
export class DriversComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  form:FormGroup;

  ngOnInit(){
    this.form = this.fb.group({
        lessons: this.fb.array([])
      });
  }

  get lessons(){
    return this.form.controls["lessons"] as FormArray;
  }
  addLesson(){
    const lessonForm = this.fb.group({
      title: ['',Validators.required],
      level:['beginner',Validators.required]
    });

    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex:number){
    this.lessons.removeAt(lessonIndex);
  }



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
