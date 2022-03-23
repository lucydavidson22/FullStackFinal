import { Component, OnInit } from '@angular/core';
import { SitIn } from './sit-in.model';
import { SitInService } from './sit-in.service';

@Component({
  selector: 'app-sit-ins',
  templateUrl: './sit-ins.component.html',
  styleUrls: ['./sit-ins.component.css']
})
export class SitInsComponent implements OnInit {
  selectedRestaurant: SitIn;

  constructor(private sitinService: SitInService) { }

  ngOnInit(): void {
    this.sitinService.sitInSelectedEvent.subscribe(
      (sitin:SitIn) => {
        this.selectedRestaurant = sitin;
      }
    )
  }

}
