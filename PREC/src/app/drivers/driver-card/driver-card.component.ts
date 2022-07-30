import { Component, Input, OnInit } from '@angular/core';
import { driverDTO } from 'src/app/models/driversDTO.model';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit {

  @Input() driver:driverDTO;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // console.log(this.driver)
    if(this.driver.xboxID)
      console.log(this.driver)
  }

}
