import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  form:FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      teamRoles: this.fb.array([]),
      gamertag: ['', [Validators.required]],
      imageURL:['',Validators.required],
      kudosPrimeLink:['',Validators.required]
    });
    this.addTeamRole();
  }

  get teamRoles(){
    let arr:FormArray = this.form.controls["teamRoles"] as FormArray;
    return arr;
  }

  addTeamRole(){
    this.teamRoles.push(this.fb.group({
      role:['',Validators.required]
    }));
  }

}
