import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { driverInfo } from 'src/app/models/driverInterfaces/drivers.model';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:DriversService,
    private router:Router){
  }

  profileIMG:File = null;
  form:FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      teamRole: this.fb.array([]),
      gamertag: ['', ],
      imageURL:['',],
      kudosPrimeLink:['',]
    });
    this.addTeamRole();
  }

  get teamRole(){
    let arr:FormArray = this.form.controls["teamRole"] as FormArray;
    return arr;
  }

  addTeamRole(){
    this.teamRole.push(this.fb.group({
      role:['']
    }));
  }

  saveChanges(){
    let driver:driverInfo = {
      imageURL:this.form.value["imageURL"],
      name: this.form.value["name"],
      teamRole: [],
      gamertag: this.form.value["gamertag"],
      kudosPrimeLink: this.form.value["kudosPrimeLink"]
    };

    for(let role of this.form.value["teamRole"]){
      driver.teamRole.push(role["role"]);
    }

    this.service.createDriver(driver,this.profileIMG).then(res =>{
      this.router.navigate(['/drivers'])
    });

  }

  onImageUploaded(event){
    this.profileIMG = <File> event.target.files[0];
  }
}
