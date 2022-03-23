import { Component, Input, OnInit } from '@angular/core';
import { Foods } from '../food.model';

@Component({
  selector: 'app-foods-item',
  templateUrl: './foods-item.component.html',
  styleUrls: ['./foods-item.component.css']
})
export class FoodsItemComponent implements OnInit {
  @Input() food: Foods;

  constructor() { }

  ngOnInit(): void {
  }

}
