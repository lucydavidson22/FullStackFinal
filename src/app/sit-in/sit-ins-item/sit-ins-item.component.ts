import { Component, Input, OnInit } from '@angular/core';
import { SitIn } from '../sit-in.model';

@Component({
  selector: 'app-sit-ins-item',
  templateUrl: './sit-ins-item.component.html',
  styleUrls: ['./sit-ins-item.component.css']
})
export class SitInsItemComponent implements OnInit {
  @Input() sitIn: SitIn;

  constructor() { }

  ngOnInit(): void {
  }

}
