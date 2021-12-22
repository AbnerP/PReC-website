import { Component, Input, OnInit } from '@angular/core';
import { driverDTO } from 'src/app/models/driverInterfaces/driversDTO.model';

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

}
