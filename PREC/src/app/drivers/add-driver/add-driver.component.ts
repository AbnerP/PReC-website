import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { driverInfo } from 'src/app/models/drivers.model';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private service:DriversService,
    private router:Router,
    private route:ActivatedRoute){
  }

  profileIMG:File = null;
  imageSrc:string;

  id:string;

  form:FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      teamRole: this.fb.array([]),
      gamertag: ['', ],
      imageURL:['',],
      kudosPrimeLink:['',]
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      this.service.getDriverByID(this.id).then(data => {
        for(let i = 0; i<data.teamRole.length;i++){
          this.teamRole.push(this.fb.group({
            role:[data.teamRole[i]]
          }));
        }
        this.form.patchValue(data);
        console.log(data.imageURL);
        this.imageSrc = data.imageURL;
      });
    }else{
      this.addTeamRole();
    }
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

    if(this.id !== null){
      this.service.updateDriver(this.id,driver,this.profileIMG).then(res =>{
        this.router.navigate(['/drivers']);
      });
    }else{
      this.service.createDriver(driver,this.profileIMG).then(res =>{
        this.router.navigate(['/drivers'])
      });
    }
  }

  onImageUploaded(event){
    this.profileIMG = <File> event.target.files[0];
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
