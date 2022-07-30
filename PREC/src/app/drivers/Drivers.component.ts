import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { driverInfo } from '../models/drivers.model';
import { driverDTO } from '../models/driversDTO.model';
import { DriversService } from '../services/drivers.service';

@Component({
  selector: 'app-Drivers',
  templateUrl: './Drivers.component.html',
  styleUrls: ['./Drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers:Array<driverDTO> = [];

  constructor(private service:DriversService,
    private router:Router,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.service.getDrivers().then(data =>{
      this.drivers = data.drivers;
      console.log(data.drivers)
    });
  }

  deleteDriver(id:string){
    this.service.deleteDriver(id).then(res =>{
      this.service.getDrivers().then(data =>{
        this.drivers = data.drivers;
      });
    });
  }

  editDriver(id:string){
    this.router.navigate([`update/${id}`], { relativeTo: this.route });
  }

}
